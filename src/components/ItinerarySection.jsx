import React, { useState } from 'react';
import { Mail, Clock, MapPin, Calendar } from 'lucide-react';

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
        <section className="py-20 bg-stone-50 dark:bg-stone-900 transition-colors duration-300" id="itineraries">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-amber-900 dark:text-amber-500 mb-4 font-serif">
                        {itineraries.title}
                    </h2>
                    <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto font-light">
                        {itineraries.subtitle}
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {plans.map((plan) => (
                            <button
                                key={plan.id}
                                onClick={() => setActiveTab(plan.id)}
                                className={`px-8 py-3 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${activeTab === plan.id
                                    ? 'bg-amber-700 text-white shadow-lg scale-105'
                                    : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-amber-50 dark:hover:bg-stone-700 shadow-sm border border-stone-200 dark:border-stone-700'
                                    }`}
                            >
                                {plan.duration}
                            </button>
                        ))}
                    </div>

                    {/* Content Card */}
                    <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-xl overflow-hidden border border-stone-200 dark:border-stone-700 p-8 md:p-12 transition-all duration-300">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div>
                                <h3 className="text-3xl font-bold text-stone-800 dark:text-amber-500 mb-2 font-serif">
                                    {activePlan.title}
                                </h3>
                                <p className="text-stone-600 dark:text-stone-300 text-lg">
                                    {activePlan.desc}
                                </p>
                            </div>
                            <a
                                href={`mailto:?subject=${encodeURIComponent(`${itineraries.emailTitle}: ${activePlan.title}`)}&body=${encodeURIComponent(`${activePlan.title} (${activePlan.duration})\n\n${activePlan.desc}\n\n${activePlan.timeline.join('\n')}\n\nSent from Chittorgarh Tourism via Web.`)}`}
                                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                            >
                                <Mail size={20} />
                                {itineraries.emailTitle}
                            </a>
                        </div>

                        <div className="space-y-6">
                            {activePlan.timeline.map((item, index) => (
                                <div key={index} className="flex gap-4 group">
                                    <div className="flex flex-col items-center">
                                        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center text-amber-700 dark:text-amber-500 font-bold text-sm border border-amber-200 dark:border-amber-700 shrink-0">
                                            {index + 1}
                                        </div>
                                        {index !== activePlan.timeline.length - 1 && (
                                            <div className="w-0.5 h-full bg-stone-200 dark:bg-stone-700 my-2 group-hover:bg-amber-200 dark:group-hover:bg-amber-800 transition-colors"></div>
                                        )}
                                    </div>
                                    <div className="pb-8">
                                        <div className="bg-stone-50 dark:bg-stone-900/50 p-4 rounded-xl border border-stone-100 dark:border-stone-700/50 hover:border-amber-200 dark:hover:border-amber-700/50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <Clock size={18} className="text-amber-600 dark:text-amber-500 mt-1 shrink-0" />
                                                <p className="text-lg text-stone-700 dark:text-stone-200 font-medium">
                                                    {item}
                                                </p>
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
