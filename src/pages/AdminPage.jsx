import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Lock, 
    LogOut, 
    Phone, 
    Calendar, 
    User, 
    Trash2, 
    CheckCircle2, 
    Clock, 
    ExternalLink, 
    Search,
    RefreshCw,
    TrendingUp,
    MessageSquare,
    AlertCircle,
    Loader2,
    Globe,
    Home,
    Car,
    Hotel,
    UserCheck,
    X,
    MapPin,
    Users,
    Info,
    Printer,
    FileText,
    Edit2,
    Save,
    Send,
    MessageCircle,
    Mail
} from 'lucide-react';
import { cn } from '../utils/cn';

const PRICE_LIST = {
    transport: { 'Luxury Sedan': 1500, 'Royal SUV': 2500, 'Mini Bus': 5000, 'Not Needed': 0, 'Not Selected': 0 },
    hotel: { 'Heritage Palace': 6000, 'Boutique Hotel': 3500, 'Eco Resort': 2500, 'Not Needed': 0, 'Not Selected': 0 },
    guide: { 'History Scholar': 1200, 'Photography Expert': 2000, 'Storyteller': 1000, 'Not Needed': 0, 'Not Selected': 0 }
};

const formatDateReadable = (dateStr) => {
    if (!dateStr) return "Not Set";
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    } catch (e) {
        return dateStr;
    }
};

const BookingDetailModal = ({ booking, onClose }) => {
    const [editMode, setEditMode] = useState(false);
    const [localData, setLocalData] = useState(booking);
    const [isSaving, setIsSaving] = useState(false);

    if (!booking) return null;

    const handlePrint = () => {
        window.print();
    };

    const getPrice = (cat, val) => PRICE_LIST[cat][val] || 0;
    
    const calculateLiveTotal = (data) => {
        return (getPrice('transport', data.transport) + getPrice('hotel', data.hotel) + getPrice('guide', data.guide));
    };

    const handleUpdate = async () => {
        setIsSaving(true);
        try {
            const newTotal = calculateLiveTotal(localData);
            await updateDoc(doc(db, "bookings", booking.id), {
                ...localData,
                totalAmount: newTotal
            });
            setEditMode(false);
        } catch (err) {
            console.error("Update Error:", err);
        } finally {
            setIsSaving(false);
        }
    };

    const sendUpdateWhatsApp = () => {
        const total = calculateLiveTotal(localData);
        const phoneNumber = "91" + localData.phone?.replace(/[^0-9]/g, '');
        const message = `*👑 Updated Royal Inquiry*%0A%0A` +
            `Dear ${localData.name}, we have updated your itinerary details based on current availability:%0A%0A` +
            `*🛡️ Package:* ${localData.pillarTitle || "Custom"}%0A` +
            `*📅 Date:* ${formatDateReadable(localData.date)}%0A%0A` +
            `*-- Revised Choices --*%0A` +
            `*🚗 Transport:* ${localData.transport}%0A` +
            `*🏨 Hotel:* ${localData.hotel}%0A` +
            `*🚩 Guide:* ${localData.guide}%0A%0A` +
            `*💰 New Total Estimate: ₹${total}*%0A%0A` +
            `Please let us know if this works for you.`;
        
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    const sendWelcomeMessage = () => {
        const phoneNumber = "91" + localData.phone?.replace(/[^0-9]/g, '');
        const message = `*👑 Welcome to Chittorgarh!*%0A%0A` +
            `Dear ${localData.name}, thank you for choosing us for your heritage journey. We are excited to host you!%0A%0A` +
            `Our team is preparing your custom itinerary for the *${localData.pillarTitle || "Expedition"}*.%0A%0A` +
            `Is there anything specific you would like to see?`;
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 no-print">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-white/60 backdrop-blur-3xl"
            />
            
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="relative w-full max-w-6xl bg-white border border-slate-200 rounded-[4rem] overflow-hidden shadow-[0_50px_150px_-30px_rgba(0,0,0,0.2)] flex flex-col lg:flex-row max-h-[95vh]"
            >
                {/* Side Brand Panel */}
                <div className="w-full lg:w-72 bg-royal-gold/10 border-b lg:border-b-0 lg:border-r border-royal-gold/10 p-10 flex flex-col justify-between items-start text-left">
                    <div className="z-10 w-full space-y-8">
                        <div className="w-20 h-20 rounded-3xl bg-royal-gold flex items-center justify-center shadow-2xl shadow-royal-gold/40 mb-10">
                            <User className="w-10 h-10 text-royal-black" />
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em] mb-2">Guest Profile</p>
                                <h3 className="text-xl font-serif text-black font-bold leading-tight">{localData.name}</h3>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-royal-gold/10 rounded-lg"><Phone className="w-3.5 h-3.5 text-royal-gold" /></div>
                                    <p className="text-[11px] font-black text-black/80 tracking-widest">{localData.phone}</p>
                                </div>
                                {localData.email && (
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-royal-gold/10 rounded-lg"><Mail className="w-3.5 h-3.5 text-royal-gold" /></div>
                                        <p className="text-[11px] font-black text-black/80 tracking-tight truncate max-w-[150px]">{localData.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="pt-8 border-t border-royal-gold/10 w-full">
                            <p className="text-[9px] text-black/40 uppercase tracking-widest mb-3">Expedition Status</p>
                            <div className={cn(
                                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest leading-none",
                                booking.status === 'contacted' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-royal-gold/10 text-royal-gold border border-royal-gold/20"
                            )}>
                                <span className={cn("w-1.5 h-1.5 rounded-full", booking.status === 'contacted' ? "bg-green-500" : "bg-royal-gold animate-pulse")}></span>
                                {booking.status === 'contacted' ? "Contacted" : "New Lead"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Lead Details Content */}
                <div className="flex-1 p-8 lg:p-14 overflow-y-auto custom-scrollbar bg-white">
                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] text-royal-gold font-bold uppercase tracking-[0.3em] mb-3 block">Guest Expedition Registry</span>
                            <div className="flex items-center gap-4 flex-wrap">
                                <h2 className="text-4xl md:text-5xl font-serif text-black">{localData.name}</h2>
                                <button onClick={() => setEditMode(!editMode)} className="p-2 bg-slate-100 hover:bg-royal-gold hover:text-royal-black rounded-lg transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-4 bg-slate-100 hover:bg-slate-200 rounded-full transition-all text-black/60 hover:text-black shrink-0">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Trip Info Row (Phone | Package | Date) */}
                    <div className="flex flex-wrap items-center gap-x-12 gap-y-6 py-8 border-y border-slate-100 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100"><Phone className="w-4 h-4 text-royal-gold" /></div>
                            <div>
                                <p className="text-[9px] text-black/40 uppercase tracking-widest font-black mb-0.5">Contact Number</p>
                                <p className="text-sm font-black tracking-widest text-black">{localData.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100"><MapPin className="w-4 h-4 text-royal-gold" /></div>
                            <div>
                                <p className="text-[9px] text-black/40 uppercase tracking-widest font-black mb-0.5">Experience Package</p>
                                <p className="text-sm font-bold text-black uppercase tracking-wide">{localData.pillarTitle || "Custom Discovery"}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100"><Calendar className="w-4 h-4 text-royal-gold" /></div>
                            <div>
                                <p className="text-[9px] text-black/40 uppercase tracking-widest font-black mb-0.5">Arrival Date</p>
                                <p className="text-sm font-bold text-black">{formatDateReadable(localData.date)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status & Billing Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100">
                            <p className="text-[9px] text-black/40 uppercase tracking-widest mb-4 font-black">Current Visit Status</p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: 'scheduled', label: 'Scheduled', color: 'bg-blue-500' },
                                    { id: 'in_city', label: 'In City', color: 'bg-green-500' },
                                    { id: 'departed', label: 'Departed', color: 'bg-slate-500' }
                                ].map((s) => (
                                    <button 
                                        key={s.id}
                                        disabled={!editMode}
                                        onClick={() => setLocalData({...localData, visitStatus: s.id})}
                                        className={cn(
                                            "px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all",
                                            localData.visitStatus === s.id 
                                                ? `${s.color} text-white shadow-lg` 
                                                : "bg-white border border-slate-200 text-black/40 hover:border-royal-gold/30"
                                        )}
                                    >
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 rounded-[3rem] bg-gradient-to-br from-royal-gold/10 via-royal-gold/5 to-transparent border border-royal-gold/10 flex flex-col justify-center relative overflow-hidden group">
                            <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.5em] mb-2 z-10">Live Invoice Estimate</p>
                            <p className="text-4xl text-black font-serif z-10">₹{calculateLiveTotal(localData)}</p>
                        </div>
                    </div>

                    {/* Admin Notes Row */}
                    <div className="mb-10 p-8 rounded-[3rem] bg-slate-50/50 border border-slate-100/50">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-royal-gold/10 rounded-lg"><MessageCircle className="w-4 h-4 text-royal-gold" /></div>
                            <p className="text-[10px] text-black/40 uppercase tracking-widest font-black">Internal Admin Notes / Remarks</p>
                        </div>
                        {editMode ? (
                            <textarea 
                                value={localData.adminNotes || ''} 
                                onChange={(e) => setLocalData({...localData, adminNotes: e.target.value})}
                                placeholder="Add specific requirements, budget notes, or follow-up details..."
                                className="w-full bg-white border border-slate-200 rounded-[2rem] p-6 text-sm text-black focus:outline-none focus:border-royal-gold min-h-[100px] shadow-inner"
                            />
                        ) : (
                            <div className="text-sm text-black/70 italic px-2">
                                {localData.adminNotes || "No internal notes added yet."}
                            </div>
                        )}
                    </div>

                    {/* Service Management */}
                    <div className="space-y-6 pt-10 border-t border-slate-100">
                        <h4 className="text-[10px] text-black/40 uppercase tracking-[0.5em] font-black mb-6">Service Management</h4>
                        
                        <div className="flex flex-col gap-4">
                            {/* Transport */}
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex-wrap gap-4">
                                <div className="flex items-center gap-5 min-w-[200px]">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><Car className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-black/60 uppercase tracking-widest mb-1">Transport Service</p>
                                        {editMode ? (
                                            <select value={localData.transport} onChange={(e) => setLocalData({...localData, transport: e.target.value})} className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                {Object.keys(PRICE_LIST.transport).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-black font-bold uppercase tracking-wider text-sm">{localData.transport}</p>
                                        )}
                                    </div>
                                </div>
                                <span className="text-xl font-serif text-royal-gold">₹{getPrice('transport', localData.transport)}</span>
                            </div>

                            {/* Hotel */}
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex-wrap gap-4">
                                <div className="flex items-center gap-5 min-w-[200px]">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><Hotel className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-black/60 uppercase tracking-widest mb-1">Accommodation</p>
                                        {editMode ? (
                                            <select value={localData.hotel} onChange={(e) => setLocalData({...localData, hotel: e.target.value})} className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                {Object.keys(PRICE_LIST.hotel).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-black font-bold uppercase tracking-wider text-sm">{localData.hotel}</p>
                                        )}
                                    </div>
                                </div>
                                <span className="text-xl font-serif text-royal-gold">₹{getPrice('hotel', localData.hotel)}</span>
                            </div>

                            {/* Guide */}
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex-wrap gap-4">
                                <div className="flex items-center gap-5 min-w-[200px]">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><UserCheck className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-black/60 uppercase tracking-widest mb-1">Heritage Guide</p>
                                        {editMode ? (
                                            <select value={localData.guide} onChange={(e) => setLocalData({...localData, guide: e.target.value})} className="bg-slate-50 text-black border border-slate-200 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                {Object.keys(PRICE_LIST.guide).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-black font-bold uppercase tracking-wider text-sm">{localData.guide}</p>
                                        )}
                                    </div>
                                </div>
                                <span className="text-xl font-serif text-royal-gold">₹{getPrice('guide', localData.guide)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-14 flex flex-col md:flex-row gap-5 no-print">
                        {editMode ? (
                            <button 
                                onClick={handleUpdate}
                                disabled={isSaving}
                                className="flex-1 py-6 bg-blue-500 text-white font-black uppercase tracking-widest text-xs rounded-3xl flex items-center justify-center gap-4 hover:brightness-110 shadow-2xl transition-all"
                            >
                                {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                Save Changes
                            </button>
                        ) : (
                            <div className="flex flex-1 gap-3">
                                <button 
                                    onClick={sendUpdateWhatsApp}
                                    className="flex-1 px-6 py-5 bg-green-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/20 transition-all active:scale-95 group"
                                >
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    Send Quote
                                </button>
                                <button 
                                    onClick={sendWelcomeMessage}
                                    className="flex-1 px-6 py-5 bg-blue-500 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95 group"
                                >
                                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Welcome
                                </button>
                                <button 
                                    onClick={handlePrint}
                                    className="px-8 py-5 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-slate-900/20 transition-all active:scale-95 group"
                                >
                                    <Printer className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                                    Print
                                </button>
                            </div>
                        )}
                        <button 
                            onClick={onClose}
                            className="px-10 py-6 bg-slate-100 text-black/70 font-black uppercase tracking-widest text-xs rounded-3xl hover:bg-slate-200 transition-all"
                        >
                            Close
                        </button>
                </div>
            </div>
        </motion.div>

            {/* HIGH QUALITY PRINTABLE BILL */}
            <div className="hidden print:block fixed inset-0 bg-white text-black p-12 z-[500] font-sans">
                <div className="flex justify-between items-start border-b-2 border-royal-gold/30 pb-10 mb-12">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-serif font-black uppercase tracking-tighter">Chittorgarh Tourism</h1>
                        <p className="text-[9px] uppercase tracking-[0.5em] font-black text-gray-400">Royal Heritage Expedition Quotation</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black uppercase text-gray-300 mb-1">Invoice Reference</p>
                        <p className="text-sm font-bold tracking-widest">CT-{booking.id?.slice(-8).toUpperCase()}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-16 mb-16 px-6 py-10 bg-gray-50 rounded-3xl">
                    <div className="space-y-4">
                        <p className="text-[10px] uppercase font-black text-royal-gold tracking-widest mb-1">Guest Profile</p>
                        <p className="text-3xl font-serif font-black">{localData.name}</p>
                        <p className="text-xl font-bold text-gray-600 underline">{localData.phone}</p>
                    </div>
                    <div className="text-right space-y-4">
                        <p className="text-[10px] uppercase font-black text-royal-gold tracking-widest mb-1">Trip Summary</p>
                        <p className="text-2xl font-serif font-black uppercase">{localData.pillarTitle || "Custom Tour"}</p>
                        <p className="text-gray-500 font-bold">Planned Arrival: {formatDateReadable(localData.date)}</p>
                    </div>
                </div>

                <div className="px-6">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-black">
                                <th className="py-6 text-left text-[10px] uppercase font-black tracking-widest">Service Description</th>
                                <th className="py-6 text-right text-[10px] uppercase font-black tracking-widest">Price (INR)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <tr>
                                <td className="py-8"><p className="text-lg font-bold">Transport Package</p><p className="text-xs uppercase text-gray-400 font-bold">{localData.transport}</p></td>
                                <td className="py-8 text-right text-2xl font-serif font-black">₹{getPrice('transport', localData.transport)}</td>
                            </tr>
                            <tr>
                                <td className="py-8"><p className="text-lg font-bold">Accommodation Arrangement</p><p className="text-xs uppercase text-gray-400 font-bold">{localData.hotel}</p></td>
                                <td className="py-8 text-right text-2xl font-serif font-black">₹{getPrice('hotel', localData.hotel)}</td>
                            </tr>
                            <tr>
                                <td className="py-8"><p className="text-lg font-bold">Professional Heritage Guide</p><p className="text-xs uppercase text-gray-400 font-bold">{localData.guide}</p></td>
                                <td className="py-8 text-right text-2xl font-serif font-black">₹{getPrice('guide', localData.guide)}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td className="py-12 text-3xl font-serif font-black uppercase tracking-tighter border-t-2 border-black pt-12">Total Estimate</td>
                                <td className="py-12 text-5xl font-serif font-black text-right border-t-2 border-black pt-12">₹{calculateLiveTotal(localData)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className="absolute bottom-16 left-0 w-full text-center px-12">
                    <div className="h-px bg-gray-100 w-full mb-8"></div>
                    <p className="text-[10px] uppercase font-black text-gray-300 tracking-[0.6em]">Authorized Quote by Chittorgarh Tourism Department</p>
                </div>
            </div>

            <style>{`
                @media print {
                    body * { visibility: hidden !important; }
                    .print\\:block, .print\\:block * { visibility: visible !important; }
                    .print\\:block { position: fixed; left: 0; top: 0; width: 100%; height: 100%; background: white !important; }
                }
            `}</style>
        </div>
    );
};

const AdminPage = () => {
    const { language } = useLanguage();
    const t = content.en;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState(null);

    const ADMIN_PIN = "2516";

    useEffect(() => {
        if (!isLoggedIn) return;
        const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            setLoading(false);
        });
        return () => unsubscribe();
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) { setIsLoggedIn(true); setError(''); } 
        else { setError(t.admin.invalidPin); setPin(''); }
    };

    const toggleStatus = async (booking, e) => {
        e.stopPropagation();
        await updateDoc(doc(db, "bookings", booking.id), { status: booking.status === 'contacted' ? 'submitted' : 'contacted' });
    };

    const deleteBooking = async (id, e) => {
        e.stopPropagation();
        if (window.confirm("Archive this entry?")) await deleteDoc(doc(db, "bookings", id));
    };

    const getRowTotal = (b) => {
        return (PRICE_LIST.transport[b.transport] || 0) + (PRICE_LIST.hotel[b.hotel] || 0) + (PRICE_LIST.guide[b.guide] || 0);
    };

    const filteredBookings = bookings.filter(b => 
        (b.name?.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (b.phone?.includes(searchTerm)) ||
        (b.pillarTitle?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const exportToCSV = () => {
        const headers = ["Name,Phone,Package,Date,Estimate,Status,VisitStatus,Notes\n"];
        const rows = bookings.map(b => {
            const date = formatDateReadable(b.date).replace(/,/g, '');
            const total = getRowTotal(b);
            const notes = (b.adminNotes || '').replace(/,/g, ';').replace(/\n/g, ' ');
            return `${b.name},${b.phone},${b.pillarTitle || 'Custom'},${date},${total},${b.status},${b.visitStatus || 'pending'},${notes}\n`;
        });
        const blob = new Blob([headers, ...rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Chittorgarh_Tourism_Leads_${new Date().toLocaleDateString()}.csv`;
        a.click();
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-black no-print">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md p-10 rounded-[3rem] bg-white border border-slate-200 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-royal-gold/10 flex items-center justify-center mx-auto mb-6"><Lock className="w-8 h-8 text-royal-gold" /></div>
                        <h1 className="text-2xl font-serif font-bold mb-2">{t.admin.loginTitle}</h1>
                        <p className="text-xs text-black/60 uppercase tracking-widest">{t.admin.pinPlaceholder}</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input autoFocus type="password" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-6 px-10 text-center text-3xl tracking-[1em] text-royal-gold focus:outline-none focus:border-royal-gold/50" placeholder="****" />
                        {error && <p className="text-red-400 text-center text-xs font-bold uppercase tracking-wider">{error}</p>}
                        <button type="submit" className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl">{t.admin.loginBtn}</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-black pt-24 pb-20 px-4 md:px-12 lg:px-20 no-print selection:bg-royal-gold selection:text-royal-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-royal-gold/10 rounded-2xl"><LayoutDashboard className="w-8 h-8 text-royal-gold" /></div>
                        <h1 className="text-3xl md:text-5xl font-serif text-black tracking-tight">{t.admin.dashboardTitle}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={exportToCSV} className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 text-royal-gold shadow-sm">
                            <FileText className="w-4 h-4" />
                            Export Data
                        </button>
                        <Link to="/" className="p-4 bg-white border border-slate-200 rounded-full text-black/60 hover:text-black transition-all shadow-sm"><Home className="w-6 h-6" /></Link>
                        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 px-8 py-4 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 text-black/80 shadow-sm">{t.admin.logout} <LogOut className="w-4 h-4" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white border border-slate-200 p-10 rounded-[3rem] flex items-center gap-8 shadow-xl">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0"><TrendingUp className="w-8 h-8" /></div>
                        <div><p className="text-[10px] text-black/60 uppercase tracking-[0.2em] mb-1 font-black">Total</p><p className="text-4xl font-serif text-black">{bookings.length}</p></div>
                    </div>
                    <div className="bg-white border border-slate-200 p-10 rounded-[3rem] flex items-center gap-8 shadow-xl">
                        <div className="w-16 h-16 rounded-2xl bg-royal-gold/10 flex items-center justify-center text-royal-gold shrink-0"><Clock className="w-8 h-8" /></div>
                        <div><p className="text-[10px] text-black/60 uppercase tracking-[0.2em] mb-1 font-black">New</p><p className="text-4xl font-serif text-black">{bookings.filter(b => b.status !== 'contacted').length}</p></div>
                    </div>
                    <div className="bg-white border border-slate-200 p-10 rounded-[3rem] flex items-center gap-8 shadow-xl">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0"><CheckCircle2 className="w-8 h-8" /></div>
                        <div><p className="text-[10px] text-black/60 uppercase tracking-[0.2em] mb-1 font-black">Success</p><p className="text-4xl font-serif text-black">{bookings.filter(b => b.status === 'contacted').length}</p></div>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="relative group">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-black/40 group-focus-within:text-royal-gold transition-colors" />
                        <input type="text" placeholder="Search travelers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border border-slate-200 rounded-[2.5rem] py-7 pl-20 pr-8 focus:outline-none focus:border-royal-gold/50 text-black text-lg font-medium transition-all shadow-sm" />
                    </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-[3.5rem] overflow-hidden shadow-xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100">
                                <tr>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Traveler</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Category</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Date</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Estimate</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Status</th>
                                    <th className="px-14 py-10 text-right text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {loading ? (
                                    <tr><td colSpan="6" className="px-10 py-32 text-center text-royal-gold"><Loader2 className="w-12 h-12 animate-spin mx-auto mb-6" /><p className="uppercase tracking-[0.2em] font-black text-black/60">Syncing Regisrty...</p></td></tr>
                                ) : filteredBookings.map((booking) => (
                                    <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedBooking(booking)} className="hover:bg-slate-50 transition-all group cursor-pointer">
                                        <td className="px-10 py-12">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-gold/20 to-orange-500/20 border border-slate-200 flex items-center justify-center font-black text-royal-gold text-lg shrink-0">{booking.name?.charAt(0)}</div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-black text-lg mb-1 truncate">{booking.name}</p>
                                                    <p className="text-[11px] text-black/60 tracking-widest font-black uppercase">{booking.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-12">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span className="px-4 py-1.5 bg-slate-100 rounded-full border border-slate-100 text-[9px] font-black uppercase text-black/70 tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                                                    {booking.pillarTitle || "Custom"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-12 text-sm font-black text-black/60 tracking-wider">
                                            <div className="whitespace-nowrap">{formatDateReadable(booking.date)}</div>
                                        </td>
                                        <td className="px-10 py-12">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-serif text-royal-gold font-bold">₹</span>
                                                <span className="text-3xl font-serif text-black font-bold">{getRowTotal(booking)}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-12">
                                            <div className="flex">
                                                {booking.status === 'contacted' ? (
                                                    <span className="text-green-400 text-[9px] font-black uppercase bg-green-400/10 px-5 py-2.5 rounded-xl border border-green-400/20 whitespace-nowrap">Contacted</span>
                                                ) : (
                                                    <span className="text-amber-400 text-[9px] font-black uppercase bg-amber-400/10 px-5 py-2.5 rounded-xl border border-amber-400/20 whitespace-nowrap animate-pulse">New Inquiry</span>
                                                )}
                                                {booking.visitStatus && (
                                                    <span className={cn(
                                                        "text-[9px] font-black uppercase px-5 py-2.5 rounded-xl border whitespace-nowrap ml-2",
                                                        booking.visitStatus === 'in_city' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                        booking.visitStatus === 'scheduled' ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                                                        "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                                    )}>
                                                        {booking.visitStatus.replace('_', ' ')}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-14 py-12 text-right">
                                            <div className="flex justify-end gap-4 opacity-100 lg:opacity-40 lg:group-hover:opacity-100 transition-all duration-500">
                                                <a href={`https://wa.me/${booking.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-4 bg-green-500/10 text-green-400 rounded-2xl hover:bg-green-500 hover:text-white transition-all shadow-xl"><MessageSquare className="w-5 h-5" /></a>
                                                <button onClick={(e) => toggleStatus(booking, e)} className="p-4 bg-royal-gold/10 text-royal-gold rounded-2xl hover:bg-royal-gold hover:text-royal-black transition-all shadow-xl"><CheckCircle2 className="w-5 h-5" /></button>
                                                <button onClick={(e) => deleteBooking(booking.id, e)} className="p-4 bg-red-400/10 text-red-400 rounded-2xl hover:bg-red-400 hover:text-white transition-all shadow-xl"><Trash2 className="w-5 h-5" /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AnimatePresence>{selectedBooking && <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}</AnimatePresence>
            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.2); border-radius: 20px; }
            `}</style>
        </div>
    );
};

export default AdminPage;
