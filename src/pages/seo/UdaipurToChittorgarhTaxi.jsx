import React from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, ShieldCheck, CheckCircle2, Phone, MessageCircle, MapPin, Compass, HelpCircle } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const UdaipurToChittorgarhTaxi = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  const handleWhatsApp = (carType) => {
    const msg = `🚕 *Udaipur to Chittorgarh Taxi Inquiry*\n\n` +
      `🚗 *Vehicle Preference:* ${carType}\n` +
      `📍 *Pickup:* Udaipur (Airport / Hotel)\n` +
      `📍 *Destination:* Chittorgarh Fort & Heritage Sites\n\n` +
      `Please share exact one-way & round-trip fare details.`;
    trackWhatsAppClick('udaipur_taxi_page', carType);
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const faqs = [
    {
      q: "What is the distance and driving time between Udaipur and Chittorgarh?",
      a: "The distance from Udaipur city center to Chittorgarh is approximately 110 kilometers (around 90 km from Udaipur Dabok Airport). Via the 4-lane National Highway 27 (NH-27), driving time is approximately 1 hour 45 minutes to 2 hours."
    },
    {
      q: "Can we do a same-day return trip from Udaipur to Chittorgarh?",
      a: "Yes! A same-day return trip is the most popular option. Chauffeurs pick you up from your Udaipur hotel around 8:00 AM, take you through the Chittorgarh Fort circuit with an authorized guide, stop for traditional lunch, and return you to Udaipur by 7:00 PM."
    },
    {
      q: "Can we visit the Sanwariya Seth Temple on the way?",
      a: "Yes. At Bhadsora junction along NH-27, a short 10 km detour brings you to the sacred Shri Sanwariya Seth Temple in Mandaphiya. It adds roughly 1 to 1.5 hours to the journey."
    },
    {
      q: "Are toll taxes, parking fees, and driver allowances included?",
      a: "Our quotations provide complete transparent pricing specifying toll taxes and parking fees upfront with no hidden surcharge surprises."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="Udaipur to Chittorgarh Taxi Service | Cabs, Fare & Day Trips"
        description="Book private taxi from Udaipur to Chittorgarh Fort. Clean AC Sedans, Innova Crysta & Tempo Travellers. Doorstep hotel & airport pickup with experienced drivers."
        canonical="/udaipur-to-chittorgarh-taxi"
        keywords="Udaipur to Chittorgarh taxi, Udaipur to Chittorgarh cab fare, day trip from Udaipur to Chittorgarh, Innova taxi Udaipur to Chittorgarh, Udaipur airport to Chittorgarh cab"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/service/taxi" className="hover:text-[#A65F3D]">Taxi Service</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Udaipur to Chittorgarh Taxi</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            NH-27 Heritage Corridor
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Udaipur to Chittorgarh Taxi Service
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-3xl mb-8">
            Experience a smooth, comfortable 110-km highway road trip across Mewar. Our verified fleet of private air-conditioned cabs ensures punctual doorstep pickup from Udaipur hotels or Maharana Pratap Airport (UDR).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">110 KM</span>
              <span className="text-[#25231F]/60">Total Distance</span>
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">~1.5 - 2 Hrs</span>
              <span className="text-[#25231F]/60">Driving Time</span>
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">NH-27</span>
              <span className="text-[#25231F]/60">4-Lane Highway</span>
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <span className="font-serif text-xl font-bold text-[#A65F3D] block">24/7</span>
              <span className="text-[#25231F]/60">Chauffeur Support</span>
            </div>
          </div>
        </div>

        {/* Fleet Pricing Cards */}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F] mb-6">
          Choose Your Vehicle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Sedan */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-[#F8F5EF]">
                <img src="/assets/images/sedan_taxi.webp" alt="Sedan Dzire" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                1 - 4 Passengers
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mt-2 mb-1">Sedan (Swift Dzire / Etios)</h3>
              <p className="text-xs text-[#25231F]/70 mb-4">Ideal for couples, solo travelers, and small families traveling light.</p>
              <ul className="text-xs text-[#25231F]/80 space-y-2 mb-6">
                <li>✓ Full AC Climate Control</li>
                <li>✓ Punctual Airport / Hotel Pickup</li>
                <li>✓ Fort Top Internal Circuit Driving</li>
              </ul>
            </div>
            <button
              onClick={() => handleWhatsApp('Sedan Dzire')}
              className="w-full py-3 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Inquire Sedan Fare
            </button>
          </div>

          {/* SUV */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#C49A32] shadow-heritage flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-[#C49A32] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full">
              Recommended for Comfort
            </span>
            <div>
              <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-[#F8F5EF]">
                <img src="/assets/images/suv_taxi.webp" alt="Innova Crysta" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                5 - 7 Passengers
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mt-2 mb-1">SUV (Innova Crysta / Ertiga)</h3>
              <p className="text-xs text-[#25231F]/70 mb-4">Superior suspension, captain seats, and generous space for family luggage.</p>
              <ul className="text-xs text-[#25231F]/80 space-y-2 mb-6">
                <li>✓ Premium Captain / Bench Seating</li>
                <li>✓ Dual High-Capacity AC</li>
                <li>✓ Sanwariya Seth Detour Friendly</li>
              </ul>
            </div>
            <button
              onClick={() => handleWhatsApp('SUV Innova Crysta')}
              className="w-full py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Inquire SUV Fare
            </button>
          </div>

          {/* Tempo */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <div className="h-40 rounded-2xl overflow-hidden mb-4 bg-[#F8F5EF]">
                <img src="/assets/images/tempo_traveller.webp" alt="Tempo Traveller" className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#526B50] bg-[#EFE7D9] px-2.5 py-1 rounded-md">
                9 - 16 Passengers
              </span>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mt-2 mb-1">Luxury Tempo Traveller</h3>
              <p className="text-xs text-[#25231F]/70 mb-4">For family reunions, pilgrim groups, and student heritage expeditions.</p>
              <ul className="text-xs text-[#25231F]/80 space-y-2 mb-6">
                <li>✓ Individual Reclining Push-Back Seats</li>
                <li>✓ Large Dedicated Luggage Boot</li>
                <li>✓ Smooth Highway Chauffeur</li>
              </ul>
            </div>
            <button
              onClick={() => handleWhatsApp('Tempo Traveller')}
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

        {/* Direct Contact Bar */}
        <div className="bg-[#25231F] text-white rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-white mb-1">Need a Custom Pickup from Udaipur Airport?</h3>
            <p className="text-xs text-white/70">Our travel desk coordinates flight trackings and immediate dispatch.</p>
          </div>
          <div className="flex gap-3">
            <a
              href="tel:+917597451057"
              onClick={() => trackPhoneCallClick('udaipur_taxi_call')}
              className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call +91 75974 51057
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UdaipurToChittorgarhTaxi;
