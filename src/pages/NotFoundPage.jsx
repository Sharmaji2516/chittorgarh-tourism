import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home, Phone } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80vh] bg-[#F8F5EF] text-[#25231F] flex items-center justify-center px-4 py-24">
      <SEOHead
        title="404 — Page Not Found | Visit Chittorgarh"
        description="The requested page could not be found on Visit Chittorgarh. Explore Chittorgarh Fort, tour packages, or return to home."
        canonical="/404"
        noIndex={true}
      />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage text-center">
        <span className="font-serif text-6xl sm:text-7xl font-black text-[#A65F3D] block mb-2">
          404
        </span>
        <h1 className="text-2xl font-serif font-bold text-[#25231F] mb-3">
          Monument Not Found
        </h1>
        <p className="text-xs sm:text-sm text-[#25231F]/70 leading-relaxed mb-8">
          The heritage trail you are looking for seems to have taken a turn or moved. Let's guide you back to the Citadel of Chittorgarh.
        </p>

        <div className="space-y-3">
          <Link
            to="/"
            className="w-full py-3.5 bg-[#C49A32] hover:bg-[#b08728] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <Home className="w-4 h-4" /> Return to Home
          </Link>

          <Link
            to="/attractions"
            className="w-full py-3.5 bg-[#F8F5EF] hover:bg-[#EFE7D9] text-[#25231F] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#EFE7D9] transition-colors"
          >
            <Compass className="w-4 h-4 text-[#A65F3D]" /> Explore Fort Attractions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

