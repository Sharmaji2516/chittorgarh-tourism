import React from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AttractionCard = ({ attraction }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass-card rounded-2xl overflow-hidden group"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={attraction.images ? attraction.images[0] : attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-xl md:text-2xl font-bold text-white font-serif mb-1 group-hover:text-royal-gold transition-colors">{attraction.name}</h3>
                    <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-royal-gold" />
                        <span>Chittorgarh</span>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {attraction.desc}
                </p>

                <button className="flex items-center text-royal-gold text-sm font-bold uppercase tracking-widest hover:text-white transition-colors group/btn">
                    Explore Details
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
};

export default AttractionCard;
