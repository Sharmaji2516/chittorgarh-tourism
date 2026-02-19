import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Hotel, Star, MapPin, ExternalLink, Train, Bus, Plane } from 'lucide-react';

const HotelCard = ({ hotel }) => {
    const { t } = useLanguage();
    const ratingValue = parseFloat(hotel.rating);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="glass-card flex flex-col p-6 rounded-3xl border border-royal-gold/10 hover:border-royal-gold/40 transition-colors duration-500 group relative overflow-hidden h-full"
        >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Hotel className="w-16 h-16 text-royal-gold" />
            </div>

            <div className="relative mb-6">
                <h3 className="text-xl font-serif font-bold text-royal-gold mb-2 group-hover:text-royal-gold-light transition-colors duration-300">
                    {hotel.name}
                </h3>
                <div className="flex items-center gap-1 text-royal-gold text-xs">
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(ratingValue) ? 'fill-royal-gold text-royal-gold' : 'text-royal-gold/30'}`}
                            />
                        ))}
                    </div>
                    <span className="text-royal-white/40 ml-1">({hotel.rating})</span>
                </div>
            </div>

            <p className="text-royal-white/60 text-sm leading-relaxed mb-6 flex-grow font-light line-clamp-3 italic">
                "{hotel.desc}"
            </p>

            {hotel.distances && (
                <div className="space-y-2 mb-6 border-y border-royal-gold/10 py-4 text-[10px] uppercase tracking-wider text-royal-white/40">
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-1.5">
                            <Train className="w-3 h-3 text-royal-gold/40" />
                            <span>{t.common.railway}</span>
                        </div>
                        <span className="text-royal-gold-light">{hotel.distances.railway}</span>
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-1.5">
                            <Bus className="w-3 h-3 text-royal-gold/40" />
                            <span>{t.common.bus}</span>
                        </div>
                        <span className="text-royal-gold-light">{hotel.distances.bus}</span>
                    </div>
                </div>
            )}

            <motion.a
                href={hotel.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full text-center py-3 rounded-xl bg-royal-gold text-royal-black font-bold text-xs uppercase tracking-[0.2em] shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:shadow-[0_8px_25px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
                {t.common.bookNow}
            </motion.a>
        </motion.div>
    );
};

export default HotelCard;
