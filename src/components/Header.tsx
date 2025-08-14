import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Menu, X, Home, User, Briefcase, Code, FolderOpen, Mail, Sparkles } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';
import { useCursor } from '../contexts/useCursor';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const { setCursor, resetCursor } = useCursor();
  
  // Enhanced scroll tracking with smooth spring animations
  const { scrollY } = useScroll();
  const scrollYMotion = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const scrollYSpring = useSpring(scrollYMotion, { stiffness: 400, damping: 40 });
  
  // Smooth transforms for header effects (respect reduced motion)
  const headerOpacity = useTransform(scrollYSpring, [0, 100], [0.02, 0.08]);
  const headerBlur = useTransform(scrollYSpring, [0, 100], [12, 24]);
  // Always call hooks; select value based on preference to satisfy hooks rules
  const rawHeaderScale = useTransform(scrollYSpring, [0, 50], [1, 0.98]);
  const staticHeaderScale = useMotionValue(1);
  const headerScale = prefersReducedMotion ? staticHeaderScale : rawHeaderScale;

  // Memoized menu items
  const menuItems = useMemo(() => [
    { href: '#hero', label: 'Home', icon: Home },
    { href: '#about', label: 'About', icon: User },
    { href: '#experience', label: 'Experience', icon: Briefcase },
    { href: '#skills', label: 'Skills', icon: Code },
    { href: '#projects', label: 'Projects', icon: FolderOpen },
    { href: '#contact', label: 'Contact', icon: Mail },
  ], []);

  // Sync scroll motion value with actual scroll position
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      scrollYMotion.set(latest);
    });
    return unsubscribe;
  }, [scrollY, scrollYMotion]);



  // Optimized scroll handler with intersection observer for better performance
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
      const offset = window.innerHeight * 0.3;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            if (section !== activeSection) {
              setActiveSection(section);
            }
            break;
          }
        }
      }
    }, 50); // Reduced timeout for more responsive updates
  }, [activeSection]);

  // Enhanced scroll listener with better performance
  useEffect(() => {
    let rafId: number;
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call after a tick to ensure DOM is ready
    const initId = requestAnimationFrame(() => handleScroll());
    
    // Use passive listener for better performance
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rafId) cancelAnimationFrame(rafId);
      cancelAnimationFrame(initId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [handleScroll]);

  // Smooth scrolling
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      gsap.to(window, {
        duration: prefersReducedMotion ? 0 : 0.8,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power2.out"
      });
      setIsMobileMenuOpen(false);
    }
  }, [prefersReducedMotion]);

  // Keyboard and body scroll management
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll, preserving current scroll position
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.25, 0, 1] }}
      style={{ 
        backgroundColor: `rgba(255, 255, 255, ${headerOpacity})`,
        backdropFilter: `blur(${headerBlur}px) saturate(180%)`,
        scale: headerScale,
        transformOrigin: 'top center',
      }}
      className="app-header fixed top-0 left-0 right-0 z-50 bg-white/[0.02] dark:bg-black/[0.02] border-b border-white/[0.08] dark:border-white/[0.05] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/[0.08] dark:supports-[backdrop-filter]:bg-black/[0.08] shadow-lg shadow-black/[0.02] dark:shadow-black/[0.2] transition-shadow duration-300 after:absolute after:inset-0 after:pointer-events-none after:bg-[radial-gradient(60%_60%_at_20%_0%,rgba(59,130,246,0.10),transparent_60%)] after:content-['']"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Professional Logo & Name */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.25, 0, 1] }}
            className="flex items-center gap-4 cursor-pointer group"
            onClick={() => scrollToSection('#hero')}
            onMouseEnter={() => setCursor('button')}
            onMouseLeave={() => resetCursor()}
          >
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Glass morphism background for logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Logo container with enhanced glass effect */}
              <div className="relative p-3 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 group-hover:bg-white/20 dark:group-hover:bg-white/10 group-hover:border-white/30 dark:group-hover:border-white/20">
                <div className="relative">
                  {/* Sparkle effect */}
                  <motion.div
                    className="absolute -top-1 -right-1"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    <Sparkles className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                  </motion.div>
                  
                  <img 
                    src="/favicon.svg" 
                    alt="HK Logo" 
                    className="w-8 h-8 invert dark:invert-0 transition-transform duration-300 group-hover:rotate-12"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                HEMANTH KUMAR
              </h1>
              <motion.p 
                className="text-sm text-gray-600/80 dark:text-gray-400/80 font-medium hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Full-Stack Developer
                </span>
              </motion.p>
            </motion.div>
          </motion.div>

          {/* Professional Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <motion.nav 
              className="flex items-center p-2 bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.25, 0, 1] }}
            >
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.substring(1);
                
                return (
                  <motion.div
                    key={item.href}
                    className="relative"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  >
                    {/* Active indicator background */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavItem"
                        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-90"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    
                    <motion.button
                      onClick={() => scrollToSection(item.href)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onMouseEnter={() => setCursor('button')}
                      onMouseLeave={() => resetCursor()}
                      className={`relative flex items-center gap-2.5 px-4 py-2.5 mx-1 rounded-xl font-medium text-sm transition-all duration-300 group ${
                        isActive
                          ? 'text-white shadow-lg shadow-blue-500/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
                      }`}
                    >
                      {/* Icon with enhanced animations */}
                      <motion.div
                        whileHover={{ rotate: isActive ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon size={16} className={isActive ? 'drop-shadow-sm' : ''} />
                      </motion.div>
                      
                      <span className={`${isActive ? 'drop-shadow-sm' : ''} tracking-wide`}>
                        {item.label}
                      </span>
                      
                      {/* Hover glow effect */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>

          {/* Professional Tablet Navigation Icons */}
          <motion.div 
            className="hidden md:flex lg:hidden items-center gap-2 p-2 bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {menuItems.slice(0, 4).map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.href.substring(1);
              
              return (
                <motion.div key={item.href} className="relative">
                  {/* Active indicator for tablet */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabletItem"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-90"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  
                  <motion.button
                    onClick={() => scrollToSection(item.href)}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={() => resetCursor()}
                    className={`relative p-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'text-white shadow-lg shadow-blue-500/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
                    }`}
                    title={item.label}
                  >
                    <motion.div
                      whileHover={{ rotate: isActive ? 0 : 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={18} className={isActive ? 'drop-shadow-sm' : ''} />
                    </motion.div>
                    
                    {/* Hover glow effect */}
                    {!isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Professional Theme Switcher & Mobile Menu */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Enhanced Theme Switcher Container */}
            <motion.div 
              className="bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl p-1.5 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300 hover:bg-white/15 dark:hover:bg-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ThemeSwitcher />
            </motion.div>
            
            {/* Professional Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05, rotate: isMobileMenuOpen ? 90 : 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={() => setCursor('button')}
              onMouseLeave={() => resetCursor()}
              className="lg:hidden p-3 bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/20 hover:bg-white/20 dark:hover:bg-white/10"
              aria-label="Toggle mobile menu"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </motion.button>
          </motion.div>
        </div>

        {/* Professional Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="lg:hidden mt-6 overflow-hidden"
              initial={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.25, 0.1, 0.25, 1],
                height: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
                scale: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="bg-white/10 dark:bg-black/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-2xl p-3 shadow-xl shadow-black/10 dark:shadow-black/30 transition-all duration-300"
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.href.substring(1);
                    
                    return (
                      <motion.div
                        key={item.href}
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      >
                        {/* Active indicator for mobile */}
                        {isActive && (
                          <motion.div
                            layoutId="activeMobileItem"
                            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-90"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        
                        <motion.button
                          onClick={() => scrollToSection(item.href)}
                          whileHover={{ x: 6, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={() => setCursor('button')}
                          onMouseLeave={() => resetCursor()}
                          className={`relative flex items-center gap-4 w-full px-4 py-4 rounded-xl transition-all duration-300 font-medium text-sm group ${
                            isActive
                              ? 'text-white shadow-lg shadow-blue-500/20'
                              : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/20 dark:hover:bg-white/10'
                          }`}
                        >
                          {/* Enhanced icon container */}
                          <motion.div 
                            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isActive
                                ? 'bg-white/20 dark:bg-black/20 shadow-lg'
                                : 'bg-white/20 dark:bg-white/10 group-hover:bg-white/30 dark:group-hover:bg-white/15'
                            }`}
                            whileHover={{ rotate: isActive ? 0 : 10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {/* Icon glow effect */}
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isActive ? 'opacity-30' : ''}`} />
                            <Icon size={18} className={`relative z-10 ${isActive ? 'drop-shadow-sm' : ''}`} />
                          </motion.div>
                          
                          <span className={`flex-1 text-left tracking-wide ${isActive ? 'drop-shadow-sm font-semibold' : ''}`}>
                            {item.label}
                          </span>
                          
                          {/* Active indicator dot */}
                          {isActive && (
                            <motion.div 
                              className="w-2 h-2 bg-white rounded-full shadow-lg"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3, delay: 0.2 }}
                            />
                          )}
                          
                          {/* Hover glow effect */}
                          {!isActive && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default React.memo(Header);