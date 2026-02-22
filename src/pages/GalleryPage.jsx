import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';
import Section from '../components/Section';
import { content } from '../data/content';

const GalleryPage = ({ t }) => {
    const [activeTab, setActiveTab] = useState('All');

    // Aggregate images from all languages for attractions, and from the English dishes section for food
    const allGalleryData = useMemo(() => {
        const seenNormalized = new Set();
        const images = [];

        const addImage = (img, categoryKey, categoryLabel, itemName) => {
            const trimmed = img.trim();
            let normalized = trimmed.toLowerCase();
            if (!normalized.startsWith('/') && !normalized.startsWith('http')) {
                normalized = '/' + normalized;
            }
            if (!seenNormalized.has(normalized)) {
                seenNormalized.add(normalized);
                images.push({ url: trimmed, id: `${categoryKey}-${normalized}`, categoryKey, categoryLabel, title: itemName });
            }
        };

        // Attractions — aggregate from all languages for full coverage
        Object.values(content).forEach(langContent => {
            if (langContent.attractions && langContent.attractions.items) {
                langContent.attractions.items.forEach(item => {
                    const imgs = item.images || (item.image ? [item.image] : []);
                    imgs.forEach(img => addImage(img, 'attractions', t.attractions.title, item.name));
                });
            }
        });

        // Food dishes — only from English (canonical source, no hotel/cafe names)
        if (content.en.dishes && content.en.dishes.items) {
            content.en.dishes.items.forEach(dish => {
                const imgs = dish.images || (dish.image ? [dish.image] : []);
                imgs.forEach(img => addImage(img, 'dishes', 'Royal Cuisine', dish.name));
            });
        }

        // Artisans section removed from Gallery per user request

        return images;
    }, [t]);

    const categories = [
        { key: 'All', label: 'All' },
        { key: 'attractions', label: t.attractions.title },
        { key: 'dishes', label: 'Royal Cuisine' },
    ];

    const filteredImages = useMemo(() => {
        if (activeTab === 'All') return allGalleryData;
        return allGalleryData.filter(img => img.categoryKey === activeTab);
    }, [activeTab, allGalleryData]);

    return (
        <div className="min-h-screen pt-20 pb-16">
            <Section id="gallery-header" className="py-0">
                <div className="text-center mb-6 md:mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-6xl font-serif text-white mb-2 md:mb-4"
                    >
                        {t.nav.gallery}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-royal-gold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm"
                    >
                        Explore by topic
                    </motion.p>
                </div>

                {/* Filter Tabs — horizontally scrollable on mobile */}
                <div className="flex overflow-x-auto gap-3 pb-2 mb-6 md:mb-10 justify-start md:justify-center scrollbar-none px-1">
                    {categories.map((cat) => (
                        <button
                            key={cat.key}
                            onClick={() => setActiveTab(cat.key)}
                            className={cn(
                                "flex-shrink-0 px-5 py-2 rounded-full border transition-all duration-300 text-xs md:text-sm tracking-widest uppercase whitespace-nowrap",
                                activeTab === cat.key
                                    ? "bg-royal-gold text-royal-black border-royal-gold font-bold shadow-lg shadow-royal-gold/20"
                                    : "bg-transparent text-royal-gold/60 border-royal-gold/20 hover:border-royal-gold/40 hover:text-royal-gold"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </Section>

            <Section
                id="gallery-grid"
                className="bg-transparent py-0"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto px-3 md:px-4">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="relative group overflow-hidden rounded-xl glass-card border-royal-gold/10 hover:border-royal-gold/40 transition-all duration-500 shadow-xl"
                            >
                                <div className="relative overflow-hidden min-h-[180px]">
                                    <img
                                        src={image.url}
                                        alt={image.categoryKey === 'dishes' ? image.title : ""}
                                        className="w-full h-auto object-contain block transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                        onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.parentElement.style.display = 'none'; }}
                                    />
                                    {/* On mobile: always show dish name. On desktop: show on hover only */}
                                    {image.categoryKey === 'dishes' && (
                                        <>
                                            {/* Mobile: permanent label */}
                                            <div className="md:hidden absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent px-3 py-3 flex flex-col justify-end">
                                                <h3 className="text-white font-serif text-xs leading-tight">{image.title}</h3>
                                            </div>
                                            {/* Desktop: hover label */}
                                            <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-col justify-end p-6">
                                                <span className="text-royal-gold text-[10px] uppercase tracking-[0.3em] mb-1 font-bold">{image.categoryLabel}</span>
                                                <h3 className="text-white font-serif text-lg leading-tight">{image.title}</h3>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {filteredImages.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-royal-white/40 font-serif italic">No pictures found in this category.</p>
                    </div>
                )}
            </Section>
        </div>
    );
};

export default GalleryPage;
