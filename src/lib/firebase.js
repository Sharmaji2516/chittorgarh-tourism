import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWqbcd4-XTUvBoMTJ_2Zbnj6bDTTs7qjQ",
  authDomain: "chittorgarh-tourism-d47d5.firebaseapp.com",
  projectId: "chittorgarh-tourism-d47d5",
  storageBucket: "chittorgarh-tourism-d47d5.firebasestorage.app",
  messagingSenderId: "643198199090",
  appId: "1:643198199090:web:0e109be855611ba313632b",
  measurementId: "G-J10EQ1J444"
};

// Initialize Firebase only if keys are provided
let db = null;
let analytics = null;
let storage = null;
let isFirebaseConfigured = false;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        analytics = getAnalytics(app);
        storage = getStorage(app);
        isFirebaseConfigured = true;
    } else {
        console.warn("Firebase is using placeholder keys. Data will not be saved until you add your real config.");
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

/**
 * Saves a booking to Firestore
 * @param {Object} bookingData 
 */
export const saveBookingToFirebase = async (bookingData) => {
    if (!isFirebaseConfigured) {
        console.log("Firebase not configured. Proceeding to WhatsApp (Bypassing DB).");
        return "bypassed";
    }

    try {
        const docRef = await addDoc(collection(db, "bookings"), {
            ...bookingData,
            createdAt: serverTimestamp(),
            source: 'website_v2'
        });
        console.log("Booking saved with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

export { db, storage };

