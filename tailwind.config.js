/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal (monocromo + acento)
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
          950: '#0b2c33',
        },
        // Neutros con sesgo grafito
        neutral: {
          50: '#f7f9fb',
          100: '#eef1f5',
          200: '#d5dbe3',
          300: '#b7c0cc',
          400: '#8b96a6',
          500: '#6b7585',
          600: '#4c5664',
          700: '#343c47',
          800: '#232a33',
          900: '#0f141a',
          950: '#070a0f',
        },
        // Colores de superficie para modo oscuro
        surface: {
          light: '#f8fafc',
          'light-alt': '#eef2f6',
          dark: 'rgba(12, 16, 22, 0.72)',
          'dark-alt': 'rgba(12, 16, 22, 0.45)',
          'dark-card': 'rgba(17, 24, 32, 0.9)',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(110deg, #a5f3fc 0%, #22d3ee 45%, #0e7490 100%)',
        'gradient-animated': 'linear-gradient(-45deg, #0f141a, #1b2330, #0b2c33, #0f141a)',
        'gradient-overlay': 'linear-gradient(45deg, rgba(6, 182, 212, 0.08) 0%, rgba(15, 20, 26, 0.1) 50%, rgba(6, 182, 212, 0.06) 100%)',
      }
    },
  },
  plugins: [],
}