import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const barWrapperRef = useRef<HTMLDivElement>(null);

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
    gsap.set(barWrapperRef.current, { opacity: 0, y: 10 });
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' });

    // Logo fades in and zooms
    tl.to(logoRef.current, {
      scale: 1.3,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    // Show progress bar container
    .to(barWrapperRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.4")
    // Fill progress bar
    .to(progressRef.current, {
      scaleX: 1,
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.2")
    // Hold for a moment
    .to({}, { duration: 0.2 })
    // Slide / fade out the container
    .to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut"
    });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>

      <div ref={logoRef} className="relative text-emerald-500 mb-8 w-24 h-24 flex items-center justify-center">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
          <path d="M4 21V4L12 14L20 4V21H16V9.5L12 14.5L8 9.5V21H4Z" />
        </svg>
      </div>
      
      <div 
        ref={barWrapperRef}
        className="w-24 h-[2px] bg-emerald-950/50 rounded-full overflow-hidden"
      >
        <div 
          ref={progressRef}
          className="h-full w-full bg-emerald-500 rounded-full"
        />
      </div>
    </div>
  );
};
