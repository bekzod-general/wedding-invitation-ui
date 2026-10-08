import React from 'react';
import { Language, TRANSLATIONS } from '../data/weddingData';
import { Heart, Clock, CheckSquare, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  language: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  language,
  activeSection,
  onNavigate,
}) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const items = [
    {
      id: 'hero',
      label: language === 'ru' ? 'CEREMONY' : language === 'uz' ? 'TAKLIFNOMA' : 'CEREMONY',
      sublabel: t('nav.invitation'),
      icon: Heart,
    },
    {
      id: 'schedule',
      label: language === 'ru' ? 'STORY' : language === 'uz' ? 'DASTUR' : 'STORY',
      sublabel: t('nav.schedule'),
      icon: Clock,
    },
    {
      id: 'rsvp',
      label: 'RSVP',
      sublabel: t('nav.rsvp'),
      icon: CheckSquare,
    },
    {
      id: 'wishes',
      label: language === 'ru' ? 'WISHES' : language === 'uz' ? 'TILAKLAR' : 'WISHES',
      sublabel: t('nav.wishes'),
      icon: MessageSquare,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-surface-lowest/95 backdrop-blur-md border-t border-gold/30 px-2 py-1.5 transition-all shadow-[0_-4px_20px_rgba(0,0,0,0.6)]"
      aria-label="Mobile navigation"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {items.map((item) => {
          const isActive =
            activeSection === item.id ||
            (item.id === 'schedule' && activeSection === 'venue');
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-none transition-all relative ${
                isActive
                  ? 'text-gold'
                  : 'text-champagne-muted/70 hover:text-champagne'
              }`}
            >
              {/* Active top indicator line */}
              {isActive && (
                <span className="absolute -top-1.5 left-2 right-2 h-[2px] bg-gold shadow-gold-subtle" />
              )}
              <IconComponent
                className={`w-4 h-4 mb-0.5 transition-transform ${
                  isActive ? 'scale-110 text-gold stroke-[2.2]' : 'stroke-[1.6]'
                }`}
              />
              <span className="font-sans text-[9px] uppercase tracking-wider font-semibold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
