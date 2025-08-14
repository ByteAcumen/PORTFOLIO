import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  MapPin, 
  Mail, 
  Phone, 
  User, 
  Code2, 
  Database, 
  Globe, 
  Terminal,
  GraduationCap,
  Shield,
  Sparkles,
  Download
} from 'lucide-react';
import { useCursor } from '../contexts/useCursor';

const About: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const sectionRef = useRef<HTMLElement>(null);
  
  // Subtle scroll effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  // Contact information
  const contactInfo = useMemo(() => [
    {
      icon: MapPin,
      label: "Location",
      value: "Bengaluru, India"
    },
    {
      icon: Mail,
      label: "Email", 
      value: "dhruvarunk2@gmail.com",
      href: "mailto:dhruvarunk2@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7338406504",
      href: "tel:+917338406504"
    }
  ], []);

  // Skills with categories
  const skillCategories = useMemo(() => [
    {
      icon: Globe,
      title: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vite", "Framer Motion"]
    },
    {
      icon: Database,
      title: "Backend",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "Flask"]
    },
    {
      icon: Terminal,
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "Linux", "VS Code", "Postman", "Figma"]
    },
    {
      icon: Shield,
      title: "Emerging Tech",
      skills: ["Python", "Machine Learning", "TensorFlow", "Cybersecurity", "Quantum Computing"]
    }
  ], []);

  // Optimized animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      
      tl.fromTo('.about-badge', {
          opacity: 0,
          y: 20,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6
        })
        .fromTo('.about-title', {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, "-=0.4")
        .fromTo('.profile-card', {
          opacity: 0,
          x: -30
        }, {
          opacity: 1,
          x: 0,
          duration: 0.8
        }, "-=0.6")
        .fromTo('.contact-item', {
          opacity: 0,
          x: -20
        }, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1
        }, "-=0.4")
        .fromTo('.main-content', {
          opacity: 0,
          x: 30
        }, {
          opacity: 1,
          x: 0,
          duration: 0.8
        }, "-=0.6")
        .fromTo('.skill-category', {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1
        }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white transition-colors duration-500"
    >
      {/* Background Effects */}
      <motion.div className="absolute inset-0 z-0">
        {/* Gradient background matching header */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90" />
        
        {/* Floating orbs for depth */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-indigo-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/8 to-purple-600/8 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity }}
        >
          <motion.div
            className="about-badge inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-sm font-medium text-white shadow-lg mb-8"
            onMouseEnter={() => setCursor('button')}
            onMouseLeave={() => resetCursor()}
          >
            <User size={16} />
            <Sparkles size={14} className="text-blue-400" />
            About Me
          </motion.div>

          <motion.div className="about-title">
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <div className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent leading-tight">
                About Me
              </div>
            </h2>
          </motion.div>
        </motion.div>

        {/* Main Layout - Two Column */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Sidebar - Profile & Contact */}
          <div className="lg:col-span-4">
            {/* Profile Card */}
            <motion.div 
              className="profile-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-8 shadow-2xl"
              onMouseEnter={() => setCursor('button')}
              onMouseLeave={() => resetCursor()}
            >
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src="/1631348977484.jpeg"
                    alt="Dhruva Runk"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/particle.png";
                    }}
                  />
                </div>
                {/* Status indicator */}
                <div className="absolute bottom-4 right-4 w-6 h-6 bg-emerald-400 rounded-full border-4 border-white/20 animate-pulse"></div>
              </div>

              {/* Name & Title */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Dhruva Runk</h3>
                <p className="text-blue-300 font-medium">Full-Stack Developer</p>
                <p className="text-gray-300 text-sm mt-1">CS Final Year Student</p>
              </div>

              {/* Download Resume Button */}
              <motion.a
                href="/Resume.pdf"
                download
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => setCursor('button')}
                onMouseLeave={() => resetCursor()}
              >
                <Download size={18} />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Contact Information */}
            <motion.div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail size={20} className="text-blue-400" />
                Contact Information
              </h4>
              
              {contactInfo.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div 
                    className="contact-item flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl">
                      <Icon size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{item.label}</p>
                      <p className="text-white font-medium group-hover:text-blue-300 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="block"
                      whileHover={{ x: 4 }}
                      onMouseEnter={() => setCursor('button')}
                      onMouseLeave={() => resetCursor()}
                    >
                      {content}
                    </motion.a>
                  );
                }

                return (
                  <motion.div key={item.label}>
                    {content}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Right Content - Main Description & Skills */}
          <div className="lg:col-span-8">
            <motion.div className="main-content space-y-12">
              {/* Main Description */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <GraduationCap size={28} className="text-blue-400" />
                  Professional Overview
                </h3>
                
                <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                  <p>
                    Dynamic and skilled professional with extensive expertise in <span className="text-blue-400 font-semibold">full-stack development</span>, proficient in the <span className="text-indigo-400 font-semibold">MERN stack</span> and <span className="text-purple-400 font-semibold">Python frameworks</span>. Adept at designing and deploying scalable APIs and leveraging <span className="text-emerald-400 font-semibold">TensorFlow for machine learning</span> applications, including computer vision and predictive analytics.
                  </p>
                  
                  <p>
                    Brings hands-on experience with <span className="text-blue-400 font-semibold">CRM platforms like Zoho and HubSpot</span>, optimizing sales and marketing through practical, impactful projects. Excels in building secure, high-performance, enterprise-grade applications with a strong emphasis on <span className="text-indigo-400 font-semibold">usability and seamless integration</span>.
                  </p>
                  
                  <p>
                    I am passionate about leveraging technology to solve real-world problems and constantly learning new tools and methodologies to enhance my capabilities.
                  </p>
                  
                  <p>
                    Outside of coding, I enjoy exploring new tech trends and contributing to the developer community.
                  </p>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <Code2 size={28} className="text-purple-400" />
                  Technical Expertise
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {skillCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.title}
                        className="skill-category bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                        whileHover={{ y: -4, scale: 1.02 }}
                        onMouseEnter={() => setCursor('button')}
                        onMouseLeave={() => resetCursor()}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                            <Icon size={20} className="text-blue-400" />
                          </div>
                          <h4 className="text-xl font-bold text-white">{category.title}</h4>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill) => (
                            <motion.span
                              key={skill}
                              className="px-3 py-1.5 bg-gradient-to-r from-white/10 to-white/5 text-gray-300 rounded-lg text-sm font-medium border border-white/10 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-200"
                              whileHover={{ scale: 1.05 }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

About.displayName = 'About';

export default About;
