/**
 * Centralized Tour Packages & Itinerary SEO Data for Visit Chittorgarh
 * Note: Existing standalone pages (/chittorgarh-1-day-tour, /chittorgarh-2-days-tour,
 * /chittorgarh-3-days-tour) are preserved at their exact URLs and registered here for cross-linking.
 */

export const EXISTING_PACKAGE_PAGES = [
  {
    slug: 'chittorgarh-1-day-tour',
    name: 'Chittorgarh One Day Tour',
    duration: '1 Full Day (~8–10 Hours)',
    seoTitle: 'Chittorgarh One Day Tour | Itinerary, Sightseeing & Private Guide',
    metaDescription: 'The ultimate 1-day Chittorgarh Fort sightseeing tour. Hourly itinerary covering 7 gates, Vijay Stambh, Padmini Palace, Mewari lunch & Light show.',
    h1: 'Chittorgarh One Day Tour',
  },
  {
    slug: 'chittorgarh-2-days-tour',
    name: 'Chittorgarh Two Day Tour',
    duration: '2 Days / 1 Night',
    seoTitle: 'Chittorgarh Two Days Tour Package | Fort, Sanwariya Seth & Bassi',
    metaDescription: 'Curated 2-day Chittorgarh itinerary covering Fort, evening Light & Sound show, heritage stay, Sanwariya Seth Temple & Bassi Wildlife Sanctuary.',
    h1: 'Chittorgarh Two Day Tour',
  },
  {
    slug: 'chittorgarh-3-days-tour',
    name: 'Chittorgarh Three Day Tour',
    duration: '3 Days / 2 Nights',
    seoTitle: 'Chittorgarh Three Days Tour Package | Royal Heritage & Menal Circuit',
    metaDescription: 'Complete 3-day Chittorgarh expedition covering the UNESCO Fort, Menal Waterfall, Bassi Sanctuary, Thewa art artisans & Mewar villages.',
    h1: 'Chittorgarh Three Day Tour',
  },
];

