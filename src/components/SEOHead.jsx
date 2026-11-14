import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  normalizeCanonicalUrl,
  normalizeImageUrl,
} from '../utils/seoHelpers';
import { useLanguage } from '../context/LanguageContext';
import {
  SUPPORTED_LANGUAGES,
  getLocalizedPath,
  stripLanguagePrefix,
  isRTL,
} from '../config/languages';

/**
 * SEOHead — Multilingual SEO metadata, hreflang tags, and JSON-LD injector for www.visitchittorgarh.in
 */
const SEOHead = ({
  title = 'Visit Chittorgarh | Official Rajasthan Heritage, Fort & Tourism Portal',
  description = "Plan your visit to Chittorgarh Fort — India's largest UNESCO citadel. Book verified Mewari guides, sanitized private cabs, heritage stays & authentic Rajasthan itineraries.",
  canonical = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'Chittorgarh Fort UNESCO World Heritage Citadel in Rajasthan, India',
  ogType = 'website',
  locale,
  noIndex = false,
  schema = null,
}) => {
  const { lang } = useLanguage();
  const currentLang = lang || 'en';
  const isRightToLeft = isRTL(currentLang);

  // Derive clean canonical path without language prefix
  const cleanPath = stripLanguagePrefix(canonical || '/');

  // Self-referencing canonical for current language
  const selfLocalizedPath = getLocalizedPath(cleanPath, currentLang);
  const canonicalUrl = normalizeCanonicalUrl(selfLocalizedPath);

  const resolvedOgImage = normalizeImageUrl(ogImage);
  const robotsContent = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const schemas = schema
    ? Array.isArray(schema)
      ? schema.filter(Boolean)
      : [schema]
    : [];

  // Generate hreflang tags for all 9 supported languages + x-default
  const hreflangLinks = [
    ...SUPPORTED_LANGUAGES.map((item) => ({
      lang: item.code,
      href: normalizeCanonicalUrl(getLocalizedPath(cleanPath, item.code)),
    })),
    {
      lang: 'x-default',
      href: normalizeCanonicalUrl(cleanPath === '' ? '/' : cleanPath),
    },
  ];

  // Map language to locale
  const resolvedLocale =
    locale ||
    (currentLang === 'hi'
      ? 'hi_IN'
      : currentLang === 'fr'
      ? 'fr_FR'
      : currentLang === 'de'
      ? 'de_DE'
      : currentLang === 'it'
      ? 'it_IT'
      : currentLang === 'ja'
      ? 'ja_JP'
      : currentLang === 'es'
      ? 'es_ES'
      : currentLang === 'he'
      ? 'he_IL'
      : currentLang === 'ar'
      ? 'ar_SA'
      : 'en_IN');

  return (
    <Helmet>
      {/* HTML Language and Direction */}
      <html lang={currentLang} dir={isRightToLeft ? 'rtl' : 'ltr'} />

      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsContent} />

      {/* Multilingual Hreflang Tags */}
      {hreflangLinks.map((alt) => (
        <link
          key={`hreflang-${alt.lang}`}
          rel="alternate"
          hrefLang={alt.lang}
          href={alt.href}
        />
      ))}

      {/* Geo Metadata for Chittorgarh, Rajasthan */}
      <meta name="geo.region" content="IN-RJ" />
      <meta name="geo.placename" content="Chittorgarh, Rajasthan, India" />
      <meta name="geo.position" content="24.8887;74.6269" />
      <meta name="ICBM" content="24.8887, 74.6269" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Visit Chittorgarh" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:locale" content={resolvedLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* JSON-LD Structured Data */}
      {schemas.map((s, i) => (
        <script key={`ld-json-${i}`} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
