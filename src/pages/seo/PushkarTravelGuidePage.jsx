import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
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
  Navigation,
  Star,
  Award,
  Users,
  Check,
  Flame,
  Coffee,
  HeartHandshake,
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';
import { useLanguage } from '../../context/LanguageContext';
import { getPushkarContent } from '../../data/pushkarData';

const WHATSAPP_NUMBER = '917597451057';

const UI_STRINGS = {
  en: {
    home: 'Home',
    explore: 'Rajasthan Travel Guides',
    current: 'Pushkar Travel Guide',
    whyVisit: 'Why You Must Visit:',
    hotelsKicker: 'Verified Heritage Stays & Resorts',
    hotelsHeading: 'Best Hotels in Pushkar – Handpicked & Verified',
    hotelsSubheading: 'Curated stays to suit luxury holidaymakers, Israeli backpackers, couples, and families.',
    topStays: 'Featured Stays:',
    enquireHotel: 'Check Rates & Availability on WhatsApp',
    taxiKicker: 'Direct Intercity Taxi & Highway Transfers',
    taxiHeading: 'Pushkar Outstation Taxi & Private Cab Rates',
    taxiSubheading: 'Direct door-to-door private AC cabs with vetted English/Hindi speaking drivers. Transparent fixed fares.',
    thFrom: 'From',
    thDest: 'Destination',
    thDist: 'Distance',
    thTime: 'Est. Time',
    thHighway: 'Primary Highway',
    thPrice: 'Est. Fare (Sedan/SUV)',
    thAction: 'Book',
    enquireFare: 'Book Cab on WhatsApp',
    enquireFareShort: 'Book Now →',
    viewChittorgarh: 'Explore Chittorgarh Fort Guide',
    allTab: 'All Attractions',
    templesTab: 'Temples & Holy Ghats',
    desertTab: 'Desert & Nature',
    cultureTab: 'Bazaars & Culture',
    trustTitle: 'Rajasthan Tourism Certified & Verified Concierge',
    trust1: '100% Fixed & Transparent Fares',
    trust2: 'Govt. Approved Licensed Guides',
    trust3: '24/7 On-Trip WhatsApp Support',
    trust4: 'Clean Sanitized AC Vehicles',
    ratingText: 'Rated 4.9/5 by 3,800+ Domestic & International Travelers',
    israelCommunityBadge: 'Dedicated Israeli Traveler Concierge (ישראל)',
    quickQuote: 'Instant WhatsApp Quote in 10 Mins',
  },
  ja: {
    home: 'ホーム',
    explore: 'ラージャスターン旅行ガイド',
    current: 'プシュカル旅行ガイド',
    whyVisit: '必見のポイント・見どころ:',
    hotelsKicker: '厳選された宿泊施設とリゾート',
    hotelsHeading: 'プシュカルのおすすめホテル＆高級リゾート',
    hotelsSubheading: '高級リゾートからバックパッカー向けホステル、家族向けホテルまで厳選。',
    topStays: '代表的な宿泊先:',
    enquireHotel: 'WhatsAppで空室状況・料金を確認',
    taxiKicker: '都市間直通タクシー＆専用送迎',
    taxiHeading: 'プシュカル発 各都市行きタクシー＆専用送迎料金',
    taxiSubheading: '経験豊富なプロドライバーによる快適なエアコン付き専用車。透明性のある安心料金。',
    thFrom: '出発地',
    thDest: '目的地',
    thDist: '距離',
    thTime: '所要時間',
    thHighway: '主要道路',
    thPrice: '料金目安 (セダン/SUV)',
    thAction: '予約',
    enquireFare: 'WhatsAppでタクシーを予約',
    enquireFareShort: '予約する →',
    viewChittorgarh: '世界遺産チットールガル城塞ガイドを見る',
    allTab: 'すべての名所 (10選)',
    templesTab: '寺院・聖なる湖',
    desertTab: '砂漠・自然体験',
    cultureTab: 'バザール・伝統文化',
    trustTitle: '公認ラージャスターン専門コンシェルジュ',
    trust1: '明朗会計・追加料金なし',
    trust2: '公認ライセンスガイド手配',
    trust3: '24時間WhatsApp日本語・英語サポート',
    trust4: '清潔・快適なエアコン完備車両',
    ratingText: '世界3,800名以上の旅行者から評価 4.9/5 星',
    israelCommunityBadge: '国際旅行者・イスラエル旅行者サポート',
    quickQuote: '10分以内にWhatsAppで見積もり回答',
  },
  he: {
    home: 'דף הבית',
    explore: 'מדריכי רג\'סטאן',
    current: 'מדריך פושקר המלא',
    whyVisit: 'למה אסור לפספס:',
    hotelsKicker: 'אירוח מובחר ומאושר למטיילים',
    hotelsHeading: 'המלונות וההוסטלים הטובים ביותר בפושקר',
    hotelsSubheading: 'מגוון אפשרויות לינה איכותיות: מריזורטים מפנקים ועד להוסטלים תוססים וידידותיים לישראלים.',
    topStays: 'מקומות מובילים:',
    enquireHotel: 'בדיקת זמינות ומחיר בווטסאפ',
    taxiKicker: 'מוניות פרטיות והסעות בין-עירוניות',
    taxiHeading: 'מחירון מוניות מפושקר לרחבי רג\'סטאן',
    taxiSubheading: 'רכבים פרטיים חדישים וממוזגים עם נהגים מקצועיים ואמינים. מחיר קבוע ושקוף ללא עמלות תיווך.',
    thFrom: 'מוצא',
    thDest: 'יעד',
    thDist: 'מרחק',
    thTime: 'זמן נסיעה',
    thHighway: 'כביש ראשי',
    thPrice: 'מחיר משוער (פרייבט/SUV)',
    thAction: 'הזמנה',
    enquireFare: 'הזמנת מונית בווטסאפ',
    enquireFareShort: 'להזמנה ←',
    viewChittorgarh: 'למדריך המלא למבצר צ\'יטורגר',
    allTab: 'כל האטרקציות (10)',
    templesTab: 'מקדשים ואגם קדוש',
    desertTab: 'מדבר ושקיעות',
    cultureTab: 'שווקים ותרבות',
    trustTitle: 'שירות תיירות רשמי ומאושר ברג\'סטאן',
    trust1: 'מחיר קבוע ושקוף ללא הפתעות',
    trust2: 'מדריכים מוסמכים ללא מתווכים',
    trust3: 'מענה ותמיכה 24/7 בווטסאפ',
    trust4: 'רכבים ממוזגים, מרווחים ונקיים',
    ratingText: 'דירוג ממוצע 4.9 מתוך 5 מיותר מ-3,800 מטיילים',
    israelCommunityBadge: 'שירות מיוחד ומסור למטיילים ישראלים (שלום!)',
    quickQuote: 'הצעת מחיר מהירה בווטסאפ תוך 10 דקות',
  },
  hi: {
    home: 'होम',
    explore: 'राजस्थान पर्यटन गाइड',
    current: 'पुष्कर यात्रा गाइड',
    whyVisit: 'भ्रमण का मुख्य कारण:',
    hotelsKicker: 'प्रमाणित होटल एवं लक्जरी रिसॉर्ट्स',
    hotelsHeading: 'पुष्कर के सर्वश्रेष्ठ होटल एवं हेरिटेज हवेलियां',
    hotelsSubheading: 'शाही हवेलियों, झील किनारे बुटीक होटल और आरामदायक बजट हॉस्टल्स की सत्यापित सूची।',
    topStays: 'प्रमुख विकल्प:',
    enquireHotel: 'व्हाट्सएप पर कमरे की दरें और उपलब्धता जांचें',
    taxiKicker: 'सीधी अंतर-शहरी टैक्सी एवं हाईवे यात्रा',
    taxiHeading: 'पुष्कर से प्रमुख शहरों के लिए टैक्सी किराया सूची',
    taxiSubheading: 'विश्वसनीय और अनुभवी चालकों के साथ वातानुकूलित (AC) निजी टैक्सियां। पूर्णतः पारदर्शी निश्चित किराया।',
    thFrom: 'प्रस्थान',
    thDest: 'गंतव्य',
    thDist: 'दूरी',
    thTime: 'यात्रा समय',
    thHighway: 'प्रमुख मार्ग',
    thPrice: 'अनुमानित किराया (Sedan/SUV)',
    thAction: 'बुकिंग',
    enquireFare: 'व्हाट्सएप पर टैक्सी बुक करें',
    enquireFareShort: 'बुक करें →',
    viewChittorgarh: 'चित्तौड़गढ़ दुर्ग यात्रा गाइड देखें',
    allTab: 'सभी दर्शनीय स्थल (10)',
    templesTab: 'मंदिर एवं पवित्र घाट',
    desertTab: 'रेगिस्तान एवं सफारी',
    cultureTab: 'बाज़ार एवं संस्कृति',
    trustTitle: 'राजस्थान पर्यटन प्रमाणित आधिकारिक सेवा',
    trust1: 'पारदर्शी एवं निश्चित दरें (नो हिडन चार्ज)',
    trust2: 'सरकारी मान्यता प्राप्त अधिकृत गाइड',
    trust3: 'यात्रा के दौरान 24/7 व्हाट्सएप सहायता',
    trust4: 'साफ़-सुथरी वातानुकूलित (AC) गाड़ियां',
    ratingText: '3,800+ भारतीय एवं विदेशी पर्यटकों द्वारा 4.9/5 स्टार रेटिंग',
    israelCommunityBadge: 'विदेशी एवं इजरायली पर्यटकों के लिए विशेष सहायता',
    quickQuote: '10 मिनट में व्हाट्सएप पर तुरंत कोटेशन पाएं',
  },
  it: {
    home: 'Home',
    explore: 'Guide del Rajasthan',
    current: 'Guida di Pushkar',
    whyVisit: 'Perché visitare:',
    hotelsKicker: 'Hotel & Dimore Storiche Verificate',
    hotelsHeading: 'I Migliori Hotel e Resort a Pushkar',
    hotelsSubheading: 'Strutture selezionate per ogni esigenza: resort nel deserto, haveli e ostelli.',
    topStays: 'Hotel consigliati:',
    enquireHotel: 'Verifica Disponibilità e Tariffe su WhatsApp',
    taxiKicker: 'Taxi Privati & Trasferimenti nel Rajasthan',
    taxiHeading: 'Tariffe Taxi da Pushkar per le Principali Città',
    taxiSubheading: 'Auto private climatizzate con autisti professionisti verificati. Tariffe fisse e trasparenti.',
    thFrom: 'Partenza',
    thDest: 'Destinazione',
    thDist: 'Distanza',
    thTime: 'Tempo Stimato',
    thHighway: 'Strada Principale',
    thPrice: 'Tariffa Stimata (Sedan/SUV)',
    thAction: 'Prenota',
    enquireFare: 'Prenota Taxi su WhatsApp',
    enquireFareShort: 'Prenota →',
    viewChittorgarh: 'Guida al Forte di Chittorgarh',
    allTab: 'Tutte le Attrazioni (10)',
    templesTab: 'Templi & Lago Sacro',
    desertTab: 'Deserto & Safari',
    cultureTab: 'Bazar & Artigianato',
    trustTitle: 'Servizio Certificato per il Turismo in Rajasthan',
    trust1: 'Tariffe Fisse e Trasparenti',
    trust2: 'Guide Ufficiali Autorizzate RTDC',
    trust3: 'Assistenza WhatsApp H24 Durante il Viaggio',
    trust4: 'Veicoli Sanificati e Climatizzati',
    ratingText: 'Valutato 4,9/5 da oltre 3.800 viaggiatori internazionali',
    israelCommunityBadge: 'Supporto Dedicato per Viaggiatori Internazionali',
    quickQuote: 'Preventivo Rapido su WhatsApp in 10 Minuti',
  },
  fr: {
    home: 'Accueil',
    explore: 'Guides du Rajasthan',
    current: 'Guide de Pushkar',
    whyVisit: 'Pourquoi visiter :',
    hotelsKicker: 'Hébergements Sélectionnés & Havelis',
    hotelsHeading: 'Meilleurs Hôtels et Retraites à Pushkar',
    hotelsSubheading: 'Séjours sélectionnés : palais au bord du lac, retraites du désert et auberges conviviales.',
    topStays: 'Établissements réputés :',
    enquireHotel: 'Vérifier la Disponibilité sur WhatsApp',
    taxiKicker: 'Transferts Privés & Taxis au Rajasthan',
    taxiHeading: 'Tarifs des Taxis Privés depuis Pushkar',
    taxiSubheading: 'Voitures privées climatisées avec chauffeurs professionnels fiables. Tarifs fixes sans intermédiaire.',
    thFrom: 'Départ',
    thDest: 'Destination',
    thDist: 'Distance',
    thTime: 'Temps Estimé',
    thHighway: 'Axe Principal',
    thPrice: 'Tarif Estimé (Berline/SUV)',
    thAction: 'Réserver',
    enquireFare: 'Réserver Taxi sur WhatsApp',
    enquireFareShort: 'Réserver →',
    viewChittorgarh: 'Guide du Fort de Chittorgarh',
    allTab: 'Toutes les Attractions (10)',
    templesTab: 'Temples & Ghats',
    desertTab: 'Désert & Dunes',
    cultureTab: 'Bazars & Artisanat',
    trustTitle: 'Service Agréé de Tourisme au Rajasthan',
    trust1: 'Tarifs Fixes et Transparents',
    trust2: 'Guides Officiels Certifiés',
    trust3: 'Assistance WhatsApp 24h/24',
    trust4: 'Véhicules Climatisés et Contrôlés',
    ratingText: 'Noté 4,9/5 par plus de 3 800 voyageurs du monde',
    israelCommunityBadge: 'Assistance Spéciale Voyageurs Internationaux',
    quickQuote: 'Devis Rapide sur WhatsApp en 10 Minutes',
  },
  de: {
    home: 'Startseite',
    explore: 'Rajasthan Reiseführer',
    current: 'Pushkar Reiseführer',
    whyVisit: 'Warum besuchen:',
    hotelsKicker: 'Geprüfte Hotels & Heritage-Havelis',
    hotelsHeading: 'Beste Hotels & Wüstenresorts in Pushkar',
    hotelsSubheading: 'Ausgewählte Unterkünfte vom 5-Sterne-Luxusresort bis zum gemütlichen Backpacker-Hostel.',
    topStays: 'Top-Hotels:',
    enquireHotel: 'Verfügbarkeit auf WhatsApp anfragen',
    taxiKicker: 'Privattaxis & Fernstrecken in Rajasthan',
    taxiHeading: 'Feste Taxipreise ab Pushkar',
    taxiSubheading: 'Bequeme klimatisierte Privatwagen mit geprüften Chauffeuren. Feste und faire Preise.',
    thFrom: 'Von',
    thDest: 'Ziel',
    thDist: 'Entfernung',
    thTime: 'Fahrtzeit',
    thHighway: 'Hauptstrecke',
    thPrice: 'Richtpreis (Limousine/SUV)',
    thAction: 'Buchen',
    enquireFare: 'Taxi auf WhatsApp buchen',
    enquireFareShort: 'Buchen →',
    viewChittorgarh: 'Chittorgarh Fort Reiseführer ansehen',
    allTab: 'Alle 10 Sehenswürdigkeiten',
    templesTab: 'Tempel & Heiliger See',
    desertTab: 'Wüste & Safari',
    cultureTab: 'Basare & Handwerk',
    trustTitle: 'Zertifizierter Reiseservice für Rajasthan',
    trust1: '100% Feste & Transparente Preise',
    trust2: 'Offiziell lizenzierte Guides',
    trust3: '24/7 WhatsApp-Reiseservice',
    trust4: 'Gepflegte klimatisierte Fahrzeuge',
    ratingText: 'Mit 4,9/5 Sternen von über 3.800 Reisenden bewertet',
    israelCommunityBadge: 'Spezialservice für Rucksack- & Weltreisende',
    quickQuote: 'Schnellangebot auf WhatsApp in 10 Min.',
  },
  es: {
    home: 'Inicio',
    explore: 'Guías de Rajastán',
    current: 'Guía de Pushkar',
    whyVisit: 'Por qué visitar:',
    hotelsKicker: 'Alojamientos Verificados y Havelis',
    hotelsHeading: 'Los Mejores Hoteles y Resorts en Pushkar',
    hotelsSubheading: 'Opciones selectas desde resorts de lujo en el desierto hasta acogedores hostales boutique.',
    topStays: 'Alojamientos destacados:',
    enquireHotel: 'Consultar Tarifas y Disponibilidad en WhatsApp',
    taxiKicker: 'Taxis Privados y Rutas por Rajastán',
    taxiHeading: 'Tarifas de Taxi desde Pushkar a Otras Ciudades',
    taxiSubheading: 'Vehículos privados con aire acondicionado y chóferes profesionales certificados. Precios claros y fijos.',
    thFrom: 'Origen',
    thDest: 'Destino',
    thDist: 'Distancia',
    thTime: 'Tiempo Estimado',
    thHighway: 'Carretera',
    thPrice: 'Tarifa Estimada (Sedán/SUV)',
    thAction: 'Reservar',
    enquireFare: 'Reservar Taxi por WhatsApp',
    enquireFareShort: 'Reservar →',
    viewChittorgarh: 'Ver Guía del Fuerte de Chittorgarh',
    allTab: 'Todas las Atracciones (10)',
    templesTab: 'Templos y Lago Sagrado',
    desertTab: 'Desierto y Dunas',
    cultureTab: 'Bazares y Cultura',
    trustTitle: 'Servicio Turístico Certificado de Rajastán',
    trust1: 'Tarifas 100% Fijas y Transparentes',
    trust2: 'Guías Oficiales Certificados RTDC',
    trust3: 'Soporte WhatsApp 24/7 Durante el Viaje',
    trust4: 'Vehículos Climatizados e Impecables',
    ratingText: 'Valorado con 4.9/5 por más de 3,800 viajeros',
    israelCommunityBadge: 'Atención Especial a Viajeros Internacionales',
    quickQuote: 'Presupuesto Rápido por WhatsApp en 10 Minutos',
  },
  ar: {
    home: 'الرئيسية',
    explore: 'أدلة السفر في راجستان',
    current: 'دليل بوشكار الشامل',
    whyVisit: 'لماذا يجب عليك زيارتها:',
    hotelsKicker: 'أماكن إقامة وقصور تراثية معتمدة',
    hotelsHeading: 'أفضل فنادق ومنتجعات بوشكار',
    hotelsSubheading: 'خيارات إقامة مختارة بعناية تلائم العائلات والرحالة والباحثين عن الاستجمام والهدوء.',
    topStays: 'أبرز الفنادق:',
    enquireHotel: 'الاستفسار عن الأسعار والتوافر عبر واتساب',
    taxiKicker: 'سيارات أجرة خاصة وتنقلات مباشرة',
    taxiHeading: 'أسعار سيارات الأجرة من بوشكار إلى وجهات راجستان',
    taxiSubheading: 'سيارات خاصة ومكيفة ومريحة مع سائقين محترفين ومعتمدين. أسعار ثابتة وشفافة دون وسطاء.',
    thFrom: 'من',
    thDest: 'الوجهة',
    thDist: 'المسافة',
    thTime: 'الوقت المقدر',
    thHighway: 'الطريق الرئيسي',
    thPrice: 'السعر المقدر (سيدان/عائلية)',
    thAction: 'حجز',
    enquireFare: 'حجز سيارة عبر واتساب',
    enquireFareShort: 'احجز الآن ←',
    viewChittorgarh: 'استكشف دليل قلعة شيتورجاره',
    allTab: 'جميع المعالم (10)',
    templesTab: 'المعابد والبحيرة المقدسة',
    desertTab: 'الصحراء والكثبان',
    cultureTab: 'الأسواق والتراث',
    trustTitle: 'خدمة سياحية رسمية ومعتمدة في راجستان',
    trust1: 'أسعار ثابتة وشفافة تماماً',
    trust2: 'مرشدون سياحيون رسميون ومرخصون',
    trust3: 'دعم مباشر عبر واتساب على مدار 24 ساعة',
    trust4: 'سيارات مكيفة ومعقمة ومريحة',
    ratingText: 'تقييم 4.9 من 5 من أكثر من 3,800 مسافر دولي',
    israelCommunityBadge: 'خدمة مخصصة للمسافرين الدوليين والرحالة',
    quickQuote: 'عرض سعر فوري عبر واتساب خلال 10 دقائق',
  },
};

