import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Globe } from 'lucide-react';

const Navbar = ({ onSearch }) => {
    const { t, changeLanguage, lang } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleLang = () => {
        if (lang === 'en') changeLanguage('hi');
        else if (lang === 'hi') changeLanguage('es');
        else if (lang === 'es') changeLanguage('fr');
        else if (lang === 'fr') changeLanguage('zh');
        else changeLanguage('en');
    };

    const clearSearch = () => {
        setSearchTerm('');
        if (onSearch) onSearch('');
    };

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(prev => {
                if (prev === isScrolled) return prev;
                return isScrolled;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Search Debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onSearch) onSearch(searchTerm);
        }, 400); // 400ms debounce for mobile performance
        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const navLinks = [
        { href: "#history", label: t.nav.history },
        { href: "#attractions", label: t.nav.attractions },
        { href: "#vendors", label: t.nav.vendors },
    ];

    return (
        <>
            <nav className={`fixed w-full z-50 transition-[padding,background-color,border-color] duration-500 ${scrolled ? 'bg-royal-black/95 md:bg-royal-black/80 md:backdrop-blur-xl py-3 border-b border-royal-gold/20' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                    {/* Logo / Brand */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        <div className="h-8 w-8 md:h-10 md:w-10 border-2 border-royal-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <span className="text-royal-gold font-serif text-lg md:text-xl font-bold">C</span>
                        </div>
                        <h1 className="text-lg md:text-2xl font-serif font-bold text-royal-gold tracking-[0.2em] drop-shadow-md">
                            CHITTORGARH
                        </h1>
                    </motion.div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map(link => (
                                <a key={link.href} href={link.href} className="text-royal-white/80 hover:text-royal-gold transition-colors font-medium tracking-wide text-xs uppercase">{link.label}</a>
                            ))}
                        </div>

                        <div className="h-6 w-px bg-royal-gold/20 mx-2"></div>

                        {/* Search Field */}
                        <div className="relative group">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 border ${(isSearchOpen || searchTerm) ? 'w-64 border-royal-gold bg-black/40' : 'w-10 border-transparent hover:border-royal-gold/50'}`}>
                                <Search
                                    className="w-4 h-4 text-royal-gold cursor-pointer flex-shrink-0"
                                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                                />
                                <AnimatePresence>
                                    {(isSearchOpen || searchTerm) && (
                                        <motion.div
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: 'auto', opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            className="flex items-center w-full"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Search treasures..."
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                className="bg-transparent border-none outline-none text-royal-white text-sm w-full placeholder:text-royal-white/30"
                                                autoFocus
                                            />
                                            {searchTerm && (
                                                <X
                                                    className="w-3 h-3 text-royal-white/40 hover:text-royal-gold cursor-pointer"
                                                    onClick={clearSearch}
                                                />
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-2 px-4 py-2 border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all duration-500 rounded-lg font-serif text-xs tracking-widest uppercase shadow-sm active:scale-95"
                        >
                            <Globe className="w-3 h-3" />
                            {lang === 'en' ? 'HI' : lang === 'hi' ? 'ES' : lang === 'es' ? 'FR' : lang === 'fr' ? 'ZH' : 'EN'}
                        </button>
                    </div>

                    {/* Mobile Menu Actions */}
                    <div className="md:hidden flex items-center gap-3">
                        <div className={`flex items-center gap-2 p-2 rounded-full transition-[width,border-color,background-color] duration-300 border ${searchTerm ? 'w-40 border-royal-gold bg-black/40' : 'w-10 border-transparent'}`}>
                            <Search
                                className="w-4 h-4 text-royal-gold cursor-pointer flex-shrink-0"
                                onClick={() => setIsMenuOpen(false)} // Close menu if opening search
                            />
                            {searchTerm !== undefined && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className={`bg-transparent border-none outline-none text-royal-white text-sm w-full placeholder:text-royal-white/30 ${searchTerm ? 'block' : 'hidden'}`}
                                />
                            )}
                        </div>
                        <button
                            className="text-royal-gold p-2 hover:bg-royal-gold/10 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-royal-black/90 md:bg-black/60 md:backdrop-blur-sm z-[60] md:hidden"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-royal-black border-l border-royal-gold/20 z-[70] md:hidden p-8 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-12">
                                <span className="text-royal-gold font-serif font-bold tracking-widest uppercase italic">Menu</span>
                                <button onClick={() => setIsMenuOpen(false)}>
                                    <X className="w-6 h-6 text-royal-gold" />
                                </button>
                            </div>

                            <div className="flex flex-col gap-8 mb-auto">
                                {navLinks.map((link, idx) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-2xl font-serif text-royal-white/90 hover:text-royal-gold transition-colors flex items-center justify-between group"
                                    >
                                        <span>{link.label}</span>
                                        <div className="h-px w-0 bg-royal-gold group-hover:w-8 transition-all duration-300" />
                                    </motion.a>
                                ))}
                            </div>

                            <div className="pt-8 border-t border-royal-gold/10 flex flex-col gap-4">
                                <button
                                    onClick={() => {
                                        toggleLang();
                                        setIsMenuOpen(false);
                                    }}
                                    className="flex items-center justify-center gap-3 w-full py-4 border border-royal-gold text-royal-gold rounded-xl font-serif text-sm tracking-widest uppercase active:scale-95 transition-transform"
                                >
                                    <Globe className="w-4 h-4" />
                                    {lang === 'en' ? 'SWITCH TO HINDI' : lang === 'hi' ? 'SWITCH TO SPANISH' : lang === 'es' ? 'SWITCH TO FRENCH' : lang === 'fr' ? 'SWITCH TO CHINES' : 'SWITCH TO ENGLISH'}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
