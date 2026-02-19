/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'royal-black': '#0a0a0a',
                'royal-gold': '#d4af37',
                'royal-gold-light': '#f3e5ab',
                'royal-white': '#f5f5f5',
                'charcoal': '#1a1a1a',
                'saffron': '#FF9933', // Kept for reference/accent if needed
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'Georgia', 'serif'],
                sans: ['"Inter"', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'royal-pattern': "url('https://www.transparenttextures.com/patterns/black-scales.png')", // Subtle pattern placeholder
            }
        },
    },
    plugins: [],
}
