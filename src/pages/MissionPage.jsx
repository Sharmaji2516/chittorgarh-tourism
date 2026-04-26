import React from 'react';
import Section from '../components/Section';
import { ShieldCheck, HeartHandshake, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const MissionPage = ({ t }) => {
    const mission = t.missionPage;

    return (
        <Section id="mission" title={mission.title} className="bg-transparent min-h-[70vh] flex flex-col justify-center py-16">
            <div className="max-w-4xl mx-auto text-center">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-royal-gold text-lg md:text-xl font-serif italic mb-8"
                >
                    "{mission.subtitle}"
                </motion.p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-heritage-charcoal/80 backdrop-blur-md p-8 rounded-2xl border border-royal-gold/20 hover:border-royal-gold/40 transition-all shadow-lg"
                    >
                        <HeartHandshake className="w-12 h-12 text-royal-gold mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">Local For Vocal</h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {mission.desc1}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-heritage-charcoal/80 backdrop-blur-md p-8 rounded-2xl border border-royal-gold/20 hover:border-royal-gold/40 transition-all shadow-lg"
                    >
                        <ShieldCheck className="w-12 h-12 text-royal-gold mb-6" />
                        <h3 className="text-2xl font-serif text-white mb-4">24/7 Support</h3>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                            {mission.desc2}
                        </p>
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

export default MissionPage;
