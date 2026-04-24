import React, { useRef } from 'react';
import { Code2, Activity, Server, Layers } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { FloatingElements } from './ui/FloatingElements';

interface HeroProps {
  content: {
    role: string;
    subtitlePrefix: string;
    subtitleSuffix: string;
    infra: string;
    system: string;
  };
}

export default function Hero({ content }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to('.hero-overlay', {
      opacity: 0,
      duration: 0.6,
      ease: 'power3.inOut'
    })
    .fromTo('.hero-bento', {
      y: 60,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }, "-=0.3")
    .fromTo('.hero-badge', {
      scale: 0.95,
      y: 10,
      opacity: 0,
    }, {
      scale: 1,
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1
    }, "-=0.8")
    .fromTo('.hero-title-word', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
    }, "-=0.6");

  }, { scope: containerRef });

  return (
    <section id="home" className="relative w-full min-h-screen bg-brand-50 flex flex-col items-center justify-center text-brand-900 selection:bg-brand-200/50 perspective-1000" ref={containerRef}>
      
      {/* Background with a subtle elegant texture */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(212,195,181,0.2)_0%,transparent_100%)] pointer-events-none"></div>
      
      <FloatingElements />

      {/* Starting Overlay */}
      <div className="hero-overlay absolute inset-0 z-50 bg-brand-50 pointer-events-none"></div>

      <div className="w-full max-w-[1400px] flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-6 relative z-10">
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full max-w-6xl">
          
          {/* Main Name/Title Card */}
          <div className="hero-bento lg:col-span-8 bg-white border border-brand-200/60 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 lg:p-14 flex flex-col justify-center relative overflow-hidden group hover:border-brand-300 transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgb(0,0,0,0.1)]">
            
            {/* Watermark M */}
            <div className="absolute right-0 bottom-0 text-brand-50/60 opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 transform translate-x-1/4 translate-y-1/4 pointer-events-none z-0">
               <svg width="320" height="320" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                 <path d="M4 21V4L12 14L20 4V21H16V9.5L12 14.5L8 9.5V21H4Z" />
               </svg>
            </div>
            
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 w-max rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-bold uppercase tracking-[0.2em] mb-8 relative z-10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              {content.role}
            </div>
            
            <h1 className="flex flex-col leading-none mb-6 relative z-10">
              <span className="flex flex-wrap items-end gap-x-3 gap-y-1">
                <span className="hero-title-word font-display font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight text-brand-900 inline-block drop-shadow-sm">Alioua</span>
                <span className="hero-title-word font-display font-medium italic text-4xl md:text-5xl lg:text-6xl text-brand-500 pb-1 inline-block">Mohammed</span>
              </span>
              <span className="mt-1 md:mt-2">
                <span className="hero-title-word font-signature text-6xl md:text-7xl lg:text-[6rem] text-brand-700 tracking-normal drop-shadow-md group-hover:scale-[1.02] transition-transform duration-700 origin-left inline-block">
                  Mounib
                </span>
              </span>
            </h1>

            <p className="hero-title-word max-w-lg text-brand-700 font-medium text-base md:text-lg leading-relaxed mb-10 relative z-10">
              I am a passionate <strong className="text-brand-900">Software Engineer</strong> focused on creating elegant, high-performance web experiences. Deep systemic architecture meets beautiful digital art.
            </p>
            
            <h2 className="hero-badge text-base md:text-xl italic text-brand-700/80 font-display border-t border-brand-100 pt-6 mt-auto w-max relative z-10">
              {content.subtitlePrefix} <span className="text-brand-300 mx-3 font-sans not-italic text-sm">•</span> {content.subtitleSuffix}
            </h2>
          </div>

          {/* Secondary Card 1 - Focus area (replacing old Network box) */}
          <div className="hero-bento xl:flex lg:col-span-4 bg-brand-800 border border-brand-700 shadow-2xl rounded-[2.5rem] p-10 flex flex-col justify-between text-brand-50 hover:-translate-y-2 hover:shadow-[0_30px_70px_-15px_rgba(30,10,0,0.3)] transition-all duration-500 group relative overflow-hidden">
             {/* Radial glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-brand-600/30 blur-[60px] rounded-full group-hover:bg-brand-500/40 transition-colors duration-700"></div>
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div className="w-14 h-14 bg-brand-700/50 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-700 transition-colors shadow-inner">
                 <Server size={26} className="text-brand-300 group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="hero-badge px-4 py-1.5 bg-black/20 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase border border-white/5 backdrop-blur-md">Engineering</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl lg:text-4xl font-normal font-display tracking-tight mb-4 leading-snug">Precision & <span className="italic text-brand-300 drop-shadow-md">Logic</span></h3>
              <p className="text-brand-200/80 font-medium text-sm md:text-base leading-relaxed">
                Currently pursuing a <strong className="text-brand-50 font-semibold">Master's in Networks & Distributed Systems</strong>. Bringing robust systemic thinking to fluid digital experiences.
              </p>
            </div>
          </div>

          {/* Bottom Card 1 - Small Stats / Feature */}
          <div className="hero-bento lg:col-span-4 bg-white border border-brand-200/60 shadow-[0_20px_60px_-15px_rgb(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-10 flex items-center gap-6 hover:border-brand-300 transition-colors group hover:-translate-y-1">
            <div className="w-16 h-16 bg-brand-50 rounded-full border border-brand-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-inner">
               <Layers className="text-brand-600" size={28} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-400 mb-2 group-hover:text-brand-500 transition-colors">Architecture</p>
              <h4 className="text-2xl font-display text-brand-900 tracking-tight">{content.infra}</h4>
            </div>
          </div>

          {/* Bottom Card 2 - Technologies */}
          <div className="hero-bento lg:col-span-8 bg-brand-900 border border-brand-800 shadow-2xl rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden group hover:shadow-[0_30px_70px_-15px_rgba(30,10,0,0.3)] transition-all duration-500">
             {/* Abstract subtle pattern */}
             <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:scale-105 transition-transform duration-1000" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
             
             <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-brand-800 rounded-2xl border border-brand-700 flex items-center justify-center shrink-0 group-hover:border-brand-500 transition-colors shadow-inner group-hover:scale-110 duration-500">
                   <Code2 className="text-brand-300" size={28} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-500 mb-2">Development Stack</p>
                  <h4 className="text-2xl font-display text-white tracking-tight">{content.system}</h4>
                </div>
             </div>
             
             <div className="flex flex-wrap gap-3 relative z-10">
                {['React', 'TypeScript', 'Node.js', 'Next.js'].map((tech, i) => (
                   <span key={tech} className="hero-badge px-5 py-2.5 bg-brand-800/80 backdrop-blur-sm rounded-full text-xs font-semibold tracking-widest uppercase text-brand-200 border border-brand-700/50 shadow-sm hover:bg-brand-700 hover:text-white transition-colors cursor-default" style={{ transitionDelay: `${i * 50}ms` }}>
                     {tech}
                   </span>
                ))}
             </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
