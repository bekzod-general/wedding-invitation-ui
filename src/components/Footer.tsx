import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../data/weddingData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ChevronUp, Heart } from 'lucide-react';

interface FooterProps {
  language?: Language;
}

export const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();
  const footerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 border-t border-gold/25 bg-surface-lowest text-center w-full overflow-x-hidden">
      <div
        ref={footerReveal.ref}
        className={`max-w-md mx-auto space-y-4 scroll-reveal ${
          footerReveal.isRevealed ? 'is-revealed' : ''
        }`}
      >
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center justify-center p-3 border border-gold/50 bg-velvet/50 hover:bg-velvet text-gold transition-all hover:scale-105 active:scale-95 mb-2.5"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5 text-gold" />
        </button>

        {/* Monogram Heraldry Emblem */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-12 h-12 border border-gold/70 flex items-center justify-center rotate-45 bg-velvet/60 shadow-gold-subtle">
            <span className="-rotate-45 font-serif text-sm text-gold font-light tracking-widest">
              BP
            </span>
          </div>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl text-gold-shimmer font-normal tracking-wider leading-tight">
          {t('footer.thankYou')}
        </h3>

        <div className="py-1.5">
          <p className="text-xs uppercase tracking-widest text-champagne-muted font-sans mb-1.5 font-medium">
            {t('footer.familyHonor')}
          </p>
          <p className="font-serif text-sm sm:text-base text-gold italic font-light max-w-sm mx-auto leading-relaxed">
            {t('footer.quote')}
          </p>
        </div>

        <div className="hairline-gold w-28 mx-auto my-4" />

        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-champagne-muted/70 font-mono">
          <span>{t('footer.copyright')}</span>
          <span>•</span>
          <Heart className="w-3.5 h-3.5 text-velvet fill-velvet" />
        </div>
      </div>
    </footer>
  );
};
