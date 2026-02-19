import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Sun, Droplets, Thermometer } from 'lucide-react';

const WeatherWidget = () => {
    // Mock data for Chittorgarh (In a real app, this would come from an API)
    const weather = {
        temp: 28,
        condition: 'Sunny',
        humidity: 45,
        wind: 12
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex flex-col gap-4 fixed bottom-10 right-10 z-50 p-4 glass-card rounded-2xl w-48 border-royal-gold/30"
        >
            <div className="flex items-center justify-between">
                <span className="text-royal-gold font-serif text-sm tracking-widest uppercase">Chittorgarh</span>
                <Sun className="w-5 h-5 text-royal-gold animate-pulse" />
            </div>

            <div className="flex items-end gap-2">
                <span className="text-4xl font-serif font-bold text-royal-white">{weather.temp}°</span>
                <span className="text-royal-gold/60 text-sm mb-1 uppercase tracking-tighter">{weather.condition}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-royal-gold/10">
                <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-royal-gold/50" />
                    <span className="text-[10px] text-royal-white/60">{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-royal-gold/50" />
                    <span className="text-[10px] text-royal-white/60">{weather.wind}km/h</span>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
