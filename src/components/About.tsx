import React, { useEffect, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles } from 'lucide-react';
import { useCursor } from '../contexts/useCursor';

// About section styled and animated similar to the Hero section
const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { setCursor, resetCursor } = useCursor();

  const badges = useMemo(
    () => ['AI/ML', 'Full-Stack Development', 'Quantum Computing'],
    []
  );

  const highlights = useMemo(
    () => [
      'Final-year CS @ Presidency University',
      'AI-driven KYC: -70% time, -25% fraud',
      '98% Facial Recognition @ Innovitegra',
      'QuantaWeather: 10x data, +20% accuracy',
      'React.js • PyTorch • AWS'
    ],
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      tl.fromTo(
        '.about-badge',
        { opacity: 0, y: 20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08 }
      )
        .fromTo(
          '.about-title',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          ['.about-subtitle', '.about-description'],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          '-=0.5'
        )
        .fromTo(
          '.about-highlights .chip',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500"
    >
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badges */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {badges.map((badge) => (
              <motion.div
                key={badge}
                className="about-badge px-4 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02, y: prefersReducedMotion ? 0 : -1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.98 }}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                {badge}
              </motion.div>
            ))}
          </div>

          {/* Title */}
          <div className="about-title mb-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <div className="about-subtitle mb-8">
            <p className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              AI/ML • Full-Stack • Quantum Computing
            </p>
          </div>

          {/* Description */}
          <div className="about-description text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            <p>
              I am <span className="font-semibold text-gray-900 dark:text-gray-100">H H Hemanth Kumar</span>, a final-year Computer Science student at Presidency University, Bengaluru. I build AI-driven and full-stack solutions and explore quantum-inspired systems.
            </p>
            <p className="mt-5">
              Highlights include a KYC automation system cutting processing time by <span className="font-semibold text-blue-600 dark:text-blue-400">70%</span> and fraud by <span className="font-semibold text-blue-600 dark:text-blue-400">25%</span>, and facial recognition models with <span className="font-semibold text-blue-600 dark:text-blue-400">98%</span> accuracy at Innovitegra Solutions. My project QuantaWeather scales to <span className="font-semibold text-indigo-600 dark:text-indigo-400">10x</span> larger datasets with <span className="font-semibold text-indigo-600 dark:text-indigo-400">20%</span> better accuracy.
            </p>
            <p className="mt-5">
              Comfortable with <span className="font-semibold text-blue-600 dark:text-blue-400">React.js</span>, <span className="font-semibold text-blue-600 dark:text-blue-400">PyTorch</span>, and <span className="font-semibold text-blue-600 dark:text-blue-400">AWS</span>, I enjoy solving complex problems and collaborating on innovative products.
            </p>
          </div>

          {/* Highlights Chips */}
          <div className="about-highlights mt-10 flex flex-wrap gap-2 justify-center">
            {highlights.map((chip) => (
              <motion.span
                key={chip}
                className="chip px-3 py-1.5 text-sm rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-sm"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.02, y: prefersReducedMotion ? 0 : -1 }}
              >
                {chip}
              </motion.span>
            ))}
          </div>

          {/* Decorative sparkles */}
          <motion.div
            className="mt-10 inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-full text-sm text-gray-700 dark:text-gray-300"
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.03 }}
          >
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>Always exploring and learning</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;