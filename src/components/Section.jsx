import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, title, children, className = "" }) => {
    return (
        <section id={id} className={`py-12 md:py-20 relative overflow-hidden ${className}`}>
            {/* Container */}
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* Section Title with Decorative Elements */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-4 mb-4"
                    >
                        <span className="block h-px w-20 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-50"></span>
                        <motion.div
                            animate={{ rotate: 135 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="w-2 h-2 rotate-45 bg-royal-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        ></motion.div>
                        <span className="block h-px w-20 bg-gradient-to-r from-transparent via-royal-gold to-transparent opacity-50"></span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-3xl md:text-5xl font-serif text-royal-gold font-bold tracking-widest uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
                    >
                        {title}
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "6rem" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto mt-6"
                    />
                </div>

                {/* Content */}
                <div className="relative">
                    {/* Corner Ornaments for Content Area (Optional, nice touch) */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-royal-gold/30"></div>
                    <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-royal-gold/30"></div>
                    <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-royal-gold/30"></div>
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-royal-gold/30"></div>

                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
