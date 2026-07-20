import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const VisitModal = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        const checkVisit = (immediate = false) => {
            const visited = localStorage.getItem('ctt_visited');
            if (!visited) {
                if (immediate) {
                    setShow(true);
                } else {
                    timer = setTimeout(() => setShow(true), 3500);
                }
            }
        };

        checkVisit(false);

        const handleReset = () => checkVisit(true);

        // Listen for reset events from Footer
        window.addEventListener('resetVisitStatus', handleReset);
        return () => {
            if (timer) clearTimeout(timer);
            window.removeEventListener('resetVisitStatus', handleReset);
        };
    }, []);

    const handleVisit = (type) => {
        localStorage.setItem('ctt_visited', type);
        setShow(false);
        if (type === 'tourist') {
            navigate('/how-to-reach');
        }
    };

    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="bg-royal-black border-2 border-royal-gold/30 p-8 md:p-12 rounded-3xl max-w-xl w-full shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden text-center"
                >
                    {/* Royal Background Ornament */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-royal-gold to-transparent"></div>

                    <div className="mb-8">
                        <div className="text-5xl md:text-6xl mb-6">🚩</div>
                        <h2 className="text-3xl md:text-4xl font-serif text-royal-gold mb-4 tracking-wider uppercase">
                            Padharo Mhare Desh
                        </h2>
                        <div className="h-0.5 w-20 bg-royal-gold/40 mx-auto mb-6"></div>
                        <p className="text-royal-white/90 text-lg md:text-xl font-serif italic leading-relaxed">
                            "Welcome to the Land of Bravery and Sacrifice.<br />
                            Have you explored the legends of Chittorgarh before?"
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleVisit('local')}
                            className="group relative px-6 py-4 bg-transparent border border-royal-gold/30 rounded-xl overflow-hidden hover:border-royal-gold transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-royal-gold/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="relative text-royal-gold font-bold tracking-widest uppercase text-sm">
                                Yes, I have visited
                            </span>
                        </button>

                        <button
                            onClick={() => handleVisit('tourist')}
                            className="group relative px-6 py-4 bg-royal-gold rounded-xl overflow-hidden hover:bg-royal-gold-light transition-all duration-500"
                        >
                            <span className="relative text-royal-black font-bold tracking-widest uppercase text-sm">
                                No, I'm planning a visit
                            </span>
                        </button>
                    </div>

                    <p className="mt-8 text-royal-gold/40 text-[10px] uppercase tracking-[0.3em]">
                        Chittorgarh Tourism • Eternal Heritage
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VisitModal;
