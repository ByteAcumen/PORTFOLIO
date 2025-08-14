import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Mail, Github, Linkedin } from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import TypewriterEffect from './TypewriterEffect';
import ProgressiveImage from './ProgressiveImage';

interface HeroProps {
  openResumeModal: () => void;
}

const HeroOptimized: React.FC<HeroProps> = ({ openResumeModal }) => {
  const { setCursor, resetCursor } = useCursor();
  
  const heroRef = useRef<HTMLElement>(null);
  
  // Subtle scroll effects without parallax movement
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  // Professional social links matching header style
  const socialLinks = useMemo(() => [
    { 
      href: 'https://github.com/ByteAcumen', 
      icon: Github, 
      label: 'GitHub',
      color: 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
    },
    { 
      href: 'https://www.linkedin.com/in/h-h-hemanth-kumar-5a6235207', 
      icon: Linkedin, 
      label: 'LinkedIn',
      color: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300'
    },
    { 
      href: 'mailto:hemanth.kumar04hh@gmail.com', 
      icon: Mail, 
      label: 'Email',
      color: 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
    }
  ], []);





  // Optimized GSAP animations with better performance
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single optimized timeline for entrance animations
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      
      tl.fromTo('.hero-badge', {
          opacity: 0,
          y: 20,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08
        })
        .fromTo('.hero-title', {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, "-=0.4")
        .fromTo(['.hero-subtitle', '.hero-description', '.hero-buttons'], {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1
        }, "-=0.6")
        .fromTo('.hero-social', {
          opacity: 0,
          scale: 0.9
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05
        }, "-=0.3")
        .fromTo('.hero-image', {
          opacity: 0,
          scale: 0.95
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.8
        }, "-=0.8");

      // Optimized floating animation with will-change for better performance
      gsap.set('.floating-element', { willChange: 'transform' });
      gsap.to('.floating-element', {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.4,
          repeat: -1,
          yoyo: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="min-h-screen relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      {/* Optimized Professional Background */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        
        {/* Minimal floating orbs for depth */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-purple-600/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/6 to-blue-600/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-gray-950/20" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-12rem)]">
          
          {/* Mobile/Tablet Image Section - Shows only on smaller screens */}
          <div className="lg:hidden flex justify-center mb-8">
            <motion.div 
              className="hero-image relative w-64 h-64 sm:w-72 sm:h-72"
            >
              {/* Clean Image Border */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1 shadow-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-950 rounded-full" />
              </motion.div>

              {/* Profile Image */}
              <motion.div 
                className="absolute inset-2 rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressiveImage
                  src="/photo_2025-06-06_18-45-35.jpg"
                  alt="Hemanth Kumar - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
              </motion.div>
              
              {/* Minimal Floating Tech Elements */}
              <motion.div 
                className="floating-element absolute -top-2 -right-2 p-2.5 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">💻</span>
              </motion.div>
              
              <motion.div 
                className="floating-element absolute -bottom-3 -left-3 p-2 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base">🚀</span>
              </motion.div>
              
              <motion.div 
                className="floating-element absolute top-1/4 -left-5 p-2 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm">⚛️</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Left Content - Text Section */}
          <motion.div 
            className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
            style={{ opacity: opacityFade, scale }}
          >
            {/* Clean Professional Status Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              {[
                'CS Final Year',
                'Full-Stack Developer', 
                'AI/ML Enthusiast'
              ].map((badge) => (
                <motion.div
                  key={badge}
                  className="hero-badge px-4 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02, 
                    y: -1
                  }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setCursor('button')}
                  onMouseLeave={() => resetCursor()}
                >
                  {badge}
                </motion.div>
              ))}
            </div>

            {/* Clean Main Heading */}
            <motion.div className="hero-title mb-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <div className="text-gray-600 dark:text-gray-400 text-base sm:text-lg font-medium mb-2">
                  Hi, I'm
                </div>
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent leading-tight">
                  Hemanth Kumar
                </div>
              </h1>
            </motion.div>

            {/* Clean Typewriter Subtitle */}
            <motion.div className="hero-subtitle mb-8">
              <div className="text-xl sm:text-2xl lg:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent min-h-[2.5rem]">
                <TypewriterEffect
                  texts={[
                    'Full-Stack Developer',
                    'React & Node.js Developer',
                    'AI/ML Enthusiast',
                    'Open Source Contributor'
                  ]}
                  typeSpeed={100}
                  deleteSpeed={50}
                  pauseTime={2500}
                />
              </div>
            </motion.div>

            {/* Clean Professional Description */}
            <motion.div className="hero-description mb-10">
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Final-year Computer Science student from{' '}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  Bangalore, India
                </span>
                , passionate about building modern web applications with{' '}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  React & Node.js
                </span>
                . I enjoy exploring{' '}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">
                  AI/ML technologies
                </span>
                {' '}and contributing to impactful projects.
              </p>
            </motion.div>

            {/* Clean Action Buttons */}
            <motion.div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              {/* Primary CTA Button */}
              <motion.button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={() => resetCursor()}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center gap-3">
                  <Mail size={18} />
                  <span>Get In Touch</span>
                </div>
              </motion.button>

              {/* Resume Button */}
              <motion.button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openResumeModal();
                }}
                className="group relative px-8 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 text-gray-800 dark:text-gray-200 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-white/95 dark:hover:bg-white/15 transition-all duration-300"
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={() => resetCursor()}
                whileHover={{
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative flex items-center justify-center gap-3">
                  <Eye size={18} />
                  <span>View Resume</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Clean Social Links */}
            <motion.div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map(({ href, icon: Icon, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`hero-social group p-3 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${color}`}
                  onMouseEnter={() => setCursor('button')}
                  onMouseLeave={() => resetCursor()}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} />
                  <span className="sr-only">{label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Desktop Image Section - Shows only on large screens */}
          <div className="hidden lg:flex lg:col-span-5 justify-center lg:justify-end order-1 lg:order-2">
            <motion.div 
              className="hero-image relative w-96 h-96"
            >
              {/* Clean Image Border */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-1 shadow-xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-white dark:bg-gray-950 rounded-full" />
              </motion.div>

              {/* Profile Image */}
              <motion.div 
                className="absolute inset-2 rounded-full overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressiveImage
                  src="/photo_2025-06-06_18-45-35.jpg"
                  alt="Hemanth Kumar - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
              </motion.div>
              
              {/* Minimal Floating Tech Elements */}
              <motion.div 
                className="floating-element absolute -top-2 -right-2 p-3 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-xl">💻</span>
              </motion.div>
              
              <motion.div 
                className="floating-element absolute -bottom-4 -left-4 p-2.5 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-lg">🚀</span>
              </motion.div>
              
              <motion.div 
                className="floating-element absolute top-1/4 -left-6 p-2.5 bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-base">⚛️</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOptimized;