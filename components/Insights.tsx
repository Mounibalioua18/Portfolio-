import React, { useRef } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ARTICLES = [
  {
    title: "Understanding State Machines in Complex React Apps",
    category: "Architecture",
    date: "March 15, 2026",
    readTime: "8 min read",
    link: "#"
  },
  {
    title: "Optimizing Web Performance: Measuring What Matters",
    category: "Performance",
    date: "February 28, 2026",
    readTime: "6 min read",
    link: "#"
  },
  {
    title: "The Intersection of Networking and Front-End Dev",
    category: "Systems",
    date: "January 14, 2026",
    readTime: "12 min read",
    link: "#"
  }
];

export default function Insights() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.insight-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 30 },
      {
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="insights" className="py-32 bg-white relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-950 mb-6">Thoughts & Writing</h2>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight">
              Featured <span className="text-slate-950 italic">Insights</span>
            </h3>
          </div>
          <a href="#" className="hidden md:inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-950 hover:text-blue-950 transition-colors group">
            <span>View All Articles</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-950 transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <a 
              key={i} 
              href={article.link}
              className="insight-card group block border border-slate-200 p-8 hover:border-blue-950 transition-colors bg-brand-50/30 hover:bg-white flex flex-col justify-between h-full min-h-[320px]"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-950 bg-blue-950/5 px-3 py-1 rounded-full">
                    {article.category}
                  </span>
                  <BookOpen size={16} className="text-slate-400 group-hover:text-blue-950 transition-colors" />
                </div>
                
                <h4 className="font-display text-2xl md:text-3xl text-slate-900 font-medium tracking-tight mb-4 group-hover:text-blue-950 transition-colors leading-snug">
                  {article.title}
                </h4>
              </div>

              <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{article.date}</span>
                <span className="text-xs font-medium text-slate-500">{article.readTime}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-slate-950 hover:text-blue-950 transition-colors group">
            <span>View All Articles</span>
            <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-950 transition-colors">
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
