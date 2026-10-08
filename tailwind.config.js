/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#12050A',
        surface: {
          DEFAULT: '#200E15',
          lowest: '#1A0910',
          low: '#29161D',
          container: '#2D1A21',
          high: '#39242C',
          highest: '#442F36',
          bright: '#49333B',
        },
        velvet: {
          DEFAULT: '#4A1525',
          light: '#652035',
          dark: '#350E1A',
          glass: 'rgba(74, 21, 37, 0.55)',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F5E4BC',
          shimmer: '#E5C158',
          dark: '#AA820A',
          border: 'rgba(212, 175, 55, 0.4)',
        },
        emerald: {
          DEFAULT: '#234E3D',
          light: '#A3D1BA',
          dark: '#002F20',
        },
        champagne: {
          DEFAULT: '#F7E7CE',
          muted: '#D7C1C4',
          blush: '#D8A47F',
        },
      },
      fontFamily: {
        serif: ['"Bodoni Moda"', 'serif'],
        sans: ['Raleway', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        extrawide: '0.35em',
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'gold-subtle': '0 0 10px rgba(212, 175, 55, 0.15)',
        'velvet-depth': '0 12px 40px -10px rgba(18, 5, 10, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
