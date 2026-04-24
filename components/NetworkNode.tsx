import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Node, NodeType } from '../types';
import { PCIcon, SwitchIcon, RouterIcon } from './Icons';
import { COLORS } from '../constants';

interface NetworkNodeProps {
  node: Node;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (node: Node) => void;
  isSelected: boolean;
  isActive: boolean;
  scale?: number;
}

const NetworkNode: React.FC<NetworkNodeProps> = ({ node, isHovered, onHover, onClick, isSelected, isActive, scale = 1 }) => {
  const getIcon = (type: NodeType) => {
    const activeColor = '#ffffff'; 
    const color = isActive ? activeColor : (isSelected ? COLORS.packet : (type === 'PC' ? COLORS.pc : type === 'SWITCH' ? COLORS.switch : COLORS.router));
    
    switch (type) {
      case 'PC': return <PCIcon color={color} />;
      case 'SWITCH': return <SwitchIcon color={color} />;
      case 'ROUTER': return <RouterIcon color={color} />;
    }
  };

  const getSignal = () => {
    if (isActive) {
      return (
        <>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-white/50"
            initial={{ scale: 0.8, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeOut" }}
          />
          {node.type === 'ROUTER' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
        </>
      );
    }

    if (isHovered) {
      if (node.type === 'PC') {
        return (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-zinc-400"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          />
        );
      }
      
      if (node.type === 'ROUTER') {
        return (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-dashed border-zinc-500"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        );
      }

      if (node.type === 'SWITCH') {
          return (
              <div className="absolute inset-0 flex justify-center items-center">
                  <motion.div 
                      className="w-16 h-16 bg-zinc-500/10 rounded-lg"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                  />
              </div>
          )
      }
    }
    
    return null;
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: node.x,
        top: node.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: 'center center'
      }}
      className="z-20 flex flex-col items-center cursor-pointer group"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(node)}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <AnimatePresence>
          {getSignal()}
        </AnimatePresence>
        
        <motion.div
          className={`relative z-10 p-5 rounded-2xl transition-all duration-500 ${
            isActive ? 'bg-zinc-100/20 scale-125' :
            isSelected ? 'bg-zinc-500/20 scale-110' : 
            isHovered ? 'bg-zinc-500/10 scale-110 border-zinc-500/50' : 'bg-white/5 border-white/5'
          } border`}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          {getIcon(node.type)}
        </motion.div>
      </div>

      <div className="mt-3 text-center pointer-events-none">
        <p className={`text-[12px] font-bold transition-all duration-300 tracking-wider ${
          isActive ? 'text-white' : isSelected ? 'text-zinc-400' : 'text-slate-300'
        } group-hover:text-zinc-300`}>
          {node.name}
        </p>
        <p className={`text-[10px] font-mono tracking-wider transition-all duration-500 ${
          isActive ? 'opacity-100 text-white' : 'opacity-0 group-hover:opacity-100 text-zinc-500/60'
        }`}>
          {node.ip}
        </p>
      </div>
    </div>
  );
};

export default NetworkNode;
