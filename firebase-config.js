// firebase-config.js
// Is file ko poora copy karein aur purani file se replace kar dein

const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

// Agar pehle se initialize hai toh dobara nahi karega
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Ye variables ab har page par kaam karenge
var db = firebase.firestore();
var auth = firebase.auth();
