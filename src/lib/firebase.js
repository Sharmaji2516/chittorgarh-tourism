import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// NOTE: getAnalytics removed from eager init — it was loading Firebase Analytics
// on every page including homepage, adding 77KB+ of unused JS to initial load.
// Analytics is now handled separately via the GA4 gtag in index.html.

const firebaseConfig = {
  apiKey: "AIzaSyAWqbcd4-XTUvBoMTJ_2Zbnj6bDTTs7qjQ",
  authDomain: "chittorgarh-tourism-d47d5.firebaseapp.com",
  projectId: "chittorgarh-tourism-d47d5",
  storageBucket: "chittorgarh-tourism-d47d5.firebasestorage.app",
  messagingSenderId: "643198199090",
  appId: "1:643198199090:web:0e109be855611ba313632b",
  measurementId: "G-J10EQ1J444"
};

let db = null;
let storage = null;
let isFirebaseConfigured = false;

try {
    if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        storage = getStorage(app);
        // Analytics intentionally NOT initialized here — reduces initial bundle by ~77KB
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

        const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
        if (token && chatId) {
            const esc = (s) => s ? String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : 'Not specified';
            const phone = bookingData.phone || '';
            const cleanPhone = phone.replace(/\D/g, '');
            const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

            const text = 
                `🏰 <b>CHITTORGARH TOURISM</b> 🏰\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `🔥 <b>New Lead — visitchittorgarh.in</b>\n\n` +
                `🛡️ <b>Service:</b> <code>${esc(bookingData.pillarTitle || bookingData.category || 'General')}</code>\n` +
                `📅 <b>Dates:</b> <code>${esc(bookingData.date || bookingData.startDate || 'N/A')} → ${esc(bookingData.endDate || 'N/A')}</code>\n` +
                `👥 <b>Travelers:</b> <code>${esc(bookingData.travelers)}</code>\n\n` +
                `<b>👤 Guest Details:</b>\n` +
                `• <b>Name:</b> ${esc(bookingData.name)}\n` +
                `• <b>Phone:</b> <code>${esc(bookingData.phone)}</code>\n` +
                `• <b>Email:</b> <code>${esc(bookingData.email)}</code>\n` +
                `━━━━━━━━━━━━━━━━━━━━`;

            fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: text,
                    parse_mode: 'HTML',
                    reply_markup: {
                        inline_keyboard: [[
                            { text: '💬 Chat on WhatsApp', url: `https://wa.me/${waPhone}` },
                            { text: '📞 Call Customer', url: `tel:${phone}` }
                        ]]
                    }
                })
            }).then(r => r.json()).then(d => {
                if (!d.ok) console.error('Telegram API error:', d);
                else console.log('Telegram notification sent OK:', d.result?.message_id);
            }).catch(err => console.error('Telegram fetch error:', err));
        }

        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        return null;
    }
};

export { db, storage };
