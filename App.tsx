
import React, { useState, useRef, useEffect } from 'react';
import { 
  BrainCircuit, 
  Code2, 
  ChevronRight,
  Mail,
  MessageSquare,
  Home,
  Briefcase,
  Layers,
  GraduationCap,
  Layout,
  Globe,
  Zap,
  Server,
  X,
  Boxes,
  Monitor,
  Award
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Expertise from './components/Expertise';
import Topology from './components/Topology';
import { LoadingScreen } from './components/LoadingScreen';
import TechTicker from './components/TechTicker';
import { ScrollToTop } from './components/ScrollToTop';
import { SKILLS, CONTENT, SOCIALS } from './constants';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const App: React.FC = () => {
  const [isTopologyOpen, setIsTopologyOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const content = CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReady) {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
      // Ensure we hit the top in case of rendering delays
      setTimeout(() => window.scrollTo(0, 0), 50);
    }
  }, [isReady]);

  useEffect(() => {
    // Prevent scroll restoration on page reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Clear hash if present to start fresh
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    window.scrollTo(0, 0);
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    
    // Force scroll to top after a short delay to override browser native behaviors
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isTopologyOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isTopologyOpen]);

  useGSAP(() => {
    // Smooth scrolling for all anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.hash !== '#') {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          
          let duration = 0.8;
          let ease = 'power2.inOut';
          
          let offsetY = 0;
          
          // "Race" effect for Contact section
          if (anchor.hash === '#contact') {
            duration = 0.3; // Much faster! Scroll immediately
            ease = 'power1.inOut'; // Less easing at the start so it moves right away
            
            // Add enough offset so the form starts properly under the navbar
            offsetY = window.innerWidth < 768 ? 60 : 100;
            
            // Set the SVG filter on the middle sections
            gsap.set('#scroll-blur-content', { filter: 'url(#vertical-motion-blur)', willChange: 'filter' });
            
            const blurObj = { y: 0 };
            const feBlur = document.querySelector('#blur-fe');
            
            // Animate the vertical blur
            gsap.to(blurObj, {
              y: 80, // Max vertical stretch (speed lines)
              duration: duration / 2,
              yoyo: true,
              repeat: 1,
              ease: "power1.inOut",
              onUpdate: () => {
                if (feBlur) {
                  feBlur.setAttribute('stdDeviation', `0 ${blurObj.y}`);
                }
              },
              onComplete: () => {
                gsap.set('#scroll-blur-content', { filter: 'none', clearProps: 'willChange' });
              }
            });
          }
          
          gsap.to(window, {
            duration: duration,
            scrollTo: { y: targetElement, offsetY: offsetY },
            ease: ease
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Timeline animations
    const timelineItems = gsap.utils.toArray('.timeline-item');
    timelineItems.forEach((item: any) => {
      gsap.from(item, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 100%",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Project Cards animation
    const projectCards = gsap.utils.toArray('.project-card');
    gsap.fromTo(projectCards, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '#projects',
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Services animation
    const serviceItems = gsap.utils.toArray('.service-item');
    gsap.from(serviceItems, {
      opacity: 0,
      scale: 0.8,
      rotationX: -20,
      y: 40,
      stagger: 0.15,
      duration: 0.8,
      ease: "back.out(1.5)",
      scrollTrigger: {
        trigger: '#services',
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    });

    // Contact animation
    gsap.from('.contact-animate', {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: '#contact',
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });

    // --- SECTION REVEALS ---
    
    // Services Section Reveal (Blur & Gentle Float)
    gsap.fromTo('#services',
      { opacity: 0, filter: 'blur(15px)', y: 80 },
      { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: '#services', start: 'top 85%', toggleActions: 'play none none reverse' } }
    );
    
    // Projects Section Reveal (Heavy Mask/Curtain Expansion)
    gsap.fromTo('#projects',
      { opacity: 0, clipPath: 'inset(20% 10% 20% 10% round 30px)', scale: 1.05 },
      { opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 0px)', scale: 1, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: '#projects', start: 'top 85%', toggleActions: 'play none none reverse' } }
    );
    
    // Experience Section Reveal (Clean Fade Up)
    gsap.fromTo('#experience',
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#experience', start: 'top 85%', toggleActions: 'play none none reverse' } }
    );
    
    // Testimonials Section Reveal (Clean Side Slide)
    gsap.fromTo('#testimonials',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#testimonials', start: 'top 85%', toggleActions: 'play none none reverse' } }
    );
    
    // Contact Section Reveal (Spring Pop)
    gsap.fromTo('#contact',
      { opacity: 0, scale: 0.85, y: 80 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'back.out(2)', scrollTrigger: { trigger: '#contact', start: 'top 90%', toggleActions: 'play none none reverse' } }
    );

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, { scope: containerRef });

  const navItems = [
    { name: content.nav.about, url: '#about', icon: Code2 },
    { name: content.nav.services, url: '#services', icon: Layers },
    { name: content.nav.projects, url: '#projects', icon: Monitor },
    { name: content.nav.experience, url: '#experience', icon: Award },
    { name: content.nav.endorsements, url: '#testimonials', icon: MessageSquare },
    { name: content.nav.contact, url: '#contact', icon: Mail },
  ];

  const TimelineSection = ({ title, items, icon: Icon }: { title: string, items: any[], icon: any }) => (
    <div className="mb-20">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-12 text-center md:text-left">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 shadow-sm border border-brand-100 flex items-center justify-center text-slate-950 shrink-0 mx-auto md:mx-0">
          <Icon size={32} />
        </div>
        <h4 className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{title}</h4>
      </div>
      <div className="space-y-12 md:space-y-16 max-w-3xl mx-auto">
        {items.map((exp, i) => (
          <div 
            key={`${exp.company}-${i}`}
            className="timeline-item relative pl-10 md:pl-16 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-brand-200"
          >
            <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-brand-50" />
            <div className="grid md:grid-cols-12 gap-4 md:gap-10">
              <div className="md:col-span-5 lg:col-span-4 lg:pr-4">
                <p className="text-slate-950 font-bold mb-2 tracking-widest uppercase text-xs">{exp.period}</p>
                <h4 className="text-xl md:text-2xl font-display font-black text-slate-900 mb-1 md:mb-2">{exp.role}</h4>
                <p className="text-slate-950 font-medium text-base md:text-lg">{exp.company}</p>
              </div>
              <div className="md:col-span-7 lg:col-span-8">
                <ul className="space-y-3 md:space-y-4">
                  {exp.description.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start space-x-3 md:space-x-4 text-slate-950 font-medium text-sm md:text-base lg:text-lg leading-relaxed">
                      <ChevronRight size={18} className="text-slate-950 mt-0.5 md:mt-1.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-slate-50 text-slate-950 font-sans selection:bg-brand-500/30" ref={containerRef}>
      {/* SVG Filter for hyper-speed vertical blur */}
      <svg style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }} aria-hidden="true">
        <filter id="vertical-motion-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur id="blur-fe" in="SourceGraphic" stdDeviation="0 0" />
        </filter>
      </svg>
      
      {!isReady && <LoadingScreen onComplete={() => setIsReady(true)} />}
      <Navbar items={navItems} />
      
      <main>
        <Hero content={content.hero} isReady={isReady} />
        
        <div id="scroll-blur-content">
        <div className="w-full h-px border-b border-brand-100" />

                <Expertise />
        <TechTicker />

        <section id="services" className="py-20 bg-brand-50/50 border-t border-brand-100 perspective-1000">
          <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-950 mb-6">{content.services.badge}</h2>
              <h3 className="font-display text-4xl text-slate-900 mb-6 tracking-tight">
                {content.services.title} <span className="text-slate-950 italic">{content.services.titleHighlight}</span>
              </h3>
              <p className="text-slate-950 font-medium md:text-lg leading-relaxed">
                {content.services.description}
              </p>
            </div>

            <div className="flex flex-col border-t border-brand-200">
              {content.services.items.map((service, index) => {
                const icons = [Layout, Server, Globe, Zap];
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={index}
                    className="service-item group border-b border-brand-200 py-6 md:py-8 flex flex-col md:flex-row md:items-start md:items-center justify-between gap-4 md:gap-8 hover:bg-brand-50 transition-colors px-4 md:px-8 rounded-[2rem]"
                  >
                    <div className="flex items-center gap-4 md:gap-6 md:w-1/2">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-brand-100 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <Icon className="text-slate-950" size={24} />
                      </div>
                      <h4 className="text-xl md:text-2xl lg:text-3xl font-display text-slate-400 group-hover:text-slate-900 transition-colors">{service.title}</h4>
                    </div>
                    <p className="text-slate-950 font-medium text-sm md:text-base leading-relaxed md:w-1/2">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="relative py-32 overflow-visible bg-slate-50 z-10 border-t border-brand-100">
          <div className="max-w-7xl mx-auto px-6 relative z-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
              <div className="max-w-xl">
                <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-950 mb-6">{content.projects.badge}</h2>
                <h3 className="font-display text-5xl md:text-6xl text-slate-900 tracking-tight">
                  {content.projects.title} <span className="text-slate-950 italic">{content.projects.titleHighlight}</span>
                </h3>
              </div>
              <p className="text-slate-950 text-lg leading-relaxed max-w-sm font-medium">
                {content.projects.description}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
              {content.projects.list.map((project, i) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={i} 
                  visitBtnText={content.projects.visitBtn} 
                  onOpenTopology={() => setIsTopologyOpen(true)}
                />
              ))}
            </div>
          </div>
        </section>
        
        <section id="experience" className="py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-8">
            <div className="max-w-3xl mb-20 text-center md:text-left">
              <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-950 mb-6">{content.experience.badge}</h2>
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight">
                {content.experience.title} <span className="text-slate-950 italic">{content.experience.titleHighlight}</span>
              </h3>
            </div>
            {/* Updating timeline design colors inside TimelineSection (which needs to be updated but it's defined above) */}
            <TimelineSection title={content.experience.educationTitle} items={content.experience.education} icon={GraduationCap} />
            <TimelineSection title={content.experience.workTitle} items={content.experience.work} icon={Briefcase} />
          </div>
        </section>
        
        <div id="testimonials">
          <Testimonials content={content.testimonials} />
        </div>

        {/* Topology Sandbox Full Screen */}
        {isTopologyOpen && (
          <div className="fixed inset-0 z-[100] flex flex-col bg-black overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-black/80 backdrop-blur-sm border-b border-white/10">
              <div className="text-white/60 font-mono tracking-widest uppercase text-xs sm:text-sm">Interactive Topology Simulation</div>
              <button onClick={() => setIsTopologyOpen(false)} className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-full transition-all font-bold uppercase tracking-widest text-xs border border-white/20">
                <span>Exit</span>
                <X size={18} />
              </button>
            </div>
            
            {/* Topology Sandbox */}
            <div className="flex-1 mt-16 relative bg-black">
              <Topology />
            </div>
          </div>
        )}
        </div>

        <section id="contact" className="py-20 md:py-24 px-4 sm:px-6 bg-brand-50 border-t border-brand-100">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden border border-brand-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="contact-animate relative z-10">
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4 md:mb-6 tracking-tight leading-tight text-slate-900">
                  {content.contact.title} <br /> <span className="text-slate-950 italic">{content.contact.titleHighlight}</span>
                </h3>
                <p className="text-slate-950 font-medium text-sm sm:text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
                  {content.contact.description}
                </p>
                <ContactForm content={content.contact.form} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 bg-slate-950 text-slate-400 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          
          <div 
            className="flex items-center justify-center md:justify-start gap-3 cursor-pointer select-none group"
          >
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-brand-600/5 flex items-center justify-center text-slate-950 bg-white group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_-3px_rgba(20,184,166,0.2)] border border-brand-500/20 relative overflow-hidden">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                 <path d="M4 21V4L12 14L20 4V21H16V9.5L12 14.5L8 9.5V21H4Z" />
               </svg>
             </div>
             <div className="font-serif italic font-bold text-xl tracking-tight flex items-baseline">
               <span className="text-white">Mounib</span>
               <span className="text-slate-400 text-sm font-sans not-italic transition-colors group-hover:text-brand-500 ml-0.5">.dev</span>
             </div>
          </div>

          <p className="text-[10px] text-slate-400 font-medium tracking-wide text-center">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>

          <div className="flex items-center justify-center md:justify-end gap-4">
            {SOCIALS.map((social) => (
              <a 
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-400 transition-colors p-2 hover:bg-brand-500/10 rounded-full"
                aria-label={social.name}
              >
                {React.cloneElement(social.icon as React.ReactElement, { size: 16 })}
              </a>
            ))}
          </div>
          
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
};

export default App;
