import React, { useState, useEffect, useRef } from 'react';

interface FlipDigitProps {
  value: number;
  label: string;
}

export const FlipDigit: React.FC<FlipDigitProps> = ({ value, label }) => {
  const currentFormatted = String(value).padStart(2, '0');
  const [displayValue, setDisplayValue] = useState(currentFormatted);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevValueRef = useRef(currentFormatted);

  useEffect(() => {
    if (prevValueRef.current !== currentFormatted) {
      setPrevValue(prevValueRef.current);
      setDisplayValue(currentFormatted);
      setIsAnimating(true);
      prevValueRef.current = currentFormatted;

      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevValue(null);
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [currentFormatted]);

  return (
    <div className="bg-surface-container/90 border border-gold/40 p-2 sm:p-3 text-center shadow-sm relative overflow-hidden group hover:border-gold/60 transition-all hover:scale-[1.02]">
      {/* Number Slot Container */}
      <div className="relative h-7 sm:h-8 flex items-center justify-center overflow-hidden font-serif text-xl sm:text-2xl text-gold font-light tracking-tight select-none">
        {/* Outgoing previous value (sliding up and fading out) */}
        {isAnimating && prevValue !== null && (
          <span
            key={`prev-${prevValue}`}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ animation: 'digitSlideOutUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards' }}
          >
            {prevValue}
          </span>
        )}

        {/* Incoming/Current value (sliding in from below) */}
        <span
          key={`current-${displayValue}`}
          className={`flex items-center justify-center ${
            isAnimating ? 'pointer-events-none' : ''
          }`}
          style={
            isAnimating
              ? { animation: 'digitSlideInUp 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards' }
              : undefined
          }
        >
          {displayValue}
        </span>
      </div>

      <div className="text-[9px] uppercase tracking-wider text-champagne-muted font-sans mt-0.5">
        {label}
      </div>
    </div>
  );
};
