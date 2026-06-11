// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCavn8e1abOzuEuTMhO6sx5fi7jPk1W1TM",
  authDomain: "quizora-d3e82.firebaseapp.com",
  projectId: "quizora-d3e82",
  storageBucket: "quizora-d3e82.firebasestorage.app",
  messagingSenderId: "744567175965",
  appId: "1:744567175965:web:715f03161f003df2bf3ff4",
  measurementId: "G-Y2L9TKEH75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);