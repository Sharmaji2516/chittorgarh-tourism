import React, { useState } from 'react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, LayoutGrid, Star, ArrowRight, X, CheckCircle2, MessageCircle, Compass, Sparkles, MapPin, ShieldCheck, Clock } from 'lucide-react';
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
        },
        {
            name: "Crispy Jodhpuri Mirchi Bada",
            desc: lang === 'hi' ? 'तीखी हरी मिर्च में मसालेदार आलू भर कर बेसन में तला हुआ कुरकुरा पकौड़ा।' : "Large green chilies stuffed with spiced mashed potato masala, battered in gram flour, and deep-fried to golden perfection.",
            tag: lang === 'hi' ? 'तीखा व चटपटा' : "Spicy & Savory Snack",
            image: "/assets/images/mirchi-bada.webp"
        },
        {
            name: "Fort Road Hing Samosa",
            desc: lang === 'hi' ? 'हींग और साबुत धनिया के तड़के वाले आलू से भरी खस्ता समोसा, इमली की चटनी के साथ।' : "Golden triangular pastries loaded with crushed coriander and asafoetida-spiced potatoes, served with tangy tamarind dip.",
            tag: lang === 'hi' ? 'शाम की चाय का स्वाद' : "Evening Tea Classic",
            image: "/assets/images/samosa.webp"
        },
        {
            name: "Mewari Mawa Gujiya & Ghevar",
            desc: lang === 'hi' ? 'मावा, पिस्ता और केसर की चाशनी से भरपूर पारंपरिक मेवाड़ी राजसी मिष्ठान्न।' : "Crisp festive pastry pockets bursting with dry fruit-sweetened mawa and honeycomb-textured golden Malpua-Ghevar.",
            tag: lang === 'hi' ? 'राजसी मिष्ठान्न' : "Royal Sweet Delicacy",
            image: "/assets/images/gunjiya.webp"
        },
        {
            name: "Mewari Bharwan Bhindi & Bajra Roti",
            desc: lang === 'hi' ? 'मसालेदार भुनी भिंडी, चूल्हे की बनी गरम बाजरा रोटी, सफेद मक्खन और गुड़ के साथ।' : "Pan-roasted okra stuffed with roasted gram spices, accompanied by hot pearl millet rotis, white country butter & raw jaggery.",
            tag: lang === 'hi' ? 'देहाती पारंपरिक भोजन' : "Rustic Village Feast",
            image: "/assets/images/stuffed-bhindi.webp"
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
                <div className="text-center max-w-3xl mx-auto mb-10">
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

                {/* Udaipur to Chittorgarh Day Trip & Authentic Dining Conversion Banner */}
                <div className="bg-gradient-to-br from-[#25231F] via-[#2D2822] to-[#1C1A17] text-white p-6 sm:p-8 rounded-3xl border border-[#C49A32]/40 shadow-xl mb-12">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        <div className="flex-1">
                            <div className="inline-flex items-center gap-2 bg-[#C49A32]/15 border border-[#C49A32]/30 px-3 py-1 rounded-full text-[11px] font-bold text-[#C49A32] uppercase tracking-wider mb-3">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Udaipur ⇄ Chittorgarh Day Tour with Authentic Dining</span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-snug mb-2">
                                🏰 Planning a Day Trip from Udaipur? Savor Authentic Mewari Dining &amp; Fort Tour!
                            </h3>
                            <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4 max-w-2xl font-light">
                                Experience authentic pure desi ghee Dal Baati Churma while touring India’s largest UNESCO Fort. Book a private sanitized AC Cab with official RTDC English guide &amp; verified lunch stop.
                            </p>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white/90">
                                <span className="flex items-center gap-1.5 text-emerald-400">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    <span>₹0 Advance Required — Pay after the tour!</span>
                                </span>
                                <span className="flex items-center gap-1.5 text-amber-300">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    <span>Tolls (NH27 Highway) &amp; Parking Included</span>
                                </span>
                                <span className="flex items-center gap-1.5 text-white/80">
                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                    <span>Free Hotel / Airport Pickup &amp; Drop</span>
                                </span>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                            <div className="text-left lg:text-right">
                                <div className="text-[10px] uppercase font-bold text-[#C49A32] tracking-wider">Starting From</div>
                                <div className="text-2xl sm:text-3xl font-serif font-black text-white">₹3,500 <span className="text-xs font-sans font-normal text-white/70">(~$42 USD)</span></div>
                                <div className="text-[11px] text-white/70 font-medium">Private AC Sedan (1-4 Guests)</div>
                                <div className="text-[10px] text-amber-300/90 mt-0.5">*Rates may vary based on family / group size (Crysta SUV &amp; Tempo available)</div>
                            </div>
                            <a
                                href={`https://wa.me/917597451057?text=${encodeURIComponent("Namaste Visit Chittorgarh! I saw your Flavors page and would like to book a Private AC Cab & Guide from Udaipur with authentic Dal Baati lunch stop. Please share availability and family rates.")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('flavors_banner_wa', 'Private Cab & Guide')}
                                className="py-3.5 px-6 bg-[#128C7E] hover:bg-[#0c6b60] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                            >
                                <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
                                <span>Book Private Cab on WhatsApp • Starting From ₹3,500</span>
                            </a>
                        </div>
                    </div>
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

                {/* Section 2: Top Verified Food Hubs in Chittorgarh */}
                <div className="mb-16">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1 rounded-full inline-block mb-2">
                            Where Locals &amp; Travelers Eat
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F]">
                            Top Verified Food Hubs in Chittorgarh
                        </h2>
                        <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1">
                            From heritage thali bhojanalayas to 7:00 AM street breakfast stalls and fort-view rooftops.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#C49A32]/10 border border-[#C49A32]/20 flex items-center justify-center text-[#C49A32] mb-4">
                                <Utensils className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] block mb-1">Fort Road &amp; Collectrate</span>
                            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">Heritage Dal Baati Bhojanalayas</h3>
                            <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                                Famous for unlimited royal thalis with piping hot baatis dipped in pure cow ghee, spicy Panchmel dal, and sweet cardamom churma.
                            </p>
                            <div className="text-xs font-bold text-[#C49A32]">Avg. ₹250 – ₹400 / Person</div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#C49A32]/10 border border-[#C49A32]/20 flex items-center justify-center text-[#C49A32] mb-4">
                                <Clock className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] block mb-1">Subhash Chowk &amp; Gol Pyau</span>
                            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">Morning Breakfast Street Stalls</h3>
                            <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                                Bustling from 7:00 AM! Grab signature Kadhi-dunked Pyaaz Kachoris, hot Mirchi Badas, and crunchy Jalebis fresh off the kadhai.
                            </p>
                            <div className="text-xs font-bold text-[#C49A32]">Avg. ₹30 – ₹60 / Item</div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#C49A32]/10 border border-[#C49A32]/20 flex items-center justify-center text-[#C49A32] mb-4">
                                <Coffee className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] block mb-1">Padan Pol &amp; Ramparts</span>
                            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">Fort-View Rooftop Sunset Cafes</h3>
                            <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                                Enjoy freshly brewed artisan coffee, mocktails, continental snacks, and dinner with panoramic vistas of the illuminated 700-acre fort walls.
                            </p>
                            <div className="text-xs font-bold text-[#C49A32]">Avg. ₹300 – ₹600 / Person</div>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#C49A32]/10 border border-[#C49A32]/20 flex items-center justify-center text-[#C49A32] mb-4">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] block mb-1">NH27 Udaipur Highway</span>
                            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">Clay-Oven Highway Dhabas</h3>
                            <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                                Authentic Rajasthani highway dining! Relish freshly baked tandoori rotis, spicy Sev Tamatar, and Dal Tadka cooked in desi ghee.
                            </p>
                            <div className="text-xs font-bold text-[#C49A32]">Avg. ₹180 – ₹300 / Person</div>
                        </div>
                    </div>
                </div>

                {/* Section 3: Dietary, Hygiene & Western Palate Standards */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE7D9] shadow-heritage mb-16">
                    <div className="max-w-3xl mb-8">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#C49A32] block mb-1">
                            Hygiene &amp; Quality Commitment
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F]">
                            Dietary Standards for Families &amp; International Guests
                        </h2>
                        <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1">
                            We ensure that your Mewari food experience is not only delightfully authentic, but 100% clean, safe, and comfortable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                            <div className="flex items-center gap-2 mb-2 text-[#C49A32] font-bold text-sm">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Mild Spice Customization</span>
                            </div>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                International travelers and kids can request zero-chili or mild spice preparations at all our verified heritage dining stops.
                            </p>
                        </div>

                        <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                            <div className="flex items-center gap-2 mb-2 text-[#C49A32] font-bold text-sm">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>100% Pure Desi Ghee &amp; RO Water</span>
                            </div>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                Our recommended restaurants cook exclusively in fresh pure dairy ghee and serve sealed packaged mineral water to avoid stomach discomfort.
                            </p>
                        </div>

                        <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                            <div className="flex items-center gap-2 mb-2 text-[#C49A32] font-bold text-sm">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>100% Pure Vegetarian Purity</span>
                            </div>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                Traditional Mewari cuisine is completely vegetarian (Satvik). Clean kitchens and dedicated Jain food options (without onion/garlic) are available upon request.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 4: Chittorgarh Food FAQ */}
                <div className="mb-16">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1 rounded-full inline-block mb-2">
                            Quick Answers
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F]">
                            Frequently Asked Questions About Chittorgarh Dining
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
                            <h3 className="font-serif font-bold text-base text-[#25231F] mb-2">
                                Q: What is the best time to eat Dal Baati in Chittorgarh?
                            </h3>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                Traditional Dal Baati is best enjoyed as a hearty lunch between 12:00 PM and 3:30 PM. This is when kitchens bake fresh, hot baatis over cow-dung embers and serve hot cardamom churma.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
                            <h3 className="font-serif font-bold text-base text-[#25231F] mb-2">
                                Q: Is a lunch stop included in the Udaipur to Chittorgarh cab package?
                            </h3>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                Yes! Every private AC cab booking from Udaipur includes a dedicated 1-hour lunch break at the top-rated local heritage Bhojanalaya or fort-view restaurant. You pay only for what you eat.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
                            <h3 className="font-serif font-bold text-base text-[#25231F] mb-2">
                                Q: What is the average cost of an authentic Rajasthani meal?
                            </h3>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                An unlimited royal Dal Baati thali in pure desi ghee ranges from ₹250 to ₹400 per person. Street snacks like Kadhi Kachori and Mirchi Bada cost ₹30 to ₹50 each.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
                            <h3 className="font-serif font-bold text-base text-[#25231F] mb-2">
                                Q: Can foreign travelers get non-spicy food?
                            </h3>
                            <p className="text-xs text-[#25231F]/75 leading-relaxed">
                                Yes! Our drivers take international guests only to tourist-friendly, sanitized heritage dining spaces where the chef gladly prepares mild, non-spicy curries and continental alternatives.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlavorsPage;
