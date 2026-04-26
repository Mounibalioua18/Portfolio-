import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Node, Packet } from '../types';
import { INITIAL_NODES } from '../constants';
import NetworkNode from './NetworkNode';

const Topology: React.FC = () => {
  const [nodes] = useState<Node[]>(INITIAL_NODES);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [packet, setPacket] = useState<Packet | null>(null);
  const [sourceNodeId, setSourceNodeId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [logs, setLogs] = useState<string[]>([]);
  const [dimensions, setDimensions] = useState({ w: 1400, h: 600 });

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive Scaling Logic
  const scale = useMemo(() => {
    // Base design resolution: 1400x650
    const wScale = dimensions.w / 1400;
    const hScale = dimensions.h / 650; 
    
    // Scale down a bit more to make room for UI
    return Math.min(Math.max(Math.min(wScale, hScale), 0.2), 0.7);
  }, [dimensions]);

  // Push topology towards bottom-right by altering offsets
  const xOffset = ((dimensions.w - 1400 * scale) / 2) + (dimensions.w > 768 ? 250 : 0);
  const yOffset = ((dimensions.h - 600 * scale) / 2) + 50 * scale;

  // Helper to get scaled coordinates
  const getScaledNode = (node: Node) => ({
    ...node,
    x: xOffset + node.x * scale,
    y: yOffset + node.y * scale
  });

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [`[${timestamp}] ${msg}`, ...prev].slice(0, 100));
  };

  const [isGuideOpen, setIsGuideOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsGuideOpen(false);
    }
  }, []);

  useEffect(() => {
    // Initialization Sequence
    const bootSequence = [
      "[BOOT] KERNEL INITIALIZED...",
      "[BOOT] LOADING NETWORK DRIVERS...",
      ...nodes.map(n => `[DETECT] HARDWARE FOUND: ${n.name} <${n.type}>`),
      "[SYS] TOPOLOGY MAPPED SUCCESSFULLY.",
      "[SYS] READY FOR INPUT."
    ];

    let delay = 0;
    bootSequence.forEach(msg => {
      setTimeout(() => addLog(msg), delay);
      delay += 150;
    });

    // Resize Observer
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          w: entry.contentRect.width,
          h: entry.contentRect.height
        });
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [nodes]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const findPath = (startId: string, endId: string): string[] | null => {
    const queue: [string, string[]][] = [[startId, [startId]]];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const [currentId, path] = queue.shift()!;
      if (currentId === endId) return path;

      visited.add(currentId);
      const currentNode = nodes.find(n => n.id === currentId);
      if (!currentNode) continue;

      for (const neighborId of currentNode.connections) {
        if (!visited.has(neighborId)) {
          queue.push([neighborId, [...path, neighborId]]);
        }
      }
    }
    return null;
  };

  const handleNodeClick = (node: Node) => {
    if (packet) return; 

    if (node.type !== 'PC') {
        if (sourceNodeId) {
            setSourceNodeId(null);
            addLog("ERR: INVALID TARGET. SELECT A PC.");
        }
        return;
    }

    if (!sourceNodeId) {
      setSourceNodeId(node.id);
      addLog(`SRC_LOCK: ${node.name} [${node.ip}]`);
      addLog(`[CMD] SELECT DESTINATION PC...`);
    } else {
      if (sourceNodeId === node.id) {
          setSourceNodeId(null);
          addLog("CLR: SOURCE DESELECTED.");
          return;
      }

      const targetNode = node;
      const path = findPath(sourceNodeId, targetNode.id);

      if (path) {
        addLog(`TARGET_LOCK: ${targetNode.name} [${targetNode.ip}]`);
        addLog(`INIT: Encrypting packet sequence...`);
        setPacket({
          id: Math.random().toString(),
          path,
          currentIndex: 0,
          isReturning: false,
          status: 'SENDING'
        });
        setSourceNodeId(null);
      }
    }
  };

  useEffect(() => {
    if (!packet) return;

    const interval = setInterval(() => {
      setPacket(current => {
        if (!current) return null;
        const { path, currentIndex, isReturning } = current;

        const currentNode = nodes.find(n => n.id === path[currentIndex])!;

        if (!isReturning && currentIndex === path.length - 1) {
          addLog(`RCVD: Packet delivered to ${currentNode.name}`);
          return { ...current, isReturning: true, status: 'ACKNOWLEDGING' };
        }

        if (isReturning && currentIndex === 0) {
          addLog(`DONE: Round-trip successful.`);
          return null;
        }

        const nextIndex = isReturning ? currentIndex - 1 : currentIndex + 1;
        const nextNode = nodes.find(n => n.id === path[nextIndex]);
        if (nextNode && !isReturning) {
            addLog(`HOP: ${currentNode.name} >>> ${nextNode.name}`);
        }

        return { ...current, currentIndex: nextIndex };
      });
    }, 800); 

    return () => clearInterval(interval);
  }, [packet, nodes]);

  const activeLink = useMemo(() => {
    if (!packet) return null;
    const fromIndex = packet.isReturning ? packet.currentIndex + 1 : packet.currentIndex - 1;
    const toIndex = packet.currentIndex;
    
    if (fromIndex < 0 || fromIndex >= packet.path.length) return null;
    
    const fromNode = getScaledNode(nodes.find(n => n.id === packet.path[fromIndex])!);
    const toNode = getScaledNode(nodes.find(n => n.id === packet.path[toIndex])!);
    
    return { from: fromNode, to: toNode };
  }, [packet, nodes, scale, xOffset, yOffset]);

  const sourceNode = useMemo(() => {
      if (!sourceNodeId) return null;
      return getScaledNode(nodes.find(n => n.id === sourceNodeId)!);
  }, [sourceNodeId, nodes, scale, xOffset, yOffset]);

  const renderPacket = () => {
    if (!packet) return null;
    const rawCurrentNode = nodes.find(n => n.id === packet.path[packet.currentIndex])!;
    const currentNode = getScaledNode(rawCurrentNode);
    const isAck = packet.isReturning;

    return (
      <motion.div
        key={packet.id + (isAck ? '-ret' : '-fwd') + packet.currentIndex}
        initial={activeLink ? { x: activeLink.from.x, y: activeLink.from.y } : { x: currentNode.x, y: currentNode.y }}
        animate={{ x: currentNode.x, y: currentNode.y }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute z-50 pointer-events-none"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-brand-400" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-14 px-3 py-1 rounded text-[10px] font-bold border border-brand-500/50 text-slate-300 bg-zinc-900 whitespace-nowrap tracking-widest uppercase"
          >
            {isAck ? 'ACK RECEIVED' : 'DATA SIGNAL'}
          </motion.div>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full bg-transparent rounded-none outline-none border-none"
    >
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        
        {nodes.map(node => 
          node.connections.map(connId => {
            const target = nodes.find(n => n.id === connId);
            if (!target || node.id > connId) return null;
            
            const n1 = getScaledNode(node);
            const n2 = getScaledNode(target);

            return (
              <line
                key={`${node.id}-${connId}`}
                x1={n1.x} y1={n1.y}
                x2={n2.x} y2={n2.y}
                stroke="rgba(56, 189, 248, 0.1)"
                strokeWidth={2 * scale}
                strokeDasharray={node.type === 'ROUTER' && target.type === 'ROUTER' ? '12,6' : 'none'}
              />
            );
          })
        )}

        {sourceNode && !packet && (
            <motion.line 
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke="#10b981"
                strokeWidth={2 * scale}
                strokeDasharray="4,4"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        )}

        {activeLink && (
          <motion.line
            x1={activeLink.from.x}
            y1={activeLink.from.y}
            x2={activeLink.to.x}
            y2={activeLink.to.y}
            stroke="#10b981"
            strokeWidth={4 * scale}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </svg>

      <div className="relative w-full h-full">
        {nodes.map(node => (
          <NetworkNode
            key={node.id}
            node={getScaledNode(node)}
            isHovered={hoveredNodeId === node.id}
            isSelected={packet?.path[0] === node.id || sourceNodeId === node.id}
            isActive={packet?.path[packet.currentIndex] === node.id}
            onHover={setHoveredNodeId}
            onClick={handleNodeClick}
            scale={scale}
          />
        ))}
      </div>

      <AnimatePresence>
        {renderPacket()}
      </AnimatePresence>

      {/* INSTRUCTIONS CARD */}
      <div className={`absolute z-40 pointer-events-auto ${isGuideOpen ? 'bottom-6 left-4 right-4 md:bottom-10 md:left-6 md:right-auto lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto md:w-[360px]' : 'bottom-6 left-4 md:bottom-10 md:left-6'}`}>
        <AnimatePresence mode="wait">
          {isGuideOpen ? (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20, scale: 0.95 }}
               className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col justify-center min-h-[350px] lg:min-h-[450px] relative"
            >
               <button 
                 onClick={() => setIsGuideOpen(false)}
                 className="absolute top-4 right-4 text-slate-400 hover:text-white z-10"
               >
                 <div className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                   <span className="sr-only">Close</span>
                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                   </svg>
                 </div>
               </button>
               <h3 className="text-white/90 font-bold mb-6 md:mb-8 font-mono tracking-widest text-sm uppercase border-b border-white/10 pb-4 pr-10">Simulation Guide</h3>
               <div className="space-y-6 text-xs md:text-sm text-slate-400">
                 <div className="flex gap-4 items-start">
                   <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-blue-900/40 font-mono text-[10px] md:text-xs mt-0.5">1</span>
                   <p className="leading-relaxed"><strong>Observe Subnets:</strong> Notice how <strong>VLAN 10</strong>, <strong>VLAN 20</strong>, and <strong>VLAN 30</strong> are isolated environments on the network map.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                   <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-blue-900/40 font-mono text-[10px] md:text-xs mt-0.5">2</span>
                   <p className="leading-relaxed"><strong>Initiate:</strong> Select the <strong className="text-slate-300 font-normal">Source PC</strong> to begin preparing a message transfer sequence.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                   <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-blue-900/40 font-mono text-[10px] md:text-xs mt-0.5">3</span>
                   <p className="leading-relaxed"><strong>Dispatch:</strong> Select the <strong className="text-slate-300 font-normal">Destination PC</strong> to dispatch an ICMP request across the devices.</p>
                 </div>
                 <div className="flex gap-4 items-start">
                   <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 border border-blue-900/40 font-mono text-[10px] md:text-xs mt-0.5">4</span>
                   <p className="leading-relaxed"><strong>Monitor:</strong> Watch the live terminal to see how switches forward MAC addresses and routers route between IP subnets.</p>
                 </div>
               </div>
            </motion.div>
          ) : (
            <motion.button
               key="show-guide-btn"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               onClick={() => setIsGuideOpen(true)}
               className="bg-brand-600 hover:bg-brand-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center gap-2 px-5 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] sm:text-xs transition-colors border border-brand-400/30 backdrop-blur-md"
            >
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/><path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
               Show Guide
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* DRAGGABLE TERMINAL */}
      <div className="absolute top-16 right-4 md:top-20 md:right-6 z-50 w-[240px] sm:w-[280px] md:w-[340px] pointer-events-none">
        <motion.div 
          drag
          dragConstraints={{
            top: -200, 
            left: -dimensions.w + 100,
            right: 200,
            bottom: dimensions.h - 100
          }}
          dragMomentum={false}
          dragElastic={0.1}
          className="relative group pointer-events-auto cursor-move"
        >
          {/* Terminal Corners */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-brand-500 rounded-tl-sm z-50" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-brand-500 rounded-tr-sm z-50" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-brand-500 rounded-bl-sm z-50" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-brand-500 rounded-br-sm z-50" />

          <div className="bg-zinc-950/90 backdrop-blur-md border border-brand-500/20 rounded-lg overflow-hidden flex flex-col h-[200px] md:h-[240px] transition-colors duration-300 hover:border-brand-500/40">
            {/* Terminal Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 border-b border-brand-500/10 bg-brand-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-brand-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-brand-500/50" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest leading-none">Net-Watcher</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <span className="text-[10px] text-slate-400 font-mono">LIVE</span>
              </div>
            </div>

            {/* Terminal Logs */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto custom-scrollbar font-mono p-4 space-y-1.5 scroll-smooth select-text"
            >
              {logs.map((log, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i} 
                  className="flex gap-2 text-[11px] md:text-[12px] leading-tight"
                >
                  <span className="text-slate-400 select-none">{'>'}</span>
                  <span className={`${i === 0 ? 'text-slate-400 font-bold' : 'text-slate-400'}`}>
                    {log}
                  </span>
                </motion.div>
              ))}
              <div className="h-4" /> {/* Spacer */}
            </div>

            {/* Terminal Footer */}
            <div className="px-4 py-2 border-t border-brand-500/10 bg-brand-950/30 flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase">
              <span>root@portfolio:~#</span>
              <span className="animate-pulse">_</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Topology;