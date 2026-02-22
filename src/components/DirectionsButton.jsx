import React, { useState } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DirectionsButton = ({ className = "" }) => {
    const [loading, setLoading] = useState(false);

    const getDirections = () => {
        setLoading(true);
        const destination = "Chittorgarh+Fort,Rajasthan,India";

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    // Fallback to directions without origin (Google Maps will ask for location)
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            // Geolocation not supported
            const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
            window.open(url, '_blank');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={getDirections}
            disabled={loading}
            className={`inline-flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-widest hover:text-royal-white transition-colors disabled:opacity-50 ${className}`}
        >
            {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <Navigation className="w-4 h-4" />
            )}
            {loading ? "Detecting Location..." : "Get Directions →"}
        </button>
    );
};

export default DirectionsButton;
