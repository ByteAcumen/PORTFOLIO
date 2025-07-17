import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCursor } from '../contexts/useCursor';
import { useTheme } from '../contexts/useTheme';

const Cursor: React.FC = () => {
  const { cursorVariant } = useCursor();
  const { isDark } = useTheme();
  const isMobile = useRef(false);

  // Motion values for cursor position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Outer ring trails the mouse
  const springOuterX = useSpring(x, { stiffness: 80, damping: 16, mass: 0.7 });
  const springOuterY = useSpring(y, { stiffness: 80, damping: 16, mass: 0.7 });

  // Cursor size and style by variant
  const variantStyles = {
    default: {
      outer: { size: 36, border: isDark ? '2px solid #60a5fa' : '2px solid #3b82f6', glow: isDark ? '#60a5fa' : '#3b82f6' },
      inner: { size: 8, color: isDark ? '#60a5fa' : '#3b82f6', glow: isDark ? '#60a5fa' : '#3b82f6' }
    },
    button: {
      outer: { size: 48, border: isDark ? '2.5px solid #818cf8' : '2.5px solid #6366f1', glow: isDark ? '#818cf8' : '#6366f1' },
      inner: { size: 10, color: isDark ? '#818cf8' : '#6366f1', glow: isDark ? '#818cf8' : '#6366f1' }
    },
    text: {
      outer: { size: 60, border: isDark ? '2px solid #a5b4fc' : '2px solid #6366f1', glow: isDark ? '#a5b4fc' : '#6366f1' },
      inner: { size: 8, color: isDark ? '#a5b4fc' : '#6366f1', glow: isDark ? '#a5b4fc' : '#6366f1' }
    },
    link: {
      outer: { size: 40, border: isDark ? '2px solid #38bdf8' : '2px solid #0ea5e9', glow: isDark ? '#38bdf8' : '#0ea5e9' },
      inner: { size: 8, color: isDark ? '#38bdf8' : '#0ea5e9', glow: isDark ? '#38bdf8' : '#0ea5e9' }
    },
    image: {
      outer: { size: 70, border: isDark ? '2px solid #f472b6' : '2px solid #db2777', glow: isDark ? '#f472b6' : '#db2777' },
      inner: { size: 10, color: isDark ? '#f472b6' : '#db2777', glow: isDark ? '#f472b6' : '#db2777' }
    }
  };
  const style = variantStyles[cursorVariant] || variantStyles.default;

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
        isMobile.current = mobile || window.innerWidth <= 768;
      }
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkIsMobile);
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isMobile.current) {
      document.documentElement.classList.add('custom-cursor');
    } else {
      document.documentElement.classList.remove('custom-cursor');
    }
  }, []);

  if (isMobile.current) return null;
  return (
    <>
      {/* Outer ring with glow */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[100] rounded-full"
        style={{
          x: useTransform(springOuterX, v => v - style.outer.size / 2),
          y: useTransform(springOuterY, v => v - style.outer.size / 2),
          width: style.outer.size,
          height: style.outer.size,
          border: style.outer.border,
          boxShadow: `0 0 24px 4px ${style.outer.glow}33, 0 0 0 1px ${style.outer.glow}22`,
          background: 'rgba(0,0,0,0)',
          mixBlendMode: 'exclusion',
          filter: 'blur(0.5px)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      />
      {/* Inner dot, instant follow */}
      <motion.div
        className="fixed left-0 top-0 pointer-events-none z-[100] rounded-full"
        style={{
          x: useTransform(x, v => v - style.inner.size / 2),
          y: useTransform(y, v => v - style.inner.size / 2),
          width: style.inner.size,
          height: style.inner.size,
          background: style.inner.color,
          boxShadow: `0 0 12px 2px ${style.inner.glow}77`,
          mixBlendMode: 'exclusion',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
      />
    </>
  );
};

export default Cursor;
