import React, { useRef, useEffect } from 'react';
import { X, MapPin, Calendar, Train, Bus, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import MapPreview from './MapPreview';

const AttractionModal = ({ attraction, onClose }) => {
    const modalRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (attraction) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [attraction, onClose]);

    if (!attraction) return null;

    const images = attraction.images || (attraction.image ? [attraction.image] : []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
                <motion.div
                    ref={modalRef}
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="bg-royal-black border border-royal-gold/30 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative scrollbar-hide"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close attraction modal"
                        className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-red-500/80 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex flex-col md:flex-row">
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                            <img
                                src={images[0] || 'https://via.placeholder.com/600x400?text=No+Image'}
                                alt={attraction.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-4 inset-x-4 text-center flex flex-col items-center">
                                <h2 className="text-2xl md:text-3xl font-bold text-white font-serif">{attraction.name}</h2>
                                <div className="flex items-center justify-center text-royal-gold mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm font-medium">Chittorgarh Fort</span>
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 space-y-6 text-center">

                            {/* Description */}
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-royal-gold mb-2 font-serif border-b border-royal-gold/20 pb-1 text-center">About</h3>
                                <p className="text-gray-300 leading-relaxed text-sm md:text-base text-center">
                                    {attraction.desc}
                                </p>
                            </div>

                            {/* Best Time to Visit */}
                            {attraction.bestTime && (
                                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-royal-gold/10 text-center space-y-1">
                                    <Calendar className="w-6 h-6 text-royal-gold mb-1" />
                                    <h4 className="text-sm font-bold text-white">Best Time to Visit</h4>
                                    <p className="text-gray-400 text-sm">{attraction.bestTime}</p>
                                </div>
                            )}

                            {/* Distances */}
                            {attraction.distances && (
                                <div>
                                    <h3 className="text-lg font-bold text-royal-gold mb-3 font-serif border-b border-royal-gold/20 pb-1 text-center">How to Reach</h3>
                                    <div className="grid grid-cols-1 gap-2.5 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center justify-center gap-2.5 text-sm text-gray-300">
                                            <Train className="w-4 h-4 text-blue-400 shrink-0" />
                                            <span>
                                                <span className="text-white font-medium">Railway:</span> {attraction.distances.railway}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2.5 text-sm text-gray-300">
                                            <Bus className="w-4 h-4 text-green-400 shrink-0" />
                                            <span>
                                                <span className="text-white font-medium">Bus Stand:</span> {attraction.distances.bus}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2.5 text-sm text-gray-300">
                                            <Plane className="w-4 h-4 text-orange-400 shrink-0" />
                                            <span>
                                                <span className="text-white font-medium">Airport:</span> {attraction.distances.airport}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Map Integration */}
                            {attraction.coordinates && (
                                <MapPreview
                                    coordinates={attraction.coordinates}
                                    name={attraction.name}
                                />
                            )}

                            {/* Wiki Button */}
                            {attraction.wiki && (
                                <a
                                    href={attraction.wiki}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3 mt-4 bg-royal-gold text-royal-black font-bold uppercase tracking-widest rounded-lg hover:bg-white transition-colors"
                                >
                                    Read Full History
                                </a>
                            )}


                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AttractionModal;
