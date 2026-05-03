import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Utensils, MapPin, Palette, ShoppingBag, Star, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import ReviewModal from './ReviewModal';
import { getAverageRating, getReviewCount } from '../utils/ReviewSystem';

const VendorCard = ({ vendor, onClick }) => {
    const { t } = useLanguage();
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [stats, setStats] = useState({
        avg: 0,
        count: 0
    });

    const entityId = `vendor-${vendor.id}`;

    const updateStats = async () => {
        const avg = await getAverageRating(entityId);
        const count = await getReviewCount(entityId);
        setStats({ avg, count });
    };

    useEffect(() => {
        updateStats();
    }, [entityId]);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="glass-card flex flex-col p-6 rounded-3xl border border-royal-gold/10 hover:border-royal-gold/40 transition-all duration-500 group relative overflow-hidden h-full"
            >
                {/* Trust Badge Top Right */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-royal-gold/10 rounded-lg border border-royal-gold/20 backdrop-blur-sm z-10">
                    <ShieldCheck className="w-3 h-3 text-royal-gold" />
                    <span className="text-[8px] font-black text-royal-gold uppercase tracking-widest">Verified</span>
                </div>

                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-2xl border border-royal-gold/20 flex items-center justify-center mb-6 bg-royal-gold/5 group-hover:border-royal-gold transition-colors duration-500 relative">
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

                    <div className="flex flex-col items-center mb-6">
                        <div className="flex items-center gap-1.5 text-royal-gold">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(stats.avg) ? 'fill-royal-gold' : 'opacity-20'}`} />
                                ))}
                            </div>
                            <span className="text-sm font-bold bg-royal-gold/10 px-2 rounded-md">{stats.avg}</span>
                        </div>
                    </div>

                    <p className="text-royal-white/60 text-sm leading-relaxed mb-6 italic font-light line-clamp-2">
                        "{vendor.desc}"
                    </p>
                </div>

                <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="w-3 h-3 text-royal-gold animate-pulse" />
                        <span className="text-[9px] font-black text-royal-gold/80 uppercase tracking-widest">{t.common.bestPrice}</span>
                    </div>
                    
                    <button
                        onClick={onClick}
                        className="w-full py-4 rounded-xl bg-royal-gold text-royal-black font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        Secure Best Price
                        <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-1.5 text-royal-white/40 text-[10px] uppercase tracking-tighter truncate">
                            <MapPin className="w-3 h-3 text-royal-gold" />
                            <span className="truncate">{vendor.location}</span>
                        </div>
                        <button
                            onClick={() => setIsReviewOpen(true)}
                            className="text-[10px] text-royal-gold/60 uppercase tracking-widest hover:text-royal-gold underline decoration-dotted underline-offset-4"
                        >
                            Reviews
                        </button>
                    </div>
                </div>
            </motion.div>

            <ReviewModal
                isOpen={isReviewOpen}
                onClose={() => setIsReviewOpen(false)}
                entityId={entityId}
                entityName={vendor.name}
                onSystemUpdate={updateStats}
            />
        </>
    );
};

export default VendorCard;
