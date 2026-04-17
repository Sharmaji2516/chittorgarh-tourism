import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Globe } from 'lucide-react';
import { cn } from '../utils/cn';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { language, changeLanguage, t, showLangModal } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.home || 'Home', href: '/' },
        { name: t.nav.attractions || 'Attractions', href: '/attractions' },
        { name: t.nav.gallery || 'Gallery', href: '/gallery' },
        { name: t.nav.vendors, href: '/flavors' },
        { name: t.nav.stays || 'Stays', href: '/stays' },
        { name: t.nav.localVocal || 'Local For Vocal', href: '/local-for-vocal' },
        { name: t.nav.itineraries || 'Itineraries', href: '/itineraries' },
    ];

    const isHome = location.pathname === '/';
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
            (scrolled || !isHome) ? "bg-heritage-charcoal/95 backdrop-blur-xl border-heritage-gold/20 py-2 shadow-2xl" : "bg-transparent py-4"
        )}>
            {/* Scroll Progress Bar */}
            <div
                className="absolute top-0 left-0 h-[2px] bg-royal-gold z-[60] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{ width: `${scrollProgress}%` }}
            ></div>
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <NavLink to="/" className="flex-shrink-0 flex items-center gap-3 group relative">
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-royal-gold via-orange-400 to-royal-gold flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-shadow duration-500 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gplay.png')] opacity-20"></div>
                            <span className="text-white font-serif font-bold text-xl md:text-2xl relative z-10 drop-shadow-md">C</span>
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-white text-base md:text-xl font-bold font-serif tracking-[0.15em] leading-tight">
                                CHITTORGARH
                            </span>
                            <span className="text-royal-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase opacity-80 decoration-royal-gold/30">
                                TOURISM
                            </span>
                        </div>
                    </NavLink>

                    {/* Desktop Menu - Centralized & Spaced */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                        <div className="flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    className={({ isActive }) => cn(
                                        "relative px-4 py-2 text-[11px] font-bold transition-all uppercase tracking-[0.2em] group",
                                        isActive ? "text-royal-gold" : "text-white/70 hover:text-white"
                                    )}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="relative z-10">{link.name}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-underline"
                                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-royal-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300" />
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Actions */}
                    <div className="hidden md:flex items-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                showLangModal();
                            }}
                            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-royal-gold/30 bg-royal-gold/5 text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-300 shadow-lg shadow-black/20 group"
                        >
                            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{language === 'en' ? 'हिन्दी' : 'English'}</span>
                        </motion.button>
                    </div>

                    {/* Mobile Menu Button Container */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-white/5 backdrop-blur-md p-2.5 rounded-xl text-white hover:text-royal-gold hover:bg-white/10 transition-all border border-white/10 group active:scale-95"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) => cn(
                                        "block px-3 py-2 rounded-md text-base font-medium",
                                        isActive ? "text-royal-gold bg-white/5" : "text-gray-300 hover:text-royal-gold hover:bg-white/5"
                                    )}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                            <div className="px-3 py-2 flex flex-col gap-4 border-t border-white/5 mt-2 pt-4">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        showLangModal();
                                    }}
                                    className="flex items-center gap-3 text-gray-300 hover:text-royal-gold transition-colors w-fit"
                                >
                                    <Globe className="w-5 h-5" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Change Language</span>
                                </button>
                                <a
                                    href="https://www.chittortech.online/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-xs text-royal-gold/80 hover:text-royal-gold transition-colors uppercase tracking-widest mt-2"
                                >
                                    <span>Built by</span>
                                    <span className="font-bold bg-gradient-to-r from-royal-gold to-orange-400 bg-clip-text text-transparent normal-case text-sm">Chittortech</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
