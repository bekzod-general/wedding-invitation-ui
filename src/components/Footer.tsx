import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../data/weddingData';
import { ChevronUp, Heart } from 'lucide-react';

interface FooterProps {
  language?: Language;
}

export const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 border-t border-gold/25 bg-surface-lowest text-center w-full overflow-x-hidden">
      <div className="max-w-md mx-auto space-y-4">
        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center justify-center p-2.5 border border-gold/40 bg-velvet/40 hover:bg-velvet text-gold transition-all hover:scale-105 active:scale-95 mb-2"
          aria-label="Back to top"
        >
          <ChevronUp className="w-4 h-4 text-gold" />
        </button>

        {/* Monogram Heraldry Emblem */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-10 h-10 border border-gold/60 flex items-center justify-center rotate-45 bg-velvet/50 shadow-gold-subtle">
            <span className="-rotate-45 font-serif text-xs text-gold font-light tracking-widest">
              BP
            </span>
          </div>
        </div>

        <h3 className="font-serif text-lg sm:text-xl text-champagne font-light tracking-wider">
          {t('footer.thankYou')}
        </h3>

        <div className="py-1">
          <p className="text-[10px] uppercase tracking-widest text-champagne-muted font-sans mb-1">
            {t('footer.familyHonor')}
          </p>
          <p className="font-serif text-xs sm:text-sm text-gold italic font-light max-w-sm mx-auto leading-relaxed">
            {t('footer.quote')}
          </p>
        </div>

        <div className="hairline-gold w-24 mx-auto my-4" />

        <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-champagne-muted/60 font-mono">
          <span>{t('footer.copyright')}</span>
          <span>•</span>
          <Heart className="w-3 h-3 text-velvet fill-velvet" />
        </div>
      </div>
    </footer>
  );
};
