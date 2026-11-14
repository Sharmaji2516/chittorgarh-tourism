/**
 * Centralized Language Configuration for Visit Chittorgarh
 * Supported: English (en), Hindi (hi), French (fr), German (de), Italian (it),
 * Japanese (ja), Spanish (es), Hebrew (he), Arabic (ar).
 */

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'fr', name: 'French', nativeName: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', dir: 'ltr', flag: '🇮🇹' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', dir: 'ltr', flag: '🇯🇵' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', dir: 'rtl', flag: '🇮🇱' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl', flag: '🇸🇦' },
];

export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);
export const PREFIX_LANGUAGES = ['fr', 'de', 'it', 'ja', 'es', 'he', 'ar', 'hi'];
export const RTL_LANGUAGES = ['he', 'ar'];
export const DEFAULT_LANGUAGE = 'en';

export const isRTL = (langCode) => RTL_LANGUAGES.includes(langCode);

export const isSupportedLanguage = (code) => LANGUAGE_CODES.includes(code);

/**
 * Extracts language code from a URL pathname.
 * E.g. "/fr/attractions" -> "fr"
 * E.g. "/attractions" -> null (or default)
 */
export const getLanguageFromPath = (pathname = '/') => {
  if (!pathname || pathname === '/') return null;
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && PREFIX_LANGUAGES.includes(segments[0])) {
    return segments[0];
  }
  return null;
};

/**
 * Strips the language prefix from a pathname.
 * E.g. "/fr/attractions" -> "/attractions"
 * E.g. "/fr" -> "/"
 * E.g. "/attractions" -> "/attractions"
 */
export const stripLanguagePrefix = (pathname = '/') => {
  if (!pathname || pathname === '/') return '/';
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && PREFIX_LANGUAGES.includes(segments[0])) {
    const remaining = segments.slice(1).join('/');
    return remaining ? `/${remaining}` : '/';
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
};

/**
 * Builds a localized path for a given target language.
 * E.g. ("/attractions", "fr") -> "/fr/attractions"
 * E.g. ("/fr/attractions", "de") -> "/de/attractions"
 * E.g. ("/fr/attractions", "en") -> "/attractions"
 * E.g. ("/", "fr") -> "/fr"
 * E.g. ("/fr", "en") -> "/"
 */
export const getLocalizedPath = (pathname = '/', targetLang = 'en') => {
  const cleanPath = stripLanguagePrefix(pathname);

  // English uses clean root URLs (no prefix)
  if (targetLang === 'en') {
    return cleanPath === '' ? '/' : cleanPath;
  }

  // International languages use /{targetLang}/cleanPath
  if (cleanPath === '/' || cleanPath === '') {
    return `/${targetLang}`;
  }

  return `/${targetLang}${cleanPath}`;
};

