import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar, MapPin, Code, Star, GraduationCap, ExternalLink, Target, } from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import ParticleBackground from './ParticleBackground';
import { AnimatePresence } from 'framer-motion';
import ProgressiveImage from './ProgressiveImage';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 }, 
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.2 + i * 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
  hover: {
    y: -6,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const Experience: React.FC = React.memo(() => {
  const { setCursorVariant } = useCursor();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  const [showModal, setShowModal] = React.useState<{ open: boolean; src: string | null; title: string }>({ open: false, src: null, title: '' });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  const experiences = [
    {
      id: 1,
      role: "Web Developer Intern",
      company: "Crecientech Infosystem",
      period: "Jul 2024 - Sep 2024",
      location: "Bangalore, India",
      description: "Developed responsive web applications using React.js and collaborated in agile development teams to deliver high-quality frontend solutions. Successfully completed the internship and received a certificate.",
      skills: ["React.js", "JavaScript", "HTML/CSS", "API Integration", "Git", "Responsive Design"],
      responsibilities: [
        "Built responsive and intuitive user interfaces using modern React practices",
        "Collaborated with backend teams to integrate APIs and optimize data flow",
        "Implemented modern UI/UX best practices and accessibility standards",
        "Participated in code reviews and contributed to team documentation"
      ],
      logo: "/images.png",
      bgColor: "from-blue-500 to-cyan-500",
      certificate: "/Hemanth_Kumar_Internship_Completion_Letter.pdf"
    },
    {
      id: 2,
      role: "AI/ML Intern",
      company: "Innovitegra Solutions",
      period: "Oct 2024 - Dec 2024",
      location: "Bangalore, India",
      description: "Implemented AI/ML models and algorithms for data analysis and prediction. Worked on integrating machine learning capabilities into web applications. Successfully completed the internship and received a certificate.",
      skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis", "Pandas", "NumPy"],
      responsibilities: [
        "Developed and implemented machine learning models for data analysis",
        "Processed and cleaned large datasets for training AI algorithms",
        "Integrated AI capabilities with web applications for enhanced functionality",
        "Conducted research on emerging AI/ML technologies and methodologies"
      ],
      logo: "/innovitegra_solutions_logo.jpeg",
      bgColor: "from-purple-500 to-violet-500",
      certificate: "/INNOVTEGRA_INTERNSHIP.pdf"
    }
  ];

  return (
    <section id="experience" ref={ref} className="py-28 min-h-[600px] relative overflow-hidden transition-colors duration-300">
      {/* Resume Modal */}
      <AnimatePresence>
        {showModal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal({ open: false, src: null, title: '' })}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal({ open: false, src: null, title: '' })}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/20 dark:bg-white/10 flex items-center justify-center text-white dark:text-gray-200 hover:bg-white hover:text-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 transition-colors z-10"
                aria-label={`Close ${showModal.title}`}
              >
                ✕
              </button>
              <div className="w-full h-[80vh] bg-gray-100 dark:bg-gray-800 flex items-center justify-center relative select-none">
                {showModal.src && (
                  <iframe
                    src={showModal.src}
                    title={`${showModal.title} PDF`}
                    className="w-full h-full border-0 rounded-b-2xl"
                    loading="lazy"
                  />
                )}
                {/* Overlay to block right-click/context menu */}
                <div
                  style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}
                  onContextMenu={e => e.preventDefault()}
                  tabIndex={-1}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' } } }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.span 
            className="inline-block px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4 sm:mb-6 shadow-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={controls}
            variants={{ visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } } }}
          >
            Experience
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight"
            onMouseEnter={() => setCursorVariant('text')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            Professional <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Journey</span>
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={controls}
            variants={{ visible: { opacity: 1, transition: { duration: 0.6, delay: 0.4 } } }}
          >
            My internships and professional experience in web development and artificial intelligence.
          </motion.p>
        </motion.div>
        {/* Experience Cards */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              custom={index}
              initial="hidden"
              animate={controls}
              variants={cardVariants}
              whileHover="hover"
              className="relative"
            >
              <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
                {/* Left Column: Company Info */}
                <div className="lg:col-span-4">
                  <motion.div 
                    className="bg-white/80 dark:bg-gray-900/80 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col items-center justify-center text-center backdrop-blur-sm hover:bg-white/95 dark:hover:bg-gray-900/95 hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                  >
                    {/* Company Logo */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden mb-4 sm:mb-6 border-2 border-gray-200 dark:border-gray-600">
                      <ProgressiveImage
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{exp.company}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{exp.location}</p>
                    
                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 mb-6">
                      <Calendar size={16} className="mr-2" />
                      <span>{exp.period}</span>
                    </div>
                    
                    <motion.a 
                      onClick={() => setShowModal({ open: true, src: exp.certificate, title: `${exp.company} Certificate` })}
                      className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span>View Certificate</span>
                      <ExternalLink size={14} className="ml-2" />
                    </motion.a>
                  </motion.div>
                </div>
                
                {/* Right Column: Experience Details */}
                <div className="lg:col-span-8">
                  <motion.div 
                    className="bg-white/80 dark:bg-gray-900/80 p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 h-full backdrop-blur-sm hover:bg-white/95 dark:hover:bg-gray-900/95 hover:shadow-xl transition-all duration-300 flex flex-col"
                    whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${exp.bgColor} bg-opacity-10 text-blue-800 dark:text-blue-200`}>
                          <Briefcase size={12} className="mr-1" />
                          {exp.company}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200">
                          <Calendar size={12} className="mr-1" />
                          {exp.period}
                        </span>
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200">
                          <MapPin size={12} className="mr-1" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm flex-grow">
                      {exp.description}
                    </p>
                    
                    {/* Skills Used */}
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                        <Code size={16} className="mr-2 text-blue-500 dark:text-blue-300" />
                        Skills Applied
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <motion.span 
                            key={skillIndex} 
                            className="px-3 py-1.5 bg-blue-50/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium flex items-center transition-all duration-200 hover:bg-blue-100/90 dark:hover:bg-blue-800/50 hover:scale-105"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={controls}
                            variants={{
                              visible: { opacity: 1, scale: 1, transition: { delay: 0.6 + (skillIndex * 0.1) } }
                            }}
                            whileHover={{ y: -2, scale: 1.05 }}
                          >
                            <Star size={12} className="mr-1" />
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Key Responsibilities */}
                    <div className="pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50 mt-auto">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                        <Target size={16} className="mr-2 text-blue-500 dark:text-blue-300" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((responsibility, respIndex) => (
                          <motion.li 
                            key={respIndex}
                            className="flex items-start group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={controls}
                            variants={{
                              visible: { opacity: 1, x: 0, transition: { delay: 0.8 + (respIndex * 0.1) } }
                            }}
                          >
                            <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-400 mt-2 mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                            <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">{responsibility}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Decorative Line */}
              {index !== experiences.length - 1 && (
                <div className="hidden lg:block w-1 h-16 bg-gradient-to-b from-blue-500 to-indigo-500 mx-auto my-8 opacity-40"></div>
              )}
            </motion.div>
          ))}
        </div>
        
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.8 } }
          }}
          className="mt-20 sm:mt-24"
        >
          <div className="text-center mb-12">
            <motion.span 
              className="inline-block px-4 py-2 bg-green-100/80 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4 sm:mb-6 shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 1.0 } }
              }}
            >
              Education
            </motion.span>
            <motion.h3 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
              onMouseEnter={() => setCursorVariant('text')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              Academic <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Background</span>
            </motion.h3>
          </div>
          
          <motion.div
            className="bg-white/80 dark:bg-gray-900/80 rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:bg-white/95 dark:hover:bg-gray-900/95 hover:shadow-xl transition-all duration-300"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
              {/* Left Column: University Info */}
              <div className="lg:col-span-4 text-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-4 sm:mb-6 rounded-xl overflow-hidden border-2 border-gray-200/50 dark:border-gray-600/50">
                  <ProgressiveImage
                    src="/1631348977484.jpeg"
                    alt="Presidency University logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                  Presidency University
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Bangalore, Karnataka, India</p>
                <div className="flex items-center justify-center text-sm text-gray-700 dark:text-gray-200">
                  <Calendar size={16} className="mr-2" />
                  <span>2022 - 2026 (Expected)</span>
                </div>
              </div>
              
              {/* Right Column: Education Details */}
              <div className="lg:col-span-8">
                <div className="mb-6">
                  <h4 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center tracking-tight">
                    Bachelor of Technology
                    <span className="ml-3 px-3 py-1.5 bg-green-50/80 dark:bg-green-900/40 text-green-600 dark:text-green-300 text-sm font-medium rounded-lg">
                      Computer Science Engineering
                    </span>
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                    Currently pursuing a B.Tech in Computer Science Engineering with a focus on AI/ML technologies 
                    and full-stack web development. Maintaining a strong academic record while participating in various 
                    programming competitions, hackathons, and technical projects.
                  </p>
                </div>
                
                <div className="pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                    <GraduationCap size={16} className="mr-2 text-green-500 dark:text-green-300" />
                    Key Coursework
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                      "Data Structures & Algorithms", 
                      "Database Management Systems",
                      "Machine Learning",
                      "Computer Networks",
                      "Object-Oriented Programming", 
                      "Web Development",
                      "Operating Systems",
                      "Software Engineering",
                      "Computer Architecture"
                    ].map((course, idx) => (
                      <motion.div 
                        key={idx}
                        className="px-3 sm:px-4 py-2 bg-gray-50/80 dark:bg-gray-700/50 rounded-lg text-gray-700 dark:text-gray-200 text-sm font-medium transition-all duration-200 hover:bg-gray-100/90 dark:hover:bg-gray-600/60 hover:scale-105"
                        initial={{ opacity: 0, y: 10 }}
                        animate={controls}
                        variants={{
                          visible: { opacity: 1, y: 0, transition: { delay: 1.2 + (idx * 0.05) } }
                        }}
                        whileHover={{ y: -2, scale: 1.05 }}
                      >
                        {course}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

export default Experience;