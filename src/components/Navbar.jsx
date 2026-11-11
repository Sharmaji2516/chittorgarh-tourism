import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, MessageCircle, Compass, Phone, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20am%20planning%20a%20trip%20to%20Chittorgarh%20and%20would%20like%20to%20inquire%20about%20tours,%20guide,%20or%20taxi.";

const Navbar = () => {
    const { lang, changeLanguage, t, showLangModal } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const rafRef = useRef(null);

    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                setScrolled(scrollY > 20);
                const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
                if (totalHeight > 0) {
                    setScrollProgress((scrollY / totalHeight) * 100);
                }
                rafRef.current = null;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Explore Destinations', href: '/attractions' },
        { name: 'Tour Packages', href: '/royal-journeys' },
        { name: 'Private Guide', href: '/service/guide' },
        { name: 'Private Taxi', href: '/service/taxi' },
        { name: 'Travel Blog', href: '/blog' },
        { name: 'About Us', href: '/#about-us', isAnchor: true },
        { name: 'Contact', href: '/#contact', isAnchor: true },
    ];

    const handleAnchorClick = (e, href) => {
        if (href.startsWith('/#')) {
            const anchor = href.replace('/', '');
            if (isHome) {
                e.preventDefault();
                const el = document.querySelector(anchor);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
                e.preventDefault();
                navigate(href);
            }
            setIsOpen(false);
        }
    };

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
        setIsOpen(false);
    };

    return (
        <nav className={cn(
            "fixed w-full z-50 transition-all duration-300",
            (scrolled || !isHome)
                ? "bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#EFE7D9] py-2.5 shadow-sm"
                : "bg-gradient-to-b from-[#25231F]/40 via-[#25231F]/15 to-transparent py-4 text-white"
        )}>
            {/* Scroll Progress Bar */}
            <div
                className="absolute top-0 left-0 h-[2.5px] bg-[#C49A32] z-[60] transition-all duration-100 ease-out"
                style={{ width: `${scrollProgress}%` }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">

                    {/* Logo Section */}
                    <NavLink to="/" className="flex-shrink-0 flex items-center gap-3 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#C49A32] via-[#DFBA5A] to-[#A65F3D] p-0.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden">
                            <img
                                src="/logo_maharana.webp"
                                alt="Visit Chittorgarh Official Logo"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover rounded-[14px]"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className={cn(
                                "text-base sm:text-xl font-serif font-black tracking-wider leading-none transition-colors",
                                (scrolled || !isHome) ? "text-[#25231F] group-hover:text-[#A65F3D]" : "text-white group-hover:text-[#DFBA5A]"
                            )}>
                                VISIT CHITTORGARH
                            </span>
                            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.3em] uppercase text-[#C49A32] mt-0.5">
                                HERITAGE TOURISM
                            </span>
                        </div>
                    </NavLink>

                    {/* Desktop Menu */}
                    <div className="hidden xl:flex items-center space-x-1">
                        {navLinks.map((link) => {
                            if (link.isAnchor) {
                                return (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={(e) => handleAnchorClick(e, link.href)}
                                        className={cn(
                                            "px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors",
                                            (scrolled || !isHome)
                                                ? "text-[#25231F]/80 hover:text-[#A65F3D] hover:bg-[#EFE7D9]/50"
                                                : "text-white/85 hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        {link.name}
                                    </a>
                                );
                            }

                            return (
                                <NavLink
                                    key={link.name}
                                    to={link.href}
                                    className={({ isActive }) => cn(
                                        "px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors",
                                        isActive
                                            ? ((scrolled || !isHome)
                                                ? "text-[#C49A32] font-black bg-[#EFE7D9]"
                                                : "text-white font-black bg-white/20")
                                            : ((scrolled || !isHome)
                                                ? "text-[#25231F]/80 hover:text-[#A65F3D] hover:bg-[#EFE7D9]/50"
                                                : "text-white/85 hover:text-white hover:bg-white/10")
                                    )}
                                >
                                    {link.name}
                                </NavLink>
                            );
                        })}
                    </div>

                    {/* Right Side CTA Buttons */}
                    <div className="hidden lg:flex items-center gap-2.5">
                        {/* Language Switch */}
                        <button
                            onClick={showLangModal}
                            aria-label="Change language"
                            className={cn(
                                "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-colors",
                                (scrolled || !isHome)
                                    ? "border-[#EFE7D9] text-[#25231F]/80 hover:border-[#C49A32] hover:text-[#C49A32] bg-white"
                                    : "border-white/20 text-white/90 hover:bg-white/10"
                            )}
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span className="text-[11px]">{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
                        </button>

                        {/* WhatsApp CTA Button */}
                        <a
                            href={VERIFIED_WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('navbar_cta')}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>WhatsApp Us</span>
                        </a>

                        {/* Plan Your Trip Primary CTA */}
                        <button
                            onClick={triggerPlanTrip}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#C49A32] hover:bg-[#b08728] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all hover:scale-105 active:scale-95"
                        >
                            <Compass className="w-4 h-4" />
                            <span>Plan Your Trip</span>
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="flex items-center gap-2 xl:hidden">
                        {/* Mobile WhatsApp Quick Icon */}
                        <a
                            href={VERIFIED_WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('navbar_mobile_wa')}
                            className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm"
                            aria-label="WhatsApp Us"
                        >
                            <MessageCircle className="w-4 h-4" />
                        </a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle navigation menu"
                            className={cn(
                                "p-2 rounded-xl border transition-colors",
                                (scrolled || !isHome)
                                    ? "bg-white border-[#EFE7D9] text-[#25231F]"
                                    : "bg-white/10 border-white/20 text-white"
                            )}
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-[#F8F5EF] border-t border-[#EFE7D9] px-6 py-6 shadow-2xl text-[#25231F] max-h-[85vh] overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-1 mb-6">
                            {navLinks.map((link) => {
                                if (link.isAnchor) {
                                    return (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            onClick={(e) => handleAnchorClick(e, link.href)}
                                            className="flex items-center justify-between p-3 rounded-xl font-semibold text-sm text-[#25231F] hover:bg-[#EFE7D9] transition-colors"
                                        >
                                            <span>{link.name}</span>
                                            <ChevronRight className="w-4 h-4 text-[#25231F]/40" />
                                        </a>
                                    );
                                }

                                return (
                                    <NavLink
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) => cn(
                                            "flex items-center justify-between p-3 rounded-xl font-semibold text-sm transition-colors",
                                            isActive
                                                ? "bg-[#EFE7D9] text-[#A65F3D] font-bold"
                                                : "text-[#25231F] hover:bg-[#EFE7D9]"
                                        )}
                                    >
                                        <span>{link.name}</span>
                                        <ChevronRight className="w-4 h-4 text-[#25231F]/40" />
                                    </NavLink>
                                );
                            })}
                        </div>

                        {/* Mobile CTAs */}
                        <div className="space-y-3 pt-4 border-t border-[#EFE7D9]">
                            <button
                                onClick={triggerPlanTrip}
                                className="w-full py-3.5 bg-[#C49A32] text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md"
                            >
                                <Compass className="w-4 h-4" />
                                Plan Your Trip
                            </button>

                            <a
                                href={VERIFIED_WA_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('mobile_drawer_wa')}
                                className="w-full py-3.5 bg-emerald-600 text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp Us (+91 75974 51057)
                            </a>

                            <div className="flex items-center justify-between pt-2">
                                <a
                                    href="tel:+917597451057"
                                    onClick={() => trackPhoneCallClick('mobile_drawer_call')}
                                    className="text-xs font-bold text-[#A65F3D] flex items-center gap-1.5"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                    Call Concierge: +91 75974 51057
                                </a>

                                <button
                                    onClick={() => { setIsOpen(false); showLangModal(); }}
                                    className="text-xs font-bold text-[#C49A32] flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#EFE7D9] bg-white"
                                >
                                    <Globe className="w-3.5 h-3.5" />
                                    {lang === 'en' ? 'हिन्दी' : 'English'}
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
