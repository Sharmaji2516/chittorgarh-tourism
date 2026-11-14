import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Compass,
  Globe,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';
import { getLocalizedPath, SUPPORTED_LANGUAGES } from '../config/languages';
import { cn } from '../utils/cn';

const VERIFIED_PHONE = '+91 75974 51057';
const VERIFIED_WA_LINK =
  'https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in';
const VERIFIED_EMAIL = 'visitchittorgarh@gmail.com';

const Footer = () => {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const fT = t.footer || {};
  const nT = t.nav || {};

  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  const getHref = (path) => getLocalizedPath(path, lang);

  return (
    <footer
      id="contact"
      className="bg-[#25231F] text-[#F8F5EF] pt-12 sm:pt-16 pb-24 md:pb-10 border-t border-[#C49A32]/30 relative overflow-hidden"
    >
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A32]/5 blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A65F3D]/5 blur-3xl pointer-events-none rounded-full"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Inquiry Banner inside Footer */}
        <div className="bg-gradient-to-r from-[#312D27] via-[#2A2722] to-[#312D27] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#C49A32]/20 mb-10 sm:mb-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="text-center lg:text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
              {fT.bannerKicker || 'Experience Mewar With Experts'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              {fT.bannerTitle || "Ready to Explore India's Largest Fort?"}
            </h3>
            <p className="text-xs sm:text-sm text-[#F8F5EF]/75 max-w-xl">
              {fT.bannerDesc ||
                'Connect directly with our Chittorgarh concierge desk for authorized guides, sanitized cabs, and custom Rajasthan tour packages.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={triggerPlanTrip}
              className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4" />
              {fT.planTrip || 'Plan Your Trip'}
            </button>
            <a
              href={VERIFIED_WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('footer_top_banner')}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              {fT.whatsappUs || 'WhatsApp Us'}
            </a>
          </div>
        </div>

        {/* 4 Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-white/10 text-center lg:text-left">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4 flex flex-col items-center lg:items-start">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 flex items-center justify-center shrink-0 drop-shadow-md">
                <img
                  src="/chittorgarh-tourism-logo.webp"
                  alt="Visit Chittorgarh Official Heritage Emblem"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                <span className="font-serif text-lg font-bold text-white tracking-wider block">
                  VISIT CHITTORGARH
                </span>
                <span className="text-[10px] text-[#C49A32] font-semibold tracking-[0.25em] uppercase">
                  {lang === 'hi' ? 'धरोहर पर्यटन' : 'Heritage Tourism'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F8F5EF]/70 leading-relaxed max-w-xs mx-auto lg:mx-0">
              {fT.brandDesc ||
                'Official digital gateway to the historic citadel of Chittorgarh. Promoting cultural preservation, authorized Mewari tour guides, and verified local hospitality.'}
            </p>

            {/* Direct WhatsApp Contact Button */}
            <div className="pt-2 flex items-center justify-center lg:justify-start">
              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer_direct_wa')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 border border-emerald-400/30"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>
                  {fT.whatsappSupport || 'Official WhatsApp Support'}
                </span>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation & Experiences */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-5">
              {fT.destinationsCol || 'Destinations & Tours'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/75">
              <li>
                <NavLink
                  to={getHref('/attractions')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {t.attractions?.heading || 'Chittorgarh Fort & Monuments'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/royal-journeys')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {nT.packages || 'Curated Tour Packages'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/service/guide')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {t.guide?.heading || 'Private Tour Guide Services'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/service/taxi')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {t.taxi?.heading || 'Private Taxi & Cab Rentals'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/stays')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {lang === 'hi' ? 'हेरिटेज होटल व स्टे' : 'Heritage Hotels & Stays'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/flavors')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {lang === 'hi'
                    ? 'प्रामाणिक मेवाड़ी खान-पान'
                    : 'Authentic Mewari Cuisine'}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/vocal-for-local')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  {lang === 'hi'
                    ? 'स्थानीय हस्तशिल्प व कारीगर'
                    : 'Vocal for Local Artisans'}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Guides & SEO Landing Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-5">
              {fT.guidesCol || 'Travel Guides'}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F5EF]/75">
              <li>
                <NavLink
                  to={getHref('/blog')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  Travel Blog &amp; Stories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/how-to-reach')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  How to Reach Chittorgarh
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/udaipur-to-chittorgarh-taxi')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  Udaipur to Chittorgarh Taxi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/chittorgarh-1-day-tour')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  1-Day Chittorgarh Tour Plan
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/places-to-visit-in-chittorgarh')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  Places to Visit in Chittorgarh
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/chittorgarh-fort')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  Chittorgarh Fort Complete Guide
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/destinations-and-routes')}
                  className="hover:text-[#C49A32] transition-colors font-semibold text-[#DFBA5A]"
                >
                  All City, State &amp; Global Routes →
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/terms')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  Terms &amp; Cancellation Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={getHref('/feedback')}
                  className="hover:text-[#C49A32] transition-colors"
                >
                  Guest Feedback &amp; Reviews
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Operations Desk */}
          <div className="flex flex-col items-center lg:items-start">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-5">
              {fT.conciergeCol || 'Concierge Desk'}
            </h4>
            <div className="space-y-3.5 text-xs text-[#F8F5EF]/80 flex flex-col items-center lg:items-start">
              <div className="flex items-center justify-center lg:justify-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span className="leading-relaxed">
                  {fT.address || 'Chittaurgarh, Rajasthan 312021'}
                </span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2.5 text-emerald-400 font-semibold">
                <Clock className="w-4 h-4 shrink-0" />
                <span>
                  {fT.supportClock || '24×7 Support on Call & WhatsApp'}
                </span>
              </div>

              <a
                href="tel:+917597451057"
                onClick={() => trackPhoneCallClick('footer_contact_link')}
                className="flex items-center justify-center lg:justify-start gap-2.5 hover:text-[#C49A32] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span className="font-semibold">{VERIFIED_PHONE}</span>
              </a>

              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('footer_wa_link')}
                className="flex items-center justify-center lg:justify-start gap-2.5 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: +91 75974 51057</span>
              </a>

              <a
                href={`mailto:${VERIFIED_EMAIL}`}
                className="flex items-center justify-center lg:justify-start gap-2.5 hover:text-[#C49A32] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#C49A32] shrink-0" />
                <span>{VERIFIED_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* International Multilingual Portal Card (Global Tourism Gateway) */}
        <div className="my-8 sm:my-10 p-5 sm:p-7 rounded-3xl bg-gradient-to-br from-[#2D2924] via-[#26231F] to-[#201E1B] border border-[#C49A32]/30 shadow-2xl relative overflow-hidden">
          {/* Subtle warm glow background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C49A32]/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
            {/* Left Header */}
            <div className="flex items-center gap-3.5 text-center lg:text-left">
              <div className="w-11 h-11 rounded-2xl bg-[#C49A32]/15 border border-[#C49A32]/30 flex items-center justify-center shrink-0 shadow-inner">
                <Globe className="w-5 h-5 text-[#DFBA5A]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
                  {lang === 'hi' ? 'अंतरराष्ट्रीय पर्यटन पोर्टल • 9 वैश्विक भाषाएं' : 'Global Visitor Portal • 9 Languages'}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#F8F5EF]/65 mt-0.5">
                  {lang === 'hi'
                    ? 'चित्तौड़गढ़ हेरिटेज पोर्टल को अपनी पसंदीदा भाषा में एक्सप्लोर करें'
                    : 'Explore the historic citadel of Chittorgarh in your native language'}
                </p>
              </div>
            </div>

            {/* Symmetrical 3x3 Grid on Mobile, Neat Row on Desktop */}
            <div className="w-full lg:w-auto grid grid-cols-3 sm:flex sm:flex-wrap items-center justify-center gap-2">
              {SUPPORTED_LANGUAGES.map((l) => {
                const isSelected = l.code === lang;
                const targetHref = getLocalizedPath(location.pathname, l.code);
                return (
                  <NavLink
                    key={l.code}
                    to={targetHref}
                    className={cn(
                      'flex items-center justify-center gap-1.5 py-2 px-2 sm:px-3.5 rounded-xl border text-[11px] font-medium transition-all duration-200 active:scale-95 shadow-sm text-center min-h-[38px]',
                      isSelected
                        ? 'bg-gradient-to-r from-[#C49A32] to-[#A65F3D] text-white font-bold border-[#DFBA5A]/60 shadow-md ring-1 ring-[#DFBA5A]/30'
                        : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80 hover:text-white hover:border-[#C49A32]/40'
                    )}
                    title={`View Visit Chittorgarh in ${l.name} (${l.nativeName})`}
                  >
                    <span className="text-sm leading-none shrink-0">{l.flag}</span>
                    <span className="truncate">{l.nativeName}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar — Clean Visit Chittorgarh Copyright & Quick Links */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/65">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-white font-semibold">Visit Chittorgarh</span>.{' '}
            {fT.rights || 'All rights reserved.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <NavLink
              to={getHref('/chittorgarh-fort')}
              className="hover:text-[#C49A32] transition-colors"
            >
              Chittorgarh Fort
            </NavLink>
            <span className="text-white/25">•</span>
            <NavLink
              to={getHref('/destinations-and-routes')}
              className="hover:text-[#C49A32] transition-colors"
            >
              All Routes
            </NavLink>
            <span className="text-white/25">•</span>
            <NavLink
              to={getHref('/terms')}
              className="hover:text-[#C49A32] transition-colors"
            >
              Terms &amp; Policy
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
