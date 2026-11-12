import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Language,
  WEDDING_CONFIG,
  getGoogleCalendarUrl,
  downloadIcsFile,
} from '../data/weddingData';
import { useParallaxTilt } from '../hooks/useParallaxTilt';
import { FlipDigit } from './FlipDigit';
import {
  Calendar,
  ChevronDown,
  Sparkles,
  MapPin,
  Music,
  Play,
  Pause,
} from 'lucide-react';

interface HeroSectionProps {
  language?: Language;
  onNavigateToVenue: () => void;
  isPlayingAudio?: boolean;
  onToggleAudio?: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToVenue,
  isPlayingAudio,
  onToggleAudio,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'uz') as Language;
  const [showCalendarOptions, setShowCalendarOptions] = useState(false);

  // 3D Parallax Tilt for Cards
  const invitationCardRef = useParallaxTilt<HTMLDivElement>({ maxRotation: 5, scale: 1.01 });
  const countdownCardRef = useParallaxTilt<HTMLDivElement>({ maxRotation: 5, scale: 1.01 });
  const teaserCardRef = useParallaxTilt<HTMLDivElement>({ maxRotation: 5, scale: 1.01 });

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = WEDDING_CONFIG.targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToVenue = () => {
    const el = document.getElementById('venue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-20 pb-16 flex flex-col items-center justify-center overflow-x-hidden w-full px-4 sm:px-6"
    >
      {/* Decorative radial velvet glow constrained to viewport */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-velvet/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-lg mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Cascade 1: Monogram Crest with Ring Frame and Floating Aura */}
        <div className="animate-cascade-1 w-full flex flex-col items-center">
          <div className="relative inline-flex items-center justify-center my-2 animate-float-gentle">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border border-gold/60 flex flex-col items-center justify-center bg-velvet/50 shadow-velvet-depth relative group">
              <div className="absolute inset-1.5 border border-gold/30 pointer-events-none" />
              <span className="font-serif text-2xl sm:text-3xl text-gold font-light tracking-widest drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]">
                BP
              </span>
              <span className="text-[8px] uppercase tracking-widest text-champagne-muted font-sans mt-0.5">
                {t('hero.weddingCelebration')}
              </span>
            </div>
          </div>

          {/* City Tag Badge */}
          <p className="text-[10px] sm:text-xs uppercase tracking-extrawide text-gold font-sans font-semibold mt-4 mb-2">
            {t('hero.city_badge')}
          </p>
        </div>

        {/* Cascade 2: Couple Names in Bodoni Moda with Metallic Gold Shimmer */}
        <div className="animate-cascade-2 w-full">
          <h1 className="font-serif text-4xl sm:text-5xl font-normal tracking-tight leading-none mb-1 text-gold-shimmer drop-shadow-sm">
            <span>{t('hero.groom')}</span>
            <span className="text-gold font-serif italic mx-2.5 sm:mx-3 font-normal">
              &amp;
            </span>
            <span>{t('hero.bride')}</span>
          </h1>

          {/* Subtitle Surnames */}
          <p className="font-sans text-[11px] sm:text-xs tracking-widest text-gold/80 uppercase mb-5 font-medium">
            {t('hero.names_sub')}
          </p>
        </div>

        {/* Cascade 3: Bismillahir Rohmanir Rohiym Sacred Badge & Quote */}
        <div className="animate-cascade-3 w-full bg-surface-lowest/80 border border-gold/35 p-3.5 sm:p-4 mb-6 shadow-sm">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-[11px] sm:text-xs font-serif tracking-widest text-gold uppercase font-medium">
              {t('hero.badge')}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-gold" />
          </div>
          <p className="text-xs text-champagne-muted font-light italic leading-relaxed">
            {t('hero.blessing_quote')}
          </p>
        </div>

        {/* Cascade 4: Formal Invitation Card with Expanding Gold Corner Flourishes */}
        <div
          ref={invitationCardRef}
          className="animate-cascade-4 w-full glass-card-elevated interactive-tilt p-5 sm:p-6 mb-6 text-left relative overflow-hidden"
        >
          {/* Expanding Decorative Corner Brackets */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-gold/80 animate-corner-tl pointer-events-none" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-gold/80 animate-corner-tr pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-gold/80 animate-corner-bl pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-gold/80 animate-corner-br pointer-events-none" />

          {/* Watermark Crest */}
          <div className="absolute right-4 bottom-4 text-gold/5 font-serif text-7xl select-none pointer-events-none font-bold">
            BP
          </div>

          <div className="relative z-10 text-center">
            <h3 className="font-serif text-base sm:text-lg text-champagne font-medium mb-2">
              {t('hero.invitation_dear')}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-champagne-muted font-light leading-relaxed mb-4">
              {t('hero.invitation_text')}
            </p>
            <div className="pt-2 border-t border-gold/15 flex items-center justify-between text-[11px] text-gold/90 font-serif">
              <span>{t('hero.family_hosts')}</span>
              <span className="text-[10px] text-champagne-muted font-sans">
                {t('hero.cityYear')}
              </span>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer Card with Smooth Vertical Slide-Fade Digits */}
        <div
          ref={countdownCardRef}
          className="w-full glass-card interactive-tilt p-4 sm:p-5 mb-5 relative overflow-hidden"
        >
          <p className="text-[10px] uppercase tracking-widest text-champagne-muted font-sans mb-3 text-center">
            {t('hero.countdown_title')}
          </p>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <FlipDigit value={timeLeft.days} label={t('hero.days')} />
            <FlipDigit value={timeLeft.hours} label={t('hero.hours')} />
            <FlipDigit value={timeLeft.minutes} label={t('hero.minutes')} />
            <FlipDigit value={timeLeft.seconds} label={t('hero.seconds')} />
          </div>

          {/* Add to Calendar Dropdown Button */}
          <div className="relative w-full">
            <button
              onClick={() => setShowCalendarOptions(!showCalendarOptions)}
              className="w-full py-2.5 px-4 bg-velvet/70 hover:bg-velvet text-champagne font-sans text-xs uppercase tracking-widest font-medium border border-gold/50 hover:border-gold transition-all flex items-center justify-center gap-2 btn-tactile"
            >
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>{t('hero.addToCalendar')}</span>
              <ChevronDown
                className={`w-3 h-3 text-gold/70 transition-transform duration-300 ${
                  showCalendarOptions ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </button>

            {showCalendarOptions && (
              <div className="absolute left-0 right-0 mt-1 bg-surface-lowest border border-gold/50 shadow-velvet-depth z-30 p-1 animate-cascade-1">
                <a
                  href={getGoogleCalendarUrl(currentLang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCalendarOptions(false)}
                  className="block px-3 py-2 text-xs text-champagne hover:text-gold hover:bg-velvet/40 text-left transition-colors btn-tactile"
                >
                  {t('hero.calendarGoogle')}
                </a>
                <button
                  onClick={() => {
                    downloadIcsFile(currentLang);
                    setShowCalendarOptions(false);
                  }}
                  className="block w-full px-3 py-2 text-xs text-champagne hover:text-gold hover:bg-velvet/40 text-left transition-colors border-t border-gold/15 btn-tactile"
                >
                  {t('hero.calendarIcs')}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Ambient Wedding Music Player Bar */}
        <div className="w-full bg-surface-lowest/90 border border-gold/40 p-2.5 mb-5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5 text-left overflow-hidden">
            <button
              onClick={onToggleAudio}
              className="relative w-7 h-7 rounded-none bg-gold-foil text-void flex items-center justify-center flex-shrink-0 shadow-sm transition-transform hover:scale-105 active:scale-95"
              aria-label={isPlayingAudio ? t('audio.pauseAria') : t('audio.playAria')}
            >
              {/* Pulsing acoustic halo ring when active */}
              {isPlayingAudio && (
                <span className="absolute -inset-1.5 rounded-none border border-gold/60 animate-speaker-ring pointer-events-none" />
              )}
              {isPlayingAudio ? (
                <Pause className="w-3.5 h-3.5 text-void relative z-10" />
              ) : (
                <Play className="w-3.5 h-3.5 text-void translate-x-0.5 relative z-10" />
              )}
            </button>
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-wider text-champagne-muted flex items-center gap-1">
                <Music className="w-2.5 h-2.5 text-gold" />
                <span>{t('hero.musicLabel')}</span>
              </p>
              <p className="text-[11px] text-champagne truncate font-medium">
                {t('hero.audio_playing')}
              </p>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-widest text-emerald bg-emerald/20 border border-emerald/40 px-1.5 py-0.5 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-ping inline-block" />
            {t('hero.audio_live')}
          </span>
        </div>

        {/* Ceremonial Date & Time Card */}
        <div className="w-full glass-card p-4 sm:p-5 mb-5 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-gold" />
            <span className="font-serif text-lg sm:text-xl text-champagne tracking-wider">
              {t('hero.date')}
            </span>
          </div>
          <p className="text-xs text-gold uppercase tracking-widest font-sans font-medium">
            {t('hero.day_time')}
          </p>
        </div>

        {/* Banquet Hall Teaser Card with 3D Parallax Tilt */}
        <div
          ref={teaserCardRef}
          className="w-full glass-card-elevated interactive-tilt p-4 sm:p-5 mb-6 text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-gold mb-1">
            <span>{t('hero.venueTeaserTitle')}</span>
            <span className="px-1.5 py-0.5 bg-velvet border border-gold/40 text-[9px]">
              {t('hero.venueTime')}
            </span>
          </div>
          <h4 className="font-serif text-base sm:text-lg text-champagne font-medium">
            {t('venue.name')}
          </h4>
          <p className="text-xs text-champagne-muted font-light mb-3">
            {t('venue.address')}
          </p>
          <button
            onClick={scrollToVenue}
            className="w-full py-2 bg-velvet/80 hover:bg-velvet border border-gold/50 text-gold text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 btn-tactile"
          >
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <span>{t('hero.viewOnMap')}</span>
          </button>
        </div>

        {/* Primary Venue Action Button */}
        <button
          onClick={onNavigateToVenue}
          className="w-full py-3.5 bg-gold-foil text-void font-sans text-xs uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4 text-void" />
          <span>{t('hero.viewVenue')}</span>
        </button>
      </div>
    </section>
  );
};
