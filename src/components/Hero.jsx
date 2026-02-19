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

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <div className="mb-4 flex justify-center">
                    <span className="h-px w-12 bg-royal-gold inline-block self-center mr-4"></span>
                    <span className="text-royal-gold text-sm uppercase tracking-[0.3em] font-medium">Rajasthan Tourism</span>
                    <span className="h-px w-12 bg-royal-gold inline-block self-center ml-4"></span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-royal-gold mb-6 tracking-wide drop-shadow-xl">
                    {t.hero.title}
                </h1>

                <p className="text-lg md:text-2xl text-royal-white/90 font-light tracking-wide mb-10 max-w-2xl mx-auto leading-relaxed">
                    {t.hero.subtitle}
                </p>

                <a
                    href="#history"
                    className="group inline-block px-8 py-3 border-2 border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-300 font-serif text-lg tracking-wider"
                >
                    {t.hero.cta}
                </a>
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
