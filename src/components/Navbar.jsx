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

                        {/* Left Side: Back Button (on sub-pages) + Logo */}
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
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
                            <NavLink to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0" onClick={() => setIsOpen(false)}>
                                <div className="w-10 h-10 sm:w-13 sm:h-13 flex items-center justify-center shrink-0 drop-shadow-md group-hover:scale-105 transition-transform">
                                    <img
                                        src="/chittorgarh-tourism-logo.webp"
                                        alt="Visit Chittorgarh Official Heritage Emblem"
                                        width={52}
                                        height={52}
                                        className="w-full h-full object-contain filter contrast-105"
                                    />
                                </div>
                                <div className="flex flex-col justify-center min-w-0">
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
                        </div>

                        {/* Mobile Header Right Controls: WhatsApp + Hamburger */}
                        <div className="flex items-center gap-2 xl:hidden shrink-0">
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

            {/* FULL-SCREEN DEDICATED MOBILE OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="xl:hidden fixed inset-0 z-[150] bg-[#25231F]/70 backdrop-blur-md flex flex-col justify-start"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Full Screen Menu Sheet */}
                        <motion.div
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                            className="w-full bg-[#F8F5EF] min-h-screen flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EFE7D9] bg-white shrink-0">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-10 h-10 flex items-center justify-center shrink-0 drop-shadow-sm">
                                        <img src="/chittorgarh-tourism-logo.webp" alt="Visit Chittorgarh" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <span className="text-sm font-serif font-black text-[#25231F] block leading-none">VISIT CHITTORGARH</span>
                                        <span className="text-[9px] uppercase tracking-widest text-[#C49A32] font-bold">Heritage Concierge</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    {/* Language Switcher inside Hamburger Drawer */}
                                    <button
                                        onClick={() => changeLanguage(lang === 'en' ? 'hi' : 'en')}
                                        className="px-3 py-1.5 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9] text-[#25231F] text-xs font-bold flex items-center gap-1.5 active:scale-95 shadow-sm"
                                        aria-label="Toggle language"
                                    >
                                        <Globe className="w-4 h-4 text-[#C49A32]" />
                                        <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-9 h-9 rounded-full bg-[#F8F5EF] border border-[#EFE7D9] flex items-center justify-center text-[#25231F] active:scale-95 shadow-sm"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Navigation List: Clean Full-Screen */}
                            <div className="overflow-y-auto px-6 py-6 space-y-2 flex-1 overscroll-contain">
                                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C49A32] px-2 block mb-2">
                                    Navigation Menu
                                </span>
                                {navLinks.map((link) => {
                                    if (link.isAnchor) {
                                        return (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                onClick={(e) => handleAnchorClick(e, link.href)}
                                                className="flex items-center justify-between p-3.5 rounded-2xl font-serif text-lg text-[#25231F] hover:bg-white active:bg-white shadow-sm border border-transparent hover:border-[#EFE7D9] transition-all"
                                            >
                                                <span>{link.name}</span>
                                                <ChevronRight className="w-5 h-5 text-[#25231F]/40" />
                                            </a>
                                        );
                                    }

                                    return (
                                        <NavLink
                                            key={link.name}
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => cn(
                                                "flex items-center justify-between p-3.5 rounded-2xl font-serif text-lg transition-all shadow-sm border",
                                                isActive
                                                    ? "bg-[#EFE7D9] text-[#A65F3D] font-bold border-[#C49A32]/40"
                                                    : "text-[#25231F] bg-white/70 hover:bg-white active:bg-white border-[#EFE7D9]/60"
                                            )}
                                        >
                                            <span>{link.name}</span>
                                            <ChevronRight className="w-5 h-5 text-[#25231F]/40" />
                                        </NavLink>
                                    );
                                })}
                            </div>

                            {/* Fixed Action Footer inside Drawer */}
                            <div className="p-5 bg-white border-t border-[#EFE7D9] space-y-3 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                                <a
                                    href={VERIFIED_WA_LINK}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => {
                                        trackWhatsAppClick('drawer_quick_wa');
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform min-h-[48px]"
                                >
                                    <MessageCircle className="w-4 h-4 fill-white/20" />
                                    <span>Inquire on WhatsApp Tour Desk</span>
                                </a>

                                <a
                                    href="tel:+917597451057"
                                    onClick={() => {
                                        trackPhoneCallClick('drawer_call');
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-3 px-4 bg-[#F8F5EF] border border-[#EFE7D9] text-[#25231F] rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 min-h-[46px]"
                                >
                                    <Phone className="w-4 h-4 text-[#A65F3D]" />
                                    <span>Direct Call Concierge (+91 75974 51057)</span>
                                </a>

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
