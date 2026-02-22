import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAWqbcd4-XTUvBoMTJ_2Zbnj6bDTTs7qjQ",
    authDomain: "chittorgarh-tourism-d47d5.firebaseapp.com",
    projectId: "chittorgarh-tourism-d47d5",
    storageBucket: "chittorgarh-tourism-d47d5.firebasestorage.app",
    messagingSenderId: "643198199090",
    appId: "1:643198199090:web:0e109be855611ba313632b",
    measurementId: "G-J10EQ1J444"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
