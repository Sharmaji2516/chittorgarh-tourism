import React from 'react';
import { ShieldCheck, HeartHandshake, Car, Map, Hotel, UtensilsCrossed, ChevronRight, Coffee, Camera, Award, Compass, MessageCircle, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const MISSION_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Visit Chittorgarh — Tourism Services & Guide Council",
    "description": "Authorized local guides, certified tourist assistance, fort walkthroughs, sanitized cab fleet and curated Rajasthan experiences.",
    "url": "https://visitchittorgarh.in/mission-services",
    "image": "https://visitchittorgarh.in/Fort.webp"
  }
];

const MissionServicesPage = () => {
    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const coreServices = [
        { title: "Authorized Heritage Tour Guides", desc: "Govt. certified historians fluent in English & Hindi.", icon: Map, link: "/service/guide" },
        { title: "Private Cab & Taxi Transfers", desc: "Sanitized AC Sedans, Innova Crysta & Tempo Travellers.", icon: Car, link: "/service/taxi" },
        { title: "Heritage Haveli Accommodations", desc: "Curated palace-view boutique hotels and royal stays.", icon: Hotel, link: "/stays" },
        { title: "Mewari Dining Reservations", desc: "Authentic Dal Baati Churma cooked in pure desi ghee.", icon: UtensilsCrossed, link: "/flavors" },
        { title: "Fort Photo Sessions", desc: "Professional portraits against monumental sandstone arches.", icon: Camera, link: "/service/photographer" },
        { title: "Custom Tour Itineraries", desc: "Tailored 1-day, 2-day & pilgrimage road trip packages.", icon: Compass, link: "/royal-journeys" }
    ];

    return (
        <div id="about-us" className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="About Us & Tourism Mission | Visit Chittorgarh"
                description="Learn about Visit Chittorgarh's mission: promoting authentic Mewar heritage, empowering certified local guides, and providing safe, transparent tourism experiences."
                canonical="/mission-services"
                keywords="About Visit Chittorgarh, Chittorgarh tourism mission, certified guides Chittorgarh, ChittorTech tourism"
                schema={MISSION_SCHEMA}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        About Visit Chittorgarh
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        Our Heritage Mission
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        Dedicated to preserving the dignified history of Chittorgarh, empowering certified local guides, and connecting travelers with genuine Mewari hospitality.
                    </p>
                </div>

                {/* Mission Narrative Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-16">
                    <div className="max-w-3xl mx-auto space-y-6 text-sm text-[#25231F]/80 leading-relaxed">
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F]">
                            Preserving Stories of Courage, Honoring Local Hospitality
                        </h2>
                        <p>
                            Chittorgarh is revered across India as the cradle of Rajputana valor, the realm of Maharana Kumbha, Maharana Sanga, the poetess saint Meera Bai, and the supreme sacrifice of Queen Padmini. Yet for decades, travelers visiting the sprawling 700-acre fort struggled with unauthorized touts, fragmented transport, and unreliable information.
                        </p>
                        <p>
                            <strong>Visit Chittorgarh</strong> was founded by ChittorTech (recognized by iStart Rajasthan & Startup India) to create a transparent, digital-first tourism platform. We bridge the gap between discerning cultural travelers and certified local professionals.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-center">
                            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                                <span className="font-serif text-2xl font-bold text-[#C49A32] block">100%</span>
                                <span className="text-xs text-[#25231F]/70">Verified Partners</span>
                            </div>
                            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                                <span className="font-serif text-2xl font-bold text-[#A65F3D] block">Zero</span>
                                <span className="text-xs text-[#25231F]/70">Hidden Commissions</span>
                            </div>
                            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                                <span className="font-serif text-2xl font-bold text-[#526B50] block">iStart</span>
                                <span className="text-xs text-[#25231F]/70">Govt. Recognized</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="mb-16">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F] mb-8 text-center">
                        Comprehensive Tourism Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coreServices.map((srv, idx) => (
                            <NavLink
                                key={idx}
                                to={srv.link}
                                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center text-[#C49A32] mb-5 group-hover:scale-110 transition-transform">
                                        <srv.icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                                        {srv.title}
                                    </h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                                        {srv.desc}
                                    </p>
                                </div>
                                <span className="text-xs font-bold text-[#C49A32] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Explore Service →
                                </span>
                            </NavLink>
                        ))}
                    </div>
                </div>

                {/* Direct Connect Callout */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Visit Chittorgarh Desk
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            Have Questions or Partnership Inquiries?
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            Reach our Chittorgarh concierge team directly via phone, WhatsApp, or email.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <a
                            href="tel:+917597451057"
                            onClick={() => trackPhoneCallClick('mission_call')}
                            className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
                        >
                            <Phone className="w-4 h-4" /> Call Desk
                        </a>
                        <button
                            onClick={triggerPlanTrip}
                            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20"
                        >
                            <Compass className="w-4 h-4" /> Plan Trip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MissionServicesPage;
