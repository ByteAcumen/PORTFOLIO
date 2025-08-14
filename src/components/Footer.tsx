import React, { useRef } from 'react';
import { Github, Linkedin, Mail, ArrowUp, Code, ChevronRight, Heart, Sparkles, MapPin } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

// --- Core Hooks & Animation Libraries ---
import { useCursor } from '../contexts/useCursor';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Footer: React.FC = React.memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef<HTMLElement>(null);

  // --- GSAP Animations ---
  useGSAP(() => {
    const revealElements = containerRef.current?.querySelectorAll('.gsap-footer-reveal');
    if (revealElements && revealElements.length > 0) {
      gsap.from(revealElements, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%', // Start when 90% of the footer is visible
        },
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
      });
    }
  }, { scope: containerRef });

  const handleScrollTo = (target: string) => {
    // Use GSAP's reliable ScrollToPlugin
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 80 },
        duration: prefersReducedMotion ? 0 : 1.0,
        ease: 'power3.inOut',
      });
    }
  };

  const handleScrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: prefersReducedMotion ? 0 : 1.0, ease: 'power3.inOut' });
  };

  // --- Data for mapping ---
  const socialLinks = [
    { icon: Github, href: 'https://github.com/ByteAcumen' },
    { icon: Linkedin, href: 'https://linkedin.com/in/h-h-hemanth-kumar-5a6235207' },
    { icon: Mail, href: 'mailto:hemanth.kumar04hh@gmail.com' }
  ];

  const navigationLinks = [
    { name: "About", link: "#about" },
    { name: "Experience", link: "#experience" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" }
  ];

  return (
    <footer ref={containerRef} className="relative overflow-hidden pt-24 pb-8 bg-white dark:bg-gray-950 transition-colors duration-500">
      {/* Hero-like Background */}
      <motion.div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-purple-600/8 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1, 1.1, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/6 to-blue-600/6 rounded-full blur-3xl"
          animate={prefersReducedMotion ? {} : { scale: [1.1, 1, 1.1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-gray-950/20" />
      </motion.div>

      {/* Top/Bottom separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Enhanced Column 1: Brand & Socials */}
          <motion.div 
            className="gsap-footer-reveal flex flex-col items-start space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.a 
              href="#home" 
              onClick={(e) => { e.preventDefault(); handleScrollToTop(); }} 
              className="group flex items-center gap-3 text-2xl font-bold text-white"
              onMouseEnter={() => setCursor('button')}
              onMouseLeave={resetCursor}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              aria-label="Back to top"
            >
              <motion.div 
                className="relative w-10 h-10 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center overflow-hidden"
                whileHover={{ rotate: 6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-700/40 to-purple-700/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <Sparkles size={20} className="relative z-10 text-white" />
              </motion.div>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                HEMANTH KUMAR
              </span>
            </motion.a>
            
            <p className="text-gray-300 leading-relaxed max-w-sm">
              A passionate <span className="text-blue-400 font-medium">full-stack developer</span> from 
              <span className="inline-flex items-center gap-1 text-orange-400 font-medium">
                <MapPin size={14} />
                Bangalore, India
              </span>, crafting modern and innovative web solutions. Available for freelance and full-time roles.
            </p>
            
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social, i) => (
                <motion.a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative w-12 h-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                  onMouseEnter={() => setCursor('link')} 
                  onMouseLeave={resetCursor}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  aria-label={social.href}
                >
                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${
                    i === 0 ? 'from-gray-600 to-gray-800' :
                    i === 1 ? 'from-blue-600 to-blue-800' :
                    'from-red-500 to-red-700'
                  } opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  <social.icon size={20} className="relative z-10" />
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Enhanced Column 2: Navigation */}
          <motion.div 
            className="gsap-footer-reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ChevronRight size={14} className="text-white" />
              </div>
              Navigation
            </h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <motion.a 
                    href={link.link} 
                    onClick={(e) => { e.preventDefault(); handleScrollTo(link.link); }} 
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-300 py-2 px-3 rounded-xl hover:bg-white/5"
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="mr-3 w-1 h-1 bg-blue-400 rounded-full"
                      whileHover={{ scale: 2, backgroundColor: "#a855f7" }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="font-medium">{link.name}</span>
                    <ChevronRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Enhanced Column 3: Services */}
          <motion.div 
            className="gsap-footer-reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Code size={14} className="text-white" />
              </div>
              Services
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Full-Stack Development", icon: "💻", color: "from-blue-500 to-cyan-500" },
                { name: "Data Visualizations (D3)", icon: "📊", color: "from-indigo-500 to-blue-500" },
                { name: "API & Backend (Flask)", icon: "🧩", color: "from-emerald-500 to-green-500" },
                { name: "UI/UX Implementation", icon: "🎨", color: "from-purple-500 to-pink-500" }
              ].map((service, index) => (
                <motion.li 
                  key={service.name}
                  className="group flex items-center text-gray-300 py-2 px-3 rounded-xl hover:bg-white/5 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mr-3 text-sm`}>
                    {service.icon}
                  </div>
                  <span className="font-medium group-hover:text-white transition-colors duration-300">
                    {service.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Enhanced Column 4: Get in Touch */}
          <motion.div 
            className="gsap-footer-reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg flex items-center justify-center">
                <Heart size={14} className="text-white" />
              </div>
              Get In Touch
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <motion.button 
              onClick={() => handleScrollTo('#contact')} 
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setCursor('button')} 
              onMouseLeave={resetCursor}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                Contact Me
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 2 }}
                >
                  <ChevronRight size={16} />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Enhanced Bottom Bar */}
        <motion.div 
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.p 
            className="gsap-footer-reveal text-gray-300 text-center sm:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            © {new Date().getFullYear()} 
            <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hemanth Kumar
            </span>
            . All rights reserved.
          </motion.p>
          
          <motion.button 
            onClick={handleScrollToTop} 
            className="group relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            aria-label="Scroll to top" 
            onMouseEnter={() => setCursor('button')} 
            onMouseLeave={resetCursor}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <div className="pointer-events-none absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <motion.div
              className="relative z-10"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
});

export default Footer;