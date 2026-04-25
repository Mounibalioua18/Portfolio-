import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [statusText, setStatusText] = useState("Welcome");

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Will also be managed by Topology if open, but this is safe
    };
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      }
    });

    // Initial state
    gsap.set(logoRef.current, { scale: 0.8, opacity: 0 });
    gsap.set(textRef.current, { opacity: 1, clipPath: 'inset(0% 100% 0% 0%)' });

    // Logo fades in and zooms
    tl.to(logoRef.current, {
      scale: 1.3,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    })
    // Show text container wiping in from left to right (writing effect)
    .to(textRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.5,
      ease: "power3.inOut"
    }, "-=0.2")
    // Hold for a moment to read the final state
    .to({}, { duration: 0.4 })
    // Slide / fade out the container
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.6,
      ease: "power3.inOut"
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      <div ref={logoRef} className="relative text-white mb-14 -mt-24 w-24 h-24 flex items-center justify-center">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
          <path d="M4 21V4L12 14L20 4V21H16V9.5L12 14.5L8 9.5V21H4Z" />
        </svg>
      </div>
      
      <div className="overflow-hidden pb-6 px-6 pt-2">
        <p 
          ref={textRef}
          className="font-lavishly text-6xl sm:text-[5rem] md:text-[6rem] drop-shadow-sm text-center"
          style={{ color: '#FBFBFD' }}
        >
          {statusText}
        </p>
      </div>
    </div>
  );
};
