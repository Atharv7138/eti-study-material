const ACTIVE_SESSIONS_KEY = "mcq_active_sessions";
const CURRENT_SESSION_ID_KEY = "mcq_current_session_id";
const CURRENT_USERNAME_KEY = "mcq_current_username";
const TAB_ID_KEY = "mcq_tab_id";
const TAB_LOCK_PREFIX = "mcq_single_tab_lock_";
const BLOCKED_USERS_KEY = "mcq_blocked_users";
const QUIZ_META_KEY = "mcq_quiz_meta";
const QUIZ_STATE_PREFIX = "mcq_quiz_state_";
const RESULT_KEY = "mcq_last_result";
const USERS_DB_KEY = "mcq_users_db";
const UNIT1_SET_SIZE = 50;
const UNIT2_SET_SIZE = 50;
const UNIT3_SET_SIZE = 50;
const UNIT4_SET_SIZE = 50;
const UNIT5_SET_SIZE = 50;

const SESSION_TIMEOUT_MS = 60 * 1000;
const TAB_LOCK_TIMEOUT_MS = 12 * 1000;
const LOCK_REFRESH_MS = 4000;

const unit1Questions = [
  { question: "Who is known as the \"Father of Artificial Intelligence\"?", options: ["Alan Turing", "Charles Babbage", "John McCarthy", "Elon Musk"], answer: 2 },
  { question: "What is the primary definition of Artificial Intelligence?", options: ["Programming computers to play games", "The simulation of human intelligence processes by machines", "Making computers faster", "Creating robots that look like humans"], answer: 1 },
  { question: "The \"Turing Test\" is designed to assess:", options: ["How fast a computer computes", "Whether a machine can exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human", "The battery life of a robot", "The storage capacity of an AI system"], answer: 1 },
  { question: "Which of the following is NOT a major goal of AI?", options: ["To create expert systems", "To implement human intelligence in machines", "To replace all humans in the workforce", "To solve complex problems using reasoning"], answer: 2 },
  { question: "\"Weak AI\" is also known as:", options: ["General AI", "Narrow AI", "Super AI", "Deep AI"], answer: 1 },
  { question: "Which type of AI is dedicated to one specific task?", options: ["Artificial General Intelligence", "Artificial Narrow Intelligence", "Artificial Super Intelligence", "Strong AI"], answer: 1 },
  { question: "Apple's Siri, Amazon's Alexa, and Google Assistant are examples of:", options: ["Artificial General Intelligence", "Artificial Super Intelligence", "Artificial Narrow Intelligence", "Reactive Machines"], answer: 2 },
  { question: "Artificial General Intelligence (AGI) refers to a system that:", options: ["Can only play Chess", "Has intelligence equal to a human across a wide variety of tasks", "Is far superior to humans in every way", "Requires no electricity"], answer: 1 },
  { question: "Artificial Super Intelligence (ASI) is defined as:", options: ["AI that is slightly smarter than a calculator", "AI that surpasses human intellectual ability in practically every field", "AI that can drive cars but not talk", "AI used in supermarkets"], answer: 1 },
  { question: "Which discipline is NOT typically considered part of the scope of AI?", options: ["Computer Vision", "Natural Language Processing", "Civil Engineering Construction", "Robotics"], answer: 2 },
  { question: "The capability of a machine to imitate intelligent human behavior is called:", options: ["Artificial Intelligence", "Data Mining", "Cloud Computing", "Blockchain"], answer: 0 },
  { question: "Which of the following is a component of AI that focuses on visual data?", options: ["NLP", "Computer Vision", "Speech Recognition", "Expert Systems"], answer: 1 },
  { question: "NLP stands for:", options: ["Natural Language Processing", "Neural Language Programming", "New Language Protocol", "Natural Learning Process"], answer: 0 },
  { question: "Which type of AI currently exists and is widely used today?", options: ["ANI (Narrow)", "AGI (General)", "ASI (Super)", "Sentient AI"], answer: 0 },
  { question: "An AI system that creates a painting based on a text prompt is an example of:", options: ["Analytical AI", "Generative AI", "Reactive AI", "Passive AI"], answer: 1 },
  { question: "IBM Watson is famous for winning which game show?", options: ["Survivor", "Jeopardy!", "Wheel of Fortune", "Who Wants to Be a Millionaire"], answer: 1 },
  { question: "Which of the following is an advantage of AI?", options: ["High cost of creation", "24/7 Availability", "Lack of creativity", "Unemployment concerns"], answer: 1 },
  { question: "Deep Blue, the chess-playing computer, is an example of:", options: ["AGI", "ANI", "ASI", "Strong AI"], answer: 1 },
  { question: "The subset of AI that involves machines performing tasks without explicit programming is:", options: ["Machine Learning", "Database Management", "Web Development", "Networking"], answer: 0 },
  { question: "Which term describes the point where AI surpasses human intelligence?", options: ["The Event Horizon", "The Singularity", "The Turing Point", "The Neuron Limit"], answer: 1 },
  { question: "A core of AI includes \"Expert Systems\". What do they do?", options: ["Play video games", "Emulate the decision-making ability of a human expert", "Design graphics", "Manage electricity"], answer: 1 },
  { question: "Self-driving cars primarily use which AI domains?", options: ["Computer Vision and Machine Learning", "NLP and Text Generation", "Audio Synthesis only", "Database sorting"], answer: 0 },
  { question: "What is the main difference between Narrow AI and General AI?", options: ["Narrow AI is faster", "Narrow AI is specific to tasks; General AI has human-like broad cognitive abilities", "General AI uses less power", "There is no difference"], answer: 1 },
  { question: "Which of the following is NOT a type of AI based on functionality?", options: ["Reactive Machines", "Limited Memory", "Theory of Mind", "Python Script"], answer: 3 },
  { question: "\"Theory of Mind\" in AI refers to:", options: ["Understanding that others have beliefs, desires, and intentions", "Storing past memories", "Reacting to current inputs only", "Calculating math problems"], answer: 0 },
  { question: "Machine Learning is a subset of:", options: ["Data Science", "Artificial Intelligence", "Cloud Computing", "Networking"], answer: 1 },
  { question: "Which type of machine learning uses labeled data?", options: ["Unsupervised Learning", "Reinforcement Learning", "Supervised Learning", "Semi Learning"], answer: 2 },
  { question: "Which type of machine learning finds patterns without labeled data?", options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"], answer: 1 },
  { question: "Reinforcement learning is based on:", options: ["Labeled data", "Trial and error with rewards and penalties", "Predefined rules", "Database queries"], answer: 1 },
  { question: "Deep Learning is a subset of:", options: ["Networking", "Machine Learning", "Cloud Computing", "Blockchain"], answer: 1 },
  { question: "Neural networks are inspired by:", options: ["Computer circuits", "Human brain", "Internet", "Operating systems"], answer: 1 },
  { question: "Which algorithm is used for classification?", options: ["Linear Regression", "Logistic Regression", "Sorting", "Hashing"], answer: 1 },
  { question: "Which algorithm is used for clustering?", options: ["K-Means", "Linear Regression", "Decision Tree", "SVM"], answer: 0 },
  { question: "Overfitting occurs when:", options: ["Model performs well on training but poorly on testing", "Model is too simple", "Model has no data", "Model is random"], answer: 0 },
  { question: "Underfitting occurs when:", options: ["Model learns too much", "Model fails to learn patterns", "Model is perfect", "Model is complex"], answer: 1 },
  { question: "Which of the following is NOT a ML algorithm?", options: ["Decision Tree", "Neural Network", "HTTP", "KNN"], answer: 2 },
  { question: "Feature in ML means:", options: ["Output", "Input variable", "Error", "Model"], answer: 1 },
  { question: "Dataset is:", options: ["Collection of data", "Single value", "Program", "Hardware"], answer: 0 },
  { question: "Training data is used to:", options: ["Test model", "Train model", "Delete model", "Store model"], answer: 1 },
  { question: "Testing data is used to:", options: ["Train model", "Evaluate model", "Delete data", "Store data"], answer: 1 },
  { question: "Accuracy measures:", options: ["Speed", "Correct predictions", "Memory", "Cost"], answer: 1 },
  { question: "Which is a regression algorithm?", options: ["Linear Regression", "K-Means", "KNN", "CNN"], answer: 0 },
  { question: "CNN stands for:", options: ["Convolutional Neural Network", "Central Network Node", "Computer Neural Node", "Core Neural Network"], answer: 0 },
  { question: "RNN is used for:", options: ["Image data", "Sequential data", "Storage", "Security"], answer: 1 },
  { question: "Activation function is used to:", options: ["Store data", "Introduce non-linearity", "Delete data", "Print output"], answer: 1 },
  { question: "Which is an example of supervised learning?", options: ["Spam detection", "Clustering", "Grouping", "Searching"], answer: 0 },
  { question: "Which is example of unsupervised learning?", options: ["Classification", "Clustering", "Prediction", "Regression"], answer: 1 },
  { question: "AI, ML, DL relationship is:", options: ["ML ⊂ AI, DL ⊂ ML", "AI ⊂ ML", "DL ⊂ AI", "All separate"], answer: 0 },
  { question: "Neural network layer includes:", options: ["Input, Hidden, Output", "Only Input", "Only Output", "Only Hidden"], answer: 0 },
  { question: "Backpropagation is used for:", options: ["Forward pass", "Error correction", "Data storage", "Sorting"], answer: 1 },
  { question: "Generative AI is used for:", options: ["Data storage", "Creating new content", "Networking", "Security"], answer: 1 },
  { question: "Which model is used in Generative AI?", options: ["Transformer", "KNN", "SVM", "Decision Tree"], answer: 0 },
  { question: "Transformer model uses:", options: ["Attention mechanism", "Sorting", "Storage", "Routing"], answer: 0 },
  { question: "Self-attention helps to:", options: ["Ignore data", "Focus on important parts of input", "Delete data", "Store data"], answer: 1 },
  { question: "Encoder in transformer:", options: ["Generates output", "Processes input", "Deletes data", "Stores data"], answer: 1 },
  { question: "Decoder in transformer:", options: ["Processes input", "Generates output", "Deletes data", "Compress data"], answer: 1 },
  { question: "Multi-head attention means:", options: ["Multiple outputs", "Multiple attention mechanisms", "Multiple inputs", "Multiple networks"], answer: 1 },
  { question: "Positional encoding is used to:", options: ["Store data", "Represent order of sequence", "Delete data", "Compress data"], answer: 1 },
  { question: "Feedforward network is:", options: ["Sequential layer", "Storage", "Network device", "Router"], answer: 0 },
  { question: "Generative AI applications include:", options: ["Text generation", "Image generation", "Audio generation", "All of the above"], answer: 3 },
  { question: "AI-powered cyber attack includes:", options: ["Phishing", "Malware", "Deepfake", "All"], answer: 3 },
  { question: "Adversarial attack is:", options: ["Data corruption", "Fooling AI model", "Storage issue", "Network issue"], answer: 1 },
  { question: "Evasion attack occurs during:", options: ["Training", "Testing", "Storage", "Execution"], answer: 1 },
  { question: "Poisoning attack affects:", options: ["Testing data", "Training data", "Network", "Hardware"], answer: 1 },
  { question: "Deepfake uses:", options: ["AI", "ML", "DL", "All"], answer: 3 },
  { question: "MFA stands for:", options: ["Multi-Factor Authentication", "Multiple File Access", "Machine Function Analysis", "Main File Access"], answer: 0 },
  { question: "Strong password means:", options: ["Short password", "Simple password", "Complex password", "Default password"], answer: 2 },
  { question: "Updating software helps in:", options: ["Increasing bugs", "Security improvement", "Slowing system", "Deleting data"], answer: 1 },
  { question: "Secure network prevents:", options: ["Data loss", "Cyber attacks", "Speed", "Storage"], answer: 1 },
  { question: "AI security improves:", options: ["Speed", "Protection", "Cost", "Storage"], answer: 1 },
  { question: "Neural network consists of:", options: ["Nodes", "Layers", "Weights", "All"], answer: 3 },
  { question: "Input layer receives:", options: ["Output", "Data", "Error", "Result"], answer: 1 },
  { question: "Hidden layer performs:", options: ["Processing", "Storage", "Output", "Input"], answer: 0 },
  { question: "Output layer gives:", options: ["Input", "Result", "Storage", "Error"], answer: 1 },
  { question: "Weights in neural network represent:", options: ["Importance of input", "Storage", "Output", "Speed"], answer: 0 },
  { question: "Bias in neural network helps to:", options: ["Shift activation function", "Store data", "Delete data", "Increase speed"], answer: 0 },
  { question: "Activation function example:", options: ["ReLU", "Sigmoid", "Tanh", "All"], answer: 3 },
  { question: "Loss function measures:", options: ["Accuracy", "Error", "Speed", "Cost"], answer: 1 },
  { question: "Gradient descent is used for:", options: ["Optimization", "Storage", "Sorting", "Searching"], answer: 0 },
  { question: "Epoch means:", options: ["One iteration over dataset", "Storage", "Network", "Hardware"], answer: 0 },
  { question: "Batch size is:", options: ["Total data", "Subset of data", "Output", "Error"], answer: 1 },
  { question: "Hyperparameter is:", options: ["Model parameter", "External setting", "Output", "Input"], answer: 1 },
  { question: "Model training requires:", options: ["Data", "Algorithm", "Computing power", "All"], answer: 3 },
  { question: "AI application in healthcare:", options: ["Diagnosis", "Prediction", "Monitoring", "All"], answer: 3 },
  { question: "AI application in finance:", options: ["Fraud detection", "Trading", "Risk analysis", "All"], answer: 3 },
  { question: "AI application in education:", options: ["Personalized learning", "Automation", "Assessment", "All"], answer: 3 },
  { question: "AI application in gaming:", options: ["NPC behavior", "Graphics", "Sound", "Storage"], answer: 0 },
  { question: "Speech recognition is part of:", options: ["NLP", "CV", "ML", "DL"], answer: 0 },
  { question: "Image recognition is part of:", options: ["Computer Vision", "NLP", "Networking", "Cloud"], answer: 0 },
  { question: "Robotics uses:", options: ["AI", "ML", "Sensors", "All"], answer: 3 },
  { question: "AI improves productivity by:", options: ["Automation", "Speed", "Accuracy", "All"], answer: 3 },
  { question: "AI limitation includes:", options: ["Cost", "Complexity", "Lack of creativity", "All"], answer: 3 },
  { question: "Ethical issue in AI:", options: ["Bias", "Privacy", "Security", "All"], answer: 3 },
  { question: "Data privacy concern arises due to:", options: ["Data collection", "Storage", "Sharing", "All"], answer: 3 },
  { question: "AI bias occurs due to:", options: ["Biased data", "Model", "Algorithm", "All"], answer: 3 },
  { question: "Explainability in AI means:", options: ["Understanding model decisions", "Storage", "Speed", "Cost"], answer: 0 },
  { question: "Transparency in AI refers to:", options: ["Clear working", "Hidden process", "Storage", "Output"], answer: 0 },
  { question: "AI governance ensures:", options: ["Ethical use", "Safe use", "Controlled use", "All"], answer: 3 },
  { question: "AI regulation helps in:", options: ["Safety", "Privacy", "Ethics", "All"], answer: 3 },
  { question: "Future of AI includes:", options: ["Automation", "Intelligence", "Integration", "All"], answer: 3 },
  { question: "AI is used in:", options: ["Industry", "Healthcare", "Education", "All"], answer: 3 },
  { question: "ML model requires:", options: ["Data", "Algorithm", "Training", "All"], answer: 3 },
  { question: "Supervised learning uses:", options: ["Labeled data", "Unlabeled data", "Random data", "None"], answer: 0 },
  { question: "Unsupervised learning uses:", options: ["Labeled data", "Unlabeled data", "Structured data", "None"], answer: 1 },
  { question: "Reinforcement learning uses:", options: ["Rewards", "Penalties", "Feedback", "All"], answer: 3 },
  { question: "Classification predicts:", options: ["Category", "Value", "Data", "Speed"], answer: 0 },
  { question: "Regression predicts:", options: ["Value", "Category", "Data", "Output"], answer: 0 },
  { question: "Clustering groups:", options: ["Similar data", "Random data", "Output", "Storage"], answer: 0 },
  { question: "Decision tree is used for:", options: ["Classification", "Regression", "Both", "None"], answer: 2 },
  { question: "KNN stands for:", options: ["K-Nearest Neighbors", "Kernel Network Node", "Known Neural Net", "None"], answer: 0 },
  { question: "SVM stands for:", options: ["Support Vector Machine", "Storage Vector Model", "System Vector Machine", "None"], answer: 0 },
  { question: "Neural network training involves:", options: ["Forward pass", "Backward pass", "Optimization", "All"], answer: 3 },
  { question: "CNN is best for:", options: ["Image processing", "Text", "Audio", "Storage"], answer: 0 },
  { question: "RNN is best for:", options: ["Sequence data", "Image", "Storage", "Network"], answer: 0 },
  { question: "LSTM is type of:", options: ["RNN", "CNN", "SVM", "KNN"], answer: 0 },
  { question: "Generative AI creates:", options: ["Text", "Image", "Audio", "All"], answer: 3 },
  { question: "ChatGPT is example of:", options: ["Generative AI", "ML", "DL", "All"], answer: 3 },
  { question: "AI security protects against:", options: ["Attacks", "Threats", "Risks", "All"], answer: 3 },
  { question: "Cyber attack affects:", options: ["Data", "System", "Network", "All"], answer: 3 },
  { question: "AI-based attack uses:", options: ["Intelligence", "Automation", "Data", "All"], answer: 3 },
  { question: "Deep learning requires:", options: ["Large data", "High computation", "Time", "All"], answer: 3 },
  { question: "Model evaluation uses:", options: ["Accuracy", "Precision", "Recall", "All"], answer: 3 },
  { question: "Precision measures:", options: ["Correct positive", "Error", "Output", "Speed"], answer: 0 },
  { question: "Recall measures:", options: ["Detection rate", "Speed", "Storage", "Output"], answer: 0 },
  { question: "F1 score combines:", options: ["Precision & Recall", "Accuracy", "Speed", "Cost"], answer: 0 },
  { question: "Overfitting solution:", options: ["Regularization", "Dropout", "More data", "All"], answer: 3 },
  { question: "Underfitting solution:", options: ["Increase complexity", "More training", "Better features", "All"], answer: 3 },
  { question: "Feature engineering improves:", options: ["Model performance", "Speed", "Storage", "Cost"], answer: 0 },
  { question: "Data preprocessing includes:", options: ["Cleaning", "Normalization", "Encoding", "All"], answer: 3 },
  { question: "AI model deployment means:", options: ["Using model in real world", "Training", "Testing", "Storage"], answer: 0 },
  { question: "Edge AI runs on:", options: ["Devices", "Cloud", "Server", "Network"], answer: 0 },
  { question: "Cloud AI runs on:", options: ["Server", "Device", "Storage", "Network"], answer: 0 },
  { question: "AI lifecycle includes:", options: ["Data", "Model", "Deployment", "All"], answer: 3 },
  { question: "Data labeling is used in:", options: ["Supervised learning", "Unsupervised", "Reinforcement", "None"], answer: 0 },
  { question: "Big data helps AI by:", options: ["Providing data", "Improving model", "Accuracy", "All"], answer: 3 },
  { question: "AI system requires:", options: ["Hardware", "Software", "Data", "All"], answer: 3 },
  { question: "AI improves decision making by:", options: ["Data analysis", "Prediction", "Automation", "All"], answer: 3 },
  { question: "AI reduces:", options: ["Human effort", "Time", "Error", "All"], answer: 3 },
  { question: "AI challenges include:", options: ["Bias", "Cost", "Ethics", "All"], answer: 3 },
  { question: "Responsible AI ensures:", options: ["Fairness", "Transparency", "Accountability", "All"], answer: 3 },
  { question: "AI tools include:", options: ["TensorFlow", "PyTorch", "Scikit-learn", "All"], answer: 3 },
  { question: "Data science includes:", options: ["Statistics", "Programming", "Domain knowledge", "All"], answer: 3 },
  { question: "AI future trend includes:", options: ["Automation", "Robotics", "Intelligence", "All"], answer: 3 },
  { question: "AI enhances:", options: ["Efficiency", "Productivity", "Accuracy", "All"], answer: 3 },
  { question: "AI replaces:", options: ["Manual work", "Human thinking", "Creativity", "All"], answer: 0 },
  { question: "AI system learns from:", options: ["Data", "Experience", "Feedback", "All"], answer: 3 },
  { question: "Intelligent agent perceives:", options: ["Environment", "Data", "Output", "Storage"], answer: 0 },
  { question: "Agent acts using:", options: ["Actuators", "Sensors", "Data", "Network"], answer: 0 },
  { question: "Rational agent chooses:", options: ["Best action", "Random action", "Slow action", "Wrong action"], answer: 0 },
  { question: "AI goal is:", options: ["Solve problems", "Automate tasks", "Improve efficiency", "All"], answer: 3 }
];

const unit2Questions = [
  { question: "What is the full form of IoT?", options: ["Internet of Technology", "Internet of Things", "Interconnection of Things", "Input of Things"], answer: 1 },
  { question: "Who coined the term \"Internet of Things\"?", options: ["Kevin Ashton", "Alan Turing", "John McCarthy", "Tim Berners-Lee"], answer: 0 },
  { question: "IoT is best defined as:", options: ["A network of computers only", "A network of physical objects embedded with sensors, software, and other technologies to exchange data", "Software to browse the internet", "A wireless fidelity network"], answer: 1 },
  { question: "Which of the following is NOT a fundamental characteristic of IoT?", options: ["Connectivity", "Dynamic Nature", "Static data processing", "Enormous Scale"], answer: 2 },
  { question: "The \"Things\" in IoT refers to:", options: ["Only smartphones", "Physical objects with unique identifiers and data transfer capability", "Only servers", "Only sensors"], answer: 1 },
  { question: "Which feature of IoT allows devices to dynamically adapt to changing contexts?", options: ["Ambiguity", "Dynamic Nature", "Complexity", "Heterogeneity"], answer: 1 },
  { question: "\"Heterogeneity\" in IoT means:", options: ["Devices from different platforms can interact with each other", "All devices must be from the same manufacturer", "All devices must use the same OS", "Devices cannot communicate"], answer: 0 },
  { question: "Which is a major application domain of IoT?", options: ["Smart Cities", "Healthcare (IoMT)", "Agriculture", "All of the above"], answer: 3 },
  { question: "Smart Homes primarily use IoT for:", options: ["Automation and Energy Efficiency", "Creating documents", "Web hosting", "Graphic design"], answer: 0 },
  { question: "In IoT, what does \"Sensing\" imply?", options: ["Creating data", "Detecting changes in the environment", "Ignoring inputs", "Sleeping"], answer: 1 },
  { question: "Which is a limitation of IoT?", options: ["Automation", "Security and Privacy", "Data Access", "Efficiency"], answer: 1 },
  { question: "What does \"IIoT\" stand for?", options: ["Internal Internet of Things", "Industrial Internet of Things", "Intelligent Internet of Things", "International Internet of Things"], answer: 1 },
  { question: "Which improves quality of life in Smart Cities using IoT?", options: ["Smart Traffic Management", "Smart Waste Management", "Smart Street Lighting", "All of the above"], answer: 3 },
  { question: "The \"Unique Identity\" feature ensures:", options: ["Every object has a unique IP/URI", "Objects look different", "Same name for all objects", "Objects are expensive"], answer: 0 },
  { question: "IoT promotes \"Machine-to-Machine (M2M)\" communication. What does this mean?", options: ["Humans talking to machines", "Devices communicating without human interaction", "Machines typing", "Humans sending emails"], answer: 1 },
  { question: "\"Physical Design\" of IoT refers to:", options: ["Software algorithms", "IoT devices and protocols", "Cloud servers", "User interfaces"], answer: 1 },
  { question: "Which is a component of an IoT Node?", options: ["Processor", "Sensor/Actuator", "Communication Module", "All of the above"], answer: 3 },
  { question: "\"Logical Design\" of IoT refers to:", options: ["Hardware circuits", "Abstract representation of entities and processes", "Power supply", "Plastic casing"], answer: 1 },
  { question: "Which is NOT a standard IoT communication model?", options: ["Request-Response", "Publish-Subscribe", "Push-Pull", "Stop-Wait"], answer: 3 },
  { question: "In Request-Response model:", options: ["Client sends request, server responds", "Server sends without request", "Data is pushed to queue", "Devices communicate in pairs only"], answer: 0 },
  { question: "In Publish-Subscribe model:", options: ["Publishers send to topics; consumers subscribe", "Client requests data", "Synchronous communication", "Always client-led"], answer: 0 },
  { question: "Which model uses queue-based communication?", options: ["Request-Response", "Push-Pull", "Exclusive Pair", "REST"], answer: 1 },
  { question: "REST APIs use which protocol?", options: ["MQTT", "HTTP/HTTPS", "CoAP", "Zigbee"], answer: 1 },
  { question: "WebSocket APIs are preferred for:", options: ["Static content", "Full-duplex real-time communication", "Unidirectional communication", "Offline processing"], answer: 1 },
  { question: "Bottom-most layer in 3-layer IoT architecture:", options: ["Network", "Perception", "Application", "Business"], answer: 1 },
  { question: "Function of Perception Layer:", options: ["Transmit data", "Process data", "Gather data using sensors", "Display data"], answer: 2 },
  { question: "Network Layer is responsible for:", options: ["Sensing", "Data transmission", "Business decisions", "Storage"], answer: 1 },
  { question: "In 5-layer IoT, which layer manages processing?", options: ["Perception", "Transport", "Middleware", "Business"], answer: 2 },
  { question: "Which layer interacts with end-user?", options: ["Perception", "Network", "Application", "Processing"], answer: 2 },
  { question: "REST APIs follow which style?", options: ["Stateful", "Stateless", "Connected", "Complex"], answer: 1 },
  { question: "A \"Sensor\" is a device that:", options: ["Performs physical action", "Detects changes and converts to signals", "Processes data", "Connects to cloud"], answer: 1 },
  { question: "An \"Actuator\" is a device that:", options: ["Senses temperature", "Converts signal into physical action", "Stores data", "Acts as router"], answer: 1 },
  { question: "Example of Sensor:", options: ["DC Motor", "LED", "Thermistor", "Stepper Motor"], answer: 2 },
  { question: "Example of Actuator:", options: ["LDR", "Accelerometer", "Servo Motor", "Microphone"], answer: 2 },
  { question: "Passive Sensor:", options: ["Needs external power", "Uses energy from environment", "Generates output only", "Cannot measure"], answer: 1 },
  { question: "Detect presence without contact:", options: ["Proximity Sensor", "Temperature Sensor", "Humidity Sensor", "Gas Sensor"], answer: 0 },
  { question: "Accelerometer measures:", options: ["Speed of light", "Acceleration", "Sound", "Humidity"], answer: 1 },
  { question: "Distance measurement sensor:", options: ["Ultrasonic", "Gas", "Smoke", "pH"], answer: 0 },
  { question: "Relay is used to:", options: ["Measure voltage", "Switch circuits", "Sense light", "Store code"], answer: 1 },
  { question: "Air quality sensor:", options: ["Gas Sensor", "Touch Sensor", "Gyroscope", "Pressure Sensor"], answer: 0 },
  { question: "Solenoid is a:", options: ["Linear Actuator", "Sensor", "Protocol", "Microcontroller"], answer: 0 },
  { question: "Digital sensor output:", options: ["Continuous voltage", "Discrete signals", "Analog waves", "Motion"], answer: 1 },
  { question: "Converts analog to digital:", options: ["DAC", "ADC", "PWM", "UART"], answer: 1 },
  { question: "Role of microcontroller:", options: ["Sense environment", "Process data and control actuators", "Motor", "Generate electricity"], answer: 1 },
  { question: "LDR stands for:", options: ["Light Dependent Resistor", "Long Distance Router", "Low Data Rate", "Light Radar"], answer: 0 },
  { question: "Which generation supports Massive MTC?", options: ["2G", "3G", "4G", "5G"], answer: 3 },
  { question: "Key feature of 5G:", options: ["High latency", "Ultra-low latency & high speed", "Analog voice only", "Low bandwidth"], answer: 1 },
  { question: "Latency means:", options: ["Download speed", "Time delay", "Number of devices", "Battery life"], answer: 1 },
  { question: "Critical feature for autonomous vehicles:", options: ["High data rate", "URLLC", "Connectivity", "Voice clarity"], answer: 1 },
  { question: "NGN stands for:", options: ["New Generation Node", "Next Generation Network", "Network Gateway Node", "None"], answer: 1 },
  { question: "NGN is primarily a ______-based network.", options: ["Circuit-switched", "Packet-based", "Analog", "Satellite-only"], answer: 1 },
  { question: "The NGN architecture is divided into which two main layers?", options: ["Physical and Data Link", "Transport Stratum and Service Stratum", "Network and Application", "Hardware and Software"], answer: 1 },
  { question: "In NGN, the \"Transport Stratum\" is responsible for:", options: ["Creating content", "Connectivity and transport of information", "Managing user accounts", "Hosting services"], answer: 1 },
  { question: "In NGN, the \"Service Stratum\" is responsible for:", options: ["Physical cabling", "IP addressing only", "Application services and session control", "Signal modulation"], answer: 2 },
  { question: "Which component converts media streams between different network types in NGN?", options: ["Media Gateway Controller (MGC)", "Media Gateway (MG)", "Application Server (AS)", "Router"], answer: 1 },
  { question: "What is the function of the Media Gateway Controller (MGC) or Softswitch?", options: ["Physically convert signals", "Control Media Gateways and manage call signaling/logic", "Host websites", "Store passwords"], answer: 1 },
  { question: "The \"Application Server\" (AS) in NGN:", options: ["Converts analog to digital", "Executes service logic and hosts value-added services", "Routes packets", "Connects wires"], answer: 1 },
  { question: "Why is NGN important for IoT?", options: ["Separates service provision from transport, enabling flexibility", "It is older and stable", "Uses only wired communication", "Blocks internet access"], answer: 0 },
  { question: "5G enables \"Network Slicing\". What is it?", options: ["Cutting physical cables", "Creating multiple virtual networks on one infrastructure", "Reducing speed", "Dividing internet"], answer: 1 },
  { question: "Which application benefits from 5G Massive IoT?", options: ["Streaming movies", "Smart Agriculture with many sensors", "Phone calls", "SMS"], answer: 1 },
  { question: "Role of Cloud Computing in IoT:", options: ["Sense data", "Provide storage and processing power", "Consume power", "Act as sensor"], answer: 1 },
  { question: "In Cloud IoT, the \"Gateway\" acts as:", options: ["Bridge between devices and cloud", "Storage unit", "Display screen", "Power source"], answer: 0 },
  { question: "Advantage of Cloud in IoT:", options: ["High latency", "Scalability and cost-effectiveness", "Limited access", "Local processing only"], answer: 1 },
  { question: "Where does Data Analytics primarily happen?", options: ["Sensor", "Cloud", "Wire", "Switch"], answer: 1 },
  { question: "SaaS stands for:", options: ["Software as a Service", "Sensor as a System", "Storage as a Service", "Security as a Standard"], answer: 0 },
  { question: "PaaS stands for:", options: ["Platform as a Service", "Product as a Service", "Protocol as a Standard", "Power as a Supply"], answer: 0 },
  { question: "IaaS stands for:", options: ["Internet as a Service", "Infrastructure as a Service", "IoT as a Standard", "Intelligence as a System"], answer: 1 },
  { question: "Which component sends data to cloud?", options: ["Sensor", "Microcontroller with communication module", "Battery", "LED"], answer: 1 },
  { question: "Dashboard in IoT cloud platform:", options: ["Hardware casing", "Interface to visualize/control data", "Power switch", "Terminal"], answer: 1 },
  { question: "Popular cloud platforms for IoT:", options: ["AWS IoT Core", "Microsoft Azure IoT", "Google Cloud IoT", "All of the above"], answer: 3 },
  { question: "Fog vs Edge vs Cloud difference:", options: ["Processing near source vs centralized", "Slower processing", "Uses more water", "No internet"], answer: 0 },
  { question: "Why use Edge Computing?", options: ["Increase latency", "Reduce latency and bandwidth", "Cloud is full", "Cheaper devices"], answer: 1 },
  { question: "Data flow in IoT Cloud architecture:", options: ["Cloud → Sensor", "Sensor → Gateway → Internet → Cloud", "Internet → Gateway → Sensor", "Gateway → Sensor → Cloud"], answer: 1 },
  { question: "What is Big Data?", options: ["Data physically large", "Extremely large datasets for analysis", "Very relevant data", "Capital letters"], answer: 1 },
  { question: "Biggest issue in IoT Cloud:", options: ["Speed", "Security and Privacy", "UI color", "Font size"], answer: 1 },
  { question: "NOT a layer in 3-layer IoT architecture:", options: ["Perception", "Network", "Transport", "Application"], answer: 2 },
  { question: "Zigbee, Bluetooth, Z-Wave are:", options: ["Cloud platforms", "Wireless communication protocols", "Sensors", "Actuators"], answer: 1 },
  { question: "MQTT is based on:", options: ["Request-Response", "Publish-Subscribe", "Push-Pull", "Exclusive Pair"], answer: 1 },
  { question: "5G feature for Smart Grid:", options: ["High bandwidth", "Low latency", "Mobility", "Roaming"], answer: 1 },
  { question: "Separation of control and forwarding is:", options: ["SDN", "Sensors", "Hard drives", "Monitors"], answer: 0 },
  { question: "Smart waste bin sensor:", options: ["Temperature", "Ultrasonic/Level", "Accelerometer", "Microphone"], answer: 1 },
  { question: "Lightweight IoT protocol:", options: ["HTTP", "MQTT/CoAP", "FTP", "Telnet"], answer: 1 },
  { question: "User profile in NGN is managed by:", options: ["Physical wire", "Application Server / Database (HSS)", "Sensor", "User"], answer: 1 },
  { question: "Function of Gateway in NGN:", options: ["Stop traffic", "Interface between networks", "Display images", "Record audio"], answer: 1 },
  { question: "Importance of IPv6 in IoT:", options: ["Faster than IPv4", "Large address space", "Cheaper", "Wireless"], answer: 1 },
  { question: "Scalability in IoT means:", options: ["Handle growth of devices/workload", "Weight system", "Small system", "Fixed size"], answer: 0 },
  { question: "Example of Physical Design element:", options: ["WebSocket API", "RJ45 Connector / Antenna", "HTTP Protocol", "JSON"], answer: 1 },
  { question: "Example of Analog sensor:", options: ["Switch", "Thermocouple", "Push Button", "Counter"], answer: 1 },
  { question: "Sleep mode in IoT devices is used to:", options: ["Hide data", "Conserve battery", "Avoid hackers", "Reset"], answer: 1 },
  { question: "Interoperability challenge in IoT:", options: ["Too many standards/protocols", "Devices cheap", "Internet slow", "Sensors small"], answer: 0 },
  { question: "Firmware is:", options: ["Hardware", "Permanent software in ROM", "Cloud software", "Manual"], answer: 1 },
  { question: "OTA stands for:", options: ["Over The Air", "On The Air", "Over The Application", "On The Access"], answer: 0 },
  { question: "Smart Thermostat is example of:", options: ["IIoT", "Consumer IoT", "Military IoT", "Industrial IoT"], answer: 1 },
  { question: "Middleware layer is:", options: ["Hardware", "Processing layer", "User layer", "Battery layer"], answer: 1 },
  { question: "NGN signaling handled by:", options: ["Media Gateway", "Media Gateway Controller", "Switch", "Hub"], answer: 1 },
  { question: "eMBB stands for:", options: ["Enhanced Mobile Broadband", "Extra Mobile Big Band", "Machine Broadband", "Base Band"], answer: 0 },
  { question: "Digital Twins are:", options: ["Two sensors", "Virtual replica of physical device", "Backup battery", "Copy of user"], answer: 1 },
  { question: "Sensor for rotation/orientation:", options: ["Gyroscope", "Thermometer", "Barometer", "Lux Meter"], answer: 0 },
  { question: "RFID stands for:", options: ["Radio Frequency Identification", "Radio Frequency Internet Data", "Remote Frequency ID", "Random Frequency ID"], answer: 0 },
  { question: "Soil Moisture Sensor helps in:", options: ["Detecting thieves", "Automating irrigation", "Measuring wind", "Counting plants"], answer: 1 }
];

const unit3Questions = [
  { question: "Which of the following best defines Blockchain technology?", options: ["A centralized database managed by a single administrator", "A distributed, decentralized, and immutable digital ledger", "A programming language used for web development", "An operating system for mobile devices"], answer: 1 },
  { question: "Who is credited with inventing the first functioning blockchain (Bitcoin)?", options: ["Vitalik Buterin", "Elon Musk", "Satoshi Nakamoto", "Nick Szabo"], answer: 2 },
  { question: "What does \"DLT\" stand for in blockchain?", options: ["Digital Ledger Technology", "Distributed Ledger Technology", "Decentralized Link Transfer", "Data Link Technology"], answer: 1 },
  { question: "Which is NOT a key feature of Blockchain?", options: ["Decentralization", "Immutability", "Transparency", "Centralized Authority"], answer: 3 },
  { question: "\"Decentralization\" means:", options: ["Data stored in one central server", "Control distributed across network nodes", "Network controlled by government", "Data cannot be accessed"], answer: 1 },
  { question: "\"Immutability\" refers to:", options: ["Data can be changed anytime", "Data cannot be altered once recorded", "Blockchain deletes old data automatically", "Network speed is constant"], answer: 1 },
  { question: "Transparency in public blockchain means:", options: ["Passwords are visible", "All participants can view transaction history", "Hardware is transparent", "Only admin can view data"], answer: 1 },
  { question: "In traditional centralized systems, who controls the database?", options: ["All users", "Central authority", "No one", "Miners"], answer: 1 },
  { question: "Major drawback of centralized systems:", options: ["Single point of failure", "Too much transparency", "Immutability", "Lack of administrators"], answer: 0 },
  { question: "Blockchain solves single point of failure by:", options: ["Using a central server", "Replicating ledger across nodes", "Hiding server locations", "Not storing data"], answer: 1 },
  { question: "Traditional banking cross-border transfer requires:", options: ["No intermediaries", "Multiple intermediaries", "Mining", "Smart contracts"], answer: 1 },
  { question: "If someone alters a block:", options: ["Admin approves", "Hash changes and invalidates chain", "Account deleted", "System updates automatically"], answer: 1 },
  { question: "Blockchain eliminates need for \"Trust\" -> called:", options: ["Trust-heavy", "Trustless", "Trusted", "Trust-dependent"], answer: 1 },
  { question: "Traditional DB uses CRUD, Blockchain uses:", options: ["Create/Delete", "Read/Update", "Read/Write (Append-only)", "Update/Delete"], answer: 2 },
  { question: "First block is called:", options: ["Alpha Block", "Genesis Block", "Master Block", "Root Block"], answer: 1 },
  { question: "Consensus in centralized systems is done by:", options: ["Majority voting", "Central authority", "Cryptographic puzzle", "Lottery system"], answer: 1 },
  { question: "Blockchain security ensured by:", options: ["HTTP", "Cryptography", "HTML", "SQL"], answer: 1 },
  { question: "Append-only nature means:", options: ["Only new data added", "Data overwritten", "Attach notes only", "Modify blocks anytime"], answer: 0 },
  { question: "Intermediary role:", options: ["Provide internet", "Notify users & settle transaction", "Mine crypto", "Write contracts"], answer: 1 },
  { question: "P2P transactions mean:", options: ["Central hub needed", "Direct transactions without intermediaries", "Same age users only", "Free transactions"], answer: 1 },
  { question: "Components of a block include:", options: ["IP, MAC", "Data, Hash, Previous Hash", "Sender info only", "Password"], answer: 1 },
  { question: "Unique fingerprint of block:", options: ["Timestamp", "Hash", "Nonce", "IP address"], answer: 1 },
  { question: "Hash algorithm in Bitcoin:", options: ["MD5", "SHA-1", "SHA-256", "RSA"], answer: 2 },
  { question: "Previous hash purpose:", options: ["Link blocks securely", "Store passwords", "Compress data", "Delete transactions"], answer: 0 },
  { question: "Computer in blockchain network:", options: ["Server", "Node", "Router", "Switch"], answer: 1 },
  { question: "A nonce in proof-of-work is:", options: ["A random number tried to satisfy hash condition", "A user password", "A wallet key", "A network cable"], answer: 0 },
  { question: "Merkle tree in blockchain is used for:", options: ["Efficient transaction verification", "IP routing", "Data compression only", "User authentication"], answer: 0 },
  { question: "A blockchain fork occurs when:", options: ["Chain splits into different paths", "Mining stops forever", "All nodes disconnect", "Wallet is deleted"], answer: 0 },
  { question: "Soft fork is generally:", options: ["Backward compatible", "Never compatible", "Always hard reset", "A network attack"], answer: 0 },
  { question: "Hard fork is generally:", options: ["Backward incompatible protocol change", "A minor UI change", "A wallet backup", "An encryption key"], answer: 0 },
  { question: "Types of blockchain:", options: ["Local, Global", "Public, Private, Consortium, Hybrid", "SQL, NoSQL", "Alpha, Beta"], answer: 1 },
  { question: "Public blockchain is:", options: ["Permissioned", "Permissionless", "Centralized", "Private DB"], answer: 1 },
  { question: "Public blockchain feature:", options: ["Restricted access", "Open participation", "Company controlled", "Private transactions"], answer: 1 },
  { question: "Bitcoin & Ethereum are:", options: ["Private", "Public", "Consortium", "Centralized"], answer: 1 },
  { question: "Private blockchain is typically:", options: ["Managed by one organization", "Open to everyone without control", "Always anonymous", "Only for gaming"], answer: 0 },
  { question: "Consortium blockchain is controlled by:", options: ["Single person", "Group of organizations", "Only miners", "Government only"], answer: 1 },
  { question: "Hybrid blockchain combines:", options: ["Public and private characteristics", "Only SQL and NoSQL", "Web and mobile apps", "LAN and WAN"], answer: 0 },
  { question: "Permissioned blockchain requires:", options: ["Authorized participants", "No identity checks", "No network rules", "Public mining"], answer: 0 },
  { question: "Permissionless blockchain allows:", options: ["Anyone can join and validate", "Only company employees", "Only paid users", "Only admins"], answer: 0 },
  { question: "Consensus mechanism PoW stands for:", options: ["Proof of Work", "Power of Web", "Process of Wallet", "Proof of Write"], answer: 0 },
  { question: "Consensus mechanism PoS stands for:", options: ["Proof of Stake", "Power of Storage", "Process of Security", "Proof of System"], answer: 0 },
  { question: "In PoS, validators are typically selected based on:", options: ["Amount of stake", "CPU speed only", "Internet provider", "Random username"], answer: 0 },
  { question: "Mining is primarily associated with:", options: ["Proof of Work", "Proof of Stake", "Delegated voting only", "Private cloud"], answer: 0 },
  { question: "A blockchain wallet is used to:", options: ["Store private/public keys", "Store all blockchain data", "Host a web server", "Compile smart contracts"], answer: 0 },
  { question: "Private key should be:", options: ["Kept secret", "Shared publicly", "Posted online", "Sent in email"], answer: 0 },
  { question: "Public key is used to:", options: ["Receive funds / verify signatures", "Reveal private seed", "Mine faster", "Store passwords"], answer: 0 },
  { question: "Digital signature ensures:", options: ["Authenticity and integrity", "Only compression", "Only speed", "Only privacy"], answer: 0 },
  { question: "Double spending means:", options: ["Spending same digital token more than once", "Paying double tax", "Using two wallets", "Sending two emails"], answer: 0 },
  { question: "Consensus helps prevent:", options: ["Conflicting ledger states", "Mobile battery drain", "UI errors", "Screen flicker"], answer: 0 },
  { question: "Blockchain in finance helps by:", options: ["Slowing transactions", "Removing intermediaries", "Hiding data", "Making banking physical"], answer: 1 },
  { question: "Supply chain use:", options: ["Design products", "Track origin and transparency", "Delivery trucks", "Pricing"], answer: 1 },
  { question: "Healthcare use:", options: ["Erasing records", "Secure EHR sharing", "Replace doctors", "Generate medicines"], answer: 1 },
  { question: "Blockchain in voting can improve:", options: ["Auditability and trust", "Vote buying", "Manual counting errors", "Paper wastage only"], answer: 0 },
  { question: "Blockchain for identity management enables:", options: ["Self-sovereign identity", "Central password sharing", "No authentication", "Duplicate profiles"], answer: 0 },
  { question: "NFT stands for:", options: ["Non-Fungible Token", "Network Function Transfer", "Node File Type", "New Finance Token"], answer: 0 },
  { question: "A fungible asset is:", options: ["Interchangeable with same value units", "Always unique", "Always physical", "Never tradable"], answer: 0 },
  { question: "Stablecoin aims to:", options: ["Reduce volatility by pegging value", "Increase randomness", "Replace internet", "Remove wallets"], answer: 0 },
  { question: "CBDC refers to:", options: ["Central Bank Digital Currency", "Crypto Bank Data Chain", "Centralized Blockchain Database Coin", "Core Banking Data Coin"], answer: 0 },
  { question: "DeFi stands for:", options: ["Decentralized Finance", "Defined File", "Digital Federation", "Default Finance"], answer: 0 },
  { question: "DEX stands for:", options: ["Decentralized Exchange", "Data Export", "Distributed Extension", "Digital Executor"], answer: 0 },
  { question: "Smart contract is:", options: ["Legal agreement", "Self-executing program on blockchain", "Human negotiator", "AI writing docs"], answer: 1 },
  { question: "Smart contract concept by:", options: ["Satoshi", "Nick Szabo", "Vitalik", "Hal Finney"], answer: 1 },
  { question: "Platform for smart contracts:", options: ["Bitcoin", "Ethereum", "Litecoin", "Dogecoin"], answer: 1 },
  { question: "Ethereum language:", options: ["Python", "Java", "Solidity", "C++"], answer: 2 },
  { question: "Gas in Ethereum refers to:", options: ["Transaction computation fee unit", "Fuel for mining rigs", "Wallet password", "Block size"], answer: 0 },
  { question: "DAO stands for:", options: ["Decentralized Autonomous Organization", "Data Access Object", "Distributed Admin Office", "Digital Asset Order"], answer: 0 },
  { question: "An oracle in blockchain provides:", options: ["External real-world data to smart contracts", "Wallet backup", "Mining hardware", "Network encryption"], answer: 0 },
  { question: "Token standard ERC-20 is mainly for:", options: ["Fungible tokens", "NFT images only", "Wallet encryption", "Node authentication"], answer: 0 },
  { question: "Token standard ERC-721 is mainly for:", options: ["Non-fungible tokens", "Stablecoins only", "Consensus", "Cloud storage"], answer: 0 },
  { question: "Common blockchain explorer use:", options: ["View transactions and blocks", "Mine coins", "Store private keys", "Edit smart contracts directly"], answer: 0 },
  { question: "51% attack means attacker controls:", options: ["Majority network hashing/validation power", "More than half user accounts", "All wallets", "All exchanges"], answer: 0 },
  { question: "Sybil attack involves:", options: ["Creating many fake identities/nodes", "Stealing one wallet", "Changing hash algorithm", "Stopping internet"], answer: 0 },
  { question: "Replay attack can happen when:", options: ["Transaction valid on two chains", "Wallet is offline", "Node restarts", "Database backup fails"], answer: 0 },
  { question: "Cold wallet is:", options: ["Offline storage of keys", "A broken wallet", "Cloud wallet only", "A hardware miner"], answer: 0 },
  { question: "Hot wallet is:", options: ["Internet-connected wallet", "Paper wallet only", "Air-gapped wallet", "Read-only wallet"], answer: 0 },
  { question: "Scalability means:", options: ["TPS limitation", "Security", "Password issue", "Wallet issue"], answer: 0 },
  { question: "Blockchain trilemma:", options: ["Speed, Cost, Graphics", "Decentralization, Security, Scalability", "Privacy, Transparency", "Mining, Staking"], answer: 1 },
  { question: "PoW criticism:", options: ["Lack of security", "High energy consumption", "High speed", "Centralization"], answer: 1 },
  { question: "Layer-2 solutions are used to:", options: ["Improve scalability and lower fees", "Delete blocks", "Remove cryptography", "Replace wallets"], answer: 0 },
  { question: "Lightning Network is mainly associated with:", options: ["Bitcoin scaling", "Ethereum virtual machine", "Private consortium chain", "IP routing"], answer: 0 },
  { question: "Sharding aims to:", options: ["Split workload across partitions", "Merge all blocks into one", "Disable consensus", "Increase centralization"], answer: 0 },
  { question: "Interoperability in blockchain refers to:", options: ["Different chains communicating", "Only one chain usage", "Same wallet password", "Same mining pool"], answer: 0 },
  { question: "Governance in blockchain includes:", options: ["Decision-making on protocol upgrades", "Only wallet creation", "Only mining rewards", "Only token listing"], answer: 0 },
  { question: "On-chain governance means:", options: ["Voting executed directly on blockchain", "Manual email voting", "No voting", "Only admin decision"], answer: 0 },
  { question: "Off-chain governance means:", options: ["Discussions/decisions outside protocol execution", "Voting by smart contract only", "No community input", "Wallet backup"], answer: 0 },
  { question: "KYC stands for:", options: ["Know Your Customer", "Keep Your Coin", "Key Yield Certificate", "Knowledge Yield Chain"], answer: 0 },
  { question: "AML stands for:", options: ["Anti-Money Laundering", "Automated Market Logic", "Asset Mapping Ledger", "Advanced Mining Layer"], answer: 0 },
  { question: "A blockchain timestamp mainly indicates:", options: ["When block was created", "User timezone", "Wallet balance", "Gas price"], answer: 0 },
  { question: "Nonce is adjusted in PoW to:", options: ["Find valid hash under difficulty", "Store transaction IDs", "Generate private keys", "Set wallet pin"], answer: 0 },
  { question: "Difficulty in PoW affects:", options: ["How hard it is to mine a block", "Wallet UI color", "Network name", "Token symbol"], answer: 0 },
  { question: "Block reward is:", options: ["Incentive for validator/miner", "A user fine", "Exchange fee", "Wallet password"], answer: 0 },
  { question: "Transaction fee encourages:", options: ["Inclusion/processing of transactions", "Data deletion", "Double spending", "Central control"], answer: 0 },
  { question: "Mempool stores:", options: ["Pending unconfirmed transactions", "Private keys", "Consensus algorithm code", "Node hardware info"], answer: 0 },
  { question: "Blockchain explorer can show:", options: ["Block height", "Transaction status", "Wallet addresses", "All of the above"], answer: 3 },
  { question: "Cold-starting a node means:", options: ["Syncing blockchain data from network", "Formatting hard disk", "Resetting passwords", "Closing wallet"], answer: 0 },
  { question: "A full node typically:", options: ["Validates entire blockchain rules", "Only stores wallet UI", "Only mines", "Cannot verify transactions"], answer: 0 },
  { question: "A light node typically:", options: ["Uses simplified verification with less storage", "Stores full chain always", "Runs mining farm", "Acts as exchange"], answer: 0 },
  { question: "Finality in blockchain refers to:", options: ["Confidence transaction cannot be reversed", "Wallet backup complete", "Network shutdown", "Token burn"], answer: 0 },
  { question: "Fork choice rule helps nodes:", options: ["Select canonical chain", "Choose wallet password", "Set gas fees", "Register accounts"], answer: 0 },
  { question: "Byzantine fault tolerance addresses:", options: ["Consensus despite malicious/faulty nodes", "UI bugs only", "Storage corruption only", "Network cabling"], answer: 0 },
  { question: "Cryptographic hash output is typically:", options: ["Fixed-length digest", "Variable random text", "Plain database row", "Image file"], answer: 0 },
  { question: "Hash function is one-way means:", options: ["Hard to derive original input from hash", "Easy to reverse always", "Needs admin key", "Same as encryption"], answer: 0 },
  { question: "Difference: Blockchain vs Traditional DB:", options: ["Both same", "Blockchain decentralized, DB centralized", "No difference", "DB more secure"], answer: 1 },
  { question: "Ethereum upgrade for energy:", options: ["PoS -> PoW", "PoW -> PoS", "Stop mining", "Cloud adoption"], answer: 1 },
  { question: "If block altered:", options: ["Nothing happens", "Chain breaks due to hash mismatch", "Block removed", "Auto update"], answer: 1 },
  { question: "Hash function is:", options: ["Random address", "Mathematical algorithm converting input to fixed output", "Encryption method", "ID generator"], answer: 1 },
  { question: "Smart contract example sector:", options: ["Agriculture", "Insurance", "Gaming", "Education"], answer: 1 },
  { question: "In insurance, smart contracts can automate:", options: ["Claim settlement based on rules", "Physical form printing only", "Network routing", "Database indexing"], answer: 0 },
  { question: "Blockchain in education can verify:", options: ["Academic certificates", "Laptop battery", "Wi-Fi passwords", "Attendance sensors"], answer: 0 },
  { question: "Tokenization means:", options: ["Representing assets digitally on blockchain", "Compressing files", "Encrypting emails", "Formatting hard drive"], answer: 0 },
  { question: "Cross-chain bridge is used to:", options: ["Transfer value/data between blockchains", "Increase CPU speed", "Create smart contract language", "Replace wallets"], answer: 0 },
  { question: "Airdrop in crypto generally means:", options: ["Distributing tokens to users", "Deleting tokens", "Mining rewards only", "Wallet recovery"], answer: 0 },
  { question: "Staking reward is typically for:", options: ["Participating in PoS validation", "Printing paper wallets", "Using centralized SQL", "Reducing hash output"], answer: 0 },
  { question: "Custodial wallet means:", options: ["Third party controls keys", "User always controls keys", "No key exists", "Offline-only device"], answer: 0 },
  { question: "Non-custodial wallet means:", options: ["User controls private keys", "Exchange controls all keys", "No signatures needed", "Cloud-only login"], answer: 0 },
  { question: "Seed phrase is used for:", options: ["Wallet recovery", "Mining difficulty", "Consensus voting", "Gas optimization"], answer: 0 },
  { question: "Front-running in DeFi often means:", options: ["Transaction ordering exploitation", "Repairing smart contract bugs", "Cold wallet setup", "KYC verification"], answer: 0 },
  { question: "Rug pull risk is common in:", options: ["Unvetted token projects", "Official protocol upgrades", "Cold storage backups", "Hash functions"], answer: 0 },
  { question: "Audit in smart contracts helps:", options: ["Identify security vulnerabilities", "Increase block size", "Set exchange rates", "Create new wallets"], answer: 0 },
  { question: "Reentrancy is a smart contract vulnerability where:", options: ["External call re-enters before state update", "Hash becomes invalid", "Wallet loses internet", "Node shuts down"], answer: 0 },
  { question: "Oracle risk includes:", options: ["Incorrect external data affecting contracts", "Network cable damage", "Too many wallets", "UI color mismatch"], answer: 0 },
  { question: "Gas optimization in contracts aims to:", options: ["Reduce execution cost", "Increase latency", "Disable transactions", "Remove signatures"], answer: 0 },
  { question: "Event logs in Ethereum are useful for:", options: ["Tracking contract activity", "Mining new blocks", "Storing private keys", "Changing consensus"], answer: 0 },
  { question: "A transaction hash identifies:", options: ["A specific transaction record", "A wallet password", "A consensus node type", "A mining pool"], answer: 0 },
  { question: "Block height represents:", options: ["Position of block in chain", "Block size in bytes", "Node bandwidth", "Gas per transaction"], answer: 0 },
  { question: "Main goal of blockchain adoption in enterprises:", options: ["Shared trusted data among stakeholders", "Higher paper usage", "Manual approvals only", "Single-server lock-in"], answer: 0 },
  { question: "Best practice for private key safety:", options: ["Never share and keep secure backups", "Email it to friends", "Store in public repository", "Post online"], answer: 0 },
  { question: "A blockchain transaction is considered confirmed when:", options: ["Included in a validated block", "Typed in wallet form", "Saved in browser cache", "Printed on paper"], answer: 0 },
  { question: "Blockchain consensus mainly ensures:", options: ["All honest nodes agree on ledger state", "Only fastest node decides", "Only admin approves", "Transactions are hidden"], answer: 0 },
  { question: "In public chains, pseudonymity means:", options: ["Real identity hidden behind addresses", "No address exists", "Passwords are public", "Only admins can transact"], answer: 0 },
  { question: "A validator in PoS typically:", options: ["Proposes and validates blocks", "Designs user interfaces", "Runs SQL backups", "Creates web pages"], answer: 0 },
  { question: "Token burning generally means:", options: ["Permanently removing tokens from circulation", "Printing new tokens", "Moving tokens to exchange", "Splitting tokens"], answer: 0 },
  { question: "A genesis block has:", options: ["No previous hash reference", "Two previous hashes", "Random database ID", "User password"], answer: 0 },
  { question: "Replay protection in forks is used to:", options: ["Prevent same transaction being valid on both chains", "Increase mining speed", "Reduce wallet size", "Hide addresses"], answer: 0 },
  { question: "When network decentralization is high, it is generally:", options: ["Harder for single entity to control chain", "Easier to censor", "Less secure by default", "Centralized"], answer: 0 },
  { question: "Smart contract immutability implies:", options: ["Code is hard to change once deployed", "Code auto-edits daily", "No testing required", "Contracts cannot execute"], answer: 0 },
  { question: "Transaction throughput TPS means:", options: ["Transactions processed per second", "Total private signatures", "Token price spread", "Transfer protocol standard"], answer: 0 },
  { question: "A blockchain address is usually derived from:", options: ["Public key", "Private key directly shown", "Node password", "Database table"], answer: 0 },
  { question: "In enterprise blockchain, permissioning helps:", options: ["Restrict access to approved participants", "Remove all identity checks", "Make chain public only", "Disable consensus"], answer: 0 },
  { question: "Long-term blockchain adoption depends on:", options: ["Usability, regulation, and scalability improvements", "Only token price", "Only mining hardware", "Only faster browsers"], answer: 0 }
];

const unit4Questions = [
  { question: "What is the primary goal of Immersive Technology?", options: ["To increase the size of computer hardware", "To blur the line between the physical and digital world, creating a sense of presence", "To reduce internet speed", "To convert digital files into paper format"], answer: 1 },
  { question: "Which technology completely replaces the user's real-world environment with a simulated digital environment?", options: ["Augmented Reality (AR)", "Virtual Reality (VR)", "Mixed Reality (MR)", "Haptic Technology"], answer: 1 },
  { question: "Which technology overlays digital information onto the user's view of the real world?", options: ["Virtual Reality (VR)", "Quantum Computing", "Augmented Reality (AR)", "Green Computing"], answer: 2 },
  { question: "\"Pokemon GO\" and Snapchat filters are examples of which technology?", options: ["Virtual Reality", "Augmented Reality", "Haptic Technology", "Quantum Computing"], answer: 1 },
  { question: "What distinguishes Mixed Reality (MR) from Augmented Reality (AR)?", options: ["MR requires no screen", "In MR, digital and physical objects can co-exist and interact in real time", "MR is only used for video", "AR is fully immersive while MR is not"], answer: 1 },
  { question: "Microsoft HoloLens is a prominent example of a headset designed for:", options: ["Virtual Reality (VR)", "Mixed Reality (MR)", "Green Computing", "Pure Audio Streaming"], answer: 1 },
  { question: "What does the acronym XR stand for?", options: ["Extra Reality", "Extended Reality", "External Reality", "Extreme Reality"], answer: 1 },
  { question: "\"Extended Reality\" (XR) is best described as:", options: ["A completely new technology unrelated to AR or VR", "An umbrella term that encompasses VR, AR, MR, and all future realities", "A reality that only exists in quantum computers", "A type of computer monitor"], answer: 1 },
  { question: "Which technology simulates the sense of touch by applying forces, vibrations, or motions to the user?", options: ["Haptic Technology", "Optical Technology", "Acoustic Technology", "Quantum Technology"], answer: 0 },
  { question: "The vibration you feel when typing on your smartphone's virtual keyboard is a basic example of:", options: ["Virtual Reality", "Augmented Reality", "Haptic feedback", "Mixed Reality"], answer: 2 },
  { question: "In VR terminology, what does \"HMD\" stand for?", options: ["High Memory Device", "Head-Mounted Display", "Hardware Management Data", "Holographic Mixed Display"], answer: 1 },
  { question: "What does \"FOV\" stand for in the context of immersive technology headsets?", options: ["Frequency of Vision", "Field of View", "Focus of Virtual", "Frame of Video"], answer: 1 },
  { question: "A wider Field of View (FOV) in a VR headset generally results in:", options: ["Lower battery life only", "A more immersive experience for the user", "A completely flat 2D image", "Reduced color depth"], answer: 1 },
  { question: "In VR, what does \"3DoF\" mean?", options: ["3 Days of Frequency", "3 Degrees of Freedom (tracking rotational head movements: pitch, yaw, roll)", "3 Dimensions of Focus", "3 Displays of Frame"], answer: 1 },
  { question: "How does \"6DoF\" differ from \"3DoF\" in VR tracking?", options: ["6DoF tracks only eye movement", "6DoF adds translational tracking (moving forward/backward, up/down, left/right)", "6DoF requires 6 separate monitors", "6DoF uses 6 times more power"], answer: 1 },
  { question: "Which of the following is a common challenge experienced in Virtual Reality?", options: ["Improved eyesight", "Motion sickness (cybersickness)", "Increased internet speed", "Lower body temperature"], answer: 1 },
  { question: "In Augmented Reality, \"Marker-based AR\" requires:", options: ["A completely dark room", "A visual cue (QR code or image) to trigger digital overlay", "A VR headset", "Haptic gloves"], answer: 1 },
  { question: "\"Markerless AR\" uses device sensors to:", options: ["Overlay digital content without a visual marker", "Turn off the screen", "Make phone calls", "Print documents"], answer: 0 },
  { question: "\"Spatial Computing\" is closely associated with:", options: ["Virtual Reality", "Mixed Reality", "Desktop Computing", "Cloud Computing"], answer: 1 },
  { question: "In Mixed Reality, \"Occlusion\" refers to:", options: ["Battery drain", "Virtual objects being hidden behind real objects", "Audio delay", "Network failure"], answer: 1 },
  { question: "Which component is crucial for a smartphone to provide accurate AR experiences?", options: ["Floppy disk drive", "Camera and gyroscope/accelerometer", "High-capacity hard drive", "Ethernet port"], answer: 1 },
  { question: "\"Force feedback\" steering wheels used in racing simulators are an advanced application of:", options: ["AR", "VR", "Haptic Technology", "Green Computing"], answer: 2 },
  { question: "What type of actuator is commonly used to generate haptic vibrations in smartphones?", options: ["Nuclear reactor", "Eccentric Rotating Mass (ERM) or Linear Resonant Actuator (LRA)", "Turbine", "Diesel engine"], answer: 1 },
  { question: "A fully immersive VR system typically requires which of the following?", options: ["A standard desktop monitor", "An HMD, powerful computing hardware, and tracking sensors", "A smartphone only", "A pair of regular sunglasses"], answer: 1 },
  { question: "Which technology allows a surgeon to see a patient's CT scan digitally overlaid onto the patient's body during an operation?", options: ["Virtual Reality", "Augmented Reality / Mixed Reality", "Haptic Technology", "Quantum Computing"], answer: 1 },
  { question: "What does \"Presence\" mean in Virtual Reality?", options: ["The user's physical location", "The psychological feeling of \"being there\" in the virtual world", "The RAM size", "Number of users"], answer: 1 },
  { question: "The term \"Avatar\" refers to:", options: ["Computer virus", "Graphical representation of a user", "Hardware casing", "Power cable"], answer: 1 },
  { question: "\"Latency\" in VR refers to:", options: ["Delay between movement and display update", "Screen brightness", "Battery life", "Lens size"], answer: 0 },
  { question: "High latency results in:", options: ["Better graphics", "Motion sickness", "Lower power use", "Faster internet"], answer: 1 },
  { question: "\"Telepresence\" allows users to:", options: ["Delete files", "Feel present at a remote location", "Read faster", "Solve equations"], answer: 1 },
  { question: "Example of Optical See-Through device:", options: ["Oculus Quest", "Microsoft HoloLens / Google Glass", "Television", "Smartwatch"], answer: 1 },
  { question: "Example of Video See-Through AR device:", options: ["Transparent glasses", "Smartphone camera with AR overlay", "Complex headset", "Mechanical keyboard"], answer: 1 },
  { question: "CAVE system is:", options: ["Dark room", "Room with projected VR images", "Computer chip", "Cooling system"], answer: 1 },
  { question: "Refresh rate refers to:", options: ["Resolution", "Screen updates per second", "Internet speed", "Battery usage"], answer: 1 },
  { question: "High refresh rate helps:", options: ["Increase weight", "Reduce motion sickness", "Increase size", "Reduce audio"], answer: 1 },
  { question: "SLAM technology means:", options: ["Sending emails", "Simultaneous Localization and Mapping", "Synthesizing audio", "Securing login"], answer: 1 },
  { question: "Technology that allows feeling shape/resistance:", options: ["Vibrotactile", "Kinesthetic (force feedback)", "Thermal", "Visual"], answer: 1 },
  { question: "Ultrasonic haptics uses:", options: ["Laser beams", "Focused ultrasound waves", "Strings", "Water jets"], answer: 1 },
  { question: "A treadmill in VR is used for:", options: ["Charging battery", "Walking in virtual world physically", "Cooling system", "Typing"], answer: 1 },
  { question: "Metaverse relies on:", options: ["Floppy disks", "AR, VR, MR + Internet", "Chalkboards", "Analog phones"], answer: 1 },
  { question: "Limitation of VR/MR headsets:", options: ["Cheap", "Bulky hardware and battery issues", "No electricity needed", "No applications"], answer: 1 },
  { question: "Head tracking is achieved using:", options: ["Compass only", "IMUs + cameras/sensors", "Cable", "Microphone"], answer: 1 },
  { question: "Foveated rendering means:", options: ["Full quality everywhere", "High quality only where user looks", "Low resolution", "Black screen"], answer: 1 },
  { question: "Required for foveated rendering:", options: ["Microphone", "Eye tracking", "Keyboard", "Gloves"], answer: 1 },
  { question: "Immersion in VR measures:", options: ["Water depth", "System's ability to create realistic experience", "Price", "Battery"], answer: 1 },
  { question: "VR in healthcare is used for:", options: ["Physical surgery", "Training doctors", "Replacing medicines", "Cleaning hospitals"], answer: 1 },
  { question: "VR helps treat:", options: ["Blood pressure", "PTSD & phobias", "Viral infection", "Broken bones"], answer: 1 },
  { question: "AR in retail is used for:", options: ["Printing catalogs", "Try-before-you-buy", "Slower payments", "Closing stores"], answer: 1 },
  { question: "AR in automotive:", options: ["Replace wheel", "Heads-Up Display", "Remove fuel", "Paint cars"], answer: 1 },
  { question: "VR in real estate:", options: ["Build houses", "Virtual walkthroughs", "Sell land", "Replace construction"], answer: 1 },
  { question: "VR in military is used for:", options: ["Games", "Training simulations", "Tracking weather", "Designing clothes"], answer: 1 },
  { question: "AR in manufacturing is used for:", options: ["Replacing workers", "Step-by-step repair guidance", "Lighting", "Playing music"], answer: 1 },
  { question: "In education, immersive tech helps by:", options: ["Reading faster", "Virtual field trips & 3D learning", "Avoid exams", "Printing homework"], answer: 1 },
  { question: "Sector adopting VR earliest:", options: ["Agriculture", "Gaming & Entertainment", "Accounting", "Textile"], answer: 1 },
  { question: "MR in collaboration helps:", options: ["Prevent employees", "Virtual meetings with avatars", "Send text", "Block internet"], answer: 1 },
  { question: "VR game controllers provide:", options: ["4K display", "Haptic feedback", "Cloud storage", "Heart monitoring"], answer: 1 },
  { question: "AR smart glasses in logistics:", options: ["Movies", "Show package location", "Light packages", "Drive forklifts"], answer: 1 },
  { question: "VR tourism provides:", options: ["Airline tickets", "Virtual travel experiences", "Build hotels", "Create passports"], answer: 1 },
  { question: "AR virtual mirrors allow:", options: ["Try clothes digitally", "Chat", "Buy mirrors", "Fabric analysis"], answer: 0 },
  { question: "Best tech for remote assistance:", options: ["VR", "AR / MR", "Haptics", "Desktop"], answer: 1 },
  { question: "Haptic feedback in telesurgery is important because:", options: ["Plays music", "Allows surgeon to feel resistance", "Moves robot", "Charges battery"], answer: 1 },
  { question: "Immersive journalism:", options: ["Write articles", "360° news experience", "Print newspapers", "Replace journalists"], answer: 1 },
  { question: "VR in automotive design:", options: ["Paint cars", "Prototype designs", "Sell cars", "Build engines"], answer: 1 },
  { question: "AR museum app:", options: ["Replace artifacts", "Show overlays", "Lock doors", "Sell tickets"], answer: 1 },
  { question: "VR in sports training:", options: ["Replace exercise", "Practice game scenarios", "Design apparel", "Count crowd"], answer: 1 },
  { question: "Green computing means:", options: ["Green computers", "Eco-friendly computing", "Outdoor computing", "High power"], answer: 1 },
  { question: "Goal of green computing:", options: ["Increase energy", "Reduce waste & improve efficiency", "Use paper", "Build large centers"], answer: 1 },
  { question: "EPA program:", options: ["Apollo", "Energy Star", "Windows", "Manhattan"], answer: 1 },
  { question: "Energy Star indicates:", options: ["High power", "Energy efficiency", "Radiation", "Solar"], answer: 1 },
  { question: "Most efficient hardware:", options: ["HDD", "SSD", "CRT", "Bulb"], answer: 1 },
  { question: "Replacing CRT monitors with LCD/LED monitors is an example of:", options: ["Wasting money", "Green Computing (energy-efficient hardware)", "Network hacking", "Immersive Technology"], answer: 1 },
  { question: "What is \"E-waste\"?", options: ["Biological waste", "Discarded electronic devices", "Emails deleted", "Sun waste"], answer: 0 },
  { question: "Why is E-waste dangerous?", options: ["Too much space", "Contains toxic materials (lead, mercury, cadmium)", "Highly flammable", "Loud noise"], answer: 1 },
  { question: "Proper E-waste management follows the \"3 R's\":", options: ["Read, Write, Run", "Reduce, Reuse, Recycle", "Record, Remove, Return", "Replace, Repair, Reject"], answer: 1 },
  { question: "\"Reduce\" in green computing means:", options: ["Reduce size of computer", "Reduce energy consumption and hardware waste", "Reduce CPU speed", "Reduce font size"], answer: 1 },
  { question: "Donating old laptops is an example of:", options: ["Reducing", "Reusing", "Recycling", "Rejecting"], answer: 1 },
  { question: "Extracting metals from e-waste is:", options: ["Reducing", "Reusing", "Recycling", "Replacing"], answer: 2 },
  { question: "Server virtualization means:", options: ["Creating virtual servers", "Running multiple VMs on one machine", "Removing servers", "Turning off systems"], answer: 1 },
  { question: "Virtualization helps green computing by:", options: ["Increasing servers", "Reducing power consumption", "Using more electricity", "Preventing data"], answer: 1 },
  { question: "PUE measures:", options: ["Network speed", "Energy efficiency of data center", "Battery life", "Processing speed"], answer: 1 },
  { question: "Ideal PUE value is:", options: ["10", "5", "1.0", "0"], answer: 2 },
  { question: "Green cooling technique:", options: ["Coal power", "Free cooling", "Sunlight cooling", "Open doors"], answer: 1 },
  { question: "Hot/Cold aisle containment:", options: ["Separate airflow", "Exhaust mix", "Store data", "Fire prevention"], answer: 0 },
  { question: "Power Management software (ACPI):", options: ["Increase CPU", "Automatically manage power states", "Prevent overheating", "Format disk"], answer: 1 },
  { question: "Directive limiting hazardous substances:", options: ["GDPR", "RoHS", "WEEE", "HIPAA"], answer: 1 },
  { question: "WEEE directive relates to:", options: ["Internet protocols", "E-waste recycling", "Water conservation", "Accessibility"], answer: 1 },
  { question: "Telecommuting helps green computing because:", options: ["Uses paper", "Reduces travel emissions", "Increases power", "Reduces productivity"], answer: 1 },
  { question: "Cloud computing supports green computing by:", options: ["Local servers", "Shared efficient data centers", "Old hardware", "Free internet"], answer: 1 },
  { question: "Eco-friendly printing:", options: ["One-side printing", "Duplex + recycled paper", "Color printing", "Print all emails"], answer: 1 },
  { question: "DVFS helps by:", options: ["Overclocking CPU", "Reducing voltage & frequency", "Increasing heat", "Bypassing PSU"], answer: 1 },
  { question: "Circular economy encourages:", options: ["Linear use", "Durable & repairable products", "Disposal", "Ocean dumping"], answer: 1 },
  { question: "Vampire power means:", options: ["Solar energy", "Standby power consumption", "Hacking power", "Cooling power"], answer: 1 },
  { question: "Reduce vampire power by:", options: ["Keep ON", "Use power strip & turn off", "Upgrade RAM", "Change apps"], answer: 1 },
  { question: "Proper e-waste disposal:", options: ["Burning wires", "Formal recycling", "Dumping", "UV exposure"], answer: 1 },
  { question: "Green IT includes:", options: ["Usage only", "Disposal only", "Full lifecycle", "Development only"], answer: 2 },
  { question: "Thin clients help by:", options: ["Increasing power", "Lower power usage", "More hardware", "No internet"], answer: 1 },
  { question: "NOT green practice:", options: ["Sleep mode", "Energy Star devices", "Leaving PC ON", "Recycling cartridges"], answer: 2 },
  { question: "Algorithmic efficiency helps by:", options: ["Ugly code", "Less CPU usage", "Hardware change", "Non-recyclable"], answer: 1 },
  { question: "Planned obsolescence:", options: ["Long life products", "Short life forcing replacement", "Recycling", "Free repair"], answer: 1 },
  { question: "Toxic material in CRT:", options: ["Silicon", "Copper", "Lead", "Plastic"], answer: 2 },
  { question: "Upcycling means:", options: ["Breaking items", "Creating higher value products", "Burning waste", "Landfill"], answer: 1 },
  { question: "Data center water usage mainly for:", options: ["Electricity", "Cooling", "Cleaning", "Staff"], answer: 1 },
  { question: "Fundamental unit:", options: ["Qubit", "GB", "MB", "Q-byte"], answer: 0 },
  { question: "Qubit property:", options: ["Entanglement", "Superposition", "Teleportation", "Interference"], answer: 1 },
  { question: "Superposition allows:", options: ["Single calc", "Parallel computation", "Internet", "Stability"], answer: 1 },
  { question: "Instant qubit link:", options: ["Superposition", "Entanglement", "Decoherence", "Tunneling"], answer: 1 },
  { question: "Einstein phrase:", options: ["Everything", "Spooky action at a distance", "God particle", "Nonsense"], answer: 1 },
  { question: "Quantum interference helps:", options: ["Random signals", "Correct amplitudes", "Block internet", "Overheat CPU"], answer: 1 },
  { question: "Quantum computers need:", options: ["Room temp", "Near absolute zero", "High heat", "Water"], answer: 1 },
  { question: "Isolation needed because:", options: ["Faster", "Prevent decoherence", "Save cost", "Slow system"], answer: 1 },
  { question: "Quantum decoherence:", options: ["Writing code", "Loss of quantum state", "Freezing", "Virus"], answer: 1 },
  { question: "Shor's algorithm threatens:", options: ["Graphics", "Cryptography", "Displays", "Batteries"], answer: 1 },
  { question: "Solution to quantum threat:", options: ["Paper records", "Post-quantum cryptography", "Short passwords", "Stop internet"], answer: 1 },
  { question: "Quantum supremacy means:", options: ["Destroy computers", "Solve problems faster than classical", "Cheap laptops", "Faster RAM"], answer: 1 },
  { question: "Company achieving supremacy:", options: ["Apple", "Google", "Facebook", "Amazon"], answer: 1 },
  { question: "Quantum in healthcare:", options: ["ID cards", "Drug discovery", "Scheduling", "Billing"], answer: 1 },
  { question: "Classical computers struggle due to:", options: ["Few transistors", "Exponential complexity", "Biology", "Chemistry"], answer: 1 },
  { question: "Quantum in finance:", options: ["Printing", "Portfolio optimization", "Robots", "Cards"], answer: 1 },
  { question: "Quantum in logistics:", options: ["Printing", "Optimization problems", "Translation", "Packaging"], answer: 1 },
  { question: "Grover's algorithm:", options: ["Playing chess", "Fast search", "Word processing", "Image rendering"], answer: 1 },
  { question: "Quantum computing is good at:", options: ["Word processing", "Complex computations", "Video streaming", "Phone apps"], answer: 1 },
  { question: "Qubits implemented using:", options: ["Silicon", "Superconducting circuits", "Copper wires", "Tape"], answer: 1 },
  { question: "QEC is needed because:", options: ["Qubits stable", "Qubits error-prone", "Programming error", "No errors"], answer: 1 },
  { question: "Qubit gate manipulates:", options: ["Bits", "Probabilities", "Power", "Cooling"], answer: 1 },
  { question: "Quantum advantage example:", options: ["MP3", "Material simulation", "PDF storage", "Calculator"], answer: 1 },
  { question: "QKD is used for:", options: ["Video files", "Secure communication", "Designing keyboards", "Updates"], answer: 1 },
  { question: "Quantum improves AI by:", options: ["Less intelligence", "Faster training", "Replace AI", "Delete DB"], answer: 1 },
  { question: "Quantum computers replacing classical?", options: ["Yes", "No (specialized use)", "Always", "Never"], answer: 1 },
  { question: "Performance unit:", options: ["MHz", "Quantum Volume", "GB", "DPI"], answer: 1 },
  { question: "Weather forecasting improvement:", options: ["Stop rain", "Better simulations", "Artificial clouds", "Reverse warming"], answer: 1 },
  { question: "Architect using VR:", options: ["AR", "VR", "QC", "GC"], answer: 1 },
  { question: "Triple Bottom Line:", options: ["Speed", "People, Planet, Profit", "Hardware", "Software"], answer: 1 },
  { question: "Link between immersive tech & green computing:", options: ["More emissions", "Reduced travel", "Global warming", "None"], answer: 1 },
  { question: "Chair hidden behind table is:", options: ["Foveated", "Occlusion", "Haptics", "Quantum"], answer: 1 },
  { question: "Bit vs Qubit:", options: ["Same", "Qubit can be superposition", "Faster", "No difference"], answer: 1 },
  { question: "E-waste recycling difficulty:", options: ["Easy", "Complex materials", "Auto", "None"], answer: 1 },
  { question: "Quantum collapse:", options: ["Entanglement", "Measurement forces state", "Teleportation", "Amplification"], answer: 1 },
  { question: "Turning off monitors:", options: ["Quantum", "Power management", "VR", "MR"], answer: 1 },
  { question: "HUD means:", options: ["Hide data", "Display info in view", "Heat device", "Hack network"], answer: 1 },
  { question: "AI cooling data center:", options: ["Quantum", "Green computing", "Haptics", "AR"], answer: 1 }
];

const unit5Questions = [
  { question: "What is the primary definition of Digital Forensics?", options: ["The process of fixing broken computer hardware", "The application of investigation and analysis techniques to gather and preserve evidence from a particular computing device", "The act of legally hacking into a network", "The development of new cryptographic algorithms"], answer: 1 },
  { question: "The main objective of Digital Forensics is to:", options: ["Ensure the internet is running fast", "Extract data in a forensically sound manner to present it in a court of law", "Install antivirus software", "Back up data to the cloud"], answer: 1 },
  { question: "Locard's Exchange Principle states that:", options: ["Data can only be copied, not moved", "Every contact leaves a trace", "Passwords must be exchanged securely", "All data must be encrypted"], answer: 1 },
  { question: "Volatile data refers to data that:", options: ["Is permanently stored on a hard drive", "Is lost when the device loses power", "Is encrypted with a high-level key", "Cannot be deleted"], answer: 1 },
  { question: "Which of the following is an example of non-volatile data?", options: ["System cache in RAM", "Active network connections", "Data stored on a Hard Disk Drive (HDD)", "Running processes"], answer: 2 },
  { question: "In digital forensics, \"Live Forensics\" refers to:", options: ["Investigating a system while it is still powered on and running", "Broadcasting the investigation live on the internet", "Pulling the plug before starting the investigation", "Interviewing a live suspect"], answer: 0 },
  { question: "\"Dead Forensics\" (or Post-mortem forensics) involves:", options: ["Investigating deceased individuals", "Analyzing data from a system that has been powered off and a forensic image has been taken", "Using outdated software", "Failing an investigation"], answer: 1 },
  { question: "Digital evidence is best described as:", options: ["Any physical document related to a crime", "Any information of probative value stored or transmitted in digital form", "Only the emails of a suspect", "The hardware casing of a computer"], answer: 1 },
  { question: "Why is digital evidence often considered fragile?", options: ["Because computer hardware breaks easily", "Because it can be easily altered, deleted, or destroyed intentionally or accidentally", "Because it cannot be printed", "Because it expires after 24 hours"], answer: 1 },
  { question: "\"Exculpatory Evidence\" refers to evidence that:", options: ["Proves a suspect's guilt", "Clears a suspect of guilt or blame", "Is hidden by encryption", "Cannot be read by computers"], answer: 1 },
  { question: "\"Inculpatory Evidence\" refers to evidence that:", options: ["Supports the prosecution's case and proves guilt", "Clears a suspect", "Is destroyed", "Is found in RAM"], answer: 0 },
  { question: "Anti-forensics refers to:", options: ["Software used by investigators", "Techniques used by attackers to hide evidence or thwart forensic investigations", "Law enforcement policies", "Creating backups"], answer: 1 },
  { question: "Steganography, often used in anti-forensics, is the practice of:", options: ["Encrypting a hard drive", "Hiding a secret message or data within an ordinary file or image", "Deleting system logs", "Smashing a hard drive"], answer: 1 },
  { question: "Which of the following is a common anti-forensic technique?", options: ["Making a bit-by-bit copy", "Hashing", "Securely deleting files", "Documenting the chain of custody"], answer: 2 },
  { question: "In digital forensics, what does \"Timestamping\" mean?", options: ["Stepping on a hard drive", "Altering the creation, modification, or access timestamps of a file to confuse investigators", "Taking too long to investigate", "Syncing a computer with an NTP server"], answer: 1 },
  { question: "The ACPO guidelines provide principles for:", options: ["Buying computer hardware", "The legal handling and acquisition of digital evidence", "Writing software code", "Hacking passwords"], answer: 1 },
  { question: "According to ACPO Principle 1, no action taken by law enforcement should:", options: ["Cost more than the device", "Change data held on a computer or storage media which may be subsequently relied upon in court", "Alert the suspect", "Take longer than 24 hours"], answer: 1 },
  { question: "If it is necessary to access original data held on a computer (ACPO Principle 2), the person doing so must be:", options: ["A high-ranking officer", "Competent and able to explain the relevance and implications of their actions", "The owner of the device", "An automated robot"], answer: 1 },
  { question: "What is an \"Audit Trail\" in the context of digital forensics?", options: ["A trail of physical footprints", "A detailed, chronological record of all actions taken during the investigation", "A financial document", "A list of software bugs"], answer: 1 },
  { question: "What is the \"Chain of Custody\"?", options: ["A physical lock used to secure computers", "A chronological paper trail documenting the seizure, custody, control, transfer, analysis, and disposition of evidence", "The connection between internet routers", "The sequence of viruses in a system"], answer: 1 },
  { question: "Why is maintaining the Chain of Custody critical?", options: ["To keep the evidence clean", "To ensure the evidence has not been tampered with and is admissible in court", "To save storage space", "To speed up the analysis"], answer: 1 },
  { question: "The first step in the general Digital Forensic Investigation Process is:", options: ["Analysis", "Identification", "Presentation", "Collection"], answer: 1 },
  { question: "In the \"Collection/Acquisition\" phase, investigators typically:", options: ["Turn on the computer and browse files normally", "Create an exact bit-by-bit forensic image (clone) of the original media", "Delete unrelated files", "Interrogate the suspect"], answer: 1 },
  { question: "A \"Write-Blocker\" is used to:", options: ["Write reports automatically", "Prevent any data from being written or modified on the suspect's original storage device", "Encrypt the data", "Format the drive"], answer: 1 },
  { question: "Which mathematical function is used to verify that a forensic image is an exact duplicate?", options: ["Cryptographic hashing (MD5, SHA-1, SHA-256)", "Defragmentation", "Compression", "Encryption"], answer: 0 },
  { question: "If the hash of the original drive matches the hash of the forensic image, it proves:", options: ["Data integrity (no data was changed during copying)", "The suspect is guilty", "The drive is virus-free", "The drive is encrypted"], answer: 0 },
  { question: "The \"Preservation\" phase ensures that:", options: ["Evidence is securely stored and protected from alteration", "The computer is left unchanged", "Data is published online", "Passwords are changed"], answer: 0 },
  { question: "What is a \"Faraday Bag\" used for in evidence handling?", options: ["Protect devices from water damage", "Block electromagnetic signals and prevent remote access", "Cool overheated devices", "Store backups"], answer: 1 },
  { question: "During the \"Examination\" phase, an investigator might:", options: ["Write final report", "Recover deleted files and extract hidden data", "Return device", "Testify in court"], answer: 1 },
  { question: "The \"Analysis\" phase involves:", options: ["Making a copy", "Interpreting extracted data and drawing conclusions", "Arresting suspect", "Storing evidence"], answer: 1 },
  { question: "The final phase of forensic process is:", options: ["Reporting / Presentation", "Collection", "Hashing", "Wiping"], answer: 0 },
  { question: "A forensic report must be:", options: ["Highly technical only", "Accurate, objective, and understandable", "Biased", "Written before analysis"], answer: 1 },
  { question: "Slack Space refers to:", options: ["Unused disk space", "Space between end of file and cluster boundary", "Cloud storage", "Formatted partitions"], answer: 1 },
  { question: "Unallocated space refers to:", options: ["Space reserved for RAM", "Disk space not assigned to files", "Cloud storage", "Formatted partitions"], answer: 1 },
  { question: "Order of Volatility means:", options: ["Most permanent to least", "Least to most volatile", "Collecting most volatile data first", "Collecting oldest data first"], answer: 2 },
  { question: "Most volatile data is:", options: ["Network topology", "Hard disk", "CPU registers and cache", "RAM"], answer: 2 },
  { question: "Pulling power plug destroys:", options: ["HDD data", "RAM data", "CD-ROM data", "BIOS"], answer: 1 },
  { question: "Cross-contamination means:", options: ["Mixing physical evidence", "Mixing data from multiple investigations", "Crossing borders", "Installing antivirus"], answer: 1 },
  { question: "Metadata is:", options: ["Suspect data", "Data about data", "Encrypted data", "Corrupted data"], answer: 1 },
  { question: "Forensic clone differs because:", options: ["Faster", "Includes hidden/slack/unallocated data", "Copies text only", "Compresses files"], answer: 1 },
  { question: "DFRWS stands for:", options: ["Digital Forensics Research Workshop", "Data File Recovery Workflow System", "Digital File Restoration Web Service", "Department of Forensic Rules and Working Standards"], answer: 0 },
  { question: "The DFRWS Investigative Model (2001) consists of how many phases?", options: ["4", "6", "9", "17"], answer: 1 },
  { question: "Which of the following represents the correct sequence of the DFRWS model phases?", options: ["Collection, Preservation, Identification, Analysis, Examination, Presentation", "Identification, Preservation, Collection, Examination, Analysis, Presentation", "Identification, Analysis, Preservation, Collection, Examination, Analysis, Reporting, Returning", "Examination, Acquisition, Analysis, Archiving"], answer: 1 },
  { question: "In the DFRWS model, the \"Identification\" phase includes tasks like:", options: ["Making a bit-stream copy", "Profile detection, system monitoring, and identifying the incident", "Testifying in court", "Recovering deleted files"], answer: 1 },
  { question: "ADFM stands for:", options: ["Advanced Digital File Method", "Abstract Digital Forensics Model", "Automated Data Forensic Machine", "Applied Digital Framework Model"], answer: 1 },
  { question: "The Abstract Digital Forensics Model (ADFM) was proposed by:", options: ["Carrier and Spafford", "Reith, Carr, and Gunsch", "Brian Carrier", "Peter Stephenson"], answer: 1 },
  { question: "How many phases does the ADFM model contain?", options: ["6", "9", "17", "4"], answer: 1 },
  { question: "Which phase is at the very beginning of the ADFM model?", options: ["Preservation", "Returning Evidence", "Preparation", "Wiping"], answer: 2 },
  { question: "The \"Approach Strategy\" phase in ADFM aims to:", options: ["Attack the suspect", "Formulate a strategy to minimize impact to victims", "Write the report", "Perform analysis"], answer: 1 },
  { question: "The final phase added by ADFM is:", options: ["Collection", "Returning Evidence", "Examination", "Imaging"], answer: 1 },
  { question: "IDIP stands for:", options: ["Integrated Digital Investigation Process", "International Data Investigation Protocol", "Internet Digital Information Process", "Incident Detection and Investigation Plan"], answer: 0 },
  { question: "The IDIP model was developed by:", options: ["Reith and Gunsch", "Carrier and Spafford", "Ciardhuain", "DFRWS"], answer: 1 },
  { question: "A unique feature of IDIP is:", options: ["Windows only", "Integration of physical and digital crime scenes", "Hacking tools", "Civil crimes only"], answer: 1 },
  { question: "How many total phases are in IDIP?", options: ["6", "9", "17", "5"], answer: 2 },
  { question: "The 17 phases are grouped into:", options: ["3 groups", "5 groups", "10 groups", "17 groups"], answer: 1 },
  { question: "The first group in IDIP is called:", options: ["Deployment Phase", "Readiness Phase", "Crime Scene Investigation", "Review Phase"], answer: 1 },
  { question: "IDIP treats the computer as:", options: ["Software lifecycle", "Digital crime scene", "Game", "Financial audit"], answer: 1 },
  { question: "EEDIP stands for:", options: ["Electronic Evidence Discovery and Identification Protocol", "End-to-End Digital Investigation Process", "Extended Evidence Data Investigation Phase", "Early Extraction of Digital Information"], answer: 1 },
  { question: "EEDIP was introduced by:", options: ["Peter Stephenson", "Brian Carrier", "DFRWS", "Reith"], answer: 0 },
  { question: "A key focus of EEDIP is:", options: ["RAM analysis only", "End-to-end investigation", "Password bypass", "Evidence generation"], answer: 1 },
  { question: "Extended model for cybercrime was proposed by:", options: ["Spafford", "Seamus", "Ciardhuain", "Stephenson"], answer: 2 },
  { question: "Ciardhuain's model focuses on:", options: ["Hard drive only", "Full investigation environment", "Mobile phones", "Ignoring physical evidence"], answer: 1 },
  { question: "UDFM stands for:", options: ["Unified Data Forensic Model", "Unified Modeling Language", "Unlimited Forensics Model", "User Managed Data Forensic Model"], answer: 1 },
  { question: "Advantage of UDFM:", options: ["Faster execution", "Standardized diagrams", "Hardware device", "Less memory"], answer: 1 },
  { question: "Which phase involves extracting hidden data?", options: ["Identification", "Preservation", "Examination", "Presentation"], answer: 2 },
  { question: "Deployment phase includes:", options: ["Buying computers", "Detection and notification", "Returning evidence", "Archiving report"], answer: 1 },
  { question: "Physical crime scene investigation includes:", options: ["Malware analysis", "Preservation, survey, documentation", "Breaking passwords", "Sniffing"], answer: 1 },
  { question: "Digital crime scene investigation includes:", options: ["Securing room", "Searching and collecting digital data", "Arresting suspect", "Reporting"], answer: 1 },
  { question: "Final group in IDIP is:", options: ["Readiness", "Review", "Deployment", "Arrest"], answer: 1 },
  { question: "Preparation phase in ADFM includes:", options: ["Extract files", "Identify techniques and tools", "Return computer", "Testify"], answer: 1 },
  { question: "Ethical hacking is defined as:", options: ["Illegal hacking", "Authorized security testing", "Password theft", "Virus creation"], answer: 1 },
  { question: "Ethical hackers are also known as:", options: ["Black Hat", "White Hat", "Red Hat", "Cyber Terrorists"], answer: 1 },
  { question: "Difference between ethical and malicious hacker:", options: ["Same", "Ethical hackers have permission", "Ethical faster", "Malicious legal"], answer: 1 },
  { question: "CIA Triad includes:", options: ["Confidentiality, Integrity, Availability", "Cyber, Intelligence, Agency", "Control, Internet, Access", "Computer, Information"], answer: 0 },
  { question: "Confidentiality ensures:", options: ["Data public", "Authorized access only", "Data deleted", "Hidden system"], answer: 1 },
  { question: "Integrity ensures:", options: ["Server safe", "Data unchanged", "Data hidden", "Strong passwords"], answer: 1 },
  { question: "Hacker breaking network maliciously:", options: ["White Hat", "Black Hat", "Grey Hat", "Blue Hat"], answer: 1 },
  { question: "Grey Hat hacker:", options: ["Legal only", "Hack without permission but not malicious", "Government hired", "Public only"], answer: 1 },
  { question: "Script kiddie:", options: ["Expert programmer", "Uses tools created by others", "Child actor", "Professional tester"], answer: 1 },
  { question: "Hackers for political agenda:", options: ["Script kiddies", "Hacktivists", "State-sponsored", "Green hats"], answer: 1 },
  { question: "State-sponsored hackers:", options: ["Amateur", "Government-backed professionals", "Credit card thieves", "Students"], answer: 1 },
  { question: "Green Hat hacker:", options: ["Environmental activist", "Beginner learning hacking", "Apple developer", "Dangerous hacker"], answer: 1 },
  { question: "Penetration testing is:", options: ["Testing ink", "Simulating attack to find vulnerabilities", "Installing antivirus", "Fixing hardware"], answer: 1 },
  { question: "Ethical hackers must:", options: ["Hide vulnerabilities", "Follow scope and confidentiality", "Delete data", "Attack systems"], answer: 1 },
  { question: "Red Teaming is:", options: ["Defense", "Simulated attack by adversary", "Firewall installation", "User management"], answer: 1 },
  { question: "Phishing is:", options: ["Fishing", "Fake communication to steal data", "Encryption", "Guessing passwords"], answer: 1 },
  { question: "AI phishing scams are:", options: ["Easy to detect", "Highly convincing", "Slower", "Delete inbox"], answer: 1 },
  { question: "Ransomware:", options: ["Ads", "Encrypts files for ransom", "Steals Wi-Fi", "Speeds system"], answer: 1 },
  { question: "Double extortion ransomware:", options: ["Encrypt only", "Encrypt + leak data", "Delete system", "Double encryption"], answer: 1 },
  { question: "IoT devices are vulnerable because:", options: ["Strong security", "Weak passwords and lack of updates", "No internet", "No CPU"], answer: 1 },
  { question: "A massive network of compromised IoT devices controlled by an attacker is called a:", options: ["Botnet (e.g., Mirai botnet)", "Ransomware", "Firewall", "Server farm"], answer: 0 },
  { question: "\"Deep Fake Technology\" uses AI to:", options: ["Create extremely deep databases", "Generate hyper-realistic synthetic media (video/audio) depicting a person saying or doing things they never did", "Clean up blurry images", "Encrypt video files"], answer: 1 },
  { question: "How can Deep Fakes be used in Network Hacking/Social Engineering?", options: ["By rendering graphics faster", "By using fake audio of a CEO to trick employees into transferring funds", "By physically damaging routers", "By updating software"], answer: 1 },
  { question: "What is an \"OS Downgrade Attack\"?", options: ["Upgrading the OS", "Forcing a device to use an older version with vulnerabilities", "Making OS faster", "Deleting OS completely"], answer: 1 },
  { question: "Firmware-level exploits are dangerous because:", options: ["Easy to remove", "Operate below OS and are hard to detect", "Affect only CPU", "Temporary"], answer: 1 },
  { question: "\"Rootkit\" attack occurs at:", options: ["Web browser", "OS and firmware level", "Printer", "Monitor"], answer: 1 },
  { question: "WAF stands for:", options: ["Web Application Firewall", "Wide Area Frequency", "Wireless Access Filter", "Web Authorization Form"], answer: 0 },
  { question: "Purpose of WAF:", options: ["Speed up website", "Protect web apps by filtering HTTP traffic", "Block internet", "Generate HTML"], answer: 1 },
  { question: "WAF bypass techniques include:", options: ["Admin access", "Encoding, URL tricks, fragmentation", "Rewriting code", "Lower bandwidth"], answer: 1 },
  { question: "SQL Injection is a type of:", options: ["Network hacking", "Application hacking", "Hardware hacking", "Firmware exploit"], answer: 1 },
  { question: "Zero-Day Exploit is:", options: ["Midnight attack", "Exploiting unknown vulnerability", "Virus deletion", "Backup attack"], answer: 1 },
  { question: "Cross-Site Scripting (XSS):", options: ["Steals server", "Injects malicious scripts into websites", "Blocks IP", "Formats DB"], answer: 1 },
  { question: "Defense against OS downgrade:", options: ["Never use OS", "Anti-rollback protection", "Daily formatting", "Avoid updates"], answer: 1 },
  { question: "Firmware hacking targets:", options: ["CPU", "BIOS/UEFI", "RAM", "Storage"], answer: 1 },
  { question: "Credential stuffing:", options: ["Guessing passwords", "Using leaked credentials automatically", "Manual login", "Password creation"], answer: 1 },
  { question: "DoS attack affects:", options: ["Confidentiality", "Integrity", "Availability", "Authorization"], answer: 2 },
  { question: "Buffer overflow allows attacker to:", options: ["Encrypt data", "Execute malicious code", "Format disk", "Restart system"], answer: 1 },
  { question: "Packet sniffing is:", options: ["Smelling server", "Intercepting network traffic", "Sending packets", "Dropping connections"], answer: 1 },
  { question: "Encryption helps against sniffing by:", options: ["Old routers", "End-to-end encryption", "Increasing bandwidth", "Antivirus"], answer: 1 },
  { question: "MITM attack is:", options: ["Hardware attack", "Network hacking", "Physical hacking", "OS hacking"], answer: 1 },
  { question: "Prevent SQL Injection:", options: ["Plain passwords", "Prepared statements", "Longer variables", "Old DB"], answer: 1 },
  { question: "Symptom of ransomware:", options: ["Faster system", "Encrypted files", "No internet", "Keyboard failure"], answer: 1 },
  { question: "Directory Traversal attack:", options: ["Application hacking", "Network hacking", "Hardware hacking", "Firmware exploit"], answer: 0 },
  { question: "WAF bypass example:", options: ["Phishing", "SQL comment trick", "DDoS", "Malware"], answer: 1 },
  { question: "Patch release protects against:", options: ["Weak passwords", "Zero-day vulnerabilities", "Phishing", "Social engineering"], answer: 1 },
  { question: "IT Act of India enacted in:", options: ["1990", "2000", "2008", "2013"], answer: 1 },
  { question: "Objective of IT Act 2000:", options: ["Ban computers", "Legal recognition of e-commerce & e-governance", "Promote mail", "Build colleges"], answer: 1 },
  { question: "Section dealing with damage to computer:", options: ["Section 43", "Section 66", "Section 67", "Section 65"], answer: 0 },
  { question: "Section for hacking offense:", options: ["Section 43", "Section 66", "Section 66A", "Section 67"], answer: 1 },
  { question: "Major amendment year:", options: ["2004", "2008", "2015", "2020"], answer: 1 },
  { question: "Section 66C deals with:", options: ["Identity theft", "Cyber terrorism", "Child pornography", "Privacy"], answer: 0 },
  { question: "Section 66D deals with:", options: ["Hacking", "Cheating by impersonation", "Video piracy", "Spam"], answer: 1 },
  { question: "Section struck down (free speech):", options: ["66A", "66B", "66C", "66D"], answer: 0 },
  { question: "Section 66E deals with:", options: ["E-commerce", "Violation of privacy", "Security", "Architecture"], answer: 1 },
  { question: "Section 66F deals with:", options: ["Security", "Terrorism", "Identity theft", "Phishing"], answer: 1 },
  { question: "NCSP stands for:", options: ["National Computer Science Program", "National Cyber Security Policy", "Network Control Protocol", "National Cyber Surveillance Project"], answer: 1 },
  { question: "NCSP launched in:", options: ["2000", "2008", "2013", "2020"], answer: 2 },
  { question: "Objective of NCSP:", options: ["Ban social media", "Secure cyber ecosystem", "Promote letters", "Stop trade"], answer: 1 },
  { question: "Workforce target under NCSP:", options: ["50,000", "500,000", "1 Million", "10 Million"], answer: 1 },
  { question: "DPDP Act 2023 stands for:", options: ["Digital Public Data Protection Act", "Digital Personal Data Protection Act", "Data Privacy Digital Policy", "Direct Personal Data Provision"], answer: 1 },
  { question: "Data subject is called:", options: ["Data Principal", "Data Processor", "Data Miner", "Hacker"], answer: 0 },
  { question: "Data controller is called:", options: ["Data Principal", "Data Fiduciary", "Data Subject", "Hacker"], answer: 1 },
  { question: "Consent in DPDP Act must be:", options: ["Not required", "Clear and specific", "Financial", "Physical"], answer: 1 },
  { question: "CCPWC scheme relates to:", options: ["Women and children cyber protection", "Commerce", "Content", "Public control"], answer: 0 },
  { question: "Cybercrime reporting portal:", options: ["NCRP (cybercrime.gov.in)", "Facebook", "IT website", "Police manual"], answer: 0 }
];

function getSetSizeForUnit(unitId) {
  if (unitId === "unit2") return UNIT2_SET_SIZE;
  if (unitId === "unit3") return UNIT3_SET_SIZE;
  if (unitId === "unit4") return UNIT4_SET_SIZE;
  if (unitId === "unit5") return UNIT5_SET_SIZE;
  return UNIT1_SET_SIZE;
}

function getQuestionsForUnit(unitId) {
  if (unitId === "unit2") return unit2Questions;
  if (unitId === "unit3") return unit3Questions;
  if (unitId === "unit4") return unit4Questions;
  if (unitId === "unit5") return unit5Questions;
  return unit1Questions;
}

function getPageName() {
  return window.location.pathname.split("/").pop().toLowerCase();
}

function getTabId() {
  let tabId = sessionStorage.getItem(TAB_ID_KEY);
  if (!tabId) {
    tabId = `tab_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(TAB_ID_KEY, tabId);
  }
  return tabId;
}

function readJSON(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showInlineMessage(targetId, message) {
  const el = document.getElementById(targetId);
  if (el) {
    el.textContent = message;
  } else {
    alert(message);
  }
}

function getConfiguredUsers() {
  if (!Array.isArray(window.USER_ACCOUNTS)) return [];
  return window.USER_ACCOUNTS.map((user) => ({
    username: String(user.username || "").trim(),
    password: String(user.password || ""),
    role: user.role === "owner" ? "owner" : "student",
    blocked: Boolean(user.blocked)
  })).filter((user) => user.username);
}

function getUsersDb() {
  const seededUsers = getConfiguredUsers();
  const usersFromStorage = readJSON(USERS_DB_KEY);
  if (!Array.isArray(usersFromStorage) || !usersFromStorage.length) {
    writeJSON(USERS_DB_KEY, seededUsers);
    return seededUsers;
  }

  // Keep local edits, but ensure newly added users in users.js are also available.
  const merged = [...usersFromStorage];
  seededUsers.forEach((seedUser) => {
    const exists = merged.some((u) => u.username === seedUser.username);
    if (!exists) merged.push(seedUser);
  });
  writeJSON(USERS_DB_KEY, merged);
  return merged;
}

function saveUsersDb(users) {
  writeJSON(USERS_DB_KEY, users);
}

function findUser(username) {
  return getUsersDb().find((u) => u.username === username) || null;
}

function getBlockedUsers() {
  return readJSON(BLOCKED_USERS_KEY) || {};
}

function sanitizeOwnerBlocks() {
  const users = getUsersDb();
  const blockedMap = getBlockedUsers();
  let changedUsers = false;
  let changedBlockedMap = false;

  users.forEach((user) => {
    if (user.role === "owner" && user.blocked) {
      user.blocked = false;
      changedUsers = true;
    }
    if (user.role === "owner" && blockedMap[user.username]) {
      delete blockedMap[user.username];
      changedBlockedMap = true;
    }
  });

  if (changedUsers) saveUsersDb(users);
  if (changedBlockedMap) writeJSON(BLOCKED_USERS_KEY, blockedMap);
}

function isUserBlocked(username) {
  const user = findUser(username);
  const blockedMap = getBlockedUsers();
  if (user && user.role === "owner") return false;
  return Boolean((user && user.blocked) || blockedMap[username]);
}

function blockUserAccess(username) {
  if (!username) return;
  const users = getUsersDb();
  const userIndex = users.findIndex((user) => user.username === username);
  if (userIndex >= 0 && users[userIndex].role === "owner") {
    return;
  }
  if (userIndex >= 0) {
    users[userIndex].blocked = true;
    saveUsersDb(users);
  }
  const blockedMap = getBlockedUsers();
  blockedMap[username] = true;
  writeJSON(BLOCKED_USERS_KEY, blockedMap);
  const sessions = getActiveSessions();
  delete sessions[username];
  writeJSON(ACTIVE_SESSIONS_KEY, sessions);
  localStorage.removeItem(getTabLockKey(username));
}

function isSessionExpired(sessionObj) {
  return !sessionObj || Date.now() > (sessionObj.expiresAt || 0);
}

function getActiveSessions() {
  const sessions = readJSON(ACTIVE_SESSIONS_KEY) || {};
  let changed = false;
  Object.keys(sessions).forEach((username) => {
    if (isSessionExpired(sessions[username])) {
      delete sessions[username];
      changed = true;
    }
  });
  if (changed) {
    writeJSON(ACTIVE_SESSIONS_KEY, sessions);
  }
  return sessions;
}

function getSessionForUser(username) {
  const sessions = getActiveSessions();
  return sessions[username] || null;
}

function setSessionForUser(username, sessionObj) {
  const sessions = getActiveSessions();
  sessions[username] = sessionObj;
  writeJSON(ACTIVE_SESSIONS_KEY, sessions);
}

function createAndStoreSession(username) {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const sessionObj = {
    username,
    sessionId,
    lastSeen: Date.now(),
    expiresAt: Date.now() + SESSION_TIMEOUT_MS
  };
  setSessionForUser(username, sessionObj);
  localStorage.setItem(CURRENT_SESSION_ID_KEY, sessionId);
  localStorage.setItem(CURRENT_USERNAME_KEY, username);
  return sessionObj;
}

function getCurrentUsername() {
  return localStorage.getItem(CURRENT_USERNAME_KEY);
}

function getCurrentSession() {
  const username = getCurrentUsername();
  if (!username) return null;
  return getSessionForUser(username);
}

async function isCurrentUserOwner() {
  if (window.FirebaseSession) {
    const profile = await FirebaseSession.getCurrentFirebaseProfile();
    return Boolean(profile && profile.role === "owner" && !profile.blocked);
  }
  const username = getCurrentUsername();
  const user = username ? findUser(username) : null;
  return Boolean(user && user.role === "owner");
}

function getTabLockKey(username) {
  return `${TAB_LOCK_PREFIX}${username || "unknown"}`;
}

async function requireAuth() {
  if (!window.FirebaseSession) {
    window.location.href = "login.html";
    return null;
  }
  return FirebaseSession.requireFirebaseSession();
}

async function refreshSessionHeartbeat() {
  if (!window.FirebaseSession || !FirebaseSession.auth.currentUser) return;
  try {
    await FirebaseSession.db.collection("users").doc(FirebaseSession.auth.currentUser.uid).set({
      lastSeenAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (error) {
    console.warn("Could not refresh Firebase session heartbeat", error);
  }
}

function acquireTabLockOrBlock() {
  const username = getCurrentUsername();
  if (!username) return false;
  writeJSON(getTabLockKey(username), { tabId: getTabId(), lastSeen: Date.now() });
  return true;
}

function refreshTabLock() {
  const username = getCurrentUsername();
  if (!username) return;
  const tabId = getTabId();
  const tabLockKey = getTabLockKey(username);
  const lock = readJSON(tabLockKey);
  if (!lock || lock.tabId === tabId) {
    writeJSON(tabLockKey, { tabId, lastSeen: Date.now() });
  }
}

function releaseTabLock() {
  const username = getCurrentUsername();
  if (!username) return;
  const tabId = getTabId();
  const tabLockKey = getTabLockKey(username);
  const lock = readJSON(tabLockKey);
  if (lock && lock.tabId === tabId) {
    localStorage.removeItem(tabLockKey);
  }
}

async function logout() {
  localStorage.removeItem(QUIZ_META_KEY);
  releaseTabLock();
  localStorage.removeItem(CURRENT_SESSION_ID_KEY);
  localStorage.removeItem(CURRENT_USERNAME_KEY);
  if (window.FirebaseSession) {
    await FirebaseSession.logoutCurrentUser(true);
    return;
  }
  window.location.href = "login.html";
}

async function setupPageSecurity() {
  const page = getPageName();
  if (page !== "index.html" && page !== "login.html" && page !== "") {
    if (!await requireAuth()) return false;
    if (!acquireTabLockOrBlock()) return false;
    setInterval(() => {
      refreshSessionHeartbeat();
      refreshTabLock();
    }, LOCK_REFRESH_MS);
  }
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);
  return true;
}

function chunkQuestions(questions, size) {
  const chunks = [];
  for (let i = 0; i < questions.length; i += size) {
    chunks.push(questions.slice(i, i + size));
  }
  return chunks;
}

function buildQuizStateKey(sessionId, setIndex) {
  return `${QUIZ_STATE_PREFIX}${sessionId}_${setIndex}`;
}

function createFreshQuizState(setIndex) {
  const meta = readJSON(QUIZ_META_KEY) || { unit: "unit1" };
  const questions = getQuestionsForUnit(meta.unit);
  const setQuestions = chunkQuestions(questions, getSetSizeForUnit(meta.unit))[setIndex] || [];
  return {
    setIndex,
    startedAt: Date.now(),
    currentQuestion: 0,
    answers: new Array(setQuestions.length).fill(null),
    submitted: false
  };
}

function saveQuizState(state) {
  const sessionId = localStorage.getItem(CURRENT_SESSION_ID_KEY);
  writeJSON(buildQuizStateKey(sessionId, state.setIndex), state);
}

function loadQuizState(setIndex) {
  const sessionId = localStorage.getItem(CURRENT_SESSION_ID_KEY);
  return readJSON(buildQuizStateKey(sessionId, setIndex));
}

function finalizeResult(questions, state) {
  let score = 0;
  state.answers.forEach((ans, idx) => {
    if (ans === questions[idx].answer) score += 1;
  });
  const total = questions.length;
  const percentage = total ? ((score / total) * 100).toFixed(2) : "0.00";
  writeJSON(RESULT_KEY, {
    score,
    total,
    percentage,
    setIndex: state.setIndex,
    unit: (readJSON(QUIZ_META_KEY) || {}).unit || "unit1"
  });
}

function initLoginPage() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  function validateCredentialsFromForm() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    if (!username || !password) {
      showInlineMessage("loginMessage", "Email and password are required.");
      return null;
    }
    return { email: username, password };
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const auth = validateCredentialsFromForm();
    if (!auth) return;
    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) submitBtn.disabled = true;

    try {
      await FirebaseSession.loginWithEmailPassword(auth.email, auth.password);
      window.location.href = "dashobord.html";
    } catch (error) {
      showInlineMessage("loginMessage", error.message || "Login failed.");
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}

async function initLandingPage() {
  if (!await setupPageSecurity()) return;
  const unit1Btn = document.getElementById("unit1Btn");
  const unit2Btn = document.getElementById("unit2Btn");
  const unit3Btn = document.getElementById("unit3Btn");
  const unit4Btn = document.getElementById("unit4Btn");
  const unit5Btn = document.getElementById("unit5Btn");
  if (unit1Btn) {
    unit1Btn.addEventListener("click", () => {
      window.location.href = "unit1.html";
    });
  }
  if (unit2Btn) {
    unit2Btn.addEventListener("click", () => {
      window.location.href = "unit2.html";
    });
  }
  if (unit3Btn) {
    unit3Btn.addEventListener("click", () => {
      window.location.href = "unit3.html";
    });
  }
  if (unit4Btn) {
    unit4Btn.addEventListener("click", () => {
      window.location.href = "unit4.html";
    });
  }
  if (unit5Btn) {
    unit5Btn.addEventListener("click", () => {
      window.location.href = "unit5.html";
    });
  }
  const manageUsersBtn = document.getElementById("manageUsersBtn");
  if (manageUsersBtn && await isCurrentUserOwner()) {
    manageUsersBtn.classList.remove("hidden");
    manageUsersBtn.addEventListener("click", () => {
      window.location.href = "owner.html";
    });
  }
}

async function initUnit1Page() {
  if (!await setupPageSecurity()) return;
  const setContainer = document.getElementById("setContainer");
  const sets = chunkQuestions(unit1Questions, UNIT1_SET_SIZE);
  sets.forEach((setQuestions, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = `Set ${idx + 1} (${setQuestions.length} Qs)`;
    btn.addEventListener("click", () => {
      writeJSON(QUIZ_META_KEY, { unit: "unit1", setIndex: idx });
      window.location.href = "quiz.html";
    });
    setContainer.appendChild(btn);
  });

  const toLandingBtn = document.getElementById("toLandingBtn");
  if (toLandingBtn) {
    toLandingBtn.addEventListener("click", () => {
      window.location.href = "dashobord.html";
    });
  }
}

async function initUnit2Page() {
  if (!await setupPageSecurity()) return;
  const setContainer = document.getElementById("setContainer");
  const sets = chunkQuestions(unit2Questions, UNIT2_SET_SIZE);
  sets.forEach((setQuestions, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = `Set ${idx + 1} (${setQuestions.length} Qs)`;
    btn.addEventListener("click", () => {
      writeJSON(QUIZ_META_KEY, { unit: "unit2", setIndex: idx });
      window.location.href = "quiz.html";
    });
    setContainer.appendChild(btn);
  });

  const toLandingBtn = document.getElementById("toLandingBtn");
  if (toLandingBtn) {
    toLandingBtn.addEventListener("click", () => {
      window.location.href = "dashobord.html";
    });
  }
}

async function initUnit3Page() {
  if (!await setupPageSecurity()) return;
  const setContainer = document.getElementById("setContainer");
  const sets = chunkQuestions(unit3Questions, UNIT3_SET_SIZE);
  sets.forEach((setQuestions, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = `Set ${idx + 1} (${setQuestions.length} Qs)`;
    btn.addEventListener("click", () => {
      writeJSON(QUIZ_META_KEY, { unit: "unit3", setIndex: idx });
      window.location.href = "quiz.html";
    });
    setContainer.appendChild(btn);
  });

  const toLandingBtn = document.getElementById("toLandingBtn");
  if (toLandingBtn) {
    toLandingBtn.addEventListener("click", () => {
      window.location.href = "dashobord.html";
    });
  }
}

async function initUnit4Page() {
  if (!await setupPageSecurity()) return;
  const setContainer = document.getElementById("setContainer");
  const sets = chunkQuestions(unit4Questions, UNIT4_SET_SIZE);
  sets.forEach((setQuestions, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = `Set ${idx + 1} (${setQuestions.length} Qs)`;
    btn.addEventListener("click", () => {
      writeJSON(QUIZ_META_KEY, { unit: "unit4", setIndex: idx });
      window.location.href = "quiz.html";
    });
    setContainer.appendChild(btn);
  });

  const toLandingBtn = document.getElementById("toLandingBtn");
  if (toLandingBtn) {
    toLandingBtn.addEventListener("click", () => {
      window.location.href = "dashobord.html";
    });
  }
}

async function initUnit5Page() {
  if (!await setupPageSecurity()) return;
  const setContainer = document.getElementById("setContainer");
  const sets = chunkQuestions(unit5Questions, UNIT5_SET_SIZE);
  sets.forEach((setQuestions, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn primary";
    btn.textContent = `Set ${idx + 1} (${setQuestions.length} Qs)`;
    btn.addEventListener("click", () => {
      writeJSON(QUIZ_META_KEY, { unit: "unit5", setIndex: idx });
      window.location.href = "quiz.html";
    });
    setContainer.appendChild(btn);
  });

  const toLandingBtn = document.getElementById("toLandingBtn");
  if (toLandingBtn) {
    toLandingBtn.addEventListener("click", () => {
      window.location.href = "dashobord.html";
    });
  }
}

function showPopup(message) {
  const popup = document.getElementById("feedbackPopup");
  if (!popup) return;
  popup.textContent = message;
  popup.classList.add("show");
  setTimeout(() => popup.classList.remove("show"), 450);
}

function protectBackButton() {
  history.pushState(null, "", location.href);
  window.addEventListener("popstate", () => {
    history.pushState(null, "", location.href);
    showPopup("Back navigation is disabled during quiz.");
  });
}

async function initQuizPage() {
  if (!await setupPageSecurity()) return;
  protectBackButton();

  const meta = readJSON(QUIZ_META_KEY);
  if (!meta || typeof meta.setIndex !== "number" || !meta.unit) {
    window.location.href = "unit1.html";
    return;
  }
  const questionsByUnit = getQuestionsForUnit(meta.unit);
  const sets = chunkQuestions(questionsByUnit, getSetSizeForUnit(meta.unit));
  const questions = sets[meta.setIndex] || [];
  if (!questions.length) {
    window.location.href = meta.unit === "unit2" ? "unit2.html" : (meta.unit === "unit3" ? "unit3.html" : (meta.unit === "unit4" ? "unit4.html" : (meta.unit === "unit5" ? "unit5.html" : "unit1.html")));
    return;
  }

  let state = loadQuizState(meta.setIndex);
  if (!state || state.submitted) {
    state = createFreshQuizState(meta.setIndex);
    saveQuizState(state);
  }

  const setTitle = document.getElementById("setTitle");
  const progressText = document.getElementById("progressText");
  const questionText = document.getElementById("questionText");
  const optionsList = document.getElementById("optionsList");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  const unitLabel = meta.unit === "unit2" ? "Unit 2" : (meta.unit === "unit3" ? "Unit 3" : (meta.unit === "unit4" ? "Unit 4" : (meta.unit === "unit5" ? "Unit 5" : "Unit 1")));
  setTitle.textContent = `${unitLabel} - Set ${state.setIndex + 1}`;

  function submitQuiz() {
    state.submitted = true;
    saveQuizState(state);
    finalizeResult(questions, state);
    window.location.href = "result.html";
  }

  function renderQuestion() {
    const idx = state.currentQuestion;
    const currentQ = questions[idx];
    progressText.textContent = `Question ${idx + 1} / ${questions.length}`;
    questionText.textContent = currentQ.question;
    optionsList.innerHTML = "";

    currentQ.options.forEach((opt, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "btn option-btn";
      btn.textContent = opt;

      const selected = state.answers[idx];
      const alreadyAnswered = selected !== null;
      if (alreadyAnswered) {
        btn.disabled = true;
        if (optIdx === currentQ.answer) btn.classList.add("correct");
        if (optIdx === selected && selected !== currentQ.answer) btn.classList.add("wrong");
      }

      btn.addEventListener("click", () => {
        if (state.answers[idx] !== null) return;
        state.answers[idx] = optIdx;
        saveQuizState(state);
        if (optIdx === currentQ.answer) {
          showPopup("Correct ✅");
        } else {
          showPopup("Wrong ❌");
        }
        renderQuestion();
        setTimeout(() => {
          if (state.currentQuestion < questions.length - 1) {
            state.currentQuestion += 1;
            saveQuizState(state);
            renderQuestion();
          } else {
            submitQuiz();
          }
        }, 500);
      });

      optionsList.appendChild(btn);
    });

    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === questions.length - 1;
  }

  prevBtn.addEventListener("click", () => {
    if (state.currentQuestion > 0) {
      state.currentQuestion -= 1;
      saveQuizState(state);
      renderQuestion();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (state.currentQuestion < questions.length - 1) {
      state.currentQuestion += 1;
      saveQuizState(state);
      renderQuestion();
    }
  });

  submitBtn.addEventListener("click", submitQuiz);

  renderQuestion();
}

async function initResultPage() {
  if (!await setupPageSecurity()) return;
  const result = readJSON(RESULT_KEY);
  if (!result) {
    window.location.href = "unit1.html";
    return;
  }
  const unitLabel = result.unit === "unit2" ? "Unit 2" : (result.unit === "unit3" ? "Unit 3" : (result.unit === "unit4" ? "Unit 4" : (result.unit === "unit5" ? "Unit 5" : "Unit 1")));
  const resultTitle = document.getElementById("resultTitle");
  const unitPage = result.unit === "unit2" ? "unit2.html" : (result.unit === "unit3" ? "unit3.html" : (result.unit === "unit4" ? "unit4.html" : (result.unit === "unit5" ? "unit5.html" : "unit1.html")));
  if (resultTitle) {
    resultTitle.textContent = `${unitLabel} Test Completed`;
  }

  document.getElementById("scoreValue").textContent = String(result.score);
  document.getElementById("totalValue").textContent = String(result.total);
  document.getElementById("percentValue").textContent = `${result.percentage}%`;

  const retrySetBtn = document.getElementById("retrySetBtn");
  const toSetsBtn = document.getElementById("toSetsBtn");

  retrySetBtn.addEventListener("click", () => {
    writeJSON(QUIZ_META_KEY, { unit: result.unit || "unit1", setIndex: result.setIndex });
    const sessionId = localStorage.getItem(CURRENT_SESSION_ID_KEY);
    localStorage.removeItem(buildQuizStateKey(sessionId, result.setIndex));
    window.location.href = "quiz.html";
  });

  toSetsBtn.addEventListener("click", () => {
    window.location.href = unitPage;
  });
}

async function initOwnerPage() {
  if (!await setupPageSecurity()) return;
  if (!await isCurrentUserOwner()) {
    window.location.href = "dashobord.html";
    return;
  }

  const usersList = document.getElementById("usersList");
  const suspectedLogsList = document.getElementById("suspectedLogsList");
  const form = document.getElementById("ownerUserForm");
  const ownerMessage = document.getElementById("ownerMessage");
  const toLandingBtn = document.getElementById("toLandingBtn");

  function setOwnerMessage(message) {
    if (ownerMessage) ownerMessage.textContent = message;
  }

  async function renderUsers() {
    const users = await FirebaseSession.listFirebaseUsersForOwner();
    usersList.innerHTML = "";

    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "user-row";

      const info = document.createElement("div");
      info.className = "user-info";
      const isBlocked = Boolean(user.blocked);
      info.innerHTML = `<strong>${user.email || user.uid}</strong> (${user.role || "student"}) - ${isBlocked ? "Blocked" : "Active"}`;

      const actions = document.createElement("div");
      actions.className = "row-gap";

      const toggleBlockBtn = document.createElement("button");
      toggleBlockBtn.className = "btn ghost";
      toggleBlockBtn.textContent = isBlocked ? "Unblock" : "Block";
      toggleBlockBtn.disabled = user.uid === FirebaseSession.auth.currentUser.uid;
      toggleBlockBtn.addEventListener("click", async () => {
        toggleBlockBtn.disabled = true;
        try {
          await FirebaseSession.setFirebaseUserBlocked(user.uid, !isBlocked);
          setOwnerMessage(`${user.email || user.uid} is now ${isBlocked ? "unblocked" : "blocked"}.`);
          await renderUsers();
          await renderSuspectedLogs();
        } catch (error) {
          setOwnerMessage(error.message || "Could not update user.");
          toggleBlockBtn.disabled = false;
        }
      });

      actions.appendChild(toggleBlockBtn);
      card.appendChild(info);
      card.appendChild(actions);
      usersList.appendChild(card);
    });
  }

  function formatLogTime(value) {
    if (!value) return "Unknown time";
    const millis = typeof value.toMillis === "function"
      ? value.toMillis()
      : typeof value.seconds === "number"
        ? value.seconds * 1000
        : Number(value);
    if (!millis) return "Unknown time";
    return new Date(millis).toLocaleString();
  }

  async function renderSuspectedLogs() {
    if (!suspectedLogsList) return;
    const logs = await FirebaseSession.listSuspectedLoginLogsForOwner();
    suspectedLogsList.innerHTML = "";

    if (!logs.length) {
      const empty = document.createElement("p");
      empty.className = "subtext";
      empty.textContent = "No suspected login attempts yet.";
      suspectedLogsList.appendChild(empty);
      return;
    }

    logs.forEach((log) => {
      const row = document.createElement("div");
      row.className = "log-row";

      const title = document.createElement("strong");
      title.textContent = log.email || log.userId || "Unknown user";

      const details = document.createElement("div");
      details.className = "log-details";
      details.textContent = `Old IP: ${log.oldIpAddress || "Unknown"} | New IP: ${log.newIpAddress || "Unknown"} | ${formatLogTime(log.detectedAt)}`;

      const reason = document.createElement("div");
      reason.className = "subtext";
      reason.textContent = log.reason || "Active session login attempt";

      row.appendChild(title);
      row.appendChild(details);
      row.appendChild(reason);
      suspectedLogsList.appendChild(row);
    });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("ownerUsername").value.trim();
    const password = document.getElementById("ownerPassword").value;
    const role = document.getElementById("ownerRole").value === "owner" ? "owner" : "student";
    const submitBtn = form.querySelector("button[type='submit']");

    if (!email || !password) {
      setOwnerMessage("Email and password are required.");
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    try {
      await FirebaseSession.createFirebaseUserAsOwner(email, password, role);
      setOwnerMessage(`Created user: ${email}`);
      form.reset();
      await renderUsers();
      await renderSuspectedLogs();
    } catch (error) {
      setOwnerMessage(error.message || "Could not create user.");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  toLandingBtn.addEventListener("click", () => {
    window.location.href = "dashobord.html";
  });

  try {
    await renderUsers();
    await renderSuspectedLogs();
  } catch (error) {
    setOwnerMessage(error.message || "Could not load users.");
  }
}

window.addEventListener("beforeunload", () => {
  refreshSessionHeartbeat();
  refreshTabLock();
});

window.addEventListener("storage", (event) => {
  const username = getCurrentUsername();
  const ownTabLockKey = getTabLockKey(username);
  if (event.key === ACTIVE_SESSIONS_KEY || event.key === ownTabLockKey || event.key === BLOCKED_USERS_KEY) {
    const page = getPageName();
    if (page !== "index.html" && page !== "login.html" && !acquireTabLockOrBlock()) {
      window.location.href = "login.html";
    }
  }
});

(async function boot() {
  sanitizeOwnerBlocks();
  const page = getPageName();
  if (page === "index.html" || page === "login.html" || page === "") initLoginPage();
  else if (page === "dashobord.html") await initLandingPage();
  else if (page === "unit1.html") await initUnit1Page();
  else if (page === "unit2.html") await initUnit2Page();
  else if (page === "unit3.html") await initUnit3Page();
  else if (page === "unit4.html") await initUnit4Page();
  else if (page === "unit5.html") await initUnit5Page();
  else if (page === "quiz.html") await initQuizPage();
  else if (page === "result.html") await initResultPage();
  else if (page === "owner.html") await initOwnerPage();
})();
