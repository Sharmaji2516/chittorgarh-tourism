import React, { useState } from 'react';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const DirectionsButton = ({ className = "", destination = "Chittorgarh+Fort,Rajasthan,India", destinationName = "Chittorgarh Fort" }) => {
    const [loading, setLoading] = useState(false);

    const getDirections = () => {
        setLoading(true);

        if ("geolocation" in navigator) {
            // Options for high accuracy and timeout
            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Use 'dir' api with specified origin and destination
                    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                (error) => {
                    console.error("Location error:", error);
                    // Fallback: Use 'dir' without origin. Google Maps will ask or use IP-based location
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                options
            );
        } else {
            // Fallback for browsers without geolocation
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
