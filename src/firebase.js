// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAhylFJcnpcEkf7NgRgPvAnQVqLjbLp-aU",
  authDomain: "clone-8774e.firebaseapp.com",
  projectId: "clone-8774e",
  storageBucket: "clone-8774e.appspot.com",
  messagingSenderId: "717142353709",
  appId: "1:717142353709:web:997de37035ba78c50715a4",
  measurementId: "G-T2JH41SMH3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
