import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import ParticleBackground from './ParticleBackground';

const GITHUB_USERNAME = 'ByteAcumen';
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80';

const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Jupyter: '#DA5B0B',
  Shell: '#89e051',
  C: '#555555',
  Cpp: '#f34b7d',
  Go: '#00ADD8',
  Dart: '#00B4AB',
  // add more as needed
};

const Projects: React.FC = React.memo(() => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  useEffect(() => {
    async function fetchRepos() {
      setLoading(true);
      try {
        const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
        let data = await res.json();
        if (!Array.isArray(data)) data = [];
        // Filter: only public, non-forked, with description
        data = data.filter((repo: any) => !repo.fork && !repo.private && repo.description);
        // Sort by updated_at desc
        data = data.sort((a: any, b: any) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        // Limit to 8
        data = data.slice(0, 8);
        setRepos(data);
      } catch (e) {
        setRepos([]);
      }
      setLoading(false);
    }
    fetchRepos();
  }, []);

  return (
    <section 
      id="projects" 
      ref={ref}
      className="py-28 min-h-[600px] relative overflow-hidden transition-colors duration-300 will-change-transform will-change-opacity"
    >
      {/* Hero-style Background */}
      <div className="absolute inset-0 z-0 pointer-events-none will-change-transform will-change-opacity">
        {/* Light Theme */}
        <div className="absolute inset-0 block dark:hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-tr from-indigo-100/30 to-purple-100/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.1) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        </div>
        {/* Dark Theme */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1128] via-[#101630] to-[#14213d]" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-600/10 to-indigo-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-tr from-indigo-600/8 to-purple-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(59,130,246,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.15) 1px,transparent 1px)`, backgroundSize: '50px 50px' }} />
        </div>
        {/* ParticleBackground for subtle depth */}
        <ParticleBackground className="opacity-20 dark:opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 dark:to-black/5" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' } } }}
        className="relative z-10 will-change-transform will-change-opacity"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={controls}
              variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
            >
              Recent Work
            </motion.span>
            <motion.div 
              className="mb-10 relative inline-block"
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{ visible: { opacity: 1, transition: { duration: 0.6 } } }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">GitHub Projects</span>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={controls}
                  variants={{ visible: { width: '100%', transition: { duration: 0.8, delay: 0.4 } } }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                ></motion.div>
              </h2>
            </motion.div>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A collection of my latest open-source projects, fetched live from my GitHub profile.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{ visible: { opacity: 1, transition: { duration: 0.6, delay: 0.3 } } }}
              className="grid md:grid-cols-2 gap-8"
            >
              {repos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={controls}
                  variants={{
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      transition: { 
                        duration: 0.5, 
                        delay: 0.4 + index * 0.1 
                      } 
                    }
                  }}
                >
                  <ProjectCard project={{
                    title: repo.name,
                    description: repo.description,
                    image: FALLBACK_IMAGE,
                    technologies: [repo.language || 'Other', ...(repo.topics || [])],
                    githubUrl: repo.html_url,
                    liveUrl: repo.homepage || repo.html_url,
                  }} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
});

export default Projects;