import React, { useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Heart, 
  ArrowUp, 
  Code, 
  Briefcase,
  MapPin, 
  Phone, 
  Calendar, 
  ExternalLink,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useCursor } from '../contexts/useCursor';
import ParticleBackground from './ParticleBackground'; // Added import for ParticleBackground

const Footer: React.FC = React.memo(() => {
  const { setCursorVariant } = useCursor();
  // No animation effect needed

  const socialLinks = [
    { icon: Github, href: 'https://github.com/H0E0M0A0N0T0', label: 'GitHub', color: 'from-gray-500 to-gray-600' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/h-h-hemanth-kumar-5a6235207', label: 'LinkedIn', color: 'from-blue-500 to-blue-600' },
    { icon: Mail, href: 'mailto:hemanthkumar04hh@gmail.com', label: 'Email', color: 'from-emerald-500 to-emerald-600' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    "Full-Stack Web Development",
    "AI/ML Solutions",
    "Python & Java Development",
    "MEAN Stack Applications",
    "Responsive Web Design",
    "UI/UX Implementation"
  ];
  
  const navigationLinks = [
    { name: "About", link: "about" },
    { name: "Skills", link: "skills" },
    { name: "Projects", link: "projects" },
    { name: "Contact", link: "contact" }
  ];

  return (
    <footer id="footer" className="w-full min-h-[420px] relative overflow-hidden pt-16 pb-6 transition-colors duration-300 text-gray-800 dark:text-white animate-fadein">
      {/* Hero-style Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 glass rounded-2xl shadow-xl animate-fadein-up">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-8 items-start md:items-center mb-10 md:mb-14 animate-fadein-up">
          {/* Brand & Summary */}
          <div className="md:col-span-4 text-center md:text-left flex flex-col items-center md:items-start animate-fadein-up">
            <div className="text-3xl font-bold mb-4 flex items-center justify-center md:justify-start">
              <Zap className="mr-2 text-blue-600 dark:text-blue-400 animate-spin-slow" size={28} />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">H H HEMANTH KUMAR</span>
            </div>
            <p className="text-gray-400 dark:text-gray-400 leading-relaxed max-w-md mb-6">
              Final-year Computer Science student specializing in AI/ML, full-stack development, and quantum computing. Proven ability to architect and deliver high-impact solutions, from AI-powered fintech systems to quantum-enhanced climate models for competitions like the NASA Space Apps Challenge.
            </p>
            <div className="flex space-x-5 mt-2 mb-2">
              {[{icon: Github, href: 'https://github.com/ByteAcumen'}, {icon: Linkedin, href: 'https://linkedin.com/in/h-h-hemanth-kumar'}, {icon: Mail, href: 'mailto:hemanth.kumar04hh@gmail.com'}].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                >
                  <item.icon size={26} className="text-gray-400 hover:text-blue-500 transition-colors" />
                </a>
              ))}
            </div>
          </div>
          {/* Navigation */}
          <div className="md:col-span-2 lg:col-span-2 animate-fadein-up">
            <h3 className="text-lg font-semibold mb-6 text-blue-500 dark:text-blue-400 relative">
              Navigation
              <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 mt-1" />
            </h3>
            <ul className="space-y-3">
              <li><a onClick={() => scrollToTop()} className="text-gray-400 hover:text-blue-500 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-2"></span>Home</a></li>
              {navigationLinks.map((item) => (
                <li key={item.name}><a onClick={() => scrollToSection(item.link)} className="text-gray-400 hover:text-blue-500 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-2"></span>{item.name}</a></li>
              ))}
              <li><a href="public/Resume.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors flex items-center"><span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mr-2"></span>Resume</a></li>
            </ul>
          </div>
          {/* Services */}
          <div className="md:col-span-3 lg:col-span-3 animate-fadein-up">
            <h3 className="text-lg font-semibold mb-6 text-blue-500 dark:text-blue-400 relative">
              Services
              <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 mt-1" />
            </h3>
            <ul className="space-y-3">
              {services.map((service, idx) => (
                <li key={service} className="text-gray-400 flex items-center group transition-transform duration-200"><span className="w-6 h-6 flex items-center justify-center bg-blue-600/10 dark:bg-blue-600/20 rounded-full mr-2"><Code size={14} className="text-blue-600 dark:text-blue-400" /></span>{service}</li>
              ))}
            </ul>
          </div>
          {/* Contact Info */}
          <div className="md:col-span-3 text-center md:text-left animate-fadein-up">
            <h3 className="text-lg font-semibold mb-6 text-blue-500 dark:text-blue-400 relative">
              Get In Touch
              <span className="block w-10 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 mt-1" />
            </h3>
            <div className="space-y-3">
              {[{icon: MapPin, value: 'Yelahanka, Bangalore'}, {icon: Mail, value: 'hemanth.kumar04hh@gmail.com'}, {icon: Phone, value: '+91 8488834807'}, {icon: Linkedin, value: 'linkedin.com/in/h-h-hemanth-kumar', href: 'https://linkedin.com/in/h-h-hemanth-kumar'}, {icon: Github, value: 'github.com/ByteAcumen', href: 'https://github.com/ByteAcumen'}].map((item, i) => (
                <div key={i} className="flex items-center justify-center md:justify-start group transition-transform duration-200">
                  <span className="w-8 h-8 flex items-center justify-center bg-blue-600/10 dark:bg-blue-600/20 rounded-full mr-3"><item.icon size={16} className="text-blue-600 dark:text-blue-400" /></span>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300 underline">{item.value}</a>
                  ) : (
                    <span className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-900/30 to-transparent mb-6" />
        {/* Copyright & Back to Top */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 animate-fadein-up">
          <div className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            <span className="flex items-center">© {new Date().getFullYear()} H H Hemanth Kumar. All rights reserved.</span>
          </div>
          <a onClick={scrollToTop} className="relative group focus:outline-none">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600/40 to-indigo-600/40 blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative p-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors shadow-md">
              <ArrowUp size={20} />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
});

export default Footer;