import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../data/weddingData';
import { Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
  activeSection: string;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language: propLanguage,
  onLanguageChange,
  activeSection,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || propLanguage || 'uz') as Language;

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'venue':
        return t('nav.sectionVenue');
      case 'wishes':
        return t('nav.sectionWishes');
      default:
        return t('nav.sectionCeremony');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-lowest/95 backdrop-blur-md border-b border-gold/30 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-lg mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        {/* Brand Monogram & Section Breadcrumb */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 text-left group min-w-0 btn-tactile"
          aria-label="Scroll to top"
        >
          <div className="w-7 h-7 border border-gold/70 flex items-center justify-center bg-velvet text-gold font-serif text-xs font-bold shadow-sm flex-shrink-0 group-hover:border-gold">
            BP
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-xs text-gold font-semibold">
                B&amp;P
              </span>
              <span className="text-[9px] font-mono text-champagne-muted/70">
                10.01
              </span>
            </div>
            <p className="text-[9px] uppercase tracking-wider text-champagne-muted truncate font-sans">
              {getSectionTitle()}
            </p>
          </div>
        </button>

        {/* Right controls: Language Switcher & Audio Toggle Button */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Segmented Control with Tactile Feedback */}
          <div className="flex items-center border border-gold/40 bg-surface-lowest p-0.5">
            {(['uz', 'ru', 'en'] as Language[]).map((lang) => {
              const isSelected = currentLang === lang;
              return (
                <button
                  key={lang}
                  onClick={() => handleSelectLanguage(lang)}
                  className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold transition-all relative ${
                    isSelected
                      ? 'bg-velvet text-gold font-bold shadow-sm'
                      : 'text-champagne-muted/60 hover:text-champagne hover:bg-surface-high/40'
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

          {/* Audio Quick Toggle with Pulsing Halo Ring */}
          {onToggleAudio && (
            <button
              onClick={onToggleAudio}
              className={`relative p-1.5 border transition-all btn-tactile ${
                isPlayingAudio
                  ? 'bg-velvet border-gold text-gold shadow-gold-subtle'
                  : 'bg-surface-lowest border-gold/30 text-champagne-muted hover:border-gold/60'
              }`}
              title={t('audio.music')}
              aria-label={isPlayingAudio ? t('audio.pauseAria') : t('audio.playAria')}
            >
              {isPlayingAudio && (
                <span className="absolute -inset-1 rounded-none border border-gold/60 animate-speaker-ring pointer-events-none" />
              )}
              {isPlayingAudio ? (
                <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse relative z-10" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-champagne-muted relative z-10" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
