interface Skill {
  name: string;
  logo: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const allSkills = [
    { name: 'JavaScript', logo: '/skill-logos/javascript.svg', level: 90 },
    { name: 'TypeScript', logo: '/skill-logos/typescript.svg', level: 85 },
    { name: 'Python', logo: '/skill-logos/python.svg', level: 80 },
    { name: 'HTML5', logo: '/skill-logos/html.svg', level: 95 },
    { name: 'CSS3', logo: '/skill-logos/css.svg', level: 90 },
    { name: 'React', logo: '/skill-logos/react.svg', level: 95 },
    { name: 'Next.js', logo: '/skill-logos/nextjs.svg', level: 80 },
    { name: 'Angular', logo: '/skill-logos/angular.svg', level: 75 },
    { name: 'Tailwind CSS', logo: '/skill-logos/tailwind.svg', level: 90 },
    { name: 'Bootstrap', logo: '/skill-logos/bootstrap.svg', level: 85 },
    { name: 'Node.js', logo: '/skill-logos/nodejs.svg', level: 85 },
    { name: 'React Router', logo: '/skill-logos/react-router.svg', level: 80 },
    { name: 'jQuery', logo: '/skill-logos/jquery.svg', level: 75 },
    { name: 'TensorFlow', logo: '/skill-logos/tensorflow.svg', level: 70 },
    { name: 'C++', logo: '/skill-logos/cpp.svg', level: 75 },
    { name: 'Adobe', logo: '/skill-logos/adobe.svg', level: 80 },
    { name: 'Figma', logo: '/skill-logos/figma.svg', level: 85 },
];

const skillsData: SkillCategory[] = [
  {
    category: 'Frontend Development',
    skills: [
      { name: 'JavaScript', logo: '/skill-logos/javascript.svg', level: 90 },
      { name: 'TypeScript', logo: '/skill-logos/typescript.svg', level: 85 },
      { name: 'React', logo: '/skill-logos/react.svg', level: 95 },
      { name: 'Next.js', logo: '/skill-logos/nextjs.svg', level: 80 },
      { name: 'Angular', logo: '/skill-logos/angular.svg', level: 75 },
      { name: 'HTML5', logo: '/skill-logos/html.svg', level: 95 },
      { name: 'CSS3', logo: '/skill-logos/css.svg', level: 90 },
      { name: 'Tailwind CSS', logo: '/skill-logos/tailwind.svg', level: 90 },
    ]
  },
  {
    category: 'Backend Development',
    skills: [
      { name: 'Node.js', logo: '/skill-logos/nodejs.svg', level: 85 },
      { name: 'Python', logo: '/skill-logos/python.svg', level: 80 },
      { name: 'C++', logo: '/skill-logos/cpp.svg', level: 75 },
    ]
  },
  {
    category: 'Design & Tools',
    skills: [
      { name: 'Figma', logo: '/skill-logos/figma.svg', level: 85 },
      { name: 'Adobe', logo: '/skill-logos/adobe.svg', level: 80 },
      { name: 'Bootstrap', logo: '/skill-logos/bootstrap.svg', level: 85 },
    ]
  },
  {
    category: 'Libraries & Frameworks',
    skills: [
      { name: 'React Router', logo: '/skill-logos/react-router.svg', level: 80 },
      { name: 'jQuery', logo: '/skill-logos/jquery.svg', level: 75 },
      { name: 'TensorFlow', logo: '/skill-logos/tensorflow.svg', level: 70 },
    ]
  }
];

export default skillsData;
export { allSkills };
export type { Skill, SkillCategory };