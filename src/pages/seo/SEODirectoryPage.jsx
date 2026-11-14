import React, { useState, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { Search, MapPin, Globe, Landmark, Compass, Train, ArrowRight } from 'lucide-react';
import SEOHead from '../../components/seo/SEOHead';
import Breadcrumbs from '../../components/seo/Breadcrumbs';
import { SITE_URL, buildBreadcrumbSchema } from '../../utils/seoHelpers';
import { useLanguage } from '../../context/LanguageContext';
import { getLocalizedPath } from '../../config/languages';
import {
  ATTRACTIONS_SEO,
  TOUR_PACKAGES_SEO,
  EXISTING_PACKAGE_PAGES,
  CITY_ROUTES_SEO,
  STATE_PAGES_SEO,
  COUNTRY_PAGES_SEO,
} from '../../data/seo';

const RAJASTHAN_ROUTES = CITY_ROUTES_SEO.filter((r) => r.group === 'rajasthan' || r.group === 'reverse');
const INDIA_ROUTES = CITY_ROUTES_SEO.filter((r) => r.group === 'india');
const HUB_ROUTES = CITY_ROUTES_SEO.filter((r) => r.group === 'transport-hub');
const ALL_PACKAGES = [...EXISTING_PACKAGE_PAGES, ...TOUR_PACKAGES_SEO];

const SEODirectoryPage = () => {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState('');

  const pageT = t?.directoryPage || {};

  const breadcrumbItems = [
    { label: pageT.breadcrumbHome || 'Home', to: getLocalizedPath('/', lang) },
    { label: pageT.breadcrumbDirectory || 'Destinations & Routes Directory' },
  ];

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filterList = (list, getLabel) =>
      q ? list.filter((item) => getLabel(item).toLowerCase().includes(q)) : list;

    return {
      attractions: filterList(ATTRACTIONS_SEO, (i) => `${i.name} ${i.category}`),
      packages: filterList(ALL_PACKAGES, (i) => `${i.name} ${i.duration || ''}`),
      rajasthan: filterList(RAJASTHAN_ROUTES, (i) => `${i.origin} ${i.destination}`),
      india: filterList(INDIA_ROUTES, (i) => `${i.origin} ${i.destination}`),
      hubs: filterList(HUB_ROUTES, (i) => `${i.origin} ${i.destination}`),
      states: filterList(STATE_PAGES_SEO, (i) => i.state),
      countries: filterList(COUNTRY_PAGES_SEO, (i) => `${i.country} ${i.region}`),
    };
  }, [query]);

  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Visit Chittorgarh Complete Travel Routes, Attractions, State & Country Guides',
    url: `${SITE_URL}/destinations-and-routes`,
    description:
      'Complete directory of Chittorgarh Fort landmarks, tour packages, airport/rail routes, city-to-city highway guides, Indian state guides, and international visitor manuals.',
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-24 md:pb-20 selection:bg-[#C49A32] selection:text-white">
      <SEOHead
        title="Chittorgarh Routes, Cities, States, Countries & Monuments Directory"
        description="Browse every Visit Chittorgarh travel guide: Rajasthan & Indian city routes, 21 state guides, 27 international country manuals, fort landmarks & tour packages."
        canonical={getLocalizedPath('/destinations-and-routes', lang)}
        schema={[buildBreadcrumbSchema(breadcrumbItems), directorySchema]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <header className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE7D9] shadow-sm mb-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A65F3D] bg-[#EFE7D9] px-3.5 py-1.5 rounded-full inline-block mb-4">
            {pageT.badge || "India & Global Travel Network"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-[#25231F] mb-3">
            {pageT.title || "Chittorgarh Travel Guides, Routes & Landmarks"}
          </h1>
          <p className="text-sm sm:text-base text-[#25231F]/75 max-w-3xl mb-6">
            {pageT.desc || "Find detailed distances, rail & airport transfers, verified ASI entry rules, and custom tour itineraries tailored to your departure city, state, or country."}
          </p>

          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#25231F]/45 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={pageT.searchPlaceholder || "Search city, state, country, monument, or airport..."}
              aria-label="Filter Chittorgarh guides and routes"
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] focus:border-[#C49A32] focus:outline-none text-sm"
            />
          </div>
        </header>

        <div className="space-y-10">
          {/* Attractions */}
          {matches.attractions.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-[#C49A32]" /> {pageT.secAttractions || "Monuments, Temples & Nature"} ({matches.attractions.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {matches.attractions.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white p-4 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-sm font-serif font-bold text-[#25231F] block">{item.name}</span>
                      <span className="text-[11px] text-[#25231F]/65">{item.category}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}

          {/* Tour Packages */}
          {matches.packages.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#A65F3D]" /> {pageT.secPackages || "Tour Packages & Custom Itineraries"} ({matches.packages.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {matches.packages.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white p-4 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-sm font-serif font-bold text-[#25231F] block">{item.name}</span>
                      <span className="text-[11px] text-[#25231F]/65">{item.duration}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}

          {/* Airport, Rail & Mode Travel Hubs */}
          {matches.hubs.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <Train className="w-5 h-5 text-[#526B50]" /> {pageT.secHubs || "Airports, Railway Stations & Highway Modes"} ({matches.hubs.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {matches.hubs.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white p-4 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-sm font-serif font-bold text-[#25231F] block">{item.origin} → {item.destination}</span>
                      <span className="text-[11px] text-[#25231F]/65">{item.distanceKm}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}

          {/* Rajasthan Cities */}
          {matches.rajasthan.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#A65F3D]" /> {pageT.secRajasthan || "Rajasthan Highway & City Routes"} ({matches.rajasthan.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {matches.rajasthan.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white p-4 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-sm font-serif font-bold text-[#25231F] block">{item.origin} to {item.destination}</span>
                      <span className="text-[11px] text-[#25231F]/65">{item.distanceKm} • {item.estimatedRoadTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}

          {/* Major Indian Cities */}
          {matches.india.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#C49A32]" /> {pageT.secIndia || "Major Indian City Routes"} ({matches.india.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {matches.india.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white p-4 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-sm font-serif font-bold text-[#25231F] block">{item.origin} to {item.destination}</span>
                      <span className="text-[11px] text-[#25231F]/65">{item.distanceKm}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}

          {/* State Guides */}
          {matches.states.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#526B50]" /> {pageT.secStates || "Indian State Visitor Guides"} ({matches.states.length})
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {matches.states.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white px-4 py-3 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors text-xs sm:text-sm font-semibold text-[#25231F] flex items-center justify-between"
                  >
                    <span>From {item.state}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}

          {/* International Country Guides */}
          {matches.countries.length > 0 && (
            <section>
              <h2 className="text-2xl font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#C49A32]" /> {pageT.secCountries || "International Country Travel Guides"} ({matches.countries.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {matches.countries.map((item) => (
                  <NavLink
                    key={item.slug}
                    to={getLocalizedPath(`/${item.slug}`, lang)}
                    className="bg-white p-3.5 rounded-2xl border border-[#EFE7D9] hover:border-[#C49A32] transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-[#25231F] block">{item.country}</span>
                      <span className="text-[10px] uppercase tracking-wider text-[#A65F3D]">{item.region}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                  </NavLink>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SEODirectoryPage;
