import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Hotel, ArrowRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Section from '../components/Section';
import AttractionCard from '../components/AttractionCard';
import Timeline from '../components/Timeline';
import InteractiveMap from '../components/InteractiveMap';
import ItinerarySection from '../components/ItinerarySection';

const HomePage = ({ t, filteredAttractions, setSelectedAttraction, searchQuery }) => {
    const location = useLocation();

    React.useEffect(() => {
        if (location.hash) {
            const id = location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }, [location.hash]);

    return (
        <>
            <Hero />
            {!searchQuery && (
                <>
                    <Section id="history" title={t.history.title} className="bg-transparent">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-4xl mx-auto text-center"
                        >
                            <p className="text-lg md:text-xl text-white leading-relaxed font-light mb-8 font-serif">
                                {t.history.text}
                            </p>
                            <div className="flex items-center justify-center gap-6">
                                <a
                                    href={t.history.wikiLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block border-b border-royal-gold text-royal-gold pb-1 hover:text-royal-white hover:border-royal-white transition-all text-sm tracking-widest uppercase"
                                >
                                    {t.history.readMore}
                                </a>
                                <NavLink
                                    to="/gallery"
                                    className="inline-block border border-royal-gold/20 px-4 py-2 text-royal-gold/80 hover:text-royal-gold hover:border-royal-gold transition-all text-[10px] tracking-widest uppercase rounded-full bg-royal-gold/5"
                                >
                                    Photo Gallery
                                </NavLink>
                            </div>
                        </motion.div>
                    </Section>
                    <Timeline />
                </>
            )}

            {filteredAttractions.length > 0 && (
                <Section id="attractions" title={t.attractions.title} className="bg-black/40 md:bg-black/20 md:backdrop-blur-md border-y border-royal-gold/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {filteredAttractions.map(item => (
                                <AttractionCard
                                    key={`attr-${item.id}`}
                                    attraction={item}
                                    onExplore={setSelectedAttraction}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                    <div className="mt-12 text-center">
                        <NavLink
                            to="/gallery"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-royal-gold/30 text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all font-bold uppercase tracking-[0.2em] text-sm"
                        >
                            View Comprehensive Gallery
                            <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </div>
                </Section>
            )}

            {!searchQuery && (
                <Section id="gallery-preview" title={t.nav.gallery} className="bg-transparent pb-0">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[
                                "/assets/images/chittorgarh-fort-new.jpg",
                                "/assets/images/vijay-stambh-new.jpg",
                                "/assets/images/padmini-palace-new.jpg",
                                "/assets/images/sanwariya-temple-new.jpg"
                            ].map((img, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="aspect-square rounded-xl overflow-hidden glass-card border-royal-gold/10"
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </motion.div>
                            ))}
                        </div>
                        <div className="text-center">
                            <NavLink
                                to="/gallery"
                                className="group inline-flex items-center gap-3 text-royal-gold font-serif text-xl md:text-2xl hover:text-white transition-colors"
                            >
                                <span className="border-b border-royal-gold/30 group-hover:border-white transition-colors pb-1">
                                    {t.nav.gallery} - {t.history.readMore}
                                </span>
                                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                            </NavLink>
                        </div>
                    </div>
                </Section>
            )}

            {!searchQuery && (
                <>
                    <InteractiveMap />
                    <ItinerarySection content={t} />

                    {/* Discovery CTAs */}
                    <Section id="discover" title={t.discover?.title || "Explore Chittorgarh"} className="bg-transparent pb-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {/* Cuisine CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <NavLink
                                    to="/flavors"
                                    className="group relative block overflow-hidden rounded-2xl glass-card border-royal-gold/20 hover:border-royal-gold/50 transition-all duration-500"
                                >
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={t.discover?.cuisine?.image || "https://images.unsplash.com/photo-1589187151003-0dd55769239b?q=80&w=800&auto=format&fit=crop"}
                                            alt="Cuisine"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    </div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="mb-4 w-12 h-12 rounded-full bg-royal-gold/20 flex items-center justify-center border border-royal-gold/30 group-hover:bg-royal-gold/40 transition-colors">
                                            <UtensilsCrossed className="w-6 h-6 text-royal-gold" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white font-bold mb-2 group-hover:text-royal-gold transition-colors">
                                            {t.discover?.cuisine?.title}
                                        </h3>
                                        <p className="text-white mb-6 line-clamp-2">
                                            {t.discover?.cuisine?.desc}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <span className="inline-flex items-center gap-2 text-royal-gold font-bold uppercase tracking-widest text-sm">
                                                {t.discover?.cuisine?.link}
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                            </span>
                                            <NavLink
                                                to="/gallery"
                                                className="text-royal-white/40 hover:text-royal-gold transition-colors text-[10px] uppercase tracking-[0.2em] border-b border-transparent hover:border-royal-gold"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                Food Gallery
                                            </NavLink>
                                        </div>
                                    </div>
                                </NavLink>
                            </motion.div>

                            {/* Stays CTA */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <NavLink
                                    to="/stays"
                                    className="group relative block overflow-hidden rounded-2xl glass-card border-royal-gold/20 hover:border-royal-gold/50 transition-all duration-500"
                                >
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src={t.discover?.stays?.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop"}
                                            alt="Stays"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    </div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="mb-4 w-12 h-12 rounded-full bg-royal-gold/20 flex items-center justify-center border border-royal-gold/30 group-hover:bg-royal-gold/40 transition-colors">
                                            <Hotel className="w-6 h-6 text-royal-gold" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white font-bold mb-2 group-hover:text-royal-gold transition-colors">
                                            {t.discover?.stays?.title}
                                        </h3>
                                        <p className="text-white mb-6 line-clamp-2">
                                            {t.discover?.stays?.desc}
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-royal-gold font-bold uppercase tracking-widest text-sm">
                                            {t.discover?.stays?.link}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                        </span>
                                    </div>
                                </NavLink>
                            </motion.div>
                            {/* Gallery CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="md:col-span-2"
                            >
                                <NavLink
                                    to="/gallery"
                                    className="group relative block overflow-hidden rounded-2xl glass-card border-royal-gold/20 hover:border-royal-gold/50 transition-all duration-500"
                                >
                                    <div className="aspect-[16/9] overflow-hidden">
                                        <img
                                            src="/assets/images/chittorgarh-fort-new.jpg"
                                            alt="Gallery"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    </div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="mb-4 w-12 h-12 rounded-full bg-royal-gold/20 flex items-center justify-center border border-royal-gold/30 group-hover:bg-royal-gold/40 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-royal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white font-bold mb-2 group-hover:text-royal-gold transition-colors">
                                            {t.nav.gallery}
                                        </h3>
                                        <p className="text-white mb-6 line-clamp-2">
                                            Explore the visual majesty of Chittorgarh.
                                        </p>
                                        <span className="inline-flex items-center gap-2 text-royal-gold font-bold uppercase tracking-widest text-sm">
                                            View All Photos
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                        </span>
                                    </div>
                                </NavLink>
                            </motion.div>
                        </div>
                    </Section>
                </>
            )}
        </>
    );
};

export default HomePage;
