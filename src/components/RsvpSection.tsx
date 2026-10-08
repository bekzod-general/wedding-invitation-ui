import React, { useState, useEffect } from 'react';
import { Language, TRANSLATIONS, WEDDING_CONFIG } from '../data/weddingData';
import {
  CheckCircle2,
  Phone,
  Send,
  User,
  Heart,
  MessageCircle,
  Music,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface RsvpSectionProps {
  language: Language;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ language }) => {
  const t = (key: string) => TRANSLATIONS[language][key] || key;

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no'>('yes');
  const [guestsCount, setGuestsCount] = useState<string>('1');
  const [dietary, setDietary] = useState<string[]>(['Milliy taomlar']);
  const [songRequest, setSongRequest] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('wedding_rsvp_submission');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fullName) {
          setFullName(parsed.fullName);
          setPhone(parsed.phone || '');
          setAttendance(parsed.attendance || 'yes');
          setGuestsCount(parsed.guestsCount || '1');
          setDietary(parsed.dietary || ['Milliy taomlar']);
          setSongRequest(parsed.songRequest || '');
          setNotes(parsed.notes || '');
          setIsSubmitted(true);
        }
      } catch (e) {
        console.error('Error loading RSVP', e);
      }
    }
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E5C158', '#4A1525', '#F7E7CE', '#AA820A'],
    });
  };

  const handleDietaryToggle = (item: string) => {
    setDietary((prev) =>
      prev.includes(item) ? prev.filter((d) => d !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const submission = {
        fullName,
        phone,
        attendance,
        guestsCount,
        dietary,
        songRequest,
        notes,
        submittedAt: new Date().toISOString(),
      };

      localStorage.setItem('wedding_rsvp_submission', JSON.stringify(submission));
      setIsSubmitting(false);
      setIsSubmitted(true);
      if (attendance === 'yes') {
        triggerConfetti();
      }
    }, 600);
  };

  const dietaryOptions = [
    { id: 'national', label: t('rsvp.dietNational') },
    { id: 'halal', label: t('rsvp.dietHalal') },
    { id: 'veg', label: t('rsvp.dietVeg') },
    { id: 'kids', label: t('rsvp.dietKids') },
  ];

  const guestCountOptions = [
    { id: '1', label: '1' },
    { id: '2', label: '2 (+1)' },
    { id: '3', label: '3 (+2)' },
    { id: 'family', label: language === 'ru' ? 'Семья' : language === 'en' ? 'Family' : 'Oila' },
  ];

  return (
    <section
      id="rsvp"
      className="relative py-16 px-4 sm:px-6 w-full overflow-x-hidden flex flex-col items-center"
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Monogram Crest & Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 border border-gold/60 mx-auto flex flex-col items-center justify-center bg-velvet/50 shadow-velvet-depth relative mb-3">
            <div className="absolute inset-1 border border-gold/30 pointer-events-none" />
            <span className="font-serif text-xl text-gold font-light tracking-widest">
              BP
            </span>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-gold font-sans font-semibold mb-1">
            TANTANALI NIKOH OQSHOMI
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl text-champagne font-normal tracking-wide mb-2">
            Bekzod <span className="text-gold italic font-normal">&amp;</span> Parvina
          </h2>

          <p className="text-xs text-champagne-muted font-light max-w-md mx-auto leading-relaxed">
            {t('rsvp.subtitle')}
          </p>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="glass-card-elevated p-6 sm:p-8 text-center relative mb-8">
            <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-3" />
            <h3 className="font-serif text-xl sm:text-2xl text-champagne font-medium mb-2">
              {t('rsvp.successTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-champagne-muted font-light leading-relaxed mb-6">
              {t('rsvp.successDesc')}
            </p>

            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 bg-surface/80 hover:bg-velvet text-champagne text-xs uppercase tracking-widest border border-gold/40 hover:border-gold transition-all"
            >
              Ma'lumotlarni o'zgartirish
            </button>
          </div>
        ) : (
          /* Form Card: RSVP ANKETA */
          <div className="glass-card-elevated p-5 sm:p-6 mb-8 relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-gold/20">
              <span className="text-xs uppercase tracking-widest text-gold font-bold">
                {t('rsvp.headerBadge')}
              </span>
              <Heart className="w-4 h-4 text-gold fill-gold/30" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                  {t('rsvp.name')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t('rsvp.namePlaceholder')}
                    className="w-full px-4 py-2.5 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                  <User className="absolute right-3 top-2.5 w-4 h-4 text-gold/40" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                  {t('rsvp.phone')}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('rsvp.phonePlaceholder')}
                    className="w-full px-4 py-2.5 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                  <Phone className="absolute right-3 top-2.5 w-4 h-4 text-gold/40" />
                </div>
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                  {t('rsvp.attendance')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAttendance('yes')}
                    className={`py-2 px-3 text-xs border text-center transition-all ${
                      attendance === 'yes'
                        ? 'bg-velvet border-gold text-gold font-semibold shadow-gold-subtle'
                        : 'bg-surface-lowest/70 border-gold/25 text-champagne-muted hover:border-gold/50'
                    }`}
                  >
                    {t('rsvp.attendingYes')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('no')}
                    className={`py-2 px-3 text-xs border text-center transition-all ${
                      attendance === 'no'
                        ? 'bg-velvet border-gold text-gold font-semibold shadow-gold-subtle'
                        : 'bg-surface-lowest/70 border-gold/25 text-champagne-muted hover:border-gold/50'
                    }`}
                  >
                    {t('rsvp.attendingNo')}
                  </button>
                </div>
              </div>

              {/* Guest Count Selection */}
              {attendance === 'yes' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-champagne-muted font-sans">
                      {t('rsvp.guestsCount')}
                    </label>
                    <span className="text-xs text-gold font-serif font-bold">
                      {guestsCount === 'family' ? 'Oila' : `${guestsCount} KISHI`}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {guestCountOptions.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setGuestsCount(opt.id)}
                        className={`py-1.5 text-xs border text-center transition-all ${
                          guestsCount === opt.id
                            ? 'bg-gold text-void border-gold font-bold shadow-sm'
                            : 'bg-surface-lowest/70 border-gold/25 text-champagne-muted hover:border-gold/50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Preferences Checkboxes */}
              {attendance === 'yes' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                    {t('rsvp.diet')}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {dietaryOptions.map((opt) => {
                      const isChecked = dietary.includes(opt.label);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleDietaryToggle(opt.label)}
                          className={`p-2 text-[11px] border text-left flex items-center gap-2 transition-all ${
                            isChecked
                              ? 'bg-velvet/80 border-gold text-gold font-medium'
                              : 'bg-surface-lowest/60 border-gold/20 text-champagne-muted hover:border-gold/40'
                          }`}
                        >
                          <span
                            className={`w-3 h-3 border flex items-center justify-center text-[9px] ${
                              isChecked
                                ? 'bg-gold border-gold text-void'
                                : 'border-gold/50'
                            }`}
                          >
                            {isChecked && '✓'}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DJ Song Request Input */}
              {attendance === 'yes' && (
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                    {t('rsvp.songRequest')}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={songRequest}
                      onChange={(e) => setSongRequest(e.target.value)}
                      placeholder={t('rsvp.songPlaceholder')}
                      className="w-full px-4 py-2.5 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                    />
                    <Music className="absolute right-3 top-2.5 w-4 h-4 text-gold/40" />
                  </div>
                </div>
              )}

              {/* Notes / Wishes for Newlyweds */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-champagne-muted font-sans mb-1.5">
                  {t('rsvp.notes')}
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t('rsvp.notesPlaceholder')}
                  className="w-full px-4 py-2 bg-surface-lowest/80 border border-gold/40 text-champagne placeholder-champagne-muted/40 text-xs focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gold-foil text-void font-sans text-xs uppercase tracking-widest font-bold border border-gold shadow-gold-glow hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-void" />
                <span>
                  {isSubmitting ? t('rsvp.submitting') : t('rsvp.submit')}
                </span>
              </button>
            </form>
          </div>
        )}

        {/* Wedding Organizers Contact Card matching Stitch screenshot */}
        <div className="glass-card p-4 sm:p-5 mb-6 text-left relative">
          <p className="text-[10px] uppercase tracking-wider text-gold font-sans font-bold mb-1">
            {t('rsvp.hotlineTitle')}
          </p>
          <p className="text-xs text-champagne-muted font-light mb-3">
            {t('rsvp.hotlineDesc')}
          </p>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${WEDDING_CONFIG.venue.organizerPhone.replace(/\s+/g, '')}`}
              className="py-2.5 px-3 bg-velvet/70 hover:bg-velvet border border-gold/50 text-gold text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{t('rsvp.callBtn')}</span>
            </a>

            <a
              href={WEDDING_CONFIG.venue.organizerTelegram}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-surface/80 hover:bg-velvet border border-gold/40 text-champagne text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5 text-gold" />
              <span>{t('rsvp.telegramBtn')}</span>
            </a>
          </div>
        </div>

        {/* Family Hosts Sign-Off Quote */}
        <div className="text-center py-4 px-2">
          <p className="text-[10px] uppercase tracking-widest text-champagne-muted mb-1 font-sans">
            {t('footer.familyHonor')}
          </p>
          <p className="font-serif text-sm sm:text-base text-gold italic font-light leading-relaxed">
            {t('footer.quote')}
          </p>
        </div>
      </div>
    </section>
  );
};
