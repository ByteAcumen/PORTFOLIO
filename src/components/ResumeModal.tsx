import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose, src }) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 dark:bg-white/10 flex items-center justify-center text-white dark:text-gray-200 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors z-10"
            aria-label="Close Resume"
          >
            ✕
          </button>
          <div className="w-full h-[80vh] bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative select-none">
            {src && (
              <iframe
                src={src}
                title="Resume PDF"
                className="w-full h-full border-0 rounded-b-2xl"
                loading="lazy"
              />
            )}
            {/* Overlay to block right-click/context menu */}
            <div
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
              onContextMenu={e => e.preventDefault()}
              tabIndex={-1}
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ResumeModal; 