import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Faster, smoother loading
    const timer = setInterval(() => {
      setProgress(prev => {
        // Smoother, more linear progress
        const increment = prev < 80 ? 3 : 1.5;
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 300); // fade out faster
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, 18); // faster interval
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#f7faff] to-[#e8eaf6] dark:from-gray-900 dark:to-gray-800"
        >
          <motion.div
            className="text-center w-72 relative"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Logo or brandmark */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="relative h-14 w-14 mx-auto">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 blur-md"
                  animate={{ 
                    opacity: [0.7, 0.9, 0.7],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2
                  }}
                />
                <div className="absolute inset-0 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center text-xl font-bold shadow-lg">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">HK</span>
                </div>
              </div>
            </motion.div>
            {/* Loading title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight"
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Portfolio
              </span>
            </motion.h2>
            {/* Progress bar */}
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700/50 rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-sm"
                transition={{ ease: "easeOut" }}
              />
            </div>
            {/* Status text */}
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Loading assets
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {Math.round(progress)}%
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;