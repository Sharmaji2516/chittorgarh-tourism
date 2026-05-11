import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Crown, Globe, Check } from 'lucide-react';

const CountrySelector = () => {
    const { changeLanguage, isLangModalOpen, showLangModal, hideLangModal } = useLanguage();
    const [detectedCountry, setDetectedCountry] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        detectCountry();
        const savedLang = localStorage.getItem('userLang');
        const welcomeSeen = localStorage.getItem('welcomeSeen_v2');
        if (!savedLang || !welcomeSeen) {
            showLangModal();
        }
    }, []);

    const detectCountry = () => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let country = 'Unknown';
        let lang = 'en';

        // Simple mapping based on timezone regions
        if (timeZone.includes('Europe/Madrid') || timeZone.includes('Spain')) {
            country = 'Spain';
            lang = 'es';
        } else if (timeZone.includes('Asia/Calcutta') || timeZone.includes('India')) {
            country = 'India';
            lang = 'hi';
        } else if (timeZone.includes('America') || timeZone.includes('Europe/London')) {
            country = 'USA/UK';
            lang = 'en';
        } else {
            country = 'Global';
            lang = 'en';
        }

        setDetectedCountry(country);
        setSelectedCountry(country);
        setSelectedLanguage(lang);
    };

    const handleSave = () => {
        localStorage.setItem('userCountry', selectedCountry);
        localStorage.setItem('userLang', selectedLanguage);
        localStorage.setItem('welcomeSeen_v2', 'true');
        changeLanguage(selectedLanguage);
        hideLangModal();
    };

    if (!isLangModalOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in">
            <div className="bg-heritage-charcoal/90 border border-heritage-gold/30 p-6 md:p-10 rounded-2xl max-w-md w-full shadow-[0_0_50px_rgba(212,175,55,0.15)] relative max-h-[90vh] overflow-y-auto custom-scrollbar transition-all duration-500 hover:border-heritage-gold/50">
                {/* Close Button */}
                <button
                    onClick={hideLangModal}
                    className="absolute top-5 right-5 text-heritage-gold/50 hover:text-heritage-gold transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                
                <div className="text-center mb-8 pt-2">
                    <div className="relative inline-block mb-4">
                        <Crown className="w-12 h-12 text-heritage-gold mx-auto animate-pulse-slow" />
                        <div className="absolute inset-0 bg-heritage-gold/20 blur-xl rounded-full -z-10"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-heritage-gold mb-2 tracking-wide font-bold">Welcome to Chittorgarh</h2>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-heritage-gold/50 to-transparent mx-auto mb-6"></div>
                    <p className="text-royal-white italic font-light text-base md:text-lg mb-6 leading-relaxed px-2">
                        "Where history is carved in stone, <br className="hidden md:block" />
                        and valor is whispered by the wind. <br className="hidden md:block" />
                        Step into the timeless heritage of legends."
                    </p>
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-[11px] uppercase tracking-widest mt-4">
                        <Globe className="w-4 h-4 text-heritage-gold/70" />
                        <span>Visiting from <span className="text-heritage-gold font-bold">{detectedCountry}</span></span>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] text-heritage-gold/60 mb-4 text-center italic font-medium">Choose Your Preferred Language</label>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { val: 'en', label: 'English', sub: 'International' },
                                { val: 'hi', label: 'हिंदी', sub: 'India' }
                            ].map((lang) => (
                                <button
                                    key={lang.val}
                                    onClick={() => setSelectedLanguage(lang.val)}
                                    className={`flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all duration-300 ${selectedLanguage === lang.val
                                        ? 'bg-heritage-gold/10 border-heritage-gold text-heritage-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                                        : 'bg-heritage-charcoal-light/50 border-white/5 text-gray-400 hover:border-heritage-gold/30 hover:text-white'
                                        }`}
                                >
                                    <div className="flex flex-col items-start">
                                        <span className="font-semibold text-sm md:text-base">{lang.label}</span>
                                        <span className="text-[10px] opacity-60 uppercase mt-0.5">{lang.sub}</span>
                                    </div>
                                    {selectedLanguage === lang.val && (
                                        <Check className="w-5 h-5 text-heritage-gold" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-heritage-gold text-heritage-charcoal font-bold py-4 rounded-xl shadow-lg shadow-heritage-gold/20 hover:bg-heritage-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 uppercase tracking-[0.2em] text-xs relative overflow-hidden group"
                >
                    <span className="relative z-10">Begin Your Journey</span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </button>
            </div>
        </div>
    );
};

export default CountrySelector;

