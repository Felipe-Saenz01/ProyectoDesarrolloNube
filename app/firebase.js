// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
//metodos para Authentication 
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
//metodos para Firestore
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASqZ0R1zNF2MoM2qIOQERziuZ02zyP7jU",
  authDomain: "proyectoclouddevelop.firebaseapp.com",
  projectId: "proyectoclouddevelop",
  storageBucket: "proyectoclouddevelop.appspot.com",
  messagingSenderId: "372281309081",
  appId: "1:372281309081:web:4431f5f25b969836694508",
  measurementId: "G-219LLFNZX6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//Initialize Autentication Login
export const auth = getAuth(app);
// Initialize Firestore
export const db = getFirestore(app);

