import React, { useEffect, useRef } from 'react';

const ConnectedSpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const nodeCount = 20; // Fewer nodes for minimalism
    const connectionDistance = 250;
    
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: 'PC' | 'SERVER';
    }

    const nodes: Node[] = [];

    const createNodes = () => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3, // Very slow velocity (Moon gravity feel)
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 10 + 10,
          type: Math.random() > 0.6 ? 'PC' : 'SERVER'
        });
      }
    };

    // Draw a simple minimal PC icon
    const drawPC = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
      ctx.lineWidth = 1.5;
      
      // Screen
      const w = size;
      const h = size * 0.7;
      ctx.strokeRect(x - w/2, y - h/2, w, h);
      
      // Base
      ctx.beginPath();
      ctx.moveTo(x - w/2, y + h/2);
      ctx.lineTo(x + w/2, y + h/2); // Bottom of screen
      ctx.moveTo(x - w/4, y + h/2);
      ctx.lineTo(x + w/4, y + h/2 + 3); // Stand neck
      ctx.moveTo(x - w/3, y + h/2 + 3);
      ctx.lineTo(x + w/3, y + h/2 + 3); // Base foot
      ctx.stroke();
    };

    // Draw a simple minimal Server icon
    const drawServer = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
        ctx.strokeStyle = `rgba(45, 212, 191, ${opacity})`;
        ctx.lineWidth = 1.5;
        const w = size * 0.8;
        const h = size;
        
        ctx.strokeRect(x - w/2, y - h/2, w, h);
        
        // Rack lines
        ctx.beginPath();
        ctx.moveTo(x - w/2, y - h/6);
        ctx.lineTo(x + w/2, y - h/6);
        ctx.moveTo(x - w/2, y + h/6);
        ctx.lineTo(x + w/2, y + h/6);
        
        // Blinking lights (static for now)
        ctx.fillStyle = `rgba(45, 212, 191, ${opacity})`;
        ctx.fillRect(x + w/3, y - h/2 + 2, 2, 2);
        ctx.fillRect(x + w/3, y - h/6 + 2, 2, 2);
        
        ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and Draw Nodes
      nodes.forEach((node, i) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw Connections
        for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist < connectionDistance) {
                const opacity = 1 - (dist / connectionDistance);
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(16, 185, 129, ${opacity * 0.15})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        // Draw Icon
        if (node.type === 'PC') {
            drawPC(ctx, node.x, node.y, node.size, 0.4);
        } else {
            drawServer(ctx, node.x, node.y, node.size, 0.4);
        }
      });

      requestAnimationFrame(animate);
    };

    createNodes();
    const animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createNodes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas 
    ref={canvasRef} 
    className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
    style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 20%)'
    }}
  />;
};

export default ConnectedSpaceBackground;