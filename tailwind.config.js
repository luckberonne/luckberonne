/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        // Grises optimizados
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Colores de superficie para modo oscuro
        surface: {
          light: '#ffffff',
          'light-alt': '#f9fafb',
          dark: 'rgba(31, 41, 55, 0.5)',
          'dark-alt': 'rgba(31, 41, 55, 0.3)',
          'dark-card': 'rgba(31, 41, 55, 0.8)',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #3b82f6, #a855f7)',
        'gradient-animated': 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
        'gradient-overlay': 'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(129, 140, 248, 0.1) 50%, rgba(168, 85, 247, 0.1) 100%)',
      }
    },
  },
  plugins: [],
}