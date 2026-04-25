import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.expertise-title', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power4.out',
    })
    .from('.expertise-card', {
      x: 100,
      rotateY: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.4)',
    }, "-=0.4")
    .from('.expertise-skill', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'back.out(2)',
    }, "-=0.4");

  }, { scope: containerRef });

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-950 perspective-1000" ref={containerRef}>
      {/* Structural background lines avoiding gradients */}
      <motion.div 
        style={{ y: bgY, opacity: 0.5 }}
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem]"
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-white">
        <div className="flex flex-col lg:flex-row gap-20">
          
          {/* Main Title Area */}
          <div className="lg:w-1/2 space-y-6" ref={textRef}>
            <h2 className="expertise-title text-sm font-bold tracking-[0.3em] uppercase text-slate-300">Innovation & Logic</h2>
            <h3 className="expertise-title font-display text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
              Crafting <span className="text-slate-300 underline decoration-8 underline-offset-8">Intelligent</span> Experiences
            </h3>
            <p className="expertise-title text-slate-400 text-lg md:text-xl leading-relaxed max-w-lg font-medium mt-8">
              Moving beyond just writing code, I architect digital solutions that breathe life into ideas. From complex state logic down to buttery smooth animations.
            </p>
            <div className="expertise-title mt-12 grid grid-cols-2 gap-8">
              <motion.div 
                whileHover={{ scale: 1.05, x: 10 }}
                className="border-l-4 border-brand-500 pl-6 cursor-default"
              >
                <h4 className="text-5xl font-black text-white drop-shadow-lg">4+</h4>
                <p className="text-sm text-slate-400 uppercase tracking-widest mt-2 font-bold">Years Coding</p>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05, x: 10 }}
                className="border-l-4 border-brand-500 pl-6 cursor-default"
              >
                <h4 className="text-5xl font-black text-white drop-shadow-lg">20+</h4>
                <p className="text-sm text-slate-400 uppercase tracking-widest mt-2 font-bold">Projects Built</p>
              </motion.div>
            </div>
          </div>
          
          {/* Dynamic Cards / Skills */}
          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6 perspective-1000" ref={cardsRef}>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              className="expertise-card p-8 bg-slate-900 border border-slate-800 shadow-2xl hover:border-brand-500 transition-colors transform-gpu"
            >
               <h4 className="text-xl font-bold mb-4 text-white">Front-End Wizardry</h4>
               <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                 Transforming flat designs into dynamic, interactive interfaces using modern tools.
               </p>
               <div className="flex flex-wrap gap-2">
                 {['React', 'GSAP', 'Framer', 'Tailwind'].map(s => (
                   <span key={s} className="expertise-skill px-3 py-1 bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">{s}</span>
                 ))}
               </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
              className="expertise-card p-8 bg-slate-900 border border-slate-800 shadow-2xl hover:border-brand-500 transition-colors sm:translate-y-12 transform-gpu"
            >
               <h4 className="text-xl font-bold mb-4 text-white">Back-End Logic</h4>
               <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                 Building resilient servers, RESTful APIs, and efficient database architectures.
               </p>
               <div className="flex flex-wrap gap-2">
                 {['Node.js', 'Express', 'SQL', 'NoSQL'].map(s => (
                   <span key={s} className="expertise-skill px-3 py-1 bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">{s}</span>
                 ))}
               </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
              className="expertise-card p-8 bg-slate-900 border border-slate-800 shadow-2xl hover:border-brand-500 transition-colors transform-gpu"
            >
               <h4 className="text-xl font-bold mb-4 text-white">Network & Systems</h4>
               <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                 Understanding the foundational layers of the internet.
               </p>
               <div className="flex flex-wrap gap-2">
                 {['Packet Tracer', 'TCP/IP', 'Linux', 'VLANs'].map(s => (
                   <span key={s} className="expertise-skill px-3 py-1 bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">{s}</span>
                 ))}
               </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, rotateY: -5, rotateX: 5 }}
              className="expertise-card p-8 bg-slate-900 border border-slate-800 shadow-2xl hover:border-brand-500 transition-colors sm:translate-y-12 transform-gpu"
            >
               <h4 className="text-xl font-bold mb-4 text-white">Architecture</h4>
               <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                 Designing scalable application structures for future growth.
               </p>
               <div className="flex flex-wrap gap-2">
                 {['Distributed', 'Microservices', 'Clean Code'].map(s => (
                   <span key={s} className="expertise-skill px-3 py-1 bg-slate-800 text-xs font-bold text-slate-300 border border-slate-700">{s}</span>
                 ))}
               </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
