
// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAl5Xi8Y4tWVRKTlLcZNciq441ur-G2HtM",
  authDomain: "expense-tracker-c8372.firebaseapp.com",
  projectId: "expense-tracker-c8372",
  storageBucket: "expense-tracker-c8372.firebasestorage.app",
  messagingSenderId: "564673666498",
  appId: "1:564673666498:web:1aedb175c9e455f132ca5b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
