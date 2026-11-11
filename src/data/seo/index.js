import { ATTRACTIONS_SEO } from './attractions.js';
import { TOUR_PACKAGES_SEO, EXISTING_PACKAGE_PAGES } from './tourPackages.js';
import { CITY_ROUTES_SEO } from './cityRoutes.js';
import { STATE_PAGES_SEO } from './statePages.js';
import { COUNTRY_PAGES_SEO } from './countryPages.js';

export {
  ATTRACTIONS_SEO,
  TOUR_PACKAGES_SEO,
  EXISTING_PACKAGE_PAGES,
  CITY_ROUTES_SEO,
  STATE_PAGES_SEO,
  COUNTRY_PAGES_SEO,
};

/**
 * Unified list of all structured SEO pages resolved dynamically by /:seoSlug
 */
export const ALL_DYNAMIC_SEO_PAGES = [
  ...ATTRACTIONS_SEO.map((item) => ({ type: 'attraction', ...item })),
  ...TOUR_PACKAGES_SEO.map((item) => ({ type: 'package', ...item })),
  ...CITY_ROUTES_SEO.map((item) => ({ type: 'cityRoute', ...item })),
  ...STATE_PAGES_SEO.map((item) => ({ type: 'state', ...item })),
  ...COUNTRY_PAGES_SEO.map((item) => ({ type: 'country', ...item })),
];

/**
 * Lookup map by URL slug for O(1) route resolution
 */
export const SEO_ROUTE_MAP = Object.fromEntries(
  ALL_DYNAMIC_SEO_PAGES.map((page) => [page.slug, page])
);

/**
 * Helper to fetch related links for any dynamic SEO page
 */
