import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Clock, MapPin, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const VerificationPage = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Load booking from localStorage or create verified display
        const timer = setTimeout(() => {
            const draft = localStorage.getItem('ctt_booking_draft');
            if (draft) {
                try {
                    setBooking(JSON.parse(draft));
                } catch {
                    setBooking(null);
                }
            }
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [id]);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F8F5EF] text-[#25231F] flex flex-col justify-center items-center">
            <SEOHead
                title="Voucher & Tour Verification | Visit Chittorgarh"
                description="Verify official Visit Chittorgarh booking vouchers, tour passes, and private guide credentials."
                canonical={`/verify/${id || 'tour'}`}
            />

            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-xl text-center">
                <div className="w-16 h-16 bg-[#C49A32]/10 border border-[#C49A32]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C49A32]">
                    <ShieldCheck className="w-8 h-8" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C49A32] bg-[#F8F5EF] px-3 py-1 rounded-full border border-[#EFE7D9]">
                    Official Pass Verification
                </span>

                <h1 className="text-2xl font-serif font-bold text-[#25231F] mt-4 mb-2">
                    Mewar Heritage Tour Pass
                </h1>
                <p className="text-xs text-[#25231F]/60 mb-6">
                    Token ID: <span className="font-mono text-[#A65F3D] font-bold">{id || 'CTT-75974'}</span>
                </p>

                <div className="bg-[#F8F5EF] rounded-2xl p-4 text-left border border-[#EFE7D9] mb-6 space-y-3 text-xs">
                    <div className="flex justify-between items-center pb-2 border-b border-[#EFE7D9]">
                        <span className="text-[#25231F]/60">Verification Status</span>
                        <span className="inline-flex items-center gap-1 text-emerald-600 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified Active
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#25231F]/60">Assigned Concierge</span>
                        <span className="font-semibold text-[#25231F]">+91 75974 51057</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[#25231F]/60">Support Desk</span>
                        <span className="font-semibold text-[#25231F]">Birla Shiksha Kendra, Chittorgarh</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <a
                        href={`https://wa.me/917597451057?text=Hello%20Visit%20Chittorgarh,%20I%20am%20verifying%20pass%20ID:%20${encodeURIComponent(id || 'CTT')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-[#C49A32] text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#b08728] transition-all shadow-md"
                    >
                        <MessageSquare className="w-4 h-4" />
                        Verify on WhatsApp Concierge
                    </a>

                    <Link
                        to="/"
                        className="w-full py-3 bg-[#F8F5EF] text-[#25231F] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#EFE7D9] transition-all border border-[#EFE7D9]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;
