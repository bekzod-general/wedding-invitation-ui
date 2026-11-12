import React from 'react';
import { useTranslation } from 'react-i18next';
import { Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying, onToggle }) => {
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={onToggle}
        aria-label={isPlaying ? t('audio.pauseAria') : t('audio.playAria')}
        className="relative group flex items-center gap-2.5 px-3.5 py-2.5 bg-surface/90 hover:bg-velvet text-gold border border-gold/40 shadow-velvet-depth hover:border-gold transition-all duration-300 backdrop-blur-md btn-tactile"
      >
        {/* Pulsing acoustic halo ring when playing */}
        {isPlaying && (
          <span className="absolute -inset-1.5 border border-gold/50 animate-speaker-ring pointer-events-none" />
        )}

        <span className="relative flex h-3 w-3 items-center justify-center">
          {isPlaying ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full bg-gold/60 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 bg-gold"></span>
            </>
          ) : (
            <span className="relative inline-flex h-2 w-2 bg-champagne-muted/40"></span>
          )}
        </span>

        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-gold animate-pulse relative z-10" />
        ) : (
          <VolumeX className="w-4 h-4 text-champagne-muted relative z-10" />
        )}

        <span className="hidden sm:inline text-xs uppercase tracking-widest font-sans font-medium text-champagne group-hover:text-gold transition-colors">
          {isPlaying ? t('audio.music') : t('audio.sound')}
        </span>

        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1">
            <span className="w-0.5 h-3 bg-gold animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-4 bg-gold animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-2 bg-gold animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
      </button>
    </div>
  );
};
