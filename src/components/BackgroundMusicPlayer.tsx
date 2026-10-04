import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundMusicPlayerProps {
  onPlayingChange?: (isPlaying: boolean) => void;
}

export const BackgroundMusicPlayer: React.FC<BackgroundMusicPlayerProps> = ({ onPlayingChange }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Downloaded and pre-cropped studio track: "Rahman Ya Rahman" by Mishary Rashid Alafasy
  // Precisely starts at 0:40 for immediate zero-delay playback
  const AUDIO_SRC = '/audio/rahman-ya-rahman.mp3';

  useEffect(() => {
    let isMounted = true;
    const audio = audioRef.current;
    if (!audio) return;

    // Safe volume configuration (handles iOS read-only volume gracefully)
    try {
      audio.volume = 0.8;
    } catch {
      // iOS devices do not allow programmatic volume changes
    }

    const handlePlayState = () => {
      if (!isMounted) return;
      setIsPlaying(true);
      onPlayingChange?.(true);
    };

    const handlePauseState = () => {
      if (!isMounted) return;
      setIsPlaying(false);
      onPlayingChange?.(false);
    };

    audio.addEventListener('play', handlePlayState);
    audio.addEventListener('pause', handlePauseState);

    // Attempt instant autoplay on page open
    const startPlayback = async () => {
      if (!audio) return;
      try {
        await audio.play();
      } catch {
        // Browser Autoplay Policy requires first user gesture
      }
    };

    startPlayback();

    // Catch any user gesture (tap, touch, click, scroll, keydown) to start instantly without delay
    const handleUserGesture = () => {
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    };

    const gestureEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'keydown'] as const;

    gestureEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserGesture, { once: true, passive: true });
      document.addEventListener(evt, handleUserGesture, { once: true, passive: true });
    });

    return () => {
      isMounted = false;
      audio.removeEventListener('play', handlePlayState);
      audio.removeEventListener('pause', handlePauseState);
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserGesture);
        document.removeEventListener(evt, handleUserGesture);
      });
    };
  }, [onPlayingChange]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      {/* Native In-DOM Audio Element with Preload for Zero-Delay Background Playback */}
      <audio
        ref={audioRef}
        id="bg-nasheed-audio"
        src={AUDIO_SRC}
        preload="auto"
        loop
        playsInline
      />

      {/* Floating Audio Controller Badge (Bottom-Right) */}
      <button
        onClick={togglePlay}
        title={isPlaying ? 'Mute Background Nasheed' : 'Play Background Nasheed (Rahman Ya Rahman)'}
        aria-label={isPlaying ? 'Mute Background Nasheed' : 'Play Background Nasheed'}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.85)] group ${
          isPlaying
            ? 'border-amber-400/50 bg-[#0B0814]/90 text-amber-200 hover:border-amber-300 hover:text-white'
            : 'border-amber-400/80 bg-gradient-to-r from-amber-950/90 via-[#180A12]/95 to-black/90 text-amber-300 animate-pulse hover:animate-none hover:border-amber-300 hover:scale-105 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
        }`}
      >
        {isPlaying ? (
          <>
            {/* Animated Equalizer Sound Bars */}
            <div className="flex items-end gap-[3px] h-3.5 w-3.5 pb-0.5" aria-hidden="true">
              <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-duration:0.6s]" style={{ height: '70%' }} />
              <span className="w-1 bg-amber-300 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" style={{ height: '100%' }} />
              <span className="w-1 bg-amber-400 rounded-full animate-bounce [animation-duration:0.5s] [animation-delay:0.4s]" style={{ height: '50%' }} />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold font-sans hidden sm:inline text-amber-200">
              Playing • Rahman Ya Rahman
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold font-sans sm:hidden text-amber-200">
              Playing
            </span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <Music className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="absolute -inset-1 rounded-full bg-amber-400/20 blur-sm animate-ping pointer-events-none" />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold font-sans hidden sm:inline text-amber-200 group-hover:text-white">
              Play Nasheed • رحمٰن یا رحمٰن
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold font-sans sm:hidden text-amber-200 group-hover:text-white">
              Play Nasheed
            </span>
          </>
        )}
      </button>
    </>
  );
};
