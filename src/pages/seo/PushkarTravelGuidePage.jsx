import React, { useState, useMemo } from 'react';
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Car,
  ShieldCheck,
  Hotel,
  ChevronDown,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  AlertCircle,
  Plane,
  Train,
  ArrowRight,
  ExternalLink,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../context/LanguageContext';
import { getPushkarContent } from '../../data/pushkarData';

const WHATSAPP_NUMBER = '917597451057';

const PushkarTravelGuidePage = () => {
  const { lang, isRTL } = useLanguage();
  const content = useMemo(() => getPushkarContent(lang), [lang]);
  const [openFaq, setOpenFaq] = useState(null);

  // Enquiry form state
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2',
    service: 'Pushkar to Chittorgarh Private Taxi',
  });

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const message = `Namaste Visit Chittorgarh! I am inquiring from Pushkar Travel Guide:%0A%0A👤 Name: ${encodeURIComponent(formState.name)}%0A📞 Phone: ${encodeURIComponent(formState.phone)}%0A📅 Travel Date: ${encodeURIComponent(formState.date)}%0A👥 Guests: ${encodeURIComponent(formState.guests)}%0A🚗 Service: ${encodeURIComponent(formState.service)}%0A%0APlease share availability and best quote.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const triggerPlanTrip = () => {
    window.dispatchEvent(
      new CustomEvent('openTripPlannerModal', {
        detail: {
          mode: 'focused',
          itemName: 'Pushkar & Chittorgarh Rajasthan Tour',
          itemDuration: '2 - 3 Days',
          category: 'Rajasthan Circuit Tour',
        },
      })
    );
  };

  // Structured Data Schemas
  const schemas = useMemo(() => {
    const siteUrl = 'https://www.visitchittorgarh.in';
    const pageUrl = `${siteUrl}/pushkar-travel-guide`;

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Pushkar',
        description: content.seo.description,
        url: pageUrl,
        touristType: ['Spiritual Tourism', 'Heritage Tourism', 'Cultural Tourism', 'Desert Safari'],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '26.4899',
          longitude: '74.5511',
        },
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: 'Rajasthan, India',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Rajasthan Travel Guides', item: `${siteUrl}/destinations-and-routes` },
          { '@type': 'ListItem', position: 3, name: 'Pushkar Travel Guide', item: pageUrl },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faqSection.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ];
  }, [content]);

  return (
    <div className={`min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20 ${isRTL ? 'text-right' : 'text-left'}`}>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
        canonical="/pushkar-travel-guide"
        keywords={content.seo.keywords}
        schema={schemas}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2 flex-wrap">
          <a href="/" className="hover:text-[#A65F3D] transition-colors">Home</a>
          <span>/</span>
          <a href="/destinations-and-routes" className="hover:text-[#A65F3D] transition-colors">Explore Rajasthan</a>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Pushkar Travel Guide</span>
        </nav>

        {/* ─── Hero Section ────────────────────────────────────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1A17] via-[#2A2621] to-[#1C1A17] text-white p-8 sm:p-14 lg:p-16 mb-16 shadow-2xl border border-[#C49A32]/30">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C49A32]/20 border border-[#C49A32]/40 text-[#E5C378] mb-6">
              <Sparkles className="w-3.5 h-3.5" /> {content.hero.badge}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white mb-6 leading-tight">
              {content.hero.heading}
            </h1>
            <p className="text-sm sm:text-lg text-white/80 leading-relaxed mb-8 font-light">
              {content.hero.subheading}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#attractions"
                className="px-6 py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-[#1C1A17] font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform duration-200 hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4" /> {content.hero.ctaExplore}
              </a>
              <button
                onClick={triggerPlanTrip}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 backdrop-blur-sm transition-all"
              >
                <Calendar className="w-4 h-4" /> {content.hero.ctaPlan}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20am%20planning%20a%20trip%20to%20Pushkar%20and%20need%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform duration-200 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" /> {content.hero.ctaWhatsApp}
              </a>
            </div>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.quickStats.map((stat, i) => (
              <div key={i} className="text-left">
                <div className="text-xl sm:text-2xl font-serif font-bold text-[#E5C378]">{stat.val}</div>
                <div className="text-xs uppercase tracking-wider text-white/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Tourist Attractions Section ─────────────────────────── */}
        <section id="attractions" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
              {content.attractionsSection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {content.attractionsSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75">
              {content.attractionsSection.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.attractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#EFE7D9] shadow-heritage hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-56 overflow-hidden bg-[#EFE7D9]">
                  <img
                    src={attraction.image}
                    alt={attraction.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider rounded-full border border-white/20">
                      {attraction.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#25231F] mb-3 group-hover:text-[#A65F3D] transition-colors">
                      {attraction.title}
                    </h3>
                    <p className="text-xs text-[#25231F]/75 leading-relaxed mb-4">
                      {attraction.desc}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] mb-4 text-xs">
                      <div className="font-bold text-[#A65F3D] mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Why Visit:
                      </div>
                      <p className="text-[#25231F]/80 leading-snug">{attraction.whyVisit}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#EFE7D9] flex items-center justify-between text-xs text-[#25231F]/60">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32]" />
                      <span className="truncate max-w-[150px]">{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C49A32]" />
                      <span>{attraction.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Best Hotels Section ─────────────────────────────────── */}
        <section id="hotels" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
              {content.hotelsSection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {content.hotelsSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75 mb-4">
              {content.hotelsSection.subheading}
            </p>
            <p className="text-xs italic text-[#25231F]/60 bg-[#EFE7D9]/50 p-3 rounded-xl border border-[#EFE7D9]">
              {content.hotelsSection.note}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.hotelCategories.map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between hover:border-[#C49A32]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#EFE7D9] flex items-center justify-center text-[#C49A32]">
                      <Hotel className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {cat.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-[#25231F]/75 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  <div className="text-xs font-bold text-[#A65F3D] mb-3">
                    Top Verified Stays: <span className="font-normal text-[#25231F]/80">{cat.examples}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {cat.features.map((feat, fi) => (
                      <span
                        key={fi}
                        className="text-[11px] bg-[#F8F5EF] text-[#25231F]/70 px-2.5 py-1 rounded-lg border border-[#EFE7D9]"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20am%20looking%20for%20verified%20hotel%20recommendations%20in%20Pushkar%20for%20category:%20${encodeURIComponent(cat.category)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 text-center bg-[#F8F5EF] hover:bg-[#C49A32] text-[#25231F] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[#EFE7D9]"
                >
                  Enquire Hotel Availability
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Pushkar to Chittorgarh Travel Section (HIGH CONVERSION) ─ */}
        <section className="mb-20">
          <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#25231F] via-[#322E27] to-[#1C1A17] text-white shadow-2xl border-2 border-[#C49A32] relative overflow-hidden">
            <div className="max-w-4xl relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C49A32] text-[#1C1A17] mb-4">
                ★ {content.chittorConversion.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white mb-4 leading-tight">
                {content.chittorConversion.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#E5C378] font-medium mb-4">
                {content.chittorConversion.subheading}
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                {content.chittorConversion.desc}
              </p>

              <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white mb-8 border border-white/20">
                🚗 {content.chittorConversion.distanceBadge}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {content.chittorConversion.benefits.map((b, bi) => (
                  <div key={bi} className="flex items-start gap-2.5 text-xs text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C49A32] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20want%20to%20book%20a%20Private%20Taxi%20from%20Pushkar%20to%20Chittorgarh%20Fort%20and%20arrange%20an%20approved%20guide.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#C49A32] hover:bg-[#b08728] text-[#1C1A17] font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-transform duration-200 hover:scale-[1.02]"
                >
                  <Car className="w-5 h-5" /> {content.chittorConversion.ctaText}
                </a>
                <a
                  href="/chittorgarh-travel-guide"
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all"
                >
                  View Chittorgarh Guide <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Taxi Services Section ───────────────────────────────── */}
        <section id="taxi" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
              {content.taxiSection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {content.taxiSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75">
              {content.taxiSection.subheading}
            </p>
          </div>

          {/* Vehicle Fleet Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {content.taxis.map((taxi, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EFE7D9] flex items-center justify-center text-[#C49A32] mb-4">
                    <Car className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-[#25231F] mb-1">
                    {taxi.name}
                  </h3>
                  <div className="text-xs font-bold text-[#A65F3D] mb-2">{taxi.capacity}</div>
                  <p className="text-[11px] text-[#25231F]/70 mb-4">{taxi.idealFor}</p>

                  <ul className="space-y-1.5 mb-6 text-xs text-[#25231F]/80">
                    {taxi.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C49A32]"></span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20am%20inquiring%20about%20booking%20a%20${encodeURIComponent(taxi.name)}%20in%20Pushkar.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-center text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Book on WhatsApp
                </a>
              </div>
            ))}
          </div>

          {/* Intercity Routes Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage overflow-x-auto">
            <h3 className="text-lg font-serif font-bold text-[#25231F] mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#C49A32]" /> Popular Pushkar Outstation Taxi Routes
            </h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#EFE7D9] text-[#25231F]/60 uppercase tracking-wider">
                  <th className="py-3 px-4">From</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Distance</th>
                  <th className="py-3 px-4">Driving Time</th>
                  <th className="py-3 px-4">Primary Highway</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE7D9]/60">
                {content.routes.map((r, ri) => (
                  <tr key={ri} className="hover:bg-[#F8F5EF]/60">
                    <td className="py-3.5 px-4 font-bold text-[#25231F]">{r.from}</td>
                    <td className="py-3.5 px-4 font-bold text-[#A65F3D]">{r.to}</td>
                    <td className="py-3.5 px-4">{r.dist}</td>
                    <td className="py-3.5 px-4">{r.time}</td>
                    <td className="py-3.5 px-4 text-[#25231F]/70">{r.route}</td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20need%20taxi%20fare%20and%20booking%20for%20route%20${r.from}%20to%20${r.to}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-700 font-bold hover:underline"
                      >
                        Enquire Fare →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── Travel Itineraries Section ──────────────────────────── */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
              {content.itinerarySection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {content.itinerarySection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75">
              {content.itinerarySection.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.itineraries.map((itin, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-3 py-1 bg-[#EFE7D9] text-[#A65F3D] text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
                    {itin.duration}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2">{itin.title}</h3>
                  <div className="text-xs italic text-[#25231F]/60 mb-4">Ideal for: {itin.ideal}</div>

                  <ol className="space-y-3 mb-6 text-xs text-[#25231F]/80">
                    {itin.steps.map((st, si) => (
                      <li key={si} className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#EFE7D9] text-[#C49A32] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {si + 1}
                        </span>
                        <span className="leading-snug">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <button
                  onClick={triggerPlanTrip}
                  className="w-full py-2.5 bg-[#F8F5EF] hover:bg-[#C49A32] text-[#25231F] hover:text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors border border-[#EFE7D9]"
                >
                  Customise Itinerary
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Pushkar Camel Fair Section ──────────────────────────── */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
              {content.camelFairSection.kicker}
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#25231F] mb-6">
              {content.camelFairSection.heading}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4 text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
                <p>{content.camelFairSection.p1}</p>
                <p>{content.camelFairSection.p2}</p>
              </div>
              <div className="bg-[#F8F5EF] p-6 rounded-2xl border border-[#EFE7D9]">
                <h4 className="text-sm font-serif font-bold text-[#A65F3D] mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Fair Planning Tips
                </h4>
                <ul className="space-y-2 text-xs text-[#25231F]/80">
                  {content.camelFairSection.planningTips.map((tip, ti) => (
                    <li key={ti} className="flex items-start gap-2">
                      <span className="text-[#C49A32] font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ─── International Tourist Information Section ───────────── */}
        <section className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
              {content.internationalSection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {content.internationalSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75">
              {content.internationalSection.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.internationalSection.items.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage"
              >
                <h3 className="text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C49A32]" /> {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#25231F]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Interactive Lead Form & FAQ Grid ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Fast Booking Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C49A32]/40 shadow-heritage">
            <h3 className="text-xl font-serif font-bold text-[#25231F] mb-2">
              {content.enquiryForm.heading}
            </h3>
            <p className="text-xs text-[#25231F]/70 mb-6">
              {content.enquiryForm.subheading}
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#25231F] font-bold mb-1">
                  {content.enquiryForm.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Smith / राहुल शर्मा"
                  value={formState.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EFE7D9] bg-[#F8F5EF] text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>

              <div>
                <label className="block text-[#25231F] font-bold mb-1">
                  {content.enquiryForm.phoneLabel}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  value={formState.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EFE7D9] bg-[#F8F5EF] text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#25231F] font-bold mb-1">
                    {content.enquiryForm.dateLabel}
                  </label>
                  <input
                    type="date"
                    name="date"
                    required
                    value={formState.date}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#EFE7D9] bg-[#F8F5EF] text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                  />
                </div>
                <div>
                  <label className="block text-[#25231F] font-bold mb-1">
                    {content.enquiryForm.guestsLabel}
                  </label>
                  <select
                    name="guests"
                    value={formState.guests}
                    onChange={handleFormChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#EFE7D9] bg-[#F8F5EF] text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3-4">3 - 4 Persons</option>
                    <option value="5-7">5 - 7 Persons (SUV)</option>
                    <option value="8+">8+ Group (Tempo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#25231F] font-bold mb-1">
                  {content.enquiryForm.serviceLabel}
                </label>
                <select
                  name="service"
                  value={formState.service}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EFE7D9] bg-[#F8F5EF] text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                >
                  {content.enquiryForm.serviceOptions.map((opt, oi) => (
                    <option key={oi} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform duration-200 hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" /> {content.enquiryForm.btnSubmit}
              </button>
            </form>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3">
              {content.faqSection.kicker}
            </span>
            <h3 className="text-2xl font-serif font-black text-[#25231F] mb-6">
              {content.faqSection.heading}
            </h3>

            <div className="space-y-3">
              {content.faqSection.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="border border-[#EFE7D9] rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full p-4 text-left font-serif font-bold text-xs sm:text-sm text-[#25231F] flex items-center justify-between gap-4 hover:bg-[#F8F5EF]/60"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C49A32] shrink-0 transition-transform duration-200 ${
                        openFaq === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="p-4 pt-0 text-xs text-[#25231F]/80 leading-relaxed border-t border-[#EFE7D9]/60 bg-[#F8F5EF]/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PushkarTravelGuidePage;
