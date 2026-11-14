import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  Compass,
  MessageCircle,
  Phone,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
  Landmark,
  Sparkles,
  ChevronRight,
  HeartHandshake,
} from 'lucide-react';

import Hero from '../components/Hero';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';
import { getLocalizedPath } from '../config/languages';

const VERIFIED_WA_LINK =
  'https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in';

const HOME_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Visit Chittorgarh',
    url: 'https://www.visitchittorgarh.in/',
    logo: 'https://www.visitchittorgarh.in/chittorgarh-tourism-logo.png',
    email: 'visitchittorgarh@gmail.com',
    telephone: '+91-7597451057',
    sameAs: [
      'https://www.instagram.com/visitchittorgarh',
      'https://www.facebook.com/visitchittorgarh',
      'https://www.youtube.com/@visitchittorgarh',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Visit Chittorgarh',
    url: 'https://www.visitchittorgarh.in/',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: 'Chittorgarh Fort & Heritage City',
    description:
      'UNESCO World Heritage Site in Rajasthan, India. Home to the legendary Chittorgarh Fort, Vijay Stambha, and rich Rajputana heritage.',
    url: 'https://www.visitchittorgarh.in/',
    image: 'https://www.visitchittorgarh.in/Fort.webp',
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.8887',
      longitude: '74.6269',
    },
    touristType: [
      'Heritage Tourist',
      'Cultural Tourist',
      'Pilgrimage Tourist',
      'Family Traveler',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Visit Chittorgarh',
    image: 'https://www.visitchittorgarh.in/Fort.webp',
    url: 'https://www.visitchittorgarh.in/',
    telephone: '+91-7597451057',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chittaurgarh',
      addressRegion: 'Rajasthan',
      postalCode: '312021',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '24.8887',
      longitude: '74.6269',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '08:00',
      closes: '20:00',
    },
  },
];

const ATTRACTION_IMAGES = [
  '/assets/images/vijay-stambh-new.webp',
  '/assets/images/padmini-palace-new.webp',
  '/assets/images/gaumukh-reservoir4.webp',
  '/assets/images/kumbha-palace-new.webp',
  '/assets/images/Kirti Stambh.webp',
  '/assets/images/Sanvliya-ji-Temple.webp',
];

