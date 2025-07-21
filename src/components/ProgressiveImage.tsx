import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderColor?: string;
}

// Use the unified glass class for consistent glassmorphism
const glassBg = 'glass';

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  placeholderColor = '#e2e8f0' 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setIsError(true);
    };
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <motion.div
      className={`relative overflow-hidden w-full h-full glass ${className.includes('rounded-full') ? 'ring-2 ring-blue-400/60 dark:ring-indigo-400/60' : 'rounded-xl'} transition-all duration-500`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Placeholder */}
      {!isLoaded && !isError && (
        <motion.div 
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor, filter: 'blur(8px)' }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 1.04, opacity: 0.9 }}
          transition={{ duration: 0.7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
      )}
      {/* Image */}
      {!isError && (
        <motion.img
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'} transition-all duration-700`}
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95, filter: isLoaded ? 'blur(0px)' : 'blur(8px)' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsError(true)}
        />
      )}
      {/* Error fallback */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/80 rounded-xl">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Failed to load image
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default ProgressiveImage;
