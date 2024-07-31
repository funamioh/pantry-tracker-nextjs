// Import the functions you need from the SDKs you need
// import dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
// };

const firebaseConfig = {
  apiKey: "AIzaSyAdDMPMldpOYaPP9wc9SwnYfWKSD3RuA0Q",
  authDomain: "inventory-management-app-790b1.firebaseapp.com",
  projectId: "inventory-management-app-790b1",
  storageBucket: "inventory-management-app-790b1.appspot.com",
  messagingSenderId: "98878513328",
  appId: "1:98878513328:web:54669770a766a3182a5b75",
  measurementId: "G-0T65BFM6DG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
