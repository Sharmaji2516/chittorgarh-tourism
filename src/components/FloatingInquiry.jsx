import React, { useState } from 'react';
import { MessageCircle, Phone, Compass, CalendarCheck } from 'lucide-react';
import TripPlannerModal from './TripPlannerModal';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const VERIFIED_WA_LINK = "https://wa.me/917597451057?text=Namaste!%20I%20would%20like%20to%20inquire%20about%20Chittorgarh%20tours,%20guide,%20or%20taxi.";

const FloatingInquiry = () => {
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);

    return (
        <>
            {/* MOBILE ONLY: Sleek Bottom Sticky Action Bar (App-like thumb-friendly UX) */}
            <div className="md:hidden fixed bottom-0 inset-x-0 z-[80] bg-[#F8F5EF]/95 backdrop-blur-xl border-t border-[#EFE7D9] px-3.5 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-2xl flex items-center justify-between gap-2">
                {/* 1. Quick Call */}
                <a
                    href="tel:+917597451057"
                    onClick={() => trackPhoneCallClick('mobile_bottom_bar')}
                    className="flex flex-col items-center justify-center min-w-[54px] h-12 rounded-xl bg-white border border-[#EFE7D9] text-[#25231F] active:scale-95 transition-all shadow-sm"
                    aria-label="Call Tour Concierge"
                >
                    <Phone className="w-4 h-4 text-[#A65F3D]" />
                    <span className="text-[9px] font-bold tracking-tight text-[#25231F]/80 mt-0.5">Call</span>
                </a>

                {/* 2. Direct WhatsApp Quick Chat */}
                <a
                    href={VERIFIED_WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('mobile_bottom_bar')}
                    className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                    aria-label="Chat on WhatsApp"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span className="truncate">WhatsApp Desk</span>
                </a>

                {/* 3. Plan Trip Full Inquiry Modal Trigger */}
                <button
                    onClick={() => setIsPlannerOpen(true)}
                    className="flex-1 h-12 rounded-xl bg-[#C49A32] hover:bg-[#b08728] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all border border-[#DFBA5A]/40"
                    aria-label="Plan Your Trip"
                >
                    <Compass className="w-4 h-4" />
                    <span className="truncate">Plan Trip</span>
                </button>
            </div>

            {/* DESKTOP ONLY: Refined Single Floating Dock in Bottom-Right */}
            <div className="hidden md:flex fixed bottom-6 right-6 z-[90] flex-col items-end gap-3 pointer-events-auto">
                {/* Direct Call Quick Dial */}
                <a
                    href="tel:+917597451057"
                    onClick={() => trackPhoneCallClick('floating_button')}
                    className="w-11 h-11 rounded-full bg-white text-[#25231F] shadow-lg border border-[#EFE7D9] flex items-center justify-center hover:bg-[#F8F5EF] hover:text-[#A65F3D] hover:scale-105 active:scale-95 transition-all"
                    aria-label="Direct Phone Call to Concierge"
                    title="Call Concierge: +91 75974 51057"
                >
                    <Phone className="w-5 h-5 text-[#A65F3D]" />
                </a>

                {/* Direct WhatsApp Quick Chat */}
                <a
                    href={VERIFIED_WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('floating_quick_wa')}
                    className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-xl flex items-center justify-center hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all"
                    aria-label="Chat on WhatsApp"
                    title="WhatsApp Tour Desk"
                >
                    <MessageCircle className="w-6 h-6" />
                </a>

                {/* Plan Trip Main Floating Pill */}
                <button
                    onClick={() => setIsPlannerOpen(true)}
                    className="px-5 py-3 rounded-full bg-[#25231F] hover:bg-[#A65F3D] text-white shadow-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-[#C49A32]/40 group"
                    aria-label="Plan Your Trip Inquiry"
                >
                    <Compass className="w-4 h-4 text-[#DFBA5A] group-hover:rotate-45 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                        Plan Your Trip
                    </span>
                </button>
            </div>

            {/* Comprehensive Inquiry Modal */}
            <TripPlannerModal
                isOpen={isPlannerOpen}
                onClose={() => setIsPlannerOpen(false)}
            />
        </>
    );
};

export default FloatingInquiry;
