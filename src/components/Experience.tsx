import React, { useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  FileText,
  Calendar,
  MapPin,
  Briefcase,
  Sparkles,
  Building2,
} from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import CertificateModal from './CertificateModal';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

type ExperienceProps = Record<string, never>;

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'education' | 'project';
  logo?: string;
  website?: string;
  certificate?: string;
  companyType?: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    company: 'CodeZye Cyber',
    position: 'Lead Software Developer',
    duration: 'May 2025 - Present',
    location: 'Remote',
    companyType: 'Cybersecurity Solutions',
    logo: '/favicon.png',
    website: 'https://codezyecyber.com/',
    description: [
      'Developed a production-ready Cybersecurity Compliance Tool to support secure user verification and regulatory adherence',
      'Contributed to the Codezye website and integrated HubSpot CRM to streamline lead management, automate marketing workflows, and enhance customer engagement with real-time tracking and reporting',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'HubSpot CRM', 'MongoDB', 'AWS'],
    type: 'work',
  },
  {
    id: 2,
    company: 'Innovitegra Solutions',
    position: 'Software Developer Intern',
    duration: 'Oct 2024 – Dec 2024',
    location: 'Remote',
    companyType: 'Identity Verification',
    logo: '/innovitegra_solutions_logo.jpeg',
    certificate: '/INNOVTEGRA_INTERNSHIP.pdf',
    website: 'https://innovtegra.com',
    description: [
      'Developed a production-ready ID Verification System with facial matching and liveness detection to prevent identity fraud',
      'Built a Sanctions Screening System integrated into a secure, role-based dashboard to identify high-risk individuals from global watchlists and support compliance auditing',
    ],
    technologies: ['React', 'Node.js', 'Python', 'Computer Vision', 'AI/ML', 'MongoDB', 'Express'],
    type: 'work',
  },
  {
    id: 3,
    company: 'Crecientech Infosystem',
    position: 'Web Development Intern',
    duration: 'Jul 2024 - Sep 2024',
    location: 'Remote',
    companyType: 'Web Development',
    logo: '/images.png',
    certificate: '/Hemanth_Kumar_Internship_Completion_Letter.pdf',
    description: [
      'Developed full-stack blogging and e-commerce websites using MEAN stack (MongoDB, Express.js, Angular, Node.js)',
      'Implemented responsive interfaces with user authentication, product management, and payment integration',
      'Collaborated with development team to resolve technical challenges and improve user experience',
    ],
    technologies: ['Angular', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
    type: 'work',
  },
];

const Experience: React.FC<ExperienceProps> = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);
  const [certificateOpen, setCertificateOpen] = useState(false);
  const [currentCertificate, setCurrentCertificate] = useState<{
    src: string;
    company: string;
    title: string;
  } | null>(null);

  // Modal handlers
  const openCertificateModal = useCallback((certificate: string, company: string, position: string) => {
    setCurrentCertificate({ src: certificate, company, title: `${position} Certificate` });
    setCertificateOpen(true);
  }, []);

  const closeCertificateModal = useCallback(() => {
    setCertificateOpen(false);
  }, []);

  // Smooth and faster entrance on scroll
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-header',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
      );

      gsap.utils.toArray<HTMLElement>('.experience-card').forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none', once: true },
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: index * 0.06,
            ease: 'power2.out',
            clearProps: 'transform'
          }
        );
      });

      gsap.to('.floating-orb', {
        y: -10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      {/* Hero-like Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        <div className="floating-orb absolute top-1/4 right-1/5 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-purple-600/8 rounded-full blur-3xl" />
        <div className="floating-orb absolute bottom-1/4 left-1/6 w-80 h-80 bg-gradient-to-r from-indigo-500/6 to-blue-600/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-gray-950/20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="experience-header text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-300 shadow-lg mb-8"
            whileHover={{ scale: 1.02, y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <Briefcase size={18} className="text-blue-600 dark:text-blue-400" />
            Professional Journey
            <Sparkles size={16} className="text-purple-400" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A snapshot of roles, impact, and the technologies I used
          </p>
        </div>

        {/* Experience Cards */}
        <div className="space-y-8 max-w-5xl mx-auto mb-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-card group relative bg-white/80 dark:bg-white/10 backdrop-blur-2xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-white/10 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              viewport={{ once: true, margin: '-60px' }}
              whileHover={{ y: -6, transition: { duration: 0.18 } }}
              onHoverStart={() => setCursor('button')}
              onHoverEnd={() => resetCursor()}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 p-6 lg:p-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                    {exp.logo && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-white/5 flex items-center justify-center">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="max-w-full max-h-full object-contain p-2"
                          loading="lazy"
                          width="64"
                          height="64"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {exp.position}
                      </h3>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{exp.company}</p>
                      {exp.companyType && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.companyType}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-lg">
                        <Calendar size={14} />
                        <span className="font-medium">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-lg">
                        <MapPin size={14} />
                        <span className="font-medium">{exp.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 text-blue-700 dark:text-blue-400 rounded-lg transition-colors duration-200 hover:bg-white/80 dark:hover:bg-white/10"
                          aria-label={`Visit ${exp.company} website`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {exp.certificate && (
                        <button
                          type="button"
                          onClick={() => openCertificateModal(exp.certificate!, exp.company, exp.position)}
                          className="px-3 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow hover:shadow-md transition-all duration-200"
                          aria-label={`View ${exp.position} certificate`}
                        >
                          <FileText size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Building2 size={16} className="text-indigo-600 dark:text-indigo-400" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">Key Responsibilities</h4>
                  </div>
                  <ul className="space-y-3">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1.5 text-xs rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 text-gray-700 dark:text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      <CertificateModal
        open={certificateOpen}
        onClose={closeCertificateModal}
        src={currentCertificate?.src || ''}
        title={currentCertificate?.title}
        company={currentCertificate?.company}
      />
    </section>
  );
};

export default Experience;