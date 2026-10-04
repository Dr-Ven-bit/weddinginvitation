import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { WeddingEvent } from '../types';
import { DiyaCandle, FloatingLantern } from './Ornaments';
import { DholkiCard } from './DholkiCard';

interface MehndiSectionProps {
  event: WeddingEvent;
  onOpenLocation: (event: WeddingEvent) => void;
}

export const MehndiSection: React.FC<MehndiSectionProps> = ({
  event,
  onOpenLocation,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const dholkiRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isDholkiInView, setIsDholkiInView] = useState(false);

  // Scroll Triggered Animation Sequence using IntersectionObserver with bidirectional re-triggering
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    const dholkiObserver = new IntersectionObserver(
      ([entry]) => {
        setIsDholkiInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    if (dholkiRef.current) {
      dholkiObserver.observe(dholkiRef.current);
    }

    return () => {
      observer.disconnect();
      dholkiObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="mehndi"
      className="relative min-h-screen flex flex-col justify-center items-center px-3 sm:px-6 py-20 sm:py-24 z-10 overflow-hidden"
    >
      {/* ============================================================== */}
      {/* 1. DYNAMIC AMBIENT BOKEH & FESTIVE LIGHT WASHES               */}
      {/* ============================================================== */}
      <div
        className={`absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none transition-opacity duration-1000 ${
          isInView ? 'opacity-100 scale-100' : 'opacity-20 scale-90'
        }`}
      />
      <div
        className={`absolute bottom-1/4 right-1/10 w-80 sm:w-[28rem] h-80 sm:h-[28rem] rounded-full bg-amber-500/15 blur-3xl pointer-events-none transition-opacity duration-1000 delay-300 ${
          isInView ? 'opacity-100 scale-100' : 'opacity-20 scale-90'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[36rem] h-96 sm:h-[36rem] rounded-full bg-fuchsia-600/10 blur-3xl pointer-events-none transition-opacity duration-1000 delay-500 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Floating Fairy Lights and Golden Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Drifting Sparkles */}
        <span className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-amber-300/60 shadow-[0_0_8px_#FDE047] animate-fairy-twinkle" style={{ animationDelay: '0.2s' }} />
        <span className="absolute top-[28%] right-[15%] w-2.5 h-2.5 rounded-full bg-yellow-200/70 shadow-[0_0_10px_#FEF08A] animate-fairy-twinkle" style={{ animationDelay: '1.4s' }} />
        <span className="absolute top-[65%] left-[8%] w-2 h-2 rounded-full bg-emerald-300/50 shadow-[0_0_8px_#6EE7B7] animate-fairy-twinkle" style={{ animationDelay: '0.8s' }} />
        <span className="absolute top-[75%] right-[10%] w-3 h-3 rounded-full bg-amber-400/60 shadow-[0_0_12px_#F59E0B] animate-fairy-twinkle" style={{ animationDelay: '2.1s' }} />
        <span className="absolute top-[45%] left-[20%] w-1.5 h-1.5 rounded-full bg-yellow-100/70 shadow-[0_0_6px_#FFF] animate-fairy-twinkle" style={{ animationDelay: '1.8s' }} />
      </div>

      {/* ============================================================== */}
      {/* 2. SECTION HEADER WITH ARABIC CALLIGRAPHY & FOIL ACCENTS      */}
      {/* ============================================================== */}
      <div className="text-center mb-8 sm:mb-10 max-w-xl mx-auto z-10 px-4">
        <span className="font-arabic text-2xl sm:text-3xl text-emerald-300/90 block mb-1 drop-shadow-[0_2px_12px_rgba(52,211,153,0.4)]">
          {event.arabicTitle || 'لَيْلَةُ الحِنَّاءِ وَالمَحَبَّةِ'}
        </span>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-400/40 text-emerald-300 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans font-semibold mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Chapter One</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-white drop-shadow-[0_2px_20px_rgba(16,185,129,0.35)]">
          <span className="emerald-text-gradient">Mehndi Night</span>
        </h2>

        {/* Animated Emerald & Gold Underline */}
        <div className="flex items-center justify-center gap-2 mt-3">
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-r from-transparent to-emerald-400" />
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
          <div className="h-[2px] w-20 sm:w-24 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
          <div className="w-1.5 h-1.5 rotate-45 bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
          <div className="h-[1px] w-12 sm:w-16 bg-gradient-to-l from-transparent to-emerald-400" />
        </div>

        <p className="font-serif italic text-amber-100/90 text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
          {event.tagline}
        </p>
      </div>

      {/* ============================================================== */}
      {/* 3. LUXURY MEHNDI CARD CONTAINER                               */}
      {/* ============================================================== */}
      <div className="relative w-full max-w-3xl mx-auto z-10">
        {/* Flanking Traditional Brass Diyas on Large Screens */}
        <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2">
          <DiyaCandle label="Barakah" />
        </div>
        <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2">
          <DiyaCandle label="Habib" />
        </div>

        {/* The Master Glassmorphic Card Frame with Festive Gota-Patti & Henna Styling */}
        <div
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(55px)',
            transition: isInView
              ? 'opacity 2.5s cubic-bezier(0.16, 1, 0.3, 1), transform 2.5s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'opacity 0.4s ease-out, transform 0.4s ease-out',
            willChange: 'opacity, transform',
          }}
          className="relative rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-b from-[#062017]/85 via-[#031710]/90 to-[#02100A]/95 backdrop-blur-2xl border-2 border-emerald-400/40 p-4 xs:p-5 sm:p-8 md:p-10 shadow-[0_30px_90px_rgba(0,0,0,0.95)] hover:border-amber-400/50 overflow-hidden"
        >
          
          {/* Subtle Mughal Henna Jaali / Mandala Background Watermark */}
          <div className="absolute inset-0 pointer-events-none opacity-5 mix-blend-screen flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-[120%] h-[120%] stroke-amber-200" fill="none">
              <circle cx="200" cy="200" r="180" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="100" strokeWidth="1.5" />
              <circle cx="200" cy="200" r="60" strokeWidth="1" strokeDasharray="3 3" />
              {Array.from({ length: 16 }).map((_, i) => (
                <line
                  key={i}
                  x1="200"
                  y1="20"
                  x2="200"
                  y2="380"
                  strokeWidth="0.8"
                  transform={`rotate(${i * 11.25} 200 200)`}
                />
              ))}
            </svg>
          </div>

          {/* Gota Patti Gold Fringe / Ribbon along Card Border Header */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_6px_rgba(245,158,11,0.4)]" />

          {/* Traditional Henna Corner Filigrees with Gold Foil Inset */}
          <div className="absolute top-3 left-3 text-emerald-300/40 pointer-events-none">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <path d="M2 38 V2 H38" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="3" fill="#F59E0B" fillOpacity="0.6" />
              <path d="M2 18 C18 18 18 2 18 2" stroke="#FDE047" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="absolute top-3 right-3 text-emerald-300/40 pointer-events-none scale-x-[-1]">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <path d="M2 38 V2 H38" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="3" fill="#F59E0B" fillOpacity="0.6" />
              <path d="M2 18 C18 18 18 2 18 2" stroke="#FDE047" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="absolute bottom-3 left-3 text-emerald-300/40 pointer-events-none scale-y-[-1]">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <path d="M2 38 V2 H38" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="3" fill="#F59E0B" fillOpacity="0.6" />
              <path d="M2 18 C18 18 18 2 18 2" stroke="#FDE047" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="absolute bottom-3 right-3 text-emerald-300/40 pointer-events-none scale-[-1]">
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <path d="M2 38 V2 H38" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="3" fill="#F59E0B" fillOpacity="0.6" />
              <path d="M2 18 C18 18 18 2 18 2" stroke="#FDE047" strokeWidth="1.2" />
            </svg>
          </div>

          {/* ========================================================== */}
          {/* SUBTLE ANIMATED FLOATING LANTERNS GENTLY SWAYING           */}
          {/* ========================================================== */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(18px)',
              transition: isInView
                ? 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s'
                : 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
            className="relative w-full max-w-xl mx-auto h-12 mb-4 pointer-events-none z-0 overflow-visible flex items-start justify-between px-2 sm:px-8"
          >
            <FloatingLantern
              size={26}
              chainLength={24}
              swayClass="animate-lantern-sway-1"
              className="opacity-75 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            />
            <FloatingLantern
              size={34}
              chainLength={14}
              swayClass="animate-lantern-sway-2"
              className="opacity-90 filter drop-shadow-[0_0_16px_rgba(245,158,11,0.7)]"
            />
            <FloatingLantern
              size={34}
              chainLength={16}
              swayClass="animate-lantern-sway-3"
              className="opacity-90 filter drop-shadow-[0_0_16px_rgba(245,158,11,0.7)]"
            />
            <FloatingLantern
              size={26}
              chainLength={26}
              swayClass="animate-lantern-sway-4"
              className="opacity-75 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]"
            />
          </div>

          {/* Authentic Warm Glowing Diya Trio Above Dholkis */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(18px)',
              transition: isInView
                ? 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s'
                : 'opacity 0.4s ease-out, transform 0.4s ease-out',
            }}
            className="flex items-end justify-center gap-6 sm:gap-10 mb-6"
          >
            <div className="transform scale-80 sm:scale-85 opacity-85 hover:scale-95 hover:opacity-100 transition-all duration-300">
              <DiyaCandle />
            </div>
            <div className="transform scale-120 sm:scale-130 z-10 hover:scale-135 transition-all duration-300 drop-shadow-[0_0_24px_rgba(245,158,11,0.6)]">
              <DiyaCandle />
            </div>
            <div className="transform scale-80 sm:scale-85 opacity-85 hover:scale-95 hover:opacity-100 transition-all duration-300">
              <DiyaCandle />
            </div>
          </div>

          {/* ========================================================== */}
          {/* PHASE 2: ANIMATED TEXT & MEHNDI QUOTE (REVEALS AFTER CARD) */}
          {/* ========================================================== */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0) scale(1)' : 'translateY(28px) scale(0.96)',
              transition: isInView
                ? 'opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1) 1.6s, transform 1.3s cubic-bezier(0.16, 1, 0.3, 1) 1.6s'
                : 'opacity 0.4s ease-out, transform 0.4s ease-out',
              willChange: 'opacity, transform',
            }}
            className="text-center max-w-xl mx-auto mb-6 sm:mb-8 px-3"
          >
            <span className="font-arabic text-xl sm:text-2xl text-amber-300/90 block mb-1.5 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]">
              مہندی کی خوشبو، ڈھولک کی تھاپ، خوشیوں کا پیام لائے یہ رات
            </span>
            <p className="font-serif italic text-base sm:text-lg text-amber-100/95 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              {event.themeDescription}
            </p>
          </div>

          {/* ========================================================== */}
          {/* PHASE 3: THREE DHOLKIS GLIDING IN (REVEALS AFTER TEXT)     */}
          {/* ========================================================== */}
          <div className="relative mb-6 select-none">
            {/* Ambient Upward Floating Sparkles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <span className="absolute left-[8%] bottom-2 w-2.5 h-2.5 rounded-full bg-amber-400/40 border border-amber-300/50 animate-bubble-drift" style={{ animationDelay: '0.2s', animationDuration: '4.2s' }} />
              <span className="absolute left-[50%] bottom-3 w-2 h-2 rounded-full bg-emerald-400/40 border border-emerald-300/50 animate-bubble-drift" style={{ animationDelay: '1.8s', animationDuration: '4.8s' }} />
              <span className="absolute right-[10%] bottom-1 w-2.5 h-2.5 rounded-full bg-yellow-300/40 border border-yellow-200/50 animate-bubble-drift" style={{ animationDelay: '0.9s', animationDuration: '4.5s' }} />
            </div>

            {/* Three Dholkis in Balanced Horizontal Row */}
            <div className="grid grid-cols-3 gap-1.5 xs:gap-3 sm:gap-5 md:gap-6 relative z-10 w-full items-center max-w-3xl mx-auto px-1 sm:px-2">
              {/* 1. LEFT SMALL DHOLKI: Festive Saffron & Amber */}
              <DholkiCard
                position="left"
                isAnimatedIn={isInView}
              />

              {/* 2. CENTER LARGE DHOLKI: Royal Rani Magenta & 24K Gold Zardozi (Focal Point) */}
              <DholkiCard
                position="center"
                isAnimatedIn={isInView}
              />

              {/* 3. RIGHT SMALL DHOLKI: Imperial Ruby Maroon & Antique Gold */}
              <DholkiCard
                position="right"
                isAnimatedIn={isInView}
              />
            </div>

            {/* Festive Bed of Fresh Rose Petals & Marigold Blossom under Dholkis */}
            <div
              style={{
                opacity: isInView ? 1 : 0,
                transition: isInView ? 'opacity 1.2s ease-in 3.0s' : 'opacity 0.3s ease-out',
              }}
              className="flex items-center justify-center gap-2 mt-4 text-xs sm:text-sm select-none pointer-events-none"
            >
              <span className="animate-petal-drift">🌸</span>
              <span className="animate-petal-drift" style={{ animationDelay: '0.6s' }}>🌼</span>
              <span className="animate-petal-drift" style={{ animationDelay: '1.2s' }}>🌺</span>
              <span className="animate-petal-drift" style={{ animationDelay: '1.8s' }}>🌼</span>
              <span className="animate-petal-drift" style={{ animationDelay: '2.4s' }}>🌸</span>
            </div>
          </div>

          {/* ========================================================== */}
          {/* PHASE 4: DATE, TIME & VIEW LOCATION BUTTON                 */}
          {/* ========================================================== */}
          <div
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(22px)',
              transition: isInView
                ? 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 3.5s, transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 3.5s'
                : 'opacity 0.3s ease-out, transform 0.3s ease-out',
            }}
          >
            {/* Elegant Date & Time Inscription */}
            <div className="text-center my-6 space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-wide">
                <span className="gold-shine-text">Tuesday, 3rd November 2026</span>
              </h3>
              <p className="font-serif italic text-amber-200/80 text-xs sm:text-sm">
                06:30 PM Onwards • Traditional Henna &amp; Folk Celebrations
              </p>
            </div>

            {/* VIEW LOCATION BUTTON */}
            <div className="pt-5 mt-2 border-t border-emerald-500/20 flex flex-col items-center justify-center">
              <button
                onClick={() => onOpenLocation(event)}
                className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest text-stone-950 bg-gradient-to-r from-emerald-300 via-amber-200 to-yellow-300 hover:from-white hover:via-amber-200 hover:to-emerald-200 shadow-[0_4px_25px_rgba(245,158,11,0.45)] hover:shadow-[0_4px_35px_rgba(245,158,11,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
              >
                {/* Button Shimmer Ray */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                <MapPin className="w-4 h-4 text-stone-950 group-hover:scale-110 transition-transform duration-200" />
                <span>View Location</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
