import React, { useEffect, useRef } from 'react';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Characters: Binary + Tech Symbols
    const chars = '01<>/\\|{}[]*&^%$#@!+=';
    const charArray = chars.split('');
    
    const fontSize = 16;
    const columns = Math.ceil(width / fontSize);
    
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Create trailing effect with low opacity fill
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Dark slate, low opacity for trails
      ctx.fillRect(0, 0, width, height);
      
      ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Randomly pick color for "glitch" effect
        const random = Math.random();
        if (random > 0.98) {
           ctx.fillStyle = '#fff'; // White glint
        } else if (random > 0.9) {
           ctx.fillStyle = '#34d399'; // Bright Emerald
        } else if (random > 0.8) {
           ctx.fillStyle = '#2dd4bf'; // Teal
        } else {
           ctx.fillStyle = '#059669'; // Standard Emerald
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;
        
        ctx.fillText(text, x, y);
        
        // Reset drop
        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.ceil(width / fontSize);
      // Preserve existing drops if possible, extend if wider
      if (newColumns > drops.length) {
         for (let i = drops.length; i < newColumns; i++) {
             drops[i] = Math.random() * -100;
         }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" 
      style={{ filter: 'drop-shadow(0 0 4px rgba(52, 211, 153, 0.5))' }}
    />
  );
};

export default MatrixBackground;