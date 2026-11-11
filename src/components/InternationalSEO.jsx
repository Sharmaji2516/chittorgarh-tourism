import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * InternationalSEO — Full 195+ Country Target Engine & Comprehensive Keyword Matrix
 */
export const GLOBAL_COUNTRIES = [
  "AF", "AL", "DZ", "AD", "AO", "AG", "AR", "AM", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BT",
  "BO", "BA", "BW", "BR", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "CF", "TD", "CL", "CN", "CO", "KM", "CG", "CD",
  "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FJ", "FI", "FR",
  "GA", "GM", "GE", "DE", "GH", "GR", "GD", "GT", "GN", "GW", "GY", "HT", "HN", "HU", "IS", "IN", "ID", "IR", "IQ", "IE",
  "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT",
  "LU", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MR", "MU", "MX", "FM", "MD", "MC", "MN", "ME", "MA", "MZ", "MM", "NA",
  "NR", "NP", "NL", "NZ", "NI", "NE", "NG", "NO", "OM", "PK", "PW", "PA", "PG", "PY", "PE", "PH", "PL", "PT", "QA", "RO",
  "RU", "RW", "KN", "LC", "VC", "WS", "SM", "ST", "SA", "SN", "RS", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "ES",
  "LK", "SD", "SR", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TO", "TT", "TN", "TR", "TM", "TV", "UG",
  "UA", "AE", "GB", "US", "UY", "UZ", "VU", "VA", "VE", "VN", "YE", "ZM", "ZW"
];

export const INTERNATIONAL_KEYWORDS = [
  "Chittorgarh Tourism",
  "Chittorgarh Fort Guide",
  "Visit Chittorgarh Fort India",
  "Chittorgarh Tourism for Foreign Tourists",
  "Rajasthan Heritage Tours USA UK Europe Canada Australia",
  "Foreign Tourist Entry Ticket Chittorgarh Fort",
  "Best Heritage Hotels in Chittorgarh",
  "Mewari Tour Guides English Speaking",
  "Udaipur to Chittorgarh Road Trip Guide",
  "Vijay Stambh Padmini Palace Tour",
  "Sanwariya Seth Temple Taxi Service",
  "Chittorgarh Fort Sound Light Show Timing Ticket",
  "Rajasthan UNESCO World Heritage Forts Tour",
  "India Heritage Tourism Guide",
  "Luxury Stay Chittorgarh Fort View",
  "Chittorgarh Private Taxi Booking",
  "Best Restaurants and Dining Chittorgarh",
  "Chittorgarh Itinerary 1 Day 2 Days",
  "Chittorgarh Local Handicrafts Leather Craft",
  "Rajasthan Tourism Packages Foreign Travelers"
].join(", ");

export const INTERNATIONAL_SCHEMAS = [
  {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Visit Chittorgarh International Portal",
    "url": "https://www.visitchittorgarh.in/",
    "image": "https://www.visitchittorgarh.in/Fort.webp",
    "description": "Official global tourism guide for Chittorgarh Fort, Rajasthan, India. Serving international tourists with guided tours, transport, heritage stays, and custom travel itineraries.",
    "knowsLanguage": ["English", "Hindi"],
    "priceRange": "$$"
  },
  {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Chittorgarh Fort UNESCO World Heritage Site",
    "description": "India's largest fort complex located in Chittorgarh, Rajasthan. Featuring Vijay Stambh, Kirti Stambh, Padmini Palace, Meera Temple, and ancient Mewari Rajput heritage.",
    "url": "https://www.visitchittorgarh.in/",
    "audience": {
      "@type": "Audience",
      "audienceType": "International Tourists & Heritage Travelers"
    },
    "touristType": [
      "Heritage Tourist",
      "Cultural Tourist",
      "Pilgrimage Tourist",
      "International Backpacker",
      "Luxury Heritage Explorer"
    ],
    "includesAttraction": [
      {
        "@type": "TouristAttraction",
        "name": "Chittorgarh Fort",
        "url": "https://www.visitchittorgarh.in/chittorgarh-fort"
      },
      {
        "@type": "TouristAttraction",
        "name": "Vijay Stambh (Tower of Victory)",
        "url": "https://www.visitchittorgarh.in/vijay-stambh"
      },
      {
        "@type": "TouristAttraction",
        "name": "Rani Padmini Palace",
        "url": "https://www.visitchittorgarh.in/rani-padmini-palace"
      },
      {
        "@type": "TouristAttraction",
        "name": "Sanwariya Seth Temple",
        "url": "https://www.visitchittorgarh.in/sanwariya-seth-temple"
      }
    ]
  }
];

const InternationalSEO = () => {
  return (
    <Helmet>
      {INTERNATIONAL_SCHEMAS.map((schemaObj, idx) => (
        <script key={`intl-schema-${idx}`} type="application/ld+json">
          {JSON.stringify(schemaObj)}
        </script>
      ))}
    </Helmet>
  );
};

export default InternationalSEO;
