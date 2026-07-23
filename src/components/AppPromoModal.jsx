import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Star, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.kushsharma.visitchittorgarh";

const AppPromoModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />

                {/* Modal Window */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-md bg-gradient-to-b from-neutral-900 via-royal-black to-black border border-royal-gold/30 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden text-center z-10"
                >
                    {/* Background Decorative Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-royal-gold/15 rounded-full blur-3xl pointer-events-none" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full border border-white/10 transition-colors"
                        aria-label="Close modal"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* App Icon */}
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-royal-gold to-amber-600 rounded-2xl p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.4)] mb-4">
                        <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                            <img src="/Fort.png" alt="Chittorgarh App" className="w-12 h-12 object-contain" />
                        </div>
                    </div>

                    {/* Title */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-royal-gold/10 border border-royal-gold/30 text-royal-gold text-[10px] font-black uppercase tracking-widest mb-2">
                        <Smartphone className="w-3.5 h-3.5" /> Official Android Guide
                    </div>

                    <h3 className="text-2xl font-black text-white font-serif tracking-wide mb-2">
                        Carry Chittorgarh <br />
                        <span className="bg-gradient-to-r from-royal-gold via-amber-300 to-amber-500 bg-clip-text text-transparent">
                            In Your Pocket!
                        </span>
                    </h3>

                    <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6">
                        Get instant offline fort maps, audio stories of Rajput valor, live navigation, and seamless local support during your trip.
                    </p>

                    {/* Key Perks List */}
                    <div className="space-y-2.5 text-left mb-6 bg-white/[0.03] border border-white/10 rounded-2xl p-3.5">
                        <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                            <div className="w-6 h-6 rounded-lg bg-royal-gold/10 border border-royal-gold/30 flex items-center justify-center shrink-0">
                                <Zap className="w-3.5 h-3.5 text-royal-gold" />
                            </div>
                            <span>Works Offline Inside Fort Premises</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                            <div className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            </div>
                            <span>Verified Local Guides & Direct Booking</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                            <div className="w-6 h-6 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            </div>
                            <span>100% Free - No Ads & Fast Access</span>
                        </div>
                    </div>

                    {/* Main CTA */}
                    <a
                        href={PLAY_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="w-full bg-gradient-to-r from-royal-gold to-amber-500 hover:from-amber-400 hover:to-royal-gold text-royal-black font-black py-3.5 px-6 rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <span>Download on Google Play</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                        onClick={onClose}
                        className="mt-3 text-xs text-gray-400 hover:text-gray-200 underline font-medium"
                    >
                        Continue browsing website
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AppPromoModal;
