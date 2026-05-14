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
                className="fixed bottom-6 right-6 z-[100] bg-gradient-to-r from-royal-gold to-amber-500 text-royal-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
                aria-label="Quick Inquiry"
            >
                <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-bold uppercase tracking-wider ml-0 group-hover:ml-2 whitespace-nowrap">
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
