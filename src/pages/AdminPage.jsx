import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Database, Lock, ArrowLeft, ExternalLink, RefreshCw, FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Safe local admin access check
        if (pin === '7597' || pin === 'admin') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid access PIN.');
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 bg-[#F8F5EF] text-[#25231F] flex flex-col justify-center items-center">
            <SEOHead
                title="Admin Concierge Desk | Visit Chittorgarh"
                description="Administrative operational portal for Visit Chittorgarh."
                canonical="/admin"
            />

            <div className="max-w-2xl w-full bg-white rounded-3xl p-8 border border-[#EFE7D9] shadow-xl">
                {!isAuthenticated ? (
                    <div className="max-w-sm mx-auto text-center">
                        <div className="w-16 h-16 bg-[#C49A32]/10 border border-[#C49A32]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C49A32]">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-[#25231F] mb-2">Internal Operations</h1>
                        <p className="text-xs text-[#25231F]/60 mb-6">
                            Enter management access key to view current configuration and frontend lead logs.
                        </p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Enter Access PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="w-full bg-[#F8F5EF] border border-[#EFE7D9] rounded-2xl py-3 px-4 text-center text-lg tracking-widest text-[#25231F] focus:outline-none focus:border-[#C49A32]"
                            />
                            {error && <p className="text-xs text-red-600">{error}</p>}
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-[#C49A32] text-white rounded-xl font-bold uppercase tracking-wider text-xs hover:bg-[#b08728] transition-all shadow-md"
                            >
                                Enter Operations Panel
                            </button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <div className="flex items-center justify-between pb-6 border-b border-[#EFE7D9] mb-6">
                            <div>
                                <h2 className="text-xl font-serif font-bold text-[#25231F]">Operations & Architecture Status</h2>
                                <p className="text-xs text-[#25231F]/60">Frontend-Only Mode (Decoupled from legacy Firebase)</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                Pure Frontend Active
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                                <h3 className="text-xs font-bold uppercase text-[#A65F3D] mb-1">Architecture</h3>
                                <p className="text-sm font-semibold text-[#25231F]">Frontend-Only (Vite + React)</p>
                                <p className="text-[11px] text-[#25231F]/60 mt-1">Ready for future Supabase migration without legacy ties.</p>
                            </div>
                            <div className="p-4 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9]">
                                <h3 className="text-xs font-bold uppercase text-[#526B50] mb-1">Verified WhatsApp Desk</h3>
                                <p className="text-sm font-semibold text-[#25231F]">+91 75974 51057</p>
                                <p className="text-[11px] text-[#25231F]/60 mt-1">Direct instant quotation & booking flow.</p>
                            </div>
                        </div>

                        <div className="p-5 bg-[#F8F5EF] rounded-2xl border border-[#EFE7D9] mb-6 space-y-2 text-xs">
                            <h4 className="font-bold text-[#25231F] flex items-center gap-2">
                                <Database className="w-4 h-4 text-[#C49A32]" /> Cloud Safety Confirmation
                            </h4>
                            <p className="text-[#25231F]/70">
                                Original Firebase project (<code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#EFE7D9]">chittorgarh-tourism-d47d5</code>) and past inquiries remain safely preserved in the cloud console.
                            </p>
                            <p className="text-[#25231F]/70">
                                A complete code backup is preserved under <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-[#EFE7D9]">legacy-backend-backup/</code>.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="https://wa.me/917597451057"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 py-3 bg-[#C49A32] text-white rounded-xl text-center font-bold text-xs uppercase tracking-wider hover:bg-[#b08728] transition-all flex items-center justify-center gap-2"
                            >
                                Open WhatsApp Desk <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <Link
                                to="/"
                                className="py-3 px-6 bg-white border border-[#EFE7D9] text-[#25231F] rounded-xl text-center font-semibold text-xs hover:bg-[#F8F5EF] transition-all flex items-center justify-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" /> Exit to Website
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;
