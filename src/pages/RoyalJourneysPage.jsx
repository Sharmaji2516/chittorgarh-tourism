import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Car, Hotel, Map, History, Utensils, Coffee, Camera, Compass, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const JOURNEYS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Chittorgarh Tour Packages & Guided Itineraries",
    "description": "Curated 1-day, 2-day and 3-day Chittorgarh tour packages with expert local guides, sanitized cabs and heritage experiences.",
    "url": "https://www.visitchittorgarh.in/royal-journeys",
    "image": "https://www.visitchittorgarh.in/Fort.webp"
  }
];

const RoyalJourneysPage = () => {
    const { t, lang } = useLanguage();
    const [activeTab, setActiveTab] = useState('packages');

    const pageT = t?.packagesPage || {};

    const triggerPlanTrip = (pkg = null) => {
        if (pkg && pkg.name) {
            window.dispatchEvent(new CustomEvent('openTripPlannerModal', {
                detail: {
                    mode: 'focused',
                    itemName: pkg.name,
                    itemDuration: pkg.duration || '',
                    category: 'Package',
                }
            }));
        } else {
            window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
        }
    };

    const packageImages = [
        "/Fort.webp",
        "/assets/images/Sanvliya-ji-Temple.webp",
        "/assets/images/nature_generated.webp"
    ];

    const rawPackages = pageT.packages || [
        {
            id: 1,
            name: "1-Day Heritage Express Tour",
            duration: "Full Day (8-10 Hours)",
            desc: "Explore all 7 gates, Vijay Stambha, Padmini Palace, Gaumukh Reservoir, and the evening Light & Sound Show with authorized guide.",
            includes: ["Govt. Certified Historian", "Private AC Cab for Fort Circuit", "Traditional Dal Baati Lunch", "Light Show Coordination"],
        },
        {
            id: 2,
            name: "2-Day Complete Mewar Experience",
            duration: "2 Days / 1 Night",
            desc: "The complete heritage journey: in-depth fort exploration on Day 1 and spiritual darshan at Sanwariya Seth Temple & Menal Gorge on Day 2.",
            includes: ["Certified Historian Guide", "Boutique Heritage Haveli Stay", "Private SUV Transfer", "All Entry & Darshan Assistance"],
        },
        {
            id: 3,
            name: "3-Day Royal Citadel & Wilderness",
            duration: "3 Days / 2 Nights",
            desc: "Extensive Rajasthan heritage vacation covering Chittorgarh Fort, Bassi Wildlife Sanctuary, Menal Waterfall, and countryside artisan villages.",
            includes: ["Private Dedicated AC Vehicle", "2 Nights Boutique Hotel", "Wildlife & Heritage Guides", "Traditional Cuisine Tastings"],
        }
    ];

    const packages = rawPackages.map((pkg, idx) => ({
        ...pkg,
        image: packageImages[idx] || "/Fort.webp"
    }));

    const rawServices = pageT.services || [
        { title: "Private Tour Guide", desc: "Authorized Mewari historian fluent in English and Hindi." },
        { title: "Private Taxi / Cab", desc: "Sanitized AC Sedans, Innova Crysta & Tempo Travellers." },
        { title: "Heritage Haveli Stay", desc: "Handpicked royal havelis and boutique resorts." },
        { title: "Traditional Dining", desc: "Authentic Dal Baati Churma cooked in pure desi ghee." },
        { title: "Artisan & Textile Tour", desc: "Explore local Daabu mud-resist block printers & Thewa craft." },
        { title: "Fort Photography", desc: "Professional portraits & sunset photoshoot atop the ramparts." }
    ];

    const serviceIcons = [Map, Car, Hotel, Utensils, Coffee, Camera];
    const serviceLinks = [
        "/service/guide",
        "/service/taxi",
        "/stays",
        "/flavors",
        "/vocal-for-local",
        "/service/photographer"
    ];

    const onDemandServices = rawServices.map((srv, idx) => ({
        ...srv,
        icon: serviceIcons[idx] || Map,
        link: serviceLinks[idx] || "/service/guide"
    }));

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Chittorgarh Tour Packages & Guided Itineraries | Rajasthan Heritage Tours"
                description="Curated 1-day, 2-day & 3-day Chittorgarh itineraries and tour packages. Book guided heritage tours, local taxis & custom Rajasthan travel plans."
                canonical={getLocalizedPath('/royal-journeys', lang)}
                keywords="Chittorgarh tour package, Chittorgarh itinerary, 1 day Chittorgarh tour, 2 day Chittorgarh, Chittorgarh guided tour, Rajasthan tour package"
                schema={JOURNEYS_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        {pageT.kicker || "Curated Rajasthan Travel Plans"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        {pageT.title || "Tour Packages & Experiences"}
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        {pageT.desc || "Handcrafted journeys designed to immerse you into the heroic history, divine pilgrimage sites, and royal hospitality of Chittorgarh."}
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="max-w-md mx-auto mb-14 bg-white p-1.5 rounded-2xl border border-[#EFE7D9] shadow-sm flex gap-2">
                    <button
                        onClick={() => setActiveTab('packages')}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'packages'
                                ? 'bg-[#25231F] text-white shadow-md'
                                : 'text-[#25231F]/70 hover:text-[#25231F]'
                        }`}
                    >
                        {pageT.tabPackages || "Tour Packages"}
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'services'
                                ? 'bg-[#25231F] text-white shadow-md'
                                : 'text-[#25231F]/70 hover:text-[#25231F]'
                        }`}
                    >
                        {pageT.tabServices || "On-Demand Services"}
                    </button>
                </div>

                {/* Packages View */}
                {activeTab === 'packages' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="h-56 relative overflow-hidden bg-[#EFE7D9]">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <span className="absolute bottom-3 left-3 bg-[#25231F]/85 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-[#C49A32]" />
                                            {pkg.duration}
                                        </span>
                                    </div>

                                    <div className="p-6 sm:p-8">
                                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-3 leading-snug">
                                            {pkg.name}
                                        </h3>
                                        <p className="text-xs text-[#25231F]/70 leading-relaxed mb-6">
                                            {pkg.desc}
                                        </p>

                                        <div className="space-y-2.5 mb-6">
                                            {(pkg.includes || []).map((inc, i) => (
                                                <div key={i} className="flex items-center gap-2.5 text-xs text-[#25231F]/80">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                                    <span>{inc}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 sm:p-8 pt-0 border-t border-[#EFE7D9]/60 flex flex-col gap-2.5">
                                    <button
                                        onClick={() => triggerPlanTrip(pkg)}
                                        className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                                    >
                                        <Compass className="w-4 h-4" />
                                        {pageT.inquireBtn || "Inquire & Customize"}
                                    </button>
                                    <a
                                        href={`https://wa.me/917597451057?text=${encodeURIComponent(`Namaste! I would like to inquire about the *${pkg.name}* (${pkg.duration}). Please share details.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsAppClick('package_card_wa', pkg.name)}
                                        className="w-full py-3 bg-[#F8F5EF] hover:bg-[#EFE7D9] text-[#25231F] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#EFE7D9] transition-colors"
                                    >
                                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                                        {pageT.whatsappBtn || "WhatsApp Concierge"}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* On-Demand Services Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {onDemandServices.map((srv, idx) => (
                            <NavLink
                                key={idx}
                                to={getLocalizedPath(srv.link, lang)}
                                className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-14 h-14 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center text-[#C49A32] mb-5 group-hover:scale-110 transition-transform">
                                        <srv.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                                        {srv.title}
                                    </h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-6">
                                        {srv.desc}
                                    </p>
                                </div>
                                <div className="flex items-center text-xs font-bold text-[#C49A32] group-hover:text-[#A65F3D] gap-1">
                                    <span>{pageT.learnMore || "Learn More & Reserve"}</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </NavLink>
                        ))}
                    </div>
                )}

                {/* Custom Itinerary Consultation CTA */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center lg:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            {pageT.customKicker || "Bespoke Travel Planning"}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            {pageT.customTitle || "Need a Tailored Rajasthan Tour Itinerary?"}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            {pageT.customDesc || "Tell us your travel dates, pickup city, and group preferences. We will handcraft an authentic Mewar journey just for you."}
                        </p>
                    </div>

                    <button
                        onClick={() => triggerPlanTrip(null)}
                        className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg transition-transform active:scale-95 flex items-center gap-2"
                    >
                        <Compass className="w-4 h-4" />
                        {pageT.customBtn || "Plan Custom Itinerary"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoyalJourneysPage;
