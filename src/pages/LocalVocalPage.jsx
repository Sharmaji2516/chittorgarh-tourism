import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, ArrowRight, ShieldCheck, ShoppingBag, Palette, MessageCircle, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';

const LOCAL_VOCAL_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Chittorgarh Handicrafts & Local Shopping",
    "description": "Explore authentic Chittorgarh handicrafts — Thewa jewelry, Daabu printed fabrics, Rajasthani miniature paintings and local artisan souvenirs.",
    "url": "https://visitchittorgarh.in/vocal-for-local",
    "image": "https://visitchittorgarh.in/Fort.webp"
  }
];

const LocalVocalPage = ({ t, filteredLocalVocal = [] }) => {
    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const artisanCategories = [
        {
            title: "Thewa Gold-on-Glass Jewellery",
            desc: "250-year-old royal art fusing hand-engraved 23K gold filigree onto vibrant Belgian glass.",
            badge: "UNESCO Heritage Craft",
            image: "/assets/images/nature_generated.webp"
        },
        {
            title: "Daabu Mud-Resist Block Printing",
            desc: "Handcrafted natural indigo textiles printed using generational wooden blocks and organic mud resist in Akola.",
            badge: "Authentic Textile Art",
            image: "/assets/images/temple_generated.webp"
        },
        {
            title: "Rajasthani Wooden Toys & Lac Bangles",
            desc: "Traditional wooden craftsmanship, vibrant lacquered bangles, and hand-embroidered leather juttis from local artisans.",
            badge: "Traditional Bazaars",
            image: "/assets/images/fort_generated.webp"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Chittorgarh Shopping | Thewa Art, Daabu Prints & Handicrafts"
                description="Shop authentic Chittorgarh handicrafts — Thewa gold jewelry, Daabu block-printed fabrics, and local artisan crafts. Support local generational masters."
                canonical="/vocal-for-local"
                keywords="Chittorgarh shopping, Thewa jewelry Chittorgarh, handicrafts Chittorgarh, Daabu print, Rajasthani souvenirs, local market Chittorgarh"
                schema={LOCAL_VOCAL_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        Vocal for Local • Empowering Artisans
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        Local Artisans & Handicrafts
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        Support generational craft masters of Mewar. Buy directly from authentic artisans without middleman markups or counterfeit commercial souvenirs.
                    </p>
                </div>

                {/* Craft Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {artisanCategories.map((craft, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-52 overflow-hidden bg-[#EFE7D9] relative">
                                    <img src={craft.image} alt={craft.title} className="w-full h-full object-cover" />
                                    <span className="absolute top-3 left-3 bg-[#25231F]/80 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {craft.badge}
                                    </span>
                                </div>
                                <div className="p-6 sm:p-8">
                                    <h3 className="text-xl font-serif font-bold text-[#25231F] mb-3">{craft.title}</h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-6">{craft.desc}</p>
                                </div>
                            </div>
                            <div className="p-6 sm:p-8 pt-0 border-t border-[#EFE7D9]/60">
                                <a
                                    href={`https://wa.me/917597451057?text=${encodeURIComponent(`Hello! Where can I visit authentic workshops for ${craft.title} in Chittorgarh?`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Locate Verified Workshop
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Artisan Support Statement */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Responsible Heritage Tourism
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            Want an Artisan Studio Walking Tour?
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            Our local guides take you into ancient weaver courtyards and silversmith workshops for authentic craft demonstrations.
                        </p>
                    </div>

                    <button
                        onClick={triggerPlanTrip}
                        className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg"
                    >
                        Inquire Artisan Tour
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocalVocalPage;
