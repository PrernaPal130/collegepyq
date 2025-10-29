// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8gjW91fetZdoDGkZKbCO7psCbREZ7gjs",
  authDomain: "college-6ca5e.firebaseapp.com",
  projectId: "college-6ca5e",
  storageBucket: "college-6ca5e.firebasestorage.app",
  messagingSenderId: "69666981029",
  appId: "1:69666981029:web:51eac639c8f5ebd10eb94c",
  measurementId: "G-ZBRK756KHY",
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

// Export instances
export { app, db, storage, analytics };
