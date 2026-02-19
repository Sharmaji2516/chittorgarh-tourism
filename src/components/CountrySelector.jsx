import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CountrySelector = () => {
    const { changeLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [detectedCountry, setDetectedCountry] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');

    useEffect(() => {
        detectCountry();
        setIsOpen(true);
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
        changeLanguage(selectedLanguage);
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-royal-black border border-royal-gold p-8 rounded-lg max-w-md w-full shadow-2xl relative">
                <div className="text-center mb-6">
                    <div className="text-4xl mb-4">🌍</div>
                    <h2 className="text-2xl font-serif text-royal-gold mb-2">Welcome to Chittorgarh</h2>
                    <p className="text-gray-400 text-sm">
                        We detected you are visiting from <span className="text-royal-white font-bold">{detectedCountry}</span>.
                    </p>
                </div>

                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-royal-gold/70 mb-2">Select Your Language</label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full bg-charcoal text-royal-white border border-royal-gold/30 rounded px-4 py-2 focus:border-royal-gold outline-none"
                        >
                            <option value="en">English (International)</option>
                            <option value="hi">Hindi (India)</option>
                            <option value="es">Español (Spain)</option>
                            <option value="fr">Français (France)</option>
                            <option value="zh">中文 (China)</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-royal-gold text-royal-black font-bold py-3 rounded hover:bg-royal-gold-light transition-colors uppercase tracking-widest text-sm"
                >
                    Explore Website
                </button>
            </div>
        </div>
    );
};

export default CountrySelector;
