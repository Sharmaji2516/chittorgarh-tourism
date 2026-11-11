import React, { useState, useEffect } from 'react';
import {
  X, Calendar, User, Phone, Mail, MapPin, Users, Clock,
  CheckCircle2, MessageSquare, AlertCircle, Compass, ChevronDown, ShieldCheck, ArrowRight
} from 'lucide-react';
import { trackInquiryFormSubmit, trackWhatsAppClick, trackPhoneCallClick, getUtmParams } from '../utils/analytics';
import { saveBookingToFirebase } from '../lib/firebase';

const VERIFIED_PHONE_DISPLAY = '+91 75974 51057';
const VERIFIED_WA_NUMBER = '917597451057';
const VERIFIED_EMAIL = 'visitchittorgarh@gmail.com';

const AVAILABLE_SERVICES = [
  'Private Tour Guide',
  'Chittorgarh Fort Tour',
  'Private Taxi / Cab',
  'Udaipur / Jaipur Transfer',
  'Heritage Hotel Stay',
  'Mewari Food Experience',
  'Sanwariya Seth Temple',
  'Menal Waterfall Tour',
];

const INPUT_BASE =
  'w-full min-w-0 h-11 pl-10 pr-3.5 bg-white border border-[#E4DAC6] rounded-xl text-base sm:text-sm text-[#25231F] placeholder:text-[#25231F]/40 focus:outline-none focus:border-[#C49A32] focus:ring-2 focus:ring-[#C49A32]/20 transition-all';

const SELECT_BASE =
  'w-full min-w-0 h-11 pl-10 pr-9 bg-white border border-[#E4DAC6] rounded-xl text-base sm:text-sm text-[#25231F] appearance-none focus:outline-none focus:border-[#C49A32] focus:ring-2 focus:ring-[#C49A32]/20 transition-all cursor-pointer';

const LABEL_CLASS =
  'block text-[11px] font-bold uppercase tracking-wider text-[#25231F]/75 mb-1.5';

