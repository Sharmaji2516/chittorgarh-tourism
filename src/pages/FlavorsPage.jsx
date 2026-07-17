import React, { useState } from 'react';
import Section from '../components/Section';
import VendorCard from '../components/VendorCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Coffee, LayoutGrid, Star, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';
import BookingModal from '../components/BookingModal';
import SEOHead from '../components/SEOHead';

const FLAVORS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Chittorgarh Local Food & Dining Guide",
    "description": "Discover the best Rajasthani food in Chittorgarh — authentic Dal Baati Churma, street food vendors, cafes and local restaurants curated by local experts.",
    "url": "https://visitchittorgarh.in/flavors",
    "image": "https://visitchittorgarh.in/Fort.png",
    "servesCuisine": ["Rajasthani", "Indian", "North Indian", "Street Food"],
    "priceRange": "₹–₹₹",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Chittorgarh",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the famous food of Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Dal Baati Churma is the most famous dish of Chittorgarh. Other popular dishes include Ker Sangri, Gatte ki Sabzi, Laal Maas, Ghevar, and Mawa Kachori."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best restaurants in Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Top restaurants in Chittorgarh include Padmini Restaurant, Chokhi Dhani Chittorgarh, Hotel Pratap Palace Restaurant and several local dhabas near the fort serving authentic Rajasthani thali."
        }
      },
      {
        "@type": "Question",
        "name": "Where can I find street food in Chittorgarh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best street food in Chittorgarh is found near Collectorate Chowk, Fort Road market, and the main Sita Mata Bazar where vendors sell kachori, samosa, and local sweets."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://visitchittorgarh.in/" },
      { "@type": "ListItem", "position": 2, "name": "Food & Flavors", "item": "https://visitchittorgarh.in/flavors" }
    ]
  }
];


