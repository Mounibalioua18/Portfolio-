import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Brain, Briefcase, Zap, Cpu, Crosshair } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe({ isReady }: { isReady?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isReady) return;

    // Reveal Header
    gsap.from('.about-header', {
      scrollTrigger: {
        trigger: '.about-header',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out'
    });

    // Faster reveal for cards
    gsap.fromTo('.about-card', 
      { opacity: 0, y: 30 },
      {
        scrollTrigger: {
          trigger: '.about-card-grid',
          start: 'top 88%',
          toggleActions: 'play none none reverse',
        },
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power2.out',
        clearProps: 'opacity,transform'
      }
    );

    // Ensure ScrollTrigger is ready
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
  }, { scope: containerRef, dependencies: [isReady] });

  return (
    <section id="mindset" className="relative z-10 py-24 md:py-32 bg-white border-t border-brand-100" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="about-header text-center mb-16 md:mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-600 mb-3">Behind the Code</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            My <span className="italic">Mindset</span> & Approach
          </h3>
        </div>

        <div className="about-card-grid grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-[95%] mx-auto md:max-w-none">
          
          {/* Card 1: Problem Solver Engine */}
          <div className="about-card h-full bg-slate-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-300 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="absolute -right-4 -top-4 text-slate-100 group-hover:text-brand-50 transition-colors">
              <Terminal size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm border border-slate-200 mb-4 text-brand-600">
                <Terminal size={24} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">The Automation Engine</h4>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-grow">
                What drives me? Finding inefficient problems and bypassing them. Whenever I encounter a repetitive task, I don't waste time on it—I quickly build a <strong className="text-slate-900">Python engine</strong> (using APIs like SerpApi) to solve it in seconds. I enjoy engineering solutions that save time and eliminate friction.
              </p>
            </div>
          </div>

          {/* Card 2: AI Power User */}
          <div className="about-card h-full bg-brand-900 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-brand-800 shadow-sm relative overflow-hidden group hover:-translate-y-2 hover:shadow-brand-900/20 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="absolute -right-4 -top-4 text-brand-800/30 group-hover:text-brand-800 transition-colors">
              <Cpu size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-800 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm border border-brand-700 mb-4 text-brand-100">
                <Brain size={24} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">Smart AI Power User</h4>
              <p className="text-sm md:text-base text-brand-100/80 leading-relaxed font-light flex-grow">
                I am a heavy, daily user of AI tools, but I use them smartly. I've developed unique methodologies to extract their <strong className="text-white font-medium">maximum potential</strong> while aggressively optimizing token usage. It's not just about prompting; it's about chaining logic efficiently.
              </p>
            </div>
          </div>

          {/* Card 3: The Gamer's Edge */}
          <div className="about-card h-full bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-800 shadow-sm relative overflow-hidden group hover:-translate-y-2 hover:shadow-black/40 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="absolute -right-4 -top-4 text-slate-800/30 group-hover:text-slate-800 transition-colors">
              <Crosshair size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-800 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm border border-slate-700 mb-4 text-brand-400">
                <Crosshair size={24} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white mb-2">Tactical Mindset</h4>
              <p className="text-sm md:text-base text-slate-400 leading-relaxed flex-grow">
                Competitive <strong className="text-slate-200">CS player since 2015</strong> (CS:GO to CS2). Tactical FPS gaming at a high level isn't just about aim—it's about <strong className="text-slate-200">critical thinking</strong>, instant adaptation, and team synergy. This "clutch" mindset translates directly into how I solve complex engineering hurdles.
              </p>
            </div>
          </div>

          {/* Card 4: Why Hire Me? */}
          <div className="about-card h-full bg-brand-50 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-brand-200 shadow-sm relative overflow-hidden group hover:border-brand-300 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col">
            <div className="absolute -right-4 -top-4 text-brand-100 group-hover:text-brand-200/50 transition-colors">
              <Briefcase size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg md:rounded-xl flex items-center justify-center shadow-sm border border-brand-200 mb-4 text-brand-600">
                <Zap size={24} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Why Hire Me?</h4>
              <ul className="space-y-2 flex-grow">
                {[
                  { title: "Strong Communication", desc: "Clear, transparent, and proactive." },
                  { title: "Business Mindset", desc: "I code for ROI and user impact." },
                  { title: "Fast Learner", desc: "I adapt to new tech stacks swiftly." },
                  { title: "Owner's Mentality", desc: "I'll treat your project like it's mine." }
                ].map((item, idx) => (
                  <li key={idx} className="why-hire-item flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-brand-500 mt-2 flex-shrink-0"></div>
                    <div className="text-xs sm:text-sm">
                      <strong className="text-slate-900 block sm:inline">{item.title}: </strong>
                      <span className="text-slate-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
