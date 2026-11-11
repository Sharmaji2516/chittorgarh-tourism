import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, MessageCircle, Compass, Calendar, HelpCircle, Hotel } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick } from '../../utils/analytics';

const ChittorgarhTwoDaysTour = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  const handleWhatsApp = () => {
    const msg = `🏰 *Chittorgarh 2-Day Tour Inquiry*\n\n` +
      `I am interested in booking the 2-Day Heritage & Countryside Package (Fort, Sanwaliya Seth & Menal).\n\n` +
      `Please share hotel choices and quotation!`;
    trackWhatsAppClick('two_day_tour_page');
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="Chittorgarh 2 Days Tour | Weekend Itinerary, Stays & Guide"
        description="Plan an unforgettable 2-day heritage weekend in Chittorgarh. Day 1: Fort & Light Show. Day 2: Sanwariya Seth Temple & Menal Waterfall. Private cab & guide included."
        canonical="/chittorgarh-2-days-tour"
        keywords="Chittorgarh 2 days tour, Chittorgarh 2 day itinerary, weekend in Chittorgarh, Chittorgarh tour package 2 days, Sanwaliya Seth Chittorgarh tour"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/royal-journeys" className="hover:text-[#A65F3D]">Tour Packages</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Chittorgarh 2 Days Tour</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            Weekend Heritage Immersion (2 Days / 1 Night)
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Chittorgarh 2 Days Tour
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-3xl mb-8">
            Experience the full depth of Mewar without rushing. Spend your first day immersed in the legendary 700-acre fort and evening light show, followed by a boutique heritage haveli stay, and explore the sacred Sanwariya Seth Temple and Menal Waterfall on day two.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsApp}
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" /> Book 2-Day Package
            </button>
            <button
              onClick={triggerPlanTrip}
              className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Compass className="w-4 h-4" /> Customize With Hotel
            </button>
          </div>
        </div>

        {/* Day 1 Plan */}
        <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#C49A32] text-white flex items-center justify-center font-bold text-sm">
              D1
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#25231F]">
              Day 1: The Grand Citadel of Chittorgarh Fort
            </h2>
          </div>
          <p className="text-xs text-[#25231F]/70 mb-6">Full-day immersion inside India's largest fort plateau with authorized Mewari guide.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#25231F]/80">
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Morning: The 7 Pols & Royal Palaces</strong>
              Drive up the 7 fortified gates. Tour Rana Kumbha Palace, Mahasati Jauhar Kund, and the 9-story Vijay Stambha.
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Afternoon: Sacred Water & Temples</strong>
              Visit the cliffside Gaumukh Spring, Padmini Palace lotus lake, Kirti Stambh, and the historic Meera Temple.
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Evening: Light & Sound Spectacle</strong>
              Watch the fort ramparts illuminated under the stars with evocative dramatic audio narration.
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Night: Boutique Heritage Stay</strong>
              Overnight stay at a royal haveli or fort-view boutique resort with traditional candlelit Mewari dinner.
            </div>
          </div>
        </div>

        {/* Day 2 Plan */}
        <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-9 h-9 rounded-xl bg-[#A65F3D] text-white flex items-center justify-center font-bold text-sm">
              D2
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#25231F]">
              Day 2: Spiritual Sanwaliya Seth & Menal Waterfall
            </h2>
          </div>
          <p className="text-xs text-[#25231F]/70 mb-6">Explore the cultural treasures, Krishna pilgrimage, and rugged scenic canyons around Chittorgarh.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#25231F]/80">
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Morning: Sanwariya Seth Temple (Mandaphiya)</strong>
              Drive 40 km to the revered Krishna pilgrimage for morning darshan, aarti, and parikrama of the pink sandstone temple.
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Midday: Menal Canyon & Waterfall</strong>
              Visit the 'Mini Khajuraho' to explore 11th-century carved Shiva temples overlooking a dramatic 150-foot gorge.
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Afternoon: Akola Block Prints & Crafts</strong>
              Stop by local artisan workshops to witness authentic natural Daabu mud-resist textile printing.
            </div>
            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Evening: Onward Departure Transfer</strong>
              Drop-off at Chittorgarh Railway Station or Udaipur Airport for your onward travel.
            </div>
          </div>
        </div>

        {/* Action Call */}
        <div className="bg-[#25231F] text-white rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-white mb-1">Planning Your Weekend in Chittorgarh?</h3>
            <p className="text-xs text-white/70">Our travel desk organizes boutique rooms, sanitised SUV cabs & certified guides.</p>
          </div>
          <button
            onClick={triggerPlanTrip}
            className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Inquire 2-Day Package
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChittorgarhTwoDaysTour;
