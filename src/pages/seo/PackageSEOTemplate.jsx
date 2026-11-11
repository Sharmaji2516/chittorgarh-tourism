import React from 'react';
import {
  Compass, Clock, CheckCircle2, XCircle, MessageCircle, HelpCircle, Users, Phone
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { SITE_URL, buildBreadcrumbSchema } from '../../utils/seoHelpers';
import RelatedPages from '../../components/seo/RelatedPages';
import { getRelatedLinksForPage } from '../../data/seo';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const PackageSEOTemplate = ({ page }) => {
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Tour Packages', to: '/royal-journeys' },
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

  const tripSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: page.name,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    image: `${SITE_URL}${page.heroImage}`,
    itinerary: (page.itinerary || []).map((step) => ({
      '@type': 'TouristDestination',
      name: step.day,
      description: step.plan,
    })),
  };

  const schemas = [buildBreadcrumbSchema(breadcrumbItems), tripSchema, faqSchema].filter(Boolean);
  const relatedLinks = getRelatedLinksForPage(page);

  const waHref = `https://wa.me/917597451057?text=${encodeURIComponent(
    `Namaste! I am interested in customizing the "${page.name}" (${page.duration}). Please share itinerary options and vehicle/guide quote.`
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

        {/* Package Hero */}
        <header className="bg-white rounded-3xl overflow-hidden border border-[#EFE7D9] shadow-sm mb-10">
          <div className="relative h-60 sm:h-72 w-full overflow-hidden">
            <img
              src={page.heroImage}
              alt={page.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/85 via-[#25231F]/35 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#C49A32] mb-3">
                <Compass className="w-3.5 h-3.5" />
                {page.badge}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#A65F3D] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] block">Duration</span>
                  <span className="text-sm font-semibold text-[#25231F]">{page.duration}</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] flex items-start gap-3">
                <Users className="w-5 h-5 text-[#526B50] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#526B50] block">Ideal For</span>
                  <span className="text-sm text-[#25231F]/85">{page.idealFor}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('seo_package_page', page.slug)}
                className="px-6 py-3.5 bg-[#526B50] hover:bg-[#41573f] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Request Custom Quote on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('openTripPlannerModal', {
                  detail: {
                    mode: 'focused',
                    itemName: page.name,
                    itemDuration: page.duration,
                    category: 'Package',
                  }
                }))}
                className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                Plan Travel Dates &amp; Group Size
              </button>
              <a
                href="tel:+917597451057"
                onClick={() => trackPhoneCallClick('seo_package_page')}
                className="px-6 py-3.5 bg-[#EFE7D9] hover:bg-[#e5dac6] text-[#25231F] rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Concierge
              </a>
            </div>
          </div>
        </header>

        {/* Key Highlights */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-sm mb-8">
          <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4">Tour Highlights</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {page.highlights.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-[#25231F]/80">
                <CheckCircle2 className="w-4 h-4 text-[#526B50] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Itinerary Steps */}
        <section className="mb-8" aria-labelledby="package-itinerary-heading">
          <h2 id="package-itinerary-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F] mb-5">
            Suggested Day-by-Day Itinerary
          </h2>
          <div className="space-y-4">
            {page.itinerary.map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-[#EFE7D9] shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#A65F3D] mb-2">{step.day}</h3>
                <p className="text-sm text-[#25231F]/80 leading-relaxed">{step.plan}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusions / Exclusions */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-lg font-serif font-bold text-[#526B50] mb-3">What Can Be Included</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#25231F]/80">
              {page.inclusions.map((inc) => (
                <li key={inc} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#526B50] shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-lg font-serif font-bold text-[#A65F3D] mb-3">Excluded (Paid Directly / Optional)</h2>
            <ul className="space-y-2 text-xs sm:text-sm text-[#25231F]/80">
              {page.exclusions.map((exc) => (
                <li key={exc} className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-[#A65F3D] shrink-0 mt-0.5" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Visible FAQs */}
        {page.faqs?.length > 0 && (
          <section className="mb-8" aria-labelledby="package-faq-heading">
            <h2 id="package-faq-heading" className="text-2xl font-serif font-bold text-[#25231F] mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C49A32]" />
              Frequently Asked Package Questions
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

        <RelatedPages links={relatedLinks} title="More Itineraries & Monument Guides" />
      </div>
    </div>
  );
};

export default PackageSEOTemplate;

