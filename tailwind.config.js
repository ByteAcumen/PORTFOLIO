/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#2563eb', // Professional blue
          hover: '#1d4ed8',
          dark: '#1e40af',
          },
        background: {
          light: '#f8fafc',
          dark: '#18181b',
        },
        text: {
          light: '#18181b',
          dark: '#f1f5f9',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-in-out',
        'slide-left': 'slideLeft 0.3s ease-in-out',
        'slide-right': 'slideRight 0.3s ease-in-out',
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'all': 'all',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [
    // Added plugin for custom CSS variables
    function ({ addBase }) {
      addBase({
        ':root': {
          '--background-color': '#ffffff',
          '--text-color': '#1f2937',
          '--heading-color': '#111827',
          '--link-color': '#3b82f6',
          '--link-hover-color': '#2563eb',
          '--code-bg-color': '#f1f5f9',
          '--code-text-color': '#1e40af',
          '--pre-bg-color': '#1f2937',
          '--pre-text-color': '#e5e7eb',
        },
        '.dark': {
          '--background-color': '#1f2937',
          '--text-color': '#e5e7eb',
          '--heading-color': '#f3f4f6',
          '--link-color': '#60a5fa',
          '--link-hover-color': '#3b82f6',
          '--code-bg-color': '#374151',
          '--code-text-color': '#93c5fd',
          '--pre-bg-color': '#111827',
          '--pre-text-color': '#d1d5db',
        },
      });
    },
  ],
};