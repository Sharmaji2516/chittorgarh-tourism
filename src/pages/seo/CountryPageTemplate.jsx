import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Globe, Plane, ShieldCheck, Ticket, CreditCard, Compass, MessageCircle, Languages, HelpCircle
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { SITE_URL, buildBreadcrumbSchema } from '../../utils/seoHelpers';
import RelatedPages from '../../components/seo/RelatedPages';
import { getRelatedLinksForPage } from '../../data/seo';
import { trackWhatsAppClick } from '../../utils/analytics';

const CountryPageTemplate = ({ page }) => {
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'International Guide', to: '/chittorgarh-fort-travel-guide-international-tourists' },
    { label: page.country },
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
    name: `Chittorgarh Fort Guide for Visitors from ${page.country}`,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    image: `${SITE_URL}/Fort.webp`,
    touristType: ['International Tourist', 'Heritage Traveler', 'Cultural Explorer'],
  };

  const schemas = [buildBreadcrumbSchema(breadcrumbItems), destinationSchema, faqSchema].filter(Boolean);
  const relatedLinks = getRelatedLinksForPage(page);

  const waHref = `https://wa.me/917597451057?text=${encodeURIComponent(
    `Namaste! I am travelling to Chittorgarh from ${page.country}. Please help me arrange a private Udaipur pickup cab and certified English/multilingual guide.`
  )}`;

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-24 md:pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title={page.seoTitle}
        description={page.metaDescription}
        canonical={`/${page.slug}`}
        ogImage="/Fort.webp"
        ogImageAlt={`Chittorgarh Fort international travel guide for visitors from ${page.country}`}
        locale="en_US"
        schema={schemas}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        {/* Country Hero */}
        <header className="bg-gradient-to-br from-[#312D27] via-[#25231F] to-[#1E1C19] text-white rounded-3xl p-6 sm:p-11 mb-10 border border-[#C49A32]/30 shadow-xl">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#DFBA5A] bg-white/10 px-3.5 py-1.5 rounded-full mb-4 border border-white/15">
            <Globe className="w-3.5 h-3.5" />
            {page.region} • {page.country}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold leading-tight mb-4">
            {page.h1}
          </h1>
          <p className="text-sm sm:text-base text-[#F8F5EF]/85 leading-relaxed max-w-3xl mb-7">
            {page.intro}
          </p>

          <div className="flex flex-wrap gap-2.5 text-xs mb-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Zero Forced Shopping Policy
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <Languages className="w-3.5 h-3.5 text-[#DFBA5A]" />
              Licensed English Historians
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 border border-white/15">
              <Plane className="w-3.5 h-3.5 text-[#DFBA5A]" />
              UDR Airport Pickup (90 km)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('seo_country_page', page.country)}
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Message International Concierge
            </a>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('openTripPlannerModal'))}
              className="px-7 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Request Custom Rajasthan Quote
            </button>
          </div>
        </header>

        {/* Country-Specific Practical Guidance */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Plane className="w-5 h-5 text-[#A65F3D]" />
              Arrival Airports &amp; Connecting Flights
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">{page.arrivalHubs}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#C49A32]" />
              ASI Monument Entry Fee &amp; Visa Notes
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed mb-2.5">
              <strong>Monument Entry:</strong> {page.asiFeeTier}
            </p>
            <p className="text-xs text-[#25231F]/70 leading-relaxed">
              <strong>Entry Documentation:</strong> {page.visaAndEntry}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#526B50]" />
              Currency, Cards &amp; Local Payments
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">{page.currencyAndPayments}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
              <Languages className="w-5 h-5 text-[#A65F3D]" />
              Language Guides &amp; Recommended Flow
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed mb-2.5">
              <strong>Guides:</strong> {page.guideLanguages}
            </p>
            <p className="text-sm text-[#25231F]/80 leading-relaxed">
              <strong>Suggested Flow:</strong> {page.itinerarySummary}
            </p>
          </div>
        </section>

        {/* Temple & Cultural Etiquette Callout */}
        <section className="bg-[#EFE7D9]/60 rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] mb-10">
          <h2 className="text-xl font-serif font-bold text-[#25231F] mb-2">
            Practical Etiquette Inside Living Fort Temples
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
            While palaces and ramparts are historic monuments,{' '}
            <NavLink to="/kalika-mata-temple-chittorgarh" className="underline font-medium text-[#A65F3D]">Kalika Mata Temple</NavLink>{' '}
            and{' '}
            <NavLink to="/meera-temple-chittorgarh" className="underline font-medium text-[#A65F3D]">Meera Temple</NavLink>{' '}
            are active sanctuaries. Dress modestly (shoulders and knees covered), remove footwear before entering marble sanctum terraces, and carry sun protection + sealed bottled water between monuments.
          </p>
        </section>

        {/* Visible FAQs */}
        {page.faqs?.length > 0 && (
          <section className="mb-8" aria-labelledby="country-faq-heading">
            <h2 id="country-faq-heading" className="text-2xl font-serif font-bold text-[#25231F] mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C49A32]" />
              FAQs for Travelers from {page.country}
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
          title="Essential International Planning Links"
        />
      </div>
    </div>
  );
};

export default CountryPageTemplate;

