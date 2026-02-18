// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Global Variables - Inhe hum har page par use karenge
const db = firebase.firestore();
const auth = firebase.auth();

// Optional: Enable offline persistence (Taki internet slow hone par bhi data dikhe)
db.settings({ cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED });
db.enablePersistence().catch((err) => {
    console.error("Persistence failed:", err.code);
});
