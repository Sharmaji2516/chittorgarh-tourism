import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Globe } from 'lucide-react';

const Navbar = ({ onSearch }) => {
    const { t, changeLanguage, lang } = useLanguage();
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
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
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        if (onSearch) onSearch(val);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-royal-black/80 backdrop-blur-xl py-3 border-b border-royal-gold/20' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo / Brand */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <div className="h-10 w-10 border-2 border-royal-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <span className="text-royal-gold font-serif text-xl font-bold">C</span>
                    </div>
                    <h1 className="text-xl md:text-2xl font-serif font-bold text-royal-gold tracking-[0.2em] drop-shadow-md">
                        CHITTORGARH
                    </h1>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        <a href="#history" className="text-royal-white/80 hover:text-royal-gold transition-colors font-medium tracking-wide text-xs uppercase">{t.nav.history}</a>
                        <a href="#attractions" className="text-royal-white/80 hover:text-royal-gold transition-colors font-medium tracking-wide text-xs uppercase">{t.nav.attractions}</a>
                        <a href="#vendors" className="text-royal-white/80 hover:text-royal-gold transition-colors font-medium tracking-wide text-xs uppercase">{t.nav.vendors}</a>
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

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button className="text-royal-gold">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
