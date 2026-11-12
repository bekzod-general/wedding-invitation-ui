import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

interface WaxSealIntroProps {
  onOpen: () => void;
}

export const WaxSealIntro: React.FC<WaxSealIntroProps> = ({ onOpen }) => {
  const { t, i18n } = useTranslation();
  const [isOpenStage, setIsOpenStage] = useState<'closed' | 'opening' | 'opened'>('closed');

  const triggerRoyalGoldConfetti = () => {
    // 1. Center burst of golden stars and circles
    confetti({
      particleCount: 75,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#D4AF37', '#F7E7CE', '#E5C158', '#FFD700', '#AA820A'],
      shapes: ['star', 'circle'],
      ticks: 220,
      gravity: 0.85,
      scalar: 1.15,
      zIndex: 9999,
    });

    // 2. Delayed side-angle sprays for royal celebration effect
    setTimeout(() => {
      confetti({
        particleCount: 45,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.65 },
        colors: ['#D4AF37', '#F7E7CE', '#E5C158', '#FFF8DC'],
        ticks: 250,
        zIndex: 9999,
      });
      confetti({
        particleCount: 45,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.65 },
        colors: ['#D4AF37', '#F7E7CE', '#E5C158', '#FFF8DC'],
        ticks: 250,
        zIndex: 9999,
      });
    }, 280);
  };

  const handleOpenEnvelope = () => {
    if (isOpenStage !== 'closed') return;

    setIsOpenStage('opening');
    triggerRoyalGoldConfetti();

    // Haptic vibration feedback if supported on mobile
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([35, 25, 45]);
      } catch {
        // ignore
      }
    }

    // Sequence timing:
    // 0ms - 900ms: Flap flips open in 3D
    // 400ms - 1400ms: Royal stationery card slides out
    // 1500ms: Entire modal smoothly dissolves into the main invitation
    setTimeout(() => {
      setIsOpenStage('opened');
      setTimeout(() => {
        onOpen();
      }, 500);
    }, 1500);
  };

  const isFlapOpen = isOpenStage !== 'closed';
  const isCardExtracted = isOpenStage !== 'closed';

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden transition-all duration-700 ${
        isOpenStage === 'opened' ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#12050A' }}
    >
      {/* Discreet Top Bar: Monogram & Language Switcher */}
      <div className="absolute top-4 left-4 right-4 max-w-lg mx-auto flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 border border-gold/70 flex items-center justify-center bg-velvet text-gold font-serif text-xs font-bold shadow-sm flex-shrink-0">
            BP
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xs text-gold font-semibold tracking-wider">
              B&amp;P
            </span>
            <span className="text-[9px] font-mono text-champagne-muted/70">
              10.01
            </span>
          </div>
        </div>

        {/* Segmented Language Selector */}
        <div className="flex items-center border border-gold/40 bg-[#1A0910] p-0.5">
          {(['uz', 'ru', 'en'] as const).map((lang) => {
            const isSelected = (i18n.language || 'uz') === lang;
            return (
              <button
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold transition-all relative ${
                  isSelected
                    ? 'bg-velvet text-gold font-bold shadow-sm'
                    : 'text-champagne-muted/60 hover:text-champagne'
                }`}
                aria-pressed={isSelected}
              >
                {lang}
                {isSelected && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ambient background glow & atmospheric vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none" />
      <div className="absolute w-80 sm:w-[460px] h-80 sm:h-[460px] bg-velvet/40 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Outer Envelope 3D Stage */}
      <div className="relative w-full max-w-[420px] sm:max-w-[470px] perspective-1200 flex flex-col items-center pt-6">
        {/* Envelope Top Header Tag */}
        <div className="text-center mb-4 transition-all duration-500">
          <p className="text-xs sm:text-sm uppercase tracking-extrawide text-gold font-sans font-semibold mb-1">
            {t('intro.title')}
          </p>
          <p className="text-xs text-champagne-muted/90 font-mono tracking-widest">
            {t('intro.dateCity')}
          </p>
        </div>

        {/* The 3D Envelope Body Container */}
        <div className="relative w-full h-[280px] sm:h-[310px] preserve-3d shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-gold/45 bg-surface-lowest">
          {/* 1. Envelope Back Inner Liner with Golden Damask Trim */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#2E0B15] to-[#16040B] border border-gold/30 overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:12px_12px]" />
          </div>

          {/* 2. Royal Stationery Invitation Letter (Slides Upwards out of Pocket) */}
          <div
            className={`absolute left-3 right-3 sm:left-4 sm:right-4 top-2 h-[265px] sm:h-[290px] bg-surface-container border border-gold/60 p-3.5 sm:p-5 text-center shadow-2xl transition-all duration-1000 ease-out preserve-3d flex flex-col items-center justify-between ${
              isCardExtracted
                ? '-translate-y-32 sm:-translate-y-36 scale-[1.02] shadow-[0_25px_60px_rgba(212,175,55,0.3)] z-20 opacity-100'
                : 'translate-y-1 z-0 opacity-0 pointer-events-none'
            }`}
          >
            {/* Stationery Double Border Rule */}
            <div className="absolute inset-1.5 sm:inset-2 border border-gold/35 pointer-events-none" />
            <div className="absolute inset-2.5 sm:inset-3 border border-gold/15 pointer-events-none" />

            {/* Corner Filigrees */}
            <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l border-gold/80" />
            <div className="absolute top-1.5 right-1.5 w-2.5 h-2.5 border-t border-r border-gold/80" />
            <div className="absolute bottom-1.5 left-1.5 w-2.5 h-2.5 border-b border-l border-gold/80" />
            <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r border-gold/80" />

            {/* Gold Wedding Rings Medallion with Monogram */}
            <div className="relative inline-flex items-center justify-center my-0.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-gold/70 overflow-hidden shadow-md relative">
                <img
                  src="/images/wedding-rings.jpg"
                  alt="Wedding Rings"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-velvet/40 flex items-center justify-center">
                  <span className="font-serif text-xs sm:text-sm text-gold font-bold tracking-widest drop-shadow-md">
                    BP
                  </span>
                </div>
              </div>
            </div>

            <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gold font-semibold">
              {t('intro.title')}
            </p>

            <h1 className="font-serif text-2xl sm:text-3xl text-gold-shimmer font-normal tracking-wide leading-tight">
              {t('intro.groomBrideNames')}
            </h1>

            <p className="font-serif text-xs sm:text-sm text-gold/90 tracking-widest uppercase">
              {t('intro.names')}
            </p>

            <div className="hairline-gold w-28 mx-auto my-1" />

            <p className="text-xs sm:text-sm text-champagne-muted font-light leading-relaxed max-w-xs mx-auto">
              {t('intro.hint')}
            </p>
          </div>

          {/* 3. Envelope Front Pocket (Lower & Side flaps layered over the card) */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Left triangle flap */}
            <div
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-gradient-to-r from-[#3D0F1D] to-[#260811] border-l border-gold/30 shadow-md"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            {/* Right triangle flap */}
            <div
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-[#3D0F1D] to-[#260811] border-r border-gold/30 shadow-md"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            {/* Bottom triangular pocket flap */}
            <div
              className="absolute left-0 right-0 bottom-0 h-full bg-gradient-to-t from-[#4A1525] to-[#2D0A15] border-b border-gold/45 shadow-[0_-8px_20px_rgba(0,0,0,0.6)]"
              style={{ clipPath: 'polygon(0 100%, 50% 48%, 100% 100%)' }}
            />
          </div>

          {/* 4. 3D Top Triangular Flap (Hinged at the top, flips upwards -180deg) */}
          <div
            className={`absolute top-0 left-0 right-0 h-[155px] sm:h-[175px] origin-top transition-transform duration-1000 ease-in-out preserve-3d ${
              isFlapOpen
                ? '-rotate-x-180 z-0'
                : 'rotate-x-0 z-30'
            }`}
            style={{
              transformOrigin: 'top center',
              transform: isFlapOpen ? 'rotateX(-180deg)' : 'rotateX(0deg)',
            }}
          >
            {/* Flap Outer Face (Burgundy Velvet with Gold Edging) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#4A1525] to-[#360D1A] border-t border-gold/40 shadow-xl backface-hidden flex items-center justify-center"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              {/* Subtle gold line accent along the flap triangle */}
              <div
                className="absolute inset-1 pointer-events-none opacity-40"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', borderTop: '1px solid #D4AF37' }}
              />
            </div>

            {/* Flap Inner Face (Visible after opening -180deg) */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-[#25060E] to-[#180309] border-t border-gold/30 shadow-inner"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transform: 'rotateX(180deg)',
              }}
            >
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:10px_10px]" />
            </div>
          </div>

          {/* 5. Physical 3D Gold Wax Seal Medallion (Interactive Touch Point) */}
          {!isFlapOpen && (
            <div className="absolute left-1/2 top-[140px] sm:top-[155px] -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center">
              <button
                type="button"
                onClick={handleOpenEnvelope}
                className="group relative focus:outline-none focus:ring-2 focus:ring-gold/60 p-1.5 rounded-full transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
                aria-label={t('intro.button')}
              >
                {/* Outer Breathing Gold Glow Aura */}
                <span className="absolute -inset-2.5 rounded-full bg-gold/30 blur-lg animate-seal-pulse pointer-events-none" />

                {/* Wax Seal Medallion Stamp */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 aspect-square rounded-full shrink-0 wax-seal-stamp flex items-center justify-center cursor-pointer transition-shadow">
                  {/* Organic Stamped Wax Rim */}
                  <div className="absolute inset-1 rounded-full wax-seal-rim border border-amber-300/40 pointer-events-none" />

                  {/* Embossed Monogram */}
                  <div className="flex flex-col items-center justify-center text-center">
                    <Sparkles className="w-3.5 h-3.5 text-void/80 mb-0.5 group-hover:rotate-45 transition-transform" />
                    <span className="font-serif text-lg sm:text-xl font-bold text-void tracking-wider select-none leading-none drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                      BP
                    </span>
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* 6. Guidance CTA beneath the envelope */}
        <div className="mt-6 text-center z-10">
          <button
            type="button"
            onClick={handleOpenEnvelope}
            disabled={isOpenStage !== 'closed'}
            className="group relative px-8 py-3.5 bg-gold-foil text-void font-sans text-xs sm:text-sm uppercase tracking-widest font-bold border border-gold shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 mx-auto"
          >
            <Sparkles className="w-4 h-4 text-void group-hover:rotate-45 transition-transform" />
            <span>{t('intro.button')}</span>
            <Heart className="w-3.5 h-3.5 text-velvet fill-velvet" />
          </button>
          <p className="text-xs text-champagne-muted/80 tracking-wider mt-2.5 font-sans">
            {t('intro.hint')}
          </p>
        </div>
      </div>
    </div>
  );
};