export const getRelatedLinksForPage = (page) => {
  const links = [];

  if (page.type === 'attraction') {
    (page.nearbyAttractions || []).forEach((n) => {
      const target = SEO_ROUTE_MAP[n.slug];
      links.push({
        to: `/${n.slug}`,
        title: n.label,
        tag: 'Nearby Monument',
        description: target?.metaDescription || 'Explore nearby architectural and historical landmark in Chittorgarh.',
      });
    });
    links.push(
      { to: '/chittorgarh-fort-timings-tickets', title: 'Chittorgarh Fort Timings & Tickets', tag: 'ASI Fee Guide', description: 'Check 2026–2027 ASI entry rates, opening hours & Light Show schedule.' },
      { to: '/chittorgarh-1-day-tour', title: 'Complete 1-Day Fort Itinerary', tag: 'Tour Plan', description: 'Hourly sightseeing circuit covering all major palaces and monuments.' },
    );
  } else if (page.type === 'cityRoute') {
    links.push(
      { to: '/chittorgarh-fort', title: 'Chittorgarh Fort Complete Guide', tag: 'Main Citadel', description: 'History, 7 Pol gates, timings, entry fees & visitor navigation tips.' },
      { to: '/chittorgarh-fort-timings-tickets', title: 'Fort Timings & Entry Ticket Guide', tag: 'ASI Guide', description: 'Indian, SAARC & Foreign tourist ticket pricing + Light & Sound schedule.' },
      { to: '/sanwariya-seth-temple', title: 'Shri Sanwariya Seth Temple', tag: 'Pilgrimage', description: 'Mandaphiya darshan timings, highway detour off NH-27 & taxi options.' },
      { to: '/udaipur-and-chittorgarh-tour-package', title: 'Udaipur & Chittorgarh Package', tag: 'Tour Package', description: 'Combined private Mewar circuit with cabs, stays & certified guides.' },
      { to: '/chittorgarh-weekend-trip', title: 'Chittorgarh 2-Day Weekend Plan', tag: 'Itinerary', description: 'Saturday–Sunday fort + Sanwariya Seth / Bassi getaway schedule.' },
      { to: '/service/taxi', title: 'Book Private Sightseeing Taxi', tag: 'Transport', description: 'AC Sedan, Innova Crysta & Tempo Traveller fleet for the 5-km Fort loop.' },
    );
  } else if (page.type === 'state') {
    (page.linkedCitySlugs || []).forEach((slug) => {
      const target = SEO_ROUTE_MAP[slug];
      if (target) {
        links.push({
          to: `/${target.slug}`,
          title: `${target.origin} to ${target.destination}`,
          tag: 'City Route',
          description: target.metaDescription,
        });
      }
    });
    links.push(
      { to: '/chittorgarh-fort', title: 'Chittorgarh Fort Complete Guide', tag: 'UNESCO Citadel', description: 'History, monuments, timings & private guide tips.' },
      { to: '/chittorgarh-family-tour', title: 'Chittorgarh Family Tour Package', tag: 'Family Plan', description: 'Senior-friendly & kid-engaging 1–2 day sightseeing itinerary.' },
    );
  } else if (page.type === 'country') {
    links.push(
      { to: '/chittorgarh-fort-travel-guide-international-tourists', title: 'International Tourists Fort Manual', tag: 'Global Hub', description: 'Visas, ASI fee tiers, UPI One World, safety & English historians.' },
      { to: '/udaipur-airport-to-chittorgarh', title: 'Udaipur Airport (UDR) to Chittorgarh', tag: '90-km Transfer', description: 'Flight-tracked private cab from Dabok Airport straight onto NH-27.' },
      { to: '/udaipur-to-chittorgarh-day-trip', title: 'Udaipur to Chittorgarh Day Trip', tag: 'Private Excursion', description: 'Zero-forced-shopping full-day excursion with English historian.' },
      { to: '/delhi-airport-to-chittorgarh', title: 'Delhi IGI Airport (DEL) to Chittorgarh', tag: 'Arrival Guide', description: 'Domestic flight hop to UDR or overnight Mewar/Chetak Express.' },
      { to: '/chittorgarh-fort-timings-tickets', title: 'ASI Foreign & SAARC Ticket Fees', tag: 'Tickets', description: 'Verify ₹600 Foreign / ₹40 SAARC fees, camera rules & Light Show.' },
      { to: '/rajasthan-heritage-tour-chittorgarh', title: 'UNESCO Hill Forts Rajasthan Tour', tag: 'Grand Circuit', description: 'Connect Jaipur, Chittorgarh, Kumbhalgarh, Udaipur & Jodhpur.' },
    );
  } else if (page.type === 'package') {
    links.push(
      { to: '/chittorgarh-1-day-tour', title: 'Chittorgarh 1-Day Fort Tour', tag: 'Full Day', description: 'Hour-by-hour fort plan covering 7 gates, Vijay Stambh & Padmini.' },
      { to: '/chittorgarh-2-days-tour', title: 'Chittorgarh 2-Day Heritage & Temple', tag: '2 Days', description: 'Fort + evening Light Show + Sanwariya Seth + Bassi Sanctuary.' },
      { to: '/chittorgarh-3-days-tour', title: 'Chittorgarh 3-Day Royal Expedition', tag: '3 Days', description: 'Deep exploration including Menal Waterfall & local craft artisans.' },
      { to: '/chittorgarh-fort', title: 'Chittorgarh Fort Visitor Manual', tag: 'Citadel Guide', description: 'History, entry fees, timings, photography & navigation inside.' },
      { to: '/service/guide', title: 'Authorized Mewari Historians', tag: 'Local Guides', description: 'Hire vetted government-licensed guides fluent in Hindi & English.' },
      { to: '/stays', title: 'Heritage Hotels & Resorts', tag: 'Stays', description: 'Verified Chittorgarh & Bassi accommodation options.' },
    );
  }

  return links.filter((l) => l.to !== `/${page.slug}`).slice(0, 6);
};

/**
 * Core pre-existing indexable public pages (used for directory, sitemap & prerendering)
 */
