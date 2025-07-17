import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/useTheme';
import { useCursor } from '../contexts/useCursor';

// Animation variants for the button
const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1, ease: 'easeIn' },
  },
};

const ThemeSwitcher: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { setCursorVariant } = useCursor();
  return (
    <motion.button
      variants={buttonVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-center w-10 h-10 rounded-full 
        ${isDark 
          ? 'bg-gray-800 border border-gray-700 shadow' 
          : 'bg-white border border-blue-200 shadow'
        }
        transition-all duration-300 focus:outline-none focus:ring-2
        focus:ring-blue-500 dark:focus:ring-blue-400
      `}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={() => setCursorVariant('button')}
      onMouseLeave={() => setCursorVariant('default')}
    >
      {/* Background glow effect */}
      <div 
        className={`
          absolute inset-0 rounded-full blur opacity-30
          ${isDark ? 'bg-amber-300/30' : 'bg-blue-500/20'}
          transition-opacity duration-300
        `}
      />

      {/* Animated icons with smooth transition */}
      <div className="relative z-10 w-5 h-5">
        {/* Sun icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isDark ? 1 : 0, 
            opacity: isDark ? 1 : 0,
            y: isDark ? 0 : -10
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-amber-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </svg>
        </motion.div>

        {/* Moon icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: isDark ? 0 : 1, 
            opacity: isDark ? 0 : 1,
            y: isDark ? 10 : 0
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center text-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            <path d="M19 3v4"></path>
            <path d="M21 5h-4"></path>
          </svg>
        </motion.div>
      </div>
    </motion.button>
  );
};

export default ThemeSwitcher;