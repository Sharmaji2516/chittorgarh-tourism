import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, ArrowRight, Car, Hotel, Map, History, ShieldCheck, HeartHandshake, X, Utensils, Coffee, Camera } from 'lucide-react';
import Section from '../components/Section';
import BookingModal from '../components/BookingModal';
import QuickInquiryModal from '../components/QuickInquiryModal';
import { NavLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const JOURNEYS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Chittorgarh Tour Packages & Guided Itineraries",
    "description": "Curated 1-day, 2-day and 3-day Chittorgarh tour packages with expert local guides, luxury cabs and heritage experiences.",
    "url": "https://visitchittorgarh.in/royal-journeys",
    "image": "https://visitchittorgarh.in/Fort.png",
    "touristType": ["Cultural tourist", "Heritage tourist", "Family tourist", "Couple"],
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "1-Day Chittorgarh Tour" },
        { "@type": "ListItem", "position": 2, "name": "2-Day Chittorgarh Heritage Tour" },
        { "@type": "ListItem", "position": 3, "name": "3-Day Chittorgarh Royal Expedition" }
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How many days are enough for Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "2 days are ideal to explore Chittorgarh thoroughly. Day 1 covers the main fort complex including Vijay Stambh, Kirti Stambh, Padmini Palace and Rana Kumbha Palace. Day 2 covers Sanwariyaji Temple, Bassi Wildlife Sanctuary and Menal Waterfall."
        }
      },
      {
        "@type": "Question",
        "name": "What is the best time to visit Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "October to March is the best time to visit Chittorgarh. The weather is pleasant with temperatures between 10–25°C, ideal for sightseeing. The Mewar Festival in March and Teej in August are also popular times to visit."
        }
      },
      {
        "@type": "Question",
        "name": "Is Chittorgarh worth visiting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Chittorgarh is home to India's largest fort complex (a UNESCO World Heritage Site), the iconic Vijay Stambh (Tower of Victory), Padmini Palace, and the legendary Meera Temple. It offers unmatched Rajput history, architecture and culture."
        }
      },
      {
        "@type": "Question",
        "name": "How to reach Chittorgarh from Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chittorgarh is 115 km from Udaipur — approximately 2 hours by car or 2.5 hours by train. Direct trains like the Mewar Express connect Udaipur to Chittorgarh Railway Station regularly."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" },
      { "@type": "ListItem", "position": 2, "name": "Royal Journeys & Tours", "item": "https://visitchittorgarh.in/royal-journeys" }
    ]
  }
];


