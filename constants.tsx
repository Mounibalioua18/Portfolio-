import React from 'react';
import { Project, Skill, Experience, Node } from './types';
import { 
  Github,
  Linkedin
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
  { name: 'LinkedIn', icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/mounib-alioua-2968b5303/' }
];

export const CONTENT = {
  nav: {
    home: 'Home',
    about: 'About',
    projects: 'Projects',
    experience: 'Experience',
    contact: 'Contact',
  },
  hero: {
    role: "Network & Distributed Systems Engineer",
    subtitlePrefix: "Architecture",
    subtitleSuffix: "Security",
    infra: "Next-Gen Infrastructure",
    system: "System Ready"
  },
  about: {
    badge: "Expertise",
    title: "Crafting Scalable",
    titleHighlight: "Digital Solutions.",
    description: "Currently a Master's student in Networks and Distributed Systems, I combine my passion for web development with a deep understanding of complex infrastructures.",
    cards: {
      systems: "Systems",
      systemsDesc: "Network & Distributed",
      web: "Web Dev",
      webDesc: "React & Next.js"
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
        id: '1',
        title: 'MemGrid Engine',
        description: 'A dark-themed focus challenge where players must memorize patterns on a 4x4 grid and initialize the engine to test their cognitive limits.',
        tags: ['Memory Game', 'JavaScript', 'Logic', 'UI/UX'],
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        link: 'https://memgrid.appwrite.network/',
        github: 'https://github.com/Mounibalioua18/Memory-Grid'
      },
      {
        id: '2',
        title: 'Logic Engine 421337',
        description: 'A programmable logic puzzle game featuring command palettes, execution history, and conditional logic slots to navigate a 5x5 grid.',
        tags: ['React', 'JavaScript', 'Game Dev', 'Logic'],
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
        link: 'https://421337.appwrite.network/',
        github: 'https://github.com/Mounibalioua18/1337-logic-game'
      },
      {
        id: '3',
        title: 'RSD Average Calculator',
        description: 'A specialized academic dashboard for Master RSD students to calculate semester averages based on specific module coefficients and exam weights.',
        tags: ['Dashboard', 'React', 'Academic Tool', 'Tailwind'],
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
        link: 'https://rsd1.appwrite.network/',
        github: 'https://github.com/Mounibalioua18/moyenne'
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
        testimonial: "Mounib works 5x faster than anyone else we've hired. He's a creative force.",
        by: "Alex, CEO at TechCorp",
        imgSrc: "https://i.pravatar.cc/150?img=1"
      },
      {
        tempId: 1,
        testimonial: "The attention to detail in his animations is surgical. It transformed our user engagement.",
        by: "Sarah, Design Lead @ Nova",
        imgSrc: "https://i.pravatar.cc/150?img=2"
      },
      {
        tempId: 2,
        testimonial: "I've searched for years for a dev who gets 'feeling'. Mounib gets it instantly.",
        by: "Stephanie, COO at InnovateCo",
        imgSrc: "https://i.pravatar.cc/150?img=3"
      },
      {
        tempId: 3,
        testimonial: "The ROI on the Solaris project was immediate. Engineering excellence at its peak.",
        by: "Victor, CTO @ CloudMasters",
        imgSrc: "https://i.pravatar.cc/150?img=18"
      }
    ]
  },
  contact: {
    title: "Ready to start a",
    titleHighlight: "Project?",
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