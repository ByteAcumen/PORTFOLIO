import React from 'react';
import { Code, Award, Zap } from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import ParticleBackground from './ParticleBackground';
import ProgressiveImage from './ProgressiveImage';

const About: React.FC = React.memo(() => {
  const { setCursorVariant } = useCursor();

  // Card data
  const cards = [
    {
      icon: <Zap size={22} className="text-indigo-500 dark:text-indigo-400" />,
      title: 'Key Strengths',
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {['React & Node.js', 'AI/ML Enthusiast', 'Open Source', 'Hackathon Goer', 'Problem Solver', 'Team Player'].map((item) => (
            <div key={item} className="flex items-center text-gray-700 dark:text-gray-300 group">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
              <span className="text-sm font-medium group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">{item}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: <Code size={22} className="text-purple-500 dark:text-purple-400" />,
      title: 'Tech Stack',
      content: (
        <div className="space-y-4 mt-4">
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Frontend</h4>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-xs font-medium rounded-full transition-all duration-200 hover:bg-blue-100 dark:hover:bg-blue-800/40 hover:scale-105">{tech}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Backend</h4>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express.js', 'MongoDB', 'Python', 'Java'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-medium rounded-full transition-all duration-200 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 hover:scale-105">{tech}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">Tools & Others</h4>
            <div className="flex flex-wrap gap-2">
              {['Git', 'Docker', 'Figma', 'TensorFlow', 'Qiskit'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-xs font-medium rounded-full transition-all duration-200 hover:bg-purple-100 dark:hover:bg-purple-800/40 hover:scale-105">{tech}</span>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Award size={22} className="text-green-500 dark:text-green-400" />,
      title: 'Current Focus',
      content: (
        <div className="space-y-3 mt-4">
          {[
            "Building AI + Quantum-powered projects for sustainability",
            "Learning Next.js, Tailwind CSS, Qiskit, TypeScript, Docker",
            "Contributing to 5+ open-source repositories",
            "Hosting tech workshops and mentoring sessions"
          ].map((item, index) => (
            <div key={index} className="flex items-start group">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-200"></div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{item}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 lg:py-28 min-h-[600px] relative overflow-hidden transition-colors duration-300 animate-fadein">
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
      <div className="container mx-auto px-6 max-w-6xl relative z-10 will-change-transform will-change-opacity">
        <span 
          className="inline-block px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4 sm:mb-6 shadow-sm animate-fadein"
        >
          About Me
        </span>
        <h2 
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight text-center animate-fadein-left"
          onMouseEnter={() => setCursorVariant('text')}
          onMouseLeave={() => setCursorVariant('default')}
        >
          Crafting <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Digital Excellence</span>
        </h2>
        <p 
          className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center mb-12 animate-fadein"
        >
          A passionate final-year Computer Science student from Bangalore, India, specializing in full-stack development and AI/ML technologies with a love for open-source contribution and hackathon participation.
        </p>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-stretch">
          {cards.map((card, i) => (
            <div
              key={card.title}
              className="group h-full animate-fadein-up"
            >
              <div className="flex flex-col items-start justify-start glass p-6 sm:p-8 rounded-2xl h-full transition-all duration-300">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl bg-blue-50/80 dark:bg-blue-900/30 mr-3 sm:mr-4 transition-all duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight">{card.title}</h3>
                </div>
                <div className="flex-1 w-full">{card.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default About;