import React, { useState, useEffect, useRef } from 'react';

interface SingleDigitRollerProps {
  digit: string;
}

const SingleDigitRoller: React.FC<SingleDigitRollerProps> = ({ digit }) => {
  const [current, setCurrent] = useState(digit);
  const [prev, setPrev] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const prevRef = useRef(digit);

  useEffect(() => {
    if (prevRef.current !== digit) {
      setPrev(prevRef.current);
      setCurrent(digit);
      setIsRolling(true);
      prevRef.current = digit;

      const timer = setTimeout(() => {
        setIsRolling(false);
        setPrev(null);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [digit]);

  return (
    <div className="relative h-9 sm:h-11 w-4.5 sm:w-6 flex items-center justify-center overflow-hidden">
      {/* Outgoing previous digit sliding down out */}
      {isRolling && prev !== null && (
        <span
          key={`prev-${prev}`}
          className="absolute inset-0 flex items-center justify-center font-serif text-2xl sm:text-3xl md:text-4xl text-gold-shimmer font-normal tracking-tight select-none pointer-events-none"
          style={{ animation: 'rollerSlideDownOut 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
        >
          {prev}
        </span>
      )}

      {/* Incoming current digit sliding down in */}
      <span
        key={`curr-${current}`}
        className={`flex items-center justify-center font-serif text-2xl sm:text-3xl md:text-4xl text-gold-shimmer font-normal tracking-tight select-none ${
          isRolling ? 'pointer-events-none' : ''
        }`}
        style={
          isRolling
            ? { animation: 'rollerSlideDownIn 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards' }
            : undefined
        }
      >
        {current}
      </span>
    </div>
  );
};

interface FlipDigitProps {
  value: number;
  label: string;
}

export const FlipDigit: React.FC<FlipDigitProps> = ({ value, label }) => {
  const formatted = String(value).padStart(2, '0');
  const tens = formatted[0];
  const units = formatted[1];

  return (
    <div className="bg-surface-container/95 border border-gold/45 p-2.5 sm:p-4 text-center shadow-md relative overflow-hidden group hover:border-gold/70 transition-all hover:scale-[1.02]">
      {/* Subtle mechanical split-flap horizontal center seam */}
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gold/15 pointer-events-none z-10" />

      {/* Digits Display with Individual Roller Wheels */}
      <div className="flex items-center justify-center gap-0.5">
        <SingleDigitRoller digit={tens} />
        <SingleDigitRoller digit={units} />
      </div>

      <div className="text-[10px] sm:text-xs uppercase tracking-widest text-champagne-muted font-sans mt-1 font-medium">
        {label}
      </div>
    </div>
  );
};
