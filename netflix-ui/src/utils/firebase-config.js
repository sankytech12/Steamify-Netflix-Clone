import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBCjg94fqW_kIZGI58hCtqCmuyS6i23Yfc",
  authDomain: "react-netflix-clone-b887b.firebaseapp.com",
  projectId: "react-netflix-clone-b887b",
  storageBucket: "react-netflix-clone-b887b.appspot.com",
  messagingSenderId: "356699125796",
  appId: "1:356699125796:web:b10f688dae107bce2a40b1",
  measurementId: "G-4ZC96QGDDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);