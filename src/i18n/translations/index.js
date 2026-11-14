/**
 * Master Index of Translations for Visit Chittorgarh
 * Supported Languages (9): en, hi, fr, de, it, ja, es, he, ar.
 */

import { en } from './en.js';
import { hi } from './hi.js';
import { fr } from './fr.js';
import { de } from './de.js';
import { it } from './it.js';
import { ja } from './ja.js';
import { es } from './es.js';
import { he } from './he.js';
import { ar } from './ar.js';

export const translations = {
  en,
  hi,
  fr,
  de,
  it,
  ja,
  es,
  he,
  ar,
};

export const getTranslation = (langCode = 'en') => {
  return translations[langCode] || translations.en;
};

export { en, hi, fr, de, it, ja, es, he, ar };

