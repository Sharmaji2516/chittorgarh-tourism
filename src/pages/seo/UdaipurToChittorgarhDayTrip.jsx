import React from 'react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { ShieldCheck, Compass, MessageCircle, Phone, Clock, MapPin, CheckCircle2, Star, Car, Award, ChevronRight, AlertCircle, DollarSign } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20am%20interested%20in%20the%20Private%20Day%20Trip%20from%20Udaipur%20to%20Chittorgarh%20Fort.%20Please%20share%20availability%20and%20booking%20details.";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far is Chittorgarh Fort from Udaipur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chittorgarh Fort is approximately 112 km (70 miles) northeast of Udaipur. The drive takes around 2 to 2.5 hours via the smooth 4-lane National Highway NH 27."
      }
    },
    {
      "@type": "Question",
      "name": "Can Chittorgarh Fort be visited as a day trip from Udaipur?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, a day trip is the most popular way to visit. Departing Udaipur by 8:00 AM allows you to explore the major palaces, towers, and reservoirs inside the fort before returning by 6:30 PM."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a private car or can I walk inside Chittorgarh Fort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Because Chittorgarh Fort spans over 700 acres and stretches across 5 kilometers from end to end, walking between monuments in the Rajasthan heat is not recommended. Having a private car inside the fort complex is essential."
      }
    },
    {
      "@type": "Question",
      "name": "Is there any forced shopping or commercial stops during the tour?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Visit Chittorgarh has a strict Zero Forced Shopping guarantee. Our chauffeurs and government-approved historians do not take guests to commission-driven gemstone, carpet, or souvenir shops."
      }
    }
  ]
};

