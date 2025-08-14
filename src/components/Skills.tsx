import React, { useRef, useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);
// import { useCursor } from '../contexts/useCursor';

// Skills data with external logos
const allSkills = [
  { name: 'JavaScript', logo: 'https://logos-world.net/wp-content/uploads/2023/02/JavaScript-Logo.png' },
  { name: 'TypeScript', logo: 'https://pngate.com/wp-content/uploads/2025/05/typescript-logo-blue-square-modern-design-icon-1.png' },
  { name: 'Python', logo: 'https://w7.pngwing.com/pngs/747/313/png-transparent-yellow-and-blue-logo-angle-text-symbol-brand-other-python-angle-text-logo.png' },
  { name: 'Java', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'HTML5', logo: 'https://images.icon-icons.com/171/PNG/512/html5_23329.png' },
  { name: 'CSS3', logo: 'https://e7.pngegg.com/pngimages/653/527/png-clipart-white-and-blue-shield-shape-logo-css3-cascading-style-sheets-computer-icons-html-emblem-miscellaneous-blue-thumbnail.png' },
  { name: 'Vue.js', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/888px-Vue.js_Logo_2.svg.png' },
  { name: 'Svelte', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz1RzTzQFA_9h3qbValKOs0mjsATDkHwMOTA&s' },
  { name: 'React', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlGmKtrnxElpqw3AExKXPWWBulcwjlvDJa1Q&s' },
  { name: 'Next.js', logo: 'https://img.icons8.com/color/512/nextjs.png' },
  { name: 'Angular', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/2048px-Angular_full_color_logo.svg.png' },
  { name: 'Tailwind CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png' },
  { name: 'Bootstrap', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/512px-Bootstrap_logo.svg.png?20210507000024' },
  { name: 'Framer Motion', logo: 'https://cdn.worldvectorlogo.com/logos/framer-motion.svg' },
  { name: 'Node.js', logo: 'https://w7.pngwing.com/pngs/307/421/png-transparent-node-js-javascript-web-server-scalable-graphics-chrome-v8-vue-js-angle-text-logo.png' },
  { name: 'Express.js', logo: 'https://w7.pngwing.com/pngs/846/87/png-transparent-mean-solution-stack-express-js-node-js-javascript-github-text-trademark-logo-thumbnail.png' },
  { name: 'MongoDB', logo: 'https://w7.pngwing.com/pngs/956/695/png-transparent-mongodb-original-wordmark-logo-icon-thumbnail.png' },
  { name: 'Firebase', logo: 'https://icon2.cleanpng.com/20190529/bwt/kisspng-firebase-cloud-messaging-google-cloud-messaging-ap-1713889910707.webp' },
  { name: 'PostgreSQL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png' },
  { name: 'Docker', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8q4UdEmQ_JxvrhciVkdxwke7IUgE1ZZcDgw&s' },
  { name: 'Kubernetes', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Kubernetes_logo_without_workmark.svg/1200px-Kubernetes_logo_without_workmark.svg.png' },
  { name: 'TensorFlow', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/800px-Tensorflow_logo.svg.png' },
  { name: 'Qiskit', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGO-McYS0sj1JBBgQA6-QMP49YIJsSQdRjWg&s' },
  { name: 'Pandas', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCpCB6Du8H6Lrm5WIbDcdW59uqoSiL-eeTlw&s' },
  { name: 'NumPy', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5o2UmZneaZUdoop6FljZoAatSeOLn68iRw&s' },
  { name: 'Scikit-learn', logo: 'https://e7.pngegg.com/pngimages/39/4/png-clipart-logo-scikit-learn-python-github-machine-learning-text-orange.png' },
  { name: 'Git', logo: 'https://img.icons8.com/color/512/git.png' },
  { name: 'GitHub', logo: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' },
  { name: 'VS Code', logo: 'https://w7.pngwing.com/pngs/512/824/png-transparent-visual-studio-code-hd-logo-thumbnail.png' },
  { name: 'Postman', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-TB9d5YXwtKhv4NWbpeTBVveYvcxu9gMJng&s' },
  { name: 'Figma', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  { name: 'Jira', logo: 'https://w7.pngwing.com/pngs/992/738/png-transparent-jira-hd-logo-thumbnail.png' },
  { name: 'Slack', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png' },
  { name: 'REST APIs', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL_CvWdyQiIUOMvI208iJGa-yGC92g3szRKw&s' },
  { name: 'GraphQL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png' },
  { name: 'Webpack', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf3MHT7xPiYm7PPutNFEyesphLphfuPC-5rg&s' },
  { name: 'Jest', logo: 'https://cdn.freebiesupply.com/logos/large/2x/jest-logo-png-transparent.png' },
  { name: 'Cypress', logo: 'https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/3/cypress-icon-moigrz5nimpd7rsob0bisu.png/cypress-icon-pg9bdlubveoefqouilbg.png?_a=DATAdtAAZAA0' },
  { name: 'Kotlin', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/1200px-Kotlin_Icon.svg.png' },
  { name: 'Flutter', logo: 'https://img.icons8.com/color/512/flutter.png' },
  { name: 'React Native', logo: 'https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png' },
  { name: 'Wix', logo: 'https://e7.pngegg.com/pngimages/393/72/png-clipart-wix-newest-logo-tech-companies.png' },
  { name: 'Zoho', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-VDJQJrT3yFxKZA9PnwUYEVqeYQcqZ5M7Mw&s' },
  { name: 'IoT', logo: 'https://www.shutterstock.com/image-vector/internet-things-glyph-icon-silhouette-260nw-1172566369.jpg' },
];

interface Skill {
  name: string;
  logo: string;
}

// Clean skill card component without hover glitches
const SkillCard = ({ skill }: { skill: Skill }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="skill-card flex-shrink-0">
      <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-2xl p-3 shadow-lg flex items-center justify-center transition-all duration-300">
        
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl animate-pulse" />
        )}
        
        {/* Skill Logo */}
        {!imageError && (
          <img
            src={skill.logo}
            alt={skill.name}
            className={`w-full h-full object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        
        {/* Error fallback */}
        {imageError && (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white font-bold text-xs">
            {skill.name.charAt(0)}
          </div>
        )}
      </div>
    </div>
  );
};

const Skills = () => {
  const skillsRef = useRef<HTMLElement>(null);
  
  // Smooth scroll effects
  const { scrollYProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"]
  });
  
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);

  // Optimized skill organization for infinite scroll
  const skillRows = useMemo(() => {
    const rows = 3;
    return Array.from({ length: rows }, (_, i) =>
      allSkills.filter((_, idx) => idx % rows === i)
    );
  }, []);

  // Optimized GSAP animations matching Hero section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Single optimized timeline for entrance animations
      const tl = gsap.timeline({ 
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo('.skills-badge', {
          opacity: 0,
          y: 20,
          scale: 0.95
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6
        })
        .fromTo('.skills-title', {
          opacity: 0,
          y: 30
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8
        }, "-=0.4")
        .fromTo('.skills-description', {
          opacity: 0,
          y: 20
        }, {
          opacity: 1,
          y: 0,
          duration: 0.6
        }, "-=0.6")
        .fromTo('.scroll-container', {
          opacity: 0,
          y: 40
        }, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1
        }, "-=0.4");

      // Optimized floating animation with will-change for better performance
      gsap.set('.floating-bg', { willChange: 'transform' });
      gsap.to('.floating-bg', {
        y: -10,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
          each: 0.4,
          repeat: -1,
          yoyo: true
        }
      });
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  // Optimized infinite scroll component without glitches
  const InfiniteSkillRow = ({ skills, reverse = false, speed = 30 }: { 
    skills: Skill[], 
    reverse?: boolean, 
    speed?: number 
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const firstChild = container.firstElementChild as HTMLElement;
      if (!firstChild) return;

      // Calculate total width for seamless loop
      const itemWidth = firstChild.offsetWidth;
      const gap = 24; // 6 * 4 = 24px gap
      const totalWidth = (itemWidth + gap) * skills.length;
      
      // Set initial position and optimize for performance
      gsap.set(container, { 
        x: reverse ? -totalWidth : 0,
        force3D: true,
        willChange: 'transform'
      });
      
      // Create ultra-smooth infinite animation
      const animation = gsap.to(container, {
        x: reverse ? 0 : -totalWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
        force3D: true
      });
      
      return () => {
        animation.kill();
      };
    }, [skills, reverse, speed]);

    // Double the skills for smooth infinite loop
    const duplicatedSkills = [...skills, ...skills];

    return (
      <div 
        className="scroll-container relative overflow-hidden py-3"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        }}
      >
        <div
          ref={containerRef}
          className="flex gap-6 will-change-transform"
          style={{
            width: 'max-content',
            backfaceVisibility: 'hidden'
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <SkillCard 
              key={`${skill.name}-${index}`} 
              skill={skill}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section 
      ref={skillsRef}
      id="skills"
      className="py-20 lg:py-32 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500"
    >
      {/* Optimized Professional Background matching Hero */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale }}
      >
        {/* Clean gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
        
        {/* Minimal floating orbs for depth */}
        <motion.div 
          className="floating-bg absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/8 to-purple-600/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="floating-bg absolute bottom-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-500/6 to-blue-600/6 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-gray-950/20" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          style={{ opacity: opacityFade, scale }}
        >
          {/* Clean Professional Badge */}
          <motion.div className="skills-badge inline-block px-4 py-2.5 bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-xl text-sm font-medium text-blue-600 dark:text-blue-400 shadow-sm mb-6">
            Skills & Technologies
          </motion.div>

          {/* Clean Title matching Hero font sizes */}
          <motion.h2 className="skills-title text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900 dark:text-white">Technical </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </motion.h2>

          {/* Clean Professional Description */}
          <motion.p className="skills-description text-lg leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build 
            <span className="font-medium text-gray-800 dark:text-gray-200"> innovative digital solutions</span>.
          </motion.p>
        </motion.div>

        {/* Clean Infinite Scroll Rows */}
        <div className="space-y-8 lg:space-y-12">
          <InfiniteSkillRow skills={skillRows[0]} reverse={false} speed={35} />
          <InfiniteSkillRow skills={skillRows[1]} reverse={true} speed={40} />
          <InfiniteSkillRow skills={skillRows[2]} reverse={false} speed={32} />
        </div>
      </div>
    </section>
  );
};

export default Skills;