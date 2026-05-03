import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { QrCode, Loader2, Star, CheckCircle2, ShieldCheck, Lock, LogOut, Car, Hotel, UserCheck, UtensilsCrossed, Coffee, RefreshCw, Clock } from 'lucide-react';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';

const StaffVerificationPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [staffRole, setStaffRole] = useState('');
    const [providerId, setProviderId] = useState('');
    const [providerData, setProviderData] = useState(null);
    const [pin, setPin] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const [redeemLoading, setRedeemLoading] = useState(null);
    const [todayBookings, setTodayBookings] = useState([]);
    const [scheduleLoading, setScheduleLoading] = useState(false);

    const STAFF_PIN = "1234";

    const roles = [
        { id: 'taxi', label: 'Taxi Driver', serviceName: 'Private Taxi', icon: Car },
        { id: 'hotel', label: 'Hotel Management', serviceName: 'Hotel Booking', icon: Hotel },
        { id: 'guide', label: 'Heritage Guide', serviceName: 'Private Guide', icon: UserCheck },
        { id: 'restaurant', label: 'Restaurant Manager', serviceName: 'Restaurant Reservation', icon: UtensilsCrossed },
        { id: 'cafe', label: 'Cafe Staff', serviceName: 'Cafe & Hangouts', icon: Coffee }
    ];

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (pin !== STAFF_PIN) {
                setError("Invalid Verifier PIN");
                setPin('');
                setLoading(false);
                return;
            }

            if (!providerId) {
                setError("Please enter your Unique Provider ID");
                setLoading(false);
                return;
            }

            // Verify Provider ID in Firestore
            const q = query(collection(db, "providers"), where("providerCode", "==", providerId.toUpperCase()));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                setError("Invalid Provider ID. Please check your Welcome Mail.");
                setLoading(false);
                return;
            }

            const pData = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
            setProviderData(pData);
            setStaffRole(pData.type);
            setIsLoggedIn(true);
            fetchTodaySchedule(pData.type, pData.name);
        } catch (err) {
            console.error("Login Error:", err);
            setError("Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (code.length !== 6) return;
        
        setLoading(true);
        setError('');
        setBooking(null);
        
        try {
            const q = query(collection(db, "bookings"), where("passCode", "==", code));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                const docSnap = querySnapshot.docs[0];
                const data = docSnap.id ? { id: docSnap.id, ...docSnap.data() } : null;
                
                // Check if the guest has the specific service authorized AND is assigned to THIS provider
                const roleObj = roles.find(r => r.id === staffRole);
                const isAuthorized = (data.includedServices || []).includes(roleObj.serviceName);
                
                // Check provider assignment
                let isAssigned = false;
                if (staffRole === 'taxi') isAssigned = data.taxiName === providerData.name;
                else if (staffRole === 'hotel') isAssigned = data.hotelName === providerData.name;
                else if (staffRole === 'guide') isAssigned = data.guideName === providerData.name;
                else isAssigned = isAuthorized; // For others, just check if authorized for now or add more logic

                if (data && isAuthorized && isAssigned) {
                    setBooking(data);
                } else if (!isAuthorized) {
                    setError(`Access Denied: Guest pass does not include '${roleObj.serviceName}'.`);
                } else if (!isAssigned) {
                    setError(`Restricted: This guest is assigned to a different ${roleObj.label}. You are not authorized to verify this pass.`);
                }
            } else {
                setError("Invalid Pass: No such token exists in our records.");
            }
        } catch (err) {
            console.error("Verification Error:", err);
            setError("Connection failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRedeem = async (serviceKey) => {
        setRedeemLoading(serviceKey);
        try {
            const docRef = doc(db, "bookings", booking.id);
            const updateData = {
                [`redeemed_${staffRole}`]: true,
                [`redeemed_${staffRole}_at`]: new Date().toISOString()
            };
            await updateDoc(docRef, updateData);
            setBooking(prev => ({ ...prev, ...updateData }));
        } catch (err) {
            console.error("Redemption Error:", err);
            alert("Failed to redeem service. Try again.");
        } finally {
            setRedeemLoading(null);
        }
    };

    const fetchTodaySchedule = async (roleId, providerName) => {
        setScheduleLoading(true);
        try {
            const today = new Date().toISOString().split('T')[0];
            const roleObj = roles.find(r => r.id === roleId);
            
            // Filter by date, service type, and provider name
            let q;
            if (roleId === 'taxi') {
                q = query(collection(db, "bookings"), where("date", "==", today), where("taxiName", "==", providerName));
            } else if (roleId === 'hotel') {
                q = query(collection(db, "bookings"), where("date", "==", today), where("hotelName", "==", providerName));
            } else if (roleId === 'guide') {
                q = query(collection(db, "bookings"), where("date", "==", today), where("guideName", "==", providerName));
            } else {
                q = query(collection(db, "bookings"), where("date", "==", today), where("includedServices", "array-contains", roleObj.serviceName));
            }

            const snapshot = await getDocs(q);
            setTodayBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } catch (err) {
            console.error("Schedule Fetch Error:", err);
        } finally {
            setScheduleLoading(false);
        }
    };

    const getServiceIcon = (service) => {
        const role = roles.find(r => r.id === service);
        if (role) {
            const Icon = role.icon;
            return <Icon className="w-7 h-7" />;
        }
        return <Star className="w-7 h-7" />;
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-xl p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative z-10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-royal-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-8 h-8 text-royal-gold" />
                        </div>
                        <h1 className="text-3xl font-serif text-white font-black italic uppercase tracking-tighter mb-2">Service Provider Access</h1>
                        <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em]">Official Royal Registry System</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest text-center">Identity Verification</p>
                            <div className="space-y-4">
                                <input 
                                    type="text" 
                                    value={providerId} 
                                    onChange={(e) => setProviderId(e.target.value)} 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-center text-xl font-black tracking-widest text-royal-gold focus:outline-none focus:border-royal-gold/50" 
                                    placeholder="ENTER PROVIDER ID (e.g. TX-1234)" 
                                />
                                <input 
                                    type="password" 
                                    maxLength={4} 
                                    value={pin} 
                                    onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))} 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-8 text-center text-2xl tracking-[1em] text-royal-gold focus:outline-none focus:border-royal-gold/50" 
                                    placeholder="****" 
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-[10px] font-black uppercase tracking-wider text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</p>}
                        
                        <button type="submit" disabled={loading} className="w-full py-6 bg-royal-gold text-royal-black font-black uppercase tracking-widest text-xs rounded-3xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify Provider Identity"}
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    const currentRoleLabel = roles.find(r => r.id === staffRole)?.label;

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white p-4 md:p-12 relative overflow-hidden font-sans">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-royal-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            
            <div className="max-w-xl mx-auto relative z-10">
                <div className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-royal-gold/10 rounded-xl flex items-center justify-center">
                            {getServiceIcon(staffRole)}
                        </div>
                        <div>
                            <h1 className="text-xl font-serif font-black italic tracking-tight">{providerData?.name}</h1>
                            <p className="text-[8px] text-royal-gold uppercase tracking-[0.3em] font-black">{currentRoleLabel} | ID: {providerData?.providerCode}</p>
                        </div>
                    </div>
                    <button onClick={() => { setIsLoggedIn(false); setBooking(null); setStaffRole(''); setProviderData(null); setProviderId(''); }} className="p-3 bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all flex items-center gap-2 group">
                        <span className="text-[9px] font-black uppercase tracking-widest hidden group-hover:block">Logout Partner</span>
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="p-8 md:p-12 rounded-[3.5rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl text-center">
                    {!booking ? (
                        <form onSubmit={handleVerify} className="space-y-10">
                            <div className="space-y-4">
                                <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.5em]">Enter Guest Pass Code</p>
                                <input 
                                    autoFocus
                                    type="text" 
                                    maxLength={6} 
                                    value={code}
                                    onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))}
                                    placeholder="000000"
                                    className="w-full bg-black/40 border-2 border-white/5 rounded-[2.5rem] py-10 px-10 text-center text-6xl font-mono tracking-[0.3em] text-royal-gold focus:outline-none focus:border-royal-gold transition-all shadow-inner"
                                />
                            </div>
                            {error && <p className="text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-500/10 p-4 rounded-2xl border border-red-500/20">{error}</p>}
                            <button 
                                type="submit" 
                                disabled={loading || code.length !== 6}
                                className="w-full py-7 bg-royal-gold text-royal-black font-black uppercase tracking-[0.2em] text-[11px] rounded-[2rem] shadow-2xl shadow-royal-gold/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
                            >
                                {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : "Verify Identity"}
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-12">
                            <div className="p-10 rounded-[3rem] bg-white/[0.05] border border-white/10 text-left relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                                <p className="text-[10px] text-royal-gold font-black uppercase tracking-[0.4em] mb-3">Honorable Guest</p>
                                <h3 className="text-4xl font-serif text-white font-black italic mb-2 tracking-tight">{booking.name}</h3>
                                <p className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">{booking.phone}</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-4">
                                    <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.5em]">Restricted Verification</p>
                                    <div className="h-px flex-1 bg-white/10 mx-6"></div>
                                </div>
                                
                                {/* ONLY SHOW THE SELECTED STAFF ROLE SERVICE */}
                                <div className="p-6 rounded-[2.5rem] border-2 bg-white/[0.05] border-royal-gold/10 shadow-xl flex items-center justify-between group">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 rounded-2xl bg-royal-gold/10 text-royal-gold flex items-center justify-center">
                                            {getServiceIcon(staffRole)}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[9px] text-white/20 font-black uppercase tracking-widest mb-1">Pass Service</p>
                                            <h4 className="text-lg font-black uppercase tracking-tight text-white font-serif italic">{staffRole}</h4>
                                        </div>
                                    </div>
                                    
                                    {booking[`redeemed_${staffRole.toLowerCase()}`] ? (
                                        <div className="flex flex-col items-end gap-1.5">
                                            <div className="px-5 py-2.5 bg-green-500/10 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 border border-green-500/20 shadow-lg">
                                                <CheckCircle2 className="w-4 h-4" />
                                                Used
                                            </div>
                                            <p className="text-[8px] text-white/30 font-black uppercase tracking-wider">
                                                {new Date(booking[`redeemed_${staffRole.toLowerCase()}_at`]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleRedeem(staffRole)}
                                            disabled={redeemLoading === staffRole}
                                            className="px-8 py-4 bg-royal-gold text-royal-black hover:bg-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-90 shadow-xl shadow-royal-gold/10"
                                        >
                                            {redeemLoading === staffRole ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & Use"}
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col gap-4">
                                <button onClick={() => setBooking(null)} className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-royal-gold transition-colors py-4 rounded-2xl border border-white/5 bg-white/5">Verify Another Guest</button>
                                <p className="text-[8px] text-white/10 uppercase tracking-widest font-black italic">Session Type: {staffRole}</p>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Today's Expected Guests Section */}
                {!booking && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 space-y-6">
                        <div className="flex items-center justify-between px-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Your Assigned Guests (Today)</h2>
                            <button onClick={() => fetchTodaySchedule(staffRole, providerData.name)} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                                <RefreshCw className={cn("w-4 h-4 text-royal-gold", scheduleLoading && "animate-spin")} />
                            </button>
                        </div>

                        {todayBookings.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3">
                                {todayBookings.map((b) => (
                                    <div key={b.id} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 flex items-center justify-between group hover:bg-white/[0.04] transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-royal-gold/10 text-royal-gold flex items-center justify-center font-serif italic font-black">
                                                {b.name?.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white tracking-tight">{b.name}</p>
                                                <p className="text-[8px] text-white/30 uppercase tracking-widest font-black">Waiting for Verification</p>
                                            </div>
                                        </div>
                                        {b[`redeemed_${staffRole}`] ? (
                                            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
                                                <CheckCircle2 className="w-3 h-3" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Completed</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-royal-gold bg-royal-gold/10 px-4 py-2 rounded-full border border-royal-gold/20">
                                                <Clock className="w-3 h-3" />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Expected</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 text-center rounded-[3rem] border border-dashed border-white/10 opacity-20">
                                <p className="text-xs font-bold italic">No arrivals scheduled for today</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            <footer className="mt-20 text-center opacity-30">
                <p className="text-[10px] text-white font-black uppercase tracking-[0.5em]">Chittorgarh Tourism Administration</p>
            </footer>
        </div>
    );
};

export default StaffVerificationPage;
