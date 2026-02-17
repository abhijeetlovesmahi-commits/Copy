const firebaseConfig = {
  apiKey: "AIzaSyDqDmsMp2eAuHJBcjW-ciO2JcLTXapiIrs",
  authDomain: "the-lalit-d7472.firebaseapp.com",
  projectId: "the-lalit-d7472",
  appId: "1:479237084229:web:31078825739b3c5712ff2c"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();
var auth = firebase.auth();
