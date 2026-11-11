import React from 'react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import { Car, Clock, ShieldCheck, Compass, MessageCircle, Phone, CheckCircle2, Award, ChevronRight, Luggage, MapPin } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20am%20interested%20in%20the%20Udaipur%20to%20Jaipur%20Private%20Transfer%20with%20Chittorgarh%20Fort%20Sightseeing.%20Please%20share%20details.";

const TRANSFER_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long is the total journey from Udaipur to Jaipur via Chittorgarh Fort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The total driving distance is approximately 415 km via NH 48 and NH 27. With a relaxed 3 to 3.5 hour sightseeing stopover at Chittorgarh Fort and a lunch break, the total journey takes around 9 to 10 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Is our luggage safe in the taxi while touring Chittorgarh Fort?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, completely safe. Your private chauffeur remains with the vehicle throughout the fort sightseeing circuit, and luggage is locked inside the boot of your dedicated AC cab."
      }
    },
    {
      "@type": "Question",
      "name": "What is the cost of a private transfer from Udaipur to Jaipur with Chittorgarh stopover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All-inclusive flat fares are ₹8,999 INR ($108 USD approx.) for a comfortable AC Sedan (1-3 passengers) and ₹11,999 INR ($144 USD approx.) for an Innova/Crysta SUV (4-6 passengers). Includes highway tolls, parking, fuel, and driver allowances."
      }
    }
  ]
};