const FlavorsPage = ({ t, filteredVendors, filteredCafes, searchQuery }) => {
    const [activeCategory, setActiveCategory] = useState('all'); // 'all', 'vendors', 'cafes', 'dishes'
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingTitle, setBookingTitle] = useState('');
    const [isDishModalOpen, setIsDishModalOpen] = useState(false);
    const [selectedDish, setSelectedDish] = useState(null);
    const [peopleCount, setPeopleCount] = useState(1);
    const [inquirySent, setInquirySent] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const filterOptions = [
        { id: 'all', label: t.common.filterAll, icon: LayoutGrid },
        { id: 'dishes', label: "Famous Dishes", icon: Utensils },
        { id: 'vendors', label: t.common.filterRestaurants, icon: Star },
        { id: 'cafes', label: t.common.filterCafes, icon: Coffee },
    ];

    const openBooking = (title) => {
        setBookingTitle(title);
        setIsBookingOpen(true);
    };

    return (
        <div className="space-y-0">
            <SEOHead
                title="Chittorgarh Food Guide | Best Restaurants & Street Food"
                description="Discover the best Rajasthani food in Chittorgarh — Dal Baati Churma, local street vendors, authentic cafes & top restaurants. Your complete Chittorgarh food guide 2025."
                canonical="/flavors"
                keywords="Chittorgarh restaurants, food in Chittorgarh, Rajasthani cuisine, Dal Baati Churma, street food Chittorgarh, best cafes Chittorgarh"
                ogImage="https://visitchittorgarh.in/Fort.png"
                schema={FLAVORS_SCHEMA}
            />
            {/* Page Header & Filter Bar */}
            <div className="pt-12 pb-8 text-center px-4">
                {!searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-wider">
                            {t.localRoyalCuisine}
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-400 mb-12 font-light italic">
                            "Savor the authentic flavors of Mewar. From traditional royal recipes to local street favorites, experience the culinary soul of Chittorgarh."
                        </p>
                    </motion.div>
                )}

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12">
                    {filterOptions.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setActiveCategory(option.id)}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 text-sm font-bold tracking-widest uppercase",
                                activeCategory === option.id
                                    ? "bg-royal-gold text-royal-black border-royal-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                                    : "bg-white/5 text-gray-400 border-white/10 hover:border-royal-gold/30 hover:text-white"
                            )}
                        >
                            <option.icon className="w-4 h-4" />
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Famous Dishes Section */}
                    {(activeCategory === 'all' || activeCategory === 'dishes') && (
                        <Section id="dishes" title="Famous Royal Dishes" className="bg-transparent text-center !pt-0">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {t.dishes.items.map(dish => (
                                    <motion.div
                                        key={dish.id}
                                        whileHover={{ y: -5 }}
                                        className="group relative bg-heritage-charcoal/40 rounded-3xl overflow-hidden border border-white/5 hover:border-royal-gold/30 transition-all duration-500 shadow-2xl cursor-pointer"
                                        onClick={() => {
                                            setSelectedDish(dish);
                                            setIsDishModalOpen(true);
                                        }}
                                    >
                                        <div className="aspect-square overflow-hidden">
                                            <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="p-4 bg-gradient-to-t from-black/80 to-transparent absolute bottom-0 left-0 w-full text-left">
                                            <h4 className="text-white font-serif text-lg">{dish.name}</h4>
                                            <div className="flex items-center gap-2 text-royal-gold text-[10px] uppercase font-bold tracking-widest mt-1">
                                                <span>Inquire Now</span>
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Vendors/Restaurants Section */}
                    {(activeCategory === 'all' || activeCategory === 'vendors') && (
                        <Section id="vendors" title={activeCategory === 'all' ? "Premium Food Destinations" : ""} className="bg-transparent text-center">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {filteredVendors.map(item => (
                                    <VendorCard 
                                        key={`vendor-${item.id}`} 
                                        vendor={item} 
                                        onClick={() => openBooking(`Dine at ${item.name}`)}
                                    />
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Cafes Section */}
                    {(activeCategory === 'all' || activeCategory === 'cafes') && filteredCafes.length > 0 && (
                        <Section 
                            id="cafes" 
                            title={activeCategory === 'all' ? t.cafes.title : ""} 
                            className={cn(
                                "text-center",
                                activeCategory === 'all' ? "bg-black/20 backdrop-blur-sm border-t border-royal-gold/10" : "bg-transparent"
                            )}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {filteredCafes.map(item => (
                                    <VendorCard 
                                        key={`cafe-${item.id}`} 
                                        vendor={item} 
                                        onClick={() => openBooking(`Visit ${item.name}`)}
                                    />
                                ))}
                            </div>
                        </Section>
                    )}
                </motion.div>
            </AnimatePresence>

            <BookingModal 
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                pillarTitle={bookingTitle}
            />

            {/* Dish Inquiry Modal */}
            <AnimatePresence>
                {isDishModalOpen && selectedDish && (
                    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsDishModalOpen(false);
                                setInquirySent(false);
                            }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-md bg-heritage-charcoal border border-white/10 rounded-[2rem] p-8 shadow-2xl z-20"
                        >
                            <button 
                                onClick={() => {
                                    setIsDishModalOpen(false);
                                    setInquirySent(false);
                                }} 
                                className="absolute top-6 right-6 text-white/40 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                            
                            <h3 className="text-2xl font-serif text-white mb-2">{selectedDish.name}</h3>
                            <p className="text-royal-gold text-xs uppercase tracking-widest mb-6">Inquire for this dish</p>
                            
                            {!inquirySent ? (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Your Name</label>
                                        <input 
                                            type="text" 
                                            value={userName} 
                                            onChange={(e) => setUserName(e.target.value)} 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-royal-gold"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            value={userPhone} 
                                            onChange={(e) => setUserPhone(e.target.value)} 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-royal-gold"
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-white/60 uppercase tracking-widest font-bold">How many people are there?</label>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            value={peopleCount} 
                                            onChange={(e) => setPeopleCount(e.target.value)} 
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:border-royal-gold"
                                        />
                                    </div>
                                    
                                    <button 
                                        onClick={() => {
                                            const phoneNumber = "917597451057"; // Use the one from BookingModal
                                            const message = `*\uD83C\uDF74\uFE0F Dish Inquiry*\n\n` +
                                                `*\uD83C\uDF72 Dish:* ${selectedDish.name}\n` +
                                                `*\uD83D\uDC65 People:* ${peopleCount}\n` +
                                                `*\uD83D\uDC64 Name:* ${userName}\n` +
                                                `*\uD83D\uDCDE Phone:* ${userPhone}\n\n` +
                                                `Please provide details and availability.`;
                                            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
                                            setInquirySent(true);
                                        }}
                                        className="w-full py-4 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
                                    >
                                        Inquire Now via WhatsApp
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <p className="text-white font-bold">Inquiry Sent!</p>
                                    <p className="text-white/60 text-xs">The details will be shared soon. We will contact you shortly within 1 hour.</p>
                                    <button 
                                        onClick={() => {
                                            setIsDishModalOpen(false);
                                            setInquirySent(false);
                                            setPeopleCount(1);
                                        }}
                                        className="mt-4 px-6 py-2 bg-white/5 rounded-lg text-white text-xs hover:bg-white/10"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {(filteredVendors.length > 0 || filteredCafes.length > 0) && (
                <div className="pb-16 text-center">
                    <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.3em] font-serif italic">
                        * {t.common.disclaimer}
                    </p>
                </div>
            )}
        </div>
    );
};

export default FlavorsPage;