const ROUTE_PRICES = [
  '₹2,999 / ₹4,299',
  '₹3,899 / ₹5,499',
  '₹2,499 / ₹3,499',
  '₹699 / ₹999',
];

const PushkarTravelGuidePage = () => {
  const { lang } = useLanguage();
  const location = useLocation();

  // Instant reactive language detection from URL pathname or context
  const activeLang = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length > 0 && ['fr', 'de', 'it', 'ja', 'es', 'he', 'ar', 'hi'].includes(segments[0])) {
      return segments[0];
    }
    return lang || 'en';
  }, [location.pathname, lang]);

  const langPrefix = useMemo(() => (activeLang === 'en' ? '' : `/${activeLang}`), [activeLang]);
  const isCurrentRTL = useMemo(() => ['he', 'ar'].includes(activeLang), [activeLang]);

  const content = useMemo(() => getPushkarContent(activeLang), [activeLang]);
  const ui = useMemo(() => UI_STRINGS[activeLang] || UI_STRINGS.en, [activeLang]);

  const [activeTab, setActiveTab] = useState('all');
  const [openFaq, setOpenFaq] = useState(0);

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
    const message = `Namaste / Shalom Visit Chittorgarh!%0A%0AInquiring from Pushkar Travel Guide (%23${activeLang.toUpperCase()}):%0A👤 Name: ${encodeURIComponent(formState.name)}%0A📞 Phone: ${encodeURIComponent(formState.phone)}%0A📅 Travel Date: ${encodeURIComponent(formState.date)}%0A👥 Guests: ${encodeURIComponent(formState.guests)}%0A🚖 Service: ${encodeURIComponent(formState.service)}%0A%0APlease share availability and best quote.`;
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

  // Filtered attractions based on interactive tab
  const filteredAttractions = useMemo(() => {
    const list = content.attractions || [];
    if (activeTab === 'temples') {
      return list.filter((a) => ['brahma-temple', 'pushkar-lake', 'savitri-temple', 'varaha-temple', 'rangji-temple', 'gurudwara-pushkar'].includes(a.id));
    }
    if (activeTab === 'desert') {
      return list.filter((a) => ['desert-safari', 'sunset-point', 'rose-gardens', 'savitri-temple'].includes(a.id));
    }
    if (activeTab === 'culture') {
      return list.filter((a) => ['pushkar-bazaar', 'rose-gardens', 'gurudwara-pushkar', 'pushkar-lake'].includes(a.id));
    }
    return list;
  }, [content.attractions, activeTab]);

  // Structured Data Schemas
  const schemas = useMemo(() => {
    const siteUrl = 'https://www.visitchittorgarh.in';
    const pageUrl = `${siteUrl}${langPrefix}/pushkar-travel-guide`;

    return [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: 'Pushkar, Rajasthan',
        description: content.seo.description,
        url: pageUrl,
        touristType: ['Spiritual Tourism', 'Heritage Tourism', 'Cultural Tourism', 'Desert Safari', 'Backpacker Tourism'],
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
          { '@type': 'ListItem', position: 1, name: ui.home, item: `${siteUrl}${langPrefix}/` },
          { '@type': 'ListItem', position: 2, name: ui.explore, item: `${siteUrl}${langPrefix}/destinations-and-routes` },
          { '@type': 'ListItem', position: 3, name: ui.current, item: pageUrl },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: (content.faqSection?.faqs || []).map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
    ];
  }, [content, langPrefix, ui]);

  return (
    <div className={`min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 pb-20 ${isCurrentRTL ? 'text-right' : 'text-left'}`} dir={isCurrentRTL ? 'rtl' : 'ltr'}>
      <SEOHead
        title={content.seo.title}
        description={content.seo.description}
        canonical="/pushkar-travel-guide"
        keywords={content.seo.keywords}
        schema={schemas}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation & Rating Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <nav className="text-xs text-[#25231F]/60 flex items-center gap-2 flex-wrap">
            <a href={langPrefix || '/'} className="hover:text-[#A65F3D] transition-colors">{ui.home}</a>
            <span>/</span>
            <a href={`${langPrefix}/destinations-and-routes`} className="hover:text-[#A65F3D] transition-colors">{ui.explore}</a>
            <span>/</span>
            <span className="text-[#25231F] font-bold">{ui.current}</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-[11px] font-bold text-amber-900 w-fit">
            <div className="flex text-amber-500">
              {'★★★★★'.split('').map((s, idx) => (
                <span key={idx}>{s}</span>
              ))}
            </div>
            <span>{ui.ratingText}</span>
          </div>
        </div>

        {/* ─── Hero Section with Royal Rajasthani Styling ──────────── */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1C1A17] via-[#2A241E] to-[#141210] text-white p-8 sm:p-14 lg:p-16 mb-16 shadow-2xl border-2 border-[#C49A32]/40">
          {/* Subtle Royal Background Pattern Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A32]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#C49A32]/30 to-[#E5C378]/20 border border-[#C49A32]/60 text-[#E5C378] mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#E5C378]" /> {content.hero.badge}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white mb-6 leading-tight">
              {content.hero.heading}
            </h1>

            <p className="text-sm sm:text-lg text-white/85 leading-relaxed mb-8 font-light max-w-3xl">
              {content.hero.subheading}
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#attractions"
                className="px-6 py-3.5 bg-gradient-to-r from-[#E5C378] via-[#C49A32] to-[#B8860B] hover:brightness-110 text-[#1C1A17] font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4" /> {content.hero.ctaExplore}
              </a>
              <button
                onClick={triggerPlanTrip}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 backdrop-blur-md transition-all hover:scale-[1.02]"
              >
                <Calendar className="w-4 h-4 text-[#E5C378]" /> {content.hero.ctaPlan}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20am%20planning%20a%20trip%20to%20Pushkar%20and%20need%20assistance.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                <MessageCircle className="w-4 h-4" /> {content.hero.ctaWhatsApp}
              </a>
            </div>

            {/* Trust Badges Ribbon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-[11px] text-white/75 font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E5C378] shrink-0" />
                <span>{ui.trust1}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E5C378] shrink-0" />
                <span>{ui.trust2}</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#E5C378] shrink-0" />
                <span>{ui.trust3}</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#E5C378] shrink-0" />
                <span>{ui.trust4}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.quickStats.map((stat, i) => (
              <div key={i} className="text-left bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-xl sm:text-2xl font-serif font-black text-[#E5C378]">{stat.val}</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ISRAELI TRAVELER & COMMUNITY SECTION ────────────────── */}
        <section className="mb-20">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white border-2 border-blue-400/50 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-blue-500/20 text-blue-300 border border-blue-400/40">
                  🇮🇱 {ui.israelCommunityBadge}
                </span>
                <span className="text-xs text-blue-200/80 font-mono">Chabad House • Kosher • Israeli Cafes</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mb-3">
                {content.israelSection.heading}
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed mb-8 font-light">
                {content.israelSection.subheading}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                {content.israelSection.cards.map((c, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-blue-400/60 transition-all duration-300 hover:bg-white/[0.08]"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center justify-between">
                      <span>{c.tag}</span>
                      <span className="text-blue-300/40 text-xs font-mono">#0{idx + 1}</span>
                    </div>
                    <h3 className="text-lg font-serif font-bold text-white mb-2">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Shalom!%20I%20am%20an%20Israeli%20traveler%20in%20Pushkar%20looking%20for%20assistance%20and%20taxi%20booking.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4" /> Shalom / Chat on WhatsApp
                </a>
                <span className="text-xs text-slate-400">
                  Direct support for transfers to Chittorgarh Fort, Udaipur & Jaipur
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Tourist Attractions Section with Filter Tabs ────────── */}
        <section id="attractions" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3 border border-[#C49A32]/30">
              {content.attractionsSection.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {content.attractionsSection.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75">
              {content.attractionsSection.subheading}
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex justify-center items-center gap-2 flex-wrap mb-10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#C49A32] text-[#1C1A17] shadow-md'
                  : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:bg-[#F8F5EF]'
              }`}
            >
              {ui.allTab}
            </button>
            <button
              onClick={() => setActiveTab('temples')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'temples'
                  ? 'bg-[#C49A32] text-[#1C1A17] shadow-md'
                  : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:bg-[#F8F5EF]'
              }`}
            >
              {ui.templesTab}
            </button>
            <button
              onClick={() => setActiveTab('desert')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'desert'
                  ? 'bg-[#C49A32] text-[#1C1A17] shadow-md'
                  : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:bg-[#F8F5EF]'
              }`}
            >
              {ui.desertTab}
            </button>
            <button
              onClick={() => setActiveTab('culture')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'culture'
                  ? 'bg-[#C49A32] text-[#1C1A17] shadow-md'
                  : 'bg-white text-[#25231F]/70 border border-[#EFE7D9] hover:bg-[#F8F5EF]'
              }`}
            >
              {ui.cultureTab}
            </button>
          </div>

          {/* Attractive Text-Centric Cards with Royal Golden Badges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAttractions.map((attraction) => (
              <div
                key={attraction.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EFE7D9] shadow-heritage hover:border-[#C49A32] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Top decorative gold line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C49A32] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E5C378] to-[#C49A32] text-[#1C1A17] font-serif font-black flex items-center justify-center text-sm shadow-md">
                      {attraction.number}
                    </div>
                    <span className="px-3 py-1 bg-[#F8F5EF] text-[#A65F3D] text-[10px] font-bold uppercase tracking-wider rounded-full border border-[#EFE7D9]">
                      {attraction.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#25231F] mb-3 group-hover:text-[#A65F3D] transition-colors leading-snug">
                    {attraction.title}
                  </h3>
                  <p className="text-xs text-[#25231F]/80 leading-relaxed mb-5">
                    {attraction.desc}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-[#FCFAF6] border border-[#C49A32]/30 mb-5 text-xs shadow-sm">
                    <div className="font-bold text-[#A65F3D] mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C49A32]" /> {ui.whyVisit}
                    </div>
                    <p className="text-[#25231F]/85 leading-snug">{attraction.whyVisit}</p>
                  </div>
                </div>

                <div>
                  <div className="pt-4 border-t border-[#EFE7D9] flex items-center justify-between text-xs text-[#25231F]/60 mb-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span className="truncate max-w-[150px]">{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C49A32] shrink-0" />
                      <span>{attraction.duration}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20want%20to%20visit%20${encodeURIComponent(attraction.title)}%20in%20Pushkar.%20Please%20guide%20me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#F8F5EF] hover:bg-[#C49A32] text-[#25231F] hover:text-[#1C1A17] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors border border-[#EFE7D9]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Book Cab / Guide
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Pushkar to Chittorgarh Travel Section (HIGH CONVERSION) ─ */}
        <section className="mb-20">
          <div className="rounded-3xl p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-[#25231F] via-[#322C24] to-[#1C1A17] text-white shadow-2xl border-2 border-[#C49A32] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C49A32]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl relative z-10">
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#C49A32] to-[#E5C378] text-[#1C1A17] mb-4 font-black shadow-md">
                ★ {content.chittorConversion.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-white mb-4 leading-tight">
                {content.chittorConversion.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#E5C378] font-medium mb-4">
                {content.chittorConversion.subheading}
              </p>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-6 font-light">
                {content.chittorConversion.desc}
              </p>

              <div className="inline-block bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-xs font-bold text-white mb-8 border border-white/20">
                🚖 {content.chittorConversion.distanceBadge}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {content.chittorConversion.benefits.map((b, bi) => (
                  <div key={bi} className="flex items-start gap-2.5 text-xs text-white/95">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C378] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20want%20to%20book%20a%20Private%20Taxi%20from%20Pushkar%20to%20Chittorgarh%20Fort%20and%20arrange%20an%20approved%20guide.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-[#E5C378] via-[#C49A32] to-[#B8860B] hover:brightness-110 text-[#1C1A17] font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 shadow-2xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <Car className="w-5 h-5" /> {content.chittorConversion.ctaText}
                </a>
                <a
                  href={`${langPrefix}/chittorgarh-travel-guide`}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold rounded-2xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  {ui.viewChittorgarh} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Best Hotels Section ─────────────────────────────────── */}
        <section id="hotels" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3 border border-[#C49A32]/30">
              {ui.hotelsKicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {ui.hotelsHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75 mb-4">
              {ui.hotelsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(content.hotelCategories || []).map((cat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage flex flex-col justify-between hover:border-[#C49A32] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-[#EFE7D9] flex items-center justify-center text-[#C49A32] shadow-sm">
                      <Hotel className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-sm">
                      {cat.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#25231F] mb-2 leading-snug">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-[#25231F]/75 leading-relaxed mb-4">
                    {cat.desc}
                  </p>

                  <div className="text-xs font-bold text-[#A65F3D] mb-3">
                    {ui.topStays} <span className="font-normal text-[#25231F]/85">{cat.examples}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {(cat.features || []).map((feat, fi) => (
                      <span
                        key={fi}
                        className="text-[11px] bg-[#F8F5EF] text-[#25231F]/75 px-2.5 py-1 rounded-lg border border-[#EFE7D9] font-medium"
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
                  className="w-full py-2.5 text-center bg-[#F8F5EF] hover:bg-[#C49A32] text-[#25231F] hover:text-[#1C1A17] rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 border border-[#EFE7D9] shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> {ui.enquireHotel}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Taxi Services Section with FULLY RESPONSIVE TABLE & CARDS ─ */}
        <section id="taxi" className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3 border border-[#C49A32]/30">
              {ui.taxiKicker}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-4">
              {ui.taxiHeading}
            </h2>
            <p className="text-sm sm:text-base text-[#25231F]/75">
              {ui.taxiSubheading}
            </p>
          </div>

          {/* Outstation Routes: Responsive Cards on Mobile, Clean Table on Desktop */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border-2 border-[#C49A32]/30 shadow-heritage mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#EFE7D9]">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#25231F] flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#C49A32]" />
                <span>{content.routesHeading || 'Popular Pushkar Outstation Taxi Routes'}</span>
              </h3>
              <span className="text-xs text-[#25231F]/60 font-semibold bg-[#F8F5EF] px-3 py-1 rounded-full border border-[#EFE7D9] w-fit">
                All-Inclusive: Toll + Fuel + Driver Bata Included
              </span>
            </div>

            {/* Mobile Cards View (Visible on screens < 768px) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {content.routes.map((r, ri) => (
                <div
                  key={ri}
                  className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] flex flex-col justify-between shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#25231F]">
                      {r.from} → <span className="text-[#A65F3D]">{r.to}</span>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#EFE7D9] text-[11px] font-bold text-[#C49A32]">
                      {r.dist}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#25231F]/75 mb-2">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#C49A32]" /> {r.time}
                    </span>
                    <span className="truncate max-w-[160px] text-[11px] text-[#25231F]/65">{r.route}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-[#EFE7D9]/80 mb-3 text-xs">
                    <span className="text-[#25231F]/60 font-medium">Fare:</span>
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {ROUTE_PRICES[ri] || 'Best Rate on Request'}
                    </span>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20need%20taxi%20booking%20for%20route%20${encodeURIComponent(r.from)}%20to%20${encodeURIComponent(r.to)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-center text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> {ui.enquireFare}
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop Table View (Visible on screens >= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-xs text-left" dir={isCurrentRTL ? 'rtl' : 'ltr'}>
                <thead>
                  <tr className="border-b border-[#EFE7D9] text-[#25231F]/60 uppercase tracking-wider font-bold">
                    <th className="py-3 px-4">{ui.thFrom}</th>
                    <th className="py-3 px-4">{ui.thDest}</th>
                    <th className="py-3 px-4">{ui.thDist}</th>
                    <th className="py-3 px-4">{ui.thTime}</th>
                    <th className="py-3 px-4">{ui.thHighway}</th>
                    <th className="py-3 px-4">{ui.thPrice}</th>
                    <th className="py-3 px-4 text-right">{ui.thAction}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE7D9]/60">
                  {content.routes.map((r, ri) => (
                    <tr key={ri} className="hover:bg-[#F8F5EF]/80 transition-colors">
                      <td className="py-4 px-4 font-bold text-[#25231F]">{r.from}</td>
                      <td className="py-4 px-4 font-bold text-[#A65F3D]">{r.to}</td>
                      <td className="py-4 px-4 font-semibold">{r.dist}</td>
                      <td className="py-4 px-4">{r.time}</td>
                      <td className="py-4 px-4 text-[#25231F]/70">{r.route}</td>
                      <td className="py-4 px-4 font-bold text-emerald-800">
                        <span className="bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                          {ROUTE_PRICES[ri] || 'On Request'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <a
                          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20need%20taxi%20fare%20and%20booking%20for%20route%20${encodeURIComponent(r.from)}%20to%20${encodeURIComponent(r.to)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] inline-flex items-center gap-1 shadow-sm transition-transform hover:scale-105"
                        >
                          <MessageCircle className="w-3 h-3" /> {ui.enquireFareShort}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Interactive Lead Form & FAQ Grid ────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Fast Booking Form */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#C49A32]/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C49A32]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 mb-2">
              ⚡ {ui.quickQuote}
            </div>
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
                  placeholder="e.g. Avi / Marco / Kenji / Rahul"
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
                  placeholder="+91 98765 43210 / +39... / +972... / +81..."
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
                  {(content.enquiryForm.serviceOptions || []).map((opt, oi) => (
                    <option key={oi} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform duration-200 hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" /> {content.enquiryForm.btnSubmit}
              </button>
            </form>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7D9] shadow-heritage">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-3 border border-[#C49A32]/30">
              {content.faqSection?.kicker || 'FAQ'}
            </span>
            <h3 className="text-2xl font-serif font-black text-[#25231F] mb-6">
              {content.faqSection?.heading || 'Pushkar Travel FAQs'}
            </h3>

            <div className="space-y-3">
              {(content.faqSection?.faqs || []).map((faq, i) => (
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

        {/* ─── Bottom CTA Strip with Royal Badge ───────────────────── */}
        <div className="text-center bg-gradient-to-br from-[#FDFBF7] to-[#F4EEE0] p-8 sm:p-12 rounded-3xl border-2 border-[#C49A32]/40 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-[#C49A32]/20 border border-[#C49A32]/40 flex items-center justify-center mx-auto mb-4 text-[#C49A32]">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-serif font-black text-[#25231F] mb-2">
            Ready to Experience the Magic of Pushkar & Chittorgarh?
          </h4>
          <p className="text-xs sm:text-sm text-[#25231F]/70 max-w-xl mx-auto mb-6 leading-relaxed">
            Contact Visit Chittorgarh for verified taxi rentals, certified multi-lingual tour guides, and seamless Rajasthan travel circuits.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Namaste!%20I%20want%20to%20plan%20my%20Pushkar%20and%20Rajasthan%20holiday.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#E5C378] via-[#C49A32] to-[#B8860B] hover:brightness-110 text-[#1C1A17] font-black rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all duration-200 hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" /> Chat with Rajasthan Travel Concierge
          </a>
        </div>
      </div>
    </div>
  );
};

export default PushkarTravelGuidePage;
