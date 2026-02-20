import React, { useState } from 'react';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AttractionCard = ({ attraction }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = attraction.images || (attraction.image ? [attraction.image] : []);

    const nextImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="glass-card rounded-2xl overflow-hidden group"
        >
            <div className="relative h-64 overflow-hidden group/image">
                <img
                    src={images.length > 0 ? images[currentImageIndex] : 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={attraction.name}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                        console.error("Image failed to load:", images[currentImageIndex]);
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/80"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/80"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                            {images.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-royal-gold' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                <div className="absolute bottom-0 left-0 p-6 w-full pointer-events-none">
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
