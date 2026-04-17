import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, User, CheckCircle2, ArrowRight, Loader2, Star, ShieldCheck, MapPin, Car, Hotel, UserCheck } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { saveBookingToFirebase } from '../lib/firebase';

const PRICE_LIST = {
    transport: {
        'Luxury Sedan': 1500,
        'Royal SUV': 2500,
        'Mini Bus': 5000,
        'Not Needed': 0
    },
    hotel: {
        'Heritage Palace': 6000,
        'Boutique Hotel': 3500,
        'Eco Resort': 2500,
            'Not Needed': 0
    },
    guide: {
        'History Scholar': 1200,
        'Photography Expert': 2000,
        'Storyteller': 1000,
        'Not Needed': 0
    }
};

const BookingModal = ({ isOpen, onClose, pillarTitle }) => {
    const { bookingData, updateBooking } = useBooking();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const calculateTotal = () => {
        const tPrice = PRICE_LIST.transport[bookingData.transport] || 0;
        const hPrice = PRICE_LIST.hotel[bookingData.hotel] || 0;
        const gPrice = PRICE_LIST.guide[bookingData.guide] || 0;
        return tPrice + hPrice + gPrice;
    };

    const totalAmount = calculateTotal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const finalData = {
            ...bookingData,
            pillarTitle: pillarTitle,
            totalAmount: totalAmount,
            status: 'submitted'
        };

        await saveBookingToFirebase(finalData);

        const phoneNumber = "917597901057";
        const message = `*👑 Royal Booking Request*%0A%0A` +
            `*🛡️ Package:* ${pillarTitle}%0A` +
            `*📅 Date:* ${bookingData.date}%0A` +
            `*👥 Travelers:* ${bookingData.travelers}%0A%0A` +
            `*-- Custom Choices --*%0A` +
            `*🚗 Transport:* ${bookingData.transport} (₹${PRICE_LIST.transport[bookingData.transport]})%0A` +
            `*🏨 Hotel:* ${bookingData.hotel} (₹${PRICE_LIST.hotel[bookingData.hotel]})%0A` +
            `*🚩 Guide:* ${bookingData.guide} (₹${PRICE_LIST.guide[bookingData.guide]})%0A%0A` +
            `*💰 Total Estimate: ₹${totalAmount}*%0A%0A` +
            `*-- Contact --*%0A` +
            `*👤 Name:* ${bookingData.name}%0A` +
            `*📱 Phone:* ${bookingData.phone}%0A%0A` +
            `I am ready to confirm this booking.`;

        setTimeout(() => {
            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            setIsSubmitting(false);
            onClose();
            setStep(1);
        }, 1500);
    };

    const progress = step === 1 ? '33%' : step === 2 ? '66%' : '100%';

    const PreferenceCard = ({ type, label, icon: Icon, value, options }) => (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                </p>
                <span className="text-[10px] text-white/30 font-medium italic">Select one</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {Object.keys(options).map(opt => (
                    <button 
                        key={opt} 
                        type="button" 
                        onClick={() => updateBooking({ [type]: opt })} 
                        className={`group relative py-4 px-4 rounded-2xl border transition-all duration-300 flex flex-col items-start ${
                            value === opt 
                            ? 'bg-royal-gold/15 border-royal-gold shadow-[0_0_25px_-5px_rgba(212,175,55,0.3)]' 
                            : 'bg-white/[0.03] border-white/5 hover:border-royal-gold/30 hover:bg-white/[0.06]'
                        }`}
                    >
                        <span className={`text-[11px] font-bold uppercase tracking-widest mb-1 transition-colors ${value === opt ? 'text-white' : 'text-white/60'}`}>{opt}</span>
                        <span className={`text-[10px] font-serif ${value === opt ? 'text-royal-gold' : 'text-white/30'}`}>₹{options[opt]}</span>
                        {value === opt && (
                            <motion.div layoutId={`${type}-active`} className="absolute top-3 right-3">
                                <CheckCircle2 className="w-4 h-4 text-royal-gold" />
                            </motion.div>
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
                    <form onSubmit={handleSubmit} className="flex-1 flex flex-col h-full overflow-hidden">
                        {/* Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 bg-white/[0.02] flex justify-between items-center relative">
                            <div>
                                <h3 className="text-lg md:text-2xl font-serif text-white">Experience Mewar</h3>
                                <p className="text-[8px] md:text-[9px] text-royal-gold uppercase tracking-[0.5em] mt-1 font-black">Stage {step} of 3</p>
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
                                {step === 1 && (
                                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="text-center md:text-left mb-4">
                                            <p className="text-white/40 text-xs font-medium italic underline underline-offset-8 decoration-royal-gold/20">When shall we prepare for your arrival?</p>
                                        </div>
                                        <div className="space-y-8">
                                            <div className="relative group">
                                                <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-royal-gold group-focus-within:scale-110 transition-transform" />
                                                <input required type="date" value={bookingData.date} onChange={(e) => updateBooking({ date: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-[1.5rem] py-6 pl-16 pr-6 text-white text-lg focus:outline-none focus:border-royal-gold focus:bg-white/5 transition-all" />
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.3em] px-2">Guests in your party</p>
                                                <div className="grid grid-cols-5 gap-3">
                                                    {[1,2,3,4,5].map(n => (
                                                        <button key={n} type="button" onClick={() => updateBooking({ travelers: n })} className={`py-5 rounded-2xl font-bold border transition-all duration-300 ${Number(bookingData.travelers) === n ? 'bg-royal-gold border-royal-gold text-royal-black shadow-xl scale-110' : 'bg-white/[0.03] border-white/10 text-white/50 hover:border-royal-gold/40'}`}>{n}</button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" onClick={handleNext} disabled={!bookingData.date} className="w-full py-6 bg-royal-gold text-royal-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:brightness-110 active:scale-[0.98] transition-all shadow-2xl shadow-royal-gold/20">Continue Journey</button>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10 pb-4">
                                        <PreferenceCard type="transport" label="The Royal Chauffeur" icon={Car} value={bookingData.transport} options={PRICE_LIST.transport} />
                                        <PreferenceCard type="hotel" label="Grand Accommodations" icon={Hotel} value={bookingData.hotel} options={PRICE_LIST.hotel} />
                                        <PreferenceCard type="guide" label="Heritage Historian" icon={UserCheck} value={bookingData.guide} options={PRICE_LIST.guide} />
                                        
                                        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-royal-gold/20 to-transparent border border-royal-gold/20 flex justify-between items-center group">
                                            <div className="text-left font-serif"><p className="text-[10px] text-royal-gold uppercase tracking-[0.2em] font-black group-hover:tracking-[0.3em] transition-all duration-500">Total Estimate</p><p className="text-3xl text-white">₹{totalAmount}</p></div>
                                            <button type="button" onClick={handleNext} className="h-14 w-14 rounded-full bg-royal-gold text-royal-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><ArrowRight className="w-6 h-6" /></button>
                                        </div>
                                        <div className="flex justify-center"><button type="button" onClick={handleBack} className="text-[10px] text-white/30 hover:text-royal-gold uppercase font-black tracking-widest transition-colors mb-4">Go Back</button></div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
                                        <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 space-y-5">
                                            <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em] mb-4 text-center">Your Royal Summary</p>
                                            <div className="flex justify-between items-center"><span className="text-[9px] text-white/30 uppercase tracking-widest">Transport</span><span className="text-xs text-white font-bold">{bookingData.transport}</span></div>
                                            <div className="flex justify-between items-center"><span className="text-[9px] text-white/30 uppercase tracking-widest">Stays</span><span className="text-xs text-white font-bold">{bookingData.hotel}</span></div>
                                            <div className="flex justify-between items-center"><span className="text-[9px] text-white/30 uppercase tracking-widest">Guide</span><span className="text-xs text-white font-bold">{bookingData.guide}</span></div>
                                            <div className="pt-6 border-t border-white/5 flex justify-between items-center"><span className="text-xs font-black text-royal-gold uppercase tracking-[0.3em]">Pay on Arrival</span><span className="text-4xl font-serif text-white">₹{totalAmount}</span></div>
                                        </div>

                                        <div className="space-y-4">
                                            <input required type="text" placeholder="Full Name" value={bookingData.name} onChange={(e) => updateBooking({ name: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-8 text-white text-lg focus:outline-none focus:border-royal-gold" />
                                            <input required type="tel" placeholder="WhatsApp Number" value={bookingData.phone} onChange={(e) => updateBooking({ phone: e.target.value })} className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 px-8 text-white text-lg focus:outline-none focus:border-royal-gold" />
                                        </div>

                                        <div className="flex gap-4">
                                            <button type="button" onClick={handleBack} className="w-20 rounded-2xl bg-white/5 text-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"><X className="w-5 h-5" /></button>
                                            <button type="submit" disabled={isSubmitting || !bookingData.name || !bookingData.phone} className="flex-1 py-6 bg-gradient-to-r from-royal-gold to-amber-500 text-royal-black font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:brightness-110 shadow-2xl">
                                                {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Finalize Booking"}
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BookingModal;

