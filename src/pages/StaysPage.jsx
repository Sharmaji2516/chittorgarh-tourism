import React, { useState } from 'react';
import Section from '../components/Section';
import { motion } from 'framer-motion';
import { Hotel, ArrowRight, ShieldCheck, MapPin, Star, Zap, HeartHandshake } from 'lucide-react';
import QuickInquiryModal from '../components/QuickInquiryModal';

const StaysPage = ({ t }) => {
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState('');

    const openInquiry = (hotelName) => {
        setSelectedHotel(hotelName);
        setIsInquiryOpen(true);
    };

    const hotels = t.hotels.items;

    return (
        <div className="space-y-0">
            {/* Header Section */}
            <div className="pt-20 pb-12 text-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-wider">
                        {t.hotels.title}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 mb-8 font-light italic text-lg">
                        "Handpicked Royal Residences. We negotiate directly with owners to ensure you get the best rates and VIP treatment."
                    </p>
                    
                    {/* Why Book With Us Banner */}
                    <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 bg-royal-gold/5 p-6 rounded-[2rem] border border-royal-gold/10">
                        {t.common.conciergeBenefits.map((benefit, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-royal-gold" />
                                <span className="text-[9px] text-white/60 font-black uppercase tracking-widest text-center">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Individual Stays Grid */}
            <Section id="hotels-list" title="The Royal Collection" className="bg-transparent !pt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {hotels.map((hotel) => (
                        <motion.div
                            key={hotel.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="group relative bg-heritage-charcoal/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-royal-gold/40 transition-all duration-500 shadow-2xl flex flex-col h-full"
                        >
                            {/* Best Price Tag */}
                            <div className="absolute top-6 left-6 px-4 py-2 bg-royal-gold text-royal-black text-[10px] font-black uppercase tracking-widest rounded-full shadow-xl z-10 flex items-center gap-2">
                                <Zap className="w-3 h-3 fill-royal-black" />
                                Best Price Guaranteed
                            </div>

                            <div className="h-64 overflow-hidden relative">
                                <img 
                                    src={hotel.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop"} 
                                    alt={hotel.name} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-heritage-charcoal via-transparent to-transparent opacity-80" />
                            </div>

                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center gap-2 text-royal-gold mb-4">
                                    <Star className="w-4 h-4 fill-royal-gold" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t.common.verified}</span>
                                </div>

                                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">
                                    {hotel.name}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                    {hotel.desc}
                                </p>

                                <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                                            <MapPin className="w-3 h-3 text-royal-gold" />
                                            Chittorgarh
                                        </div>
                                        <div className="text-royal-gold font-serif italic text-lg">Special Rates</div>
                                    </div>
                                    <button 
                                        onClick={() => openInquiry(hotel.name)}
                                        className="w-full py-4 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-[10px] rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                                    >
                                        Secure Best Price
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Why Book With Us Deep Dive */}
            <Section className="bg-royal-gold/5 py-20 mb-20 border-y border-royal-gold/10">
                <div className="max-w-5xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-serif text-white mb-6">Why Book Through Our Concierge?</h2>
                    <p className="text-gray-400">Avoid the hidden costs of direct booking. We are local, we are here, and we guarantee the best Mewari experience.</p>
                </div>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="flex gap-6">
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-royal-gold/10 flex items-center justify-center text-royal-gold">
                            <HeartHandshake className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif text-white mb-2">Unbeatable Local Rates</h4>
                            <p className="text-gray-400 text-sm">We have exclusive contracts with hotels that are not available on other sites or even for direct walk-ins.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-royal-gold/10 flex items-center justify-center text-royal-gold">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h4 className="text-xl font-serif text-white mb-2">24/7 Ground Support</h4>
                            <p className="text-gray-400 text-sm">If you face any issue at the hotel, our local team is just 10 minutes away to resolve it for you personally.</p>
                        </div>
                    </div>
                </div>
            </Section>

            <QuickInquiryModal 
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                entityName={selectedHotel}
                category="Hotel Stay"
            />

            <div className="pb-16 text-center">
                <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif italic">
                    * {t.common.disclaimer}
                </p>
            </div>
        </div>
    );
};

export default StaysPage;
