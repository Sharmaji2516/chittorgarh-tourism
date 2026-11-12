import React from 'react';
import { ShieldCheck, FileText, ArrowLeft, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-28 pb-24">
      <SEOHead
        title="Terms & Conditions & Booking Policy | Visit Chittorgarh"
        description="Official terms of service, customer inquiry model, booking guidelines and cancellation policies for Visit Chittorgarh tourism."
        canonical="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#A65F3D]">Home</Link>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Terms & Conditions</span>
        </nav>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7D9] shadow-heritage">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block mb-4">
            Official Policies
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#25231F] mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#25231F]/60 mb-8 pb-4 border-b border-[#EFE7D9]">
            Last updated: March 2026 • Visit Chittorgarh
          </p>

          <div className="space-y-6 text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
            <section>
              <h2 className="text-lg font-serif font-bold text-[#25231F] mb-2">1. Concierge & Inquiry Model</h2>
              <p>
                Visit Chittorgarh provides direct tourism advisory, authorized tour guide facilitation, and private sanitized taxi coordination. Inquiries submitted via our frontend forms connect travelers directly with our verified local concierge desk on WhatsApp and phone (+91 75974 51057).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#25231F] mb-2">2. Transparent Pricing & Quotations</h2>
              <p>
                All package and vehicle quotations are provided with upfront clarity regarding toll taxes, driver allowances, parking charges, and monument admission rules. No unverified surcharges or unexpected commissions apply.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#25231F] mb-2">3. Authorized Tour Guide Verification</h2>
              <p>
                All guides dispatched through Visit Chittorgarh hold valid government identification and certification. Travelers are advised not to engage with unverified touts or unauthorized solicitors outside the monument gates.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#25231F] mb-2">4. Privacy & Communication</h2>
              <p>
                Guest phone numbers, email addresses, and travel schedules are utilized strictly for coordinating your requested tour services. We do not sell or distribute traveler data to third-party commercial marketing firms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-serif font-bold text-[#25231F] mb-2">5. Contact Information</h2>
              <p>
                For official correspondence, inquiries, or feedback:
              </p>
              <div className="mt-3 p-4 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9] space-y-1.5 text-xs">
                <p><strong>Business:</strong> Visit Chittorgarh</p>
                <p><strong>Address:</strong> Chittaurgarh, Rajasthan 312021</p>
                <p><strong>Phone:</strong> +91 75974 51057</p>
                <p><strong>Email:</strong> visitchittorgarh@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