const TripPlannerModal = ({
  isOpen,
  onClose,
  mode = 'full',
  itemName = '',
  itemDuration = '',
  category = 'Tour Package',
}) => {
  const [activeMode, setActiveMode] = useState(mode);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    pickupCity: 'Chittorgarh',
    pickupPoint: '',
    travelDate: '',
    travelers: '2 (Couple / Duo)',
    duration: 'Full Day (8-10 Hours)',
    services: ['Private Tour Guide', 'Chittorgarh Fort Tour'],
    requirements: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Reset mode/error/success whenever modal opens with new context
  useEffect(() => {
    if (!isOpen) return undefined;
    setActiveMode(mode === 'focused' && itemName ? 'focused' : 'full');
    setIsSuccess(false);
    setValidationError('');

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, mode, itemName, onClose]);

  if (!isOpen) return null;

  const isFocused = activeMode === 'focused' && Boolean(itemName);
  const todayIso = new Date().toISOString().split('T')[0];

  const toggleService = (srv) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== srv)
          : [...prev.services, srv],
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setValidationError('Please enter a valid 10-digit WhatsApp or mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const utm = getUtmParams();
      const utmSummary = utm.utm_source
        ? `\n🏷️ *Source:* ${utm.utm_source} / ${utm.utm_campaign || 'direct'}`
        : '';

      const message = isFocused
        ? `🏰 *VISIT CHITTORGARH — ${category.toUpperCase()} INQUIRY*\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `📦 *Selected:* ${itemName}${itemDuration ? ` (${itemDuration})` : ''}\n\n` +
          `👤 *Guest Name:* ${formData.fullName.trim()}\n` +
          `📞 *Phone / WhatsApp:* ${formData.phone.trim()}\n` +
          `📅 *Travel Date:* ${formData.travelDate || 'Flexible / Upcoming'}\n` +
          `👥 *Travelers:* ${formData.travelers}\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━${utmSummary}\n` +
          `Please share availability & quotation for this ${category.toLowerCase()}. Thank you!`
        : `🏰 *VISIT CHITTORGARH — TRIP INQUIRY*\n` +
          `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
          `Namaste! I would like to plan a tour in Chittorgarh.\n\n` +
          `👤 *Guest Name:* ${formData.fullName.trim()}\n` +
          `📞 *Phone / WhatsApp:* ${formData.phone.trim()}\n` +
          `✉️ *Email:* ${formData.email.trim() || 'Not provided'}\n\n` +
          `📍 *Pickup City:* ${formData.pickupCity}\n` +
          `🏢 *Pickup Point:* ${formData.pickupPoint.trim() || 'Railway Station / Hotel'}\n` +
          `📅 *Travel Date:* ${formData.travelDate || 'Flexible / Upcoming'}\n` +
          `👥 *Number of Travelers:* ${formData.travelers}\n` +
          `⏱️ *Tour Duration:* ${formData.duration}\n\n` +
          `🛡️ *Interested Services:*\n${
            formData.services.map((s) => `  • ${s}`).join('\n') || '  • Complete Tour Package'
          }\n\n` +
          (formData.requirements.trim()
            ? `📝 *Special Requests:* ${formData.requirements.trim()}\n`
            : '') +
          `━━━━━━━━━━━━━━━━━━━━━━━━━${utmSummary}\n` +
          `Please share availability and customized quotation. Thank you!`;

      trackInquiryFormSubmit(isFocused ? itemName : formData.services.join(', '), formData.travelers);
      trackWhatsAppClick(isFocused ? 'focused_package_modal' : 'plan_your_trip_modal', itemName || formData.fullName);

      saveBookingToFirebase({
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        date: formData.travelDate,
        travelers: formData.travelers,
        pillarTitle: isFocused ? itemName : formData.services.join(', '),
        category: isFocused ? category : 'Trip Planner',
      });

      const waUrl = `https://wa.me/${VERIFIED_WA_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');

      setIsSuccess(true);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setValidationError('Could not open WhatsApp automatically. Please tap the Call button below.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#25231F]/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="trip-planner-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          isFocused ? 'sm:max-w-md' : 'sm:max-w-2xl'
        } bg-[#F8F5EF] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E4DAC6] max-h-[92dvh] sm:max-h-[90vh] flex flex-col overflow-hidden transition-all`}
      >
        {/* Pinned Header */}
        <div className="bg-gradient-to-r from-[#EFE7D9] via-[#FFFDF9] to-[#EFE7D9] px-5 pt-3 pb-4 sm:px-7 sm:py-5 border-b border-[#E4DAC6] relative shrink-0">
          <div className="w-10 h-1 rounded-full bg-[#C49A32]/40 mx-auto mb-3 sm:hidden" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white hover:bg-[#25231F] text-[#25231F] hover:text-white border border-[#E4DAC6] flex items-center justify-center transition-colors shadow-sm"
            aria-label="Close inquiry modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-1 pr-10">
            <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#A65F3D]">
              <Compass className="w-3.5 h-3.5 text-[#C49A32]" />
              {isFocused ? `Quick ${category} Inquiry` : 'Instant Concierge Inquiry'}
            </span>
            {isFocused && itemDuration && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#25231F] text-white">
                {itemDuration}
              </span>
            )}
          </div>

          <h2
            id="trip-planner-modal-title"
            className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] pr-10 leading-tight"
          >
            {isFocused ? itemName : 'Plan Your Chittorgarh Trip'}
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mt-1 max-w-lg leading-snug">
            {isFocused
              ? 'Just 4 quick details — get availability & quote directly on WhatsApp.'
              : 'Personalized itinerary, licensed Mewari historian & sanitized private cab quote via WhatsApp.'}
          </p>
        </div>

        {isSuccess ? (
          <div className="p-6 sm:p-10 text-center overflow-y-auto flex-1">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#25231F] mb-2">
              Inquiry Connected!
            </h3>
            <p className="text-xs sm:text-sm text-[#25231F]/75 max-w-md mx-auto mb-6 leading-relaxed">
              Your {isFocused ? <strong>{itemName}</strong> : 'trip'} inquiry is pre-filled in WhatsApp with our local Chittorgarh desk (
              <strong className="text-[#25231F]">{VERIFIED_PHONE_DISPLAY}</strong>).
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`https://wa.me/${VERIFIED_WA_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-[#128C7E] hover:bg-[#0f766a] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                Continue in WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(false);
                  onClose();
                }}
                className="px-6 py-3.5 bg-[#EFE7D9] text-[#25231F] font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-[#E4DAC6] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            {/* Scrollable Body */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 space-y-4">
              {validationError && (
                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {isFocused ? (
                /* FOCUSED INDIVIDUAL PACKAGE / SERVICE FORM (ONLY 4 FIELDS) */
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EFE7D9] shadow-sm space-y-3.5">
                  <div className="min-w-0">
                    <label htmlFor="tp-focused-name" className={LABEL_CLASS}>
                      Your Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="tp-focused-name"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikramaditya Singh"
                        className={INPUT_BASE}
                      />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <label htmlFor="tp-focused-phone" className={LABEL_CLASS}>
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        id="tp-focused-phone"
                        type="tel"
                        inputMode="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="10-digit WhatsApp number"
                        className={INPUT_BASE}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="min-w-0">
                      <label htmlFor="tp-focused-date" className={LABEL_CLASS}>
                        Preferred Date
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="tp-focused-date"
                          type="date"
                          min={todayIso}
                          value={formData.travelDate}
                          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                          className={INPUT_BASE}
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="tp-focused-travelers" className={LABEL_CLASS}>
                        Travelers
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          id="tp-focused-travelers"
                          value={formData.travelers}
                          onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                          className={SELECT_BASE}
                        >
                          <option value="1 Solo Traveler">1 Solo Traveler</option>
                          <option value="2 (Couple / Duo)">2 Travelers (Couple)</option>
                          <option value="3-4 (Small Family / Friends)">3–4 (Family / Friends)</option>
                          <option value="5-7 (Innova / SUV)">5–7 (Innova / SUV)</option>
                          <option value="8+ (Tempo Traveller / Group)">8+ (Tempo / Group)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#25231F]/45 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveMode('full')}
                    className="pt-1 text-[11px] font-semibold text-[#A65F3D] hover:text-[#25231F] inline-flex items-center gap-1 transition-colors"
                  >
                    Need custom pickup city or extra services? Open full form
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                /* FULL CUSTOM TRIP PLANNER FORM */
                <>
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EFE7D9] shadow-sm space-y-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A65F3D]">
                      1. Guest Contact Details
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="min-w-0">
                        <label htmlFor="tp-full-name" className={LABEL_CLASS}>
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="tp-full-name"
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            placeholder="e.g. Vikramaditya Singh"
                            className={INPUT_BASE}
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="tp-phone" className={LABEL_CLASS}>
                          WhatsApp / Phone *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="tp-phone"
                            type="tel"
                            inputMode="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="10-digit WhatsApp number"
                            className={INPUT_BASE}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor="tp-email" className={LABEL_CLASS}>
                        Email (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="tp-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@email.com"
                          className={INPUT_BASE}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EFE7D9] shadow-sm space-y-3.5">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#A65F3D]">
                      2. Pickup &amp; Travel Schedule
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="min-w-0">
                        <label htmlFor="tp-city" className={LABEL_CLASS}>
                          Pickup City
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            id="tp-city"
                            value={formData.pickupCity}
                            onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                            className={SELECT_BASE}
                          >
                            <option value="Chittorgarh">Chittorgarh</option>
                            <option value="Udaipur (Airport / Hotel)">Udaipur (City / Airport)</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Bhilwara">Bhilwara</option>
                            <option value="Kota">Kota</option>
                            <option value="Other">Other City</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#25231F]/45 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="tp-point" className={LABEL_CLASS}>
                          Pickup Point
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="tp-point"
                            type="text"
                            value={formData.pickupPoint}
                            onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                            placeholder="Station / Airport / Hotel"
                            className={INPUT_BASE}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div className="min-w-0">
                        <label htmlFor="tp-date" className={LABEL_CLASS}>
                          Travel Date
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <input
                            id="tp-date"
                            type="date"
                            min={todayIso}
                            value={formData.travelDate}
                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                            className={INPUT_BASE}
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="tp-travelers" className={LABEL_CLASS}>
                          Travelers
                        </label>
                        <div className="relative">
                          <Users className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            id="tp-travelers"
                            value={formData.travelers}
                            onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                            className={SELECT_BASE}
                          >
                            <option value="1 Solo Traveler">1 Solo Traveler</option>
                            <option value="2 (Couple / Duo)">2 Travelers (Couple)</option>
                            <option value="3-4 (Small Family / Friends)">3–4 (Family / Friends)</option>
                            <option value="5-7 (Innova / SUV)">5–7 (Innova / SUV)</option>
                            <option value="8+ (Tempo Traveller / Group)">8+ (Tempo / Group)</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#25231F]/45 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <label htmlFor="tp-duration" className={LABEL_CLASS}>
                          Tour Duration
                        </label>
                        <div className="relative">
                          <Clock className="w-4 h-4 text-[#25231F]/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            id="tp-duration"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className={SELECT_BASE}
                          >
                            <option value="Half Day (4-5 Hours)">Half Day (4–5 Hrs)</option>
                            <option value="Full Day (8-10 Hours)">Full Day (8–10 Hrs)</option>
                            <option value="2 Days / 1 Night Tour">2 Days / 1 Night</option>
                            <option value="3 Days / 2 Nights Tour">3 Days / 2 Nights</option>
                            <option value="Custom Duration">Custom Duration</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#25231F]/45 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EFE7D9] shadow-sm space-y-4">
                    <div>
                      <span className={LABEL_CLASS}>3. Interested Services (Tap to select)</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {AVAILABLE_SERVICES.map((srv) => {
                          const active = formData.services.includes(srv);
                          return (
                            <button
                              key={srv}
                              type="button"
                              onClick={() => toggleService(srv)}
                              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border min-h-[36px] ${
                                active
                                  ? 'bg-[#25231F] text-white border-[#25231F] shadow-sm'
                                  : 'bg-[#F8F5EF] text-[#25231F]/80 border-[#E4DAC6] hover:border-[#C49A32]'
                              }`}
                            >
                              {active ? '✓ ' : '+ '}
                              {srv}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="tp-notes" className={LABEL_CLASS}>
                        Special Requests / Notes
                      </label>
                      <textarea
                        id="tp-notes"
                        rows={2}
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        placeholder="e.g. Senior citizens, English/Hindi guide, Sanwariya Seth darshan..."
                        className="w-full min-w-0 px-3.5 py-2.5 bg-white border border-[#E4DAC6] rounded-xl text-base sm:text-sm text-[#25231F] placeholder:text-[#25231F]/40 focus:outline-none focus:border-[#C49A32] focus:ring-2 focus:ring-[#C49A32]/20 transition-all"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sticky Bottom Conversion Footer */}
            <div className="shrink-0 bg-[#FFFDF9] border-t border-[#E4DAC6] px-4 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
                <div className="flex items-center justify-between sm:justify-start gap-3 text-[11px] text-[#25231F]/70">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#526B50] shrink-0" />
                    Direct WhatsApp concierge
                  </span>
                  <a
                    href="tel:+917597451057"
                    onClick={() => trackPhoneCallClick('trip_planner_modal_footer')}
                    className="font-bold text-[#A65F3D] hover:text-[#25231F] inline-flex items-center gap-1 whitespace-nowrap"
                  >
                    <Phone className="w-3 h-3" />
                    {VERIFIED_PHONE_DISPLAY}
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${VERIFIED_EMAIL}`}
                    className="px-3.5 py-3 rounded-xl bg-[#EFE7D9] hover:bg-[#E4DAC6] text-[#25231F] text-xs font-semibold inline-flex items-center justify-center sm:hidden"
                    aria-label="Email Concierge"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-initial px-6 py-3.5 bg-[#128C7E] hover:bg-[#0f766a] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 min-h-[46px]"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {isSubmitting ? 'Connecting...' : 'Send WhatsApp Inquiry'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TripPlannerModal;
