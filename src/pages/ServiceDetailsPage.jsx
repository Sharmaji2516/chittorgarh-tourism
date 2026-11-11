import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Compass, MessageCircle, Phone, CheckCircle2, ArrowRight, Car, Map, Hotel, Utensils, Coffee, Camera } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const ServiceDetailsPage = () => {
    const { serviceId } = useParams();
    const location = useLocation();

    // Deduce serviceId from path if routed from /private-guide or /private-taxi
    let effectiveService = serviceId;
    if (!effectiveService) {
        if (location.pathname.includes('guide')) effectiveService = 'guide';
        else if (location.pathname.includes('taxi')) effectiveService = 'taxi';
        else effectiveService = 'guide';
    }

    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const seoData = {
        taxi: {
            title: "Private Taxi Service in Chittorgarh | Cab Hire & Car Rental",
            description: "Hire a private taxi in Chittorgarh. Comfort cars, SUVs & tempo travellers for local sightseeing, Udaipur transfers, outstation tours. Professional drivers.",
            keywords: "Chittorgarh taxi service, cab hire in Chittorgarh, car rental Chittorgarh, Udaipur to Chittorgarh taxi, Chittorgarh fort taxi",
            canonical: "/service/taxi"
        },
        guide: {
            title: "Expert Local Tour Guide in Chittorgarh | Certified Heritage Guide",
            description: "Book a certified local tour guide in Chittorgarh. Discover the rich history of Chittorgarh Fort, Rani Padmini, Vijay Stambh with expert Mewari historians.",
            keywords: "tour guide Chittorgarh, Chittorgarh fort guide, local guide in Chittorgarh, certified tourist guide Chittorgarh",
            canonical: "/service/guide"
        },
        hotel: {
            title: "Hotel Booking & Luxury Heritage Stays in Chittorgarh",
            description: "Find & book the best hotels and heritage stays in Chittorgarh. Exclusive deals on luxury heritage resorts and fort-view havelis.",
            keywords: "hotels in Chittorgarh booking, Chittorgarh hotels, heritage stay Chittorgarh, luxury resorts Chittorgarh",
            canonical: "/service/hotel"
        },
        restaurant: {
            title: "Best Restaurants in Chittorgarh | Mewari Dining & Food Booking",
            description: "Reserve tables at the best restaurants in Chittorgarh. Savor authentic Mewari Thali, Dal Baati Churma, and dine with stunning fort views.",
            keywords: "restaurants in Chittorgarh, best food in Chittorgarh, Mewari thali Chittorgarh, fine dining Chittorgarh",
            canonical: "/service/restaurant"
        },
        cafe: {
            title: "Top Cafes in Chittorgarh | Best Hangout Spots & Fort Views",
            description: "Explore cozy cafes in Chittorgarh. Enjoy continental food, delicious coffee, and sunset fort views at top local hangouts.",
            keywords: "cafes in Chittorgarh, best coffee in Chittorgarh, fort view cafe Chittorgarh, hangout places in Chittorgarh",
            canonical: "/service/cafe"
        },
        photographer: {
            title: "Professional Photographer in Chittorgarh | Fort Photo Shoots",
            description: "Hire a professional photographer in Chittorgarh. Book pre-wedding shoots, family portraits, and sunset shoots at Chittorgarh Fort.",
            keywords: "photographer in Chittorgarh, fort photo shoot Chittorgarh, pre-wedding shoot Chittorgarh",
            canonical: "/service/photographer"
        },
        "horse-photo": {
            title: "Royal Horse Photography at Chittorgarh Fort | Souvenir Shoot",
            description: "Experience a royal photo shoot on horseback at Chittorgarh Fort in traditional Mewari attire.",
            keywords: "horse photography Chittorgarh, royal photoshoot Chittorgarh fort, traditional dress photo shoot",
            canonical: "/service/horse-photo"
        }
    };

    const servicesContent = {
        taxi: {
            title: "Private Taxi & Cab Service",
            desc: "Punctual, sanitized private cabs for Chittorgarh Fort exploration, Udaipur airport transfers, and customized Rajasthan road trips. Chauffeurs are local, courteous, and highly experienced.",
            question: "Why Book Our Private Cab Fleet?",
            features: [
                "Available fleet: Swift Dzire, Innova Crysta, Ertiga & Tempo Travellers",
                "Includes full internal driving between all 700-acre fort monuments",
                "Punctual airport pickup from Udaipur (UDR) & Chittorgarh Railway Station",
                "100% transparent quotation with toll taxes & parking accounted for"
            ],
            vehicleCategories: [
                { name: "Sedan (Dzire / Etios)", desc: "1-4 Pax • Smooth AC Comfort", image: "/assets/images/sedan_taxi.webp" },
                { name: "SUV (Innova Crysta)", desc: "5-7 Pax • High Clearance & Luxury", image: "/assets/images/suv_taxi.webp" },
                { name: "Tempo Traveller", desc: "9-16 Pax • Large Family & Group", image: "/assets/images/tempo_traveller.webp" },
                { name: "Sanwaliya Detour Cab", desc: "Direct Mandaphiya Pilgrimage", image: "/assets/images/Private Taxi.webp" }
            ],
            travelServices: [
                "Local Fort Circuit Sightseeing",
                "Udaipur to Chittorgarh Airport Transfer",
                "Jaipur to Chittorgarh Outstation Cab",
                "Shri Sanwariya Seth Day Pilgrimage",
                "Menal Waterfall & Bassi Wildlife Excursion",
                "Multi-Day Rajasthan Heritage Road Trips"
            ],
            image: "/assets/images/Private Taxi.webp"
        },
        guide: {
            title: "Authorized Private Tour Guide",
            desc: "Unlock the epic history of Mewar with certified local historians who narrate the true legends of Rani Padmini, Maharana Kumbha, and the historic sieges with deep scholarly reverence.",
            question: "What Makes Our Guides Exceptional?",
            features: [
                "Govt. authorized and certified by tourism authorities",
                "Fluent in English, Hindi, and regional Mewari dialect",
                "Paced comfortably for families, children, and elderly travelers",
                "Protection from unauthorized hawkers, touts, and unverified vendors"
            ],
            travelServices: [
                "Full Fort Citadel Guided Tour (4-5 Hours)",
                "Padmini Palace & Jauhar Kund Historical Walk",
                "Vijay Stambha Architectural & Iconography Tour",
                "Evening Light & Sound Show Narration",
                "Photography & Sunset Panoramic Walk",
                "School, College & Group Educational Excursions"
            ],
            image: "/assets/images/Guide.webp"
        },
        hotel: {
            title: "Heritage Havelis & Curated Stays",
            desc: "Rest like royalty in verified heritage havelis, boutique fort-view palaces, and comfortable luxury resorts with personalized concierge assistance.",
            question: "Our Heritage Stay Promise",
            features: [
                "Handpicked properties with direct view of Chittorgarh Fort",
                "Authentic royal courtyards, jharokhas, and garden swimming pools",
                "Best negotiated direct rates with verified partner havelis",
                "Traditional Mewari morning breakfast and evening cultural music"
            ],
            image: "/assets/images/Royal Stays.webp"
        },
        restaurant: {
            title: "Traditional Mewari Fine Dining",
            desc: "Indulge in royal Rajasthani recipes passed down through generations. Prepared in pure desi ghee with signature spice blends.",
            question: "Culinary Highlights",
            features: [
                "Signature Dal Baati Churma cooked with slow-fired baatis",
                "Gatte ki Sabji, Ker Sangri & Kadhi Pakora",
                "Hygienic, certified family-friendly heritage dining halls",
                "Special dietary requirements (Jain food, fasting meals) accommodated"
            ],
            image: "/assets/images/Dinning Hall.webp"
        },
        cafe: {
            title: "Cozy Rooftop Cafes & Hangouts",
            desc: "Relax with freshly brewed artisan coffee, continental bites, and panoramic rooftop sunset views overlooking the ancient ramparts.",
            question: "Cafe Ambiance",
            features: [
                "Sunset views over Chittorgarh city and the fort hill",
                "Fresh espresso, iced teas, wood-fired pizzas, and snacks",
                "High-speed Wi-Fi and relaxed work-friendly seating",
                "Instagrammable traditional decor with modern comfort"
            ],
            image: "/assets/images/Cafe.webp"
        },
        photographer: {
            title: "Professional Fort Photography",
            desc: "Capture timeless holiday memories against the monumental sandstone arches, carved towers, and serene water pavilions of Chittorgarh.",
            question: "Photography Packages",
            features: [
                "Couples, pre-wedding, and family portrait sessions",
                "Golden hour sunset shoots at Suraj Pol and Gaumukh",
                "High-resolution edited digital portraits delivered within 48 hours",
                "Optional traditional royal Mewari costume styling"
            ],
            image: "/assets/images/Photography.webp"
        },
        "horse-photo": {
            title: "Royal Horse Photography Experience",
            desc: "Pose in regal Rajasthani safas and traditional royal attire on trained Marwari horses outside the grand fort gates.",
            question: "Experience Highlights",
            features: [
                "Authentic Marwari horses known for distinctive curved ears",
                "Complete traditional Mewari safa (turban) and dress styling",
                "Instant printed souvenir photo and digital high-res copy",
                "Supervised by professional animal handlers for total safety"
            ],
            image: "/assets/images/Horse Photography.webp"
        }
    };

    const service = servicesContent[effectiveService] || servicesContent.guide;
    const seo = seoData[effectiveService] || seoData.guide;

    const handleWhatsApp = () => {
        const msg = `🏰 *Inquiry for ${service.title}*\n\n` +
            `Hello Visit Chittorgarh! I am interested in booking *${service.title}*.\n` +
            `Please share availability, rates, and customized details. Thank you!`;
        trackWhatsAppClick(`service_page_${effectiveService}`);
        window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title={seo.title}
                description={seo.description}
                canonical={seo.canonical}
                keywords={seo.keywords}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
                    <a href="/" className="hover:text-[#A65F3D]">Home</a>
                    <span>/</span>
                    <span className="text-[#25231F] font-bold">{service.title}</span>
                </nav>

                {/* Hero Showcase Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage mb-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
                            Verified Tourism Service
                        </span>
                        <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] leading-tight">
                            {service.title}
                        </h1>
                        <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed">
                            {service.desc}
                        </p>

                        <div className="bg-[#F8F5EF] p-6 rounded-2xl border border-[#EFE7D9]">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] mb-3">
                                {service.question}
                            </h3>
                            <ul className="space-y-2.5 text-xs text-[#25231F]/80">
                                {service.features.map((feat, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                            <button
                                onClick={handleWhatsApp}
                                className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Inquire on WhatsApp
                            </button>
                            <button
                                onClick={triggerPlanTrip}
                                className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-transform active:scale-95"
                            >
                                <Compass className="w-4 h-4" />
                                Plan Custom Tour
                            </button>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Vehicle Categories (if taxi) */}
                {service.vehicleCategories && (
                    <div className="mb-14">
                        <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-6">
                            Vehicle Fleet Categories
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {service.vehicleCategories.map((v, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-heritage text-center flex flex-col justify-between">
                                    <div>
                                        <div className="h-32 rounded-xl overflow-hidden mb-4 bg-[#F8F5EF]">
                                            <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-base font-serif font-bold text-[#25231F] mb-1">{v.name}</h3>
                                        <p className="text-xs text-[#25231F]/65 mb-4">{v.desc}</p>
                                    </div>
                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full py-2 bg-[#25231F] hover:bg-[#A65F3D] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                                    >
                                        Inquire Fare
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Service Types / Options */}
                {service.travelServices && (
                    <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-12">
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-6">
                            Popular Service Routes & Options
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {service.travelServices.map((route, idx) => (
                                <div key={idx} className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9] flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-[#C49A32] shrink-0"></span>
                                    <span className="text-xs font-semibold text-[#25231F]">{route}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Direct Contact Bar */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                        <h3 className="text-xl font-serif font-bold text-white mb-1">Direct Assistance from Local Desk</h3>
                        <p className="text-xs text-white/70">Our travel concierges are available on WhatsApp and phone.</p>
                    </div>
                    <div className="flex gap-3">
                        <a
                            href="tel:+917597451057"
                            onClick={() => trackPhoneCallClick(`service_call_${effectiveService}`)}
                            className="px-6 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                        >
                            <Phone className="w-4 h-4" /> Call +91 75974 51057
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;
