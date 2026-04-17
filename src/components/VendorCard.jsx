import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Utensils, MapPin, ExternalLink, Train, Bus, Palette, ShoppingBag, Star, MessageSquare } from 'lucide-react';
import ReviewModal from './ReviewModal';
import DirectionsButton from './DirectionsButton';
import { getAverageRating, getReviewCount } from '../utils/ReviewSystem';

const VendorCard = ({ vendor }) => {
    const { t } = useLanguage();
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [stats, setStats] = useState({
        avg: 0,
        count: 0
    });

    // Card-unique identifier for reviews
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

                    <div className="flex flex-col items-center mb-6 group/rating relative">
                        <div className="flex items-center gap-1.5 text-royal-gold">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className={`w-3.5 h-3.5 ${s <= Math.round(stats.avg) ? 'fill-royal-gold' : 'opacity-20'}`} />
                                ))}
                            </div>
                            <span className="text-sm font-bold bg-royal-gold/10 px-2 rounded-md">{stats.avg}</span>
                            {stats.count > 0 && (
                                <span className="text-[10px] text-royal-white/40">({stats.count} reviews)</span>
                            )}
                        </div>
                        <button
                            onClick={() => setIsReviewOpen(true)}
                            className="mt-2 text-[10px] text-royal-gold/60 uppercase tracking-widest hover:text-royal-gold underline decoration-dotted underline-offset-4"
                        >
                            Rate & Review
                        </button>
                    </div>

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

                    <DirectionsButton 
                        destination={`${vendor.name}, ${vendor.location}, Rajasthan, India`}
                        destinationName={vendor.name}
                        className="text-royal-gold hover:text-royal-white"
                    />
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
