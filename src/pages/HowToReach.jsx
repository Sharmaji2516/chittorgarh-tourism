import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Car, MapPin, Bus, ExternalLink, Navigation, Compass, MessageCircle, Phone } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import DirectionsButton from '../components/DirectionsButton';
import { trackWhatsAppClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

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
    const { t, lang } = useLanguage();
    const pageT = t?.howToReachPage || {};

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const transport = [
        {
            icon: Train,
            title: lang === 'hi' ? 'ट्रेन द्वारा' : 'By Train',
            image: "/assets/images/Chittorgarh Railway Station.webp",
            desc: lang === 'hi' ? 'चित्तौड़गढ़ रेलवे स्टेशन (सीओआर) दिल्ली, मुंबई, जयपुर और कोटा से सीधी ट्रेनों से जुड़ा हुआ प्रमुख जंक्शन है।' : "Chittorgarh Railway Station (COR) is a well-connected junction on Western Railway lines with direct trains from Delhi, Mumbai, Jaipur, and Kota.",
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
            title: lang === 'hi' ? 'हवाई मार्ग द्वारा' : 'By Air',
            image: "/assets/images/Udaipur Airport.webp",
            desc: lang === 'hi' ? 'उदयपुर का महाराणा प्रताप हवाई अड्डा (यूडीआर) निकटतम हवाई अड्डा है, जो दिल्ली, मुंबई और बैंगलोर से नियमित उड़ानों से जुड़ा है।' : "Maharana Pratap Airport (UDR) in Udaipur is the nearest airport with regular flights from Delhi, Mumbai, Bangalore, and Jaipur.",
            highlights: [
                "Udaipur Airport (UDR): ~90 km via NH-27",
                "Driving time: ~1 hour 45 minutes",
                "Sanitized private cabs with flight tracking"
            ],
            link: getLocalizedPath('/udaipur-to-chittorgarh-taxi', lang),
            linkLabel: "Book Airport Cab →"
        },
        {
            icon: Bus,
            title: lang === 'hi' ? 'बस द्वारा' : 'By Bus',
            image: "/assets/images/Rsrtc Bus Stand.webp",
            desc: lang === 'hi' ? 'आरएसआरटीसी राजस्थान के सभी प्रमुख शहरों से चित्तौड़गढ़ के लिए नियमित वोल्वो और डीलक्स बसें संचालित करती है।' : "RSRTC operates frequent Super Deluxe, Volvo, and sleeper coaches connecting Chittorgarh to all major hubs across Rajasthan.",
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
            title: lang === 'hi' ? 'सड़क मार्ग द्वारा' : 'By Highway (Road)',
            image: "/assets/images/National Highway.webp",
            desc: lang === 'hi' ? 'स्वर्णिम चतुर्भुज (एनएच-48) और पूर्व-पश्चिम गलियारे (एनएच-27) द्वारा उत्कृष्ट 4-लेन राजमार्ग कनेक्टिविटी।' : "Smooth driving along the Golden Quadrilateral (NH-48) and East-West Corridor (NH-27). Dual carriageway expressways with clean food plazas.",
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
                canonical={getLocalizedPath('/how-to-reach', lang)}
                keywords="how to reach Chittorgarh, Delhi to Chittorgarh train, Udaipur to Chittorgarh distance, Jaipur to Chittorgarh bus, Chittorgarh railway station"
                schema={HOW_TO_REACH_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        {pageT.kicker || "Transportation & Logistics"}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        {pageT.title || "How to Reach Chittorgarh"}
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        {pageT.desc || "Centrally situated in southern Rajasthan at the crossing of NH-48 and NH-27. Convenient connectivity by express trains, highway cabs, and commercial flights."}
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
                                {item.title === "By Highway (Road)" || item.title === "सड़क मार्ग द्वारा" ? (
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
                                <tr className="border-b border-[#EFE7D9] text-[#25231F]/60 uppercase tracking-wider font-bold">
                                    <th className="pb-3">City</th>
                                    <th className="pb-3">Distance</th>
                                    <th className="pb-3">By Road</th>
                                    <th className="pb-3">By Train</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EFE7D9]/60">
                                {distances.map((d, i) => (
                                    <tr key={i} className="hover:bg-[#F8F5EF]/60">
                                        <td className="py-3 font-bold text-[#25231F]">{d.city}</td>
                                        <td className="py-3">{d.dist}</td>
                                        <td className="py-3">{d.road}</td>
                                        <td className="py-3">{d.train}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowToReach;
