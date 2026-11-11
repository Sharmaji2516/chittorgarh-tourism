import React, { useState } from 'react';
import { MessageCircle, Phone, Compass } from 'lucide-react';
import TripPlannerModal from './TripPlannerModal';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const FloatingInquiry = () => {
    const [isPlannerOpen, setIsPlannerOpen] = useState(false);

    return (
        <>
            <div className="fixed bottom-6 right-5 z-[90] flex flex-col items-end gap-3 pointer-events-auto">
                {/* Direct Call Quick Dial */}
                <a
                    href="tel:+917597451057"
                    onClick={() => trackPhoneCallClick('floating_button')}
                    className="w-11 h-11 rounded-full bg-white text-mewar-charcoal shadow-lg border border-mewar-border flex items-center justify-center hover:bg-mewar-ivory hover:text-mewar-terracotta transition-all duration-300 hover:scale-105"
                    aria-label="Direct Phone Call to Concierge"
                    title="Call Tour Concierge"
                >
                    <Phone className="w-5 h-5 text-mewar-terracotta" />
                </a>

                {/* Direct WhatsApp Quick Chat */}
                <a
                    href="https://wa.me/917597451057?text=Namaste!%20I%20would%20like%20to%20inquire%20about%20Chittorgarh%20tours,%20guide,%20or%20taxi."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('floating_quick_wa')}
                    className="w-12 h-12 rounded-full bg-emerald-600 text-white shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all duration-300 hover:scale-105"
                    aria-label="Chat on WhatsApp"
                    title="WhatsApp Tour Desk"
                >
                    <MessageCircle className="w-6 h-6" />
                </a>

                {/* Plan Trip Main Floating Pill */}
                <button
                    onClick={() => setIsPlannerOpen(true)}
                    className="px-5 py-3.5 rounded-full bg-mewar-charcoal hover:bg-mewar-terracotta text-white shadow-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-mewar-gold/30 group"
                    aria-label="Plan Your Trip Inquiry"
                >
                    <Compass className="w-4 h-4 text-mewar-gold group-hover:rotate-45 transition-transform" />
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
