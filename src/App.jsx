import React, { useState, useMemo } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { cn } from './utils/cn';
import Section from './components/Section';
import AttractionModal from './components/AttractionModal';
import Footer from './components/Footer';
import CountrySelector from './components/CountrySelector';
import FactCards from './components/FactCards';
import ScrollToTop from './components/ScrollToTop';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import FlavorsPage from './pages/FlavorsPage';
import StaysPage from './pages/StaysPage';
import LocalVocalPage from './pages/LocalVocalPage';


import VisitModal from './components/VisitModal';
import HowToReach from './pages/HowToReach';
import GalleryPage from './pages/GalleryPage';

const MainContent = () => {
  const { t } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();


  // Auto-navigate if searching and results are on different pages? 
  // For now, let's just show results on the current page if they exist.

  return (
    <div className="min-h-screen flex flex-col relative text-royal-white font-sans selection:bg-royal-gold selection:text-royal-black bg-royal-black">
      {/* Global Background Image */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-image bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://www.tourism.rajasthan.gov.in/content/dam/rajasthan-tourism/english/city/banners/desk/Chittorgarh-Fort-banner.png')" }}
        ></div>
        <div className="absolute inset-0 bg-black/50 md:backdrop-blur-[2px]"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full">
        <VisitModal />
        <CountrySelector />
        <Navbar />
        <FactCards />

        {/* Routes Section */}
        <div className={cn("space-y-0", location.pathname !== '/' ? "pt-20" : "")}>
          <Routes>
            <Route path="/" element={
              <HomePage
                t={t}
                filteredAttractions={t.attractions.items}
                setSelectedAttraction={setSelectedAttraction}
              />
            } />
            <Route path="/flavors" element={
              <FlavorsPage
                t={t}
                filteredVendors={t.vendors.items}
                filteredCafes={t.cafes.items}
              />
            } />
            <Route path="/stays" element={
              <StaysPage
                t={t}
                filteredHotels={t.hotels.items}
              />
            } />
            <Route path="/local-for-vocal" element={
              <LocalVocalPage
                t={t}
                filteredLocalVocal={t.localVocal.items}
              />
            } />
            <Route path="/how-to-reach" element={<HowToReach />} />
            <Route path="/gallery" element={<GalleryPage t={t} />} />
          </Routes>

        </div>

        <Footer />
        <AttractionModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <MainContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
