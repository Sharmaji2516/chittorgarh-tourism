import React, { useState } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

const MapPreview = ({ coordinates, name }) => {
    const [loading, setLoading] = useState(false);

    if (!coordinates || !coordinates[0]) return null;

    const getDirections = () => {
        setLoading(true);
        const dest = `${coordinates[0]},${coordinates[1]}`;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${dest}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                (error) => {
                    console.error("Location error:", error);
                    const url = `https://www.google.com/maps/dir/?api=1&origin=my+location&destination=${dest}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            const url = `https://www.google.com/maps/dir/?api=1&origin=my+location&destination=${dest}&travelmode=driving`;
            window.open(url, '_blank');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3 pt-2">
            <h3 className="text-lg font-bold text-royal-gold mb-2 font-serif border-b border-royal-gold/20 pb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-royal-gold" /> Location & Navigation
            </h3>

            {/* Premium Google Maps Action Banner */}
            <div className="bg-gradient-to-r from-royal-gold/15 via-amber-500/10 to-transparent border border-royal-gold/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="flex items-center gap-3 text-left">
                    <div className="w-12 h-12 rounded-xl bg-royal-gold/20 border border-royal-gold/40 flex items-center justify-center shrink-0 shadow-inner">
                        <Navigation className="w-6 h-6 text-royal-gold animate-bounce" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-white">{name}</div>
                        <div className="text-xs text-gray-300">Live turn-by-turn directions from your current location</div>
                    </div>
                </div>

                <button
                    onClick={getDirections}
                    disabled={loading}
                    className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider text-royal-black hover:text-black py-3.5 px-6 bg-gradient-to-r from-royal-gold to-amber-400 hover:from-amber-300 hover:to-royal-gold rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Navigation className="w-4 h-4 fill-current" />
                    )}
                    <span>{loading ? "Detecting Location..." : "Open Navigation in Google Maps"}</span>
                </button>
            </div>
        </div>
    );
};

export default MapPreview;
