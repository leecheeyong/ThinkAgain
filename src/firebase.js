import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "thinkagain-b4c8c.firebaseapp.com",
  projectId: "thinkagain-b4c8c",
  storageBucket: "thinkagain-b4c8c.firebasestorage.app",
  messagingSenderId: "255509999152",
  appId: "1:255509999152:web:abf582d019c9747e4087f5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
