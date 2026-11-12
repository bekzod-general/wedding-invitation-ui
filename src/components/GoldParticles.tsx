import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  pulseVal: number;
  swayVal: number;
  swaySpeed: number;
  isBokeh: boolean;
}

export const GoldParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Accessibility check: Don't run canvas animation if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Responsive particle count (capped for 60fps mobile efficiency)
    const totalCount = Math.min(50, Math.max(22, Math.floor(window.innerWidth / 30)));
    
    // Generate dual-layer particle pool: 75% fine dust motes, 25% soft bokeh orbs
    const particles: Particle[] = Array.from({ length: totalCount }, (_, index) => {
      const isBokeh = index % 4 === 0;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isBokeh ? Math.random() * 4 + 3.5 : Math.random() * 1.5 + 0.6,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: isBokeh ? -(Math.random() * 0.25 + 0.1) : -(Math.random() * 0.45 + 0.2),
        opacity: isBokeh ? Math.random() * 0.25 + 0.12 : Math.random() * 0.65 + 0.25,
        pulseSpeed: Math.random() * 0.015 + 0.006,
        pulseVal: Math.random() * Math.PI * 2,
        swayVal: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.008,
        isBokeh,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.swayVal += p.swaySpeed;
        p.pulseVal += p.pulseSpeed;

        p.x += p.speedX + Math.sin(p.swayVal) * (p.isBokeh ? 0.15 : 0.25);
        p.y += p.speedY;

        // Wrap around viewport edges
        if (p.y < -15) {
          p.y = height + 15;
          p.x = Math.random() * width;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        const currentOpacity = Math.max(
          0.05,
          p.opacity * (0.65 + 0.35 * Math.sin(p.pulseVal))
        );

        if (p.isBokeh) {
          // Layer 2: Soft out-of-focus bokeh sparkle orb
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          gradient.addColorStop(0, `rgba(255, 246, 214, ${currentOpacity.toFixed(3)})`);
          gradient.addColorStop(0.5, `rgba(212, 175, 55, ${(currentOpacity * 0.6).toFixed(3)})`);
          gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          // Layer 1: Sharp golden micro-dust mote
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(229, 193, 88, ${currentOpacity.toFixed(2)})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.7)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-75"
      aria-hidden="true"
    />
  );
};
