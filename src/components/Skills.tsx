"use client";

import { useRef, useEffect, useState } from "react";
import ParticleBackground from './ParticleBackground';
import ProgressiveImage from './ProgressiveImage';
import React from 'react';

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

const InfiniteRow = React.memo(function InfiniteRow({ skills, speed = 1.2, reverse = false }: { skills: typeof allSkills, speed?: number, reverse?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowWidth, setRowWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [repeatCount, setRepeatCount] = useState(2);
  const [scroll, setScroll] = useState(0);

  // Measure row and container width, calculate repeat count
  useEffect(() => {
    function measure() {
      if (rowRef.current && containerRef.current) {
        const singleRowWidth = rowRef.current.scrollWidth / repeatCount;
        const contWidth = containerRef.current.offsetWidth;
        setRowWidth(singleRowWidth);
        setContainerWidth(contWidth);
        // Repeat enough times to cover at least 2x container width
        const minRepeats = Math.ceil((contWidth * 2) / singleRowWidth);
        setRepeatCount(Math.max(2, minRepeats));
      }
    }
    measure();
    const debounced = () => { clearTimeout((window as any)._resizeTimer); (window as any)._resizeTimer = setTimeout(measure, 60); };
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
    // eslint-disable-next-line
  }, [skills]);

  // Animation loop
  useEffect(() => {
    let frame: number;
    let lastTime = performance.now();
    setScroll(reverse ? -rowWidth : 0); // set initial position based on direction
    function animate(now: number) {
      const elapsed = now - lastTime;
      lastTime = now;
      setScroll((prev) => {
        if (reverse) {
          let next = prev + (speed * (elapsed / 16));
          if (next >= 0) return -rowWidth;
          return next;
        } else {
          let next = prev - (speed * (elapsed / 16));
          if (next <= -rowWidth) return 0;
          return next;
        }
      });
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [rowWidth, speed, reverse]);

  // Render the row enough times for seamless loop
  const repeatedSkills = Array.from({ length: repeatCount }, () => skills).flat();

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden touch-pan-x will-change-transform will-change-opacity animate-fadein-up"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        ref={rowRef}
        className="flex w-max items-center gap-8 sm:gap-12 lg:gap-16 will-change-transform will-change-opacity"
        style={{ transform: `translateX(${scroll}px)` }}
      >
        {repeatedSkills.map((skill, index) => (
          <div
            key={`${skill.name}-${index}`}
            className="flex-shrink-0 animate-fadein-up"
            style={{ animationDelay: `${(index % skills.length) * 0.07}s` }}
          >
            <div
              className="relative h-16 w-28 sm:h-20 sm:w-32 glass rounded-xl transition-all duration-300 flex items-center justify-center"
            >
              <ProgressiveImage
                src={skill.logo}
                alt={skill.name}
                className="object-contain p-2 sm:p-3 w-full h-full"
              />
            </div>
            <span className="block mt-2 text-xs sm:text-sm text-gray-800 dark:text-gray-100 text-center font-medium truncate w-full">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

const Skills = React.memo(function Skills() {
  // Split skills into 3 rows
  const rowCount = 3;
  const skillsRows = Array.from({ length: rowCount }, (_, i) =>
    allSkills.filter((_, idx) => idx % rowCount === i)
  );

  return (
    <section className="py-20 sm:py-24 lg:py-28 min-h-[600px] relative overflow-hidden transition-colors duration-300 animate-fadein">
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
      <div className="container mx-auto px-6 max-w-7xl relative z-10 will-change-transform will-change-opacity animate-fadein">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <span className="inline-block px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4 sm:mb-6 shadow-sm">
              Skills & Technologies
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
              Technical <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
              A comprehensive toolkit of modern technologies and frameworks I use to build innovative digital solutions.
            </p>
          </div>
          <div className="space-y-8">
            <InfiniteRow skills={skillsRows[0]} speed={1.2} reverse={false} />
            <InfiniteRow skills={skillsRows[1]} speed={1.2} reverse={true} />
            <InfiniteRow skills={skillsRows[2]} speed={1.2} reverse={false} />
          </div>
        </div>
    </section>
  );
});

export default Skills;