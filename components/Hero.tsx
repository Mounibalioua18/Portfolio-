import React from 'react';
import Topology from './Topology';
import AnimatedBackground from './AnimatedBackground';

interface HeroProps {
  content: {
    role: string;
    subtitlePrefix: string;
    subtitleSuffix: string;
    infra: string;
    system: string;
  };
}

export default function Hero({ content }: HeroProps) {
  return (
    <section id="home" className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-start text-white selection:bg-emerald-500/30">
      {/* High-Performance Moving Background */}
      <AnimatedBackground />
      
      {/* Moving Scanline Overlay */}
      <div className="scanline" />

      {/* Main Hero Content */}
      <div className="w-full max-w-[1400px] flex-grow flex flex-col items-center pt-20 lg:pt-28 relative z-10">
        {/* Personal Info */}
        <div className="text-center space-y-6 mb-8 px-4">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-500/20 bg-black/50 text-emerald-400 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-xl shadow-2xl">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            {content.role}
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl lg:text-9xl font-bold leading-tight tracking-tighter filter drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              Alioua Mohammed <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-600">Mounib</span>
            </h1>
            <h2 className="text-xl lg:text-4xl font-light text-slate-400 uppercase tracking-[0.4em] font-mono">
              {content.subtitlePrefix} <span className="text-emerald-500/60">&</span> {content.subtitleSuffix}
            </h2>
          </div>
        </div>

        {/* Network Topology Hero */}
        <div className="w-full h-[65vh] min-h-[580px] relative px-4">
           <Topology />
        </div>
      </div>

      {/* Hero-specific Footer Overlay */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none z-30">
        <div className="flex gap-10 text-[11px] text-slate-500 uppercase tracking-[0.5em] font-bold bg-black/40 backdrop-blur-md px-10 py-3 rounded-full border border-white/5 shadow-2xl">
          <span className="hidden sm:inline border-r border-white/10 pr-10 text-emerald-500/70">{content.infra}</span>
          <span className="hidden sm:inline opacity-60">{content.system}</span>
        </div>
      </div>

      {/* Smooth Transition Fade */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#030712] z-20 pointer-events-none" />
    </section>
  );
}