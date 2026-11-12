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

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20would%20like%20to%20plan%20a%20tour%20in%20Chittorgarh.%20Please%20share%20details.";

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

      {/* SECTION 2: Quick Tour Planning / Inquiry Section (Interactive Bar) */}
      <section className="relative z-20 -mt-6 sm:-mt-14 max-w-6xl mx-auto px-3.5 sm:px-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-heritage border border-[#EFE7D9]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
            <div className="shrink-0 text-center lg:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32]">
                Instant Tour Planner
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F]">
                Quick Trip Inquiry
              </h3>
            </div>

            <form onSubmit={handleQuickInquiry} className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="min-w-0">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#25231F]/70 mb-1">
                  Service Type
                </label>
                <select
                  value={quickService}
                  onChange={(e) => setQuickService(e.target.value)}
                  className="w-full min-w-0 min-h-[44px] px-3.5 py-2.5 bg-[#F8F5EF] border border-[#E4DAC6] rounded-xl text-base sm:text-xs font-medium text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                >
                  <option value="Fort Guided Tour">Private Fort Guide</option>
                  <option value="Private Taxi Service">Private Cab / Taxi</option>
                  <option value="Full Day Package">Full Day Heritage Package</option>
                  <option value="Sanwariya Seth Tour">Sanwariya Seth Darshan</option>
                  <option value="Udaipur Transfer">Udaipur to Chittorgarh Taxi</option>
                </select>
              </div>

              <div className="min-w-0">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#25231F]/70 mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={quickDate}
                  onChange={(e) => setQuickDate(e.target.value)}
                  className="w-full min-w-0 min-h-[44px] px-3.5 py-2.5 bg-[#F8F5EF] border border-[#E4DAC6] rounded-xl text-base sm:text-xs font-medium text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>

              <div className="min-w-0">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#25231F]/70 mb-1">
                  Travelers
                </label>
                <select
                  value={quickTravelers}
                  onChange={(e) => setQuickTravelers(e.target.value)}
                  className="w-full min-w-0 min-h-[44px] px-3.5 py-2.5 bg-[#F8F5EF] border border-[#E4DAC6] rounded-xl text-base sm:text-xs font-medium text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                >
                  <option value="1 Solo">1 Solo Traveler</option>
                  <option value="2 (Couple)">2 Travelers (Couple)</option>
                  <option value="3-4 (Family)">3-4 Travelers (Family)</option>
                  <option value="5-7 (SUV)">5-7 (SUV / Innova)</option>
                  <option value="8+ (Group)">8+ (Group)</option>
                </select>
              </div>

              <div className="sm:col-span-3 flex flex-col sm:flex-row gap-2.5 pt-1 sm:pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 min-h-[46px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Get Instant WhatsApp Quote
                </button>
                <button
                  type="button"
                  onClick={() => triggerPlanTrip(null)}
                  className="px-6 py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors min-h-[46px]"
                >
                  <Compass className="w-4 h-4" />
                  Detailed Trip Planner
                </button>
              </div>
            </form>
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
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
                Citadel Monuments & Sacred Sites
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2">
                Popular Attractions
              </h2>
            </div>
            <NavLink
              to="/attractions"
              className="mt-3 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A65F3D] hover:text-[#25231F] transition-colors"
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
        <div className="bg-gradient-to-br from-white via-[#F8F5EF] to-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-6 sm:p-14 shadow-heritage grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
              Authorized Mewari Historians
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
              Private Tour Guide in Chittorgarh
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed">
              Don't just look at stones — experience the living saga of Rajasthan. Our certified local guides are passionate historians who bring the architecture, legends of Padmini, and heroism of Maharana Kumbha to life at your own pace.
            </p>

            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Govt. Certified & Verified Historians (Fluent in Hindi & English)</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Flexible Pace: Walk the 700-acre fort comfortably without feeling rushed</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Family & Senior Citizen Friendly: Direct vehicle drop points to avoid long walks</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#25231F]/85">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protection from tout traps, unauthorized guides & unverified gemstone sellers</span>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3">
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

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/assets/images/Guide.webp"
                alt="Authorized Tour Guide at Chittorgarh Fort"
                className="w-full h-64 sm:h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#EFE7D9] shadow-xl flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#25231F]/60 block">Verified Badge</span>
                <span className="text-xs font-bold text-[#25231F]">Govt. Recognized Guide</span>
              </div>
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
                <div className="h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-[#F8F5EF]">
                  <img
                    src="/assets/images/sedan_taxi.webp"
                    alt="Sedan Taxi Dzire Chittorgarh"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                <div className="h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-[#F8F5EF]">
                  <img
                    src="/assets/images/suv_taxi.webp"
                    alt="SUV Innova Crysta Chittorgarh"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                <div className="h-40 sm:h-44 rounded-2xl overflow-hidden mb-4 sm:mb-5 bg-[#F8F5EF]">
                  <img
                    src="/assets/images/tempo_traveller.webp"
                    alt="Tempo Traveller Group Chittorgarh"
                    className="w-full h-full object-cover"
                  />
                </div>
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
                Book Tempo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Customized Tour Packages */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
              Hassle-Free Handcrafted Journeys
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2">
              Tour Packages
            </h2>
          </div>
          <NavLink
            to="/royal-journeys"
            className="mt-3 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A65F3D] hover:text-[#25231F] transition-colors"
          >
            Browse All Packages <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {curatedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-48 sm:h-52 relative overflow-hidden bg-[#EFE7D9]">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute bottom-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C49A32]" /> {pkg.duration}
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] block mb-1">
                    {pkg.idealFor}
                  </span>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] mb-3">
                    {pkg.title}
                  </h3>

                  <ul className="space-y-2 text-xs text-[#25231F]/80 mb-5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between">
                <span className="text-[11px] text-[#25231F]/60 font-medium">{pkg.priceNote}</span>
                <button
                  onClick={() => triggerPlanTrip({ itemName: pkg.title, itemDuration: pkg.duration, category: 'Package' })}
                  className="px-4 py-2 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors min-h-[40px]"
                >
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8: Heritage Hotels & Accommodation */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/40 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
                Royal Comfort & Fort Views
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
                Heritage Stays & Boutique Haveli Hotels
              </h2>
              <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed">
                Awaken to views of the illuminated fortress walls. We connect you directly with hand-picked heritage properties, royal havelis, and boutique luxury resorts in Chittorgarh.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs text-[#25231F]/80">
                <div className="p-4 bg-white rounded-2xl border border-[#EFE7D9]">
                  <strong className="block text-sm text-[#25231F] font-serif mb-1">Fort-View Havelis</strong>
                  Boutique heritage courtyards with rooftop dining overlooking Vijay Stambha.
                </div>
                <div className="p-4 bg-white rounded-2xl border border-[#EFE7D9]">
                  <strong className="block text-sm text-[#25231F] font-serif mb-1">Luxury Resorts</strong>
                  Spacious family suites with royal gardens, pools, and authentic Mewari thali service.
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <NavLink
                  to="/stays"
                  className="px-7 py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors text-center min-h-[46px] flex items-center justify-center"
                >
                  Explore Verified Stays
                </NavLink>
                <button
                  onClick={() => triggerPlanTrip({ itemName: 'Heritage Hotel & Haveli Stay Inquiry', category: 'Stay' })}
                  className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors min-h-[46px]"
                >
                  Inquire Stay Deals
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/assets/images/Royal Stays.webp"
                  alt="Heritage Hotel Room in Chittorgarh"
                  className="w-full h-64 sm:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Traditional Mewari Food & Dining */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#EFE7D9] h-40 sm:h-60">
                <img
                  src="/assets/images/dal-batti-churma-new.webp"
                  alt="Authentic Dal Baati Churma Chittorgarh"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#EFE7D9] h-40 sm:h-60 mt-4 sm:mt-6">
                <img
                  src="/assets/images/Dinning Hall.webp"
                  alt="Mewari Heritage Dining Hall"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4 sm:space-y-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
              Culinary Heritage of Mewar
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] leading-tight">
              Traditional Mewari Dining & Dal Baati
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed">
              No journey to Chittorgarh is complete without tasting royal Mewari cuisine. Prepared with pure desi ghee, hand-ground spices, and generational culinary techniques.
            </p>

            <ul className="space-y-3 text-xs text-[#25231F]/80">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32] mt-1.5"></span>
                <span><strong>Dal Baati Churma:</strong> Clay-roasted baati drenched in pure ghee with 5-lentil panchmel dal and sweet cardamom churma.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32] mt-1.5"></span>
                <span><strong>Gatte ki Sabji & Ker Sangri:</strong> Authentic Rajasthani desert beans and steamed gram flour dumplings in spiced curd gravy.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32] mt-1.5"></span>
                <span><strong>Fort Road Sweets:</strong> Famous Chittorgarh gulab jamun and hot mawa kachori.</span>
              </li>
            </ul>

            <div className="pt-2">
              <NavLink
                to="/flavors"
                className="px-7 py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-md transition-colors inline-block"
              >
                Discover Food Directory
              </NavLink>
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

      {/* SECTION 11: Travel Experiences Gallery */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
            Visual Mewar
          </span>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#25231F] mt-2">
            Travel Experiences Gallery
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-3">
            Real photography from the ramparts, water palaces, ancient temples, and lively bazaars of Chittorgarh.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="h-44 sm:h-60 rounded-2xl overflow-hidden shadow-md group relative">
            <img src="/assets/images/vijay-stambh-new.webp" alt="Vijay Stambha Carvings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4 text-white text-xs font-bold">
              Vijay Stambha
            </div>
          </div>
          <div className="h-44 sm:h-60 rounded-2xl overflow-hidden shadow-md group relative">
            <img src="/assets/images/padmini-palace-new.webp" alt="Padmini Palace Lake" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4 text-white text-xs font-bold">
              Padmini Palace
            </div>
          </div>
          <div className="h-44 sm:h-60 rounded-2xl overflow-hidden shadow-md group relative">
            <img src="/assets/images/menal-waterfall-new.webp" alt="Menal Waterfall Canyon" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4 text-white text-xs font-bold">
              Menal Waterfall
            </div>
          </div>
          <div className="h-44 sm:h-60 rounded-2xl overflow-hidden shadow-md group relative">
            <img src="/assets/images/Light-and-sound-show.webp" alt="Fort Light and Sound Show" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4 text-white text-xs font-bold">
              Light & Sound Show
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: Latest Travel Blogs */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#EFE7D9]/40 border-y border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
                Traveler Guides & Insights
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-black text-[#25231F] mt-2">
                Latest Travel Blogs
              </h2>
            </div>
            <NavLink
              to="/blog"
              className="mt-3 md:mt-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A65F3D] hover:text-[#25231F] transition-colors"
            >
              View All 12+ Articles <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <NavLink
                key={post.id}
                to={`/blog/${post.id}`}
                className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 sm:h-48 relative overflow-hidden bg-[#EFE7D9]">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-[#25231F]/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-5 sm:p-6">
                    <span className="text-[11px] text-[#25231F]/60 flex items-center gap-1.5 mb-2">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors leading-snug mb-2 sm:mb-3">
                      {post.title}
                    </h3>
                    <p className="text-xs text-[#25231F]/70 line-clamp-2 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between text-xs">
                  <span className="text-[#25231F]/60 font-medium">{post.date}</span>
                  <span className="font-bold text-[#C49A32] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: Instagram Social Media Gallery */}
      <section className="py-12 sm:py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#EFE7D9] p-6 sm:p-12 shadow-heritage text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] mb-2 block">
            Follow Our Stories
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mb-3">
            @visitchittorgarh on Instagram
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 max-w-lg mx-auto mb-6 sm:mb-8">
            Tag your memories with <span className="font-bold text-[#A65F3D]">#VisitChittorgarh</span> to be featured on our official traveler feed.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <a
              href="https://www.instagram.com/visitchittorgarh"
              target="_blank"
              rel="noopener noreferrer"
              className="h-36 sm:h-52 rounded-2xl overflow-hidden shadow-sm hover:opacity-90 transition-opacity block group relative"
            >
              <img src="/assets/images/vijay-stambh-new.webp" alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                View on Instagram ↗
              </div>
            </a>
            <a
              href="https://www.instagram.com/visitchittorgarh"
              target="_blank"
              rel="noopener noreferrer"
              className="h-36 sm:h-52 rounded-2xl overflow-hidden shadow-sm hover:opacity-90 transition-opacity block group relative"
            >
              <img src="/assets/images/Sanvliya-ji-Temple.webp" alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                View on Instagram ↗
              </div>
            </a>
            <a
              href="https://www.instagram.com/visitchittorgarh"
              target="_blank"
              rel="noopener noreferrer"
              className="h-36 sm:h-52 rounded-2xl overflow-hidden shadow-sm hover:opacity-90 transition-opacity block group relative"
            >
              <img src="/assets/images/dal-batti-churma-new.webp" alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                View on Instagram ↗
              </div>
            </a>
            <a
              href="https://www.instagram.com/visitchittorgarh"
              target="_blank"
              rel="noopener noreferrer"
              className="h-36 sm:h-52 rounded-2xl overflow-hidden shadow-sm hover:opacity-90 transition-opacity block group relative"
            >
              <img src="/assets/images/Horse Photography.webp" alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                View on Instagram ↗
              </div>
            </a>
          </div>

          <a
            href="https://www.instagram.com/visitchittorgarh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm min-h-[44px]"
          >
            Follow on Instagram <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* SECTION 13B: India & Global Routes, States, Monuments & Tour Guides Hub */}
      <section className="py-12 sm:py-16 bg-[#EFE7D9]/45 border-t border-[#EFE7D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] block mb-1.5">
                Pan-India &amp; International Travel Hub
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25231F]">
                Plan Your Route to Chittorgarh
              </h2>
              <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1.5 max-w-2xl">
                Explore dedicated travel guides by departure city, state, country, airport, railway station, and fort monument.
              </p>
            </div>
            <NavLink
              to="/destinations-and-routes"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shadow-sm transition-colors shrink-0"
            >
              Browse All 150+ Routes &amp; Guides <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Popular City & Airport Routes */}
            <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
              <h3 className="font-serif font-bold text-base text-[#25231F] mb-3 flex items-center gap-2">
                <Train className="w-4 h-4 text-[#A65F3D]" /> Popular City &amp; Airport Routes
              </h3>
              <ul className="space-y-2 text-xs text-[#25231F]/80">
                <li><NavLink to="/udaipur-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Udaipur to Chittorgarh (112 km)</NavLink></li>
                <li><NavLink to="/udaipur-airport-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Udaipur Airport (UDR) to Fort</NavLink></li>
                <li><NavLink to="/jaipur-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Jaipur to Chittorgarh (315 km)</NavLink></li>
                <li><NavLink to="/ahmedabad-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Ahmedabad to Chittorgarh</NavLink></li>
                <li><NavLink to="/delhi-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Delhi to Chittorgarh (Trains &amp; Air)</NavLink></li>
                <li><NavLink to="/mumbai-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Mumbai to Chittorgarh</NavLink></li>
                <li><NavLink to="/indore-to-chittorgarh" className="hover:text-[#A65F3D] font-medium">→ Indore to Chittorgarh</NavLink></li>
              </ul>
            </div>

            {/* Individual Fort Monuments */}
            <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
              <h3 className="font-serif font-bold text-base text-[#25231F] mb-3 flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#C49A32]" /> Fort Landmarks &amp; Temples
              </h3>
              <ul className="space-y-2 text-xs text-[#25231F]/80">
                <li><NavLink to="/chittorgarh-fort" className="hover:text-[#A65F3D] font-medium">→ Chittorgarh Fort Complete Guide</NavLink></li>
                <li><NavLink to="/vijay-stambh" className="hover:text-[#A65F3D] font-medium">→ Vijay Stambh (Tower of Victory)</NavLink></li>
                <li><NavLink to="/kirti-stambh" className="hover:text-[#A65F3D] font-medium">→ Kirti Stambh (Jain Tower)</NavLink></li>
                <li><NavLink to="/rani-padmini-palace" className="hover:text-[#A65F3D] font-medium">→ Rani Padmini Palace</NavLink></li>
                <li><NavLink to="/rana-kumbha-palace" className="hover:text-[#A65F3D] font-medium">→ Rana Kumbha Palace</NavLink></li>
                <li><NavLink to="/sanwariya-seth-temple" className="hover:text-[#A65F3D] font-medium">→ Shri Sanwariya Seth Temple</NavLink></li>
                <li><NavLink to="/menal-waterfall" className="hover:text-[#A65F3D] font-medium">→ Menal Waterfall &amp; Temples</NavLink></li>
              </ul>
            </div>

            {/* Indian State Guides */}
            <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
              <h3 className="font-serif font-bold text-base text-[#25231F] mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#526B50]" /> Indian State Travel Guides
              </h3>
              <ul className="space-y-2 text-xs text-[#25231F]/80">
                <li><NavLink to="/chittorgarh-tourism-from-gujarat" className="hover:text-[#A65F3D] font-medium">→ Tourism from Gujarat</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-from-maharashtra" className="hover:text-[#A65F3D] font-medium">→ Tourism from Maharashtra</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-from-delhi" className="hover:text-[#A65F3D] font-medium">→ Tourism from Delhi NCR</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-from-madhya-pradesh" className="hover:text-[#A65F3D] font-medium">→ Tourism from Madhya Pradesh</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-from-karnataka" className="hover:text-[#A65F3D] font-medium">→ Tourism from Karnataka</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-from-west-bengal" className="hover:text-[#A65F3D] font-medium">→ Tourism from West Bengal</NavLink></li>
                <li><NavLink to="/destinations-and-routes" className="text-[#A65F3D] font-bold hover:underline">→ View all 21 Indian States</NavLink></li>
              </ul>
            </div>

            {/* International Country Guides & Packages */}
            <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
              <h3 className="font-serif font-bold text-base text-[#25231F] mb-3 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C49A32]" /> International &amp; Packages
              </h3>
              <ul className="space-y-2 text-xs text-[#25231F]/80">
                <li><NavLink to="/chittorgarh-fort-travel-guide-international-tourists" className="hover:text-[#A65F3D] font-medium">→ International Tourists Manual</NavLink></li>
                <li><NavLink to="/visit-chittorgarh-from-usa" className="hover:text-[#A65F3D] font-medium">→ Visit from USA</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-uk-travellers" className="hover:text-[#A65F3D] font-medium">→ UK Travellers Guide</NavLink></li>
                <li><NavLink to="/chittorgarh-tourism-from-australia" className="hover:text-[#A65F3D] font-medium">→ Visit from Australia</NavLink></li>
                <li><NavLink to="/visit-chittorgarh-from-uae" className="hover:text-[#A65F3D] font-medium">→ Visit from UAE (Dubai/Abu Dhabi)</NavLink></li>
                <li><NavLink to="/udaipur-and-chittorgarh-tour-package" className="hover:text-[#A65F3D] font-medium">→ Udaipur &amp; Chittorgarh Package</NavLink></li>
                <li><NavLink to="/destinations-and-routes" className="text-[#A65F3D] font-bold hover:underline">→ View all 27 Countries &amp; Tours</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: Strong Contact & Footer Section is rendered globally via Footer.jsx */}
    </div>
  );
};

export default HomePage;
