import React, { useState, useCallback } from 'react';
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
  Layers,
  ArrowRight,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useCursor } from '../contexts/useCursor';

interface FeaturedProject {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  category: string;
  status: string;
  date: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

// Safe project data with fallback images
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
  }
];

// Simple Project Card Component
const ProjectCard: React.FC<{ 
  project: FeaturedProject; 
  onViewMore: (project: FeaturedProject) => void; 
}> = ({ project, onViewMore }) => {
  const { setCursor, resetCursor } = useCursor();

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

  return (
    <div 
      className="group h-full cursor-pointer"
      onClick={() => onViewMore(project)}
      onMouseEnter={() => setCursor('button')}
      onMouseLeave={resetCursor}
    >
      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 dark:border-gray-700/60 overflow-hidden h-full flex flex-col transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
        
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/particle.png';
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
    </div>
  );
};

// Simple Modal Component
const SimpleModal: React.FC<{
  project: FeaturedProject | null;
  isOpen: boolean;
  onClose: () => void;
}> = ({ project, isOpen, onClose }) => {
  const { setCursor, resetCursor } = useCursor();
  
  // Handle escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!project || !isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[999999] flex items-center justify-center p-4"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        backdropFilter: 'blur(20px)'
      }}
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/particle.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-red-500/80 text-white rounded-full transition-colors"
            onMouseEnter={() => setCursor('button')}
            onMouseLeave={resetCursor}
          >
            <X size={20} />
          </button>
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-white/90">{project.shortDescription}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About This Project</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Key Features</h3>
            <ul className="space-y-2">
              {project.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                <Globe size={18} />
                Visit Site
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg flex items-center gap-2 transition-colors"
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                <Github size={18} />
                View Code
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const { setCursor, resetCursor } = useCursor();

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(featuredProjects.map(p => p.category.toLowerCase())))];

  // Filter projects
  const filteredProjects = filter === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(p => p.category.toLowerCase() === filter);

  const handleOpenModal = useCallback((project: FeaturedProject) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <section 
      id="projects" 
      className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
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
                onClick={() => setFilter(category)}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={resetCursor}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewMore={handleOpenModal}
            />
          ))}
        </div>
      </div>

      {/* Simple Modal */}
      <SimpleModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
      />
    </section>
  );
};

Projects.displayName = 'Projects';

export default Projects;
