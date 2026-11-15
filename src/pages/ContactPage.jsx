import React, { useState } from 'react';
import { Phone, MessageCircle, Mail, Clock, ShieldCheck, Send, ShieldCheck as CheckIcon } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { trackWhatsAppClick, trackPhoneCallClick } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const ContactPage = () => {
  const { t, lang } = useLanguage();
  const pageT = t?.contactPage || {};
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: pageT.serviceLabel || 'Private Cab & Taxi Transfer',
    date: '',
    message: ''
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const msg = `🏰 *Direct Inquiry from VisitChittorgarh.in*\n\n` +
      `• *Name:* ${formData.name || 'Not provided'}\n` +
      `• *Phone/WhatsApp:* ${formData.phone || 'Not provided'}\n` +
      `• *Service Required:* ${formData.service}\n` +
      `• *Travel Date:* ${formData.date || 'Flexible'}\n` +
      `• *Details:* ${formData.message || 'Please contact me with quotation and availability.'}`;
    trackWhatsAppClick('contact_page_form');
    window.open(`https://wa.me/917597451057?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
      <SEOHead
        title={pageT.title || "Contact Official Concierge Desk | Visit Chittorgarh"}
        description={pageT.desc || "Get in touch with Visit Chittorgarh. Direct phone and WhatsApp support (+91 75974 51057) for private cabs, RTDC tour guides, and customized Rajasthan itineraries."}
        canonical={getLocalizedPath('/contact', lang)}
        keywords={"contact Visit Chittorgarh, Chittorgarh tourism phone, Chittorgarh guide whatsapp, Chittorgarh taxi contact"}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Showcase Card */}
        <div className="bg-gradient-to-b from-white via-[#FCFAF6] to-[#F8F5EF] rounded-3xl p-8 sm:p-14 border border-[#C49A32]/35 shadow-xl mb-14 text-center">
          {/* Official Emblem Logo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-5 p-2.5 bg-white rounded-3xl border border-[#EFE7D9] shadow-md flex items-center justify-center">
            <img
              src="/chittorgarh-tourism-logo.webp"
              alt="Visit Chittorgarh Official Heritage Emblem"
              width={80}
              height={80}
              className="w-full h-full object-contain filter contrast-105"
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-[#C49A32]/10 border border-[#C49A32]/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] text-[#C49A32] mb-4">
            <ShieldCheck className="w-4 h-4 text-[#C49A32]" />
            <span>{pageT.kicker || "Official Concierge & Tourist Helpline"}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-[#25231F] leading-tight mb-4 max-w-3xl mx-auto">
            {pageT.title || "Contact Official Concierge"}
          </h1>

          <p className="text-sm sm:text-base text-[#25231F]/75 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
            {pageT.desc || "Have questions about fort entry timings, Udaipur airport cab pickups, or hiring a government-certified multilingual historian? Reach out directly to our concierge team."}
          </p>

          {/* Direct Contact Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto">
            <a
              href="https://wa.me/917597451057?text=Namaste%20Visit%20Chittorgarh!%20I%20have%20an%20inquiry%20regarding%20Chittorgarh%20travel%20services."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('contact_hero_whatsapp')}
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-2xl text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-transform active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-white text-[#25D366] shrink-0" />
              <span>{pageT.waBtn || pageT.chatWa || "Chat on WhatsApp"}</span>
            </a>
            <a
              href="tel:+917597451057"
              onClick={() => trackPhoneCallClick('contact_hero_phone')}
              className="w-full sm:w-auto px-7 py-4 bg-white hover:bg-[#F8F5EF] text-[#25231F] border border-[#EFE7D9] rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[#C49A32]" />
              <span>{pageT.phoneBtn || `${pageT.callNow || "Call Concierge"}: +91 75974 51057`}</span>
            </a>
          </div>
        </div>

        {/* 3 Core Contact Channels Grid (Operations Hub Removed) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Channel 1: Phone */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#C49A32]/10 border border-[#C49A32]/25 flex items-center justify-center text-[#C49A32] mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#25231F] mb-1">
                {pageT.phoneChannelTitle || "Direct Phone Call"}
              </h3>
              <p className="text-xs text-[#25231F]/65 mb-4">
                {pageT.phoneChannelDesc || "Instant voice connection with local ground dispatch."}
              </p>
              <div className="text-sm font-bold text-[#25231F] mb-4">+91 75974 51057</div>
            </div>
            <a
              href="tel:+917597451057"
              onClick={() => trackPhoneCallClick('contact_card_phone')}
              className="w-full py-3 bg-[#F8F5EF] hover:bg-[#25231F] hover:text-white text-[#25231F] border border-[#EFE7D9] rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors"
            >
              {pageT.phoneBtn || "Call Support"}
            </a>
          </div>

          {/* Channel 2: WhatsApp */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/25 flex items-center justify-center text-[#25D366] mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#25231F] mb-1">
                {pageT.waChannelTitle || "WhatsApp Concierge"}
              </h3>
              <p className="text-xs text-[#25231F]/65 mb-4">
                {pageT.waChannelDesc || "Quick replies under 5 minutes with rates & availability."}
              </p>
              <div className="text-sm font-bold text-[#25D366] mb-4">+91 75974 51057</div>
            </div>
            <a
              href="https://wa.me/917597451057?text=Namaste%20Visit%20Chittorgarh!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('contact_card_whatsapp')}
              className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              <span>{pageT.waBtn || "Chat on WhatsApp"}</span>
            </a>
          </div>

          {/* Channel 3: Email */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#A65F3D]/10 border border-[#A65F3D]/25 flex items-center justify-center text-[#A65F3D] mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-base font-serif font-bold text-[#25231F] mb-1">
                {pageT.emailChannelTitle || "Official Email"}
              </h3>
              <p className="text-xs text-[#25231F]/65 mb-4">
                {pageT.emailChannelDesc || "For corporate trips, group quotes & partnerships."}
              </p>
              <div className="text-xs font-bold text-[#25231F] truncate mb-4">visitchittorgarh@gmail.com</div>
            </div>
            <a
              href="mailto:visitchittorgarh@gmail.com"
              className="w-full py-3 bg-[#F8F5EF] hover:bg-[#25231F] hover:text-white text-[#25231F] border border-[#EFE7D9] rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-colors"
            >
              {pageT.emailBtn || "Send Email"}
            </a>
          </div>
        </div>

        {/* Interactive Inquiry Form & Review Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Form: Left 7 Columns */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#EFE7D9] shadow-heritage">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C49A32] bg-[#EFE7D9]/60 px-3 py-1 rounded-full inline-block mb-3">
              {pageT.formKicker || "Direct Inquiry"}
            </span>
            <h2 className="text-2xl font-serif font-black text-[#25231F] mb-2">
              {pageT.formTitle || "Send Quick Booking Request"}
            </h2>
            <p className="text-xs text-[#25231F]/70 mb-6 font-light">
              {pageT.formDesc || "Fill out your travel details and connect immediately with our verified team via WhatsApp."}
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#25231F] mb-1.5">
                    {pageT.nameLabel || "Your Full Name"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={pageT.namePlaceholder || "e.g. Rahul Sharma / David Miller"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F5EF] border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#25231F] mb-1.5">
                    {pageT.phoneLabel || "Phone / WhatsApp Number"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder={pageT.phonePlaceholder || "e.g. +91 98765 43210"}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F5EF] border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#25231F] mb-1.5">
                    {pageT.serviceLabel || "Service Required"}
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F5EF] border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                  >
                    <option value="Private Cab & Taxi Transfer">Private Cab &amp; Taxi Transfer (Dzire / Innova)</option>
                    <option value="Authorized RTDC Tour Guide">Authorized RTDC Tour Guide (English / Hindi)</option>
                    <option value="Foreign Language Guide">Foreign Language Guide (French / German / Spanish)</option>
                    <option value="Day Trip from Udaipur">Day Trip from Udaipur (Cab + Guide Combo)</option>
                    <option value="Sanwariya Seth Detour">Shri Sanwariya Seth Mandir Pilgrimage Detour</option>
                    <option value="Heritage Hotel Booking">Heritage Hotel &amp; Haveli Stay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#25231F] mb-1.5">
                    {pageT.dateLabel || "Travel Date"}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F8F5EF] border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#25231F] mb-1.5">
                  {pageT.requestsLabel || "Special Requests / Group Size"}
                </label>
                <textarea
                  rows="3"
                  placeholder={pageT.requestsPlaceholder || "e.g. 4 family members, airport pickup from Udaipur, require senior citizen assistance..."}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F8F5EF] border border-[#EFE7D9] rounded-xl text-xs text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black rounded-2xl text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-[#25D366] shrink-0" />
                <span>{pageT.submitBtn || "Send on WhatsApp"}</span>
              </button>
            </form>
          </div>

          {/* Trust & Google Review Card: Right 5 Columns */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-heritage">
              <div className="flex items-center gap-1.5 text-amber-500 mb-2">
                <ShieldCheck className="w-4 h-4 fill-amber-500" />
                <ShieldCheck className="w-4 h-4 fill-amber-500" />
                <ShieldCheck className="w-4 h-4 fill-amber-500" />
                <ShieldCheck className="w-4 h-4 fill-amber-500" />
                <ShieldCheck className="w-4 h-4 fill-amber-500" />
                <span className="text-xs font-bold text-[#25231F] ml-1">5.0 / 5.0 Rated</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-[#25231F] mb-3">
                {pageT.reviewTitle || "Verified Google Reviews"}
              </h3>
              <p className="text-sm text-[#25231F]/70 mb-4">
                {pageT.reviewDesc || "Your experience matters – share a review to help fellow travelers discover authentic Chittorgarh experiences."}
              </p>
              <a
                href="https://g.page/r/CT3t7Wz3f6tPEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C49A32] font-bold"
              >
                <span>{pageT.reviewBtn || "Leave a Review on Google ★"}</span>
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Standards Section */}
            <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage">
              <h4 className="text-sm font-bold uppercase text-[#C49A32] mb-3">
                {pageT.standardsKicker || "Standards Guaranteed"}
              </h4>
              <h3 className="text-base font-serif font-bold text-[#25231F] mb-2">
                {pageT.standardsTitle || "Why Book with Visit Chittorgarh?"}
              </h3>
              <ul className="list-disc list-inside space-y-1 text-xs text-[#25231F]/80">
                {(pageT.standards || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
