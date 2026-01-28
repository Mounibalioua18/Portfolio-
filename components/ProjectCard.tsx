import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';
import { LiquidButton } from './ui/LiquidButton';
import { Spotlight } from './ui/spotlight';

interface ProjectCardProps {
  project: Project;
  index: number;
  visitBtnText: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, visitBtnText }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-gray-900/40 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-transparent transition-all duration-500 flex flex-col h-full"
    >
      {/* Spotlight Effect */}
      <Spotlight className="-top-40 -left-40 md:-top-20 md:-left-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" fill="#10b981" />
      
      {/* Gradient Border Animation on Hover */}
      <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Moving Border Glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />

      {/* Image Container: Square aspect ratio, centered image with object-contain to show full content */}
      <div className="relative aspect-square overflow-hidden p-8 z-10 flex items-center justify-center bg-black/20">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
        />
        {/* Full overlay on hover */}
        <div className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
           {project.github && project.github !== '#' && (
             <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all transform hover:-translate-y-1 hover:scale-110">
               <Github size={20} />
             </a>
           )}
           <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-4 bg-brand-600 hover:bg-brand-500 rounded-full text-white transition-all transform hover:-translate-y-1 hover:scale-110">
             <ExternalLink size={20} />
           </a>
        </div>
      </div>

      <div className="p-8 pt-2 flex flex-col flex-grow z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-brand-500/10 text-brand-400 rounded-full border border-brand-500/10 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-brand-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        <LiquidButton 
          className="w-full py-3 text-xs" 
          onClick={() => window.open(project.link, '_blank')}
        >
          {visitBtnText}
        </LiquidButton>
      </div>
    </motion.div>
  );
};

export default ProjectCard;