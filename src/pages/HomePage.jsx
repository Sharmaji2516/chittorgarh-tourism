import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Wind, Shield, Sunrise, Mountain, ArrowRight, Check } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import SEOHead from '../components/SEOHead';
import InternationalSEO from '../components/InternationalSEO';

const HOME_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Visit Chittorgarh",
    "url": "https://visitchittorgarh.in",
    "logo": "https://visitchittorgarh.in/logo_maharana.png",
    "description": "Your complete guide to Chittorgarh tourism — forts, temples, hotels, restaurants and local experiences in Rajasthan.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chittorgarh",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN",
      "postalCode": "312001"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Tourist Information",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/visitchittorgarh",
      "https://www.instagram.com/visitchittorgarh"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Visit Chittorgarh",
    "url": "https://visitchittorgarh.in",
    "description": "Complete Chittorgarh tourism guide — attractions, hotels, food, itineraries and local experiences.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://visitchittorgarh.in/attractions?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Chittorgarh",
    "description": "Chittorgarh is a historic city in Rajasthan, India, home to India's largest fort — Chittorgarh Fort — and numerous palaces, temples and monuments representing Rajput bravery and heritage.",
    "url": "https://visitchittorgarh.in",
    "image": "https://visitchittorgarh.in/Fort.png",
    "touristType": ["Cultural tourist", "Heritage tourist", "Pilgrimage tourist", "Adventure tourist"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "24.8887",
      "longitude": "74.6269"
    },
    "includesAttraction": [
      { "@type": "TouristAttraction", "name": "Chittorgarh Fort" },
      { "@type": "TouristAttraction", "name": "Vijay Stambh" },
      { "@type": "TouristAttraction", "name": "Kirti Stambh" },
      { "@type": "TouristAttraction", "name": "Padmini Palace" },
      { "@type": "TouristAttraction", "name": "Meera Temple" },
      { "@type": "TouristAttraction", "name": "Sanwariyaji Temple" }
    ]
  }
];


