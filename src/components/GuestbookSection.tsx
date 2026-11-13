import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Language, Wish } from '../data/weddingData';
import { useParallaxTilt } from '../hooks/useParallaxTilt';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  subscribeToApprovedWishes,
  submitGuestWish,
  toggleWishHeart,
} from '../lib/firebase';
import {
  Heart,
  Send,
  MessageCircle,
  Mic,
  Clock,
  Sparkles,
  X,
} from 'lucide-react';

interface GuestbookSectionProps {
  language?: Language;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = () => {
  const { t } = useTranslation();

  const [wishes, setWishes] = useState<Wish[]>([]);
  const [myPendingWishes, setMyPendingWishes] = useState<Wish[]>([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('friends');
  const [message, setMessage] = useState('');
  const [virtualGift, setVirtualGift] = useState('💍');
  const [likedWishes, setLikedWishes] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [submittedWishPreview, setSubmittedWishPreview] = useState<Wish | null>(null);

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

  // Subscribe to real-time approved wishes from Firestore
  useEffect(() => {
    // Purge any legacy mock wishes from localStorage
    try {
      localStorage.removeItem('wedding_guest_wishes');
    } catch {
      // ignore
    }

    const unsubscribe = subscribeToApprovedWishes((remoteWishes) => {
      setWishes(remoteWishes);
    });

    return () => {
      unsubscribe();
    };
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

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const initials = name
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase())
      .filter(Boolean)
      .slice(0, 2)
      .join('');

    try {
      const result = await submitGuestWish({
        name: name.trim(),
        initials: initials || 'BP',
        relationshipKey: relationship,
        message: message.trim(),
        virtualGift,
      });

      const newPendingWish: Wish = {
        id: result.id,
        name: name.trim(),
        initials: initials || 'BP',
        relationshipKey: relationship,
        message: `${virtualGift} ${message.trim()}`,
        dateType: 'justNow',
        hearts: 1,
        status: 'pending',
        createdAt: Date.now(),
      };

      // Keep in local pending state so author sees their own wish immediately
      setMyPendingWishes((prev) => [newPendingWish, ...prev]);
      setSubmittedWishPreview(newPendingWish);
      setShowConfirmationModal(true);

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
    } catch (err: any) {
      console.error('Failed to submit wish:', err);
      alert(
        err.message ||
          "Xatolik yuz berdi. Iltimos, Firebase konsolida Firestore ma'lumotlar bazasi yoqilganligini tekshiring."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleHeart = (wishId: string) => {
    const isCurrentlyLiked = likedWishes[wishId];
    setLikedWishes((prev) => ({ ...prev, [wishId]: !isCurrentlyLiked }));

    // Optimistic local UI update
    setWishes((prev) =>
      prev.map((item) => {
        if (item.id === wishId) {
          return {
            ...item,
            hearts: isCurrentlyLiked ? Math.max(1, item.hearts - 1) : item.hearts + 1,
          };
        }
        return item;
      })
    );

    // Sync to Firestore
    toggleWishHeart(wishId, isCurrentlyLiked ? -1 : 1);
  };

  // Filter out any pending wish that has been approved and appeared in remote wishes
  const visiblePendingWishes = myPendingWishes.filter(
    (pending) => !wishes.some((w) => w.id === pending.id)
  );

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
          <div className="w-14 h-14 border border-gold/60 mx-auto mb-3.5 flex items-center justify-center bg-velvet/60 rotate-45 shadow-sm animate-float-gentle">
            <span className="-rotate-45 font-serif text-2xl text-gold font-light tracking-widest">
              BP
            </span>
          </div>

          <p className="text-xs sm:text-sm uppercase tracking-widest text-gold font-mono font-semibold mb-1.5 reveal-stagger-1">
            {t('wishes.badge')}
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl text-gold-shimmer font-normal tracking-wide mb-2.5 reveal-stagger-2 leading-tight">
            {t('wishes.title')}
          </h2>

          <p className="text-sm sm:text-base text-champagne-muted font-light max-w-md mx-auto leading-relaxed reveal-stagger-3">
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
            className="glass-card-elevated interactive-tilt p-6 sm:p-7 mb-8 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-5 pb-2.5 border-b border-gold/20">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-gold font-bold">
                {t('wishes.boxTitle')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-champagne-muted bg-surface-lowest px-2.5 py-1 border border-gold/30 font-sans">
                {t('wishes.boxBadge')}
              </span>
            </div>

            <form onSubmit={handleAddWish} className="space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-xs sm:text-sm uppercase tracking-wider text-champagne-muted font-sans font-medium mb-2">
                  {t('wishes.fullNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('wishes.namePlaceholder')}
                  className="w-full px-4 py-3 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-sm sm:text-base focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              {/* Relationship Selector */}
              <div>
                <label className="block text-xs sm:text-sm uppercase tracking-wider text-champagne-muted font-sans font-medium mb-2">
                  {t('wishes.relation')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {relationshipOptions.map((opt) => {
                    const isSelected = relationship === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRelationship(opt.id)}
                        className={`py-2 px-2.5 text-xs sm:text-sm uppercase tracking-wider border transition-all text-center truncate ${
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
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm uppercase tracking-wider text-champagne-muted font-sans font-medium">
                    {t('wishes.messageLabel')}
                  </label>
                  <span className="text-xs sm:text-sm text-gold/90 italic font-serif">
                    {t('wishes.blessingTag')}
                  </span>
                </div>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('wishes.messagePlaceholder')}
                  className="w-full px-4 py-3 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-sm sm:text-base focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                />
              </div>

              {/* Virtual Gift / Celebration Emojis */}
              <div>
                <label className="block text-xs sm:text-sm uppercase tracking-wider text-champagne-muted font-sans font-medium mb-2">
                  {t('wishes.virtualGift')}
                </label>
                <div className="flex items-center justify-between gap-1.5 p-2.5 bg-surface-lowest/60 border border-gold/30">
                  {giftOptions.map((gift) => (
                    <button
                      key={gift}
                      type="button"
                      onClick={() => setVirtualGift(gift)}
                      className={`text-2xl p-2 transition-all ${
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
                disabled={isSubmitting}
                className={`w-full py-4 bg-gold-foil text-void font-sans text-xs sm:text-sm uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-75 cursor-wait' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
                    <span>{t('wishes.submitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-void" />
                    <span>{t('wishes.sendButton')}</span>
                  </>
                )}
              </button>
            </form>

            {/* Voice Greeting Teaser Button */}
            <div className="mt-4 pt-4 border-t border-gold/15">
              <button
                type="button"
                className="w-full py-3 px-4 bg-velvet/40 border border-gold/30 text-champagne-muted hover:text-gold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all group hover:scale-[1.01] active:scale-95 cursor-pointer"
              >
                <Mic className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
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
          <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-gold/20">
            <span className="text-sm sm:text-base uppercase tracking-widest text-gold font-bold">
              {t('wishes.wallTitle')}
            </span>
            <span className="text-xs text-champagne-muted bg-surface-lowest px-2.5 py-1 border border-gold/30">
              {wishes.length + visiblePendingWishes.length} {t('wishes.countSuffix')}
            </span>
          </div>

          <div className="space-y-3.5">
            {/* 1. Submitting Guest's Pending Wishes (Displayed to the author with pending approval status) */}
            {visiblePendingWishes.map((item) => (
              <div
                key={item.id}
                className="glass-card-elevated border-2 border-amber-400/60 p-5 relative transition-all shadow-[0_0_20px_rgba(217,119,6,0.25)] animate-fade-in"
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-gold/50 bg-velvet flex items-center justify-center font-serif text-sm text-gold font-bold flex-shrink-0 shadow-sm">
                      {item.initials || 'BP'}
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-champagne font-medium leading-tight">
                        {item.name}
                      </h4>
                      {(item.relationshipKey || item.relationship) && (
                        <span className="text-xs uppercase tracking-wider text-gold/90 font-sans block mt-0.5">
                          {getRelationshipLabel(item)}
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs text-amber-300 bg-amber-500/20 border border-amber-500/40 px-2.5 py-1 font-sans">
                    <Clock className="w-3.5 h-3.5 animate-pulse" />
                    <span>{t('wishes.pendingBadge')}</span>
                  </span>
                </div>

                <p className="font-sans text-sm sm:text-base text-champagne-muted font-light leading-relaxed mb-1 italic pl-13">
                  "{item.message}"
                </p>
              </div>
            ))}

            {/* 2. Approved Public Wishes */}
            {wishes.map((item, idx) => {
              const isLiked = likedWishes[item.id];
              const staggerClass =
                idx === 0
                  ? 'reveal-stagger-1'
                  : idx === 1
                  ? 'reveal-stagger-2'
                  : idx === 2
                  ? 'reveal-stagger-3'
                  : '';
              return (
                <div
                  key={item.id}
                  className={`glass-card p-5 relative transition-all hover:border-gold/60 hover:scale-[1.008] ${staggerClass}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    {/* Author with Initials Badge */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-gold/50 bg-velvet flex items-center justify-center font-serif text-sm text-gold font-bold flex-shrink-0 shadow-sm">
                        {item.initials || 'BP'}
                      </div>
                      <div>
                        <h4 className="font-serif text-base text-champagne font-medium leading-tight">
                          {item.name}
                        </h4>
                        {(item.relationshipKey || item.relationship) && (
                          <span className="text-xs uppercase tracking-wider text-gold/90 font-sans block mt-0.5">
                            {getRelationshipLabel(item)}
                          </span>
                        )}
                      </div>
                    </div>

                    <span className="text-xs text-champagne-muted/70 font-sans whitespace-nowrap">
                      {getDateDisplay(item)}
                    </span>
                  </div>

                  <p className="font-sans text-sm sm:text-base text-champagne-muted font-light leading-relaxed mb-3.5 italic pl-13">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => handleToggleHeart(item.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm border transition-all active:scale-90 cursor-pointer ${
                        isLiked
                          ? 'bg-velvet border-gold text-gold shadow-gold-subtle scale-105'
                          : 'bg-surface-lowest/60 border-gold/25 text-champagne-muted hover:border-gold/50'
                      }`}
                      aria-label="Heart this wish"
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform ${
                          isLiked ? 'text-gold fill-gold scale-110' : 'text-champagne-muted'
                        }`}
                      />
                      <span className="font-mono text-xs sm:text-sm">{item.hearts}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {wishes.length === 0 && visiblePendingWishes.length === 0 && (
            <div className="text-center py-8 text-champagne-muted text-sm">
              <MessageCircle className="w-7 h-7 text-gold/40 mx-auto mb-2" />
              <p>{t('wishes.empty')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Luxury Royal Confirmation Modal */}
      {showConfirmationModal && submittedWishPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-surface-lowest border-2 border-gold/70 shadow-velvet-depth p-6 sm:p-7 text-center">
            {/* Ornate Corner Brackets */}
            <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-gold pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-gold pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="absolute top-3.5 right-3.5 text-champagne-muted hover:text-gold p-1 transition-colors cursor-pointer"
              aria-label={t('wishes.closeModal')}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Icon */}
            <div className="w-16 h-16 rounded-full bg-velvet border-2 border-gold/80 mx-auto mb-3.5 flex items-center justify-center shadow-gold-glow animate-float-gentle">
              <Sparkles className="w-8 h-8 text-gold animate-pulse" />
            </div>

            <p className="text-xs uppercase tracking-widest text-gold font-mono font-semibold mb-1">
              10.01.2027 • BEKZOD &amp; PARVINA
            </p>

            <h3 className="font-serif text-2xl text-gold-shimmer font-normal mb-3">
              {t('wishes.pendingNoticeTitle')}
            </h3>

            <p className="text-xs sm:text-sm text-champagne-muted font-light leading-relaxed mb-5">
              {t('wishes.pendingNoticeDesc')}
            </p>

            {/* Preview of the submitted wish */}
            <div className="bg-surface-container/70 border border-gold/30 p-3.5 text-left mb-6">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-serif text-sm text-champagne font-medium">
                  {submittedWishPreview.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-sans uppercase tracking-wider bg-amber-500/15 border border-amber-500/30 px-2 py-0.5">
                  <Clock className="w-3 h-3" />
                  {t('wishes.pendingBadge')}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-champagne-muted italic">
                "{submittedWishPreview.message}"
              </p>
            </div>

            {/* Close/Acknowledge Button */}
            <button
              type="button"
              onClick={() => setShowConfirmationModal(false)}
              className="w-full py-3.5 px-6 bg-gold-foil text-void font-sans text-xs sm:text-sm uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              {t('wishes.closeModal')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
