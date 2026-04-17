import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    const bgImageDesktop = "/assets/images/Fort.jpg";
    const bgImageMobile = "/assets/images/Fort.jpg";

    return (
        <div className="relative h-screen min-h-[100dvh] flex items-center justify-center text-center px-4 overflow-hidden">
            {/* Background Layer */}
            <motion.div
                initial={{ scale: 1.15 }}
                animate={{ scale: 1.05 }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                className="hero-main-bg absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105"
                style={{
                    backgroundImage: `url('${bgImageMobile}')`,
                }}
            >
                {/* Desktop Override */}
                <style>{`
                    @media (min-width: 768px) {
                        .hero-main-bg {
                            background-image: url('${bgImageDesktop}') !important;
                        }
                    }
                `}</style>
                <div className="absolute inset-0 bg-heritage-charcoal/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-heritage-charcoal/80 via-transparent to-royal-black"></div>
                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}></div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-royal-gold text-lg md:text-xl uppercase tracking-[0.3em] mb-4 font-serif"
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 font-serif tracking-tight drop-shadow-2xl"
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
                    className="text-lg md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md"
                >
                    {t.hero.desc}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute top-[70%] left-1/2 -translate-x-1/2 cursor-pointer text-white/50 hover:text-royal-gold transition-colors text-center"
                    onClick={() => {
                        const nextSection = document.getElementById('history') || document.getElementById('attractions');
                        if (nextSection) {
                            nextSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-royal-gold">Explore the Legend</span>
                        <div className="w-6 h-10 border-2 border-royal-gold/30 rounded-full flex justify-center p-1 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            <motion.div
                                animate={{ y: [0, 16, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-1.5 h-1.5 bg-royal-gold rounded-full"
                            />
                        </div>
                        <ChevronDown className="w-6 h-6 animate-bounce text-royal-gold" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
