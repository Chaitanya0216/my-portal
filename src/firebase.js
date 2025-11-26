import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDh22HWxynQdKrf1u_kIgsFM6matG8syYg",
  authDomain: "chandu-portal.firebaseapp.com",
  projectId: "chandu-portal",
  storageBucket: "chandu-portal.firebasestorage.app",
  messagingSenderId: "135097109170",
  appId: "1:135097109170:web:d6579078997b270a8b57ab"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };