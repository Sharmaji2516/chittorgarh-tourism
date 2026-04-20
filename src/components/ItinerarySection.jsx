import React, { useState } from 'react';
import { Mail, Clock, MapPin, Calendar, Ticket, Navigation } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ItinerarySection = ({ content }) => {
    const [activeTab, setActiveTab] = useState('oneDay');
    const { itineraries } = content;

    if (!itineraries) return null;

    const plans = itineraries.plans;
    const activePlan = plans.find(p => p.id === activeTab);

    const handleEmail = () => {
        const subject = `${itineraries.emailTitle}: ${activePlan.title}`;
        const body = `${activePlan.title} (${activePlan.duration})\n\n${activePlan.desc}\n\n${activePlan.timeline.join('\n')}\n\nSent from Chittorgarh Tourism via Web.`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section className="py-20 bg-heritage-charcoal dark:bg-heritage-charcoal transition-colors duration-300 relative overflow-hidden" id="itineraries">
            {/* Sandstone Texture Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/sandpaper.png")' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-heritage-gold mb-4 font-serif uppercase tracking-widest drop-shadow-lg">
                        {itineraries.title}
                    </h2>
                    <p className="text-xl text-heritage-stone/80 max-w-2xl mx-auto font-light mb-8 italic">
                        {itineraries.subtitle}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        {itineraries.bookTicket && (
                            <a
                                href={itineraries.bookTicketLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="heritage-btn-primary"
                            >
                                <Ticket className="w-5 h-5 mr-3 inline" />
                                {itineraries.bookTicket}
                            </a>
                        )}
                        {itineraries.chooseRoute && (
                            <NavLink
                                to="/how-to-reach"
                                className="px-8 py-3 bg-heritage-gold text-heritage-charcoal rounded-full font-bold uppercase tracking-widest hover:bg-heritage-gold-light transition-all transform hover:-translate-y-1 shadow-lg border border-heritage-gold/20"
                            >
                                <Navigation className="w-5 h-5 mr-3 inline" />
                                {itineraries.chooseRoute}
                            </NavLink>
                        )}
                    </div>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {plans.map((plan) => (
                            <button
                                key={plan.id}
                                onClick={() => setActiveTab(plan.id)}
                                className={`px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 border-2 ${activeTab === plan.id
                                    ? 'bg-heritage-gold text-heritage-charcoal border-heritage-gold shadow-xl scale-105'
                                    : 'bg-heritage-charcoal/50 text-heritage-gold/60 border-heritage-gold/20 hover:border-heritage-gold shadow-sm'
                                    }`}
                            >
                                {plan.duration}
                            </button>
                        ))}
                    </div>

                    {/* Content Card */}
                    <div className="parchment-card p-8 md:p-12 transition-all duration-300 ornate-border">
                        <div className="mb-10 text-center border-b border-amber-900/10 pb-8">
                            <h3 className="text-3xl font-bold text-amber-950 mb-2 font-serif uppercase tracking-wider">
                                {activePlan.title}
                            </h3>
                            <p className="text-amber-900/80 text-lg italic">
                                {activePlan.desc}
                            </p>
                        </div>

                        <div className="space-y-12">
                            {activePlan.timeline.map((item, index) => (
                                <div key={index} className="flex gap-8 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 rounded-full bg-heritage-charcoal flex items-center justify-center text-heritage-gold font-serif font-bold text-xl border-2 border-heritage-gold shadow-lg shrink-0">
                                            {index + 1}
                                        </div>
                                        {index !== activePlan.timeline.length - 1 && (
                                            <div className="w-1 h-full bg-heritage-gold/20 my-2 group-hover:bg-heritage-gold/40 transition-colors rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="pb-12 w-full">
                                        <div className="bg-amber-900/5 p-8 rounded-2xl border border-amber-900/10 hover:border-heritage-charcoal/30 transition-all hover:shadow-xl group-hover:bg-amber-900/[0.08]">
                                            <div className="flex items-center gap-3 mb-6">
                                                <Clock size={20} className="text-heritage-charcoal" />
                                                <span className="text-base font-bold uppercase tracking-widest text-heritage-charcoal">
                                                    {item.time}
                                                </span>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-10">
                                                <div>
                                                    <h4 className="text-xs font-bold text-amber-900/50 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                                        <MapPin size={14} />
                                                        {itineraries.whereToVisit}
                                                    </h4>
                                                    <p className="text-xl text-amber-950 font-serif font-bold leading-relaxed">
                                                        {item.visit}
                                                    </p>
                                                </div>
                                                <div className="border-t md:border-t-0 md:border-l border-amber-900/10 pt-6 md:pt-0 md:pl-10">
                                                    <h4 className="text-xs font-bold text-amber-900/50 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                                        <Calendar size={14} />
                                                        {itineraries.recommendedStay}
                                                    </h4>
                                                    <p className="text-amber-900 text-base leading-relaxed italic">
                                                        {item.stay}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ItinerarySection;
