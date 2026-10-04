import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IslamicStar8 } from './Ornaments';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface RsvpSparkItem {
  left: string;
  bottom: string;
  size: number;
  blur: number;
  duration: number;
  delay: number;
  animType: 1 | 2 | 3;
  color: string;
}

// 16 Soft-blurred moving golden bokeh sparks drifting across the compact RSVP section
const rsvpSparksList: RsvpSparkItem[] = [
  { left: '12%', bottom: '12%', size: 6, blur: 2, duration: 6.8, delay: -1.5, animType: 1, color: 'rgba(253, 230, 138, 0.95)' },
  { left: '24%', bottom: '20%', size: 5, blur: 1.5, duration: 7.2, delay: -4.0, animType: 2, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '35%', bottom: '8%', size: 7, blur: 2.5, duration: 8.1, delay: -2.2, animType: 3, color: 'rgba(245, 158, 11, 0.85)' },
  { left: '48%', bottom: '16%', size: 4, blur: 1.2, duration: 6.2, delay: -5.4, animType: 1, color: 'rgba(255, 243, 199, 1)' },
  { left: '60%', bottom: '10%', size: 8, blur: 2.8, duration: 7.6, delay: -0.8, animType: 2, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '72%', bottom: '22%', size: 5, blur: 1.8, duration: 6.9, delay: -3.6, animType: 3, color: 'rgba(253, 230, 138, 0.95)' },
  { left: '85%', bottom: '14%', size: 6, blur: 2.2, duration: 8.0, delay: -6.1, animType: 1, color: 'rgba(245, 158, 11, 0.85)' },

  // Mid & Upper Floating Sparks
  { left: '16%', bottom: '45%', size: 5, blur: 1.8, duration: 6.5, delay: -3.2, animType: 2, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '30%', bottom: '52%', size: 7, blur: 2.2, duration: 7.5, delay: -1.0, animType: 3, color: 'rgba(253, 230, 138, 0.95)' },
  { left: '52%', bottom: '44%', size: 4, blur: 1.2, duration: 5.9, delay: -4.8, animType: 1, color: 'rgba(255, 248, 220, 1)' },
  { left: '68%', bottom: '54%', size: 7, blur: 2.5, duration: 8.2, delay: -2.6, animType: 2, color: 'rgba(245, 158, 11, 0.85)' },
  { left: '82%', bottom: '46%', size: 5, blur: 1.6, duration: 6.7, delay: -5.0, animType: 3, color: 'rgba(253, 230, 138, 0.95)' },

  // Upper Dome Sparks
  { left: '22%', bottom: '72%', size: 5, blur: 1.5, duration: 6.4, delay: -2.8, animType: 3, color: 'rgba(255, 240, 180, 0.95)' },
  { left: '42%', bottom: '76%', size: 6, blur: 2.2, duration: 7.7, delay: -4.3, animType: 1, color: 'rgba(251, 191, 36, 0.85)' },
  { left: '58%', bottom: '70%', size: 4, blur: 1.2, duration: 5.7, delay: -1.8, animType: 2, color: 'rgba(253, 230, 138, 1)' },
  { left: '76%', bottom: '74%', size: 7, blur: 2.6, duration: 8.0, delay: -3.5, animType: 3, color: 'rgba(245, 158, 11, 0.8)' },
];

