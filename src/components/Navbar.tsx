import React from 'react';
import { Language } from '../data/weddingData';
import { Volume2, VolumeX } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeSection,
  isPlayingAudio,
  onToggleAudio,
}) => {

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'venue':
        return language === 'ru' ? 'LOCATION & VENUE' : 'TO\'YXONA MANZILI';
      case 'wishes':
        return language === 'ru' ? 'WISHES & GUESTBOOK' : 'EZGU TILAKLAR';
      default:
        return language === 'ru' ? 'INVITATION • HOME' : 'NIKOH TO\'YI';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface-lowest/95 backdrop-blur-md border-b border-gold/30 transition-all">
      <div className="max-w-lg mx-auto px-3 sm:px-4 h-14 flex items-center justify-between">
        {/* Brand Monogram & Section Breadcrumb matching screenshot */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2 text-left group min-w-0"
          aria-label="Scroll to top"
        >
          <div className="w-7 h-7 border border-gold/70 flex items-center justify-center bg-velvet text-gold font-serif text-xs font-bold shadow-sm flex-shrink-0">
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
          {/* Language Switcher Segmented Control */}
          <div className="flex items-center border border-gold/40 bg-surface-lowest p-0.5">
            {(['uz', 'ru', 'en'] as Language[]).map((lang) => {
              const isSelected = language === lang;
              return (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold transition-all relative ${
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

          {/* Audio Quick Toggle */}
          {onToggleAudio && (
            <button
              onClick={onToggleAudio}
              className={`p-1.5 border transition-all ${
                isPlayingAudio
                  ? 'bg-velvet border-gold text-gold shadow-gold-subtle'
                  : 'bg-surface-lowest border-gold/30 text-champagne-muted hover:border-gold/60'
              }`}
              title="Music"
              aria-label="Toggle background music"
            >
              {isPlayingAudio ? (
                <Volume2 className="w-3.5 h-3.5 text-gold animate-pulse" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-champagne-muted" />
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
