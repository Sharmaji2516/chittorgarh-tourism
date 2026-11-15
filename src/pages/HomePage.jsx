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
  ShieldCheck,
  Car,
  Droplets,
  UserCheck,
  HelpCircle,
  ChevronDown,
  CreditCard,
  Luggage,
} from 'lucide-react';

import Hero from '../components/Hero';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';
import { getLocalizedPath } from '../config/languages';

const VERIFIED_WA_LINK =
  'https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in';

const HOME_FAQS = [
  {
    q: 'How to buy Chittorgarh Fort ASI entry tickets without payment failures?',
    a: 'Avoid online payment gateway errors and long monument ticket queues! Simply connect directly with our Visit Chittorgarh Concierge Desk on WhatsApp or Call (+91 75974 51057). Our authorized local team will arrange all your official ASI monument entry tickets, evening Sound & Light show passes, certified guide, and private cab seamlessly before you arrive.',
    tag: 'Ticket Assistance',
  },
  {
    q: 'Can we safely store our suitcases/luggage in the car during the fort tour?',
    a: 'Yes, 100%. All our Sedans, Innova Crystas, and Tempo Travellers feature dedicated locked boot space for international luggage. Your private chauffeur remains stationed with the vehicle at all times across all monument stops while you explore the citadel unburdened.',
    tag: 'Luggage Storage',
  },
  {
    q: 'Is Chittorgarh Fort safe for solo female and foreign travelers?',
    a: 'Yes, Chittorgarh Fort is recognized as one of the safest UNESCO heritage sites in Rajasthan, monitored by ASI monument marshals and Rajasthan Tourist Police. To ensure complete peace of mind, foreign and solo female travelers book through our verified Mewari concierge for licensed guides, GPS-tracked private AC cabs, and a strict zero-tout / zero-harassment guarantee.',
    tag: 'Safety & Security',
  },
  {
    q: 'Can we do a day stopover in Chittorgarh between Udaipur and Jaipur?',
    a: 'Yes! This is the most popular private transfer route in Rajasthan. Your private AC chauffeur collects you from your Udaipur hotel, drives you to Chittorgarh for a 3 to 4-hour guided fort tour with authentic Rajasthani lunch, and drops you at your Jaipur hotel doorstep by evening.',
    tag: 'Udaipur ⇄ Jaipur',
  },
  {
    q: 'Do your private drivers speak English and follow Western safety standards?',
    a: 'Yes. Our verified chauffeurs speak conversational English, maintain valid commercial tourist permits, and strictly follow Western road safety standards including functional front and rear seatbelts, dual air-conditioning, complimentary bottled mineral water, and zero forced shopping stops.',
    tag: 'Western Standards',
  },
];

