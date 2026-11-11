/**
 * Frontend-Only Booking & Lead Relay Module
 * (Firebase client SDK safely decoupled for pure frontend architecture)
 * Preserves Telegram notification dispatch without requiring Firebase credentials.
 */

export const db = null;
export const storage = null;
export const isFirebaseConfigured = false;

/**
 * Frontend-only lead dispatch function:
 * Dispatches Telegram bot alert if env vars exist, while returning a clean status
 * so frontend components proceed to WhatsApp concierge without dependency on Firestore.
 */
export const saveBookingToFirebase = async (bookingData) => {
    try {
        const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        if (token && chatId) {
            const esc = (s) => (s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : 'Not specified');
            const phone = bookingData.phone || '';
            const cleanPhone = phone.replace(/\D/g, '');
            const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

            const text =
                `🏰 <b>CHITTORGARH TOURISM</b> 🏰\n` +
                `━━━━━━━━━━━━━━━━━━━━\n` +
                `🔥 <b>New Lead — visitchittorgarh.in</b>\n\n` +
                `🛡️ <b>Service:</b> <code>${esc(bookingData.pillarTitle || bookingData.category || 'General Inquiry')}</code>\n` +
                `📅 <b>Dates:</b> <code>${esc(bookingData.date || bookingData.startDate || 'N/A')} → ${esc(bookingData.endDate || 'N/A')}</code>\n` +
                `👥 <b>Travelers:</b> <code>${esc(bookingData.travelers || bookingData.travelerCount || 'N/A')}</code>\n\n` +
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
                            { text: '💬 Chat on WhatsApp', url: `https://wa.me/${waPhone}` }
                        ]]
                    }
                })
            }).catch(err => console.warn('Telegram fetch error (non-fatal):', err));
        }

        return `frontend-lead-${Date.now()}`;
    } catch (e) {
        console.warn("Lead relay notice:", e);
        return `frontend-lead-${Date.now()}`;
    }
};
