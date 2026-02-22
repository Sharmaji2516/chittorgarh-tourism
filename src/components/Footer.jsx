import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-royal-black text-royal-white/60 py-12 border-t border-royal-gold/20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-royal-pattern opacity-5 pointer-events-none"></div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="mb-8 flex justify-center items-center gap-4">
                    <span className="h-px w-16 bg-royal-gold/40"></span>
                    <span className="text-2xl text-royal-gold font-serif">❦</span>
                    <span className="h-px w-16 bg-royal-gold/40"></span>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-sm mb-12">
                    <div>
                        <h4 className="text-royal-gold uppercase tracking-widest mb-4 text-xs font-bold">Explore</h4>
                        <ul className="space-y-2">
                            <li><a href="/#history" className="hover:text-royal-gold transition-colors">{t.nav.history}</a></li>
                            <li><a href="/#attractions" className="hover:text-royal-gold transition-colors">{t.nav.attractions}</a></li>
                            <li><NavLink to="/gallery" className="hover:text-royal-gold transition-colors">{t.nav.gallery}</NavLink></li>
                            <li><NavLink to="/flavors" className="hover:text-royal-gold transition-colors">{t.nav.vendors}</NavLink></li>
                            <li><NavLink to="/local-for-vocal" className="hover:text-royal-gold transition-colors">{t.nav.localVocal}</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-royal-gold uppercase tracking-widest mb-4 text-xs font-bold">Contact</h4>
                        <p className="mb-2">Chittorgarh Tourism Board</p>
                        <p>info@visit-chittorgarh.com</p>
                    </div>
                    <div>
                        <h4 className="text-royal-gold uppercase tracking-widest mb-4 text-xs font-bold">Connect</h4>
                        <div className="flex justify-center gap-6">
                            <a href="https://www.linkedin.com/in/lav-sharma-a9919b2ab/" target="_blank" rel="noopener noreferrer" className="hover:text-royal-gold transition-colors text-xs">LinkedIn</a>
                            <a href="mailto:Lavsharma.it25@gmail.com" className="hover:text-royal-gold transition-colors text-xs">Gmail</a>
                        </div>
                    </div>
                </div>

                <p className="text-xs tracking-wider uppercase opacity-50 mb-4">
                    {t.footer.copyright}
                </p>

                <div className="border-t border-royal-gold/10 pt-6 flex flex-col items-center gap-6">
                    <p className="text-sm font-serif italic text-royal-gold/80 flex items-center gap-2">
                        <span>Developed & Maintained by</span>
                        <span className="font-bold not-italic bg-gradient-to-r from-royal-gold to-orange-400 bg-clip-text text-transparent">Lav & Kush Sharma</span>
                    </p>
                    <button
                        onClick={() => {
                            localStorage.removeItem('ctt_visited');
                            window.dispatchEvent(new Event('resetVisitStatus'));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="text-[10px] uppercase tracking-[0.2em] text-royal-gold/40 hover:text-royal-gold transition-colors border border-royal-gold/10 px-4 py-2 rounded-full hover:bg-royal-gold/5"
                    >
                        Reset Visit Status
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
