import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { content } from '../data/content';
import { useLanguage } from '../context/LanguageContext';

const Gallery = () => {
    const { lang } = useLanguage(); // Fixed: destructure 'lang' not 'language'

    // Safety check: ensure content exists for the current language, fallback to 'en'
    const safeLanguage = content[lang] ? lang : 'en';
    const localizedContent = content[safeLanguage];

    // If English content is missing (catastrophic failure), return null
    if (!content.en || !content.en.attractions) return null;

    // Using English content for images as they are common
    const images = content.en.attractions.items.map(item => {
        // Find localized version of the item
        const localItem = localizedContent?.attractions?.items?.find(i => i.id === item.id);

        return {
            id: item.id,
            src: item.image,
            alt: localItem?.name || item.name,
            caption: localItem?.name || item.name
        };
    }).filter(img => img.src);

    const [selectedImage, setSelectedImage] = useState(null);

    if (images.length === 0) return null;

    return (
        <section id="gallery" className="py-20 relative bg-royal-black/90">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-royal-pattern opacity-5 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <span className="text-royal-gold font-serif text-lg tracking-widest uppercase mb-2 block">Visual Journey</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-royal-white mb-4">
                        Captured <span className="text-royal-gold">Heritage</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto"></div>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={image.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden cursor-pointer border border-royal-gold/20 hover:border-royal-gold/50 transition-colors shadow-2xl bg-royal-black"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                                <span className="text-royal-white font-serif tracking-in-expand font-medium">
                                    {image.caption}
                                </span>
                                <ZoomIn className="w-5 h-5 text-royal-gold" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close Button */}
                        <button
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <motion.img
                            key={selectedImage.id}
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-royal-gold/20"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-8 left-0 right-0 text-center"
                        >
                            <h3 className="text-royal-gold font-serif text-2xl">{selectedImage.caption}</h3>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
