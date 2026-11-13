import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, MessageCircle, Compass, Phone, ChevronRight, ShieldCheck, MapPin, ArrowLeft } from 'lucide-react';
import { cn } from '../utils/cn';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in";

const Navbar = () => {
    const { lang, changeLanguage } = useLanguage();
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

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = 'hidden';
            document.body.style.overflow = 'hidden';
        } else {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        }
        return () => {
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Destinations', href: '/attractions' },
        { name: 'Routes & Guides', href: '/destinations-and-routes' },
        { name: 'Packages', href: '/royal-journeys' },
        { name: 'Guide', href: '/service/guide' },
        { name: 'Taxi', href: '/service/taxi' },
        { name: 'Blog', href: '/blog' },
        { name: 'About', href: '/#about-us', isAnchor: true },
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
        <>
            {/* Top Fixed Header */}
            <nav className={cn(
                "fixed top-0 inset-x-0 z-50 transition-all duration-300",
                (scrolled || !isHome || isOpen)
                    ? "bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#EFE7D9] py-2 sm:py-2.5 shadow-sm"
                    : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-2.5 sm:py-3.5 text-white"
            )}>
                {/* Scroll Progress Bar */}
                <div
                    className="absolute top-0 left-0 h-[2.5px] bg-[#C49A32] z-[60] transition-all duration-100 ease-out"
                    style={{ width: `${scrollProgress}%` }}
                ></div>

                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-20 gap-2">

                        {/* Left Section: Back Button (on sub-pages) + Logo */}
                        <div className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3 min-w-0">
                            {!isHome && (
                                <button
                                    onClick={() => {
                                        if (window.history.length > 1) {
                                            navigate(-1);
                                        } else {
                                            navigate('/');
                                        }
                                    }}
                                    aria-label="Go back"
                                    className={cn(
                                        "w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm",
                                        (scrolled || !isHome || isOpen)
                                            ? "bg-white border-[#EFE7D9] text-[#25231F] hover:bg-[#EFE7D9]/40"
                                            : "bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md"
                                    )}
                                    title="Go Back"
                                >
                                    <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                                </button>
                            )}

                            {/* Logo Section */}
                            <NavLink to="/" className="flex-shrink min-w-0 flex items-center gap-2 sm:gap-3 group" onClick={() => setIsOpen(false)}>
                                <div className="w-11 h-11 sm:w-14 sm:h-14 flex items-center justify-center shrink-0 drop-shadow-md group-hover:scale-105 transition-transform">
                                    <img
                                        src="/chittorgarh-tourism-logo.webp"
                                        alt="Visit Chittorgarh Official Heritage Emblem"
                                        width={56}
                                        height={56}
                                        className="w-full h-full object-contain filter contrast-105"
                                    />
                                </div>
                                <div className="flex flex-col min-w-0 justify-center">
                                    <span className={cn(
                                        "text-[13px] xs:text-base sm:text-xl font-serif font-black tracking-wide leading-tight transition-colors truncate",
                                        (scrolled || !isHome || isOpen) ? "text-[#25231F] group-hover:text-[#A65F3D]" : "text-white group-hover:text-[#DFBA5A] drop-shadow-sm"
                                    )}>
                                        VISIT CHITTORGARH
                                    </span>
                                    <span className="text-[7.5px] xs:text-[8.5px] sm:text-[10px] font-bold tracking-[0.22em] uppercase text-[#C49A32] leading-none mt-0.5">
                                        HERITAGE TOURISM
                                    </span>
                                </div>
                            </NavLink>
                        </div>

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
                                                "px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap",
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
                                            "px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap",
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

                        {/* Desktop Right Side CTA Buttons */}
                        <div className="hidden lg:flex items-center gap-2.5">
                            {/* Language Switch */}
                            <button
                                onClick={() => changeLanguage(lang === 'en' ? 'hi' : 'en')}
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

                        {/* Mobile Header Right Controls: 1-Tap Language + WhatsApp + Menu Toggle */}
                        <div className="flex items-center gap-1.5 xs:gap-2 xl:hidden shrink-0">
                            {/* Mobile 1-Tap Language Toggle */}
                            <button
                                onClick={() => changeLanguage(lang === 'en' ? 'hi' : 'en')}
                                aria-label="Change language"
                                className={cn(
                                    "px-2 py-1.5 rounded-xl text-[10px] font-bold border flex items-center gap-1 transition-all active:scale-95 shadow-sm",
                                    (scrolled || !isHome || isOpen)
                                        ? "bg-white border-[#EFE7D9] text-[#25231F]"
                                        : "bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md"
                                )}
                            >
                                <Globe className="w-3.5 h-3.5 text-[#DFBA5A]" />
                                <span className="tracking-wide">{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
                            </button>

                            {/* Mobile WhatsApp Quick Icon */}
                            <a
                                href={VERIFIED_WA_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackWhatsAppClick('navbar_mobile_wa')}
                                className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-md active:scale-95 transition-all shrink-0 border border-emerald-400/30"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="w-4 h-4 fill-white/20" />
                            </a>

                            {/* Hamburger Button */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                aria-label="Toggle navigation menu"
                                className={cn(
                                    "w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm",
                                    (scrolled || !isHome || isOpen)
                                        ? "bg-white border-[#EFE7D9] text-[#25231F]"
                                        : "bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md"
                                )}
                            >
                                {isOpen ? <X className="w-5 h-5 text-[#A65F3D]" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* FULL-SCREEN DEDICATED MOBILE OVERLAY (Completely independent from nav backdrop-filter) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="xl:hidden fixed inset-0 z-[150] bg-[#25231F]/60 backdrop-blur-sm flex flex-col justify-end"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Drawer Sheet */}
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="w-full bg-[#F8F5EF] rounded-t-3xl border-t border-[#EFE7D9] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFE7D9] bg-white shrink-0">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-9 h-9 flex items-center justify-center shrink-0 drop-shadow-sm">
                                        <img src="/chittorgarh-tourism-logo.webp" alt="Visit Chittorgarh" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-serif font-black text-[#25231F] block leading-none">VISIT CHITTORGARH</span>
                                        <span className="text-[8px] uppercase tracking-widest text-[#C49A32] font-bold">Heritage Concierge</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full bg-[#F8F5EF] border border-[#EFE7D9] flex items-center justify-center text-[#25231F] active:scale-95"
                                    aria-label="Close menu"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Scrollable Navigation List */}
                            <div className="overflow-y-auto px-5 py-4 space-y-1.5 flex-1 overscroll-contain">
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] px-2 block mb-1">
                                    Navigation Menu
                                </span>
                                {navLinks.map((link) => {
                                    if (link.isAnchor) {
                                        return (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                onClick={(e) => handleAnchorClick(e, link.href)}
                                                className="flex items-center justify-between p-3 rounded-xl font-serif text-base text-[#25231F] hover:bg-[#EFE7D9] active:bg-[#EFE7D9] transition-colors"
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
                                                "flex items-center justify-between p-3 rounded-xl font-serif text-base transition-colors",
                                                isActive
                                                    ? "bg-[#EFE7D9] text-[#A65F3D] font-bold"
                                                    : "text-[#25231F] hover:bg-[#EFE7D9] active:bg-[#EFE7D9]"
                                            )}
                                        >
                                            <span>{link.name}</span>
                                            <ChevronRight className="w-4 h-4 text-[#25231F]/40" />
                                        </NavLink>
                                    );
                                })}
                            </div>

                            {/* Fixed Action Footer inside Drawer */}
                            <div className="p-4 bg-white border-t border-[#EFE7D9] space-y-2.5 shrink-0">
                                <button
                                    onClick={triggerPlanTrip}
                                    className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform min-h-[46px]"
                                >
                                    <Compass className="w-4 h-4" />
                                    Plan Your Trip (Instant Quote)
                                </button>

                                <div className="grid grid-cols-2 gap-2">
                                    <a
                                        href={VERIFIED_WA_LINK}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => trackWhatsAppClick('drawer_quick_wa')}
                                        className="py-2.5 px-3 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px]"
                                    >
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        <span>WhatsApp</span>
                                    </a>

                                    <a
                                        href="tel:+917597451057"
                                        onClick={() => trackPhoneCallClick('drawer_call')}
                                        className="py-2.5 px-3 bg-[#F8F5EF] border border-[#EFE7D9] text-[#A65F3D] rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 min-h-[44px]"
                                    >
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>Call Concierge</span>
                                    </a>
                                </div>

                                <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#25231F]/60 pt-1">
                                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                    <span>Visit Chittorgarh • Authorized Local Guides &amp; Concierge</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