const HOME_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  },
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
  const [openFaq, setOpenFaq] = useState(0);

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
    image: att.image || ATTRACTION_IMAGES[idx] || '/assets/images/vijay-stambh-new.webp',
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
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE7D9] border border-[#C49A32]/30 text-[#A65F3D] text-xs font-bold uppercase tracking-[0.2em] mb-3 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#C49A32]" />
              <span>{taxiT.kicker || 'Sanitized AC Fleet & Transfers'}</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
              {taxiT.heading || 'Private Taxi & Cab Service'}
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/70 mt-3 max-w-2xl mx-auto leading-relaxed">
              {taxiT.desc ||
                'Safe, sanitized private transfers with experienced local chauffeurs. Pickup from Udaipur Airport, Chittorgarh Railway Station, or your hotel doorstep.'}
            </p>
          </div>

          {/* International Anti-Scam & Trust Assurance Ribbon */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#EFE7D9] shadow-heritage mb-8">
            <div className="text-center mb-5 pb-3 border-b border-[#EFE7D9]/60">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C49A32]">
                Our Foreign &amp; Domestic Traveler Guarantee
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#F8F5EF]/60 hover:bg-[#F8F5EF] transition-colors border border-[#EFE7D9]/50">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mb-2.5 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#25231F]">Zero-Commission Guarantee</span>
                <span className="text-[11px] text-[#25231F]/65 mt-0.5">100% No Forced Shopping Stops</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#F8F5EF]/60 hover:bg-[#F8F5EF] transition-colors border border-[#EFE7D9]/50">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mb-2.5 shadow-xs">
                  <UserCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#25231F]">English Chauffeurs</span>
                <span className="text-[11px] text-[#25231F]/65 mt-0.5">Courteous, Punctual &amp; Licensed</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#F8F5EF]/60 hover:bg-[#F8F5EF] transition-colors border border-[#EFE7D9]/50">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mb-2.5 shadow-xs">
                  <Car className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#25231F]">Rear Seatbelts &amp; Dual AC</span>
                <span className="text-[11px] text-[#25231F]/65 mt-0.5">Western Safety Standards</span>
              </div>

              <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#F8F5EF]/60 hover:bg-[#F8F5EF] transition-colors border border-[#EFE7D9]/50">
                <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mb-2.5 shadow-xs">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#25231F]">Mineral Water Included</span>
                <span className="text-[11px] text-[#25231F]/65 mt-0.5">Complimentary on all Transfers</span>
              </div>
            </div>
          </div>

          {/* 100% Transparent All-Inclusive Itemized Pricing & License Credentials Charter */}
          <div className="bg-gradient-to-br from-[#25231F] via-[#2D2924] to-[#1E1C19] text-white rounded-3xl p-6 sm:p-9 mb-12 shadow-2xl border border-[#C49A32]/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49A32]/10 blur-3xl pointer-events-none rounded-full" />
            
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-white/10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#DFBA5A]/30 text-[#DFBA5A] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5 text-[#DFBA5A]" />
                    <span>Official Verified Rates • Zero Hidden Surcharges</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-black text-white leading-tight">
                    100% Transparent All-Inclusive Pricing
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    Fixed door-to-door fares for Udaipur ⇄ Chittorgarh transfers &amp; licensed monument guiding.
                  </p>
                </div>
                <div className="self-start sm:self-center shrink-0">
                  <span className="inline-block bg-[#C49A32] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                    Guaranteed Rates
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6">
                {/* 1. Sedan */}
                <div className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#DFBA5A]/50 rounded-2xl p-5 backdrop-blur-sm transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2.5 py-1 rounded-md">
                        1 - 4 Guests
                      </span>
                      <Car className="w-4 h-4 text-[#DFBA5A]" />
                    </div>
                    <span className="text-sm font-bold text-white/90 block">
                      Private AC Sedan (Dzire / Etios)
                    </span>
                    <div className="mt-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-black text-white">₹3,500</span>
                      <span className="text-xs font-bold text-[#DFBA5A] block mt-0.5">
                        (~$42 USD / €39 EUR)
                      </span>
                    </div>
                    <p className="text-xs text-white/65 mt-2">
                      Full Day Udaipur ⇄ Fort Roundtrip with hotel pickup &amp; drop.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Tolls, Parking &amp; AC Included
                  </div>
                </div>

                {/* 2. SUV */}
                <div className="bg-white/5 hover:bg-white/10 border-2 border-[#C49A32]/60 hover:border-[#C49A32] rounded-2xl p-5 backdrop-blur-sm transition-all group flex flex-col justify-between relative">
                  <span className="absolute -top-3 right-4 bg-[#C49A32] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">
                    Most Popular
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFBA5A] bg-[#C49A32]/20 px-2.5 py-1 rounded-md">
                        5 - 7 Guests
                      </span>
                      <ShieldCheck className="w-4 h-4 text-[#DFBA5A]" />
                    </div>
                    <span className="text-sm font-bold text-white/90 block">
                      Luxury AC SUV (Innova Crysta)
                    </span>
                    <div className="mt-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-black text-white">₹5,500</span>
                      <span className="text-xs font-bold text-[#DFBA5A] block mt-0.5">
                        (~$65 USD / €60 EUR)
                      </span>
                    </div>
                    <p className="text-xs text-white/65 mt-2">
                      Maximum highway comfort, dual-AC &amp; spacious luggage room.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Working Rear Seatbelts Included
                  </div>
                </div>

                {/* 3. Guide */}
                <div className="bg-white/5 hover:bg-white/10 border border-white/15 hover:border-[#DFBA5A]/50 rounded-2xl p-5 backdrop-blur-sm transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 bg-white/10 px-2.5 py-1 rounded-md">
                        Half Day / 4 Hrs
                      </span>
                      <Compass className="w-4 h-4 text-[#DFBA5A]" />
                    </div>
                    <span className="text-sm font-bold text-white/90 block">
                      Official RTDC Licensed Guide
                    </span>
                    <div className="mt-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-black text-white">₹1,500</span>
                      <span className="text-xs font-bold text-[#DFBA5A] block mt-0.5">
                        (~$18 USD / €16 EUR)
                      </span>
                    </div>
                    <p className="text-xs text-white/65 mt-2">
                      Authorized Mewari historian fluent in English, Hindi &amp; Mewari.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-white/10 text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Govt. Photo ID Badge Verified
                  </div>
                </div>
              </div>

              {/* Inclusions & Credentials Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-emerald-400 block font-bold mb-1">
                      100% All-Inclusive Cover:
                    </strong>
                    <span className="text-emerald-100/80 leading-relaxed">
                      Toll Taxes (NH27 Highway), Monument Parking Fees, Vehicle Fuel, Chauffeur Allowance, Fort Internal Movement, Zero Forced Shopping &amp; Complimentary Hotel/Airport Doorstep Pickup &amp; Drop.
                    </span>
                  </div>
                </div>

                <div className="bg-amber-950/40 border border-[#C49A32]/40 rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#C49A32]/20 text-[#DFBA5A] flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-[#DFBA5A] block font-bold mb-1">
                      Official Guide Credentials:
                    </strong>
                    <span className="text-amber-100/80 leading-relaxed">
                      Rajasthan Tourism (RTDC) &amp; Ministry of Tourism (Govt. of India) Approved Regional Level Tourist Guides with official government registration and verified badges.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Vehicle Fleet Cards with Authentic Photos & Starting Rates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* 1. Sedan */}
            {taxiT.sedan && (
              <div className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all flex flex-col justify-between group">
                <div>
                  {/* Vehicle Image Container */}
                  <div className="h-44 sm:h-48 relative overflow-hidden bg-gradient-to-br from-[#F8F5EF] to-[#EFE7D9]">
                    <img
                      src="/assets/images/sedan_taxi.webp"
                      alt="Prime Sedan Swift Dzire or Etios"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-[#25231F]/85 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {taxiT.sedan.capacity}
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-white/90 backdrop-blur-md text-[#25231F] text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      ★ 4.9 (140+ Trips)
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Price Pill */}
                    {taxiT.sedan.price && (
                      <div className="mb-3">
                        <span className="inline-block text-xs font-black text-[#A65F3D] bg-[#F8F5EF] px-3 py-1.5 rounded-lg border border-[#EFE7D9]">
                          {taxiT.sedan.price}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-1">
                      {taxiT.sedan.name}
                    </h3>
                    {taxiT.sedan.priceSub && (
                      <p className="text-[11px] text-[#A65F3D] font-semibold mb-3">
                        {taxiT.sedan.priceSub}
                      </p>
                    )}
                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-5">
                      {taxiT.sedan.desc}
                    </p>

                    <div className="pt-4 border-t border-[#EFE7D9]/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] block mb-2">
                        Included In Your Ride:
                      </span>
                      <ul className="text-xs text-[#25231F]/80 space-y-2">
                        {(taxiT.sedan.features || []).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      triggerPlanTrip({
                        itemName: 'Prime Sedan Taxi (Dzire / Etios)',
                        category: 'Taxi',
                      })
                    }
                    className="w-full py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm min-h-[46px] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>{taxiT.sedan.btn || 'Book Sedan'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. SUV (Innova Crysta) */}
            {taxiT.suv && (
              <div className="bg-white rounded-3xl border-2 border-[#C49A32] overflow-hidden shadow-heritage hover:-translate-y-1 transition-all flex flex-col justify-between relative group">
                <span className="absolute top-3 right-3 z-10 bg-[#C49A32] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  {taxiT.suv.badge || 'Foreign Guests Favorite'}
                </span>

                <div>
                  {/* Vehicle Image Container */}
                  <div className="h-44 sm:h-48 relative overflow-hidden bg-gradient-to-br from-[#F8F5EF] to-[#EFE7D9]">
                    <img
                      src="/assets/images/suv_taxi.webp"
                      alt="Royal SUV Innova Crysta"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-[#A65F3D] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {taxiT.suv.capacity}
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-white/90 backdrop-blur-md text-[#25231F] text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      ★ 4.9 (220+ Trips)
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Price Pill */}
                    {taxiT.suv.price && (
                      <div className="mb-3">
                        <span className="inline-block text-xs font-black text-[#A65F3D] bg-[#F8F5EF] px-3 py-1.5 rounded-lg border border-[#C49A32]/40 shadow-xs">
                          {taxiT.suv.price}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-1">
                      {taxiT.suv.name}
                    </h3>
                    {taxiT.suv.priceSub && (
                      <p className="text-[11px] text-[#A65F3D] font-semibold mb-3">
                        {taxiT.suv.priceSub}
                      </p>
                    )}
                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-5">
                      {taxiT.suv.desc}
                    </p>

                    <div className="pt-4 border-t border-[#EFE7D9]/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] block mb-2">
                        Included In Your Ride:
                      </span>
                      <ul className="text-xs text-[#25231F]/80 space-y-2">
                        {(taxiT.suv.features || []).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      triggerPlanTrip({
                        itemName: 'Royal SUV Taxi (Innova Crysta)',
                        category: 'Taxi',
                      })
                    }
                    className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md min-h-[46px] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>{taxiT.suv.btn || 'Book SUV'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. Tempo Traveller */}
            {taxiT.tempo && (
              <div className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all flex flex-col justify-between group">
                <div>
                  {/* Vehicle Image Container */}
                  <div className="h-44 sm:h-48 relative overflow-hidden bg-gradient-to-br from-[#F8F5EF] to-[#EFE7D9]">
                    <img
                      src="/assets/images/tempo_traveller.webp"
                      alt="Luxury Tempo Traveller"
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <span className="absolute top-3 left-3 bg-[#526B50] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {taxiT.tempo.capacity}
                    </span>
                    <span className="absolute bottom-2.5 right-3 bg-white/90 backdrop-blur-md text-[#25231F] text-[10px] font-bold px-2.5 py-0.5 rounded-md shadow-xs">
                      ★ 4.9 (95+ Trips)
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Price Pill */}
                    {taxiT.tempo.price && (
                      <div className="mb-3">
                        <span className="inline-block text-xs font-black text-[#526B50] bg-[#F8F5EF] px-3 py-1.5 rounded-lg border border-[#EFE7D9]">
                          {taxiT.tempo.price}
                        </span>
                      </div>
                    )}

                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-1">
                      {taxiT.tempo.name}
                    </h3>
                    {taxiT.tempo.priceSub && (
                      <p className="text-[11px] text-[#526B50] font-semibold mb-3">
                        {taxiT.tempo.priceSub}
                      </p>
                    )}
                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-5">
                      {taxiT.tempo.desc}
                    </p>

                    <div className="pt-4 border-t border-[#EFE7D9]/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] block mb-2">
                        Included In Your Ride:
                      </span>
                      <ul className="text-xs text-[#25231F]/80 space-y-2">
                        {(taxiT.tempo.features || []).map((f, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() =>
                      triggerPlanTrip({
                        itemName: 'Luxury Tempo Traveller (Group)',
                        category: 'Taxi',
                      })
                    }
                    className="w-full py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm min-h-[46px] flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>{taxiT.tempo.btn || 'Book Tempo Traveller'}</span>
                  </button>
                </div>
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

      {/* SECTION 8: Essential Foreign & Domestic Traveler FAQs */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
            Foreign &amp; Domestic Traveler Assistance
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-black text-[#25231F]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-2">
            Essential facts on international credit card ticketing, luggage storage, safety standards &amp; day trips.
          </p>
        </div>

        <div className="space-y-3.5">
          {HOME_FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#EFE7D9] overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-[#F8F5EF]/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#F8F5EF] px-2.5 py-1 rounded-md border border-[#EFE7D9] shrink-0">
                      {faq.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-[#25231F]">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C49A32] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[#EFE7D9]/60 mt-1">
                    <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed pt-3">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#25231F] to-[#3B3731] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-heritage">
          <div>
            <h4 className="text-sm font-bold font-serif text-[#DFBA5A]">
              Have a Specific Travel Query or Custom Requirement?
            </h4>
            <p className="text-xs text-white/70 mt-0.5">
              Chat directly with our Mewar Travel Desk on WhatsApp for fast answers within 5 minutes.
            </p>
          </div>
          <a
            href={VERIFIED_WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('home_faq_banner')}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shrink-0 transition-all shadow-sm flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Chat On WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
