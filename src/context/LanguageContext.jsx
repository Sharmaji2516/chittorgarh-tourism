import React, { createContext, useState, useContext } from 'react';
import { content } from '../data/content';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en'); // 'en' or 'hi'
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);

    const changeLanguage = (newLang) => {
        if (content[newLang]) {
            setLang(newLang);
        }
    };

    const showLangModal = () => setIsLangModalOpen(true);
    const hideLangModal = () => setIsLangModalOpen(false);

    const t = content[lang];

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t, isLangModalOpen, showLangModal, hideLangModal }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
