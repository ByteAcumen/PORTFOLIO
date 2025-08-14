import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageOff, Loader2 } from 'lucide-react';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  loadingClassName?: string;
  errorClassName?: string;
  showLoadingSpinner?: boolean;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  loadingClassName = '',
  errorClassName = '',
  showLoadingSpinner = true,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);
    setIsLoading(true);
    
    if (!src) {
      setIsError(true);
      setIsLoading(false);
      return;
    }

    const img = new window.Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoaded(true);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setIsError(true);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const imageVariants = {
    initial: { 
      opacity: 0, 
      filter: 'blur(10px)', 
      scale: 1.1 
    },
    animate: { 
      opacity: 1, 
      filter: 'blur(0px)', 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    },
  };

  const placeholderVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className={`relative overflow-hidden w-full h-full bg-surface/50 ${containerClassName}`}>
      <AnimatePresence mode="wait">
        {isLoaded && !isError ? (
          <motion.img
            key="image"
            src={src}
            alt={alt}
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`w-full h-full object-cover ${className}`}
            loading="lazy"
          />
        ) : (
          <motion.div
            key="placeholder"
            variants={placeholderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`absolute inset-0 flex items-center justify-center ${
              isError ? errorClassName : loadingClassName
            }`}
          >
            {isError ? (
              <div className="flex flex-col items-center gap-3 text-text-muted">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15 
                  }}
                >
                  <ImageOff size={40} className="text-text-subtle" />
                </motion.div>
                <span className="text-sm font-medium">Image unavailable</span>
              </div>
            ) : isLoading ? (
              <div className="flex flex-col items-center gap-4">
                {/* Shimmer loading effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface/30 to-transparent 
                              animate-shimmer bg-[length:200%_100%]" />
                
                {showLoadingSpinner && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ 
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  >
                    <Loader2 size={32} className="text-accent" />
                  </motion.div>
                )}
                
                <div className="text-sm text-text-muted font-medium">Loading image...</div>
              </div>
            ) : (
              <div className="w-full h-full bg-surface animate-pulse rounded-lg" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ProgressiveImage.displayName = 'ProgressiveImage';

export default ProgressiveImage;