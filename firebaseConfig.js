// Import Firebase core and required SDKs
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA8gjW91fetZdoDGkZKbCO7psCbREZ7gjs",
  authDomain: "college-6ca5e.firebaseapp.com",
  projectId: "college-6ca5e",
  storageBucket: "college-6ca5e.appspot.com",
  messagingSenderId: "69666981029",
  appId: "1:69666981029:web:51eac639c8f5ebd10eb94c",
  measurementId: "G-ZBRK756KHY",
};

// Ensure Firebase is initialized only once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Initialize analytics only in the browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, db, storage, analytics };
