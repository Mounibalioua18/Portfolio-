import React, { useEffect, useRef } from 'react';

const CircuitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Configuration
    const gridSize = 30;
    const lightColor = '#10b981'; // Emerald
    const darkColor = '#0f766e';  // Teal
    
    interface Signal {
      x: number;
      y: number;
      dx: number;
      dy: number;
      life: number;
      maxLife: number;
      color: string;
      history: {x: number, y: number}[];
    }

    const signals: Signal[] = [];

    const createSignal = () => {
      // Snap to grid
      const x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      
      const isHorizontal = Math.random() > 0.5;
      const speed = 2; // Speed in pixels per frame

      signals.push({
        x,
        y,
        dx: isHorizontal ? (Math.random() > 0.5 ? speed : -speed) : 0,
        dy: isHorizontal ? 0 : (Math.random() > 0.5 ? speed : -speed),
        life: 0,
        maxLife: Math.random() * 100 + 50,
        color: Math.random() > 0.6 ? lightColor : darkColor,
        history: []
      });
    };

    const drawGridPoints = () => {
      ctx.fillStyle = 'rgba(16, 185, 129, 0.03)'; // Very faint dots
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      drawGridPoints();

      // Spawn signals
      if (signals.length < 15 && Math.random() > 0.92) {
        createSignal();
      }

      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];

        // Update position
        s.x += s.dx;
        s.y += s.dy;
        s.life++;
        s.history.push({x: s.x, y: s.y});
        
        // Limit trail length
        if (s.history.length > 20) s.history.shift();

        // Change direction randomly at grid intersections
        if (s.life % (gridSize / Math.abs(s.dx || s.dy)) === 0 && Math.random() > 0.8) {
             if (s.dx !== 0) {
                 s.dx = 0;
                 s.dy = Math.random() > 0.5 ? 2 : -2;
             } else {
                 s.dy = 0;
                 s.dx = Math.random() > 0.5 ? 2 : -2;
             }
        }

        // Draw trail
        ctx.beginPath();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = s.color;
        
        if (s.history.length > 1) {
            ctx.moveTo(s.history[0].x, s.history[0].y);
            for (const p of s.history) {
                ctx.lineTo(p.x, p.y);
            }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw Head
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fill();

        // Kill signal
        if (s.life > s.maxLife || s.x < 0 || s.x > width || s.y < 0 || s.y > height) {
          signals.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
      style={{
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)'
      }}
    />
  );
};

export default CircuitBackground;