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
  ExternalLink,
  Download,
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
            <div className="w-24 h-24 sm:w-28 sm:h-28 border border-gold/70 flex flex-col items-center justify-center bg-velvet/60 shadow-velvet-depth relative group">
              <div className="absolute inset-1.5 border border-gold/35 pointer-events-none" />
              <span className="font-serif text-3xl sm:text-4xl text-gold font-light tracking-widest drop-shadow-[0_2px_10px_rgba(212,175,55,0.45)]">
                BP
              </span>
              <span className="text-[8px] uppercase tracking-widest text-champagne-muted font-sans mt-1">
                {t('hero.weddingCelebration')}
              </span>
            </div>
          </div>

          {/* City Tag Badge */}
          <p className="text-xs sm:text-sm uppercase tracking-extrawide text-gold font-sans font-semibold mt-3 mb-2">
            {t('hero.city_badge')}
          </p>
        </div>

        {/* Cascade 2: Arched Luxury Editorial Couple Portrait with Ken Burns Subtle Motion */}
        <div className="animate-cascade-2 w-full my-4 flex justify-center">
          <div className="relative w-64 sm:w-72 h-80 sm:h-96 arched-photo-frame border-2 border-gold/70 gold-glow-border shadow-2xl group">
            {/* Background Image with Ken Burns Animation */}
            <img
              src="/images/couple-portrait.jpg"
              alt="Bekzod & Parvina"
              className="w-full h-full object-cover object-top animate-ken-burns filter brightness-95 contrast-105"
            />

            {/* Inner Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent pointer-events-none" />
            <div className="absolute inset-2 border border-gold/40 rounded-t-[130px] rounded-b-[4px] pointer-events-none" />

            {/* Decorative Corner Brackets on Bottom */}
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold pointer-events-none" />

            {/* Bottom Photo Emblem Tag */}
            <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
              <span className="inline-block px-3 py-1 bg-surface-lowest/90 border border-gold/60 text-gold font-serif text-xs uppercase tracking-widest font-semibold shadow-md">
                10.01.2027 • BUXORO
              </span>
            </div>
          </div>
        </div>

        {/* Cascade 3: Couple Names in Bodoni Moda with Metallic Gold Shimmer */}
        <div className="animate-cascade-3 w-full my-2">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight mb-2 text-gold-shimmer drop-shadow-md px-2 flex flex-wrap items-center justify-center">
            <span>{t('hero.groom')}</span>
            <span className="text-gold font-serif italic mx-2 sm:mx-2.5 font-normal">
              &amp;
            </span>
            <span>{t('hero.bride')}</span>
          </h1>

          {/* Subtitle Surnames */}
          <p className="font-sans text-xs sm:text-sm tracking-widest text-gold/90 uppercase mb-6 font-semibold">
            {t('hero.names_sub')}
          </p>
        </div>

        {/* Cascade 4: Bismillahir Rohmanir Rohiym Sacred Badge & Quote */}
        <div className="animate-cascade-4 w-full bg-surface-lowest/90 border border-gold/40 p-4 sm:p-5 mb-6 shadow-md">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-xs sm:text-sm font-serif tracking-widest text-gold uppercase font-semibold">
              {t('hero.badge')}
            </span>
            <Sparkles className="w-4 h-4 text-gold" />
          </div>
          <p className="text-sm sm:text-base text-champagne font-light italic leading-relaxed">
            {t('hero.blessing_quote')}
          </p>
        </div>

        {/* Cascade 5: Formal Invitation Card with Expanding Gold Corner Flourishes */}
        <div
          ref={invitationCardRef}
          className="w-full glass-card-elevated interactive-tilt p-6 sm:p-7 mb-6 text-left relative overflow-hidden"
        >
          {/* Expanding Decorative Corner Brackets */}
          <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-gold/90 animate-corner-tl pointer-events-none" />
          <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-gold/90 animate-corner-tr pointer-events-none" />
          <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-gold/90 animate-corner-bl pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-gold/90 animate-corner-br pointer-events-none" />

          {/* Watermark Crest */}
          <div className="absolute right-4 bottom-4 text-gold/5 font-serif text-8xl select-none pointer-events-none font-bold">
            BP
          </div>

          <div className="relative z-10 text-center">
            <h3 className="font-serif text-lg sm:text-xl text-champagne font-medium mb-3">
              {t('hero.invitation_dear')}
            </h3>
            <p className="font-sans text-sm sm:text-base text-champagne-muted font-light leading-relaxed mb-5">
              {t('hero.invitation_text')}
            </p>
            <div className="pt-3 border-t border-gold/20 flex items-center justify-between text-xs sm:text-sm text-gold/95 font-serif">
              <span>{t('hero.family_hosts')}</span>
              <span className="text-xs text-champagne-muted font-sans">
                {t('hero.cityYear')}
              </span>
            </div>
          </div>
        </div>

        {/* Live Countdown Timer Card with Smooth Vertical Slide-Fade Digits */}
        <div
          ref={countdownCardRef}
          className="w-full glass-card interactive-tilt p-5 sm:p-6 mb-6 relative overflow-hidden"
        >
          <p className="text-xs sm:text-sm uppercase tracking-widest text-champagne-muted font-sans mb-3.5 text-center font-medium">
            {t('hero.countdown_title')}
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-5">
            <FlipDigit value={timeLeft.days} label={t('hero.days')} />
            <FlipDigit value={timeLeft.hours} label={t('hero.hours')} />
            <FlipDigit value={timeLeft.minutes} label={t('hero.minutes')} />
            <FlipDigit value={timeLeft.seconds} label={t('hero.seconds')} />
          </div>

          {/* Add to Calendar Accordion Button & Panel */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => setShowCalendarOptions(!showCalendarOptions)}
              className="w-full py-3.5 px-4 bg-velvet/70 hover:bg-velvet text-champagne font-sans text-xs sm:text-sm uppercase tracking-widest font-semibold border border-gold/60 hover:border-gold transition-all flex items-center justify-center gap-2.5 btn-tactile shadow-sm cursor-pointer"
              aria-expanded={showCalendarOptions}
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>{t('hero.addToCalendar')}</span>
              <ChevronDown
                className={`w-4 h-4 text-gold/80 transition-transform duration-300 ${
                  showCalendarOptions ? 'rotate-180 text-gold' : 'rotate-0'
                }`}
              />
            </button>

            {/* In-Card Accordion Dropdown (Flows inside card, pushing content smoothly) */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                showCalendarOptions
                  ? 'grid-rows-[1fr] opacity-100 mt-2.5'
                  : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
              }`}
            >
              <div className="overflow-hidden">
                <div className="bg-surface-lowest/95 border border-gold/50 p-2 space-y-1.5 shadow-velvet-depth">
                  <a
                    href={getGoogleCalendarUrl(currentLang)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setShowCalendarOptions(false)}
                    className="flex items-center justify-between px-3.5 py-3 text-xs sm:text-sm text-champagne hover:text-gold hover:bg-velvet/60 transition-all border border-gold/20 hover:border-gold/50 btn-tactile font-medium group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-gold shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{t('hero.calendarGoogle')}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gold/70 group-hover:text-gold" />
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      downloadIcsFile(currentLang);
                      setShowCalendarOptions(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 text-xs sm:text-sm text-champagne hover:text-gold hover:bg-velvet/60 transition-all border border-gold/20 hover:border-gold/50 btn-tactile font-medium group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Download className="w-4 h-4 text-gold shrink-0 group-hover:translate-y-0.5 transition-transform" />
                      <span>{t('hero.calendarIcs')}</span>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-champagne-muted/70 group-hover:text-gold/90">
                      .ICS
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Wedding Music Player Bar */}
        <div className="w-full bg-surface-lowest/90 border border-gold/45 p-3 mb-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 text-left overflow-hidden">
            <button
              onClick={onToggleAudio}
              className="relative w-9 h-9 rounded-none bg-gold-foil text-void flex items-center justify-center flex-shrink-0 shadow-sm transition-transform hover:scale-105 active:scale-95"
              aria-label={isPlayingAudio ? t('audio.pauseAria') : t('audio.playAria')}
            >
              {/* Pulsing acoustic halo ring when active */}
              {isPlayingAudio && (
                <span className="absolute -inset-1.5 rounded-none border border-gold/60 animate-speaker-ring pointer-events-none" />
              )}
              {isPlayingAudio ? (
                <Pause className="w-4 h-4 text-void relative z-10" />
              ) : (
                <Play className="w-4 h-4 text-void translate-x-0.5 relative z-10" />
              )}
            </button>
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs uppercase tracking-wider text-champagne-muted flex items-center gap-1">
                <Music className="w-3 h-3 text-gold" />
                <span>{t('hero.musicLabel')}</span>
              </p>
              <p className="text-xs sm:text-sm text-champagne truncate font-medium">
                {t('hero.audio_playing')}
              </p>
            </div>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-emerald bg-emerald/20 border border-emerald/40 px-2 py-0.5 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald animate-ping inline-block" />
            {t('hero.audio_live')}
          </span>
        </div>

        {/* Ceremonial Date & Time Card */}
        <div className="w-full glass-card p-5 sm:p-6 mb-6 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Calendar className="w-5 h-5 text-gold" />
            <span className="font-serif text-xl sm:text-2xl text-champagne tracking-wider">
              {t('hero.date')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gold uppercase tracking-widest font-sans font-semibold">
            {t('hero.day_time')}
          </p>
        </div>

        {/* Banquet Hall Teaser Card with 3D Parallax Tilt */}
        <div
          ref={teaserCardRef}
          className="w-full glass-card-elevated interactive-tilt p-5 sm:p-6 mb-6 text-left relative overflow-hidden"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wider text-gold mb-2">
            <span className="font-semibold">{t('hero.venueTeaserTitle')}</span>
            <span className="px-2 py-0.5 bg-velvet border border-gold/40 text-[10px] font-mono">
              {t('hero.venueTime')}
            </span>
          </div>
          <h4 className="font-serif text-lg sm:text-xl text-champagne font-medium mb-1">
            {t('venue.name')}
          </h4>
          <p className="text-xs sm:text-sm text-champagne-muted font-light mb-4">
            {t('venue.address')}
          </p>
          <button
            onClick={scrollToVenue}
            className="w-full py-2.5 bg-velvet/80 hover:bg-velvet border border-gold/50 text-gold text-xs sm:text-sm uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-95 btn-tactile"
          >
            <MapPin className="w-4 h-4 text-gold" />
            <span>{t('hero.viewOnMap')}</span>
          </button>
        </div>

        {/* Primary Venue Action Button */}
        <button
          onClick={onNavigateToVenue}
          className="w-full py-4 bg-gold-foil text-void font-sans text-xs sm:text-sm uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <MapPin className="w-4 h-4 text-void" />
          <span>{t('hero.viewVenue')}</span>
        </button>
      </div>
    </section>
  );
};
