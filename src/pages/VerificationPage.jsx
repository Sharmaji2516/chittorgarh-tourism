import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { CheckCircle2, XCircle, Car, Hotel, UserCheck, Coffee, UtensilsCrossed, ShieldCheck, Star, Clock, MapPin, MousePointer2 } from 'lucide-react';
import { cn } from '../utils/cn';

const VerificationPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRedeeming, setIsRedeeming] = useState(false);
    const [redeemSuccess, setRedeemSuccess] = useState(false);

    useEffect(() => {
        const fetchBooking = async () => {
            if (!db) {
                setError("Firebase is not properly configured. Please check your API keys.");
                setLoading(false);
                return;
            }
            if (!id || id === 'undefined') {
                setError("Invalid URL: No booking ID provided.");
                setLoading(false);
                return;
            }
            try {
                const docRef = doc(db, "bookings", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setBooking({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Invalid Pass: This royal token does not exist in our registry.");
                }
            } catch (err) {
                console.error("Error fetching booking:", err);
                setError("A connection error occurred. Please check your internet or firewall.");
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id]);

    const handleRedeem = async (serviceKey) => {
        setIsRedeeming(true);
        try {
            const docRef = doc(db, "bookings", id);
            await updateDoc(docRef, {
                [`redeemed_${serviceKey}`]: true,
                lastRedeemedAt: new Date().toISOString()
            });
            setBooking(prev => ({ ...prev, [`redeemed_${serviceKey}`]: true }));
            setRedeemSuccess(true);
            setTimeout(() => setRedeemSuccess(false), 3000);
        } catch (err) {
            console.error("Redemption Error:", err);
        } finally {
            setIsRedeeming(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center gap-6">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="w-16 h-16 border-t-2 border-royal-gold rounded-full" />
                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.5em] animate-pulse">Authenticating...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md space-y-8 p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl">
                    <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-red-500/20">
                        <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-serif text-white uppercase tracking-tighter font-black italic">Access Denied</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">{error}</p>
                    </div>
                    <Link to="/" className="inline-block w-full px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-royal-gold transition-all shadow-xl">Return to Citadel</Link>
                </motion.div>
            </div>
        );
    }

    const isPaid = booking.paymentStatus === 'Received';

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-4 md:p-12 relative overflow-hidden font-sans">
            {/* Animated Background Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />

            <div className="max-w-xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        className="w-20 h-20 bg-gradient-to-br from-royal-gold to-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-royal-gold/20"
                    >
                        <ShieldCheck className="w-10 h-10 text-royal-black" />
                    </motion.div>
                    <h1 className="text-3xl font-serif tracking-tighter font-black italic mb-2">Service Verification</h1>
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px w-8 bg-royal-gold/30"></div>
                        <p className="text-[10px] text-royal-gold uppercase tracking-[0.5em] font-black">Official Royal Registry</p>
                        <div className="h-px w-8 bg-royal-gold/30"></div>
                    </div>
                </div>

                {/* Main Pass Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                    className={`relative overflow-hidden rounded-[3.5rem] border ${isPaid ? 'border-royal-gold/20 bg-white/[0.03]' : 'border-red-500/20 bg-red-500/[0.02]'} backdrop-blur-3xl p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]`}
                >
                    {/* Status Badge */}
                    <div className={`absolute top-8 right-8 px-5 py-2.5 rounded-2xl flex items-center gap-3 ${isPaid ? 'bg-royal-gold/10 text-royal-gold' : 'bg-red-500/10 text-red-500'} border ${isPaid ? 'border-royal-gold/20' : 'border-red-500/20'} text-[10px] font-black uppercase tracking-widest shadow-lg`}>
                        <div className={`w-2 h-2 rounded-full ${isPaid ? 'bg-royal-gold animate-pulse' : 'bg-red-500'}`} />
                        {isPaid ? "Payment Verified" : "Payment Pending"}
                    </div>

                    <div className="space-y-12">
                        {/* Guest Header */}
                        <div>
                            <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black mb-4">Honorable Guest</p>
                            <h2 className="text-5xl font-serif font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 italic">{booking.name}</h2>
                            
                            {/* NEW OTP DISPLAY */}
                            <div className="mt-8 bg-slate-950 p-8 rounded-[2.5rem] border-2 border-royal-gold/30 shadow-2xl relative overflow-hidden text-center group">
                                <div className="absolute inset-0 bg-gradient-to-br from-royal-gold/5 to-transparent opacity-50"></div>
                                <p className="text-5xl md:text-6xl font-mono text-royal-gold font-black tracking-[0.3em] relative z-10">{booking.passCode || '------'}</p>
                                <p className="text-[10px] text-white/30 uppercase tracking-[0.5em] mt-4 relative z-10 font-black italic">Unique Royal Security Code</p>
                            </div>
                        </div>

                        {/* Services Grid */}
                        <div className="space-y-6">
                            <h4 className="text-[10px] text-royal-gold uppercase tracking-[0.5em] font-black flex items-center gap-4">
                                Authorized Packages
                                <div className="flex-1 h-px bg-royal-gold/10"></div>
                            </h4>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {(booking.includedServices || []).map(service => {
                                    const isRedeemed = booking[`redeemed_${service.toLowerCase()}`];
                                    return (
                                        <div key={service} className={cn(
                                            "group p-6 rounded-[2rem] border transition-all",
                                            isRedeemed ? "bg-white/[0.02] border-white/5 opacity-60" : "bg-white/[0.05] border-white/10 hover:border-royal-gold/30"
                                        )}>
                                            <div className="flex items-center justify-between gap-5">
                                                <div className="flex items-center gap-5">
                                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", isRedeemed ? "bg-white/10 text-white/20" : "bg-royal-gold/10 text-royal-gold")}>
                                                        <Star className="w-6 h-6" />
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-[9px] text-white/30 uppercase tracking-widest font-black mb-1">Confirmed Service</p>
                                                        <h5 className="text-lg font-bold text-white uppercase leading-tight font-serif italic">{service}</h5>
                                                    </div>
                                                </div>
                                                {isRedeemed && (
                                                    <div className="text-right">
                                                        <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-xl text-[8px] font-black uppercase tracking-widest border border-green-500/20">
                                                            Redeemed
                                                        </div>
                                                        <p className="text-[7px] text-white/20 font-black uppercase mt-2">
                                                            {new Date(booking[`redeemed_${service.toLowerCase()}_at`]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Security Notice */}
                        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
                            <p className="text-[10px] text-amber-500 font-black uppercase tracking-widest leading-relaxed text-center italic">
                                Please show this 6-digit code to your driver for verification. Do not share it with anyone else.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Info */}
                <div className="text-center mt-12 space-y-4">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black leading-relaxed">
                        Chittorgarh Tourism Administration<br />
                        <span className="text-[8px] font-black">Digital Service Department</span>
                    </p>
                    <div className="flex justify-center gap-6 text-royal-gold/40">
                        <Star className="w-4 h-4" />
                        <Star className="w-4 h-4 fill-royal-gold/20" />
                        <Star className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
                {redeemSuccess && (
                    <motion.div 
                        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4"
                    >
                        <CheckCircle2 className="w-6 h-6" />
                        <span className="text-xs font-black uppercase tracking-widest">Service Verified & Redeemed!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ServiceCard = ({ icon: Icon, label, title, isPaid, isRedeemed, onRedeem, isRedeeming }) => (
    <div className={`group p-6 rounded-[2rem] border transition-all duration-500 ${isRedeemed ? 'bg-white/5 border-white/5 grayscale opacity-50' : 'bg-white/[0.05] border-white/10 hover:border-royal-gold/30'}`}>
        <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isRedeemed ? 'bg-white/10 text-white/30' : 'bg-royal-gold/10 text-royal-gold group-hover:scale-110 shadow-xl shadow-royal-gold/5'}`}>
                    <Icon className="w-7 h-7" />
                </div>
                <div className="text-left">
                    <p className="text-[9px] text-white/30 uppercase tracking-widest font-black mb-1">{label}</p>
                    <h5 className="text-lg font-bold text-white leading-tight font-serif italic">{title}</h5>
                </div>
            </div>
            
            {isPaid && !isRedeemed ? (
                <button 
                    onClick={onRedeem}
                    disabled={isRedeeming}
                    className="h-14 w-14 rounded-full bg-white text-black flex items-center justify-center hover:bg-royal-gold transition-all active:scale-90 shadow-xl group/btn"
                >
                    <MousePointer2 className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
            ) : isRedeemed ? (
                <div className="px-5 py-2.5 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/20">
                    Redeemed
                </div>
            ) : null}
        </div>
    </div>
);

export default VerificationPage;
