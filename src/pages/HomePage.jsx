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
            title: "The Grand Citadel",
            subtitle: "Chittorgarh Fort",
            desc: "The largest fort in India, standing as a testament to Rajputana valor and sacrifice.",
            image: "/assets/images/Chittorgarh Fort.webp",
            icon: Shield,
            link: "/attractions/fort",
            color: "from-royal-gold to-orange-500"
        },
        {
            id: 2,
            title: "Nature & Wilderness",
            subtitle: "Bassi Wildlife Sanctuary",
            desc: "A serene haven for nature lovers and wildlife enthusiasts amidst the Aravalli hills.",
            image: "/assets/images/Bassi Wildlife.jpg",
            icon: Wind,
            link: "/attractions/nature",
            color: "from-green-600 to-teal-500"
        },
        {
            id: 3,
            title: "Spiritual Serenity",
            subtitle: "Sanwariaji Temple",
            desc: "Experience divine peace at this magnificent temple dedicated to Lord Krishna.",
            image: "/assets/images/Sanvliya-ji-Temple.jpg",
            icon: Sunrise,
            link: "/attractions/spiritual",
            color: "from-blue-600 to-purple-500"
        },
        {
            id: 15,
            title: "Scenic Landscapes",
            subtitle: "Menal Waterfall & Temple",
            desc: "Known as the Mini Khajuraho, featuring a breathtaking waterfall and ancient temples.",
            image: "/assets/images/menal-waterfall-new.jpg",
            icon: Mountain,
            link: "/attractions/scenic",
            color: "from-amber-600 to-red-500"
        }
    ];

    return (
        <div className="overflow-x-hidden min-h-screen bg-heritage-charcoal">
            <Hero />
            
            {!searchQuery && (
                <Section id="explore-categories" title="Explore Chittorgarh" subtitle="Four Pillars of Mewar Tourism" className="bg-transparent py-20">
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
                                        Explore This Pillar
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
