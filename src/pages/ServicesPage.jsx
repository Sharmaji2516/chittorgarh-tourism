import React from 'react';
import Section from '../components/Section';
import { Car, Map, Hotel, UtensilsCrossed, ChevronRight, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const ServicesPage = ({ t }) => {
    const services = t.servicesPage;

    const getIcon = (iconName) => {
        switch (iconName) {
            case 'taxi': return <Car className="w-8 h-8" />;
            case 'guide': return <Map className="w-8 h-8" />;
            case 'hotel': return <Hotel className="w-8 h-8" />;
            case 'restaurant': return <UtensilsCrossed className="w-8 h-8" />;
            case 'coffee': return <Coffee className="w-8 h-8" />;
            default: return <ChevronRight className="w-8 h-8" />;
        }
    };

    return (
        <Section id="services" title={services.title} className="bg-transparent min-h-[70vh] flex flex-col justify-center py-16">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <p className="text-royal-gold text-lg md:text-xl font-serif italic mb-6">
                        "{services.subtitle}"
                    </p>
                    <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        {services.desc}
                    </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.items.map((item, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group bg-heritage-charcoal/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-royal-gold/30 hover:bg-royal-gold/5 transition-all duration-500 shadow-2xl relative overflow-hidden"
                        >
                            {/* Glow Effect */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-royal-gold/10 blur-[60px] rounded-full group-hover:bg-royal-gold/20 transition-colors duration-500"></div>
                            
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-inner">
                                    {getIcon(item.icon)}
                                </div>
                                <h3 className="text-xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 text-center"
                >
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-royal-gold/10 border border-royal-gold/20 text-royal-gold shadow-2xl backdrop-blur-md">
                        <span className="w-2 h-2 bg-royal-gold rounded-full animate-ping"></span>
                        <span className="text-sm font-bold uppercase tracking-[0.2em]">24/7 Royal Assistance Available</span>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
};

export default ServicesPage;
