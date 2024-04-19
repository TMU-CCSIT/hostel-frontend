
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyBdcYAqgXCzPf8BoFY6XzAxGKZKSBOYMy4",
    authDomain: "fir-testing-8aa44.firebaseapp.com",
    projectId: "fir-testing-8aa44",
    storageBucket: "fir-testing-8aa44.appspot.com",
    messagingSenderId: "678561345878",
    appId: "1:678561345878:web:f8e8bcd7965398927e66f7",
    measurementId: "G-9SQJ96BJL5"
    
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};




