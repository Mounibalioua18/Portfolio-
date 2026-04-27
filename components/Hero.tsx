import React, { useRef } from 'react';
import { Code2, Activity, Server, Layers, Globe } from 'lucide-react';
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

export default function Hero({ content, isReady }: HeroProps & { isReady: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isReady) return;

    const tl = gsap.timeline();

    tl.to('.hero-overlay', {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
    .fromTo('.hero-name-word', {
      y: 40,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
    }, "-=0.1")
    .fromTo('.hero-desc-word', {
      y: 20,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out',
    }, "-=0.8")
    .to('.hero-deco', {
      scale: 1,
      duration: 0.8,
      opacity: 0.8,
      stagger: 0.1,
      ease: 'power4.out'
    }, "-=0.7")
    .to('.hero-line', {
      scaleY: 1,
      duration: 0.6,
      ease: 'expo.out'
    }, "-=0.7")
    .fromTo('.hero-badge', {
      y: 10,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power4.out',
    }, "-=0.6")
    .fromTo('.hero-bento', {
      y: 20,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power4.out',
    }, "-=0.6");

  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section id="home" className="relative w-full min-h-screen bg-white flex flex-col justify-center text-slate-900 selection:bg-slate-200/50 overflow-hidden" ref={containerRef}>
      
      {/* Dramatic Cinematic Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full border-[1px] border-brand-200/40 opacity-50 pointer-events-none hero-deco scale-0"></div>
      <div className="absolute top-[5%] right-[5%] w-[600px] h-[600px] rounded-full border-[1px] border-brand-200/60 opacity-50 pointer-events-none hero-deco scale-0"></div>
      
      <FloatingElements />

      {/* Starting Overlay */}
      <div className="hero-overlay absolute inset-0 z-50 bg-white pointer-events-none"></div>

      <div className="w-full max-w-[1500px] mx-auto px-6 md:px-12 xl:px-16 pt-32 pb-20 relative z-10 flex-grow flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          
          {/* Left Side: Dramatic Typography */}
          <div className="lg:col-span-7 flex flex-col items-start md:items-center lg:items-start relative z-20 text-left md:text-center lg:text-left">
            <div className="hero-badge flex items-center justify-start md:justify-center lg:justify-start gap-4 mb-8 md:mb-12">
               <div className="w-16 h-[2px] bg-blue-950 hidden sm:block"></div>
               <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-950">{content.role}</span>
            </div>

            <h1 className="flex flex-col leading-[0.85] mb-8 w-full relative items-start md:items-center lg:items-start">
              <span className="hero-name-word font-serif italic text-[5.5rem] md:text-[8rem] lg:text-[10rem] xl:text-[11rem] tracking-tight text-blue-950 drop-shadow-sm self-start md:self-auto lg:self-start z-10">
                Mounib
              </span>
              <span className="hero-name-word font-display font-bold text-[5.5rem] md:text-[8rem] lg:text-[10rem] xl:text-[11.5rem] tracking-tighter text-slate-950 -mt-1 md:-mt-2 lg:-mt-3 drop-shadow-sm self-start md:self-auto lg:self-start lg:ml-12 md:mr-2 z-0">
                Alioua
              </span>
            </h1>

            <div className="hero-desc-word w-full max-w-xl mb-12 mt-4 md:mt-8">
              <p className="text-blue-950 font-medium text-xl md:text-2xl leading-relaxed">
                I am a passionate <strong className="text-slate-950 font-bold border-b-2 border-blue-950">Software Engineer</strong> focused on creating elegant, high-performance web experiences. 
                <br className="hidden md:block" /> Deep systemic architecture meets digital art.
              </p>
            </div>
            
            {/* Stats & Actions */}
            <div className="hero-bento flex flex-col md:flex-row items-start md:items-center gap-8 mt-4 w-full">
               {/* Minimalist Data Point */}
               <div className="flex items-center gap-5 group">
                 <div className="w-14 h-14 rounded-full border border-blue-950/20 flex items-center justify-center relative overflow-hidden shrink-0">
                   <div className="absolute inset-0 bg-blue-950/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                   <Server size={18} className="text-blue-950 relative z-10 group-hover:rotate-12 transition-transform duration-500" />
                 </div>
                 <div>
                   <p className="text-[10px] font-bold text-blue-950 uppercase tracking-[0.25em] mb-1 group-hover:text-blue-950 transition-colors">
                     Current Focus
                   </p>
                   <p className="text-slate-900 font-serif italic text-lg leading-snug">
                     Master's in Networks and distributed systems.
                   </p>
                 </div>
               </div>

               <div className="w-[1px] h-12 bg-blue-950/20 hidden md:block"></div>

               {/* Languages */}
               <div className="flex items-center gap-5 group">
                 <div className="w-14 h-14 rounded-full border border-blue-950/20 flex items-center justify-center relative overflow-hidden shrink-0">
                   <div className="absolute inset-0 bg-blue-950/5 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full"></div>
                   <Globe size={18} className="text-blue-950 relative z-10 group-hover:-rotate-12 transition-transform duration-500" />
                 </div>
                 <div className="flex flex-col">
                   <p className="text-[10px] font-bold text-blue-950 uppercase tracking-[0.25em] mb-1 group-hover:text-blue-950 transition-colors">
                     Languages
                   </p>
                   <p className="text-slate-900 font-serif italic text-lg leading-snug">
                     Arabic, French <span className="font-sans text-xs mx-1 text-slate-400 not-italic">&</span> English.
                   </p>
                 </div>
               </div>
            </div>

            <div className="hero-bento mt-8 md:mt-10 w-full flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
               <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-blue-950 text-white font-bold tracking-widest uppercase text-xs sm:text-sm hover:bg-slate-900 transition-colors relative overflow-hidden group">
                 <span className="relative z-10 text-white">Contact Me</span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
               </a>
               <a href="#projects" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-slate-900 font-bold tracking-widest uppercase text-xs sm:text-sm border-2 border-slate-900 hover:bg-slate-900 hover:text-white transition-colors relative overflow-hidden group group-hover:text-white">
                 <span className="relative z-10">View Work</span>
               </a>
            </div>
          </div>

          {/* Right Side: Abstract Structural Information */}
          <div className="lg:col-span-5 relative h-full flex flex-col justify-center mt-16 lg:mt-0">
            {/* Dramatic vertical line separator on Desktop */}
            <div className="hidden lg:block absolute left-[2rem] top-8 bottom-8 w-[1px] bg-gradient-to-b from-blue-950 via-blue-900\/50 to-transparent hero-line origin-top transform scale-y-0"></div>
            
            <div className="space-y-16 lg:pl-20 relative">
               
               {/* Data Node 1 */}
               <div className="hero-bento relative group">
                 <div className="absolute -left-8 lg:-left-[5.35rem] top-2 w-3 h-3 bg-white border-2 border-blue-950 rounded-full hidden lg:block group-hover:scale-150 transition-transform duration-500"></div>
                 <span className="text-blue-950 font-mono text-sm tracking-widest block mb-4 group-hover:text-blue-950 transition-colors">01 // INFRASTRUCTURE</span>
                 <h4 className="text-3xl md:text-4xl font-display font-light text-slate-950 tracking-tight mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                   {content.infra}
                 </h4>
                 <p className="text-blue-950 leading-relaxed font-medium text-lg">
                   Designing reliable backend architectures and data systems to ensure your application can handle scale effortlessly.
                 </p>
               </div>

               {/* Data Node 2 */}
               <div className="hero-bento relative group">
                 <div className="absolute -left-8 lg:-left-[5.35rem] top-2 w-3 h-3 bg-white border-2 border-blue-950 rounded-full hidden lg:block group-hover:bg-blue-950 transition-colors duration-500"></div>
                 <span className="text-blue-950 font-mono text-sm tracking-widest block mb-4 group-hover:text-blue-950 transition-colors">02 // DEVELOPMENT STACK</span>
                 <h4 className="text-3xl md:text-4xl font-display font-light text-slate-950 tracking-tight mb-6 group-hover:-translate-y-1 transition-transform duration-500">
                   {content.system}
                 </h4>
                 <div className="flex flex-wrap gap-3">
                    {['React', 'TypeScript', 'Node.js', 'Next.js', 'Java', 'JavaScript'].map((tech) => (
                      <span key={tech} className="px-5 py-2.5 bg-white text-blue-950 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase border border-brand-200 hover:border-blue-950 hover:bg-brand-50 transition-colors shadow-sm cursor-default">
                        {tech}
                      </span>
                    ))}
                 </div>
                 <div className="mt-10">
                   <p className="text-slate-800 font-display text-2xl md:text-3xl leading-snug tracking-tight font-light transition-colors duration-300">
                     I write <strong className="font-bold text-slate-950">Python</strong> to a decent level, exploring <span className="italic font-serif text-slate-600">pixel manipulation</span> by compressing pictures and videos.
                   </p>
                 </div>
               </div>

               {/* Data Node 3 - Philosophy node */}
               <div className="hero-bento relative group pt-2">
                 <div className="absolute -left-8 lg:-left-[5.35rem] top-4 w-3 h-3 bg-white border-2 border-blue-950 rounded-full hidden lg:block group-hover:scale-150 transition-transform duration-500"></div>
                 <span className="text-blue-950 font-mono text-sm tracking-widest block mb-4 group-hover:text-blue-950 transition-colors">03 // PHILOSOPHY</span>
                 <h4 className="text-3xl md:text-4xl font-display font-light text-slate-950 tracking-tight mb-4 group-hover:-translate-y-1 transition-transform duration-500">
                   Precision & Logic
                 </h4>
                 <p className="text-blue-950 leading-relaxed font-medium text-lg">
                   {content.subtitlePrefix} {content.subtitleSuffix}
                 </p>
               </div>
               
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
