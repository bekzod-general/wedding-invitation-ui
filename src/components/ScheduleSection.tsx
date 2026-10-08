import React from 'react';
import { Language, TRANSLATIONS, WEDDING_CONFIG } from '../data/weddingData';
import { Star, Clock } from 'lucide-react';

interface ScheduleSectionProps {
  language: Language;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({ language }) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  return (
    <section
      id="schedule"
      className="relative py-16 px-4 sm:px-6 w-full overflow-x-hidden flex flex-col items-center"
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Ceremonial Header Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-lowest border border-gold/40 text-gold text-[10px] uppercase tracking-widest font-semibold mb-3">
            <Star className="w-3 h-3 text-gold fill-gold/40" />
            <span>{t('schedule.badge')}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-champagne font-normal tracking-wide mb-2">
            Bekzod Murotboyev &amp; Parvina Qosimova
          </h2>

          <p className="text-xs text-champagne-muted font-light leading-relaxed max-w-md mx-auto mb-6">
            {language === 'ru'
              ? 'В этот благословенный вечер союза наших сердец приглашаем вас разделить с нами счастье.'
              : language === 'en'
              ? 'On this blessed evening of our sacred union, we warmly invite you to share our joy.'
              : "Muhabbatimiz rishtalari bog'langan muqaddas oqshomda siz aziz mehmonimizni quvonchimizga sherik bo'lishga chorlaymiz."}
          </p>

          {/* 3 Ceremonial Date Badges */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto mb-10 text-center">
            <div className="p-2.5 bg-surface-container/90 border border-gold/40">
              <span className="block font-serif text-base sm:text-lg text-gold font-light">
                10
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-champagne-muted font-sans">
                {language === 'ru' ? 'ЯНВАРЯ' : language === 'en' ? 'JANUARY' : 'YANVAR'}
              </span>
            </div>
            <div className="p-2.5 bg-surface-container/90 border border-gold/40">
              <span className="block font-serif text-base sm:text-lg text-gold font-light">
                18:00
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-champagne-muted font-sans">
                {language === 'ru' ? 'НАЧАЛО' : language === 'en' ? 'START' : 'BOSHLANISHI'}
              </span>
            </div>
            <div className="p-2.5 bg-surface-container/90 border border-gold/40">
              <span className="block font-serif text-base sm:text-lg text-gold font-light">
                2027
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-champagne-muted font-sans">
                {language === 'ru' ? 'ГОД' : language === 'en' ? 'YEAR' : 'YIL'}
              </span>
            </div>
          </div>
        </div>

        {/* Section Title & Steps Count */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-gold/20">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <h3 className="font-serif text-lg sm:text-xl text-champagne font-medium">
              {t('schedule.title')}
            </h3>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gold bg-velvet/80 px-2 py-0.5 border border-gold/40 font-mono">
            {t('schedule.steps')}
          </span>
        </div>

        {/* 4 Ceremonial Milestone Cards matching Stitch design */}
        <div className="space-y-4 mb-10">
          {WEDDING_CONFIG.schedule.map((event, index) => {
            return (
              <div
                key={index}
                className="glass-card-elevated p-4 sm:p-5 relative transition-all hover:border-gold/70"
              >
                {/* Header row: Time & Stage Badge */}
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gold/15">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rotate-45 inline-block" />
                    <span className="font-serif text-base sm:text-lg text-gold font-semibold tracking-wider">
                      {event.time}
                    </span>
                  </div>
                  <span className="text-[9px] uppercase tracking-wider text-gold/90 bg-surface-lowest px-2 py-0.5 border border-gold/30 font-sans">
                    {t(event.badgeKey)}
                  </span>
                </div>

                {/* Milestone Title */}
                <h4 className="font-serif text-base sm:text-lg text-champagne font-medium mb-1.5">
                  {t(event.titleKey)}
                </h4>

                {/* Description */}
                <p className="text-xs text-champagne-muted font-light leading-relaxed mb-3">
                  {t(event.descriptionKey)}
                </p>

                {/* Optional Image Preview per screenshot */}
                {event.imageUrl && (
                  <div className="w-full h-32 sm:h-36 overflow-hidden border border-gold/30 relative mt-2 group">
                    <img
                      src={event.imageUrl}
                      alt={t(event.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent pointer-events-none" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
