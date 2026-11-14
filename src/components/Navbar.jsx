import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  MessageCircle,
  Phone,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  ArrowLeft,
  Check,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';
import {
  SUPPORTED_LANGUAGES,
  getLocalizedPath,
  stripLanguagePrefix,
} from '../config/languages';

const VERIFIED_WA_LINK =
  'https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in';

const Navbar = () => {
  const { lang, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const rafRef = useRef(null);
  const langDropdownRef = useRef(null);

  const cleanCurrentPath = stripLanguagePrefix(location.pathname);
  const isHome = cleanCurrentPath === '/' || cleanCurrentPath === '';

  const currentLang =
    SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0];

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target)
      ) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
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
    setIsLangDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav?.home || 'Home', href: '/' },
    { name: t.nav?.destinations || 'Destinations', href: '/attractions' },
    { name: t.nav?.routes || 'Routes & Guides', href: '/destinations-and-routes' },
    { name: t.nav?.packages || 'Packages', href: '/royal-journeys' },
    { name: t.nav?.guide || 'Guide', href: '/service/guide' },
    { name: t.nav?.taxi || 'Taxi', href: '/service/taxi' },
    { name: t.nav?.blog || 'Blog', href: '/blog', hideOnCompact: true },
    { name: t.nav?.about || 'About', href: '/#about-us', isAnchor: true, hideOnCompact: true },
    { name: t.nav?.contact || 'Contact', href: '/#contact', isAnchor: true, hideOnCompact: true },
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
        const targetPath = getLocalizedPath('/', lang) + anchor;
        navigate(targetPath);
      }
      setIsOpen(false);
    }
  };

  const handleLanguageSelect = (code) => {
    changeLanguage(code);
    setIsLangDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Fixed Header */}
      <nav
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled || !isHome || isOpen
            ? 'bg-[#F8F5EF]/95 backdrop-blur-md border-b border-[#EFE7D9] py-2 sm:py-2.5 shadow-sm'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-2.5 sm:py-3.5 text-white'
        )}
      >
        {/* Scroll Progress Bar */}
        <div
          className="absolute top-0 left-0 h-[2.5px] bg-[#C49A32] z-[60] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2">
            {/* Left Side: Back Button (on sub-pages) + Logo */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10">
              {!isHome && (
                <button
                  onClick={() => {
                    if (window.history.length > 1) {
                      navigate(-1);
                    } else {
                      navigate(getLocalizedPath('/', lang));
                    }
                  }}
                  aria-label="Go back"
                  className={cn(
                    'w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm',
                    scrolled || !isHome || isOpen
                      ? 'bg-white border-[#EFE7D9] text-[#25231F] hover:bg-[#EFE7D9]/40'
                      : 'bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md'
                  )}
                  title="Go Back"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </button>
              )}

              {/* Logo Section */}
              <NavLink
                to={getLocalizedPath('/', lang)}
                className="flex items-center gap-2 sm:gap-3 group shrink-0"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 sm:w-13 sm:h-13 flex items-center justify-center shrink-0 drop-shadow-md group-hover:scale-105 transition-transform">
                  <img
                    src="/chittorgarh-tourism-logo.webp"
                    alt="Visit Chittorgarh Official Heritage Emblem"
                    width={52}
                    height={52}
                    className="w-full h-full object-contain filter contrast-105"
                  />
                </div>
                <div className="flex flex-col justify-center shrink-0">
                  <span
                    className={cn(
                      'text-xs xs:text-sm sm:text-base md:text-xl font-serif font-black tracking-tight sm:tracking-wide leading-tight transition-colors whitespace-nowrap',
                      scrolled || !isHome || isOpen
                        ? 'text-[#25231F] group-hover:text-[#A65F3D]'
                        : 'text-white group-hover:text-[#DFBA5A] drop-shadow-sm'
                    )}
                  >
                    VISIT CHITTORGARH
                  </span>
                  <span className="text-[7.5px] xs:text-[8px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-[#C49A32] leading-none mt-0.5 whitespace-nowrap">
                    HERITAGE TOURISM
                  </span>
                </div>
              </NavLink>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:flex items-center justify-center gap-1 2xl:gap-2 flex-1 min-w-0 max-w-3xl mx-auto px-2">
              {navLinks.map((link) => {
                if (link.isAnchor) {
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className={cn(
                        'px-2 2xl:px-2.5 py-1.5 text-[10.5px] 2xl:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap',
                        link.hideOnCompact && 'hidden 2xl:inline-block',
                        scrolled || !isHome
                          ? 'text-[#25231F]/80 hover:text-[#A65F3D] hover:bg-[#EFE7D9]/50'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      )}
                    >
                      {link.name}
                    </a>
                  );
                }

                const localizedHref = getLocalizedPath(link.href, lang);

                return (
                  <NavLink
                    key={link.name}
                    to={localizedHref}
                    className={({ isActive }) =>
                      cn(
                        'px-2 2xl:px-2.5 py-1.5 text-[10.5px] 2xl:text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors whitespace-nowrap',
                        link.hideOnCompact && 'hidden 2xl:inline-block',
                        isActive
                          ? scrolled || !isHome
                            ? 'text-[#C49A32] font-black bg-[#EFE7D9]'
                            : 'text-white font-black bg-white/20'
                          : scrolled || !isHome
                          ? 'text-[#25231F]/80 hover:text-[#A65F3D] hover:bg-[#EFE7D9]/50'
                          : 'text-white/85 hover:text-white hover:bg-white/10'
                      )
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Right Side CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 shrink-0 z-10">
              {/* 9-Language Selector Dropdown on Desktop */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-2xl border text-xs font-bold transition-all active:scale-95 shadow-sm',
                    scrolled || !isHome
                      ? 'bg-white border-[#EFE7D9] text-[#25231F] hover:bg-[#F8F5EF]'
                      : 'bg-white/15 border-white/30 text-white hover:bg-white/25 backdrop-blur-md'
                  )}
                  aria-label="Select language"
                  aria-expanded={isLangDropdownOpen}
                >
                  <span className="text-base leading-none">{currentLang.flag}</span>
                  <span className="font-medium">{currentLang.nativeName}</span>
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200 text-[#C49A32]',
                      isLangDropdownOpen ? 'rotate-180' : ''
                    )}
                  />
                </button>

                <AnimatePresence>
                  {isLangDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#EFE7D9] py-2 z-[100] overflow-hidden"
                    >
                      <div className="px-3.5 py-1.5 border-b border-[#EFE7D9]/60 text-[10px] font-bold uppercase tracking-widest text-[#C49A32]">
                        {t.nav?.changeLang || 'Select Language'}
                      </div>
                      <div className="max-h-72 overflow-y-auto py-1 overscroll-contain">
                        {SUPPORTED_LANGUAGES.map((item) => {
                          const isSelected = item.code === lang;
                          return (
                            <button
                              key={item.code}
                              onClick={() => handleLanguageSelect(item.code)}
                              className={cn(
                                'w-full flex items-center justify-between px-3.5 py-2 text-left text-xs transition-colors',
                                isSelected
                                  ? 'bg-[#EFE7D9] text-[#A65F3D] font-bold'
                                  : 'text-[#25231F] hover:bg-[#F8F5EF]'
                              )}
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-base leading-none">
                                  {item.flag}
                                </span>
                                <div>
                                  <div className="leading-tight font-medium">
                                    {item.nativeName}
                                  </div>
                                  <div className="text-[10px] text-[#25231F]/50">
                                    {item.name}
                                  </div>
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="w-4 h-4 text-[#C49A32]" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* WhatsApp CTA Button */}
              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('navbar_cta')}
                className="flex items-center gap-1.5 px-3 2xl:px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.nav?.whatsappUs || 'WhatsApp'}</span>
              </a>
            </div>

            {/* Mobile Header Right Controls: Language Badge + Hamburger */}
            <div className="flex items-center gap-2 xl:hidden shrink-0">
              {/* Quick Language Pill on Mobile Header */}
              <button
                onClick={() => setIsOpen(true)}
                className={cn(
                  'px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all shadow-sm',
                  scrolled || !isHome || isOpen
                    ? 'bg-white border-[#EFE7D9] text-[#25231F]'
                    : 'bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md'
                )}
                aria-label="Change Language"
                title="Change Language"
              >
                <span className="text-xs leading-none">{currentLang.flag}</span>
                <span className="uppercase tracking-wide font-mono text-[10px]">
                  {currentLang.code}
                </span>
              </button>

              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation menu"
                className={cn(
                  'w-9 h-9 rounded-xl border flex items-center justify-center transition-all active:scale-95 shrink-0 shadow-sm',
                  scrolled || !isHome || isOpen
                    ? 'bg-white border-[#EFE7D9] text-[#25231F]'
                    : 'bg-white/20 hover:bg-white/30 border-white/30 text-white backdrop-blur-md'
                )}
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-[#A65F3D]" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
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
                    <img
                      src="/chittorgarh-tourism-logo.webp"
                      alt="Visit Chittorgarh"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-sm font-serif font-black text-[#25231F] block leading-none">
                      VISIT CHITTORGARH
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#C49A32] font-bold">
                      Heritage Concierge
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-[#F8F5EF] border border-[#EFE7D9] flex items-center justify-center text-[#25231F] active:scale-95 shadow-sm"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Language Selection Grid inside Drawer */}
              <div className="px-5 py-3.5 bg-white border-b border-[#EFE7D9] shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C49A32] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{t.nav?.changeLang || 'Select Language'}</span>
                  </span>
                  <span className="text-[10px] text-[#25231F]/50 font-medium">
                    {currentLang.nativeName} ({currentLang.code.toUpperCase()})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {SUPPORTED_LANGUAGES.map((item) => {
                    const isSelected = item.code === lang;
                    return (
                      <button
                        key={item.code}
                        onClick={() => handleLanguageSelect(item.code)}
                        className={cn(
                          'flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-xl border text-[11px] font-semibold transition-all active:scale-95',
                          isSelected
                            ? 'bg-[#C49A32]/15 border-[#C49A32] text-[#A65F3D] font-bold shadow-xs'
                            : 'bg-[#F8F5EF] border-[#EFE7D9] text-[#25231F] hover:bg-white'
                        )}
                      >
                        <span className="text-xs leading-none">{item.flag}</span>
                        <span className="truncate">{item.nativeName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Scrollable Navigation List */}
              <div className="overflow-y-auto px-6 py-4 space-y-2 flex-1 overscroll-contain">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C49A32] px-2 block mb-1">
                  {t.nav?.menu || 'Navigation Menu'}
                </span>
                {navLinks.map((link) => {
                  if (link.isAnchor) {
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="flex items-center justify-between p-3 rounded-2xl font-serif text-base text-[#25231F] hover:bg-white active:bg-white shadow-xs border border-transparent hover:border-[#EFE7D9] transition-all"
                      >
                        <span>{link.name}</span>
                        <ChevronRight className="w-4 h-4 text-[#25231F]/40" />
                      </a>
                    );
                  }

                  const localizedHref = getLocalizedPath(link.href, lang);

                  return (
                    <NavLink
                      key={link.name}
                      to={localizedHref}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center justify-between p-3 rounded-2xl font-serif text-base transition-all shadow-xs border',
                          isActive
                            ? 'bg-[#EFE7D9] text-[#A65F3D] font-bold border-[#C49A32]/40'
                            : 'text-[#25231F] bg-white/70 hover:bg-white active:bg-white border-[#EFE7D9]/60'
                        )
                      }
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 text-[#25231F]/40" />
                    </NavLink>
                  );
                })}
              </div>

              {/* Fixed Action Footer inside Drawer */}
              <div className="p-5 bg-white border-t border-[#EFE7D9] space-y-2.5 shrink-0 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <a
                  href={VERIFIED_WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackWhatsAppClick('drawer_quick_wa');
                    setIsOpen(false);
                  }}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white/20" />
                  <span>
                    {t.nav?.inquireWa || 'Inquire on WhatsApp Tour Desk'}
                  </span>
                </a>

                <a
                  href="tel:+917597451057"
                  onClick={() => {
                    trackPhoneCallClick('drawer_call');
                    setIsOpen(false);
                  }}
                  className="w-full py-2.5 px-4 bg-[#F8F5EF] border border-[#EFE7D9] text-[#25231F] rounded-2xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#A65F3D]" />
                  <span>
                    {t.nav?.directCall ||
                      'Direct Call Concierge (+91 75974 51057)'}
                  </span>
                </a>

                <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#25231F]/60 pt-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>
                    {t.nav?.authorizedTag ||
                      'Visit Chittorgarh • Authorized Local Guides & Concierge'}
                  </span>
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
