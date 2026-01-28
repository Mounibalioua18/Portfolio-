
import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  BrainCircuit, 
  Code2, 
  ChevronRight,
  Mail,
  Terminal,
  Home,
  User,
  Briefcase,
  Layers,
  GraduationCap
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import CircuitBackground from './components/CircuitBackground';
import ConnectedSpaceBackground from './components/ConnectedSpaceBackground';
import AdminDashboard from './components/AdminDashboard';
import { SKILLS, CONTENT, SOCIALS } from './constants';

const GlassFilter = () => (
  <svg className="hidden">
    <defs>
      <filter
        id="container-glass"
        x="-50%"
        y="-50%"
        width="200%"
        height="200%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05 0.05"
          numOctaves="1"
          seed="1"
          result="turbulence"
        />
        <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurredNoise"
          scale="40"
          xChannelSelector="R"
          yChannelSelector="B"
          result="displaced"
        />
        <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
        <feComposite in="finalBlur" in2="finalBlur" operator="over" />
      </filter>
    </defs>
  </svg>
);

const App: React.FC = () => {
  const [showAdmin, setShowAdmin] = useState(false);
  const content = CONTENT;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navItems = [
    { name: content.nav.home, url: '#home', icon: Home },
    { name: content.nav.about, url: '#about', icon: User },
    { name: content.nav.projects, url: '#projects', icon: Layers },
    { name: content.nav.experience, url: '#experience', icon: Briefcase },
    { name: content.nav.contact, url: '#contact', icon: Mail },
  ];

  const handleLogoDoubleClick = () => {
    setShowAdmin(true);
    window.scrollTo(0, 0);
  };

  const TimelineSection = ({ title, items, icon: Icon }: { title: string, items: any[], icon: any }) => (
    <div className="mb-20">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 flex items-center justify-center text-brand-500">
          <Icon size={32} />
        </div>
        <h4 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">{title}</h4>
      </div>
      <div className="space-y-16">
        {items.map((exp, i) => (
          <motion.div 
            key={`${exp.company}-${i}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-16 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-brand-500 before:via-brand-500/20 before:to-transparent"
          >
            <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-brand-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4">
                <p className="text-brand-500 font-bold mb-2 tracking-widest uppercase text-xs">{exp.period}</p>
                <h4 className="text-2xl font-display font-bold text-white mb-2">{exp.role}</h4>
                <p className="text-gray-400 font-medium text-lg">{exp.company}</p>
              </div>
              <div className="lg:col-span-8">
                <ul className="space-y-4">
                  {exp.description.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-4 text-gray-400 text-lg leading-relaxed">
                      <ChevronRight size={18} className="text-brand-500 mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  if (showAdmin) {
    return <AdminDashboard onClose={() => setShowAdmin(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans selection:bg-brand-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-500 origin-left z-[110]" style={{ scaleX }} />

      <Navbar items={navItems} />
      
      <main>
        <Hero content={content.hero} />

        <div className="relative w-full h-px bg-[#030712] z-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
        </div>

        <section id="about" className="py-32 relative overflow-hidden bg-[#030712] z-0">
          <CircuitBackground />
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030712] to-transparent z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-12 gap-20 items-center">
              <div className="lg:col-span-5">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-500 mb-6">{content.about.badge}</h2>
                <h3 className="font-display text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">
                  {content.about.title} <br /> <span className="text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]">{content.about.titleHighlight}</span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-12">
                  {content.about.description}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-8 glass rounded-[2rem] border border-white/5 group hover:border-brand-500/30 transition-all">
                    <BrainCircuit className="text-brand-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <h4 className="font-bold text-white mb-2">{content.about.cards.systems}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{content.about.cards.systemsDesc}</p>
                  </div>
                  <div className="p-8 glass rounded-[2rem] border border-white/5 group hover:border-brand-500/30 transition-all">
                    <Code2 className="text-brand-400 mb-4 group-hover:scale-110 transition-transform" size={40} />
                    <h4 className="font-bold text-white mb-2">{content.about.cards.web}</h4>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{content.about.cards.webDesc}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  {SKILLS.map((skill) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-brand-500/20 transition-all group backdrop-blur-sm"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-bold text-white text-lg group-hover:text-brand-400 transition-colors">{skill.name}</span>
                        <span className="text-xs font-mono text-brand-500 bg-brand-500/10 px-3 py-1 rounded-full">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-500"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1.5, delay: 0.2, ease: "circOut" }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="relative py-32 -mt-12 overflow-visible z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] to-[#020617] -z-20" />
          <ConnectedSpaceBackground />
          <div className="max-w-7xl mx-auto px-6 relative z-20 pt-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-500 mb-6">{content.projects.badge}</h2>
                <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tighter">
                  {content.projects.title} <span className="text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]">{content.projects.titleHighlight}</span>
                </h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                {content.projects.description}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {content.projects.list.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} visitBtnText={content.projects.visitBtn} />
              ))}
            </div>
          </div>
        </section>

        <div className="relative w-full h-px bg-[#030712] z-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
        </div>

        <Testimonials content={content.testimonials} />

        <section id="experience" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-20">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-500 mb-6">{content.experience.badge}</h2>
              <h3 className="font-display text-5xl md:text-6xl font-bold tracking-tighter">
                {content.experience.title} <span className="text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]">{content.experience.titleHighlight}</span>
              </h3>
            </div>
            <TimelineSection title={content.experience.educationTitle} items={content.experience.education} icon={GraduationCap} />
            <TimelineSection title={content.experience.workTitle} items={content.experience.work} icon={Briefcase} />
          </div>
        </section>

        <section id="contact" className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="glass rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <h3 className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight text-white">
                  {content.contact.title} <br /> <span className="text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]">{content.contact.titleHighlight}</span>
                </h3>
                <p className="text-gray-400 text-lg md:text-xl mb-14 max-w-2xl mx-auto leading-relaxed">
                  {content.contact.description}
                </p>
                <ContactForm content={content.contact.form} />
                <div className="flex justify-center space-x-6 mt-16">
                  {SOCIALS.map((social) => (
                    <a 
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 glass flex items-center justify-center rounded-[1.5rem] text-gray-500 hover:text-white hover:bg-white/10 hover:scale-110 transition-all active:scale-95"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none group"
            onDoubleClick={handleLogoDoubleClick}
            title="Double click for secret entry"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-600/20 group-hover:scale-110 transition-transform">
              <Terminal size={22} />
            </div>
            <span className="font-display font-bold tracking-tight text-xl">MOUNIB<span className="text-brand-500">.</span>DEV</span>
          </div>
          
          <p className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} {content.footer.rights}
            <span className="opacity-20 ml-2 text-xs">v1.0.5</span>
          </p>
          
          <div className="flex space-x-10">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-400 transition-colors">{content.footer.stack}</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-400 transition-colors">{content.footer.privacy}</a>
          </div>
        </div>
      </footer>
      <GlassFilter />
    </div>
  );
};

export default App;
