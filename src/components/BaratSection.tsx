import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';
import { WeddingEvent } from '../types';
import { HangingLantern } from './Ornaments';

gsap.registerPlugin(ScrollTrigger);

interface BaratSectionProps {
  event: WeddingEvent;
  onOpenLocation: (event: WeddingEvent) => void;
}

export const BaratSection: React.FC<BaratSectionProps> = ({
  event,
  onOpenLocation,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const compositionRef = useRef<HTMLDivElement | null>(null);

  // Layer refs for animations (both desktop and mobile)
  const layerBack1Ref = useRef<HTMLDivElement | null>(null);
  const layerBack2Ref = useRef<HTMLDivElement | null>(null);
  const mainCardRef = useRef<HTMLDivElement | null>(null);
  const haloDiscRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineStemRef = useRef<HTMLDivElement | null>(null);
  const timelineNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomCapsuleRef = useRef<HTMLDivElement | null>(null);
  const sideNarrativeRef = useRef<HTMLDivElement | null>(null);
  const mobileLanternRef = useRef<HTMLDivElement | null>(null);
  const leftLanternRef = useRef<HTMLDivElement | null>(null);
  const rightLanternRef = useRef<HTMLDivElement | null>(null);

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // GSAP ScrollTrigger timeline setup — calm, royal pacing on both desktop & mobile
  useEffect(() => {
    const section = sectionRef.current;
    const mainCard = mainCardRef.current;
    if (!section || !mainCard) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([mainCard, layerBack1Ref.current, layerBack2Ref.current], {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      });
      return;
    }

    // Set initial states for cinematic reveal across all screen sizes
    const resetAnimationState = () => {
      if (layerBack1Ref.current) {
        gsap.set(layerBack1Ref.current, {
          opacity: 0,
          x: -35,
          y: -25,
          rotation: -4,
          scale: 0.92,
        });
      }
      if (layerBack2Ref.current) {
        gsap.set(layerBack2Ref.current, {
          opacity: 0,
          x: 30,
          y: 30,
          rotation: 3,
          scale: 0.94,
        });
      }

      gsap.set(mainCard, {
        opacity: 0,
        scale: 0.88,
        y: 40,
        rotationX: 10,
        filter: 'blur(16px)',
        transformPerspective: 1200,
      });

      if (haloDiscRef.current) {
        gsap.set(haloDiscRef.current, {
          opacity: 0,
          scale: 0.5,
          rotation: -90,
        });
      }

      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: -12 });
      }

      const validLetters = lettersRef.current.filter(Boolean);
      if (validLetters.length > 0) {
        gsap.set(validLetters, { opacity: 0, y: 24, scale: 0.8 });
      }

      if (lineStemRef.current) {
        gsap.set(lineStemRef.current, { scaleY: 0, transformOrigin: 'top center' });
      }

      const validNodes = timelineNodesRef.current.filter(Boolean);
      if (validNodes.length > 0) {
        gsap.set(validNodes, { opacity: 0, y: 20, scale: 0.96 });
      }

      if (bottomCapsuleRef.current) {
        gsap.set(bottomCapsuleRef.current, { opacity: 0, y: 18 });
      }

      if (sideNarrativeRef.current) {
        gsap.set(sideNarrativeRef.current, { opacity: 0, x: -30 });
      }

      const lanternElements = [
        leftLanternRef.current,
        rightLanternRef.current,
        mobileLanternRef.current,
      ].filter(Boolean);

      if (lanternElements.length > 0) {
        gsap.set(lanternElements, { opacity: 0, y: -45 });
      }
    };

    resetAnimationState();

    const lanternElements = [
      leftLanternRef.current,
      rightLanternRef.current,
      mobileLanternRef.current,
    ].filter(Boolean);
    const validLetters = lettersRef.current.filter(Boolean);
    const validNodes = timelineNodesRef.current.filter(Boolean);

    // Scroll-triggered choreography matching WalimaSection's agile and elegant speed
    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 15%',
        onEnter: () => {
          resetAnimationState();
          tl.restart();
        },
        onEnterBack: () => {
          resetAnimationState();
          tl.restart();
        },
      },
    });

    // 1. Lanterns glide into place with slow, royal poise
    if (lanternElements.length > 0) {
      tl.to(lanternElements, {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.22,
        ease: 'power2.out',
      });
    }

    // 2. Back glass layers enter smoothly with deliberate royal pacing
    tl.to(
      [layerBack1Ref.current, layerBack2Ref.current],
      {
        opacity: 0.7,
        x: (i) => (i === 0 ? -18 : 20),
        y: (i) => (i === 0 ? -14 : 18),
        rotation: (i) => (i === 0 ? -2.5 : 2),
        scale: 1,
        duration: 1.5,
        stagger: 0.22,
        ease: 'power2.out',
      },
      '-=0.8'
    )
      // 3. Main glass panel scales up smoothly, blur clears gently
      .to(
        mainCard,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1.7,
          ease: 'power2.out',
        },
        '-=0.9'
      )
      // 4. Side narrative fades in with calm elegance
      .to(
        sideNarrativeRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=0.9'
      )
      // 5. Large circular halo disc rotates slowly into position behind title
      .to(
        haloDiscRef.current,
        {
          opacity: 0.9,
          scale: 1,
          rotation: 0,
          duration: 1.8,
          ease: 'power2.out',
        },
        '-=1.0'
      )
      // 6. "THE BARAT" label fades in
      .to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          ease: 'power2.out',
        },
        '-=0.8'
      )
      // 7. "BARAT" reveals letter-by-letter with slow, majestic cadence
      .to(
        validLetters,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.16,
          ease: 'power2.out',
        },
        '-=0.6'
      )
      // 8. Timeline line draws itself smoothly from top to bottom
      .to(
        lineStemRef.current,
        {
          scaleY: 1,
          duration: 1.8,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
      // 9. Date, day, time, venue nodes glide in with buttery smooth easing
      .to(
        validNodes,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.85,
          stagger: 0.28,
          ease: 'power2.out',
        },
        '-=1.4'
      )
      // 10. Bottom capsule appears gently
      .to(
        bottomCapsuleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power2.out',
        },
        '-=0.4'
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  // Subtle 3D mouse parallax tilt (desktop & touch)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!compositionRef.current) return;
    const rect = compositionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 5;
    const tiltY = ((x - centerX) / centerX) * 5;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  // Timeline items on front face
  const timelineSteps = [
    { label: 'DATE', value: '05 • 11 • 2026', sub: 'Thursday' },
    { label: 'DAY', value: 'Thursday', sub: 'Auspicious Lunar Union' },
    { label: 'TIME', value: '12:00 PM', sub: 'Departure of Barat' },
    { label: 'VENUE', value: event.venue, sub: `${event.address}, ${event.city}` },
  ];

  const titleWord = 'BARAT';

  return (
    <section
      ref={sectionRef}
      id="barat"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-20 sm:py-28 z-10 overflow-hidden"
    >
      {/* Dynamic Crimson & Champagne Lighting Orbs */}
      <div className="absolute top-1/3 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-rose-950/25 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* Decorative Hanging Palace Lanterns (Visible on desktop flanks, plus top mobile lantern) */}
      <div
        ref={leftLanternRef}
        className="hidden xl:block absolute top-12 left-12 z-20 pointer-events-none animate-lantern-sway"
      >
        <HangingLantern />
      </div>
      <div
        ref={rightLanternRef}
        className="hidden xl:block absolute top-12 right-12 z-20 pointer-events-none animate-lantern-sway-delayed"
      >
        <HangingLantern />
      </div>

      {/* Mobile Top Hanging Lantern (Ensuring mobile view has rich festive animations) */}
      <div
        ref={mobileLanternRef}
        className="xl:hidden flex justify-center mb-4 z-20 pointer-events-none animate-lantern-sway"
      >
        <HangingLantern />
      </div>

      {/* Main Container: Layered Asymmetrical Composition */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center z-10">
        
        {/* LEFT COLUMN: Editorial Narrative, Arabic Verse & Details */}
        <div ref={sideNarrativeRef} className="lg:col-span-5 text-center lg:text-left space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/50 border border-amber-500/30 text-amber-300 text-[11px] uppercase tracking-[0.25em] font-sans font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Chapter Two</span>
          </div>

          <div className="space-y-1.5">
            <span
              className="font-arabic text-3xl sm:text-4xl text-amber-200/90 block leading-relaxed drop-shadow-[0_2px_15px_rgba(251,191,36,0.35)]"
              dir="rtl"
            >
              عَقْدُ الْقِرَانِ وَمَوْكِبُ الْعِرْسِ
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium tracking-tight">
              The Royal Procession
            </h3>
          </div>

          <p className="font-serif italic text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-md mx-auto lg:mx-0">
            &ldquo;{event.themeDescription}&rdquo;
          </p>
        </div>

        {/* RIGHT COLUMN: The Unique "Royal Glass Frame" Suspended Composition */}
        <div
          ref={compositionRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-7 relative flex justify-center items-center perspective-1200 py-4 sm:py-6"
        >
          {/* ========================================================= */}
          {/* BACK GLASS LAYER 1 (Tilted Left, Offset Top-Left)         */}
          {/* ========================================================= */}
          <div
            ref={layerBack1Ref}
            className="absolute w-[88%] sm:w-[380px] h-[590px] sm:h-[640px] rounded-[32px] bg-gradient-to-br from-rose-950/30 via-[#1a050e]/40 to-black/60 border border-amber-500/20 backdrop-blur-md pointer-events-none transition-transform duration-[1600ms] shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            style={{
              transform: isHovered
                ? `translate3d(${tilt.y * -1.8 - 18}px, ${tilt.x * -1.8 - 14}px, -40px) rotate(-3deg)`
                : 'translate3d(-18px, -14px, -40px) rotate(-2.5deg)',
            }}
          />

          {/* ========================================================= */}
          {/* BACK GLASS LAYER 2 (Tilted Right, Arched Bottom-Right)     */}
          {/* ========================================================= */}
          <div
            ref={layerBack2Ref}
            className="absolute w-[90%] sm:w-[390px] h-[580px] sm:h-[630px] rounded-[36px] bg-gradient-to-tl from-amber-500/10 via-[#15040a]/50 to-rose-950/40 border border-rose-500/25 backdrop-blur-lg pointer-events-none transition-transform duration-[1600ms] shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
            style={{
              transform: isHovered
                ? `translate3d(${tilt.y * 1.5 + 20}px, ${tilt.x * 1.5 + 18}px, -20px) rotate(2.5deg)`
                : 'translate3d(20px, 18px, -20px) rotate(2deg)',
            }}
          />

          {/* ========================================================= */}
          {/* THE ROYAL GLASS FRAME (NON-FLIPPING SOLID LUXURY CARD)    */}
          {/* ========================================================= */}
          <div
            ref={mainCardRef}
            style={{
              transform: isHovered
                ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                : 'rotateX(0deg) rotateY(0deg)',
              transition: isHovered ? 'transform 0.25s ease-out' : 'transform 1.4s ease-out',
            }}
            className="relative w-full max-w-[340px] sm:max-w-[400px] rounded-[34px] p-[1.5px] bg-gradient-to-b from-amber-200/70 via-amber-400/30 to-amber-300/60 shadow-[0_35px_90px_-15px_rgba(0,0,0,0.95),0_0_35px_rgba(251,191,36,0.25)] preserve-3d"
          >
            {/* CARD BODY */}
            <div className="relative rounded-[32.5px] bg-gradient-to-b from-[#1C060F]/85 via-[#130309]/92 to-[#090104]/96 backdrop-blur-2xl px-6 sm:px-8 pt-9 pb-7 text-center overflow-hidden">
              
              {/* Animated Specular Light Reflection Sweep across the surface */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[32px]">
                <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-white/12 to-transparent animate-glass-sheen" />
              </div>

              {/* Inner Islamic Geometric Hairline Border Frame */}
              <div className="absolute inset-3 rounded-[26px] border border-amber-400/20 pointer-events-none" />

              {/* LARGE ROTATING CIRCULAR ELEMENT BEHIND TITLE */}
              <div
                ref={haloDiscRef}
                className="absolute top-10 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full pointer-events-none flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full bg-amber-400/10 blur-xl animate-pulse" />
                <svg
                  viewBox="0 0 200 200"
                  fill="none"
                  className="w-full h-full text-amber-400/25 animate-[spin_50s_linear_infinite]"
                >
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
                  <circle cx="100" cy="100" r="72" stroke="currentColor" strokeWidth="1" />
                  <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="0.8" />
                  <rect x="50" y="50" width="100" height="100" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 100 100)" />
                  <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.8" />
                </svg>
              </div>

              {/* TOP AREA: Label & Big BARAT Title */}
              <div className="relative z-10 pt-1 pb-5">
                <div ref={subtitleRef} className="flex flex-col items-center gap-1.5 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-300" />
                    <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-semibold text-amber-300">
                      The Barat
                    </span>
                    <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-300" />
                  </div>
                </div>

                {/* Grand BARAT Title */}
                <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-[0.25em] text-white my-1 drop-shadow-[0_4px_25px_rgba(251,191,36,0.4)]">
                  {titleWord.split('').map((char, index) => (
                    <span
                      key={index}
                      ref={(el) => {
                        lettersRef.current[index] = el;
                      }}
                      className="inline-block gold-text-gradient"
                    >
                      {char}
                    </span>
                  ))}
                </h2>

                <p className="font-serif italic text-xs text-amber-200/80 mt-0.5">
                  The Royal Procession
                </p>
              </div>

              {/* CENTER AREA: Vertical Glowing Timeline-Style Layout */}
              <div className="relative z-10 py-4 my-1 max-w-[280px] mx-auto">
                <div
                  ref={lineStemRef}
                  className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-amber-400 via-amber-300 to-amber-400/40 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                />

                <div className="space-y-5">
                  {timelineSteps.map((step, idx) => (
                    <div
                      key={idx}
                      ref={(el) => {
                        timelineNodesRef.current[idx] = el;
                      }}
                      className="relative flex flex-col items-center"
                    >
                      <div className="relative z-10 w-5 h-5 rounded-full bg-[#18050D] border border-amber-300 flex items-center justify-center shadow-[0_0_10px_rgba(251,191,36,0.5)] mb-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      </div>

                      <div className="text-center px-3 sm:px-4 py-2 rounded-xl bg-black/40 border border-white/5 backdrop-blur-sm min-w-[210px] sm:min-w-[230px]">
                        <span className="text-[11px] sm:text-xs uppercase tracking-[0.28em] font-sans font-semibold text-amber-400/90 block">
                          {step.label}
                        </span>
                        <p className="font-serif text-lg sm:text-xl font-medium text-white leading-tight mt-1">
                          {step.value}
                        </p>
                        <span className="text-xs sm:text-[13px] text-stone-300 font-sans block mt-1 font-light">
                          {step.sub}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM AREA: View Location Capsule & Subtle Islamic Ornament */}
              <div ref={bottomCapsuleRef} className="relative z-10 pt-4 mt-1 space-y-3">
                {/* View Location Capsule Button */}
                <button
                  onClick={() => onOpenLocation(event)}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-amber-300/20 via-amber-400/30 to-amber-300/20 hover:from-amber-300/30 hover:to-amber-300/30 border border-amber-400/60 text-amber-100 hover:text-white shadow-[0_0_20px_rgba(251,191,36,0.25)] hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] transition-all cursor-pointer text-xs uppercase tracking-[0.25em] font-sans font-semibold"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>View Location</span>
                </button>

                {/* Subtle Decorative Islamic Finial Ornament */}
                <div className="pt-2 flex justify-center text-amber-400/60">
                  <svg width="30" height="15" viewBox="0 0 60 30" fill="none">
                    <path
                      d="M0 15 Q15 0 30 15 Q45 30 60 15"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <circle cx="30" cy="15" r="2.5" fill="#FDE047" />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
