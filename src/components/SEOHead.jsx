import { Helmet } from 'react-helmet-async';

/**
 * SEOHead — Reusable SEO component for visitchittorgarh.in
 *
 * Props:
 *  title       string  — Page title (50–60 chars recommended)
 *  description string  — Meta description (150–160 chars recommended)
 *  canonical   string  — Canonical URL (full URL, e.g. https://visitchittorgarh.in/stays)
 *  keywords    string  — Comma-separated keyword string
 *  ogImage     string  — Absolute URL to OG share image
 *  schema      object | object[]  — JSON-LD schema object(s) to inject
 */
const BASE_URL = 'https://visitchittorgarh.in';
const DEFAULT_OG_IMAGE = `${BASE_URL}/Fort.png`;

const SEOHead = ({
  title = 'Visit Chittorgarh | Rajasthan Heritage & Tourism',
  description = 'Explore Chittorgarh — home to India\'s largest fort, Vijay Stambh, Padmini Palace & Meera Temple. Plan your perfect Chittorgarh trip with local guides, hotels & itineraries.',
  canonical,
  keywords = 'Chittorgarh, Visit Chittorgarh, Chittorgarh Tourism, Chittorgarh Fort, Rajasthan Tourism',
  ogImage = DEFAULT_OG_IMAGE,
  schema = null,
}) => {
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  // Build JSON-LD: accept single object or array
  const schemas = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      {/* Primary Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Geo Tags */}
      <meta name="geo.region" content="IN-RJ" />
      <meta name="geo.placename" content="Chittorgarh, Rajasthan, India" />
      <meta name="geo.position" content="24.8887;74.6269" />
      <meta name="ICBM" content="24.8887, 74.6269" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Visit Chittorgarh" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Chittorgarh Fort — The Pride of Rajasthan" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@visitchittorgarh" />

      {/* JSON-LD Structured Data */}
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
