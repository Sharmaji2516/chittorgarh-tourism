import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const { t } = useLanguage();
    const [videoLoaded, setVideoLoaded] = useState(false);

    // Fallback image if video fails or while loading
    const bgImage = "https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/city/banners/desk/Chittorgarh-Fort-banner.png";
    // Cinematic Cloud/Fort Footage (Placeholder)
    const videoUrl = "https://cdn.pixabay.com/video/2023/04/13/158782-817454247_large.mp4";

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedData={() => setVideoLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                {/* Fallback Image Layer (Visible until video loads) */}
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoLoaded ? 'opacity-0' : 'opacity-100'}`}
                    style={{ backgroundImage: `url('${bgImage}')` }}
                ></div>

                {/* Cinematic Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-royal-black"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-12 md:w-24 bg-royal-gold/60"></div>
                        <span className="text-royal-gold font-serif tracking-[0.3em] text-sm md:text-base uppercase shadow-black drop-shadow-lg">
                            {t.hero.subtitle || "The Citadel of Valor & Sacrifice"}
                        </span>
                        <div className="h-[1px] w-12 md:w-24 bg-royal-gold/60"></div>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-royal-white mb-8 tracking-tight drop-shadow-2xl">
                        <span className="block mb-2">{t.hero.title}</span>
                    </h1>

                    <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-md">
                        {t.hero.desc}
                    </p>

                    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                        <a
                            href="#history"
                            className="group relative px-8 py-4 bg-royal-gold/10 backdrop-blur-sm border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-300 rounded-sm uppercase tracking-widest font-serif text-sm overflow-hidden"
                        >
                            <span className="relative z-10">Start The Journey</span>
                            <div className="absolute inset-0 bg-royal-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 origin-left ease-out"></div>
                        </a>

                        {/* Watch Video Button (Mock) */}
                        <button className="flex items-center gap-3 text-royal-white/80 hover:text-royal-gold transition-colors group">
                            <PlayCircle className="w-10 h-10 font-thin group-hover:scale-110 transition-transform" />
                            <span className="text-sm tracking-widest uppercase font-light">Watch Trailer</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-royal-white/50 z-10"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase">Explore</span>
                    <ChevronDown className="w-6 h-6" />
                </div>
            </motion.div>
        </div>
    );
};

export default Hero;
