import React from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Compass, MessageCircle, Phone, CheckCircle2, ArrowRight, Car, Map, Hotel, Utensils, Coffee, Camera, Globe, Languages, Award, Sparkles, Star, Clock, Droplets } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';
import { getLocalizedPath } from '../config/languages';

const ServiceDetailsPage = () => {
    const { serviceId } = useParams();
    const location = useLocation();
    const { t, lang } = useLanguage();

    const pageT = t?.serviceDetails || {};
    const taxiT = t?.taxi || {};
    const guideT = t?.guide || {};

    // Deduce serviceId from path if routed from /private-guide or /private-taxi
    let effectiveService = serviceId;
    if (!effectiveService) {
        if (location.pathname.includes('guide')) effectiveService = 'guide';
        else if (location.pathname.includes('taxi')) effectiveService = 'taxi';
        else effectiveService = 'guide';
    }

    const WHATSAPP_NUMBER = '917597451057';
  const handleWhatsApp = (serviceTitle) => {
    if (typeof window === 'undefined') return;
    const msg = `Hello, I am interested in the service: ${serviceTitle || effectiveService}. Please share details and rates.`;
    trackWhatsAppClick(`service_${effectiveService}_whatsapp`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const seoData = {
        taxi: {
            title: "Private Taxi Service in Chittorgarh | Cab Hire & Car Rental",
            description: "Hire a private taxi in Chittorgarh. Comfort cars, SUVs & tempo travellers for local sightseeing, Udaipur transfers, outstation tours. Professional drivers.",
            keywords: "Chittorgarh taxi service, cab hire in Chittorgarh, car rental Chittorgarh, Udaipur to Chittorgarh taxi, Chittorgarh fort taxi",
            canonical: getLocalizedPath('/service/taxi', lang)
        },
        guide: {
            title: "Expert Local Tour Guide in Chittorgarh | Certified Heritage Guide",
            description: "Book a certified local tour guide in Chittorgarh. Discover the rich history of Chittorgarh Fort, Rani Padmini, Vijay Stambh with expert Mewari historians.",
            keywords: "tour guide Chittorgarh, Chittorgarh fort guide, local guide in Chittorgarh, certified tourist guide Chittorgarh",
            canonical: getLocalizedPath('/service/guide', lang)
        },
        hotel: {
            title: "Hotel Booking & Luxury Heritage Stays in Chittorgarh",
            description: "Find & book the best hotels and heritage stays in Chittorgarh. Exclusive deals on luxury heritage resorts and fort-view havelis.",
            keywords: "hotels in Chittorgarh booking, Chittorgarh hotels, heritage stay Chittorgarh, luxury resorts Chittorgarh",
            canonical: getLocalizedPath('/service/hotel', lang)
        },
        restaurant: {
            title: "Best Restaurants in Chittorgarh | Mewari Dining & Food Booking",
            description: "Reserve tables at the best restaurants in Chittorgarh. Savor authentic Mewari Thali, Dal Baati Churma, and dine with stunning fort views.",
            keywords: "restaurants in Chittorgarh, best food in Chittorgarh, Mewari thali Chittorgarh, fine dining Chittorgarh",
            canonical: getLocalizedPath('/service/restaurant', lang)
        },
        cafe: {
            title: "Top Cafes in Chittorgarh | Best Hangout Spots & Fort Views",
            description: "Explore cozy cafes in Chittorgarh. Enjoy continental food, delicious coffee, and sunset fort views at top local hangouts.",
            keywords: "cafes in Chittorgarh, best coffee in Chittorgarh, fort view cafe Chittorgarh, hangout places in Chittorgarh",
            canonical: getLocalizedPath('/service/cafe', lang)
        },
        photographer: {
            title: "Professional Photographer in Chittorgarh | Fort Photo Shoots",
            description: "Hire a professional photographer in Chittorgarh. Book pre-wedding shoots, family portraits, and sunset shoots at Chittorgarh Fort.",
            keywords: "photographer in Chittorgarh, fort photo shoot Chittorgarh, pre-wedding shoot Chittorgarh",
            canonical: getLocalizedPath('/service/photographer', lang)
        },
        "horse-photo": {
            title: "Royal Horse Photography at Chittorgarh Fort | Souvenir Shoot",
            description: "Experience a royal photo shoot on horseback at Chittorgarh Fort in traditional Mewari attire.",
            keywords: "horse photography Chittorgarh, royal photoshoot Chittorgarh fort, traditional dress photo shoot",
            canonical: getLocalizedPath('/service/horse-photo', lang)
        }
    };

    const servicesContent = {
        taxi: {
            title: pageT.taxiTitle || taxiT.heading || "Private Taxi & Cab Service in Chittorgarh",
            desc: pageT.taxiDesc || taxiT.desc || "Punctual, sanitized private cabs for Chittorgarh Fort exploration, Udaipur airport transfers, and customized Rajasthan road trips. Chauffeurs are local, courteous, and highly experienced.",
            question: pageT.taxiWhy || "Why Book Our Private Cab Fleet?",
            badge: "Sanitized AC Private Chauffeur Fleet • Doorstep Transfers",
            startingPrice: "Starting From ₹2,400 (~$28 USD)",
            startingNote: "*Rates may vary based on route, vehicle model & family size",
            valuePillars: [
                { title: "Mineral Water Included", subtitle: "Complimentary Bottles in Every Cab", icon: Droplets },
                { title: "Tolls & Parking Accounted", subtitle: "100% Transparent Fleet Quotation", icon: ShieldCheck },
                { title: "Punctual Doorstep Pickup", subtitle: "Hotel, Airport & Railway Station", icon: Clock },
                { title: "700-Acre Fort Circuit", subtitle: "Doorstep drop to all 7 citadel gates", icon: Car }
            ],
            features: taxiT.features || [
                "Available fleet: Swift Dzire, Innova Crysta, Ertiga & Tempo Travellers",
                "Complimentary Packaged Mineral Water Bottles provided in every vehicle",
                "Includes full internal driving between all 700-acre fort monuments",
                "Punctual airport pickup from Udaipur (UDR) & Chittorgarh Railway Station",
                "100% transparent quotation with toll taxes (NH27) & parking accounted for"
            ],
            vehicleCategories: [
                {
                    name: "AC Sedan (Swift Dzire / Etios)",
                    capacity: "1 - 4 Guests",
                    price: "Starting From ₹2,400 (~$28 USD)",
                    tag: "Most Popular for Couples & Small Families",
                    features: [
                        "Complimentary Packaged Mineral Water Bottles",
                        "Chilled Air Conditioning & Clean Sanitized Interior",
                        "NH27 Highway Tolls & Fort Parking Accounted",
                        "Punctual Doorstep Hotel / Airport Pickup"
                    ]
                },
                {
                    name: "Luxury SUV (Innova Crysta)",
                    capacity: "5 - 7 Guests",
                    price: "Starting From ₹3,500 (~$42 USD)",
                    tag: "Best for Families & Highway Luxury",
                    features: [
                        "Complimentary Packaged Mineral Water Bottles",
                        "Plush Reclining Captain Seats & High Clearance",
                        "Spacious Luggage Boot for 5-6 Large Suitcases",
                        "Senior Experienced Highway Chauffeur"
                    ]
                },
                {
                    name: "Tempo Traveller / Urbania",
                    capacity: "9 - 16 Guests",
                    price: "Starting From ₹5,500 (~$65 USD)",
                    tag: "Ideal for Large Groups & Pilgrimages",
                    features: [
                        "Complimentary Packaged Mineral Water Bottles",
                        "High-Roof Pushback Seats & Twin AC",
                        "All 700-Acre Fort Monument Internal Transfers",
                        "Dedicated Driver & Group Luggage Logistics"
                    ]
                },
                {
                    name: "Shri Sanwariya Seth Detour Cab",
                    capacity: "Dedicated AC Cab",
                    price: "Starting From ₹2,200 (~$26 USD)",
                    tag: "Mandaphiya Pilgrimage + Fort Circuit",
                    features: [
                        "Complimentary Packaged Mineral Water Bottles",
                        "Doorstep Mandir Drop & Waiting Included",
                        "Flexible Unhurried Darshan Timing",
                        "Roundtrip Return to Hotel or Railway Station"
                    ]
                }
            ],
            travelServices: [
                "Local Fort Circuit Sightseeing",
                "Udaipur to Chittorgarh Airport Transfer",
                "Jaipur to Chittorgarh Outstation Cab",
                "Shri Sanwariya Seth Day Pilgrimage",
                "Menal Waterfall & Bassi Wildlife Excursion",
                "Multi-Day Rajasthan Heritage Road Trips"
            ]
        },
        guide: {
            title: pageT.guideTitle || guideT.heading || "Authorized Private Tour Guide in Chittorgarh Fort",
            desc: pageT.guideDesc || guideT.desc || "Unlock the epic history of Mewar with certified local historians who narrate the true legends of Rani Padmini, Maharana Kumbha, and the historic sieges with deep scholarly reverence. Certified guides available in English, French (Français), German (Deutsch), Spanish & Hindi.",
            question: pageT.guideWhy || "What Makes Our Historians Exceptional?",
            badge: "Rajasthan Tourism (RTDC) Certified Historians",
            startingPrice: "Starting From ₹1,500 (~$18 USD)",
            startingNote: "*Rates may vary based on group size & foreign language selection",
            valuePillars: [
                { title: "Govt. Certified", subtitle: "RTDC & Ministry Licensed", icon: Award },
                { title: "Multilingual Scholars", subtitle: "English, French, German & Hindi", icon: Globe },
                { title: "Zero Touts / Scams", subtitle: "No Forced Commission Shopping", icon: ShieldCheck },
                { title: "Mineral Water Included", subtitle: "Complimentary Sealed Bottles", icon: Droplets }
            ],
            features: guideT.features || [
                "Govt. authorized and certified by Rajasthan Tourism (RTDC) & Ministry of Tourism",
                "Foreign language specialists: English, French (Français), German (Deutsch), Spanish & Hindi",
                "100% Protection from touts, gate scammers, and commercial commission shopping traps",
                "Leisurely custom pace suited for families, seniors, photographers & children"
            ],
            languages: [
                { name: "English Speaking Guide", flag: "🇬🇧", level: "Fluent Historical Narration", note: "Available Daily • Instant Booking" },
                { name: "Guide Francophone (French)", flag: "🇫🇷", level: "Guides Certifiés en Français", note: "Spécialiste Touristes Français" },
                { name: "German Speaking Guide (Deutsch)", flag: "🇩🇪", level: "Lizenzierte Reiseleiter", note: "Gäste aus DE, AT & CH" },
                { name: "Spanish Speaking Guide (Español)", flag: "🇪🇸", level: "Guía Oficial en Español", note: "Previa Reserva Recomendada" },
                { name: "Italian Speaking Guide (Italiano)", flag: "🇮🇹", level: "Guida Autorizzata in Italiano", note: "Turisti dall'Italia" },
                { name: "Hindi & Mewari Native Historian", flag: "🇮🇳", level: "स्थानीय इतिहासकार व शोधकर्ता", note: "प्रामाणिक ऐतिहासिक किंवदंतियां" }
            ],
            guidePackages: [
                {
                    title: "Half-Day Citadel Heritage Tour",
                    duration: "3 – 4 Hours",
                    price: "Starting From ₹1,500 (~$18 USD)",
                    target: "English / Hindi Certified Historian",
                    highlights: [
                        "All 7 Historic Fort Gates (Padan Pol to Ram Pol)",
                        "Vijay Stambha (9-Story Tower of Victory)",
                        "Rani Padmini Palace & Water Pavilion",
                        "Gaumukh Holy Spring Reservoir",
                        "Zero Forced Shopping Guarantee"
                    ]
                },
                {
                    title: "Full-Day Deep Citadel & Temples Expedition",
                    duration: "6 – 7 Hours",
                    price: "Starting From ₹2,500 (~$30 USD)",
                    target: "Complete 700-Acre Fort Circuit",
                    highlights: [
                        "All 65 Protected Monuments & Temples",
                        "Rana Kumbha Palace & Ancient Jauhar Kund",
                        "12th-Century Kirti Stambh (Tower of Fame)",
                        "Secret Rampart Sunset Vantage Points",
                        "Evening Sound & Light Show Coordination"
                    ]
                },
                {
                    title: "Foreign Language Specialist Guide",
                    duration: "Half Day or Full Day",
                    price: "Starting From ₹2,500 (~$30 USD)",
                    target: "French / German / Spanish / Italian",
                    highlights: [
                        "Ministry of Tourism Licensed Language Expert",
                        "Native/Fluent Foreign Language Narration",
                        "Western Courtesies & Dietary Assistance",
                        "Hotel & Chauffeur Coordination",
                        "Complimentary Sealed Mineral Water Bottles"
                    ]
                }
            ],
            monumentsCovered: [
                "All 7 Ancient Fort Gates (Padan Pol to Ram Pol)",
                "Vijay Stambha (Tower of Victory • 1448 CE)",
                "Kirti Stambh (Tower of Fame • 12th Century)",
                "Rani Padmini Palace & Water Pavilion",
                "Rana Kumbha Palace & Sacred Jauhar Kund",
                "Gaumukh Holy Spring Reservoir",
                "Meera Bai Temple & Kumbha Shyam Mandir",
                "Kalika Mata Mandir (8th-Century Sun Temple)",
                "Ratan Singh Palace & Lake Pavilion",
                "Suraj Pol (Sunrise Gate on Eastern Ramparts)"
            ],
            travelServices: [
                "Full Fort Citadel Guided Tour (3-4 Hours)",
                "Foreign Language Specialist (French / German / Spanish)",
                "Padmini Palace & Jauhar Kund Historical Walk",
                "Vijay Stambha Architectural & Iconography Tour",
                "Evening Light & Sound Show Narration",
                "Photography & Sunset Panoramic Walk",
                "School, College & Group Educational Excursions"
            ]
        },
        hotel: {
            title: t.staysPage?.title || "Heritage Havelis & Curated Stays",
            desc: t.staysPage?.desc || "Rest like royalty in verified heritage havelis, boutique fort-view palaces, and comfortable luxury resorts with personalized concierge assistance.",
            question: "Our Heritage Stay Promise",
            badge: "Verified Heritage Partner Havelis & Resorts",
            startingPrice: "Starting From ₹2,500 / Night",
            startingNote: "*Rates vary by season & heritage room category",
            valuePillars: [
                { title: "Fort View Properties", subtitle: "Direct Views of the Historic Ramparts", icon: Hotel },
                { title: "Direct Partner Rates", subtitle: "Best Negotiated Tariffs & Zero Markups", icon: ShieldCheck },
                { title: "Complimentary Breakfast", subtitle: "Authentic Mewari Morning Spread", icon: Utensils },
                { title: "Mineral Water Included", subtitle: "Complimentary In-Room Mineral Water", icon: Droplets }
            ],
            features: [
                "Handpicked properties with direct view of Chittorgarh Fort",
                "Authentic royal courtyards, jharokhas, and garden swimming pools",
                "Best negotiated direct rates with verified partner havelis",
                "Traditional Mewari morning breakfast and evening cultural music"
            ]
        },
        restaurant: {
            title: t.flavorsPage?.title || "Traditional Mewari Fine Dining",
            desc: t.flavorsPage?.desc || "Indulge in royal Rajasthani recipes passed down through generations. Prepared in pure desi ghee with signature spice blends.",
            question: "Culinary Highlights",
            badge: "Hygienic Verified Heritage Dining Halls",
            startingPrice: "Starting From ₹350 / Thali",
            startingNote: "*Pure Desi Ghee & Mild Spices for International Guests",
            valuePillars: [
                { title: "Pure Desi Ghee", subtitle: "Slow-Cooked Authentic Recipes", icon: Utensils },
                { title: "Sealed RO Water", subtitle: "Highest Hygiene Standards for Guests", icon: Droplets },
                { title: "Mild Spice Adjustments", subtitle: "Tailored for Foreign & Family Palates", icon: ShieldCheck },
                { title: "Table Reservations", subtitle: "Instant Priority Seating Guarantee", icon: Clock }
            ],
            features: [
                "Signature Dal Baati Churma cooked with slow-fired baatis",
                "Gatte ki Sabji, Ker Sangri & Kadhi Pakora",
                "Hygienic, certified family-friendly heritage dining halls",
                "Special dietary requirements (Jain food, fasting meals) accommodated"
            ]
        },
        cafe: {
            title: "Cozy Rooftop Cafes & Hangouts",
            desc: "Relax with freshly brewed artisan coffee, continental bites, and panoramic rooftop sunset views overlooking the ancient ramparts.",
            question: "Cafe Ambiance",
            badge: "Panoramic Rooftop Fort Sunset Spots",
            startingPrice: "Starting From ₹150",
            startingNote: "*Artisan Coffees, Fresh Pastas & Local Snacks",
            valuePillars: [
                { title: "Sunset Rampart Views", subtitle: "Unrivaled Photography Vantage Points", icon: Coffee },
                { title: "High-Speed Wi-Fi", subtitle: "Work-Friendly Relaxed Seating", icon: Globe },
                { title: "Artisan Brews", subtitle: "Fresh Espresso & Iced Coolers", icon: Droplets },
                { title: "Hygienic Preparation", subtitle: "Sealed RO Water & Fresh Ingredients", icon: ShieldCheck }
            ],
            features: [
                "Sunset views over Chittorgarh city and the fort hill",
                "Fresh espresso, iced teas, wood-fired pizzas, and snacks",
                "High-speed Wi-Fi and relaxed work-friendly seating",
                "Instagrammable traditional decor with modern comfort"
            ]
        },
        photographer: {
            title: "Professional Fort Photography",
            desc: "Capture timeless holiday memories against the monumental sandstone arches, carved towers, and serene water pavilions of Chittorgarh.",
            question: "Photography Packages",
            badge: "Verified Fort Portrait & Heritage Photographers",
            startingPrice: "Starting From ₹3,500",
            startingNote: "*High-Res Edited Portraits Delivered in 48 Hours",
            valuePillars: [
                { title: "Golden Hour Shoots", subtitle: "Sunset Light at Suraj Pol & Gaumukh", icon: Camera },
                { title: "48-Hour Delivery", subtitle: "High-Res Edited Digital Gallery", icon: Clock },
                { title: "Costume Styling", subtitle: "Optional Mewari Royal Rajputana Turbans", icon: Sparkles },
                { title: "Punctual Shoot Escort", subtitle: "Permit Guidance & Gate Assistance", icon: ShieldCheck }
            ],
            features: [
                "Couples, pre-wedding, and family portrait sessions",
                "Golden hour sunset shoots at Suraj Pol and Gaumukh",
                "High-resolution edited digital portraits delivered within 48 hours",
                "Optional traditional royal Mewari costume styling"
            ]
        },
        "horse-photo": {
            title: "Royal Horse Photography Experience",
            desc: "Pose in regal Rajasthani safas and traditional royal attire on trained Marwari horses outside the grand fort gates.",
            question: "Experience Highlights",
            badge: "Authentic Marwari Steeds & Heritage Attire",
            startingPrice: "Starting From ₹500",
            startingNote: "*Includes Souvenir Print & Traditional Turban Styling",
            valuePillars: [
                { title: "Royal Marwari Steeds", subtitle: "Trained Horses with Curved Ears", icon: Sparkles },
                { title: "Complete Mewari Safa", subtitle: "Regal Turban & Costume Provided", icon: Award },
                { title: "Instant Souvenir", subtitle: "Printed Souvenir Photo & Digital Copy", icon: Camera },
                { title: "Trained Handlers", subtitle: "100% Supervised & Safe for Families", icon: ShieldCheck }
            ],
            features: [
                "Authentic Marwari horses known for distinctive curved ears",
                "Complete traditional Mewari safa (turban) and dress styling",
                "Instant printed souvenir photo and digital high-res copy",
                "Supervised by professional animal handlers for total safety"
            ]
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
                    <NavLink to={getLocalizedPath('/', lang)} className="hover:text-[#A65F3D]">
                        {t.directoryPage?.breadcrumbHome || 'Home'}
                    </NavLink>
                    <span>/</span>
                    <span className="text-[#25231F] font-bold">{service.title}</span>
                </nav>

                {/* Hero Showcase Card - Centered Royal Layout (No Photos) */}
                <div className="bg-gradient-to-b from-white via-[#FCFAF6] to-[#F8F5EF] rounded-3xl p-8 sm:p-14 border border-[#C49A32]/35 shadow-xl mb-14 text-center">
                    <div className="inline-flex items-center gap-2 bg-[#C49A32]/10 border border-[#C49A32]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-4">
                        <Award className="w-4 h-4 text-[#C49A32]" />
                        <span>{service.badge || "Verified Tourism Partner"}</span>
                    </div>
                    
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] leading-tight mb-4 max-w-3xl mx-auto">
                        {service.title}
                    </h1>

                    <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
                        {service.desc}
                    </p>

                    {/* Value Pillars Badges */}
                    {service.valuePillars && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto mb-8 text-left">
                            {service.valuePillars.map((pillar, idx) => {
                                const IconComponent = pillar.icon || CheckCircle2;
                                return (
                                    <div key={idx} className="p-4 bg-white rounded-2xl border border-[#EFE7D9] shadow-sm flex items-start gap-3">
                                        <IconComponent className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                                        <div>
                                            <div className="text-xs font-bold text-[#25231F]">{pillar.title}</div>
                                            <div className="text-[11px] text-[#25231F]/60">{pillar.subtitle}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Starting Price Pill */}
                    {service.startingPrice && (
                        <div className="inline-flex flex-col items-center justify-center bg-[#25231F] text-white px-7 py-3 rounded-2xl border border-[#C49A32]/40 mb-8 shadow-md">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C49A32]">Official Starting Rate</span>
                            <span className="text-2xl sm:text-3xl font-serif font-black text-white">{service.startingPrice}</span>
                            {service.startingNote && (
                                <span className="text-[10px] text-white/60 font-medium mt-0.5">{service.startingNote}</span>
                            )}
                        </div>
                    )}

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                        <button
                            onClick={handleWhatsApp}
                            className="w-full sm:w-auto px-8 py-4 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg transition-transform active:scale-95"
                        >
                            <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
                            {pageT?.waBtn || pageT?.chatWa || "Book on WhatsApp"}
                        </button>
                        <a
                            href="tel:+917597451057"
                            onClick={() => trackPhoneCallClick(`service_call_${effectiveService}`)}
                            className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F8F5EF] text-[#25231F] border border-[#EFE7D9] rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                        >
                            <Phone className="w-4 h-4 text-[#C49A32]" />
                            <span>Call Concierge: +91 75974 51057</span>
                        </a>
                    </div>
                </div>

                {/* Available Languages (if guide) */}
                {service.languages && (
                    <div className="mb-14">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1 rounded-full inline-block mb-2">
                                Multilingual Historians
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F]">
                                Available Guide Languages &amp; International Fluency
                            </h2>
                            <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1">
                                Certified scholars fluent in English, French, German, Spanish, Italian, and native Mewari &amp; Hindi.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {service.languages.map((langItem, idx) => (
                                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all flex items-start gap-4">
                                    <div className="text-3xl shrink-0 p-2 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                                        {langItem.flag}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-serif font-bold text-[#25231F] mb-0.5">
                                            {langItem.name}
                                        </h3>
                                        <p className="text-xs text-[#25231F]/75 mb-2 font-medium">
                                            {langItem.level}
                                        </p>
                                        <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                            ✓ {langItem.note}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Guide Packages (if guide) */}
                {service.guidePackages && (
                    <div className="mb-14">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1 rounded-full inline-block mb-2">
                                Official Tariff Plans
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F]">
                                Curated Citadel Tour Packages &amp; Tariff
                            </h2>
                            <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1">
                                Transparent official rates with complimentary sealed mineral water bottles.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {service.guidePackages.map((pkg, idx) => (
                                <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9]/60 px-3 py-1 rounded-full">
                                                {pkg.duration}
                                            </span>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                Verified Guide
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-serif font-bold text-[#25231F] mb-1.5 leading-snug">
                                            {pkg.title}
                                        </h3>
                                        <div className="text-lg font-serif font-black text-[#C49A32] mb-1">
                                            {pkg.price}
                                        </div>
                                        <p className="text-xs text-[#25231F]/60 mb-5 font-medium">
                                            {pkg.target}
                                        </p>

                                        <div className="space-y-2 bg-[#F8F5EF] p-4 rounded-2xl border border-[#EFE7D9] mb-6">
                                            {pkg.highlights.map((h, i) => (
                                                <div key={i} className="flex items-start gap-2 text-xs text-[#25231F]/80">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full py-3.5 bg-[#128C7E] hover:bg-[#075E54] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                                    >
                                        <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
                                        {pageT?.waBtn || pageT?.chatWa || "Book on WhatsApp"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Monuments Covered (if guide) */}
                {service.monumentsCovered && (
                    <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-14">
                        <div className="flex items-center gap-2 mb-2 text-[#C49A32]">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Citadel Itinerary</span>
                        </div>
                        <h2 className="text-2xl font-serif font-black text-[#25231F] mb-6">
                            Key Citadel Monuments Covered with Your Guide
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3.5">
                            {service.monumentsCovered.map((monument, idx) => (
                                <div key={idx} className="p-3.5 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9] flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#C49A32]/15 text-[#C49A32] flex items-center justify-center font-bold text-xs shrink-0">
                                        {idx + 1}
                                    </div>
                                    <span className="text-xs font-bold text-[#25231F]">{monument}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Vehicle Categories (if taxi) - NO PHOTOS, Luxury Cards with Mineral Water & Starting Rate */}
                {service.vehicleCategories && (
                    <div className="mb-14">
                        <div className="text-center max-w-2xl mx-auto mb-8">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1 rounded-full inline-block mb-2">
                                Sanitized Fleet &amp; Transparent Tariff
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#25231F]">
                                {lang === 'hi' ? 'वाहन बेड़ा श्रेणियां और दरें' : lang === 'fr' ? 'Catégories de Véhicules & Tarifs' : lang === 'de' ? 'Fahrzeugkategorien & Tarife' : lang === 'it' ? 'Flotta Veicoli & Tariffe' : lang === 'ja' ? '車両フリートカテゴリ＆料金' : lang === 'es' ? 'Categorías de Vehículos & Tarifas' : lang === 'he' ? 'קטגוריות רכבים ותעריפים' : lang === 'ar' ? 'فئات أسطول السيارات والأسعار' : 'Vehicle Fleet Categories & Rates'}
                            </h2>
                            <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1">
                                Every booking includes complimentary sealed mineral water bottles, chilled AC, and full internal monument transit across all 700 acres.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {service.vehicleCategories.map((v, idx) => (
                                <div key={idx} className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] transition-all flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A65F3D] bg-[#EFE7D9]/60 px-3 py-1 rounded-full">
                                                {v.capacity}
                                            </span>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                Sanitized AC
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-serif font-bold text-[#25231F] mb-1 leading-snug">
                                            {v.name}
                                        </h3>
                                        <div className="text-xl font-serif font-black text-[#C49A32] mb-1">
                                            {v.price}
                                        </div>
                                        <p className="text-[11px] text-[#25231F]/60 mb-4 font-medium">
                                            {v.tag}
                                        </p>

                                        {/* Complimentary Mineral Water Badge */}
                                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold px-3 py-2 rounded-xl mb-4">
                                            <Droplets className="w-4 h-4 text-emerald-600 shrink-0" />
                                            <span>Complimentary Mineral Water</span>
                                        </div>

                                        <div className="space-y-2 bg-[#F8F5EF] p-4 rounded-2xl border border-[#EFE7D9] mb-6">
                                            {v.features.map((feat, i) => (
                                                <div key={i} className="flex items-start gap-2 text-xs text-[#25231F]/80">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full py-3.5 bg-[#128C7E] hover:bg-[#075E54] text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                                    >
                                        <MessageCircle className="w-4 h-4 fill-white text-[#128C7E]" />
                                        {pageT?.waBtn || pageT?.chatWa || "Book on WhatsApp"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Service Types / Options */}
                {service.travelServices && (
                    <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage mb-12">
                        <div className="flex items-center gap-2 mb-2 text-[#C49A32]">
                            <Compass className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Fleet &amp; Service Circuits</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-6">
                            {lang === 'hi' ? 'लोकप्रिय सेवा मार्ग और विकल्प' : lang === 'fr' ? 'Itinéraires et Options Populaires' : lang === 'de' ? 'Beliebte Routen und Optionen' : lang === 'it' ? 'Rotte e Opzioni di Servizio' : lang === 'ja' ? '人気のサービスルート・オプション' : lang === 'es' ? 'Rutas y Opciones Populares' : lang === 'he' ? 'מסלולים ואפשרויות פופולריות' : lang === 'ar' ? 'خيارات ومسارات الخدمة الشائعة' : 'Popular Service Routes & Options'}
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
                        <h3 className="text-xl font-serif font-bold text-white mb-1">
                            {lang === 'hi' ? 'स्थानीय डेस्क से सीधा संपर्क' : lang === 'fr' ? 'Assistance Directe auprès du Concierge Local' : lang === 'de' ? 'Direkte Unterstützung vom Concierge-Desk' : lang === 'it' ? 'Assistenza Diretta dal Desk Locale' : lang === 'ja' ? '現地コンシェルジュ直通サポート' : lang === 'es' ? 'Asistencia Directa del Mostrador Local' : lang === 'he' ? 'סיוע ישיר מדלפק הקונסיירז’ המקומי' : lang === 'ar' ? 'مساعدة مباشرة من مكتب الكونسيرج المحلي' : 'Direct Assistance from Local Desk'}
                        </h3>
                        <p className="text-xs text-white/70">
                            {lang === 'hi' ? 'हमारे यात्रा सहायक व्हाट्सएप और कॉल पर 24/7 उपलब्ध हैं।' : lang === 'fr' ? 'Nos concierges sont disponibles 24/7 par WhatsApp et téléphone.' : lang === 'de' ? 'Unser Concierge-Team steht Ihnen 24/7 via WhatsApp und Telefon zur Verfügung.' : lang === 'it' ? 'I nostri concierge sono disponibili su WhatsApp e telefono.' : lang === 'ja' ? '専属コンシェルジュがWhatsAppとお電話でサポートいたします。' : lang === 'es' ? 'Nuestros concierges están disponibles en WhatsApp y teléfono.' : lang === 'he' ? 'הקונסיירז’ים שלנו זמינים בוואטסאפ ובטלפון.' : lang === 'ar' ? 'فريق الكونسيرج متواجد على واتساب والهاتف.' : 'Our travel concierges are available on WhatsApp and phone.'}
                        </p>
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