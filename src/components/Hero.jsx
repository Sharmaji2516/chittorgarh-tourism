import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Compass, MessageCircle, Award, ShieldCheck, Star, Users } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20would%20like%20to%20plan%20a%20tour%20to%20Chittorgarh%20Fort.%20Please%20share%20details.";

const Hero = () => {
    const { t } = useLanguage();

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    return (
        <header className="relative w-full bg-[#F8F5EF] overflow-hidden">
            {/* Visual Hero Banner */}
            <div className="relative w-full min-h-[92vh] sm:min-h-[90vh] flex items-center justify-center">
                {/* Background Image with Warm Heritage Vignette */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/Fort.webp"
                        srcSet="/Fort-mobile.webp 600w, /Fort.webp 1200w"
                        sizes="100vw"
                        alt="Chittorgarh Fort — UNESCO World Heritage Site in Rajasthan, India"
                        fetchPriority="high"
                        decoding="sync"
                        width={1200}
                        height={675}
                        className="w-full h-full object-cover object-center scale-105"
                    />
                    {/* Multi-stage warm heritage gradient overlay: ivory base to preserve photography while ensuring high contrast readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/95 via-[#25231F]/50 to-[#25231F]/35"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#25231F]/25 to-[#25231F]/80"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:py-36 text-center text-white">
                    {/* Heritage Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] mb-4 sm:mb-6 shadow-sm"
                    >
                        <Award className="w-3.5 h-3.5 text-[#DFBA5A] shrink-0" />
                        <span className="truncate">UNESCO World Heritage Site • Rajasthan</span>
                    </motion.div>

                    {/* Main H1 Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight leading-[1.1] mb-3 sm:mb-6 drop-shadow-lg"
                    >
                        Visit Chittorgarh
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-base xs:text-lg sm:text-2xl font-serif italic text-[#DFBA5A] mb-3 sm:mb-6 max-w-3xl mx-auto drop-shadow-sm"
                    >
                        The Citadel of Valor, Sacrifice & Eternal Glory
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-xs xs:text-sm sm:text-base md:text-lg text-white/90 max-w-2xl mx-auto font-light leading-relaxed mb-6 sm:mb-10 drop-shadow-sm"
                    >
                        Experience India's largest fort with authorized Mewari historians, curated heritage stays, sanitized private taxi transfers & genuine local hospitality.
                    </motion.p>

                    {/* Prominent WhatsApp CTA: Touch-friendly on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md mx-auto"
                    >
                        <a
                            href={VERIFIED_WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('hero_wa_btn')}
                            className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 border border-emerald-400/30 min-h-[48px]"
                        >
                            <MessageCircle className="w-5 h-5 fill-white/20" />
                            <span>Inquire on WhatsApp Tour Desk</span>
                        </a>
                    </motion.div>

                    {/* Trust Indicators Bar: Compact glassmorphic pill on mobile */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-8 sm:mt-12 p-3 sm:p-5 rounded-2xl sm:rounded-3xl bg-black/40 backdrop-blur-md border border-white/15 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 text-center max-w-3xl mx-auto"
                    >
                        <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/5">
                            <span className="font-serif text-lg sm:text-2xl font-bold text-[#DFBA5A]">700+</span>
                            <span className="text-[9px] sm:text-[11px] text-white/80 uppercase tracking-wider">Acres Citadel</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/5">
                            <span className="font-serif text-lg sm:text-2xl font-bold text-[#DFBA5A]">100%</span>
                            <span className="text-[9px] sm:text-[11px] text-white/80 uppercase tracking-wider">Govt. Guides</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/5">
                            <span className="font-serif text-lg sm:text-2xl font-bold text-[#DFBA5A]">24/7</span>
                            <span className="text-[9px] sm:text-[11px] text-white/80 uppercase tracking-wider">Ground Support</span>
                        </div>
                        <div className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl bg-white/5">
                            <span className="font-serif text-lg sm:text-2xl font-bold text-[#DFBA5A]">4.9★</span>
                            <span className="text-[9px] sm:text-[11px] text-white/80 uppercase tracking-wider">Traveler Rating</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
