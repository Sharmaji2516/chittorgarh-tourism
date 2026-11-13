import React from 'react';
import { NavLink } from 'react-router-dom';
import { Phone, MessageCircle, Mail, MapPin, Clock, Compass, Instagram, Facebook, Youtube } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const VERIFIED_PHONE = "+91 75974 51057";
const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in";
const VERIFIED_EMAIL = "visitchittorgarh@gmail.com";

const Footer = () => {
    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    return (
        <footer id="contact" className="bg-[#25231F] text-[#F8F5EF] pt-12 sm:pt-16 pb-24 md:pb-10 border-t border-[#C49A32]/30 relative overflow-hidden">
            {/* Subtle decorative background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A32]/5 blur-3xl pointer-events-none rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#A65F3D]/5 blur-3xl pointer-events-none rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top Inquiry Banner inside Footer */}
                <div className="bg-gradient-to-r from-[#312D27] via-[#2A2722] to-[#312D27] rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-[#C49A32]/20 mb-10 sm:mb-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
                    <div className="text-center lg:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Experience Mewar With Experts
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            Ready to Explore India's Largest Fort?
                        </h3>
                        <p className="text-xs sm:text-sm text-[#F8F5EF]/75 max-w-xl">
                            Connect directly with our Chittorgarh concierge desk for authorized guides, sanitized cabs, and custom Rajasthan tour packages.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                        <button
                            onClick={triggerPlanTrip}
                            className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                        >
                            <Compass className="w-4 h-4" />
                            Plan Your Trip
                        </button>
                        <a
                            href={VERIFIED_WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackWhatsAppClick('footer_top_banner')}
                            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-105 active:scale-95"
                        >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp Us
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
                                    Heritage Tourism
                                </span>
                            </div>
                        </div>

                        <p className="text-xs text-[#F8F5EF]/70 leading-relaxed max-w-xs mx-auto lg:mx-0">
                            Official digital gateway to the historic citadel of Chittorgarh. Promoting cultural preservation, authorized Mewari tour guides, and verified local hospitality.
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
                                <span>Official WhatsApp Support</span>
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation & Experiences */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-5">
                            Destinations & Tours
                        </h4>
                        <ul className="space-y-2.5 text-xs text-[#F8F5EF]/75">
                            <li>
                                <NavLink to="/attractions" className="hover:text-[#C49A32] transition-colors">
                                    Chittorgarh Fort & Monuments
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/royal-journeys" className="hover:text-[#C49A32] transition-colors">
                                    Curated Tour Packages
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/service/guide" className="hover:text-[#C49A32] transition-colors">
                                    Private Tour Guide Services
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/service/taxi" className="hover:text-[#C49A32] transition-colors">
                                    Private Taxi & Cab Rentals
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/stays" className="hover:text-[#C49A32] transition-colors">
                                    Heritage Hotels & Stays
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/flavors" className="hover:text-[#C49A32] transition-colors">
                                    Authentic Mewari Cuisine
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/vocal-for-local" className="hover:text-[#C49A32] transition-colors">
                                    Vocal for Local Artisans
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Travel Guides & SEO Landing Links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-5">
                            Travel Guides
                        </h4>
                        <ul className="space-y-2.5 text-xs text-[#F8F5EF]/75">
                            <li>
                                <NavLink to="/blog" className="hover:text-[#C49A32] transition-colors">
                                    Travel Blog & Stories
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/how-to-reach" className="hover:text-[#C49A32] transition-colors">
                                    How to Reach Chittorgarh
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/udaipur-to-chittorgarh-taxi" className="hover:text-[#C49A32] transition-colors">
                                    Udaipur to Chittorgarh Taxi
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/chittorgarh-1-day-tour" className="hover:text-[#C49A32] transition-colors">
                                    1-Day Chittorgarh Tour Plan
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/places-to-visit-in-chittorgarh" className="hover:text-[#C49A32] transition-colors">
                                    Places to Visit in Chittorgarh
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/chittorgarh-fort" className="hover:text-[#C49A32] transition-colors">
                                    Chittorgarh Fort Complete Guide
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/chittorgarh-fort-travel-guide-international-tourists" className="hover:text-[#C49A32] transition-colors">
                                    International Visitor Guide
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/destinations-and-routes" className="hover:text-[#C49A32] transition-colors font-semibold text-[#DFBA5A]">
                                    All City, State &amp; Global Routes →
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/terms" className="hover:text-[#C49A32] transition-colors">
                                    Terms & Cancellation Policy
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/feedback" className="hover:text-[#C49A32] transition-colors">
                                    Guest Feedback & Reviews
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Contact & Operations Desk */}
                    <div className="flex flex-col items-center lg:items-start">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-5">
                            Concierge Desk
                        </h4>
                        <div className="space-y-3.5 text-xs text-[#F8F5EF]/80 flex flex-col items-center lg:items-start">
                            <div className="flex items-center justify-center lg:justify-start gap-2.5">
                                <MapPin className="w-4 h-4 text-[#C49A32] shrink-0" />
                                <span className="leading-relaxed">
                                    Chittaurgarh, Rajasthan 312021
                                </span>
                            </div>

                            <div className="flex items-center justify-center lg:justify-start gap-2.5 text-emerald-400 font-semibold">
                                <Clock className="w-4 h-4 shrink-0" />
                                <span>24×7 Support on Call &amp; WhatsApp</span>
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

                            {/* Android App Link */}
                            <div className="pt-2 flex justify-center lg:justify-start">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.kushsharma.visitchittorgarh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#C49A32] transition-colors"
                                >
                                    <svg className="w-5 h-5 text-[#C49A32] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.61-1.615V3.429c0-.623.23-1.201.609-1.615zm11.604 11.608l2.677 2.677-12.019 6.94 9.342-9.617zm0-2.844L5.871 1.054l12.019 6.94-2.677 2.584zm1.422 1.422l3.493 2.017c.87.502.87 1.316 0 1.818l-3.493 2.017-2.617-2.617 2.617-3.235z"/>
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-[8px] uppercase tracking-wider text-[#F8F5EF]/60">Get Official App</div>
                                        <div className="text-[11px] font-bold text-white">Google Play Store</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar — Clean Visit Chittorgarh Copyright & Quick Links */}
                <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F5EF]/65">
                    <p className="text-center sm:text-left">
                        © {new Date().getFullYear()} <span className="text-white font-semibold">Visit Chittorgarh</span>. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
                        <NavLink to="/chittorgarh-fort" className="hover:text-[#C49A32] transition-colors">
                            Chittorgarh Fort
                        </NavLink>
                        <span className="text-white/25">•</span>
                        <NavLink to="/destinations-and-routes" className="hover:text-[#C49A32] transition-colors">
                            All Routes
                        </NavLink>
                        <span className="text-white/25">•</span>
                        <NavLink to="/terms" className="hover:text-[#C49A32] transition-colors">
                            Terms &amp; Policy
                        </NavLink>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
