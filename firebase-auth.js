const FIREBASE_SESSION_ID_KEY = "mcq_current_session_id";
const FIREBASE_CURRENT_USER_KEY = "mcq_current_username";
const FIREBASE_USERS_COLLECTION = "users";
const FIREBASE_SUSPECTED_LOGS_COLLECTION = "suspectedLoginLogs";
const LOGIN_PAGE = "login.html";
const STALE_SESSION_MS = 2 * 60 * 1000;

if (!window.firebaseConfig) {
  throw new Error("Missing firebaseConfig. Update firebase-config.js before deploying.");
}

firebase.initializeApp(window.firebaseConfig);

const firebaseAuth = firebase.auth();
const firebaseDb = firebase.firestore();

function createSessionId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  const random = window.crypto && window.crypto.getRandomValues
    ? Array.from(window.crypto.getRandomValues(new Uint32Array(4))).map((n) => n.toString(36)).join("")
    : Math.random().toString(36).slice(2);
  return `session_${Date.now()}_${random}`;
}

function serverNow() {
  return firebase.firestore.FieldValue.serverTimestamp();
}

function userDoc(uid) {
  return firebaseDb.collection(FIREBASE_USERS_COLLECTION).doc(uid);
}

function suspectedLogsCollection() {
  return firebaseDb.collection(FIREBASE_SUSPECTED_LOGS_COLLECTION);
}

function getLocalSessionId() {
  return localStorage.getItem(FIREBASE_SESSION_ID_KEY);
}

function clearLocalSession() {
  localStorage.removeItem(FIREBASE_SESSION_ID_KEY);
  localStorage.removeItem(FIREBASE_CURRENT_USER_KEY);
}

function redirectToLogin() {
  const page = window.location.pathname.split("/").pop().toLowerCase();
  if (page !== LOGIN_PAGE && page !== "index.html" && page !== "") {
    window.location.replace(LOGIN_PAGE);
  }
}

