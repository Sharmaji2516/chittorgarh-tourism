import React from 'react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { Clock, Ticket, ShieldCheck, Compass, MessageCircle, Phone, AlertCircle, Award, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20have%20an%20inquiry%20regarding%20Chittorgarh%20Fort%20timings,%20entry%20tickets%20and%20guide%20booking.";

const TIMINGS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the opening and closing timings of Chittorgarh Fort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Chittorgarh Fort is open 7 days a week from sunrise (approximately 06:00 AM) to sunset (06:30 PM). The monument ticket counters close 30 minutes before sunset."
      }
    },
    {
      "@type": "Question",
      "name": "How much is the entry ticket for foreign tourists at Chittorgarh Fort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For foreign tourists (Non-SAARC countries), the Archaeological Survey of India (ASI) ticket is ₹600 INR when booked cashless/online, and ₹650 INR at the physical counter. For SAARC and BIMSTEC visitors, the fee is ₹40 INR online or ₹50 INR at the counter."
      }
    },
    {
      "@type": "Question",
      "name": "What are the timings and ticket prices for the Chittorgarh Fort Light and Sound Show?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Light and Sound Show takes place every evening at Kumbha Palace. The Hindi show runs from 07:00 PM to 07:45 PM, and the English show runs from 08:00 PM to 08:45 PM. Ticket price is ₹100 INR for adults and ₹50 INR for children."
      }
    },
    {
      "@type": "Question",
      "name": "Is there luggage storage or cloakroom available at Chittorgarh Fort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no formal cloakroom atop the 700-acre fort. Visitors traveling with suitcases should either keep luggage locked inside their private AC taxi or store bags in the cloakroom at Chittorgarh Railway Station prior to ascending the fort."
      }
    }
  ]
};

const ChittorgarhFortTimingsTickets = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title="Chittorgarh Fort Timings, Entry Fees & Tickets (2026 Official Guide)"
        description="Complete up-to-date guide to Chittorgarh Fort ticket prices for Indian and foreign tourists, opening hours, light & sound show timings, camera charges & authorized guide booking."
        canonical="/chittorgarh-fort-timings-tickets"
        ogImage="https://www.visitchittorgarh.in/Fort.webp"
        schema={TIMINGS_FAQ_SCHEMA}
      />

      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-gradient-to-br from-[#312D27] via-[#25231F] to-[#1E1C19] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#C49A32]/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49A32]/15 blur-3xl pointer-events-none rounded-full"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFBA5A] text-xs font-bold uppercase tracking-wider mb-6">
              <Ticket className="w-4 h-4" />
              <span>Official Archaeological Survey of India (ASI) Rates • 2026 - 2027</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight mb-4">
              Chittorgarh Fort Timings & Ticket Prices
            </h1>

            <p className="text-sm sm:text-base text-[#F8F5EF]/85 leading-relaxed mb-6 font-light">
              Everything you need to plan your entry: monument opening hours, domestic & foreign tourist ticket rates, audio guide costs, evening light show schedule, and authorized local historian assistance.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={triggerPlanTrip}
                className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Compass className="w-4 h-4" />
                Book Fort Tour with Guide & Cab
              </button>
              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('timings_page_hero_wa')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Summary Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#A65F3D] tracking-wider block mb-1">Monument Timings</span>
            <span className="text-xl font-serif font-bold text-[#25231F] block">6:00 AM – 6:30 PM</span>
            <span className="text-xs text-[#25231F]/60">Open all 365 days a year</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#C49A32] tracking-wider block mb-1">Indian / SAARC Fee</span>
            <span className="text-xl font-serif font-bold text-[#25231F] block">₹40 (Online) / ₹50</span>
            <span className="text-xs text-[#25231F]/60">Children below 15: Free</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#526B50] tracking-wider block mb-1">Foreign Tourist Fee</span>
            <span className="text-xl font-serif font-bold text-[#25231F] block">₹600 (Online) / ₹650</span>
            <span className="text-xs text-[#25231F]/60">Non-SAARC passport holders</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-[#EFE7D9] shadow-sm">
            <span className="text-[10px] uppercase font-bold text-[#A65F3D] tracking-wider block mb-1">Light & Sound Show</span>
            <span className="text-xl font-serif font-bold text-[#25231F] block">7:00 PM & 8:00 PM</span>
            <span className="text-xs text-[#25231F]/60">Hindi & English shows</span>
          </div>
        </div>
      </section>

      {/* Official Entry Ticket Breakdown Table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] shadow-heritage overflow-x-auto">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
              Transparent Fee Structure
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mt-1">
              ASI Official Ticket Price Breakdown (2026 - 2027)
            </h2>
          </div>

          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[550px]">
            <thead>
              <tr className="border-b-2 border-[#EFE7D9] bg-[#F8F5EF] text-[#25231F]">
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Visitor Category</th>
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Cashless / Online Rate</th>
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Cash Counter Rate</th>
                <th className="py-3.5 px-4 font-bold uppercase tracking-wider">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE7D9]">
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#25231F]">Indian Citizens</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">₹40</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">₹50</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">Valid Govt. ID proof required</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#25231F]">SAARC & BIMSTEC Citizens</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">₹40</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">₹50</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">Passport proof required (Nepal, Bhutan, etc.)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#25231F]">Foreign Tourists (Non-SAARC)</td>
                <td className="py-3.5 px-4 font-bold text-[#A65F3D]">₹600 (~$7.2 USD)</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">₹650</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">USA, UK, Europe, Australia, Canada, etc.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#25231F]">Children Below 15 Years</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">FREE</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">FREE</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">Age verification on request</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#25231F]">Still Camera (Non-Commercial)</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">FREE</td>
                <td className="py-3.5 px-4 text-emerald-700 font-bold">FREE</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">Standard phone & DSLRs</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-semibold text-[#25231F]">Video Camera (Handheld)</td>
                <td className="py-3.5 px-4 font-bold text-[#C49A32]">₹25</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">₹25</td>
                <td className="py-3.5 px-4 text-[#25231F]/70">Commercial / Tripod requires ASI permit</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Guide Booking Promotion Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-[#EFE7D9]/60 rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A32] block mb-1">
              Enhance Your Monument Experience
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-2">
              Why Hire an Authorized Mewari Historian Guide?
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              Chittorgarh Fort is not a museum with informative plaques — it is a vast 700-acre open-air citadel. Without a certified historian, you will see magnificent stone carvings without knowing the stories of bravery, architectural symmetry, and historical siege drama behind them.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={triggerPlanTrip}
              className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-transform active:scale-95"
            >
              Book Authorized Guide
            </button>
            <NavLink
              to="/service/guide"
              className="px-6 py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors"
            >
              View Guide Charges
            </NavLink>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
            Essential Practical Details
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mt-1">
            Frequently Asked Questions on Fort Timings
          </h2>
        </div>

        <div className="space-y-4">
          {TIMINGS_FAQ_SCHEMA.mainEntity.map((faq, idx) => (
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

export default ChittorgarhFortTimingsTickets;
