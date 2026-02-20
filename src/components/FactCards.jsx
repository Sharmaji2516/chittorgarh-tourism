import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';

const FactCards = () => {
    const { lang } = useLanguage();
    const safeLang = content[lang] ? lang : 'en';
    const t = content[safeLang];

    const facts = t.facts || content.en.facts || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % facts.length);
        }, 5000); // Rotate every 5 seconds
        return () => clearInterval(timer);
    }, [facts.length]);

    if (facts.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 z-40 hidden md:block">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="glass-card w-72 p-5 rounded-xl border-l-4 border-l-royal-gold shadow-2xl bg-black/80 backdrop-blur-md"
                >
                    <div className="flex items-start gap-3 mb-2">
                        <div className="p-1.5 bg-royal-gold/20 rounded-full">
                            <Lightbulb className="w-4 h-4 text-royal-gold" />
                        </div>
                        <h4 className="text-royal-gold font-serif text-sm font-bold uppercase tracking-wider mt-0.5">Did You Know?</h4>
                    </div>

                    <p className="text-royal-white/90 text-sm font-light leading-relaxed pl-2 border-l border-white/10 italic">
                        "{facts[currentIndex]}"
                    </p>

                    <div className="flex justify-between items-center mt-3">
                        <div className="flex gap-1">
                            {facts.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-royal-gold' : 'w-1 bg-white/20'}`}
                                ></div>
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev + 1) % facts.length)}
                            className="text-white/40 hover:text-royal-gold transition-colors"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default FactCards;
