import React, { useState, useMemo, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
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
const FloatingInquiry = lazy(() => import('./components/FloatingInquiry'));
const TripPlannerModal = lazy(() => import('./components/TripPlannerModal'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#F8F5EF]">
    <div className="w-10 h-10 border-4 border-[#C49A32]/30 border-t-[#C49A32] rounded-full animate-spin"></div>
  </div>
);

const NullFallback = () => null;

const ROUTE_PREFIXES = ['', 'fr', 'de', 'it', 'ja', 'es', 'he', 'ar', 'hi'];

const MainContent = () => {
  const { t } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [tripModalConfig, setTripModalConfig] = useState({
    isOpen: false,
    mode: 'full',
    itemName: '',
    itemDuration: '',
    category: 'Tour Package',
  });
  const location = useLocation();

  // Listen for custom event to open Trip Planner Modal (supports focused item inquiries)
  React.useEffect(() => {
    const handleOpenTripPlanner = (e) => {
      const detail = e?.detail || {};
      setTripModalConfig({
        isOpen: true,
        mode: detail.mode === 'focused' ? 'focused' : 'full',
        itemName: detail.itemName || '',
        itemDuration: detail.itemDuration || '',
        category: detail.category || 'Tour Package',
      });
    };
    window.addEventListener('openTripPlannerModal', handleOpenTripPlanner);
    return () => window.removeEventListener('openTripPlannerModal', handleOpenTripPlanner);
  }, []);

  const isStandalonePage =
    location.pathname.includes('/admin') ||
    location.pathname.includes('/staff-verify') ||
    location.pathname.includes('/verify/');

  // Route definitions for both root and international prefixes
  const baseRoutes = useMemo(
    () => [
      { path: '', element: <HomePage /> },
      {
        path: 'flavors',
        element: (
          <FlavorsPage
            t={t}
            filteredVendors={t.vendors?.items || []}
            filteredCafes={t.cafes?.items || []}
          />
        ),
      },
      {
        path: 'stays',
        element: <StaysPage t={t} filteredHotels={t.hotels?.items || []} />,
      },
      { path: 'royal-journeys', element: <RoyalJourneysPage t={t} /> },
      { path: 'packages', element: <RoyalJourneysPage t={t} /> },
      { path: 'tour-packages', element: <RoyalJourneysPage t={t} /> },
      {
        path: 'vocal-for-local',
        element: (
          <LocalVocalPage
            t={t}
            filteredLocalVocal={t.localVocal?.items || []}
          />
        ),
      },
      { path: 'how-to-reach', element: <HowToReach /> },
      {
        path: 'attractions/:category',
        element: (
          <AttractionsPage
            t={t}
            filteredAttractions={t.attractions?.items || []}
            setSelectedAttraction={setSelectedAttraction}
          />
        ),
      },
      {
        path: 'attractions',
        element: (
          <AttractionsPage
            t={t}
            filteredAttractions={t.attractions?.items || []}
            setSelectedAttraction={setSelectedAttraction}
          />
        ),
      },
      {
        path: 'destinations',
        element: (
          <AttractionsPage
            t={t}
            filteredAttractions={t.attractions?.items || []}
            setSelectedAttraction={setSelectedAttraction}
          />
        ),
      },
      { path: 'mission-services', element: <MissionServicesPage t={t} /> },
      { path: 'about', element: <MissionServicesPage t={t} /> },
      { path: 'blog', element: <BlogPage t={t} /> },
      { path: 'blog/:slug', element: <BlogPage t={t} /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'feedback', element: <FeedbackPage /> },
      { path: 'service/:serviceId', element: <ServiceDetailsPage /> },
      { path: 'private-guide', element: <ServiceDetailsPage /> },
      { path: 'private-taxi', element: <ServiceDetailsPage /> },
      { path: 'taxi-service', element: <ServiceDetailsPage /> },

      // High-Intent SEO Landing Pages
      {
        path: 'udaipur-to-chittorgarh-day-trip',
        element: <UdaipurToChittorgarhDayTrip />,
      },
      {
        path: 'chittorgarh-fort-timings-tickets',
        element: <ChittorgarhFortTimingsTickets />,
      },
      {
        path: 'chittorgarh-fort-timings-entry-fee-tickets',
        element: <ChittorgarhFortTimingsTickets />,
      },
      {
        path: 'udaipur-to-jaipur-via-chittorgarh-tour',
        element: <UdaipurToJaipurViaChittorgarhTour />,
      },
      {
        path: 'udaipur-jaipur-via-chittorgarh-tour',
        element: <UdaipurToJaipurViaChittorgarhTour />,
      },
      {
        path: 'udaipur-to-chittorgarh-taxi',
        element: <UdaipurToChittorgarhTaxi />,
      },
      {
        path: 'jaipur-to-chittorgarh-taxi',
        element: <JaipurToChittorgarhTaxi />,
      },
      { path: 'chittorgarh-1-day-tour', element: <ChittorgarhOneDayTour /> },
      { path: 'chittorgarh-2-days-tour', element: <ChittorgarhTwoDaysTour /> },
      { path: 'chittorgarh-3-days-tour', element: <ChittorgarhThreeDaysTour /> },
      {
        path: 'places-to-visit-in-chittorgarh',
        element: <PlacesToVisitPage />,
      },
      {
        path: 'chittorgarh-travel-guide',
        element: <ChittorgarhTravelGuidePage />,
      },
      { path: 'destinations-and-routes', element: <SEODirectoryPage /> },

      // Paid Landing Pages
      { path: 'landing/:campaignType', element: <CampaignLandingPage /> },

      // Dynamic Destination & City/State SEO Routes
      { path: ':seoSlug', element: <SEODynamicPage /> },
    ],
    [t]
  );

  return (
    <div className="min-h-screen flex flex-col relative text-[#25231F] font-sans selection:bg-[#C49A32] selection:text-white bg-[#F8F5EF]">
      {/* Modals & Navigation */}
      {!isStandalonePage && <Navbar />}

      {!isStandalonePage && (
        <Suspense fallback={<NullFallback />}>
          <FloatingInquiry />
        </Suspense>
      )}

      {/* Global Trip Planner Modal */}
      <Suspense fallback={<NullFallback />}>
        <TripPlannerModal
          isOpen={tripModalConfig.isOpen}
          mode={tripModalConfig.mode}
          itemName={tripModalConfig.itemName}
          itemDuration={tripModalConfig.itemDuration}
          category={tripModalConfig.category}
          onClose={() =>
            setTripModalConfig((prev) => ({ ...prev, isOpen: false }))
          }
        />
      </Suspense>

      {/* Routes Section */}
      <main className="flex-1 w-full">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Standalone Portals */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/verify/:id" element={<VerificationPage />} />
            <Route path="/staff-verify" element={<StaffVerificationPage />} />

            {/* Prefix-mapped Routes for all 9 supported languages + clean English root */}
            {ROUTE_PREFIXES.flatMap((prefix) =>
              baseRoutes.map((route) => {
                const fullPath = prefix
                  ? route.path
                    ? `/${prefix}/${route.path}`
                    : `/${prefix}`
                  : route.path
                  ? `/${route.path}`
                  : '/';
                return (
                  <Route
                    key={`${prefix || 'root'}-${route.path || 'home'}`}
                    path={fullPath}
                    element={route.element}
                  />
                );
              })
            )}

            {/* 404 Catch-All */}
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

function App() {
  return (
    <Router>
      <LanguageProvider>
        <BookingProvider>
          <ScrollToTop />
          <MainContent />
        </BookingProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