function waitForAuthUser() {
  return new Promise((resolve) => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
}

function timestampToMillis(value) {
  if (!value) return 0;
  if (typeof value.toMillis === "function") return value.toMillis();
  if (typeof value.seconds === "number") return value.seconds * 1000;
  if (typeof value === "number") return value;
  return 0;
}

function isActiveSessionStale(data) {
  if (!data || !data.activeSessionId) return true;
  const lastSeenMs = timestampToMillis(data.lastSeenAt || data.lastLoginAt);
  return !lastSeenMs || Date.now() - lastSeenMs > STALE_SESSION_MS;
}

async function getClientIpAddress() {
  try {
    const response = await fetch("https://api.ipify.org?format=json", {
      cache: "no-store"
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data && data.ip ? String(data.ip) : null;
  } catch (error) {
    console.warn("Could not detect client IP address", error);
    return null;
  }
}

async function logSuspectedActiveSessionAttempt(user, existingData, newSessionId, newIpAddress) {
  await suspectedLogsCollection().add({
    userId: user.uid,
    email: user.email || existingData.email || null,
    reason: "Active session login attempt",
    previousSessionId: existingData.activeSessionId || null,
    attemptedSessionId: newSessionId,
    oldIpAddress: existingData.activeSessionIp || existingData.lastLoginIp || null,
    newIpAddress: newIpAddress || null,
    previousLastSeenAt: existingData.lastSeenAt || null,
    detectedAt: serverNow()
  });
}

async function loginWithEmailPassword(email, password) {
  const credential = await firebaseAuth.signInWithEmailAndPassword(email, password);
  const user = credential.user;
  const ref = userDoc(user.uid);
  const snapshot = await ref.get();
  const data = snapshot.exists ? snapshot.data() : {};
  const localSessionId = getLocalSessionId();
  const newSessionId = createSessionId();
  const clientIpAddress = await getClientIpAddress();

  if (data.blocked) {
    await firebaseAuth.signOut();
    clearLocalSession();
    throw new Error("Access blocked. Contact the site owner.");
  }

  if (data.activeSessionId && data.activeSessionId !== localSessionId && !isActiveSessionStale(data)) {
    try {
      await logSuspectedActiveSessionAttempt(user, data, newSessionId, clientIpAddress);
    } catch (error) {
      console.warn("Could not write suspected login log", error);
    }
    await firebaseAuth.signOut();
    clearLocalSession();
    throw new Error("This account is already active on another device or tab. Please logout there first, then try again.");
  }

  await ref.set({
    uid: user.uid,
    email: user.email,
    activeSessionId: newSessionId,
    activeSessionIp: clientIpAddress,
    lastLoginIp: clientIpAddress,
    blocked: false,
    multipleLoginDetected: false,
    lastLoginAt: serverNow(),
    lastSeenAt: serverNow(),
    updatedAt: serverNow()
  }, { merge: true });

  localStorage.setItem(FIREBASE_SESSION_ID_KEY, newSessionId);
  localStorage.setItem(FIREBASE_CURRENT_USER_KEY, user.email || user.uid);
  return { user, sessionId: newSessionId };
}

async function logoutCurrentUser(redirect = true) {
  const user = firebaseAuth.currentUser || await waitForAuthUser();
  const localSessionId = getLocalSessionId();

  if (user && localSessionId) {
    try {
      const ref = userDoc(user.uid);
      const snapshot = await ref.get();
      const data = snapshot.exists ? snapshot.data() : {};
      if (data.activeSessionId === localSessionId && !data.blocked) {
        await ref.set({
          activeSessionId: null,
          lastLogoutAt: serverNow(),
          updatedAt: serverNow()
        }, { merge: true });
      }
    } catch (error) {
      console.warn("Could not update Firestore logout state", error);
    }
  }

  clearLocalSession();
  await firebaseAuth.signOut();
  if (redirect) window.location.href = LOGIN_PAGE;
}

async function requireFirebaseSession() {
  const user = await waitForAuthUser();
  const localSessionId = getLocalSessionId();

  if (!user || !localSessionId) {
    clearLocalSession();
    redirectToLogin();
    return null;
  }

  const snapshot = await userDoc(user.uid).get();
  if (!snapshot.exists) {
    await logoutCurrentUser(true);
    return null;
  }

  const data = snapshot.data();
  if (data.blocked || data.activeSessionId !== localSessionId) {
    await logoutCurrentUser(true);
    return null;
  }

  await userDoc(user.uid).set({
    lastSeenAt: serverNow(),
    updatedAt: serverNow()
  }, { merge: true });

  return {
    uid: user.uid,
    email: user.email,
    sessionId: localSessionId,
    role: data.role || "student"
  };
}

async function getCurrentFirebaseProfile() {
  const user = firebaseAuth.currentUser || await waitForAuthUser();
  if (!user) return null;
  const snapshot = await userDoc(user.uid).get();
  return snapshot.exists ? { uid: user.uid, ...snapshot.data() } : null;
}

async function requireOwnerProfile() {
  const profile = await getCurrentFirebaseProfile();
  if (!profile || profile.role !== "owner" || profile.blocked) {
    throw new Error("Only owner accounts can manage users.");
  }
  return profile;
}

async function createFirebaseUserAsOwner(email, password, role) {
  const owner = await requireOwnerProfile();
  const secondaryAppName = `userCreator_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const secondaryApp = firebase.initializeApp(window.firebaseConfig, secondaryAppName);
  const secondaryAuth = secondaryApp.auth();

  try {
    const credential = await secondaryAuth.createUserWithEmailAndPassword(email, password);
    const createdUser = credential.user;
    await userDoc(createdUser.uid).set({
      uid: createdUser.uid,
      email: createdUser.email,
      role: role === "owner" ? "owner" : "student",
      activeSessionId: null,
      blocked: false,
      multipleLoginDetected: false,
      createdBy: owner.uid,
      createdAt: serverNow(),
      updatedAt: serverNow()
    }, { merge: true });
    await secondaryAuth.signOut();
    return { uid: createdUser.uid, email: createdUser.email };
  } finally {
    await secondaryApp.delete();
  }
}

async function listFirebaseUsersForOwner() {
  await requireOwnerProfile();
  const snapshot = await firebaseDb.collection(FIREBASE_USERS_COLLECTION).get();
  return snapshot.docs
    .map((doc) => ({ uid: doc.id, ...doc.data() }))
    .sort((a, b) => String(a.email || "").localeCompare(String(b.email || "")));
}

async function listSuspectedLoginLogsForOwner(limit = 50) {
  await requireOwnerProfile();
  const snapshot = await suspectedLogsCollection()
    .orderBy("detectedAt", "desc")
    .limit(limit)
    .get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function setFirebaseUserBlocked(uid, blocked) {
  await requireOwnerProfile();
  await userDoc(uid).set({
    blocked: Boolean(blocked),
    activeSessionId: null,
    updatedAt: serverNow()
  }, { merge: true });
}

window.FirebaseSession = {
  auth: firebaseAuth,
  db: firebaseDb,
  loginWithEmailPassword,
  logoutCurrentUser,
  requireFirebaseSession,
  getCurrentFirebaseProfile,
  createFirebaseUserAsOwner,
  listFirebaseUsersForOwner,
  listSuspectedLoginLogsForOwner,
  setFirebaseUserBlocked,
  getLocalSessionId
};