export const CORE_SITE_ROUTES = [
  {
    path: '/',
    title: 'Visit Chittorgarh | Official Rajasthan Heritage, Fort & Tourism Portal',
    description: "Plan your visit to Chittorgarh Fort — India's largest UNESCO citadel. Book verified Mewari guides, sanitized private cabs from Udaipur, heritage hotel stays & authentic tour packages.",
    changefreq: 'daily',
    priority: '1.0',
  },
  {
    path: '/destinations-and-routes',
    title: 'Chittorgarh Routes, Cities, States, Countries & Monuments Directory',
    description: 'Complete travel hub for Visit Chittorgarh: explore city-to-city road/rail routes, state guides, international arrival tips, monuments & tour packages.',
    changefreq: 'weekly',
    priority: '0.92',
  },
  {
    path: '/attractions',
    title: 'Tourist Attractions in Chittorgarh | Fort, Temples, Wildlife & Waterfalls',
    description: 'Explore top attractions across Chittorgarh including Chittorgarh Fort, Vijay Stambh, Padmini Palace, Sanwariya Seth Temple, Bassi Sanctuary & Menal Waterfall.',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/places-to-visit-in-chittorgarh',
    title: 'Top Places to Visit in Chittorgarh | Forts, Palaces & Sacred Shrines',
    description: 'Discover the must-visit landmarks in Chittorgarh with timings, historical context, distances & curated route tips.',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/chittorgarh-travel-guide',
    title: 'Chittorgarh Travel Guide | Complete Tourism, Fort, Stays & Tips',
    description: 'The ultimate Chittorgarh travel guide. Plan your trip with insights on reaching by air/rail/road, best seasons, fort entry fees, guides, food, and stays.',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/royal-journeys',
    title: 'Chittorgarh Tour Packages | Curated Mewar Heritage Itineraries',
    description: 'Browse curated 1-day, 2-day, and 3-day Chittorgarh Fort & Rajasthan heritage tour packages with authorized guides and private AC cabs.',
    changefreq: 'weekly',
    priority: '0.92',
  },
  {
    path: '/chittorgarh-1-day-tour',
    title: 'Chittorgarh One Day Tour | Itinerary, Sightseeing & Private Guide',
    description: 'The ultimate 1-day Chittorgarh Fort sightseeing tour. Hourly itinerary covering 7 gates, Vijay Stambh, Padmini Palace, Mewari lunch & Light show.',
    changefreq: 'weekly',
    priority: '0.90',
  },
  {
    path: '/chittorgarh-2-days-tour',
    title: 'Chittorgarh Two Days Tour Package | Fort, Sanwariya Seth & Bassi',
    description: 'Curated 2-day Chittorgarh itinerary covering Fort, evening Light & Sound show, heritage stay, Sanwariya Seth Temple & Bassi Wildlife Sanctuary.',
    changefreq: 'weekly',
    priority: '0.90',
  },
  {
    path: '/chittorgarh-3-days-tour',
    title: 'Chittorgarh Three Days Tour Package | Royal Heritage & Menal Circuit',
    description: 'Complete 3-day Chittorgarh expedition covering the UNESCO Fort, Menal Waterfall, Bassi Sanctuary, Thewa art artisans & Mewar villages.',
    changefreq: 'weekly',
    priority: '0.88',
  },
  {
    path: '/service/guide',
    title: 'Authorized Tour Guides in Chittorgarh Fort | Multi-Lingual Historians',
    description: 'Hire government-verified, licensed Mewari tour guides at Chittorgarh Fort fluent in English, Hindi & regional/international languages.',
    changefreq: 'weekly',
    priority: '0.92',
  },
  {
    path: '/service/taxi',
    title: 'Private Taxi & Cab Rental in Chittorgarh | Sedan, Innova & Tempo',
    description: 'Book clean air-conditioned private taxis in Chittorgarh for full-fort loops, Udaipur Airport (UDR) transfers, and Sanwariya Seth Temple.',
    changefreq: 'weekly',
    priority: '0.92',
  },
  {
    path: '/udaipur-to-chittorgarh-taxi',
    title: 'Udaipur to Chittorgarh Taxi Service | Cabs, Fare & Day Trips',
    description: 'Book private taxi from Udaipur to Chittorgarh Fort. Clean AC Sedans, Innova Crysta & Tempo Travellers with doorstep hotel & airport pickup.',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/udaipur-to-chittorgarh-day-trip',
    title: 'Udaipur to Chittorgarh Day Trip | Private AC Car & Heritage Guide',
    description: 'Book a hassle-free private day excursion from Udaipur to Chittorgarh Fort with hotel pickup, English historian, AC cab & zero forced shopping.',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/chittorgarh-fort-timings-tickets',
    title: 'Chittorgarh Fort Timings, Entry Fees & Tickets (2026 Official Guide)',
    description: 'Complete guide to Chittorgarh Fort ticket prices for Indian and foreign tourists, opening hours, light & sound show timings & guide booking.',
    changefreq: 'weekly',
    priority: '0.95',
  },
  {
    path: '/udaipur-to-jaipur-via-chittorgarh-tour',
    title: 'Udaipur to Jaipur via Chittorgarh Tour | Private Cab & Stopover',
    description: 'Turn your Udaipur–Jaipur transfer into a curated heritage stopover at Chittorgarh Fort with safe luggage storage and authorized local guides.',
    changefreq: 'weekly',
    priority: '0.92',
  },
  {
    path: '/jaipur-to-chittorgarh-taxi',
    title: 'Jaipur to Chittorgarh Taxi Service | Outstation Cab & Heritage Transfer',
    description: 'Book reliable private AC cabs from Jaipur to Chittorgarh Fort along the Kishangarh–Bhilwara expressway with flexible sightseeing stops.',
    changefreq: 'weekly',
    priority: '0.88',
  },
  {
    path: '/how-to-reach',
    title: 'How to Reach Chittorgarh | Train (COR), Udaipur Airport (UDR) & Road',
    description: 'Plan how to reach Chittorgarh by Indian Railways, Maharana Pratap Airport Udaipur (UDR), RSRTC buses & 4-lane NH-27/NH-48 highways.',
    changefreq: 'monthly',
    priority: '0.88',
  },
  {
    path: '/stays',
    title: 'Heritage Hotels & Resorts in Chittorgarh | Verified Stays',
    description: 'Browse verified heritage havelis, fort-road hotels, and peaceful Bassi countryside stays in Chittorgarh.',
    changefreq: 'weekly',
    priority: '0.88',
  },
  {
    path: '/flavors',
    title: 'Traditional Mewari Food in Chittorgarh | Dal Baati Churma & Dining',
    description: 'Discover authentic Mewari Dal Baati Churma, Gatte ki Sabzi, Mirchi Bada & hygienic vegetarian restaurants in Chittorgarh.',
    changefreq: 'weekly',
    priority: '0.88',
  },
  {
    path: '/vocal-for-local',
    title: 'Vocal for Local Chittorgarh | Thewa Art, Akola Print & Bassi Crafts',
    description: 'Support authentic Chittorgarh artisans practicing Pratapgarh Thewa gold art, Akola indigo block printing, and Bassi wood carving.',
    changefreq: 'monthly',
    priority: '0.82',
  },
  {
    path: '/mission-services',
    title: 'About Visit Chittorgarh | Local Concierge, Guides & ChittorTech Mission',
    description: 'Learn how ChittorTech and Visit Chittorgarh empower authorized Mewari historians, clean transport & heritage preservation.',
    changefreq: 'monthly',
    priority: '0.80',
  },
  {
    path: '/blog',
    title: 'Visit Chittorgarh Travel Blog | Guides, Stories & Mewar History',
    description: 'In-depth Chittorgarh travel articles, architectural insights, seasonal guides & itinerary planning tips.',
    changefreq: 'weekly',
    priority: '0.90',
  },
  {
    path: '/terms',
    title: 'Terms, Privacy & Cancellation Guidelines | Visit Chittorgarh',
    description: 'Service terms, transparency policy & cancellation guidelines for Visit Chittorgarh concierge inquiries.',
    changefreq: 'monthly',
    priority: '0.50',
  },
  {
    path: '/feedback',
    title: 'Traveler Feedback & Experience Reviews | Visit Chittorgarh',
    description: 'Share your Chittorgarh Fort tour experience and guide feedback with the Visit Chittorgarh concierge team.',
    changefreq: 'monthly',
    priority: '0.55',
  },
];

