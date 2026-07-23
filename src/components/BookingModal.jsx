import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, CheckCircle2, ArrowRight, Loader2, Star, ShieldCheck, MapPin, Car, Hotel, Mail, UtensilsCrossed, Clock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { saveBookingToFirebase } from '../lib/firebase';
import { content } from '../data/content';

const BookingModal = ({ isOpen, onClose, pillarTitle }) => {
    const { bookingData, updateBooking } = useBooking();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    if (!isOpen) return null;

    const packageName = pillarTitle ? pillarTitle.replace(" Package", "") : "";
    const plan = content.en.itineraries.plans.find(p => p.title === packageName);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const finalData = {
                ...bookingData,
                pillarTitle: pillarTitle || 'Custom Package',
                status: 'submitted',
                createdAt: new Date().toISOString(),
                agreedToTerms: true,
                termsVersion: '1.0'
            };

            await saveBookingToFirebase(finalData);

            const phoneNumber = "917597451057";
            const message = `*👑 Royal Expedition Inquiry*\n\n` +
                `*🛡️ Expedition:* ${pillarTitle || 'Custom'}\n` +
                `*📅 Date:* ${bookingData.date}\n` +
                `*🕒 Arrival Time:* ${bookingData.arrivalTime || 'Not Specified'}\n` +
                `*🕒 Departure Time:* ${bookingData.departureTime || 'Not Specified'}\n` +
                `*👥 Travelers:* ${bookingData.travelers}\n\n` +
                `*-- Preferences --*\n` +
                `*🚗 Vehicle:* ${bookingData.transport}\n` +
                `*🏨 Room:* ${bookingData.hotel}\n` +
                `*🍽️ Cuisine:* ${bookingData.cuisine || 'Not Specified'}\n\n` +
                `*📜 Special Needs:* ${bookingData.requirements || 'None'}\n\n` +
                `*👤 Name:* ${bookingData.name}\n` +
                `*📱 Phone:* ${bookingData.phone}\n\n` +
                `I am interested in this Royal Expedition. Please contact me with availability and a custom quote.`;

            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');

            // Telegram Notification
            const telegramToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
            const telegramChatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
            if (telegramToken && telegramChatId) {
                const cleanPhone = bookingData.phone.replace(/\D/g, '');
                const waPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

                const escapeHTML = (str) => {
                    if (!str) return '';
                    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                };

                const telegramText = 
                    `🏰 <b>CHITTORGARH TOURISM</b> 🏰\n` +
                    `━━━━━━━━━━━━━━━━━━━━\n` +
                    `✨ <b>New Expedition Booking</b> ✨\n\n` +
                    `🛡️ <b>Expedition:</b> <code>${escapeHTML(pillarTitle || 'Custom')}</code>\n` +
                    `📅 <b>Date:</b> <code>${escapeHTML(bookingData.date)}</code>\n` +
                    `🕒 <b>Arrival:</b> <code>${escapeHTML(bookingData.arrivalTime || 'Not Specified')}</code>\n` +
                    `🕒 <b>Departure:</b> <code>${escapeHTML(bookingData.departureTime || 'Not Specified')}</code>\n` +
                    `👥 <b>Travelers:</b> <code>${escapeHTML(bookingData.travelers)}</code>\n\n` +
                    `<b>🚗 Preferences:</b>\n` +
                    `• *Vehicle:* ${escapeHTML(bookingData.transport)}\n` +
                    `• *Room:* ${escapeHTML(bookingData.hotel)}\n` +
                    `• *Cuisine:* ${escapeHTML(bookingData.cuisine || 'Not Specified')}\n` +
                    `• *Needs:* ${escapeHTML(bookingData.requirements || 'None')}\n\n` +
                    `<b>👤 Guest Details:</b>\n` +
                    `• <b>Name:</b> ${escapeHTML(bookingData.name)}\n` +
                    `• <b>Phone:</b> <code>${escapeHTML(bookingData.phone)}</code>\n` +
                    `• <b>Email:</b> <code>${escapeHTML(bookingData.email || 'Not Provided')}</code>\n` +
                    `━━━━━━━━━━━━━━━━━━━━`;

                await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: telegramChatId,
                        text: telegramText,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: "💬 Chat on WhatsApp", url: `https://wa.me/${waPhone}` },
                                    { text: "📞 Call Customer", url: `tel:${bookingData.phone}` }
                                ]
                            ]
                        }
                    })
                }).catch(err => console.error("Telegram notification failed:", err));
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Submission Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const progress = submitted ? '100%' : step === 1 ? '33%' : step === 2 ? '66%' : '100%';

    const PreferenceCard = ({ type, label, icon: Icon, value, options }) => (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                </p>
                <span className="text-[10px] text-white/30 font-medium italic">Choose preference</span>
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
                {options && options.map(opt => (
                    <button 
                        key={opt} 
                        type="button" 
                        onClick={() => updateBooking({ [type]: opt })} 
                        className={`group relative py-3 md:py-4 px-3 md:px-4 rounded-2xl border transition-all duration-300 flex flex-col items-start ${
                            value === opt 
                            ? 'bg-royal-gold/15 border-royal-gold shadow-[0_0_25px_-5px_rgba(212,175,55,0.3)]' 
                            : 'bg-white/[0.03] border-white/5 hover:border-royal-gold/30 hover:bg-white/[0.06]'
                        }`}
                    >
                        <span className={`text-[9px] md:text-[11px] font-bold uppercase tracking-widest mb-1 transition-colors ${value === opt ? 'text-white' : 'text-white/60'}`}>{opt}</span>
                        {value === opt && (
                            <div className="absolute top-2 right-2 md:top-3 md:right-3">
                                <CheckCircle2 className="w-4 h-4 text-royal-gold" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center md:p-8 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-royal-black/98 backdrop-blur-2xl"
                />
                
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 50 }}
                    className="relative w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl bg-heritage-charcoal md:border md:border-white/10 md:rounded-[3.5rem] overflow-hidden shadow-[0_80px_150px_-30px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                >
                    {/* Left Panel - Branding (Desktop Only) */}
                    <div className="hidden md:flex w-64 bg-royal-gold/5 border-r border-white/5 flex-col justify-between p-10 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(212,175,55,1) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
                        <div className="z-10">
                            <div className="w-12 h-12 rounded-2xl bg-royal-gold flex items-center justify-center mb-6 shadow-2xl shadow-royal-gold/40">
                                <Star className="w-6 h-6 text-royal-black fill-royal-black" />
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-2 leading-tight">Royal<br/>Heritage</h2>
                            <div className="w-10 h-0.5 bg-royal-gold rounded-full opacity-50"></div>
                        </div>
                        <div className="z-10 space-y-4">
                            <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-royal-gold" /><span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Verified</span></div>
                            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-royal-gold" /><span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Chittorgarh</span></div>
                        </div>
                    </div>

                    {/* Right Panel - Form Content */}
                    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center relative">
                            <div>
                                <h3 className="text-lg md:text-2xl font-serif text-white">{submitted ? "Inquiry Sent" : "Experience Mewar"}</h3>
                                <p className="text-[8px] md:text-[9px] text-royal-gold uppercase tracking-[0.5em] mt-1 font-black">{submitted ? "Submission Successful" : `Stage ${step} of 3`}</p>
                            </div>
                            <button type="button" onClick={onClose} className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/30 hover:text-white">
                                <X className="w-5 h-5" />
                            </button>
                            {/* Inner Progress Bar */}
                            <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full">
                                <motion.div animate={{ width: progress }} className="h-full bg-royal-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                            </div>
                        </div>

                        {/* Scrollable Form Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div 
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-8"
                                    >
                                        <div className="w-24 h-24 bg-royal-gold rounded-full flex items-center justify-center shadow-2xl shadow-royal-gold/20">
                                            <CheckCircle2 className="w-12 h-12 text-royal-black" />
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-2xl font-serif text-white">Shukriya!</h4>
                                            <p className="text-royal-gold/80 text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed max-w-sm mx-auto">
                                                We have received your request. Our team is **checking the real-time availability** and we will get back to you on your WhatsApp and email with the confirmation and quotation shortly.
                                            </p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4">
                                            <button 
                                                onClick={onClose}
                                                className="px-10 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white hover:text-black transition-all"
                                            >
                                                Return to Site
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    setSubmitted(false);
                                                    setStep(1);
                                                    updateBooking({
                                                        date: '',
                                                        travelers: 1,
                                                        transport: '',
                                                        hotel: '',
                                                        cuisine: '',
                                                        requirements: '',
                                                        name: '',
                                                        email: '',
                                                        phone: ''
                                                    });
                                                }}
                                                className="px-10 py-4 bg-gradient-to-r from-royal-gold to-amber-500 text-royal-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:brightness-110 shadow-lg transition-all"
                                            >
                                                Book another package
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <>
                                        {step === 1 && (
                                            <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
                                                <div className="text-center md:text-left mb-4">
                                                    <p className="text-white/40 text-xs font-medium italic underline underline-offset-8 decoration-royal-gold/20">When shall we prepare for your arrival?</p>
                                                </div>
                                                
                                                {plan && (
                                                    <div className="mb-6 p-6 bg-white/[0.03] border border-white/10 rounded-2xl">
                                                        <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.2em] mb-4">Itinerary Overview</p>
                                                        <div className="space-y-4">
                                                            {plan.timeline.map((item, idx) => (
                                                                <div key={idx} className="flex gap-4">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-royal-gold mt-1.5 shrink-0" />
                                                                    <div>
                                                                        <p className="text-sm text-white font-bold">{item.visit}</p>
                                                                        <p className="text-xs text-white/50">{item.stay}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="mt-4 p-4 bg-royal-gold/10 border border-royal-gold/20 rounded-xl">
                                                            <p className="text-xs text-white/70 font-medium leading-relaxed">
                                                                 <span className="text-royal-gold font-black uppercase tracking-widest text-[10px] block mb-1">Important Note</span>
                                                                 Please inform us of your exact arrival and departure times. We will provide your detailed, time-specific itinerary based on that. This is just a general overview.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="space-y-8">
                                                    <div className="relative group">
                                                        <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-royal-gold group-focus-within:scale-110 transition-transform" />
                                                        <input required type="date" value={bookingData.date || ''} onChange={(e) => updateBooking({ date: e.target.value })} onClick={(e) => e.target.showPicker?.()} onFocus={(e) => e.target.showPicker?.()} className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-6 text-white text-lg focus:outline-none focus:border-royal-gold focus:bg-white/5 transition-all cursor-pointer" />
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] px-2">Expected Arrival Time</p>
                                                            <div className="relative group">
                                                                <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-gold group-focus-within:scale-110 transition-transform" />
                                                                <input required type="text" placeholder="e.g. 09:00 AM" value={bookingData.arrivalTime || ''} onChange={(e) => updateBooking({ arrivalTime: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-white text-base focus:outline-none focus:border-royal-gold focus:bg-white/5 transition-all" />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] px-2">Expected Departure Time</p>
                                                            <div className="relative group">
                                                                <Clock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-gold group-focus-within:scale-110 transition-transform" />
                                                                <input required type="text" placeholder="e.g. 06:00 PM" value={bookingData.departureTime || ''} onChange={(e) => updateBooking({ departureTime: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-white text-base focus:outline-none focus:border-royal-gold focus:bg-white/5 transition-all" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] px-2">Guests in your party</p>
                                                        <div className="relative group">
                                                            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-royal-gold group-focus-within:scale-110 transition-transform" />
                                                            <input required type="number" min="1" value={bookingData.travelers || 1} onChange={(e) => updateBooking({ travelers: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-6 text-white text-lg focus:outline-none focus:border-royal-gold focus:bg-white/5 transition-all" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button 
                                                    type="button" 
                                                    onClick={handleNext} 
                                                    disabled={!bookingData.date} 
                                                    className="w-full py-6 bg-royal-gold text-royal-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-royal-gold/20 hover:brightness-110 active:scale-95 transition-all"
                                                >
                                                    Next Step
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </motion.div>
                                        )}

                                        {step === 2 && (
                                            <motion.div key="step2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8 pb-10">
                                                <div className="text-center mb-6">
                                                    <p className="text-royal-gold/60 text-[10px] font-black uppercase tracking-widest">Customize Your Experience</p>
                                                </div>
                                                
                                                <PreferenceCard 
                                                    type="transport" 
                                                    label="Royal Chauffeur" 
                                                    icon={Car} 
                                                    value={bookingData.transport} 
                                                    options={['Luxury Sedan', 'Royal SUV', 'Mini Bus']} 
                                                />
                                                
                                                <PreferenceCard 
                                                    type="hotel" 
                                                    label="Grand Accommodations" 
                                                    icon={Hotel} 
                                                    value={bookingData.hotel} 
                                                    options={['Heritage Suite', 'Luxury Room', 'Standard Room']} 
                                                />
                                                
                                                <PreferenceCard 
                                                    type="cuisine" 
                                                    label="Culinary Soul" 
                                                    icon={UtensilsCrossed} 
                                                    value={bookingData.cuisine} 
                                                    options={['Rajasthani', 'Indian', 'Global/Continental']} 
                                                />

                                                <div className="space-y-4">
                                                    <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] px-2">Any Special Requirements?</p>
                                                    <textarea 
                                                        placeholder="Dietary needs, special occasions, or specific preferences..."
                                                        value={bookingData.requirements || ''}
                                                        onChange={(e) => updateBooking({ requirements: e.target.value })}
                                                        className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] py-4 px-6 text-white text-xs focus:outline-none focus:border-royal-gold min-h-[80px] resize-none"
                                                    />
                                                </div>
                                                
                                                <div className="flex flex-col gap-4">
                                                    <button 
                                                        type="button" 
                                                        onClick={handleNext} 
                                                        className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-royal-gold/20 hover:brightness-110 active:scale-95 transition-all"
                                                    >
                                                        Review Inquiry
                                                        <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                    <button type="button" onClick={handleBack} className="text-[10px] text-white/30 hover:text-royal-gold uppercase font-black tracking-widest transition-colors">Go Back</button>
                                                </div>
                                            </motion.div>
                                        )}

                                        {step === 3 && (
                                            <motion.div key="step3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                                <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-5">
                                                    <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em] mb-4 text-center">Inquiry Summary</p>
                                                    <div className="flex justify-between items-center"><span className="text-[9px] text-white/30 uppercase tracking-widest">Vehicle</span><span className="text-xs text-white font-bold">{bookingData.transport}</span></div>
                                                    <div className="flex justify-between items-center"><span className="text-[9px] text-white/30 uppercase tracking-widest">Room</span><span className="text-xs text-white font-bold">{bookingData.hotel}</span></div>
                                                    <div className="flex justify-between items-center"><span className="text-[9px] text-white/30 uppercase tracking-widest">Cuisine</span><span className="text-xs text-white font-bold">{bookingData.cuisine}</span></div>
                                                    <div className="pt-6 border-t border-white/5 flex justify-center items-center text-center px-4">
                                                        <span className="text-[10px] font-black text-royal-gold uppercase tracking-[0.2em] leading-relaxed">
                                                            Check real-time availability and get custom quote on WhatsApp
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="relative group">
                                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-gold/50 group-focus-within:text-royal-gold transition-colors" />
                                                        <input required type="text" placeholder="Full Name" value={bookingData.name || ''} onChange={(e) => updateBooking({ name: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-white text-lg focus:outline-none focus:border-royal-gold" />
                                                    </div>
                                                    <div className="relative group">
                                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-gold/50 group-focus-within:text-royal-gold transition-colors" />
                                                        <input required type="email" placeholder="Email Address" value={bookingData.email || ''} onChange={(e) => updateBooking({ email: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-white text-lg focus:outline-none focus:border-royal-gold" />
                                                    </div>
                                                    <div className="relative group">
                                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-royal-gold/50 group-focus-within:text-royal-gold transition-colors" />
                                                        <input required type="tel" placeholder="WhatsApp Number" value={bookingData.phone || ''} onChange={(e) => updateBooking({ phone: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 pl-16 pr-8 text-white text-lg focus:outline-none focus:border-royal-gold" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 px-2">
                                                    <input 
                                                        type="checkbox" 
                                                        id="terms" 
                                                        checked={agreedToTerms} 
                                                        onChange={(e) => setAgreedToTerms(e.target.checked)} 
                                                        className="w-4 h-4 accent-amber-500 rounded border-white/10"
                                                    />
                                                    <label htmlFor="terms" className="text-[10px] uppercase tracking-wider text-white/50 font-bold">
                                                        I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-royal-gold hover:underline">Terms & Conditions</a>
                                                    </label>
                                                </div>

                                                <div className="flex flex-col gap-3">
                                                    <div className="flex gap-4">
                                                        <button type="button" onClick={handleBack} className="w-20 rounded-2xl bg-white/5 text-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
                                                        <button type="button" onClick={handleSubmit} disabled={isSubmitting || !bookingData.name || !bookingData.phone || !bookingData.email || !agreedToTerms} className="flex-1 py-6 bg-gradient-to-r from-royal-gold to-amber-500 text-royal-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:brightness-110 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed">
                                                            {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Finalize Booking"}
                                                        </button>
                                                    </div>
                                                    
                                                    <a href="tel:+917597451057" className="w-full py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-2 hover:bg-white hover:text-royal-black transition-all">
                                                        📞 Call Directly: +91 75974 51057
                                                    </a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;
