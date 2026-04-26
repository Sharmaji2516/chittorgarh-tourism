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
import AttractionsPage from './pages/AttractionsPage';
import MissionPage from './pages/MissionPage';
import ServicesPage from './pages/ServicesPage';
import AdminPage from './pages/AdminPage';

const MainContent = () => {
  const { t } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // One-time cleanup of legacy local storage data
  React.useEffect(() => {
    const legacyKeys = ['ctt_reviews', 'ctt_ratings'];
    legacyKeys.forEach(key => localStorage.removeItem(key));
  }, []);

  const isAdmin = location.pathname === '/admin';

  return (
    <div className="min-h-screen flex flex-col relative text-heritage-parchment font-sans selection:bg-heritage-gold selection:text-heritage-charcoal bg-heritage-charcoal">
      <div className="fixed inset-0 z-0 overflow-hidden bg-heritage-charcoal">
        <div
          className="absolute inset-0 bg-image bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/fateh-prakash-new.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-heritage-charcoal via-royal-black to-heritage-charcoal/95"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full">
        {!isAdmin && <VisitModal />}
        {!isAdmin && <CountrySelector />}
        {!isAdmin && <Navbar />}
        {!isAdmin && <FactCards />}

        {/* Routes Section */}
        <div className={cn("space-y-0", !isAdmin && location.pathname !== '/' ? "pt-20" : "")}>
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
            <Route path="/attractions/:category" element={
              <AttractionsPage
                t={t}
                filteredAttractions={t.attractions.items}
                setSelectedAttraction={setSelectedAttraction}
              />
            } />
            <Route path="/attractions" element={
              <AttractionsPage
                t={t}
                filteredAttractions={t.attractions.items}
                setSelectedAttraction={setSelectedAttraction}
              />
            } />
            <Route path="/mission" element={<MissionPage t={t} />} />
            <Route path="/services" element={<ServicesPage t={t} />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>

        </div>

        {!isAdmin && <Footer />}
        <AttractionModal
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      </div>
    </div>
  );
};

import { BookingProvider } from './context/BookingContext';

function App() {
  return (
    <LanguageProvider>
      <BookingProvider>
        <Router>
          <ScrollToTop />
          <MainContent />
        </Router>
      </BookingProvider>
    </LanguageProvider>
  );
}

export default App;
