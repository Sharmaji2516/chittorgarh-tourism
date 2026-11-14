import { blogPosts, BLOG_CATEGORIES } from './blogData.js';

export const BLOG_CATEGORY_MAP = {
  en: {
    'All': 'All',
    'Chittorgarh Travel Guide': 'Chittorgarh Travel Guide',
    'Historical Places': 'Historical Places',
    'Rajasthan Tourism': 'Rajasthan Tourism',
    'Travel Itineraries': 'Travel Itineraries',
    'Local Food & Culture': 'Local Food & Culture',
    'Travel Tips': 'Travel Tips'
  },
  ja: {
    'All': 'すべて',
    'Chittorgarh Travel Guide': 'チットールガル旅行ガイド',
    'Historical Places': '歴史的名所・史跡',
    'Rajasthan Tourism': 'ラージャスターン観光',
    'Travel Itineraries': 'モデルコース・旅程',
    'Local Food & Culture': '郷土料理＆伝統文化',
    'Travel Tips': '旅行のヒント・豆知識'
  },
  hi: {
    'All': 'सभी',
    'Chittorgarh Travel Guide': 'चित्तौड़गढ़ यात्रा गाइड',
    'Historical Places': 'ऐतिहासिक स्थल',
    'Rajasthan Tourism': 'राजस्थान पर्यटन',
    'Travel Itineraries': 'यात्रा कार्यक्रम',
    'Local Food & Culture': 'स्थानीय भोजन और संस्कृति',
    'Travel Tips': 'यात्रा टिप्स'
  },
  fr: {
    'All': 'Tous',
    'Chittorgarh Travel Guide': 'Guide de Voyage Chittorgarh',
    'Historical Places': 'Lieux Historiques',
    'Rajasthan Tourism': 'Tourisme au Rajasthan',
    'Travel Itineraries': 'Itinéraires de Voyage',
    'Local Food & Culture': 'Gastronomie & Culture',
    'Travel Tips': 'Conseils aux Voyageurs'
  },
  de: {
    'All': 'Alle',
    'Chittorgarh Travel Guide': 'Chittorgarh Reiseführer',
    'Historical Places': 'Historische Stätten',
    'Rajasthan Tourism': 'Rajasthan Tourismus',
    'Travel Itineraries': 'Reiserouten',
    'Local Food & Culture': 'Kulinarik & Kultur',
    'Travel Tips': 'Reisetipps'
  },
  it: {
    'All': 'Tutti',
    'Chittorgarh Travel Guide': 'Guida di Viaggio Chittorgarh',
    'Historical Places': 'Luoghi Storici',
    'Rajasthan Tourism': 'Turismo nel Rajasthan',
    'Travel Itineraries': 'Itinerari di Viaggio',
    'Local Food & Culture': 'Cucina Locale & Tradizioni',
    'Travel Tips': 'Consigli di Viaggio'
  },
  es: {
    'All': 'Todos',
    'Chittorgarh Travel Guide': 'Guía de Viaje Chittorgarh',
    'Historical Places': 'Lugares Históricos',
    'Rajasthan Tourism': 'Turismo en Rajastán',
    'Travel Itineraries': 'Itinerarios de Viaje',
    'Local Food & Culture': 'Comida Local y Tradición',
    'Travel Tips': 'Consejos para Viajeros'
  },
  he: {
    'All': 'הכל',
    'Chittorgarh Travel Guide': 'מדריך טיולים לצ’יטורגר',
    'Historical Places': 'אתרים היסטוריים',
    'Rajasthan Tourism': 'תיירות ברג’סטאן',
    'Travel Itineraries': 'מסלולי טיול',
    'Local Food & Culture': 'קולינריה ומסורת מקומית',
    'Travel Tips': 'טיפים למטיילים'
  },
  ar: {
    'All': 'الكل',
    'Chittorgarh Travel Guide': 'دليل السفر إلى شيتورغاره',
    'Historical Places': 'الأماكن التاريخية',
    'Rajasthan Tourism': 'السياحة في راجستان',
    'Travel Itineraries': 'مسارات السفر',
    'Local Food & Culture': 'المأكولات والتراث الشعبي',
    'Travel Tips': 'نصائح للمسافرين'
  }
};

