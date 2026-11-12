import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Language, INITIAL_WISHES, Wish } from '../data/weddingData';
import { useParallaxTilt } from '../hooks/useParallaxTilt';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Heart, Send, MessageCircle, Mic } from 'lucide-react';

interface GuestbookSectionProps {
  language?: Language;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = () => {
  const { t } = useTranslation();

  const [wishes, setWishes] = useState<Wish[]>(INITIAL_WISHES);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('friends');
  const [message, setMessage] = useState('');
  const [virtualGift, setVirtualGift] = useState('💍');
  const [likedWishes, setLikedWishes] = useState<Record<string, boolean>>({});

  const formCardRef = useParallaxTilt<HTMLDivElement>({ maxRotation: 4, scale: 1.01 });

  // Scroll Reveal triggers
  const headerReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const formReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.08 });
  const wallReveal = useScrollReveal<HTMLDivElement>({ threshold: 0.06 });

  const relationshipOptions = [
    { id: 'groom', label: t('wishes.relGroom') },
    { id: 'bride', label: t('wishes.relBride') },
    { id: 'friends', label: t('wishes.relFriends') },
    { id: 'relatives', label: t('wishes.relRelatives') },
    { id: 'colleagues', label: t('wishes.relColleagues') },
  ];

  const giftOptions = ['💍', '🥂', '🕊️', '💐', '❤️'];

  useEffect(() => {
    const saved = localStorage.getItem('wedding_guest_wishes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishes(parsed);
        }
      } catch (e) {
        console.error('Error loading wishes', e);
      }
    }
  }, []);

  const getRelationshipLabel = (item: Wish) => {
    if (item.relationshipKey) {
      switch (item.relationshipKey) {
        case 'groom':
          return t('wishes.relGroom');
        case 'bride':
          return t('wishes.relBride');
        case 'friends':
          return t('wishes.relFriends');
        case 'relatives':
          return t('wishes.relRelatives');
        case 'colleagues':
          return t('wishes.relColleagues');
        default:
          return item.relationshipKey;
      }
    }
    return item.relationship;
  };

  const getDateDisplay = (item: Wish) => {
    if (item.dateType === 'today') {
      return `${t('wishes.today')}, ${item.time || ''}`.trim();
    }
    if (item.dateType === 'yesterday') {
      return `${t('wishes.yesterday')}, ${item.time || ''}`.trim();
    }
    if (item.dateType === 'justNow') {
      return t('wishes.justNow');
    }
    return item.date || t('wishes.justNow');
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const initials = name
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase())
      .filter(Boolean)
      .slice(0, 2)
      .join('');

    const newWish: Wish = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      initials: initials || 'BP',
      relationshipKey: relationship,
      message: `${virtualGift} ${message.trim()}`,
      dateType: 'justNow',
      hearts: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch (e) {
      console.error('Could not save wish', e);
    }

    // Celebration Confetti burst
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#F7E7CE', '#E5C158', '#FF6B8B'],
      shapes: ['star', 'circle'],
      ticks: 200,
      zIndex: 9999,
    });

    setName('');
    setMessage('');
  };

  const handleToggleHeart = (wishId: string) => {
    const isCurrentlyLiked = likedWishes[wishId];
    setLikedWishes((prev) => ({ ...prev, [wishId]: !isCurrentlyLiked }));

    const updated = wishes.map((item) => {
      if (item.id === wishId) {
        return {
          ...item,
          hearts: isCurrentlyLiked ? item.hearts - 1 : item.hearts + 1,
        };
      }
      return item;
    });

    setWishes(updated);
    try {
      localStorage.setItem('wedding_guest_wishes', JSON.stringify(updated));
    } catch (e) {
      console.error('Could not save updated heart count', e);
    }
  };

  return (
    <section
      id="wishes"
      className="relative py-16 px-4 sm:px-6 w-full overflow-x-hidden flex flex-col items-center"
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Section Header with Scroll Reveal */}
        <div
          ref={headerReveal.ref}
          className={`text-center mb-8 scroll-reveal ${
            headerReveal.isRevealed ? 'is-revealed' : ''
          }`}
        >
          <div className="w-12 h-12 border border-gold/50 mx-auto mb-3 flex items-center justify-center bg-velvet/50 rotate-45 shadow-sm animate-float-gentle">
            <span className="-rotate-45 font-serif text-xl text-gold font-light tracking-widest">
              BP
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-gold font-mono font-semibold mb-1 reveal-stagger-1">
            {t('wishes.badge')}
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl text-gold-shimmer font-normal tracking-wide mb-2 reveal-stagger-2">
            {t('wishes.title')}
          </h2>

          <p className="text-xs text-champagne-muted font-light max-w-md mx-auto leading-relaxed reveal-stagger-3">
            {t('wishes.subtitle')}
          </p>
        </div>

        {/* Wish Submission Form Card with Scroll Reveal & 3D Tilt */}
        <div
          ref={formReveal.ref}
          className={`scroll-reveal ${formReveal.isRevealed ? 'is-revealed' : ''}`}
        >
          <div
            ref={formCardRef}
            className="glass-card-elevated interactive-tilt p-5 sm:p-6 mb-8 relative overflow-hidden"
          >
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold/20">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              {t('wishes.boxTitle')}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-champagne-muted bg-surface-lowest px-2 py-0.5 border border-gold/30 font-sans">
              {t('wishes.boxBadge')}
            </span>
          </div>

          <form onSubmit={handleAddWish} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                {t('wishes.fullNameLabel')}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('wishes.namePlaceholder')}
                className="w-full px-4 py-2 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
              />
            </div>

            {/* Relationship Selector */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                {t('wishes.relation')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {relationshipOptions.map((opt) => {
                  const isSelected = relationship === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRelationship(opt.id)}
                      className={`py-1.5 px-2 text-[10px] uppercase tracking-wider border transition-all text-center truncate ${
                        isSelected
                          ? 'bg-velvet border-gold text-gold font-semibold shadow-gold-subtle scale-[1.02]'
                          : 'bg-surface-lowest/70 text-champagne-muted border-gold/25 hover:border-gold/50'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Area */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] uppercase tracking-wider text-champagne-muted font-sans">
                  {t('wishes.messageLabel')}
                </label>
                <span className="text-[10px] text-gold/80 italic font-serif">
                  {t('wishes.blessingTag')}
                </span>
              </div>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('wishes.messagePlaceholder')}
                className="w-full px-4 py-2 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
              />
            </div>

            {/* Virtual Gift / Celebration Emojis */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                {t('wishes.virtualGift')}
              </label>
              <div className="flex items-center justify-between gap-1 p-2 bg-surface-lowest/60 border border-gold/30">
                {giftOptions.map((gift) => (
                  <button
                    key={gift}
                    type="button"
                    onClick={() => setVirtualGift(gift)}
                    className={`text-xl p-1.5 transition-all ${
                      virtualGift === gift
                        ? 'scale-125 bg-velvet border border-gold shadow-gold-subtle'
                        : 'opacity-70 hover:opacity-100 hover:scale-110'
                    }`}
                  >
                    {gift}
                  </button>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-gold-foil text-void font-sans text-xs uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-void" />
              <span>{t('wishes.sendButton')}</span>
            </button>
          </form>

          {/* Voice Greeting Teaser Button */}
          <div className="mt-3 pt-3 border-t border-gold/15">
            <button
              type="button"
              className="w-full py-2.5 px-3 bg-velvet/40 border border-gold/30 text-champagne-muted hover:text-gold text-xs flex items-center justify-center gap-2 transition-all group hover:scale-[1.01] active:scale-95"
            >
              <Mic className="w-3.5 h-3.5 text-gold group-hover:scale-110 transition-transform" />
              <span>{t('wishes.voiceTeaser')}</span>
            </button>
          </div>
        </div>
      </div>

        {/* Wishes Display Wall with Staggered Scroll Reveal */}
        <div
          ref={wallReveal.ref}
          className={`mb-8 scroll-reveal ${wallReveal.isRevealed ? 'is-revealed' : ''}`}
        >
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold/20">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">
              {t('wishes.wallTitle')}
            </span>
            <span className="text-[10px] text-champagne-muted bg-surface-lowest px-2 py-0.5 border border-gold/30">
              {wishes.length} {t('wishes.countSuffix')}
            </span>
          </div>

          <div className="space-y-3">
            {wishes.map((item, idx) => {
              const isLiked = likedWishes[item.id];
              const staggerClass = idx === 0 ? 'reveal-stagger-1' : idx === 1 ? 'reveal-stagger-2' : idx === 2 ? 'reveal-stagger-3' : '';
              return (
                <div
                  key={item.id}
                  className={`glass-card p-4 relative transition-all hover:border-gold/60 hover:scale-[1.008] ${staggerClass}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    {/* Author with Initials Badge */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 border border-gold/50 bg-velvet flex items-center justify-center font-serif text-xs text-gold font-bold flex-shrink-0 shadow-sm">
                        {item.initials || 'BP'}
                      </div>
                      <div>
                        <h4 className="font-serif text-sm text-champagne font-medium leading-tight">
                          {item.name}
                        </h4>
                        {(item.relationshipKey || item.relationship) && (
                          <span className="text-[9px] uppercase tracking-wider text-gold/80 font-sans block mt-0.5">
                            {getRelationshipLabel(item)}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-champagne-muted/60 font-sans whitespace-nowrap">
                      {getDateDisplay(item)}
                    </span>
                  </div>

                  <p className="font-sans text-xs text-champagne-muted font-light leading-relaxed mb-3 italic pl-11">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleToggleHeart(item.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border transition-all active:scale-90 ${
                        isLiked
                          ? 'bg-velvet border-gold text-gold shadow-gold-subtle scale-105'
                          : 'bg-surface-lowest/60 border-gold/25 text-champagne-muted hover:border-gold/50'
                      }`}
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-transform ${
                          isLiked ? 'text-gold fill-gold scale-110' : 'text-champagne-muted'
                        }`}
                      />
                      <span className="text-[11px] font-mono">{item.hearts}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {wishes.length === 0 && (
            <div className="text-center py-8 text-champagne-muted text-xs">
              <MessageCircle className="w-6 h-6 text-gold/40 mx-auto mb-2" />
              <p>{t('wishes.empty')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
