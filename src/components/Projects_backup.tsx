import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Code2, 
  Globe, 
  Eye,
  Shield,
  BarChart3,
  ShoppingCart,
  Zap,
  Newspaper,
  GraduationCap,
  X,
  Sparkles,
  Rocket,
  Layers,
  ArrowRight,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { useCursor } from '../contexts/useCursor';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface FeaturedProject {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  category: string;
  status: 'Live' | 'In Development' | 'Completed';
  date: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

// Featured Projects Data
const featuredProjects: FeaturedProject[] = [
  {
    id: 'codezye-cyber',
    title: 'CODEZYE CYBER',
    shortDescription: 'Advanced cybersecurity platform providing comprehensive threat detection and compliance solutions.',
    fullDescription: 'A cutting-edge cybersecurity platform that offers real-time threat detection, vulnerability assessment, and compliance management for enterprises. Built with modern architecture and scalable design patterns.',
    image: '/image.png',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io', 'JWT'],
    category: 'Cybersecurity',
    status: 'Live',
    date: '2024',
    liveUrl: 'https://codezyecyber.com',
    githubUrl: 'https://github.com/ByteAcumen/codezye-cyber',
    features: ['Real-time threat monitoring', 'Compliance dashboard', 'Vulnerability scanning', 'Security analytics']
  },
  {
    id: 'earthvision',
    title: 'EarthVision',
    shortDescription: 'Environmental monitoring platform using satellite data and AI for climate analysis.',
    fullDescription: 'An innovative environmental monitoring solution that leverages satellite imagery and machine learning to track climate changes and environmental patterns. Features advanced data visualization and predictive analytics.',
    image: '/EarthVision1-51-0lzph.png',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI', 'PostgreSQL', 'Docker'],
    category: 'Environmental Tech',
    status: 'Live',
    date: '2024',
    liveUrl: 'https://earthvision-demo.com',
    githubUrl: 'https://github.com/ByteAcumen/earthvision',
    features: ['Satellite data analysis', 'Climate prediction', 'Environmental reporting', 'AI-powered insights']
  },
  {
    id: 'rubco-bangalore',
    title: 'RUBCO Bangalore',
    shortDescription: 'Modern e-commerce platform for construction materials with advanced inventory management.',
    fullDescription: 'A comprehensive e-commerce solution for construction materials featuring real-time inventory, supplier management, and automated ordering systems. Built for scalability and performance.',
    image: '/Screenshot 2025-08-10 180350.png',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    category: 'E-commerce',
    status: 'Live',
    date: '2024',
    liveUrl: 'https://rubcobangalore.com',
    githubUrl: 'https://github.com/ByteAcumen/rubco-bangalore',
    features: ['Inventory management', 'Supplier portal', 'Order tracking', 'Payment integration']
  },
  {
    id: 'quantaweather',
    title: 'QuantaWeather',
    shortDescription: 'Quantum-enhanced weather prediction system with machine learning algorithms.',
    fullDescription: 'Revolutionary weather forecasting platform that combines quantum computing principles with advanced ML models for unprecedented accuracy in weather predictions.',
    image: '/Screenshot 2025-08-10 180504.png',
    technologies: ['Python', 'Qiskit', 'TensorFlow', 'React', 'FastAPI', 'Redis'],
    category: 'Quantum Computing',
    status: 'In Development',
    date: '2024',
    liveUrl: 'https://quantaweather-demo.com',
    githubUrl: 'https://github.com/ByteAcumen/quantaweather',
    features: ['Quantum algorithms', 'ML predictions', 'Real-time data', 'Advanced analytics']
  },
  {
    id: 'pulse-media',
    title: 'Pulse Media',
    shortDescription: 'Dynamic news aggregation platform with AI-powered content curation and analysis.',
    fullDescription: 'An intelligent news platform that aggregates content from multiple sources, uses AI for sentiment analysis, and provides personalized news feeds with real-time updates.',
    image: '/Screenshot 2025-08-10 180631.png',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Redis', 'WebSocket'],
    category: 'News & Media',
    status: 'Live',
    date: '2024',
    liveUrl: 'https://pulsemedia-demo.com',
    githubUrl: 'https://github.com/ByteAcumen/pulse-media',
    features: ['AI content curation', 'Sentiment analysis', 'Real-time updates', 'Personalized feeds']
  },
  {
    id: 'careernxt',
    title: 'CareerNxt',
    shortDescription: 'AI-powered career development platform with personalized learning paths and job matching.',
    fullDescription: 'A comprehensive career development platform that uses AI to create personalized learning paths, skill assessments, and intelligent job matching for career growth.',
    image: '/Screenshot 2025-08-10 180802.png',
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'TensorFlow', 'AWS'],
    category: 'EdTech',
    status: 'Live',
    date: '2024',
    liveUrl: 'https://careernxt-demo.com',
    githubUrl: 'https://github.com/ByteAcumen/careernxt',
    features: ['AI career matching', 'Skill assessments', 'Learning paths', 'Progress tracking']
  }
];

