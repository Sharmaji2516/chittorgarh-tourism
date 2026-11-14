import React from 'react';
import { ShieldCheck, FileText, ArrowLeft, Phone, Mail, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#25231F] pt-24 sm:pt-28 pb-20">
      <SEOHead
        title="Official Terms & Conditions | Visit Chittorgarh"
        description="Official Terms & Conditions, Booking & Payment Policies, Independent Vendor Disclosures, and Tourism Facilitation Guidelines for Visit Chittorgarh."
        canonical="/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="text-xs text-[#25231F]/60 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#A65F3D] flex items-center gap-1 font-medium">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-[#25231F] font-bold">Official Terms &amp; Conditions</span>
        </nav>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-[#EFE7D9] shadow-heritage">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C49A32] bg-[#EFE7D9] px-4 py-1.5 rounded-full inline-block">
              Legal &amp; Booking Framework
            </span>
            <span className="text-xs font-semibold text-[#25231F]/60">
              Last Updated: 14 November 2026
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#25231F] mb-3">
            VISIT CHITTORGARH
          </h1>
          <h2 className="text-lg sm:text-xl font-serif font-bold text-[#A65F3D] mb-6">
            OFFICIAL TERMS &amp; CONDITIONS
          </h2>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#F8F5EF] border border-[#EFE7D9] text-xs sm:text-sm text-[#25231F]/80 leading-relaxed mb-8">
            <p className="mb-2">
              These Terms &amp; Conditions govern the use of the Visit Chittorgarh website, tourism facilitation services, concierge assistance, booking inquiries, package reservations, online payments, and coordination with independent tourism service providers.
            </p>
            <p>
              By using our website or engaging with our tourism facilitation and booking services, customers are subject to these Terms &amp; Conditions and applicable booking-specific policies.
            </p>
          </div>

          <div className="space-y-8 text-xs sm:text-sm text-[#25231F]/85 leading-relaxed divide-y divide-[#EFE7D9]/70">

            {/* Section 1 */}
            <section className="pt-6 first:pt-0">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">1</span>
                Nature of Our Business – Tourism Facilitation Platform
              </h3>
              <p className="mb-3">
                Visit Chittorgarh operates as a tourism information, facilitation, and concierge platform designed to connect travelers with independent tourism and hospitality service providers in Chittorgarh and surrounding areas.
              </p>
              <p className="font-semibold mb-2 text-[#25231F]">We facilitate access to services including:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 pl-1">
                <li className="flex items-center gap-2">• Private taxi and transportation services</li>
                <li className="flex items-center gap-2">• Private tour guides and local tourism experts</li>
                <li className="flex items-center gap-2">• Hotels, resorts, guest houses, and accommodation</li>
                <li className="flex items-center gap-2">• Restaurants and lunch/dinner arrangements</li>
                <li className="flex items-center gap-2">• Local sightseeing and tourism experiences</li>
                <li className="flex items-center gap-2">• Travel planning and coordination</li>
                <li className="flex items-center gap-2">• Other tourism and hospitality-related services</li>
              </ul>
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <strong className="block font-bold mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" /> Important Business Disclosure:
                </strong>
                <p className="mb-1.5">
                  Visit Chittorgarh primarily operates as an intermediary and tourism facilitation platform. We help customers connect with independent third-party service providers.
                </p>
                <p className="mb-1.5">
                  Unless specifically agreed otherwise in writing, we do not own, operate, employ, manage, or directly control the hotels, restaurants, taxis, drivers, guides, or other independent service providers.
                </p>
                <p>
                  Our role is to facilitate connections, coordinate arrangements, communicate quotations, and collect and distribute package payments where applicable.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">2</span>
                Role and Responsibilities of Visit Chittorgarh
              </h3>
              <p className="font-semibold mb-2 text-[#25231F]">Our responsibilities may include:</p>
              <ul className="space-y-1.5 mb-4 pl-1">
                <li>• Providing tourism-related information.</li>
                <li>• Connecting customers with local service providers.</li>
                <li>• Sharing available service options.</li>
                <li>• Providing package quotations.</li>
                <li>• Coordinating hotel, taxi, guide, and meal arrangements.</li>
                <li>• Facilitating communication through WhatsApp, phone, and other official channels.</li>
                <li>• Collecting payments for confirmed packages.</li>
                <li>• Distributing agreed payments to participating vendors.</li>
                <li>• Providing initial booking coordination and assistance.</li>
              </ul>
              <p className="italic text-[#25231F]/70">
                The actual performance and delivery of third-party services remain subject to the relevant booking arrangements and responsibilities of the respective service providers.
              </p>
            </section>

            {/* Section 3 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">3</span>
                Independent Third-Party Service Providers
              </h3>
              <p className="mb-3">
                All hotels, taxi operators, drivers, tour guides, restaurants, food providers, and other tourism-related vendors operate independently.
              </p>
              <p className="font-semibold mb-2 text-[#25231F]">Each provider is independently responsible for:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-4 pl-1">
                <li>• Actual service delivery</li>
                <li>• Staff conduct and behaviour</li>
                <li>• Applicable registrations &amp; licenses</li>
                <li>• Vehicle maintenance &amp; driving conduct</li>
                <li>• Hotel facilities and accommodation</li>
                <li>• Food quality and hygiene</li>
                <li>• Guiding activities &amp; professional conduct</li>
                <li>• Applicable safety standards</li>
                <li>• Operational decisions &amp; commitments</li>
                <li>• Compliance with applicable laws</li>
              </ul>
              <p className="text-xs text-[#25231F]/70">
                Visit Chittorgarh does not automatically assume operational responsibility for independent vendors merely because we introduced them to a customer or facilitated a booking.
              </p>
            </section>

            {/* Section 4 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">4</span>
                Transparent Pricing and Quotations
              </h3>
              <p className="mb-3">
                All prices and package quotations will be communicated before booking confirmation. Depending on the selected package, the quotation may include: hotel accommodation, taxi and transportation, tour guide charges, toll taxes, parking charges, driver allowances, lunch and dinner arrangements, monument admission fees, or other agreed services.
              </p>
              <ul className="space-y-1.5 pl-1 mb-3">
                <li>• Customers must carefully review the inclusions and exclusions before confirming a booking.</li>
                <li>• The price confirmed by Visit Chittorgarh shall be the agreed price for the specified services and inclusions.</li>
                <li>• No vendor should independently demand additional charges for services already included in the confirmed package without prior approval through Visit Chittorgarh's official communication channels.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">5</span>
                Booking, Payments and Payment Distribution Policy
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.1 Complete Package Bookings</h4>
                  <p>
                    If a customer books a complete tourism package through Visit Chittorgarh, including hotels, taxis, private tour guides, meals, sightseeing, or other arrangements, the complete agreed package payment must be made directly to Visit Chittorgarh through its officially communicated payment methods. After receiving the payment, Visit Chittorgarh will distribute the respective amounts to the participating independent vendors according to the confirmed arrangements. Customers are not required to make separate payments to individual vendors for services already included in the confirmed and fully paid package.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.2 Individual Service Bookings</h4>
                  <p>
                    If a customer books an individual service through Visit Chittorgarh, the applicable price and payment procedure will be communicated before confirmation. Where Visit Chittorgarh accepts payment for an individual booking, the customer must make the agreed payment through the official payment channels.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.3 No Unauthorized Additional Payments</h4>
                  <p className="mb-2">
                    After a booking has been confirmed and the agreed amount has been paid, customers must not independently pay additional amounts to drivers, guides, hotel staff, restaurants, or other vendors for services already included in the package. If any vendor requests additional money, customers should contact Visit Chittorgarh before making payment.
                  </p>
                  <p>
                    Any additional service, upgrade, or change must be approved and communicated through an official Visit Chittorgarh communication channel. If a customer independently transfers money to a vendor without prior authorization, Visit Chittorgarh shall not be responsible for that unauthorized transaction, subject to applicable law.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.4 Official Payment Channels</h4>
                  <p>
                    Customers must make payments only through officially communicated bank accounts, UPI IDs, payment gateways, or other authorized payment methods. Payments made to personal accounts, unofficial UPI IDs, private mobile numbers, or individual vendors without written authorization are outside the confirmed platform payment arrangement. Customers should retain payment receipts and transaction references.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.5 Website Payment Policy</h4>
                  <ul className="space-y-1 pl-1">
                    <li>• The payment must relate to an identified booking or service.</li>
                    <li>• The customer should review the quotation and package details before payment.</li>
                    <li>• Payment confirmation is subject to successful receipt and verification of the transaction.</li>
                    <li>• A payment gateway transaction reference does not independently establish that a booking has been accepted.</li>
                    <li>• A booking will be treated as confirmed when Visit Chittorgarh issues an official booking confirmation, subject to the stated payment conditions.</li>
                    <li>• If a payment is deducted but the booking is not confirmed, the customer should contact us with the transaction reference. Eligible refunds will be handled according to applicable payment and refund requirements.</li>
                    <li>• Customers should not repeat payments without first checking the transaction status.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.6 Payment Gateway and Technical Errors</h4>
                  <p>
                    Online payments may be processed through third-party payment gateways, banks, UPI providers, or financial institutions. Visit Chittorgarh does not control the independent technical infrastructure of these institutions. To the extent permitted by law, we shall not be responsible for interruptions, bank-side delays, gateway downtime, failed transactions, or unauthorized actions occurring solely within third-party payment systems, except to the extent of our own legal or contractual obligations. Customers should report duplicate deductions, failed transactions, and payment discrepancies through our official contact channels.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9]">
                  <h4 className="font-bold text-[#25231F] mb-1.5">5.7 Payment Distribution</h4>
                  <p>
                    Visit Chittorgarh may collect package payments and distribute the relevant amounts among participating vendors. If a payment distribution issue arises between Visit Chittorgarh and a vendor, the matter shall be addressed through the applicable contractual arrangements and legal procedures. Customers must not make duplicate payments to vendors simply because of an internal payment distribution delay.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">6</span>
                Authorized and Government-Recognized Tour Guides
              </h3>
              <p className="mb-2">
                Visit Chittorgarh aims to facilitate connections with properly verified, qualified, and authorized local tour guides. Where available and applicable, guides arranged through our platform will hold valid government identification and relevant authorization, registration, or certification from the competent Rajasthan Government department or concerned district authority.
              </p>
              <p className="mb-2">
                Customers may request verification of the assigned guide's credentials. Each guide remains independently responsible for their guiding activities, professional conduct, statements, commitments, and compliance with applicable regulations.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Visit Chittorgarh facilitates the connection and does not directly supervise every activity performed by an independent guide.
              </p>
            </section>

            {/* Section 7 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">7</span>
                Hotel, Taxi, Restaurant and Other Service Arrangements
              </h3>
              <p className="mb-3">
                Hotel accommodation, taxi transportation, food, sightseeing, and guiding services are delivered by their respective service providers.
              </p>
              <p className="font-semibold mb-2 text-[#25231F]">The respective providers are responsible for:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3 pl-1">
                <li>• Hotel room availability and condition</li>
                <li>• Check-in and check-out arrangements</li>
                <li>• Vehicle condition &amp; driving behaviour</li>
                <li>• Travel routes and schedules</li>
                <li>• Food preparation and hygiene</li>
                <li>• Guide conduct and tour activities</li>
                <li>• Staff behaviour</li>
                <li>• Service delivery &amp; operational permissions</li>
              </ul>
              <p className="text-xs text-[#25231F]/70">
                Customers should verify the relevant details before commencing their arrangements.
              </p>
            </section>

            {/* Section 8 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">8</span>
                Third-Party Fraud, Misconduct and Incidents
              </h3>
              <p className="mb-3">
                Visit Chittorgarh does not directly operate or control independent drivers, guides, hotels, restaurants, or other third-party vendors. To the extent permitted by applicable law, Visit Chittorgarh shall not be responsible for independent fraudulent acts, misconduct, negligence, unauthorized transactions, or operational decisions of third-party service providers.
              </p>
              <p className="font-semibold mb-2 text-[#25231F]">Examples include:</p>
              <ul className="space-y-1 pl-1 mb-3">
                <li>• A driver taking a customer to an unauthorized location.</li>
                <li>• A driver demanding unauthorized additional money.</li>
                <li>• A vendor attempting to defraud a customer.</li>
                <li>• Theft or loss of personal belongings.</li>
                <li>• Misconduct or harassment by independent vendors.</li>
                <li>• A hotel refusing check-in due to its own operational or booking issue.</li>
                <li>• Food-related incidents arising from independently operated restaurants.</li>
                <li>• An accident or injury arising from the independent operation of a third-party service.</li>
                <li>• Unauthorized additional purchases or transactions.</li>
              </ul>
              <p className="p-3 bg-red-50/70 border border-red-200 text-red-900 rounded-xl text-xs sm:text-sm">
                Customers should immediately contact the relevant authorities in cases of suspected fraud, criminal conduct, emergencies, or safety-related incidents. Visit Chittorgarh may voluntarily assist with communication where possible, but such assistance does not make the platform responsible for the vendor's independent actions. Nothing in this section removes liability for Visit Chittorgarh's own legally attributable acts or omissions.
              </p>
            </section>

            {/* Section 9 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">9</span>
                Cancellation and Refund Policy
              </h3>
              <p className="mb-3">
                All cancellations and refund requests shall be governed by the booking-specific cancellation conditions communicated before confirmation.
              </p>
              <p className="font-semibold mb-2 text-[#25231F]">Refund calculations may depend on:</p>
              <ul className="space-y-1 pl-1 mb-3">
                <li>• Hotel cancellation policies.</li>
                <li>• Taxi cancellation arrangements.</li>
                <li>• Tour guide cancellation arrangements.</li>
                <li>• Restaurant and meal reservations.</li>
                <li>• Payments already committed to vendors.</li>
                <li>• The agreed booking cancellation conditions.</li>
              </ul>
              <p className="mb-2">
                Any eligible refund of payments collected by Visit Chittorgarh will be processed in accordance with the applicable booking terms and law. Refund requests must be submitted through official communication channels with the relevant booking ID and payment reference.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Unauthorized payments made directly to vendors are outside the platform's payment and refund arrangements, subject to applicable law. Visit Chittorgarh will not impose cancellation conditions that override mandatory consumer rights.
              </p>
            </section>

            {/* Section 10 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">10</span>
                Customer Responsibility and Verification
              </h3>
              <p className="font-semibold mb-2 text-[#25231F]">Customers are responsible for:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3 pl-1">
                <li>• Reviewing the complete package quotation</li>
                <li>• Understanding included and excluded services</li>
                <li>• Confirming the agreed payment amount</li>
                <li>• Verifying service provider identities</li>
                <li>• Keeping payment receipts</li>
                <li>• Avoiding unauthorized transactions</li>
                <li>• Following local safety instructions</li>
                <li>• Communicating booking changes in advance</li>
                <li>• Obtaining confirmation of any additional service</li>
              </ul>
              <p className="text-xs text-[#25231F]/70">
                Any independently purchased service outside the confirmed package will be treated as a separate arrangement between the customer and the relevant provider.
              </p>
            </section>

            {/* Section 11 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">11</span>
                Customer-Requested Changes and Additional Services
              </h3>
              <p className="mb-2">
                Changes to travel dates, hotel categories, vehicles, meals, guides, sightseeing arrangements, or other package components must be communicated to Visit Chittorgarh. Additional charges may apply if a customer requests services outside the original package.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Such changes will become part of the confirmed booking only after the revised price and arrangements have been communicated and accepted. Visit Chittorgarh shall not be responsible for arrangements independently modified by customers or vendors without authorization.
              </p>
            </section>

            {/* Section 12 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">12</span>
                Website Availability and Technical Disclaimer
              </h3>
              <p className="mb-2">
                Visit Chittorgarh makes reasonable efforts to maintain website availability and provide accurate information. However, we do not guarantee uninterrupted website operation or error-free access.
              </p>
              <p className="mb-2">
                The website may temporarily experience server downtime, hosting interruptions, network failures, software errors, maintenance periods, third-party API interruptions, payment gateway interruptions, cybersecurity incidents, or technical incompatibilities.
              </p>
              <p className="text-xs text-[#25231F]/70">
                To the extent permitted by law, Visit Chittorgarh shall not be responsible for losses caused solely by external technical failures beyond its reasonable control. Customers should contact the official support channel if a technical issue affects a booking or payment.
              </p>
            </section>

            {/* Section 13 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">13</span>
                External Websites and Third-Party Platforms
              </h3>
              <p className="mb-2">
                Our website or communication channels may contain links, references, or integrations relating to third-party websites and services. These external platforms operate independently.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Visit Chittorgarh does not control their content, security policies, privacy practices, availability, or operational activities. Customers accessing external platforms should review the relevant third-party terms and policies.
              </p>
            </section>

            {/* Section 14 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">14</span>
                Force Majeure and Unforeseen Circumstances
              </h3>
              <p className="mb-2">
                Visit Chittorgarh and participating service providers may experience circumstances beyond their reasonable control, including natural disasters, floods, severe weather, road closures, government restrictions or official orders, public emergencies, civil disturbances, strikes or transportation disruptions, unexpected monument closures, security restrictions, public health emergencies, or major technical infrastructure failures.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Where such circumstances affect a booking, Visit Chittorgarh will make reasonable efforts to communicate available alternatives or revised arrangements. Any rescheduling, cancellation, or refund will be handled according to the applicable booking terms and law.
              </p>
            </section>

            {/* Section 15 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">15</span>
                Safety, Travel Insurance and Personal Belongings
              </h3>
              <p className="mb-2">
                Customers are encouraged to maintain suitable travel insurance and take reasonable precautions during their travel. Customers are responsible for safeguarding their personal belongings, valuables, documents, and electronic devices.
              </p>
              <p className="mb-2">
                Customers should follow safety instructions issued by competent authorities, hotel management, transport operators, and relevant service providers.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Visit Chittorgarh does not operate as an emergency response, medical assistance, or insurance provider. In an emergency, customers should contact the relevant emergency services and authorities directly.
              </p>
            </section>

            {/* Section 16 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">16</span>
                Privacy and Customer Information
              </h3>
              <p className="mb-2">
                Personal information submitted through Visit Chittorgarh, including names, phone numbers, email addresses, and travel schedules, may be used for responding to inquiries, processing bookings, communicating quotations, coordinating tourism arrangements, sharing necessary information with participating vendors, payment verification, customer support, and legal or regulatory compliance.
              </p>
              <p className="mb-2">
                Information will be shared with third-party service providers only as reasonably necessary for the requested arrangements or where otherwise legally permitted.
              </p>
              <p className="font-semibold text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs">
                ✓ We do not sell personal information to third-party commercial marketing companies. Personal information will be handled according to our Privacy Policy and applicable data protection laws.
              </p>
            </section>

            {/* Section 17 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">17</span>
                Website Misuse and Prohibited Activities
              </h3>
              <p className="font-semibold mb-2 text-[#25231F]">Customers and website visitors must not:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-3 pl-1">
                <li>• Submit false booking information</li>
                <li>• Use fraudulent payment methods</li>
                <li>• Impersonate another person</li>
                <li>• Attempt unauthorized access to website</li>
                <li>• Interfere with website operations</li>
                <li>• Upload malicious software</li>
                <li>• Attempt to steal customer or business info</li>
                <li>• Misuse contact details of vendors</li>
                <li>• Use the platform for unlawful activities</li>
                <li>• Misrepresent Visit Chittorgarh or services</li>
              </ul>
              <p className="text-xs text-[#25231F]/70">
                Visit Chittorgarh reserves the right to restrict access, suspend inquiries, or decline bookings where there is a reasonable basis to suspect fraud, misuse, or unlawful activity, subject to applicable law.
              </p>
            </section>

            {/* Section 18 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">18</span>
                Limitation of Liability
              </h3>
              <p className="mb-2">
                To the extent permitted by applicable law, Visit Chittorgarh shall not be liable for indirect or consequential losses arising solely from the independent activities of third-party service providers.
              </p>
              <p className="mb-2">
                The platform does not provide an unconditional guarantee of hotel facilities, transportation, meals, guiding activities, or other independent vendor services.
              </p>
              <p className="text-xs text-[#25231F]/70">
                However, Visit Chittorgarh remains responsible for its own contractual commitments, representations, payment collection obligations, data protection duties, and other applicable legal responsibilities. Nothing in these Terms &amp; Conditions shall exclude liability that cannot legally be excluded or restrict statutory consumer rights.
              </p>
            </section>

            {/* Section 19 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">19</span>
                Grievance Redressal and Customer Complaints
              </h3>
              <p className="mb-3">
                Customers may submit booking-related, payment-related, or platform-related complaints through the official contact details. We will make reasonable efforts to acknowledge and address complaints in accordance with applicable legal requirements.
              </p>
              <div className="p-4 rounded-xl bg-[#F8F5EF] border border-[#EFE7D9] space-y-1.5 text-xs sm:text-sm">
                <p><strong>Grievance Desk:</strong> Customer Support &amp; Concierge Redressal</p>
                <p><strong>Platform:</strong> Visit Chittorgarh</p>
                <p><strong>Email:</strong> <a href="mailto:visitchittorgarh@gmail.com" className="text-[#A65F3D] font-bold hover:underline">visitchittorgarh@gmail.com</a></p>
                <p><strong>Phone / WhatsApp:</strong> <a href="tel:+917597451057" className="text-[#A65F3D] font-bold hover:underline">+91 75974 51057</a></p>
              </div>
              <p className="text-xs text-[#25231F]/60 mt-2">
                Complaints received through applicable e-commerce channels will be handled within the timelines prescribed by relevant laws.
              </p>
            </section>

            {/* Section 20 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">20</span>
                Legal Jurisdiction and Dispute Resolution
              </h3>
              <p className="mb-2">
                These Terms &amp; Conditions shall be governed by the laws of India. For contractual disputes relating to Visit Chittorgarh's own platform obligations, payment collection, and distribution arrangements, the competent courts at Chittorgarh, Rajasthan shall have jurisdiction to the extent legally permissible.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Disputes involving independent vendors may also be subject to the jurisdiction applicable to those providers and transactions. Nothing in this clause prevents customers from approaching any consumer commission, competent authority, or court having jurisdiction under applicable Indian law.
              </p>
            </section>

            {/* Section 21 */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-[#C49A32]/10 text-[#C49A32] flex items-center justify-center text-xs font-black shrink-0">21</span>
                Modification and Updates
              </h3>
              <p className="mb-2">
                Visit Chittorgarh reserves the right to revise these Terms &amp; Conditions when necessary. Updated policies will be published on the official website with the revised effective date.
              </p>
              <p className="text-xs text-[#25231F]/70">
                Changes will not retrospectively remove rights already accrued to customers or override existing booking commitments except as legally permitted. Customers are encouraged to review the latest applicable terms before making a new booking.
              </p>
            </section>

            {/* Platform Disclaimer */}
            <section className="pt-6">
              <div className="p-5 rounded-2xl bg-[#EFE7D9]/50 border border-[#C49A32]/30">
                <h4 className="font-serif font-bold text-[#25231F] text-base mb-2">
                  IMPORTANT PLATFORM DISCLAIMER
                </h4>
                <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed mb-2">
                  Visit Chittorgarh is a tourism information, facilitation, and concierge platform that connects travelers with independent third-party tourism service providers. We facilitate connections and coordinate arrangements for taxi services, private tour guides, hotel accommodation, restaurants, meals, and other tourism-related facilities.
                </p>
                <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed mb-2">
                  For complete packages, Visit Chittorgarh may collect the agreed package payment and distribute the relevant amounts among participating vendors.
                </p>
                <p className="text-xs sm:text-sm text-[#25231F]/80 leading-relaxed">
                  The actual operation and delivery of independent third-party services remain subject to the applicable vendor arrangements and responsibilities. Visit Chittorgarh is responsible for its own contractual obligations and applicable legal duties. It does not provide an unconditional guarantee of independent third-party services.
                </p>
              </div>
            </section>

            {/* Official Contact Information */}
            <section className="pt-6">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#25231F] mb-3">
                OFFICIAL CONTACT INFORMATION
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                  <strong className="block text-[#25231F] mb-1">Business / Platform:</strong>
                  <span>Visit Chittorgarh</span>
                </div>
                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                  <strong className="block text-[#25231F] mb-1">Address:</strong>
                  <span>Chittaurgarh, Rajasthan – 312021, India</span>
                </div>
                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                  <strong className="block text-[#25231F] mb-1">Phone / WhatsApp:</strong>
                  <a href="https://wa.me/917597451057" className="text-[#A65F3D] font-bold hover:underline">
                    +91 75974 51057
                  </a>
                </div>
                <div className="p-4 bg-[#F8F5EF] rounded-xl border border-[#EFE7D9]">
                  <strong className="block text-[#25231F] mb-1">Email:</strong>
                  <a href="mailto:visitchittorgarh@gmail.com" className="text-[#A65F3D] font-bold hover:underline">
                    visitchittorgarh@gmail.com
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-[#25231F]/60 mt-4 text-center">
                Policy: Official Terms &amp; Conditions • Effective Date: 14 November 2026
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
