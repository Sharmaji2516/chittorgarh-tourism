import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hotel, ArrowRight, ShieldCheck, MapPin, Star, Compass, MessageCircle, CheckCircle2 } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick } from '../utils/analytics';

const STAYS_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Chittorgarh Hotels & Heritage Stays Directory",
    "description": "Handpicked hotels and heritage properties in Chittorgarh — from luxury heritage havelis to budget-friendly guesthouses, with local concierge services.",
    "url": "https://www.visitchittorgarh.in/stays",
    "image": "https://www.visitchittorgarh.in/Fort.webp"
  }
];

const StaysPage = ({ t }) => {
    const triggerPlanTrip = () => {
        window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
    };

    const handleHotelInquiry = (hotelName) => {
        const msg = `🏨 *Hotel Booking Inquiry — Chittorgarh*\n\n` +
            `Hello! I would like to inquire about booking a stay at *${hotelName}*.\n` +
            `Please share current availability, room tariffs, and concierge deals. Thanks!`;
        trackWhatsAppClick('hotel_card_wa', hotelName);
        window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
    };

    const hotels = t?.hotels?.items || [
        {
            id: 1,
            name: "Boutique Heritage Haveli Stay",
            desc: "Authentic Rajput haveli with traditional jharokhas, courtyards, and rooftop views of Chittorgarh Fort ramparts.",
            price: "₹3,500 - ₹6,500 / night",
            image: "/assets/images/Royal Stays.webp"
        },
        {
            id: 2,
            name: "Royal Palace Luxury Resort",
            desc: "Spacious luxury suites surrounded by lush gardens, swimming pool, and fine dining Mewari restaurant.",
            price: "₹5,500 - ₹9,500 / night",
            image: "/assets/images/Dinning Hall.webp"
        },
        {
            id: 3,
            name: "Fort View Comfort Inn",
            desc: "Modern air-conditioned family hotel located conveniently near Chittorgarh Railway Station and Fort entrance road.",
            price: "₹1,800 - ₹3,200 / night",
            image: "/assets/images/Cafe.webp"
        }
    ];

    return (
        <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
            <SEOHead
                title="Hotels in Chittorgarh | Heritage, Budget & Luxury Stays"
                description="Book the best hotels in Chittorgarh — heritage havelis, budget guesthouses & luxury resorts. Handpicked stays with VIP rates and local concierge."
                canonical="/stays"
                keywords="hotels in Chittorgarh, Chittorgarh hotels, heritage hotel Chittorgarh, budget hotel Chittorgarh, luxury stay Chittorgarh"
                schema={STAYS_SCHEMA}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
                        Curated Accommodations
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] mb-4">
                        Heritage Hotels & Stays
                    </h1>
                    <p className="text-sm sm:text-base text-[#25231F]/70 leading-relaxed font-light">
                        Experience authentic Mewari hospitality. From royal havelis overlooking the floodlit fort to tranquil countryside heritage resorts.
                    </p>
                </div>

                {/* Stays Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {hotels.map((hotel) => (
                        <div
                            key={hotel.id}
                            className="bg-white rounded-3xl border border-[#EFE7D9] overflow-hidden shadow-heritage hover:border-[#C49A32] hover:-translate-y-1 transition-all group flex flex-col justify-between"
                        >
                            <div>
                                <div className="h-56 relative overflow-hidden bg-[#EFE7D9]">
                                    <img
                                        src={hotel.image}
                                        alt={hotel.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <span className="absolute top-3 left-3 bg-[#25231F]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1">
                                        <ShieldCheck className="w-3.5 h-3.5 text-[#C49A32]" />
                                        Verified Partner
                                    </span>
                                </div>

                                <div className="p-6 sm:p-8">
                                    <h3 className="text-xl font-serif font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors mb-2">
                                        {hotel.name}
                                    </h3>
                                    <p className="text-xs text-[#25231F]/70 leading-relaxed mb-6">
                                        {hotel.desc}
                                    </p>

                                    <div className="space-y-2 text-xs text-[#25231F]/80 mb-6">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            <span>Fort View Rooftop Dining</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            <span>Air-Conditioned & Sanitized Rooms</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                            <span>Free Wi-Fi & Breakfast Options</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-8 pt-0 border-t border-[#EFE7D9]/60 flex items-center justify-between">
                                <button
                                    onClick={() => handleHotelInquiry(hotel.name)}
                                    className="px-5 py-3 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Inquire Rates
                                </button>
                                <button
                                    onClick={triggerPlanTrip}
                                    className="px-4 py-3 bg-[#F8F5EF] hover:bg-[#EFE7D9] text-[#25231F] rounded-xl text-xs font-bold uppercase tracking-wider border border-[#EFE7D9]"
                                >
                                    Add to Tour
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Concierge Benefits Banner */}
                <div className="bg-[#25231F] text-white rounded-3xl p-8 sm:p-12 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="text-center sm:text-left">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C49A32] block mb-1">
                            Visit Chittorgarh Concierge
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                            Need Hotel Recommendations or Group Bookings?
                        </h3>
                        <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                            Our ground team coordinates directly with verified properties to guarantee best room categories and seamless check-in.
                        </p>
                    </div>

                    <button
                        onClick={triggerPlanTrip}
                        className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl text-xs font-bold uppercase tracking-wider shrink-0 shadow-lg"
                    >
                        Inquire Stay Package
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StaysPage;
