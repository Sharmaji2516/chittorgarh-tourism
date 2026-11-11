import React from 'react';
import {
  MapPin, Train, Calendar, Compass, MessageCircle, CheckCircle2, HelpCircle, Utensils
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { SITE_URL, buildBreadcrumbSchema } from '../../utils/seoHelpers';
import RelatedPages from '../../components/seo/RelatedPages';
import { getRelatedLinksForPage } from '../../data/seo';
import { trackWhatsAppClick } from '../../utils/analytics';

const StatePageTemplate = ({ page }) => {
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'India Travel Guides', to: '/destinations-and-routes' },
    { label: `From ${page.state}` },
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

  const destinationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: `Chittorgarh Tourism from ${page.state}`,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    image: `${SITE_URL}/Fort.webp`,
  };

  const schemas = [buildBreadcrumbSchema(breadcrumbItems), destinationSchema, faqSchema].filter(Boolean);
  const relatedLinks = getRelatedLinksForPage(page);

  const waHref = `https://wa.me/917597451057?text=${encodeURIComponent(
    `Namaste! We are planning a Chittorgarh trip from ${page.state}. Please suggest the best travel route, cab, and hotel plan.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-24 md:pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title={page.seoTitle}
        description={page.metaDescription}
        canonical={`/${page.slug}`}
        ogImage="/Fort.webp"
        ogImageAlt={`Chittorgarh Fort tourism travel guide for visitors from ${page.state}`}
        schema={schemas}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* State Hero */}
        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] shadow-sm mb-10">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#A65F3D] bg-[#EFE7D9] px-3.5 py-1.5 rounded-full mb-4">
            <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
            State Travel Guide • {page.state}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#25231F] leading-tight mb-4">
            {page.h1}
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/80 leading-relaxed mb-6">
            {page.intro}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {page.departureHubs.map((hub) => (
              <span
                key={hub}
                className="text-xs font-medium px-3 py-1.5 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9] text-[#25231F]"
              >
                {hub}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('seo_state_page', page.state)}
              className="px-6 py-3.5 bg-[#526B50] hover:bg-[#41573f] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Plan {page.state} Trip on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('openTripPlannerModal'))}
              className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Open Custom Trip Planner
            </button>
          </div>
        </header>

        {/* Detailed State Planning Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Train className="w-5 h-5 text-[#A65F3D]" />
              Best Connectivity from {page.state}
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed mb-4">{page.bestConnectivity}</p>
            <p className="text-xs text-[#25231F]/65">
              Always verify live IRCTC trains, airline flights to Udaipur (UDR) / Jaipur (JAI), and highway updates before booking.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C49A32]" />
              Ideal Trip Duration &amp; Season
            </h2>
            <p className="text-sm text-[#25231F]/80 mb-2">
              <strong>Recommended Duration:</strong> {page.idealDuration}
            </p>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">
              <strong>Best Travel Window:</strong> {page.bestSeason}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-[#526B50]" />
              Cultural &amp; Culinary Notes
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">{page.culturalNotes}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#C49A32]" />
              Recommended {page.state} Itinerary
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">{page.itinerarySummary}</p>
          </div>
        </section>

        {/* Visible FAQs */}
        {page.faqs?.length > 0 && (
          <section className="mb-8" aria-labelledby="state-faq-heading">
            <h2 id="state-faq-heading" className="text-2xl font-serif font-bold text-[#25231F] mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C49A32]" />
              FAQs for Travelers from {page.state}
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

        <RelatedPages
          links={relatedLinks}
          title={`City Routes & Tours for ${page.state} Visitors`}
        />
      </div>
    </div>
  );
};

export default StatePageTemplate;

