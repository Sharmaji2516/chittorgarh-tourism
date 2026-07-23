import React, { useState, useMemo, lazy, Suspense } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { cn } from './utils/cn';
import Section from './components/Section';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// ─── Lazy-loaded page components ──────────────────────────────────────────────
const FlavorsPage = lazy(() => import('./pages/FlavorsPage'));
const StaysPage = lazy(() => import('./pages/StaysPage'));
const LocalVocalPage = lazy(() => import('./pages/LocalVocalPage'));
const RoyalJourneysPage = lazy(() => import('./pages/RoyalJourneysPage'));
const HowToReach = lazy(() => import('./pages/HowToReach'));
const AttractionsPage = lazy(() => import('./pages/AttractionsPage'));
const MissionServicesPage = lazy(() => import('./pages/MissionServicesPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const VerificationPage = lazy(() => import('./pages/VerificationPage'));
const StaffVerificationPage = lazy(() => import('./pages/StaffVerificationPage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ServiceDetailsPage = lazy(() => import('./pages/ServiceDetailsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

// ─── Lazy-loaded UI modals (not needed for initial paint) ─────────────────────
const AttractionModal = lazy(() => import('./components/AttractionModal'));
const CountrySelector = lazy(() => import('./components/CountrySelector'));
const FloatingInquiry = lazy(() => import('./components/FloatingInquiry'));
const VisitModal = lazy(() => import('./components/VisitModal'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-heritage-gold/30 border-t-heritage-gold rounded-full animate-spin"></div>
  </div>
);

// Null suspense fallback for modals — they render nothing while loading
const NullFallback = () => null;

const MainContent = () => {
  const { t } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const location = useLocation();

  // One-time cleanup of legacy local storage data
  React.useEffect(() => {
    const legacyKeys = ['ctt_reviews', 'ctt_ratings'];
    legacyKeys.forEach(key => localStorage.removeItem(key));
  }, []);

  const isStandalonePage = location.pathname.includes('/admin') || location.pathname.includes('/staff-verify') || location.pathname.includes('/verify/');

  return (
    <div className="min-h-screen flex flex-col relative text-heritage-parchment font-sans selection:bg-heritage-gold selection:text-heritage-charcoal bg-heritage-charcoal">
      <div className="fixed inset-0 z-0 overflow-hidden bg-heritage-charcoal">
        <div
          className="absolute inset-0 bg-image bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: "url('/assets/images/fateh-prakash-new.webp')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-heritage-charcoal via-royal-black to-heritage-charcoal/95"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col w-full">
        {/* Modals — lazy loaded with null fallback so they don't block initial paint */}
        {!isStandalonePage && (
          <Suspense fallback={<NullFallback />}>
            <VisitModal />
          </Suspense>
        )}
        {!isStandalonePage && (
          <Suspense fallback={<NullFallback />}>
            <CountrySelector />
          </Suspense>
        )}
        {!isStandalonePage && <Navbar />}
        {!isStandalonePage && (
          <Suspense fallback={<NullFallback />}>
            <FloatingInquiry />
          </Suspense>
        )}

        {/* Routes Section */}
        <div className={cn("space-y-0", !isStandalonePage ? "pt-20" : "")}>
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/royal-journeys" element={<RoyalJourneysPage t={t} />} />
              <Route path="/vocal-for-local" element={
                <LocalVocalPage
                  t={t}
                  filteredLocalVocal={t.localVocal.items}
                />
              } />
              <Route path="/how-to-reach" element={<HowToReach />} />
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
              <Route path="/mission-services" element={<MissionServicesPage t={t} />} />
              <Route path="/blog" element={<BlogPage t={t} />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/verify/:id" element={<VerificationPage />} />
              <Route path="/staff-verify" element={<StaffVerificationPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/service/:serviceId" element={<ServiceDetailsPage />} />
            </Routes>
          </Suspense>
        </div>

        {!isStandalonePage && <Footer />}

        {/* AttractionModal — only renders when an attraction is selected */}
        {selectedAttraction && (
          <Suspense fallback={<NullFallback />}>
            <AttractionModal
              attraction={selectedAttraction}
              onClose={() => setSelectedAttraction(null)}
            />
          </Suspense>
        )}
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
