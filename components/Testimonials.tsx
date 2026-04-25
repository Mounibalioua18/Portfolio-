import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  content: {
    badge: string;
    title: string;
    titleHighlight: string;
    list: {
      tempId: number;
      testimonial: string;
      by: string;
      imgSrc: string;
    }[];
  }
}

export default function Testimonials({ content }: TestimonialsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    // Reveal animation for section header
    gsap.from('.testimonial-header', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    });

    if (!trackRef.current) return;
    
    // We scroll exactly 50% since we duplicate the list once perfectly
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  const handleMouseEnter = () => tweenRef.current?.pause();
  const handleMouseLeave = () => tweenRef.current?.play();

  // Duplicate list once to allow smooth infinite scrolling
  const duplicatedList = [...content.list, ...content.list];

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-slate-50 overflow-hidden border-t border-brand-100">
      
      {/* Fancy Background element for soft elegant feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 testimonial-header text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-800 mb-4">{content.badge}</h2>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
          {content.title} <br className="md:hidden" /><span className="text-slate-800">{content.titleHighlight}</span>
        </h3>
      </div>

      <div className="relative flex overflow-x-hidden group mt-10 z-20">
        <div 
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex whitespace-nowrap items-stretch gap-6 pl-6 cursor-grab active:cursor-grabbing"
          style={{ width: "max-content" }}
        >
          {duplicatedList.map((item, index) => (
            <div 
              key={`${item.tempId}-${index}`}
              className="w-[280px] md:w-[380px] shrink-0 bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:border-brand-200 transition-all duration-500 flex flex-col justify-between whitespace-normal group/card"
            >
              <div>
                <Quote className="text-brand-200 mb-4 group-hover/card:text-brand-400 group-hover/card:scale-110 transition-all duration-300 transform origin-left w-6 h-6 md:w-8 md:h-8" />
                <p className="text-slate-800 text-sm md:text-base font-medium leading-relaxed mb-6 italic">
                  "{item.testimonial}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-5 border-t border-slate-100">
                <img 
                  src={item.imgSrc} 
                  alt={item.by.split(',')[0]}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-brand-100"
                  loading="lazy"
                />
                <div className="flex flex-col">
                  <h4 className="font-display font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {item.by.split(',')[0]}
                  </h4>
                  {item.by.includes(',') && (
                    <span className="text-[10px] md:text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                      {item.by.split(',')[1].trim()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}