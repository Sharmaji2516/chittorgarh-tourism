/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'serif'], // Keep existing serif for heritage feel
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            colors: {
                'royal-gold': '#d4af37',
                'royal-black': '#1a1a1a',
                'royal-white': '#f5f5f5',
                'heritage': {
                    'gold': '#D4AF37',
                    'gold-light': '#F1D98F',
                    'charcoal': '#121212',
                    'charcoal-light': '#1E1E1E',
                    'stone': '#E5E4E2',
                    'sand': '#F4A460',
                    'parchment': '#FCF5E5',
                },
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                    950: '#2e1065',
                },
                surface: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 3s linear infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px rgba(212, 175, 55, 0.2), 0 0 10px rgba(212, 175, 55, 0.1)' },
                    '100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.4)' },
                }
            }
        },
    },
    plugins: [],
}
