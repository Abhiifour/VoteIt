import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Move this to .env file for security
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAQft2o85OLII0XN1Cp4XXxkpwmyXOCDKg",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "voteit-e4f9d.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "voteit-e4f9d",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "voteit-e4f9d.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "860165587659",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:860165587659:web:9621aed8bdaeb87bffd14e",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-WCS7Y0D4WT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics conditionally
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)))
    .catch(e => console.error('Analytics error:', e));
}

// Google Auth Provider with custom scopes
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Auth helper functions with error handling
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/popup-blocked') {
        throw new Error('Please enable popups for this website');
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

const loginWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('Email not found');
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

const registerWithEmailAndPassword = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Email already registered');
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('Email not found');
      }
      throw new Error(error.message);
    }
    throw error;
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout');
  }
};

// Database helper functions
const addDocument = async (collectionName, data) => {
  try {
    return await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Add document error:', error);
    throw new Error('Failed to add document');
  }
};

const getDocuments = async (collectionName, conditions = []) => {
  try {
    let q = collection(db, collectionName);
    
    if (conditions.length) {
      q = query(q, ...conditions.map(c => where(c.field, c.operator, c.value)));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Get documents error:', error);
    throw new Error('Failed to fetch documents');
  }
};

export {
  auth,
  db,
  analytics,
  signInWithGoogle,
  loginWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  addDocument,
  getDocuments,
  googleProvider as google
};