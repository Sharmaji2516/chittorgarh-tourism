import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import html2pdf from 'html2pdf.js';
import { db, storage } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, addDoc, updateDoc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Lock, 
    LogOut, 
    Phone, 
    Calendar, 
    User, 
    Trash2, 
    CheckCircle2, 
    Clock, 
    ExternalLink, 
    Search,
    RefreshCw,
    TrendingUp,
    MessageSquare,
    AlertCircle,
    Loader2,
    Globe,
    Home,
    Car,
    Hotel,
    UserCheck,
    X,
    MapPin,
    Users,
    Info,
    Printer,
    FileText,
    Edit2,
    Save,
    Send,
    MessageCircle,
    Mail,
    QrCode,
    UtensilsCrossed,
    Coffee,
    Plus,
    Star
} from 'lucide-react';

const formatPillarTitle = (title) => {
    if (!title) return title;
    if (title.toUpperCase() === "BOOK THE FORT LEGACY PACKAGE") {
        return "Fort Legacy Package";
    }
    return title;
};

const getCategoryCue = (type) => {
    const cues = {
        taxi: 'TAXI | Driver',
        hotel: 'HOTEL | Accommodation',
        guide: 'GUIDE | Expert',
        restaurant: 'RESTAURANT | Dining',
        cafe: 'CAFE | Hangouts'
    };
    return cues[type] || type.toUpperCase();
};

import { cn } from '../utils/cn';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const SENDER_EMAIL = "info@visitchittorgarh.in";
const SENDER_NAME = "Chittorgarh Tourism";


const SERVICE_KEY_MAP = {
    'Private Taxi': 'taxi',
    'Hotel Booking': 'hotel',
    'Private Guide': 'guide',
    'Restaurant Reservation': 'restaurant',
    'Cafe & Hangouts': 'cafe'
};

const TRANSPORT_OPTIONS = ['Luxury Sedan', 'Royal SUV', 'Mini Bus', 'Not Needed'];
const HOTEL_OPTIONS = ['Heritage Palace', 'Boutique Hotel', 'Eco Resort', 'Not Needed'];
const GUIDE_OPTIONS = ['History Scholar', 'Photography Expert', 'Storyteller', 'Not Needed'];

const formatDateReadable = (dateStr) => {
    if (!dateStr) return "Not Set";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
};

