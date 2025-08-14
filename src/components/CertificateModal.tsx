import React, { useCallback, useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Award } from 'lucide-react';

interface CertificateModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  title?: string;
  company?: string;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ open, onClose, src, title = "Certificate", company }) => {
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle body scroll lock and prevent page jumping/glitch on close
  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    // Store current scroll position
    const scrollY = window.scrollY;

    // Disable smooth scrolling to prevent animated jump
    html.style.scrollBehavior = 'auto';

    // Prevent body scroll
    document.body.setAttribute('data-modal-open', 'true');
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    // Focus close button after modal opens
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 100);

    return () => {
      // Restore body scroll and position
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.removeAttribute('data-modal-open');

      // Restore scroll position instantly, then restore scroll behavior next frame
      window.scrollTo(0, scrollY);
      requestAnimationFrame(() => {
        if (prevScrollBehavior) {
          html.style.scrollBehavior = prevScrollBehavior;
        } else {
          html.style.removeProperty('scroll-behavior');
        }
      });

      clearTimeout(focusTimer);
    };
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
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Award size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h2>{title}</h2>
                      {company && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {company}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="resume-modal-actions">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpenInNewTab();
                    }}
                    className="resume-action-btn secondary"
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
                    <p>Loading certificate...</p>
                  </div>
                )}

                {/* Full-bleed iframe area for larger PDF view */}
                <div className="relative flex-1 rounded-xl overflow-hidden bg-white/90 dark:bg-white/10 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10">
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5" />
                  <iframe
                    src={src}
                    title="Certificate PDF"
                    className="resume-iframe"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default CertificateModal;
