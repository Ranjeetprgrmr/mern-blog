// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4dcea.firebaseapp.com",
  projectId: "mern-blog-4dcea",
  storageBucket: "mern-blog-4dcea.firebasestorage.app",
  messagingSenderId: "1038924194740",
  appId: "1:1038924194740:web:5cdfdd1e846692c43888e1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

