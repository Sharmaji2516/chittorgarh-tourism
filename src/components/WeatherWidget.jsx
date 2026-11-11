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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5 md:gap-2 fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-2 md:p-3 glass-card rounded-xl w-28 md:w-36 border-royal-gold/20 shadow-xl"
        >
            <div className="flex items-center justify-between">
                <span className="text-royal-gold font-serif text-[8px] md:text-[10px] tracking-[0.2em] uppercase truncate">Chittorgarh</span>
                <Sun className="w-3 h-3 md:w-4 md:h-4 text-royal-gold flex-shrink-0" />
            </div>

            <div className="flex items-end gap-1">
                <span className="text-xl md:text-2xl font-serif font-bold text-royal-white">{weather.temp}°</span>
                <span className="text-royal-gold/60 text-[8px] md:text-[10px] mb-0.5 uppercase tracking-tighter whitespace-nowrap">{weather.condition}</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-royal-gold/10">
                <div className="flex items-center gap-1">
                    <Droplets className="w-2.5 h-2.5 text-royal-gold/40" />
                    <span className="text-[9px] text-royal-white/50">{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-1">
                    <Thermometer className="w-2.5 h-2.5 text-royal-gold/40" />
                    <span className="text-[9px] text-royal-white/50">{weather.wind}k/h</span>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherWidget;
