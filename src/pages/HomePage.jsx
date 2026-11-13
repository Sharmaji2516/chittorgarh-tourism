import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import {
  ShieldCheck, Compass, MessageCircle, Phone, Award, Star, ArrowRight,
  Clock, MapPin, CheckCircle2, Car, Users, Calendar, Utensils, Hotel,
  Camera, Landmark, Sparkles, ChevronRight, ExternalLink, HeartHandshake, Eye, Globe, Train
} from 'lucide-react';

import Hero from '../components/Hero';
import SEOHead from '../components/SEOHead';
import { blogPosts } from '../data/blogData';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in";

const HOME_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Visit Chittorgarh",
    "url": "https://www.visitchittorgarh.in/",
    "logo": "https://www.visitchittorgarh.in/chittorgarh-tourism-logo.png",
    "email": "visitchittorgarh@gmail.com",
    "telephone": "+91-7597451057",
    "sameAs": [
      "https://www.instagram.com/visitchittorgarh",
      "https://www.facebook.com/visitchittorgarh",
      "https://www.youtube.com/@visitchittorgarh"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Visit Chittorgarh",
    "url": "https://www.visitchittorgarh.in/"
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Chittorgarh Fort & Heritage City",
    "description": "UNESCO World Heritage Site in Rajasthan, India. Home to the legendary Chittorgarh Fort, Vijay Stambha, and rich Rajputana heritage.",
    "url": "https://www.visitchittorgarh.in/",
    "image": "https://www.visitchittorgarh.in/Fort.webp",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.8887",
      "longitude": "74.6269"
    },
    "touristType": ["Heritage Tourist", "Cultural Tourist", "Pilgrimage Tourist", "Family Traveler"]
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Visit Chittorgarh",
    "image": "https://www.visitchittorgarh.in/Fort.webp",
    "url": "https://www.visitchittorgarh.in/",
    "telephone": "+91-7597451057",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chittaurgarh",
      "addressRegion": "Rajasthan",
      "postalCode": "312021",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.8887",
      "longitude": "74.6269"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    }
  }
];

