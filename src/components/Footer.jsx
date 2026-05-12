import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavLink } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    const { t } = useLanguage();
    const [isBenefitsOpen, setIsBenefitsOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

    return (
        <footer className="bg-heritage-charcoal text-royal-white/60 py-16 border-t border-royal-gold/20 relative overflow-hidden">
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }}></div>
            
            {/* Ambient Glows */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-royal-gold/5 blur-[120px] rounded-full"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-royal-gold/5 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                {/* Ornate Divider */}
                <div className="mb-12 flex justify-center items-center gap-6">
                    <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-royal-gold/40"></div>
                    <div className="text-royal-gold text-2xl md:text-3xl filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">❦</div>
                    <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-royal-gold/40"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left mb-16">
                    {/* Explore Section */}
                    <div className="flex flex-col items-center md:items-start group w-full">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-6 text-xs font-black flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.footer.explore}
                        </h4>
                        <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-2xl p-6 w-full max-w-sm hover:border-royal-gold/30 transition-all duration-500 shadow-xl group-hover:shadow-royal-gold/5">
                            <ul className="space-y-3 font-serif italic text-sm">
                                {[
                                    { name: t.nav.history, path: '/#history' },
                                    { name: t.nav.attractions, path: '/attractions' },
                                    { name: t.nav.localRoyalCuisine, path: '/flavors' },
                                    { name: t.nav.hotels, path: '/stays' },
                                    { name: t.nav.localVocal, path: '/vocal-for-local' },
                                    { name: t.nav.missionServices, path: '/mission-services' },
                                    { name: "Terms & Conditions", path: '/terms' }
                                ].map((item) => (
                                    <li key={item.name}>
                                        <NavLink 
                                            to={item.path} 
                                            className="hover:text-royal-gold transition-all duration-300 hover:pl-2 relative block text-royal-white/70 hover:text-white"
                                        >
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Benefits Section */}
                    <div className="flex flex-col items-center md:items-start group">
                        <h4 
                            onClick={() => setIsBenefitsOpen(!isBenefitsOpen)}
                            className="text-royal-gold uppercase tracking-[0.3em] mb-6 text-xs font-black flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.footer.benefitsTitle}
                            <span className={`transform transition-transform duration-300 ${isBenefitsOpen ? 'rotate-180' : 'rotate-0'} text-[10px]`}>▼</span>
                        </h4>
                        <AnimatePresence>
                            {isBenefitsOpen && (
                                <motion.ul 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 overflow-hidden"
                                >
                                    {t.footer.benefitPoints.map((point, index) => (
                                        <li key={index} className="flex gap-3 text-sm leading-relaxed group/item">
                                            <span className="text-royal-gold shrink-0 mt-0.5 opacity-40 group-hover/item:opacity-100 transition-opacity">✦</span>
                                            <span className="text-royal-white/50 group-hover/item:text-royal-white/80 transition-colors">{point}</span>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col items-center md:items-start w-full">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-6 text-xs font-black flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.footer.contact}
                        </h4>
                        <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-2xl p-6 w-full max-w-sm hover:border-royal-gold/30 transition-all duration-500 shadow-xl">
                            <div className="space-y-4">
                                <a href="tel:+917597451057" className="group flex items-center gap-3 hover:text-royal-gold transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-royal-gold/5 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-all">
                                        <span className="text-[10px]">📞</span>
                                    </div>
                                    <span className="text-sm font-medium tracking-wider">+91 7597451057</span>
                                </a>
                                
                                <a href="https://wa.me/917597451057?text=Hello!%20I%20want%20to%20know%20more%20about%20Chittorgarh%20Tourism%20services." target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 hover:text-royal-gold transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-royal-gold/5 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-all">
                                        <span className="text-[10px]">💬</span>
                                    </div>
                                    <span className="text-sm font-medium tracking-wider">WhatsApp Us</span>
                                </a>

                                <a href="mailto:visitchittorgarh@gmail.com?subject=Inquiry%20from%20Chittorgarh%20Tourism%20Website&body=Hello,%20I%20am%20interested%20in%20your%20services." className="group flex items-center gap-3 hover:text-royal-gold transition-all">
                                    <div className="w-8 h-8 rounded-lg bg-royal-gold/5 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-all">
                                        <span className="text-[10px]">✉️</span>
                                    </div>
                                    <span className="text-sm font-medium tracking-wider lowercase">visitchittorgarh@gmail.com</span>
                                </a>

                                {/* Feedback Section */}
                                {window.location.hostname === 'localhost' && (
                                    <div className="pt-2 border-t border-royal-gold/10">
                                        <button
                                            onClick={() => setIsFeedbackOpen(!isFeedbackOpen)}
                                            className="w-full py-2.5 rounded-xl bg-royal-black/40 border border-royal-gold/10 hover:border-royal-gold/40 hover:text-royal-gold transition-all text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                                        >
                                            {isFeedbackOpen ? "Close Feedback" : "Share Suggestion & Feedback"}
                                        </button>
                                        <AnimatePresence>
                                            {isFeedbackOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="w-full mt-4 overflow-hidden"
                                                >
                                                    <FeedbackForm />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>



                {/* Bottom Bar */}
                {/* Bottom Bar - ChittorTech Branding */}
                <div className="border-t border-royal-gold/10 pt-16 flex flex-col items-center gap-10">
                    <div className="flex flex-col items-center gap-8 bg-royal-black/20 p-8 rounded-[2rem] border border-royal-gold/5 backdrop-blur-md max-w-sm w-full mx-auto shadow-2xl">
                        {/* Product Badge */}
                        <div className="flex items-center gap-4 bg-royal-black/40 px-6 py-4 rounded-full border border-royal-gold/20 shadow-inner group transition-all duration-500 hover:border-royal-gold/50">
                            <div className="w-14 h-14 bg-white rounded-2xl p-2 shadow-lg transform group-hover:scale-105 transition-transform">
                                <img src="/chittortech_logo.png" alt="ChittorTech" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-royal-white/40 uppercase tracking-[0.2em] font-bold">A Product Of</span>
                                <span className="text-2xl text-royal-white font-black tracking-tight -mt-1 italic">ChittorTech</span>
                            </div>
                        </div>

                        {/* Recognition Badges */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider group-hover:text-emerald-300 transition-colors">Recognized by iStart Rajasthan</span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider group-hover:text-emerald-300 transition-colors">Registered MSME | Startup India</span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full border-t border-dashed border-royal-white/10"></div>

                        {/* Contact & Copyright */}
                        <div className="flex flex-col items-center gap-6 w-full">
                            <a href="mailto:visitchittorgarh@gmail.com" className="group flex items-center gap-4 hover:text-royal-gold transition-all duration-300">
                                <div className="w-10 h-10 rounded-xl bg-royal-gold/5 border border-royal-gold/10 flex items-center justify-center group-hover:border-royal-gold/40 transition-all">
                                    <span className="text-lg">✉️</span>
                                </div>
                                <span className="text-sm font-bold tracking-widest text-royal-white/70 group-hover:text-royal-white lowercase">visitchittorgarh@gmail.com</span>
                            </a>

                            <p className="text-[10px] text-royal-white/40 uppercase tracking-[0.2em] font-bold text-center">
                                © 2026 CHITTORTECH ALL RIGHTS RESERVED
                            </p>
                        </div>
                    </div>

                    {/* Reset Status Button */}
                    <button
                        onClick={() => {
                            localStorage.removeItem('ctt_visited');
                            window.dispatchEvent(new Event('resetVisitStatus'));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group relative px-8 py-2.5 overflow-hidden rounded-full border border-royal-gold/5 hover:border-royal-gold/20 transition-all duration-700"
                    >
                        <span className="relative z-10 text-[9px] uppercase tracking-[0.5em] text-royal-gold/20 group-hover:text-royal-gold/60 transition-colors">
                            {t.footer.resetStatus}
                        </span>
                        <div className="absolute inset-0 bg-royal-gold/2 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
