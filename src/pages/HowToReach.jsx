import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Train, Car, MapPin, Bus, ExternalLink, Navigation } from 'lucide-react';
import Section from '../components/Section';
import DirectionsButton from '../components/DirectionsButton';
import { NavLink } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

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
          "text": "Chittorgarh Railway Station is a major junction connected to Delhi, Mumbai, Udaipur, Jaipur, Kota and Ajmer. Key trains include Chetak Express, Mewar Express, and Chittorgarh-Udaipur Passenger. The station is approximately 5 km from Chittorgarh Fort."
        }
      },
      {
        "@type": "Question",
        "name": "What is the nearest airport to Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Maharana Pratap Airport (UDR) in Udaipur is the nearest airport, located 115 km from Chittorgarh (approximately 2 hours by road). Jaipur International Airport (JAI) is a larger alternative at 320 km."
        }
      },
      {
        "@type": "Question",
        "name": "How far is Chittorgarh from Udaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chittorgarh is 115 km from Udaipur via NH 76. The road journey takes approximately 2 hours. Regular train services connect both cities in 2.5 hours."
        }
      },
      {
        "@type": "Question",
        "name": "How far is Chittorgarh from Jaipur?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chittorgarh is approximately 320 km from Jaipur. The road journey takes 5–6 hours via NH 48 and NH 148D. Train connections are also available."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a bus service to Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, RSRTC (Rajasthan State Road Transport Corporation) operates regular bus services to Chittorgarh from Udaipur, Jaipur, Kota, Ajmer and other major Rajasthan cities. Private Volvo buses are also available."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" },
      { "@type": "ListItem", "position": 2, "name": "How to Reach Chittorgarh", "item": "https://visitchittorgarh.in/how-to-reach" }
    ]
  }
];


