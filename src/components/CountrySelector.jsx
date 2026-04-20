import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

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
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-royal-black/95 md:bg-black/80 md:backdrop-blur-sm p-4">
            <div className="bg-royal-black border border-royal-gold p-6 md:p-8 rounded-lg max-w-md w-full shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
                {/* Close Button */}
                <button
                    onClick={hideLangModal}
                    className="absolute top-4 right-4 text-royal-gold/50 hover:text-royal-gold transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="text-center mb-6 pt-4 md:pt-0">
                    <div className="text-4xl md:text-5xl mb-4 md:mb-6 animate-bounce">🏰</div>
                    <h2 className="text-2xl md:text-3xl font-serif text-royal-gold mb-2 md:mb-3 tracking-wide">Welcome to Chittorgarh</h2>
                    <div className="h-px w-20 md:w-24 bg-royal-gold/30 mx-auto mb-4"></div>
                    <p className="text-royal-white italic font-light text-base md:text-lg mb-4 leading-relaxed px-2">
                        "Where history is carved in stone, <br className="hidden md:block" />
                        and valor is whispered by the wind. <br className="hidden md:block" />
                        Step into the timeless heritage of legends."
                    </p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest mt-4 md:mt-6">
                        Visiting from <span className="text-royal-gold font-bold">{detectedCountry}</span>
                    </p>
                </div>

                <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                    <div>
                        <label className="block text-[10px] uppercase tracking-[0.2em] text-royal-gold/60 mb-3 text-center italic">Choose Your Preferred Language</label>
                        <div className="grid grid-cols-1 gap-2">
                            {[
                                { val: 'en', label: 'English', sub: 'International' },
                                { val: 'hi', label: 'हिंदी', sub: 'India' }
                            ].map((lang) => (
                                <button
                                    key={lang.val}
                                    onClick={() => setSelectedLanguage(lang.val)}
                                    className={`flex items-center justify-between px-4 py-2.5 md:py-3 rounded border transition-all duration-300 ${selectedLanguage === lang.val
                                        ? 'bg-royal-gold/10 border-royal-gold text-royal-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]'
                                        : 'bg-zinc-900/50 border-royal-gold/10 text-gray-400 hover:border-royal-gold/30'
                                        }`}
                                >
                                    <span className="font-medium text-sm md:text-base">{lang.label}</span>
                                    <span className="text-[9px] md:text-[10px] opacity-60 uppercase">{lang.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-royal-gold text-royal-black font-bold py-3.5 md:py-4 rounded shadow-lg shadow-royal-gold/20 hover:bg-royal-gold-light hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 uppercase tracking-[0.2em] text-[10px] md:text-xs"
                >
                    Begin Your Journey
                </button>
            </div>
        </div>
    );
};

export default CountrySelector;
