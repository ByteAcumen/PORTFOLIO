import React, { useEffect, useState } from 'react';
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
  { id: 'resume', label: 'Resume', isExternal: true }, // Remove href
];

interface HeaderProps {
  openResumeModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openResumeModal }) => {
  const { isDark } = useTheme();
  const { setCursorVariant } = useCursor();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll for sticky header and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Track active section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'portfolio', 'contact'];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      }) || 'home';

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-white/90 dark:bg-gray-900/70
        border-b border-blue-100 dark:border-blue-500/10
        shadow-[0_2px_16px_0_rgba(30,64,175,0.04)]
        backdrop-blur-xl
        py-3 md:py-4
      `}
      style={{
        transition: 'background-color 0.3s, border 0.3s, box-shadow 0.3s',
      }}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
          onClick={e => {
              e.preventDefault();
              scrollToSection('home');
            }}
          className="text-2xl font-bold relative group flex items-center gap-2"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
            aria-label="Hemanth Kumar - Home"
          >
            <div className="relative">
              <Logo size={32} isDark={isDark} showPulse={true} />
              <div className="absolute inset-0 bg-blue-500/30 dark:bg-blue-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
                             <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:translate-y-[-2px]">
                HEMANTH<span className="text-blue-600 dark:text-blue-400">K</span>
              </span>
          </a>

          {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2 relative">
          {navItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.07, duration: 0.4, ease: 'easeOut' }}
              className="relative px-2"
            >
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
                                 className={`px-2 py-2 text-base font-medium flex items-center relative transition-all duration-300 focus:outline-none
                   ${activeSection === item.id
                     ? 'text-blue-700 dark:text-blue-400'
                     : 'text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'}
                 `}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                aria-label={item.isExternal ? `Open ${item.label}` : `Navigate to ${item.label} section`}
              >
                                 <span className="relative z-10 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 flex items-center">
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
            </motion.div>
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
           className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none bg-transparent ml-2 transition-all duration-300 hover:scale-110"
          aria-label="Open menu"
          onClick={toggleMenu}
          onMouseEnter={() => setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant('default')}
        >
                     <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 mb-1 transition-all duration-500 ease-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
           <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 mb-1 transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-0 scale-0' : ''}`}></span>
           <span className={`block w-6 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-500 ease-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
                         className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 border-b border-blue-500/10 z-40 backdrop-blur-xl"
          >
            <ul className="flex flex-col gap-2 py-4 px-6">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.07, duration: 0.3, ease: 'easeOut' }}
                >
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
                                         className={`block w-full px-4 py-3 text-lg font-medium transition-all duration-300 focus:outline-none ${
                       activeSection === item.id
                         ? 'text-blue-700 dark:text-blue-300'
                         : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                     }`}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                    aria-label={item.isExternal ? `Open ${item.label}` : `Navigate to ${item.label} section`}
                  >
                    {item.label}
                    {item.isExternal && <ExternalLink className="ml-2 inline" size={16} />}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 flex justify-center">
              <ThemeSwitcher />
              </li>
            </ul>
          </motion.nav>
                )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;