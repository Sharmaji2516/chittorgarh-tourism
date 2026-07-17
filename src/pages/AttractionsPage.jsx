import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import AttractionCard from '../components/AttractionCard';
import { MapPin, Info, Shield, Wind, Sunrise, Mountain } from 'lucide-react';
import SEOHead from '../components/SEOHead';


const AttractionsPage = ({ t, filteredAttractions, setSelectedAttraction }) => {
    const { category } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    // Grouping & Data Selection
    const fortSubIds = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16];
    const fortSubAttractions = filteredAttractions.filter(a => fortSubIds.includes(a.id));
    
    const categoriesData = {
        'fort': {
            main: filteredAttractions.find(a => a.id === 1),
            subs: fortSubAttractions,
            icon: Shield,
            theme: "from-royal-gold to-orange-500",
            title: t.pillars.fort.title,
            subtitle: t.attractionsPage.categories.fort.subtitle
        },
        'nature': {
            main: filteredAttractions.find(a => a.id === 2),
            subs: filteredAttractions.filter(a => a.id === 18),
            icon: Wind,
            theme: "from-green-600 to-teal-500",
            title: t.pillars.nature.title,
            subtitle: t.attractionsPage.categories.nature.subtitle
        },
        'spiritual': {
            main: filteredAttractions.find(a => a.id === 3),
            subs: filteredAttractions.filter(a => a.id === 17),
            icon: Sunrise,
            theme: "from-blue-600 to-purple-500",
            title: t.pillars.spiritual.title,
            subtitle: t.attractionsPage.categories.spiritual.subtitle
        },
        'scenic': {
            main: filteredAttractions.find(a => a.id === 15),
            subs: filteredAttractions.filter(a => a.id === 19),
            icon: Mountain,
            theme: "from-amber-600 to-red-500",
            title: t.pillars.scenic.title,
            subtitle: t.attractionsPage.categories.scenic.subtitle
        }
    };

    const activeCat = categoriesData[category] || categoriesData['fort'];
    const { main, subs, icon: Icon, theme, title, subtitle } = activeCat;

    if (!main) return <div className="text-white pt-40 text-center">Loading...</div>;

    // Dynamic SEO config per category
    const SEO_CONFIG = {
        fort: {
            title: "Chittorgarh Fort & Monuments | Complete Visitor Guide",
            description: "Explore Chittorgarh Fort — India's largest fort. Visit Vijay Stambh, Kirti Stambh, Padmini Palace, Rana Kumbha Palace & Gaumukh Reservoir. History, timings & entry fee.",
            keywords: "Chittorgarh Fort, Vijay Stambh, Kirti Stambh, Padmini Palace, Rana Kumbha Palace, Gaumukh Reservoir, Chittorgarh Fort entry fee, Chittorgarh Fort timings, largest fort in India, UNESCO world heritage sites Rajasthan, haunted places in Rajasthan",
            schema: [
                {
                    "@context": "https://schema.org",
                    "@type": "TouristAttraction",
                    "name": "Chittorgarh Fort",
                    "description": "India's largest fort complex and a UNESCO World Heritage Site. The fort houses over 65 historic structures including the iconic Vijay Stambh, Padmini Palace, and Kirti Stambh.",
                    "url": "https://visitchittorgarh.in/attractions/fort",
                    "image": "https://visitchittorgarh.in/Fort.png",
                    "geo": { "@type": "GeoCoordinates", "latitude": "24.8887", "longitude": "74.6269" },
                    "address": { "@type": "PostalAddress", "addressLocality": "Chittorgarh", "addressRegion": "Rajasthan", "addressCountry": "IN" },
                    "touristType": ["Cultural tourist", "Heritage tourist", "History enthusiast"],
                    "containsPlace": [
                        { "@type": "TouristAttraction", "name": "Vijay Stambh", "description": "Tower of Victory built by Maharana Kumbha in 1448 CE to commemorate his victory over Malwa Sultanate." },
                        { "@type": "TouristAttraction", "name": "Kirti Stambh", "description": "Tower of Fame — a 12th century Jain pillar built by a Jain merchant dedicated to Adinath." },
                        { "@type": "TouristAttraction", "name": "Padmini Palace", "description": "Palace of the legendary queen Rani Padmini, associated with the historic siege of Chittorgarh." },
                        { "@type": "TouristAttraction", "name": "Rana Kumbha Palace", "description": "The residence of Maharana Kumbha, the most prominent Mewar ruler, where Meera Bai also lived." },
                        { "@type": "TouristAttraction", "name": "Gaumukh Reservoir", "description": "Ancient sacred water tank inside the fort fed by a spring through a cow-mouth shaped spout." },
                        { "@type": "TouristAttraction", "name": "Kalika Mata Temple", "description": "8th century temple originally dedicated to the Sun God, later converted to a temple of Goddess Kali." }
                    ]
                },
                { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" }, { "@type": "ListItem", "position": 2, "name": "Attractions", "item": "https://visitchittorgarh.in/attractions" }, { "@type": "ListItem", "position": 3, "name": "Chittorgarh Fort", "item": "https://visitchittorgarh.in/attractions/fort" }] }
            ]
        },
        spiritual: {
            title: "Temples in Chittorgarh | Meera Temple & Sanwariyaji",
            description: "Visit sacred temples in Chittorgarh — Meera Temple, Sanwariyaji Temple, Kalika Mata Mandir & Kumbha Shyam Temple. Pilgrimage guide, darshan timings & travel tips.",
            keywords: "Meera Temple Chittorgarh, Sanwariyaji Temple, Kalika Mata Temple, Chittorgarh pilgrimage, temples in Chittorgarh, Sanwariya Seth Temple, Krishna temple Mandphiya Rajasthan, historical temples Rajasthan",
            schema: [
                { "@context": "https://schema.org", "@type": "TouristAttraction", "name": "Meera Temple, Chittorgarh", "description": "Sacred temple dedicated to the poet-saint Meera Bai, located inside Chittorgarh Fort. A pilgrimage site for devotees across India.", "url": "https://visitchittorgarh.in/attractions/spiritual", "image": "https://visitchittorgarh.in/Fort.png", "geo": { "@type": "GeoCoordinates", "latitude": "24.8912", "longitude": "74.6308" }, "address": { "@type": "PostalAddress", "addressLocality": "Chittorgarh", "addressRegion": "Rajasthan", "addressCountry": "IN" } },
                { "@context": "https://schema.org", "@type": "TouristAttraction", "name": "Sanwariyaji Temple (Sanwariya Seth)", "description": "Famous Krishna temple located 40 km from Chittorgarh in Mandphiya village, one of the most visited pilgrimage sites in Rajasthan.", "url": "https://visitchittorgarh.in/attractions/spiritual", "address": { "@type": "PostalAddress", "addressLocality": "Mandphiya, Chittorgarh", "addressRegion": "Rajasthan", "addressCountry": "IN" } },
                { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" }, { "@type": "ListItem", "position": 2, "name": "Attractions", "item": "https://visitchittorgarh.in/attractions" }, { "@type": "ListItem", "position": 3, "name": "Temples & Spiritual", "item": "https://visitchittorgarh.in/attractions/spiritual" }] }
            ]
        },
        nature: {
            title: "Bassi Wildlife Sanctuary Chittorgarh | Nature & Wildlife",
            description: "Explore Bassi Wildlife Sanctuary near Chittorgarh — home to leopards, sloth bears, chinkara & over 150 bird species. Safari timings, entry fees & travel guide.",
            keywords: "Bassi Wildlife Sanctuary, Chittorgarh wildlife, wildlife safari Chittorgarh, nature Chittorgarh, bird watching Chittorgarh, wildlife sanctuaries in Rajasthan, eco tourism Rajasthan",
            schema: [
                { "@context": "https://schema.org", "@type": "TouristAttraction", "name": "Bassi Wildlife Sanctuary", "description": "Spread across 138 sq km, Bassi Wildlife Sanctuary is home to leopards, wolves, chinkara, sloth bears, and over 150 bird species. Located 25 km from Chittorgarh.", "url": "https://visitchittorgarh.in/attractions/nature", "image": "https://visitchittorgarh.in/Fort.png", "geo": { "@type": "GeoCoordinates", "latitude": "24.8450", "longitude": "74.8300" }, "address": { "@type": "PostalAddress", "addressLocality": "Bassi, Chittorgarh", "addressRegion": "Rajasthan", "addressCountry": "IN" } },
                { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" }, { "@type": "ListItem", "position": 2, "name": "Attractions", "item": "https://visitchittorgarh.in/attractions" }, { "@type": "ListItem", "position": 3, "name": "Nature & Wildlife", "item": "https://visitchittorgarh.in/attractions/nature" }] }
            ]
        },
        scenic: {
            title: "Menal Waterfall & Scenic Spots near Chittorgarh",
            description: "Discover Menal Waterfall — the 'Khajuraho of Rajasthan' — and other scenic beauty spots near Chittorgarh. Photography spots, best visit time & travel guide.",
            keywords: "Menal Waterfall Chittorgarh, Menal Rajasthan, scenic spots Chittorgarh, photography Chittorgarh, weekend trip from Udaipur, tourist places near Udaipur, monsoon places Rajasthan",
            schema: [
                { "@context": "https://schema.org", "@type": "TouristAttraction", "name": "Menal Waterfall & Temple Complex", "description": "Known as the 'Khajuraho of Rajasthan', Menal features a stunning waterfall and a 10th–12th century temple complex dedicated to Lord Shiva. Located 95 km from Chittorgarh.", "url": "https://visitchittorgarh.in/attractions/scenic", "image": "https://visitchittorgarh.in/Fort.png", "geo": { "@type": "GeoCoordinates", "latitude": "25.0800", "longitude": "75.4500" }, "address": { "@type": "PostalAddress", "addressLocality": "Menal, Chittorgarh", "addressRegion": "Rajasthan", "addressCountry": "IN" } },
                { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" }, { "@type": "ListItem", "position": 2, "name": "Attractions", "item": "https://visitchittorgarh.in/attractions" }, { "@type": "ListItem", "position": 3, "name": "Scenic Spots", "item": "https://visitchittorgarh.in/attractions/scenic" }] }
            ]
        }
    };

    const activeSEO = SEO_CONFIG[category] || SEO_CONFIG['fort'];

    return (
        <div className="pt-32 pb-24 max-w-[1440px] mx-auto px-4 md:px-12 min-h-screen">
            <SEOHead
                title={activeSEO.title}
                description={activeSEO.description}
                canonical={`/attractions/${category || 'fort'}`}
                keywords={activeSEO.keywords}
                ogImage="https://visitchittorgarh.in/Fort.png"
                schema={activeSEO.schema}
            />
            {/* Header Section */}
            <div className="mb-20">
                <div className="flex items-center gap-6 mb-4 md:justify-center">
                    <motion.div 
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={{ rotate: 0, scale: 1 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${theme} shadow-2xl`}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="md:text-center">
                        <h1 className="text-4xl md:text-6xl font-serif text-white">{title}</h1>
                        <p className="text-royal-gold font-bold uppercase tracking-[0.4em] text-xs md:text-base mt-2">{subtitle}</p>
                    </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-royal-gold to-transparent opacity-30 rounded-full"></div>
            </div>

            {/* Immersive Detail Card */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-[3rem] overflow-hidden border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] mb-20"
            >
                <div className="grid lg:grid-cols-2">
                    <div className="h-[400px] lg:h-auto group overflow-hidden">
                        <img 
                            src={main.image} 
                            alt={main.name} 
                            className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
                        />
                    </div>
                    <div className="p-8 lg:p-20 flex flex-col justify-center relative overflow-hidden">
                        {/* Background Ornament */}
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Icon className="w-40 h-40" />
                        </div>

                        <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">{main.name}</h2>
                        
                        <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed italic mb-10 border-l-4 border-royal-gold pl-6">
                            "{main.desc}"
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-royal-gold/10">
                                    <MapPin className="w-5 h-5 text-royal-gold" />
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 uppercase tracking-widest text-[10px]">{t.attractionsPage.location}</p>
                                    <p className="text-white font-bold">{t.attractionsPage.chittorgarh}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-royal-gold/10">
                                    <Info className="w-5 h-5 text-royal-gold" />
                                </div>
                                <div className="text-sm">
                                    <p className="text-gray-500 uppercase tracking-widest text-[10px]">{t.attractionsPage.bestTime}</p>
                                    <p className="text-white font-bold">{main.bestTime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Sub-attractions Grid */}
            {subs.length > 0 && (
                <div className="mt-12">
                    <div className="flex items-center gap-6 mb-16">
                        <h3 className="text-2xl md:text-3xl font-serif text-white whitespace-nowrap">{t.attractionsPage.treasureTitle}</h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-royal-gold to-transparent"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        <AnimatePresence>
                            {subs.map(item => (
                                <AttractionCard 
                                    key={`fort-sub-${item.id}`} 
                                    attraction={item} 
                                    onExplore={setSelectedAttraction} 
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Quick Navigation to Other Pillars */}
            <div className="mt-32 pt-20 border-t border-white/10">
                <h4 className="text-center text-gray-500 uppercase tracking-[0.5em] text-xs mb-12">{t.attractionsPage.exploreAnother}</h4>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    {Object.entries(categoriesData).map(([key, data]) => (
                        key !== category && (
                            <Link 
                                key={key}
                                to={`/attractions/${key}`}
                                className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-royal-gold/50 transition-all hover:bg-royal-gold/5"
                            >
                                <div className={`p-2 rounded-lg bg-gradient-to-br ${data.theme} shadow-lg`}>
                                    <data.icon className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white/60 group-hover:text-white font-bold uppercase tracking-widest text-[10px]">{data.title}</span>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AttractionsPage;
