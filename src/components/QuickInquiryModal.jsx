import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, CheckCircle2, Loader2, Star, ShieldCheck, Mail } from 'lucide-react';
import { saveBookingToFirebase } from '../lib/firebase';

const QuickInquiryModal = ({ isOpen, onClose, entityName, category }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        startDate: '',
        endDate: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const finalData = {
                ...formData,
                pillarTitle: entityName,
                category: category || 'On-Demand',
                status: 'submitted',
                createdAt: new Date().toISOString()
            };

            await saveBookingToFirebase(finalData);

            // WhatsApp Message
            const phoneNumber = "917597901057";
            const message = `*👑 On-Demand Inquiry*%0A%0A` +
                `*🛡️ Service:* ${entityName}%0A` +
                `*📅 From:* ${formData.startDate}%0A` +
                `*📅 To:* ${formData.endDate}%0A%0A` +
                `*-- Guest Details --*%0A` +
                `*👤 Name:* ${formData.name}%0A` +
                `*📱 Phone:* ${formData.phone}%0A%0A` +
                `I am interested in this service. Please contact me with availability and pricing.`;

            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
            setSubmitted(true);
        } catch (error) {
            console.error("Inquiry Error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-8 overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-royal-black/98 backdrop-blur-2xl"
                />
                
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 50 }}
                    className="relative w-full max-w-lg bg-heritage-charcoal border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                        <div>
                            <h3 className="text-xl md:text-2xl font-serif text-white">{submitted ? "Inquiry Received" : "Secure Best Price"}</h3>
                            <p className="text-[9px] text-royal-gold uppercase tracking-[0.4em] mt-1 font-black">{entityName}</p>
                        </div>
                        <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/30 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-8 md:p-10">
                        {submitted ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center text-center space-y-6"
                            >
                                <div className="w-20 h-20 bg-royal-gold rounded-full flex items-center justify-center shadow-2xl shadow-royal-gold/20">
                                    <CheckCircle2 className="w-10 h-10 text-royal-black" />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-2xl font-serif text-white">Shukriya!</h4>
                                    <p className="text-royal-gold/80 text-[11px] font-black uppercase tracking-[0.2em] leading-relaxed">
                                        The owner will contact you soon to confirm availability and provide the best pricing.
                                    </p>
                                </div>
                                <button onClick={onClose} className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white hover:text-black transition-all">
                                    Done
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-royal-gold uppercase tracking-widest font-black ml-2">Check-In</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                                            <input required type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-xs focus:outline-none focus:border-royal-gold" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] text-royal-gold uppercase tracking-widest font-black ml-2">Check-Out</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold" />
                                            <input required type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-xs focus:outline-none focus:border-royal-gold" />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/50 group-focus-within:text-royal-gold transition-colors" />
                                    <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-royal-gold" />
                                </div>

                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-royal-gold/50 group-focus-within:text-royal-gold transition-colors" />
                                    <input required type="tel" placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-royal-gold" />
                                </div>

                                <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-gradient-to-r from-royal-gold to-amber-500 text-royal-black font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:brightness-110 shadow-2xl transition-all">
                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Send Inquiry via WhatsApp"}
                                </button>
                                
                                <div className="flex items-center justify-center gap-3 text-royal-gold/40">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Verified Royal Concierge Service</span>
                                </div>

                                {/* WhatsApp QR Code */}
                                <div className="border-t border-white/5 pt-6 mt-6 text-center">
                                    <p className="text-[10px] text-royal-gold uppercase tracking-widest font-black mb-3">Or Scan to Chat Instantly</p>
                                    <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border border-royal-gold/20 shadow-lg">
                                        <img src="/assets/images/whatsapp_qr.jpg" alt="WhatsApp QR Code" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default QuickInquiryModal;
