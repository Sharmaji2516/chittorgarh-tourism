import React from 'react';
import { Car, Clock, ShieldCheck, CheckCircle2, Phone, MessageCircle, MapPin, HelpCircle } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const JaipurToChittorgarhTaxi = () => {
  const handleWhatsApp = (carType) => {
    const msg = `🚕 *Jaipur to Chittorgarh Taxi Inquiry*\n\n` +
      `🚗 *Vehicle Preference:* ${carType}\n` +
      `📍 *Pickup:* Jaipur (Airport / Railway Stn / Hotel)\n` +
      `📍 *Destination:* Chittorgarh Fort\n\n` +
      `Please provide one-way and multi-day round-trip quotation.`;
    trackWhatsAppClick('jaipur_taxi_page', carType);
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const faqs = [
    {
      q: "What is the driving distance from Jaipur to Chittorgarh?",
      a: "The distance from Jaipur to Chittorgarh is approximately 310 kilometers via NH-48 (via Kishangarh, Ajmer bypass, and Bhilwara). Smooth 6-lane and 4-lane expressway allows travel in approximately 5 to 5.5 hours."
    },
    {
      q: "Can we include Ajmer Sharif or Pushkar as a stopover?",
      a: "Yes! Many travelers choose to visit Ajmer Dargah or the Brahma Temple in Pushkar as a brief midday stopover before continuing southward to Chittorgarh."
    },
    {
      q: "Are one-way cab drops available from Jaipur to Chittorgarh?",
      a: "Yes, we provide verified one-way private taxi drops as well as multi-day round trips covering Chittorgarh, Udaipur, and Mount Abu."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="Jaipur to Chittorgarh Taxi Service | Cabs, Fare & Highway Guide"
        description="Reliable private cab service from Jaipur to Chittorgarh. Sedans, Innova Crysta & Tempo Travellers via NH-48. Punctual airport & hotel pickup."
        canonical="/jaipur-to-chittorgarh-taxi"
        keywords="Jaipur to Chittorgarh taxi, Jaipur to Chittorgarh cab fare, Jaipur to Chittorgarh one way taxi, Jaipur to Udaipur via Chittorgarh cab"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/service/taxi" className="hover:text-[#A65F3D]">Taxi Service</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Jaipur to Chittorgarh Taxi</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            NH-48 Expressway Route
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Jaipur to Chittorgarh Taxi
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-3xl mb-8">
            Connect Rajasthan's Pink City to the historic Citadel of Mewar. Safe, sanitized private transfers via high-speed NH-48 expressway with experienced highway chauffeurs.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">310 KM</span>
              <span className="text-[#25231F]/60">Total Distance</span>
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">~5 - 5.5 Hrs</span>
              <span className="text-[#25231F]/60">Driving Time</span>
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">NH-48</span>
              <span className="text-[#25231F]/60">Express Highway</span>
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">Direct</span>
              <span className="text-[#25231F]/60">Doorstep Pickup</span>
            </div>
          </div>
        </div>

        {/* Fleet Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                1 - 4 Passengers
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mt-3 mb-2">Prime Sedan (Dzire / Etios)</h3>
              <p className="text-xs text-[#25231F]/70 mb-4">Comfortable highway cruising for small families and solo tourists.</p>
              <ul className="text-xs text-[#25231F]/80 space-y-2 mb-6">
                <li>✓ Full AC Climate Control</li>
                <li>✓ Professional Highway Driver</li>
                <li>✓ On-time Jaipur Airport / Hotel Pickup</li>
              </ul>
            </div>
            <button
              onClick={() => handleWhatsApp('Sedan Dzire (Jaipur)')}
              className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Inquire Sedan Fare
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border-2 border-[#C49A32] shadow-heritage flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-[#C49A32] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
              Best for 5-7 Pax
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                5 - 7 Passengers
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mt-3 mb-2">SUV (Innova Crysta)</h3>
              <p className="text-xs text-[#25231F]/70 mb-4">The ultimate comfortable highway cruiser across Rajasthan's expressways.</p>
              <ul className="text-xs text-[#25231F]/80 space-y-2 mb-6">
                <li>✓ Plush Captain Seats & High Clearance</li>
                <li>✓ Dual High-Performance AC</li>
                <li>✓ Luggage Carrier for Extended Vacations</li>
              </ul>
            </div>
            <button
              onClick={() => handleWhatsApp('SUV Innova (Jaipur)')}
              className="w-full py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Inquire SUV Fare
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#526B50] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                9 - 16 Passengers
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mt-3 mb-2">Luxury Tempo Traveller</h3>
              <p className="text-xs text-[#25231F]/70 mb-4">Ideal for wedding groups, pilgrim groups, and extended family vacations.</p>
              <ul className="text-xs text-[#25231F]/80 space-y-2 mb-6">
                <li>✓ Reclining Seats & Generous Legroom</li>
                <li>✓ Pushback Comfort for 5-Hour Journey</li>
                <li>✓ Courteous Uniformed Chauffeur</li>
              </ul>
            </div>
            <button
              onClick={() => handleWhatsApp('Tempo Traveller (Jaipur)')}
              className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Inquire Tempo Fare
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-12">
          <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#C49A32]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                <h3 className="text-sm font-bold text-[#25231F] mb-1.5">{faq.q}</h3>
                <p className="text-xs text-[#25231F]/75 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Banner */}
        <div className="bg-[#25231F] text-white rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-white mb-1">Planning a Multi-City Rajasthan Road Trip?</h3>
            <p className="text-xs text-white/70">We coordinate Jaipur - Ajmer - Chittorgarh - Udaipur private custom circuits.</p>
          </div>
          <a
            href="tel:+917597451057"
            onClick={() => trackPhoneCallClick('jaipur_taxi_call')}
            className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call +91 75974 51057
          </a>
        </div>
      </div>
    </div>
  );
};

export default JaipurToChittorgarhTaxi;
