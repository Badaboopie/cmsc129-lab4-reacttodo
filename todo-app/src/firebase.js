// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2rUU5jH4QNp-u_aGPYdZ6Mb0V9OWNzAc",
  authDomain: "tasktrackergd.firebaseapp.com",
  projectId: "tasktrackergd",
  storageBucket: "tasktrackergd.appspot.com",
  messagingSenderId: "34816558165",
  appId: "1:34816558165:web:0af80d696b2095e2aec0dc",
  measurementId: "G-Q41JES1Y4G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);