import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Brain, Gamepad2, Briefcase, Zap, Cpu } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    });

    tl.from('.about-header', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    })
    .from('.about-card', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1.2)'
    }, "-=0.2");
  }, { scope: containerRef });

  return (
    <section id="mindset" className="py-24 md:py-32 bg-white border-t border-brand-100" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="about-header text-center mb-16 md:mb-20">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-brand-600 mb-3">Behind the Code</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            My <span className="italic">Mindset</span> & Approach
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Problem Solver Engine */}
          <div className="about-card bg-slate-50 rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-brand-300 transition-colors">
            <div className="absolute -right-4 -top-4 text-slate-100 group-hover:text-brand-50 transition-colors">
              <Terminal size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200 mb-6 text-brand-600">
                <Terminal size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">The Automation Engine</h4>
              <p className="text-slate-600 leading-relaxed">
                What drives me? Finding inefficient problems and bypassing them. Whenever I encounter a repetitive task, I don't waste time on it—I quickly build a <strong className="text-slate-900">Python engine</strong> (using APIs like SerpApi) to solve it in seconds. I enjoy engineering solutions that save time and eliminate friction.
              </p>
            </div>
          </div>

          {/* Card 2: AI Power User */}
          <div className="about-card bg-brand-900 rounded-3xl p-8 md:p-10 border border-brand-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-brand-800/50 group-hover:text-brand-800 transition-colors">
              <Cpu size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-brand-800 rounded-xl flex items-center justify-center shadow-sm border border-brand-700 mb-6 text-brand-100">
                <Brain size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4">Smart AI Power User</h4>
              <p className="text-brand-100/80 leading-relaxed font-light">
                I am a heavy, daily user of AI tools, but I use them smartly. I've developed unique methodologies to extract their <strong className="text-white font-medium">maximum potential</strong> while aggressively optimizing token usage. It's not just about prompting; it's about chaining logic efficiently.
              </p>
            </div>
          </div>

          {/* Card 3: The Gamer's Edge */}
          <div className="about-card bg-slate-900 rounded-3xl p-8 md:p-10 border border-slate-800 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-slate-800/50 group-hover:text-slate-800 transition-colors">
              <Gamepad2 size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center shadow-sm border border-slate-700 mb-6 text-brand-400">
                <Gamepad2 size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-white mb-4">The Gamer's Edge (CS2)</h4>
              <p className="text-slate-400 leading-relaxed">
                As an avid CS2 player, I firmly believe high-level gaming cultivates a powerful mindset. It has made me an incredibly <strong className="text-slate-200">fast learner</strong> and refined my <strong className="text-slate-200">critical thinking</strong> abilities under pressure. Every match is a lesson in fast adaptation and strategic execution.
              </p>
            </div>
          </div>

          {/* Card 4: Why Hire Me? */}
          <div className="about-card bg-brand-50 rounded-3xl p-8 md:p-10 border border-brand-200 shadow-sm relative overflow-hidden group hover:border-brand-300 transition-colors">
            <div className="absolute -right-4 -top-4 text-brand-100 group-hover:text-brand-200/50 transition-colors">
              <Briefcase size={120} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-brand-200 mb-6 text-brand-600">
                <Zap size={24} />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Why Hire Me?</h4>
              <ul className="space-y-3">
                {[
                  { title: "Strong Communication", desc: "Clear, transparent, and proactive." },
                  { title: "Business Mindset", desc: "I code for ROI and user impact." },
                  { title: "Fast Learner", desc: "I adapt to new tech stacks swiftly." },
                  { title: "Owner's Mentality", desc: "I'll treat your project like it's mine." }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-2.5 flex-shrink-0"></div>
                    <div>
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
