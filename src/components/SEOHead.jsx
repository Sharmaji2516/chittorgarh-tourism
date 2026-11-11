import { Helmet } from 'react-helmet-async';
import {
  DEFAULT_OG_IMAGE,
  normalizeCanonicalUrl,
  normalizeImageUrl,
} from '../utils/seoHelpers';

/**
 * SEOHead — Reusable SEO metadata and JSON-LD injector for www.visitchittorgarh.in
 */
const SEOHead = ({
  title = 'Visit Chittorgarh | Official Rajasthan Heritage, Fort & Tourism Portal',
  description = "Plan your visit to Chittorgarh Fort — India's largest UNESCO citadel. Book verified Mewari guides, sanitized private cabs, heritage stays & authentic Rajasthan itineraries.",
  canonical = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = 'Chittorgarh Fort UNESCO World Heritage Citadel in Rajasthan, India',
  ogType = 'website',
  locale = 'en_IN',
  noIndex = false,
  schema = null,
}) => {
  const canonicalUrl = normalizeCanonicalUrl(canonical);
  const resolvedOgImage = normalizeImageUrl(ogImage);
  const robotsContent = noIndex
    ? 'noindex, nofollow'
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  const schemas = schema
    ? (Array.isArray(schema) ? schema.filter(Boolean) : [schema])
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content={robotsContent} />

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
      <meta property="og:locale" content={locale} />
      <meta property="og:locale:alternate" content="en_US" />

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
