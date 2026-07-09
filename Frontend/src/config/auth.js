import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase-config";

// Sign up with email/password
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// Sign in with email/password
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Sign in with Google popup
export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// Sign out
export function logOut() {
  return signOut(auth);
}

// Listen for auth state changes (call this once, e.g. in App.jsx)
export function watchAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}