import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, ArrowLeft, Phone, Mail, MapPin, 
  CheckCircle2, AlertCircle, ChevronDown, Scale, Lock, 
  HelpCircle, CreditCard, UserCheck, AlertTriangle, ExternalLink,
  ChevronRight, Compass, RotateCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedPath } from '../config/languages';

const TermsPage = () => {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const quickSections = [
    { id: 'sec-1', num: '01', title: lang === 'hi' ? 'प्लेटफॉर्म का स्वरूप' : 'Platform Nature', desc: lang === 'hi' ? 'पर्यटन सुविधा व समन्वय' : 'Tourism Facilitation', icon: Compass },
    { id: 'sec-4', num: '04', title: lang === 'hi' ? 'पारदर्शी दरें व कोटेशन' : 'Pricing & Quotes', desc: lang === 'hi' ? 'शून्य गुप्त शुल्क' : 'No Hidden Charges', icon: FileText },
    { id: 'sec-5', num: '05', title: lang === 'hi' ? 'भुगतान व बुकिंग नीति' : 'Payments & Bookings', desc: lang === 'hi' ? 'वेंडर भुगतान वितरण' : 'Vendor Distribution', icon: CreditCard },
    { id: 'sec-6', num: '06', title: lang === 'hi' ? 'टूर गाइड दिशानिर्देश' : 'Tour Guides', desc: lang === 'hi' ? 'राजकीय अधिकृत गाइड' : 'Govt. Approved Guides', icon: UserCheck },
    { id: 'sec-8', num: '08', title: lang === 'hi' ? 'धोखाधड़ी निवारण' : 'Anti-Fraud Policy', desc: lang === 'hi' ? 'शून्य अतिरिक्त मांग' : 'Zero Demands Policy', icon: AlertTriangle },
    { id: 'sec-9', num: '09', title: lang === 'hi' ? 'रिफंड व रद्दीकरण' : 'Refunds & Cancel', desc: lang === 'hi' ? 'पारदर्शी समयसीमा' : 'Verified Timelines', icon: RotateCcw },
    { id: 'sec-19', num: '19', title: lang === 'hi' ? 'शिकायत निवारण डेस्क' : 'Grievance Desk', desc: lang === 'hi' ? 'आधिकारिक समाधान' : 'Official Redressal', icon: HelpCircle },
    { id: 'sec-contact', num: '@', title: lang === 'hi' ? 'द्वारपाल संपर्क डेस्क' : 'Concierge Desk', desc: lang === 'hi' ? 'पता व हेल्पलाइन' : 'Address & Phone Desk', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-20 sm:pt-28 pb-20">
      <SEOHead
        title={lang === 'hi' ? "आधिकारिक नियम एवं शर्तें | विजिट चित्तौड़गढ़" : "Official Terms & Conditions | Visit Chittorgarh"}
        description="Official Terms & Conditions, Booking & Payment Policies, Independent Vendor Disclosures, and Tourism Facilitation Guidelines for Visit Chittorgarh."
        canonical="/terms"
      />

      {/* Top Hero Banner - Centered & Professional */}
      <div className="bg-gradient-to-b from-[#25231F] via-[#2A2722] to-[#1E1C18] text-white py-14 sm:py-18 border-b border-[#C49A32]/30 relative overflow-hidden">
        {/* Subtle royal pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#C49A32_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center text-center">
          {/* Breadcrumb Navigation - Centered */}
          <nav className="text-xs text-[#DFBA5A] mb-4 flex items-center justify-center gap-2">
            <Link to={getLocalizedPath('/', lang)} className="hover:text-white flex items-center gap-1 font-medium transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> {t.nav?.backToHome || (lang === 'hi' ? 'मुख्य पृष्ठ पर वापस' : 'Back to Home')}
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-semibold">{lang === 'hi' ? 'नियम एवं शर्तें' : 'Terms & Conditions'}</span>
          </nav>

          {/* Legal Badge - Centered */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#C49A32]/40 text-[#DFBA5A] text-xs font-bold uppercase tracking-wider mb-4 mx-auto shadow-sm">
            <Scale className="w-3.5 h-3.5 text-[#DFBA5A]" /> {lang === 'hi' ? 'वैधानिक एवं बुकिंग नियम' : 'Legal & Booking Framework'}
          </div>

          {/* Royal Kicker */}
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#C49A32] mb-2 [word-spacing:0.2em]">
            VISIT CHITTORGARH
          </div>

          {/* Main Title - Centered with Clear Word Spacing */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-normal leading-tight mb-4 [word-spacing:0.18em]">
            {lang === 'hi' ? 'आधिकारिक नियम एवं शर्तें' : 'Official Terms & Conditions'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-white/85 max-w-2xl mx-auto leading-relaxed [word-spacing:0.05em] mb-6">
            {lang === 'hi'
              ? 'कृपया कोई भी पूछताछ या बुकिंग करने से पहले इन नियमों को ध्यानपूर्वक पढ़ें। ये विजिट चित्तौड़गढ़ प्लेटफॉर्म, भुगतान प्रक्रिया, द्वारपाल सहायता और स्थानीय स्वतंत्र सेवा प्रदाताओं के समन्वय को नियंत्रित करते हैं।'
              : 'Please read these terms carefully before making an inquiry or booking. They govern your use of the Visit Chittorgarh platform, payment processing, concierge assistance, and coordination with independent local vendors.'
            }
          </p>

          {/* Metadata badges - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-white/80 bg-white/5 border border-white/10 rounded-full px-5 py-2 shadow-inner">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {lang === 'hi' ? 'अंतिम अपडेट: 14 नवंबर 2026' : 'Last Updated: 14 November 2026'}
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#DFBA5A]" /> {lang === 'hi' ? 'अधिकृत सुविधा व सहायता डेस्क' : 'Authorized Facilitation Desk'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        
        {/* Quick Jump Navigator - Elegant Royal Heritage Style */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#EFE7D9] shadow-heritage mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-4 border-b border-[#EFE7D9]">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-[#C49A32]/15 text-[#C49A32] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-[#A65F3D]" />
              </span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#25231F] font-serif [word-spacing:0.1em]">
                  {lang === 'hi' ? 'त्वरित अनुभाग निर्देशिका' : 'Quick Section Directory'}
                </h3>
                <p className="text-[11px] text-[#25231F]/60">
                  {lang === 'hi' ? 'कानूनी शर्तों को सीधे पढ़ने के लिए नीचे किसी भी विषय पर क्लिक करें' : 'Click any topic below to jump directly to its legal terms'}
                </p>
              </div>
            </div>
            <span className="self-start sm:self-auto text-[10px] font-bold uppercase tracking-widest text-[#A65F3D] bg-[#A65F3D]/10 px-3 py-1 rounded-full border border-[#A65F3D]/20">
              {lang === 'hi' ? '8 मुख्य विषय' : '8 Key Topics'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
            {quickSections.map((sec) => {
              const IconComponent = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F5EF] hover:bg-white border border-[#EFE7D9] hover:border-[#C49A32] shadow-2xs hover:shadow-md transition-all duration-200 text-left active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#EFE7D9] group-hover:border-[#C49A32]/50 group-hover:bg-[#C49A32]/10 flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                      <IconComponent className="w-4 h-4 text-[#A65F3D] group-hover:text-[#C49A32] transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#25231F] group-hover:text-[#A65F3D] transition-colors truncate">
                        {sec.num}. {sec.title}
                      </div>
                      <div className="text-[10px] text-[#25231F]/60 group-hover:text-[#25231F]/80 transition-colors truncate">
                        {sec.desc}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#25231F]/30 group-hover:text-[#C49A32] group-hover:translate-x-0.5 transition-all shrink-0 ml-1.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Document Body */}
        <div className="bg-white rounded-3xl p-5 sm:p-12 border border-[#EFE7D9] shadow-heritage space-y-10">

          {/* Intro Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#F8F5EF] to-white border-l-4 border-[#C49A32] text-xs sm:text-sm text-[#25231F]/85 leading-relaxed [word-spacing:0.04em] shadow-sm">
            <p className="mb-2 font-medium">
              These Terms &amp; Conditions govern the use of the Visit Chittorgarh website, tourism facilitation services, concierge assistance, booking inquiries, package reservations, online payments, and coordination with independent tourism service providers.
            </p>
            <p>
              By using our website or engaging with our tourism facilitation and booking services, customers are subject to these Terms &amp; Conditions and applicable booking-specific policies.
            </p>
          </div>

          {/* Section 1 */}
          <section id="sec-1" className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#C49A32] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">1</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Nature of Our Business – Tourism Facilitation Platform
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-4 leading-relaxed">
              Visit Chittorgarh operates as a tourism information, facilitation, and concierge platform designed to connect travelers with independent tourism and hospitality service providers in Chittorgarh and surrounding areas.
            </p>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A65F3D] block mb-2">
                Services Facilitated Across Our Platform:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#25231F]/85">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Private taxi &amp; transportation services</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Private tour guides &amp; local experts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Hotels, resorts, guest houses &amp; havelis</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Restaurants &amp; royal dining arrangements</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Sightseeing &amp; cultural heritage circuits</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> End-to-end travel coordination</li>
              </ul>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 text-xs sm:text-sm leading-relaxed">
              <strong className="block font-bold text-amber-900 mb-1 flex items-center gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" /> Important Business Disclosure:
              </strong>
              <p className="mb-2">
                Visit Chittorgarh primarily operates as an intermediary and tourism facilitation platform. We help customers connect with independent third-party service providers.
              </p>
              <p className="mb-2">
                Unless specifically agreed otherwise in writing, we do not own, operate, employ, manage, or directly control the hotels, restaurants, taxis, drivers, guides, or other independent service providers.
              </p>
              <p>
                Our role is to facilitate connections, coordinate arrangements, communicate quotations, and collect and distribute package payments where applicable.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="sec-2" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#25231F] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">2</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Role and Responsibilities of Visit Chittorgarh
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">Our responsibilities include:</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[#25231F]/85 mb-4 pl-1">
              <li>• Providing authentic tourism information</li>
              <li>• Connecting customers with local providers</li>
              <li>• Sharing available service tiers &amp; options</li>
              <li>• Providing upfront package quotations</li>
              <li>• Coordinating hotel, taxi, guide, and meal plans</li>
              <li>• Facilitating communication via WhatsApp &amp; phone</li>
              <li>• Collecting payments for confirmed packages</li>
              <li>• Distributing agreed payments to vendors</li>
              <li>• Providing initial booking coordination</li>
            </ul>
            <p className="text-xs text-[#25231F]/60 italic bg-[#F8F5EF] p-3 rounded-xl border border-[#EFE7D9]">
              The actual performance and delivery of third-party services remain subject to the relevant booking arrangements and responsibilities of the respective service providers.
            </p>
          </section>

          {/* Section 3 */}
          <section id="sec-3" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#25231F] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">3</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Independent Third-Party Service Providers
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-4 leading-relaxed">
              All hotels, taxi operators, drivers, tour guides, restaurants, food providers, and other tourism-related vendors operate independently. Each provider is independently responsible for:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#25231F]/85 mb-4">
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Actual service delivery</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Staff conduct &amp; behaviour</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Licenses &amp; registrations</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Vehicle maintenance &amp; driving</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Hotel facilities &amp; rooms</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Food quality &amp; hygiene</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Guiding professional conduct</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Applicable safety standards</div>
              <div className="p-3 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">Compliance with laws</div>
            </div>
            <p className="text-xs text-[#25231F]/70">
              Visit Chittorgarh does not automatically assume operational responsibility for independent vendors merely because we introduced them to a customer or facilitated a booking.
            </p>
          </section>

          {/* Section 4 */}
          <section id="sec-4" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#C49A32] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">4</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Transparent Pricing and Quotations
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">
              All prices and package quotations will be communicated clearly before booking confirmation. Depending on the selected package, the quotation may include hotel accommodation, taxi, guide fees, toll taxes, parking, driver allowances, dining, or monument tickets.
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-[#25231F]/85 pl-1">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Customers must carefully review the inclusions and exclusions before confirming a booking.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>The price confirmed by Visit Chittorgarh shall be the agreed price for the specified services and inclusions.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span><strong>No Unauthorized Demands:</strong> No vendor should independently demand additional charges for services already included in the confirmed package without prior approval through Visit Chittorgarh's official communication channels.</span>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="sec-5" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#C49A32] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">5</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Booking, Payments and Payment Distribution Policy
              </h2>
            </div>
            
            <div className="space-y-3.5 text-xs sm:text-sm text-[#25231F]/80">
              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#A65F3D]" /> 5.1 Complete Package Bookings
                </h3>
                <p>
                  If a customer books a complete tourism package through Visit Chittorgarh, including hotels, taxis, private tour guides, meals, sightseeing, or other arrangements, the complete agreed package payment must be made directly to Visit Chittorgarh through its officially communicated payment methods. After receiving payment, Visit Chittorgarh distributes the respective amounts to participating vendors. Customers are not required to make separate payments to individual vendors for services already included.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5">5.2 Individual Service Bookings</h3>
                <p>
                  If a customer books an individual service through Visit Chittorgarh, the applicable price and payment procedure will be communicated before confirmation. Where Visit Chittorgarh accepts payment for an individual booking, the customer must make the agreed payment through the official payment channels.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 text-amber-950">
                <h3 className="font-serif font-bold text-base text-amber-900 mb-1.5 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-700" /> 5.3 No Unauthorized Additional Payments
                </h3>
                <p className="mb-2">
                  After a booking has been confirmed and the agreed amount has been paid, customers must not independently pay additional amounts to drivers, guides, hotel staff, restaurants, or other vendors for services already included in the package. If any vendor requests additional money, customers should contact Visit Chittorgarh before making payment.
                </p>
                <p>
                  Any additional service, upgrade, or change must be approved and communicated through an official Visit Chittorgarh communication channel. If a customer independently transfers money to a vendor without prior authorization, Visit Chittorgarh shall not be responsible for that unauthorized transaction, subject to applicable law.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-700" /> 5.4 Official Payment Channels
                </h3>
                <p>
                  Customers must make payments only through officially communicated bank accounts, UPI IDs, payment gateways, or other authorized payment methods. Payments made to personal accounts, unofficial UPI IDs, private mobile numbers, or individual vendors without written authorization are outside the confirmed platform payment arrangement. Customers should retain payment receipts and transaction references.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5">5.5 Website Payment Policy</h3>
                <ul className="space-y-1.5 pl-1">
                  <li>• The payment must relate to an identified booking or service.</li>
                  <li>• Customers should review quotation and package details before payment.</li>
                  <li>• Payment confirmation is subject to successful verification of the transaction.</li>
                  <li>• A gateway transaction reference does not independently establish that a booking has been accepted. A booking is confirmed when Visit Chittorgarh issues an official confirmation.</li>
                  <li>• If payment is deducted but booking is unconfirmed, contact us with the transaction reference for eligible resolution. Do not repeat payments without checking status.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5">5.6 Payment Gateway and Technical Errors</h3>
                <p>
                  Online payments may be processed through third-party gateways, banks, or UPI providers. Visit Chittorgarh does not control their independent technical infrastructure. To the extent permitted by law, we shall not be responsible for bank delays, gateway downtime, or third-party system errors, except to the extent of our own legal obligations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
                <h3 className="font-serif font-bold text-base text-[#25231F] mb-1.5">5.7 Payment Distribution</h3>
                <p>
                  Visit Chittorgarh collects package payments and distributes agreed amounts among participating vendors. Customers must not make duplicate payments to vendors simply because of an internal payment distribution schedule.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="sec-6" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">6</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Authorized and Government-Recognized Tour Guides
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">
              Visit Chittorgarh aims to facilitate connections with properly verified, qualified, and authorized local tour guides. Where available and applicable, guides arranged through our platform will hold valid government identification and relevant authorization, registration, or certification from the competent Rajasthan Government department or concerned district authority.
            </p>
            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] text-xs sm:text-sm space-y-2">
              <p>• Customers may request verification of the assigned guide's credentials.</p>
              <p>• Each guide remains independently responsible for their guiding activities, professional conduct, statements, commitments, and compliance with applicable regulations.</p>
              <p className="text-[#25231F]/65 italic">Visit Chittorgarh facilitates the connection and does not directly supervise every activity performed by an independent guide.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="sec-7" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#25231F] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">7</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Hotel, Taxi, Restaurant and Other Service Arrangements
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">
              Hotel accommodation, taxi transportation, food, sightseeing, and guiding services are delivered by their respective independent service providers. The respective providers are responsible for room availability, vehicle condition, safe driving, routes, hygiene, and staff conduct.
            </p>
          </section>

          {/* Section 8 */}
          <section id="sec-8" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-red-700 text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">8</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Third-Party Fraud, Misconduct and Incidents
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">
              Visit Chittorgarh does not directly operate or control independent drivers, guides, hotels, restaurants, or other third-party vendors. To the extent permitted by applicable law, Visit Chittorgarh shall not be responsible for independent fraudulent acts, misconduct, negligence, unauthorized transactions, or operational decisions of third-party service providers.
            </p>
            <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 text-red-950 text-xs sm:text-sm space-y-2 mb-3">
              <strong className="block font-bold text-red-900">Safety &amp; Emergency Protocol:</strong>
              <p>
                Customers should immediately contact the relevant authorities (local police/emergency helpline) in cases of suspected fraud, criminal conduct, emergencies, or safety-related incidents.
              </p>
              <p>
                Visit Chittorgarh may voluntarily assist with communication where possible, but such assistance does not make the platform responsible for the vendor's independent actions. Nothing in this section removes liability for Visit Chittorgarh's own legally attributable acts or omissions.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="sec-9" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#C49A32] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">9</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Cancellation and Refund Policy
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">
              All cancellations and refund requests shall be governed by the booking-specific cancellation conditions communicated before confirmation. Refund calculations depend on committed vendor fees, hotel policies, taxi schedules, and agreed terms.
            </p>
            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] text-xs sm:text-sm space-y-2">
              <p>• Refund requests must be submitted through official communication channels with the relevant booking ID and payment reference.</p>
              <p>• Unauthorized payments made directly to vendors are outside the platform's payment and refund arrangements.</p>
              <p className="font-semibold text-emerald-800">Visit Chittorgarh will not impose cancellation conditions that override mandatory consumer rights.</p>
            </div>
          </section>

          {/* Section 10 to 18 Grid / Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#EFE7D9]">
            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">10. Customer Responsibility</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Customers must review package quotations, confirm payments through authorized channels, verify provider IDs, safeguard receipts, and follow local safety instructions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">11. Requested Changes</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Changes to dates, vehicles, or hotels must be approved via official channels. Additional charges apply for extra services outside the original package.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">12. Technical Disclaimer</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                We strive for continuous site uptime, but are not liable for external downtime, gateway interruptions, or third-party server errors beyond our reasonable control.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">13. External Links</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Links to third-party portals operate independently. Visit Chittorgarh does not control their content, policies, or security practices.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">14. Force Majeure</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Neither platform nor vendors are liable for disruptions caused by natural disasters, strikes, road closures, public health orders, or sudden monument closures.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">15. Safety &amp; Insurance</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Travelers are strongly advised to hold valid travel insurance and safeguard valuables. Visit Chittorgarh is not an emergency or medical insurance provider.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">16. Privacy Commitment</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Traveler details are strictly used for tour coordination. <strong>We never sell personal information to commercial marketing companies.</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9]">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">17. Prohibited Misuse</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Fraudulent payment attempts, impersonation, cyber disruption, and false booking submissions will lead to immediate cancellation and reporting to authorities.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] md:col-span-2">
              <h3 className="font-serif font-bold text-sm text-[#25231F] mb-2">18. Limitation of Liability</h3>
              <p className="text-xs text-[#25231F]/80 leading-relaxed">
                Visit Chittorgarh is responsible for its own contractual commitments, representations, and statutory obligations under Indian law, but does not provide unconditional guarantees for independent third-party acts.
              </p>
            </div>
          </div>

          {/* Section 19: Grievance Redressal */}
          <section id="sec-19" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-xl bg-[#A65F3D] text-white flex items-center justify-center text-sm font-black shadow-sm shrink-0">19</span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#25231F]">
                Grievance Redressal and Customer Complaints
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#25231F]/80 mb-3 leading-relaxed">
              Customers may submit booking-related, payment-related, or platform-related complaints through the official contact details. We make reasonable efforts to acknowledge and address complaints promptly.
            </p>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div>
                <span className="text-[#25231F]/60 block text-[11px] uppercase font-bold">Grievance Desk</span>
                <strong className="text-[#25231F]">Customer Support &amp; Concierge Redressal</strong>
              </div>
              <div>
                <span className="text-[#25231F]/60 block text-[11px] uppercase font-bold">Designation</span>
                <strong className="text-[#25231F]">Grievance Officer</strong>
              </div>
              <div>
                <span className="text-[#25231F]/60 block text-[11px] uppercase font-bold">Email</span>
                <a href="mailto:visitchittorgarh@gmail.com" className="text-[#A65F3D] font-bold hover:underline">
                  visitchittorgarh@gmail.com
                </a>
              </div>
              <div>
                <span className="text-[#25231F]/60 block text-[11px] uppercase font-bold">Phone / WhatsApp</span>
                <a href="https://wa.me/917597451057" className="text-[#A65F3D] font-bold hover:underline">
                  +91 75974 51057
                </a>
              </div>
            </div>
          </section>

          {/* Section 20 & 21 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[#EFE7D9]">
            <section id="sec-20">
              <h3 className="font-serif font-bold text-base text-[#25231F] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#25231F] text-white flex items-center justify-center text-xs font-black shrink-0">20</span>
                Legal Jurisdiction
              </h3>
              <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
                Governed by the laws of India. For contractual disputes relating to platform obligations, the competent courts at <strong>Chittorgarh, Rajasthan</strong> shall have jurisdiction to the extent legally permissible.
              </p>
            </section>

            <section id="sec-21">
              <h3 className="font-serif font-bold text-base text-[#25231F] mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#25231F] text-white flex items-center justify-center text-xs font-black shrink-0">21</span>
                Modification and Updates
              </h3>
              <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
                Visit Chittorgarh reserves the right to revise terms when necessary. Changes are published with the revised effective date and do not retrospectively affect existing confirmed bookings.
              </p>
            </section>
          </div>

          {/* Platform Disclaimer Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#25231F] to-[#1C1A17] text-white border border-[#C49A32]/40 shadow-xl">
            <div className="flex items-center gap-2 text-[#DFBA5A] font-bold text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" /> Platform Notice
            </div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-3">
              IMPORTANT PLATFORM DISCLAIMER
            </h3>
            <p className="text-xs sm:text-sm text-[#F8F5EF]/85 leading-relaxed mb-3">
              Visit Chittorgarh is a tourism information, facilitation, and concierge platform connecting travelers with independent third-party tourism service providers (taxis, verified tour guides, hotels, and dining).
            </p>
            <p className="text-xs sm:text-sm text-[#F8F5EF]/85 leading-relaxed mb-3">
              For complete packages, Visit Chittorgarh collects the agreed package payment and distributes the relevant amounts among participating independent vendors.
            </p>
            <p className="text-xs text-[#DFBA5A]/90 italic">
              Actual operation and delivery of services remain subject to applicable vendor responsibilities. Visit Chittorgarh fulfills its own legal and contractual duties with complete dedication to guest satisfaction.
            </p>
          </div>

          {/* Official Contact Information Card */}
          <section id="sec-contact" className="pt-6 border-t border-[#EFE7D9] scroll-mt-24">
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#25231F] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C49A32]" /> OFFICIAL CONTACT INFORMATION
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                <span className="text-[10px] uppercase font-bold text-[#25231F]/60 block mb-1">Platform Name</span>
                <strong className="text-base font-serif text-[#25231F]">Visit Chittorgarh</strong>
              </div>
              <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                <span className="text-[10px] uppercase font-bold text-[#25231F]/60 block mb-1">Registered Concierge Address</span>
                <strong className="text-[#25231F]">Chittaurgarh, Rajasthan – 312021, India</strong>
              </div>
              <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                <span className="text-[10px] uppercase font-bold text-[#25231F]/60 block mb-1">Phone / WhatsApp Desk</span>
                <a href="https://wa.me/917597451057" className="text-[#A65F3D] font-bold text-sm hover:underline flex items-center gap-1.5 mt-0.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600" /> +91 75974 51057
                </a>
              </div>
              <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                <span className="text-[10px] uppercase font-bold text-[#25231F]/60 block mb-1">Official Email</span>
                <a href="mailto:visitchittorgarh@gmail.com" className="text-[#A65F3D] font-bold text-sm hover:underline flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-[#C49A32]" /> visitchittorgarh@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#EFE7D9] text-center text-xs text-[#25231F]/60">
              © {new Date().getFullYear()} Visit Chittorgarh • Official Terms &amp; Conditions Document • Version 2026.11
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default TermsPage;