export const TOUR_PACKAGES_SEO = [
  {
    slug: 'udaipur-and-chittorgarh-tour-package',
    name: 'Udaipur and Chittorgarh Tour Package',
    badge: 'Twin Mewar Heritage Circuit',
    duration: '2 to 4 Days (Customizable)',
    seoTitle: 'Udaipur & Chittorgarh Tour Package | Private Cab, Guide & Stays',
    metaDescription: 'Explore royal Mewar with a private Udaipur & Chittorgarh tour package. Combines Lake Pichola, City Palace & 700-acre Chittorgarh Fort via NH-27 with local guides.',
    primaryKeyword: 'Udaipur and Chittorgarh tour package',
    secondaryKeywords: ['Mewar heritage tour', 'Udaipur Chittorgarh itinerary', 'Udaipur to Chittorgarh private tour'],
    h1: 'Udaipur & Chittorgarh Tour Package — Royal Mewar Trail',
    heroImage: '/assets/images/chittorgarh-fort-new.webp',
    imageAlt: 'Chittorgarh Fort citadel and palaces paired with Mewar royal circuit from Udaipur',
    intro: 'Combining Udaipur (the romantic City of Lakes founded by Maharana Udai Singh in 1559) with Chittorgarh (the ancient citadel of Mewar where Udai Singh was born) creates Rajasthan’s most cohesive historical journey. Linked by a smooth ~110-km four-lane stretch of NH-27, both cities seamlessly share hotels, guides, and spiritual shrines like Eklingji, Nathdwara, and Sanwariya Seth.',
    idealFor: 'Couples, cultural travelers, international visitors flying into UDR, and families seeking both lakeside leisure and monumental history.',
    highlights: [
      'Private AC Sedan, Innova Crysta, or Tempo Traveller across the Udaipur–Chittorgarh corridor',
      'Authorized English/Hindi Mewari historian inside Chittorgarh Fort',
      'Optional en-route darshan at Shri Sanwariya Seth Temple (Mandaphiya) or Shrinathji (Nathdwara)',
      'Zero forced shopping guarantee — strictly authentic sightseeing & Mewari dining',
    ],
    itinerary: [
      {
        day: 'Day 1: Udaipur Royal Lakes & Old City',
        plan: 'Explore Udaipur City Palace, Jagdish Temple, Lake Pichola sunset boat cruise, and Bagore Ki Haveli cultural folk dance evening.',
      },
      {
        day: 'Day 2: Udaipur → Chittorgarh Fort Citadel (~110 km / ~2 hrs)',
        plan: 'Morning drive via NH-27 to Chittorgarh Fort. Tour all 7 Pol gates, Rana Kumbha Palace, Meera Temple, Vijay Stambh, Gaumukh Kund, and Rani Padmini Palace. Stay overnight at a Chittorgarh heritage property after the evening Light & Sound Show—or return evening to Udaipur.',
      },
      {
        day: 'Day 3: Sanwariya Seth Darshan / Bassi & Return to Udaipur',
        plan: 'Morning visit to Shri Sanwariya Seth Temple in Mandaphiya (~40 km) and Fateh Prakash Palace Museum before comfortable drop at Udaipur Hotel or Maharana Pratap Airport (UDR).',
      },
    ],
    inclusions: ['Private AC Vehicle with Chauffeur', 'Fuel, Toll & Parking Transparency', 'Verified Chittorgarh Fort Guide', 'Customizable Heritage Stay Options'],
    exclusions: ['ASI Monument Entry Tickets & Camera Fees', 'Meals & Personal Expenses', 'Flight / Train Tickets'],
    faqs: [
      {
        q: 'Can this Udaipur and Chittorgarh tour start with pickup at Udaipur Airport (UDR)?',
        a: 'Yes! Maharana Pratap Airport (UDR) lies east of Udaipur directly on the Chittorgarh side—making airport-to-Chittorgarh transfers faster (~90 km / ~1.75 hours).',
      },
      {
        q: 'Is 1 night in Chittorgarh better than returning to Udaipur the same evening?',
        a: 'Staying 1 night in Chittorgarh lets you watch the evening Sound & Light Show atop Kumbha Palace without a late-night highway drive and explore Bassi or Sanwariya Seth comfortably next morning.',
      },
      {
        q: 'Can Eklingji and Haldighati be added?',
        a: 'Yes, Eklingji, Nathdwara, Kumbhalgarh, and Haldighati can easily be added as a 4-day Greater Mewar itinerary.',
      },
      {
        q: 'How are quotes calculated?',
        a: 'Final quotations depend on travel dates, vehicle class (Sedan, SUV, or Tempo Traveller), and whether hotel accommodation is included. Share your group size on WhatsApp for a transparent breakdown.',
      },
    ],
  },
  {
    slug: 'jaipur-udaipur-and-chittorgarh-tour',
    name: 'Jaipur, Udaipur & Chittorgarh Tour',
    badge: 'Grand Rajasthan Royal Triangle',
    duration: '5 to 7 Days (Flexible)',
    seoTitle: 'Jaipur Udaipur Chittorgarh Tour Package | Heritage Circuit Route',
    metaDescription: 'Explore Rajasthan’s best royal triangle—Jaipur’s Amber Fort, Chittorgarh’s 700-acre UNESCO citadel & Udaipur’s lakes with private chauffeur cab and local guides.',
    primaryKeyword: 'Jaipur Udaipur Chittorgarh tour',
    secondaryKeywords: ['Rajasthan heritage circuit', 'Jaipur to Udaipur via Chittorgarh', 'Pink City to Mewar tour'],
    h1: 'Jaipur, Udaipur & Chittorgarh Tour — Classic Rajasthan Circuit',
    heroImage: '/assets/images/Fort.webp',
    imageAlt: 'Chittorgarh Fort linking Jaipur and Udaipur along Rajasthan’s royal heritage circuit',
    intro: 'Positioned geographically right along the Jaipur–Udaipur highway corridor (~315 km south of Jaipur and ~110 km east of Udaipur), Chittorgarh transforms the standard Pink City–Lake City transfer into a dramatic historical trilogy. Instead of rushing past Rajasthan’s largest fort, spend dedicated hours exploring Mewar’s capital en route.',
    idealFor: 'First-time visitors to Rajasthan, families flying into Jaipur (JAI) and departing via Udaipur (UDR) or Delhi.',
    highlights: [
      'Seamless multi-city cab circuit with safe locked-trunk luggage handling during Fort stopovers',
      'Optional Ajmer–Pushkar or Bundi heritage detours between Jaipur and Chittorgarh',
      'Dedicated licensed historian guide waiting at Chittorgarh Fort Ram Pol gate',
      'Flexible start from Jaipur Airport/Railway Station and finish in Udaipur (or reverse)',
    ],
    itinerary: [
      {
        day: 'Days 1–2: Jaipur (Pink City Highlights)',
        plan: 'Amber Fort, Hawa Mahal, City Palace, Jantar Mantar, and evening Rajasthani cultural dinner.',
      },
      {
        day: 'Day 3: Jaipur → Pushkar/Ajmer → Chittorgarh (~315–340 km)',
        plan: 'Morning departure via NH-48 / Kishangarh-Bhilwara corridor with optional Brahma Temple (Pushkar) break, reaching Chittorgarh by afternoon for sunset rampart views and Light & Sound Show.',
      },
      {
        day: 'Day 4: Chittorgarh Fort Deep Dive → Udaipur (~110 km)',
        plan: 'Guided morning tour of Rana Kumbha Palace, Vijay Stambh, Kirti Stambh, Kalika Mata Temple, and Rani Padmini Palace, followed by lunch and smooth 2-hour highway drive to Udaipur.',
      },
      {
        day: 'Days 5–6: Udaipur Lakes, Palaces & Departure',
        plan: 'Lake Pichola boat ride, City Palace, Sajjangarh Monsoon Palace, and drop at Udaipur Airport (UDR) or Station.',
      },
    ],
    inclusions: ['Point-to-Point AC Tourist Vehicle', 'Authorized Guide at Chittorgarh Fort', 'Custom Route Planning'],
    exclusions: ['Monument Tickets, Meals & Hotels (unless package stay chosen)'],
    faqs: [
      {
        q: 'Which direction is better: Jaipur to Udaipur via Chittorgarh or Udaipur to Jaipur?',
        a: 'Both work equally well! Flying into Jaipur and departing from Udaipur avoids backtracking over the same 425-km highway.',
      },
      {
        q: 'What happens to our suitcases while touring Chittorgarh Fort?',
        a: 'With our dedicated private cab service, your luggage stays safely locked inside the vehicle trunk attended by your verified driver while you explore each monument.',
      },
      {
        q: 'Can we break the drive with Bundi or Kumbhalgarh?',
        a: 'Yes! Bundi (stepwells & Taragarh) sits ~150 km east of Chittorgarh, while Kumbhalgarh sits ~100 km west of Udaipur—ideal additions for 7-day schedules.',
      },
      {
        q: 'Are highway food stops clean and family-friendly?',
        a: 'Yes, our drivers know hygienic highway plazas along the Kishangarh–Bhilwara–Chittorgarh expressway.',
      },
    ],
  },
  {
    slug: 'rajasthan-heritage-tour-chittorgarh',
    name: 'Rajasthan Heritage Tour Featuring Chittorgarh',
    badge: 'UNESCO Hill Forts & Royal Trails',
    duration: '6 to 10 Days (Tailored)',
    seoTitle: 'Rajasthan Heritage Tour | Chittorgarh, Udaipur, Kumbhalgarh & Jodhpur',
    metaDescription: 'Tailor-made Rajasthan heritage tour featuring UNESCO Hill Forts—Chittorgarh, Kumbhalgarh, Jaipur & Jodhpur—guided by local regional experts.',
    primaryKeyword: 'Rajasthan heritage tour Chittorgarh',
    secondaryKeywords: ['UNESCO Hill Forts of Rajasthan tour', 'Rajasthan fort circuit package', 'Mewar Marwar heritage tour'],
    h1: 'Rajasthan Heritage Tour — UNESCO Hill Forts of Mewar & Beyond',
    heroImage: '/assets/images/vijay-stambh-new.webp',
    imageAlt: 'Vijay Stambh inside UNESCO-listed Chittorgarh Fort anchoring a Rajasthan heritage tour',
    intro: 'In 2013 UNESCO inscribed six Hill Forts of Rajasthan—Chittorgarh, Kumbhalgarh, Amber (Jaipur), Ranthambore, Gagron, and Jaisalmer—for illustrating Rajput defensive architecture and court culture. Our Rajasthan Heritage Tour places Chittorgarh Fort at the historical foundation of your Mewar–Marwar journey.',
    idealFor: 'History enthusiasts, architecture buffs, photographers, and international guests wanting deep narrative continuity across Rajputana dynasties.',
    highlights: [
      'UNESCO Hill Forts narrative connecting Chittorgarh (Sisodia Mewar) with Kumbhalgarh and Mehrangarh (Marwar)',
      'Authentic regional stays (heritage havelis, fort-view boutique retreats)',
      'Local craft encounters: Akola Indigo print, Bassi wooden toys & Pratapgarh Thewa gold art',
      'Private AC transport and vetted regional historians',
    ],
    itinerary: [
      {
        day: 'Phase 1: Jaipur (Amber Fort & Pink City)',
        plan: 'Begin with Amber’s hilltop ramparts and royal observatories before travelling south into Mewar.',
      },
      {
        day: 'Phase 2: Chittorgarh (Citadel of Valor & Menal/Baroli)',
        plan: 'Two immersive nights exploring Chittorgarh Fort’s 700-acre ruins, Fateh Prakash Museum, Menal’s 11th-century canyon temples, and local Mewari crafts.',
      },
      {
        day: 'Phase 3: Udaipur & Kumbhalgarh (Great Wall of India)',
        plan: 'Visit Eklingji, Udaipur palaces, Ranakpur Jain Marble Temples, and Kumbhalgarh Fort—where Maharana Pratap was born after Chittor.',
      },
      {
        day: 'Phase 4: Jodhpur (Mehrangarh) or Jaisalmer',
        plan: 'Continue across the Aravallis into Marwar’s Blue City for Mehrangarh Fort before rail/air departure.',
      },
    ],
    inclusions: ['Custom Multi-Day Route Architecture', 'Dedicated Private AC Cab', 'Chittorgarh Authorized Historian'],
    exclusions: ['ASI Fees, Safaris, Domestic Flights & Meals unless bundled'],
    faqs: [
      {
        q: 'Why should Chittorgarh be visited before Kumbhalgarh and Udaipur?',
        a: 'Chronologically, Chittorgarh was the original Sisodia capital before Maharana Udai Singh moved to Udaipur and Maharana Pratap operated out of Kumbhalgarh—visiting in sequence makes Rajasthan history click.',
      },
      {
        q: 'What is the best season for a full Rajasthan Heritage Tour?',
        a: 'Mid-October through mid-March provides crisp daytime touring weather across Jaipur, Chittorgarh, Udaipur, and Jodhpur.',
      },
      {
        q: 'Can older travelers do the UNESCO forts comfortably?',
        a: 'Yes—both Chittorgarh and Amber allow vehicle access near main monuments, and we pace daily drives below 4–5 hours.',
      },
      {
        q: 'Do you assist international visitors with hotel and train logistics?',
        a: 'Yes, our local concierge coordinates verified boutique stays, cab connections, and fort ticketing guidance.',
      },
    ],
  },
  {
    slug: 'chittorgarh-family-tour',
    name: 'Chittorgarh Family Tour Package',
    badge: 'Kid-Friendly & Senior-Accessible',
    duration: '1 to 2 Days',
    seoTitle: 'Chittorgarh Family Tour | Senior-Friendly Cab, Fort & Sanctuary',
    metaDescription: 'Stress-free Chittorgarh family tour with air-conditioned door-to-door cab, kid-friendly fort storytelling, museum visit, Dal Baati lunch & senior comfort.',
    primaryKeyword: 'Chittorgarh family tour',
    secondaryKeywords: ['Chittorgarh tour for family and seniors', 'kid friendly Chittorgarh itinerary', 'family trip Chittorgarh'],
    h1: 'Chittorgarh Family Tour — Comfortable Heritage & Nature Trip',
    heroImage: '/assets/images/padmini-palace-new.webp',
    imageAlt: 'Families exploring calm lotus-pool gardens of Rani Padmini Palace inside Chittorgarh Fort',
    intro: 'Chittorgarh Fort is 5 kilometers long—trying to navigate it in autos or on foot with children and elderly parents quickly turns exhausting. Our Family Tour solves that with a cool air-conditioned private vehicle parked steps from every monument, engaging storytelling guides, clean dining stops, and optional wildlife/temple visits.',
    idealFor: 'Multigenerational families, school-holiday travelers, and weekend family groups from Gujarat, MP, Delhi, and Rajasthan.',
    highlights: [
      'Minimal walking required—private car drops you right beside Padmini Palace, Kumbha Palace & Vijay Stambh lawns',
      'Child-friendly historical storytelling bringing Panna Dhai, Maharana Pratap & Chetak tales alive',
      'Pure-veg, Jain & mild spice Mewari family lunch options at verified hygienic restaurants',
      'Optional evening Light & Sound Show + next-morning deer spotting at Bassi Wildlife Sanctuary',
    ],
    itinerary: [
      {
        day: 'Morning (09:00 AM–01:00 PM): Relaxed Fort Highlights by Car',
        plan: 'Drive through all 7 historic gates, explore Fateh Prakash Museum’s royal weapons gallery, Rana Kumbha Palace, and Vijay Stambh gardens with plenty of shaded rest breaks.',
      },
      {
        day: 'Afternoon (01:00 PM–05:30 PM): Authentic Family Lunch & Padmini Palace',
        plan: 'Enjoy authentic hygienic Mewari thali in town, followed by unhurried afternoon visits to Kalika Mata Temple and Rani Padmini’s lotus-pool palace.',
      },
      {
        day: 'Evening / Day 2 Optional: Light Show + Sanwariya Seth / Bassi',
        plan: 'Watch the captivating audio-visual Light & Sound Show (seats provided) and add Shri Sanwariya Seth Temple darshan or Bassi dam picnic the next day.',
      },
    ],
    inclusions: ['Door-to-Door AC Family Car (Sedan/Innova/Tempo)', 'Patient Family-Friendly Certified Guide', 'Curated Rest & Dining Recommendations'],
    exclusions: ['Monument Entry Tickets (Note: Kids under 15 enter ASI sites free!)', 'Meals & Stays'],
    faqs: [
      {
        q: 'Do children under 15 need an ASI ticket at Chittorgarh Fort?',
        a: 'No! Under ASI rules, children below 15 years enter Chittorgarh Fort free of charge.',
      },
      {
        q: 'How much walking is needed for elderly grandparents?',
        a: 'Very little—your private vehicle drives across the entire fort plateau and stops right near each palace entrance, allowing seniors to skip steep stairs while enjoying major views.',
      },
      {
        q: 'Is pure vegetarian / Jain food easy to find in Chittorgarh?',
        a: 'Yes, Chittorgarh is renowned for pure-vegetarian Marwari and Jain dining options.',
      },
      {
        q: 'What vehicle is best for a family of 5–6?',
        a: 'A 7-seater Toyota Innova Crysta or Maruti Ertiga gives comfortable legroom and luggage space.',
      },
    ],
  },
  {
    slug: 'chittorgarh-couple-tour',
    name: 'Chittorgarh Couple Tour & Heritage Retreat',
    badge: 'Boutique Stays & Sunset Views',
    duration: '2 Days / 1 Night',
    seoTitle: 'Chittorgarh Couple Tour | Boutique Fort Stays, Sunset & Private Cab',
    metaDescription: 'Plan a serene romantic heritage getaway in Chittorgarh. Boutique haveli stay, golden-hour fort viewpoints, Padmini Palace, Menal canyon & candlelit Mewari dining.',
    primaryKeyword: 'Chittorgarh couple tour',
    secondaryKeywords: ['Chittorgarh weekend getaway for couples', 'heritage stays Chittorgarh', 'romantic sunset points Chittorgarh Fort'],
    h1: 'Chittorgarh Couple Tour — Golden Sunset Over Mewar Ramparts',
    heroImage: '/assets/images/gaumukh-reservoir4.webp',
    imageAlt: 'Golden sunset light reflecting over emerald waters of Gaumukh Reservoir at Chittorgarh Fort',
    intro: 'Away from the crowded tourist bazaars of bigger cities, Chittorgarh rewards couples with serene lotus-filled water pavilions, panoramic cliffside sunset parapets over Gaumukh Kund, intimate heritage castle/haveli stays in nearby Bassi or Chittorgarh, and unhurried private sightseeing.',
    idealFor: 'Couples travelling from Udaipur, Jaipur, Ahmedabad, or Mumbai seeking an atmospheric 2-day heritage retreat.',
    highlights: [
      'Private chauffeur-driven sedan for complete privacy and unhurried schedule flexibility',
      'Curated sunset timing at Rani Padmini Palace lotus pavilion & Gaumukh cliffside bastion',
      'Boutique heritage stay recommendations around Chittorgarh & Bassi',
      'Optional half-day scenic excursion to Menal Waterfall & Bassi reservoir',
    ],
    itinerary: [
      {
        day: 'Day 1: Afternoon Heritage Arrival, Sunset Ramparts & Sound Show',
        plan: 'Check into your heritage hotel, explore Kirti Stambh and Rani Padmini Palace in calm afternoon light, catch sunset views from the western fort walls, and attend the evening Sound & Light Show.',
      },
      {
        day: 'Day 2: Dawn Fort Walk, Meera Temple & Nature Excursion',
        plan: 'Quiet early-morning walk beside Meera Temple and Gaumukh Kund before day-trippers arrive, followed by breakfast and a tranquil drive to Bassi Wildlife Sanctuary or Menal Gorge.',
      },
    ],
    inclusions: ['Private AC Sedan with Verified Driver', 'Optional Private Historian Guide', 'Curated Boutique Stay & Cafe Guidance'],
    exclusions: ['Accommodation Tariff (unless booked together)', 'Tickets & Meals'],
    faqs: [
      {
        q: 'When is the fort quietest and most scenic for couples?',
        a: 'Between 06:30 AM and 09:00 AM, and again after 04:30 PM toward sunset, when large tour buses depart back to Udaipur.',
      },
      {
        q: 'Are couple-friendly heritage hotels available in Chittorgarh?',
        a: 'Yes, several respected heritage hotels, resorts near Fort Road, and restored Bassi properties welcome couples with valid government ID.',
      },
      {
        q: 'Can we book a traditional fort photoshoot or horse photography?',
        a: 'Yes, our concierge can arrange verified local heritage photographers at scenic viewpoints atop the fort.',
      },
      {
        q: 'What is the best time of year for a couple trip?',
        a: 'August–October (lush green monsoon hills & Menal falls) and November–February (pleasant chilly evenings and warm sunshine).',
      },
    ],
  },
  {
    slug: 'chittorgarh-historical-tour',
    name: 'Chittorgarh Deep Historical & Architecture Tour',
    badge: 'Historian-Led Deep Dive',
    duration: 'Full Day (6–7 Hours on Citadel)',
    seoTitle: 'Chittorgarh Historical Tour | Deep Dive with Licensed Historians',
    metaDescription: 'In-depth Chittorgarh historical tour covering the 3 great sieges, Solanki Jain & Pratihara temples, Vijay Stambh iconography, Nagari relics & 22 water reservoirs.',
    primaryKeyword: 'Chittorgarh historical tour',
    secondaryKeywords: ['Chittorgarh Fort history tour', 'authorized historian guide Chittorgarh', 'Mewar architecture tour'],
    h1: 'Chittorgarh Historical Tour — 1,300 Years of Rajputana Valor',
    heroImage: '/assets/images/kumbha-palace-new.webp',
    imageAlt: 'Carved 15th-century stone arches and balconies of Rana Kumbha Palace on a historical study tour',
    intro: 'Standard quick stops barely scratch 15% of Chittorgarh’s 65 historic structures. Designed for history buffs, researchers, and curious travelers, this deep historical circuit traces Chittorgarh’s evolution from ancient Madhyamika (Nagari) and 8th-century Mori/Pratihara shrines through Rana Kumbha’s Golden Age, three historic sieges, and medieval Rajput water engineering.',
    idealFor: 'History aficionados, university groups, cultural journalists, photographers, and repeat Rajasthan travelers.',
    highlights: [
      'Senior government-licensed historian skilled in Mewar inscriptions, siege topography & architecture',
      'Covers lesser-visited sites: 8th-century Kalika Mata Surya frieze, Samadhisvara Paramara Temple, Jauhar Sthal (Mahasati) & Jaimal-Patta Haveli ruins',
      'Detailed study of Fateh Prakash Museum Nagari excavations & Badoli relics',
      'Extended walk along northern Suraj Pol and eastern rampart batteries',
    ],
    itinerary: [
      {
        day: 'Session 1 (08:00 AM–11:30 AM): Fortification & Early Medieval Core',
        plan: 'Analyze all 7 Pol gates’ defensive bends, Jaimal–Patta chhatris, Rana Kumbha Palace cellars, Fateh Prakash archaeological museum, and 8th-century Kalika Mata Sun Temple carvings.',
      },
      {
        day: 'Session 2 (11:30 AM–01:30 PM): Stambhs, Water Engineering & Jain Heritage',
        plan: 'Iconographic breakdown of Vijay Stambh and 12th-century Solanki Kirti Stambh, plus medieval siege hydraulics at Gaumukh Kund and Kukdeshwar reservoirs.',
      },
      {
        day: 'Session 3 (02:30 PM–06:30 PM): Padmini Complex, Siege Geography & Nagari Context',
        plan: 'Visit Rani Padmini Palace, Ratan Singh Palace ruins, western battery slopes from Akbar’s 1567–68 siege, concluding at Kumbha Palace for the historical Sound & Light narrative.',
      },
    ],
    inclusions: ['Senior Historian Guide (English / Hindi)', 'Private AC Vehicle Across Extended Fort Loop', 'Historical Reading Checklist'],
    exclusions: ['ASI Monument & State Museum Entry Fees', 'Meals & Personal Purchases'],
    faqs: [
      {
        q: 'How is this different from a regular 2-hour guide tour?',
        a: 'Regular tours visit 4–5 photo stops; our historical tour covers architectural timelines (Pratihara, Paramara, Solanki, Sisodia), military siege geometry, hydraulic tanks, and museum epigraphy over 6+ hours.',
      },
      {
        q: 'Does it include Nagari (Madhyamika) or Baroli?',
        a: 'Nagari (~18 km north of Chittorgarh) can easily be added as a 2-hour extension; Baroli pairs best on a dedicated second day.',
      },
      {
        q: 'Are English-speaking historians fluent in historical terminology?',
        a: 'Yes, we match historical-tour guests specifically with senior Rajasthan Tourism / ASI-approved guides.',
      },
      {
        q: 'Can we skip Fateh Prakash Museum on Mondays?',
        a: 'Yes—if your historical tour falls on a Monday (when the State Museum typically closes), we substitute Suraj Pol, Chonda/Bhimlat reservoirs, and Ratan Singh Palace.',
      },
    ],
  },
  {
    slug: 'chittorgarh-weekend-trip',
    name: 'Chittorgarh Weekend Trip (2 Days)',
    badge: 'Saturday–Sunday Escape',
    duration: '2 Days / 1 Night (Fri Night – Sun Evening)',
    seoTitle: 'Chittorgarh Weekend Trip | 2-Day Road & Rail Itinerary Guide',
    metaDescription: 'Plan a refreshing Saturday–Sunday weekend trip to Chittorgarh from Udaipur, Jaipur, Ahmedabad, Indore or Delhi. Overnight rail/highway plan, Fort, food & stays.',
    primaryKeyword: 'Chittorgarh weekend trip',
    secondaryKeywords: ['Chittorgarh 2 day weekend plan', 'weekend getaway from Udaipur Ahmedabad Indore', 'Saturday Sunday Chittorgarh itinerary'],
    h1: 'Chittorgarh Weekend Trip — Perfect 2-Day Heritage Escape',
    heroImage: '/assets/images/Light-and-sound-show.webp',
    imageAlt: 'Illuminated Chittorgarh Fort ruins during the weekend evening Light and Sound Show',
    intro: 'Connected by fast 4-lane expressways and convenient Friday-night sleeper trains from Delhi, Ahmedabad, Jaipur, Kota, and Indore, Chittorgarh makes an effortless Saturday–Sunday weekend getaway. Pack 700 acres of UNESCO history, soulful Mewari Dal Baati Churma, Shri Sanwariya Seth darshan, and golden fort sunsets into just two days off.',
    idealFor: 'Working professionals, friend groups, and weekend road-trippers across Rajasthan, Gujarat, MP, and Delhi NCR.',
    highlights: [
      'Built around Friday night train arrivals or Saturday early-morning highway departures',
      'Full Saturday fort circuit + evening Sound & Light Show',
      'Sunday morning Shri Sanwariya Seth Temple or Bassi Wildlife Sanctuary escape',
      'Zero wasted transit time with pre-arranged local station/hotel cab pickup',
    ],
    itinerary: [
      {
        day: 'Saturday: Early Arrival → Full Chittorgarh Fort + Sound & Light Show',
        plan: 'Arrive morning at Chittorgarh Junction (COR) or hotel. Check in, meet your guide at 09:00 AM for the 7-gate Fort circuit, savor Dal Baati lunch, visit Padmini Palace, and stay atop for the sunset & Light Show.',
      },
      {
        day: 'Sunday: Sanwariya Seth Temple / Bassi Dam + Local Crafts → Evening Return',
        plan: 'After breakfast, visit Shri Sanwariya Seth Temple (~40 km) or Bassi Wildlife Sanctuary (~25 km), pick up Akola indigo prints or authentic Mewari sweets, and catch evening train or highway drive home.',
      },
    ],
    inclusions: ['Local Sightseeing Cab (Sat–Sun)', 'Authorized Fort Guide', 'Customizable Station Pickup & Drop'],
    exclusions: ['Inter-City Train/Bus Tickets & Hotel Room', 'Entry Passes & Dining'],
    faqs: [
      {
        q: 'Which cities can easily do Chittorgarh as a 2-day weekend trip?',
        a: 'Udaipur, Bhilwara, Kota, Ajmer, Jaipur, Indore, Ujjain, Ahmedabad, Vadodara, and overnight-train travelers from Delhi/Mumbai all fit comfortably into a Sat–Sun schedule.',
      },
      {
        q: 'Is there an evening train back to Delhi or Jaipur on Sunday?',
        a: 'Overnight trains such as Mewar Express and Chetak Express depart Chittorgarh toward Delhi NCR in the evening, while evening trains & expressways serve Jaipur, Indore, and Udaipur—check live IRCTC schedules before booking.',
      },
      {
        q: 'Are luggage cloakrooms available if we skip booking a hotel for Day 2?',
        a: 'Yes, if you keep your private sightseeing cab for Sunday, suitcases travel safely locked in your cab boot until station drop-off.',
      },
      {
        q: 'Can friends split a cab cost on a weekend trip?',
        a: 'Yes! Booking a 4-seater Sedan or 6-seater Innova splits affordably among friends for full-weekend local transfers.',
      },
    ],
  },
];

