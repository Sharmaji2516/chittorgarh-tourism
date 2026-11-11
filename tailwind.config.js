/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['Playfair Display', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // Mewar Heritage Palette (Design System)
                'mewar': {
                    'ivory': '#F8F5EF',        // Primary background: Warm Ivory / Off White
                    'sandstone': '#EFE7D9',    // Secondary background: Light Sandstone / Beige
                    'charcoal': '#25231F',     // Primary text: Deep Charcoal
                    'charcoal-soft': '#423D37',
                    'gold': '#C49A32',         // Accent: Royal Gold
                    'gold-light': '#DFBA5A',
                    'gold-dark': '#9A7723',
                    'terracotta': '#A65F3D',   // Secondary accent: Terracotta / Heritage Brown
                    'terracotta-dark': '#874628',
                    'forest': '#526B50',       // Natural accent: Muted Forest Green
                    'cream': '#FFFDF9',
                    'border': '#E4DAC6',
                    'border-subtle': '#EDE5D6',
                },
                'royal-gold': '#C49A32',
                'royal-black': '#25231F',
                'royal-white': '#FFFDF9',
                'heritage': {
                    'gold': '#C49A32',
                    'gold-light': '#DFBA5A',
                    'charcoal': '#25231F',
                    'charcoal-light': '#38342E',
                    'stone': '#EFE7D9',
                    'sand': '#E4DAC6',
                    'parchment': '#F8F5EF',
                },
                surface: {
                    50: '#F8F5EF',
                    100: '#EFE7D9',
                    200: '#E4DAC6',
                    300: '#D5C7AE',
                    400: '#B09F83',
                    500: '#8A775C',
                    600: '#5F513C',
                    700: '#423829',
                    800: '#2F271D',
                    900: '#25231F',
                    950: '#171613',
                }
            },
            boxShadow: {
                'heritage': '0 10px 30px -5px rgba(37, 35, 31, 0.08), 0 4px 10px -2px rgba(37, 35, 31, 0.04)',
                'heritage-hover': '0 20px 40px -10px rgba(166, 95, 61, 0.15), 0 8px 16px -4px rgba(37, 35, 31, 0.06)',
                'gold-glow': '0 0 25px rgba(196, 154, 50, 0.25)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'shimmer': 'shimmer 3s linear infinite',
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
            }
        },
    },
    plugins: [],
}