const BLOG_OVERLAYS = {
  ja: {
    'chittorgarh-fort-complete-guide': {
      title: 'チットールガル城塞：インド最大の要塞 完全観光ガイド',
      summary: '壮大なチットールガル城を訪れるための必読ガイド。歴史、必見スポット、入場料、おすすめの訪問時間、ラーニー・パドミニと勝利の塔の伝説を詳しく解説。',
      readTime: '所要時間：約6分'
    },
    'sanwariya-seth-temple-darshan': {
      title: 'サンワリヤ・セート寺院：富と繁栄を授ける神聖なるクリシュナ巡礼地',
      summary: 'チットールガル県マンダフィヤに鎮座するサンワリヤ・セート寺院をご案内。奇跡の伝承、礼拝（ダルシャン）時間、アクセス方法を網羅。',
      readTime: '所要時間：約5分'
    },
    'menal-waterfall-nature-guide': {
      title: 'メナール滝と古代寺院：モンスーンに輝く「ミニ・カジュラーホー」',
      summary: 'チットールガル近郊の絶景スポット、メナール渓谷の滝と11世紀の壮麗なシヴァ寺院群。大自然と古代彫刻が織りなす神秘の景勝地。',
      readTime: '所要時間：約5分'
    },
    'best-time-to-visit-chittorgarh': {
      title: 'チットールガル訪問のベストシーズン：気候、四季、お祭りガイド',
      summary: '快適な気候の冬（10月〜3月）、豊かな緑と滝が楽しめる雨季、伝統のジョーハル・メラ祭など、季節ごとの見どころをご紹介。',
      readTime: '所要時間：約4分'
    },
    '1-day-chittorgarh-itinerary': {
      title: 'チットールガル日帰りモデルコース：24時間で巡る最高の旅程',
      summary: '早朝の城門通過から、勝利の塔、パドミニ宮殿、ガウムク貯水池、夕暮れの光と音のショーまで、1日で効率よく巡る完璧なルート。',
      readTime: '所要時間：約7分'
    },
    'chittorgarh-travel-guide': {
      title: 'チットールガル総合旅行ガイド：観光、グルメ、宿泊、お土産情報',
      summary: '初めて訪れる旅行者のための完全ガイド。見どころ、名物料理ダル・バーティ、ヘリテージホテル、伝統木版染めテキスタイル。',
      readTime: '所要時間：約8分'
    },
    'udaipur-to-chittorgarh-road-trip-guide': {
      title: 'ウダイプル発チットールガル行きロードトリップ：距離、ルート、タクシーのコツ',
      summary: '国道NH-27号線を経由する快適なドライブ旅行。移動距離、所要時間、おすすめの立ち寄りスポット、安心の専用タクシー手配方法。',
      readTime: '所要時間：約5分'
    },
    'authentic-mewari-cuisine-dal-baati': {
      title: 'メーワールの美味探訪：本場ダル・バーティ・チュルマと名物料理ガイド',
      summary: '純粋なデシ・ギーで焼き上げる伝統のダル・バーティ、ガッテ・キ・サブジ、城下町の老舗スイーツ店を徹底紹介。',
      readTime: '所要時間：約5分'
    },
    'why-hire-authorized-guide-chittorgarh': {
      title: 'チットールガル城で政府公認の歴史専門ガイドが必要な理由',
      summary: '広大な城塞（700エーカー）の真の価値は、石に刻まれた歴史にあります。非公認の客引きを避け、公認ガイドと巡る安心と深み。',
      readTime: '所要時間：約4分'
    },
    'bassi-wildlife-sanctuary-guide': {
      title: 'バッシ野生動物保護区＆ダム：チットールガル近郊のエコツーリズムの楽園',
      summary: 'アラヴァリ丘陵に広がる大自然。ヒョウ、アンテロープ、渡り鳥が生息する穏やかな湖畔でのサファリとリフレッシュ。',
      readTime: '所要時間：約5分'
    },
    'chittorgarh-2-days-itinerary-guide': {
      title: 'チットールガル1泊2日モデルコース：城塞、聖地サンワリヤ、大自然',
      summary: '初日は世界遺産の城塞をじっくり探訪し、2日目は聖なる寺院とメナール滝・バッシ保護区を訪れる充実の2日間プラン。',
      readTime: '所要時間：約6分'
    },
    'thewa-art-jewellery-chittorgarh': {
      title: 'テワ芸術ジュエリー：色ガラスに23金が輝く伝説の伝統工芸',
      summary: '250年以上の歴史を誇る王室御用達の工芸品。熟練の金細工職人が生み出す希少なジュエリーとお土産選びのポイント。',
      readTime: '所要時間：約4分'
    },
    'chittorgarh-light-sound-show-guide': {
      title: 'チットールガル城 光と音のショー：上映時間、チケット、夜の鑑賞ガイド',
      summary: '毎晩城塞で開催される迫力の歴史劇。ライトアップされた古代建築とともに蘇るメーワールの英雄譚をお見逃しなく。',
      readTime: '所要時間：約4分'
    },
    'family-travel-guide-chittorgarh': {
      title: '家族連れ・シニアのためのチットールガル旅行ガイド：快適性とバリアフリー',
      summary: 'お子様連れやご年配の方向けの安心ガイド。無理のない歩行ルート、日除け対策、専用車移動、おすすめの休憩スポット。',
      readTime: '所要時間：約5分'
    }
  },

  hi: {
    'chittorgarh-fort-complete-guide': {
      title: 'चित्तौड़गढ़ किला: भारत के सबसे बड़े दुर्ग की संपूर्ण यात्रा मार्गदर्शिका',
      summary: 'महान चित्तौड़गढ़ दुर्ग की यात्रा की योजना बनाएं। इतिहास, दर्शनीय स्थल, प्रवेश शुल्क, समय और रानी पद्मिनी व विजय स्तंभ की अमर गाथाएं जानें।',
      readTime: '6 मिनट अध्ययन'
    },
    'sanwariya-seth-temple-darshan': {
      title: 'सांवलिया सेठ मंदिर: धन एवं समृद्धि के दिव्य कृष्ण तीर्थ की महिमा',
      summary: 'मंडफिया, चित्तौड़गढ़ के प्रसिद्ध सांवलिया सेठ मंदिर के दर्शन की जानकारी, इतिहास, आरती का समय और यात्रा निर्देश।',
      readTime: '5 मिनट अध्ययन'
    },
    'menal-waterfall-nature-guide': {
      title: 'मेनाल जलप्रपात और प्राचीन शिव मंदिर: राजस्थान का मिनी खजुराहो',
      summary: 'चित्तौड़गढ़ के निकट मनोरम मेनाल जलप्रपात और 11वीं शताब्दी के नक्काशीदार शिव मंदिरों का प्राकृतिक एवं आध्यात्मिक भ्रमण।',
      readTime: '5 मिनट अध्ययन'
    },
    'best-time-to-visit-chittorgarh': {
      title: 'चित्तौड़गढ़ भ्रमण का सबसे अच्छा समय: मौसम, ऋतुएं और प्रमुख उत्सव',
      summary: 'शीत ऋतु (अक्टूबर से मार्च), सुहावना मानसून और जौहर मेला — अपनी सुविधानुसार यात्रा का सर्वोत्तम समय चुनें।',
      readTime: '4 मिनट अध्ययन'
    },
    '1-day-chittorgarh-itinerary': {
      title: '1-दिवसीय चित्तौड़गढ़ यात्रा कार्यक्रम: 24 घंटे का सर्वश्रेष्ठ प्लान',
      summary: 'सुबह के पहले पहर से लेकर रात के लाइट एंड साउंड शो तक, एक दिन में चित्तौड़गढ़ दुर्ग के सभी प्रमुख स्मारकों के दर्शन का खाका।',
      readTime: '7 मिनट अध्ययन'
    },
    'chittorgarh-travel-guide': {
      title: 'संपूर्ण चित्तौड़गढ़ पर्यटन गाइड: दर्शनीय स्थल, खानपान, होटल और खरीदारी',
      summary: 'चित्तौड़गढ़ आने वाले हर यात्री के लिए संपूर्ण मार्गदर्शिका — दाल बाटी, हेरिटेज होटल, अकोला प्रिंट और प्रामाणिक राजस्थानी आतिथ्य।',
      readTime: '8 मिनट अध्ययन'
    },
    'udaipur-to-chittorgarh-road-trip-guide': {
      title: 'उदयपुर से चित्तौड़गढ़ रोड ट्रिप: दूरी, राष्ट्रीय राजमार्ग NH-27 और टैक्सी सलाह',
      summary: 'उदयपुर से चित्तौड़गढ़ की सुगम सड़क यात्रा। दूरी, मार्ग, रास्ते के ढाबे और आरामदायक निजी टैक्सी सेवा की पूरी जानकारी।',
      readTime: '5 मिनट अध्ययन'
    },
    'authentic-mewari-cuisine-dal-baati': {
      title: 'मेवाड़ के प्रामाणिक स्वाद: दाल बाटी चूरमा और पारंपरिक व्यंजनों की गाइड',
      summary: 'कंडों पर सिकी बाटी, शुद्ध देसी घी, पंचमेल दाल और कढ़ी कचौरी — चित्तौड़गढ़ के सर्वश्रेष्ठ पारंपरिक भोजनालय।',
      readTime: '5 मिनट अध्ययन'
    },
    'why-hire-authorized-guide-chittorgarh': {
      title: 'चित्तौड़गढ़ दुर्ग भ्रमण के लिए अधिकृत गाइड क्यों आवश्यक है?',
      summary: '700 एकड़ में फैले विशाल किले के पत्थरों की अमर कहानियों को जानने के लिए सरकारी प्रमाणित इतिहासकार गाइड के साथ भ्रमण का महत्व।',
      readTime: '4 मिनट अध्ययन'
    },
    'bassi-wildlife-sanctuary-guide': {
      title: 'बस्सी वन्यजीव अभयारण्य और बांध: चित्तौड़गढ़ का शांत प्राकृतिक स्वर्ग',
      summary: 'अरावली की पहाड़ियों में तेंदुआ, प्रवासी पक्षी और शांत जलाशय — प्रकृति प्रेमियों के लिए एक आदर्श ईको-टूरिज्म गंतव्य।',
      readTime: '5 मिनट अध्ययन'
    },
    'chittorgarh-2-days-itinerary-guide': {
      title: '2-दिवसीय चित्तौड़गढ़ टूर प्लान: दुर्ग, मंदिर, सांवलिया जी और मेनाल',
      summary: 'पहले दिन दुर्ग की विस्तृत खोज और दूसरे दिन सांवलिया सेठ दर्शन व मेनाल जलप्रपात का संपूर्ण सप्ताहांत टूर प्लान।',
      readTime: '6 मिनट अध्ययन'
    },
    'thewa-art-jewellery-chittorgarh': {
      title: 'थेवा कला आभूषण: रंगीन कांच पर 23 कैरेट सोने की राजसी नक्काशी',
      summary: '250 वर्ष पुरानी शाही आभूषण कला। चित्तौड़गढ़ के मास्टर कारीगरों की अनमोल रचनाएं और खरीदारी के सुझाव।',
      readTime: '4 मिनट अध्ययन'
    },
    'chittorgarh-light-sound-show-guide': {
      title: 'चित्तौड़गढ़ किला लाइट एंड साउंड शो: समय, टिकट और शाम की गाइड',
      summary: 'कुंभा महल परिसर में आयोजित होने वाला भव्य ध्वनि एवं प्रकाश कार्यक्रम — मेवाड़ के शौर्य की सजीव प्रस्तुति।',
      readTime: '4 मिनट अध्ययन'
    },
    'family-travel-guide-chittorgarh': {
      title: 'बच्चों और वरिष्ठ नागरिकों के साथ चित्तौड़गढ़ यात्रा: सुगमता व सुविधा गाइड',
      summary: 'सपरिवार आरामदायक भ्रमण के लिए आसान रास्ते, निजी वाहन व्यवस्था, छायादार स्थान और आवश्यक स्वास्थ्य सुझाव।',
      readTime: '5 मिनट अध्ययन'
    }
  },

  fr: {
    'chittorgarh-fort-complete-guide': {
      title: 'Fort de Chittorgarh : Le Guide Complet de la Plus Grande Forteresse d’Inde',
      summary: 'Planifiez votre visite de la majestueuse forteresse de Chittorgarh. Histoire, monuments incontournables, tarifs, horaires et légendes de Rani Padmini.',
      readTime: '6 min de lecture'
    },
    'sanwariya-seth-temple-darshan': {
      title: 'Temple de Sanwariya Seth : Le Seigneur Divin de la Richesse et des Bénédictions',
      summary: 'Découvrez le sanctuaire sacré de Sanwariya Seth à Mandaphiya. Histoire des miracles, horaires de darshan et conseils pour s’y rendre.',
      readTime: '5 min de lecture'
    },
    'menal-waterfall-nature-guide': {
      title: 'Cascade et Temples de Menal : La Merveille Historique des Moussons',
      summary: 'Une chute d’eau vertigineuse de 45 mètres au cœur d’un canyon rocheux parsemé de sanctuaires shivaïtes sculptés du XIe siècle.',
      readTime: '5 min de lecture'
    },
    'best-time-to-visit-chittorgarh': {
      title: 'Meilleure Période pour Visiter Chittorgarh : Météo, Saisons et Fêtes',
      summary: 'Quand partir à Chittorgarh ? Climat doux en hiver (octobre à mars), moussons verdoyantes et grandes célébrations culturelles.',
      readTime: '4 min de lecture'
    },
    '1-day-chittorgarh-itinerary': {
      title: 'Itinéraire 1 Jour à Chittorgarh : Le Circuit Idéal en 24 Heures',
      summary: 'Un programme complet du matin au soir : franchissez les 7 portes historiques, explorez le Vijay Stambha et admirez le spectacle nocturne.',
      readTime: '7 min de lecture'
    },
    'chittorgarh-travel-guide': {
      title: 'Guide de Voyage Complet de Chittorgarh : Monuments, Gastronomie & Havelis',
      summary: 'Tout ce que vous devez savoir pour un séjour réussi : sites historiques, dégustation de Dal Baati, hôtels havelis et artisanat d’Akola.',
      readTime: '8 min de lecture'
    },
    'udaipur-to-chittorgarh-road-trip-guide': {
      title: 'Trajet Udaipur - Chittorgarh : Distance, Autoroute NH-27 et Taxis Privés',
      summary: 'Rejoignez facilement Chittorgarh depuis Udaipur. Distance, temps de route, haltes recommandées et réservation de chauffeurs fiables.',
      readTime: '5 min de lecture'
    },
    'authentic-mewari-cuisine-dal-baati': {
      title: 'Saveurs du Mewar : Le Guide Gourmand du Dal Baati Churma',
      summary: 'Savourez la gastronomie authentique du Rajasthan : baatis dorés au feu de bois, pur beurre desi ghee et douceurs royales.',
      readTime: '5 min de lecture'
    },
    'why-hire-authorized-guide-chittorgarh': {
      title: 'Pourquoi Faire Appel à un Guide Historien Officiel à Chittorgarh',
      summary: 'Pour comprendre la grandeur de cette citadelle de 280 hectares, confiez votre visite à des historiens agréés par le gouvernement.',
      readTime: '4 min de lecture'
    },
    'bassi-wildlife-sanctuary-guide': {
      title: 'Réserve Naturelle & Barrage de Bassi : L’Échappée Verte de Chittorgarh',
      summary: 'Panthères, antilopes et oiseaux migrateurs au cœur des collines des Aravalli. Un havre de paix pour les passionnés de nature.',
      readTime: '5 min de lecture'
    },
    'chittorgarh-2-days-itinerary-guide': {
      title: 'Circuit de 2 Jours à Chittorgarh : Citadelle, Sanctuaires et Nature',
      summary: 'Deux journées inoubliables pour visiter la forteresse en profondeur le jour 1, puis le temple de Sanwariya et la cascade de Menal le jour 2.',
      readTime: '6 min de lecture'
    },
    'thewa-art-jewellery-chittorgarh': {
      title: 'Bijoux d’Art Thewa : L’Or et le Verre Coloré des Maîtres Artisans',
      summary: 'Un art royal vieux de 250 ans fusionnant filigrane d’or pur 23 carats et verre belge étincelant. Conseils pour vos souvenirs.',
      readTime: '4 min de lecture'
    },
    'chittorgarh-light-sound-show-guide': {
      title: 'Spectacle Son & Lumière de Chittorgarh : Horaires, Billets et Soirée',
      summary: 'Le grand récit nocturne de la bravoure du Mewar projeté sur les ruines du Palais Kumbha. Un moment magique à ne pas manquer.',
      readTime: '4 min de lecture'
    },
    'family-travel-guide-chittorgarh': {
      title: 'Visiter Chittorgarh en Famille et avec des Seniors : Guide de Confort',
      summary: 'Itinéraires ombragés, transports privés climatisés, accessibilité et conseils pratiques pour un séjour familial en toute sérénité.',
      readTime: '5 min de lecture'
    }
  },

  de: {
    'chittorgarh-fort-complete-guide': {
      title: 'Chittorgarh Fort: Ausführlicher Reiseführer zur größten Festung Indiens',
      summary: 'Entdecken Sie das UNESCO-Weltkulturerbe Chittorgarh Fort. Geschichte, Siegesturm, Padmini-Palast, Eintrittspreise und Legenden.',
      readTime: '6 Min. Lesezeit'
    },
    'sanwariya-seth-temple-darshan': {
      title: 'Sanwariya Seth Tempel: Das heilige Krishna-Pilgerzentrum von Mewar',
      summary: 'Besuchen Sie den prächtigen Tempel in Mandaphiya bei Chittorgarh. Tempelgeschichte, Segnungen, Gebetszeiten und Anreise.',
      readTime: '5 Min. Lesezeit'
    },
    'menal-waterfall-nature-guide': {
      title: 'Menal Wasserfall & Shiva-Tempel: Das Mini-Khajuraho von Rajasthan',
      summary: 'Spektakuläre Schlucht mit tosendem Wasserfall und kunstvoll gemeißelten Tempeln aus dem 11. Jahrhundert.',
      readTime: '5 Min. Lesezeit'
    },
    'best-time-to-visit-chittorgarh': {
      title: 'Beste Reisezeit für Chittorgarh: Wetter, Jahreszeiten & Festivals',
      summary: 'Angenehme Wintermonate (Oktober bis März), die grüne Monsunzeit und historische Festlichkeiten im Überblick.',
      readTime: '4 Min. Lesezeit'
    },
    '1-day-chittorgarh-itinerary': {
      title: '1-Tages-Reiseplan Chittorgarh: Die ideale 24-Stunden-Kulturtour',
      summary: 'Die perfekte Route für einen Tag: 7 Festungstore, Vijay Stambha, Gaumukh-Quelle und die abendliche Lichtshow.',
      readTime: '7 Min. Lesezeit'
    },
    'chittorgarh-travel-guide': {
      title: 'Kompletter Chittorgarh Reiseführer: Monumente, Küche, Hotels & Kultur',
      summary: 'Alles für Ihre Reise: Besichtigungs-Tipps, Dal Baati Churma, historische Haveli-Hotels und traditionelle Handwerkskunst.',
      readTime: '8 Min. Lesezeit'
    },
    'udaipur-to-chittorgarh-road-trip-guide': {
      title: 'Roadtrip von Udaipur nach Chittorgarh: Route, Distanz & Taxitipps',
      summary: 'Bequem über den National Highway NH-27 anreisen: Fahrtdauer, Zwischenstopps und verlässliche private Chauffeurdienste.',
      readTime: '5 Min. Lesezeit'
    },
    'authentic-mewari-cuisine-dal-baati': {
      title: 'Kulinarisches Mewar: Der authentische Guide zu Dal Baati Churma',
      summary: 'Genießen Sie traditionelle Köstlichkeiten: im Holzfeuer gebackene Baatis mit reinem Desi-Ghee und Mewari-Gewürzen.',
      readTime: '5 Min. Lesezeit'
    },
    'why-hire-authorized-guide-chittorgarh': {
      title: 'Warum Sie für Chittorgarh Fort einen lizenzierten Guide brauchen',
      summary: 'Die 280 Hektar große Festung erschließt sich erst durch ihre lebendigen Geschichten. Schützen Sie sich vor unseriösen Vermittlern.',
      readTime: '4 Min. Lesezeit'
    },
    'bassi-wildlife-sanctuary-guide': {
      title: 'Bassi Naturschutzgebiet & Damm: Öko-Paradies bei Chittorgarh',
      summary: 'Ruheoase in den Aravalli-Hügeln: Leoparden, Antilopen und Zugvögel an einem glasklaren Stausee.',
      readTime: '5 Min. Lesezeit'
    },
    'chittorgarh-2-days-itinerary-guide': {
      title: '2-Tage-Rundreise Chittorgarh: Festung, Tempel & Menal-Wasserfall',
      summary: 'Der ideale Wochenendausflug: Festungserkundung an Tag 1, Pilgerfahrt nach Mandaphiya und Naturwunder an Tag 2.',
      readTime: '6 Min. Lesezeit'
    },
    'thewa-art-jewellery-chittorgarh': {
      title: 'Thewa-Goldschmiedekunst: Legendäre Goldgravuren auf Glas',
      summary: 'Eine 250 Jahre alte königliche Handwerkstradition, die feinstes 23-Karat-Gold mit belgischem Glas verschmilzt.',
      readTime: '4 Min. Lesezeit'
    },
    'chittorgarh-light-sound-show-guide': {
      title: 'Licht- & Tonshow im Fort: Spielzeiten, Tickets & Abendtipps',
      summary: 'Die dramatische Geschichte der Belagerungen und Helden Mewars, lebendig inszeniert im Rana Kumbha Palast.',
      readTime: '4 Min. Lesezeit'
    },
    'family-travel-guide-chittorgarh': {
      title: 'Chittorgarh mit Kindern & Senioren: Komfort- & Barrierefreiheits-Tipps',
      summary: 'Entspanntes Reisen für jede Generation: schattige Ruheplätze, barrierearme Pfade und klimatisierte Privatwagen.',
      readTime: '5 Min. Lesezeit'
    }
  }
};

export const getLocalizedBlogPosts = (lang = 'en') => {
  const overlayMap = BLOG_OVERLAYS[lang] || {};
  const catMap = BLOG_CATEGORY_MAP[lang] || BLOG_CATEGORY_MAP.en;

  return blogPosts.map((post) => {
    const override = overlayMap[post.id] || {};
    const translatedCat = catMap[post.category] || post.category;

    return {
      ...post,
      title: override.title || post.title,
      summary: override.summary || post.summary,
      category: translatedCat,
      readTime: override.readTime || post.readTime,
      tags: (post.tags || []).map((t) => catMap[t] || t)
    };
  });
};

export const getLocalizedBlogCategories = (lang = 'en') => {
  const catMap = BLOG_CATEGORY_MAP[lang] || BLOG_CATEGORY_MAP.en;
  return BLOG_CATEGORIES.map((c) => catMap[c] || c);
};