const HomePage = () => {
  const { lang, t } = useLanguage();

  const conciergeT = t.concierge || {};
  const card1 = conciergeT.card1 || {};
  const card2 = conciergeT.card2 || {};
  const whyVisitT = t.whyVisit || {};
  const attractionsT = t.attractions || {};
  const guideT = t.guide || {};
  const taxiT = t.taxi || {};
  const testimonialsT = t.testimonials || {};

  const triggerPlanTrip = (focusedDetail = null) => {
    if (focusedDetail && focusedDetail.itemName) {
      window.dispatchEvent(
        new CustomEvent('openTripPlannerModal', {
          detail: {
            mode: 'focused',
            itemName: focusedDetail.itemName,
            itemDuration: focusedDetail.itemDuration || '',
            category: focusedDetail.category || 'Package',
          },
        })
      );
    } else {
      window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    }
  };

  const topAttractions = (attractionsT.items || []).map((att, idx) => ({
    ...att,
    image: ATTRACTION_IMAGES[idx] || '/assets/images/vijay-stambh-new.webp',
  }));

  const whyVisitIcons = [Landmark, Award, Sparkles, HeartHandshake];

  const getHref = (path) => getLocalizedPath(path, lang);

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] overflow-x-hidden selection:bg-[#C49A32] selection:text-white pb-24 md:pb-0">
      <SEOHead
        title={t.seo?.homeTitle || 'Visit Chittorgarh | Official Tourism Guide, Fort Tours & Private Taxi'}
        description={
          t.seo?.homeDesc ||
          "Plan your visit to Chittorgarh Fort, India's largest citadel. Book authorized Mewari guides, sanitized private cabs, heritage stays & authentic Rajasthani dining."
        }
        canonical="/"
        ogImage="https://www.visitchittorgarh.in/Fort.webp"
        schema={HOME_SCHEMAS}
      />

      {/* SECTION 1: Premium Hero Section */}
      <Hero />

      {/* SECTION 2: Dual Concierge Mode (Advance Trip Planning vs Instant On-Spot Arrival) */}
      <section className="relative z-20 -mt-6 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
            {conciergeT.kicker || 'Flexible Heritage Concierge'}
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-black text-[#25231F] mt-2">
            {conciergeT.heading ||
              "Plan in Advance or on Arrival — We've Got You Covered!"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Advance Trip Planning */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#C49A32]/40 p-6 sm:p-8 shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between relative group">
            <span className="self-start bg-[#C49A32] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm mb-4">
              {card1.badge || 'RECOMMENDED FOR BEST EXPERIENCE'}
            </span>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                {card1.title || '🏡 Plan Your Custom Trip from Home'}
              </h3>

              <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-[#25231F]/80 mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🛋️</span>
                  <div>
                    <strong className="text-[#25231F] block">
                      {card1.itineraryLabel || 'End-to-End Itinerary:'}
                    </strong>
                    <span>
                      {card1.itineraryText ||
                        'Customized schedule for Chittorgarh Fort + Sanwaliya Seth + Menal Waterfall.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🚗</span>
                  <div>
                    <strong className="text-[#25231F] block">
                      {card1.cabLabel || 'Confirmed Cab & Hotel:'}
                    </strong>
                    <span>
                      {card1.cabText ||
                        'Railway station/airport transfers with pre-verified heritage hotel stays.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">📜</span>
                  <div>
                    <strong className="text-[#25231F] block">
                      {card1.guideLabel || 'Govt. Approved Historian:'}
                    </strong>
                    <span>
                      {card1.guideText ||
                        'Prior-booked authorized Mewari historian for an insightful fortress tour.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">💰</span>
                  <div>
                    <strong className="text-[#25231F] block">
                      {card1.priceLabel || 'Zero Hidden Charges:'}
                    </strong>
                    <span>
                      {card1.priceText ||
                        'Upfront transparent quotation and customized package directly on WhatsApp.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() =>
                triggerPlanTrip({
                  itemName: 'Advance Trip Planning',
                  category: 'Advance Tour',
                })
              }
              className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 min-h-[46px]"
            >
              <Compass className="w-4 h-4" />
              {card1.cta || 'Plan Full Trip From Home (WhatsApp)'}
            </button>
          </div>

          {/* Card 2: Instant 15-Minute Assistance */}
          <div className="bg-gradient-to-br from-[#25231F] via-[#2F2C27] to-[#1C1A17] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-heritage flex flex-col justify-between relative group border border-emerald-500/30">
            <span className="self-start bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              {card2.badge || '15-MINUTE FAST ON-SPOT DISPATCH'}
            </span>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                {card2.title ||
                  '⚡ Already in Chittorgarh? Get Instant Guide & Cab!'}
              </h3>

              <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-white/80 mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">📍</span>
                  <div>
                    <strong className="text-emerald-400 block">
                      {card2.dispatchLabel || '15-20 Min Quick Dispatch:'}
                    </strong>
                    <span>
                      {card2.dispatchText ||
                        'Sanitized cab and licensed guide dispatched directly to Chittorgarh Station, Bus Stand, or Fort Gate.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🛡️</span>
                  <div>
                    <strong className="text-emerald-400 block">
                      {card2.protectionLabel || 'Tout & Trap Protection:'}
                    </strong>
                    <span>
                      {card2.protectionText ||
                        'Stay 100% safe from unlicensed touts and aggressive vendors at fort parking.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🎟️</span>
                  <div>
                    <strong className="text-emerald-400 block">
                      {card2.ticketsLabel || 'Ticket & Light Show Help:'}
                    </strong>
                    <span>
                      {card2.ticketsText ||
                        'Fast assistance with monument entry tickets and evening Sound & Light show timings.'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">📞</span>
                  <div>
                    <strong className="text-white block">
                      {card2.callLabel || '1-Tap Direct Call / WhatsApp:'}
                    </strong>
                    <span>
                      {card2.callText ||
                        'Coordinate directly with local concierge desk without middlemen.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <a
                href="tel:+917597451057"
                onClick={() => trackPhoneCallClick('instant_card_call')}
                className="py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-[#DFBA5A]" />
                {card2.callBtn || 'Call Concierge Desk'}
              </a>
              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('instant_card_wa')}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                {card2.waBtn || 'Instant WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Visit Chittorgarh */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
            {whyVisitT.kicker || 'The Mewar Legacy'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F]">
            {whyVisitT.heading || 'Why Visit Chittorgarh?'}
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-3 leading-relaxed">
            {whyVisitT.desc ||
              'Chittorgarh is not merely a destination on a map — it is the soul of Rajput pride, an expansive 700-acre open-air museum where history was written in sacrifice and valor.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(whyVisitT.cards || []).map((card, idx) => {
            const Icon = whyVisitIcons[idx] || Landmark;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center mb-5 text-[#C49A32] group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[#25231F]/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Popular Attractions */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/50 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-white/70 px-3.5 py-1 rounded-full border border-[#EFE7D9]">
              {attractionsT.kicker || 'Citadel Monuments & Sacred Sites'}
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2.5">
              {attractionsT.heading || 'Popular Attractions'}
            </h2>
            <NavLink
              to={getHref('/attractions')}
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A65F3D] hover:text-[#25231F] transition-colors"
            >
              {attractionsT.exploreAll || 'Explore All 15+ Monuments'}{' '}
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {topAttractions.map((att) => (
              <div
                key={att.id}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-48 sm:h-56 relative overflow-hidden bg-[#EFE7D9]">
                    <img
                      src={att.image}
                      alt={att.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      {att.badge}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                      {att.name}
                    </h3>
                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                      {att.desc}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#A65F3D] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {attractionsT.bestTimeLabel || 'Best Time: '}
                        {att.bestTime}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between text-xs mt-4">
                  <NavLink
                    to={getHref('/attractions')}
                    className="font-bold text-[#C49A32] hover:text-[#A65F3D] transition-colors flex items-center gap-1"
                  >
                    {attractionsT.viewDetails || 'View Details'}{' '}
                    <ChevronRight className="w-4 h-4" />
                  </NavLink>
                  <button
                    onClick={triggerPlanTrip}
                    className="text-[11px] font-bold text-[#25231F] bg-[#F8F5EF] hover:bg-[#EFE7D9] px-3 py-1.5 rounded-lg border border-[#EFE7D9] transition-colors"
                  >
                    {attractionsT.inquireGuide || 'Inquire Guide'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Private Tour Guide Services */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white via-[#F8F5EF] to-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-6 sm:p-12 shadow-heritage max-w-3xl mx-auto text-center flex flex-col items-center">
          <div className="space-y-4 sm:space-y-6 w-full flex flex-col items-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
                {guideT.kicker || 'Authorized Mewari Historians'}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />{' '}
                {guideT.badge || 'Rajasthan Government Approved Guide'}
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
              {guideT.heading || 'Private Tour Guide in Chittorgarh'}
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed max-w-2xl mx-auto">
              {guideT.desc ||
                "Don't just look at stones — experience the living saga of Rajasthan. Our certified local guides are passionate historians who bring the architecture, legends of Padmini, and heroism of Maharana Kumbha to life at your own pace."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2 text-left w-full max-w-2xl">
              {(guideT.features || []).map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-xs text-[#25231F]/85 bg-white/70 p-2.5 rounded-xl border border-[#EFE7D9]/60"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
              <NavLink
                to={getHref('/service/guide')}
                className="px-7 py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md transition-all text-center min-h-[46px] flex items-center justify-center"
              >
                {guideT.learnDetails || 'Learn Guide Details'}
              </NavLink>
              <button
                onClick={() =>
                  triggerPlanTrip({
                    itemName: 'Private Licensed Tour Guide',
                    category: 'Guide',
                  })
                }
                className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Compass className="w-4 h-4" />
                {guideT.bookGuide || 'Book Private Guide'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Private Taxi & Transportation */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/40 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D]">
              {taxiT.kicker || 'Sanitized AC Fleet & Transfers'}
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2">
              {taxiT.heading || 'Private Taxi & Cab Service'}
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/70 mt-3 leading-relaxed">
              {taxiT.desc ||
                'Safe, sanitized private transfers with experienced local chauffeurs. Pickup from Udaipur Airport, Chittorgarh Railway Station, or your hotel doorstep.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Sedan */}
            {taxiT.sedan && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-5 sm:p-6 shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                    {taxiT.sedan.capacity}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mt-2 mb-2">
                    {taxiT.sedan.name}
                  </h3>
                  <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                    {taxiT.sedan.desc}
                  </p>
                  <ul className="text-xs text-[#25231F]/80 space-y-1.5 mb-6">
                    {(taxiT.sedan.features || []).map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() =>
                    triggerPlanTrip({
                      itemName: 'Prime Sedan Taxi (Dzire / Etios)',
                      category: 'Taxi',
                    })
                  }
                  className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px]"
                >
                  {taxiT.sedan.btn || 'Book Sedan'}
                </button>
              </div>
            )}

            {/* SUV */}
            {taxiT.suv && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#C49A32] p-5 sm:p-6 shadow-heritage transition-all flex flex-col justify-between relative">
                <span className="absolute -top-3.5 right-6 bg-[#C49A32] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                  {taxiT.suv.badge || 'Most Popular'}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                    {taxiT.suv.capacity}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mt-2 mb-2">
                    {taxiT.suv.name}
                  </h3>
                  <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                    {taxiT.suv.desc}
                  </p>
                  <ul className="text-xs text-[#25231F]/80 space-y-1.5 mb-6">
                    {(taxiT.suv.features || []).map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() =>
                    triggerPlanTrip({
                      itemName: 'Royal SUV Taxi (Innova / Ertiga)',
                      category: 'Taxi',
                    })
                  }
                  className="w-full py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm min-h-[44px]"
                >
                  {taxiT.suv.btn || 'Book SUV'}
                </button>
              </div>
            )}

            {/* Tempo Traveller */}
            {taxiT.tempo && (
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-5 sm:p-6 shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#526B50] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                    {taxiT.tempo.capacity}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mt-2 mb-2">
                    {taxiT.tempo.name}
                  </h3>
                  <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                    {taxiT.tempo.desc}
                  </p>
                  <ul className="text-xs text-[#25231F]/80 space-y-1.5 mb-6">
                    {(taxiT.tempo.features || []).map((f, i) => (
                      <li key={i}>• {f}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() =>
                    triggerPlanTrip({
                      itemName: 'Luxury Tempo Traveller (Group)',
                      category: 'Taxi',
                    })
                  }
                  className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px]"
                >
                  {taxiT.tempo.btn || 'Book Tempo Traveller'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: Guest Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/50 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
              {testimonialsT.kicker || 'Verified Traveler Experiences'}
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-black text-[#25231F] mt-2">
              {testimonialsT.heading || 'What Our Guests Say'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {(testimonialsT.items || []).map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-[#C49A32] text-sm mb-3 sm:mb-4">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#25231F]/80 italic leading-relaxed mb-4 sm:mb-6 font-serif">
                    "{item.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#EFE7D9] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#25231F]">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#25231F]/60">
                      {item.origin}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#A65F3D] bg-[#F8F5EF] px-2.5 py-1 rounded-md border border-[#EFE7D9]">
                    {item.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
