import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  MapPin, Clock, Navigation, Train, Plane, Car, Compass, MessageCircle,
  CheckCircle2, AlertCircle, HelpCircle, Phone, Ticket
} from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { SITE_URL, buildBreadcrumbSchema } from '../../utils/seoHelpers';
import RelatedPages from '../../components/seo/RelatedPages';
import { getRelatedLinksForPage } from '../../data/seo';
import { trackWhatsAppClick, trackPhoneCallClick } from '../../utils/analytics';

const CityRouteTemplate = ({ page }) => {
  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Travel Routes', to: '/destinations-and-routes' },
    { label: `${page.origin} to ${page.destination}` },
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
    name: `${page.origin} to ${page.destination} Travel Guide`,
    description: page.metaDescription,
    url: `${SITE_URL}/${page.slug}`,
    image: `${SITE_URL}${page.heroImage}`,
  };

  const schemas = [buildBreadcrumbSchema(breadcrumbItems), destinationSchema, faqSchema].filter(Boolean);
  const relatedLinks = getRelatedLinksForPage(page);

  const waHref = `https://wa.me/917597451057?text=${encodeURIComponent(
    `Namaste! I am planning a trip from ${page.origin} to ${page.destination}. Please help with local taxi, fort guide, and itinerary options.`
  )}`;

  const triggerPlanTrip = () => {
    window.dispatchEvent(new CustomEvent('openTripPlannerModal'));
  };

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

        {/* Hero Section */}
        <header className="bg-white rounded-3xl overflow-hidden border border-[#EFE7D9] shadow-sm mb-10">
          <div className="relative h-56 sm:h-72 w-full overflow-hidden">
            <img
              src={page.heroImage}
              alt={page.imageAlt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/80 via-[#25231F]/35 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 text-white">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#C49A32] text-white mb-3">
                <Navigation className="w-3.5 h-3.5" />
                Verified Route &amp; Transport Manual
              </span>
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold leading-tight">
                {page.h1}
              </h1>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm sm:text-base text-[#25231F]/80 leading-relaxed mb-6">
              {page.intro}
            </p>

            {/* Key Route Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <span className="text-[11px] uppercase tracking-wider text-[#A65F3D] font-bold flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5" /> Est. Distance
                </span>
                <p className="text-sm font-semibold text-[#25231F]">{page.distanceKm}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <span className="text-[11px] uppercase tracking-wider text-[#A65F3D] font-bold flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5" /> Est. Travel Time
                </span>
                <p className="text-sm font-semibold text-[#25231F]">{page.estimatedRoadTime}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <span className="text-[11px] uppercase tracking-wider text-[#526B50] font-bold flex items-center gap-1.5 mb-1">
                  <Train className="w-3.5 h-3.5" /> Rail Link
                </span>
                <p className="text-xs font-medium text-[#25231F] leading-snug">{page.nearestRail}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <span className="text-[11px] uppercase tracking-wider text-[#526B50] font-bold flex items-center gap-1.5 mb-1">
                  <Plane className="w-3.5 h-3.5" /> Nearest Airport
                </span>
                <p className="text-xs font-medium text-[#25231F] leading-snug">{page.nearestAirport}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#EFE7D9]/70 border border-[#C49A32]/25 flex items-start gap-2.5 text-xs text-[#25231F]/80 mb-6">
              <AlertCircle className="w-4 h-4 text-[#A65F3D] shrink-0 mt-0.5" />
              <span>
                <strong>Estimate Notice:</strong> Road durations, highway conditions, and train schedules are indicative. Always verify live traffic, IRCTC train timings, or flight status before departure.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('seo_city_route', page.slug)}
                className="px-6 py-3.5 bg-[#526B50] hover:bg-[#41573f] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Ask Local Route &amp; Cab Desk
              </a>
              <button
                type="button"
                onClick={triggerPlanTrip}
                className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Compass className="w-4 h-4" />
                Customize Chittorgarh Trip
              </button>
              <a
                href="tel:+917597451057"
                onClick={() => trackPhoneCallClick('seo_city_route')}
                className="px-6 py-3.5 bg-[#EFE7D9] hover:bg-[#e5dac6] text-[#25231F] rounded-2xl font-bold uppercase tracking-wider text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 75974 51057
              </a>
            </div>
          </div>
        </header>

        {/* Highway & Transport Options */}
        <section className="mb-10" aria-labelledby="transport-options-heading">
          <h2 id="transport-options-heading" className="text-2xl sm:text-3xl font-serif font-bold text-[#25231F] mb-2">
            Route &amp; Transportation Options
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/70 mb-5">
            <strong>Primary Corridor:</strong> {page.highway}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {page.transportModes.map((item) => (
              <div key={item.mode} className="bg-white rounded-2xl p-5 border border-[#EFE7D9] shadow-sm">
                <h3 className="font-serif font-bold text-lg text-[#A65F3D] mb-2 flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#C49A32] shrink-0" />
                  {item.mode}
                </h3>
                <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">{item.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stops + Recommended Plan */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-4">
              Recommended En-Route Highlights
            </h2>
            <ul className="space-y-3">
              {page.enRouteStops.map((stop) => (
                <li key={stop} className="flex items-start gap-2.5 text-sm text-[#25231F]/80">
                  <CheckCircle2 className="w-4 h-4 text-[#526B50] shrink-0 mt-0.5" />
                  <span>{stop}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-4">
              Suggested Travel Itinerary
            </h2>
            <p className="text-sm text-[#25231F]/80 leading-relaxed mb-4">
              {page.recommendedPlan}
            </p>
            <div className="pt-3 border-t border-[#EFE7D9] flex flex-wrap gap-3 text-xs">
              <NavLink to="/chittorgarh-fort-timings-tickets" className="inline-flex items-center gap-1 font-bold text-[#A65F3D] hover:text-[#C49A32]">
                <Ticket className="w-3.5 h-3.5" />
                Check Fort ASI Entry Fees →
              </NavLink>
              <NavLink to="/service/guide" className="inline-flex items-center gap-1 font-bold text-[#526B50] hover:text-[#C49A32]">
                <Compass className="w-3.5 h-3.5" />
                Book Verified Fort Guide →
              </NavLink>
            </div>
          </div>
        </section>

        {/* Sightseeing Essentials atop Fort */}
        <section className="bg-[#EFE7D9]/55 rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] mb-10">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#25231F] mb-3">
            Once You Arrive: Key Landmarks at Chittorgarh
          </h2>
          <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed mb-4">
            Chittorgarh Fort spans over 700 acres atop a 180-meter ridge with a 5-km motorable plateau road. Prioritize{' '}
            <NavLink to="/rana-kumbha-palace" className="underline text-[#A65F3D] font-medium">Rana Kumbha Palace</NavLink>,{' '}
            <NavLink to="/vijay-stambh" className="underline text-[#A65F3D] font-medium">Vijay Stambh</NavLink>,{' '}
            <NavLink to="/meera-temple-chittorgarh" className="underline text-[#A65F3D] font-medium">Meera Temple</NavLink>,{' '}
            <NavLink to="/gaumukh-kund-chittorgarh" className="underline text-[#A65F3D] font-medium">Gaumukh Kund</NavLink>,{' '}
            <NavLink to="/kalika-mata-temple-chittorgarh" className="underline text-[#A65F3D] font-medium">Kalika Mata Temple</NavLink>,{' '}
            <NavLink to="/rani-padmini-palace" className="underline text-[#A65F3D] font-medium">Rani Padmini Palace</NavLink>, and{' '}
            <NavLink to="/kirti-stambh" className="underline text-[#A65F3D] font-medium">Kirti Stambh</NavLink>.
          </p>
        </section>

        {/* Visible FAQs matching JSON-LD */}
        {page.faqs?.length > 0 && (
          <section className="mb-8" aria-labelledby="route-faq-heading">
            <h2 id="route-faq-heading" className="text-2xl font-serif font-bold text-[#25231F] mb-5 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#C49A32]" />
              Frequently Asked Questions: {page.origin} to {page.destination}
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

        <RelatedPages links={relatedLinks} title={`Continue Exploring Beyond ${page.origin}`} />
      </div>
    </div>
  );
};

export default CityRouteTemplate;

