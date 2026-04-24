import React from 'react';
import { Project, Skill, Experience, Node } from './types';
import { 
  Github,
  Linkedin,
  Instagram
} from 'lucide-react';

// --- Network Topology Constants ---
export const INITIAL_NODES: Node[] = [
  // LAN 1 (Left Side)
  { id: 'pc1', type: 'PC', name: 'PC-A01', ip: '192.168.1.10', x: 180, y: 160, connections: ['sw1'] },
  { id: 'pc2', type: 'PC', name: 'PC-A02', ip: '192.168.1.11', x: 180, y: 440, connections: ['sw1'] },
  
  { id: 'sw1', type: 'SWITCH', name: 'SW-LAN-01', ip: 'VLAN 10', x: 400, y: 300, connections: ['pc1', 'pc2', 'r1'] },
  
  // Core Network (Backbone)
  { id: 'r1', type: 'ROUTER', name: 'RT-CORE-01', ip: '10.0.0.1', x: 590, y: 300, connections: ['sw1', 'r2'] },
  { id: 'r2', type: 'ROUTER', name: 'RT-CORE-02', ip: '10.0.0.2', x: 810, y: 300, connections: ['r1', 'sw2'] },
  
  // LAN 2 (Right Side)
  { id: 'sw2', type: 'SWITCH', name: 'SW-LAN-02', ip: 'VLAN 20', x: 1000, y: 300, connections: ['r2', 'pc3', 'pc4'] },
  
  { id: 'pc3', type: 'PC', name: 'PC-B01', ip: '192.168.2.10', x: 1220, y: 160, connections: ['sw2'] },
  { id: 'pc4', type: 'PC', name: 'PC-B02', ip: '192.168.2.11', x: 1220, y: 440, connections: ['sw2'] },
];

export const COLORS = {
  pc: '#67e8f9', // cyan-300
  switch: '#a5f3fc', // cyan-200
  router: '#2dd4bf', // teal-400
  packet: '#fb7185', // rose-400
  ack: '#34d399', // emerald-400
  link: 'rgba(45, 212, 191, 0.2)',
};

// --- Content ---

export const SKILLS: Skill[] = [
  { name: 'React / Next.js', level: 95, category: 'Frontend' },
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 98, category: 'Frontend' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Distributed Systems', level: 88, category: 'Backend' },
  { name: 'MySQL', level: 85, category: 'Backend' },
  { name: 'Network Engineering', level: 82, category: 'Tools' },
  { name: 'Cisco Packet Tracer', level: 85, category: 'Tools' }
];

export const SOCIALS = [
  { name: 'GitHub', icon: <Github size={20} />, url: 'https://github.com/Mounibalioua18' },
  { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/mounib-alioua-2968b5303/' },
  { name: 'Instagram', icon: <Instagram size={20} />, url: 'https://instagram.com/mounib_alioua' }
];

export const CONTENT = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    services: 'Services',
    contact: 'Contact',
  },
  hero: {
    role: "Full-Stack Web Developer",
    subtitlePrefix: "Front-End",
    subtitleSuffix: "Back-End",
    infra: "Modern Web",
    system: "Ready for Production"
  },
  about: {
    badge: "Expertise",
    title: "Building Modern",
    titleHighlight: "Web Applications.",
    description: "I am a passionate Web Developer with a strong focus on crafting responsive, scalable, and highly performant web applications using the latest JavaScript frameworks and tools.",
    cards: {
      systems: "Front-End",
      systemsDesc: "React, Tailwind, UI/UX",
      web: "Back-End",
      webDesc: "Node.js, Databases, APIs"
    }
  },
  projects: {
    badge: "Portfolio",
    title: "Selected",
    titleHighlight: "Projects",
    description: "A selection of my recent work combining engineering and design.",
    visitBtn: "Visit Website",
    list: [
      {
        id: '4',
        title: 'Interactive Network Topology',
        description: 'An interactive packet tracer and visual networking sandbox. Experience how packets route and navigate through switches and routers in real time.',
        tags: ['Networks', 'React', 'Simulation', 'GSAP'],
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
        link: '#topology',
        github: '#'
      },
      {
        id: '2',
        title: 'ImmoElite',
        description: 'A modern real estate platform showcasing high-end properties with a sleek, responsive design and intuitive user experience.',
        tags: ['Real Estate', 'React', 'Tailwind CSS', 'Web Design'],
        imageUrl: 'https://i.imgur.com/R9UQcV1.jpg',
        link: 'https://immoelites.vercel.app/',
        github: 'https://github.com/Mounibalioua18/IMMOELITE'
      },
      {
        id: '3',
        title: 'RSD S1 Average Calculator',
        description: 'A specialized academic dashboard for Master RSD students to calculate semester averages based on specific module coefficients and exam weights.',
        tags: ['Dashboard', 'React', 'Academic Tool', 'Tailwind'],
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop',
        link: 'https://rsds1.vercel.app/',
        github: 'https://github.com/Mounibalioua18/moyenne'
      }
    ]
  },
  services: {
    badge: "What I Do",
    title: "Website",
    titleHighlight: "Development",
    description: "I specialize in building high-performance, responsive, and visually stunning web applications tailored to your business needs. Explore my projects below to see my work in action, or let's connect to discuss your vision.",
    items: [
      {
        title: "Frontend Engineering",
        description: "Crafting beautiful, interactive user interfaces using React, Next.js, and modern CSS frameworks like Tailwind."
      },
      {
        title: "Full-Stack Solutions",
        description: "Designing reliable backend architecture and data systems to ensure your application can handle data effortlessly."
      },
      {
        title: "Responsive Design",
        description: "Building pixel-perfect layouts that look and work flawlessly across desktop, tablet, and mobile devices."
      },
      {
        title: "Performance Optimization",
        description: "Refactoring and optimizing code architectures for lightning-fast load times and smooth user experiences."
      }
    ]
  },
  experience: {
    badge: "Journey & Career",
    title: "My",
    titleHighlight: "Story",
    educationTitle: "The Journey (Education)",
    workTitle: "Professional Experience",
    education: [
      {
        company: 'USTHB',
        role: 'Master 1 - Computer Science',
        period: 'September 2025 - Present',
        description: [
          'Specialty: Networks & Distributed Computing',
          'Focus: Computer Networks, Distributed Systems.'
        ]
      },
      {
        company: 'Mohamed Khider University Biskra',
        role: 'Bachelor - Computer Science',
        period: '2021 - 2025',
        description: [
          'Specialty: Computer Systems',
          'Skills: Programming, Data Structures, Algorithms, Web Development, Software Engineering'
        ]
      },
      {
        company: 'Bouraoui Ammar High School, Jijel',
        role: 'Baccalaureate Experimental Sciences',
        period: '2019',
        description: ['Graduated with honors.']
      },
      {
        company: 'Certifications',
        role: 'Languages & Skills',
        period: '2024',
        description: [
          'TCF (French) - Level B2 (Oct 2024)',
          'IELTS (English) - Level B2 (Dec 2024)'
        ]
      }
    ],
    work: [
      {
        company: 'Freelance / Web Development',
        role: 'Junior Web Developer',
        period: '2022 - Present',
        description: [
          'Contributed to developing highly reactive dashboard components',
          'Optimized network request patterns to improve performance',
          'Developed reusable UI components for enterprise applications',
          'Designed and developed custom websites for local artisans',
          'Created bespoke web solutions tailored to client needs'
        ]
      },
      {
        company: 'Technical Maintenance',
        role: 'Smartphone Repair Technician',
        period: 'Summer 2025',
        description: [
          'Diagnosed and resolved hardware and software issues on various models',
          'Replaced critical components (screens, batteries, connectors)',
          'Provided preventive maintenance and technical advice to clients'
        ]
      },
      {
        company: 'Management & Service',
        role: 'Fast-Food Manager',
        period: '2014 - 2021',
        description: [
          'Managed inventory and orders',
          'Customer service and cash management',
          'Developed time management skills and ability to work under pressure'
        ]
      }
    ]
  },
  testimonials: {
    badge: "Social Proof",
    title: "Client",
    titleHighlight: "Endorsements",
    list: [
      {
        tempId: 0,
        testimonial: "Mounib delivered our project ahead of schedule. The quality of the React architecture was exactly what our team needed and the design felt extremely polished.",
        by: "David C., Lead Engineer @ TechFlow",
        imgSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
      },
      {
        tempId: 1,
        testimonial: "His ability to bridge the gap between complex backend logic and smooth frontend experiences is rare. The new dashboard he built increased our team's efficiency.",
        by: "Sarah M., Product Manager",
        imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
      },
      {
        tempId: 2,
        testimonial: "Working with him was seamless. He communicated effectively, understood our technical constraints, and provided a highly reliable solution.",
        by: "James L., CTO @ Innovate",
        imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150"
      },
      {
        tempId: 3,
        testimonial: "The animations and interactive elements he added to our landing page significantly boosted our conversion rates. Highly recommended for any frontend work.",
        by: "Emily R., Marketing Director",
        imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
      }
    ]
  },
  contact: {
    title: "Ready to engineer",
    titleHighlight: "the extraordinary?",
    description: "Leave me a message below to discuss your ideas or collaboration opportunities.",
    form: {
      name: "Name",
      email: "Email",
      subject: "How did you hear about me?",
      message: "Message",
      namePlaceholder: "Your full name",
      emailPlaceholder: "your@email.com",
      subjectPlaceholder: "LinkedIn, GitHub, Friend...",
      messagePlaceholder: "Tell me about your project...",
      btn: "Send Message",
      success: "Thank you! Your message has been sent successfully."
    }
  },
  footer: {
    rights: "All rights reserved.",
    stack: "Tech Stack",
    privacy: "Privacy Policy"
  }
};