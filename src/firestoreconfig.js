import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD089CrCdPF_V3Sn6OOujN8IJgAoB5iRrg",
  authDomain: "react-firebase-test-8ceb8.firebaseapp.com",
  projectId: "react-firebase-test-8ceb8",
  storageBucket: "react-firebase-test-8ceb8.appspot.com",
  messagingSenderId: "1019789572477",
  appId: "1:1019789572477:web:7031a3a157fc78ed953414",
  measurementId: "G-LN7FH0MX50",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const database = fire.firestore();

export { database };
