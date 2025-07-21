import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../contexts/useCursor';
import ProgressiveImage from './ProgressiveImage';
import { Github, Play, Filter, Globe, ArrowUpRight, Info } from 'lucide-react';

interface ProjectType {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  category: string;
  featured?: boolean;
  githubUrl: string;
  liveUrl?: string;
  videoUrl?: string;
  achievements?: string[];
}

const Portfolio: React.FC = () => {
  const { setCursorVariant } = useCursor();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  const projects = [
    {
      id: 1,
      title: 'AI-Powered Personal Assistant',
      description: 'A full-stack AI assistant application with natural language processing and personalized recommendations.',
      longDescription: 'Designed and implemented an advanced AI personal assistant that helps users manage their schedules, answers questions, and provides personalized recommendations. Built using React for the frontend, Python with TensorFlow for NLP processing, and MongoDB for data storage.',
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Python', 'TensorFlow', 'MongoDB', 'Express.js'],
      category: 'ai',
      featured: true,
      githubUrl: 'https://github.com/ByteAcumen/ai-assistant',
      liveUrl: 'https://ai-assistant-demo.vercel.app',
      videoUrl: '#',
      achievements: [
        'Achieved 92% accuracy in intent recognition',
        'Built multilingual support for 8 languages',
        'Implemented secure user data handling with encryption'
      ]
    },
    {
      id: 2,
      title: 'NextJS E-commerce Platform',
      description: 'Modern e-commerce platform with server-side rendering, advanced animations, and seamless checkout experience.',
      longDescription: 'Developed a high-performance e-commerce platform using Next.js for server-side rendering and Tailwind CSS for responsive design. Features include product catalog, user authentication, cart functionality, payment processing, and order tracking.',
      image: 'https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'Stripe API', 'Framer Motion'],
      category: 'web',
      githubUrl: 'https://github.com/ByteAcumen/nextjs-ecommerce',
      liveUrl: 'https://nextjs-ecommerce-showcase.vercel.app',
      achievements: [
        'Improved page load performance by 70% with SSR',
        'Created responsive design with modern UI/UX principles',
        'Integrated Stripe for secure payment processing'
      ]
    },
    {
      id: 3,
      title: 'React Native Fitness App',
      description: 'Cross-platform mobile fitness application with workout tracking, nutrition guidance, and progress visualization.',
      longDescription: 'Built a comprehensive fitness mobile application using React Native for cross-platform compatibility. The app features customizable workout plans, nutrition tracking, progress charts, social sharing, and integration with health monitoring devices.',
      image: 'https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'HealthKit API', 'Google Fit API'],
      category: 'mobile',
      githubUrl: 'https://github.com/ByteAcumen/fitness-tracker',
      liveUrl: '#',
      achievements: [
        'Featured in top 100 fitness apps in the App Store',
        'Created custom animations for interactive workout demos',
        'Implemented offline functionality for workouts without internet'
      ]
    },
    {
      id: 4,
      title: 'Machine Learning Image Classifier',
      description: 'Computer vision project that uses deep learning to accurately classify and tag images across multiple categories.',
      longDescription: 'Developed a sophisticated image classification system using convolutional neural networks (CNNs) to accurately identify and categorize objects in images. The system was trained on a diverse dataset of over 100,000 images and achieves high accuracy across various categories.',
      image: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'NumPy', 'Flask'],
      category: 'ai',
      githubUrl: 'https://github.com/ByteAcumen/image-classifier',
      liveUrl: 'https://ml-image-classifier-demo.herokuapp.com',
      achievements: [
        'Achieved 94.7% classification accuracy on test dataset',
        'Optimized model for mobile deployment',
        'Implemented real-time classification via webcam'
      ]
    },
    {
      id: 5,
      title: 'Smart Home Dashboard',
      description: 'IoT dashboard for monitoring and controlling smart home devices with real-time data visualization.',
      longDescription: 'Designed and built an integrated smart home control system that connects with various IoT devices including lights, thermostats, security cameras, and entertainment systems. The dashboard provides real-time monitoring, automated scheduling, and energy usage analytics.',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Node.js', 'MQTT', 'WebSockets', 'Chart.js', 'Raspberry Pi'],
      category: 'iot',
      githubUrl: 'https://github.com/ByteAcumen/smart-home-dashboard',
      liveUrl: '#',
      achievements: [
        'Integrated with 15+ IoT device types and protocols',
        'Created energy consumption analytics that reduced usage by 25%',
        'Built cross-platform compatibility for mobile and desktop'
      ]
    },
    {
      id: 6,
      title: 'Interactive Data Visualization Platform',
      description: 'Web-based data visualization tool that transforms complex datasets into intuitive interactive charts and graphs.',
      longDescription: 'Developed a powerful data visualization platform that enables users to upload, analyze, and visualize complex datasets through interactive charts, graphs, and maps. The application supports various data formats and provides customization options for creating compelling visual stories from data.',
      image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL'],
      category: 'web',
      githubUrl: 'https://github.com/ByteAcumen/data-viz-platform',
      liveUrl: 'https://data-visualization-demo.netlify.app',
      achievements: [
        'Processed and visualized datasets up to 1 million records',
        'Created custom visualization components for specialized data types',
        'Implemented CSV, JSON, and Excel file format support'
      ]
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'iot', label: 'IoT' },
    { id: 'fullstack', label: 'Full Stack' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const openProjectDetails = (project: ProjectType) => {
    setSelectedProject(project);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectDetails = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300 animate-fadein">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fadein">
            <motion.span 
              className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }}
            >
              My Work
            </motion.span>
            
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6"
              onMouseEnter={() => setCursorVariant('text')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Featured <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Projects</span>
            </motion.h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A showcase of my web development projects built with React.js, MERN stack, 
              and modern frontend technologies focused on responsive design and exceptional user experience
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadein-up">
            {filters.map(filter => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {filter.id === 'all' && <Filter size={14} className="inline-block mr-1" />}
                {filter.label}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadein-up">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className={`relative glass rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group animate-fadein-up ${project.featured ? 'md:col-span-2 lg:col-span-1 ring-2 ring-blue-400/40 dark:ring-blue-700/40' : ''}`}
                  style={{ boxShadow: project.featured ? '0 8px 40px 0 rgba(59,130,246,0.13)' : undefined, animationDelay: `${0.2 + index * 0.08}s` }}
                >
                  {/* Project Image with Parallax Hover */}
                  <div className="relative overflow-hidden h-60 group" style={{ perspective: 800 }}>
                    <ProgressiveImage
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 will-change-transform"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute bottom-0 left-0 right-0 p-4 flex space-x-3 z-10">
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-white/30 dark:bg-blue-900/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-lg"
                            whileHover={{ scale: 1.13 }}
                            whileTap={{ scale: 0.93 }}
                          >
                            <Github size={18} />
                          </motion.a>
                        )}
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-blue-600/90 dark:bg-indigo-700/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-blue-700 dark:hover:bg-indigo-600 transition-all shadow-lg"
                            whileHover={{ scale: 1.13 }}
                            whileTap={{ scale: 0.93 }}
                          >
                            <Globe size={18} />
                          </motion.a>
                        )}
                        {project.videoUrl && (
                          <motion.a
                            href={project.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-red-600/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-700 transition-all shadow-lg"
                            whileHover={{ scale: 1.13 }}
                            whileTap={{ scale: 0.93 }}
                          >
                            <Play size={18} />
                          </motion.a>
                        )}
                        <motion.button
                          onClick={() => openProjectDetails(project)}
                          className="w-10 h-10 rounded-full bg-white/30 dark:bg-blue-900/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all shadow-lg"
                          whileHover={{ scale: 1.13 }}
                          whileTap={{ scale: 0.93 }}
                        >
                          <Info size={18} />
                        </motion.button>
                      </div>
                    </motion.div>
                    {project.featured && (
                      <motion.div
                        className="absolute top-4 right-4 z-20"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.2 }}
                      >
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-lg animate-pulse">
                          Featured
                        </span>
                      </motion.div>
                    )}
                    <motion.div
                      className="absolute top-4 left-4 z-20"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.25 }}
                    >
                      <span className="px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full capitalize shadow">
                        {project.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Project Content */}
                  <div className="p-7 flex-grow flex flex-col">
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-base leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.slice(0, 4).map(tech => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.4, type: 'spring' }}
                          className="px-2.5 py-1 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-full shadow-sm border border-blue-100 dark:border-blue-800/40"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="mt-auto">
                      <motion.button
                        onClick={() => openProjectDetails(project)}
                        className="w-full py-2.5 text-center text-blue-600 dark:text-blue-400 font-bold border-t border-gray-100 dark:border-gray-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-gray-700/50 transition-colors rounded-lg"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        View Project Details <ArrowUpRight size={16} className="ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* View More Projects Button */}
          <div className="mt-12 text-center animate-fadein-up">
            <motion.a
              href="https://github.com/ByteAcumen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setCursorVariant('button')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <Github className="inline-block mr-2" size={18} />
              View More Projects on GitHub
            </motion.a>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeProjectDetails}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-72">
                <ProgressiveImage
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                    {selectedProject.category && (
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full mt-2 capitalize">
                        {selectedProject.category}
                      </span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={closeProjectDetails}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech: string) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {selectedProject.achievements && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h3>
                      <ul className="space-y-2">
                        {selectedProject.achievements.map((achievement: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="inline-block w-5 h-5 bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-2 mt-0.5">✓</span>
                            <span className="text-gray-600 dark:text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-black transition-colors"
                    >
                      <Github size={18} className="mr-2" /> View Code
                    </a>
                  )}
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Globe size={18} className="mr-2" /> Live Demo
                    </a>
                  )}
                  {selectedProject.videoUrl && (
                    <a
                      href={selectedProject.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Play size={18} className="mr-2" /> Watch Video
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;