import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, MessageCircle, Compass, MapPin, Calendar, HelpCircle, ArrowRight } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick } from '../../utils/analytics';

const ChittorgarhOneDayTour = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal', {
      detail: {
        mode: 'focused',
        itemName: 'Chittorgarh One Day Tour',
        itemDuration: 'Full Day (8–10 Hours)',
        category: 'Package',
      }
    }));
  };

  const handleWhatsApp = () => {
    const msg = `🏰 *Chittorgarh 1-Day Tour Booking Inquiry*\n\n` +
      `I would like to book the Complete 1-Day Fort Sightseeing Tour with an authorized guide and private cab.\n\n` +
      `Please share availability and quotation!`;
    trackWhatsAppClick('one_day_tour_page');
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const itinerary = [
    {
      time: "08:30 AM",
      title: "Ascent through the 7 Fort Pols (Gates)",
      desc: "Drive through the 7 historic gates (Padan Pol, Bhairon Pol, Hanuman Pol, Ganesh Pol, Jorla Pol, Lakshman Pol, and Ram Pol). Pay homage at the cenotaphs of heroes Jaimal and Patta."
    },
    {
      time: "09:30 AM",
      title: "Rana Kumbha Palace & Underground Vaults",
      desc: "Walk through the historic chambers of Rana Kumbha, the birthplace of Maharana Udai Singh and the historical gathering place of Queen Padmini's court."
    },
    {
      time: "10:45 AM",
      title: "Vijay Stambha (Tower of Victory)",
      desc: "Marvel at the 9-story, 37.2-meter architectural marvel built in 1448 by Maharana Kumbha, adorned with hundreds of hand-carved Hindu pantheon deities."
    },
    {
      time: "11:45 AM",
      title: "Gaumukh Sacred Reservoir & Samadhisvara Temple",
      desc: "Witness the perennial rock spring pouring from a carved cow's mouth into a deep green sacred pool with panoramic valley views."
    },
    {
      time: "01:00 PM",
      title: "Authentic Mewari Dal Baati Churma Lunch",
      desc: "Head down to Chittorgarh city to relish authentic Dal Baati Churma in pure desi ghee, spicy gatte ki sabji, and refreshing chaach."
    },
    {
      time: "02:45 PM",
      title: "Padmini Palace & Water Lotus Pavilion",
      desc: "Tour the scenic 3-storied palace nestled inside a lotus pool, recounting the heroic defensive history of Rani Padmini."
    },
    {
      time: "04:00 PM",
      title: "Kirti Stambh & Meera Temple",
      desc: "Visit the 12th-century Jain Tower of Fame and the devotional temple of mystic royal poetess Meera Bai."
    },
    {
      time: "06:30 PM",
      title: "Evening Sunset & Light & Sound Show",
      desc: "Conclude your day with dramatic night illumination and booming audio storytelling the saga of Mewar atop the fort ramparts."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="Chittorgarh One Day Tour | Itinerary, Sightseeing & Private Guide"
        description="The ultimate 1-day Chittorgarh Fort sightseeing tour. Hourly itinerary covering 7 gates, Vijay Stambha, Padmini Palace, Mewari lunch & Light show."
        canonical="/chittorgarh-1-day-tour"
        keywords="Chittorgarh one day tour, Chittorgarh 1 day itinerary, day trip to Chittorgarh Fort, Chittorgarh sightseeing tour, full day Chittorgarh package"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/royal-journeys" className="hover:text-[#A65F3D]">Tour Packages</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Chittorgarh 1-Day Tour</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            Full-Day Heritage Circuit
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Chittorgarh One Day Tour
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-3xl mb-8">
            Experience the grandeur of India's largest fort in a single curated, hassle-free day. Guided by authorized Mewari historians with private sanitized vehicle transfers between the sprawling 700-acre monuments.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsApp}
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" /> Book via WhatsApp
            </button>
            <button
              onClick={triggerPlanTrip}
              className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
            >
              <Compass className="w-4 h-4" /> Customize This Plan
            </button>
          </div>
        </div>

        {/* Timed Itinerary Section */}
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F] mb-6">
          Detailed Hourly Tour Itinerary
        </h2>

        <div className="space-y-4 mb-12">
          {itinerary.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#C49A32] transition-colors"
            >
              <div className="shrink-0 w-28">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EFE7D9] text-[#A65F3D] font-bold text-xs rounded-lg font-mono">
                  <Clock className="w-3.5 h-3.5" /> {step.time}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-[#25231F]/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* What's Included */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
            <h3 className="text-base font-serif font-bold text-emerald-800 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Package Inclusions
            </h3>
            <ul className="text-xs text-[#25231F]/80 space-y-2">
              <li>✓ Dedicated Certified Tour Historian (English/Hindi)</li>
              <li>✓ Private Sanitized AC Vehicle for Full Fort Circuit</li>
              <li>✓ Chittorgarh Railway Station / Hotel Pickup & Drop</li>
              <li>✓ Parking, Toll & Fuel Surcharges Included</li>
            </ul>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
            <h3 className="text-base font-serif font-bold text-[#A65F3D] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#A65F3D]" /> Practical Tips
            </h3>
            <ul className="text-xs text-[#25231F]/80 space-y-2">
              <li>• Wear comfortable walking shoes with good stone grip</li>
              <li>• Carry sun protection, sunglasses & a reusable water flask</li>
              <li>• ASI Fort Entry Ticket: ₹40 Indian / ₹600 Foreign Nationals</li>
              <li>• Camera fees may apply for commercial equipment</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChittorgarhOneDayTour;

