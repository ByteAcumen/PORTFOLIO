import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../contexts/useCursor';
import { useTheme } from '../contexts/useTheme';

const Cursor: React.FC = () => {
  const { cursorVariant, cursorText, isHovering } = useCursor();
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkIsMobile = () => {
      if (typeof window !== 'undefined') {
        const userAgent = navigator.userAgent;
        const mobile = Boolean(
          userAgent.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
          )
        );
        setIsMobile(mobile || window.innerWidth <= 768);
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Apply custom cursor styles to HTML
  useEffect(() => {
    if (!isMobile) {
      document.documentElement.classList.add('custom-cursor');
    } else {
      document.documentElement.classList.remove('custom-cursor');
    }
  }, [isMobile]);
  // Get color based on theme
  const getColor = () => {
    return isDark ? 'rgba(96, 165, 250, 0.8)' : 'rgba(59, 130, 246, 0.8)'; // blue-400 : blue-500
  };
  
  // Cursor variants for different interactions
  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: `1.5px solid ${getColor()}`,
      opacity: 0.8,
      transition: {
        type: 'spring',
        mass: 0.3,
        damping: 20,
        stiffness: 300,
      }
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: `${getColor().replace('0.8', '0.12')}`,
      border: `2px solid ${getColor()}`,
      opacity: 1,
      transition: {
        type: 'spring',
        mass: 0.5,
        damping: 25,
        stiffness: 400,
      }
    },    
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: `1.5px solid ${getColor()}`,
      opacity: 0.6,
      transition: {
        type: 'spring',
        mass: 0.6,
        damping: 22,
        stiffness: 300,
      }
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      height: 40,
      width: 40,
      backgroundColor: `${getColor().replace('0.8', '0.15')}`,
      border: `2px solid ${getColor()}`,
      transition: {
        type: 'spring',
        mass: 0.4,
        damping: 20,
        stiffness: 300,
      }
    },
    image: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: 'rgba(0, 0, 0, 0)',
      border: `2px solid ${getColor()}`,
      opacity: 0.7,
      transition: {
        type: 'spring',
        mass: 0.7,
        damping: 22,
        stiffness: 280,
      }
    }
  };

  // If it's a mobile device, don't render the cursor
  if (isMobile) return null;
  return (
    <>
      {/* Custom cursor effect - outer ring */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[100] rounded-full"
        variants={variants}
        animate={cursorVariant}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[100] rounded-full"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          scale: cursorVariant === 'default' ? 1 : 0.5,
          backgroundColor: getColor(),
        }}
        transition={{
          type: 'spring',
          mass: 0.2,
          damping: 10,
          stiffness: 400,
        }}
        style={{
          height: 6,
          width: 6,
        }}
      />

      {/* Tooltip that follows cursor if text is provided */}
      {cursorText && (
        <motion.div
          className="fixed left-0 top-0 pointer-events-none z-[100] text-xs font-medium bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 px-2 py-1 rounded-md backdrop-blur-sm"
          animate={{
            x: mousePosition.x + 12,
            y: mousePosition.y + 12,
            opacity: isHovering ? 1 : 0,
            scale: isHovering ? 1 : 0.8,
          }}
          transition={{
            type: 'spring',
            mass: 0.2,
            damping: 15,
            stiffness: 300,
          }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
};

export default Cursor;
