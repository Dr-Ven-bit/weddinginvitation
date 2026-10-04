import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { BismillahCalligraphy, IslamicStar8, FloralCorner, DividerOrnament } from './Ornaments';

interface WelcomeSectionProps {
  onScrollNext: () => void;
}

interface WelcomeSpark {
  left: string;
  bottom: string;
  size: number;
  blur: number;
  duration: number;
  delay: number;
  animType: 1 | 2;
}

const welcomeSparks: WelcomeSpark[] = [
  { left: '12%', bottom: '15%', size: 6, blur: 1.8, duration: 7.0, delay: -1.2, animType: 1 },
  { left: '25%', bottom: '28%', size: 5, blur: 1.4, duration: 6.5, delay: -3.5, animType: 2 },
  { left: '40%', bottom: '12%', size: 8, blur: 2.4, duration: 8.0, delay: -2.0, animType: 1 },
  { left: '62%', bottom: '22%', size: 4, blur: 1.2, duration: 6.0, delay: -4.8, animType: 2 },
  { left: '78%', bottom: '14%', size: 7, blur: 2.0, duration: 7.5, delay: -0.8, animType: 1 },
  { left: '88%', bottom: '30%', size: 5, blur: 1.5, duration: 6.8, delay: -5.2, animType: 2 },
  { left: '18%', bottom: '60%', size: 6, blur: 1.8, duration: 7.2, delay: -2.8, animType: 1 },
  { left: '32%', bottom: '70%', size: 7, blur: 2.2, duration: 8.2, delay: -4.1, animType: 2 },
  { left: '68%', bottom: '65%', size: 5, blur: 1.5, duration: 6.3, delay: -1.6, animType: 1 },
  { left: '84%', bottom: '55%', size: 8, blur: 2.5, duration: 7.8, delay: -3.9, animType: 2 },
];

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onScrollNext }) => {
  return (
    <section
      id="welcome"
      className="relative min-h-screen flex flex-col justify-between items-center px-3 sm:px-6 pt-16 sm:pt-20 pb-10 text-center select-none overflow-hidden"
    >
      {/* Floating Stardust Spark Keyframes */}
      <style>{`
        @keyframes welcomeFloat1 {
          0% {
            transform: translate(0px, 12px) scale(0.65);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          50% {
            transform: translate(-12px, -35px) scale(1.15);
            opacity: 0.95;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translate(8px, -75px) scale(0.65);
            opacity: 0;
          }
        }
        @keyframes welcomeFloat2 {
          0% {
            transform: translate(0px, 15px) scale(0.7);
            opacity: 0;
          }
          25% {
            opacity: 0.9;
          }
          55% {
            transform: translate(14px, -45px) scale(1.25);
            opacity: 1;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-10px, -85px) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Glow behind whole section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] rounded-full bg-gradient-to-r from-emerald-600/10 via-amber-500/15 to-rose-950/10 blur-[150px] pointer-events-none" />

      {/* Soft Moving Stardust / Golden Bokeh Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {welcomeSparks.map((spark, idx) => (
          <span
            key={idx}
            className="absolute select-none pointer-events-none rounded-full bg-amber-300"
            style={{
              left: spark.left,
              bottom: spark.bottom,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              boxShadow: `0 0 ${spark.size * 2}px rgba(251, 191, 36, 0.9)`,
              filter: `blur(${spark.blur}px)`,
              animation: `${spark.animType === 1 ? 'welcomeFloat1' : 'welcomeFloat2'} ${spark.duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: `${spark.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Outer Border / Arabesque Frame */}
      <div className="absolute inset-3 sm:inset-6 md:inset-8 border border-amber-500/20 rounded-3xl pointer-events-none transition-all duration-700">
        <FloralCorner position="top-left" />
        <FloralCorner position="top-right" />
        <FloralCorner position="bottom-left" />
        <FloralCorner position="bottom-right" />
      </div>

      {/* Top Header Group: Bismillah & Quranic Verse */}
      <div className="w-full max-w-4xl mx-auto pt-2 z-10">
        {/* Central Geometric Rosette */}
        <div className="flex justify-center mb-2">
          <IslamicStar8 size={32} className="animate-[spin_45s_linear_infinite]" />
        </div>

        {/* Bismillah Calligraphy in authentic Arabic */}
        <BismillahCalligraphy className="mb-2.5" />

        {/* Quranic Verse */}
        <div className="max-w-2xl mx-auto px-4">
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-white leading-relaxed font-light drop-shadow-sm">
            &ldquo;And among His signs is that He created for you mates from among yourselves, that you
            may dwell in tranquility with them, and He has put love and mercy between your hearts.&rdquo;
          </p>
          <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-amber-400/80 font-sans mt-1">
            Surah Ar-Rum • 30:21
          </span>
        </div>

        <DividerOrnament className="my-3 max-w-xs mx-auto opacity-75" />
      </div>

      {/* ============================================================== */}
      {/* PURE FRAMELESS ROYAL ANNOUNCEMENT (NO CARD / NO BOX BACKGROUND) */}
      {/* ============================================================== */}
      <div className="relative w-full max-w-4xl mx-auto my-auto py-4 sm:py-6 px-4 sm:px-6 z-10 text-center">
        {/* 1. Header Banner */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 select-none">
          <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent via-amber-400/40 to-amber-300/90" />
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="text-[10px] sm:text-xs text-amber-300/80 animate-pulse">✦</span>
            <span className="text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.35em] text-white font-sans font-semibold drop-shadow-sm">
              Together With Their Families
            </span>
            <span className="text-[10px] sm:text-xs text-amber-300/80 animate-pulse" style={{ animationDelay: '1s' }}>✦</span>
          </div>
          <span className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent via-amber-400/40 to-amber-300/90" />
        </div>

        {/* 2. Esteemed Hosts: Mr. & Mrs. Inayatullah */}
        <div className="my-3 sm:my-4">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F8DE7E] to-[#D4AF37] drop-shadow-[0_2px_18px_rgba(251,191,36,0.5)]">
            Mr. &amp; Mrs. Inayatullah
          </h2>
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-white font-light mt-1.5 leading-relaxed max-w-xl mx-auto drop-shadow-sm">
            cordially invite you to grace the auspicious occasion of the wedding ceremony of their beloved son
          </p>
        </div>

        {/* 3. The Beloved Groom: Habib ur Rehman (Monumental Typography) */}
        <div className="relative my-4 sm:my-6">
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-amber-400/15 blur-3xl rounded-full pointer-events-none" />

          <div className="relative inline-flex items-center justify-center gap-2 sm:gap-4">
            <span className="hidden sm:inline-block text-amber-300 text-sm md:text-base animate-pulse">✦</span>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_4px_35px_rgba(251,191,36,0.6)] leading-none select-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF2] via-[#FDE68A] via-[#E5C158] to-[#C99E32]">
                Habib ur Rehman
              </span>
            </h1>
            <span className="hidden sm:inline-block text-amber-300 text-sm md:text-base animate-pulse" style={{ animationDelay: '1.2s' }}>✦</span>
          </div>
        </div>

        {/* 4. Symmetrical "with" Ligature with Golden Diamond Jewels */}
        <div className="flex items-center justify-center gap-3 my-3 sm:my-4 select-none">
          <span className="h-[1px] w-14 sm:w-28 bg-gradient-to-r from-transparent via-amber-400/40 to-amber-400/80" />
          <div className="flex items-center gap-2 text-amber-300">
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            <span className="font-serif italic text-lg sm:text-2xl md:text-3xl text-amber-200 font-light px-2">
              with
            </span>
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
          </div>
          <span className="h-[1px] w-14 sm:w-28 bg-gradient-to-l from-transparent via-amber-400/40 to-amber-400/80" />
        </div>

        {/* 5. The Bride's Lineage */}
        <div className="my-3 sm:my-5 space-y-1.5">
          <span className="block font-serif italic text-sm sm:text-base md:text-lg text-amber-200/90 font-light tracking-wide">
            Daughter of
          </span>

          <h3 className="font-serif tracking-tight select-none">
            <span className="font-serif italic text-base sm:text-xl md:text-2xl lg:text-3xl text-amber-200/85 font-normal mr-2 sm:mr-3 inline-block">
              Peer Mufti
            </span>
            <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#F8DE7E] to-[#D4AF37] drop-shadow-[0_3px_25px_rgba(251,191,36,0.5)]">
              Muhammad Masood Ahmad Faridi
            </span>
          </h3>
        </div>

        {/* 6. Interactive Action Trigger */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={onScrollNext}
            className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-amber-950 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 hover:from-white hover:to-amber-200 shadow-[0_0_25px_rgba(251,191,36,0.45)] transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-900 group-hover:rotate-12 transition-transform" />
            <span>Explore Celebrations</span>
          </button>
        </div>
      </div>



      {/* Scroll to Discover prompt with animated arrow */}
      <div className="z-10 pt-2">
        <button
          onClick={onScrollNext}
          className="group flex flex-col items-center gap-1 text-amber-200/70 hover:text-amber-200 transition-colors cursor-pointer"
          aria-label="Scroll to discover events"
        >
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-sans font-medium text-amber-300/80">
            Scroll to Discover
          </span>
          <div className="w-6 h-6 rounded-full border border-amber-500/30 flex items-center justify-center bg-black/30 backdrop-blur-sm group-hover:border-amber-400/70 transition-all">
            <ChevronDown className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
};
