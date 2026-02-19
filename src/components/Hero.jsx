import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();

    return (
        <header className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-royal-black/60">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-royal-pattern opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-black/50 to-royal-black"></div>

            {/* Center Border Frame */}
            <div className="absolute inset-8 md:inset-12 border border-royal-gold/20 pointer-events-none"></div>
            <div className="absolute inset-10 md:inset-14 border border-royal-gold/10 pointer-events-none"></div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex justify-center items-center gap-4"
                >
                    <span className="h-px w-8 md:w-12 bg-royal-gold hidden sm:block"></span>
                    <span className="text-royal-gold text-[10px] md:text-sm uppercase tracking-[0.3em] font-medium whitespace-nowrap">{t.hero.title_prefix || "Rajasthan Tourism"}</span>
                    <span className="h-px w-8 md:w-12 bg-royal-gold hidden sm:block"></span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-royal-gold mb-6 tracking-wide drop-shadow-2xl leading-tight"
                >
                    {t.hero.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-2xl text-royal-white/90 font-light tracking-wide mb-10 max-w-2xl mx-auto leading-relaxed italic"
                >
                    {t.hero.subtitle}
                </motion.p>

                <motion.a
                    href="#history"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-block px-8 py-3 bg-royal-gold/10 border-2 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-500 font-serif text-base md:text-lg tracking-[0.2em] uppercase rounded-sm"
                >
                    {t.hero.cta}
                </motion.a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer">
                <span className="text-royal-gold/60 text-xs tracking-widest uppercase">{t.hero.scroll}</span>
                <div className="w-px h-12 bg-gradient-to-b from-royal-gold to-transparent"></div>
            </div>
        </header>
    );
};

export default Hero;
