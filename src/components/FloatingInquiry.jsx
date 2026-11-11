import React from 'react';
import { Phone, Compass } from 'lucide-react';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';

const VERIFIED_WA_LINK =
  'https://wa.me/917597451057?text=Namaste!%20I%20would%20like%20to%20inquire%20about%20Chittorgarh%20tours,%20guide,%20or%20taxi.';

const WhatsAppIcon = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.422 1.344-1.969 1.422-.5.078-1.156.109-1.859-.109-.438-.141-.984-.328-1.688-.641-2.953-1.266-4.891-4.266-5.047-4.469-.141-.203-1.203-1.594-1.203-3.047s.766-2.172 1.031-2.469c.266-.297.594-.375.797-.375.188 0 .391 0 .563.016.172.016.422-.063.656.516.25.594.844 2.063.922 2.219.078.156.125.344.016.547-.109.203-.156.344-.313.516-.156.188-.328.406-.469.547-.156.156-.328.328-.141.641.188.313.844 1.391 1.813 2.25 1.25 1.109 2.297 1.453 2.609 1.609.313.156.5.125.688-.078.188-.219.797-.922 1.016-1.234.219-.313.422-.266.719-.156.297.109 1.891.891 2.219 1.047.328.156.547.234.625.375.078.141.078.813-.172 1.516z" />
  </svg>
);

const FloatingInquiry = () => {
  const openTripPlanner = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

  return (
    <>
      {/* MOBILE ONLY: Balanced 3-Action Bottom Navigation Bar */}
      <div
        className="md:hidden fixed bottom-0 inset-x-0 z-[80] bg-[#FFFDF9]/95 backdrop-blur-xl border-t border-[#E4DAC6] px-2.5 pt-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(37,35,31,0.08)]"
        role="region"
        aria-label="Quick Contact Actions"
      >
        <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
          {/* 1. Call Button */}
          <a
            href="tel:+917597451057"
            onClick={() => trackPhoneCallClick('mobile_bottom_bar')}
            className="h-11 px-2 rounded-2xl bg-white hover:bg-[#F8F5EF] border border-[#E4DAC6] text-[#25231F] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap"
            aria-label="Call Concierge +91 75974 51057"
          >
            <Phone className="w-4 h-4 text-[#A65F3D] shrink-0" />
            <span>Call</span>
          </a>

          {/* 2. WhatsApp Button */}
          <a
            href={VERIFIED_WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mobile_bottom_bar')}
            className="h-11 px-2 rounded-2xl bg-[#128C7E] hover:bg-[#0f766a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap"
            aria-label="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
          </a>

          {/* 3. Plan Trip Button */}
          <button
            type="button"
            onClick={openTripPlanner}
            className="h-11 px-2 rounded-2xl bg-[#C49A32] hover:bg-[#b08728] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all whitespace-nowrap"
            aria-label="Plan Your Trip"
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Plan Trip</span>
          </button>
        </div>
      </div>

      {/* DESKTOP ONLY: Floating Dock in Bottom-Right */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-[90] flex-col items-end gap-3 pointer-events-auto">
        <a
          href="tel:+917597451057"
          onClick={() => trackPhoneCallClick('floating_button')}
          className="w-11 h-11 rounded-full bg-white text-[#25231F] shadow-lg border border-[#EFE7D9] flex items-center justify-center hover:bg-[#F8F5EF] hover:text-[#A65F3D] hover:scale-105 active:scale-95 transition-all"
          aria-label="Call Concierge: +91 75974 51057"
          title="Call Concierge: +91 75974 51057"
        >
          <Phone className="w-5 h-5 text-[#A65F3D]" />
        </a>

        <a
          href={VERIFIED_WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('floating_quick_wa')}
          className="w-12 h-12 rounded-full bg-[#128C7E] text-white shadow-xl flex items-center justify-center hover:bg-[#0f766a] hover:scale-105 active:scale-95 transition-all"
          aria-label="Chat on WhatsApp"
          title="WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6" />
        </a>

        <button
          type="button"
          onClick={openTripPlanner}
          className="px-5 py-3 rounded-full bg-[#25231F] hover:bg-[#A65F3D] text-white shadow-xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 border border-[#C49A32]/40 group"
          aria-label="Plan Your Trip Inquiry"
        >
          <Compass className="w-4 h-4 text-[#DFBA5A] group-hover:rotate-45 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider">
            Plan Your Trip
          </span>
        </button>
      </div>
    </>
  );
};

export default FloatingInquiry;
