import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, Mail, MapPin, Users, Clock, ShieldCheck, CheckCircle2, MessageSquare, AlertCircle, Compass } from 'lucide-react';
import { trackInquiryFormSubmit, trackWhatsAppClick, getUtmParams } from '../utils/analytics';
import { saveBookingToFirebase } from '../lib/firebase';

const VERIFIED_PHONE_DISPLAY = "+91 75974 51057";
const VERIFIED_WA_NUMBER = "917597451057";
const VERIFIED_EMAIL = "visitchittorgarh@gmail.com";

const TripPlannerModal = ({ isOpen, onClose, initialService = 'Customized Tour Package' }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        pickupCity: 'Chittorgarh',
        pickupPoint: '',
        travelDate: '',
        travelers: '2',
        duration: 'Full Day (8-10 Hours)',
        services: ['Private Tour Guide', 'Chittorgarh Fort Tour'],
        requirements: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [validationError, setValidationError] = useState('');

    if (!isOpen) return null;

    const availableServices = [
        'Private Tour Guide',
        'Chittorgarh Fort Tour',
        'Private Taxi / Cab',
        'Udaipur / Jaipur Transfer',
        'Heritage Hotel Stay',
        'Mewari Food Experience',
        'Sanwariyaji Temple Tour',
        'Menal Waterfall Tour'
    ];

    const toggleService = (srv) => {
        setFormData(prev => {
            const exists = prev.services.includes(srv);
            if (exists) {
                return { ...prev, services: prev.services.filter(s => s !== srv) };
            } else {
                return { ...prev, services: [...prev.services, srv] };
            }
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        // Validation
        if (!formData.fullName.trim()) {
            setValidationError('Please enter your full name.');
            return;
        }
        const cleanPhone = formData.phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) {
            setValidationError('Please enter a valid 10-digit phone number with WhatsApp.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Capture UTM parameters for attribution
            const utm = getUtmParams();
            const utmSummary = utm.utm_source ? `\n🏷️ *Source:* ${utm.utm_source} / ${utm.utm_campaign || 'direct'}` : '';

            // Construct formatted WhatsApp inquiry message
            const message = 
                `🏰 *VISIT CHITTORGARH — TRIP INQUIRY*\n` +
                `━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                `Namaste! I would like to plan a tour in Chittorgarh.\n\n` +
                `👤 *Guest Name:* ${formData.fullName.trim()}\n` +
                `📞 *Phone / WhatsApp:* ${formData.phone.trim()}\n` +
                `✉️ *Email:* ${formData.email.trim() || 'Not provided'}\n\n` +
                `📍 *Pickup City:* ${formData.pickupCity}\n` +
                `🏢 *Pickup Point:* ${formData.pickupPoint || 'Railway Station / Hotel'}\n` +
                `📅 *Travel Date:* ${formData.travelDate || 'Flexible / Upcoming'}\n` +
                `👥 *Number of Travelers:* ${formData.travelers}\n` +
                `⏱️ *Tour Duration:* ${formData.duration}\n\n` +
                `🛡️ *Interested Services:*\n${formData.services.map(s => `  • ${s}`).join('\n') || '  • Complete Tour Package'}\n\n` +
                (formData.requirements ? `📝 *Special Requests:* ${formData.requirements}\n` : '') +
                `━━━━━━━━━━━━━━━━━━━━━━━━━${utmSummary}\n` +
                `Please share availability and customized quotation. Thank you!`;

            // Track conversion event
            trackInquiryFormSubmit(formData.services.join(', '), formData.travelers);
            trackWhatsAppClick('plan_your_trip_modal', formData.fullName);

            // Optional non-blocking relay
            saveBookingToFirebase({
                name: formData.fullName,
                phone: formData.phone,
                email: formData.email,
                date: formData.travelDate,
                travelers: formData.travelers,
                pillarTitle: formData.services.join(', '),
                category: 'Trip Planner'
            });

            // Open WhatsApp with prefilled message
            const waUrl = `https://wa.me/${VERIFIED_WA_NUMBER}?text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');

            setIsSuccess(true);
        } catch (err) {
            console.error('Inquiry submission error:', err);
            setValidationError('Failed to redirect to WhatsApp. Please chat directly below.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-mewar-charcoal/60 backdrop-blur-md overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-mewar-border overflow-hidden my-8"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-mewar-sandstone via-mewar-ivory to-mewar-sandstone p-6 sm:p-8 border-b border-mewar-border relative">
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-mewar-charcoal flex items-center justify-center transition-colors shadow-sm"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-mewar-gold"></span>
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-mewar-terracotta">
                                Instant Tour Inquiry
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-mewar-charcoal">
                            Plan Your Chittorgarh Trip
                        </h2>
                        <p className="text-xs sm:text-sm text-mewar-charcoal/70 mt-1 max-w-lg">
                            Get personalized itinerary, verified Mewari guide, and private sanitized cab with instant WhatsApp quotation.
                        </p>
                    </div>

                    {isSuccess ? (
                        <div className="p-8 sm:p-12 text-center">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-mewar-charcoal mb-2">
                                Inquiry Connected! 🙏
                            </h3>
                            <p className="text-sm text-mewar-charcoal/70 max-w-md mx-auto mb-6">
                                Your itinerary details have been pre-filled into WhatsApp chat with our verified concierge desk (<strong className="text-mewar-charcoal">{VERIFIED_PHONE_DISPLAY}</strong>).
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <a
                                    href={`https://wa.me/${VERIFIED_WA_NUMBER}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Continue in WhatsApp
                                </a>
                                <button
                                    onClick={() => { setIsSuccess(false); onClose(); }}
                                    className="px-6 py-3 bg-mewar-sandstone text-mewar-charcoal font-semibold rounded-xl text-xs uppercase tracking-wider hover:bg-mewar-border transition-colors"
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
                            {validationError && (
                                <div className="p-3 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{validationError}</span>
                                </div>
                            )}

                            {/* Guest Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Full Name *
                                    </label>
                                    <div className="relative">
                                        <User className="w-4 h-4 text-mewar-charcoal/40 absolute left-3.5 top-3.5" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            placeholder="e.g. Vikramaditya Singh"
                                            className="w-full pl-10 pr-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Phone / WhatsApp Number *
                                    </label>
                                    <div className="relative">
                                        <Phone className="w-4 h-4 text-mewar-charcoal/40 absolute left-3.5 top-3.5" />
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="10-digit WhatsApp number"
                                            className="w-full pl-10 pr-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Email (Optional)
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-mewar-charcoal/40 absolute left-3.5 top-3.5" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="name@email.com"
                                            className="w-full pl-10 pr-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Pickup City
                                    </label>
                                    <select
                                        value={formData.pickupCity}
                                        onChange={(e) => setFormData({ ...formData, pickupCity: e.target.value })}
                                        className="w-full px-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                    >
                                        <option value="Chittorgarh">Chittorgarh</option>
                                        <option value="Udaipur (Airport / Hotel)">Udaipur</option>
                                        <option value="Jaipur">Jaipur</option>
                                        <option value="Bhilwara">Bhilwara</option>
                                        <option value="Kota">Kota</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Pickup Point
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.pickupPoint}
                                        onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                                        placeholder="Railway Stn / Hotel name"
                                        className="w-full px-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Tour Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Travel Date
                                    </label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-mewar-charcoal/40 absolute left-3.5 top-3.5" />
                                        <input
                                            type="date"
                                            value={formData.travelDate}
                                            onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                                            className="w-full pl-10 pr-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Travelers
                                    </label>
                                    <select
                                        value={formData.travelers}
                                        onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                                        className="w-full px-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                    >
                                        <option value="1 Solo Traveler">1 Solo Traveler</option>
                                        <option value="2 (Couple / Duo)">2 Travelers (Couple)</option>
                                        <option value="3-4 (Small Family / Friends)">3-4 Travelers (Family)</option>
                                        <option value="5-7 (Innova / SUV)">5-7 Travelers (SUV)</option>
                                        <option value="8+ (Tempo Traveller / Group)">8+ (Group / Tempo)</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                        Tour Duration
                                    </label>
                                    <select
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        className="w-full px-4 py-3 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                    >
                                        <option value="Half Day (4-5 Hours)">Half Day (4-5 Hours)</option>
                                        <option value="Full Day (8-10 Hours)">Full Day (8-10 Hours)</option>
                                        <option value="2 Days / 1 Night Tour">2 Days / 1 Night Tour</option>
                                        <option value="3 Days / 2 Nights Tour">3 Days / 2 Nights Tour</option>
                                        <option value="Custom Duration">Custom Duration</option>
                                    </select>
                                </div>
                            </div>

                            {/* Service Badges Multi-select */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-2">
                                    Interested Services (Tap to select)
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {availableServices.map((srv) => {
                                        const active = formData.services.includes(srv);
                                        return (
                                            <button
                                                key={srv}
                                                type="button"
                                                onClick={() => toggleService(srv)}
                                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                                                    active
                                                        ? 'bg-mewar-charcoal text-white border-mewar-charcoal shadow-sm'
                                                        : 'bg-mewar-ivory text-mewar-charcoal/70 border-mewar-border hover:border-mewar-gold'
                                                }`}
                                            >
                                                {active ? '✓ ' : '+ '}{srv}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Additional Requirements */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-mewar-charcoal/80 mb-1.5">
                                    Special Requirements / Notes
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    placeholder="e.g. Senior citizens traveling, Hindi/English guide preference, temple darshan timings..."
                                    className="w-full px-4 py-2.5 bg-mewar-ivory border border-mewar-border rounded-xl text-sm text-mewar-charcoal focus:outline-none focus:border-mewar-gold transition-colors"
                                />
                            </div>

                            {/* Submit & Contact CTAs */}
                            <div className="pt-2 border-t border-mewar-border flex flex-col sm:flex-row gap-3 items-center justify-between">
                                <div className="text-[11px] text-mewar-charcoal/60 text-center sm:text-left">
                                    <span>🔒 Frontend inquiry directly opens official WhatsApp concierge.</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto px-8 py-3.5 bg-mewar-gold hover:bg-mewar-gold-dark text-white font-bold rounded-2xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    {isSubmitting ? 'Connecting...' : 'Send WhatsApp Inquiry'}
                                </button>
                            </div>

                            {/* Direct Contact Bar */}
                            <div className="bg-mewar-sandstone/50 p-3.5 rounded-2xl border border-mewar-border/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                                <span className="text-mewar-charcoal/70 font-medium">Need immediate assistance?</span>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="tel:+917597451057"
                                        className="font-bold text-mewar-charcoal hover:text-mewar-terracotta transition-colors flex items-center gap-1"
                                    >
                                        <Phone className="w-3.5 h-3.5 text-mewar-terracotta" />
                                        {VERIFIED_PHONE_DISPLAY}
                                    </a>
                                    <a
                                        href={`mailto:${VERIFIED_EMAIL}`}
                                        className="font-medium text-mewar-charcoal/80 hover:text-mewar-gold transition-colors flex items-center gap-1"
                                    >
                                        <Mail className="w-3.5 h-3.5" />
                                        Email
                                    </a>
                                </div>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TripPlannerModal;
