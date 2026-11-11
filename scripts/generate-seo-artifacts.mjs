import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  ALL_DYNAMIC_SEO_PAGES,
  CORE_SITE_ROUTES,
} from '../src/data/seo/index.js';
import { blogPosts } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

const SITE_URL = 'https://www.visitchittorgarh.in';
const DEFAULT_OG_IMAGE = `${SITE_URL}/Fort.webp`;
const LASTMOD = new Date().toISOString().slice(0, 10);

const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeXml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const toAbsImage = (img) => {
  if (!img) return DEFAULT_OG_IMAGE;
  if (img.startsWith('http://') || img.startsWith('https://')) {
    return img.replace(/^https:\/\/visitchittorgarh\.in/i, SITE_URL);
  }
  return `${SITE_URL}${img.startsWith('/') ? img : `/${img}`}`;
};

const buildDynamicSchemas = (page) => {
  const url = `${SITE_URL}/${page.slug}`;
  const image = toAbsImage(page.heroImage);
  const schemas = [];

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page.h1 || page.name || page.slug, item: url },
    ],
  };
  schemas.push(breadcrumb);

  if (page.type === 'attraction') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TouristAttraction',
      name: page.name,
      description: page.metaDescription,
      url,
      image,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chittorgarh',
        addressRegion: 'Rajasthan',
        addressCountry: 'IN',
      },
    });
  } else if (page.type === 'package') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: page.name,
      description: page.metaDescription,
      url,
      image,
    });
  } else {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'TouristDestination',
      name: page.h1,
      description: page.metaDescription,
      url,
      image,
    });
  }

  if (Array.isArray(page.faqs) && page.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return schemas;
};

const buildSemanticFallbackBody = (entry) => {
  const heading = escapeHtml(entry.h1 || entry.title);
  const desc = escapeHtml(entry.intro || entry.description);
  const bullets = (entry.bullets || [])
    .slice(0, 6)
    .map((b) => `<li>${escapeHtml(b)}</li>`)
    .join('');

  return `<main class="seo-prerender-shell" style="max-width:960px;margin:0 auto;padding:2.5rem 1.25rem;font-family:Inter,system-ui,sans-serif;color:#25231F;background:#F8F5EF;">
      <nav aria-label="Breadcrumb" style="font-size:12px;margin-bottom:1rem;">
        <a href="/">Home</a> &rsaquo; <a href="/destinations-and-routes">All Guides &amp; Routes</a> &rsaquo; <span>${heading}</span>
      </nav>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:2rem;line-height:1.2;margin-bottom:1rem;">${heading}</h1>
      <p style="font-size:1rem;line-height:1.65;margin-bottom:1.25rem;">${desc}</p>
      ${bullets ? `<ul style="line-height:1.7;margin-bottom:1.5rem;">${bullets}</ul>` : ''}
      <p style="font-size:0.9rem;"><a href="/destinations-and-routes">Explore all Chittorgarh routes, cities, states, countries &amp; fort monuments</a> | <a href="/chittorgarh-fort">Chittorgarh Fort Guide</a> | <a href="/udaipur-to-chittorgarh-day-trip">Udaipur Day Trip</a></p>
    </main>`;
};

const injectRouteHtml = (templateHtml, entry) => {
  const canonicalUrl = `${SITE_URL}${entry.path === '/' ? '/' : entry.path}`;
  const ogImage = toAbsImage(entry.ogImage);
  const ogType = entry.ogType || 'website';
  const title = escapeHtml(entry.title);
  const desc = escapeHtml(entry.description);
  const imageAlt = escapeHtml(entry.imageAlt || entry.title);
  const schemasHtml = (entry.schemas || [])
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n  ');

  let html = templateHtml;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta name="description" content="${desc}" />`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:description" content="${desc}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta property="og:image" content="${ogImage}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta name="twitter:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta name="twitter:description" content="${desc}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/>/i,
    `<meta name="twitter:image" content="${ogImage}" />`
  );

  if (schemasHtml) {
    html = html.replace('</head>', `  <meta property="og:image:alt" content="${imageAlt}" />\n  ${schemasHtml}\n</head>`);
  }

  const fallbackBody = buildSemanticFallbackBody(entry);
  html = html.replace('<div id="root"></div>', `<div id="root">${fallbackBody}</div>`);
  return html;
};

const collectAllIndexableEntries = () => {
  const entries = [];
  const seenPaths = new Set();

  const register = (entry) => {
    if (seenPaths.has(entry.path)) {
      throw new Error(`Duplicate canonical route detected: ${entry.path}`);
    }
    seenPaths.add(entry.path);
    entries.push(entry);
  };

  for (const core of CORE_SITE_ROUTES) {
    register({
      path: core.path,
      title: core.title,
      h1: core.title.split('|')[0].trim(),
      description: core.description,
      intro: core.description,
      changefreq: core.changefreq,
      priority: core.priority,
      ogImage: '/Fort.webp',
      schemas: [],
    });
  }

  const priorityByType = {
    attraction: { changefreq: 'weekly', priority: '0.92' },
    package: { changefreq: 'weekly', priority: '0.90' },
    cityRoute: { changefreq: 'weekly', priority: '0.88' },
    state: { changefreq: 'weekly', priority: '0.85' },
    country: { changefreq: 'weekly', priority: '0.86' },
  };

  for (const page of ALL_DYNAMIC_SEO_PAGES) {
    const meta = priorityByType[page.type] || { changefreq: 'weekly', priority: '0.85' };
    const bullets = [];
    if (page.distanceKm) bullets.push(`Estimated Distance: ${page.distanceKm}`);
    if (page.estimatedRoadTime) bullets.push(`Estimated Travel Time: ${page.estimatedRoadTime}`);
    if (page.highway) bullets.push(`Primary Corridor: ${page.highway}`);
    if (page.timings) bullets.push(`Timings: ${page.timings}`);
    if (page.entryFee) bullets.push(`Entry Fee: ${page.entryFee}`);
    if (page.asiFeeTier) bullets.push(`ASI Monument Entry: ${page.asiFeeTier}`);
    if (page.arrivalHubs) bullets.push(`Arrival Gateways: ${page.arrivalHubs}`);
    if (page.bestConnectivity) bullets.push(`Connectivity: ${page.bestConnectivity}`);

    register({
      path: `/${page.slug}`,
      title: page.seoTitle,
      h1: page.h1,
      description: page.metaDescription,
      intro: page.intro,
      bullets,
      changefreq: meta.changefreq,
      priority: meta.priority,
      ogImage: page.heroImage || '/Fort.webp',
      imageAlt: page.imageAlt || page.h1,
      schemas: buildDynamicSchemas(page),
    });
  }

  for (const post of blogPosts) {
    register({
      path: `/blog/${post.id}`,
      title: `${post.title} | Visit Chittorgarh Blog`,
      h1: post.title,
      description: post.summary,
      intro: post.summary,
      ogType: 'article',
      ogImage: post.image || '/Fort.webp',
      imageAlt: post.title,
      changefreq: 'monthly',
      priority: '0.85',
      schemas: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.summary,
          image: toAbsImage(post.image),
          url: `${SITE_URL}/blog/${post.id}`,
          author: { '@type': 'Organization', name: post.author || 'Visit Chittorgarh' },
        },
      ],
    });
  }

  return entries;
};

const generateSitemapXml = (entries) => {
  const urlsXml = entries
    .map(
      (e) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${e.path === '/' ? '/' : e.path}`)}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlsXml}
