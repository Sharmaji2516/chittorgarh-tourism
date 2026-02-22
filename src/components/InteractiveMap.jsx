import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../context/LanguageContext';
import { content } from '../data/content';
import L from 'leaflet';
import DirectionsButton from './DirectionsButton';

// Fix for default marker icons in React-Leaflet/Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const InteractiveMap = () => {
    const { lang } = useLanguage();
    // Safety check for language
    const safeLang = content[lang] ? lang : 'en';
    const t = content[safeLang];

    // Default center (Chittorgarh Fort)
    const position = [24.8879, 74.6454];

    // Filter items that have coordinates
    const attractionsWithCoords = t.attractions.items.filter(item => item.coordinates);

    return (
        <section id="map" className="py-20 bg-royal-black relative">
            <div className="container mx-auto px-4 z-10 relative">
                <div className="text-center mb-12">
                    <span className="text-royal-gold font-serif text-lg tracking-widest uppercase mb-2 block">Navigate History</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-royal-white mb-6">
                        Fort <span className="text-royal-gold">Map</span>
                    </h2>
                    <div className="flex justify-center mb-6">
                        <DirectionsButton className="bg-royal-gold/10 px-6 py-3 rounded-full border border-royal-gold/30 hover:bg-royal-gold/20" />
                    </div>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-royal-gold to-transparent mx-auto"></div>
                </div>

                <div className="h-[500px] w-full rounded-2xl overflow-hidden border-2 border-royal-gold/30 shadow-2xl relative z-0">
                    <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {attractionsWithCoords.map((item) => (
                            <Marker key={item.id} position={item.coordinates}>
                                <Popup className="font-sans text-sm">
                                    <div className="text-center">
                                        <h3 className="font-bold text-royal-gold text-lg mb-1">{item.name}</h3>
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded mb-2" />
                                        )}
                                        <p className="text-gray-700">{item.desc.substring(0, 60)}...</p>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
};

export default InteractiveMap;
