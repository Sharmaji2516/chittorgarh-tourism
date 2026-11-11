import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Section from '../components/Section';
import SEOHead from '../components/SEOHead';

const ServiceDetailsPage = () => {
    const { serviceId } = useParams();
    const { t } = useLanguage();

    // SEO Meta and Schema Data per service
    const seoData = {
        taxi: {
            title: "Private Taxi Service in Chittorgarh | Cab Hire & Car Rental",
            description: "Hire a private taxi in Chittorgarh. Comfort cars, SUVs & tempo travellers for local sightseeing, Udaipur transfers, outstation tours. Professional drivers.",
            keywords: "Chittorgarh taxi service, cab hire in Chittorgarh, car rental Chittorgarh, Udaipur to Chittorgarh taxi, Chittorgarh fort taxi, local sightseeing cab Chittorgarh",
            schema: {
                "@context": "https://schema.org",
                "@type": "TaxiService",
                "name": "Visit Chittorgarh Private Taxi Service",
                "description": "Private taxi and car rental services in Chittorgarh for local sightseeing, outstation tours, and airport transfers.",
                "provider": {
                    "@type": "LocalBusiness",
                    "name": "Visit Chittorgarh Tourism Services",
                    "telephone": "+91-7597451057",
                    "priceRange": "₹₹",
                    "image": "https://visitchittorgarh.in/Fort.png",
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Chittorgarh",
                        "addressRegion": "Rajasthan",
                        "addressCountry": "IN"
                    }
                }
            }
        },
        guide: {
            title: "Expert Local Tour Guide in Chittorgarh | Certified Heritage Guide",
            description: "Book a certified local tour guide in Chittorgarh. Discover the rich history of Chittorgarh Fort, Rani Padmini, Vijay Stambh with expert Mewari historians.",
            keywords: "tour guide Chittorgarh, Chittorgarh fort guide, local guide in Chittorgarh, certified tourist guide Chittorgarh, historical guide Chittorgarh",
            schema: {
                "@context": "https://schema.org",
                "@type": "TouristInformationCenter",
                "name": "Visit Chittorgarh Expert Local Guides",
                "description": "Certified local tour guide services in Chittorgarh Fort and local heritage sites.",
                "telephone": "+91-7597451057",
                "priceRange": "₹₹",
                "image": "https://visitchittorgarh.in/Fort.png",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chittorgarh",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                }
            }
        },
        hotel: {
            title: "Hotel Booking & Luxury Heritage Stays in Chittorgarh",
            description: "Find & book the best hotels and heritage stays in Chittorgarh. Get exclusive deals on luxury heritage resorts, budget guest houses, and homestays.",
            keywords: "hotels in Chittorgarh booking, Chittorgarh hotels, heritage stay Chittorgarh, luxury resorts Chittorgarh, budget hotels Chittorgarh, stay near Chittorgarh Fort",
            schema: {
                "@context": "https://schema.org",
                "@type": "LodgingBusiness",
                "name": "Visit Chittorgarh Hotel Booking Assistance",
                "description": "Hotel and heritage property booking assistance services in Chittorgarh.",
                "telephone": "+91-7597451057",
                "priceRange": "₹₹–₹₹₹",
                "image": "https://visitchittorgarh.in/Fort.png",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chittorgarh",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                }
            }
        },
        restaurant: {
            title: "Best Restaurants in Chittorgarh | Mewari Dining & Food Booking",
            description: "Reserve tables at the best restaurants in Chittorgarh. Savor authentic Mewari Thali, traditional Rajasthani food, and dine with stunning fort views.",
            keywords: "restaurants in Chittorgarh, best food in Chittorgarh, Mewari thali Chittorgarh, fine dining Chittorgarh, Rajasthani restaurant Chittorgarh",
            schema: {
                "@context": "https://schema.org",
                "@type": "FoodEstablishment",
                "name": "Visit Chittorgarh Fine Dining Reservations",
                "description": "Restaurant table reservations and culinary experience booking in Chittorgarh.",
                "telephone": "+91-7597451057",
                "priceRange": "₹–₹₹",
                "image": "https://visitchittorgarh.in/Fort.png",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chittorgarh",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                }
            }
        },
        cafe: {
            title: "Top Cafes in Chittorgarh | Best Hangout Spots & Fort Views",
            description: "Explore cozy and instagrammable cafes in Chittorgarh. Enjoy continental food, delicious coffee, and amazing sunset fort views at top local hangouts.",
            keywords: "cafes in Chittorgarh, best coffee in Chittorgarh, fort view cafe Chittorgarh, hangout places in Chittorgarh, rooftop cafe Chittorgarh",
            schema: {
                "@context": "https://schema.org",
                "@type": "FoodEstablishment",
                "name": "Visit Chittorgarh Cafe Bookings",
                "description": "Booking and recommendations for the best cafes and hangout spots in Chittorgarh.",
                "telephone": "+91-7597451057",
                "priceRange": "₹–₹",
                "image": "https://visitchittorgarh.in/Fort.png",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chittorgarh",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                }
            }
        },
        photographer: {
            title: "Professional Photographer in Chittorgarh | Fort Photo Shoots",
            description: "Hire a professional photographer in Chittorgarh. Book pre-wedding shoots, family portraits, and drone photography at majestic Chittorgarh Fort locations.",
            keywords: "photographer in Chittorgarh, fort photo shoot Chittorgarh, pre-wedding shoot Chittorgarh, wedding photographer Chittorgarh, professional photography Chittorgarh",
            schema: {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Visit Chittorgarh Professional Photography Services",
                "description": "Professional photography shoots, drone videography, and pre-wedding shoots at Chittorgarh Fort.",
                "telephone": "+91-7597451057",
                "priceRange": "₹₹–₹₹₹",
                "image": "https://visitchittorgarh.in/Fort.png",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chittorgarh",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                }
            }
        },
        "horse-photo": {
            title: "Royal Horse Photography at Chittorgarh Fort | Souvenir Shoot",
            description: "Experience a royal photo shoot on horseback at Chittorgarh Fort. Traditional Mewari attire, trained horses, and expert posing for unique travel souvenirs.",
            keywords: "horse photography Chittorgarh, royal photoshoot Chittorgarh fort, traditional dress photo shoot Chittorgarh, tourist activity Chittorgarh",
            schema: {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "name": "Visit Chittorgarh Horse Photography Activity",
                "description": "Traditional dress and horse riding photography souvenir services at Chittorgarh Fort.",
                "telephone": "+91-7597451057",
                "priceRange": "₹₹",
                "image": "https://visitchittorgarh.in/Fort.png",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Chittorgarh",
                    "addressRegion": "Rajasthan",
                    "addressCountry": "IN"
                }
            }
        }
    };

    // Content map for services
    const servicesContent = {
        taxi: {
            title: "Private Taxi Service",
            desc: "We provide taxi for local services as well as tours of Rajasthan and outside Rajasthan. Specializing in tours around Chittorgarh Fort and nearby attractions.",
            question: "What do you need?",
            features: [
                "Available: Innova, Sedans, Mini Bus & all types of vehicles",
                "Trusted and experienced local drivers",
                "Taxi available for Chittorgarh Fort & nearby places",
                "Prepaid taxi and all services provided"
            ],
            vehicleCategories: [
                { name: "Sedan Taxi", desc: "Comfortable & budget rides", image: "/assets/images/sedan_taxi.png" },
                { name: "SUV Taxi", desc: "Spacious family trips", image: "/assets/images/suv_taxi.png" },
                { name: "XUV / Premium SUV", desc: "Premium travel experience", image: "/assets/images/suv_taxi.png" },
                { name: "Innova Crysta", desc: "Luxury family/group travel", image: "/assets/images/suv_taxi.png" },
                { name: "Tempo Traveller", desc: "Group tours & events", image: "/assets/images/tempo_traveller.png" },
                { name: "Luxury Car Rental", desc: "Premium travel service", image: "/assets/images/sedan_taxi.png" }
            ],
            travelServices: [
                "Local Sightseeing Tours",
                "Outstation Taxi Service",
                "One-Way Cab Service",
                "Round Trip Taxi",
                "Airport Pickup & Drop",
                "Hotel Pickup & Drop",
                "Tour Packages",
                "Corporate Travel Service",
                "Wedding Transportation",
                "Custom Tour Packages"
            ],
            image: "/assets/images/Private Taxi.jpg"
        },
        guide: {
            title: "Expert Local Guide",
            desc: "Unlock the secrets of Chittorgarh with our certified heritage historians who bring every stone and sculpture to life with their stories.",
            question: "Want to know the real history?",
            features: [
                "Certified local guides",
                "Multi-lingual storytelling",
                "Deep historical insights",
                "Customized walking tours"
            ],
            image: "/assets/images/Guide.jpg"
        },
        hotel: {
            title: "Hotel & Stay Booking",
            desc: "From 16th-century fort palaces to modern luxury resorts, we help you find the perfect stay that fits your style and budget.",
            question: "Looking for a royal stay?",
            features: [
                "Heritage property bookings",
                "Luxury and budget options",
                "Exclusive deals and discounts",
                "Seamless booking experience"
            ],
            image: "/assets/images/Royal Stays.jpg"
        },
        restaurant: {
            title: "Fine Dining Reservations",
            desc: "Savor the best of Mewari and global cuisine. We provide exclusive access and reservations to the city's most renowned dining establishments.",
            question: "Craving authentic Mewari food?",
            features: [
                "Table reservations at top restaurants",
                "Authentic Mewari Thali experiences",
                "Rooftop dining with fort views",
                "Customized menu options"
            ],
            image: "/assets/images/Dinning Hall.jpg"
        },
        cafe: {
            title: "Cozy Cafes & Hangouts",
            desc: "Relax at the best hangout spots with views. We recommend and book the most Instagrammable cafes in town.",
            question: "Need a coffee break?",
            features: [
                "Recommendations for best cafes",
                "Fort view seating options",
                "Great coffee and continental food",
                "Perfect for evening relaxation"
            ],
            image: "/assets/images/Cafe.jpg"
        },
        photographer: {
            title: "Professional Photographer",
            desc: "Capture your memories with professional shoots. Our photographers know the best spots and angles in the fort.",
            question: "Want professional memories?",
            features: [
                "Pre-wedding and couple shoots",
                "Family portrait sessions",
                "Drone photography available",
                "Quick delivery of edited photos"
            ],
            image: "/assets/images/Photography.jpg"
        },
        "horse-photo": {
            title: "Horse Photography",
            desc: "Get majestic photos on horseback at the fort. A unique experience to feel like royalty.",
            question: "Want a royal photo?",
            features: [
                "Trained horses for photography",
                "Traditional attire available",
                "Safe and guided experience",
                "Unique souvenir from Chittorgarh"
            ],
            image: "/assets/images/Horse Photography.jpg"
        }
    };

    const service = servicesContent[serviceId];
    const seo = seoData[serviceId] || {
        title: "Tourism Services | Visit Chittorgarh",
        description: "Explore tourism services in Chittorgarh - taxis, guides, hotels, and custom travel arrangements.",
        keywords: "Chittorgarh tourism, tourism services, travel guides, taxi service"
    };

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-royal-gold mb-4">Service Not Found</h1>
                    <p className="text-gray-400">The requested service details are not available.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-20">
            <SEOHead
                title={seo.title}
                description={seo.description}
                canonical={`/service/${serviceId}`}
                keywords={seo.keywords}
                schema={seo.schema}
            />
            <Section>
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-royal-black/30 backdrop-blur-sm border border-royal-gold/10 rounded-3xl p-8 md:p-12 shadow-xl hover:border-royal-gold/30 transition-all duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Content Side */}
                            <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-serif text-royal-gold mb-6 filter drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]">
                                    {service.title}
                                </h1>
                                <p className="text-gray-300 mb-8 text-lg leading-relaxed font-serif italic">
                                    "{service.desc}"
                                </p>
                                
                                <div className="w-full max-w-sm bg-royal-black/40 p-6 rounded-2xl border border-royal-gold/5 mb-8">
                                    <h2 className="text-lg font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2 justify-center md:justify-start">
                                        <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                                        {service.question}
                                    </h2>
                                    <ul className="space-y-3 text-left">
                                        {service.features.map((feature, index) => (
                                            <li key={index} className="flex gap-3 text-sm leading-relaxed group/item">
                                                <span className="text-royal-gold shrink-0 mt-0.5 opacity-40 group-hover/item:opacity-100 transition-opacity">✦</span>
                                                <span className="text-royal-white/70 group-hover/item:text-royal-white/80 transition-colors">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <a 
                                    href="https://wa.me/917597451057?text=Hello!%20I%20want%20to%20inquire%20about%20your%20service:%20"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-8 py-3 overflow-hidden rounded-full border border-royal-gold/20 hover:border-royal-gold/50 transition-all duration-700 bg-royal-gold/5"
                                >
                                    <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-royal-gold group-hover:text-white transition-colors">
                                        Book / Inquire Now
                                    </span>
                                    <div className="absolute inset-0 bg-royal-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                </a>
                            </div>

                            {/* Image Side */}
                            <div className="rounded-3xl overflow-hidden border border-royal-gold/20 shadow-2xl h-[400px] md:h-[500px] group">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* Vehicle Categories & Travel Services */}
                        {(service.vehicleCategories || service.travelServices) && (
                            <div className="mt-12 pt-12 border-t border-royal-gold/10 grid grid-cols-1 md:grid-cols-2 gap-12">
                                {/* Vehicle Categories */}
                                {service.vehicleCategories && (
                                    <div>
                                        <h2 className="text-2xl font-serif text-royal-gold mb-6 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                                            Vehicle Categories
                                        </h2>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {service.vehicleCategories.map((category, index) => (
                                                <div key={index} className="bg-royal-black/40 p-4 rounded-xl border border-royal-gold/5 hover:border-royal-gold/20 transition-all flex gap-4 items-center">
                                                    {category.image && (
                                                        <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-white/5">
                                                            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white mb-1">{category.name}</h3>
                                                        <p className="text-xs text-gray-400">{category.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Travel Services */}
                                {service.travelServices && (
                                    <div>
                                        <h2 className="text-2xl font-serif text-royal-gold mb-6 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-royal-gold"></span>
                                            Travel Services
                                        </h2>
                                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                            {service.travelServices.map((serviceName, index) => (
                                                <li key={index} className="flex gap-2 items-center group/item">
                                                    <span className="text-royal-gold opacity-40 group-hover/item:opacity-100 transition-opacity">✦</span>
                                                    <span className="text-royal-white/70 group-hover/item:text-royal-white/80 transition-colors">{serviceName}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ServiceDetailsPage;
