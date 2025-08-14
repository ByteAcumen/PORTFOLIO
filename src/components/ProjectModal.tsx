import React, { useEffect } from 'react';
import { X, ExternalLink, Code2, Calendar, Zap, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCursor } from '../contexts/useCursor';

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    liveUrl: string;
    features: string[];
    technologies: string[];
    category: string;
    year: string;
    status: string;
  };
}

const ProjectModal: React.FC<ProjectModalProps> = ({ open, onClose, project }) => {
  const { setCursor, resetCursor } = useCursor();

  // Handle escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999]" style={{ zIndex: 99999 }}>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={onClose}
              style={{ zIndex: 99999 }}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 20 }}
              className="fixed inset-4 lg:inset-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-[99999] flex flex-col"
              style={{ zIndex: 99999 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                      {project.status}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {project.subtitle}
                  </p>
                </div>
                <div className="flex gap-3">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                    title="View Live Project"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.button
                    onClick={onClose}
                    className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                    title="Close"
                  >
                    <X size={20} />
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Project Image */}
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div className="flex items-center gap-2 text-white">
                        <Calendar size={16} />
                        <span className="text-sm font-medium">{project.year}</span>
                      </div>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg font-medium flex items-center gap-2 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => setCursor('button')}
                        onMouseLeave={resetCursor}
                      >
                        <Eye size={16} />
                        View Live
                      </motion.a>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={18} className="text-yellow-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Project Overview
                      </h3>
                    </div>
                    <div className="prose prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 size={18} className="text-purple-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Key Features
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 size={18} className="text-green-500" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        Technology Stack
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies.map((tech, index) => (
                        <motion.span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-600"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <div className="flex justify-center">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setCursor('button')}
                    onMouseLeave={resetCursor}
                  >
                    <ExternalLink size={20} />
                    Visit Live Project
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectModal;
