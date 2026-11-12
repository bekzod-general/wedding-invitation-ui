import { useRef, useEffect } from 'react';

interface UseParallaxTiltOptions {
  maxRotation?: number; // Maximum tilt angle in degrees (default 8)
  scale?: number; // Slight zoom on hover (default 1.015)
  disabled?: boolean;
}

export const useParallaxTilt = <T extends HTMLElement = HTMLDivElement>({
  maxRotation = 7,
  scale = 1.015,
  disabled = false,
}: UseParallaxTiltOptions = {}) => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;

    let rafId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      // Don't tilt if user prefers reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0 to 1
      const y = (e.clientY - rect.top) / rect.height; // 0 to 1

      const tiltX = (y - 0.5) * -maxRotation;
      const tiltY = (x - 0.5) * maxRotation;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
        el.style.setProperty('--mouse-x', `${(x * 100).toFixed(1)}%`);
        el.style.setProperty('--mouse-y', `${(y * 100).toFixed(1)}%`);
        el.style.setProperty('--glare-opacity', '1');
      });
    };

    const handlePointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        el.style.setProperty('--glare-opacity', '0');
      });
    };

    el.addEventListener('pointermove', handlePointerMove);
    el.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener('pointermove', handlePointerMove);
      el.removeEventListener('pointerleave', handlePointerLeave);
      el.style.transform = '';
    };
  }, [maxRotation, scale, disabled]);

  return ref;
};
