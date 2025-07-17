import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
  showPulse?: boolean;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = React.memo(({ 
  size = 40, 
  className = '', 
  animated = true, 
  showPulse = false, 
  isDark = false 
}) => {
  // Generate unique IDs for the gradients to avoid conflicts when using multiple logos
  const uniqueId = React.useMemo(() => Math.random().toString(36).substring(2, 9), []);
  const logoGradientId = `logoGradient-${uniqueId}`;
  const strokeGradientId = `strokeGradient-${uniqueId}`;
  const pulseGradientId = `pulseGradient-${uniqueId}`;

  // Animation variants for the logo paths
  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.2 }
      }
    }
  };
  
  // Animation for the pulse effect
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 0.9, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      {/* Pulse effect */}
      {showPulse && (
        <motion.div
          className="absolute inset-0"
          variants={pulseVariants}
          animate="pulse"
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{ 
              background: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)`,
            }}
          />
        </motion.div>
      )}
      
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated hexagonal background */}
        <motion.path
          d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
          fill={`url(#${logoGradientId})`}
          stroke={`url(#${strokeGradientId})`}
          strokeWidth="2"
          variants={pathVariants}
        />
        
        {/* H letter */}
        <motion.path
          d="M30 30 V70 M30 50 H50 M50 30 V70"
          fill="none"
          stroke={isDark ? "#FFFFFF" : "#FFFFFF"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        
        {/* K letter */}
        <motion.path
          d="M60 30 V70 M60 50 L80 30 M60 50 L80 70"
          fill="none"
          stroke={isDark ? "#FFFFFF" : "#FFFFFF"}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        
        {/* Define gradients */}
        <defs>
          <linearGradient id={logoGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <motion.stop 
              offset="100%" 
              stopColor="#4F46E5" 
              animate={{
                stopColor: ['#4F46E5', '#8B5CF6', '#4F46E5'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </linearGradient>
          <linearGradient id={strokeGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <motion.stop 
              offset="0%" 
              stopColor="#60A5FA" 
              animate={{
                stopColor: ['#60A5FA', '#93C5FD', '#60A5FA'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
          <radialGradient id={pulseGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
});

export default Logo;
