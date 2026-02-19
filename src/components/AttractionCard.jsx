import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Plane, Train, Bus, ArrowRight } from 'lucide-react';

const AttractionCard = ({ attraction }) => {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={window.innerWidth > 768 ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
            whileInView={window.innerWidth > 768 ? { opacity: 1, scale: 1 } : {}}
            viewport={{ once: true }}
            whileHover={window.innerWidth > 768 ? { y: -5 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card group relative overflow-hidden rounded-3xl border border-royal-gold/10 hover:border-royal-gold/40 transition-colors duration-500"
        >
            {/* Image/Pattern Area */}
            <div className="h-56 relative overflow-hidden">
                <div className="absolute inset-0 bg-royal-pattern opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                        className="text-royal-gold/10 text-9xl font-serif pointer-events-none hidden md:block"
                    >
                        ❋
                    </motion.span>
                    <span className="text-royal-gold/10 text-9xl font-serif pointer-events-none md:hidden">❋</span>
                </div>

                <div className="absolute bottom-4 left-6">
                    <h3 className="text-2xl font-serif font-bold text-royal-gold group-hover:text-royal-gold-light transition-colors duration-300 drop-shadow-md">
                        {attraction.name}
                    </h3>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <p className="text-royal-white/60 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                    {attraction.desc}
                </p>

                <div className="space-y-3 mb-6">
                    {attraction.bestTime && (
                        <div className="flex items-center gap-2 text-xs text-royal-gold-light/80">
                            <Calendar className="w-3.5 h-3.5" />
                            <span className="uppercase tracking-wider font-semibold">{t.common.bestTime}:</span>
                            <span className="text-royal-white/80">{attraction.bestTime}</span>
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-4 border-t border-royal-gold/10 text-[10px] text-royal-white/40 uppercase tracking-[0.15em]">
                        <div className="flex items-center gap-1.5 bg-royal-gold/5 px-2 py-1 rounded">
                            <Train className="w-3 h-3 text-royal-gold/60" />
                            <span>{attraction.distances?.railway || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-royal-gold/5 px-2 py-1 rounded">
                            <Bus className="w-3 h-3 text-royal-gold/60" />
                            <span>{attraction.distances?.bus || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <motion.a
                    href={attraction.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-[0.2em] group/btn hover:text-royal-gold-light transition-colors"
                >
                    <span>{t.common.readMore}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </motion.a>
            </div>

            {/* Decorative Gold Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-full border-t border-r border-royal-gold/20 rounded-tr-3xl group-hover:border-royal-gold transition-colors duration-500"></div>
            </div>
        </motion.div>
    );
};

export default AttractionCard;