</urlset>
`;
};

const validateSitemap = (xml, entries) => {
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    throw new Error('Invalid XML header in sitemap.xml');
  }
  const locs = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (locs.length !== entries.length) {
    throw new Error(`Sitemap count mismatch: expected ${entries.length}, got ${locs.length}`);
  }
  if (new Set(locs).size !== locs.length) {
    throw new Error('Duplicate <loc> entries found in sitemap.xml');
  }
  if (locs.length > 50000) {
    throw new Error('Sitemap exceeds 50,000 URL protocol limit');
  }
  const forbidden = ['/admin', '/staff-verify', '/verify/', '/landing/', '/404'];
  for (const loc of locs) {
    if (!loc.startsWith(`${SITE_URL}/`)) {
      throw new Error(`Non-canonical URL in sitemap: ${loc}`);
    }
    if (forbidden.some((f) => loc.includes(f))) {
      throw new Error(`Noindex URL leaked into sitemap: ${loc}`);
    }
  }
};

const generateRobotsTxt = () => `# robots.txt — www.visitchittorgarh.in
# Official Visit Chittorgarh Tourism Portal

User-agent: *
Allow: /

# Block operational, private & paid campaign routes
Disallow: /admin
Disallow: /admin/
Disallow: /staff-verify
Disallow: /staff-verify/
Disallow: /verify/
Disallow: /landing/

# Block duplicate query traps
Disallow: /*?*print=
Disallow: /*?*debug=

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;

const main = () => {
  const validateOnly = process.argv.includes('--validate-only');
  const entries = collectAllIndexableEntries();
  const sitemapXml = generateSitemapXml(entries);
  validateSitemap(sitemapXml, entries);

  if (validateOnly) {
    console.log(`[SEO Validate] OK: ${entries.length} unique canonical URLs validated.`);
    return;
  }

  // Write canonical public/sitemap.xml and public/robots.txt
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  const robotsTxt = generateRobotsTxt();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robotsTxt, 'utf8');

  if (!fs.existsSync(DIST_DIR)) {
    throw new Error('dist/ directory not found. Run vite build first.');
  }

  // Copy updated sitemap.xml & robots.txt into dist/
  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
  fs.writeFileSync(path.join(DIST_DIR, 'robots.txt'), robotsTxt, 'utf8');

  // Prerender per-route initial HTML metadata & semantic fallback shell into dist/
  const baseHtmlPath = path.join(DIST_DIR, 'index.html');
  const templateHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  let prerenderCount = 0;
  for (const entry of entries) {
    if (entry.path === '/') {
      // Update root index.html with Organization/WebSite fallback preservation safely without overwriting body
      continue;
    }

    const relSlug = entry.path.replace(/^\/+/, '');
    const targetHtmlPath = path.join(DIST_DIR, `${relSlug}.html`);
    fs.mkdirSync(path.dirname(targetHtmlPath), { recursive: true });
    fs.writeFileSync(targetHtmlPath, injectRouteHtml(templateHtml, entry), 'utf8');
    prerenderCount += 1;
  }

  console.log(
    `[SEO Build] Generated sitemap.xml (${entries.length} URLs), robots.txt, and prerendered ${prerenderCount} static HTML pages in dist/.`
  );
};

main();

