// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7d7dW6GgkjcnMn8awn968WEsBoSmXaAI",
  authDomain: "fzis-website-sign-in-system.firebaseapp.com",
  projectId: "fzis-website-sign-in-system",
  storageBucket: "fzis-website-sign-in-system.firebasestorage.app",
  messagingSenderId: "50429959401",
  appId: "1:50429959401:web:298e9afc35a3da4ff26478",
  measurementId: "G-PXBQ4J21JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);