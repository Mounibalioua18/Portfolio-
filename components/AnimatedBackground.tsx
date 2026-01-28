import React, { useEffect, useRef } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let w: number, h: number;

    const particleCount = 40;
    const connectionDist = 200;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      hue: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.hue = Math.random() * 60 + 140; // Teal to Emerald range
        this.color = `hsla(${this.hue}, 70%, 50%, `;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color + '0.5)';
        ctx.fill();

        // Extra glow for larger particles
        if (this.size > 2) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = this.color + '0.8)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = Array.from({ length: particleCount }, () => new Particle());
    };

    const drawLines = () => {
      if (!ctx) return;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const alpha = 1 - dist / connectionDist;
            ctx.strokeStyle = `rgba(20, 184, 166, ${alpha * 0.15})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time: number) => {
      // Create a shifting background base
      const bgHue = 220 + Math.sin(time * 0.0002) * 20; // Drifts between deep blue and slate
      ctx.fillStyle = `hsla(${bgHue}, 40%, 4%, 1)`;
      ctx.fillRect(0, 0, w, h);

      // Subtle radial highlight that moves with time
      const gradientX = w / 2 + Math.cos(time * 0.0005) * (w / 4);
      const gradientY = h / 2 + Math.sin(time * 0.0003) * (h / 4);
      const grad = ctx.createRadialGradient(gradientX, gradientY, 0, gradientX, gradientY, w / 1.5);
      grad.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    init();
    animate(0);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full"
    />
  );
};

export default AnimatedBackground;