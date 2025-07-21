import React, { useCallback, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose, src }) => {
  const [pdfLoading, setPdfLoading] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent scroll when modal is open
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Keyboard accessibility: close on Escape, focus trap
  useEffect(() => {
    if (!open || !modalRef.current) return;
    const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];
    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (document.activeElement === lastEl && !e.shiftKey) {
          e.preventDefault();
          firstEl.focus();
        } else if (document.activeElement === firstEl && e.shiftKey) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEsc);
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          tabIndex={-1}
          aria-modal="true"
          role="dialog"
          aria-label="Resume Modal"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="glass rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] flex flex-col relative focus:outline-none"
            onClick={e => e.stopPropagation()}
            tabIndex={0}
          >
            <div className="flex items-center justify-between px-6 pt-6 pb-2">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate" id="modal-title">Resume</h2>
              <button
                ref={closeBtnRef}
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/30 dark:bg-white/10 flex items-center justify-center text-white dark:text-gray-200 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors z-20 text-2xl sm:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close Resume"
                tabIndex={0}
              >
                <motion.span whileHover={{ rotate: 90 }} transition={{ type: 'spring', stiffness: 400 }} className="text-2xl">✕</motion.span>
              </button>
            </div>
            <div className="w-full flex-1 flex items-center justify-center relative select-none px-2 pb-4">
              {src && (
                <>
                  {pdfLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  )}
                  <iframe
                    src={src}
                    title="Resume PDF"
                    className="w-full h-[60vh] sm:h-[80vh] rounded-b-2xl border-0 relative z-10 bg-white dark:bg-gray-900"
                    loading="lazy"
                    style={{ minHeight: 240, pointerEvents: 'auto', background: 'inherit' }}
                    tabIndex={0}
                    onLoad={() => setPdfLoading(false)}
                    onLoadStart={() => setPdfLoading(true)}
                  />
                  {/* Overlay to block right-click/context menu only over iframe */}
                  <div
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 11, pointerEvents: 'none' }}
                    onContextMenu={e => e.preventDefault()}
                    tabIndex={-1}
                  />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal; 