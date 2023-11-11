// Import the functions needed from the SDKs
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that we want to use
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";



// https://firebase.google.com/docs/web/setup#available-libraries

// Use "dotenv": "^16.0.3", in package.json if necessary
// Important: Please include .env file in root directory
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize analytics
export const analytics = getAnalytics(app);

// Initialize firebase file storage
export const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

//Google authentication
export const provider = new GoogleAuthProvider();

//Realtime database
const database = getDatabase(app);

export default app;
