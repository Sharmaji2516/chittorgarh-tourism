import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    // Royalty-free Indian Folk Music (Placeholder URL)
    const audioUrl = "https://cdn.pixabay.com/download/audio/2022/03/09/audio_d0df8f4b00.mp3?filename=indian-meditation-19602.mp3";

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <audio ref={audioRef} loop>
                <source src={audioUrl} type="audio/mp3" />
            </audio>

            <button
                onClick={togglePlay}
                className={`p-3 rounded-full shadow-lg backdrop-blur-md border border-royal-gold/30 transition-all duration-500 flex items-center gap-2 group ${isPlaying ? 'bg-royal-gold/90 text-royal-black w-32' : 'bg-black/50 text-royal-gold w-12'}`}
            >
                <div className={`relative ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <Music className="w-5 h-5" />
                </div>

                {isPlaying && (
                    <span className="text-xs font-serif font-bold tracking-widest whitespace-nowrap overflow-hidden">
                        ROYAL AMBIENCE
                    </span>
                )}

                {/* Sound wave visualizer (fake) */}
                {isPlaying && (
                    <div className="flex gap-1 items-end h-3 ml-1">
                        <div className="w-0.5 bg-royal-black animate-pulse h-2"></div>
                        <div className="w-0.5 bg-royal-black animate-pulse h-3 delay-75"></div>
                        <div className="w-0.5 bg-royal-black animate-pulse h-1 delay-150"></div>
                    </div>
                )}
            </button>
        </div>
    );
};

export default AudioPlayer;
