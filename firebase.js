// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyKtic4IU6_8CUSuHODFz2ygWYJxSMbIU",
  authDomain: "robopalette-9babf.firebaseapp.com",
  projectId: "robopalette-9babf",
  storageBucket: "robopalette-9babf.appspot.com",
  messagingSenderId: "491613906517",
  appId: "1:491613906517:web:e66e77f65b7d21863116dc",
  measurementId: "G-4KRDZ7WC4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)