const RoyalJourneysPage = ({ t }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [activeEntity, setActiveEntity] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [activeTab, setActiveTab] = useState('packages'); 
    const [showTransportSelection, setShowTransportSelection] = useState(false);

    const openFullBooking = (title) => {
        setActiveEntity(title);
        setIsBookingOpen(true);
    };

    const openQuickInquiry = (name, cat) => {
        setActiveEntity(name);
        setActiveCategory(cat);
        setIsInquiryOpen(true);
        setShowTransportSelection(false);
    };

    const packages = t.packages.items;
    const transportOptions = [
        { id: 'sedan', name: t.booking.options.luxurySedan, icon: Car },
        { id: 'suv', name: t.booking.options.royalSUV, icon: Car },
        { id: 'minibus', name: t.booking.options.miniBus, icon: Car },
        { id: 'tempo', name: t.booking.options.tempoTraveller, icon: Car },
        { id: 'auto', name: t.booking.options.autoRickshaw, icon: Car }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white relative overflow-hidden">
            <SEOHead
                title="Chittorgarh Tour Packages & Itineraries | 1-3 Day Trips"
                description="Plan your Chittorgarh trip with curated 1-day, 2-day & 3-day itineraries. Book guided heritage tours, luxury cabs & Rajasthani packages with expert local guides."
                canonical="/royal-journeys"
                keywords="Chittorgarh tour package, Chittorgarh itinerary, 1 day Chittorgarh tour, 2 day Chittorgarh, Chittorgarh guided tour, Rajasthan tour package"
                ogImage="https://visitchittorgarh.in/Fort.png"
                schema={JOURNEYS_SCHEMA}
            />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />
            
            {/* Header Section */}
            <div className="pt-32 pb-16 text-center px-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-white font-black italic mb-6 tracking-tighter uppercase drop-shadow-2xl">
                        {t.nav.royalJourneys}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 font-light italic text-lg leading-relaxed">
                        "{t.royalJourneysPage.portalToPast}"
                    </p>
                </motion.div>
            </div>

            {/* Path Selection Tabs */}
            <div className="max-w-xl mx-auto px-4 mb-16 relative z-10">
                <div className="flex bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-2xl">
                    <button 
                        onClick={() => setActiveTab('packages')}
                        className={`flex-1 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'packages' ? 'bg-royal-gold text-royal-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        {t.royalJourneysPage.royalExpeditions}
                    </button>
                    <button 
                        onClick={() => setActiveTab('services')}
                        className={`flex-1 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-royal-gold text-royal-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        {t.royalJourneysPage.onDemandServices}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'packages' ? (
                    <motion.div 
                        key="packages"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="px-4"
                    >
                        <Section id="expeditions" title={t.packages.title} subtitle={t.packages.subtitle} className="bg-transparent !pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {packages.map((pkg, idx) => (
                                    <motion.div 
                                        key={pkg.id}
                                        whileHover={{ y: -10 }}
                                        className="group relative bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl overflow-hidden"
                                    >
                                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-royal-gold/5 blur-[80px] rounded-full group-hover:bg-royal-gold/10 transition-colors"></div>
                                        
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="px-5 py-2 bg-royal-gold/10 rounded-full border border-royal-gold/20 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                                {pkg.duration} {t.royalJourneysPage.completePackage}
                                            </div>
                                        </div>

                                        {pkg.image && (
                                            <div className="w-full h-48 mb-6 overflow-hidden rounded-2xl">
                                                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        )}

                                        <h3 className="text-4xl font-serif text-white font-black italic mb-6 group-hover:text-royal-gold transition-colors tracking-tight">{pkg.name}</h3>
                                        <p className="text-gray-400 mb-10 leading-relaxed italic">"{pkg.desc}"</p>

                                        <div className="space-y-4 mb-12">
                                            {pkg.includes.map((inc, i) => (
                                                <div key={i} className="flex items-center gap-4 text-white/70">
                                                    <ShieldCheck className="w-4 h-4 text-royal-gold" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">{inc}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <button 
                                                onClick={() => openFullBooking(`${pkg.name} Package`)}
                                                className="w-full py-4 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-royal-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
                                            >
                                                {t.royalJourneysPage.inquireOnWebsite}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                            <a 
                                                href={`https://wa.me/917597451057?text=${encodeURIComponent(t.royalJourneysPage.whatsappMessage.replace('{name}', pkg.name).replace('{duration}', pkg.duration))}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 bg-transparent border border-royal-gold text-royal-gold font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 hover:bg-royal-gold/10 transition-all"
                                            >
                                                {t.royalJourneysPage.inquireOnWhatsApp}
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.301-.15-1.781-.879-2.057-.979-.275-.1-.475-.15-.675.15-.2.3-.775 1.05-.95 1.25-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.795-1.492-1.775-1.665-2.075-.175-.3-.019-.463.13-.612.134-.133.301-.35.451-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525c-.075-.15-.675-1.625-.925-2.225-.244-.589-.493-.51-.675-.519-.175-.009-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.113 3.226 5.125 4.525.715.309 1.275.494 1.71.632.72.229 1.375.196 1.89.12.575-.085 1.781-.725 2.031-1.425.25-.7.25-1.3 0-1.425-.05-.125-.2-.2-.5-.35z"/></svg>
                                            </a>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Section>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="services"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="px-4"
                    >
                        <Section id="individual" title={t.royalJourneysPage.individualServices} subtitle={t.royalJourneysPage.bookVerifiedServices} className="bg-transparent !pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {/* Stay Service */}
                                <NavLink to="/stays" className="group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Hotel className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.grandStays}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.verifiedHotels}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.browseStays} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </NavLink>

                                {/* Transport Service */}
                                <div onClick={() => setShowTransportSelection(true)} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Car className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.royalTransport}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.professionalChauffeurs}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.bookTransport} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Guide Service */}
                                <div onClick={() => openQuickInquiry('Certified Heritage Guide', 'Guide')} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Map className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.expertGuides}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.certifiedHistorians}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.findGuide} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Restaurant Service */}
                                <div onClick={() => openQuickInquiry('Fine Dining Restaurant', 'Dining')} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Utensils className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.fineDining}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.savorMewari}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.reserveTable} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Cozy Cafes */}
                                <div onClick={() => openQuickInquiry('Cozy Cafe Visit', 'Cafe')} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Coffee className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.cozyCafes}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.relaxHangout}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.visitCafe} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Photographer Service */}
                                <div onClick={() => openQuickInquiry('Professional Photographer', 'Photography')} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Camera className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.photographer}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.captureMemories}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.bookShoot} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Horse Photo Service */}
                                <div onClick={() => openQuickInquiry('Horse Photography Session', 'Photography')} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Camera className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">{t.royalJourneysPage.horsePhoto}</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">{t.royalJourneysPage.majesticPhotos}</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        {t.royalJourneysPage.bookSession} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Trust Banner */}
                            <div className="max-w-4xl mx-auto mt-20 bg-royal-gold/5 p-10 rounded-[3rem] border border-royal-gold/10 text-center">
                                <div className="flex justify-center mb-6">
                                    <Zap className="w-12 h-12 text-royal-gold" />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-4">The Concierge Advantage</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                                    {t.common.conciergeBenefits.map((b, i) => (
                                        <div key={i} className="space-y-2">
                                            <ShieldCheck className="w-5 h-5 text-royal-gold mx-auto" />
                                            <p className="text-[9px] text-white/50 font-black uppercase tracking-widest leading-relaxed">{b}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Section>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transport Selection Modal-like Overlay */}
            <AnimatePresence>
                {showTransportSelection && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-royal-black/95 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-heritage-charcoal w-full max-w-2xl rounded-[3rem] border border-white/10 p-10 shadow-2xl relative"
                        >
                            <button onClick={() => setShowTransportSelection(false)} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-4xl font-serif text-white mb-2">Select Vehicle Type</h2>
                            <p className="text-royal-gold text-[10px] font-black uppercase tracking-widest mb-10">Real-time availability check follows</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {transportOptions.map(opt => (
                                    <button 
                                        key={opt.id} 
                                        onClick={() => openQuickInquiry(`Royal ${opt.name}`, 'Transport')}
                                        className="group bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-royal-gold transition-all flex items-center gap-6 text-left"
                                    >
                                        <div className="w-14 h-14 bg-royal-gold/10 rounded-xl flex items-center justify-center text-royal-gold group-hover:scale-110 transition-transform">
                                            <opt.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-serif text-xl">{opt.name}</h4>
                                            <span className="text-[9px] text-royal-gold uppercase tracking-widest font-black">Book with Best Price</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BookingModal 
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                pillarTitle={activeEntity}
            />

            <QuickInquiryModal 
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                entityName={activeEntity}
                category={activeCategory}
            />

            <div className="pb-20 text-center">
                <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.4em] font-serif italic">
                    * {t.common.disclaimer}
                </p>
            </div>
        </div>
    );
};

export default RoyalJourneysPage;
