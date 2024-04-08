// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth,
signInWithPopup,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
 sendPasswordResetEmail,
     signOut,
} from "firebase/auth";

import { getFirestore, query, getDocs, collection, where, addDoc,} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQft2o85OLII0XN1Cp4XXxkpwmyXOCDKg",
  authDomain: "voteit-e4f9d.firebaseapp.com",
  projectId: "voteit-e4f9d",
  storageBucket: "voteit-e4f9d.appspot.com",
  messagingSenderId: "860165587659",
  appId: "1:860165587659:web:9621aed8bdaeb87bffd14e",
  measurementId: "G-WCS7Y0D4WT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const google = new GoogleAuthProvider();