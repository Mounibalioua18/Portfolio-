import React, { useRef } from 'react';
import { ExternalLink, Github, Play } from 'lucide-react';
import { Project } from '../types';
import { LiquidButton } from './ui/LiquidButton';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  index: number;
  visitBtnText: string;
  onOpenTopology?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, visitBtnText, onOpenTopology }) => {
  const isTopology = project.link === '#topology';
  const boundingRef = useRef<HTMLDivElement>(null);

  // 3D Tilt logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 30, stiffness: 400 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 30, stiffness: 400 });
  const mouseXSpring = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const mouseYSpring = useSpring(mouseY, { damping: 30, stiffness: 400 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!boundingRef.current) return;
    const rect = boundingRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = x / rect.width - 0.5;
    const yPct = y / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (isTopology && onOpenTopology) {
      onOpenTopology();
    } else {
      window.open(project.link, '_blank');
    }
  };

  return (
    <motion.div
      ref={boundingRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="project-card group relative bg-white rounded-[1.5rem] border border-brand-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:border-brand-500 hover:shadow-2xl hover:shadow-brand-500/20 transition-colors flex flex-col sm:flex-row h-full w-full"
    >
      <motion.div 
        className="absolute inset-0 pointer-events-none rounded-[1.5rem] z-20"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${useTransform(mouseXSpring, [-0.5, 0.5], [0, 100])}% ${useTransform(mouseYSpring, [-0.5, 0.5], [0, 100])}%, rgba(200, 150, 100, 0.08), transparent 80%)`,
        }}
      />
      
      {/* Image Container */}
      <div 
        className="relative aspect-[4/3] sm:aspect-auto sm:w-2/5 sm:shrink-0 overflow-hidden p-6 z-10 flex items-center justify-center bg-brand-50/50 group-hover:bg-brand-50 transition-colors rounded-t-[1.5rem] sm:rounded-tr-none sm:rounded-bl-[1.5rem]"
      >
        <motion.img 
          src={project.imageUrl} 
          alt={project.title} 
          style={{ transform: "translateZ(50px)" }}
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-700 group-hover:scale-105"
        />
        {/* Full overlay on hover */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
           {project.github && project.github !== '#' && (
             <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-900 hover:bg-brand-800 rounded-full text-white shadow-xl transition-all transform hover:-translate-y-1 hover:scale-110">
               <Github size={20} />
             </a>
           )}
           <button onClick={handleClick} className="p-4 bg-brand-500 hover:bg-amber-400 rounded-full text-white shadow-xl transition-all transform hover:-translate-y-1 hover:scale-110">
             {isTopology ? <Play size={20} /> : <ExternalLink size={20} />}
           </button>
        </div>
      </div>

      <div 
        className="p-6 sm:p-8 flex flex-col flex-grow z-10 sm:rounded-bl-none sm:rounded-tr-[1.5rem] justify-center"
      >
        <div className="flex flex-wrap gap-2 mb-4" style={{ transform: "translateZ(20px)" }}>
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] bg-slate-100 text-black border border-slate-200 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-display mb-3 text-brand-900 group-hover:text-brand-600 transition-colors duration-300 tracking-tight" style={{ transform: "translateZ(30px)" }}>
          {project.title}
        </h3>
        
        <p className="text-brand-700/80 text-sm font-medium leading-relaxed mb-6 flex-grow" style={{ transform: "translateZ(20px)" }}>
          {project.description}
        </p>

        <div style={{ transform: "translateZ(30px)" }}>
          <LiquidButton 
            className="w-full sm:w-auto py-3 px-8 text-xs shadow-none border border-brand-200" 
            onClick={handleClick}
          >
            {isTopology ? "Launch Simulation" : visitBtnText}
          </LiquidButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;