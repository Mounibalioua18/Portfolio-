import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const TECHNOLOGIES = [
  "React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", 
  "JavaScript","Python",  "Java","Kotlin", 
  "Vite", "GSAP", "Networks", "Distributed Systems"
];

export default function TechTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tickerRef.current) return;

    // A simple infinite horizontal scroll
    // The width is roughly the width of a single set of items
    const ctx = gsap.context(() => {
      gsap.to(".ticker-track", {
        xPercent: -50, // Move left by 50% (since we duplicated the list)
        repeat: -1,
        duration: 30,
        ease: "linear",
      });
    }, tickerRef);

    return () => ctx.revert();
  }, []);

  // Double the list for seamless loop
  const tickerItems = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className="py-4 md:py-6 border-y border-brand-100 bg-white overflow-hidden" ref={tickerRef}>
      <div className="ticker-track flex w-max items-center gap-8 md:gap-16 opacity-90 pl-8">
        {tickerItems.map((tech, i) => (
          <div 
            key={`${tech}-${i}`} 
            className="flex items-center gap-6 md:gap-8 min-w-max"
          >
            <span className="font-display text-xl md:text-3xl lg:text-4xl font-medium tracking-tight text-slate-950 pointer-events-none select-none uppercase">
              {tech}
            </span>
            {/* Minimal decorator dot instead of an icon for high-end look */}
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-950"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
