import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, ArrowRight, ShieldCheck, ShoppingBag, Palette, MessageCircle, Compass } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const LOCAL_VOCAL_SCHEMA = [
    {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Chittorgarh Handicrafts & Local Artisans Guide",
        "description": "Explore authentic Chittorgarh handicrafts — Thewa jewelry, Daabu printed fabrics, Rajasthani miniature paintings and local artisan souvenirs.",
        "url": "https://www.visitchittorgarh.in/vocal-for-local",
        "image": "https://www.visitchittorgarh.in/Fort.webp"
    }
];

const LocalVocalPage = () => {
    const { t, lang } = useLanguage();
    const pageT = t?.localVocalPage || {};

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const artisanCategories = [
        {
            title: "Thewa Gold-on-Glass Jewellery",
            desc: lang === 'hi' ? 'जीवंत बेल्जियन कांच पर 23 कैरेट सोने की नक्काशीदार शाही आभूषण कला।' : "250-year-old royal art fusing hand-engraved 23K gold filigree onto vibrant Belgian glass.",
            badge: "UNESCO Heritage Craft",
            image: "/assets/images/nature_generated.webp"
        },
        {
            title: "Daabu Mud-Resist Block Printing",
            desc: lang === 'hi' ? 'अकोला के पीढ़ियों पुराने लकड़ी के ठप्पों और प्राकृतिक मिट्टी से रंगे पारंपरिक वस्त्र।' : "Handcrafted natural indigo textiles printed using generational wooden blocks and organic mud resist in Akola.",
            badge: "Authentic Textile Art",
            image: "/assets/images/temple_generated.webp"
        },
        {
            title: "Rajasthani Wooden Toys & Lac Bangles",
            desc: lang === 'hi' ? 'स्थानीय कारीगरों द्वारा निर्मित पारंपरिक लकड़ी के खिलौने, लाख की चूड़ियां और जूतियां।' : "Traditional wooden craftsmanship, vibrant lacquered bangles, and hand-embroidered leather juttis from local artisans.",
            badge: "Traditional Bazaars",
            image: "/assets/images/fort_generated.webp"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Chittorgarh Shopping | Thewa Art, Daabu Prints & Handicrafts"
                description="Shop authentic Chittorgarh handicrafts — Thewa gold jewelry, Daabu block-printed fabrics, and local artisan crafts. Support local generational masters."
                canonical={getLocalizedPath('/vocal-for-local', lang)}
                keywords="Chittorgarh shopping, Thewa jewelry Chittorgarh, handicrafts Chittorgarh, Daabu print, Rajasthani souvenirs, local market Chittorgarh"
                schema={LOCAL_VOCAL_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        {pageT.kicker || "Vocal for Local • Empowering Artisans"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        {pageT.title || "Vocal For Local — Mewar Artisans"}
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        {pageT.desc || "Support traditional local artisans in Chittorgarh: handcrafted Akola block-printed textiles, terracotta pottery, and authentic Rajasthani souvenirs."}
                    </p>
                </div>

                {/* Artisan Crafts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {artisanCategories.map((art, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-56 relative overflow-hidden bg-[#EFE7D9]">
                                    <img
                                        src={art.image}
                                        alt={art.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                        {art.badge}
                                    </span>
                                </div>
                                <div className="p-6 sm:p-8">
                                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                                        {art.title}
                                    </h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed">
                                        {art.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LocalVocalPage;
