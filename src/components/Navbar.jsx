import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Globe, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
    const { lang, changeLanguage, t, showLangModal } = useLanguage();
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
        { name: t.nav.royalJourneys, href: '/royal-journeys' },
        { name: t.nav.localVocal || 'Vocal For Local', href: '/vocal-for-local' },
        { name: t.nav.missionServices, href: '/mission-services' },
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
                            <img src="/logo_maharana.png" alt="Logo" className="w-full h-full object-cover" />
                        </motion.div>
                        <div className="flex flex-col">
                            <span className="text-white text-base md:text-xl font-bold font-serif tracking-[0.15em] leading-tight group-hover:text-royal-gold transition-colors duration-300">
                                {t.nav.brandTitle}
                            </span>
                            <span className="text-royal-gold text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                                {t.nav.brandTagline}
                            </span>
                        </div>
                    </NavLink>

                    {/* Desktop Menu - Centralized & Spaced */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                        <div className="flex items-center space-x-1 bg-black/20 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/5">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    className={({ isActive }) => cn(
                                        "relative px-5 py-2 text-xs font-semibold transition-all uppercase tracking-wider group rounded-full",
                                        isActive ? "text-royal-gold" : "text-white/70 hover:text-white"
                                    )}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="relative z-10">{link.name}</span>
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-active-pill"
                                                    className="absolute inset-0 bg-royal-gold/15 rounded-full border border-royal-gold/20"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            )}
                                            {!isActive && (
                                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 rounded-full transition-all duration-300 transform scale-95 group-hover:scale-100" />
                                            )}
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
                            className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-royal-gold/30 bg-royal-gold/5 text-royal-gold hover:bg-royal-gold hover:text-royal-black hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-500 shadow-lg shadow-black/20 group"
                        >
                            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
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
                        animate={{ opacity: 1, height: '100vh' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="lg:hidden fixed inset-0 top-20 bg-heritage-charcoal/95 backdrop-blur-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-40 border-t border-royal-gold/10"
                    >
                        {/* Ambient Glows */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-royal-gold/5 blur-[100px] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                        <div className="px-6 py-8 flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08, ease: "easeOut" }}
                                        key={link.name}
                                    >
                                        <NavLink
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => cn(
                                                "group flex items-center justify-between p-4 rounded-2xl transition-all duration-300",
                                                isActive 
                                                    ? "bg-royal-gold/10 border border-royal-gold/20 shadow-[inset_0_0_20px_rgba(212,175,55,0.05)]" 
                                                    : "hover:bg-white/5 border border-transparent"
                                            )}
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <div className="flex items-center gap-4">
                                                        <span className={cn(
                                                            "text-2xl font-serif tracking-wide transition-colors duration-300",
                                                            isActive ? "text-royal-gold" : "text-white/80 group-hover:text-white"
                                                        )}>
                                                            {link.name}
                                                        </span>
                                                    </div>
                                                    <div className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                                                        isActive ? "bg-royal-gold/20" : "bg-white/5 group-hover:bg-white/10 group-hover:translate-x-1"
                                                    )}>
                                                        <ChevronRight className={cn(
                                                            "w-4 h-4",
                                                            isActive ? "text-royal-gold" : "text-white/50 group-hover:text-white"
                                                        )} />
                                                    </div>
                                                </>
                                            )}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-auto pt-8 pb-12"
                            >
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        showLangModal();
                                    }}
                                    className="flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-gradient-to-r from-royal-gold/10 to-transparent border border-royal-gold/20 text-royal-gold active:scale-95 transition-all group shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-royal-gold/20 rounded-xl group-hover:rotate-12 transition-transform shadow-inner">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-[0.2em]">{lang === 'en' ? 'हिन्दी' : 'English'}</span>
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-80 bg-royal-gold/20 px-3 py-1.5 rounded-full border border-royal-gold/20">{t.nav.changeLang}</span>
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
