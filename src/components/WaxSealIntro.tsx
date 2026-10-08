import React, { useState } from 'react';
import { Language, TRANSLATIONS, WEDDING_CONFIG } from '../data/weddingData';
import { Sparkles, Heart } from 'lucide-react';

interface WaxSealIntroProps {
  language: Language;
  onOpen: () => void;
}

export const WaxSealIntro: React.FC<WaxSealIntroProps> = ({ language, onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const handleOpenClick = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-void overflow-hidden transition-opacity duration-700 ${
        isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow clamped */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 bg-velvet/40 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Envelope Card */}
      <div
        className={`relative max-w-sm sm:max-w-md w-full bg-surface-container/95 border border-gold/45 p-6 sm:p-10 text-center shadow-velvet-depth transition-all duration-700 ${
          isOpening ? 'scale-95 translate-y-4' : 'scale-100 translate-y-0'
        }`}
      >
        {/* Stationery Inner Double Border */}
        <div className="absolute inset-2 sm:inset-3 border border-gold/30 pointer-events-none" />
        <div className="absolute inset-3 sm:inset-4 border border-gold/15 pointer-events-none" />

        {/* Four Corner Ornaments */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-gold/70" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-gold/70" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-gold/70" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-gold/70" />

        {/* Monogram Crest */}
        <div className="relative inline-flex items-center justify-center mb-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 border border-gold/60 flex items-center justify-center rotate-45 bg-velvet shadow-gold-subtle">
            <span className="-rotate-45 font-serif text-2xl sm:text-3xl text-gold font-light tracking-widest">
              BP
            </span>
          </div>
        </div>

        {/* Title & Couple Names */}
        <p className="text-[11px] uppercase tracking-extrawide text-gold font-semibold mb-2">
          {t('intro.title')}
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl text-champagne font-light tracking-wide mb-1">
          {WEDDING_CONFIG.groom} <span className="text-gold italic font-normal">&amp;</span> {WEDDING_CONFIG.bride}
        </h1>

        <p className="font-serif text-xs text-gold/80 tracking-widest uppercase mb-3">
          {WEDDING_CONFIG.groomFullName} &amp; {WEDDING_CONFIG.brideFullName}
        </p>

        <div className="hairline-gold w-32 mx-auto my-3" />

        <p className="text-xs sm:text-sm text-champagne-muted font-light leading-relaxed max-w-xs mx-auto mb-6">
          {t('intro.hint')}
        </p>

        {/* Wax Seal / Open Button */}
        <div className="relative inline-block">
          <button
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative px-7 py-3 bg-gold-foil text-void font-sans text-xs uppercase tracking-widest font-bold border border-gold shadow-gold-glow transition-all duration-300 hover:scale-[1.02] active:scale-95"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-void group-hover:rotate-45 transition-transform" />
              {t('intro.button')}
              <Heart className="w-3.5 h-3.5 text-velvet fill-velvet" />
            </span>
          </button>
        </div>

        <p className="mt-5 text-[10px] uppercase tracking-widest text-champagne-muted/70 font-mono">
          10.01.2027 • BUXORO
        </p>
      </div>
    </div>
  );
};
