import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { content } from '../data/content';
import { getTranslation } from '../i18n/translations/index';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  isRTL,
  isSupportedLanguage,
  getLanguageFromPath,
  getLocalizedPath,
} from '../config/languages';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Initial language detection
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      const pathLang = getLanguageFromPath(window.location.pathname);
      if (pathLang && isSupportedLanguage(pathLang)) {
        return pathLang;
      }
      const saved = localStorage.getItem('language');
      if (saved && isSupportedLanguage(saved)) {
        return saved;
      }
    }
    return DEFAULT_LANGUAGE;
  });

  const [isLangModalOpen, setIsLangModalOpen] = useState(false);

  // 2. Sync language from URL pathname changes
  useEffect(() => {
    const pathLang = getLanguageFromPath(location.pathname);
    if (pathLang && isSupportedLanguage(pathLang) && pathLang !== lang) {
      setLang(pathLang);
    } else if (!pathLang && lang !== 'en' && lang !== 'hi') {
      // If no prefix and language was an international language (fr, de, etc.), reset to en
      setLang('en');
    }
  }, [location.pathname]);

  // 3. Keep document lang, dir and localStorage in sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      document.documentElement.dir = isRTL(lang) ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  }, [lang]);

  // 4. Change language & navigate to the equivalent translated URL
  const changeLanguage = useCallback((newLang) => {
    if (!isSupportedLanguage(newLang)) return;

    setLang(newLang);

    // Apply document attributes immediately
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLang;
      document.documentElement.dir = isRTL(newLang) ? 'rtl' : 'ltr';
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLang);
    }

    // Navigate to equivalent URL in target language
    const currentPath = location.pathname;
    const targetPath = getLocalizedPath(currentPath, newLang);

    if (targetPath !== currentPath) {
      navigate(targetPath, { replace: false });
    }
  }, [location.pathname, navigate]);

  const showLangModal = () => setIsLangModalOpen(true);
  const hideLangModal = () => setIsLangModalOpen(false);

  // 5. Merge legacy content and new translations for seamless compatibility
  const currentTranslation = getTranslation(lang);
  const legacyContent = content[lang] || content.en || {};

  // Ensure full 19-item catalogue of attractions is never lost, and images are always preserved
  const baseAttractionItems = content.en?.attractions?.items || [];
  const langAttractionItems = legacyContent?.attractions?.items || [];

  const mergedAttractions = {
    ...(legacyContent.attractions || {}),
    kicker: currentTranslation.attractions?.kicker || legacyContent.attractions?.title || 'Citadel Monuments & Sacred Sites',
    heading: currentTranslation.attractions?.heading || legacyContent.attractions?.title || 'Popular Attractions',
    exploreAll: currentTranslation.attractions?.exploreAll || 'Explore All 15+ Monuments',
    viewDetails: currentTranslation.attractions?.viewDetails || 'View Details',
    inquireGuide: currentTranslation.attractions?.inquireGuide || 'Inquire Guide',
    bestTimeLabel: currentTranslation.attractions?.bestTimeLabel || 'Best Time: ',
    items: baseAttractionItems.map((baseItem) => {
      const langItem = langAttractionItems.find((li) => li.id === baseItem.id) || {};
      const transItem = (currentTranslation.attractions?.items || []).find((ti) => ti.name && (ti.id === baseItem.id || baseItem.name.includes(ti.name) || ti.name.includes(baseItem.name))) || {};
      return {
        ...baseItem,
        ...langItem,
        ...(transItem.desc ? { desc: transItem.desc } : {}),
        ...(transItem.name ? { name: transItem.name } : {}),
        ...(transItem.bestTime ? { bestTime: transItem.bestTime } : {}),
        ...(transItem.badge ? { badge: transItem.badge } : {}),
        // Crucial: image must NEVER be empty or lost
        image: baseItem.image || langItem.image || '/assets/images/Chittorgarh Fort.webp',
      };
    }),
  };

  const t = {
    ...legacyContent,
    ...currentTranslation,
    attractions: mergedAttractions,
  };

  const isCurrentRTL = isRTL(lang);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir: isCurrentRTL ? 'rtl' : 'ltr',
        isRTL: isCurrentRTL,
        changeLanguage,
        t,
        translations: currentTranslation,
        supportedLanguages: SUPPORTED_LANGUAGES,
        isLangModalOpen,
        showLangModal,
        hideLangModal,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
