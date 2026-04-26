import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavLink } from 'react-router-dom';
import FeedbackForm from './FeedbackForm';

const Footer = () => {
    const { t } = useLanguage();

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
                    {/* Explore Section */}
                    <div className="flex flex-col items-center md:items-start group">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-6 text-xs font-black flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.footer.explore}
                        </h4>
                        <ul className="space-y-4 font-serif italic text-sm">
                            {[
                                { name: t.nav.history, path: '/#history' },
                                { name: t.nav.attractions, path: '/attractions' },
                                { name: t.nav.gallery, path: '/gallery' },
                                { name: t.nav.vendors, path: '/flavors' },
                                { name: t.nav.hotels, path: '/stays' },
                                { name: t.nav.localVocal, path: '/local-for-vocal' },
                                { name: t.nav.mission, path: '/mission' },
                                { name: t.nav.services, path: '/services' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <NavLink 
                                        to={item.path} 
                                        className="hover:text-royal-gold transition-all duration-300 hover:pl-2 relative block"
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-6 text-xs font-black flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.footer.contact}
                        </h4>
                        <div className="space-y-4">
                            <a href="tel:+917597901057" className="group flex items-center gap-3 hover:text-royal-gold transition-all">
                                <div className="w-8 h-8 rounded-lg bg-royal-gold/5 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-all">
                                    <span className="text-[10px]">📞</span>
                                </div>
                                <span className="text-sm font-medium tracking-wider">+91 7597901057</span>
                            </a>
                            <a href="mailto:chittortech@gmail.com" className="group flex items-center gap-3 hover:text-royal-gold transition-all">
                                <div className="w-8 h-8 rounded-lg bg-royal-gold/5 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-all">
                                    <span className="text-[10px]">✉️</span>
                                </div>
                                <span className="text-sm font-medium tracking-wider lowercase">chittortech@gmail.com</span>
                            </a>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-6 text-xs font-black flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.footer.connect}
                        </h4>
                        <div className="flex gap-4">
                            <a 
                                href="https://wa.me/917597901057" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="px-6 py-2.5 rounded-xl bg-royal-black/40 border border-royal-gold/10 hover:border-royal-gold/40 hover:text-royal-gold transition-all text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                            >
                                WhatsApp
                            </a>
                            <a 
                                href="mailto:chittortech@gmail.com" 
                                className="px-6 py-2.5 rounded-xl bg-royal-black/40 border border-royal-gold/10 hover:border-royal-gold/40 hover:text-royal-gold transition-all text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                            >
                                Email
                            </a>
                        </div>
                    </div>
                </div>

                {window.location.hostname === 'localhost' && <div className="mb-16"><FeedbackForm /></div>}

                {/* Bottom Bar */}
                <div className="border-t border-royal-gold/10 pt-16 flex flex-col items-center gap-12">
                    

                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-[10px] md:text-xs text-royal-gold/50 uppercase tracking-[0.4em] font-bold text-center leading-relaxed">
                                {t.footer.copyright}
                            </p>
                            <p className="text-[9px] text-royal-gold/30 uppercase tracking-[0.2em] font-medium">
                                Chittaurgarh, Rajasthan, India • Since 2026
                            </p>
                        </div>
                        
                        <button
                            onClick={() => {
                                localStorage.removeItem('ctt_visited');
                                window.dispatchEvent(new Event('resetVisitStatus'));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group relative px-6 py-2 overflow-hidden rounded-full border border-royal-gold/10 hover:border-royal-gold/30 transition-all duration-500"
                        >
                            <span className="relative z-10 text-[9px] uppercase tracking-[0.5em] text-royal-gold/40 group-hover:text-royal-gold transition-colors">
                                {t.footer.resetStatus}
                            </span>
                            <div className="absolute inset-0 bg-royal-gold/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
