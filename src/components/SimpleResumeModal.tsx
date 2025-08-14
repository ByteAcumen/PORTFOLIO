import React, { useCallback, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose, src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle body scroll lock and prevent page jumping
  useEffect(() => {
    if (open) {
      // Store current scroll position
      const scrollY = window.scrollY;

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      // Focus close button after modal opens
      setTimeout(() => closeButtonRef.current?.focus(), 100);

      return () => {
        // Restore body scroll and position
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';

        // Restore scroll position
        window.scrollTo(0, scrollY);
      };
    }
  }, [open]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, onClose]);



  const handleOpenInNewTab = useCallback(() => {
    window.open(src, '_blank', 'noopener,noreferrer');
  }, [src]);

  if (!open) return null;

  const modalContent = (
    <AnimatePresence>
      {open && (
        <div
          className="resume-modal-overlay"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
        >
          <motion.div
            className="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <div className="resume-modal-container">
            <motion.div
              ref={modalRef}
              className="resume-modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {/* Header */}
              <div className="resume-modal-header">
                <div className="resume-modal-title">
                  <h2>Resume - Hemanth Kumar</h2>
                </div>
                <div className="resume-modal-actions">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenInNewTab();
                    }}
                    className="resume-action-btn primary"
                    title="Open in new tab"
                  >
                    <ExternalLink size={18} />
                    <span>Open</span>
                  </button>
                  <button
                    type="button"
                    ref={closeButtonRef}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClose();
                    }}
                    className="resume-close-btn"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="resume-modal-body">
                {isLoading && (
                  <div className="resume-loading">
                    <div className="loading-spinner">
                      <div className="spinner"></div>
                    </div>
                    <p>Loading resume...</p>
                  </div>
                )}
                
                <iframe
                  src={src}
                  title="Resume PDF"
                  className="resume-iframe"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default ResumeModal;