const BookingDetailModal = ({ booking, providers = [], onClose, onUpdate }) => {

    const [editMode, setEditMode] = useState(false);
    const [localData, setLocalData] = useState(booking);
    const [isSaving, setIsSaving] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [emailLanguage, setEmailLanguage] = useState('hi');

    useEffect(() => {
        if (!editMode) {
            setLocalData(booking);
        }
    }, [booking, editMode]);

    const [selectedServices, setSelectedServices] = useState({
        'Private Taxi': booking.transport !== 'Not Needed',
        'Hotel Booking': booking.hotel !== 'Not Needed',
        'Private Guide': booking.guide !== 'Not Needed',
        'Restaurant Reservation': booking.restaurantRequested || false,
        'Cafe & Hangouts': booking.cafeRequested || false
    });

    if (!booking) return null;

    const handlePrint = () => {
        window.print();
    };

    const calculateLiveTotal = (data) => {
        return (Number(data.transportPrice || 0) + Number(data.hotelPrice || 0) + Number(data.guidePrice || 0));
    };

    const generatePassCode = async () => {
        const currentCount = localData.passGenerationCount || 0;
        if (currentCount >= 2) {
            if (!window.confirm("This pass has already been generated twice. Generating a new one will overwrite the previous code. Are you sure you want to proceed?")) {
                return;
            }
        }

        setIsSaving(true);
        try {
            const newCode = Math.floor(100000 + Math.random() * 900000).toString();
            const servicesList = Object.entries(selectedServices).filter(([_, v]) => v).map(([k, _]) => k.toUpperCase()).join(", ");
            const newGenerationCount = currentCount + 1;
            
            // 1. Update Booking Data
            const updateData = {
                ...localData,
                passCode: newCode,
                passGenerationCount: newGenerationCount,
                includedServices: Object.keys(selectedServices).filter(k => selectedServices[k])
            };

            await updateDoc(doc(db, "bookings", booking.id), {
                passCode: newCode,
                passGenerationCount: newGenerationCount,
                includedServices: updateData.includedServices
            });


            setLocalData(prev => ({ ...prev, ...updateData }));
            if (onUpdate) {
                onUpdate(booking.id, {
                    passCode: newCode,
                    passGenerationCount: newGenerationCount,
                    includedServices: updateData.includedServices
                });
            }
            setShowPass(true);
        } catch (err) {
            console.error("Pass Generation Error:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const handleUpdate = async () => {
        setIsSaving(true);
        try {
            const newTotal = calculateLiveTotal(localData);
            const updatedFields = {
                ...localData,
                totalAmount: newTotal,
                transportPrice: Number(localData.transportPrice || 0),
                hotelPrice: Number(localData.hotelPrice || 0),
                guidePrice: Number(localData.guidePrice || 0)
            };
            await updateDoc(doc(db, "bookings", booking.id), updatedFields);
            setEditMode(false);
            if (onUpdate) {
                onUpdate(booking.id, updatedFields);
            }
        } catch (err) {
            console.error("Update Error:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const sendQuotationEmail = async () => {
        if (!localData.email) {
            alert("Guest email is missing. Please add it in edit mode.");
            return;
        }

        setIsSaving(true);
        try {
            const total = calculateLiveTotal(localData);

            const element = document.getElementById('printable-bill');
            if (!element) {
                alert("Bill element not found!");
                setIsSaving(false);
                return;
            }

            // Temporarily make it visible for capture
            element.classList.remove('hidden');

            const opt = {
                margin:       0,
                filename:     'invoice.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            // Generate PDF and get base64
            const dataUri = await html2pdf().set(opt).from(element).output('datauristring');
            const base64Content = dataUri.split(',')[1];

            // Hide it again
            element.classList.add('hidden');

            const emailContentEn = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #D4AF37; border-radius: 30px; overflow: hidden; background: #ffffff; color: #1a2634; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
                    <!-- Header Image -->
                    <div style="width: 100%; overflow: hidden; background: #ffffff;">
                        <img src="https://i.postimg.cc/Dz8VMpnc/Fort.jpg" alt="Chittorgarh Fort" style="width: 100%; height: auto; display: block;">
                    </div>

                    <!-- Header -->
                    <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900;">Royal Experience Quotation</h1>
                        <p style="color: rgba(26, 38, 52, 0.6); margin: 5px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">Heritage • Culture • Hospitality</p>
                    </div>

                    <div style="padding: 40px 30px;">
                        <p style="font-size: 18px; margin-bottom: 10px; color: #1a2634;">Namaste <b>${localData.name}</b> 🙏 ,</p>
                        <p style="font-size: 14px; line-height: 1.8; color: #333333; margin-bottom: 30px;">
                            Thank you for choosing Chittorgarh Tourism. We are delighted to assist you in planning your visit to this land of valor and timeless heritage. Based on your preferences, here is your personalized proposal:
                        </p>

                        <!-- Quote Details Replacement -->
                        <div style="background: #f8f9fa; padding: 25px; border-radius: 20px; margin-bottom: 30px; border: 1px solid rgba(212, 175, 55, 0.2); text-align: center;">
                            <p style="margin: 0 0 10px; font-size: 16px; color: #D4AF37; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">📜 Detailed Invoice Attached</p>
                            <p style="margin: 0; font-size: 13px; color: #333333; line-height: 1.6;">
                                We have attached a detailed PDF of your official invoice to this email. Please review the attachment for complete breakdown of your package and payment details.
                            </p>
                        </div>

                        <div style="background: rgba(212, 175, 55, 0.1); border-left: 5px solid #D4AF37; padding: 25px; border-radius: 0 15px 15px 0; margin-bottom: 30px;">
                            <p style="margin: 0; font-size: 15px; color: #D4AF37; line-height: 1.6; font-weight: bold;">
                                Next Steps: Payment Required
                            </p>
                            <p style="margin: 10px 0 0; font-size: 14px; color: #333333; line-height: 1.6;">
                                1. Please read the attached PDF deeply.<br/>
                                2. After that, you need to make the payment for booking.<br/>
                                3. After making the payment, please share the screenshot on our WhatsApp number <b>7597451057</b>.<br/>
                                4. After that, our team will inform you about availability and the further process.
                            </p>
                        </div>

                        <p style="font-size: 13px; line-height: 1.6; color: #666666; text-align: center; font-style: italic;">
                            "The stones of Chittorgarh speak stories of valor. We look forward to helping you hear them."
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f8f9fa; padding: 40px 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                        <p style="margin: 0; font-size: 15px; font-weight: 900; color: #1a2634; letter-spacing: 1px;">Chittorgarh Tourism | Rajasthan 🚩</p>
                        <p style="margin: 12px 0 0; font-size: 16px; color: #D4AF37; font-weight: 900; letter-spacing: 2px;">"पधारो म्हारे देस" ❤️</p>

                        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid rgba(0,0,0,0.1); text-align: center; background: rgba(0,0,0,0.02); border-radius: 20px;">
                            <p style="margin: 0; font-size: 10px; color: #666666; font-style: italic; letter-spacing: 1px;">
                                This is a system generated email. Please do not reply on this mail.
                            </p>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                                <p style="margin: 0; font-size: 11px; color: #D4AF37; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                                    Official Support Channels
                                </p>
                                <p style="margin: 8px 0 0; font-size: 11px; color: #333333; line-height: 1.6;">
                                    If you have any queries, please contact on our official phone number and official email ID:
                                </p>
                                <p style="margin: 12px 0 0; font-size: 13px; color: #1a2634; font-weight: bold; letter-spacing: 0.5px;">
                                    Phone: +91 7597451057 &nbsp;|&nbsp; Email: chittortech@gmail.com
                                </p>
                            </div>
                        </div>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                            <p style="margin: 0; font-size: 10px; color: #666666; font-weight: bold; letter-spacing: 1px;">Powered by <b>Chittor Tech</b></p>
                            <img src="https://i.postimg.cc/B6rmNMnB/chittortech-logo-1775884354186.jpg" alt="Chittor Tech" style="height: 30px; opacity: 0.8; margin-top: 10px; margin-bottom: 10px;">
                            <p style="margin: 5px 0 0; font-size: 8px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Rajasthan's Upcoming Leading Tourism IT Partner</p>
                        </div>
                    </div>
                </div>
            `;

            const emailContentHi = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #D4AF37; border-radius: 30px; overflow: hidden; background: #ffffff; color: #1a2634; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
                    <!-- Header Image -->
                    <div style="width: 100%; overflow: hidden; background: #ffffff;">
                        <img src="https://i.postimg.cc/Dz8VMpnc/Fort.jpg" alt="Chittorgarh Fort" style="width: 100%; height: auto; display: block;">
                    </div>

                    <!-- Header -->
                    <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900;">शाही अनुभव कोटेशन</h1>
                        <p style="color: rgba(26, 38, 52, 0.6); margin: 5px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">Heritage • Culture • Hospitality</p>
                    </div>

                    <div style="padding: 40px 30px;">
                        <p style="font-size: 18px; margin-bottom: 10px; color: #1a2634;">नमस्ते <b>${localData.name}</b> 🙏 ,</p>
                        <p style="font-size: 14px; line-height: 1.8; color: #333333; margin-bottom: 30px;">
                            चित्तौड़गढ़ पर्यटन को चुनने के लिए धन्यवाद। हम वीरता और कालातीत विरासत की इस भूमि में आपकी यात्रा की योजना बनाने में आपकी सहायता करने के लिए प्रसन्न हैं। आपकी पसंद के आधार पर, यहाँ आपका व्यक्तिगत प्रस्ताव है:
                        </p>

                        <!-- Quote Details Replacement -->
                        <div style="background: #f8f9fa; padding: 25px; border-radius: 20px; margin-bottom: 30px; border: 1px solid rgba(212, 175, 55, 0.2); text-align: center;">
                            <p style="margin: 0 0 10px; font-size: 16px; color: #D4AF37; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">📜 विस्तृत इनवॉइस संलग्न है</p>
                            <p style="margin: 0; font-size: 13px; color: #333333; line-height: 1.6;">
                                हमने आपके आधिकारिक इनवॉइस की एक विस्तृत PDF इस ईमेल के साथ संलग्न की है। कृपया अपने पैकेज और भुगतान विवरण के पूर्ण विवरण के लिए अनुलग्नक (attachment) की समीक्षा करें।
                            </p>
                        </div>

                        <div style="background: rgba(212, 175, 55, 0.1); border-left: 5px solid #D4AF37; padding: 25px; border-radius: 0 15px 15px 0; margin-bottom: 30px;">
                            <p style="margin: 0; font-size: 15px; color: #D4AF37; line-height: 1.6; font-weight: bold;">
                                अगला कदम: भुगतान आवश्यक है
                            </p>
                            <p style="margin: 10px 0 0; font-size: 14px; color: #333333; line-height: 1.6;">
                                1. कृपया संलग्न PDF को ध्यान से पढ़ें। <br/>
                                2. इसके बाद आपको बुकिंग के लिए भुगतान (Payment) करना होगा। <br/>
                                3. भुगतान करने के बाद, कृपया स्क्रीनशॉट हमारे WhatsApp नंबर <b>7597451057</b> पर शेयर करें। <br/>
                                4. उसके बाद हमारी टीम आपको उपलब्धता (Availability) और आगे की प्रक्रिया के बारे में बता देगी।
                            </p>
                        </div>

                        <p style="font-size: 13px; line-height: 1.6; color: #666666; text-align: center; font-style: italic;">
                            "चित्तौड़गढ़ के पत्थर वीरता की कहानियां सुनाते हैं। हम उन्हें सुनने में आपकी मदद करने के लिए उत्सुक हैं।"
                        </p>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f8f9fa; padding: 40px 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                        <p style="margin: 0; font-size: 15px; font-weight: 900; color: #1a2634; letter-spacing: 1px;">Chittorgarh Tourism | राजस्थान 🚩</p>
                        <p style="margin: 12px 0 0; font-size: 16px; color: #D4AF37; font-weight: 900; letter-spacing: 2px;">"पधारो म्हारे देस" ❤️</p>

                        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid rgba(0,0,0,0.1); text-align: center; background: rgba(0,0,0,0.02); border-radius: 20px;">
                            <p style="margin: 0; font-size: 10px; color: #666666; font-style: italic; letter-spacing: 1px;">
                                यह एक सिस्टम जनरेटेड ईमेल है। कृपया इस पर उत्तर न दें।
                            </p>
                            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                                <p style="margin: 0; font-size: 11px; color: #D4AF37; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                                    आधिकारिक सहायता चैनल
                                </p>
                                <p style="margin: 8px 0 0; font-size: 11px; color: #333333; line-height: 1.6;">
                                    यदि आपके कोई प्रश्न हैं, तो कृपया हमारे आधिकारिक फोन नंबर और ईमेल आईडी पर संपर्क करें:
                                </p>
                                <p style="margin: 12px 0 0; font-size: 13px; color: #1a2634; font-weight: bold; letter-spacing: 0.5px;">
                                    Phone: +91 7597451057 &nbsp;|&nbsp; Email: chittortech@gmail.com
                                </p>
                            </div>
                        </div>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                            <p style="margin: 0; font-size: 10px; color: #666666; font-weight: bold; letter-spacing: 1px;">Powered by <b>Chittor Tech</b></p>
                            <img src="https://i.postimg.cc/B6rmNMnB/chittortech-logo-1775884354186.jpg" alt="Chittor Tech" style="height: 30px; opacity: 0.8; margin-top: 10px; margin-bottom: 10px;">
                            <p style="margin: 5px 0 0; font-size: 8px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Rajasthan's Upcoming Leading Tourism IT Partner</p>
                        </div>
                    </div>
                </div>
            `;

            const emailContent = emailLanguage === 'en' ? emailContentEn : emailContentHi;
            const emailSubject = emailLanguage === 'en' ? `👑 Your Chittorgarh Expedition Quote: ₹${total}` : `आपका चित्तौड़गढ़ टूर पैकेज कोटेशन: ₹${total}`;

            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
                    to: [{ email: localData.email, name: localData.name }],
                    subject: `👑 Your Chittorgarh Expedition Quote: ₹${total}`,
                    htmlContent: emailContent,
                    attachment: [
                        {
                            name: 'Bill.pdf',
                            content: base64Content
                        }
                    ]
                })
            });

            if (response.ok) {
                alert(`Quotation email successfully sent to ${localData.email}`);
            } else {
                const errorData = await response.json();
                alert(`Brevo Error: ${errorData.message || 'Failed to send'}`);
            }
        } catch (e) {
            console.error("Brevo Quote Error:", e);
            alert("Failed to send quotation email. Please verify guest email and API key.");
        } finally {
            setIsSaving(false);
        }
    };;

    const sendUpdateWhatsApp = () => {
        const total = calculateLiveTotal(localData);
        const phoneNumber = "91" + localData.phone?.replace(/[^0-9]/g, '');
        
        const messageEn = `*👑 Updated Royal Inquiry*\n\n` +
            `Hello ${localData.name}, we have updated your travel details based on current availability:\n\n` +
            `*🛡️ Package:* ${localData.pillarTitle || "Custom"}\n` +
            `*📅 Date:* ${formatDateReadable(localData.date)}\n\n` +
            `*-- Revised Options --*\n` +
            `*🚗 Transport:* ${localData.transport}\n` +
            `*🏨 Hotel:* ${localData.hotel}\n` +
            `*🚩 Guide:* ${localData.guide}\n\n` +
            `*💰 New Total Estimate: ₹${total}*\n\n` +
            `Please let us know if this works for you.`;
            
        const messageHi = `*👑 अपडेटेड रॉयल इंक्वायरी*\n\n` +
            `नमस्ते ${localData.name}, हमने वर्तमान उपलब्धता के आधार पर आपके यात्रा विवरण को अपडेट किया है:\n\n` +
            `*🛡️ पैकेज:* ${localData.pillarTitle || "कस्टम"}\n` +
            `*📅 तिथि:* ${formatDateReadable(localData.date)}\n\n` +
            `*-- संशोधित विकल्प --*\n` +
            `*🚗 परिवहन:* ${localData.transport}\n` +
            `*🏨 होटल:* ${localData.hotel}\n` +
            `*🚩 गाइड:* ${localData.guide}\n\n` +
            `*💰 नया कुल अनुमान: ₹${total}*\n\n` +
            `कृपया हमें बताएं कि क्या यह आपके लिए सही है।`;
            
        const message = emailLanguage === 'en' ? messageEn : messageHi;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const sendWelcomeMessage = () => {
        const phoneNumber = "91" + localData.phone?.replace(/[^0-9]/g, '');
        
        const messageEn = `*👑 Welcome to Chittorgarh!*\n\n` +
            `Hello ${localData.name}, thank you for choosing us for your heritage journey. We are excited to host you!\n\n` +
            `Our team is preparing your custom itinerary for *${localData.pillarTitle || "Expedition"}*.\n\n` +
            `Is there anything specific you would like to see?`;
            
        const messageHi = `*👑 चित्तौड़गढ़ में आपका स्वागत है!*\n\n` +
            `नमस्ते ${localData.name}, अपनी विरासत यात्रा के लिए हमें चुनने के लिए धन्यवाद। हम आपकी मेजबानी करने के लिए उत्साहित हैं!\n\n` +
            `हमारी टीम *${localData.pillarTitle || "एक्सपीडिशन"}* के लिए आपका कस्टम यात्रा कार्यक्रम तैयार कर रही है।\n\n` +
            `क्या कुछ खास है जो आप देखना चाहेंगे?`;
            
        const message = emailLanguage === 'en' ? messageEn : messageHi;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 no-print">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-white/60 backdrop-blur-3xl"
            />
            
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-3xl lg:rounded-[4rem] overflow-hidden shadow-[0_50px_150px_-30px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row max-h-[90vh] lg:max-h-[95vh]"
            >
                {/* Side Brand Panel */}
                <div className="w-full lg:w-72 bg-royal-gold/10 border-b lg:border-b-0 lg:border-r border-royal-gold/10 p-6 lg:p-10 flex flex-col justify-between items-start text-left shrink-0">
                    <div className="z-10 w-full space-y-4 lg:space-y-8">
                        <div className="w-12 h-12 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl bg-royal-gold flex items-center justify-center shadow-xl lg:shadow-2xl shadow-royal-gold/40 mb-4 lg:mb-10">
                            <User className="w-6 h-6 lg:w-10 lg:h-10 text-royal-black" />
                        </div>
                        
                        <div className="space-y-4 lg:space-y-6">
                            <div>
                                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em] mb-2">Guest Profile</p>
                                <h3 className="text-xl font-serif text-black font-bold leading-tight">{localData.name}</h3>
                            </div>
                            
                            <div className="space-y-3 lg:space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-royal-gold/10 rounded-lg"><Phone className="w-3.5 h-3.5 text-royal-gold" /></div>
                                    <p className="text-[11px] font-black text-black/80 tracking-widest">{localData.phone}</p>
                                </div>
                                {localData.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-royal-gold/10 rounded-lg"><Mail className="w-3.5 h-3.5 text-royal-gold" /></div>
                                        <p className="text-[11px] font-black text-black/80 tracking-tight truncate max-w-[150px]">{localData.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-4 lg:pt-8 border-t border-royal-gold/10 w-full">
                            <p className="text-[9px] text-black/40 uppercase tracking-widest mb-3">Expedition Status</p>
                            <div className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest leading-none",
                                booking.status === 'contacted' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-royal-gold/10 text-royal-gold border border-royal-gold/20"
                            )}>
                                <span className={cn("w-1.5 h-1.5 rounded-full", booking.status === 'contacted' ? "bg-green-500" : "bg-royal-gold animate-pulse")}></span>
                                {booking.status === 'contacted' ? "Contacted" : "New Lead"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Lead Details Content */}
                <div className="flex-1 p-6 md:p-10 lg:p-14 overflow-y-auto custom-scrollbar bg-white">
                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-4 mb-6 md:mb-8">
                        <div>
                            <span className="text-[10px] text-royal-gold font-bold uppercase tracking-[0.3em] mb-2 md:mb-3 block">Guest Expedition Registry</span>
                            <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-black">{localData.name}</h2>
                                <button onClick={() => setEditMode(!editMode)} className="p-2 bg-slate-100 hover:bg-royal-gold hover:text-royal-black rounded-lg transition-all">
                                    <Edit2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-3 md:p-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-black/60 hover:text-black shrink-0">
                            <X className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>

                    {/* Trip Info Row (Phone | Package | Date) */}
                    <div className="flex flex-wrap items-center gap-x-6 md:gap-x-12 gap-y-4 md:gap-y-6 py-6 md:py-8 border-y border-slate-100 mb-6 md:mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-2 md:p-2.5 bg-slate-50 rounded-xl border border-slate-100"><Phone className="w-4 h-4 text-royal-gold" /></div>
                            <div>
                                <p className="text-[9px] text-black/40 uppercase tracking-widest font-black mb-0.5">Contact Number</p>
                                <p className="text-sm font-black tracking-widest text-black">{localData.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 md:p-2.5 bg-slate-50 rounded-xl border border-slate-100"><MapPin className="w-4 h-4 text-royal-gold" /></div>
                            <div>
                                <p className="text-[9px] text-black/40 uppercase tracking-widest font-black mb-0.5">Experience Package</p>
                                <p className="text-sm font-bold text-black uppercase tracking-wide">{formatPillarTitle(localData.pillarTitle) || "Custom Discovery"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 md:p-2.5 bg-slate-50 rounded-xl border border-slate-100"><Calendar className="w-4 h-4 text-royal-gold" /></div>
                            <div>
                                <p className="text-[9px] text-black/40 uppercase tracking-widest font-black mb-0.5">Arrival Date</p>
                                <p className="text-sm font-bold text-black">{formatDateReadable(localData.date)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status & Billing Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="p-6 md:p-8 rounded-2xl md:rounded-[3rem] bg-slate-50 border border-slate-100">
                            <p className="text-[9px] text-black/40 uppercase tracking-widest mb-4 font-black">Payment & Visit Status</p>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: 'pending', label: 'Payment Pending', color: 'bg-amber-500' },
                                        { id: 'Received', label: 'Payment Received', color: 'bg-green-500' }
                                    ].map((s) => (
                                        <button 
                                            key={s.id}
                                            disabled={!editMode}
                                            onClick={() => setLocalData({...localData, paymentStatus: s.id})}
                                            className={cn(
                                                "px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                                (localData.paymentStatus || 'pending') === s.id 
                                                    ? `${s.color} text-white shadow-lg` 
                                                    : "bg-white border border-slate-200 text-black/40 hover:border-royal-gold/30"
                                            )}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                                    {[
                                        { id: 'scheduled', label: 'Scheduled', color: 'bg-blue-500' },
                                        { id: 'in_city', label: 'In City', color: 'bg-green-500' },
                                        { id: 'departed', label: 'Departed', color: 'bg-slate-500' }
                                    ].map((s) => (
                                        <button 
                                            key={s.id}
                                            disabled={!editMode}
                                            onClick={() => setLocalData({...localData, visitStatus: s.id})}
                                            className={cn(
                                                "px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                                localData.visitStatus === s.id 
                                                    ? `${s.color} text-white shadow-lg` 
                                                    : "bg-white border border-slate-200 text-black/40 hover:border-royal-gold/30"
                                            )}
                                        >
                                            {s.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 rounded-2xl md:rounded-[3rem] bg-gradient-to-br from-royal-gold/10 via-royal-gold/5 to-transparent border border-royal-gold/10 flex flex-col justify-center relative overflow-hidden group">
                            <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.5em] mb-2 z-10">Live Invoice Estimate</p>
                            <p className="text-4xl text-black font-serif z-10">₹{calculateLiveTotal(localData)}</p>
                            {localData.paymentStatus === 'Received' && (
                                <div className="mt-6 z-10 space-y-4">
                                    <div className="bg-white/50 p-3 md:p-4 rounded-2xl border border-royal-gold/20">
                                        <p className="text-[8px] text-royal-gold uppercase font-black tracking-widest mb-3">Select Services for Pass</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(selectedServices).map(([key, value]) => (
                                                <button 
                                                    key={key}
                                                    onClick={() => setSelectedServices(prev => ({...prev, [key]: !prev[key]}))}
                                                    className={cn(
                                                        "px-3 py-2 rounded-lg text-[7px] font-black uppercase tracking-widest border transition-all",
                                                        value ? "bg-royal-gold text-royal-black border-royal-gold" : "bg-white text-black/40 border-slate-200"
                                                    )}
                                                >
                                                    {key}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        onClick={generatePassCode}
                                        disabled={isSaving}
                                        className="w-full py-4 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all relative overflow-hidden"
                                    >
                                        <QrCode className="w-4 h-4" />
                                        {localData.passCode ? "Regenerate Royal Pass" : "Generate Royal Pass Code"}
                                        {localData.passGenerationCount > 0 && (
                                            <span className="absolute right-4 bg-black/20 px-2 py-1 rounded-md text-[8px]">
                                                {localData.passGenerationCount}/2
                                            </span>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Admin Notes Row */}
                    <div className="mb-6 md:mb-10 p-6 md:p-8 rounded-2xl md:rounded-[3rem] bg-slate-50/50 border border-slate-100/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-royal-gold/10 rounded-lg"><MessageCircle className="w-4 h-4 text-royal-gold" /></div>
                            <p className="text-[10px] text-black/40 uppercase tracking-widest font-black">Internal Admin Notes / Remarks</p>
                        </div>
                        {editMode ? (
                            <textarea 
                                value={localData.adminNotes || ''} 
                                onChange={(e) => setLocalData({...localData, adminNotes: e.target.value})}
                                placeholder="Add specific requirements, budget notes, or follow-up details..."
                                className="w-full bg-white border border-slate-200 rounded-xl md:rounded-[2rem] p-4 md:p-6 text-sm text-black focus:outline-none focus:border-royal-gold min-h-[100px] shadow-inner"
                            />
                        ) : (
                            <div className="text-sm text-black/70 italic px-2">
                                {localData.adminNotes || "No internal notes added yet."}
                            </div>
                        )}
                    </div>

                    {/* Service Management */}
                    <div className="space-y-6 pt-10 border-t border-slate-100">
                        <h4 className="text-xs text-black uppercase tracking-[0.4em] font-black mb-6 text-center">Service Management</h4>
                        
                        <div className="flex flex-col gap-4">
                            {/* Transport */}
                            <div className="flex items-center justify-between p-4 lg:p-6 rounded-3xl bg-white/[0.02] border border-slate-100 gap-4">
                                <div className="flex items-center gap-3 lg:gap-5 min-w-0 flex-1">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><Car className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-[10px] text-black/60 uppercase tracking-widest truncate">Transport Service</p>
                                            {localData.redeemed_taxi && (
                                                <span className="text-[7px] bg-green-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1 shrink-0">
                                                    <CheckCircle2 className="w-2 h-2" />
                                                    Redeemed
                                                </span>
                                            )}
                                        </div>
                                        {editMode ? (
                                            <div className="space-y-2">
                                                <select value={localData.transport} onChange={(e) => setLocalData({...localData, transport: e.target.value})} className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                    {TRANSPORT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                <input 
                                                    type="number" 
                                                    placeholder="Transport Rate (₹)" 
                                                    value={localData.transportPrice || ''} 
                                                    onChange={(e) => setLocalData({...localData, transportPrice: e.target.value})}
                                                    className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner"
                                                />
                                                <div className="space-y-2">
                                                    <p className="text-[8px] font-black uppercase text-slate-400 px-1">Assign Driver</p>
                                                    <select 
                                                        value={localData.taxiName || ''} 
                                                        onChange={(e) => {
                                                            const provider = providers.find(p => p.name === e.target.value);
                                                            setLocalData({
                                                                ...localData, 
                                                                taxiName: e.target.value,
                                                                driverPhone: provider?.phone || '',
                                                                vehicleNumber: provider?.vehicleNumber || ''
                                                            });
                                                        }} 
                                                        className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner"
                                                    >
                                                        <option value="">Select a Driver</option>
                                                        {providers.filter(p => p.type === 'taxi').map(p => (
                                                            <option key={p.id} value={p.name}>{p.name} ({p.vehicleType})</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        ) : (
                                            <div>
                                                <p className="text-black font-bold uppercase tracking-wider text-sm truncate">{localData.transport}</p>
                                                {localData.taxiName && <p className="text-[11px] text-royal-gold font-bold italic truncate">{localData.taxiName}</p>}
                                                {localData.redeemed_taxi_at && (
                                                    <p className="text-[9px] text-black/30 font-black uppercase mt-1 truncate">
                                                        Verified: {new Date(localData.redeemed_taxi_at).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-lg lg:text-xl font-serif text-royal-gold shrink-0">₹{localData.transportPrice || 0}</span>
                            </div>

                            {/* Hotel */}
                            <div className="flex items-center justify-between p-4 lg:p-6 rounded-3xl bg-white/[0.02] border border-slate-100 gap-4">
                                <div className="flex items-center gap-3 lg:gap-5 min-w-0 flex-1">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><Hotel className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-[10px] text-black/60 uppercase tracking-widest truncate">Accommodation</p>
                                            {localData.redeemed_hotel && (
                                                <span className="text-[7px] bg-green-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1 shrink-0">
                                                    <CheckCircle2 className="w-2 h-2" />
                                                    Redeemed
                                                </span>
                                            )}
                                        </div>
                                        {editMode ? (
                                            <div className="space-y-2">
                                                <select value={localData.hotel} onChange={(e) => setLocalData({...localData, hotel: e.target.value})} className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                    {HOTEL_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                <input 
                                                    type="number" 
                                                    placeholder="Hotel Rate (₹)" 
                                                    value={localData.hotelPrice || ''} 
                                                    onChange={(e) => setLocalData({...localData, hotelPrice: e.target.value})}
                                                    className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner"
                                                />
                                                <div className="space-y-2">
                                                    <p className="text-[8px] font-black uppercase text-slate-400 px-1">Assign Hotel</p>
                                                    <select 
                                                        value={localData.hotelName || ''} 
                                                        onChange={(e) => setLocalData({...localData, hotelName: e.target.value})} 
                                                        className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner"
                                                    >
                                                        <option value="">Select a Hotel</option>
                                                        {providers.filter(p => p.type === 'hotel').map(p => (
                                                            <option key={p.id} value={p.name}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        ) : (
                                            <div>
                                                <p className="text-black font-bold uppercase tracking-wider text-sm truncate">{localData.hotel}</p>
                                                {localData.hotelName && <p className="text-[11px] text-royal-gold font-bold italic truncate">{localData.hotelName}</p>}
                                                {localData.redeemed_hotel_at && (
                                                    <p className="text-[9px] text-black/30 font-black uppercase mt-1 truncate">
                                                        Verified: {new Date(localData.redeemed_hotel_at).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-lg lg:text-xl font-serif text-royal-gold shrink-0">₹{localData.hotelPrice || 0}</span>
                            </div>

                            {/* Guide */}
                            <div className="flex items-center justify-between p-4 lg:p-6 rounded-3xl bg-white/[0.02] border border-slate-100 gap-4">
                                <div className="flex items-center gap-3 lg:gap-5 min-w-0 flex-1">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><UserCheck className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <p className="text-[10px] text-black/60 uppercase tracking-widest truncate">Heritage Guide</p>
                                            {localData.redeemed_guide && (
                                                <span className="text-[7px] bg-green-500 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest flex items-center gap-1 shrink-0">
                                                    <CheckCircle2 className="w-2 h-2" />
                                                    Redeemed
                                                </span>
                                            )}
                                        </div>
                                        {editMode ? (
                                            <div className="space-y-2">
                                                <select value={localData.guide} onChange={(e) => setLocalData({...localData, guide: e.target.value})} className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                    {GUIDE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                                </select>
                                                <input 
                                                    type="number" 
                                                    placeholder="Guide Rate (₹)" 
                                                    value={localData.guidePrice || ''} 
                                                    onChange={(e) => setLocalData({...localData, guidePrice: e.target.value})}
                                                    className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner"
                                                />
                                                <div className="space-y-2">
                                                    <p className="text-[8px] font-black uppercase text-slate-400 px-1">Assign Guide</p>
                                                    <select 
                                                        value={localData.guideName || ''} 
                                                        onChange={(e) => setLocalData({...localData, guideName: e.target.value})} 
                                                        className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner"
                                                    >
                                                        <option value="">Select a Guide</option>
                                                        {providers.filter(p => p.type === 'guide').map(p => (
                                                            <option key={p.id} value={p.name}>{p.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                        ) : (
                                            <div>
                                                <p className="text-black font-bold uppercase tracking-wider text-sm truncate">{localData.guide}</p>
                                                {localData.guideName && <p className="text-[11px] text-royal-gold font-bold italic truncate">{localData.guideName}</p>}
                                                {localData.redeemed_guide_at && (
                                                    <p className="text-[9px] text-black/30 font-black uppercase mt-1 truncate">
                                                        Verified: {new Date(localData.redeemed_guide_at).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="text-lg lg:text-xl font-serif text-royal-gold shrink-0">₹{localData.guidePrice || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Language Selector */}
                    <div className="mb-6 no-print">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Preferred Email Language</label>
                        <div className="flex gap-2 max-w-[300px]">
                            <button 
                                onClick={() => setEmailLanguage('en')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${emailLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
                            >
                                English
                            </button>
                            <button 
                                onClick={() => setEmailLanguage('hi')}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${emailLanguage === 'hi' ? 'bg-blue-600 text-white' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'}`}
                            >
                                Hindi
                            </button>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-5 no-print">
                        {editMode ? (
                            <button 
                                onClick={handleUpdate}
                                disabled={isSaving}
                                className="flex-1 py-4 sm:py-6 bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl sm:rounded-3xl flex items-center justify-center gap-4 hover:brightness-110 shadow-2xl transition-all"
                            >
                                {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                Save Changes
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 lg:flex lg:flex-1 gap-2 md:gap-3">
                                <button 
                                    onClick={sendUpdateWhatsApp}
                                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-green-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95 group"
                                >
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    WhatsApp Quote
                                </button>
                                <button 
                                    onClick={sendQuotationEmail}
                                    disabled={!localData.email || isSaving}
                                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-[10px] rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-royal-gold/20 transition-all active:scale-95 group disabled:opacity-50 disabled:grayscale"
                                >
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />}
                                    Email Quote
                                </button>
                                <button 
                                    onClick={sendWelcomeMessage}
                                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 group"
                                >
                                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Welcome
                                </button>
                                <button 
                                    onClick={handlePrint}
                                    className="w-full px-4 py-3 sm:px-6 sm:py-4 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-xl sm:rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95 group"
                                >
                                    <Printer className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                                    Print
                                </button>
                            </div>
                        )}
                        <button 
                            onClick={onClose}
                            className="px-6 sm:px-10 py-4 sm:py-6 bg-slate-100 text-black/70 font-black uppercase tracking-widest text-xs rounded-xl sm:rounded-3xl hover:bg-slate-200 transition-all"
                        >
                            Close
                        </button>
                </div>
            </div>

            {/* ROYAL PASS PREVIEW MODAL */}
            <AnimatePresence>
                {showPass && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPass(false)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }} 
                            animate={{ scale: 1, opacity: 1 }} 
                            exit={{ scale: 0.9, opacity: 0 }} 
                            className="relative bg-white rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 max-w-sm w-full max-h-[90vh] flex flex-col shadow-2xl border-8 border-royal-gold overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-2 bg-royal-gold z-20"></div>
                            <div className="overflow-y-auto flex-1 custom-scrollbar pr-1 sm:pr-2 space-y-6 sm:space-y-8 mt-2">
                                <div className="text-center space-y-8">
                                <div className="w-20 h-20 bg-royal-gold/10 rounded-3xl flex items-center justify-center mx-auto">
                                    <Lock className="w-10 h-10 text-royal-gold" />
                                </div>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-serif text-black uppercase tracking-tighter font-black">Royal Tourism Pass</h3>
                                    <p className="text-[9px] sm:text-[10px] text-royal-gold font-black uppercase tracking-[0.2em] sm:tracking-[0.4em]">Official 6-Digit Security Code</p>
                                </div>

                                <div className="bg-slate-950 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border-4 border-royal-gold/30 shadow-2xl relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/5 to-transparent opacity-50"></div>
                                    <p className="text-3xl sm:text-5xl font-mono text-royal-gold font-black tracking-[0.1em] sm:tracking-[0.2em] relative z-10">{localData.passCode || '------'}</p>
                                    <p className="text-[8px] text-white/30 uppercase tracking-[0.3em] sm:tracking-[0.5em] mt-3 sm:mt-4 relative z-10 font-black italic">Private Security Code</p>
                                </div>

                                <div className="text-left space-y-4">
                                    <p className="text-[9px] text-royal-gold uppercase font-black tracking-widest border-b border-royal-gold/10 pb-2">Included Services</p>
                                    <div className="grid grid-cols-1 gap-2">
                                        {Object.entries(selectedServices).filter(([_, v]) => v).map(([k, _]) => (
                                            <div key={k} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-royal-gold"></div>
                                                <span className="text-[10px] font-bold text-black uppercase tracking-wide">{k}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Preferred Language</label>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => setEmailLanguage('en')}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${emailLanguage === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >
                                            English
                                        </button>
                                        <button 
                                            onClick={() => setEmailLanguage('hi')}
                                            className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${emailLanguage === 'hi' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                        >
                                            Hindi
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button 
                                        onClick={() => {
                                            const servicesList = Object.entries(selectedServices).filter(([_, v]) => v).map(([k, _]) => k.toUpperCase()).join(", ");
                                            const phoneNumber = "91" + localData.phone?.replace(/[^0-9]/g, '');
                                            
                                            const messageEn = `*👑 Your Royal Tourism Pass is Ready!*\n\nHello ${localData.name}, your payment of ₹${calculateLiveTotal(localData)} has been received.\n\n*🛡️ Your Unique Pass Code:* ${localData.passCode}\n*✅ Included Services:* ${servicesList}\n\n*⚠️ Important:* Do not share this 6-digit code with anyone except your assigned driver. Please keep this code safe for verification.`;
                                            
                                            const messageHi = `*👑 आपका रॉयल टूरिज्म पास तैयार है!*\n\nनमस्ते ${localData.name}, आपका ₹${calculateLiveTotal(localData)} का भुगतान प्राप्त हो गया है।\n\n*🛡️ आपका यूनिक पास कोड:* ${localData.passCode}\n*✅ शामिल सेवाएँ:* ${servicesList}\n\n*⚠️ महत्वपूर्ण:* इस 6-अंकीय कोड को अपने आवंटित ड्राइवर के अलावा किसी के साथ साझा न करें। कृपया सत्यापन के लिए इस कोड को सुरक्षित रखें।`;
                                            
                                            const message = emailLanguage === 'en' ? messageEn : messageHi;
                                            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                                        }}
                                        className="w-full py-4 bg-green-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-lg"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send on WhatsApp
                                    </button>
                                    <button 
                                        onClick={async () => {
                                            setIsSaving(true);
                                            try {


                                                const emailContentEn = `
                                                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 4px solid #D4AF37; border-radius: 30px; overflow: hidden; background: #ffffff; color: #1a2634; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
                                                        <!-- Header Image -->
                                                        <div style="width: 100%; overflow: hidden; background: #ffffff;">
                                                            <img src="https://i.postimg.cc/Dz8VMpnc/Fort.jpg" alt="Chittorgarh Fort" style="width: 100%; height: auto; display: block;">
                                                        </div>

                                                        <!-- Header -->
                                                        <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                                                            <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900;">Royal Heritage Pass</h1>
                                                            <p style="color: rgba(26, 38, 52, 0.6); margin: 5px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">Chittorgarh • Rajasthan</p>
                                                        </div>

                                                        <div style="padding: 40px 30px;">
                                                            <p style="font-size: 18px; margin-bottom: 10px; color: #1a2634;">Namaste <b>${localData.name}</b> 🙏 ,</p>
                                                            <p style="font-size: 14px; line-height: 1.8; color: #333333; margin-bottom: 30px;">
                                                                Welcome to the land of victory and timeless heritage. Your visit to the magnificent forts of Rajasthan has been officially confirmed!
                                                            </p>
                                                            
                                                            <!-- Passcode Box -->
                                                            <div style="background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 25px 10px; text-align: center; margin: 20px 0; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                                                                <p style="margin: 0 0 5px; font-size: 9px; color: #1a2634; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Your Official Passcode</p>
                                                                <h2 style="margin: 0; font-size: 42px; color: #1a2634; letter-spacing: 6px; font-family: 'Courier New', Courier, monospace; font-weight: 900; white-space: nowrap;">${localData.passCode}</h2>
                                                            </div>

                                                            <!-- Booking Details -->
                                                            <div style="background: #ffffff; padding: 25px; border-radius: 20px; margin-top: 30px; border: 2px solid #D4AF37; box-shadow: 0 10px 30px rgba(212,175,55,0.1);">
                                                                <div style="background: #D4AF37; padding: 12px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
                                                                    <p style="margin: 0; font-size: 14px; color: #1a2634; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">📋 Your Booking Details</p>
                                                                </div>
                                                                
                                                                <table style="width: 100%; font-size: 13px; color: #333333; border-collapse: collapse;">
                                                                    ${localData.hotelName ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🏨 Hotel</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.hotelName} (${localData.hotel})</td>
                                                                    </tr>` : ''}
                                                                    ${localData.taxiName ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🚗 Driver</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.taxiName}</td>
                                                                    </tr>` : ''}
                                                                    ${localData.vehicleNumber ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🔢 Taxi No</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.vehicleNumber}</td>
                                                                    </tr>` : ''}
                                                                    ${localData.driverPhone ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">📞 Contact</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #D4AF37;">${localData.driverPhone}</td>
                                                                    </tr>` : ''}
                                                                    ${localData.guide && localData.guide !== 'None' ? `
                                                                    <tr>
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🚩 Guide</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.guide}</td>
                                                                    </tr>` : ''}
                                                                </table>
                                                            </div>

                                                              <p style="font-size: 13px; line-height: 1.6; text-align: center; color: #D4AF37; margin-top: 40px; font-weight: bold;">
                                                                We wish you a pleasant journey. We are with you 24x7 to make your trip seamless.
                                                            </p>

                                                            <div style="margin-top: 30px; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 10px; text-align: center;">
                                                                <p style="margin: 0; font-size: 11px; color: #666666; font-style: italic;">
                                                                    ⚠️ Share this passcode only with your assigned driver or guide at the time of service.
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <!-- Footer -->
                                                        <div style="background: #f8f9fa; padding: 40px 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                                                            <p style="margin: 0; font-size: 15px; font-weight: 900; color: #1a2634; letter-spacing: 1px;">Chittorgarh Tourism | राजस्थान 🚩</p>
                                                            <p style="margin: 12px 0 0; font-size: 16px; color: #D4AF37; font-weight: 900; letter-spacing: 2px;">"पधारो म्हारे देस" ❤️</p>

                                                            <div style="margin-top: 30px; padding: 20px; border-top: 1px solid rgba(0,0,0,0.1); text-align: center; background: rgba(0,0,0,0.02); border-radius: 20px;">
                                                                <p style="margin: 0; font-size: 10px; color: #666666; font-style: italic; letter-spacing: 1px;">
                                                                    This is a system generated email. Please do not reply on this mail.
                                                                </p>
                                                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                                                                    <p style="margin: 0; font-size: 11px; color: #D4AF37; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                                                                        Official Support Channels
                                                                    </p>
                                                                    <p style="margin: 8px 0 0; font-size: 11px; color: #333333; line-height: 1.6;">
                                                                        If you have any queries, please contact on our official phone number and official email ID:
                                                                    </p>
                                                                    <p style="margin: 12px 0 0; font-size: 13px; color: #1a2634; font-weight: bold; letter-spacing: 0.5px;">
                                                                        Phone: +91 7597451057 &nbsp;|&nbsp; Email: chittortech@gmail.com
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                                                                <p style="margin: 0; font-size: 10px; color: #666666; font-weight: bold; letter-spacing: 1px;">Powered by <b>Chittor Tech</b></p>
                                                                <img src="https://i.postimg.cc/B6rmNMnB/chittortech-logo-1775884354186.jpg" alt="Chittor Tech" style="height: 30px; opacity: 0.8; margin-top: 10px; margin-bottom: 10px;">
                                                                <p style="margin: 5px 0 0; font-size: 8px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">Rajasthan's Upcoming Leading Tourism IT Partner</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `;

                                                const emailContentHi = `
                                                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 4px solid #D4AF37; border-radius: 30px; overflow: hidden; background: #ffffff; color: #1a2634; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
                                                        <!-- Header Image -->
                                                        <div style="width: 100%; overflow: hidden; background: #ffffff;">
                                                            <img src="https://i.postimg.cc/Dz8VMpnc/Fort.jpg" alt="Chittorgarh Fort" style="width: 100%; height: auto; display: block;">
                                                        </div>

                                                        <!-- Header -->
                                                        <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                                                            <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900;">शाही विरासत पास</h1>
                                                            <p style="color: rgba(26, 38, 52, 0.6); margin: 5px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">चित्तौड़गढ़ • राजस्थान</p>
                                                        </div>

                                                        <div style="padding: 40px 30px;">
                                                            <p style="font-size: 18px; margin-bottom: 10px; color: #1a2634;">नमस्ते <b>${localData.name}</b> 🙏 ,</p>
                                                            <p style="font-size: 14px; line-height: 1.8; color: #333333; margin-bottom: 30px;">
                                                                विजय और कालातीत विरासत की भूमि में आपका स्वागत है। राजस्थान के शानदार किलों की आपकी यात्रा आधिकारिक तौर पर सुनिश्चित हो गई है!
                                                            </p>
                                                            
                                                            <!-- Passcode Box -->
                                                            <div style="background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 25px 10px; text-align: center; margin: 20px 0; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                                                                <p style="margin: 0 0 5px; font-size: 9px; color: #1a2634; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">आपका आधिकारिक पासकोड</p>
                                                                <h2 style="margin: 0; font-size: 42px; color: #1a2634; letter-spacing: 6px; font-family: 'Courier New', Courier, monospace; font-weight: 900; white-space: nowrap;">${localData.passCode}</h2>
                                                            </div>

                                                            <!-- Booking Details -->
                                                            <div style="background: #ffffff; padding: 25px; border-radius: 20px; margin-top: 30px; border: 2px solid #D4AF37; box-shadow: 0 10px 30px rgba(212,175,55,0.1);">
                                                                <div style="background: #D4AF37; padding: 12px; border-radius: 12px; margin-bottom: 20px; text-align: center;">
                                                                    <p style="margin: 0; font-size: 14px; color: #1a2634; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">📋 आपकी बुकिंग का विवरण</p>
                                                                </div>
                                                                
                                                                <table style="width: 100%; font-size: 13px; color: #333333; border-collapse: collapse;">
                                                                    ${localData.hotelName ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🏨 होटल</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.hotelName} (${localData.hotel})</td>
                                                                    </tr>` : ''}
                                                                    ${localData.taxiName ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🚗 ड्राइवर</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.taxiName}</td>
                                                                    </tr>` : ''}
                                                                    ${localData.vehicleNumber ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🔢 टैक्सी नंबर</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.vehicleNumber}</td>
                                                                    </tr>` : ''}
                                                                    ${localData.driverPhone ? `
                                                                    <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.1);">
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">📞 ड्राइवर संपर्क</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #D4AF37;">${localData.driverPhone}</td>
                                                                    </tr>` : ''}
                                                                    ${localData.guide && localData.guide !== 'None' ? `
                                                                    <tr>
                                                                        <td style="padding: 12px 5px; color: #666666; font-weight: bold;">🚩 गाइड</td>
                                                                        <td style="padding: 12px 5px; text-align: right; font-weight: bold; color: #1a2634;">${localData.guide}</td>
                                                                    </tr>` : ''}
                                                                </table>
                                                            </div>

                                                              <p style="font-size: 13px; line-height: 1.6; text-align: center; color: #D4AF37; margin-top: 40px; font-weight: bold;">
                                                                हम आपकी सुखद यात्रा की कामना करते हैं। आपकी यात्रा को निर्बाध बनाने के लिए हम 24x7 आपके साथ हैं।
                                                              </p>

                                                            <div style="margin-top: 30px; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 10px; text-align: center;">
                                                                <p style="margin: 0; font-size: 11px; color: #666666; font-style: italic;">
                                                                    ⚠️ इस पासकोड को सेवा के समय केवल अपने असाइन किए गए ड्राइवर या गाइड के साथ साझा करें।
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <!-- Footer -->
                                                        <div style="background: #f8f9fa; padding: 40px 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                                                            <p style="margin: 0; font-size: 15px; font-weight: 900; color: #1a2634; letter-spacing: 1px;">Chittorgarh Tourism | राजस्थान 🚩</p>
                                                            <p style="margin: 12px 0 0; font-size: 16px; color: #D4AF37; font-weight: 900; letter-spacing: 2px;">"पधारो म्हारे देस" ❤️</p>

                                                            <div style="margin-top: 30px; padding: 20px; border-top: 1px solid rgba(0,0,0,0.1); text-align: center; background: rgba(0,0,0,0.02); border-radius: 20px;">
                                                                <p style="margin: 0; font-size: 10px; color: #666666; font-style: italic; letter-spacing: 1px;">
                                                                    यह एक सिस्टम जनरेटेड ईमेल है। कृपया इस मेल का उत्तर न दें।
                                                                </p>
                                                                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                                                                    <p style="margin: 0; font-size: 11px; color: #D4AF37; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                                                                        आधिकारिक सहायता चैनल
                                                                    </p>
                                                                    <p style="margin: 8px 0 0; font-size: 11px; color: #333333; line-height: 1.6;">
                                                                        यदि आपके कोई प्रश्न हैं, तो कृपया हमारे आधिकारिक फोन नंबर और आधिकारिक ईमेल आईडी पर संपर्क करें:
                                                                    </p>
                                                                    <p style="margin: 12px 0 0; font-size: 13px; color: #1a2634; font-weight: bold; letter-spacing: 0.5px;">
                                                                        Phone: +91 7597451057 &nbsp;|&nbsp; Email: chittortech@gmail.com
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.05);">
                                                                <p style="margin: 0; font-size: 10px; color: #666666; font-weight: bold; letter-spacing: 1px;">Powered by <b>Chittor Tech</b></p>
                                                                <img src="https://i.postimg.cc/B6rmNMnB/chittortech-logo-1775884354186.jpg" alt="Chittor Tech" style="height: 30px; opacity: 0.8; margin-top: 10px; margin-bottom: 10px;">
                                                                <p style="margin: 5px 0 0; font-size: 8px; color: #999999; text-transform: uppercase; letter-spacing: 2px;">राजस्थान का आगामी अग्रणी पर्यटन आईटी पार्टनर</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                `;

                                                const emailContent = emailLanguage === 'en' ? emailContentEn : emailContentHi;
                                                const emailSubject = emailLanguage === 'en' ? `👑 Your Royal Tourism Pass: ${localData.passCode}` : `👑 आपका रॉयल टूरिज्म पासकोड: ${localData.passCode}`;

                                                const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                                                    method: 'POST',
                                                    headers: {
                                                        'accept': 'application/json',
                                                        'api-key': BREVO_API_KEY,
                                                        'content-type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
                                                        to: [{ email: localData.email, name: localData.name }],
                                                        subject: emailSubject,
                                                        htmlContent: emailContent,

                                                    })
                                                });
                                                
                                                if (response.ok) {
                                                    alert(`Automated Email Sent to: ${localData.email}`);
                                                } else {
                                                    const errorData = await response.json();
                                                    console.error("Brevo Error:", errorData);
                                                    alert(`Brevo Error: ${errorData.message || 'Failed to send'}. Please ensure info@visitchittorgarh.in is a verified sender in Brevo.`);
                                                }
                                            } catch (e) {
                                                alert(`Error sending email to: ${localData.email}`);
                                            } finally {
                                                setIsSaving(false);
                                            }
                                        }}
                                        disabled={isSaving}
                                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                                    >
                                        <Mail className="w-4 h-4" />
                                        {isSaving ? "Sending..." : "Send Automated Email"}
                                    </button>
                                    <button 
                                        onClick={() => setShowPass(false)}
                                        className="w-full py-4 bg-slate-100 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all"
                                    >
                                        Close Preview
                                    </button>
                                </div>
                            </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>

            {/* HIGH QUALITY PRINTABLE BILL */}
            {createPortal(
                <div id="printable-bill" className="hidden print:block print-portal bg-white text-black p-10 z-[500] font-sans border-2 border-gray-800" style={{ width: '210mm', margin: '0 auto', position: 'relative' }}>
                    {/* Browser Header/Footer Replacement */}
                    <div className="flex justify-center text-sm text-gray-900 mb-6 border-t border-gray-300 pt-2">
                        <span className="font-bold">Royal Chittorgarh | The Pride of Rajasthan</span>
                    </div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <img src="https://i.postimg.cc/B6rmNMnB/chittortech-logo-1775884354186.jpg" alt="Chittor Tech" style={{ height: '40px' }} className="mb-2" />
                            <h1 className="text-2xl font-bold text-gray-900">Chittorgarh Tourism</h1>
                            <p className="text-xs text-gray-700">Excellence in Heritage Hospitality</p>
                            <p className="text-xs text-gray-700">Chittorgarh, Rajasthan, India</p>
                            <div className="text-xs text-gray-700 font-bold mt-1">
                                <span className="inline-block mr-4" style={{ verticalAlign: 'middle' }}>
                                    <Mail size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                                    chittortech@gmail.com
                                </span>
                                <span className="inline-block" style={{ verticalAlign: 'middle' }}>
                                    <Phone size={12} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }} />
                                    +91 7597451057
                                </span>
                            </div>
                        </div>
                        <div className="text-right mt-[48px]">
                            <h2 className="text-4xl font-bold text-gray-900 uppercase tracking-tight">Invoice</h2>
                            <p className="text-sm font-bold text-gray-800">No: CT/{new Date().getFullYear()}/{booking.id ? String(booking.id).slice(-3).toUpperCase() : 'XXX'}</p>
                            <p className="text-sm text-gray-800">Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        </div>
                    </div>

                    <div className="border-t-2 border-royal-gold mb-6"></div>

                    {/* Bill To & Details */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Bill To:</h3>
                            <p className="text-base font-bold text-gray-900">{localData.name}</p>
                            <p className="text-sm text-gray-800 font-bold">{localData.phone}</p>
                            {localData.email && <p className="text-sm text-gray-800">{localData.email}</p>}
                        </div>
                        <div className="border border-gray-300 p-4 rounded-lg">
                            <h3 className="text-xs font-bold text-gray-700 uppercase mb-2">Trip Summary:</h3>
                            <p className="text-base font-bold text-royal-gold">{formatPillarTitle(localData.pillarTitle) || "Custom Tour"}</p>
                            <p className="text-sm text-gray-800">Arrival Date: {formatDateReadable(localData.date)}</p>
                            <p className="text-sm text-gray-800 font-bold">Status: {localData.paymentStatus === 'Received' ? 'Paid' : 'Pending'}</p>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="mb-8">
                        <table className="w-full border-collapse" style={{ border: '1px solid #9ca3af' }}>
                            <thead>
                                <tr className="bg-gray-100 text-gray-800 text-xs uppercase">
                                    <th className="border border-gray-400 p-3 text-left font-bold">Description</th>
                                    <th className="border border-gray-400 p-3 text-center font-bold" style={{ width: '80px' }}>Qty</th>
                                    <th className="border border-gray-400 p-3 text-right font-bold" style={{ width: '120px' }}>Rate</th>
                                    <th className="border border-gray-400 p-3 text-right font-bold" style={{ width: '120px' }}>Amount</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-900">
                                {Number(localData.transportPrice) > 0 && (
                                    <tr>
                                        <td className="border border-gray-300 p-3">
                                            <p className="font-bold">Transport Package</p>
                                            <p className="text-xs text-gray-600">{localData.transport}</p>
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">1</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{Number(localData.transportPrice).toFixed(2)}</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{Number(localData.transportPrice).toFixed(2)}</td>
                                    </tr>
                                )}
                                {Number(localData.hotelPrice) > 0 && (
                                    <tr>
                                        <td className="border border-gray-300 p-3">
                                            <p className="font-bold">Accommodation Arrangement</p>
                                            <p className="text-xs text-gray-600">{localData.hotel}</p>
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">1</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{Number(localData.hotelPrice).toFixed(2)}</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{Number(localData.hotelPrice).toFixed(2)}</td>
                                    </tr>
                                )}
                                {Number(localData.guidePrice) > 0 && (
                                    <tr>
                                        <td className="border border-gray-300 p-3">
                                            <p className="font-bold">Professional Heritage Guide</p>
                                            <p className="text-xs text-gray-600">{localData.guide}</p>
                                        </td>
                                        <td className="border border-gray-300 p-3 text-center">1</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{Number(localData.guidePrice).toFixed(2)}</td>
                                        <td className="border border-gray-300 p-3 text-right">₹{Number(localData.guidePrice).toFixed(2)}</td>
                                    </tr>
                                )}
                            </tbody>
                            <tfoot>
                                <tr className="font-bold text-sm text-gray-900">
                                    <td colSpan="3" className="border border-gray-300 p-3 text-right">Subtotal</td>
                                    <td className="border border-gray-300 p-3 text-right">₹{Number(calculateLiveTotal(localData)).toFixed(2)}</td>
                                </tr>
                                <tr className="font-bold text-base bg-gray-50 text-gray-900">
                                    <td colSpan="3" className="border border-gray-300 p-3 text-right">Total Amount</td>
                                    <td className="border border-gray-300 p-3 text-right text-royal-gold">₹{Number(calculateLiveTotal(localData)).toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-xs text-gray-600 pt-4 border-t border-gray-200 mt-auto">
                        <p>Computer generated document. No signature required.</p>
                        <p className="font-bold text-gray-700">Powered by Chittor Tech</p>
                    </div>
                </div>,
                document.body
            )}

            <style>{`
                @media print {
                    #root { display: none !important; }
                    .print-portal { 
                        display: block !important; 
                        position: absolute !important; 
                        left: 0 !important; 
                        top: 0 !important; 
                        width: 100% !important; 
                        height: auto !important; 
                        background: white !important; 
                        z-index: 9999 !important;
                    }
                    @page {
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    );
};
const ProviderModal = ({ provider, defaultType, onClose, onSave, isSaving }) => {
    const [localData, setLocalData] = useState(() => {
        const base = provider || {
            name: '',
            phone: '',
            whatsapp: '',
            email: '',
            type: defaultType || 'taxi', // taxi, hotel, guide, restaurant, cafe
            vehicleNumber: '', // for taxi
            vehicleType: 'Royal SUV', // for taxi
            address: '',
            location: '',
            aadharNumber: '',
            age: '',
            photoUrl: '',
            rates: ''
        };
        return {
            gender: 'male',
            ...base
        };
    });
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(localData);
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white rounded-3xl md:rounded-[3rem] p-6 md:p-10 max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-serif font-black uppercase tracking-tight">{provider ? 'Edit Partner' : 'Add New Partner'}</h2>
                        {localData.providerCode && (
                            <span className="text-[10px] text-royal-gold font-black uppercase tracking-widest mt-1">Provider ID: {localData.providerCode}</span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-all"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto px-2 custom-scrollbar flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Photo URL Section */}
                        <div className="md:col-span-2 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-6 bg-slate-50">
                            {localData.photoUrl && localData.photoUrl.trim() !== '' ? (
                                <img src={localData.photoUrl} alt="Provider" className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-royal-gold" />
                            ) : (
                                <img 
                                    src={localData.gender === 'female' ? 'https://api.dicebear.com/7.x/avataaars/png?seed=Lily' : 'https://api.dicebear.com/7.x/avataaars/png?seed=Jack'} 
                                    alt="Provider Avatar" 
                                    className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-2 border-royal-gold bg-slate-200" 
                                />
                            )}
                            <div className="w-full">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block text-center">Direct Image Link (e.g., from postimages.org)</label>
                                <input 
                                    value={localData.photoUrl || ''} 
                                    onChange={(e) => setLocalData({...localData, photoUrl: e.target.value})} 
                                    placeholder="https://i.postimg.cc/..." 
                                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-royal-gold outline-none text-center" 
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Provider Name / Business Name</label>
                            <input required value={localData.name} onChange={e => setLocalData({...localData, name: e.target.value})} placeholder="e.g. Maharana Travels or Hotel Royal" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>
                        
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Aadhar Card Number</label>
                            <input required value={localData.aadharNumber || ''} onChange={e => setLocalData({...localData, aadharNumber: e.target.value})} placeholder="0000 0000 0000" maxLength="14" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>
                        
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Age</label>
                            <input required type="number" min="18" max="100" value={localData.age || ''} onChange={e => setLocalData({...localData, age: e.target.value})} placeholder="e.g. 35" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>

                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Phone Number (Calling)</label>
                            <input required value={localData.phone} onChange={e => setLocalData({...localData, phone: e.target.value})} placeholder="+91 00000 00000" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>
                        
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">WhatsApp Number</label>
                            <input value={localData.whatsapp} onChange={e => setLocalData({...localData, whatsapp: e.target.value})} placeholder="+91 00000 00000" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Provider Email ID</label>
                            <input required type="email" value={localData.email} onChange={e => setLocalData({...localData, email: e.target.value})} placeholder="contact@provider.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Provider Category / Type</label>
                            <select value={localData.type} onChange={e => setLocalData({...localData, type: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none">
                                <option value="taxi">Private Taxi Service</option>
                                <option value="hotel">Hotel / Heritage Stay</option>
                                <option value="guide">Professional Tour Guide</option>
                                <option value="restaurant">Fine Dining Restaurant</option>
                                <option value="cafe">Cafe & Hangouts</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Gender / Default Avatar</label>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => setLocalData({ ...localData, gender: 'male' })}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                                        localData.gender === 'male' || !localData.gender
                                            ? "bg-royal-gold border-royal-gold text-royal-black"
                                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                                    )}
                                >
                                    Male / Boy Avatar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLocalData({ ...localData, gender: 'female' })}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                                        localData.gender === 'female'
                                            ? "bg-royal-gold border-royal-gold text-royal-black"
                                            : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                                    )}
                                >
                                    Female / Girl Avatar
                                </button>
                            </div>
                        </div>

                        {localData.type === 'taxi' && (
                            <>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Vehicle Number (Plate)</label>
                                    <input value={localData.vehicleNumber} onChange={e => setLocalData({...localData, vehicleNumber: e.target.value})} placeholder="RJ 09 XX 0000" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Vehicle Type / Category</label>
                                    <select value={localData.vehicleType} onChange={e => setLocalData({...localData, vehicleType: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none">
                                        <option value="Royal SUV">Royal SUV (Fortuner/Innova)</option>
                                        <option value="Luxury Sedan">Luxury Sedan (Dzire/Etios)</option>
                                        <option value="Mini Bus">Mini Bus (Tempo Traveller)</option>
                                        <option value="Vintage Car">Vintage Car Experience</option>
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Pricing / Rates (e.g., ₹12/km or ₹500/day)</label>
                            <input value={localData.rates || ''} onChange={e => setLocalData({...localData, rates: e.target.value})} placeholder="Describe rates, per km charges, or package details..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Physical Address</label>
                            <input value={localData.address} onChange={e => setLocalData({...localData, address: e.target.value})} placeholder="Full address of the provider..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Google Maps / Location Link</label>
                            <input value={localData.location} onChange={e => setLocalData({...localData, location: e.target.value})} placeholder="Paste Google Maps URL here..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:border-royal-gold outline-none" />
                        </div>
                    </div>
                    <button type="submit" disabled={isSaving} className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {provider ? 'Update Provider' : 'Save Provider'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};


const AdminPage = () => {
    const { language } = useLanguage();
    const t = content.en;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'providers'
    const [providers, setProviders] = useState([]);
    const [providerTypeFilter, setProviderTypeFilter] = useState('all');
    const [showProviderModal, setShowProviderModal] = useState(false);
    const [editingProvider, setEditingProvider] = useState(null);
    const [providerSearchTerm, setProviderSearchTerm] = useState('');
    const [activity, setActivity] = useState([]);
    const [selectedProviderForDetails, setSelectedProviderForDetails] = useState(null);
    const [feedback, setFeedback] = useState([]);

    const prevBookingsRef = React.useRef([]);
    const initialLoadRef = React.useRef(false);

    const addNotification = (title, message, type = 'info') => {
        console.log(`Notification Triggered: ${title} - ${message}`);
        const id = Date.now();
        setNotifications(prev => [{ id, title, message, type }, ...prev]);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            setNotifications(current => current.filter(n => n.id !== id));
        }, 5000);
    };

    const ADMIN_PIN = "2516";

    useEffect(() => {
        if (!isLoggedIn) return;
        
        console.log("Listening to bookings...");
        setLoading(true);
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const bookingsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            prevBookingsRef.current = bookingsList;
            setBookings(bookingsList);
            setLoading(false);
        }, (error) => {
            console.error("Firestore bookings onSnapshot error:", error);
            addNotification("Database Error", "Failed to sync bookings: " + error.message, "error");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;
        
        console.log("Listening to providers...");
        const q = query(collection(db, "providers"), orderBy("name", "asc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const providersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProviders(providersList);
        }, (error) => {
            console.error("Firestore providers onSnapshot error:", error);
            addNotification("Database Error", "Failed to sync providers: " + error.message, "error");
        });

        return () => unsubscribe();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isLoggedIn) return;
        
        console.log("Listening to feedback...");
        const q = query(collection(db, "feedback"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const feedbackList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setFeedback(feedbackList);
        }, (error) => {
            console.error("Firestore feedback onSnapshot error:", error);
            addNotification("Database Error", "Failed to sync feedback: " + error.message, "error");
        });

        return () => unsubscribe();
    }, [isLoggedIn]);

    useEffect(() => {
        if (selectedBooking) {
            const updated = bookings.find(b => b.id === selectedBooking.id);
            if (updated) {
                if (JSON.stringify(updated) !== JSON.stringify(selectedBooking)) {
                    setSelectedBooking(updated);
                }
            }
        }
    }, [bookings, selectedBooking]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) { setIsLoggedIn(true); setError(''); } 
        else { setError(t.admin.invalidPin); setPin(''); }
    };

    const toggleStatus = async (booking, e) => {
        e.stopPropagation();
        const newStatus = booking.status === 'contacted' ? 'submitted' : 'contacted';
        await updateDoc(doc(db, "bookings", booking.id), { status: newStatus });
        setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: newStatus } : b));
    };

    const deleteBooking = async (id, e) => {
        if (e) e.stopPropagation();
        await deleteDoc(doc(db, "bookings", id));
        setBookings(prev => prev.filter(b => b.id !== id));
        addNotification("Archived", "Lead moved to archives.", "error");
        setConfirmDelete(null);
    };

    const sendWelcomeEmail = async (providerData, providerCode) => {
        if (!providerData.email) return false;
        try {
            const emailContent = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #D4AF37; border-radius: 30px; overflow: hidden; background: #1a2634; color: #ffffff; box-shadow: 0 20px 50px rgba(0,0,0,0.3);">
                    <div style="width: 100%; overflow: hidden; background: #1a2634;">
                        <img src="https://i.postimg.cc/Dz8VMpnc/Fort.jpg" alt="Chittorgarh Fort" style="width: 100%; height: auto; display: block; opacity: 0.9;">
                    </div>
                    <div style="padding: 30px 20px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                        <h1 style="color: #D4AF37; margin: 0; font-size: 24px; text-transform: uppercase; letter-spacing: 3px; font-weight: 900;">Welcome to Chittorgarh Tourism Team</h1>
                        <p style="color: rgba(255,255,255,0.5); margin: 5px 0 0; font-size: 10px; text-transform: uppercase; letter-spacing: 4px;">Official Partner Portfolio</p>
                    </div>
                    <div style="padding: 40px 30px;">
                        <p style="font-size: 18px; margin-bottom: 10px;">नमस्ते <b>${providerData.name}</b> 🙏 ,</p>
                        <p style="font-size: 14px; line-height: 1.8; color: rgba(255,255,255,0.8); margin-bottom: 30px;">
                            हमें आपको चित्तौड़गढ़ पर्यटन के आधिकारिक सेवा प्रदाता नेटवर्क में शामिल करते हुए बहुत खुशी हो रही है। वीरता की इस भूमि में मेहमानों को सर्वोत्तम अनुभव प्रदान करने की हमारी यात्रा में आपकी भूमिका अत्यंत महत्वपूर्ण है।
                        </p>
                        
                        <div style="background: linear-gradient(135deg, #D4AF37, #FFD700); padding: 25px 10px; text-align: center; margin: 20px 0; border-radius: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
                            <p style="margin: 0 0 5px; font-size: 9px; color: #1a2634; text-transform: uppercase; font-weight: 900; letter-spacing: 1px;">Your Official ID Card Number</p>
                            <h2 style="margin: 0; font-size: 42px; color: #1a2634; letter-spacing: 6px; font-family: 'Courier New', Courier, monospace; font-weight: 900; white-space: nowrap;">${providerCode}</h2>
                            
                            <div style="margin: 20px auto 10px; background: rgba(26, 38, 52, 0.1); padding: 12px; border-radius: 10px; max-width: 250px; border: 1px dashed rgba(26, 38, 52, 0.3);">
                                <p style="margin: 0 0 5px; font-size: 10px; color: #1a2634; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Login PIN / पिन</p>
                                <p style="margin: 0; font-size: 24px; color: #1a2634; letter-spacing: 8px; font-family: monospace; font-weight: bold;">1234</p>
                            </div>
                            
                            <p style="margin: 10px 0 0; font-size: 9px; color: #1a2634; font-weight: bold; opacity: 0.7;">(पोर्टल लॉगिन के लिए आईडी और पिन सुरक्षित रखें)</p>
                        </div>

                        <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; margin-top: 30px; border: 1px solid rgba(255,255,255,0.1);">
                            <p style="margin: 0 0 15px; font-size: 11px; color: #D4AF37; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">🛡️ Account Details</p>
                            <p style="margin: 0; font-size: 13px; color: #ffffff; line-height: 2;">
                                <b>Partner Category:</b> ${providerData.type === 'taxi' ? 'Driver' : providerData.type.toUpperCase()}<br/>
                                <b>Registered Phone:</b> ${providerData.phone}<br/>
                                <b>WhatsApp Number:</b> ${providerData.whatsapp || '---'}<br/>
                                <b>Official Address:</b> ${providerData.address || 'Chittorgarh'}
                            </p>
                        </div>

                        <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; margin-top: 30px; border: 1px solid rgba(255,255,255,0.1);">
                            <p style="margin: 0 0 15px; font-size: 11px; color: #D4AF37; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">🔗 Staff Verification Portal</p>
                            <p style="margin: 0 0 15px; font-size: 13px; color: #ffffff; line-height: 1.6;">
                                This is the link where you can access your dashboard and verify guest passes:
                            </p>
                            <a href="https://visitchittorgarh.in/staff-verify" style="display: inline-block; background: #D4AF37; color: #1a2634; padding: 12px 24px; border-radius: 10px; text-decoration: none; font-weight: 900; margin-bottom: 15px; letter-spacing: 1px;">OPEN VERIFICATION PORTAL</a>
                            <p style="margin: 0; font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.6; background: rgba(212, 175, 55, 0.1); padding: 15px; border-left: 4px solid #D4AF37; border-radius: 0 10px 10px 0;">
                                💡 <b>Pro Tip:</b> Please open this link in your phone's browser and select <b>"Add to Home Screen"</b> (या Add to Desktop). This will install it as an App on your phone, so you don't have to click the link every time!
                            </p>
                        </div>

                        <div style="background: rgba(255,255,255,0.05); padding: 25px; border-radius: 20px; margin-top: 30px; border: 1px solid rgba(255,255,255,0.1);">
                            <p style="margin: 0 0 15px; font-size: 11px; color: #D4AF37; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">⭐ Important: Service Quality & Ratings</p>
                            <p style="margin: 0; font-size: 13px; color: #ffffff; line-height: 1.6;">
                                कृपया अपनी सेवा का स्तर हमेशा उत्तम बनाए रखें। हमारा सिस्टम कस्टमर रिव्यूज और रेटिंग्स को ट्रैक करता है। आपकी रेटिंग के आधार पर ही आपका प्रमोशन और अन्य लाभ तय किए जाते हैं। अच्छी रेटिंग न होने पर सिस्टम द्वारा एक्शन लिया जा सकता है। रेटिंग आपके प्रोफाइल के लिए अत्यंत महत्वपूर्ण है।
                            </p>
                        </div>

                        <p style="font-size: 13px; line-height: 1.6; color: #D4AF37; margin-top: 40px; font-weight: bold; text-align: center;">
                            हम एक साथ मिलकर पर्यटन को नई ऊंचाइयों पर ले जाएंगे। "पधारो म्हारे देस" ❤️
                        </p>
                    </div>
                    <div style="background: #121b25; padding: 40px 20px; text-align: center; border-top: 1px solid rgba(212, 175, 55, 0.1);">
                        <p style="margin: 0; font-size: 15px; font-weight: 900; color: #ffffff; letter-spacing: 1px;">Chittorgarh Tourism | राजस्थान 🚩</p>
                        <div style="margin-top: 30px; padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; background: rgba(255,255,255,0.02); border-radius: 20px;">
                            <p style="margin: 0; font-size: 11px; color: #D4AF37; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">Partner Support</p>
                            <p style="margin: 8px 0 0; font-size: 11px; color: rgba(255,255,255,0.8);">If you need any assistance, please contact our official office at +91 7597451057.</p>
                        </div>
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.05);">
                            <p style="margin: 0; font-size: 10px; color: rgba(255,255,255,0.4); font-weight: bold; letter-spacing: 1px;">Powered by <b>Chittor Tech</b></p>
                            <img src="https://i.postimg.cc/B6rmNMnB/chittortech-logo-1775884354186.jpg" alt="Chittor Tech" style="height: 30px; opacity: 0.8; margin-top: 10px; margin-bottom: 10px;">
                            <p style="margin: 5px 0 0; font-size: 8px; color: rgba(255,255,255,0.2); text-transform: uppercase; letter-spacing: 2px;">Rajasthan's Upcoming Leading Tourism IT Partner</p>
                        </div>
                    </div>
                </div>
            `;

            await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
                    to: [{ email: providerData.email, name: providerData.name }],
                    subject: `👑 Welcome to Chittorgarh Tourism Network | ID: ${providerCode}`,
                    htmlContent: emailContent
                })
            });
            console.log(`Welcome email sent to: ${providerData.email}`);
            return true;
        } catch (e) {
            console.error("Welcome Email Error:", e);
            return false;
        }
    };

    const resendWelcomeMail = async (provider) => {
        if (!provider.email) {
            addNotification("Error", "No email address found for this partner", "error");
            return;
        }
        setLoading(true);
        const success = await sendWelcomeEmail(provider, provider.providerCode);
        setLoading(false);
        if (success) {
            addNotification("Success", "Welcome email resent successfully", "success");
        } else {
            addNotification("Error", "Failed to resend welcome email", "error");
        }
    };

    const saveProvider = async (providerData) => {
        setLoading(true);
        try {
            if (editingProvider) {
                await updateDoc(doc(db, "providers", editingProvider.id), providerData);
                setProviders(prev => prev.map(p => p.id === editingProvider.id ? { ...p, ...providerData } : p));
                addNotification("Success", "Partner updated successfully", "success");
            } else {
                // Generate Unique Provider Code
                const prefixes = { taxi: 'TX', hotel: 'HT', guide: 'GD', restaurant: 'RT', cafe: 'CF' };
                const prefix = prefixes[providerData.type] || 'PR';
                const randomId = Math.floor(1000 + Math.random() * 9000);
                const providerCode = `${prefix}-${randomId}`;

                const docRef = await addDoc(collection(db, "providers"), {
                    ...providerData,
                    providerCode,
                    createdAt: new Date().toISOString()
                });

                const newProvider = {
                    id: docRef.id,
                    ...providerData,
                    providerCode,
                    createdAt: new Date().toISOString()
                };
                setProviders(prev => [...prev, newProvider].sort((a, b) => a.name.localeCompare(b.name)));

                // Trigger Welcome Email via Brevo API
                if (providerData.email) {
                    await sendWelcomeEmail(providerData, providerCode);
                }
                addNotification("Success", "Partner added & Welcome Mail sent!", "success");
            }
            setShowProviderModal(false);
            setEditingProvider(null);
        } catch (err) {
            console.error("Save Provider Error:", err);
            addNotification("Error", "Failed to save provider", "error");
        } finally {
            setLoading(false);
        }
    };

    const deleteProvider = async (id) => {
        if (!window.confirm("Are you sure you want to delete this provider?")) return;
        try {
            await deleteDoc(doc(db, "providers", id));
            setProviders(prev => prev.filter(p => p.id !== id));
            addNotification("Deleted", "Provider removed from system", "info");
        } catch (err) {
            console.error("Delete Provider Error:", err);
            addNotification("Error", "Failed to delete provider", "error");
        }
    };


    const getRowTotal = (b) => {
        return (Number(b.transportPrice || 0) + Number(b.hotelPrice || 0) + Number(b.guidePrice || 0));
    };

    const filteredBookings = bookings.filter(b => {
        const matchesSearch = (b.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
                           (b.phone?.includes(searchTerm)) ||
                           (b.pillarTitle?.toLowerCase().includes(searchTerm.toLowerCase()));
        
        let matchesDate = true;
        if (startDate || endDate) {
            const bookingDate = new Date(b.date);
            if (startDate && bookingDate < new Date(startDate)) matchesDate = false;
            if (endDate && bookingDate > new Date(endDate)) matchesDate = false;
        }

        let matchesStatus = true;
        if (statusFilter !== 'all') {
            matchesStatus = b.status === statusFilter;
        }
        
        return matchesSearch && matchesDate && matchesStatus;
    });

    const exportToCSV = () => {
        const headers = ["Name,Phone,Package,Date,Estimate,Status,VisitStatus,Notes\n"];
        const rows = bookings.map(b => {
            const date = formatDateReadable(b.date).replace(/,/g, '');
            const total = getRowTotal(b);
            const notes = (b.adminNotes || '').replace(/,/g, ';').replace(/\n/g, ' ');
            return `${b.name},${b.phone},${formatPillarTitle(b.pillarTitle) || 'Custom'},${date},${total},${b.status},${b.visitStatus || 'pending'},${notes}\n`;
        });
        const blob = new Blob([headers, ...rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Chittorgarh_Tourism_Leads_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    const getDisplayStatus = (booking) => {
        const services = booking.includedServices || [];
        if (services.length > 0) {
            const redeemedCount = services.filter(s => {
                const key = SERVICE_KEY_MAP[s] || s.toLowerCase();
                return booking[`redeemed_${key}`];
            }).length;
            
            if (redeemedCount === services.length) {
                return "Service Done";
            } else if (redeemedCount > 0) {
                return "Services in Progress";
            }
        }
        
        if (booking.status === 'contacted') {
            return "Contacted";
        }
        return "New Query";
    };

    const getProviderServiceCount = (provider) => {
        const key = provider.type;
        const nameField = `${key}Name`;
        return bookings.filter(b => 
            b[nameField]?.trim().toLowerCase() === provider.name?.trim().toLowerCase() && 
            b[`redeemed_${key}`]
        ).length;
    };

    const getProviderTotalEarnings = (provider) => {
        const key = provider.type;
        const nameField = `${key}Name`;
        const priceField = key === 'taxi' ? 'transportPrice' : `${key}Price`;
        return bookings.filter(b => 
            b[nameField]?.trim().toLowerCase() === provider.name?.trim().toLowerCase() && 
            b[`redeemed_${key}`]
        ).reduce((sum, b) => sum + Number(b[priceField] || 0), 0);
    };

    const getProviderRating = (providerId) => {
        const providerFeedback = feedback.filter(f => f.providerId === providerId);
        if (providerFeedback.length === 0) return "0.0";
        const sum = providerFeedback.reduce((acc, curr) => acc + curr.rating, 0);
        return (sum / providerFeedback.length).toFixed(1);
    };

    const handleBookingUpdate = (id, updatedFields) => {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, ...updatedFields } : b));
        setSelectedBooking(prev => prev && prev.id === id ? { ...prev, ...updatedFields } : prev);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-between relative overflow-hidden text-white no-print">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />
                
                <header className="w-full py-8 flex justify-center z-50">
                    <h2 className="text-2xl md:text-3xl font-serif font-black italic tracking-tight text-royal-gold uppercase drop-shadow-2xl">
                        Chittorgarh Paryatan
                    </h2>
                </header>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="w-full max-w-md p-6 md:p-10 rounded-3xl md:rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-xl relative z-10 my-auto shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-8 h-8 text-royal-gold" />
                        </div>
                        <h1 className="text-3xl font-serif text-white font-black italic uppercase tracking-tighter mb-2">{t.admin.loginTitle}</h1>
                        <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em]">{t.admin.pinPlaceholder}</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest text-center">Identity Verification</p>
                            <input 
                                autoFocus 
                                type="password" 
                                maxLength={4} 
                                value={pin} 
                                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))} 
                                className="w-full bg-black/40 border border-white/10 rounded-2xl py-6 px-10 text-center text-3xl tracking-[1em] text-royal-gold focus:outline-none focus:border-royal-gold/50 shadow-inner" 
                                placeholder="****" 
                            />
                        </div>

                        {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-wider text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</p>}
                        
                        <button type="submit" className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">
                            {t.admin.loginBtn}
                        </button>
                    </form>
                </motion.div>

                <div className="py-8 text-center text-white/20 text-[9px] font-black uppercase tracking-widest">
                    Official Admin Portal
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-black no-print selection:bg-royal-gold selection:text-royal-black">
            {/* STICKY BLACK HEADER */}
            <header className="sticky top-0 z-[100] bg-slate-950 border-b border-white/5 px-4 md:px-16 py-4 md:py-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 shadow-2xl">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="p-2 md:p-3 bg-royal-gold/10 rounded-xl md:rounded-2xl border border-royal-gold/20"><LayoutDashboard className="w-5 h-5 md:w-6 md:h-6 text-royal-gold" /></div>
                        <h1 className="text-lg md:text-2xl font-serif text-white tracking-tight">Chittorgarh Booking Dashboard</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3 md:gap-4">

                    <button onClick={exportToCSV} className="flex items-center gap-3 px-3 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-royal-gold hover:text-royal-black transition-all text-royal-gold shadow-lg">
                        <FileText className="w-4 h-4" />
                        Export Data
                    </button>
                    <Link to="/" className="flex items-center gap-3 px-3 md:px-6 py-2 md:py-3 bg-red-500/10 border border-red-500/20 rounded-lg md:rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all text-red-400 shadow-lg">
                        <LogOut className="w-4 h-4" />
                        Exit Dashboard
                    </Link>
                </div>
            </header>

            <div className="w-full pt-8 md:pt-16 pb-12 md:pb-20 px-4 md:px-8 lg:px-12">
                {/* Dashboard Tabs */}
                <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 bg-white p-2 md:p-3 rounded-2xl md:rounded-[2.5rem] border border-slate-200 w-full">
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={cn(
                            "flex-1 px-3 md:px-10 py-3 md:py-5 rounded-xl md:rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTab === 'bookings' ? "bg-slate-950 text-royal-gold shadow-xl" : "text-black/40 hover:text-black"
                        )}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <Users className="w-4 h-4" />
                            Guest Inquiries
                        </div>
                    </button>
                    <button 
                        onClick={() => setActiveTab('providers')}
                        className={cn(
                            "flex-1 px-3 md:px-10 py-3 md:py-5 rounded-xl md:rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all",
                            activeTab === 'providers' ? "bg-slate-950 text-royal-gold shadow-xl" : "text-black/40 hover:text-black"
                        )}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <UtensilsCrossed className="w-4 h-4" />
                            Service Providers
                        </div>
                    </button>
                </div>
                        {activeTab === 'bookings' ? (
                            <>



                <div className="space-y-6 md:space-y-10 mb-10 md:mb-16">
                    {/* Search Bar - Royal Style */}
                    <div className="relative group">
                        <Search className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 w-5 h-5 md:w-8 md:h-8 text-royal-gold/40 group-focus-within:text-royal-gold transition-all duration-500" />
                        <input 
                            type="text" 
                            placeholder="Search by Traveler Name, Phone or Package..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            className="w-full bg-white border-2 border-slate-100 rounded-2xl md:rounded-[3rem] py-5 md:py-10 pl-14 md:pl-24 pr-6 md:pr-10 focus:outline-none focus:border-royal-gold focus:ring-8 focus:ring-royal-gold/5 text-lg md:text-2xl font-serif font-black text-slate-900 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]" 
                        />
                    </div>
                    
                    {/* Filter Registry Section */}
                    <div className="bg-slate-950 p-6 md:p-12 rounded-3xl md:rounded-[4rem] border-2 border-slate-900 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="flex flex-col md:flex-row items-end justify-between gap-6 md:gap-10 relative z-10">
                            <div className="flex flex-wrap items-center gap-6 md:gap-10 w-full md:w-auto">


                                <div className="w-full md:w-auto">
                                    <p className="text-[10px] text-royal-gold/60 font-black uppercase tracking-[0.5em] mb-4 flex items-center gap-2">
                                        <Info className="w-3.5 h-3.5" />
                                        Inquiry Status
                                    </p>
                                    <select 
                                        value={statusFilter} 
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="bg-white/5 border border-white/10 px-4 md:px-8 py-3 md:py-5 rounded-2xl backdrop-blur-md text-[11px] font-black uppercase tracking-widest text-white outline-none cursor-pointer hover:border-royal-gold/30 transition-all w-full md:w-auto"
                                    >
                                        <option value="all" className="bg-slate-900">All Statuses</option>
                                        <option value="submitted" className="bg-slate-900">New Inquiries</option>
                                        <option value="contacted" className="bg-slate-900">Contacted Leads</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-6 w-full md:w-auto">
                                <div className="text-left md:text-right">
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em] mb-1">Filtered Results</p>
                                    <p className="text-4xl font-serif text-white italic">
                                        <span className="text-royal-gold">{filteredBookings.length}</span>
                                        <span className="mx-2 text-white/20">/</span>
                                        <span className="text-white/40">{bookings.length}</span>
                                    </p>
                                </div>

                                {(searchTerm || statusFilter !== 'all') && (
                                    <button 
                                        onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                                        className="flex items-center gap-3 px-8 py-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-lg w-full md:w-auto justify-center"
                                    >
                                        <X className="w-4 h-4" />
                                        Clear Registry Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
                    <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                        <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><Users className="w-6 h-6" /></div>
                        <div>
                            <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.2em] mb-1">Total Inquiries</p>
                            <p className="text-3xl font-serif text-black font-black">{bookings.length}</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                        <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0"><Clock className="w-6 h-6" /></div>
                        <div>
                            <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.2em] mb-1">Pending Inquiries</p>
                            <p className="text-3xl font-serif text-black font-black">{bookings.filter(b => b.status !== 'contacted').length}</p>
                        </div>
                    </div>
                    <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center text-center gap-4 shadow-xl">
                        <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0"><TrendingUp className="w-6 h-6" /></div>
                        <div>
                            <p className="text-[10px] text-black/40 font-black uppercase tracking-[0.2em] mb-1">Est. Revenue</p>
                            <p className="text-3xl font-serif text-black font-black">₹{bookings.reduce((sum, b) => sum + getRowTotal(b), 0)}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white border-2 border-slate-950 rounded-3xl md:rounded-[3.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-[1000px] w-full text-left border-collapse">
                            <thead className="bg-slate-950 border-b-2 border-slate-950">
                                <tr>
                                    <th className="px-10 py-8 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold border-r-2 border-slate-900">Traveler</th>
                                    <th className="px-10 py-8 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold border-r-2 border-slate-900">Category</th>
                                    <th className="px-10 py-8 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold border-r-2 border-slate-900">Date</th>
                                    <th className="px-10 py-8 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold border-r-2 border-slate-900">Estimate</th>
                                    <th className="px-10 py-8 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold border-r-2 border-slate-900">Status</th>
                                    <th className="px-8 py-8 text-center text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold min-w-[300px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-slate-950">
                                {loading ? (
                                    <tr><td colSpan="6" className="px-10 py-32 text-center text-royal-gold"><Loader2 className="w-12 h-12 animate-spin mx-auto mb-6" /><p className="uppercase tracking-[0.2em] font-black text-black/60">Syncing Regisrty...</p></td></tr>
                                ) : filteredBookings.map((booking) => (
                                    <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedBooking(booking)} className="hover:bg-slate-50 transition-all group cursor-pointer">
                                        <td className="px-10 py-10 border-r-2 border-slate-950">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-royal-gold text-royal-black flex items-center justify-center font-black text-lg shrink-0">{booking.name?.charAt(0)}</div>
                                                <div className="min-w-0">
                                                    <p className="font-black text-black text-lg mb-1 truncate">{booking.name}</p>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className="text-[11px] text-black/60 tracking-widest font-black uppercase">{booking.phone}</p>
                                                        {booking.passCode && (
                                                            <span className="text-[8px] bg-royal-gold/10 text-royal-gold px-2 py-0.5 rounded-md font-black tracking-widest uppercase">
                                                                ID: {booking.passCode}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {booking.includedServices && (
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex -space-x-2">
                                                                {booking.includedServices.map((s, idx) => {
                                                                    const key = SERVICE_KEY_MAP[s] || s.toLowerCase();
                                                                    const isRedeemed = booking[`redeemed_${key}`];
                                                                    return (
                                                                        <div key={idx} className={cn(
                                                                            "w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[6px]",
                                                                            isRedeemed ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"
                                                                        )}>
                                                                            {isRedeemed ? "✓" : ""}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-10 border-r-2 border-slate-950">
                                            <a href="https://www.visitchittorgarh.in/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-black uppercase tracking-widest text-slate-900 hover:text-royal-gold transition-colors">
                                                {formatPillarTitle(booking.pillarTitle) || "Custom Discovery"}
                                            </a>
                                        </td>
                                        <td className="px-10 py-10 border-r-2 border-slate-950">
                                            <p className="text-[11px] font-black uppercase tracking-widest text-slate-900">{formatDateReadable(booking.date)}</p>
                                        </td>
                                        <td className="px-10 py-10 border-r-2 border-slate-950">
                                            <p className="text-xl font-serif text-black font-black">₹{getRowTotal(booking)}</p>
                                        </td>
                                        <td className="px-10 py-10 border-r-2 border-slate-950">
                                            <button onClick={(e) => toggleStatus(booking, e)} className={cn(
                                                "px-4 py-2.5 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2 border w-fit",
                                                booking.status === 'contacted' ? "bg-green-500/10 border-green-500 text-green-500" : "bg-royal-gold/10 border-royal-gold text-royal-gold"
                                            )}>
                                                <div className={cn("w-1.5 h-1.5 rounded-full", booking.status === 'contacted' ? "bg-green-500" : "bg-royal-gold animate-pulse")}></div>
                                                {getDisplayStatus(booking)}
                                            </button>
                                        </td>
                                        <td className="px-8 py-10">
                                            <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                                                {/* WhatsApp Button */}
                                                <a href={`https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" 
                                                    onClick={() => {
                                                        if (booking.status !== 'contacted') {
                                                            updateDoc(doc(db, "bookings", booking.id), { status: 'contacted' });
                                                            setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status: 'contacted' } : b));
                                                        }
                                                    }}
                                                    className="p-4 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-all shadow-xl flex items-center justify-center shrink-0" title="Chat on WhatsApp">
                                                    <MessageCircle className="w-5 h-5" />
                                                </a>
                                                <button onClick={() => setSelectedBooking(booking)} className="p-4 bg-slate-100 text-black/40 rounded-2xl hover:bg-slate-950 hover:text-royal-gold transition-all shadow-xl flex items-center justify-center shrink-0" title="View Details"><ExternalLink className="w-5 h-5" /></button>
                                                <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(booking.id); }} className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl flex items-center justify-center shrink-0" title="Delete"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </>
            ) : (
                /* SERVICE PROVIDERS VIEW */
                <div className="space-y-12">
                    <div className="bg-slate-950 p-6 md:p-12 rounded-3xl md:rounded-[4rem] border-2 border-slate-900 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-royal-gold/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
                        
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 md:gap-12 relative z-10">
                            <div className="shrink-0 w-full xl:w-auto">
                                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.5em] mb-4">Partner Management</p>
                                <h2 className="text-3xl md:text-5xl font-serif text-white font-black uppercase tracking-tight">Service Directory</h2>
                                <p className="text-xs text-white/40 uppercase tracking-[0.3em] mt-4 font-black flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    {providers.length} Verified Partners Active
                                </p>
                            </div>
                            
                            <div className="flex-1 flex justify-center w-full xl:w-auto">
                                <div className="flex flex-wrap justify-center gap-1 md:gap-2 bg-white/5 p-1 md:p-2 rounded-xl md:rounded-[2rem] border border-white/10 backdrop-blur-xl w-full sm:w-auto">
                                    {['all', 'taxi', 'hotel', 'guide', 'restaurant', 'cafe'].map(type => (
                                        <button 
                                            key={type}
                                            onClick={() => setProviderTypeFilter(type)}
                                            className={cn(
                                                "px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-2xl text-[8px] md:text-[9px] font-black uppercase tracking-widest transition-all flex-1 sm:flex-none text-center",
                                                providerTypeFilter === type 
                                                    ? "bg-royal-gold text-royal-black shadow-xl" 
                                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button 
                                onClick={() => { setEditingProvider(null); setShowProviderModal(true); }}
                                className="w-full md:w-auto px-6 py-4 md:px-10 md:py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl md:rounded-2xl flex items-center justify-center gap-4 shadow-2xl hover:bg-royal-gold transition-all group shrink-0"
                            >
                                <Plus className="w-5 h-5 group-hover:rotate-90 transition-all" />
                                Add Partner
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {providers.filter(p => providerTypeFilter === 'all' || p.type === providerTypeFilter).map(p => (
                            <motion.div 
                                key={p.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={() => { setSelectedProviderForDetails(p); }}
                                className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-royal-gold/30 hover:shadow-lg transition-all flex flex-col md:flex-row items-center justify-between gap-6 cursor-pointer"
                            >
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-royal-gold/20 shrink-0 bg-slate-50 flex items-center justify-center">
                                        <img 
                                            src={
                                                p.photoUrl && p.photoUrl.trim() !== '' 
                                                    ? p.photoUrl 
                                                    : p.gender === 'female' 
                                                        ? 'https://api.dicebear.com/7.x/avataaars/png?seed=Lily' 
                                                        : 'https://api.dicebear.com/7.x/avataaars/png?seed=Jack'
                                            } 
                                            alt={p.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-1.5 md:mb-1">
                                            <p className="text-[10px] text-royal-gold font-black uppercase tracking-widest whitespace-nowrap">{getCategoryCue(p.type)}</p>
                                            {p.providerCode && (
                                                <span className="text-[8px] bg-royal-gold/10 text-royal-gold px-2 py-0.5 rounded-md font-black tracking-widest border border-royal-gold/20 whitespace-nowrap">
                                                    ID: {p.providerCode}
                                                </span>
                                            )}
                                            <span 
                                                onClick={(e) => { e.stopPropagation(); setSelectedProviderForDetails(p); }}
                                                className="text-[8px] bg-green-500/10 text-green-500 px-2 py-0.5 rounded-md font-black tracking-widest border border-green-500/20 cursor-pointer hover:bg-green-500 hover:text-white transition-all whitespace-nowrap"
                                                title="Click to view history"
                                            >
                                                {getProviderServiceCount(p)} Services Done
                                            </span>
                                            <span className="text-[8px] bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-md font-black tracking-widest border border-amber-500/20 flex items-center gap-0.5 whitespace-nowrap">
                                                <Star className="w-2.5 h-2.5 fill-amber-500 text-transparent" /> {getProviderRating(p.id)} ({feedback.filter(f => f.providerId === p.id).length})
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-serif text-black font-black tracking-tight">{p.name}</h3>
                                        <p className="text-xs text-black/60 font-black tracking-widest mt-1 flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5 text-slate-400" /> {p.phone}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end" onClick={(e) => e.stopPropagation()}>
                                    {p.type === 'taxi' && (
                                        <div className="flex gap-2 flex-wrap">
                                            <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-600 whitespace-nowrap">Plate: {p.vehicleNumber || '---'}</span>
                                            <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-600 whitespace-nowrap">{p.vehicleType}</span>
                                        </div>
                                    )}
                                    {p.type === 'hotel' && (
                                        <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-600 whitespace-nowrap">{p.roomTypes || 'Standard'}</span>
                                    )}
                                    
                                    <div className="flex gap-2">
                                        <a href={`tel:${p.phone}`} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-black hover:text-royal-gold transition-all" title="Call"><Phone className="w-4 h-4" /></a>
                                        <button onClick={() => resendWelcomeMail(p)} className="p-3 bg-amber-50 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all" title="Resend Welcome Email"><Mail className="w-4 h-4" /></button>
                                        <button onClick={() => { setEditingProvider(p); setShowProviderModal(true); }} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-black hover:text-royal-gold transition-all" title="Edit"><Edit2 className="w-4 h-4" /></button>
                                        <button onClick={() => deleteProvider(p.id)} className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all" title="Delete"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <AnimatePresence>
                {showProviderModal && (
                    <ProviderModal 
                        provider={editingProvider} 
                        defaultType={providerTypeFilter !== 'all' ? providerTypeFilter : 'taxi'}
                        onClose={() => setShowProviderModal(false)} 
                        onSave={saveProvider}
                        isSaving={loading}
                    />
                )}
                {selectedProviderForDetails && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
                    >
                        <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-slate-950">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-serif font-black text-black">{selectedProviderForDetails.name}'s Profile & History</h3>
                                <button onClick={() => setSelectedProviderForDetails(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all"><X className="w-6 h-6 text-black" /></button>
                            </div>

                            {/* Provider Summary Card */}
                            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-royal-gold/20 shrink-0 bg-slate-50 flex items-center justify-center">
                                        <img 
                                            src={
                                                selectedProviderForDetails.photoUrl && selectedProviderForDetails.photoUrl.trim() !== '' 
                                                    ? selectedProviderForDetails.photoUrl 
                                                    : selectedProviderForDetails.gender === 'female' 
                                                        ? 'https://api.dicebear.com/7.x/avataaars/png?seed=Lily' 
                                                        : 'https://api.dicebear.com/7.x/avataaars/png?seed=Jack'
                                            } 
                                            alt={selectedProviderForDetails.name} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black text-black">{selectedProviderForDetails.name}</h4>
                                        <p className="text-xs text-black/60 font-black uppercase tracking-widest">{selectedProviderForDetails.type}</p>
                                        <p className="text-[10px] text-black/40 font-black tracking-widest mt-0.5">{selectedProviderForDetails.phone}</p>
                                        {selectedProviderForDetails.rates && (
                                            <p className="text-[11px] text-royal-gold font-bold mt-2 bg-royal-gold/10 px-3 py-1.5 rounded-lg border border-royal-gold/20 w-fit">
                                                Rates: {selectedProviderForDetails.rates}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-wrap justify-center">
                                    <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center min-w-[80px]">
                                        <p className="text-[9px] text-black/40 font-black uppercase tracking-widest mb-0.5">Services</p>
                                        <p className="text-lg font-serif font-black text-black">{getProviderServiceCount(selectedProviderForDetails)}</p>
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center min-w-[80px]">
                                        <p className="text-[9px] text-black/40 font-black uppercase tracking-widest mb-0.5">Rating</p>
                                        <p className="text-lg font-serif font-black text-amber-500 flex items-center justify-center gap-0.5">
                                            <Star className="w-3.5 h-3.5 fill-amber-500 text-transparent" />
                                            {getProviderRating(selectedProviderForDetails.id)}
                                        </p>
                                    </div>
                                    <div className="bg-white px-3 py-2 rounded-xl border border-slate-200 text-center min-w-[80px]">
                                        <p className="text-[9px] text-black/40 font-black uppercase tracking-widest mb-0.5">Total Vol.</p>
                                        <p className="text-lg font-serif font-black text-green-600">₹{getProviderTotalEarnings(selectedProviderForDetails)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {bookings.filter(b => {
                                    const key = selectedProviderForDetails.type;
                                    const nameField = `${key}Name`;
                                    return b[nameField]?.trim().toLowerCase() === selectedProviderForDetails.name?.trim().toLowerCase() && b[`redeemed_${key}`];
                                }).length > 0 ? (
                                    bookings.filter(b => {
                                        const key = selectedProviderForDetails.type;
                                        const nameField = `${key}Name`;
                                        return b[nameField]?.trim().toLowerCase() === selectedProviderForDetails.name?.trim().toLowerCase() && b[`redeemed_${key}`];
                                    }).map(b => (
                                        <div key={b.id} className="border border-slate-200 p-4 md:p-6 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center bg-slate-50 hover:border-royal-gold/30 transition-all gap-4">
                                            <div>
                                                <p className="text-sm font-black text-black">{b.name}</p>
                                                <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mt-1">
                                                    {formatDateReadable(b[`redeemed_${selectedProviderForDetails.type}_at`])}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black uppercase text-green-600">Redeemed</p>
                                                <p className="text-[10px] text-black/60 mt-1">{b.phone}</p>
                                                {(() => {
                                                    const f = feedback.find(f => f.bookingId === b.id && f.providerId === selectedProviderForDetails.id);
                                                    return (
                                                        <div className="mt-2 flex flex-col items-end">
                                                            {f ? (
                                                                <>
                                                                    <div className="flex justify-end gap-0.5 text-amber-500 text-xs">
                                                                        {[...Array(f.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-500 text-transparent" />)}
                                                                    </div>
                                                                    <p className="text-[10px] text-black/60 mt-1 italic">"{f.comment || 'No comment'}"</p>
                                                                </>
                                                            ) : (
                                                                <p className="text-[10px] text-black/40 mt-1">Feedback: Pending</p>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-10">
                                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400"><Clock className="w-6 h-6" /></div>
                                        <p className="text-xs text-black/40 font-black uppercase tracking-widest">No services redeemed yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Admin Footer - ChittorTech Branding */}
            <footer className="mt-20 py-16 border-t border-slate-200/10 flex flex-col items-center gap-10 no-print">
                <div className="flex flex-col items-center gap-8 bg-[#2d333f] p-8 rounded-[2rem] border border-white/5 max-w-sm w-full mx-auto shadow-2xl">
                    {/* Product Badge */}
                    <div className="flex items-center gap-4 bg-black/40 px-6 py-4 rounded-full border border-white/10 shadow-inner group transition-all duration-500 hover:border-royal-gold/50">
                        <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-lg transform group-hover:scale-105 transition-transform">
                            <img src="/assets/images/chittortech_logo.png" alt="ChittorTech" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">A Product Of</span>
                            <span className="text-2xl text-white font-black tracking-tight -mt-1 italic">ChittorTech</span>
                        </div>
                    </div>

                    {/* Recognition Badges */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00e676] shadow-[0_0_8px_rgba(0,230,118,0.5)]"></div>
                            <span className="text-xs font-bold text-[#00e676] uppercase tracking-wider group-hover:text-emerald-300 transition-colors">Recognized by iStart Rajasthan</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00e676] shadow-[0_0_8px_rgba(0,230,118,0.5)]"></div>
                            <span className="text-xs font-bold text-[#00e676] uppercase tracking-wider group-hover:text-emerald-300 transition-colors">Registered MSME | Startup India</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-full border-t border-dashed border-white/10"></div>

                    {/* Contact & Copyright */}
                    <div className="flex flex-col items-center gap-6 w-full">
                        <a href="mailto:chittortech@gmail.com" className="group flex items-center gap-4 hover:text-royal-gold transition-all duration-300">
                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-royal-gold/40 transition-all">
                                <span className="text-lg">✉️</span>
                            </div>
                            <span className="text-sm font-bold tracking-widest text-white/70 group-hover:text-white lowercase">chittortech@gmail.com</span>
                        </a>

                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold text-center">
                            © 2026 CHITTORTECH ALL RIGHTS RESERVED
                        </p>
                    </div>
                </div>
            </footer>

            <AnimatePresence>{selectedBooking && <BookingDetailModal booking={selectedBooking} providers={providers} onClose={() => setSelectedBooking(null)} onUpdate={handleBookingUpdate} />}</AnimatePresence>

            
            {/* Real-time Notifications */}
            <div className="fixed top-24 right-10 z-[200] flex flex-col gap-4 max-w-sm w-full pointer-events-none">
                <AnimatePresence>
                    {notifications.map(n => (
                        <motion.div 
                            key={n.id}
                            layout
                            initial={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
                            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            className={cn(
                                "p-6 rounded-[2rem] border-2 shadow-2xl flex items-center gap-5 backdrop-blur-xl pointer-events-auto",
                                n.type === 'success' ? "bg-green-500/90 border-green-400 text-white" :
                                n.type === 'error' ? "bg-red-500/90 border-red-400 text-white" :
                                "bg-slate-900/95 border-royal-gold/50 text-royal-gold"
                            )}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                                {n.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                            </div>
                            <div>
                                <h4 className="text-[9px] font-black uppercase tracking-[0.3em] mb-1 opacity-60">{n.title}</h4>
                                <p className="text-xs font-bold leading-tight">{n.message}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Royal Confirm Modal */}
            <AnimatePresence>
                {confirmDelete && (
                    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 no-print">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setConfirmDelete(null)} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />
                        <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border-4 border-royal-gold p-12 text-center">
                            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                                <Trash2 className="w-10 h-10 text-red-500" />
                            </div>
                            <h2 className="text-3xl font-serif text-black font-black uppercase tracking-tighter mb-4">Archive Lead?</h2>
                            <p className="text-sm text-black/60 font-bold mb-10 leading-relaxed">Are you sure you want to archive this traveler? This action will remove them from the active dashboard.</p>
                            <div className="flex flex-col gap-4">
                                <button onClick={() => deleteBooking(confirmDelete)} className="w-full py-6 bg-red-500 text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">Yes, Archive Lead</button>
                                <button onClick={() => setConfirmDelete(null)} className="w-full py-6 bg-slate-100 text-black/40 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-slate-200 transition-all">Cancel</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 20px; }
            `}</style>
        </div>
    );
};

export default AdminPage;
