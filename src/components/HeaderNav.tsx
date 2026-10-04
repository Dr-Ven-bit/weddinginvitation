import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audio';

interface HeaderNavProps {
  currentSection: 'welcome' | 'mehndi' | 'barat' | 'walima' | 'rsvp';
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentSection,
  onNavigate,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMusic = () => {
    const playing = weddingAudio.toggle();
    setIsPlayingMusic(playing);
  };

  const navItems = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'mehndi', label: 'Mehndi' },
    { id: 'barat', label: 'Barat' },
    { id: 'walima', label: 'Walima' },
    { id: 'rsvp', label: 'RSVP' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#080C14]/85 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => onNavigate('welcome')}
          className="text-left font-display text-lg sm:text-xl font-semibold tracking-[0.2em] uppercase text-amber-200/90 hover:text-amber-100 transition-colors cursor-pointer"
        >
          Habib ur Rehman
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.2em] font-medium text-amber-100/75" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-amber-300 font-semibold drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                    : 'text-stone-300/80 hover:text-amber-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Ambient Music Player Button */}
          <button
            onClick={toggleMusic}
            title={isPlayingMusic ? 'Mute ambient melody' : 'Play ambient harp melody'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 text-xs rounded-full border border-amber-500/30 bg-amber-950/30 hover:bg-amber-900/40 text-amber-200/90 transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="hidden sm:inline tracking-wider font-serif">Music On</span>
                {/* Micro soundwave animation */}
                <span className="flex items-center gap-[2px] h-3 ml-0.5">
                  <span className="w-[2px] bg-amber-400 h-2 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-[2px] bg-amber-300 h-3 animate-[pulse_0.6s_ease-in-out_infinite_0.2s]" />
                  <span className="w-[2px] bg-amber-400 h-1.5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
                <span className="hidden sm:inline tracking-wider font-serif text-stone-400">Play Music</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Mini Nav Bar */}
      <div className="md:hidden flex items-center justify-around px-4 pt-2.5 mt-2 border-t border-amber-500/10 text-[11px] uppercase tracking-widest text-stone-300/80">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`py-1 cursor-pointer transition-colors ${
                isActive ? 'text-amber-300 font-semibold border-b border-amber-400' : 'text-stone-400'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
