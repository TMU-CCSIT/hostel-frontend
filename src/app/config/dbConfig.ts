import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  // measurementId: process.env.MEASUREMENT_ID

const firebaseConfig = {

  apiKey: "AIzaSyASX6IwMW047fzCvxwCjHz8mFUpn375bTQ",
  authDomain: "tmu-hostel-leave.firebaseapp.com",
  projectId: "tmu-hostel-leave",
  storageBucket: "tmu-hostel-leave.appspot.com",
  messagingSenderId: "706354092377",
  appId: "1:706354092377:web:fe59239d37f6a4343f1448",
  measurementId: "G-S74SVB9H6Y"
  
};
  
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };



