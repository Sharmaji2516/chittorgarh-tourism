import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, Phone, Compass, CheckCircle2, Star, Award, Clock, MapPin, ArrowRight } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const CAMPAIGN_DATA = {
  'private-guide': {
    title: "Authorized Private Tour Guide in Chittorgarh Fort",
    badge: "Official Mewari Historians",
    h1: "Book an Authorized Private Guide for Chittorgarh Fort",
    subtitle: "Separating true Rajput history from cinema lore. Discover India's largest fort at your own pace.",
    image: "/assets/images/Guide.webp",
    features: [
      "Govt. Certified Guide badge (Hindi & English speaking)",
      "Deep architectural insights into Vijay Stambha & Padmini Palace",
      "Flexible itinerary pacing tailored for families and seniors",
      "Direct vehicle drop points to minimize long walking stretches",
      "Protection from unauthorized guides and fake gemstone sellers"
    ],
    pricingHint: "Fixed transparent guide charges • No hidden commissions",
    ctaWa: "Book Private Guide on WhatsApp",
    canonical: "/landing/private-guide"
  },
  'udaipur-taxi': {
    title: "Udaipur to Chittorgarh Private Taxi Service",
    badge: "Sanitized AC Cabs & Chauffeurs",
    h1: "Reliable Udaipur to Chittorgarh Private Cab",
    subtitle: "Punctual doorstep pickup from Udaipur hotels or Dabok Airport (UDR). Smooth 110-km highway road trip.",
    image: "/assets/images/Private Taxi.webp",
    features: [
      "Doorstep pickup & drop at your preferred departure time",
      "Well-maintained Sedan (Dzire), SUV (Innova Crysta) & Tempo Travellers",
      "Includes fort top internal driving between all monuments",
      "Optional detour to sacred Sanwariya Seth Temple (Mandaphiya)",
      "Transparent quotations with tolls and fuel accounted for"
    ],
    pricingHint: "One-Way & Same-Day Round Trip Options Available",
    ctaWa: "Get Instant Taxi Fare Quote",
    canonical: "/landing/udaipur-taxi"
  },
  'tour-packages': {
    title: "All-Inclusive Chittorgarh Tour Packages",
    badge: "Curated Rajasthan Heritage",
    h1: "Customized Chittorgarh Tour Packages",
    subtitle: "Complete stress-free travel: private sanitized cabs, authorized tour guides, heritage haveli stays, and authentic Mewari dining.",
    image: "/Fort.webp",
    features: [
      "Half-day, Full-day & 2-Day weekend packages",
      "Hotel & railway station pickup in sanitized AC vehicles",
      "Authorized guide accompaniment throughout all monuments",
      "Traditional Dal Baati Churma lunch in pure desi ghee",
      "Fort Light & Sound Show coordination"
    ],
    pricingHint: "Customized to group size & travel dates",
    ctaWa: "Request Package Itinerary on WhatsApp",
    canonical: "/landing/tour-packages"
  },
  'fort-tour': {
    title: "Complete Chittorgarh Fort Guided Tour",
    badge: "UNESCO Citadel Tour",
    h1: "Chittorgarh Fort Guided Day Excursion",
    subtitle: "Explore 7 massive gates, Vijay Stambha, Padmini Palace & Gaumukh spring with authorized local historians.",
    image: "/assets/images/chittorgarh-fort-new.webp",
    features: [
      "Detailed walking and driving tour of the 700-acre citadel",
      "Story of Queen Padmini, Rana Kumbha, Meera Bai & Maharana Pratap",
      "Panoramic photography stops at Suraj Pol and Gaumukh cliff",
      "Includes fort museum visit and architectural highlights",
      "Hassle-free parking and ticket assistance"
    ],
    pricingHint: "Available daily with morning & afternoon departure slots",
    ctaWa: "Reserve Fort Guided Tour",
    canonical: "/landing/fort-tour"
  }
};

const CampaignLandingPage = ({ type: propType }) => {
  const { campaignType: paramType } = useParams();
  const currentKey = propType || paramType || 'private-guide';
  const data = CAMPAIGN_DATA[currentKey] || CAMPAIGN_DATA['private-guide'];

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [travelDate, setTravelDate] = useState('');

  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    const msg = `🎯 *Google Ads Lead — ${data.title}*\n\n` +
      `👤 *Name:* ${guestName || 'Guest'}\n` +
      `📱 *Phone:* ${guestPhone}\n` +
      `📅 *Date:* ${travelDate || 'Upcoming'}\n` +
      `🛡️ *Service:* ${data.title}\n\n` +
      `Please provide immediate quotation and availability!`;
    trackWhatsAppClick(`ad_landing_${currentKey}`, guestName);
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title={`${data.title} | Visit Chittorgarh Official`}
        description={data.subtitle}
        canonical={data.canonical}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EFE7D9] mb-8 text-xs">
          <Link to="/" className="font-serif font-black text-sm text-[#25231F] tracking-wider">
            VISIT CHITTORGARH
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[#25231F]/60 hidden sm:inline">Concierge Desk:</span>
            <a
              href="tel:+917597451057"
              onClick={() => trackPhoneCallClick(`ad_header_${currentKey}`)}
              className="font-bold text-[#A65F3D] hover:text-[#25231F] flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" /> +91 75974 51057
            </a>
          </div>
        </div>

        {/* Hero Banner Grid */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-3.5 py-1.5 rounded-full inline-block">
              {data.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
              {data.h1}
            </h1>
            <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed">
              {data.subtitle}
            </p>

            <ul className="space-y-2.5 pt-2 text-xs text-[#25231F]/80">
              {data.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <p className="text-[11px] text-[#A65F3D] font-bold pt-2">
              • {data.pricingHint}
            </p>
          </div>

          {/* Quick Lead Form in Ad Landing Hero */}
          <div className="lg:col-span-5 bg-[#F8F5EF] p-6 rounded-3xl border border-[#EFE7D9] shadow-sm">
            <h3 className="text-base font-serif font-bold text-[#25231F] mb-1">
              Check Real-Time Availability
            </h3>
            <p className="text-[11px] text-[#25231F]/60 mb-4">
              Get an instant quote directly on WhatsApp from our local team.
            </p>

            <form onSubmit={handleLeadSubmit} className="space-y-3">
              <div>
                <input
                  type="text"
                  required
                  placeholder="Your Full Name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>
              <div>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number (10 Digits)"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>
              <div>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" /> {data.ctaWa}
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-[#EFE7D9] flex items-center justify-between text-[11px] text-[#25231F]/70">
              <span>Or call directly:</span>
              <a href="tel:+917597451057" className="font-bold text-[#A65F3D] hover:underline">
                +91 75974 51057
              </a>
            </div>
          </div>
        </div>

        {/* 4 Trust Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 text-center text-xs">
          <div className="bg-white p-5 rounded-2xl border border-[#EFE7D9] shadow-heritage">
            <span className="font-serif text-2xl font-bold text-[#C49A32] block">100%</span>
            <span className="text-[#25231F]/70">Verified Partners</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFE7D9] shadow-heritage">
            <span className="font-serif text-2xl font-bold text-[#C49A32] block">4.9★</span>
            <span className="text-[#25231F]/70">Guest Satisfaction</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFE7D9] shadow-heritage">
            <span className="font-serif text-2xl font-bold text-[#C49A32] block">Fast</span>
            <span className="text-[#25231F]/70">WhatsApp Response</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFE7D9] shadow-heritage">
            <span className="font-serif text-2xl font-bold text-[#C49A32] block">Zero</span>
            <span className="text-[#25231F]/70">Hidden Surcharges</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignLandingPage;
