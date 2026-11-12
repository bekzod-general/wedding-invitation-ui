import React from 'react';
import { useTranslation } from 'react-i18next';
import { Language } from '../data/weddingData';
import { Heart, MapPin, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  language?: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { t } = useTranslation();

  const items = [
    {
      id: 'hero',
      label: t('bottomNav.ceremony'),
      sublabel: t('nav.invitation'),
      icon: Heart,
    },
    {
      id: 'venue',
      label: t('bottomNav.venue'),
      sublabel: t('nav.venue'),
      icon: MapPin,
    },
    {
      id: 'wishes',
      label: t('bottomNav.wishes'),
      sublabel: t('nav.wishes'),
      icon: MessageSquare,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-lowest/95 backdrop-blur-md border-t border-gold/30 px-2 py-1.5 transition-all shadow-[0_-4px_25px_rgba(0,0,0,0.7)]"
      aria-label="Mobile navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-1">
        {items.map((item) => {
          const isActive = activeSection === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-none transition-all duration-200 relative select-none btn-tactile ${
                isActive
                  ? 'text-gold'
                  : 'text-champagne-muted/70 hover:text-champagne hover:scale-105'
              }`}
            >
              {/* Active top indicator line with golden shimmer aura */}
              {isActive && (
                <span className="absolute -top-1.5 left-2 right-2 h-[2px] bg-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
              )}
              <IconComponent
                className={`w-4.5 h-4.5 mb-1 transition-all duration-300 ${
                  isActive
                    ? 'scale-110 text-gold stroke-[2.4] drop-shadow-[0_0_8px_rgba(212,175,55,0.7)]'
                    : 'stroke-[1.6]'
                }`}
              />
              <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