const HomePage = ({ t, searchQuery }) => {
    // Data for the 4 major categories
    const categories = [
        {
            id: 1,
            title: t.pillars.fort.title,
            subtitle: t.pillars.fort.subtitle,
            desc: t.pillars.fort.desc,
            image: "/assets/images/fort_generated.webp",
            icon: Shield,
            link: "/attractions/fort",
            color: "from-royal-gold to-orange-500"
        },
        {
            id: 2,
            title: t.pillars.nature.title,
            subtitle: t.pillars.nature.subtitle,
            desc: t.pillars.nature.desc,
            image: "/assets/images/nature_generated.webp",
            icon: Wind,
            link: "/attractions/nature",
            color: "from-green-600 to-teal-500"
        },
        {
            id: 3,
            title: t.pillars.spiritual.title,
            subtitle: t.pillars.spiritual.subtitle,
            desc: t.pillars.spiritual.desc,
            image: "/assets/images/Sanvliya-ji-Temple.webp",
            icon: Sunrise,
            link: "/attractions/spiritual",
            color: "from-blue-600 to-purple-500"
        },
        {
            id: 15,
            title: t.pillars.scenic.title,
            subtitle: t.pillars.scenic.subtitle,
            desc: t.pillars.scenic.desc,
            image: "/assets/images/waterfall_generated.webp",
            icon: Mountain,
            link: "/attractions/scenic",
            color: "from-amber-600 to-red-500"
        }
    ];

    return (
        <div className="overflow-x-hidden min-h-screen bg-heritage-charcoal">
            <SEOHead
                title="Visit Chittorgarh | Rajasthan Tourism & Chittorgarh Fort Guide"
                description="Complete travel guide to Chittorgarh Fort, India's largest fort. Book expert Mewari guides, local taxi services, heritage hotels & tours of Rajasthan."
                canonical="/"
                keywords="Chittorgarh Tourism, Chittorgarh Fort, Rajasthan Tourism, Vijay Stambh, Padmini Palace, Udaipur to Chittorgarh road trip, places to visit near Udaipur, Rajasthan heritage sites, largest fort in India, weekend getaways Rajasthan"
                ogImage="https://visitchittorgarh.in/Fort.png"
                schema={HOME_SCHEMAS}
            />
            <InternationalSEO />
            <Hero />
            
            {/* Strategy Selection: Dual Path */}
            <Section id="strategy" className="bg-transparent py-12 md:py-20 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
                    {/* Path 1: Packages */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-royal-gold/10 backdrop-blur-2xl p-10 rounded-[3rem] border border-royal-gold/20 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col justify-between"
                    >
                        <div className="flex-1 flex flex-col">
                            <div>
                                <div className="w-16 h-16 bg-royal-gold rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                                    <Shield className="w-8 h-8 text-royal-black" />
                                </div>
                                <h2 className="text-3xl font-serif text-white mb-4">{t.pathsSection.royalExpedition.title}</h2>
                                <p className="text-gray-400 mb-6 leading-relaxed">{t.pathsSection.royalExpedition.desc}</p>
                            </div>
                            
                            <div className="flex-1 flex flex-col justify-around my-4">
                                {t.packages.items.map((pkg) => (
                                    <div key={pkg.id} className="flex items-center gap-4 md:gap-6 bg-white/5 p-3 md:p-4 rounded-xl hover:bg-white/10 transition-all border border-white/5 hover:border-royal-gold/20">
                                        {/* Image: Hidden on mobile, shown on desktop */}
                                        <div className="w-16 h-16 md:w-24 md:h-24 rounded-lg overflow-hidden flex-shrink-0 hidden md:block">
                                            <img src={pkg.image} alt={pkg.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-white font-medium text-sm md:text-base">{pkg.name}</h3>
                                                <span className="text-royal-gold text-xs md:text-sm font-bold">{pkg.duration}</span>
                                            </div>
                                            {/* Description: Hidden on mobile, shown on desktop */}
                                            <p className="text-gray-400 text-xs md:text-sm mt-1 md:mt-2 hidden md:block leading-relaxed">{pkg.desc}</p>
                                            
                                            {/* Includes: Hidden on mobile, shown on desktop */}
                                            <div className="hidden md:flex flex-wrap gap-2 mt-2 md:mt-3">
                                                {pkg.includes.map((inc, index) => (
                                                    <span key={index} className="text-[10px] md:text-xs text-white/50 bg-white/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">{inc}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <NavLink to="/royal-journeys" className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all">
                            {t.pathsSection.royalExpedition.button}
                            <ArrowRight className="w-4 h-4" />
                        </NavLink>
                    </motion.div>

                    {/* Path 2: On-Demand */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-white/5 backdrop-blur-2xl p-10 rounded-[3rem] border border-white/10 hover:border-royal-gold/40 transition-all duration-500 shadow-2xl flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                                <Wind className="w-8 h-8 text-royal-gold" />
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-4">{t.pathsSection.instantOnDemand.title}</h2>
                            <p className="text-gray-400 mb-8 leading-relaxed">{t.pathsSection.instantOnDemand.desc}</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Taxi */}
                            <NavLink to="/service/taxi" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Private Taxi.webp" alt="Taxi" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">{t.pathsSection.instantOnDemand.services.taxi.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">{t.pathsSection.instantOnDemand.services.taxi.desc}</p>
                                    </div>
                                </motion.div>
                            </NavLink>
                            
                            {/* Guide */}
                            <NavLink to="/service/guide" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Guide.webp" alt="Guide" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">{t.pathsSection.instantOnDemand.services.guide.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">{t.pathsSection.instantOnDemand.services.guide.desc}</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Hotel */}
                            <NavLink to="/service/hotel" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Royal Stays.webp" alt="Hotel" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">{t.pathsSection.instantOnDemand.services.hotel.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">{t.pathsSection.instantOnDemand.services.hotel.desc}</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Restaurant */}
                            <NavLink to="/service/restaurant" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Dinning Hall.webp" alt="Restaurant" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">{t.pathsSection.instantOnDemand.services.dining.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">{t.pathsSection.instantOnDemand.services.dining.desc}</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Cafe */}
                            <NavLink to="/service/cafe" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Cafe.webp" alt="Cafe" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">{t.pathsSection.instantOnDemand.services.cafe.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">{t.pathsSection.instantOnDemand.services.cafe.desc}</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Photographer */}
                            <NavLink to="/service/photographer" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Photography.webp" alt="Photographer" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">{t.pathsSection.instantOnDemand.services.photographer.title}</h3>
                                        <p className="text-gray-400 text-xs mt-1">{t.pathsSection.instantOnDemand.services.photographer.desc}</p>
                                    </div>
                                </motion.div>
                            </NavLink>

                            {/* Horse Photo */}
                            <NavLink to="/service/horse-photo" className="block">
                                <motion.div whileHover={{ scale: 1.02 }} className="relative rounded-2xl overflow-hidden cursor-pointer group border border-white/10 hover:border-royal-gold/50 transition-all duration-500 bg-white/5">
                                    <div className="h-32 overflow-hidden">
                                        <img src="/assets/images/Horse Photography.webp" alt="Horse Photo" loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-serif text-white group-hover:text-royal-gold transition-colors">Horse Photography</h3>
                                        <p className="text-gray-400 text-xs mt-1">Get majestic photos on horseback at the fort.</p>
                                    </div>
                                </motion.div>
                            </NavLink>
                        </div>
                    </motion.div>
                </div>
            </Section>
            
            {!searchQuery && (
                <Section id="explore-categories" title={t.pillars.title} subtitle={t.pillars.subtitle} className="bg-transparent py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto px-4">
                        {categories.map((cat, idx) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex flex-col bg-white/5 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 hover:border-royal-gold/30 transition-all duration-500 hover:scale-[1.02] h-full"
                            >
                                {/* Image Section */}
                                <div className="h-[250px] md:h-[300px] overflow-hidden relative bg-heritage-charcoal">
                                    {cat.objectContain && (
                                        <div className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40" style={{ backgroundImage: `url(${cat.image})` }}></div>
                                    )}
                                    <img src={cat.image} alt={cat.title} loading="lazy" decoding="async" className={`relative z-10 w-full h-full ${cat.objectContain ? 'object-contain' : 'object-cover'} transition-transform duration-[4s] group-hover:scale-110`} style={{ objectPosition: cat.objectPosition || 'center' }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-royal-black/60 to-transparent z-20"></div>
                                </div>
                                
                                {/* Content Section (Box below image) */}
                                <div className="p-8 flex flex-col flex-grow justify-between bg-white/[0.02]">
                                    <div>
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-lg mb-4 transform group-hover:scale-110 transition-transform duration-500`}>
                                            <cat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h4 className="text-royal-gold font-bold tracking-[0.2em] uppercase text-xs mb-2 opacity-80">
                                            {cat.subtitle}
                                        </h4>
                                        <h3 className="text-2xl md:text-3xl font-serif text-white mb-4 group-hover:text-royal-gold transition-colors duration-500">
                                            {cat.title}
                                        </h3>
                                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                                            {cat.desc}
                                        </p>
                                    </div>
                                    
                                    <NavLink
                                        to={cat.link}
                                        className="w-fit flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-royal-gold hover:text-royal-black hover:border-royal-gold transition-all duration-300 shadow-md"
                                    >
                                        {t.pillars.button}
                                        <ArrowRight className="w-4 h-4" />
                                    </NavLink>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            )}

            {/* Testimonials Section */}
            <Section id="testimonials" className="bg-transparent py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-4 text-xs font-black">{t.testimonialsSection.title}</h4>
                        <h2 className="text-3xl md:text-4xl font-serif text-white filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                            {t.testimonialsSection.subtitle}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.testimonialsSection.items.map((item, index) => (
                            <div key={index} className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-2xl p-6 hover:border-royal-gold/30 transition-all duration-500">
                                <div className="flex text-royal-gold mb-4">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                </div>
                                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                                    "{item.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-royal-gold to-amber-500 rounded-full flex items-center justify-center text-royal-black font-bold">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white text-sm font-bold">{item.name}</h4>
                                        <p className="text-gray-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* About Us Section */}
            <Section id="about-us" className="bg-transparent py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-3xl p-8 md:p-12 shadow-xl hover:border-royal-gold/30 transition-all duration-500">
                        <div className="max-w-4xl mx-auto">
                            <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-4 text-xs font-black flex items-center gap-2 justify-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                                {t.aboutSection.title}
                            </h4>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] text-center">
                                {t.aboutSection.subtitle}
                            </h2>
                            <p className="text-gray-300 mb-6 text-lg leading-relaxed font-serif italic">
                                {t.aboutSection.quote}
                            </p>
                            <p className="text-white/70 text-sm leading-relaxed mb-6">
                                {t.aboutSection.desc}
                            </p>
                            
                            {/* Features List */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {t.aboutSection.features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-3 text-white/80 text-sm">
                                        <Check className="w-5 h-5 text-royal-gold flex-shrink-0" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 text-emerald-400 text-sm font-bold justify-center">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                                <span>{t.aboutSection.servingSince}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Why Us Section */}
            <Section id="why-us" className="bg-transparent py-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h4 className="text-royal-gold uppercase tracking-[0.3em] mb-4 text-xs font-black flex items-center gap-2 justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                            {t.whyUsSection.title}
                        </h4>
                        <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)] text-center">
                            {t.whyUsSection.subtitle}
                        </h2>
                        
                        <div className="space-y-6">
                            {t.whyUsSection.items.map((item, index) => {
                                const Icon = index === 0 ? Wind : index === 1 ? Shield : Sunrise;
                                return (
                                    <div key={index} className="flex gap-4">
                                        <div className="w-12 h-12 bg-royal-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-6 h-6 text-royal-gold" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-serif text-lg mb-1">{item.title}</h3>
                                            <p className="text-gray-400 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default HomePage;
