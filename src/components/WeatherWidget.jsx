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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 md:gap-4 fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-3 md:p-4 glass-card rounded-2xl w-36 md:w-48 border-royal-gold/30 shadow-2xl"
        >
            <div className="flex items-center justify-between">
                <span className="text-royal-gold font-serif text-[10px] md:text-sm tracking-[0.2em] uppercase truncate">Chittorgarh</span>
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-royal-gold animate-pulse flex-shrink-0" />
            </div>

            <div className="flex items-end gap-1 md:gap-2">
                <span className="text-2xl md:text-4xl font-serif font-bold text-royal-white">{weather.temp}°</span>
                <span className="text-royal-gold/60 text-[10px] md:text-sm mb-1 uppercase tracking-tighter whitespace-nowrap">{weather.condition}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-royal-gold/10">
                <div className="flex items-center gap-1">
                    <Droplets className="w-3 h-3 text-royal-gold/50" />
                    <span className="text-[10px] text-royal-white/60">{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-royal-gold/50" />
                    <span className="text-[10px] text-royal-white/60">{weather.wind}k/h</span>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
