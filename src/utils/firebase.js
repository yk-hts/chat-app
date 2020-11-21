import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCVkUJm8BU7fWfSAXOuhveFQlOpeyY8oLY",
  authDomain: "chat-tutorial-a8a9e.firebaseapp.com",
  databaseURL: "https://chat-tutorial-a8a9e.firebaseio.com",
  projectId: "chat-tutorial-a8a9e",
  storageBucket: "chat-tutorial-a8a9e.appspot.com",
  messagingSenderId: "913613350766",
  appId: "1:913613350766:web:8d5c1082d0ba929152037f",
  measurementId: "G-6LRBPXL5XF",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
