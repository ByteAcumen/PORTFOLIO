import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Github, Linkedin } from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import TypewriterEffect from './TypewriterEffect';
import ProgressiveImage from './ProgressiveImage';
import ParticleBackground from './ParticleBackground';
import ThemeSwitcher from './ThemeSwitcher';

interface HeroProps {
  openResumeModal: () => void;
}

// Hero component
const Hero: React.FC<HeroProps> = ({ openResumeModal }) => {
  const { setCursorVariant } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-end justify-center relative overflow-hidden pt-16 pb-8 bg-white dark:bg-[#0a1128] transition-colors duration-500">
      {/* 3D Professional Background */}
      <div className="absolute inset-0 z-0">
        {/* Light Theme Background */}
        <div className="absolute inset-0 block dark:hidden">
          {/* Subtle gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/40" />
          {/* 3D Geometric Elements */}
          <div className="absolute top-20 right-20 w-56 h-56 bg-gradient-to-br from-blue-100/30 to-indigo-100/20 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-tr from-indigo-100/20 to-purple-100/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          {/* 3D Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.01]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.07) 1px, transparent 1px),linear-gradient(90deg, rgba(59, 130, 246, 0.07) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          {/* Floating 3D Shapes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/10 rounded-full animate-float" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400/10 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-purple-400/10 rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '3s' }} />
        </div>
        {/* Dark Theme Background */}
        <div className="absolute inset-0 hidden dark:block">
          {/* Deep gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#101630] to-[#14213d]" />
          {/* 3D Geometric Elements */}
          <div className="absolute top-20 right-20 w-56 h-56 bg-gradient-to-br from-blue-600/10 to-indigo-600/8 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-tr from-indigo-600/8 to-purple-600/6 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          {/* 3D Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.015]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.09) 1px, transparent 1px),linear-gradient(90deg, rgba(59, 130, 246, 0.09) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          {/* Floating 3D Shapes */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/10 rounded-full animate-float" style={{ animationDuration: '6s' }} />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400/10 rounded-full animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-purple-400/10 rounded-full animate-float" style={{ animationDuration: '7s', animationDelay: '3s' }} />
        </div>
        {/* Subtle Particle Effect */}
        <ParticleBackground className="opacity-10 dark:opacity-20" />
        {/* 3D Depth Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 dark:to-black/10" />
      </div>
      <motion.div
        className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10 py-10 md:py-20"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Profile Image (mobile: top, desktop: right) */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="block lg:hidden mb-8 w-full flex justify-center"
          >
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 flex items-center justify-center">
              {/* Glowing gradient border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-60 blur-lg"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              {/* Image container with border */}
              <motion.div
                className="relative w-36 h-36 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.03 }}
              >
                <ProgressiveImage
                  src="/photo_2025-06-06_18-45-35.jpg"
                  alt="HEMANTH KUMAR"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              {/* Floating elements for depth */}
              <div className="absolute top-[12%] right-[8%] w-8 h-8 bg-blue-400/10 backdrop-blur-sm rounded-md animate-float" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-[18%] left-[12%] w-6 h-6 bg-indigo-400/10 backdrop-blur-sm rounded-full animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.7s' }} />
            </div>
          </motion.div>

          {/* Main Content (no card) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
              <span className="px-5 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium tracking-wide shadow-sm">
                CS Final-Year Student
              </span>
              <span className="px-5 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full text-sm font-medium tracking-wide shadow-sm">
                Full-Stack Developer
              </span>
              <span className="px-5 py-2 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-sm font-medium tracking-wide shadow-sm">
                AI/ML Enthusiast
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight text-center lg:text-left">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                HEMANTH KUMAR
              </span>
            </h1>

            {/* Typewriter */}
            <div className="text-2xl sm:text-3xl font-semibold mb-6 h-12 text-blue-700 dark:text-blue-400 text-center lg:text-left">
              <TypewriterEffect
                texts={['Aspiring Full-Stack Developer', 'React & Node.js Enthusiast', 'AI/ML & Python Developer', 'Open Source Contributor']}
              />
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              I'm a final-year Computer Science student from Bangalore, India, passionate about
              <span className="text-blue-700 dark:text-blue-400 font-medium"> full-stack development </span>
              with React & Node.js, and exploring
              <span className="text-indigo-700 dark:text-indigo-400 font-medium"> AI/ML technologies</span>.
              An open-source enthusiast and hackathon participant, I love building
              <span className="text-purple-700 dark:text-purple-400 font-medium"> innovative solutions </span>
              that make a real impact.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full mb-4">
              <motion.button
                onClick={() => scrollToSection('contact')}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="flex items-center justify-center">
                  <Mail className="mr-2" size={18} /> Get in Touch
                </span>
              </motion.button>
              <motion.button
                onClick={openResumeModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-3 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 text-blue-700 dark:text-blue-300 font-medium rounded-xl shadow hover:shadow-md transition-all duration-300"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="flex items-center justify-center">
                  <Download className="mr-2" size={18} /> Resume
                </span>
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex items-center justify-center lg:justify-start gap-6">
              <motion.a
                href="https://github.com/ByteAcumen"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400 transition-colors relative group"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">GitHub</span>
                <Github size={22} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/h-h-hemanth-kumar-5a6235207"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400 transition-colors relative group"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">LinkedIn</span>
                <Linkedin size={22} />
              </motion.a>
              <motion.a
                href="mailto:hemanth.kumar04hh@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="text-gray-500 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-400 transition-colors relative group"
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Email</span>
                <Mail size={22} />
              </motion.a>
            </div>
          </motion.div>

          {/* Profile Image (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hidden lg:flex mt-12 lg:mt-0 lg:col-span-5 justify-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Glowing gradient border */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-60 blur-lg"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
              />
              {/* Image container with border */}
              <motion.div
                className="relative w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
                whileHover={{ scale: 1.03 }}
              >
                <ProgressiveImage
                  src="/photo_2025-06-06_18-45-35.jpg"
                  alt="HEMANTH KUMAR"
                  className="object-cover w-full h-full"
                />
              </motion.div>
              {/* Floating elements for depth */}
              <div className="absolute top-[12%] right-[8%] w-12 h-12 bg-blue-400/10 backdrop-blur-sm rounded-md animate-float" style={{ animationDuration: '4s' }} />
              <div className="absolute bottom-[18%] left-[12%] w-9 h-9 bg-indigo-400/10 backdrop-blur-sm rounded-full animate-float" style={{ animationDuration: '3.5s', animationDelay: '0.7s' }} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;