import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Car, MapPin, Bus, ExternalLink, Navigation, Compass, MessageCircle, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import DirectionsButton from '../components/DirectionsButton';
import { trackWhatsAppClick } from '../utils/analytics';

const HOW_TO_REACH_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How to reach Chittorgarh by train?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chittorgarh Railway Station (COR) is a major junction connected to Delhi, Mumbai, Udaipur, Jaipur, Kota and Ajmer. Located ~5 km from the fort."
        }
      },
      {
        "@type": "Question",
        "name": "What is the nearest airport to Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Maharana Pratap Airport (UDR) in Udaipur is the closest airport, located 90-115 km from Chittorgarh (approx. 1 hr 45 min via NH-27)."
        }
      }
    ]
  }
];

const HowToReach = () => {
    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const transport = [
        {
            icon: Train,
            title: "By Train",
            image: "/assets/images/Chittorgarh Railway Station.webp",
            desc: "Chittorgarh Railway Station (COR) is a well-connected junction on Western Railway lines with direct trains from Delhi, Mumbai, Jaipur, and Kota.",
            highlights: [
                "Chetak Express & Mewar Express direct",
                "Connections: Kota, Ajmer, Ahmedabad, Indore",
                "Distance to Fort: ~5 km (15 mins drive)"
            ],
            link: "https://www.irctc.co.in/",
            linkLabel: "Book on IRCTC ↗"
        },
        {
            icon: Plane,
            title: "By Air",
            image: "/assets/images/Udaipur Airport.webp",
            desc: "Maharana Pratap Airport (UDR) in Udaipur is the nearest airport with regular flights from Delhi, Mumbai, Bangalore, and Jaipur.",
            highlights: [
                "Udaipur Airport (UDR): ~90 km via NH-27",
                "Driving time: ~1 hour 45 minutes",
                "Sanitized private cabs with flight tracking"
            ],
            link: "/udaipur-to-chittorgarh-taxi",
            linkLabel: "Book Airport Cab →"
        },
        {
            icon: Bus,
            title: "By Bus",
            image: "/assets/images/Rsrtc Bus Stand.webp",
            desc: "RSRTC operates frequent Super Deluxe, Volvo, and sleeper coaches connecting Chittorgarh to all major hubs across Rajasthan.",
            highlights: [
                "Direct coaches from: Udaipur, Jaipur, Kota, Jodhpur",
                "Volvo & AC Sleeper available nightly",
                "Central Bus Stand in town center near station"
            ],
            link: "https://rsrtconline.rajasthan.gov.in/",
            linkLabel: "Book on RSRTC ↗"
        },
        {
            icon: Car,
            title: "By Highway (Road)",
            image: "/assets/images/National Highway.webp",
            desc: "Smooth driving along the Golden Quadrilateral (NH-48) and East-West Corridor (NH-27). Dual carriageway expressways with clean food plazas.",
            highlights: [
                "Via NH-48 (Jaipur → Chittor, 5 hrs)",
                "Via NH-27 (Udaipur → Chittor, 1.75 hrs)",
                "Well-paved motor road to top of the fort"
            ],
            link: "#",
            linkLabel: "Get Directions"
        }
    ];

    const distances = [
        { city: "Udaipur", dist: "110 km", road: "~1.75 hrs", train: "~2.5 hrs" },
        { city: "Jaipur", dist: "310 km", road: "~5 hrs", train: "~5 hrs" },
        { city: "Delhi", dist: "590 km", road: "~9.5 hrs", train: "~9 hrs" },
        { city: "Mumbai", dist: "850 km", road: "~13.5 hrs", train: "~14 hrs" },
        { city: "Ahmedabad", dist: "350 km", road: "~5.5 hrs", train: "~6 hrs" },
        { city: "Kota", dist: "165 km", road: "~2.75 hrs", train: "~3 hrs" },
        { city: "Bhilwara", dist: "55 km", road: "~50 mins", train: "~50 mins" }
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="How to Reach Chittorgarh | Trains, Flights, Bus & Highway Guide"
                description="Complete travel instructions to Chittorgarh Fort by train, flight, bus or road. Distance and driving times from Udaipur, Jaipur, Delhi, and Mumbai."
                canonical="/how-to-reach"
                keywords="how to reach Chittorgarh, Delhi to Chittorgarh train, Udaipur to Chittorgarh distance, Jaipur to Chittorgarh bus, Chittorgarh railway station"
                schema={HOW_TO_REACH_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        Transportation & Logistics
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        How to Reach Chittorgarh
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        Centrally situated in southern Rajasthan at the crossing of NH-48 and NH-27. Convenient connectivity by express trains, highway cabs, and commercial flights.
                    </p>
                </div>

                {/* 4 Transport Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {transport.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-44 relative overflow-hidden bg-[#EFE7D9]">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md flex items-center justify-center text-[#C49A32] shadow-sm">
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">{item.title}</h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-4">{item.desc}</p>
                                    <ul className="space-y-2 text-xs text-[#25231F]/80 mb-6">
                                        {item.highlights.map((h, i) => (
                                            <li key={i} className="flex items-start gap-1.5">
                                                <span className="text-[#C49A32] mt-0.5">•</span>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="p-6 pt-0 border-t border-[#EFE7D9]/60">
                                {item.title === "By Highway (Road)" ? (
                                    <DirectionsButton />
                                ) : (
                                    <a
                                        href={item.link}
                                        target={item.link.startsWith('http') ? "_blank" : "_self"}
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold text-[#C49A32] hover:text-[#A65F3D] flex items-center gap-1"
                                    >
                                        {item.linkLabel}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Distance Table */}
                <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-16">
                    <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-2">
                        Distance & Travel Times from Major Cities
                    </h2>
                    <p className="text-xs text-[#25231F]/60 mb-6">Estimated driving and train travel duration to Chittorgarh.</p>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="border-b border-[#EFE7D9] text-[#A65F3D] uppercase tracking-wider font-bold">
                                    <th className="py-3 px-4">Origin City</th>
                                    <th className="py-3 px-4">Distance</th>
                                    <th className="py-3 px-4">By Highway Cab</th>
                                    <th className="py-3 px-4">By Direct Train</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EFE7D9]/60">
                                {distances.map((d, i) => (
                                    <tr key={i} className="hover:bg-[#F8F5EF] transition-colors">
                                        <td className="py-3.5 px-4 font-bold text-[#25231F]">{d.city}</td>
                                        <td className="py-3.5 px-4 text-[#25231F]/70">{d.dist}</td>
                                        <td className="py-3.5 px-4 text-[#25231F]/70">{d.road}</td>
                                        <td className="py-3.5 px-4 text-[#25231F]/70">{d.train}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pickup & Cab Assistance Banner */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Ground Transportation Concierge
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            Need a Pickup from Udaipur Airport or Railway Station?
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            Our private sanitized fleet awaits you right at arrival gates with flight tracking and transparent fixed billing.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <NavLink
                            to="/udaipur-to-chittorgarh-taxi"
                            className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider"
                        >
                            Airport Taxi Service
                        </NavLink>
                        <button
                            onClick={triggerPlanTrip}
                            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold uppercase tracking-wider border border-white/20"
                        >
                            Plan Trip
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToReach;
