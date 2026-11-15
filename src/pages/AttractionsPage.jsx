import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard';
import { MapPin, Info, Shield, Wind, Sunrise, Mountain, ArrowRight, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const AttractionsPage = ({ filteredAttractions = [], setSelectedAttraction }) => {
    const { category } = useParams();
    const { t, lang } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    const pageT = t?.attractionsPage || {};
    const catT = pageT?.categories || {};

    // Grouping & Data Selection
    const fortSubIds = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];
    const fortSubAttractions = filteredAttractions.filter(a => fortSubIds.includes(a.id));

    const categoriesData = {
        'fort': {
            main: filteredAttractions.find(a => a.id === 1) || {
                name: "Chittorgarh Fort",
                desc: "A UNESCO World Heritage Site and the largest fort in India. A symbol of resilience, sacrifice, and Rajputana pride.",
                image: "/Fort.webp",
                bestTime: "Oct - March (Winter)"
            },
            subs: fortSubAttractions,
            icon: Shield,
            theme: "from-[#C49A32] to-[#A65F3D]",
            title: catT.fort?.title || "The Grand Citadel",
            subtitle: catT.fort?.subtitle || pageT.heroKicker || "Heritage & History"
        },
        'nature': {
            main: filteredAttractions.find(a => a.id === 2) || {
                name: "Bassi Wildlife Sanctuary & Dam",
                desc: "A serene haven for nature lovers in the Aravalli hills with tranquil waters and migratory birds.",
                image: "/assets/images/nature_generated.webp",
                bestTime: "Oct - Feb (Migratory Birds)"
            },
            subs: filteredAttractions.filter(a => a.id === 18),
            icon: Wind,
            theme: "from-[#526B50] to-[#3B4E3A]",
            title: catT.nature?.title || "Nature & Wilderness",
            subtitle: catT.nature?.subtitle || "Ecological Haven"
        },
        'spiritual': {
            main: filteredAttractions.find(a => a.id === 3) || {
                name: "Sanwariaji Temple",
                desc: "Experience divine blessings at this magnificent Krishna pilgrimage temple in Mandaphiya.",
                image: "/assets/images/Sanvliya-ji-Temple.webp",
                bestTime: "All Year (Aarti 5:15 AM & 7:15 PM)"
            },
            subs: filteredAttractions.filter(a => a.id === 17),
            icon: Sunrise,
            theme: "from-[#C49A32] to-[#DFBA5A]",
            title: catT.spiritual?.title || "Spiritual Serenity",
            subtitle: catT.spiritual?.subtitle || "Divine Mewar"
        },
        'scenic': {
            main: filteredAttractions.find(a => a.id === 15) || {
                name: "Menal Waterfall & Temple Complex",
                desc: "Spectacular 150-foot waterfall cascading into a rocky canyon surrounded by 11th-century carved Shiva temples.",
                image: "/assets/images/waterfall_generated.webp",
                bestTime: "July - Sept (Monsoon Wonder)"
            },
            subs: filteredAttractions.filter(a => a.id === 19),
            icon: Mountain,
            theme: "from-[#A65F3D] to-[#874628]",
            title: catT.scenic?.title || "Scenic Landscapes",
            subtitle: catT.scenic?.subtitle || "Nature's Architecture"
        }
    };

    const activeCat = categoriesData[category] || categoriesData['fort'];
    const { main, subs, icon: Icon, theme, title, subtitle } = activeCat;

    const SEO_CONFIG = {
        fort: {
            title: "Chittorgarh Fort & Monuments | Complete Visitor Guide",
            description: "Explore Chittorgarh Fort — India's largest fort. Visit Vijay Stambh, Kirti Stambh, Padmini Palace, Rana Kumbha Palace & Gaumukh Reservoir.",
            keywords: "Chittorgarh Fort, Vijay Stambh, Kirti Stambh, Padmini Palace, Rana Kumbha Palace, Gaumukh Reservoir, largest fort in India, UNESCO world heritage sites Rajasthan"
        },
        spiritual: {
            title: "Temples in Chittorgarh | Meera Temple & Sanwariyaji",
            description: "Visit sacred temples in Chittorgarh — Meera Temple, Sanwariyaji Temple, Kalika Mata Mandir & Kumbha Shyam Temple.",
            keywords: "Meera Temple Chittorgarh, Sanwariyaji Temple, Kalika Mata Temple, Chittorgarh pilgrimage, temples in Chittorgarh, Sanwariya Seth Temple"
        },
        nature: {
            title: "Bassi Wildlife Sanctuary Chittorgarh | Nature & Wildlife",
            description: "Explore Bassi Wildlife Sanctuary near Chittorgarh — home to leopards, antelopes & over 150 bird species.",
            keywords: "Bassi Wildlife Sanctuary, Chittorgarh wildlife, nature Chittorgarh, bird watching Chittorgarh, eco tourism Rajasthan"
        },
        scenic: {
            title: "Menal Waterfall & Scenic Spots near Chittorgarh",
            description: "Discover Menal Waterfall — the 'Khajuraho of Rajasthan' — featuring a 150-ft canyon waterfall and ancient Shiva temples.",
            keywords: "Menal Waterfall Chittorgarh, Menal Rajasthan, scenic spots Chittorgarh, monsoon places Rajasthan"
        }
    };

    const activeSEO = SEO_CONFIG[category] || SEO_CONFIG['fort'];

    return (
        <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-[#F8F5EF] text-[#25231F]">
            <SEOHead
                title={activeSEO.title}
                description={activeSEO.description}
                canonical={getLocalizedPath(`/attractions/${category || 'fort'}`, lang)}
                keywords={activeSEO.keywords}
            />

            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#EFE7D9] shadow-sm mb-4">
                    <div className={`p-2 rounded-xl bg-gradient-to-br ${theme} text-white`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
                        {subtitle}
                    </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-3">
                    {title}
                </h1>
                <p className="text-xs sm:text-sm text-[#25231F]/70 max-w-xl mx-auto">
                    {pageT.heroDesc || "Explore monuments and heritage sanctuaries that symbolize the courage, artistry, and spirituality of Mewar."}
                </p>
            </div>

            {/* Udaipur to Chittorgarh Day Tour & Cab Booking Banner */}
            <div className="bg-gradient-to-br from-[#25231F] via-[#2D2822] to-[#1C1A17] text-white p-6 sm:p-8 rounded-3xl border border-[#C49A32]/40 shadow-xl mb-12">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 bg-[#C49A32]/15 border border-[#C49A32]/30 px-3 py-1 rounded-full text-[11px] font-bold text-[#C49A32] uppercase tracking-wider mb-3">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Udaipur ⇄ Chittorgarh Citadel Day Tour</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-serif font-black text-white leading-snug mb-2">
                            🏰 Visiting Chittorgarh Citadel? Explore with Private AC Cab &amp; Licensed Guide!
                        </h3>
                        <p className="text-xs sm:text-sm text-white/75 leading-relaxed mb-4 max-w-2xl font-light">
                            Don’t hike 700 acres on foot or deal with touts at the gate. Book our sanitized AC Sedan (₹3,500 / ~$42 USD) or Innova Crysta SUV with official RTDC Mewari historian guide.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-white/90">
                            <span className="flex items-center gap-1.5 text-emerald-400">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>₹0 Advance Required — Pay after the tour!</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-amber-300">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>All 7 Gates &amp; Fort Internal Circuit Included</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-white/80">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>Tolls (NH27 Highway) &amp; Parking Included</span>
                            </span>
                        </div>
                    </div>

                    <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
                        <div className="text-left lg:text-right">
                            <div className="text-[10px] uppercase font-bold text-[#C49A32] tracking-wider">All-Inclusive Fixed Rate</div>
                            <div className="text-2xl sm:text-3xl font-serif font-black text-white">₹3,500 <span className="text-xs font-sans font-normal text-white/70">(~$42 USD)</span></div>
                            <div className="text-[11px] text-white/60">Private AC Sedan Roundtrip</div>
                        </div>
                        <a
                            href={`https://wa.me/917597451057?text=${encodeURIComponent("Namaste Visit Chittorgarh! I saw your Attractions page and would like to book a Private Cab & RTDC Guide from Udaipur for Chittorgarh Fort. Please share availability.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('attractions_banner_wa', 'Private Cab & Guide')}
                            className="py-3.5 px-6 bg-[#128C7E] hover:bg-[#0c6b60] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                        >
                            <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
                            <span>Book Private Cab on WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Immersive Detail Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#EFE7D9] shadow-heritage mb-16"
            >
                <div className="grid lg:grid-cols-12">
                    <div className="lg:col-span-6 h-72 sm:h-96 lg:h-auto overflow-hidden">
                        <img 
                            src={main.image || '/Fort.webp'} 
                            alt={main.name || 'Chittorgarh Fort'} 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#A65F3D] block mb-1">
                                {pageT.mainPillarBadge || "Main Pillar Highlight"}
                            </span>
                            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#25231F] mb-4">
                                {main.name}
                            </h2>
                            <p className="text-sm text-[#25231F]/75 leading-relaxed mb-6">
                                {main.desc}
                            </p>

                            <div className="grid grid-cols-2 gap-4 text-xs mb-8">
                                <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                                    <span className="text-[#25231F]/60 text-[10px] uppercase font-bold block">
                                        {pageT.locationLabel || "Location"}
                                    </span>
                                    <span className="font-semibold text-[#25231F]">
                                        {pageT.locationVal || "Chittorgarh District"}
                                    </span>
                                </div>
                                <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                                    <span className="text-[#25231F]/60 text-[10px] uppercase font-bold block">
                                        {pageT.bestTimeLabel || "Best Visiting Time"}
                                    </span>
                                    <span className="font-semibold text-[#25231F]">{main.bestTime}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#EFE7D9] flex flex-wrap gap-3">
                            <button
                                onClick={() => setSelectedAttraction && setSelectedAttraction(main)}
                                className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                            >
                                {pageT.detailsBtn || "Detailed Information"}
                            </button>
                            <button
                                onClick={() => window.dispatchEvent(new CustomEvent('openTripPlannerModal', {
                                    detail: {
                                        mode: 'focused',
                                        itemName: `${main.title || main.name || 'Attraction'} Guided Tour`,
                                        itemDuration: main.bestTime || '',
                                        category: 'Attraction Tour',
                                    }
                                }))}
                                className="px-6 py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                            >
                                {pageT.bookTourBtn || "Book Guided Tour"}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Sub-attractions Grid */}
            {subs && subs.length > 0 && (
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EFE7D9]">
                        <h3 className="text-2xl font-serif font-bold text-[#25231F]">
                            {pageT.circuitHeading || "Historic Treasures in this Circuit"}
                        </h3>
                        <span className="text-xs text-[#25231F]/60 font-medium">
                            {subs.length} {pageT.monumentsCount || "Monitored Monuments"}
                        </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence>
                            {subs.map(item => (
                                <AttractionCard 
                                    key={`fort-sub-${item.id}`} 
                                    attraction={item} 
                                    onExplore={setSelectedAttraction} 
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Navigation to Other Pillars */}
            <div className="pt-12 border-t border-[#EFE7D9] text-center">
                <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#25231F]/60 mb-6">
                    {pageT.otherPillars || "Explore Other Mewar Pillars"}
                </h4>
                <div className="flex flex-wrap justify-center gap-3">
                    {Object.entries(categoriesData).map(([key, data]) => (
                        key !== (category || 'fort') && (
                            <Link 
                                key={key}
                                to={getLocalizedPath(`/attractions/${key}`, lang)}
                                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-white border border-[#EFE7D9] hover:border-[#C49A32] text-xs font-bold uppercase tracking-wider text-[#25231F] shadow-sm hover:shadow-md transition-all"
                            >
                                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${data.theme}`}></div>
                                <span>{data.title}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#C49A32]" />
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttractionsPage;