export const RsvpSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const topBorderRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const familyBoxRef = useRef<HTMLDivElement | null>(null);
  const bottomBorderRef = useRef<HTMLDivElement | null>(null);
  const sparksContainerRef = useRef<HTMLDivElement | null>(null);

  // Interactive 3D Parallax & Spotlight state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(
        [
          card,
          auraRef.current,
          topBorderRef.current,
          titleRef.current,
          dividerRef.current,
          familyBoxRef.current,
          bottomBorderRef.current,
          sparksContainerRef.current,
        ],
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      );
      return;
    }

    const resetAnimationState = () => {
      gsap.set(card, {
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: 'blur(10px)',
      });

      if (auraRef.current) {
        gsap.set(auraRef.current, { opacity: 0, scale: 0.75 });
      }

      if (topBorderRef.current) {
        gsap.set(topBorderRef.current, { opacity: 0, scaleX: 0 });
      }

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 16, scale: 0.94 });
      }

      if (dividerRef.current) {
        gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 });
      }

      if (familyBoxRef.current) {
        gsap.set(familyBoxRef.current, { opacity: 0, y: 20, scale: 0.96 });
      }

      if (bottomBorderRef.current) {
        gsap.set(bottomBorderRef.current, { opacity: 0, scaleX: 0 });
      }

      if (sparksContainerRef.current) {
        gsap.set(sparksContainerRef.current, { opacity: 0 });
      }
    };

    resetAnimationState();

    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
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

    // 1. Atmospheric aura expands
    tl.to(auraRef.current, {
      opacity: 0.85,
      scale: 1,
      duration: 0.9,
      ease: 'power2.out',
    })
      // 2. Frameless compact section glides into focus
      .to(
        card,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.7'
      )
      // 3. Ornate Top Border sweeps across gently
      .to(
        topBorderRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.45'
      )
      // 4. Grand RSVP title shimmers into place
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.35'
      )
      // 5. Center laser divider sweeps open
      .to(
        dividerRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      // 6. Inayatullah Family & Relatives cartouche ascends
      .to(
        familyBoxRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.25'
      )
      // 7. Ornate Bottom Border sweeps across
      .to(
        bottomBorderRef.current,
        {
          opacity: 1,
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      // 8. Soft bokeh sparks emerge
      .to(
        sparksContainerRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = -((y - rect.height / 2) / (rect.height / 2)) * 2;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 2;

    const spotlightX = (x / rect.width) * 100;
    const spotlightY = (y / rect.height) * 100;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x: spotlightX, y: spotlightY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 50, y: 50 });
  };

  return (
    <section
      ref={sectionRef}
      id="rsvp"
      className="relative py-10 sm:py-16 px-4 sm:px-6 z-10 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Keyframes for continuously moving bokeh sparks */}
      <style>{`
        @keyframes rsvpBokehFloat1 {
          0% {
            transform: translate(0px, 12px) scale(0.65);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          50% {
            transform: translate(-10px, -35px) scale(1.15);
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
        @keyframes rsvpBokehFloat2 {
          0% {
            transform: translate(0px, 15px) scale(0.7);
            opacity: 0;
          }
          25% {
            opacity: 0.9;
          }
          55% {
            transform: translate(12px, -42px) scale(1.25);
            opacity: 1;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-8px, -85px) scale(0.6);
            opacity: 0;
          }
        }
        @keyframes rsvpBokehFloat3 {
          0% {
            transform: translate(0px, 10px) scale(0.55);
            opacity: 0;
          }
          30% {
            opacity: 0.85;
          }
          60% {
            transform: translate(-12px, -36px) scale(1.2);
            opacity: 0.95;
          }
          100% {
            transform: translate(-5px, -70px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Glow (Soft transition that seamlessly blends with page background) */}
      <div
        ref={auraRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[600px] h-[300px] sm:h-[400px] rounded-full bg-gradient-to-r from-emerald-600/10 via-amber-500/14 to-rose-950/10 blur-[130px] pointer-events-none"
      />

      {/* Soft Top Radial Feather Aura (guarantees a perfectly seamless transition into RSVP) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-24 bg-gradient-to-b from-transparent via-amber-500/[0.06] to-transparent blur-2xl pointer-events-none" />

      {/* ============================================================== */}
      {/* COMPACT FRAMELESS ROYAL RSVP CARD (SEAMLESSLY BLENDED)        */}
      {/* ============================================================== */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-xl sm:max-w-2xl mx-auto py-5 sm:py-8 px-4 sm:px-6 md:px-8 text-center bg-gradient-to-b from-transparent via-[#0C0816]/30 to-transparent backdrop-blur-md overflow-hidden"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        {/* Moving Soft-Blurred Bokeh Sparks */}
        <div
          ref={sparksContainerRef}
          className="absolute inset-0 pointer-events-none overflow-hidden z-20"
        >
          {rsvpSparksList.map((spark, idx) => {
            const animName =
              spark.animType === 1
                ? 'rsvpBokehFloat1'
                : spark.animType === 2
                ? 'rsvpBokehFloat2'
                : 'rsvpBokehFloat3';

            return (
              <span
                key={idx}
                className="absolute select-none pointer-events-none rounded-full"
                style={{
                  left: spark.left,
                  bottom: spark.bottom,
                  width: `${spark.size}px`,
                  height: `${spark.size}px`,
                  backgroundColor: spark.color,
                  boxShadow: `0 0 ${spark.size * 2}px ${spark.color}`,
                  filter: `blur(${spark.blur}px)`,
                  animation: `${animName} ${spark.duration}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
                  animationDelay: `${spark.delay}s`,
                }}
              />
            );
          })}
        </div>

        {/* Dynamic Mouse Spotlight Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 220px at ${spotlight.x}% ${spotlight.y}%, rgba(251, 191, 36, 0.08), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* ============================================================== */}
        {/* REFINED, SOFTLY-BLENDED TOP BORDER                            */}
        {/* ============================================================== */}
        <div ref={topBorderRef} className="relative z-10 w-full flex flex-col items-center mb-4 origin-center">
          {/* Top Hairline - Softly feathered with gradient */}
          <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          {/* Central Petite Golden Crest */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-1.5 w-full max-w-sm">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/35 to-amber-300/60" />
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="text-[10px] text-amber-300/70">✦</span>
              <div className="w-2 h-2 rotate-45 border border-amber-300/60 bg-amber-400/40" />
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-amber-400/30 bg-gradient-to-b from-amber-400/15 to-transparent">
                <IslamicStar8 size={18} className="drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              </div>
              <div className="w-2 h-2 rotate-45 border border-amber-300/60 bg-amber-400/40" />
              <span className="text-[10px] text-amber-300/70">✦</span>
            </div>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400/35 to-amber-300/60" />
          </div>

          {/* Secondary Feathered Accent */}
          <div className="w-1/2 max-w-xs h-[1px] bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />
        </div>

        {/* ============================================================== */}
        {/* COMPACT RSVP HEADING                                           */}
        {/* ============================================================== */}
        <div className="relative z-10 my-2 select-none">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-r from-transparent via-amber-400/35 to-amber-400/70" />
            <h2
              ref={titleRef}
              className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF0] via-[#F8DE7E] to-[#C99E32] drop-shadow-[0_3px_16px_rgba(251,191,36,0.4)] uppercase"
            >
              R • S • V • P
            </h2>
            <span className="h-[1px] w-6 sm:w-12 bg-gradient-to-l from-transparent via-amber-400/35 to-amber-400/70" />
          </div>
        </div>

        {/* CENTER SLENDER DIVIDER */}
        <div
          ref={dividerRef}
          className="relative z-10 flex items-center justify-center gap-2.5 my-2.5 origin-center max-w-[200px] sm:max-w-xs mx-auto"
        >
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/30 to-amber-400/60" />
          <div className="w-1.5 h-1.5 rotate-45 border border-amber-300/70 bg-amber-400/40 shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400/30 to-amber-400/60" />
        </div>

        {/* ============================================================== */}
        {/* COMPACT HOSTS CARTOUCHE                                        */}
        {/* ============================================================== */}
        <div
          ref={familyBoxRef}
          className="relative z-10 my-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-amber-500/[0.04] via-amber-950/[0.08] to-transparent border border-amber-400/20 shadow-[inset_0_0_15px_rgba(245,158,11,0.03)]"
        >
          {/* Subtle Tagline */}
          <div className="flex items-center justify-center mb-1.5">
            <span className="text-[10px] sm:text-[11px] font-serif italic text-amber-200/90 tracking-[0.2em] uppercase font-medium">
              Warmest Invitation &amp; Compliments From
            </span>
          </div>

          {/* Inayatullah Family & Relatives Name */}
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF0] via-[#F8DE7E] to-[#C99E32] drop-shadow-[0_2px_15px_rgba(251,191,36,0.4)] leading-tight select-none">
            Inayatullah Family &amp; Relatives
          </h3>

          {/* Warmest Regards Tagline */}
          <div className="mt-3 pt-2.5 border-t border-amber-500/15 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-amber-200/80 font-serif">
            <Heart className="w-3 h-3 text-amber-400 fill-amber-400/30" />
            <span className="tracking-wider">With Warmest Regards &amp; Sincere Prayers</span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* REFINED, SOFTLY-BLENDED BOTTOM BORDER                         */}
        {/* ============================================================== */}
        <div ref={bottomBorderRef} className="relative z-10 w-full flex flex-col items-center mt-4 origin-center">
          {/* Secondary Feathered Accent */}
          <div className="w-1/2 max-w-xs h-[1px] bg-gradient-to-r from-transparent via-amber-400/25 to-transparent" />

          {/* Central Petite Golden Crest */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-1.5 w-full max-w-sm">
            <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/35 to-amber-300/60" />
            <div className="flex items-center gap-1.5 text-amber-300">
              <span className="text-[10px] text-amber-300/70">✦</span>
              <div className="w-2 h-2 rotate-45 border border-amber-300/60 bg-amber-400/40" />
              <div className="relative flex items-center justify-center w-7 h-7 rounded-full border border-amber-400/30 bg-gradient-to-b from-amber-400/15 to-transparent">
                <IslamicStar8 size={18} className="drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
              </div>
              <div className="w-2 h-2 rotate-45 border border-amber-300/60 bg-amber-400/40" />
              <span className="text-[10px] text-amber-300/70">✦</span>
            </div>
            <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400/35 to-amber-300/60" />
          </div>

          {/* Bottom Hairline - Softly feathered */}
          <div className="w-full max-w-md h-[1px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
        </div>
      </div>
    </section>
  );
};
