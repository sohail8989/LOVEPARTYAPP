// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    PhoneAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDsEDoAGFNF-CQknP25rhWP_RoxtvgeCjc",
    authDomain: "loverpartyapp.firebaseapp.com",
    databaseURL: "https://loverpartyapp-default-rtdb.firebaseio.com",
    projectId: "loverpartyapp",
    storageBucket: "loverpartyapp.firebasestorage.app",
    messagingSenderId: "1064077187047",
    appId: "1:1064077187047:web:24f05ce5328a31a9f34f42",
    measurementId: "G-K7BV8V510W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Database add ho gaya

export { 
    auth, 
    db, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    PhoneAuthProvider,
    RecaptchaVerifier,
    signInWithPhoneNumber
};
