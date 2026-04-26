import React, { useRef, useState } from 'react';
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
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startProgress = useRef(0);

  const lastX = useRef(0);
  const directionData = useRef(1);

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
      duration: 25, // Make scroll faster
      ease: "none",
      repeat: -1,
    });
  }, { scope: containerRef });

  const handleMouseEnter = () => {
    if (!isDragging) tweenRef.current?.pause();
  };
  
  const handleMouseLeave = () => {
    if (!isDragging) {
      tweenRef.current?.paused(false);
      tweenRef.current?.timeScale(directionData.current);
    }
    else handlePointerUp(); // End drag if mouse leaves
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX || (e as any).touches?.[0]?.clientX;
    lastX.current = startX.current;
    startProgress.current = tweenRef.current?.progress() || 0;
    tweenRef.current?.pause();
    
    // Stop event from bubbling or doing default touch behavior (like scrolling vertically)
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current || !tweenRef.current) return;
    
    const clientX = e.clientX || (e as any).touches?.[0]?.clientX;
    const deltaX = clientX - startX.current;
    
    const currentFrameDelta = clientX - lastX.current;
    if (currentFrameDelta > 0) {
      directionData.current = -1; // moving right
    } else if (currentFrameDelta < 0) {
      directionData.current = 1; // moving left
    }
    lastX.current = clientX;
    
    // Our track consists of duplicated content, so full width is double the "scroll" width
    // Actually the track shifts by xPercent: -50, which equates to offsetWidth / 2.
    const scrollableWidth = trackRef.current.offsetWidth / 2;
    
    // Calculate progress delta (reverse direction: drag right = go backwards in progress)
    const progressDelta = -deltaX / scrollableWidth;
    
    let newProgress = startProgress.current + progressDelta;
    // Wrap around 0 and 1
    newProgress = newProgress - Math.floor(newProgress);
    
    tweenRef.current.progress(newProgress);
  };

  const handlePointerUp = (e?: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      tweenRef.current?.paused(false);
      tweenRef.current?.timeScale(directionData.current);
      if (e) {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      }
    }
  };

  // Duplicate list once to allow smooth infinite scrolling
  const duplicatedList = [...content.list, ...content.list];

  return (
    <section ref={containerRef} className="relative w-full py-32 bg-slate-50 overflow-hidden border-t border-brand-100">
      
      {/* Fancy Background element for soft elegant feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-200/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 testimonial-header text-center">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-slate-950 mb-4">{content.badge}</h2>
        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
          {content.title} <br className="md:hidden" /><span className="text-slate-950">{content.titleHighlight}</span>
        </h3>
      </div>

      <div className="relative flex overflow-x-hidden mt-10 z-20">
        <div 
          ref={trackRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`flex whitespace-nowrap items-stretch gap-6 pl-6 ${isDragging ? "cursor-grabbing" : "cursor-grab"} select-none`}
          style={{ width: "max-content", touchAction: 'pan-y' }}
        >
          {duplicatedList.map((item, index) => (
            <div 
              key={`${item.tempId}-${index}`}
              className="w-[280px] md:w-[380px] shrink-0 bg-white/80 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 hover:shadow-[0_20px_40px_rgb(16,185,129,0.08)] hover:border-brand-200 transition-all duration-500 flex flex-col justify-between whitespace-normal group/card"
            >
              <div>
                <Quote className="text-brand-200 mb-4 group-hover/card:text-brand-400 group-hover/card:scale-110 transition-all duration-300 transform origin-left w-6 h-6 md:w-8 md:h-8" />
                <p className="text-slate-950 text-sm md:text-base font-medium leading-relaxed mb-6 italic">
                  "{item.testimonial}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-5 border-t border-slate-100">
                <img 
                  src={item.imgSrc} 
                  alt={item.by.split(',')[0]}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover ring-2 ring-brand-100"
                  loading="lazy"
                  draggable={false}
                />
                <div className="flex flex-col">
                  <h4 className="font-display font-bold text-slate-900 text-sm md:text-base leading-snug">
                    {item.by.split(',')[0]}
                  </h4>
                  {item.by.includes(',') && (
                    <span className="text-[10px] md:text-xs font-bold text-slate-950 uppercase tracking-wider mt-0.5">
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