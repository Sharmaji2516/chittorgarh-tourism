export const content = {
    en: {
        nav: {
            home: "Home",
            history: "History",
            attractions: "Attractions",
            vendors: "Royal Cuisine",
            hotels: "Luxury Stay",
            langBtn: "हिंदी"
        },
        common: {
            bestTime: "Best Time",
            railway: "Railway Stn",
            bus: "Bus Stand",
            airport: "Airport",
            bookNow: "Book Now",
            readMore: "Read More",
            viewMap: "View Map"
        },
        hero: {
            title: "Chittorgarh",
            subtitle: "The Citadel of Valor & Sacrifice",
            cta: "Experience the Legacy",
            scroll: "Scroll to Explore"
        },
        history: {
            title: "Historical Significance",
            text: "Chittorgarh resonates with tales of Rajputana bravery, pride, and passion. The bards of Rajasthan sing tales of courage and sacrifice, echoing the heroism of its rulers and the legendary Queen Padmini. The majestic Fort, standing atop a 180-meter-high hill, is a testament to the indomitable spirit of the Rajputs. It has witnessed three Jauhars (mass self-immolation) by women to protect their honor.",
            readMore: "Read Full History on Wikipedia",
            wikiLink: "https://en.wikipedia.org/wiki/Chittorgarh"
        },
        timeline: [
            { year: "7th Century", title: "Foundation", desc: "Built by the Maurya dynasty, named after Chitrangada Mori." },
            { year: "1303", title: "First Jauhar", desc: "Alauddin Khilji sieges the fort. Queen Padmini performs Jauhar." },
            { year: "1535", title: "Second Jauhar", desc: "Bahadur Shah of Gujarat attacks. Rani Karnavati sends Rakhi to Humayun." },
            { year: "1568", title: "Third Jauhar", desc: "Emperor Akbar captures the fort. Jaimal and Patta show immense valor." }
        ],
        facts: [
            "Largest fort in India, spanning 700 acres.",
            "Home to 84 water bodies in the past, now only 22 remain.",
            "The fort has 7 massive gates (Pols).",
            "It is shaped like a fish when viewed from above."
        ],
        attractions: {
            title: "Major Tourist Attractions",
            items: [
                {
                    id: 1,
                    name: "Chittorgarh Fort",
                    desc: "A UNESCO World Heritage Site and the largest fort in India. A symbol of resilience and architectural brilliance.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort",
                    bestTime: "Oct - March (Winter)",
                    images: [
                        "https://images.unsplash.com/photo-1590666066228-5d259508544e?q=80&w=1200",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chittorgarh_Fort_Gaumukh.jpg/1200px-Chittorgarh_Fort_Gaumukh.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chittorgarh_fort.JPG/1280px-Chittorgarh_fort.JPG"
                    ],
                    coordinates: [24.8879, 74.6454],
                    distances: {
                        railway: "6 km",
                        bus: "8 km",
                        airport: "95 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Bassi Wildlife Sanctuary & Dam",
                    desc: "A serene haven for nature lovers, offering a glimpse of wildlife and the tranquil waters of Bassi Dam.",
                    wiki: "https://en.wikipedia.org/wiki/Bassi_Wildlife_Sanctuary",
                    bestTime: "Oct - Feb (Migratory Birds)",
                    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1200",
                    coordinates: [24.9960, 74.7600],
                    distances: {
                        railway: "25 km",
                        bus: "27 km",
                        airport: "115 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Sanwariaji Temple",
                    desc: "A revered temple dedicated to Lord Krishna, known as 'Sanwaria Seth', attracting millions of devotees.",
                    wiki: "https://en.wikipedia.org/wiki/Sanwariaji_Temple",
                    bestTime: "Year-round (Festivals preferred)",
                    image: "https://images.unsplash.com/photo-1563720703814-1e5b15a6b093?q=80&w=1200",
                    coordinates: [24.6067, 74.5246],
                    distances: {
                        railway: "35 km",
                        bus: "37 km",
                        airport: "70 km (Udaipur)"
                    }
                },
                {
                    id: 4,
                    name: "Vijay Stambh (Victory Tower)",
                    desc: "Built by Rana Kumbha to commemorate his victory. A 9-story tower adorned with intricate sculptures.",
                    wiki: "https://en.wikipedia.org/wiki/Vijay_Stambha",
                    bestTime: "Oct - March (Pleasant Weather)",
                    image: "https://images.unsplash.com/photo-1590666066228-5d259508544e?q=80&w=1200",
                    coordinates: [24.8878, 74.6451],
                    distances: {
                        railway: "7 km",
                        bus: "9 km",
                        airport: "96 km (Udaipur)"
                    }
                },
                {
                    id: 5,
                    name: "Kirti Stambh (Tower of Fame)",
                    desc: "A 22-meter high tower dedicated to the first Jain Tirthankara, Adinath. Famous for its intricate Jain sculptures.",
                    wiki: "https://en.wikipedia.org/wiki/Kirti_Stambha",
                    bestTime: "Oct - March",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Kirti_Stambha_Chittorgarh.jpg/640px-Kirti_Stambha_Chittorgarh.jpg",
                    coordinates: [24.8926, 74.6460],
                    distances: {
                        railway: "6.5 km",
                        bus: "8.5 km",
                        airport: "95.5 km (Udaipur)"
                    }
                },
                {
                    id: 6,
                    name: "Padmini Palace",
                    desc: "The royal abode of Queen Padmini, surrounded by a lotus pool. A place of legendary beauty and tragedy.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Padmini's_Palace",
                    bestTime: "Oct - March",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Padmini_Palace_Chittorgarh.jpg/640px-Padmini_Palace_Chittorgarh.jpg",
                    coordinates: [24.8833, 74.6436],
                    distances: {
                        railway: "7.5 km",
                        bus: "9.5 km",
                        airport: "96.5 km (Udaipur)"
                    }
                },
                {
                    id: 7,
                    name: "Meera Temple",
                    desc: "An ornate temple dedicated to Meera Bai, a mystic poetess and devotee of Lord Krishna.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Meera_Temple",
                    bestTime: "Year-round",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Meera_Temple_Chittorgarh.jpg/640px-Meera_Temple_Chittorgarh.jpg",
                    coordinates: [24.8890, 74.6420],
                    distances: {
                        railway: "6.8 km",
                        bus: "8.8 km",
                        airport: "95.8 km (Udaipur)"
                    }
                },
                {
                    id: 8,
                    name: "Gaumukh Reservoir",
                    desc: "A sacred water tank shaped like a cow's mouth, vital for the fort's water supply and a scenic spot.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Gaumukh_Reservoir",
                    bestTime: "Monsoon & Winter",
                    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gaumukh_Reservoir_Chittorgarh.jpg/640px-Gaumukh_Reservoir_Chittorgarh.jpg",
                    coordinates: [24.8870, 74.6430],
                    distances: {
                        railway: "7.2 km",
                        bus: "9.2 km",
                        airport: "96.2 km (Udaipur)"
                    }
                }
            ]
        },
        vendors: {
            title: "Local Flavors & Royal Delicacies",
            items: [
                {
                    id: 1,
                    name: "RR Hotel",
                    specialty: "Authentic Rajasthani Thali",
                    location: "Chittorgarh",
                    desc: "Famous for its traditional Daal Baati Churma and rustic ambiance. A true taste of Rajasthan.",
                    mapLink: "https://share.google/MNSRduo3ZrKPaPOrj",
                    distances: {
                        railway: "2 km",
                        bus: "3 km",
                        airport: "92 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Agarsen Sweets",
                    specialty: "Gulab Jamun",
                    location: "Chittorgarh Fort Road",
                    desc: "Famous for its melt-in-the-mouth Gulab Jamuns, a treat for every sweet tooth visiting the Fort.",
                    mapLink: "https://maps.google.com/?q=Agarsen+Sweets+Chittorgarh",
                    distances: {
                        railway: "3 km",
                        bus: "4 km",
                        airport: "94 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Somani Restaurant",
                    specialty: "Famous Gulab Jamun",
                    location: "Bassi, Chittorgarh",
                    desc: "Renowned across the region for its rich and delicious Gulab Jamuns. A must-visit stop in Bassi.",
                    mapLink: "https://maps.google.com/?q=Somani+Restaurant+Bassi",
                    distances: {
                        railway: "25 km",
                        bus: "27 km",
                        airport: "115 km (Udaipur)"
                    }
                }
            ]
        },
        cafes: {
            title: "Cafes & Hangouts",
            items: [
                {
                    id: 1,
                    name: "The Muds For Buds",
                    specialty: "Rooftop Cafe",
                    location: "Chittorgarh Fort Road",
                    desc: "A cozy rooftop cafe with stunning fort views, known for its creative ambiance and delicious coffee.",
                    mapLink: "https://maps.google.com/?q=The+Muds+For+Buds+Chittorgarh",
                    distances: {
                        railway: "3.5 km",
                        bus: "4.5 km",
                        airport: "94.5 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "The Rawal Kothi",
                    specialty: "Heritage Dining",
                    location: "Near City View Point",
                    desc: "Experience royal dining in a restored 1800s palace with panoramic views of Chittorgarh Fort.",
                    mapLink: "https://maps.google.com/?q=The+Rawal+Kothi+Chittorgarh",
                    distances: {
                        railway: "6 km",
                        bus: "8 km",
                        airport: "95 km (Udaipur)"
                    }
                }
            ]
        },
        hotels: {
            title: "Royal Stays & Comfort",
            items: [
                {
                    id: 1,
                    name: "Hotel The Grand Chittor",
                    rating: "4.0/5",
                    desc: "Luxury hotel featuring a rooftop pool with stunning city and fort views.",
                    bookingLink: "https://www.google.com/search?q=Hotel+The+Grand+Chittor+booking",
                    distances: {
                        railway: "1.5 km",
                        bus: "2.5 km",
                        airport: "91 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Kukda Resort",
                    rating: "4.2/5",
                    desc: "Modern architecture with a beautiful garden and swimming pool, perfect for families.",
                    bookingLink: "https://www.google.com/search?q=Kukda+Resort+Chittorgarh+booking",
                    distances: {
                        railway: "4 km",
                        bus: "6 km",
                        airport: "93 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Hotel Kumbha Retreat & SPA",
                    rating: "4.5/5",
                    desc: "A luxurious experience with an on-site spa, offering comfort and elegance.",
                    bookingLink: "https://www.google.com/search?q=Hotel+Kumbha+Retreat+SPA+Chittorgarh+booking",
                    distances: {
                        railway: "3 km",
                        bus: "5 km",
                        airport: "92.5 km (Udaipur)"
                    }
                },
                {
                    id: 4,
                    name: "Hotel Pratap Palace",
                    rating: "4.3/5",
                    desc: "Known for warm hospitality and refined ambiance, a great blend of luxury and tradition.",
                    bookingLink: "https://www.google.com/search?q=Hotel+Pratap+Palace+Chittorgarh+booking",
                    distances: {
                        railway: "2.5 km",
                        bus: "4.5 km",
                        airport: "91.5 km (Udaipur)"
                    }
                }
            ]
        },
        footer: {
            copyright: "© 2024 Chittorgarh Heritage Tourism. All Rights Reserved.",
            dedication: "Dedicated to the brave souls of Mewar.",
            contact: "Contact"
        }
    },
    hi: {
        nav: {
            home: "मुख पृष्ठ",
            history: "इतिहास",
            attractions: "पर्यटन स्थल",
            vendors: "शाही व्यंजन",
            hotels: "रुकने की जगह",
            langBtn: "English"
        },
        common: {
            bestTime: "सबसे अच्छा समय",
            railway: "रेलवे स्टेशन",
            bus: "बस स्टैंड",
            airport: "हवाई अड्डा",
            bookNow: "अभी बुक करें",
            readMore: "और पढ़ें",
            viewMap: "नक्शा देखें"
        },
        hero: {
            title: "चित्तौड़गढ़",
            subtitle: "शौर्य और बलिदान की पावन धरा",
            cta: "विरासत का अनुभव करें",
            scroll: "अन्वेषण करें"
        },
        history: {
            title: "ऐतिहासिक महत्व",
            text: "चित्तौड़गढ़ राजपुताना शौर्य, स्वाभिमान और जुनून की कहानियों से गूंजता है। राजस्थान के चारण और भाट यहाँ के शासकों और महान रानी पद्मिनी के बलिदान की गाथाएं गाते हैं। 180 मीटर ऊंची पहाड़ी पर स्थित यह भव्य किला राजपूतों की अदम्य भावना का प्रमाण है। इसने अपनी गरिमा की रक्षा के लिए महिलाओं द्वारा तीन जौहर (सामूहिक आत्मदाह) देखे हैं।",
            readMore: "पूरा इतिहास विकिपीडिया पर पढ़ें",
            wikiLink: "https://hi.wikipedia.org/wiki/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8C%E0%A4%A1%E0%A4%BC%E0%A4%97%E0%A4%A2%E0%A4%BC"
        },
        attractions: {
            title: "प्रमुख पर्यटन स्थल",
            items: [
                {
                    id: 1,
                    name: "चित्तौड़गढ़ किला",
                    desc: "यूनेस्को विश्व धरोहर स्थल और भारत का सबसे बड़ा किला। यह राजसी वास्तुकला और लचीलेपन का प्रतीक है।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8C%E0%A4%A1%E0%A4%BC_%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97",
                    bestTime: "अक्टूबर - मार्च (सर्दी)",
                    images: [
                        "https://images.unsplash.com/photo-1590666066228-5d259508544e?q=80&w=1200",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chittorgarh_Fort_Gaumukh.jpg/1200px-Chittorgarh_Fort_Gaumukh.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chittorgarh_fort.JPG/1280px-Chittorgarh_fort.JPG"
                    ],
                    distances: {
                        railway: "6 किमी",
                        bus: "8 किमी",
                        airport: "96 किमी (उदयपुर)"
                    }
                },
                {
                    id: 2,
                    name: "बस्सी वन्यजीव अभयारण्य",
                    desc: "प्रकृति प्रेमियों के लिए एक शांत आश्रय, जहाँ वन्यजीव और बस्सी बांध का शांत जल देखने को मिलता है।",
                    wiki: "https://en.wikipedia.org/wiki/Bassi_Wildlife_Sanctuary",
                    bestTime: "अक्टूबर - फरवरी",
                    distances: {
                        railway: "25 किमी",
                        bus: "27 किमी",
                        airport: "115 किमी (उदयपुर)"
                    }
                },
                {
                    id: 3,
                    name: "सांवलिया जी मंदिर",
                    desc: "भगवान कृष्ण (सांवलिया सेठ) को समर्पित एक प्रसिद्ध मंदिर, जहाँ लाखों भक्त दर्शन के लिए आते हैं।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%B5%E0%A4%B2%E0%A4%BF%E0%A4%AF%E0%A4%BE_%E0%A4%B8%E0%A5%87%E0%A4%A0",
                    bestTime: "साल भर (त्योहारों पर विशेष)",
                    distances: {
                        railway: "35 किमी",
                        bus: "37 किमी",
                        airport: "70 किमी (उदयपुर)"
                    }
                },
                {
                    id: 4,
                    name: "विजय स्तंभ",
                    desc: "राणा कुंभा द्वारा अपनी जीत के उपलक्ष्य में निर्मित। यह 9 मंजिला स्तंभ जटिल नक्काशी से सुसज्जित है।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A4%AF_%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A4%82%E0%A4%AD",
                    bestTime: "अक्टूबर - मार्च",
                    distances: {
                        railway: "7 किमी",
                        bus: "9 किमी",
                        airport: "96 किमी (उदयपुर)"
                    }
                },
                {
                    id: 5,
                    name: "कीर्ति स्तंभ",
                    desc: "प्रथम जैन तीर्थंकर आदिनाथ को समर्पित 22 मीटर ऊंची मीनार। अपनी जटिल जैन मूर्तियों के लिए प्रसिद्ध।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%95%E0%A5%80%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%BF_%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A4%AE%E0%A5%8D%E0%A4%AD",
                    bestTime: "अक्टूबर - मार्च",
                    distances: {
                        railway: "6.5 किमी",
                        bus: "8.5 किमी",
                        airport: "95.5 किमी (उदयपुर)"
                    }
                },
                {
                    id: 6,
                    name: "पद्मिनी महल",
                    desc: "रानी पद्मिनी का शाही निवास, जो कमल के कुंड से घिरा हुआ है। पौराणिक सुंदरता और त्रासदी का स्थान।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8C%E0%A4%A1%E0%A4%BC_%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97#%E0%A4%AA%E0%A4%A6%E0%A5%8D%E0%A4%AE%E0%A4%BF%E0%A4%A8%E0%A5%80_%E0%A4%AE%E0%A4%B9%E0%A4%B2",
                    bestTime: "अक्टूबर - मार्च",
                    distances: {
                        railway: "7.5 किमी",
                        bus: "9.5 किमी",
                        airport: "96.5 किमी (उदयपुर)"
                    }
                },
                {
                    id: 7,
                    name: "मीरा मंदिर",
                    desc: "मीरा बाई को समर्पित एक अलंकृत मंदिर, जो भगवान कृष्ण की भक्त और रहस्यवादी कवयित्री थीं।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8C%E0%A4%A1%E0%A4%BC_%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97#%E0%A4%AE%E0%A5%80%E0%A4%B0%E0%A4%BE_%E0%A4%AE%E0%A4%82%E0%A4%A6%E0%A4%BF%E0%A4%B0",
                    bestTime: "साल भर",
                    distances: {
                        railway: "6.8 किमी",
                        bus: "8.8 किमी",
                        airport: "95.8 किमी (उदयपुर)"
                    }
                },
                {
                    id: 8,
                    name: "गौमुख कुंड",
                    desc: "गाय के मुख के आकार का एक पवित्र जल कुंड, जो किले की जल आपूर्ति के लिए महत्वपूर्ण था।",
                    wiki: "https://hi.wikipedia.org/wiki/%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8C%E0%A4%A1%E0%A4%BC_%E0%A4%A6%E0%A5%81%E0%A4%B0%E0%A5%8D%E0%A4%97#%E0%A4%97%E0%A5%8C%E0%A4%AE%E0%A5%81%E0%A4%96_%E0%A4%95%E0%A5%81%E0%A4%A3%E0%A5%8D%E0%A4%A1",
                    bestTime: "मॉनसून और सर्दी",
                    distances: {
                        railway: "7.2 किमी",
                        bus: "9.2 किमी",
                        airport: "96.2 किमी (उदयपुर)"
                    }
                }
            ]
        },
        vendors: {
            title: "स्थानीय स्वाद और शाही व्यंजन",
            items: [
                {
                    id: 1,
                    name: "आर आर होटल (RR Hotel)",
                    specialty: "राजस्थानी थाली",
                    location: "चित्तौड़गढ़",
                    desc: "अपने पारंपरिक दाल बाटी चूरमा और देसी माहौल के लिए प्रसिद्ध। राजस्थान का असली स्वाद।",
                    mapLink: "https://share.google/MNSRduo3ZrKPaPOrj",
                    distances: {
                        railway: "2 किमी",
                        bus: "3 किमी",
                        airport: "92 किमी (उदयपुर)"
                    }
                },
                {
                    id: 2,
                    name: "अग्रसेन स्वीट्स",
                    specialty: "गुलाब जामुन",
                    location: "चित्तौड़गढ़ फोर्ट रोड",
                    desc: "अपने मुंह में घुलने वाले गुलाब जामुन के लिए प्रसिद्ध। किले की यात्रा के दौरान मीठा खाने का सही स्थान।",
                    mapLink: "https://maps.google.com/?q=Agarsen+Sweets+Chittorgarh",
                    distances: {
                        railway: "3 किमी",
                        bus: "4 किमी",
                        airport: "94 किमी (उदयपुर)"
                    }
                },
                {
                    id: 3,
                    name: "सोमानी रेस्टोरेंट",
                    specialty: "प्रसिद्ध गुलाब जामुन",
                    location: "बस्सी, चित्तौड़गढ़",
                    desc: "बस्सी और पूरे क्षेत्र में अपने स्वादिष्ट गुलाब जामुन के लिए विख्यात। बस्सी में एक अनिवार्य पड़ाव।",
                    mapLink: "https://maps.google.com/?q=Somani+Restaurant+Bassi",
                    distances: {
                        railway: "25 किमी",
                        bus: "27 किमी",
                        airport: "115 किमी (उदयपुर)"
                    }
                }
            ]
        },
        cafes: {
            title: "कैफे और हैंगआउट",
            items: [
                {
                    id: 1,
                    name: "द मड्स फॉर बड्स",
                    specialty: "रूफटॉप कैफे",
                    location: "चित्तौड़गढ़ फोर्ट रोड",
                    desc: "शानदार किले के दृश्यों के साथ एक आरामदायक रूफटॉप कैफे, जो अपने रचनात्मक माहौल और स्वादिष्ट कॉफी के लिए जाना जाता है।",
                    mapLink: "https://maps.google.com/?q=The+Muds+For+Buds+Chittorgarh",
                    distances: {
                        railway: "3.5 किमी",
                        bus: "4.5 किमी",
                        airport: "94.5 किमी (उदयपुर)"
                    }
                },
                {
                    id: 2,
                    name: "द रावल कोठी",
                    specialty: "हेरिटेज डाइनिंग",
                    location: "सिटी व्यू पॉइंट के पास",
                    desc: "चित्तौड़गढ़ किले के मनोरम दृश्यों के साथ 1800 के दशक के बहाल महल में शाही भोजन का अनुभव करें।",
                    mapLink: "https://maps.google.com/?q=The+Rawal+Kothi+Chittorgarh",
                    distances: {
                        railway: "6 किमी",
                        bus: "8 किमी",
                        airport: "95 किमी (उदयपुर)"
                    }
                }
            ]
        },
        hotels: {
            title: "शाही निवास और आराम",
            items: [
                {
                    id: 1,
                    name: "होटल द ग्रैंड चित्तौड़",
                    rating: "4.0/5",
                    desc: "छत पर पूल और शहर के शानदार दृश्यों वाला लग्जरी होटल।",
                    bookingLink: "https://www.google.com/search?q=Hotel+The+Grand+Chittor+booking",
                    distances: {
                        railway: "1.5 किमी",
                        bus: "2.5 किमी",
                        airport: "91 किमी (उदयपुर)"
                    }
                },
                {
                    id: 2,
                    name: "कुकड़ा रिज़ॉर्ट",
                    rating: "4.2/5",
                    desc: "सुंदर बगीचे और स्विमिंग पूल के साथ आधुनिक वास्तुकला, परिवारों के लिए आदर्श।",
                    bookingLink: "https://www.google.com/search?q=Kukda+Resort+Chittorgarh+booking",
                    distances: {
                        railway: "4 किमी",
                        bus: "6 किमी",
                        airport: "93 किमी (उदयपुर)"
                    }
                },
                {
                    id: 3,
                    name: "होटल कुंभा रिट्रीट और स्पा",
                    rating: "4.5/5",
                    desc: "साइट पर स्पा के साथ एक शानदार अनुभव, आराम और शान का प्रतीक।",
                    bookingLink: "https://www.google.com/search?q=Hotel+Kumbha+Retreat+SPA+Chittorgarh+booking",
                    distances: {
                        railway: "3 किमी",
                        bus: "5 किमी",
                        airport: "92.5 किमी (उदयपुर)"
                    }
                },
                {
                    id: 4,
                    name: "होटल प्रताप पैलेस",
                    rating: "4.3/5",
                    desc: "गर्मजोशी भरे आतिथ्य और परिष्कृत माहौल के लिए जाना जाता है।",
                    bookingLink: "https://www.google.com/search?q=Hotel+Pratap+Palace+Chittorgarh+booking",
                    distances: {
                        railway: "2.5 किमी",
                        bus: "4.5 किमी",
                        airport: "91.5 किमी (उदयपुर)"
                    }
                }
            ]
        },
        footer: {
            copyright: "© 2024 चित्तौड़गढ़ विरासत पर्यटन। सर्वाधिकार सुरक्षित।",
            dedication: "मेवाड़ के वीर सपूतों को समर्पित।",
            contact: "संपर्क करें"
        }
    },
    es: {
        nav: {
            home: "Inicio",
            history: "Historia",
            attractions: "Atracciones",
            vendors: "Cocina Real",
            hotels: "Estancia de Lujo",
            langBtn: "English"
        },
        common: {
            bestTime: "Mejor Momento",
            railway: "Estación de Tren",
            bus: "Estación de Autobús",
            airport: "Aeropuerto",
            bookNow: "Reservar Ahora",
            readMore: "Leer Más",
            viewMap: "Ver Mapa"
        },
        hero: {
            title: "Chittorgarh",
            subtitle: "La Ciudadela del Valor y el Sacrificio",
            cta: "Vive el Legado",
            scroll: "Desplazar para Explorar"
        },
        history: {
            title: "Importancia Histórica",
            text: "Chittorgarh resuena con historias de valentía, orgullo y pasión de Rajputana. Los bardos de Rajastán cantan historias de coraje y sacrificio, haciendo eco del heroísmo de sus gobernantes y la legendaria reina Padmini. El majestuoso Fuerte, situado en lo alto de una colina de 180 metros, es un testimonio del espíritu indomable de los Rajputs. Ha sido testigo de tres Jauhars (autoinmolación masiva) por parte de mujeres para proteger su honor.",
            readMore: "Leer historia completa en Wikipedia",
            wikiLink: "https://es.wikipedia.org/wiki/Fuerte_de_Chittor"
        },
        attractions: {
            title: "Principales Atracciones Turísticas",
            items: [
                {
                    id: 1,
                    name: "Fuerte de Chittorgarh",
                    desc: "Patrimonio de la Humanidad por la UNESCO y el fuerte más grande de la India. Un símbolo de resistencia y brillantez arquitectónica.",
                    wiki: "https://es.wikipedia.org/wiki/Fuerte_de_Chittor",
                    bestTime: "Oct - Mar (Invierno)",
                    images: [
                        "https://images.unsplash.com/photo-1590666066228-5d259508544e?q=80&w=1200",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chittorgarh_Fort_Gaumukh.jpg/1200px-Chittorgarh_Fort_Gaumukh.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chittorgarh_fort.JPG/1280px-Chittorgarh_fort.JPG"
                    ],
                    distances: {
                        railway: "6 km",
                        bus: "8 km",
                        airport: "96 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Santuario de Vida Silvestre Bassi y Presa",
                    desc: "Un refugio sereno para los amantes de la naturaleza, que ofrece una visión de la vida silvestre y las tranquilas aguas de la presa Bassi.",
                    wiki: "https://en.wikipedia.org/wiki/Bassi_Wildlife_Sanctuary",
                    bestTime: "Oct - Feb",
                    distances: {
                        railway: "25 km",
                        bus: "27 km",
                        airport: "115 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Templo Sanwariaji",
                    desc: "Un venerado templo dedicado al Señor Krishna, conocido como 'Sanwaria Seth', que atrae a millones de devotos.",
                    wiki: "https://en.wikipedia.org/wiki/Sanwariaji_Temple",
                    bestTime: "Todo el año",
                    distances: {
                        railway: "35 km",
                        bus: "37 km",
                        airport: "70 km (Udaipur)"
                    }
                },
                {
                    id: 4,
                    name: "Vijay Stambh (Torre de la Victoria)",
                    desc: "Construida por Rana Kumbha para conmemorar su victoria. Una torre de 9 pisos adornada con intrincadas esculturas.",
                    wiki: "https://en.wikipedia.org/wiki/Vijay_Stambha",
                    bestTime: "Oct - Mar",
                    distances: {
                        railway: "7 km",
                        bus: "9 km",
                        airport: "96 km (Udaipur)"
                    }
                },
                {
                    id: 5,
                    name: "Kirti Stambh (Torre de la Fama)",
                    desc: "Una torre de 22 metros de altura dedicada al primer Tirthankara jaina, Adinath. Famosa por sus intrincadas esculturas jainistas.",
                    wiki: "https://en.wikipedia.org/wiki/Kirti_Stambha",
                    bestTime: "Oct - Mar",
                    distances: {
                        railway: "6.5 km",
                        bus: "8.5 km",
                        airport: "95.5 km (Udaipur)"
                    }
                },
                {
                    id: 6,
                    name: "Palacio Padmini",
                    desc: "La morada real de la reina Padmini, rodeada por un estanque de lotos. Un lugar de legendaria belleza y tragedia.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Padmini's_Palace",
                    bestTime: "Oct - Mar",
                    distances: {
                        railway: "7.5 km",
                        bus: "9.5 km",
                        airport: "96.5 km (Udaipur)"
                    }
                },
                {
                    id: 7,
                    name: "Templo Meera",
                    desc: "Un templo ornamentado dedicado a Meera Bai, una poeta mística y devota del Señor Krishna.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Meera_Temple",
                    bestTime: "Todo el año",
                    distances: {
                        railway: "6.8 km",
                        bus: "8.8 km",
                        airport: "95.8 km (Udaipur)"
                    }
                },
                {
                    id: 8,
                    name: "Embalse Gaumukh",
                    desc: "Un tanque de agua sagrada con forma de boca de vaca, vital para el suministro de agua del fuerte y un lugar pintoresco.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Gaumukh_Reservoir",
                    bestTime: "Monzón e Invierno",
                    distances: {
                        railway: "7.2 km",
                        bus: "9.2 km",
                        airport: "96.2 km (Udaipur)"
                    }
                }
            ]
        },
        vendors: {
            title: "Sabores Locales y Manjares Reales",
            items: [
                {
                    id: 1,
                    name: "Hotel RR (RR Hotel)",
                    specialty: "Thali Rajasthani Auténtico",
                    location: "Chittorgarh",
                    desc: "Famoso por su tradicional Daal Baati Churma y ambiente rústico. Un verdadero sabor de Rajastán.",
                    mapLink: "https://share.google/MNSRduo3ZrKPaPOrj",
                    distances: {
                        railway: "2 km",
                        bus: "3 km",
                        airport: "92 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Dulces Agarsen",
                    specialty: "Gulab Jamun",
                    location: "Carretera del Fuerte Chittorgarh",
                    desc: "Famoso por sus Gulab Jamuns que se derriten en la boca, un placer para todos los golosos que visitan el Fuerte.",
                    mapLink: "https://maps.google.com/?q=Agarsen+Sweets+Chittorgarh",
                    distances: {
                        railway: "3 km",
                        bus: "4 km",
                        airport: "94 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Restaurante Somani",
                    specialty: "Famoso Gulab Jamun",
                    location: "Bassi, Chittorgarh",
                    desc: "Reconocido en toda la región por sus ricos y deliciosos Gulab Jamuns. Una parada obligada en Bassi.",
                    mapLink: "https://maps.google.com/?q=Somani+Restaurant+Bassi",
                    distances: {
                        railway: "25 km",
                        bus: "27 km",
                        airport: "115 km (Udaipur)"
                    }
                }
            ]
        },
        cafes: {
            title: "Cafés y Lugares de Reunión",
            items: [
                {
                    id: 1,
                    name: "The Muds For Buds",
                    specialty: "Café en la Azotea",
                    location: "Carretera del Fuerte Chittorgarh",
                    desc: "Un acogedor café en la azotea con impresionantes vistas al fuerte, conocido por su ambiente creativo y delicioso café.",
                    mapLink: "https://maps.google.com/?q=The+Muds+For+Buds+Chittorgarh",
                    distances: {
                        railway: "3.5 km",
                        bus: "4.5 km",
                        airport: "94.5 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "The Rawal Kothi",
                    specialty: "Cena Patrimonial",
                    location: "Cerca del Mirador de la Ciudad",
                    desc: "Experimente una cena real en un palacio restaurado del siglo XIX con vistas panorámicas del Fuerte de Chittorgarh.",
                    mapLink: "https://maps.google.com/?q=The+Rawal+Kothi+Chittorgarh",
                    distances: {
                        railway: "6 km",
                        bus: "8 km",
                        airport: "95 km (Udaipur)"
                    }
                }
            ]
        },
        hotels: {
            title: "Estancias Reales y Confort",
            items: [
                {
                    id: 1,
                    name: "Hotel The Grand Chittor",
                    rating: "4.0/5",
                    desc: "Hotel de lujo con piscina en la azotea e impresionantes vistas de la ciudad y el fuerte.",
                    bookingLink: "https://www.google.com/search?q=Hotel+The+Grand+Chittor+booking",
                    distances: {
                        railway: "1.5 km",
                        bus: "2.5 km",
                        airport: "91 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Kukda Resort",
                    rating: "4.2/5",
                    desc: "Arquitectura moderna con un hermoso jardín y piscina, perfecto para familias.",
                    bookingLink: "https://www.google.com/search?q=Kukda+Resort+Chittorgarh+booking",
                    distances: {
                        railway: "4 km",
                        bus: "6 km",
                        airport: "93 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Hotel Kumbha Retreat & SPA",
                    rating: "4.5/5",
                    desc: "Una experiencia de lujo con spa, que ofrece comodidad y elegancia.",
                    bookingLink: "https://www.google.com/search?q=Hotel+Kumbha+Retreat+SPA+Chittorgarh+booking",
                    distances: {
                        railway: "3 km",
                        bus: "5 km",
                        airport: "92.5 km (Udaipur)"
                    }
                },
                {
                    id: 4,
                    name: "Hotel Pratap Palace",
                    rating: "4.3/5",
                    desc: "Conocido por su cálida hospitalidad y ambiente refinado, una gran mezcla de lujo y tradición.",
                    bookingLink: "https://www.google.com/search?q=Hotel+Pratap+Palace+Chittorgarh+booking",
                    distances: {
                        railway: "2.5 km",
                        bus: "4.5 km",
                        airport: "91.5 km (Udaipur)"
                    }
                }
            ]
        },
        footer: {
            copyright: "© 2024 Turismo Patrimonial de Chittorgarh. Todos los derechos reservados.",
            dedication: "Dedicado a las almas valientes de Mewar.",
            contact: "Contacto"
        }
    },
    fr: {
        nav: {
            home: "Accueil",
            history: "Histoire",
            attractions: "Attractions",
            vendors: "Cuisine Royale",
            hotels: "Séjour de Luxe",
            langBtn: "English"
        },
        common: {
            bestTime: "Meilleur Moment",
            railway: "Gare Ferroviaire",
            bus: "Arrêt de Bus",
            airport: "Aéroport",
            bookNow: "Réserver",
            readMore: "Lire Plus",
            viewMap: "Voir la Carte"
        },
        hero: {
            title: "Chittorgarh",
            subtitle: "La Citadelle de la Valeur et du Sacrifice",
            cta: "Vivez l'Héritage",
            scroll: "Défiler pour Explorer"
        },
        history: {
            title: "Importance Historique",
            text: "Chittorgarh résonne avec des histoires de bravoure, de fierté et de passion Rajput. Le Fort majestueux est un témoignage de l'esprit indomptable des Rajputs.",
            readMore: "Lire l'histoire complète sur Wikipedia",
            wikiLink: "https://fr.wikipedia.org/wiki/Fort_de_Chittorgarh"
        },
        attractions: {
            title: "Attractions Touristiques Majeures",
            items: [
                {
                    id: 1,
                    name: "Fort de Chittorgarh",
                    desc: "Un site du patrimoine mondial de l'UNESCO et le plus grand fort de l'Inde. Un symbole de résilience.",
                    wiki: "https://fr.wikipedia.org/wiki/Fort_de_Chittorgarh",
                    bestTime: "Oct - Mars (Hiver)",
                    images: [
                        "https://images.unsplash.com/photo-1590666066228-5d259508544e?q=80&w=1200",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chittorgarh_Fort_Gaumukh.jpg/1200px-Chittorgarh_Fort_Gaumukh.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chittorgarh_fort.JPG/1280px-Chittorgarh_fort.JPG"
                    ],
                    distances: {
                        railway: "6 km",
                        bus: "8 km",
                        airport: "96 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Sanctuaire de Faune de Bassi",
                    desc: "Un havre serein pour les amoureux de la nature, offrant un aperçu de la faune et du barrage de Bassi.",
                    wiki: "https://en.wikipedia.org/wiki/Bassi_Wildlife_Sanctuary",
                    bestTime: "Oct - Fév",
                    distances: {
                        railway: "25 km",
                        bus: "27 km",
                        airport: "115 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Temple Sanwariaji",
                    desc: "Un temple vénéré dédié au Seigneur Krishna, attirant des millions de dévots.",
                    wiki: "https://en.wikipedia.org/wiki/Sanwariaji_Temple",
                    bestTime: "Toute l'année",
                    distances: {
                        railway: "35 km",
                        bus: "37 km",
                        airport: "70 km (Udaipur)"
                    }
                },
                {
                    id: 4,
                    name: "Vijay Stambh (Tour de la Victoire)",
                    desc: "Construite par Rana Kumbha pour commémorer sa victoire. Une tour de 9 étages ornée de sculptures.",
                    wiki: "https://fr.wikipedia.org/wiki/Vijay_Stambha",
                    bestTime: "Oct - Mars",
                    distances: {
                        railway: "7 km",
                        bus: "9 km",
                        airport: "96 km (Udaipur)"
                    }
                },
                {
                    id: 5,
                    name: "Kirti Stambh",
                    desc: "Une tour de 22 mètres dédiée au premier Tirthankara Jain. Célèbre pour ses sculptures complexes.",
                    wiki: "https://en.wikipedia.org/wiki/Kirti_Stambha",
                    bestTime: "Oct - Mars",
                    distances: {
                        railway: "6.5 km",
                        bus: "8.5 km",
                        airport: "95.5 km (Udaipur)"
                    }
                },
                {
                    id: 6,
                    name: "Palais Padmini",
                    desc: "La demeure royale de la reine Padmini. Un lieu de beauté légendaire et de tragédie.",
                    wiki: "https://fr.wikipedia.org/wiki/Padmini",
                    bestTime: "Oct - Mars",
                    distances: {
                        railway: "7.5 km",
                        bus: "9.5 km",
                        airport: "96.5 km (Udaipur)"
                    }
                },
                {
                    id: 7,
                    name: "Temple Meera",
                    desc: "Un temple orné dédié à Meera Bai, une poétesse mystique et dévote de Krishna.",
                    wiki: "https://fr.wikipedia.org/wiki/M%C3%Arav%C4%AB",
                    bestTime: "Toute l'année",
                    distances: {
                        railway: "6.8 km",
                        bus: "8.8 km",
                        airport: "95.8 km (Udaipur)"
                    }
                },
                {
                    id: 8,
                    name: "Réservoir Gaumukh",
                    desc: "Un réservoir d'eau sacré en forme de bouche de vache, vital pour l'approvisionnement en eau du fort.",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Gaumukh_Reservoir",
                    bestTime: "Mousson et Hiver",
                    distances: {
                        railway: "7.2 km",
                        bus: "9.2 km",
                        airport: "96.2 km (Udaipur)"
                    }
                }
            ]
        },
        vendors: {
            title: "Saveurs Locales et Cuisine Royale",
            items: [
                {
                    id: 1,
                    name: "Hôtel RR",
                    specialty: "Thali Rajasthani Authentique",
                    location: "Chittorgarh",
                    desc: "Célèbre pour son Daal Baati Churma traditionnel.",
                    mapLink: "https://share.google/MNSRduo3ZrKPaPOrj",
                    distances: {
                        railway: "2 km",
                        bus: "3 km",
                        airport: "92 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Agarsen Sweets",
                    specialty: "Gulab Jamun",
                    location: "Route du Fort de Chittorgarh",
                    desc: "Célèbre pour ses Gulab Jamuns fondants.",
                    mapLink: "https://maps.google.com/?q=Agarsen+Sweets+Chittorgarh",
                    distances: {
                        railway: "3 km",
                        bus: "4 km",
                        airport: "94 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Restaurant Somani",
                    specialty: "Gulab Jamun Célèbre",
                    location: "Bassi, Chittorgarh",
                    desc: "Renommé pour ses délicieux Gulab Jamuns.",
                    mapLink: "https://maps.google.com/?q=Somani+Restaurant+Bassi",
                    distances: {
                        railway: "25 km",
                        bus: "27 km",
                        airport: "115 km (Udaipur)"
                    }
                }
            ]
        },
        cafes: {
            title: "Cafés et Détente",
            items: [
                {
                    id: 1,
                    name: "The Muds For Buds",
                    specialty: "Café sur le Toit",
                    location: "Route du Fort de Chittorgarh",
                    desc: "Un café confortable sur le toit avec une vue imprenable sur le fort.",
                    mapLink: "https://maps.google.com/?q=The+Muds+For+Buds+Chittorgarh",
                    distances: {
                        railway: "3.5 km",
                        bus: "4.5 km",
                        airport: "94.5 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "The Rawal Kothi",
                    specialty: "Dîner Patrimonial",
                    location: "Près du Point de Vue",
                    desc: "Vivez un dîner royal dans un palais restauré du 19ème siècle.",
                    mapLink: "https://maps.google.com/?q=The+Rawal+Kothi+Chittorgarh",
                    distances: {
                        railway: "6 km",
                        bus: "8 km",
                        airport: "95 km (Udaipur)"
                    }
                }
            ]
        },
        hotels: {
            title: "Séjours Royaux",
            items: [
                {
                    id: 1,
                    name: "Hotel The Grand Chittor",
                    rating: "4.0/5",
                    desc: "Hôtel de luxe avec piscine sur le toit.",
                    bookingLink: "https://www.google.com/search?q=Hotel+The+Grand+Chittor+booking",
                    distances: {
                        railway: "1.5 km",
                        bus: "2.5 km",
                        airport: "91 km (Udaipur)"
                    }
                },
                {
                    id: 2,
                    name: "Kukda Resort",
                    rating: "4.2/5",
                    desc: "Architecture moderne avec un beau jardin et piscine.",
                    bookingLink: "https://www.google.com/search?q=Kukda+Resort+Chittorgarh+booking",
                    distances: {
                        railway: "4 km",
                        bus: "6 km",
                        airport: "93 km (Udaipur)"
                    }
                },
                {
                    id: 3,
                    name: "Hotel Kumbha Retreat & SPA",
                    rating: "4.5/5",
                    desc: "Une expérience luxueuse avec spa sur place.",
                    bookingLink: "https://www.google.com/search?q=Hotel+Kumbha+Retreat+SPA+Chittorgarh+booking",
                    distances: {
                        railway: "3 km",
                        bus: "5 km",
                        airport: "92.5 km (Udaipur)"
                    }
                },
                {
                    id: 4,
                    name: "Hotel Pratap Palace",
                    rating: "4.3/5",
                    desc: "Connu pour son hospitalité chaleureuse.",
                    bookingLink: "https://www.google.com/search?q=Hotel+Pratap+Palace+Chittorgarh+booking",
                    distances: {
                        railway: "2.5 km",
                        bus: "4.5 km",
                        airport: "91.5 km (Udaipur)"
                    }
                }
            ]
        },
        footer: {
            copyright: "© 2024 Tourisme Patrimonial de Chittorgarh.",
            dedication: "Dédié aux âmes courageuses de Mewar.",
            contact: "Contact"
        }
    },
    zh: {
        nav: {
            home: "首页",
            history: "历史",
            attractions: "景点",
            vendors: "皇家美食",
            hotels: "豪华住宿",
            langBtn: "English"
        },
        common: {
            bestTime: "最佳时间",
            railway: "火车站",
            bus: "巴士站",
            airport: "机场",
            bookNow: "立即预订",
            readMore: "阅读更多",
            viewMap: "查看地图"
        },
        hero: {
            title: "吉多尔加尔 (Chittorgarh)",
            subtitle: "勇气与牺牲的堡垒",
            cta: "体验传奇",
            scroll: "滚动探索"
        },
        history: {
            title: "历史意义",
            text: "吉多尔加尔回荡着拉杰普特人英勇、骄傲和激情的故事。雄伟的堡垒耸立在180米高的小山上，是拉杰普特人不屈精神的见证。",
            readMore: "在维基百科上阅读完整历史",
            wikiLink: "https://zh.wikipedia.org/wiki/%E6%9F%B4%E5%A4%9A%E5%B0%94%E5%A0%A1"
        },
        attractions: {
            title: "主要旅游景点",
            items: [
                {
                    id: 1,
                    name: "吉多尔加尔堡",
                    desc: "联合国教科文组织世界遗产，印度最大的堡垒。韧性和建筑辉煌的象征。",
                    wiki: "https://zh.wikipedia.org/wiki/%E6%9F%B4%E5%A4%9A%E5%B0%94%E5%A0%A1",
                    bestTime: "10月 - 3月 (冬季)",
                    images: [
                        "https://images.unsplash.com/photo-1590666066228-5d259508544e?q=80&w=1200",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Chittorgarh_Fort_Gaumukh.jpg/1200px-Chittorgarh_Fort_Gaumukh.jpg",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chittorgarh_fort.JPG/1280px-Chittorgarh_fort.JPG"
                    ],
                    distances: {
                        railway: "6 公里",
                        bus: "8 公里",
                        airport: "96 公里 (乌代布尔)"
                    }
                },
                {
                    id: 2,
                    name: "巴西野生动物保护区",
                    desc: "自然爱好者的宁静避风港，可以一瞥野生动物和巴西大坝的宁静水域。",
                    wiki: "https://en.wikipedia.org/wiki/Bassi_Wildlife_Sanctuary",
                    bestTime: "10月 - 2月",
                    distances: {
                        railway: "25 公里",
                        bus: "27 公里",
                        airport: "115 公里 (乌代布尔)"
                    }
                },
                {
                    id: 3,
                    name: "Sanwariaji 寺庙",
                    desc: "供奉奎师那神的著名寺庙，吸引了数百万信徒。",
                    wiki: "https://en.wikipedia.org/wiki/Sanwariaji_Temple",
                    bestTime: "全年",
                    distances: {
                        railway: "35 公里",
                        bus: "37 公里",
                        airport: "70 公里 (乌代布尔)"
                    }
                },
                {
                    id: 4,
                    name: "胜利塔 (Vijay Stambh)",
                    desc: "拉纳·库姆哈 (Rana Kumbha) 为纪念胜利而建。一座9层的塔楼，装饰着复杂的雕塑。",
                    wiki: "https://en.wikipedia.org/wiki/Vijay_Stambha",
                    bestTime: "10月 - 3月",
                    distances: {
                        railway: "7 公里",
                        bus: "9 公里",
                        airport: "96 公里 (乌代布尔)"
                    }
                },
                {
                    id: 5,
                    name: "名誉塔 (Kirti Stambh)",
                    desc: "一座22米高的塔楼，供奉第一位耆那教祖师阿迪纳特。以其复杂的雕塑而闻名。",
                    wiki: "https://en.wikipedia.org/wiki/Kirti_Stambha",
                    bestTime: "10月 - 3月",
                    distances: {
                        railway: "6.5 公里",
                        bus: "8.5 公里",
                        airport: "95.5 公里 (乌代布尔)"
                    }
                },
                {
                    id: 6,
                    name: "帕德米尼宫 (Padmini Palace)",
                    desc: "帕德米尼女王的皇家住所。传说中的美丽与悲剧之地。",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Padmini's_Palace",
                    bestTime: "10月 - 3月",
                    distances: {
                        railway: "7.5 公里",
                        bus: "9.5 公里",
                        airport: "96.5 公里 (乌代布尔)"
                    }
                },
                {
                    id: 7,
                    name: "米拉寺 (Meera Temple)",
                    desc: "供奉克里希纳的神秘女诗人米拉拜的华丽寺庙。",
                    wiki: "https://en.wikipedia.org/wiki/Meera",
                    bestTime: "全年",
                    distances: {
                        railway: "6.8 公里",
                        bus: "8.8 公里",
                        airport: "95.8 公里 (乌代布尔)"
                    }
                },
                {
                    id: 8,
                    name: "高穆赫水库 (Gaumukh Reservoir)",
                    desc: "一个牛嘴形状的神圣水箱，对堡垒的供水至关重要。",
                    wiki: "https://en.wikipedia.org/wiki/Chittor_Fort#Gaumukh_Reservoir",
                    bestTime: "季风和冬季",
                    distances: {
                        railway: "7.2 公里",
                        bus: "9.2 公里",
                        airport: "96.2 公里 (乌代布尔)"
                    }
                }
            ]
        },
        vendors: {
            title: "当地风味和皇家美食",
            items: [
                {
                    id: 1,
                    name: "RR 酒店",
                    specialty: "正宗拉贾斯坦塔利",
                    location: "吉多尔加尔",
                    desc: "以其传统的 Daal Baati Churma 闻名。",
                    mapLink: "https://share.google/MNSRduo3ZrKPaPOrj",
                    distances: {
                        railway: "2 公里",
                        bus: "3 公里",
                        airport: "92 公里 (乌代布尔)"
                    }
                },
                {
                    id: 2,
                    name: "Agarsen 甜点",
                    specialty: "古拉布贾蒙 (Gulab Jamun)",
                    location: "吉多尔加尔堡路",
                    desc: "以其入口即化的古拉布贾蒙闻名。",
                    mapLink: "https://maps.google.com/?q=Agarsen+Sweets+Chittorgarh",
                    distances: {
                        railway: "3 公里",
                        bus: "4 公里",
                        airport: "94 公里 (乌代布尔)"
                    }
                },
                {
                    id: 3,
                    name: "索马尼餐厅 (Somani Restaurant)",
                    specialty: "著名古拉布贾蒙",
                    location: "巴西, 吉多尔加尔",
                    desc: "以其美味的古拉布贾蒙在整个地区闻名。",
                    mapLink: "https://maps.google.com/?q=Somani+Restaurant+Bassi",
                    distances: {
                        railway: "25 公里",
                        bus: "27 公里",
                        airport: "115 公里 (乌代布尔)"
                    }
                }
            ]
        },
        cafes: {
            title: "咖啡馆和聚会场所",
            items: [
                {
                    id: 1,
                    name: "The Muds For Buds",
                    specialty: "屋顶咖啡馆",
                    location: "吉多尔加尔堡路",
                    desc: "舒适的屋顶咖啡馆，享有迷人的堡垒景观。",
                    mapLink: "https://maps.google.com/?q=The+Muds+For+Buds+Chittorgarh",
                    distances: {
                        railway: "3.5 公里",
                        bus: "4.5 公里",
                        airport: "94.5 公里 (乌代布尔)"
                    }
                },
                {
                    id: 2,
                    name: "The Rawal Kothi",
                    specialty: "遗产餐饮",
                    location: "靠近城市观景点",
                    desc: "在修复的1800年代宫殿中体验皇家餐饮。",
                    mapLink: "https://maps.google.com/?q=The+Rawal+Kothi+Chittorgarh",
                    distances: {
                        railway: "6 公里",
                        bus: "8 公里",
                        airport: "95 公里 (乌代布尔)"
                    }
                }
            ]
        },
        hotels: {
            title: "皇家住宿",
            items: [
                {
                    id: 1,
                    name: "Hotel The Grand Chittor",
                    rating: "4.0/5",
                    desc: "拥有屋顶游泳池的豪华酒店。",
                    bookingLink: "https://www.google.com/search?q=Hotel+The+Grand+Chittor+booking",
                    distances: {
                        railway: "1.5 公里",
                        bus: "2.5 公里",
                        airport: "91 公里 (乌代布尔)"
                    }
                },
                {
                    id: 2,
                    name: "Kukda Resort",
                    rating: "4.2/5",
                    desc: "现代建筑，拥有美丽的花园和游泳池。",
                    bookingLink: "https://www.google.com/search?q=Kukda+Resort+Chittorgarh+booking",
                    distances: {
                        railway: "4 公里",
                        bus: "6 公里",
                        airport: "93 公里 (乌代布尔)"
                    }
                },
                {
                    id: 3,
                    name: "Hotel Kumbha Retreat & SPA",
                    rating: "4.5/5",
                    desc: "带现场水疗中心的豪华体验。",
                    bookingLink: "https://www.google.com/search?q=Hotel+Kumbha+Retreat+SPA+Chittorgarh+booking",
                    distances: {
                        railway: "3 公里",
                        bus: "5 公里",
                        airport: "92.5 公里 (乌代布尔)"
                    }
                },
                {
                    id: 4,
                    name: "Hotel Pratap Palace",
                    rating: "4.3/5",
                    desc: "以热情好客和精致的氛围而闻名。",
                    bookingLink: "https://www.google.com/search?q=Hotel+Pratap+Palace+Chittorgarh+booking",
                    distances: {
                        railway: "2.5 公里",
                        bus: "4.5 公里",
                        airport: "91.5 公里 (乌代布尔)"
                    }
                }
            ]
        },
        footer: {
            copyright: "© 2024 吉多尔加尔遗产旅游。保留所有权利。",
            dedication: "献给梅瓦尔的勇敢灵魂。",
            contact: "联系我们"
        }
    }
};
