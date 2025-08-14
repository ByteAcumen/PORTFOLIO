import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinished }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onFinished, 500); // Allow fade out animation
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {/* Background Aurora Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
      
      <div className="text-center w-80 max-w-[90vw]">
        {/* Logo */}
        <motion.div 
          className="relative h-20 w-20 mx-auto mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-lg animate-pulse" />
          <div className="relative w-full h-full rounded-full bg-surface backdrop-blur-sm flex items-center justify-center text-3xl font-bold shadow-lg border border-border">
            <span className="bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-transparent">
              HK
            </span>
          </div>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-surface rounded-full overflow-hidden mb-4 border border-border">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
        
        {/* Status Text */}
        <div className="flex justify-between text-sm font-medium text-text-muted">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Loading portfolio
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;