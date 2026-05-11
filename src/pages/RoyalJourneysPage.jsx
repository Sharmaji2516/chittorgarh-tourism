import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, ArrowRight, Car, Hotel, Map, History, ShieldCheck, HeartHandshake, X } from 'lucide-react';
import Section from '../components/Section';
import BookingModal from '../components/BookingModal';
import QuickInquiryModal from '../components/QuickInquiryModal';
import { NavLink } from 'react-router-dom';

const RoyalJourneysPage = ({ t }) => {
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [isInquiryOpen, setIsInquiryOpen] = useState(false);
    const [activeEntity, setActiveEntity] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    const [activeTab, setActiveTab] = useState('packages'); 
    const [showTransportSelection, setShowTransportSelection] = useState(false);

    const openFullBooking = (title) => {
        setActiveEntity(title);
        setIsBookingOpen(true);
    };

    const openQuickInquiry = (name, cat) => {
        setActiveEntity(name);
        setActiveCategory(cat);
        setIsInquiryOpen(true);
        setShowTransportSelection(false);
    };

    const packages = t.packages.items;
    const transportOptions = [
        { id: 'sedan', name: t.booking.options.luxurySedan, icon: Car },
        { id: 'suv', name: t.booking.options.royalSUV, icon: Car },
        { id: 'minibus', name: t.booking.options.miniBus, icon: Car },
        { id: 'tempo', name: t.booking.options.tempoTraveller, icon: Car },
        { id: 'auto', name: t.booking.options.autoRickshaw, icon: Car }
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 animate-pulse" />
            
            {/* Header Section */}
            <div className="pt-32 pb-16 text-center px-4 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-royal-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-white font-black italic mb-6 tracking-tighter uppercase drop-shadow-2xl">
                        {t.nav.royalJourneys}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-400 font-light italic text-lg leading-relaxed">
                        "Your portal to the past. Whether you need a complete planned expedition or a quick on-demand service, we ensure royal standards."
                    </p>
                </motion.div>
            </div>

            {/* Path Selection Tabs */}
            <div className="max-w-xl mx-auto px-4 mb-16 relative z-10">
                <div className="flex bg-white/5 backdrop-blur-xl p-2 rounded-[2rem] border border-white/10 shadow-2xl">
                    <button 
                        onClick={() => setActiveTab('packages')}
                        className={`flex-1 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'packages' ? 'bg-royal-gold text-royal-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        Royal Expeditions
                    </button>
                    <button 
                        onClick={() => setActiveTab('services')}
                        className={`flex-1 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'services' ? 'bg-royal-gold text-royal-black shadow-lg' : 'text-white/40 hover:text-white'}`}
                    >
                        On-Demand Services
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'packages' ? (
                    <motion.div 
                        key="packages"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="px-4"
                    >
                        <Section id="expeditions" title={t.packages.title} subtitle={t.packages.subtitle} className="bg-transparent !pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                                {packages.map((pkg, idx) => (
                                    <motion.div 
                                        key={pkg.id}
                                        whileHover={{ y: -10 }}
                                        className="group relative bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl overflow-hidden"
                                    >
                                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-royal-gold/5 blur-[80px] rounded-full group-hover:bg-royal-gold/10 transition-colors"></div>
                                        
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="px-5 py-2 bg-royal-gold/10 rounded-full border border-royal-gold/20 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                                {pkg.duration} Complete Package
                                            </div>
                                        </div>

                                        <h3 className="text-4xl font-serif text-white font-black italic mb-6 group-hover:text-royal-gold transition-colors tracking-tight">{pkg.name}</h3>
                                        <p className="text-gray-400 mb-10 leading-relaxed italic">"{pkg.desc}"</p>

                                        <div className="space-y-4 mb-12">
                                            {pkg.includes.map((inc, i) => (
                                                <div key={i} className="flex items-center gap-4 text-white/70">
                                                    <ShieldCheck className="w-4 h-4 text-royal-gold" />
                                                    <span className="text-xs font-bold uppercase tracking-wider">{inc}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button 
                                            onClick={() => openFullBooking(`${pkg.name} Package`)}
                                            className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-royal-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
                                        >
                                            Inquire for Expedition
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        </Section>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="services"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="px-4"
                    >
                        <Section id="individual" title="Individual Services" subtitle="Directly book verified local services" className="bg-transparent !pt-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {/* Stay Service */}
                                <NavLink to="/stays" className="group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Hotel className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">Grand Stays</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">Verified heritage hotels and resorts with exclusive concierge rates.</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        Browse Stays <ArrowRight className="w-4 h-4" />
                                    </div>
                                </NavLink>

                                {/* Transport Service */}
                                <div onClick={() => setShowTransportSelection(true)} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Car className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">Royal Transport</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">Professional chauffeurs with premium SUVs, Sedans and local Autos.</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        Book Transport <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Guide Service */}
                                <div onClick={() => openQuickInquiry('Certified Heritage Guide', 'Guide')} className="cursor-pointer group bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[3rem] border border-white/10 hover:border-royal-gold transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-royal-gold/10 transition-colors" />
                                    <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center text-royal-gold mb-6 group-hover:scale-110 transition-transform">
                                        <Map className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-serif text-white font-black italic mb-3 tracking-tight">Expert Guides</h3>
                                    <p className="text-white/60 text-sm mb-8 leading-relaxed">Certified historians and storytellers to walk you through the legend of the Fort.</p>
                                    <div className="mt-auto flex items-center gap-2 text-royal-gold text-[10px] font-black uppercase tracking-widest">
                                        Find a Guide <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            {/* Trust Banner */}
                            <div className="max-w-4xl mx-auto mt-20 bg-royal-gold/5 p-10 rounded-[3rem] border border-royal-gold/10 text-center">
                                <div className="flex justify-center mb-6">
                                    <Zap className="w-12 h-12 text-royal-gold" />
                                </div>
                                <h3 className="text-3xl font-serif text-white mb-4">The Concierge Advantage</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
                                    {t.common.conciergeBenefits.map((b, i) => (
                                        <div key={i} className="space-y-2">
                                            <ShieldCheck className="w-5 h-5 text-royal-gold mx-auto" />
                                            <p className="text-[9px] text-white/50 font-black uppercase tracking-widest leading-relaxed">{b}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Section>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transport Selection Modal-like Overlay */}
            <AnimatePresence>
                {showTransportSelection && (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-royal-black/95 backdrop-blur-xl"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            className="bg-heritage-charcoal w-full max-w-2xl rounded-[3rem] border border-white/10 p-10 shadow-2xl relative"
                        >
                            <button onClick={() => setShowTransportSelection(false)} className="absolute top-8 right-8 text-white/30 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <h2 className="text-4xl font-serif text-white mb-2">Select Vehicle Type</h2>
                            <p className="text-royal-gold text-[10px] font-black uppercase tracking-widest mb-10">Real-time availability check follows</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {transportOptions.map(opt => (
                                    <button 
                                        key={opt.id} 
                                        onClick={() => openQuickInquiry(`Royal ${opt.name}`, 'Transport')}
                                        className="group bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-royal-gold transition-all flex items-center gap-6 text-left"
                                    >
                                        <div className="w-14 h-14 bg-royal-gold/10 rounded-xl flex items-center justify-center text-royal-gold group-hover:scale-110 transition-transform">
                                            <opt.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-serif text-xl">{opt.name}</h4>
                                            <span className="text-[9px] text-royal-gold uppercase tracking-widest font-black">Book with Best Price</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <BookingModal 
                isOpen={isBookingOpen}
                onClose={() => setIsBookingOpen(false)}
                pillarTitle={activeEntity}
            />

            <QuickInquiryModal 
                isOpen={isInquiryOpen}
                onClose={() => setIsInquiryOpen(false)}
                entityName={activeEntity}
                category={activeCategory}
            />

            <div className="pb-20 text-center">
                <p className="text-royal-gold/30 text-[10px] uppercase tracking-[0.4em] font-serif italic">
                    * {t.common.disclaimer}
                </p>
            </div>
        </div>
    );
};

export default RoyalJourneysPage;
