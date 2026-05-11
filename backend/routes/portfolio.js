import express from 'express';

const router = express.Router();

// ─── FILL IN YOUR CONTENT HERE ───────────────────────────────────────────────
const portfolioData = {
  hero: {
    name: 'Shruti',
    tagline: 'Building Modern Web Experiences',
    subTagline: 'Full Stack Developer | MERN Stack Enthusiast | Problem Solver',
    ctaText: 'Explore My Work',
    resumeLink: '/resume.pdf',
  },

  about: {
    title: 'About Me',
    description: `I’m a passionate Full Stack Developer and B.Tech Computer Science student who enjoys building modern, scalable, and visually engaging web applications.`,

    description2: `As a fresher, I continuously focus on improving my problem-solving abilities, frontend creativity, backend development, and system design skills. I enjoy learning new technologies, building impactful projects, and creating user experiences that combine performance with clean design.`,

    image: '/profile.jpg',

    stats: [
      { value: '15+', label: 'Projects Built' },
      { value: '2026', label: 'Graduation Year' },
      { value: '8+', label: 'Technologies Learned' },
      { value: '500+', label: 'DSA Problems Learning' },
    ],
  },

  skills: [
    { name: 'React.js', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 88, category: 'Language' },
    { name: 'Node.js', level: 82, category: 'Backend' },
    { name: 'Express.js', level: 80, category: 'Backend' },
    { name: 'MongoDB', level: 78, category: 'Database' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
    { name: 'Three.js', level: 68, category: 'Frontend' },
    { name: 'GSAP', level: 42, category: 'Animation' },
    { name: 'Framer Motion', level: 35, category: 'Animation' },
    { name: 'Java', level: 82, category: 'Language' },
    { name: 'Git & GitHub', level: 84, category: 'Tools' },
    { name: 'Firebase', level: 70, category: 'Backend' },
  ],

  projects: [
    {
      id: 1,
      title: 'AI Powered Customer Support Agent',
      description:
        'An AI-based customer support system capable of answering user queries with intelligent responses.',
      longDescription:
        'Built a full-stack AI-powered support assistant using MERN stack and Gemini API integration. The application provides dynamic responses, clean UI, and real-time interaction features.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Groq API'],
      github: 'https://github.com/Shruti-83/Ai-Integrated-Customer-Support-Agent',
      live: 'https://ai-integrated-customer-support-agen.vercel.app',
      image: '/projects/project1.jpg',
      featured: true,
      color: '#6366f1',
    },

    {
      id: 2,
      title: 'Real-Time Workflow Manager',
      description:
        'A modern task and workflow management application with role-based dashboards.',
      longDescription:
        'Developed a collaborative workflow platform featuring task creation, assignment, authentication, analytics dashboard, and responsive UI using React Context API.',
      tech: ['React','Socket.io','Context API','MongoDB', 'Tailwind CSS', 'Node.js'],
      github: 'https://github.com/Shruti-83/Smart-Manager',
      live: 'https://smart-manager-git-main-shrutis-projects-05b75c37.vercel.app/',
      image: '/projects/project2.jpg',
      featured: true,
      color: '#f59e0b',
    },

    {
      id: 3,
      title: '3D Animated Developer Portfolio',
      description:
        'An immersive developer portfolio with cinematic scroll animations and 3D effects.',
      longDescription:
        'Designed and developed a futuristic portfolio using React, Three.js, Framer Motion, and GSAP with advanced animations and smooth user interactions.',
      tech: ['React', 'Three.js', 'Framer Motion', 'GSAP', 'Tailwind CSS'],
      github: 'https://github.com/Shruti-83/Shruti-s-Portfolio',
      live: 'https://shruti-s-portfolio-kohl.vercel.app/',
      image: '/projects/project3.jpg',
      featured: true,
      color: '#10b981',
    },
  ],

  experience: [
    {
      id: 1,
      role: 'Mentee - Amazon Ml summer Program',
      company: 'Girls Leading Tech',
      duration: 'Aug 2025 – Sep 2025',
      location: 'Remote',
      description:
        'Analyze Data and Build ML Models to Predict Customer Behavior and Optimize Recommendations.',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    },
  ],

  education: [
    {
      id: 1,
      degree: 'Bachelor of Technology in Computer Science',
      institution: 'Maharshi Dayanand University',
      duration: '2022 – 2026',
      description:
        'Focused on software development, data structures & algorithms, database systems, operating systems, and full-stack web technologies.',
    },
  ],

  contact: {
    email: 'shruti.4083@gmail.com',
    phone: '+91 9810133226',
    location: 'Haryana, India',
    github: 'https://github.com/Shruti-83',
    linkedin: 'https://www.linkedin.com/in/shruti-6b58b2257/',
    twitter: 'https://twitter.com/yourusername',
    instagram: 'https://instagram.com/yourusername',
  },
};
// ──────────────────────────────────────────────────────────────────────────────

router.get('/', (req, res) => {
  res.json(portfolioData);
});

export default router;