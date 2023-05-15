import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKg--0WBBljUNzBdLdW6WdkWgYPIiUJpk",
  authDomain: "whatsapp-clone-dad8a.firebaseapp.com",
  projectId: "whatsapp-clone-dad8a",
  storageBucket: "whatsapp-clone-dad8a.appspot.com",
  messagingSenderId: "923816751913",
  appId: "1:923816751913:web:72f238b24f4adf7b44bd38",
  measurementId: "G-T5PHZ9XKGR",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, firebaseApp };
export default db;
