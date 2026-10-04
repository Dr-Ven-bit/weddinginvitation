import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestBlessing } from '../types';
import { initialBlessings } from '../data/events';
import { IslamicStar8 } from './Ornaments';

interface DuasAndWishesProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const DuasAndWishes: React.FC<DuasAndWishesProps> = () => {
  const [blessings, setBlessings] = useState<GuestBlessing[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_blessings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialBlessings;
  });

  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_blessings', JSON.stringify(blessings));
    } catch {
      // ignore
    }
  }, [blessings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBlessing: GuestBlessing = {
        id: 'blessing-' + Date.now(),
        author: author.trim(),
        relation: relation.trim() || 'Family Friend',
        message: message.trim(),
        date: 'Today',
      };

      setBlessings((prev) => [newBlessing, ...prev]);
      setAuthor('');
      setRelation('');
      setMessage('');
      setIsSubmitting(false);
      setHasSubmitted(true);

      // Gold confetti shower
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#FFF2D1', '#F59E0B', '#FDE68A'],
        });
      } catch {
        // safe fallback
      }

      setTimeout(() => setHasSubmitted(false), 5000);
    }, 400);
  };

  return (
    <section id="duas" className="relative py-24 px-4 sm:px-6 z-10">
      <div className="max-w-4xl mx-auto">
        {/* Prophetic Sunnah Dua Card */}
        <div className="text-center mb-16 p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-amber-500/10 via-black/40 to-black/60 border border-amber-500/25 backdrop-blur-xl shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
          <div className="flex justify-center mb-4">
            <IslamicStar8 size={32} />
          </div>

          <h3 className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-amber-300/90 mb-4">
            The Prophetic Wedding Supplication
          </h3>

          <p
            className="font-arabic text-2xl sm:text-3xl md:text-4xl text-amber-200 leading-loose mb-4 drop-shadow-[0_2px_15px_rgba(251,191,36,0.3)]"
            dir="rtl"
          >
            بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </p>

          <p className="font-serif italic text-base sm:text-lg text-stone-200 max-w-xl mx-auto">
            &ldquo;May Allah bless you, and shower His blessings upon you both, and unite you together in goodness and harmony.&rdquo;
          </p>
          <span className="block text-[11px] uppercase tracking-widest text-amber-400/80 font-sans mt-2">
            Sunan Abi Dawud • Hadith 2130
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-[11px] uppercase tracking-[0.3em] font-sans font-semibold text-amber-400">
            Guestbook &amp; Prayers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-wider text-white mt-1">
            <span className="gold-text-gradient">Blessings for Habib ur Rehman</span>
          </h2>
          <p className="font-serif italic text-stone-300 text-sm sm:text-base mt-2 max-w-md mx-auto">
            We cherish your prayers and heartfelt wishes as we embark on this sacred new chapter.
          </p>
        </div>

        {/* 2-Column: Form on left, Prayers wall on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submission Form */}
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-black/40 border border-amber-500/20 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-amber-500/15">
              <MessageCircleHeart className="w-4 h-4 text-amber-400" />
              <h4 className="font-serif text-lg text-white font-medium">Leave Your Dua / Blessing</h4>
            </div>

            {hasSubmitted && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>JazakAllah Khair! Your blessing has been added to our guestbook.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-sans text-stone-300 mb-1">
                  Your Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Uncle Farhan &amp; Family"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-500/25 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-sans text-stone-300 mb-1">
                  Relationship to Couple
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Bride's Classmate, Groom's Cousin"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-500/25 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-500"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-sans text-stone-300 mb-1">
                  Your Dua or Message <span className="text-amber-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a prayer, loving memories, or heartfelt wishes..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-900/60 border border-amber-500/25 text-stone-100 text-sm focus:outline-none focus:border-amber-400 transition-colors placeholder:text-stone-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-amber-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 hover:from-white hover:to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-amber-950" />
                <span>{isSubmitting ? 'Sending Dua...' : 'Post Your Dua'}</span>
              </button>
            </form>
          </div>

          {/* Live Blessings Wall */}
          <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-black/35 border border-amber-500/15 backdrop-blur-md shadow-md transition-all duration-300 hover:border-amber-500/35"
              >
                {b.duaInArabic && (
                  <p className="font-arabic text-lg text-amber-300/90 mb-2 leading-relaxed" dir="rtl">
                    {b.duaInArabic}
                  </p>
                )}
                <p className="font-serif text-stone-200 text-sm sm:text-base leading-relaxed">
                  &ldquo;{b.message}&rdquo;
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/5 text-xs">
                  <div className="flex items-center gap-1.5 text-amber-200/90 font-medium">
                    <Heart className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{b.author}</span>
                    <span className="text-stone-500">({b.relation})</span>
                  </div>
                  <span className="text-stone-500 text-[11px] font-sans">{b.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
