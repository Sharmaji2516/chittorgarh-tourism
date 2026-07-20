import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center w-full bg-heritage-charcoal">
            {/* Image Section — explicit width/height prevents CLS */}
            <div className="w-full h-[50vh] md:h-[75vh] relative overflow-hidden">
                <motion.img
                    // Responsive srcset: mobile gets 600px image (~55 KB), desktop gets full 1200px
                    src="/Fort.webp"
                    srcSet="/Fort-mobile.webp 600w, /Fort.webp 1200w"
                    sizes="(max-width: 768px) 100vw, 100vw"
                    alt="Chittorgarh Fort — India's Largest Fort in Rajasthan"
                    fetchPriority="high"
                    decoding="sync"
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-heritage-charcoal/50"></div>
            </div>

            {/* Content Section below image */}
            <div className="max-w-5xl mx-auto py-12 px-6 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-royal-gold text-sm md:text-base uppercase tracking-[0.3em] mb-4 font-serif"
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-6 font-serif tracking-tight"
                >
                    {t.hero.title}
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-24 h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mb-8"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-base md:text-lg text-gray-200 max-w-3xl mx-auto font-light leading-relaxed"
                >
                    {t.hero.desc}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-base md:text-lg text-royal-gold max-w-3xl mx-auto font-medium leading-relaxed mt-4"
                >
                    {t.hero.foodMessage}
                </motion.p>
            </div>
        </div>
    );
};

export default Hero;
