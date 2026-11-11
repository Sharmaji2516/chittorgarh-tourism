import React from 'react';
import {
  Landmark, Clock, Ticket, Camera, Compass, MapPin, MessageCircle, Sun, HelpCircle
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { SITE_URL, buildBreadcrumbSchema } from '../../utils/seoHelpers';
import RelatedPages from '../../components/seo/RelatedPages';
import { getRelatedLinksForPage } from '../../data/seo';
import { trackWhatsAppClick } from '../../utils/analytics';

const AttractionSEOTemplate = ({ page }) => {
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Attractions', to: '/attractions' },
    { label: page.name },
  ];

  const faqSchema = page.faqs?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  const attractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: page.name,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    image: `${SITE_URL}${page.heroImage}`,
    isAccessibleForFree: page.entryFee.toLowerCase().includes('free'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chittorgarh',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
  };

  const schemas = [buildBreadcrumbSchema(breadcrumbItems), attractionSchema, faqSchema].filter(Boolean);
  const relatedLinks = getRelatedLinksForPage(page);

  const waHref = `https://wa.me/917597451057?text=${encodeURIComponent(
    `Namaste! I want to visit ${page.name} in Chittorgarh. Please share guide and local cab availability.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-24 md:pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title={page.seoTitle}
        description={page.metaDescription}
        canonical={`/${page.slug}`}
        ogImage={page.heroImage}
        ogImageAlt={page.imageAlt}
        schema={schemas}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Hero Visual + Title */}
        <header className="bg-white rounded-3xl overflow-hidden border border-[#EFE7D9] shadow-sm mb-10">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={page.heroImage}
              alt={page.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/85 via-[#25231F]/35 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#C49A32] mb-3">
                <Landmark className="w-3.5 h-3.5" />
                {page.category}
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                {page.h1}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm sm:text-base text-[#25231F]/85 leading-relaxed mb-6">
              {page.intro}
            </p>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] flex items-center gap-1.5 mb-1.5">
                  <Clock className="w-3.5 h-3.5" /> Visiting Hours &amp; Duration
                </h2>
                <p className="text-xs sm:text-sm text-[#25231F]/85 leading-relaxed">{page.timings}</p>
                <p className="text-xs text-[#526B50] font-semibold mt-1.5">Suggested Visit: {page.estimatedDuration}</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] flex items-center gap-1.5 mb-1.5">
                  <Ticket className="w-3.5 h-3.5" /> Entry Fee &amp; Tickets
                </h2>
                <p className="text-xs sm:text-sm text-[#25231F]/85 leading-relaxed">{page.entryFee}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('seo_attraction_page', page.slug)}
                className="px-6 py-3.5 bg-[#526B50] hover:bg-[#41573f] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Book Certified Guide &amp; Cab
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openTripPlannerModal'))}
                className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                Include in Custom Itinerary
              </button>
            </div>
          </div>
        </header>

        {/* History & Architecture */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-3">
              History &amp; Significance
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">{page.history}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-3">
              Architectural Highlights
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">{page.architecture}</p>
          </div>
        </section>

        {/* Location, Best Time & Photography */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
            <h2 className="font-serif font-bold text-lg text-[#25231F] mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A65F3D]" /> Location &amp; Directions
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">{page.locationDirections}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
            <h2 className="font-serif font-bold text-lg text-[#25231F] mb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-[#C49A32]" /> Best Time to Visit
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">{page.bestTimeToVisit}</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
            <h2 className="font-serif font-bold text-lg text-[#25231F] mb-2 flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#526B50]" /> Photography Guide
            </h2>
            <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">{page.photographyInfo}</p>
          </div>
        </section>

        {/* Visible FAQs */}
        {page.faqs?.length > 0 && (
          <section className="mb-8" aria-labelledby="attraction-faq-heading">
            <h2 id="attraction-faq-heading" className="text-2xl font-serif font-bold text-[#25231F] mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C49A32]" />
              Visitor FAQs: {page.name}
            </h2>
            <div className="space-y-3">
              {page.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
                  <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5">{faq.q}</h3>
                  <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <RelatedPages links={relatedLinks} title="Nearby Landmarks & Planning Guides" />
      </div>
    </div>
  );
};

export default AttractionSEOTemplate;

