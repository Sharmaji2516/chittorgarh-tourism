import React, { useState } from 'react';
import { MapPin, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AttractionCard = ({ attraction, onExplore }) => {
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
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl overflow-hidden border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all duration-300 group flex flex-col justify-between"
        >
            <div>
                <div className="relative h-60 overflow-hidden group/image bg-[#EFE7D9]">
                    <img
                        src={images.length > 0 ? images[currentImageIndex] : 'https://via.placeholder.com/400x300?text=No+Image'}
                        srcSet={images.length > 0 && images[currentImageIndex].includes('.webp') ? `${images[currentImageIndex].replace('.webp', '-mobile.webp')} 400w, ${images[currentImageIndex]} 800w` : undefined}
                        sizes="(max-width: 768px) 400px, 800px"
                        alt={attraction.name}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Error';
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={prevImage}
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/90"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={nextImage}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 text-white rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity hover:bg-black/90"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    <div className="absolute bottom-0 left-0 p-5 w-full pointer-events-none">
                        <h3 className="text-xl font-bold text-white font-serif mb-0.5 drop-shadow-sm group-hover:text-[#DFBA5A] transition-colors">{attraction.name}</h3>
                        <div className="flex items-center text-white/80 text-xs">
                            <MapPin className="w-3 h-3 mr-1 text-[#DFBA5A]" />
                            <span>Chittorgarh Fort</span>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    {attraction.bestTime && (
                        <div className="inline-flex items-center text-[10px] text-[#A65F3D] px-2.5 py-1 bg-[#EFE7D9] rounded-md font-bold uppercase tracking-wider mb-3">
                            <span className="mr-1">🕒</span> {attraction.bestTime.split('(')[0].trim()}
                        </div>
                    )}

                    <p className="text-[#25231F]/70 text-xs leading-relaxed mb-6 line-clamp-3">
                        {attraction.desc}
                    </p>
                </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between">
                <button
                    onClick={() => onExplore && onExplore(attraction)}
                    className="w-full flex items-center justify-center text-[#C49A32] text-xs font-bold uppercase tracking-wider hover:text-white transition-all py-2.5 px-4 border border-[#C49A32]/40 rounded-xl hover:bg-[#C49A32] shadow-sm"
                >
                    Explore Monument Details
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
            </div>
        </motion.div>
    );
};

export default AttractionCard;
