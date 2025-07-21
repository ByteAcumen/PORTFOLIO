import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useTheme } from '../contexts/useTheme';
import { useCursor } from '../contexts/useCursor';
import { ExternalLink } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

// Navigation link type
interface NavLink {
  id: string;
  label: string;
  isExternal?: boolean;
  href?: string;
}

const navItems: NavLink[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contact' },
  { id: 'resume', label: 'Resume', isExternal: true },
];

interface HeaderProps {
  openResumeModal: () => void;
}

// Use the unified glass class for consistent glassmorphism
const glassBg = 'glass';

const Header: React.FC<HeaderProps> = React.memo(({ openResumeModal }) => {
  const { isDark } = useTheme();
  const { setCursorVariant } = useCursor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const tickingRef = useRef(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const sectionIds = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact'];

  // Cache section elements on mount and after lazy components load
  const recacheSections = useCallback(() => {
    sectionIds.forEach(id => {
      sectionRefs.current[id] = document.getElementById(id);
    });
  }, [sectionIds]);
  useEffect(() => {
    recacheSections();
    // Also recache after Suspense resolves (all main sections loaded)
    setTimeout(recacheSections, 1200); // 1.2s after mount for lazy load
  }, [recacheSections]);

  // Debounced scroll handler for sticky header and active section
  useEffect(() => {
    let lastCall = 0;
    const debounce = 60; // ms
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastCall < debounce) return;
      lastCall = now;
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          let foundSection = 'home';
          for (let i = 0; i < sectionIds.length; i++) {
            const el = sectionRefs.current[sectionIds[i]];
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom > 100) {
                foundSection = sectionIds[i];
                break;
              }
            }
          }
          setActiveSection(prev => (prev !== foundSection ? foundSection : prev));
          tickingRef.current = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  // Smooth scroll to section - Optimized
  const scrollToSection = useCallback((sectionId: string) => {
    const element = sectionRefs.current[sectionId] || document.getElementById(sectionId);
    if (element) {
      const offset = 72; // Slightly smaller for new header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  }, []);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close menu on ESC key (accessibility)
  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Memoize nav items for better performance
  const memoizedNavItems = useMemo(() => navItems, []);

  // Animation variants
  const headerVariants = {
    initial: { y: -64, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    scrolled: {
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)',
      background: isDark
        ? 'rgba(16, 24, 39, 0.75)'
        : 'rgba(255, 255, 255, 0.75)',
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${glassBg} ${scrolled ? 'shadow-2xl' : 'shadow-lg'} px-2 md:px-0`}
      style={{
        borderRadius: '0 0 1.5rem 1.5rem',
        borderBottom: isDark ? '1.5px solid #33415544' : '1.5px solid #e0e7ef44',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
      }}
      role="banner"
      aria-label="Main navigation"
    >
      {/* Animated gradient overlay for glass effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-b-3xl"
        style={{
          background:
            'linear-gradient(120deg,rgba(99,102,241,0.08) 0%,rgba(139,92,246,0.08) 100%)',
          zIndex: 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
      <div className="w-full max-w-screen-xl mx-auto px-2 md:px-6 flex items-center justify-between relative z-10 min-h-[64px] pt-safe-top">
        {/* Logo and Name */}
        <a
          href="#home"
          onClick={e => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="text-2xl font-bold relative group flex items-center gap-2 gpu-accelerated select-none"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
          aria-label="HEMANTH K - Home"
        >
          <div className="relative gpu-accelerated">
            <Logo size={32} isDark={isDark} showPulse={true} />
            <div className="absolute inset-0 bg-blue-500/30 dark:bg-blue-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-2px] gpu-accelerated text-[1.45rem] sm:text-2xl font-extrabold tracking-tight"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, type: 'spring' }}
          >
            HEMANTH KUMAR
          </motion.span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 relative" aria-label="Primary">
          {memoizedNavItems.map((item, idx) => (
            <div key={item.id} className="relative px-2">
              <a
                href={item.isExternal ? undefined : `#${item.id}`}
                onClick={e => {
                  if (item.id === 'resume') {
                    e.preventDefault();
                    openResumeModal();
                  } else if (!item.isExternal) {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }
                }}
                target={item.isExternal && item.id !== 'resume' ? '_blank' : undefined}
                rel={item.isExternal && item.id !== 'resume' ? 'noopener noreferrer' : undefined}
                className={`px-2 py-2 text-base font-medium flex items-center relative transition-all duration-300 focus:outline-none gpu-accelerated
                  ${activeSection === item.id
                    ? 'text-blue-700 dark:text-blue-400'
                    : 'text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}
                `}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                aria-label={item.isExternal ? `Open ${item.label}` : `Navigate to ${item.label} section`}
                tabIndex={0}
              >
                <span className="relative z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 flex items-center gpu-accelerated">
                  {item.label}
                  {item.isExternal && <ExternalLink className="ml-1" size={12} />}
                </span>
                {/* Animated underline only for active link */}
                {activeSection === item.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ zIndex: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </a>
            </div>
          ))}
        </nav>

        {/* Theme Switcher (always visible on mobile and desktop) */}
        <div className="flex items-center ml-2 md:ml-4">
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7, type: 'spring' }}
            className="theme-switcher"
          >
            <ThemeSwitcher />
          </motion.div>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-12 h-12 focus:outline-none bg-transparent ml-2 transition-all duration-300 hover:scale-110 rounded-full active:bg-blue-100 dark:active:bg-blue-900"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={toggleMenu}
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          <motion.span
            className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 mb-1 rounded transition-all duration-500 ease-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
            layout
          ></motion.span>
          <motion.span
            className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 mb-1 rounded transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}
            layout
          ></motion.span>
          <motion.span
            className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded transition-all duration-500 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            layout
          ></motion.span>
        </button>
      </div>

      {/* Mobile Menu - Dropdown below header */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 w-full z-50 shadow-2xl rounded-b-2xl overflow-y-auto max-h-[80vh]"
            aria-label="Mobile navigation"
            role="navigation"
            style={{
              borderBottomLeftRadius: '1.25rem',
              borderBottomRightRadius: '1.25rem',
            }}
          >
            {/* Glassy semi-opaque background for better contrast */}
            <div className="absolute inset-0 bg-white/60 dark:bg-gray-900/70 backdrop-blur-md rounded-b-2xl pointer-events-none" />
            <div className="relative z-10">
              {/* Close button inside menu, top right */}
              <button
                className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center bg-black/30 dark:bg-white/10 text-white dark:text-gray-200 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors z-70 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
                tabIndex={0}
              >
                <span className="text-2xl">✕</span>
              </button>
              <ul className="flex flex-col gap-2 py-4 px-2 sm:px-6 animate-fadein-up">
                {memoizedNavItems.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.isExternal ? undefined : `#${item.id}`}
                      onClick={e => {
                        if (item.id === 'resume') {
                          e.preventDefault();
                          openResumeModal();
                          setIsMenuOpen(false);
                        } else if (!item.isExternal) {
                          e.preventDefault();
                          scrollToSection(item.id);
                          setIsMenuOpen(false);
                        }
                      }}
                      target={item.isExternal && item.id !== 'resume' ? '_blank' : undefined}
                      rel={item.isExternal && item.id !== 'resume' ? 'noopener noreferrer' : undefined}
                      className={`block w-full px-4 py-4 text-lg sm:text-lg font-semibold transition-all duration-300 focus:outline-none rounded-xl text-center ${
                        activeSection === item.id
                          ? 'text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50/40 dark:hover:bg-blue-900/20'
                      }`}
                      style={{ minHeight: 56 }}
                      onMouseEnter={() => setCursorVariant('button')}
                      onMouseLeave={() => setCursorVariant('default')}
                      aria-label={item.isExternal ? `Open ${item.label}` : `Navigate to ${item.label} section`}
                      tabIndex={0}
                    >
                      {item.label}
                      {item.isExternal && <ExternalLink className="ml-2 inline" size={16} />}
                    </a>
                  </li>
                ))}
                <li className="mt-2 flex justify-center">
                  <ThemeSwitcher />
                </li>
              </ul>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
});

export default Header;