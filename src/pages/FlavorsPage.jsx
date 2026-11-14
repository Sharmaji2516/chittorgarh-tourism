import React, { useState } from 'react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, LayoutGrid, Star, ArrowRight, X, CheckCircle2, MessageCircle, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const FLAVORS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Chittorgarh Local Food & Mewari Dining Guide",
    "description": "Discover authentic Rajasthani food in Chittorgarh — Dal Baati Churma, local sweet vendors, rooftop cafes and heritage restaurants.",
    "url": "https://www.visitchittorgarh.in/flavors",
    "image": "https://www.visitchittorgarh.in/Fort.webp"
  }
];

const FlavorsPage = ({ filteredVendors = [], filteredCafes = [], searchQuery }) => {
    const { t, lang } = useLanguage();
    const pageT = t?.flavorsPage || {};
    const [activeCategory, setActiveCategory] = useState('all');

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const famousDishes = [
        {
            name: "Dal Baati Churma",
            desc: lang === 'hi' ? 'कंडों पर सिके कुरकुरे बाटी, शुद्ध देसी घी, पंचमेल दाल और इलायची युक्त चूरमा।' : "Crushed roasted wheat baatis baked over embers, dunked in pure desi ghee, served with 5-lentil dal and sweet cardamom churma.",
            tag: lang === 'hi' ? 'शाही मेवाड़ी हस्ताक्षर' : "Royal Mewari Signature",
            image: "/assets/images/dal-batti-churma-new.webp"
        },
        {
            name: "Gatte ki Sabzi",
            desc: lang === 'hi' ? 'मसालेदार दही की तरी में पके बेसन के मुलायम गट्टे, मेथी और राई के तड़के के साथ।' : "Tender steamed gram flour dumplings cooked in a spiced yogurt gravy seasoned with fenugreek and mustard seeds.",
            tag: lang === 'hi' ? 'पारंपरिक क्लासिक' : "Traditional Classic",
            image: "/assets/images/gatte-ki-sabzi.webp"
        },
        {
            name: "Chittorgarh Gulab Jamun",
            desc: lang === 'hi' ? 'गुलाब-इलायची की चाशनी में डूबे ताज़ा मावा के गरमा-गरम गुलाब जामुन।' : "Fresh mawa dumplings simmered in rose-cardamom sugar syrup, served hot at heritage sweets shops near Fort Road.",
            tag: lang === 'hi' ? 'स्थानीय मीठी धरोहर' : "Local Sweet Treasure",
            image: "/assets/images/gulab-jamun-new.webp"
        },
        {
            name: "Kadhi Kachori & Mirchi Bada",
            desc: lang === 'hi' ? 'गरमा-गरम कढ़ी में डूबी खस्ता प्याज की कचौरी और तीखी हरी चटनी।' : "Crispy Rajasthani onion and lentil kachoris served drowned in piping hot tempered sour kadhi with green chutney.",
            tag: lang === 'hi' ? 'नाश्ते का प्रिय स्वाद' : "Breakfast Street Favorite",
            image: "/assets/images/kadi-kachori.webp"
        }
    ];

    const filterOptions = [
        { id: 'all', label: pageT.filterAll || "All Flavors", icon: LayoutGrid },
        { id: 'dishes', label: pageT.filterDishes || "Famous Dishes", icon: Utensils },
        { id: 'vendors', label: pageT.filterDining || "Heritage Dining", icon: Star },
        { id: 'cafes', label: pageT.filterCafes || "Fort-View Cafes", icon: Coffee },
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Chittorgarh Food Guide | Dal Baati Churma & Restaurants"
                description="Discover authentic Rajasthani food in Chittorgarh — Dal Baati Churma in pure desi ghee, street food vendors, cafes & heritage thali restaurants."
                canonical={getLocalizedPath('/flavors', lang)}
                keywords="Chittorgarh restaurants, food in Chittorgarh, Rajasthani cuisine, Dal Baati Churma, street food Chittorgarh, best cafes Chittorgarh"
                schema={FLAVORS_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        {pageT.kicker || "Culinary Heritage of Mewar"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        {pageT.title || "Famous Local Flavors"}
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        {pageT.desc || "Savor the authentic cuisine of Mewar. From traditional royal feasts cooked with pure desi ghee to beloved street snacks and fort-view rooftop cafes."}
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-14">
                    {filterOptions.map((opt) => (
                        <button
                            key={opt.id}
                            onClick={() => setActiveCategory(opt.id)}
                            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                                activeCategory === opt.id
                                    ? 'bg-[#25231F] text-white shadow-md'
                                    : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:border-[#C49A32]'
                            }`}
                        >
                            <opt.icon className="w-4 h-4 text-[#C49A32]" />
                            <span>{opt.label}</span>
                        </button>
                    ))}
                </div>

                {/* Famous Dishes Showcase */}
                {(activeCategory === 'all' || activeCategory === 'dishes') && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EFE7D9]">
                            <h2 className="text-2xl font-serif font-bold text-[#25231F]">
                                {pageT.mustTryTitle || "Must-Try Iconic Mewari Delicacies"}
                            </h2>
                            <span className="text-xs text-[#25231F]/60">
                                {pageT.desiGheeBadge || "Prepared with Desi Ghee"}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {famousDishes.map((dish, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] transition-all group flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="h-48 relative overflow-hidden bg-[#EFE7D9]">
                                            <img
                                                src={dish.image}
                                                alt={dish.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                                                {dish.tag}
                                            </span>
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">{dish.name}</h3>
                                            <p className="text-xs text-[#25231F]/70 leading-relaxed">{dish.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FlavorsPage;
