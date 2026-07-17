import React from 'react';
import { ShieldCheck, HeartHandshake, Car, Map, Hotel, UtensilsCrossed, ChevronRight, Coffee, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const MISSION_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Visit Chittorgarh — Local Guide & Tourism Services",
    "description": "Expert local guides, certified tourist assistance, fort walkthroughs, heritage tours and customised Chittorgarh experiences for families, couples and solo travellers.",
    "url": "https://visitchittorgarh.in/mission-services",
    "image": "https://visitchittorgarh.in/Fort.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chittorgarh",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN",
      "postalCode": "312001"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.8887",
      "longitude": "74.6269"
    },
    "priceRange": "₹₹"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" },
      { "@type": "ListItem", "position": 2, "name": "Local Guide Services", "item": "https://visitchittorgarh.in/mission-services" }
    ]
  }
];


const MissionServicesPage = ({ t }) => {
    const mission = t.missionPage;
    const services = t.servicesPage;

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'taxi': return <Car className="w-6 h-6" />;
            case 'guide': return <Map className="w-6 h-6" />;
            case 'hotel': return <Hotel className="w-6 h-6" />;
            case 'restaurant': return <UtensilsCrossed className="w-6 h-6" />;
            case 'coffee': return <Coffee className="w-6 h-6" />;
            case 'camera': return <Camera className="w-6 h-6" />;
            default: return <ChevronRight className="w-6 h-6" />;
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white relative overflow-hidden">
            <SEOHead
                title="Chittorgarh Local Guide Services | Expert Tourist Help"
                description="Book expert local guides in Chittorgarh. Certified fort walkthroughs, heritage tours, taxi hire & customised experiences for families, couples & solo travellers."
                canonical="/mission-services"
                keywords="Chittorgarh local guide, tourist guide Chittorgarh, Chittorgarh tour guide, fort walkthrough Chittorgarh, Chittorgarh taxi, heritage tour guide"
                ogImage="https://visitchittorgarh.in/Fort.png"
                schema={MISSION_SCHEMA}
            />
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />

            {/* Page Header */}
            <div className="pt-32 pb-16 text-center px-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-white font-black italic mb-6 tracking-tighter uppercase drop-shadow-2xl">
                        {mission.title}
                    </h1>
                    <p className="max-w-2xl mx-auto text-royal-gold font-light italic text-lg md:text-xl mb-8">
                        "{mission.subtitle}"
                    </p>
                </motion.div>
            </div>

            {/* Mission Section */}
            <div id="mission" className="max-w-7xl mx-auto px-4 pb-24 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 hover:border-royal-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-between group"
                    >
                        <div>
                            <div className="w-14 h-14 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                <HeartHandshake className="w-7 h-7" />
                            </div>
                            <h3 className="text-3xl font-serif text-white font-black italic mb-4 tracking-tight group-hover:text-royal-gold transition-colors">Vocal For Local</h3>
                            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
                                {mission.desc1}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                            Supporting Heritage <ChevronRight className="w-3 h-3" />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/[0.03] backdrop-blur-3xl p-8 md:p-10 rounded-[2.5rem] border border-white/10 hover:border-royal-gold/30 transition-all duration-500 shadow-2xl flex flex-col justify-between group"
                    >
                        <div>
                            <div className="w-14 h-14 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <h3 className="text-3xl font-serif text-white font-black italic mb-4 tracking-tight group-hover:text-royal-gold transition-colors">24/7 Support</h3>
                            <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
                                {mission.desc2}
                            </p>
                        </div>
                        <div className="mt-6 flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                            Always Available <ChevronRight className="w-3 h-3" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Services Header */}
            <div id="services" className="pt-16 pb-16 text-center px-4 relative">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative z-10"
                >
                    <h2 className="text-4xl md:text-6xl font-serif text-white font-black italic mb-4 tracking-tighter uppercase">
                        {services.title}
                    </h2>
                    <p className="text-royal-gold font-light italic text-lg md:text-xl mb-6">
                        "{services.subtitle}"
                    </p>
                    <p className="text-white/60 max-w-3xl mx-auto leading-relaxed text-sm md:text-base font-light">
                        {services.desc}
                    </p>
                </motion.div>
            </div>

            {/* Services Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-32 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.items.map((item, index) => (
                        <motion.a 
                            key={index}
                            href={`https://wa.me/917597451057?text=${encodeURIComponent(`🌟 *Chittorgarh Tourism Inquiry* 🌟\n\nHello! I am interested in your *${item.title}* service.\n\n✨ *Status:* Looking for more details.\n\nPlease provide me with the details and availability. Thanks! 🙏`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-white/[0.02] backdrop-blur-2xl p-8 rounded-[2rem] border border-white/5 hover:border-royal-gold/30 hover:bg-royal-gold/5 transition-all duration-500 shadow-2xl flex flex-col justify-between cursor-pointer"
                        >
                            <div>
                                <div className="w-12 h-12 bg-royal-gold/10 rounded-xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                    {getIcon(item.icon)}
                                </div>
                                <h3 className="text-xl font-serif text-white font-bold mb-3 group-hover:text-royal-gold transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors font-light">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-royal-gold text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                Book via WhatsApp <ChevronRight className="w-3 h-3" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Footer Banner */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-royal-gold/10 border border-royal-gold/20 text-royal-gold shadow-2xl backdrop-blur-md">
                        <span className="w-2 h-2 bg-royal-gold rounded-full animate-ping"></span>
                        <span className="text-xs font-black uppercase tracking-[0.2em]">24/7 Royal Assistance Available</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MissionServicesPage;