// Enhanced Project Card Component
const ProjectCard: React.FC<{ 
  project: FeaturedProject; 
  index: number; 
  onViewMore: (project: FeaturedProject) => void; 
}> = ({ project, index, onViewMore }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { setCursor, resetCursor } = useCursor();

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cybersecurity': return Shield;
      case 'environmental tech': return BarChart3;
      case 'e-commerce': return ShoppingCart;
      case 'quantum computing': return Zap;
      case 'news & media': return Newspaper;
      case 'edtech': return GraduationCap;
      default: return Code2;
    }
  };

  const CategoryIcon = getCategoryIcon(project.category);

  // Enhanced GSAP animations
  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Card entrance animation
    tl.fromTo(card, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotationY: 20,
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1.2,
      delay: index * 0.2,
      ease: 'power3.out',
    });

    // Floating hover animation
    let hoverTween: gsap.core.Tween;
    
    const handleMouseEnter = () => {
      hoverTween = gsap.to(card, {
        y: -20,
        scale: 1.05,
        rotationY: 5,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (hoverTween) hoverTween.kill();
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card?.removeEventListener('mouseenter', handleMouseEnter);
      card?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: cardRef });

  return (
    <div 
      ref={cardRef} 
      className="group h-full perspective-1000"
    >
      <div
        className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden transition-all duration-700 cursor-pointer h-full flex flex-col transform-style-preserve-3d"
        onClick={() => onViewMore(project)}
        onMouseEnter={() => setCursor('button')}
        onMouseLeave={() => resetCursor()}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-all duration-700"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/500x400/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
            }}
          />
          
          {/* Dynamic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-700" />
          
          {/* Status Badge */}
          <motion.div 
            className="absolute top-5 right-5"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
          >
            <motion.span 
              className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-md border ${
                project.status === 'Live' 
                  ? 'bg-emerald-500/90 text-white border-emerald-400/50' 
                  : project.status === 'In Development'
                  ? 'bg-amber-500/90 text-white border-amber-400/50'
                  : 'bg-blue-500/90 text-white border-blue-400/50'
              }`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {project.status === 'Live' && <span className="mr-1">✨</span>}
              {project.status === 'In Development' && <span className="mr-1">🚧</span>}
              {project.status}
            </motion.span>
          </motion.div>

          {/* Category Icon */}
          <motion.div 
            className="absolute top-5 left-5 p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl border border-white/60 dark:border-gray-700/60 shadow-xl"
            whileHover={{ scale: 1.2, rotate: 15, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
          >
            <CategoryIcon size={20} className="text-blue-600 dark:text-blue-400" />
          </motion.div>
          
          {/* Quick Actions */}
          <div className="absolute bottom-5 right-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/95 hover:bg-emerald-500 text-gray-800 hover:text-white rounded-xl transition-all duration-300 shadow-lg backdrop-blur-md"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                <Globe size={18} />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/95 hover:bg-gray-900 text-gray-800 hover:text-white rounded-xl transition-all duration-300 shadow-lg backdrop-blur-md"
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                <Github size={18} />
              </motion.a>
            )}
          </div>
          
          {/* Project Title */}
          <motion.div 
            className="absolute bottom-5 left-5 right-24 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <h3 className="font-bold text-2xl mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-sm opacity-90 group-hover:text-blue-100 transition-colors duration-300">
              {project.category}
            </p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-7 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <motion.span 
                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 rounded-xl text-sm font-semibold"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                {project.category}
              </motion.span>
              <motion.div 
                className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                <Calendar size={14} className="text-purple-500" />
                <span className="font-medium">{project.date}</span>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.8 }}
            >
              {project.shortDescription}
            </motion.p>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2.5">
              {project.technologies.slice(0, 3).map((tech, idx) => (
                <motion.span
                  key={tech}
                  className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.9 + idx * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
              {project.technologies.length > 3 && (
                <motion.span 
                  className="px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-semibold"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 1.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  +{project.technologies.length - 3} more
                </motion.span>
              )}
            </div>
          </div>

          {/* Footer */}
          <motion.div 
            className="flex items-center justify-between mt-auto pt-6 border-t border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 1.3 }}
          >
            <motion.div 
              className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <Eye size={18} />
              <span>View Project</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
            </motion.div>
            
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center"
              whileHover={{ scale: 1.2, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles size={16} className="text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Project Modal Component
const ProjectModal: React.FC<{
  project: FeaturedProject | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const { setCursor, resetCursor } = useCursor();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ 
              duration: 0.6, 
              type: "spring", 
              stiffness: 300, 
              damping: 30 
            }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white/98 dark:bg-gray-900/98 backdrop-blur-2xl rounded-3xl shadow-3xl border border-gray-200/70 dark:border-gray-700/70 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/1200x600/6366f1/ffffff?text=${encodeURIComponent(project.title)}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <motion.span 
                    className="px-4 py-2 bg-blue-500/90 text-white rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md"
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.category}
                  </motion.span>
                  <motion.span 
                    className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md ${
                      project.status === 'Live'
                        ? 'bg-emerald-500/90 text-white'
                        : project.status === 'In Development'
                        ? 'bg-amber-500/90 text-white'
                        : 'bg-blue-500/90 text-white'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.status}
                  </motion.span>
                  <motion.span 
                    className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl text-sm font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    {project.date}
                  </motion.span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h2>
                
                <p className="text-xl text-white/90 max-w-4xl">
                  {project.shortDescription}
                </p>
              </div>
              
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-8">
                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <Sparkles size={24} className="text-blue-500" />
                    Project Overview
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <Code2 size={24} className="text-purple-500" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, idx) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-800 dark:text-gray-200 rounded-xl font-medium border border-blue-100 dark:border-blue-800/30 shadow-sm"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.05 }}
                        whileHover={{ 
                          scale: 1.05,
                          y: -2,
                          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Rocket size={24} className="text-emerald-500" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + idx * 0.1 }}
                        whileHover={{ 
                          y: -5,
                          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                        }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {feature}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center gap-4">
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl flex items-center gap-3 shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                  >
                    <Globe size={20} />
                    <span>Visit Live Site</span>
                    <ExternalLink size={18} />
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl flex items-center gap-3 shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                  >
                    <Github size={20} />
                    <span>View Source</span>
                    <ExternalLink size={18} />
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Main Projects Component
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(featuredProjects.map(p => p.category.toLowerCase())))];

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.category.toLowerCase() === filter);

  // GSAP animations
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from('.section-header', {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      }
    });

  }, { scope: sectionRef });

  const handleFilterChange = useCallback((category: string) => {
    setFilter(category);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="py-32 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 section-header">
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full mb-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <Layers size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Featured Portfolio</span>
            <Sparkles size={18} className="text-purple-500" />
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Projects</span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover my journey through innovative projects that blend cutting-edge technology with creative solutions. Each project represents a unique challenge overcome and a step forward in the world of digital innovation.
          </motion.p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => handleFilterChange(category)}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.05 }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  layout
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    onViewMore={setSelectedProject}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="col-span-full flex flex-col items-center justify-center py-32"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-8xl mb-8">🔍</div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Projects Found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-center max-w-md">
                  No projects match the selected filter. Try selecting a different category.
                </p>
                <motion.button
                  className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg"
                  onClick={() => setFilter('all')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Show All Projects
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats */}
        {filteredProjects.length > 0 && (
          <motion.div 
            className="mt-20 p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {filteredProjects.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {filter === 'all' ? 'Total Projects' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Projects`}
                </div>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Array.from(new Set(filteredProjects.flatMap(p => p.technologies))).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Technologies Used
                </div>
              </div>
              
              <div className="flex flex-col items-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {filteredProjects.filter(p => p.status === 'Live').length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Live Projects
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;