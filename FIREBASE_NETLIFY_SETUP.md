# Firebase + Netlify Setup

## Firebase console

1. Create a Firebase project.
2. Add a Web app and copy its config into `firebase-config.js`.
3. Enable Authentication > Sign-in method > Email/Password.
4. Create your first owner in Authentication > Users.
5. Create a Cloud Firestore database.
6. Publish the rules in `firestore.rules`.

## User documents

Each signed-in user stores session data at:

```text
users/{firebaseAuthUid}
```

The app creates this document on first login. To make a user an owner, edit the
document in the Firebase Console and add:

```json
{
  "role": "owner"
}
```

After one owner has `role: "owner"`, open `owner.html` while logged in as that
owner to add more users. The owner page creates Firebase Authentication users,
creates their `users/{uid}` profile document, and can block/unblock access.

If a user is blocked manually from the owner page, unblock them there or edit
that same document:

```json
{
  "blocked": false,
  "multipleLoginDetected": false,
  "activeSessionId": null
}
```

The app allows only one active session at a time. If a user closes the browser
without logging out, the next login can replace the old session after the
heartbeat becomes stale.

When a user tries to log in while another active session exists, the app writes
a suspected-login entry to:

```text
suspectedLoginLogs/{autoId}
```

The owner panel shows these entries with the old active-session public IP and
the new attempted-login public IP when the browser can detect them.

## Netlify

Deploy the folder as a static site. No backend server is required.

Recommended production settings:

1. Add your Netlify production domain and any custom domain to Firebase
   Authentication > Settings > Authorized domains.
2. Restrict the Firebase browser API key in Google Cloud Console to your
   Netlify/custom domains.
3. Enable Firebase App Check for the web app when you are ready for production.
4. Keep Firestore rules locked down. Do not use test mode rules in production.

Firebase web config values are public identifiers. They cannot be hidden in a
static website, so security must come from Authentication, Firestore Security
Rules, API key restrictions, and App Check.

Because this site has no backend server, the owner page uses Firebase's browser
SDK to create users. For stronger production control, use a Firebase Cloud
Function with the Admin SDK for user creation.
