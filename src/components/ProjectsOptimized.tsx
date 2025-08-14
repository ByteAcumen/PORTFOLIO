import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  ExternalLink, 
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
  CheckCircle
} from 'lucide-react';
import { useCursor } from '../contexts/useCursor';

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

// Project Data
const featuredProjects: FeaturedProject[] = [
  {
    id: 'codezye-cyber',
    title: 'CODEZYE CYBER',
    shortDescription: 'Advanced cybersecurity platform providing comprehensive threat detection and compliance solutions.',
    fullDescription: 'A cutting-edge cybersecurity platform that offers real-time threat detection, vulnerability assessment, and compliance management for enterprises. Built with modern architecture and scalable design patterns.',
    image: '/images.png',
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
    image: '/1631348977484.jpeg',
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
    image: '/fth2olii79kwkvbkqnvv.webp',
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
    image: '/particle.png',
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
    image: '/photo_2025-06-06_18-45-35.jpg',
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
    image: '/favicon.svg',
    technologies: ['React', 'Python', 'Django', 'PostgreSQL', 'TensorFlow', 'AWS'],
    category: 'EdTech',
    status: 'Live',
    date: '2024',
    liveUrl: 'https://careernxt-demo.com',
    githubUrl: 'https://github.com/ByteAcumen/careernxt',
    features: ['AI career matching', 'Skill assessments', 'Learning paths', 'Progress tracking']
  }
];

// Optimized Project Card Component
const ProjectCard: React.FC<{ 
  project: FeaturedProject; 
  index: number; 
  onViewMore: (project: FeaturedProject) => void; 
}> = ({ project, index, onViewMore }) => {
  const cardRef = useRef<HTMLDivElement>(null);
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

  // Optimized animations
  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card, {
      y: 60,
      opacity: 0,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true
      }
    });
  }, { scope: cardRef });

  const handleCardClick = useCallback(() => {
    onViewMore(project);
  }, [project, onViewMore]);

  return (
    <motion.div 
      ref={cardRef} 
      className="group h-full cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={handleCardClick}
      onHoverStart={() => setCursor('button')}
      onHoverEnd={resetCursor}
    >
      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden h-full flex flex-col transform transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/30">
        
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `/particle.png`;
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border flex items-center gap-1 ${
              project.status === 'Live' 
                ? 'bg-emerald-500/90 text-white border-emerald-400/50' 
                : project.status === 'In Development'
                ? 'bg-amber-500/90 text-white border-amber-400/50'
                : 'bg-blue-500/90 text-white border-blue-400/50'
            }`}>
              {project.status === 'Live' && <CheckCircle size={12} />}
              {project.status}
            </span>
          </div>

          {/* Category Icon */}
          <div className="absolute top-4 left-4 p-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-lg border border-white/60 dark:border-gray-700/60 shadow-lg">
            <CategoryIcon size={18} className="text-blue-600 dark:text-blue-400" />
          </div>
          
          {/* Quick Actions */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/95 hover:bg-emerald-500 text-gray-800 hover:text-white rounded-lg transition-all duration-300 shadow-lg backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Visit ${project.title} live site`}
              >
                <Globe size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/95 hover:bg-gray-900 text-gray-800 hover:text-white rounded-lg transition-all duration-300 shadow-lg backdrop-blur-md"
                onClick={(e) => e.stopPropagation()}
                aria-label={`View ${project.title} source code`}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-semibold">
                {project.category}
              </span>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                <Calendar size={12} />
                <span>{project.date}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {project.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm line-clamp-3">
              {project.shortDescription}
            </p>
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs font-semibold">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
              <Eye size={16} />
              <span className="text-sm">View Details</span>
            </div>
            
            <ArrowRight size={16} className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Optimized Project Modal Component
const ProjectModal: React.FC<{
  project: FeaturedProject | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const { setCursor, resetCursor } = useCursor();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key and body scroll
  React.useEffect(() => {
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
        <div className="fixed inset-0 z-[99999] overflow-hidden">
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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ 
              duration: 0.4, 
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
                  target.src = `/particle.png`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="px-4 py-2 bg-blue-500/90 text-white rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-lg backdrop-blur-md ${
                    project.status === 'Live'
                      ? 'bg-emerald-500/90 text-white'
                      : project.status === 'In Development'
                      ? 'bg-amber-500/90 text-white'
                      : 'bg-blue-500/90 text-white'
                  }`}>
                    {project.status}
                  </span>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-xl text-sm font-semibold shadow-lg">
                    {project.date}
                  </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h2>
                
                <p className="text-xl text-white/90 max-w-4xl">
                  {project.shortDescription}
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-3 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500/80 transition-colors z-10"
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-8">
                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <Sparkles size={24} className="text-blue-500" />
                    Project Overview
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                    <Code2 size={24} className="text-purple-500" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-gray-800 dark:text-gray-200 rounded-xl font-medium border border-blue-100 dark:border-blue-800/30 shadow-sm hover:scale-105 transition-transform duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Rocket size={24} className="text-emerald-500" />
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700/50 hover:shadow-lg transition-shadow duration-300"
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 flex-shrink-0" />
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <div className="flex flex-wrap justify-center gap-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl flex items-center gap-3 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                  >
                    <Globe size={20} />
                    <span>Visit Live Site</span>
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-bold rounded-xl flex items-center gap-3 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                  >
                    <Github size={20} />
                    <span>View Source</span>
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
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

  // Optimized GSAP animations
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.from('.section-header', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true
      }
    });
  }, { scope: sectionRef });

  const handleFilterChange = useCallback((category: string) => {
    setFilter(category);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 section-header">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full mb-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <Layers size={20} className="text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">Featured Portfolio</span>
            <Sparkles size={18} className="text-purple-500" />
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">Projects</span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Discover my journey through innovative projects that blend cutting-edge technology with creative solutions.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/80 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
                onClick={() => handleFilterChange(category)}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
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
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Projects Found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                  No projects match the selected filter. Try selecting a different category.
                </p>
                <button
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors duration-300"
                  onClick={() => setFilter('all')}
                >
                  Show All Projects
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        {filteredProjects.length > 0 && (
          <div className="mt-16 p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/60 dark:border-gray-700/60">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {filteredProjects.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {filter === 'all' ? 'Total Projects' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Projects`}
                </div>
              </div>
              
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {Array.from(new Set(filteredProjects.flatMap(p => p.technologies))).length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Technologies Used
                </div>
              </div>
              
              <div className="text-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {filteredProjects.filter(p => p.status === 'Live').length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  Live Projects
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;
