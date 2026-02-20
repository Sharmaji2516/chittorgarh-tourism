import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';

const Timeline = () => {
    const { lang } = useLanguage();
    const safeLang = content[lang] ? lang : 'en';
    const t = content[safeLang];

    // Fallback if timeline data isn't in localized content yet
    const timelineData = t.timeline || content.en.timeline || [];

    return (
        <section className="py-20 bg-royal-black relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-0 w-full h-full bg-royal-pattern opacity-5 pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-royal-gold font-serif text-lg tracking-widest uppercase mb-2 block">Chronicles of Valor</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-royal-white">
                        Timeless <span className="text-royal-gold">Saga</span>
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Central Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-royal-gold to-transparent opacity-50"></div>

                    {timelineData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`flex flex-col md:flex-row items-center justify-between mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Empty side for spacing */}
                            <div className="hidden md:block w-5/12"></div>

                            {/* Center Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-royal-gold border-4 border-royal-black shadow-[0_0_15px_rgba(255,215,0,0.5)] z-10"></div>

                            {/* Content Card */}
                            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-center md:text-left' : 'text-center md:text-right'}`}>
                                <div className="glass-card p-6 rounded-xl border border-royal-gold/10 hover:border-royal-gold/40 transition-all duration-300 group">
                                    <span className="text-4xl font-serif text-royal-gold/20 font-bold absolute -top-4 -right-4 select-none group-hover:text-royal-gold/40 transition-colors">
                                        {item.year}
                                    </span>
                                    <h3 className="text-xl font-bold text-royal-gold mb-2 font-serif">{item.title}</h3>
                                    <span className="inline-block px-3 py-1 bg-royal-gold/10 rounded-full text-xs text-royal-gold mb-3 md:hidden">
                                        {item.year}
                                    </span>
                                    <p className="text-royal-white/80 font-light text-sm leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Timeline;
