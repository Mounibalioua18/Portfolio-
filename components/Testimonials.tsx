import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

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

interface TestimonialCardProps {
  position: number;
  testimonial: {
      tempId: number;
      testimonial: string;
      by: string;
      imgSrc: string;
    };
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  position, 
  testimonial, 
  handleMove, 
  cardSize 
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-10 transition-all duration-700 ease-in-out",
        isCenter 
          ? "z-10 bg-brand-600 text-white border-brand-400" 
          : "z-0 bg-gray-900 text-gray-400 border-white/5 hover:border-brand-500/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(40px 0%, calc(100% - 40px) 0%, 100% 40px, 100% 100%, calc(100% - 40px) 100%, 40px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.3) * position}px)
          translateY(${isCenter ? -30 : position % 2 ? 10 : -10}px)
          rotate(${isCenter ? 0 : position % 2 ? 3 : -3}deg)
          scale(${isCenter ? 1 : 0.85})
        `,
        boxShadow: isCenter ? "0px 20px 50px rgba(16, 185, 129, 0.3)" : "none"
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        className="mb-6 h-14 w-14 rounded-xl object-cover border-2 border-white/10"
      />
      <h3 className={cn(
        "text-lg md:text-xl font-display font-bold leading-snug",
        isCenter ? "text-white" : "text-gray-300"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-10 left-10 right-10 text-xs font-bold uppercase tracking-widest",
        isCenter ? "text-white/60" : "text-gray-500"
      )}>
        — {testimonial.by}
      </p>
    </div>
  );
};

export default function Testimonials({ content }: TestimonialsProps) {
  const [cardSize, setCardSize] = useState(380);
  const [testimonialsList, setTestimonialsList] = useState(content.list);

  // Update list when content changes (language switch)
  useEffect(() => {
    setTestimonialsList(content.list);
  }, [content]);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      setCardSize(window.innerWidth < 640 ? 300 : 380);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section className="relative w-full h-[700px] overflow-hidden bg-gray-950/50 py-24">
      {/* Top Fade Overlay */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030712] to-transparent z-10 pointer-events-none" />

      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20">
        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-brand-500 mb-4">{content.badge}</h2>
        <h3 className="font-display text-4xl font-bold">{content.title} <span className="text-rose-400 drop-shadow-[0_0_10px_rgba(251,113,133,0.3)]">{content.titleHighlight}</span></h3>
      </div>

      <div className="relative h-full flex items-center justify-center">
        {testimonialsList.map((testimonial, index) => {
          const position = index - Math.floor(testimonialsList.length / 2);
          return (
            <TestimonialCard
              key={testimonial.tempId}
              testimonial={testimonial}
              handleMove={handleMove}
              position={position}
              cardSize={cardSize}
            />
          );
        })}
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
        <button
          onClick={() => handleMove(-1)}
          className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="w-14 h-14 glass rounded-full flex items-center justify-center hover:bg-brand-500 hover:text-white transition-all"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}