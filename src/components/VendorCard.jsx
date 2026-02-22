import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Utensils, MapPin, ExternalLink, Train, Bus, Plane, Palette, ShoppingBag, Star } from 'lucide-react';

const VendorCard = ({ vendor }) => {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={typeof window !== 'undefined' && window.innerWidth > 768 ? { opacity: 0, scale: 0.95 } : { opacity: 1, scale: 1 }}
            whileInView={typeof window !== 'undefined' && window.innerWidth > 768 ? { opacity: 1, scale: 1 } : {}}
            viewport={{ once: true }}
            whileHover={typeof window !== 'undefined' && window.innerWidth > 768 ? { y: -5 } : {}}
            className="glass-card flex flex-col p-6 rounded-3xl border border-royal-gold/10 hover:border-royal-gold/40 transition-colors duration-500 group relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-royal-gold/20 to-transparent"></div>

            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl border border-royal-gold/20 flex items-center justify-center mb-6 bg-royal-gold/5 group-hover:border-royal-gold transition-colors duration-500">
                    {vendor.type === 'artise' ? (
                        <Palette className="w-8 h-8 text-royal-gold" />
                    ) : vendor.type === 'vendor' ? (
                        <ShoppingBag className="w-8 h-8 text-royal-gold" />
                    ) : (
                        <Utensils className="w-8 h-8 text-royal-gold" />
                    )}
                </div>

                <h3 className="text-xl font-serif font-bold text-royal-white mb-2 group-hover:text-royal-gold transition-colors duration-300">
                    {vendor.name}
                </h3>

                <span className="px-4 py-1 bg-royal-gold/5 text-royal-gold text-[10px] uppercase tracking-[0.2em] rounded-full mb-4 border border-royal-gold/10 font-bold">
                    {vendor.specialty}
                </span>

                {vendor.rating && (
                    <div className="flex flex-col items-center mb-6 group/rating relative">
                        <div className="flex items-center gap-1 text-royal-gold">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-bold">{vendor.rating}</span>
                        </div>
                        <div className="opacity-0 group-hover/rating:opacity-100 transition-opacity absolute -bottom-8 bg-black/90 text-[8px] text-royal-gold px-2 py-1 rounded border border-royal-gold/20 whitespace-nowrap z-50">
                            {t.common.disclaimer}
                        </div>
                    </div>
                )}

                <p className="text-royal-white/60 text-sm leading-relaxed mb-6 italic font-light line-clamp-2">
                    "{vendor.desc}"
                </p>
            </div>

            {vendor.distances && (
                <div className="space-y-2 mb-6 border-y border-royal-gold/10 py-4 text-[10px] uppercase tracking-wider text-royal-white/40">
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-1.5">
                            <Train className="w-3 h-3 text-royal-gold/40" />
                            <span>{t.common.railway}</span>
                        </div>
                        <span className="text-royal-gold-light">{vendor.distances.railway}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-1.5">
                            <Bus className="w-3 h-3 text-royal-gold/40" />
                            <span>{t.common.bus}</span>
                        </div>
                        <span className="text-royal-gold-light">{vendor.distances.bus}</span>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between pt-2 mt-auto">
                <div className="flex items-center gap-1.5 text-royal-white/40 text-[10px] uppercase tracking-tighter truncate max-w-[120px]">
                    <MapPin className="w-3 h-3 text-royal-gold" />
                    <span className="truncate">{vendor.location}</span>
                </div>

                <motion.a
                    href={vendor.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-1.5 text-royal-gold text-[10px] font-bold uppercase tracking-widest hover:text-royal-gold-light transition-colors"
                >
                    <span>{t.common.viewMap}</span>
                    <ExternalLink className="w-3 h-3" />
                </motion.a>
            </div>
        </motion.div>
    );
};

export default VendorCard;
