// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore}from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALiT5vMwNxcGNfMDCd0PUIRm4twSaDMrE",
  authDomain: "chat-prueba-64e80.firebaseapp.com",
  projectId: "chat-prueba-64e80",
  storageBucket: "chat-prueba-64e80.appspot.com",
  messagingSenderId: "1030091160095",
  appId: "1:1030091160095:web:6ee8b9f61d51bb1b12332a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app)
export {db};