const UdaipurToChittorgarhDayTrip = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title="Udaipur to Chittorgarh Day Trip | Private AC Car & Heritage Guide"
        description="Book a hassle-free private day excursion from Udaipur to Chittorgarh Fort. Includes hotel pickup, English-speaking guide, AC sedan/SUV, and flexible timings with zero forced shopping."
        canonical="/udaipur-to-chittorgarh-day-trip"
        ogImage="https://www.visitchittorgarh.in/Fort.webp"
        schema={FAQ_SCHEMA}
      />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-gradient-to-br from-[#312D27] via-[#25231F] to-[#1E1C19] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#C49A32]/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49A32]/15 blur-3xl pointer-events-none rounded-full"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFBA5A] text-xs font-bold uppercase tracking-wider mb-6">
              <Award className="w-4 h-4" />
              <span>#1 Rated Excursion from Udaipur • Foreign Tourist Specialized</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight mb-4">
              Private Day Trip from Udaipur to Chittorgarh Fort
            </h1>

            <p className="text-sm sm:text-base text-[#F8F5EF]/85 leading-relaxed mb-6 font-light">
              Doorstep pickup from your Udaipur hotel (Lake Pichola, Fateh Sagar, or Trident). Travel comfortably via private AC cab on NH 27 with an authorized English-speaking Mewari historian.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs mb-8">
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No Forced Shopping Guarantee
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Licensed English Historian
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Sanitized Commercial Tourist Cab
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('udaipur_day_trip_hero')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Reserve via WhatsApp
              </a>
              <button
                onClick={triggerPlanTrip}
                className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Compass className="w-4 h-4" />
                Custom Itinerary Inquiry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Fixed Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
            All-Inclusive Transparent Fares
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25231F] mt-2">
            Udaipur to Chittorgarh Package Pricing
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-2">
            Includes round-trip private AC transfer, toll taxes, state parking, fuel, driver allowance, and fort circuit drive. No hidden surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sedan Card */}
          <div className="bg-white rounded-3xl border border-[#EFE7D9] p-8 shadow-heritage flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9] px-3 py-1 rounded-md">
                  1 - 3 Guests • Sedan
                </span>
                <span className="text-xs text-[#25231F]/60">Dzire / Etios AC</span>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-black text-[#25231F]">₹5,999</span>
                  <span className="text-xs font-bold text-[#C49A32]">($72 USD / €66 EUR approx.)</span>
                </div>
                <span className="text-xs text-[#25231F]/60">Flat all-inclusive round trip fare</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#25231F]/80 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Udaipur Hotel Doorstep Pickup & Return</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 700-Acre Fort Circuit Vehicle Movement</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> English-Speaking Chauffeur</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Optional Govt. Approved Historian Guide Add-on</li>
              </ul>
            </div>
            <button
              onClick={triggerPlanTrip}
              className="w-full py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Book Sedan Package
            </button>
          </div>

          {/* SUV Card */}
          <div className="bg-white rounded-3xl border-2 border-[#C49A32] p-8 shadow-heritage flex flex-col justify-between relative">
            <span className="absolute -top-3.5 right-6 bg-[#C49A32] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
              Recommended for Families
            </span>
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-3 py-1 rounded-md">
                  4 - 6 Guests • Royal SUV
                </span>
                <span className="text-xs text-[#25231F]/60">Innova / Crysta AC</span>
              </div>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-black text-[#25231F]">₹7,999</span>
                  <span className="text-xs font-bold text-[#C49A32]">($95 USD / €88 EUR approx.)</span>
                </div>
                <span className="text-xs text-[#25231F]/60">Flat all-inclusive round trip fare</span>
              </div>
              <ul className="space-y-2.5 text-xs text-[#25231F]/80 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> High clearance & superior legroom on highway</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Doorstep pickup anywhere in Udaipur region</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dual AC, bottled water & sanitized interiors</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Ample luggage space for bags & strollers</li>
              </ul>
            </div>
            <button
              onClick={triggerPlanTrip}
              className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Book Royal SUV Package
            </button>
          </div>
        </div>
      </section>

      {/* Step-by-Step Curated Itinerary Timeline */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] shadow-heritage">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] block mb-2">
            Timed Day Plan
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mb-8">
            Detailed Itinerary: Udaipur to Chittorgarh & Return
          </h2>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#EFE7D9]">
            <div className="relative pl-10">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#C49A32] border-2 border-white"></div>
              <span className="text-xs font-bold text-[#C49A32] uppercase">08:00 AM — Hotel Pickup in Udaipur</span>
              <p className="text-xs text-[#25231F]/75 mt-1 leading-relaxed">
                Your private chauffeur arrives at your Udaipur hotel/resort (Lake Pichola, Fateh Sagar, or city center). Board your sanitized AC vehicle.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#A65F3D] border-2 border-white"></div>
              <span className="text-xs font-bold text-[#A65F3D] uppercase">10:15 AM — Scenic Highway Drive & Arrival</span>
              <p className="text-xs text-[#25231F]/75 mt-1 leading-relaxed">
                Enjoy the smooth 112 km drive across National Highway NH 27 passing rural Mewari villages and Aravali hillocks. Arrive at the foot of Chittorgarh Fort.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#526B50] border-2 border-white"></div>
              <span className="text-xs font-bold text-[#526B50] uppercase">10:30 AM – 01:30 PM — Guided Citadel Exploration</span>
              <p className="text-xs text-[#25231F]/75 mt-1 leading-relaxed">
                Meet your authorized historian guide. Ascend through the 7 historic Pols (gates) and visit Rana Kumbha Palace, the 9-story Vijay Stambha, and Rani Padmini's lotus lake pavilion.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#C49A32] border-2 border-white"></div>
              <span className="text-xs font-bold text-[#C49A32] uppercase">01:30 PM – 02:30 PM — Authentic Heritage Lunch</span>
              <p className="text-xs text-[#25231F]/75 mt-1 leading-relaxed">
                Relish a clean, hygienic lunch at a recommended heritage courtyard. Taste royal Mewari Dal Baati Churma or customized mild multi-cuisine preferences.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#A65F3D] border-2 border-white"></div>
              <span className="text-xs font-bold text-[#A65F3D] uppercase">02:30 PM – 04:00 PM — Sacred Springs & Sunset Viewpoint</span>
              <p className="text-xs text-[#25231F]/75 mt-1 leading-relaxed">
                Explore the Gaumukh perennial spring, 12th-century Kirti Stambh, and Mirabai Temple. Capture panoramic cliff-edge photographs overlooking the Mewar plains.
              </p>
            </div>

            <div className="relative pl-10">
              <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-[#25231F] border-2 border-white"></div>
              <span className="text-xs font-bold text-[#25231F] uppercase">04:00 PM – 06:30 PM — Comfortable Return to Udaipur</span>
              <p className="text-xs text-[#25231F]/75 mt-1 leading-relaxed">
                Relax on the return drive as the sun sets over the Aravalis. Arrive comfortably back at your hotel in Udaipur in time for your evening lake dinner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Anti-Scam Commitment */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#EFE7D9]/60 rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] block mb-1">
              Ethical Tourism Promise
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-2">
              Our Zero Forced Shopping & Anti-Scam Commitment
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              We know foreign visitors to Rajasthan frequently face unsolicited pressure from unauthorized touts and drivers taking them to overpriced souvenir emporiums. With Visit Chittorgarh, your itinerary is 100% focused on authentic heritage, photography, and peaceful sightseeing.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white text-emerald-600 flex items-center justify-center font-bold text-xl shadow-sm">
              🛡️
            </div>
            <div>
              <span className="text-xs font-bold text-[#25231F] block">100% Guaranteed</span>
              <span className="text-[11px] text-[#25231F]/60">Pure Sightseeing Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_SCHEMA.mainEntity.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-[#EFE7D9] shadow-sm">
              <h3 className="text-base font-serif font-bold text-[#25231F] mb-2">
                {faq.name}
              </h3>
              <p className="text-xs sm:text-sm text-[#25231F]/70 leading-relaxed">
                {faq.acceptedAnswer.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UdaipurToChittorgarhDayTrip;
