import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, X, ArrowRight } from 'lucide-react';
import VendorCard from '../components/VendorCard';

const LocalVocalPage = ({ t, filteredLocalVocal, searchQuery }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />

            <div className="pt-32 pb-16 text-center px-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-white font-black italic mb-6 tracking-tighter uppercase drop-shadow-2xl">
                        {t.localVocal.title}
                    </h1>
                    
                    {!searchQuery && (
                        <>
                            <p className="max-w-2xl mx-auto text-royal-gold font-light italic text-lg md:text-xl mb-8">
                                "{t.localVocal.subtitle}"
                            </p>
                            
                            {t.localVocal.desc && (
                                <div className="max-w-4xl mx-auto bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-10 border border-white/10 shadow-2xl mb-16">
                                    <div className="flex justify-center mb-6">
                                        <HeartHandshake className="w-12 h-12 text-royal-gold opacity-80" />
                                    </div>
                                    <p className="text-royal-white/80 text-sm md:text-base leading-relaxed text-justify md:text-center font-light">
                                        {t.localVocal.desc}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 pb-20 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredLocalVocal.map((item, idx) => (
                        <motion.div
                            key={`local-vocal-${item.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * idx }}
                        >
                            <VendorCard 
                                vendor={item} 
                                onClick={() => {
                                    setSelectedVendor(item);
                                    setIsModalOpen(true);
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredLocalVocal.length > 0 && (
                    <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif mt-20 text-center italic">
                        * {t.common.disclaimer}
                    </p>
                )}
            </div>

            {/* Custom Inquiry Modal */}
            <AnimatePresence>
                {isModalOpen && selectedVendor && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-heritage-charcoal border border-white/10 rounded-[2rem] p-8 shadow-2xl z-20"
                        >
                            <button 
                                onClick={() => setIsModalOpen(false)} 
                                className="absolute top-6 right-6 text-white/40 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <h3 className="text-2xl font-serif text-white mb-2">{selectedVendor.name}</h3>
                            <p className="text-royal-gold text-xs uppercase tracking-widest mb-6">Inquire for Best Price</p>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Your Name</label>
                                    <input 
                                        type="text" 
                                        value={userName} 
                                        onChange={(e) => setUserName(e.target.value)} 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-royal-gold"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={userPhone} 
                                        onChange={(e) => setUserPhone(e.target.value)} 
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-royal-gold"
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                
                                <button 
                                    onClick={() => {
                                        const phoneNumber = "917597451057";
                                        const message = selectedVendor.id === 4 
                                            ? `Mewari Special Achar Inquiry\n\nHello! I am interested in ordering the Mewari Special Achar.\n\nMy Name: ${userName}\nMy Phone: ${userPhone}\n\nPlease provide me with the price and delivery details. Thanks!`
                                            : `Hello! I am interested in inquiring about ${selectedVendor.name}.\n\nMy Name: ${userName}\nMy Phone: ${userPhone}`;
                                        
                                        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                                        setIsModalOpen(false);
                                    }}
                                    disabled={!userName || !userPhone}
                                    className="w-full py-4 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Inquire Now via WhatsApp
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocalVocalPage;
