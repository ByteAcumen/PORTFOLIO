/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Enhanced semantic color system
        background: 'hsl(var(--color-background) / <alpha-value>)',
        surface: 'hsl(var(--color-surface) / <alpha-value>)',
        'surface-elevated': 'hsl(var(--color-surface-elevated) / <alpha-value>)',
        text: {
          DEFAULT: 'hsl(var(--color-text) / <alpha-value>)',
          muted: 'hsl(var(--color-text-muted) / <alpha-value>)',
          subtle: 'hsl(var(--color-text-subtle) / <alpha-value>)',
        },
        heading: 'hsl(var(--color-heading) / <alpha-value>)',
        border: {
          DEFAULT: 'hsl(var(--color-border) / <alpha-value>)',
          glass: 'rgba(255,255,255,0.2)',
          'glass-dark': 'rgba(51,65,85,0.4)',
        },
        accent: {
          DEFAULT: 'hsl(var(--color-accent) / <alpha-value>)',
          hover: 'hsl(var(--color-accent-hover) / <alpha-value>)',
          dark: 'hsl(var(--color-accent-dark) / <alpha-value>)',
          // Theme variations
          blue: '#3b82f6',
          purple: '#8b5cf6',
          teal: '#14b8a6',
          rose: '#f43f5e',
        },
        glass: {
          light: 'rgba(255,255,255,0.15)',
          'light-hover': 'rgba(255,255,255,0.25)',
          dark: 'rgba(30,41,59,0.35)',
          'dark-hover': 'rgba(30,41,59,0.45)',
        },
        // Status colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backdropBlur: {
        xs: '2px',
        '4xl': '72px',
      },
      animation: {
        // Enhanced animations
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out infinite 2s',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'spin-reverse': 'spin-reverse 6s linear infinite',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.22,1,0.36,1)',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.22,1,0.36,1)',
        'fade-in-down': 'fadeInDown 1s cubic-bezier(0.22,1,0.36,1)',
        'fade-in-left': 'fadeInLeft 0.8s cubic-bezier(0.22,1,0.36,1)',
        'fade-in-right': 'fadeInRight 0.8s cubic-bezier(0.22,1,0.36,1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.22,1,0.36,1)',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.22,1,0.36,1)',
        'gradient-x': 'gradientX 3s ease infinite',
        'gradient-y': 'gradientY 3s ease infinite',
        'gradient-xy': 'gradientXY 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'rotate-y': 'rotateY 2s linear infinite',
        'flip': 'flip 0.6s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        gradientY: {
          '0%, 100%': { 'background-position': '50% 0%' },
          '50%': { 'background-position': '50% 100%' },
        },
        gradientXY: {
          '0%, 100%': { 'background-position': '0% 0%' },
          '25%': { 'background-position': '100% 0%' },
          '50%': { 'background-position': '100% 100%' },
          '75%': { 'background-position': '0% 100%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)', 'animation-timing-function': 'cubic-bezier(0.8,0,1,1)' },
          '50%': { transform: 'translateY(-5%)', 'animation-timing-function': 'cubic-bezier(0,0,0.2,1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(59, 130, 246, 0.5)' },
          '100%': { 'box-shadow': '0 0 20px rgba(59, 130, 246, 0.8)' },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        flip: {
          '0%': { transform: 'rotateY(0)' },
          '50%': { transform: 'rotateY(-90deg)' },
          '100%': { transform: 'rotateY(0)' },
        },
      },
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'opacity': 'opacity',
        'transform': 'transform',
        'shadow': 'box-shadow',
        'backdrop': 'backdrop-filter',
        'all-smooth': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
      },
      transitionDuration: {
        '50': '50ms',
        '75': '75ms',
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
        'slower': '750ms',
        'xslow': '1000ms',
        'xxslow': '1500ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'elegant': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'sharp': 'cubic-bezier(0.4, 0, 1, 1)',
        'gentle': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgb(0 0 0 / 0.04)',
        'card-hover': '0 8px 25px 0 rgb(0 0 0 / 0.15)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-strong': '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
        'glow': '0 0 16px 2px currentColor',
        'glow-sm': '0 0 8px 1px currentColor',
        'glow-lg': '0 0 32px 4px currentColor',
        'accent': '0 0 20px hsl(var(--color-accent) / 0.3)',
        'accent-strong': '0 0 40px hsl(var(--color-accent) / 0.5)',
        'inner-glass': 'inset 0 1px 0 hsla(255, 255%, 255%, 0.1)',
        'soft': '0 2px 15px 0 rgb(0 0 0 / 0.08)',
        'medium': '0 4px 20px 0 rgb(0 0 0 / 0.12)',
        'strong': '0 8px 30px 0 rgb(0 0 0 / 0.16)',
        'elevation-1': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px 0 rgb(0 0 0 / 0.06)',
        'elevation-2': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
        'elevation-3': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
        'elevation-4': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-aurora': 'linear-gradient(135deg, hsl(var(--color-accent) / 0.1), transparent)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
      },
      willChange: {
        'transform': 'transform',
        'opacity': 'opacity',
        'scroll': 'scroll-position',
        'contents': 'contents',
        'auto': 'auto',
      },
      cursor: {
        'grab': 'grab',
        'grabbing': 'grabbing',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
      supports: {
        'backdrop-blur': 'backdrop-filter: blur(0)',
        'grid': 'display: grid',
      },
    },
  },
  plugins: [
    function ({ addBase, addComponents, addUtilities, theme }) {
      // Enhanced base styles with all color variations
      addBase({
        ':root': {
          '--color-background': '240 5% 98%',
          '--color-surface': '240 10% 96%',
          '--color-surface-elevated': '240 20% 94%',
          '--color-text': '240 10% 11%',
          '--color-text-muted': '240 6% 50%',
          '--color-text-subtle': '240 4% 70%',
          '--color-heading': '240 13% 9%',
          '--color-border': '240 6% 90%',
          '--color-accent': '221 83% 53%',
          '--color-accent-hover': '222 77% 45%',
          '--color-accent-dark': '226 71% 39%',
        },
        '.dark': {
          '--color-background': '240 10% 11%',
          '--color-surface': '240 10% 15%',
          '--color-surface-elevated': '240 10% 18%',
          '--color-text': '215 28% 95%',
          '--color-text-muted': '215 20% 65%',
          '--color-text-subtle': '215 16% 45%',
          '--color-heading': '215 14% 95%',
          '--color-border': '215 28% 25%',
          '--color-accent': '221 83% 53%',
          '--color-accent-hover': '222 77% 45%',
          '--color-accent-dark': '226 71% 39%',
        },
        // Theme color variations
        ':root[data-accent="purple"]': {
          '--color-accent': '259 92% 67%',
          '--color-accent-hover': '262 82% 58%',
          '--color-accent-dark': '265 75% 48%',
        },
        ':root[data-accent="teal"]': {
          '--color-accent': '173 80% 41%',
          '--color-accent-hover': '174 85% 34%',
          '--color-accent-dark': '175 90% 28%',
        },
        ':root[data-accent="rose"]': {
          '--color-accent': '350 89% 61%',
          '--color-accent-hover': '347 88% 50%',
          '--color-accent-dark': '345 85% 42%',
        },
      });

      // Enhanced component utilities
      addComponents({
        '.glass': {
          '@apply backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-xl': {},
          'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        },
        '.glass-strong': {
          '@apply backdrop-blur-2xl bg-white/20 dark:bg-black/30 border border-white/30 dark:border-white/20 rounded-xl': {},
          'box-shadow': '0 25px 50px -12px rgba(31, 38, 135, 0.25)',
        },
        '.btn-glass': {
          '@apply glass px-6 py-3 font-semibold transition-all-smooth duration-normal hover:scale-105': {},
          '&:hover': {
            '@apply bg-white/20 dark:bg-black/30': {},
          },
        },
        '.card-interactive': {
          '@apply transition-all-smooth duration-normal cursor-pointer': {},
          '&:hover': {
            '@apply -translate-y-2 shadow-elevation-3': {},
          },
        },
        '.text-gradient': {
          '@apply bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent-hover to-accent-dark': {},
        },
        '.bg-aurora': {
          '@apply bg-gradient-aurora absolute inset-0 rounded-full blur-3xl opacity-30': {},
        },
      });

      // Enhanced utility classes
      addUtilities({
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
        '.gpu-accelerated': {
          transform: 'translateZ(0)',
          'backface-visibility': 'hidden',
          perspective: '1000px',
        },
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
        '.scroll-auto': {
          'scroll-behavior': 'auto',
        },
        // Responsive text utilities that match your index.css
        '.text-responsive-xs': { fontSize: 'clamp(0.75rem, 2vw, 0.875rem)' },
        '.text-responsive-sm': { fontSize: 'clamp(0.875rem, 2.5vw, 1rem)' },
        '.text-responsive-base': { fontSize: 'clamp(1rem, 3vw, 1.125rem)' },
        '.text-responsive-lg': { fontSize: 'clamp(1.125rem, 3.5vw, 1.25rem)' },
        '.text-responsive-xl': { fontSize: 'clamp(1.25rem, 4vw, 1.5rem)' },
        '.text-responsive-2xl': { fontSize: 'clamp(1.5rem, 5vw, 2rem)' },
        '.text-responsive-3xl': { fontSize: 'clamp(1.875rem, 6vw, 2.5rem)' },
        '.text-responsive-4xl': { fontSize: 'clamp(2.25rem, 7vw, 3rem)' },
        // Line clamp utilities
        '.line-clamp-1': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '1',
        },
        '.line-clamp-2': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '2',
        },
        '.line-clamp-3': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '3',
        },
        '.line-clamp-4': {
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-box-orient': 'vertical',
          '-webkit-line-clamp': '4',
        },
      });
    },
  ],
};