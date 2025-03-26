// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbCzzqz3yalo3c78Eom5wjIxVJD986Ge8",
  authDomain: "e-commerce-6daa8.firebaseapp.com",
  projectId: "e-commerce-6daa8",
  storageBucket: "e-commerce-6daa8.firebasestorage.app",
  messagingSenderId: "81875767925",
  appId: "1:81875767925:web:7914a7eae126102e7a9e3c",
  measurementId: "G-G65NVX9Y3D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
