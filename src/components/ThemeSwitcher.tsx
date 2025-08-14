import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTheme } from '../contexts/useTheme';
import { useCursor } from '../contexts/useCursor';

// --- Enhanced Animation Variants for smoother transitions ---

// Variants for the entire SVG container with enhanced rotation and scaling
const svgVariants: Variants = {
  light: { 
    rotate: 0, 
    scale: 1,
    filter: 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.6))'
  },
  dark: { 
    rotate: 180, 
    scale: 1.05,
    filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.4))'
  },
};

// Enhanced sun rays with staggered animation and glow effect
const sunRayVariants: Variants = {
  light: { 
    opacity: 1, 
    scale: 1,
    strokeWidth: 2.5,
    filter: 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.8))'
  },
  dark: { 
    opacity: 0, 
    scale: 0.8,
    strokeWidth: 2,
    filter: 'drop-shadow(0 0 0px rgba(251, 191, 36, 0))'
  },
};

// Enhanced moon masking with smoother transitions
const moonMaskVariants: Variants = {
  light: { 
    cx: 25, 
    cy: -2,
    r: 9,
    opacity: 0.3
  },
  dark: { 
    cx: 12, 
    cy: 4,
    r: 9,
    opacity: 1
  },
};

// Moon circle variants for additional effects
const moonVariants: Variants = {
  light: {
    fill: 'rgba(156, 163, 175, 0.3)',
    scale: 0.9,
  },
  dark: {
    fill: 'currentColor',
    scale: 1,
  },
};

// Enhanced spring transition with better physics
const springTransition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Smooth transition for continuous animations
const smoothTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1],
};

const ThemeSwitcher: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { setCursor, resetCursor } = useCursor();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 backdrop-blur-xl transition-all duration-300 hover:bg-white/20 dark:hover:bg-white/15 hover:border-white/30 dark:hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 shadow-lg shadow-black/5 dark:shadow-black/20 overflow-hidden group"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={() => setCursor('button')}
      onMouseLeave={resetCursor}
      whileHover={{ 
        scale: 1.05, 
        rotate: isDark ? -5 : 5,
        boxShadow: isDark 
          ? '0 8px 32px rgba(147, 197, 253, 0.3)' 
          : '0 8px 32px rgba(251, 191, 36, 0.3)'
      }}
      whileTap={{ scale: 0.95 }}
      transition={springTransition}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(147, 197, 253, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
        }}
        animate={{
          background: isDark 
            ? 'radial-gradient(circle, rgba(147, 197, 253, 0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)'
        }}
        transition={smoothTransition}
      />
      
      {/* Animated particles effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={isDark ? 'dark' : 'light'}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: isDark ? '#93c5fd' : '#fbbf24',
              left: `${20 + i * 10}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            variants={{
              light: { 
                opacity: isDark ? 0 : 0.6, 
                scale: isDark ? 0 : 1,
                y: 0,
              },
              dark: { 
                opacity: isDark ? 0.4 : 0, 
                scale: isDark ? 1 : 0,
                y: isDark ? -2 : 0,
              },
            }}
            transition={{ 
              ...springTransition, 
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2 + i * 0.2
            }}
          />
        ))}
      </motion.div>
      <motion.svg
        key={isDark ? 'dark' : 'light'}
        initial="light"
        animate={isDark ? 'dark' : 'light'}
        variants={svgVariants}
        transition={springTransition}
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 text-gray-700 dark:text-gray-300"
      >
        <defs>
          {/* Enhanced gradient definitions */}
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
          
          {/* Enhanced clip-path with smoother transitions */}
          <clipPath id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <motion.circle
              variants={moonMaskVariants}
              transition={springTransition}
              cx="12"
              cy="4"
              r="9"
              fill="black"
            />
          </clipPath>
          
          {/* Glow filter for enhanced visual effects */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Enhanced Moon with gradient and glow */}
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          fill="url(#moonGradient)"
          clipPath="url(#moon-mask)"
          variants={moonVariants}
          transition={springTransition}
          filter="url(#glow)"
        />

        {/* Enhanced Sun rays with staggered animations */}
        <motion.g 
          variants={sunRayVariants} 
          transition={springTransition}
          stroke="url(#sunGradient)"
          filter="url(#glow)"
        >
          {[
            { x1: 12, y1: 1, x2: 12, y2: 3, delay: 0 },
            { x1: 12, y1: 21, x2: 12, y2: 23, delay: 0.1 },
            { x1: 4.22, y1: 4.22, x2: 5.64, y2: 5.64, delay: 0.2 },
            { x1: 18.36, y1: 18.36, x2: 19.78, y2: 19.78, delay: 0.3 },
            { x1: 1, y1: 12, x2: 3, y2: 12, delay: 0.4 },
            { x1: 21, y1: 12, x2: 23, y2: 12, delay: 0.5 },
            { x1: 4.22, y1: 19.78, x2: 5.64, y2: 18.36, delay: 0.6 },
            { x1: 18.36, y1: 5.64, x2: 19.78, y2: 4.22, delay: 0.7 },
          ].map((ray, index) => (
            <motion.line
              key={index}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              variants={{
                light: { 
                  opacity: 1, 
                  pathLength: 1,
                  strokeWidth: 2.5,
                },
                dark: { 
                  opacity: 0, 
                  pathLength: 0,
                  strokeWidth: 2,
                },
              }}
              transition={{ 
                ...springTransition, 
                delay: ray.delay,
                pathLength: { duration: 0.8, ease: "easeInOut" }
              }}
            />
          ))}
        </motion.g>
        
        {/* Central sun circle for light mode */}
        <motion.circle
          cx="12"
          cy="12"
          r="4"
          fill="url(#sunGradient)"
          variants={{
            light: { opacity: 1, scale: 1 },
            dark: { opacity: 0, scale: 0.5 },
          }}
          transition={springTransition}
          filter="url(#glow)"
        />
      </motion.svg>
    </motion.button>
  );
};

export default ThemeSwitcher;