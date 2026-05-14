import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';
import VendorCard from '../components/VendorCard';

const LocalVocalPage = ({ t, filteredLocalVocal, searchQuery }) => {
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
                            <VendorCard vendor={item} />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredLocalVocal.length > 0 && (
                    <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif mt-20 text-center italic">
                        * {t.common.disclaimer}
                    </p>
                )}
            </div>
        </div>
    );
};

export default LocalVocalPage;
