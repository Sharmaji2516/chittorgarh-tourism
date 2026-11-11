import React, { useState, useMemo, lazy, Suspense } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import { cn } from './utils/cn';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Lazy-loaded pages
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
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// SEO Dedicated Landing Pages
const UdaipurToChittorgarhTaxi = lazy(() => import('./pages/seo/UdaipurToChittorgarhTaxi'));
const UdaipurToChittorgarhDayTrip = lazy(() => import('./pages/seo/UdaipurToChittorgarhDayTrip'));
const ChittorgarhFortTimingsTickets = lazy(() => import('./pages/seo/ChittorgarhFortTimingsTickets'));
const UdaipurToJaipurViaChittorgarhTour = lazy(() => import('./pages/seo/UdaipurToJaipurViaChittorgarhTour'));
const JaipurToChittorgarhTaxi = lazy(() => import('./pages/seo/JaipurToChittorgarhTaxi'));
const ChittorgarhOneDayTour = lazy(() => import('./pages/seo/ChittorgarhOneDayTour'));
const ChittorgarhTwoDaysTour = lazy(() => import('./pages/seo/ChittorgarhTwoDaysTour'));
const ChittorgarhThreeDaysTour = lazy(() => import('./pages/seo/ChittorgarhThreeDaysTour'));
const PlacesToVisitPage = lazy(() => import('./pages/seo/PlacesToVisitPage'));
const ChittorgarhTravelGuidePage = lazy(() => import('./pages/seo/ChittorgarhTravelGuidePage'));
const SEODirectoryPage = lazy(() => import('./pages/seo/SEODirectoryPage'));
const SEODynamicPage = lazy(() => import('./pages/seo/SEODynamicPage'));

// Google Ads Campaign Landing Page
const CampaignLandingPage = lazy(() => import('./pages/landing/CampaignLandingPage'));

// Lazy-loaded UI modals
const AttractionModal = lazy(() => import('./components/AttractionModal'));
const CountrySelector = lazy(() => import('./components/CountrySelector'));
const FloatingInquiry = lazy(() => import('./components/FloatingInquiry'));
const TripPlannerModal = lazy(() => import('./components/TripPlannerModal'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#F8F5EF]">
    <div className="w-10 h-10 border-4 border-[#C49A32]/30 border-t-[#C49A32] rounded-full animate-spin"></div>
  </div>
);

const NullFallback = () => null;

const MainContent = () => {
  const { t } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [isTripPlannerOpen, setIsTripPlannerOpen] = useState(false);
  const location = useLocation();

  // Listen for custom event to open Trip Planner Modal
  React.useEffect(() => {
    const handleOpenTripPlanner = () => setIsTripPlannerOpen(true);
    window.addEventListener('openTripPlannerModal', handleOpenTripPlanner);
    return () => window.removeEventListener('openTripPlannerModal', handleOpenTripPlanner);
  }, []);

  const isStandalonePage = location.pathname.includes('/admin') || location.pathname.includes('/staff-verify') || location.pathname.includes('/verify/');

  return (
    <div className="min-h-screen flex flex-col relative text-[#25231F] font-sans selection:bg-[#C49A32] selection:text-white bg-[#F8F5EF]">
      {/* Modals & Navigation */}
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

      {/* Global Trip Planner Modal */}
      <Suspense fallback={<NullFallback />}>
        <TripPlannerModal
          isOpen={isTripPlannerOpen}
          onClose={() => setIsTripPlannerOpen(false)}
        />
      </Suspense>

      {/* Routes Section */}
      <main className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/flavors" element={<FlavorsPage t={t} filteredVendors={t.vendors?.items || []} filteredCafes={t.cafes?.items || []} />} />
            <Route path="/stays" element={<StaysPage t={t} filteredHotels={t.hotels?.items || []} />} />
            <Route path="/royal-journeys" element={<RoyalJourneysPage t={t} />} />
            <Route path="/packages" element={<RoyalJourneysPage t={t} />} />
            <Route path="/tour-packages" element={<RoyalJourneysPage t={t} />} />
            <Route path="/vocal-for-local" element={<LocalVocalPage t={t} filteredLocalVocal={t.localVocal?.items || []} />} />
            <Route path="/how-to-reach" element={<HowToReach />} />
            <Route path="/attractions/:category" element={<AttractionsPage t={t} filteredAttractions={t.attractions?.items || []} setSelectedAttraction={setSelectedAttraction} />} />
            <Route path="/attractions" element={<AttractionsPage t={t} filteredAttractions={t.attractions?.items || []} setSelectedAttraction={setSelectedAttraction} />} />
            <Route path="/destinations" element={<AttractionsPage t={t} filteredAttractions={t.attractions?.items || []} setSelectedAttraction={setSelectedAttraction} />} />
            <Route path="/mission-services" element={<MissionServicesPage t={t} />} />
            <Route path="/about" element={<MissionServicesPage t={t} />} />
            <Route path="/blog" element={<BlogPage t={t} />} />
            <Route path="/blog/:slug" element={<BlogPage t={t} />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/service/:serviceId" element={<ServiceDetailsPage />} />
            <Route path="/private-guide" element={<ServiceDetailsPage />} />
            <Route path="/private-taxi" element={<ServiceDetailsPage />} />
            <Route path="/taxi-service" element={<ServiceDetailsPage />} />

            {/* SEO Dedicated High-Intent Landing Pages */}
            <Route path="/udaipur-to-chittorgarh-day-trip" element={<UdaipurToChittorgarhDayTrip />} />
            <Route path="/chittorgarh-fort-timings-tickets" element={<ChittorgarhFortTimingsTickets />} />
            <Route path="/chittorgarh-fort-timings-entry-fee-tickets" element={<ChittorgarhFortTimingsTickets />} />
            <Route path="/udaipur-to-jaipur-via-chittorgarh-tour" element={<UdaipurToJaipurViaChittorgarhTour />} />
            <Route path="/udaipur-jaipur-via-chittorgarh-tour" element={<UdaipurToJaipurViaChittorgarhTour />} />
            <Route path="/udaipur-to-chittorgarh-taxi" element={<UdaipurToChittorgarhTaxi />} />
            <Route path="/jaipur-to-chittorgarh-taxi" element={<JaipurToChittorgarhTaxi />} />
            <Route path="/chittorgarh-1-day-tour" element={<ChittorgarhOneDayTour />} />
            <Route path="/chittorgarh-2-days-tour" element={<ChittorgarhTwoDaysTour />} />
            <Route path="/chittorgarh-3-days-tour" element={<ChittorgarhThreeDaysTour />} />
            <Route path="/places-to-visit-in-chittorgarh" element={<PlacesToVisitPage />} />
            <Route path="/chittorgarh-travel-guide" element={<ChittorgarhTravelGuidePage />} />
            <Route path="/destinations-and-routes" element={<SEODirectoryPage />} />

            {/* Google Ads Paid Marketing Landing Pages */}
            <Route path="/landing/:campaignType" element={<CampaignLandingPage />} />

            {/* Operations Desk & Verification */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/verify/:id" element={<VerificationPage />} />
            <Route path="/staff-verify" element={<StaffVerificationPage />} />

            {/* Structured City, State, Country, Attraction & Package SEO Routes */}
            <Route path="/:seoSlug" element={<SEODynamicPage />} />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isStandalonePage && <Footer />}

      {/* Attraction Detail Modal */}
      {selectedAttraction && (
        <Suspense fallback={<NullFallback />}>
          <AttractionModal
            attraction={selectedAttraction}
            onClose={() => setSelectedAttraction(null)}
          />
        </Suspense>
      )}
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
