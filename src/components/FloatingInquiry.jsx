import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import QuickInquiryModal from './QuickInquiryModal';

const FloatingInquiry = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-[100] bg-gradient-to-r from-royal-gold to-amber-500 text-royal-black px-6 py-4 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] border border-royal-gold/30 hover:scale-105 active:scale-95 hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                aria-label="Quick Inquiry"
            >
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform text-royal-black animate-pulse" />
                <span className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap text-royal-black">
                    Inquire Now
                </span>
            </button>

            {/* Modal */}
            <QuickInquiryModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                entityName="General Inquiry"
                category="General"
            />
        </>
    );
};

export default FloatingInquiry;
