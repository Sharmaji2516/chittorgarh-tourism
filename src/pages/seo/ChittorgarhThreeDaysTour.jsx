import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, MessageCircle, Compass, Calendar, Mountain } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick } from '../../utils/analytics';

const ChittorgarhThreeDaysTour = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal', {
      detail: {
        mode: 'focused',
        itemName: 'Chittorgarh Three Days Royal Expedition',
        itemDuration: '3 Days / 2 Nights',
        category: 'Package',
      }
    }));
  };

  const handleWhatsApp = () => {
    const msg = `🏰 *Chittorgarh 3-Day Tour Inquiry*\n\n` +
      `I would like to plan the 3 Days / 2 Nights Royal Mewar Heritage & Wilderness Tour.\n\n` +
      `Please share full itinerary, hotel choices and quotation!`;
    trackWhatsAppClick('three_day_tour_page');
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="Chittorgarh 3 Days Tour | Complete Mewar & Wildlife Package"
        description="The ultimate 3-day royal Rajasthan vacation. Day 1: Chittorgarh Fort. Day 2: Sanwariya Seth & Bassi Wildlife Sanctuary. Day 3: Menal Waterfall & Ancient Temples."
        canonical="/chittorgarh-3-days-tour"
        keywords="Chittorgarh 3 days tour, Chittorgarh 3 day itinerary, Mewar 3 days tour package, Bassi wildlife Chittorgarh tour, Rajasthan heritage 3 days"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/royal-journeys" className="hover:text-[#A65F3D]">Tour Packages</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Chittorgarh 3 Days Tour</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            Extended Heritage & Nature Vacation (3 Days / 2 Nights)
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Chittorgarh 3 Days Tour
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-3xl mb-8">
            The definitive slow-travel journey across the cradle of Mewar. Discover the grand hilltop fortress, tranquil wildlife in the Aravalli hills of Bassi, the roaring gorge of Menal, and the divine aura of Shri Sanwariya Seth.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsApp}
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" /> Book 3-Day Tour
            </button>
            <button
              onClick={triggerPlanTrip}
              className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Compass className="w-4 h-4" /> Custom Itinerary
            </button>
          </div>
        </div>

        {/* 3 Day Cards */}
        <div className="space-y-6 mb-12">
          <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C49A32] bg-[#EFE7D9] px-3 py-1 rounded-full">
              Day 1: Fort Monuments & Royal History
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#25231F] mt-3 mb-2">
              Ascending the 7 Gates of Chittorgarh Fort
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              Full day guided by certified historian exploring Vijay Stambha, Kirti Stambha, Rana Kumbha Palace, Padmini Palace, Gaumukh Reservoir, and Fateh Prakash Museum. Evening Light & Sound Show on the fort ramparts.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage">
            <span className="text-xs font-bold uppercase tracking-wider text-[#526B50] bg-[#526B50]/10 px-3 py-1 rounded-full">
              Day 2: Bassi Wildlife Sanctuary & Countryside Havelis
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#25231F] mt-3 mb-2">
              Aravalli Wilderness & Lakeside Sunset
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              Drive 25 km into the peaceful deciduous forests of Bassi Sanctuary. Spot antelopes, spotted deer, and migratory winter birds. Enjoy a serene afternoon at Bassi Dam before evening tea at a countryside haveli.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage">
            <span className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] bg-[#A65F3D]/10 px-3 py-1 rounded-full">
              Day 3: Sanwariya Seth Temple & Menal Gorge
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#25231F] mt-3 mb-2">
              Divine Darshan & Ancient Sculptures
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              Morning pilgrimage to Shri Sanwariya Seth in Mandaphiya for aarti and blessings. Continue to Menal to marvel at the 150-ft canyon waterfall and 11th-century carved Shiva temples. Return transfer to Udaipur Airport or Chittorgarh Station.
            </p>
          </div>
        </div>

        {/* Action Call */}
        <div className="bg-[#25231F] text-white rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="text-xl font-serif font-bold text-white mb-1">Tailor Your 3-Day Rajasthan Tour</h3>
            <p className="text-xs text-white/70">Pickups from Udaipur, Jaipur, or Chittorgarh with complete transparent pricing.</p>
          </div>
          <button
            onClick={triggerPlanTrip}
            className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider"
          >
            Request 3-Day Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChittorgarhThreeDaysTour;

