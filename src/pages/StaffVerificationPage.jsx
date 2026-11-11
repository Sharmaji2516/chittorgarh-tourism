import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Search, CheckCircle2, Phone, ArrowLeft, KeyRound } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const StaffVerificationPage = () => {
    const [tokenInput, setTokenInput] = useState('');
    const [result, setResult] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!tokenInput.trim()) return;
        setResult({
            id: tokenInput.trim().toUpperCase(),
            status: 'Verified Guide / Taxi Partner',
            assignedTo: 'Official Mewar Tour Service',
            validity: 'Valid for 2026 Season',
            contact: '+91 75974 51057'
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F8F5EF] text-[#25231F] flex flex-col justify-center items-center">
            <SEOHead
                title="Staff & Partner Verification Portal | Visit Chittorgarh"
                description="Official staff, tour guide, and fleet partner verification desk for Visit Chittorgarh tourism."
                canonical="/staff-verify"
            />

            <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-xl text-center">
                <div className="w-16 h-16 bg-[#526B50]/10 border border-[#526B50]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#526B50]">
                    <KeyRound className="w-8 h-8" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#526B50] bg-[#526B50]/10 px-3 py-1 rounded-full">
                    Partner Access Portal
                </span>

                <h1 className="text-2xl font-serif font-bold text-[#25231F] mt-4 mb-2">
                    Staff & Guide Desk
                </h1>
                <p className="text-xs text-[#25231F]/60 mb-6">
                    Enter booking token, guide badge ID, or guest booking reference.
                </p>

                <form onSubmit={handleSearch} className="space-y-4 mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g. CTT-75974 or Guide Code"
                            value={tokenInput}
                            onChange={(e) => setTokenInput(e.target.value)}
                            className="w-full bg-[#F8F5EF] border border-[#EFE7D9] rounded-2xl py-3.5 pl-4 pr-12 text-sm text-[#25231F] font-mono uppercase focus:outline-none focus:border-[#C49A32]"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 top-2 bottom-2 px-3 bg-[#C49A32] text-white rounded-xl text-xs flex items-center justify-center hover:bg-[#b08728] transition-colors"
                        >
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </form>

                {result && (
                    <div className="bg-[#F8F5EF] rounded-2xl p-4 text-left border border-[#EFE7D9] mb-6 space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-emerald-700 font-bold">
                            <CheckCircle2 className="w-4 h-4" /> Verified In Active Roster
                        </div>
                        <p className="text-[#25231F]/70">Reference: <strong className="text-[#25231F]">{result.id}</strong></p>
                        <p className="text-[#25231F]/70">Coverage: <strong className="text-[#25231F]">{result.status}</strong></p>
                        <p className="text-[#25231F]/70">Ground Dispatch: <strong className="text-[#25231F]">{result.contact}</strong></p>
                    </div>
                )}

                <div className="space-y-3">
                    <a
                        href="https://wa.me/917597451057?text=Staff%20Support%20Verification%20Desk%20Inquiry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 bg-[#25231F] text-white rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 hover:bg-[#3a3731] transition-all"
                    >
                        <Phone className="w-4 h-4" />
                        Direct Supervisor Call Desk
                    </a>

                    <Link
                        to="/"
                        className="w-full py-3 bg-[#F8F5EF] text-[#25231F] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-[#EFE7D9] transition-all border border-[#EFE7D9]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Return to Public Portal
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StaffVerificationPage;
