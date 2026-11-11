/**
 * Shared pure SEO URL normalization and Schema.org builder helpers
 */
export const SITE_URL = 'https://www.visitchittorgarh.in';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/Fort.webp`;

export const normalizeCanonicalUrl = (canonical) => {
  if (!canonical || canonical === '/') return `${SITE_URL}/`;
  if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
    return canonical
      .replace(/^http:\/\//i, 'https://')
      .replace(/^https:\/\/visitchittorgarh\.in/i, SITE_URL);
  }
  const cleanPath = canonical.startsWith('/') ? canonical : `/${canonical}`;
  return `${SITE_URL}${cleanPath}`;
};

export const normalizeImageUrl = (img) => {
  if (!img) return DEFAULT_OG_IMAGE;
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img
      .replace(/^http:\/\//i, 'https://')
      .replace(/^https:\/\/visitchittorgarh\.in/i, SITE_URL);
  }
  const cleanPath = img.startsWith('/') ? img : `/${img}`;
  return `${SITE_URL}${cleanPath}`;
};

export const buildBreadcrumbSchema = (items = []) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.label,
    ...(item.to ? { item: `${SITE_URL}${item.to === '/' ? '/' : item.to}` } : {}),
  })),
});

