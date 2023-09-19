// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAC05Y6NrvrTurSA2kTPLRFM3hPwlFRp0",
  authDomain: "my-cozy-library.firebaseapp.com",
  projectId: "my-cozy-library",
  storageBucket: "my-cozy-library.appspot.com",
  messagingSenderId: "320434565142",
  appId: "1:320434565142:web:2ebd6413b464ad8f268537",
  measurementId: "G-0LQZZ9RGV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
const analytics = getAnalytics(app);