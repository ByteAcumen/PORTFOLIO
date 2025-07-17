import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project }) => {
  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.025, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.10)' }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className={`relative bg-white dark:bg-gradient-to-br dark:from-[#101630] dark:to-[#1e2746] rounded-2xl overflow-hidden shadow-lg transition-all duration-500 border border-blue-100 dark:border-blue-900/40 h-full group`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
      <div className="relative overflow-hidden h-52">
        <ProgressiveImage 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:brightness-95 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-4 right-4 flex space-x-3">
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-white/30 dark:bg-blue-900/40 backdrop-blur-sm rounded-full hover:bg-white/60 dark:hover:bg-blue-900/60 transition-all duration-200 shadow"
            aria-label="View source code"
          >
            <Github size={16} className="text-blue-700 dark:text-blue-300" />
          </a>
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-blue-600/90 dark:bg-indigo-700/80 backdrop-blur-sm rounded-full hover:bg-blue-700 dark:hover:bg-indigo-600 transition-all duration-200 shadow"
            aria-label="View live demo"
          >
            <ExternalLink size={16} className="text-white" />
          </a>
        </div>
      </div>
      <div className="p-6 flex flex-col h-full">
        <h3 className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed line-clamp-3 text-base">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 5).map((tech, index) => (
            <motion.span 
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.07, duration: 0.4, type: 'spring' }}
              className="px-2.5 py-0.5 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 rounded-full shadow-sm border border-blue-100 dark:border-blue-800/40"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2.5 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-full">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>
      </div>
      {project.featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-2.5 py-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full shadow-sm animate-pulse">
            Featured
          </span>
        </div>
      )}
    </motion.div>
  );
});

export default ProjectCard;