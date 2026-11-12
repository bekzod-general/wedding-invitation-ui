import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Language, WEDDING_CONFIG } from '../data/weddingData';
import { useParallaxTilt } from '../hooks/useParallaxTilt';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { MapPin, Navigation, Copy, Check, ExternalLink, Phone, Car } from 'lucide-react';

interface VenueSectionProps {
  language?: Language;
}

export const VenueSection: React.FC<VenueSectionProps> = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [mapType, setMapType] = useState<'standard' | 'satellite'>('standard');
  const venueCardRef = useParallaxTilt<HTMLDivElement>({ maxRotation: 4, scale: 1.01 });

  // Scroll Reveal triggers
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const cardReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const hotlineReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(
      `${t('venue.name')}, ${t('venue.address')} (${WEDDING_CONFIG.venue.lat}, ${WEDDING_CONFIG.venue.lng})`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="venue"
      className="relative py-16 px-4 sm:px-6 w-full overflow-x-hidden flex flex-col items-center"
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Section Header with Scroll Reveal */}
        <div
          ref={headerReveal.ref}
          className={`flex items-center justify-between mb-5 pb-3 border-b border-gold/25 scroll-reveal ${
            headerReveal.isRevealed ? 'is-revealed' : ''
          }`}
        >
          <div className="flex items-center gap-2.5">
            <MapPin className="w-5 h-5 text-gold" />
            <h3 className="font-serif text-xl sm:text-2xl text-champagne font-medium">
              {t('venue.title')}
            </h3>
          </div>
          <span className="text-xs text-gold/90 font-mono bg-surface-lowest px-2.5 py-1 border border-gold/40">
            {WEDDING_CONFIG.venue.gpsText}
          </span>
        </div>

        {/* Venue Title, Ballroom Photo & Amenities Card with 3D Parallax Tilt & Scroll Reveal */}
        <div
          ref={cardReveal.ref}
          className={`scroll-reveal reveal-stagger-1 ${
            cardReveal.isRevealed ? 'is-revealed' : ''
          }`}
        >
          <div
            ref={venueCardRef}
            className="glass-card-elevated interactive-tilt p-5 sm:p-7 mb-6 relative text-left overflow-hidden"
          >
            {/* Grand Ballroom Photo Banner embedded directly inside Card with Gold Accents */}
            <div className="relative w-full h-52 sm:h-64 rounded-sm border border-gold/50 overflow-hidden mb-5 group shadow-lg">
              <img
                src="/images/venue-ballroom.jpg"
                alt="Havas Premium Ballroom"
                className="w-full h-full object-cover animate-ken-burns filter brightness-95 contrast-105"
              />
              {/* Inner Vignette & Border */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-lowest via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-1.5 border border-gold/30 pointer-events-none" />

              {/* Corner Filigrees */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-gold" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-gold" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-gold" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-gold" />

              {/* Venue Tag Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                <span className="px-2.5 py-1 bg-surface-lowest/90 border border-gold/50 text-gold font-serif text-[11px] sm:text-xs uppercase tracking-widest font-semibold shadow-md">
                  «HAVAS PREMIUM» TANTANALAR SAROYI
                </span>
                <span className="px-2.5 py-1 bg-velvet/90 border border-gold/40 text-champagne font-sans text-[11px] font-medium hidden sm:inline-block">
                  18:00
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold font-sans font-semibold mb-1.5">
              <Car className="w-4 h-4 text-gold" />
              <span>{t('venue.badge')}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl text-gold-shimmer font-normal tracking-wide mb-2 leading-tight">
              {t('venue.name')}
            </h2>

            <p className="text-sm sm:text-base text-champagne-muted font-light leading-relaxed mb-4">
              {t('venue.address')}
            </p>

            <p className="text-xs sm:text-sm text-gold/95 italic font-sans mb-5 p-3.5 bg-surface-lowest/80 border border-gold/30 leading-relaxed">
              "{t('venue.disclaimer')}"
            </p>

            {/* Interactive Map Card with Golden Border Sheen */}
            <div className="relative border border-gold/40 shadow-velvet-depth overflow-hidden bg-surface-lowest mb-5 transition-all hover:border-gold/70">
              {/* Map Header with Satellite / Standard Toggle */}
              <div className="bg-surface-high/90 px-3.5 py-2 border-b border-gold/25 flex items-center justify-between text-xs">
                <span className="text-champagne-muted font-sans text-xs uppercase tracking-wider font-medium">
                  {WEDDING_CONFIG.venue.gpsText}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setMapType('standard')}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-all ${
                      mapType === 'standard'
                        ? 'bg-velvet text-gold border-gold font-bold shadow-sm'
                        : 'text-champagne-muted border-transparent hover:text-champagne'
                    }`}
                  >
                    {t('venue.mapModeStandard')}
                  </button>
                  <button
                    onClick={() => setMapType('satellite')}
                    className={`px-2.5 py-1 text-[10px] uppercase tracking-wider border transition-all ${
                      mapType === 'satellite'
                        ? 'bg-velvet text-gold border-gold font-bold shadow-sm'
                        : 'text-champagne-muted border-transparent hover:text-champagne'
                    }`}
                  >
                    {t('venue.mapModeSatellite')}
                  </button>
                </div>
              </div>

              {/* Embedded OpenStreetMap centered at Bukhara (39.740825, 64.433365) */}
              <div className="h-64 sm:h-72 w-full">
                <iframe
                  title="Havas Premium Map"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=64.4233%2C39.7308%2C64.4433%2C39.7508&layer=mapnik&marker=${WEDDING_CONFIG.venue.lat}%2C${WEDDING_CONFIG.venue.lng}`}
                  className={`w-full h-full ${
                    mapType === 'standard'
                      ? 'filter invert-[0.9] hue-rotate-[180deg] contrast-[1.1] opacity-90 hover:opacity-100'
                      : 'opacity-95'
                  } transition-all`}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Primary Yandex Map Button */}
            <a
              href={WEDDING_CONFIG.venue.yandexMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-gold-foil text-void font-sans text-xs sm:text-sm uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 mb-3"
            >
              <MapPin className="w-4 h-4 text-void" />
              <span>{t('venue.btnYandexMaps')}</span>
              <ExternalLink className="w-4 h-4 text-void/80 ml-1" />
            </a>

            {/* Secondary Action Buttons Row */}
            <div className="grid grid-cols-3 gap-2 mb-1">
              <a
                href={WEDDING_CONFIG.venue.yandexGoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 bg-surface/80 hover:bg-velvet text-champagne font-sans text-xs uppercase tracking-wider font-semibold border border-gold/40 hover:border-gold transition-all flex items-center justify-center gap-1.5 text-center truncate hover:scale-[1.02] active:scale-95 btn-tactile"
                title={t('venue.btnYandexGo')}
              >
                <Navigation className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="truncate">Yandex Go</span>
              </a>

              <a
                href={WEDDING_CONFIG.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-2 bg-surface/80 hover:bg-velvet text-champagne font-sans text-xs uppercase tracking-wider font-semibold border border-gold/40 hover:border-gold transition-all flex items-center justify-center gap-1.5 text-center truncate hover:scale-[1.02] active:scale-95 btn-tactile"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="truncate">{t('venue.btnGoogle')}</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="py-3 px-2 bg-surface/80 hover:bg-velvet text-champagne font-sans text-xs uppercase tracking-wider font-semibold border border-gold/40 hover:border-gold transition-all flex items-center justify-center gap-1.5 text-center truncate hover:scale-[1.02] active:scale-95 btn-tactile"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald flex-shrink-0" />
                    <span className="text-emerald truncate">{t('venue.addressCopied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span className="truncate">{t('venue.copyAddress')}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Venue Administration / Coordinator Hotline Card with Scroll Reveal */}
        <div
          ref={hotlineReveal.ref}
          className={`glass-card p-5 sm:p-6 text-center relative transition-all hover:border-gold/50 scroll-reveal reveal-stagger-2 ${
            hotlineReveal.isRevealed ? 'is-revealed' : ''
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/40 flex items-center justify-center mx-auto mb-2.5 text-gold">
            <Phone className="w-5 h-5" />
          </div>
          <h4 className="font-serif text-lg text-champagne font-medium mb-1">
            {t('venue.adminTitle')}
          </h4>
          <p className="text-xs sm:text-sm text-champagne-muted font-light leading-relaxed max-w-sm mx-auto mb-3.5">
            {t('venue.adminDesc')}
          </p>
          <a
            href={`tel:${WEDDING_CONFIG.venue.organizerPhone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-velvet/80 hover:bg-velvet border border-gold/50 text-gold text-xs sm:text-sm font-mono font-semibold tracking-wider transition-all hover:scale-105 active:scale-95 btn-tactile"
          >
            <Phone className="w-4 h-4 text-gold" />
            <span>{WEDDING_CONFIG.venue.organizerPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