const UdaipurToJaipurViaChittorgarhTour = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title="Udaipur to Jaipur via Chittorgarh Fort | Private Transfer & Sightseeing Tour"
        description="Don't waste a travel day. Book a private transfer from Udaipur to Jaipur with a 3-hour guided stopover at Chittorgarh Fort. Luggage storage in car included."
        canonical="/udaipur-to-jaipur-via-chittorgarh-tour"
        ogImage="https://www.visitchittorgarh.in/Fort.webp"
        schema={TRANSFER_FAQ_SCHEMA}
      />

      {/* Header Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="bg-gradient-to-br from-[#312D27] via-[#25231F] to-[#1E1C19] text-white rounded-3xl p-6 sm:p-12 relative overflow-hidden shadow-2xl border border-[#C49A32]/30">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C49A32]/15 blur-3xl pointer-events-none rounded-full"></div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DFBA5A] text-xs font-bold uppercase tracking-wider mb-6">
              <Car className="w-4 h-4" />
              <span>Rajasthan Inter-City Heritage Corridor • Door-to-Door</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight leading-tight mb-4">
              Udaipur to Jaipur Transfer via Chittorgarh Fort
            </h1>

            <p className="text-sm sm:text-base text-[#F8F5EF]/85 leading-relaxed mb-6 font-light">
              Turn a long travel day into an unforgettable Rajasthan highlight. Pickup from your Udaipur hotel, enjoy a 3-hour guided fort exploration with your luggage safely locked in the car, and arrive at your Jaipur hotel by evening.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={VERIFIED_WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('udaipur_jaipur_transfer_hero')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                Reserve Transfer on WhatsApp
              </a>
              <button
                onClick={triggerPlanTrip}
                className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
              >
                <Compass className="w-4 h-4" />
                Plan Custom Route
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
            Transparent Inter-City Fares
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25231F] mt-2">
            Udaipur to Jaipur Transfer Rates
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-2">
            Includes 415 km one-way drive, 3-hour Chittorgarh Fort waiting, all NH 48 highway tolls, fuel & driver allowance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl border border-[#EFE7D9] p-8 shadow-heritage flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9] px-3 py-1 rounded-md inline-block mb-3">
                1 - 3 Passengers • Sedan
              </span>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-black text-[#25231F]">₹8,999</span>
                  <span className="text-xs font-bold text-[#C49A32]">($108 USD / €99 EUR)</span>
                </div>
                <span className="text-xs text-[#25231F]/60">All-inclusive door-to-door transfer</span>
              </div>
              <ul className="space-y-2 text-xs text-[#25231F]/80 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Udaipur Hotel Pickup (e.g. 8:00 AM)</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> 3-Hour Chittorgarh Fort Sightseeing Stop</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Secure Luggage Storage in Car Boot</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Jaipur Hotel Drop-off (e.g. 6:30 PM)</li>
              </ul>
            </div>
            <button
              onClick={triggerPlanTrip}
              className="w-full py-3.5 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Book Sedan Transfer
            </button>
          </div>

          <div className="bg-white rounded-3xl border-2 border-[#C49A32] p-8 shadow-heritage flex flex-col justify-between relative">
            <span className="absolute -top-3.5 right-6 bg-[#C49A32] text-white text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full shadow-sm">
              Maximum Luggage Space
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-3 py-1 rounded-md inline-block mb-3">
                4 - 6 Passengers • Royal SUV (Innova Crysta)
              </span>
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-serif font-black text-[#25231F]">₹11,999</span>
                  <span className="text-xs font-bold text-[#C49A32]">($144 USD / €132 EUR)</span>
                </div>
                <span className="text-xs text-[#25231F]/60">All-inclusive door-to-door transfer</span>
              </div>
              <ul className="space-y-2 text-xs text-[#25231F]/80 mb-6">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Spacious seating for long highway journey</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Fits 4-6 large suitcases easily</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dual AC, phone chargers & bottled water</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Highway certified driver with safety pledge</li>
              </ul>
            </div>
            <button
              onClick={triggerPlanTrip}
              className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
            >
              Book Royal SUV Transfer
            </button>
          </div>
        </div>
      </section>

      {/* Route Journey Schedule */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] shadow-heritage">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A65F3D] block mb-2">
            Trip Roadmap
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mb-6">
            Udaipur ➔ Chittorgarh Fort ➔ Jaipur Route Schedule
          </h2>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFE7D9] text-[#A65F3D] font-bold flex items-center justify-center shrink-0">1</div>
              <div>
                <h4 className="text-sm font-bold text-[#25231F]">08:00 AM — Departure from Udaipur</h4>
                <p className="text-xs text-[#25231F]/70 mt-1">Pickup from your hotel in Udaipur. Drive 112 km (2 hours) along NH 27 to Chittorgarh Fort.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFE7D9] text-[#C49A32] font-bold flex items-center justify-center shrink-0">2</div>
              <div>
                <h4 className="text-sm font-bold text-[#25231F]">10:15 AM – 01:30 PM — Chittorgarh Fort Sightseeing</h4>
                <p className="text-xs text-[#25231F]/70 mt-1">Explore Vijay Stambha, Kumbha Palace, and Padmini Palace with your private historian. Luggage remains safely locked in the vehicle.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFE7D9] text-[#526B50] font-bold flex items-center justify-center shrink-0">3</div>
              <div>
                <h4 className="text-sm font-bold text-[#25231F]">01:30 PM – 02:30 PM — Highway Lunch</h4>
                <p className="text-xs text-[#25231F]/70 mt-1">Enjoy lunch at a clean, verified heritage restaurant on the Chittorgarh highway bypass.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EFE7D9] text-[#25231F] font-bold flex items-center justify-center shrink-0">4</div>
              <div>
                <h4 className="text-sm font-bold text-[#25231F]">02:30 PM – 06:30 PM — Scenic Drive to Jaipur</h4>
                <p className="text-xs text-[#25231F]/70 mt-1">Travel 300 km on the smooth 6-lane National Highway NH 48 via Bhilwara and Kishangarh. Drop-off directly at your Jaipur hotel or airport.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32]">
            Transfer FAQ
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F] mt-1">
            Questions on the Udaipur - Chittorgarh - Jaipur Transfer
          </h2>
        </div>

        <div className="space-y-4">
          {TRANSFER_FAQ_SCHEMA.mainEntity.map((faq, idx) => (
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

export default UdaipurToJaipurViaChittorgarhTour;
