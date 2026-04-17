import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, ExternalLink, Loader2 } from 'lucide-react';

// Fix for default marker icons in Leaflet with Webpack/Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapPreview = ({ coordinates, name, zoom = 15 }) => {
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
                    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
                    window.open(url, '_blank');
                    setLoading(false);
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            const url = `https://www.google.com/maps/dir/?api=1&destination=${dest}&travelmode=driving`;
            window.open(url, '_blank');
            setLoading(false);
        }
    };

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-bold text-royal-gold mb-2 font-serif border-b border-royal-gold/20 pb-1 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Location Map
            </h3>

            <div className="h-64 rounded-xl overflow-hidden border border-royal-gold/30 shadow-inner relative z-0">
                <MapContainer
                    center={coordinates}
                    zoom={zoom}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={coordinates}>
                        <Popup>
                            <div className="text-royal-black font-medium">
                                {name}
                            </div>
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            <button
                onClick={getDirections}
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 text-sm text-royal-gold hover:text-white transition-colors py-3 px-3 bg-royal-gold/10 rounded-lg border border-royal-gold/20 group disabled:opacity-50"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <ExternalLink className="w-4 h-4" />
                )}
                <span>{loading ? "Detecting Your Location..." : "Open Navigating in Google Maps"}</span>
            </button>
        </div>
    );
};

export default MapPreview;