const HomePage = () => {
  const [quickService, setQuickService] = useState('Fort Guided Tour');
  const [quickDate, setQuickDate] = useState('');
  const [quickTravelers, setQuickTravelers] = useState('2');

  const triggerPlanTrip = (focusedDetail = null) => {
    if (focusedDetail && focusedDetail.itemName) {
      window.dispatchEvent(new CustomEvent('openTripPlannerModal', {
        detail: {
          mode: 'focused',
          itemName: focusedDetail.itemName,
          itemDuration: focusedDetail.itemDuration || '',
          category: focusedDetail.category || 'Package',
        }
      }));
    } else {
      window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    }
  };

  const handleQuickInquiry = (e) => {
    e.preventDefault();
    const msg = `🏰 *Quick Tour Inquiry — visitchittorgarh.in*\n\n` +
      `🛡️ *Service:* ${quickService}\n` +
      `📅 *Date:* ${quickDate || 'Flexible / Upcoming'}\n` +
      `👥 *Travelers:* ${quickTravelers}\n\n` +
      `Please share availability and customized quotation!`;
    trackWhatsAppClick('homepage_quick_bar', quickService);
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Top Attractions Data (Verified Authentic)
  const topAttractions = [
    {
      id: 1,
      name: "Vijay Stambha (Tower of Victory)",
      desc: "Architectural triumph built by Maharana Kumbha in 1448. Standing 37.2m tall with 9 stories of intricate Hindu pantheon carvings.",
      bestTime: "Morning (8:30 AM - 11 AM)",
      image: "/assets/images/vijay-stambh-new.webp",
      badge: "Icon of Mewar"
    },
    {
      id: 2,
      name: "Padmini Palace & Water Pavilion",
      desc: "Scenic palace surrounded by lotus water tanks, renowned in Mewari history as the residence of the courageous Queen Rani Padmini.",
      bestTime: "Afternoon (3 PM - 5:30 PM)",
      image: "/assets/images/padmini-palace-new.webp",
      badge: "Historical Legend"
    },
    {
      id: 3,
      name: "Gaumukh Sacred Reservoir",
      desc: "Sacred perennial natural spring flowing from a carved rock cow-mouth into a stepped green pool nestled below the cliff.",
      bestTime: "Early Morning Sunrise",
      image: "/assets/images/gaumukh-reservoir4.webp",
      badge: "Sacred Water"
    },
    {
      id: 4,
      name: "Rana Kumbha Palace",
      desc: "The largest and oldest palace structure in the fort, featuring royal darbar halls, Zenana courtyards, and ancient elephant stables.",
      bestTime: "Morning & Sunset",
      image: "/assets/images/kumbha-palace-new.webp",
      badge: "Royal Citadel"
    },
    {
      id: 5,
      name: "Kirti Stambh (Tower of Fame)",
      desc: "Exquisite 12th-century 22-meter Solanki-style Jain tower dedicated to Bhagwan Adinath, adorned with detailed tirthankara sculptures.",
      bestTime: "All Day",
      image: "/assets/images/Kirti Stambh.webp",
      badge: "12th Century Jain Art"
    },
    {
      id: 6,
      name: "Shri Sanwariya Seth Temple",
      desc: "Celebrated Lord Krishna pilgrimage located 40 km from Chittorgarh in Mandaphiya, renowned for devotion and grand pink sandstone architecture.",
      bestTime: "Morning Aarti (5 AM) or Sandhya (7 PM)",
      image: "/assets/images/Sanvliya-ji-Temple.webp",
      badge: "Divine Pilgrimage"
    }
  ];

  // Tour Packages Data
  const curatedPackages = [
    {
      id: 'half-day-fort',
      title: "Chittorgarh Fort Guided Express Tour",
      duration: "4 - 5 Hours",
      idealFor: "Travelers on day trips or train layovers",
      features: ["Authorized English/Hindi Historian", "All 7 Fort Gates & Pols", "Vijay Stambha & Padmini Palace", "Comfortable Fort Circuit Cab"],
      priceNote: "Customized quote based on group size",
      image: "/assets/images/chittorgarh-fort-new.webp"
    },
    {
      id: 'full-day-royal',
      title: "Full-Day Royal Mewar Heritage Experience",
      duration: "8 - 10 Hours",
      idealFor: "Families & culture enthusiasts",
      features: ["Certified Master Tour Guide", "All Fort Monuments & Museums", "Authentic Dal Baati Churma Lunch", "Fort Evening Light & Sound Show"],
      priceNote: "Most Popular Heritage Experience",
      image: "/Fort.webp"
    },
    {
      id: 'spiritual-circuit',
      title: "Sanwaliya Seth & Divine Chittor Circuit",
      duration: "Full Day (9 Hours)",
      idealFor: "Pilgrims & spiritual travelers",
      features: ["Sanwariya Seth VIP Darshan Assistance", "Kalika Mata & Meera Temple", "Private Sanitized AC Cab Transfer", "Chawand / Matrikundia Option"],
      priceNote: "Udaipur / Chittorgarh Hotel Pickup",
      image: "/assets/images/spiritual-tour.webp"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Dr. Arvind S. Kulkarni",
      origin: "Pune, Maharashtra",
      text: "Our guide was extraordinary. He explained the siege of 1303 and the architectural symmetry of Vijay Stambha with deep historical reverence. The cab was spotless.",
      service: "Full Day Fort Guided Tour"
    },
    {
      name: "Elena & Marcus Vance",
      origin: "Melbourne, Australia",
      text: "Visit Chittorgarh made our excursion from Udaipur effortless. Transparent WhatsApp coordination, polite driver, and a historian who brought the citadel to life.",
      service: "Udaipur to Chittorgarh Private Transfer"
    },
    {
      name: "Radhika Singhania",
      origin: "New Delhi",
      text: "The Dal Baati recommendation was outstanding, and having our guide navigate the 700-acre fort saved us hours of confusion. Pure Mewari hospitality!",
      service: "2-Day Weekend Heritage Tour"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] overflow-x-hidden selection:bg-[#C49A32] selection:text-white pb-24 md:pb-0">
      <SEOHead
        title="Visit Chittorgarh | Official Tourism Guide, Fort Tours & Private Taxi"
        description="Plan your visit to Chittorgarh Fort, India's largest citadel. Book authorized Mewari guides, sanitized private cabs, heritage stays & authentic Rajasthani dining."
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
            Flexible Heritage Concierge
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-black text-[#25231F] mt-2">
            Chahe Pehle Se Plan Karein Ya Station Par Utar Kar — We've Got You Covered!
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Ghar Baithe Full Trip Planning */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#C49A32]/40 p-6 sm:p-8 shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between relative group">
            <span className="self-start bg-[#C49A32] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm mb-4">
              RECOMMENDED FOR BEST EXPERIENCE
            </span>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                🏡 Ghar Baithe Tension-Free Trip Customize Karein
              </h3>

              <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-[#25231F]/80 mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🛋️</span>
                  <div>
                    <strong className="text-[#25231F] block">End-to-End Itinerary:</strong>
                    <span>Chittorgarh Fort + Sanwaliya Seth + Menal Waterfall ka customized schedule.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🚗</span>
                  <div>
                    <strong className="text-[#25231F] block">Confirmed Cab &amp; Hotel:</strong>
                    <span>Railway Station/Airport pickup ke saath pre-verified heritage stays.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">📜</span>
                  <div>
                    <strong className="text-[#25231F] block">Govt. Approved Historian:</strong>
                    <span>Prior-booked verified Mewari guide jo pura killa aaram se ghumaye.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">💰</span>
                  <div>
                    <strong className="text-[#25231F] block">Zero Surprise Charges:</strong>
                    <span>Pehle se transparent quotation aur customized package WhatsApp par.</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => triggerPlanTrip({ itemName: 'Ghar Baithe Full Trip Planning', category: 'Advance Tour' })}
              className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 min-h-[46px]"
            >
              <Compass className="w-4 h-4" />
              Plan Full Trip From Home (WhatsApp)
            </button>
          </div>

          {/* Card 2: Chittorgarh Pahuch Chuke Hain? */}
          <div className="bg-gradient-to-br from-[#25231F] via-[#2F2C27] to-[#1C1A17] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-heritage flex flex-col justify-between relative group border border-emerald-500/30">
            <span className="self-start bg-emerald-600 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm mb-4 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
              INSTANT 15-MINUTE ASSISTANCE
            </span>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4 flex items-center gap-2">
                ⚡ Already in Chittorgarh? Instant Guide &amp; Taxi Ready!
              </h3>

              <div className="space-y-3 sm:space-y-3.5 text-xs sm:text-sm text-[#F8F5EF]/85 mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">⏱️</span>
                  <div>
                    <strong className="text-white block">15–20 Mins Dispatch:</strong>
                    <span>Railway Station, Bus Stand ya Hotel se immediate AC cab pickup.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🛡️</span>
                  <div>
                    <strong className="text-white block">No Fort Tout Trap:</strong>
                    <span>Gate ke anjaan dalaalo aur fake gemstone sellers se 100% suraksha.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">🎟️</span>
                  <div>
                    <strong className="text-white block">Direct Fort Entry Assistance:</strong>
                    <span>Sound &amp; Light show aur entry ticketing guidance on the spot.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="text-base shrink-0">📞</span>
                  <div>
                    <strong className="text-white block">1-Tap Direct Call / WhatsApp:</strong>
                    <span>Turant live desk se baat karke taxi/guide arrange karwayein.</span>
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
                Call Concierge Desk
              </a>
              <a
                href="https://wa.me/917597451057?text=Namaste!%20I%20am%20inquiring%20about%20Chittorgarh%20Fort%20Tour%20and%20Taxi%20from%20VisitChittorgarh.in"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('instant_card_wa')}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                Instant WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Why Visit Chittorgarh */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
            The Mewar Legacy
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F]">
            Why Visit Chittorgarh?
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-3 leading-relaxed">
            Chittorgarh is not merely a destination on a map — it is the soul of Rajput pride, an expansive 700-acre open-air museum where history was written in sacrifice and valor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center mb-5 text-[#C49A32] group-hover:scale-110 transition-transform">
              <Landmark className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">Largest Fort in India</h3>
            <p className="text-xs text-[#25231F]/70 leading-relaxed">
              Spanning over 700 acres atop a 180-meter hill with 65 historic monuments, 4 grand palace complexes, and 22 surviving water reservoirs.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-[#A65F3D]/10 border border-[#A65F3D]/25 flex items-center justify-center mb-5 text-[#A65F3D] group-hover:scale-110 transition-transform">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">UNESCO World Heritage</h3>
            <p className="text-xs text-[#25231F]/70 leading-relaxed">
              Inscribed in 2013 among Rajasthan's Hill Forts for its exceptional Rajput military architecture and cultural value to human civilization.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-[#526B50]/10 border border-[#526B50]/25 flex items-center justify-center mb-5 text-[#526B50] group-hover:scale-110 transition-transform">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">Three Historic Sieges</h3>
            <p className="text-xs text-[#25231F]/70 leading-relaxed">
              Witness the sacred sites of the historic 1303, 1535, and 1568 sieges, where Maharana Pratap's ancestors defended Mewari freedom.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center mb-5 text-[#C49A32] group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">Authentic Mewar Flavors</h3>
            <p className="text-xs text-[#25231F]/70 leading-relaxed">
              Relish traditional Dal Baati Churma cooked in pure desi ghee, explore Daabu block print artisans, and experience heartfelt local hospitality.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: Popular Attractions */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/50 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-white/70 px-3.5 py-1 rounded-full border border-[#EFE7D9]">
              Citadel Monuments &amp; Sacred Sites
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2.5">
              Popular Attractions
            </h2>
            <NavLink
              to="/attractions"
              className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A65F3D] hover:text-[#25231F] transition-colors"
            >
              Explore All 15+ Monuments <ArrowRight className="w-4 h-4" />
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
                      <span>Best Time: {att.bestTime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between text-xs mt-4">
                  <NavLink
                    to="/attractions"
                    className="font-bold text-[#C49A32] hover:text-[#A65F3D] transition-colors flex items-center gap-1"
                  >
                    View Details <ChevronRight className="w-4 h-4" />
                  </NavLink>
                  <button
                    onClick={triggerPlanTrip}
                    className="text-[11px] font-bold text-[#25231F] bg-[#F8F5EF] hover:bg-[#EFE7D9] px-3 py-1.5 rounded-lg border border-[#EFE7D9] transition-colors"
                  >
                    Inquire Guide
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
                Authorized Mewari Historians
              </span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Rajasthan Government Approved Guide
              </span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
              Private Tour Guide in Chittorgarh
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed max-w-2xl mx-auto">
              Don't just look at stones — experience the living saga of Rajasthan. Our certified local guides are passionate historians who bring the architecture, legends of Padmini, and heroism of Maharana Kumbha to life at your own pace.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2 text-left w-full max-w-2xl">
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85 bg-white/70 p-2.5 rounded-xl border border-[#EFE7D9]/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Govt. Certified & Verified Historians (Hindi & English)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85 bg-white/70 p-2.5 rounded-xl border border-[#EFE7D9]/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Flexible Pace across the 700-acre fort</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85 bg-white/70 p-2.5 rounded-xl border border-[#EFE7D9]/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Family & Senior Citizen Friendly vehicle drop points</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85 bg-white/70 p-2.5 rounded-xl border border-[#EFE7D9]/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protection from tout traps & unverified vendors</span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row justify-center gap-3 w-full sm:w-auto">
              <NavLink
                to="/service/guide"
                className="px-7 py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md transition-all text-center min-h-[46px] flex items-center justify-center"
              >
                Learn Guide Details
              </NavLink>
              <button
                onClick={() => triggerPlanTrip({ itemName: 'Private Licensed Tour Guide', category: 'Guide' })}
                className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white text-xs font-bold uppercase tracking-wider rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 min-h-[46px]"
              >
                <Compass className="w-4 h-4" />
                Book Private Guide
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
              Sanitized AC Fleet & Transfers
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2">
              Private Taxi & Cab Service
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/70 mt-3 leading-relaxed">
              Safe, sanitized private transfers with experienced local chauffeurs. Pickup from Udaipur Airport, Chittorgarh Railway Station, or your hotel doorstep.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Sedan */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-5 sm:p-6 shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                  1 - 4 Passengers
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mt-2 mb-2">Prime Sedan (Dzire / Etios)</h3>
                <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                  Perfect for couples and small families. Air-conditioned, spacious boot space for luggage, and polite uniformed chauffeur.
                </p>
                <ul className="text-xs text-[#25231F]/80 space-y-1.5 mb-6">
                  <li>• Fort Circuit Sightseeing</li>
                  <li>• Udaipur Airport Pickup / Drop</li>
                  <li>• Sanwaliya Ji Temple Transfer</li>
                </ul>
              </div>
              <button
                onClick={() => triggerPlanTrip({ itemName: 'Prime Sedan Taxi (Dzire / Etios)', category: 'Taxi' })}
                className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px]"
              >
                Book Sedan
              </button>
            </div>

            {/* SUV */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border-2 border-[#C49A32] p-5 sm:p-6 shadow-heritage transition-all flex flex-col justify-between relative">
              <span className="absolute -top-3.5 right-6 bg-[#C49A32] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                  5 - 7 Passengers
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mt-2 mb-2">Royal SUV (Innova / Ertiga)</h3>
                <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                  High seating for scenic highway vistas. Maximum comfort for multi-generation family road trips across Rajasthan.
                </p>
                <ul className="text-xs text-[#25231F]/80 space-y-1.5 mb-6">
                  <li>• Complete Fort + Menal Waterfall</li>
                  <li>• Udaipur - Chittorgarh - Jaipur Corridor</li>
                  <li>• Dual AC with extra luggage room</li>
                </ul>
              </div>
              <button
                onClick={() => triggerPlanTrip({ itemName: 'Royal SUV Taxi (Innova / Ertiga)', category: 'Taxi' })}
                className="w-full py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm min-h-[44px]"
              >
                Book SUV
              </button>
            </div>

            {/* Tempo Traveller */}
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-5 sm:p-6 shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#526B50] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                  9 - 16 Passengers
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mt-2 mb-2">Luxury Tempo Traveller</h3>
                <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">
                  Engineered for group tours, corporate excursions, and pilgrimage groups visiting Sanwariya Seth and Chittorgarh.
                </p>
                <ul className="text-xs text-[#25231F]/80 space-y-1.5 mb-6">
                  <li>• Reclining push-back seats</li>
                  <li>• Dedicated group luggage carrier</li>
                  <li>• Experienced highway drivers</li>
                </ul>
              </div>
              <button
                onClick={() => triggerPlanTrip({ itemName: 'Luxury Tempo Traveller (Group)', category: 'Taxi' })}
                className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[44px]"
              >
                Book Tempo Traveller
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Guest Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/50 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
              Verified Traveler Experiences
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-black text-[#25231F] mt-2">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-[#C49A32] text-sm mb-3 sm:mb-4">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs sm:text-sm text-[#25231F]/80 italic leading-relaxed mb-4 sm:mb-6 font-serif">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#EFE7D9] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#25231F]">{t.name}</h4>
                    <span className="text-[11px] text-[#25231F]/60">{t.origin}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#A65F3D] bg-[#F8F5EF] px-2.5 py-1 rounded-md border border-[#EFE7D9]">
                    {t.service}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 14: Strong Contact & Footer Section is rendered globally via Footer.jsx */}
    </div>
  );
};

export default HomePage;
