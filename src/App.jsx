import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import AttractionCard from './components/AttractionCard';
import VendorCard from './components/VendorCard';
import HotelCard from './components/HotelCard';
import Footer from './components/Footer';
import CountrySelector from './components/CountrySelector';
import WeatherWidget from './components/WeatherWidget';
import { motion, AnimatePresence } from 'framer-motion';

const MainContent = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const searchFilter = (items) => {
    if (!searchQuery.trim()) return items;
    const query = searchQuery.toLowerCase().trim();
    return items.filter(item =>
      item.name.toLowerCase().includes(query) ||
      (item.desc && item.desc.toLowerCase().includes(query)) ||
      (item.specialty && item.specialty.toLowerCase().includes(query))
    );
  };

  const filteredAttractions = useMemo(() => searchFilter(t.attractions.items), [searchQuery, t.attractions.items]);
  const filteredVendors = useMemo(() => searchFilter(t.vendors.items), [searchQuery, t.vendors.items]);
  const filteredCafes = useMemo(() => searchFilter(t.cafes.items), [searchQuery, t.cafes.items]);
  const filteredHotels = useMemo(() => searchFilter(t.hotels.items), [searchQuery, t.hotels.items]);

  const hasResults = filteredAttractions.length > 0 || filteredVendors.length > 0 || filteredCafes.length > 0 || filteredHotels.length > 0;

  return (
    <div className="min-h-screen flex flex-col relative text-royal-white font-sans selection:bg-royal-gold selection:text-royal-black bg-royal-black">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-image bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/city/banners/desk/Chittorgarh-Fort-banner.png')" }}
        ></motion.div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full">
        <CountrySelector />
        <Navbar onSearch={setSearchQuery} />
        <WeatherWidget />
        <Hero />

        {/* Search Status Indicator */}
        <AnimatePresence>
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-40"
            >
              <div className="px-6 py-2 glass-card rounded-full border-royal-gold/50 text-royal-gold text-sm font-serif">
                Showing results for: <span className="text-royal-white font-bold">"{searchQuery}"</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sections */}
        <div className="space-y-0">
          {/* History Section - Only visible when not searching */}
          {!searchQuery && (
            <Section id="history" title={t.history.title} className="bg-transparent">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
              >
                <p className="text-lg md:text-xl text-royal-white/80 leading-relaxed font-light mb-8 font-serif">
                  {t.history.text}
                </p>
                <a
                  href={t.history.wikiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block border-b border-royal-gold text-royal-gold pb-1 hover:text-royal-white hover:border-royal-white transition-all text-sm tracking-widest uppercase"
                >
                  {t.history.readMore}
                </a>
              </motion.div>
            </Section>
          )}

          {/* Attractions Section */}
          {filteredAttractions.length > 0 && (
            <Section id="attractions" title={t.attractions.title} className="bg-black/20 backdrop-blur-md border-y border-royal-gold/10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence>
                  {filteredAttractions.map(item => (
                    <AttractionCard key={`attr-${item.id}`} attraction={item} />
                  ))}
                </AnimatePresence>
              </div>
            </Section>
          )}

          {/* Vendors Section */}
          {filteredVendors.length > 0 && (
            <Section id="vendors" title={t.vendors.title} className="bg-transparent text-center">
              {!searchQuery && (
                <p className="max-w-2xl mx-auto text-gray-400 mb-12 font-light italic">
                  "Discover the culinary heritage of Chittorgarh. From the spicy Dal Baati to the sweet Gulab Jamun, every bite is a royal treat."
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredVendors.map(item => (
                  <VendorCard key={`vendor-${item.id}`} vendor={item} />
                ))}
              </div>
            </Section>
          )}

          {/* Cafes Section */}
          {filteredCafes.length > 0 && (
            <Section id="cafes" title={t.cafes.title} className="bg-black/20 backdrop-blur-md border-y border-royal-gold/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {filteredCafes.map(item => (
                  <VendorCard key={`cafe-${item.id}`} vendor={item} />
                ))}
              </div>
            </Section>
          )}

          {/* Hotels Section */}
          {filteredHotels.length > 0 && (
            <Section id="hotels" title={t.hotels.title} className="bg-transparent">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredHotels.map(item => (
                  <HotelCard key={`hotel-${item.id}`} hotel={item} />
                ))}
              </div>
            </Section>
          )}

          {/* No Results Message */}
          {searchQuery && !hasResults && (
            <Section id="no-results" title="No Results Found" className="bg-transparent">
              <div className="text-center py-20">
                <p className="text-royal-gold/50 font-serif italic text-2xl mb-4">No treasures found matching your search...</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 border border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-royal-black transition-all rounded-full uppercase tracking-widest text-xs"
                >
                  Clear Search
                </button>
              </div>
            </Section>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}

export default App;
