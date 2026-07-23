import React from 'react';
import { Smartphone, Download, Star, ShieldCheck, Zap } from 'lucide-react';

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.kushsharma.visitchittorgarh";

const AppDownloadBanner = () => {
    return (
        <section className="py-16 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-black via-royal-black to-black">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-royal-gold/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-gradient-to-r from-white/[0.04] to-white/[0.01] border border-royal-gold/20 rounded-3xl p-8 md:p-12 backdrop-blur-xl flex flex-col lg:flex-row items-center justify-between gap-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    
                    {/* Left Content */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-gold/10 border border-royal-gold/30 text-royal-gold text-xs font-bold uppercase tracking-widest">
                            <Smartphone className="w-4 h-4" /> Official Android App
                        </div>

                        <h2 className="text-3xl md:text-5xl font-black text-white font-serif tracking-wide leading-tight">
                            Explore Chittorgarh <br />
                            <span className="bg-gradient-to-r from-royal-gold via-amber-300 to-amber-500 bg-clip-text text-transparent">
                                Right From Your Phone
                            </span>
                        </h2>

                        <p className="text-gray-300 text-sm md:text-base max-w-xl leading-relaxed">
                            Download the official Visit Chittorgarh Android app for instant audio guides, offline fort maps, local itinerary planning, and direct booking support.
                        </p>

                        {/* Features Badges */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-gray-300">
                            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                <Zap className="w-3.5 h-3.5 text-royal-gold" /> Fast & Offline Maps
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Tour Guides
                            </span>
                            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Top Rated Experience
                            </span>
                        </div>

                        {/* CTA Buttons */}
                        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <a
                                href={PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-royal-gold to-amber-500 hover:from-amber-400 hover:to-royal-gold text-royal-black font-black px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <svg className="w-7 h-7 text-royal-black" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.372 2.372 0 0 1-.61-1.615V3.429c0-.623.23-1.201.609-1.615zm11.604 11.608l2.677 2.677-12.019 6.94 9.342-9.617zm0-2.844L5.871 1.054l12.019 6.94-2.677 2.584zm1.422 1.422l3.493 2.017c.87.502.87 1.316 0 1.818l-3.493 2.017-2.617-2.617 2.617-3.235z"/>
                                </svg>
                                <div className="text-left leading-tight">
                                    <div className="text-[10px] uppercase font-bold tracking-wider text-royal-black/80">GET IT ON</div>
                                    <div className="text-base font-black text-royal-black">Google Play</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Mockup Representation */}
                    <div className="relative flex justify-center items-center">
                        <div className="w-56 md:w-64 h-[420px] bg-gradient-to-b from-neutral-900 to-black rounded-[40px] border-4 border-royal-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] p-4 flex flex-col justify-between overflow-hidden relative group">
                            {/* Screen Header */}
                            <div className="bg-royal-gold/20 backdrop-blur-md rounded-2xl p-4 text-center border border-royal-gold/30">
                                <div className="text-xs font-bold text-royal-gold uppercase tracking-wider">Visit Chittorgarh</div>
                                <div className="text-[10px] text-gray-300 mt-1">Official Mobile Guide</div>
                            </div>

                            {/* Screen Center Icon */}
                            <div className="flex flex-col items-center justify-center gap-3 my-auto">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-royal-gold to-amber-600 p-0.5 shadow-lg">
                                    <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                                        <img src="/Fort.png" alt="Visit Chittorgarh App" className="w-12 h-12 object-contain" />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-bold text-white">Chittorgarh Tourism</div>
                                    <div className="text-[11px] text-emerald-400 font-medium">Free Download on Play Store</div>
                                </div>
                            </div>

                            {/* Download Button Inside Screen */}
                            <a
                                href={PLAY_STORE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-royal-gold text-royal-black text-center py-2.5 rounded-xl font-bold text-xs hover:bg-amber-400 transition-colors"
                            >
                                Install App
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AppDownloadBanner;
