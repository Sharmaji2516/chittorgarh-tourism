import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Wind, Shield, Sunrise, Mountain, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';

const HomePage = ({ t, searchQuery }) => {
    // Data for the 4 major categories
    const categories = [
        {
            id: 1,
            title: t.pillars.fort.title,
            subtitle: t.pillars.fort.subtitle,
            desc: t.pillars.fort.desc,
            image: "/assets/images/Chittorgarh Fort.webp",
            icon: Shield,
            link: "/attractions/fort",
            color: "from-royal-gold to-orange-500"
        },
        {
            id: 2,
            title: t.pillars.nature.title,
            subtitle: t.pillars.nature.subtitle,
            desc: t.pillars.nature.desc,
            image: "/assets/images/Bassi Wildlife.jpg",
            icon: Wind,
            link: "/attractions/nature",
            color: "from-green-600 to-teal-500"
        },
        {
            id: 3,
            title: t.pillars.spiritual.title,
            subtitle: t.pillars.spiritual.subtitle,
            desc: t.pillars.spiritual.desc,
            image: "/assets/images/Sanvliya-ji-Temple.jpg",
            icon: Sunrise,
            link: "/attractions/spiritual",
            color: "from-blue-600 to-purple-500"
        },
        {
            id: 15,
            title: t.pillars.scenic.title,
            subtitle: t.pillars.scenic.subtitle,
            desc: t.pillars.scenic.desc,
            image: "/assets/images/menal-waterfall-new.jpg",
            icon: Mountain,
            link: "/attractions/scenic",
            color: "from-amber-600 to-red-500"
        }
    ];

    return (
        <div className="overflow-x-hidden min-h-screen bg-heritage-charcoal">
            <Hero />
            
            {/* Strategy Selection: Dual Path */}
            <Section id="strategy" className="bg-transparent py-12 md:py-20 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
                    {/* Path 1: Packages */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-royal-gold/10 backdrop-blur-2xl p-10 rounded-[3rem] border border-royal-gold/20 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-16 h-16 bg-royal-gold rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                                <Shield className="w-8 h-8 text-royal-black" />
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-4">The Royal Expedition</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">Planning from outside Chittorgarh? Let us curate your entire journey from Arrival to Departure. Includes Stay, Transport, Guide & Dining.</p>
                        </div>
                        <NavLink to="/royal-journeys" className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
                            Explore Packages
                            <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </motion.div>

                    {/* Path 2: On-Demand */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 hover:border-royal-gold/40 transition-all duration-500 shadow-2xl flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                                <Wind className="w-8 h-8 text-royal-gold" />
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-4">Instant On-Demand</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">Already in Chittorgarh? Book individual services like a private taxi for fort visit, a professional guide, or a heritage hotel room.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <NavLink to="/stays" className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-royal-gold hover:text-royal-black transition-all">Stays</NavLink>
                            <NavLink to="/how-to-reach" className="py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-royal-gold hover:text-royal-black transition-all">Transport</NavLink>
                        </div>
                    </motion.div>
                </div>
            </Section>
            
            {!searchQuery && (
                <Section id="explore-categories" title={t.pillars.title} subtitle={t.pillars.subtitle} className="bg-transparent py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative h-[450px] md:h-[550px] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5"
                            >
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-royal-black via-royal-black/40 to-transparent opacity-90"></div>
                                </div>
                                
                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-2xl mb-6 transform group-hover:-translate-y-3 transition-transform duration-500`}>
                                        <cat.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <h4 className="text-royal-gold font-bold tracking-[0.4em] uppercase text-xs mb-3 opacity-80">
                                        {cat.subtitle}
                                    </h4>
                                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 group-hover:text-royal-gold transition-colors duration-500">
                                        {cat.title}
                                    </h3>
                                    <p className="text-white/70 text-base max-w-md leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-6 group-hover:translate-y-0">
                                        {cat.desc}
                                    </p>
                                    
                                    <NavLink
                                        to={cat.link}
                                        className="w-fit flex items-center gap-4 px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-royal-gold hover:text-royal-black hover:border-royal-gold transition-all duration-300 shadow-xl"
                                    >
                                        {t.pillars.button}
                                        <ArrowRight className="w-4 h-4" />
                                    </NavLink>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
};

export default HomePage;
