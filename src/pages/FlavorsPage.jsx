import React, { useState } from 'react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, LayoutGrid, Star, ArrowRight, X, CheckCircle2, MessageCircle, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';

const FLAVORS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Chittorgarh Local Food & Dining Guide",
    "description": "Discover authentic Rajasthani food in Chittorgarh — Dal Baati Churma, local sweet vendors, rooftop cafes and heritage restaurants.",
    "url": "https://visitchittorgarh.in/flavors",
    "image": "https://visitchittorgarh.in/Fort.webp",
    "servesCuisine": ["Rajasthani", "Mewari", "Indian"]
  }
];

const FlavorsPage = ({ t, filteredVendors = [], filteredCafes = [], searchQuery }) => {
    const [activeCategory, setActiveCategory] = useState('all');

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const famousDishes = [
        {
            name: "Dal Baati Churma",
            desc: "Crushed roasted wheat baatis baked over embers, dunked in pure desi ghee, served with 5-lentil dal and sweet cardamom churma.",
            tag: "Royal Mewari Signature",
            image: "/assets/images/dal-batti-churma-new.webp"
        },
        {
            name: "Gatte ki Sabzi",
            desc: "Tender steamed gram flour dumplings cooked in a spiced yogurt gravy seasoned with fenugreek and mustard seeds.",
            tag: "Traditional Classic",
            image: "/assets/images/gatte-ki-sabzi.webp"
        },
        {
            name: "Chittorgarh Gulab Jamun",
            desc: "Fresh mawa dumplings simmered in rose-cardamom sugar syrup, served hot at heritage sweets shops near Fort Road.",
            tag: "Local Sweet Treasure",
            image: "/assets/images/gulab-jamun-new.webp"
        },
        {
            name: "Kadhi Kachori & Mirchi Bada",
            desc: "Crispy Rajasthani onion and lentil kachoris served drowned in piping hot tempered sour kadhi with green chutney.",
            tag: "Breakfast Street Favorite",
            image: "/assets/images/kadi-kachori.webp"
        }
    ];

    const filterOptions = [
        { id: 'all', label: "All Flavors", icon: LayoutGrid },
        { id: 'dishes', label: "Famous Dishes", icon: Utensils },
        { id: 'vendors', label: "Heritage Dining", icon: Star },
        { id: 'cafes', label: "Fort-View Cafes", icon: Coffee },
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Chittorgarh Food Guide | Dal Baati Churma & Restaurants"
                description="Discover authentic Rajasthani food in Chittorgarh — Dal Baati Churma in pure desi ghee, street food vendors, cafes & heritage thali restaurants."
                canonical="/flavors"
                keywords="Chittorgarh restaurants, food in Chittorgarh, Rajasthani cuisine, Dal Baati Churma, street food Chittorgarh, best cafes Chittorgarh"
                schema={FLAVORS_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        Culinary Heritage of Mewar
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        Famous Local Flavors
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        Savor the authentic cuisine of Mewar. From traditional royal feasts cooked with pure desi ghee to beloved street snacks and fort-view rooftop cafes.
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
                                Must-Try Iconic Mewari Delicacies
                            </h2>
                            <span className="text-xs text-[#25231F]/60">Prepared with Desi Ghee</span>
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
                                    <div className="p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between">
                                        <a
                                            href={`https://wa.me/917597451057?text=${encodeURIComponent(`Hello! Where can I get the best ${dish.name} in Chittorgarh?`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackWhatsAppClick('dish_recommendation_wa', dish.name)}
                                            className="text-xs font-bold text-[#C49A32] hover:text-[#A65F3D] flex items-center gap-1"
                                        >
                                            Find Best Restaurant <ArrowRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Restaurants & Vendors Section */}
                {(activeCategory === 'all' || activeCategory === 'vendors') && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EFE7D9]">
                            <h2 className="text-2xl font-serif font-bold text-[#25231F]">
                                Verified Heritage Dining Halls & Thalis
                            </h2>
                            <span className="text-xs text-[#25231F]/60">Authentic Mewari Thali</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {(filteredVendors.length > 0 ? filteredVendors : [
                                { id: 1, name: "Padmini Heritage Restaurant", specialty: "Royal Mewari Thali", address: "Near Fort Entrance", rating: "4.9" },
                                { id: 2, name: "Chokhi Dhani Dining Hall", specialty: "Authentic Dal Baati & Folk Music", address: "City Center", rating: "4.8" },
                                { id: 3, name: "Pratap Heritage Dining", specialty: "Ker Sangri & Gatte ki Sabji", address: "Station Road", rating: "4.8" }
                            ]).map((v, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                                            {v.specialty || 'Traditional Restaurant'}
                                        </span>
                                        <h3 className="text-xl font-serif font-bold text-[#25231F] mt-3 mb-2">{v.name}</h3>
                                        <p className="text-xs text-[#25231F]/70 mb-4">{v.address || 'Chittorgarh'}</p>
                                        <div className="flex text-[#C49A32] text-xs mb-4">
                                            {'★'.repeat(5)} <span className="ml-2 text-[#25231F]/60">({v.rating || '4.9'})</span>
                                        </div>
                                    </div>
                                    <a
                                        href={`https://wa.me/917597451057?text=${encodeURIComponent(`Hello! I want to reserve a table or order dining at ${v.name}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors"
                                    >
                                        Reserve via WhatsApp
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cafes Section */}
                {(activeCategory === 'all' || activeCategory === 'cafes') && (
                    <div className="mb-16">
                        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#EFE7D9]">
                            <h2 className="text-2xl font-serif font-bold text-[#25231F]">
                                Fort-View Rooftop Cafes & Hangouts
                            </h2>
                            <span className="text-xs text-[#25231F]/60">Sunset Views & Coffee</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {(filteredCafes.length > 0 ? filteredCafes : [
                                { id: 101, name: "The Fort View Rooftop Cafe", specialty: "Woodfired Pizza & Sunset Coffee", address: "Fort Road" },
                                { id: 102, name: "Chai Charcha Heritage Point", specialty: "Special Kulhad Chai & Snacks", address: "Collectorate Chowk" }
                            ]).map((c, i) => (
                                <div key={i} className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
                                    <div>
                                        <div className="w-12 h-12 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center text-[#C49A32] mb-4">
                                            <Coffee className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-[#25231F] mb-1">{c.name}</h3>
                                        <p className="text-xs text-[#25231F]/70 mb-4">{c.specialty}</p>
                                    </div>
                                    <a
                                        href={`https://wa.me/917597451057?text=${encodeURIComponent(`Hello! Please share location and details for ${c.name}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-2.5 bg-[#F8F5EF] hover:bg-[#EFE7D9] text-[#25231F] rounded-xl text-xs font-bold uppercase tracking-wider text-center border border-[#EFE7D9] transition-colors"
                                    >
                                        Get Directions on WhatsApp
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bottom Callout */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Gastronomic Tourism
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            Want an Authentic Heritage Feast Organized?
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            We organize traditional royal thali dinners for families, couples, and groups with pure desi ghee and live Mewari hospitality.
                        </p>
                    </div>

                    <button
                        onClick={triggerPlanTrip}
                        className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg"
                    >
                        Plan Dining Experience
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlavorsPage;
