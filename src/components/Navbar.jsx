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
        { name: t.nav.gallery || 'Gallery', href: '/gallery' },
        { name: t.nav.vendors, href: '/flavors' },
        { name: t.nav.stays || 'Stays', href: '/stays' },
        { name: t.nav.localVocal || 'Local For Vocal', href: '/local-for-vocal' },
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
            (scrolled || !isHome) ? "bg-black/80 backdrop-blur-xl border-white/10 py-2" : "bg-transparent py-4"
        )}>
            {/* Scroll Progress Bar */}
            <div
                className="absolute top-0 left-0 h-[2px] bg-royal-gold z-[60] transition-all duration-100 ease-out shadow-[0_0_10px_rgba(212,175,55,0.8)]"
                style={{ width: `${scrollProgress}%` }}
            ></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-royal-gold to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <span className="text-white font-serif font-bold text-lg md:text-xl">C</span>
                        </div>
                        <span className="text-white text-sm md:text-xl font-bold font-serif tracking-wider">
                            Chittorgarh<span className="text-royal-gold">Tourism</span>
                        </span>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    className={({ isActive }) => cn(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-widest hover:bg-white/5",
                                        isActive ? "text-royal-gold border-b-2 border-royal-gold rounded-none" : "text-white/80 hover:text-royal-gold"
                                    )}
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Language Selector Trigger */}

                        {/* Language Selector Trigger */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                showLangModal();
                            }}
                            className="p-2 text-white/80 hover:text-royal-gold transition-colors flex items-center gap-2 group"
                            title="Change Language"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="text-[10px] uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Lang</span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-white/10 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-royal-gold hover:bg-white/20 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                            <div className="px-3 py-2 flex items-center justify-between border-t border-white/5 mt-2 pt-4">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        showLangModal();
                                    }}
                                    className="flex items-center gap-3 text-gray-300 hover:text-royal-gold transition-colors"
                                >
                                    <Globe className="w-5 h-5" />
                                    <span className="text-sm font-medium uppercase tracking-wider">Change Language</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
