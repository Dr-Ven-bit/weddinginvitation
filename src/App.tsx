import React, { useState, useEffect } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { WelcomeSection } from './components/WelcomeSection';
import { MehndiSection } from './components/MehndiSection';
import { BaratSection } from './components/BaratSection';
import { WalimaSection } from './components/WalimaSection';
import { RsvpSection } from './components/RsvpSection';
import { WeddingDuaSection } from './components/WeddingDuaSection';
import { LocationModal } from './components/LocationModal';
import { weddingEvents } from './data/events';
import { WeddingEvent } from './types';
import { IslamicStar8 } from './components/Ornaments';
import { ChevronUp } from 'lucide-react';
import { BackgroundMusicPlayer } from './components/BackgroundMusicPlayer';

export default function App() {
  const [currentSection, setCurrentSection] = useState<'welcome' | 'mehndi' | 'barat' | 'walima' | 'rsvp'>('welcome');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  // Modals state
  const [selectedLocationEvent, setSelectedLocationEvent] = useState<WeddingEvent | null>(null);

  // Monitor scroll for section detection & canvas gradient interpolation
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalHeight)) : 0;
      setScrollProgress(progress);

      // Section calculation
      const welcomeEl = document.getElementById('welcome');
      const mehndiEl = document.getElementById('mehndi');
      const baratEl = document.getElementById('barat');
      const walimaEl = document.getElementById('walima');
      const rsvpEl = document.getElementById('rsvp');

      const scrollPos = window.scrollY + window.innerHeight * 0.4;

      if (rsvpEl && scrollPos >= rsvpEl.offsetTop) {
        setCurrentSection('rsvp');
      } else if (walimaEl && scrollPos >= walimaEl.offsetTop) {
        setCurrentSection('walima');
      } else if (baratEl && scrollPos >= baratEl.offsetTop) {
        setCurrentSection('barat');
      } else if (mehndiEl && scrollPos >= mehndiEl.offsetTop) {
        setCurrentSection('mehndi');
      } else {
        setCurrentSection('welcome');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-[#EAE6DF] font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Dynamic Background Canvas with smooth scroll transitions & particle system */}
      <BackgroundCanvas currentSection={currentSection} scrollProgress={scrollProgress} />

      {/* Background Nasheed Music Player (Mishary Alafasy starting at 0:40) */}
      <BackgroundMusicPlayer onPlayingChange={setIsPlayingMusic} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 1: Opening / Welcome */}
        <WelcomeSection
          onScrollNext={() => scrollToSection('mehndi')}
        />

        {/* Section 2: Mehndi Night */}
        <MehndiSection
          event={weddingEvents.mehndi}
          onOpenLocation={(evt) => setSelectedLocationEvent(evt)}
        />

        {/* Sacred Sunnah Wedding Dua Interlude */}
        <WeddingDuaSection />

        {/* Section 3: Barat */}
        <BaratSection
          event={weddingEvents.barat}
          onOpenLocation={(evt) => setSelectedLocationEvent(evt)}
        />

        {/* Section 4: Walima Reception */}
        <WalimaSection
          event={weddingEvents.walima}
          onOpenLocation={(evt) => setSelectedLocationEvent(evt)}
        />

        {/* Section 5: RSVP — Inayatullah Family & Relatives */}
        <RsvpSection />
      </main>

      {/* Royal Closing Invitation Footer */}
      <footer className="relative z-10 py-20 px-4 sm:px-6 border-t border-amber-500/20 bg-gradient-to-b from-black/50 via-[#0A050B]/80 to-black/95 backdrop-blur-2xl text-center overflow-hidden">
        {/* Ambient Golden Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="relative max-w-3xl mx-auto space-y-6">
          {/* Top Royal Emblem with Flanking Filigree Lines */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-amber-400/60" />
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full bg-amber-400/20 blur-md animate-pulse" />
              <IslamicStar8 size={36} className="text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]" />
            </div>
            <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          {/* Majestic Royal Names Presentation */}
          <div className="space-y-3 py-2">
            {/* Groom's Name */}
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wide gold-text-gradient drop-shadow-[0_4px_25px_rgba(251,191,36,0.4)]">
              Habib ur Rehman
            </h3>

            {/* Ornamental Conjunction */}
            <div className="flex items-center justify-center gap-3 my-2">
              <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-amber-300" />
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
                <span className="font-serif italic text-amber-200 text-sm sm:text-base font-light">with</span>
                <span className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
              </div>
              <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-amber-400/60 to-amber-300" />
            </div>

            {/* Bride Revered Reference */}
            <div className="space-y-1">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] font-sans font-semibold text-amber-300/90 block">
                Daughter of
              </span>
              <h4 className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium tracking-wide drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
                Peer Mufti Muhammad Masood Ahmad Faridi
              </h4>
            </div>
          </div>

          {/* Delicate Divider Ornament */}
          <div className="flex items-center justify-center gap-3 max-w-xs mx-auto py-1 opacity-70">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            <span className="w-1 h-1 rounded-full bg-amber-300" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400/40 to-transparent" />
          </div>

          <p className="font-serif italic text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-light">
            &ldquo;With deep gratitude to our beloved parents, elders, and families whose unconditional
            prayers and love have brought us to this blessed union.&rdquo;
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 border-t border-amber-500/10 gap-3">
            <span className="tracking-wider">#HabibWedding2026 • Royal Wedding Celebration</span>
            <button
              onClick={() => scrollToSection('welcome')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300/90 hover:text-amber-100 hover:border-amber-400/40 transition-all cursor-pointer"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Venue & Location Modal */}
      <LocationModal
        event={selectedLocationEvent}
        onClose={() => setSelectedLocationEvent(null)}
      />
    </div>
  );
}
