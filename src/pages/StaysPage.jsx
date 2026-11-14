import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, ArrowRight, ShieldCheck, MapPin, Star, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const STAYS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Chittorgarh Hotels & Heritage Stays Directory",
    "description": "Handpicked hotels and heritage properties in Chittorgarh — from luxury heritage havelis to budget-friendly guesthouses, with local concierge services.",
    "url": "https://www.visitchittorgarh.in/stays",
    "image": "https://www.visitchittorgarh.in/Fort.webp"
  }
];

const StaysPage = () => {
    const { t, lang } = useLanguage();
    const pageT = t?.staysPage || {};

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const handleHotelInquiry = (hotelName) => {
        const msg = `🏨 *Hotel Booking Inquiry — Chittorgarh*\n\n` +
            `Hello! I would like to inquire about booking a stay at *${hotelName}*.\n` +
            `Please share current availability, room tariffs, and concierge deals. Thanks!`;
        trackWhatsAppClick('hotel_card_wa', hotelName);
        window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const hotels = [
        {
            id: 1,
            name: lang === 'hi' ? 'बुटीक हेरिटेज हवेली स्टे' : lang === 'fr' ? 'Séjour en Haveli Historique de Charme' : lang === 'de' ? 'Historisches Boutique-Haveli' : lang === 'it' ? 'Haveli Storica di Charme' : lang === 'ja' ? '伝統ブティック・ハヴェリ宿泊' : lang === 'es' ? 'Estancia en Haveli Histórica Boutique' : lang === 'he' ? 'אירוח בהאוולי היסטורית בוטיק' : lang === 'ar' ? 'إقامة في قصر هافيلي تراثي فاخر' : "Boutique Heritage Haveli Stay",
            desc: lang === 'hi' ? 'पारंपरिक झरोखों, आंगनों और दुर्ग की प्राचीर के दृश्यों वाली प्रामाणिक राजपूत हवेली।' : lang === 'fr' ? 'Haveli rajput authentique avec jharokhas sculptés, cours intérieures et vue sur les remparts.' : "Authentic Rajput haveli with traditional jharokhas, courtyards, and rooftop views of Chittorgarh Fort ramparts.",
            price: "₹3,500 - ₹6,500 / night",
            image: "/assets/images/Royal Stays.webp"
        },
        {
            id: 2,
            name: lang === 'hi' ? 'रॉयल पैलेस लक्ज़री रिसॉर्ट' : lang === 'fr' ? 'Palais & Resort de Luxe Royal' : lang === 'de' ? 'Königliches Luxus-Resort' : lang === 'it' ? 'Resort di Lusso Royal Palace' : lang === 'ja' ? 'ロイヤルパレス・ラグジュアリーリゾート' : lang === 'es' ? 'Resort de Lujo Royal Palace' : lang === 'he' ? 'ריזורט יוקרתי רויאל פאלאס' : lang === 'ar' ? 'منتجع القصر الملكي الفاخر' : "Royal Palace Luxury Resort",
            desc: lang === 'hi' ? 'हरे-भरे बगीचों, स्विमिंग पूल और उत्तम मेवाड़ी रेस्तरां से युक्त शानदार सुइट्स।' : lang === 'fr' ? 'Suites de grand confort entourées de jardins luxuriants, piscine et restaurant gastronomique du Mewar.' : "Spacious luxury suites surrounded by lush gardens, swimming pool, and fine dining Mewari restaurant.",
            price: "₹5,500 - ₹9,500 / night",
            image: "/assets/images/Dinning Hall.webp"
        },
        {
            id: 3,
            name: lang === 'hi' ? 'फोर्ट व्यू कम्फर्ट इन' : lang === 'fr' ? 'Hôtel Confort avec Vue sur le Fort' : lang === 'de' ? 'Komforthotel mit Festungsblick' : lang === 'it' ? 'Hotel Comfort con Vista Forte' : lang === 'ja' ? 'フォートビュー・コンフォートイン' : lang === 'es' ? 'Hotel Confort con Vistas al Fuerte' : lang === 'he' ? 'מלון קומפורט מול המבצר' : lang === 'ar' ? 'فندق كومفورت بإطلالة على القلعة' : "Fort View Comfort Inn",
            desc: lang === 'hi' ? 'रेलवे स्टेशन और दुर्ग प्रवेश मार्ग के निकट आधुनिक वातानुकूलित पारिवारिक होटल।' : lang === 'fr' ? 'Hôtel familial moderne climatisé situé idéalement près de la gare et de la route du fort.' : "Modern air-conditioned family hotel located conveniently near Chittorgarh Railway Station and Fort entrance road.",
            price: "₹1,800 - ₹3,200 / night",
            image: "/assets/images/Cafe.webp"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Hotels in Chittorgarh | Heritage, Budget & Luxury Stays"
                description="Book the best hotels in Chittorgarh — heritage havelis, budget guesthouses & luxury resorts. Handpicked stays with VIP rates and local concierge."
                canonical={getLocalizedPath('/stays', lang)}
                keywords="hotels in Chittorgarh, Chittorgarh hotels, heritage hotel Chittorgarh, budget hotel Chittorgarh, luxury stay Chittorgarh"
                schema={STAYS_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        {pageT.kicker || "Curated Accommodations"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        {pageT.title || "Heritage Hotels & Stays"}
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        {pageT.desc || "Experience authentic Mewari hospitality. From royal havelis overlooking the floodlit fort to tranquil countryside heritage resorts."}
                    </p>
                </div>

                {/* Stays Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {hotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-56 relative overflow-hidden bg-[#EFE7D9]">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#C49A32]" />
                                        {pageT.verifiedPartner || "Verified Partner"}
                                    </span>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                                        {hotel.name}
                                    </h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-6">
                                        {hotel.desc}
                                    </p>

                                    <div className="space-y-2 text-xs text-[#25231F]/80 mb-6">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            <span>Fort View Rooftop Dining</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            <span>Air-Conditioned & Sanitized Rooms</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            <span>Free Wi-Fi & Breakfast Options</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between">
                                <button
                                    onClick={() => handleHotelInquiry(hotel.name)}
                                    className="px-5 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    {pageT.inquireRates || "Inquire Rates"}
                                </button>
                                <button
                                    onClick={triggerPlanTrip}
                                    className="px-4 py-3 bg-[#F8F5EF] hover:bg-[#EFE7D9] text-[#25231F] rounded-xl text-xs font-bold uppercase tracking-wider border border-[#EFE7D9]"
                                >
                                    {t.packagesPage?.inquireBtn || "Add to Tour"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Concierge Benefits Banner */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Visit Chittorgarh Concierge
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            {lang === 'hi' ? 'होटल अनुशंसा या समूह बुकिंग चाहिए?' : lang === 'fr' ? 'Besoin de Recommandations d’Hôtels ou Réservations de Groupe ?' : lang === 'de' ? 'Benötigen Sie Hotelempfehlungen oder Gruppenbuchungen?' : lang === 'it' ? 'Consigli su Hotel o Prenotazioni di Gruppo?' : lang === 'ja' ? 'ホテルのおすすめや団体予約のご相談ですか？' : lang === 'es' ? '¿Necesita Recomendaciones de Hoteles o Reservas de Grupo?' : lang === 'he' ? 'זקוקים להמלצות על מלונות או הזמנות קבוצתיות?' : lang === 'ar' ? 'هل تحتاج إلى ترشيحات فنادق أو حجوزات مجموعات؟' : 'Need Hotel Recommendations or Group Bookings?'}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            {lang === 'hi' ? 'हमारी स्थानीय टीम सत्यापित संपत्तियों के साथ सर्वोत्तम कक्ष और सहज चेक-इन सुनिश्चित करती है।' : 'Our ground team coordinates directly with verified properties to guarantee best room categories and seamless check-in.'}
                        </p>
                    </div>

                    <button
                        onClick={triggerPlanTrip}
                        className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg"
                    >
                        {t.packagesPage?.customBtn || "Plan Custom Stay"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaysPage;