const HowToReach = () => {
    const [isPlanning, setIsPlanning] = useState(false);

    useEffect(() => {
        setIsPlanning(localStorage.getItem('ctt_visited') === 'tourist');
    }, []);

    const transport = [
        {
            icon: Train,
            title: "By Train",
            image: "/assets/images/Chittorgarh Railway Station.jpg",
            desc: "Chittorgarh Railway Station is a major junction well-connected to Delhi, Mumbai, Udaipur, Jaipur, and Kota. Experience a royal journey through the Aravali landscape.",
            highlights: [
                "Direct: Chetak Express & Mewar Express",
                "Connections: Kota, Ajmer, Ahmedabad",
                "Distance to Fort: ~5 km"
            ],
            link: "https://www.irctc.co.in/",
            linkLabel: "Book on IRCTC →"
        },
        {
            icon: Plane,
            title: "By Air",
            image: "/assets/images/Udaipur Airport.webp",
            desc: "Maharana Pratap Airport (UDR) in Udaipur is the closest air gateway. Jaipur International (JAI) serves as a larger alternative for global connections.",
            highlights: [
                "Udaipur (UDR): 115 km (~2 hrs)",
                "Cab Fare: ₹1,400–1,800 approx",
                "Jaipur (JAI): 320 km (~5.5 hrs)"
            ],
            link: "https://www.google.com/travel/flights",
            linkLabel: "Search Flights →"
        },
        {
            icon: Bus,
            title: "By Bus",
            image: "/assets/images/Rsrtc Bus Stand.jpg",
            desc: "RSRTC operates frequent Volvo and Deluxe services. Private luxury sleeper coaches provide comfortable overnight journeys from major Rajasthan cities.",
            highlights: [
                "Direct from: Udaipur, Jaipur, Kota",
                "Volvo & AC Sleeper available",
                "Central Bus Stand: Town Center"
            ],
            link: "https://rsrtconline.rajasthan.gov.in/",
            linkLabel: "Book on RSRTC →"
        },
        {
            icon: Car,
            title: "Self Drive",
            image: "/assets/images/National Highway.jpg",
            desc: "Enjoy the scenic Golden Quadrilateral highways. The drive from Udaipur or Kota is exceptionally smooth with well-maintained road networks.",
            highlights: [
                "Via NH-48 (Udaipur → Chittor)",
                "Via NH-27 (Kota → Chittor)",
                "Ample parking near Fort Gate"
            ],
            link: "#",
            linkLabel: "Get Directions →"
        }
    ];

    return (
        <div className="min-h-screen pt-24 pb-12">
            <SEOHead
                title="How to Reach Chittorgarh | Train, Bus, Flight & Road"
                description="Complete travel guide to Chittorgarh — reach by train (Chetak/Mewar Express), flight via Udaipur, RSRTC bus or road from Jaipur, Kota & Delhi. Distances & booking links."
                canonical="/how-to-reach"
                keywords="how to reach Chittorgarh, Chittorgarh train, Chittorgarh airport, Udaipur to Chittorgarh, Jaipur to Chittorgarh, Chittorgarh bus, Chittorgarh distance"
                ogImage="https://visitchittorgarh.in/Fort.png"
                schema={HOW_TO_REACH_SCHEMA}
            />
            <Section id="reach-hero" title="Travel to the Citadel" className="bg-transparent">
                <div className="max-w-4xl mx-auto text-center mb-16 px-4">
                    <p className="text-xl text-royal-white/80 font-serif italic leading-relaxed">
                        "Padharo Mhare Desh" — Experience the legendary hospitality of Rajasthan as you journey towards the world's largest fort complex.
                    </p>
                </div>
            </Section>

            {/* Choose Your Route Section */}
            <Section id="choose-route" className="pt-0 pb-24">
                <div className="text-center mb-16">
                    <span className="text-royal-gold font-serif text-sm tracking-[0.3em] uppercase mb-2 block">Most Popular</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-royal-white mb-4">
                        Choose Your <span className="text-royal-gold">Route</span>
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto"></div>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4"
                >
                    {transport.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                            }}
                            className="glass-card group flex flex-col rounded-3xl border border-royal-gold/20 hover:border-royal-gold/50 transition-all duration-500 hover:-translate-y-2 shadow-xl hover:shadow-royal-gold/5 overflow-hidden"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-royal-black via-royal-black/20 to-transparent" />

                                <div className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-royal-black/60 backdrop-blur-md flex items-center justify-center border border-royal-gold/20 z-10">
                                    <item.icon className="w-6 h-6 text-royal-gold" />
                                </div>
                            </div>

                            <div className="p-8 pt-6 flex flex-col flex-grow relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-royal-gold/5 -translate-y-12 translate-x-12 rotate-45 group-hover:bg-royal-gold/10 transition-colors"></div>

                                <h3 className="text-2xl font-serif text-royal-gold mb-3 uppercase tracking-wider relative z-10">{item.title}</h3>

                                <p className="text-royal-white/60 text-sm leading-relaxed mb-6 font-light relative z-10">
                                    {item.desc}
                                </p>

                                <ul className="space-y-3 mb-8 flex-grow relative z-10">
                                    {item.highlights.map((point, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[13px] text-royal-white/80">
                                            <span className="text-royal-gold mt-1 flex-shrink-0">✦</span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-royal-gold/10 mt-auto relative z-10">
                                    {item.title === "Self Drive" ? (
                                        <DirectionsButton />
                                    ) : (
                                        <a
                                            href={item.link}
                                            target={item.link.startsWith('http') ? "_blank" : "_self"}
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-widest hover:text-royal-white transition-colors"
                                        >
                                            {item.linkLabel}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-20 text-center">
                    <div className="inline-flex items-center gap-3 px-8 py-4 bg-royal-gold/5 rounded-full border border-royal-gold/20 text-royal-gold/80 hover:bg-royal-gold/10 transition-all">
                        <MapPin className="w-5 h-5 text-royal-gold" />
                        <span className="text-sm font-serif italic tracking-wide">Destination Chittorgarh — Latitude 24.88°N, Longitude 74.64°E</span>
                    </div>
                </div>
            </Section>

            {/* Distance Reference Section */}
            <Section id="distances" title="Distance Reference" className="bg-black/20 backdrop-blur-sm border-t border-royal-gold/10 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <p className="text-royal-white/60 text-sm italic">Estimated travel times from major Indian cities to the historic citadel.</p>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-royal-gold/20 shadow-2xl">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-royal-gold/10 border-b border-royal-gold/20">
                                    <th className="px-6 py-4 text-royal-gold font-serif uppercase tracking-widest text-xs">Major City</th>
                                    <th className="px-6 py-4 text-royal-gold font-serif uppercase tracking-widest text-xs">Distance</th>
                                    <th className="px-6 py-4 text-royal-gold font-serif uppercase tracking-widest text-xs">By Road</th>
                                    <th className="px-6 py-4 text-royal-gold font-serif uppercase tracking-widest text-xs">By Train</th>
                                </tr>
                            </thead>
                            <tbody className="bg-royal-black/40">
                                {[
                                    { city: "Udaipur", dist: "115 km", road: "~2 hrs", train: "~2.5 hrs" },
                                    { city: "Jaipur", dist: "320 km", road: "~5 hrs", train: "~5 hrs" },
                                    { city: "Delhi", dist: "660 km", road: "~10 hrs", train: "~9 hrs" },
                                    { city: "Mumbai", dist: "950 km", road: "~14 hrs", train: "~15 hrs" },
                                    { city: "Ahmedabad", dist: "350 km", road: "~5.5 hrs", train: "~6 hrs" },
                                    { city: "Kota", dist: "165 km", road: "~3 hrs", train: "~3 hrs" },
                                    { city: "Bhopal", dist: "450 km", road: "~7 hrs", train: "~7.5 hrs" }
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-royal-gold/10 hover:bg-royal-gold/5 transition-colors">
                                        <td className="px-6 py-4 font-serif text-royal-white flex items-center gap-2">
                                            {row.city}
                                        </td>
                                        <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">{row.dist}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">{row.road}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm whitespace-nowrap">{row.train}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>

            {isPlanning && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-3xl mx-auto px-4 pb-12"
                >
                    <div className="relative rounded-2xl border border-royal-gold/40 bg-royal-gold/10 p-6 md:p-8 text-center overflow-hidden">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-royal-gold to-transparent"></div>
                        <div className="text-3xl mb-3">🗺️</div>
                        <h3 className="text-xl md:text-2xl font-serif text-royal-gold font-bold mb-2 tracking-wide">
                            You've Planned Your Visit!
                        </h3>
                        <p className="text-white/80 mb-5 text-sm md:text-base leading-relaxed">
                            Now that you know how to reach, explore the full website to discover the best
                            <strong className="text-white"> attractions</strong>,
                            <strong className="text-white"> royal cuisine</strong>, and
                            <strong className="text-white"> places to stay</strong> in Chittorgarh.
                        </p>
                        <NavLink
                            to="/"
                            className="inline-flex items-center gap-2 bg-royal-gold text-black font-bold px-6 py-3 rounded-full uppercase tracking-widest text-xs hover:bg-royal-gold/80 transition-colors"
                        >
                            Explore Chittorgarh →
                        </NavLink>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default HowToReach;
