import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Calendar, Clock, Car, Compass, ShieldCheck, HelpCircle, Utensils, Hotel, ArrowRight } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick } from '../../utils/analytics';

const ChittorgarhTravelGuidePage = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="Chittorgarh Travel Guide | Complete Tourism, Fort, Stays & Tips"
        description="The ultimate Chittorgarh travel guide. Plan your trip with insights on reaching by air/rail/road, best seasons, fort entry fees, guides, food, and stays."
        canonical="/chittorgarh-travel-guide"
        keywords="Chittorgarh travel guide, how to visit Chittorgarh, Chittorgarh fort timings, entry fee Chittorgarh fort, best time to visit Chittorgarh, Mewar travel"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-[#A65F3D]">Travel Guide</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Chittorgarh Travel Guide</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            Official Visitor Manual
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Chittorgarh Travel Guide
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-3xl mb-8">
            Everything you need to know before visiting the historic capital of Mewar. From transportation logistics and ticket details to authorized tour guides and culinary recommendations.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerPlanTrip}
              className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Compass className="w-4 h-4" /> Plan My Itinerary
            </button>
            <a
              href="https://wa.me/917597451057?text=Namaste!%20I%20have%20questions%20about%20traveling%20to%20Chittorgarh."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* Essential Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C49A32]" /> When to Visit
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed mb-3">
              <strong>October to March (Winter):</strong> Best weather with cool sunny days (15°C - 26°C), perfect for exploring the 700-acre fort outdoors.
            </p>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              <strong>July to September (Monsoon):</strong> Green landscapes and active roaring waterfalls at Menal.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#A65F3D]" /> Fort Timings & Tickets
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed mb-3">
              <strong>Opening Hours:</strong> 9:00 AM to 6:00 PM daily.
            </p>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              <strong>Entry Tickets (ASI):</strong> ₹40 for Indian citizens; ₹600 for foreign travelers. Free entry for children under 15 years.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Car className="w-5 h-5 text-[#526B50]" /> How to Reach
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed mb-2">
              • <strong>Nearest Airport:</strong> Udaipur Airport (UDR), 90 km via NH-27 expressway (~1.75 hrs).
            </p>
            <p className="text-xs text-[#25231F]/75 leading-relaxed mb-2">
              • <strong>By Train:</strong> Chittorgarh Junction (COR) connects directly to Delhi, Mumbai, Jaipur, and Ahmedabad.
            </p>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              • <strong>By Highway:</strong> Smooth 4-lane NH-48 and NH-27.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#C49A32]" /> Must-Try Local Delicacies
            </h3>
            <p className="text-xs text-[#25231F]/75 leading-relaxed mb-2">
              • <strong>Dal Baati Churma:</strong> Crushed roasted wheat baatis dunked in pure desi ghee with panchmel dal.
            </p>
            <p className="text-xs text-[#25231F]/75 leading-relaxed mb-2">
              • <strong>Gatte ki Sabji:</strong> Spiced gram flour dumplings in tangy yogurt gravy.
            </p>
            <p className="text-xs text-[#25231F]/75 leading-relaxed">
              • <strong>Gulab Jamun & Mawa Kachori:</strong> Available in sweet shops near Fort Road.
            </p>
          </div>
        </div>

        {/* Quick Links to Services */}
        <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-12">
          <h3 className="text-xl font-serif font-bold text-[#25231F] mb-4">Explore Key Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <NavLink to="/service/guide" className="p-4 bg-[#F8F5EF] rounded-2xl hover:bg-[#EFE7D9] transition-colors border border-[#EFE7D9] block text-xs">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Private Tour Guide</strong>
              Authorized historian for in-depth stories & hassle-free pacing.
            </NavLink>
            <NavLink to="/service/taxi" className="p-4 bg-[#F8F5EF] rounded-2xl hover:bg-[#EFE7D9] transition-colors border border-[#EFE7D9] block text-xs">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Private Cab Service</strong>
              Clean AC vehicles for fort circuit & Udaipur transfers.
            </NavLink>
            <NavLink to="/royal-journeys" className="p-4 bg-[#F8F5EF] rounded-2xl hover:bg-[#EFE7D9] transition-colors border border-[#EFE7D9] block text-xs">
              <strong className="block text-sm text-[#25231F] font-serif mb-1">Tour Packages</strong>
              Curated 1-day, 2-day & pilgrimage packages.
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChittorgarhTravelGuidePage;
