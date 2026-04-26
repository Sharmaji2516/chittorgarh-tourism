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
    Send
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

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 no-print">
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-royal-black/98 backdrop-blur-3xl"
            />
            
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                className="relative w-full max-w-4xl bg-heritage-charcoal border border-white/10 rounded-[4rem] overflow-hidden shadow-[0_50px_150px_-30px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row max-h-[95vh]"
            >
                {/* Side Brand Panel */}
                <div className="w-full lg:w-64 bg-royal-gold/10 border-b lg:border-b-0 lg:border-r border-white/5 p-10 flex flex-col justify-between items-center text-center">
                    <div className="z-10">
                        <div className="w-20 h-20 rounded-3xl bg-royal-gold flex items-center justify-center shadow-2xl shadow-royal-gold/40 mb-6">
                            <FileText className="w-10 h-10 text-royal-black" />
                        </div>
                        <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em] mb-4">Leads Console</p>
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                            <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1">Current Status</p>
                            <p className={cn(
                                "text-[11px] font-bold uppercase tracking-widest leading-none",
                                booking.status === 'contacted' ? "text-green-400" : "text-royal-gold animate-pulse"
                            )}>
                                {booking.status === 'contacted' ? "Contacted" : "Active Inquiry"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Lead Details Content */}
                <div className="flex-1 p-8 lg:p-14 overflow-y-auto custom-scrollbar bg-heritage-charcoal">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <span className="text-[10px] text-royal-gold font-bold uppercase tracking-[0.3em] mb-3 block">Guest Expedition Details</span>
                            <div className="flex items-center gap-4 mb-3 flex-wrap">
                                <h2 className="text-3xl md:text-4xl font-serif text-white">{localData.name}</h2>
                                <button onClick={() => setEditMode(!editMode)} className="p-2 bg-white/5 hover:bg-royal-gold hover:text-royal-black rounded-lg transition-all">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center gap-4 py-2 px-5 bg-white/5 rounded-full border border-white/10 w-fit">
                                <Phone className="w-4 h-4 text-royal-gold" />
                                <span className="text-sm font-black tracking-[0.1em] text-white/80">{localData.phone}</span>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-full transition-all text-white/30 hover:text-white shrink-0">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
                        <div className="space-y-8">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-royal-gold" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-black">Experience Package</p>
                                    <p className="text-lg text-white font-bold">{localData.pillarTitle || "Custom Discovery"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0">
                                    <Calendar className="w-6 h-6 text-royal-gold" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1 font-black">Date of Arrival</p>
                                    <p className="text-lg text-white font-bold">{formatDateReadable(localData.date)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[3rem] bg-gradient-to-br from-royal-gold/20 via-royal-gold/5 to-transparent border border-royal-gold/20 flex flex-col justify-center relative overflow-hidden group">
                            <p className="text-[11px] text-royal-gold font-black uppercase tracking-[0.5em] mb-2 z-10">Live Invoice Estimate</p>
                            <p className="text-4xl md:text-5xl text-white font-serif z-10">₹{calculateLiveTotal(localData)}</p>
                        </div>
                    </div>

                    {/* Service Management */}
                    <div className="space-y-6 pt-10 border-t border-white/5">
                        <h4 className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-black mb-6">Service Management</h4>
                        
                        <div className="flex flex-col gap-4">
                            {/* Transport */}
                            <div className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.02] border border-white/5 flex-wrap gap-4">
                                <div className="flex items-center gap-5 min-w-[200px]">
                                    <div className="p-3 bg-royal-gold/10 rounded-xl shrink-0"><Car className="w-5 h-5 text-royal-gold" /></div>
                                    <div className="flex-1">
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Transport Service</p>
                                        {editMode ? (
                                            <select value={localData.transport} onChange={(e) => setLocalData({...localData, transport: e.target.value})} className="bg-[#1a1a1a] text-white border border-white/10 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                {Object.keys(PRICE_LIST.transport).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-white font-bold uppercase tracking-wider text-sm">{localData.transport}</p>
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
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Accommodation</p>
                                        {editMode ? (
                                            <select value={localData.hotel} onChange={(e) => setLocalData({...localData, hotel: e.target.value})} className="bg-[#1a1a1a] text-white border border-white/10 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                {Object.keys(PRICE_LIST.hotel).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-white font-bold uppercase tracking-wider text-sm">{localData.hotel}</p>
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
                                        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Heritage Guide</p>
                                        {editMode ? (
                                            <select value={localData.guide} onChange={(e) => setLocalData({...localData, guide: e.target.value})} className="bg-[#1a1a1a] text-white border border-white/10 rounded-xl py-3 px-4 w-full focus:outline-none focus:border-royal-gold text-sm shadow-inner">
                                                {Object.keys(PRICE_LIST.guide).map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                            </select>
                                        ) : (
                                            <p className="text-white font-bold uppercase tracking-wider text-sm">{localData.guide}</p>
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
                            <>
                                <button 
                                    onClick={sendUpdateWhatsApp}
                                    className="flex-[2] py-6 bg-green-500 text-white font-black uppercase tracking-widest text-xs rounded-3xl flex items-center justify-center gap-4 hover:brightness-110 shadow-2xl transition-all active:scale-95"
                                >
                                    <Send className="w-6 h-6" />
                                    Send Updated Quote
                                </button>
                                <button 
                                    onClick={handlePrint}
                                    className="flex-[1] py-6 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-3xl flex items-center justify-center gap-4 hover:brightness-110 shadow-2xl transition-all active:scale-95"
                                >
                                    <Printer className="w-6 h-6" />
                                    Print Bill
                                </button>
                            </>
                        )}
                        <button 
                            onClick={onClose}
                            className="px-10 py-6 bg-white/10 text-white/60 font-black uppercase tracking-widest text-xs rounded-3xl hover:bg-white/20 transition-all"
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

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-heritage-charcoal text-white no-print">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md p-10 rounded-[3rem] bg-heritage-charcoal border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative overflow-hidden">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 rounded-2xl bg-royal-gold/10 flex items-center justify-center mx-auto mb-6"><Lock className="w-8 h-8 text-royal-gold" /></div>
                        <h1 className="text-2xl font-serif font-bold mb-2">{t.admin.loginTitle}</h1>
                        <p className="text-xs text-white/40 uppercase tracking-widest">{t.admin.pinPlaceholder}</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <input autoFocus type="password" maxLength={4} value={pin} onChange={(e) => setPin(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-10 text-center text-3xl tracking-[1em] text-royal-gold focus:outline-none focus:border-royal-gold/50" placeholder="****" />
                        {error && <p className="text-red-400 text-center text-xs font-bold uppercase tracking-wider">{error}</p>}
                        <button type="submit" className="w-full py-5 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-2xl shadow-xl">{t.admin.loginBtn}</button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-heritage-charcoal text-white pt-24 pb-20 px-4 md:px-12 lg:px-20 no-print selection:bg-royal-gold selection:text-royal-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-16">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-royal-gold/10 rounded-2xl"><LayoutDashboard className="w-8 h-8 text-royal-gold" /></div>
                        <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight">{t.admin.dashboardTitle}</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-4 bg-white/5 border border-white/10 rounded-full text-white/40 hover:text-white transition-all"><Home className="w-6 h-6" /></Link>
                        <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 text-white/60">{t.admin.logout} <LogOut className="w-4 h-4" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] flex items-center gap-8 shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0"><TrendingUp className="w-8 h-8" /></div>
                        <div><p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 font-black">Total</p><p className="text-4xl font-serif text-white">{bookings.length}</p></div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] flex items-center gap-8 shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-royal-gold/10 flex items-center justify-center text-royal-gold shrink-0"><Clock className="w-8 h-8" /></div>
                        <div><p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 font-black">New</p><p className="text-4xl font-serif text-white">{bookings.filter(b => b.status !== 'contacted').length}</p></div>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[3rem] flex items-center gap-8 shadow-2xl">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-400 shrink-0"><CheckCircle2 className="w-8 h-8" /></div>
                        <div><p className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1 font-black">Success</p><p className="text-4xl font-serif text-white">{bookings.filter(b => b.status === 'contacted').length}</p></div>
                    </div>
                </div>

                <div className="mb-10">
                    <div className="relative group">
                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-white/20 group-focus-within:text-royal-gold transition-colors" />
                        <input type="text" placeholder="Search travelers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] py-7 pl-20 pr-8 focus:outline-none focus:border-royal-gold/50 text-white text-lg font-medium transition-all" />
                    </div>
                </div>

                <div className="bg-white/[0.03] border border-white/5 rounded-[3.5rem] overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] border-b border-white/5">
                                <tr>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Traveler</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Category</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Date</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Estimate</th>
                                    <th className="px-10 py-10 text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Status</th>
                                    <th className="px-14 py-10 text-right text-[9px] uppercase font-black tracking-[0.5em] text-royal-gold/50">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.03]">
                                {loading ? (
                                    <tr><td colSpan="6" className="px-10 py-32 text-center text-royal-gold"><Loader2 className="w-12 h-12 animate-spin mx-auto mb-6" /><p className="uppercase tracking-[0.2em] font-black">Syncing Regisrty...</p></td></tr>
                                ) : filteredBookings.map((booking) => (
                                    <motion.tr key={booking.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setSelectedBooking(booking)} className="hover:bg-white/[0.05] transition-all group cursor-pointer">
                                        <td className="px-10 py-12">
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-royal-gold/20 to-orange-500/20 border border-white/10 flex items-center justify-center font-black text-royal-gold text-lg shrink-0">{booking.name?.charAt(0)}</div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-white text-lg mb-1 truncate">{booking.name}</p>
                                                    <p className="text-[11px] text-white/20 tracking-widest font-black uppercase">{booking.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-12">
                                            <div className="flex flex-col gap-1 items-start">
                                                <span className="px-4 py-1.5 bg-white/5 rounded-full border border-white/5 text-[9px] font-black uppercase text-white/40 tracking-widest whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">
                                                    {booking.pillarTitle || "Custom"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-12 text-sm font-black text-white/50 tracking-wider">
                                            <div className="whitespace-nowrap">{formatDateReadable(booking.date)}</div>
                                        </td>
                                        <td className="px-10 py-12">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-xl font-serif text-royal-gold font-bold">₹</span>
                                                <span className="text-3xl font-serif text-white font-bold">{getRowTotal(booking)}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-12">
                                            <div className="flex">
                                                {booking.status === 'contacted' ? (
                                                    <span className="text-green-400 text-[9px] font-black uppercase bg-green-400/10 px-5 py-2.5 rounded-xl border border-green-400/20 whitespace-nowrap">Contacted</span>
                                                ) : (
                                                    <span className="text-amber-400 text-[9px] font-black uppercase bg-amber-400/10 px-5 py-2.5 rounded-xl border border-amber-400/20 whitespace-nowrap animate-pulse">New Inquiry</span>
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
