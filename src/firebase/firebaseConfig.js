// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQZtcS6C8qxwQfq0gyRcivqz4TLyr7BKM",
  authDomain: "rhythmara-admin-console.firebaseapp.com",
  databaseURL:
    "https://rhythmara-admin-console-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "rhythmara-admin-console",
  storageBucket: "rhythmara-admin-console.firebasestorage.app",
  messagingSenderId: "825509786435",
  appId: "1:825509786435:web:04ffcae96085d9b987f5f6",
  measurementId: "G-EPTZ243DWV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
