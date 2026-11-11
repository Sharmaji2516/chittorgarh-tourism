import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Clock, ArrowRight, ShieldCheck, Compass, MessageCircle, Landmark } from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { trackWhatsAppClick } from '../../utils/analytics';

const PlacesToVisitPage = () => {
  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  const places = [
    {
      name: "Chittorgarh Fort",
      category: "UNESCO World Heritage Fort",
      desc: "India's largest fort plateau spanning 700 acres atop a 180m hill. Witness the 7 massive gates, royal palace ruins, and ancient reservoirs.",
      img: "/Fort.webp",
      time: "4 - 6 Hours",
      link: "/attractions"
    },
    {
      name: "Vijay Stambha (Tower of Victory)",
      category: "15th-Century Architecture",
      desc: "37.2-meter, 9-story tower erected by Maharana Kumbha in 1448, adorned with carvings of Hindu deities representing victory and courage.",
      img: "/assets/images/vijay-stambh-new.webp",
      time: "1 Hour",
      link: "/attractions"
    },
    {
      name: "Padmini Palace",
      category: "Water Palace",
      desc: "Delicate 3-story palace surrounded by a scenic lotus pond where Queen Padmini resided. Known for its historical role in the siege of 1303.",
      img: "/assets/images/padmini-palace-new.webp",
      time: "45 Mins",
      link: "/attractions"
    },
    {
      name: "Gaumukh Sacred Reservoir",
      category: "Perennial Spring",
      desc: "Sacred rock spring where fresh water constantly flows from a carved cow's mouth into a stepped emerald pool below the cliff.",
      img: "/assets/images/gaumukh-reservoir4.webp",
      time: "30 Mins",
      link: "/attractions"
    },
    {
      name: "Kirti Stambh (Tower of Fame)",
      category: "12th-Century Jain Monument",
      desc: "22-meter Solanki-style tower dedicated to Bhagwan Adinath, decorated with intricate sculptures of Jain tirthankaras and celestial dancers.",
      img: "/assets/images/Kirti Stambh.webp",
      time: "45 Mins",
      link: "/attractions"
    },
    {
      name: "Sanwariya Seth Temple (Mandaphiya)",
      category: "Sacred Krishna Pilgrimage",
      desc: "Grand pink sandstone temple dedicated to Lord Krishna as the divine financier. Located 40 km from Chittorgarh city.",
      img: "/assets/images/Sanvliya-ji-Temple.webp",
      time: "2 - 3 Hours",
      link: "/attractions"
    },
    {
      name: "Menal Waterfall & Ancient Temples",
      category: "Monsoon Gorge & Heritage",
      desc: "A breathtaking 150-foot waterfall cascading into a deep rocky gorge, surrounded by 11th-century carved Mahanaleshwar Shiva temples.",
      img: "/assets/images/menal-waterfall-new.webp",
      time: "3 Hours",
      link: "/attractions"
    },
    {
      name: "Bassi Wildlife Sanctuary & Dam",
      category: "Eco-Tourism & Nature",
      desc: "Tranquil deciduous forests in the Aravalli hills home to antelopes, leopards, and winter migratory birds near the scenic Bassi Dam.",
      img: "/assets/images/Bassi Wildlife.webp",
      time: "3 - 4 Hours",
      link: "/attractions"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20">
      <SEOHead
        title="10 Best Places to Visit in Chittorgarh | Top Attractions Guide"
        description="Comprehensive guide to the top places to visit in Chittorgarh: Chittorgarh Fort, Vijay Stambha, Padmini Palace, Gaumukh Reservoir, Sanwariya Seth & Menal."
        canonical="/places-to-visit-in-chittorgarh"
        keywords="places to visit in Chittorgarh, Chittorgarh tourist places, Chittorgarh sightseeing, top attractions Chittorgarh, Chittorgarh fort monuments"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-[#A65F3D]">Home</a>
          <span>/</span>
          <a href="/attractions" className="hover:text-[#A65F3D]">Attractions</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Places to Visit in Chittorgarh</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12 text-center max-w-4xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            Official Sightseeing Directory
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
            Places to Visit in Chittorgarh
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-2xl mx-auto mb-6">
            From the soaring stone ramparts of India's largest fort to tranquil forested gorges and sacred pilgrimage temples, explore the essential destinations that define the royal spirit of Mewar.
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={triggerPlanTrip}
              className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <Compass className="w-4 h-4" /> Plan Chittorgarh Trip
            </button>
            <a
              href="https://wa.me/917597451057?text=Namaste!%20I%20want%20to%20plan%20sightseeing%20in%20Chittorgarh."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Guide Desk
            </a>
          </div>
        </div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {places.map((place, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="h-52 relative overflow-hidden bg-[#EFE7D9]">
                  <img
                    src={place.img}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-3 left-3 bg-[#25231F]/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    {place.category}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[11px] text-[#A65F3D] font-bold flex items-center gap-1 mb-2">
                    <Clock className="w-3.5 h-3.5" /> Recommended: {place.time}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                    {place.name}
                  </h3>
                  <p className="text-xs text-[#25231F]/70 leading-relaxed">
                    {place.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between text-xs">
                <NavLink
                  to={place.link}
                  className="font-bold text-[#C49A32] hover:text-[#A65F3D] transition-colors flex items-center gap-1"
                >
                  Explore Pillar <ArrowRight className="w-3.5 h-3.5" />
                </NavLink>
                <button
                  onClick={triggerPlanTrip}
                  className="text-[11px] font-semibold text-[#25231F] bg-[#F8F5EF] px-3 py-1.5 rounded-lg border border-[#EFE7D9] hover:bg-[#EFE7D9] transition-colors"
                >
                  Book Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesToVisitPage;

