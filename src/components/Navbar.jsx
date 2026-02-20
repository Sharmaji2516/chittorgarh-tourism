import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Globe } from 'lucide-react';
import { cn } from '../utils/cn';

const Navbar = ({ onSearch }) => {
    const { language, changeLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t.nav.history, href: '#history' },
        { name: t.nav.attractions, href: '#attractions' },
        { name: t.nav.vendors, href: '#vendors' },
        { name: t.nav.cafes, href: '#cafes' },
        { name: t.nav.hotels, href: '#hotels' },
    ];

    return (
        <nav className={cn(
            "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
            scrolled ? "bg-black/60 backdrop-blur-xl border-white/10 py-2" : "bg-transparent py-4"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-royal-gold to-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <span className="text-white font-serif font-bold text-xl">C</span>
                        </div>
                        <span className="text-white text-xl font-bold font-serif tracking-wider hidden md:block">
                            Chittorgarh<span className="text-royal-gold">Tourism</span>
                        </span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-white/80 hover:text-royal-gold px-3 py-2 rounded-md text-sm font-medium transition-colors uppercase tracking-widest hover:bg-white/5"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className={`relative flex items-center transition-all duration-300 ${showSearch ? 'w-64' : 'w-10'}`}>
                            <button
                                onClick={() => setShowSearch(!showSearch)}
                                className="absolute right-0 p-2 text-white/80 hover:text-royal-gold z-10"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                            <input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) => onSearch(e.target.value)}
                                className={cn(
                                    "bg-white/10 border border-white/10 text-white placeholder-gray-400 rounded-full py-1.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-royal-gold/50 transition-all duration-300",
                                    showSearch ? "w-full opacity-100" : "w-0 opacity-0"
                                )}
                            />
                        </div>

                        {/* Language Selector Trigger */}
                        <button className="p-2 text-white/80 hover:text-royal-gold transition-colors">
                            <Globe className="w-5 h-5" />
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
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-royal-gold hover:bg-white/5 block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="px-3 py-2">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={(e) => onSearch(e.target.value)}
                                    className="w-full bg-white/10 border border-white/10 text-white placeholder-gray-400 rounded-lg py-2 px-4 focus:outline-none"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
