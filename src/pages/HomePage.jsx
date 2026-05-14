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
            image: "/assets/images/fort_generated.png",
            icon: Shield,
            link: "/attractions/fort",
            color: "from-royal-gold to-orange-500"
        },
        {
            id: 2,
            title: t.pillars.nature.title,
            subtitle: t.pillars.nature.subtitle,
            desc: t.pillars.nature.desc,
            image: "/assets/images/nature_generated.png",
            icon: Wind,
            link: "/attractions/nature",
            color: "from-green-600 to-teal-500"
        },
        {
            id: 3,
            title: t.pillars.spiritual.title,
            subtitle: t.pillars.spiritual.subtitle,
            desc: t.pillars.spiritual.desc,
            image: "/assets/images/temple_generated.png",
            icon: Sunrise,
            link: "/attractions/spiritual",
            color: "from-blue-600 to-purple-500"
        },
        {
            id: 15,
            title: t.pillars.scenic.title,
            subtitle: t.pillars.scenic.subtitle,
            desc: t.pillars.scenic.desc,
            image: "/assets/images/waterfall_generated.png",
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
                        <div className="flex-1 flex flex-col">
                            <div>
                                <div className="w-16 h-16 bg-royal-gold rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                                    <Shield className="w-8 h-8 text-royal-black" />
                                </div>
                                <h2 className="text-3xl font-serif text-white mb-4">The Royal Expedition</h2>
                                <p className="text-gray-400 mb-6 leading-relaxed">Planning from outside Chittorgarh? Let us curate your entire journey from Arrival to Departure. Includes Stay, Transport, Guide & Dining.</p>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-around my-4">
                                {t.packages.items.map((pkg) => (
                                    <div key={pkg.id} className="flex items-center gap-4 md:gap-6 bg-white/5 p-3 md:p-4 rounded-xl hover:bg-white/10 transition-all border border-white/5 hover:border-royal-gold/20">
                                        {/* Image: Hidden on mobile, shown on desktop */}
                                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 hidden md:block">
                                            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-white font-medium text-sm md:text-base">{pkg.name}</h3>
                                                <span className="text-royal-gold text-xs md:text-sm font-bold">{pkg.duration}</span>
                                            </div>
                                            {/* Description: Hidden on mobile, shown on desktop */}
                                            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2 hidden md:block leading-relaxed">{pkg.desc}</p>
                                            
                                            {/* Includes: Hidden on mobile, shown on desktop */}
                                            <div className="hidden md:flex flex-wrap gap-2 mt-2 md:mt-3">
                                                {pkg.includes.map((inc, index) => (
                                                    <span key={index} className="text-[10px] md:text-xs text-white/50 bg-white/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">{inc}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Taxi */}
                            <NavLink to="/service/taxi" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Private Taxi.jpg" alt="Taxi" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Private Taxi</h3>
                                        <p className="text-gray-400 text-xs mt-1">Book a premium cab for your local visits.</p>
                                    </div>
                                </motion.div>
                            </NavLink>
                            
                            {/* Guide */}
                            <NavLink to="/service/guide" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Guide.jpg" alt="Guide" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Expert Guide</h3>
                                        <p className="text-gray-400 text-xs mt-1">Unlock the secrets of the fort with a local historian.</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Hotel */}
                            <NavLink to="/service/hotel" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Royal Stays.jpg" alt="Hotel" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Heritage Stay</h3>
                                        <p className="text-gray-400 text-xs mt-1">Experience royal comfort in curated hotels.</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Restaurant */}
                            <NavLink to="/service/restaurant" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Dinning Hall.jpg" alt="Restaurant" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Fine Dining</h3>
                                        <p className="text-gray-400 text-xs mt-1">Savor the best of Mewari and global cuisine.</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Cafe */}
                            <NavLink to="/service/cafe" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Cafe.jpg" alt="Cafe" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Cozy Cafes</h3>
                                        <p className="text-gray-400 text-xs mt-1">Relax at the best hangout spots with views.</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Photographer */}
                            <NavLink to="/service/photographer" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Photography.jpg" alt="Photographer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Photographer</h3>
                                        <p className="text-gray-400 text-xs mt-1">Capture your memories with professional shoots.</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Horse Photo */}
                            <NavLink to="/service/horse-photo" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Horse Photography.jpg" alt="Horse Photo" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Horse Photography</h3>
                                        <p className="text-gray-400 text-xs mt-1">Get majestic photos on horseback at the fort.</p>
                                    </div>
                                </motion.div>
                            </NavLink>
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
                                className="group flex flex-col bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 hover:border-royal-gold/30 transition-all duration-500 hover:scale-[1.02] h-full"
                            >
                                {/* Image Section */}
                                <div className="h-[250px] md:h-[300px] overflow-hidden relative">
                                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-royal-black/60 to-transparent"></div>
                                </div>
                                
                                {/* Content Section (Box below image) */}
                                <div className="p-8 flex flex-col flex-grow justify-between bg-white/[0.02]">
                                    <div>
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-500`}>
                                            <cat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-royal-gold font-bold tracking-[0.2em] uppercase text-xs mb-2 opacity-80">
                                            {cat.subtitle}
                                        </h4>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors duration-500">
                                            {cat.title}
                                        </h3>
                                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                                            {cat.desc}
                                        </p>
                                    </div>
                                    
                                    <NavLink
                                        to={cat.link}
                                        className="w-fit flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-royal-gold hover:text-royal-black hover:border-royal-gold transition-all duration-300 shadow-md"
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

            {/* Testimonials Section */}
            <Section id="testimonials" className="bg-transparent py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-4 text-xs font-black">Testimonials</h4>
                        <h2 className="text-3xl md:text-4xl font-serif text-white filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                            What Our Guests Say
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-2xl p-6 hover:border-royal-gold/30 transition-all duration-500">
                            <div className="flex text-royal-gold mb-4">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                                "Amazing experience! The guide was very knowledgeable and the taxi was clean and comfortable."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-royal-gold to-amber-500 rounded-full flex items-center justify-center text-royal-black font-bold">
                                    R
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-bold">Rahul S.</h4>
                                    <p className="text-gray-500 text-xs">Verified Traveler</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-2xl p-6 hover:border-royal-gold/30 transition-all duration-500">
                            <div className="flex text-royal-gold mb-4">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                                "Best service in Chittorgarh. Highly recommended for family trips. The team is very supportive."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-royal-gold to-amber-500 rounded-full flex items-center justify-center text-royal-black font-bold">
                                    P
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-bold">Priya M.</h4>
                                    <p className="text-gray-500 text-xs">Verified Traveler</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-2xl p-6 hover:border-royal-gold/30 transition-all duration-500">
                            <div className="flex text-royal-gold mb-4">
                                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                            </div>
                            <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                                "Smooth and reliable. The driver was very polite and knew all the short routes and best food spots."
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-royal-gold to-amber-500 rounded-full flex items-center justify-center text-royal-black font-bold">
                                    A
                                </div>
                                <div>
                                    <h4 className="text-white text-sm font-bold">Amit K.</h4>
                                    <p className="text-gray-500 text-xs">Verified Traveler</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* About Us Section */}
            <Section id="about-us" className="bg-transparent py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-3xl p-8 md:p-12 shadow-xl hover:border-royal-gold/30 transition-all duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-4 text-xs font-black flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                                    About Us
                                </h4>
                                <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                                    Local Experts serving in Chittorgarh
                                </h2>
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed font-serif italic">
                                    "Founded on 1st May, we are proud locals dedicated to serving you in the historic land of Chittorgarh, Rajasthan."
                                </p>
                                <p className="text-white/70 text-sm leading-relaxed mb-6">
                                    We bring you the true essence of Chittorgarh. With deep local roots, we ensure that your visit to the land of valor and sacrifice is comfortable, authentic, and unforgettable.
                                </p>
                                <div className="flex items-center gap-4 text-emerald-400 text-sm font-bold">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                    <span>Serving since 1st May</span>
                                </div>
                            </div>
                            <div className="rounded-2xl overflow-hidden border border-royal-gold/20 shadow-2xl h-64 md:h-80">
                                <img src="/assets/images/fort_generated.png" alt="About Us" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default HomePage;
