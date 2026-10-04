import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IslamicStar8 } from './Ornaments';

gsap.registerPlugin(ScrollTrigger);

interface MovingSparkItem {
  left: string;
  bottom: string;
  size: number;
  blur: number;
  duration: number;
  delay: number;
  animType: 1 | 2 | 3;
  color: string;
}

// 22 Soft blurred, continuously drifting golden bokeh sparks
const movingSparksList: MovingSparkItem[] = [
  { left: '10%', bottom: '15%', size: 7, blur: 2, duration: 6.5, delay: -1.2, animType: 1, color: 'rgba(253, 230, 138, 0.95)' },
  { left: '18%', bottom: '22%', size: 5, blur: 1.5, duration: 7.2, delay: -4.5, animType: 2, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '26%', bottom: '10%', size: 9, blur: 2.8, duration: 8.0, delay: -2.8, animType: 3, color: 'rgba(245, 158, 11, 0.85)' },
  { left: '34%', bottom: '28%', size: 4, blur: 1.2, duration: 6.0, delay: -5.1, animType: 1, color: 'rgba(255, 243, 199, 1)' },
  { left: '44%', bottom: '16%', size: 8, blur: 2.5, duration: 7.5, delay: -0.6, animType: 2, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '52%', bottom: '24%', size: 6, blur: 1.8, duration: 6.8, delay: -3.4, animType: 3, color: 'rgba(253, 230, 138, 0.95)' },
  { left: '62%', bottom: '12%', size: 8, blur: 2.4, duration: 8.2, delay: -6.0, animType: 1, color: 'rgba(245, 158, 11, 0.85)' },
  { left: '72%', bottom: '20%', size: 5, blur: 1.5, duration: 6.3, delay: -2.1, animType: 2, color: 'rgba(255, 237, 160, 0.95)' },
  { left: '82%', bottom: '14%', size: 7, blur: 2.0, duration: 7.0, delay: -3.8, animType: 1, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '90%', bottom: '26%', size: 5, blur: 1.6, duration: 6.4, delay: -1.7, animType: 2, color: 'rgba(253, 230, 138, 0.95)' },

  // Mid & Upper Floating Sparks
  { left: '12%', bottom: '48%', size: 6, blur: 1.8, duration: 6.7, delay: -4.2, animType: 3, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '22%', bottom: '55%', size: 8, blur: 2.2, duration: 7.4, delay: -0.9, animType: 1, color: 'rgba(255, 248, 220, 1)' },
  { left: '32%', bottom: '42%', size: 4, blur: 1.2, duration: 5.8, delay: -5.5, animType: 2, color: 'rgba(245, 158, 11, 0.8)' },
  { left: '48%', bottom: '60%', size: 9, blur: 2.8, duration: 8.5, delay: -2.5, animType: 3, color: 'rgba(253, 230, 138, 0.95)' },
  { left: '58%', bottom: '52%', size: 5, blur: 1.5, duration: 6.6, delay: -4.8, animType: 1, color: 'rgba(251, 191, 36, 0.9)' },
  { left: '68%', bottom: '58%', size: 7, blur: 2.0, duration: 7.8, delay: -2.3, animType: 2, color: 'rgba(255, 240, 180, 0.95)' },
  { left: '78%', bottom: '46%', size: 6, blur: 1.8, duration: 6.2, delay: -5.0, animType: 3, color: 'rgba(245, 158, 11, 0.85)' },
  { left: '88%', bottom: '54%', size: 5, blur: 1.5, duration: 6.9, delay: -1.5, animType: 1, color: 'rgba(253, 230, 138, 1)' },
];

export const WeddingDuaSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glowAuraRef = useRef<HTMLDivElement | null>(null);
  const topCrestRef = useRef<HTMLDivElement | null>(null);
  const arabicDuaRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const translationRef = useRef<HTMLDivElement | null>(null);
  const sparksContainerRef = useRef<HTMLDivElement | null>(null);

  // Interactive 3D Parallax & Spotlight
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const card = cardRef.current;
    if (!container || !card) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(
        [
          card,
          glowAuraRef.current,
          topCrestRef.current,
          arabicDuaRef.current,
          dividerRef.current,
          translationRef.current,
          sparksContainerRef.current,
        ],
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      );
      return;
    }

    const resetState = () => {
      gsap.set(card, {
        opacity: 0,
        y: 35,
        scale: 0.95,
        filter: 'blur(10px)',
      });

      if (glowAuraRef.current) {
        gsap.set(glowAuraRef.current, { opacity: 0, scale: 0.8 });
      }

      if (topCrestRef.current) {
        gsap.set(topCrestRef.current, { opacity: 0, y: -15, scale: 0.6 });
      }

      if (arabicDuaRef.current) {
        gsap.set(arabicDuaRef.current, {
          opacity: 0,
          y: 18,
          scale: 0.95,
          filter: 'blur(8px)',
        });
      }

      if (dividerRef.current) {
        gsap.set(dividerRef.current, { opacity: 0, scaleX: 0 });
      }

      if (translationRef.current) {
        gsap.set(translationRef.current, { opacity: 0, y: 15 });
      }

      if (sparksContainerRef.current) {
        gsap.set(sparksContainerRef.current, { opacity: 0 });
      }
    };

    resetState();

    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 15%',
        onEnter: () => {
          resetState();
          tl.restart();
        },
        onEnterBack: () => {
          resetState();
          tl.restart();
        },
      },
    });

    // 1. Soft aura & horizontal plaque fade in
    tl.to(glowAuraRef.current, {
      opacity: 0.85,
      scale: 1,
      duration: 0.9,
      ease: 'power2.out',
    })
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
      // 2. Top crest rosette settles
      .to(
        topCrestRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          ease: 'back.out(1.8)',
        },
        '-=0.45'
      )
      // 3. Single-line Arabic Dua reveals with 24K gold shine
      .to(
        arabicDuaRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.35'
      )
      // 4. Filigree horizontal laser divider sweeps open
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
      // 5. English Translation softly elevates
      .to(
        translationRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.25'
      )
      // 6. Soft moving sparks fade in
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
        if (st.trigger === container) st.kill();
      });
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tiltX = -((y - rect.height / 2) / (rect.height / 2)) * 2.5;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 2.5;

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
      ref={containerRef}
      id="wedding-dua"
      className="relative py-12 sm:py-18 px-3 sm:px-6 lg:px-8 z-10 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Dynamic Keyframes for continuously moving, wandering bokeh sparks */}
      <style>{`
        @keyframes sparkBokehFloat1 {
          0% {
            transform: translate(0px, 15px) scale(0.65);
            opacity: 0;
          }
          20% {
            opacity: 0.85;
          }
          50% {
            transform: translate(-15px, -40px) scale(1.15);
            opacity: 0.95;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translate(10px, -85px) scale(0.65);
            opacity: 0;
          }
        }
        @keyframes sparkBokehFloat2 {
          0% {
            transform: translate(0px, 18px) scale(0.7);
            opacity: 0;
          }
          25% {
            opacity: 0.9;
          }
          55% {
            transform: translate(16px, -48px) scale(1.25);
            opacity: 1;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translate(-10px, -95px) scale(0.6);
            opacity: 0;
          }
        }
        @keyframes sparkBokehFloat3 {
          0% {
            transform: translate(0px, 12px) scale(0.55);
            opacity: 0;
          }
          30% {
            opacity: 0.85;
          }
          60% {
            transform: translate(-14px, -42px) scale(1.2);
            opacity: 0.95;
          }
          100% {
            transform: translate(-6px, -80px) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>

      {/* Atmospheric Ambient Glow (seamless blend with page background) */}
      <div
        ref={glowAuraRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[250px] sm:h-[350px] rounded-full bg-gradient-to-r from-emerald-600/10 via-amber-500/15 to-rose-900/10 blur-[130px] pointer-events-none"
      />

      {/* ============================================================== */}
      {/* THE ROYAL GILDED HORIZONTAL CARTOUCHE PLAQUE                   */}
      {/* ============================================================== */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-4xl mx-auto rounded-3xl sm:rounded-[2.5rem] py-8 sm:py-10 px-4 sm:px-10 md:px-12 text-center border border-amber-400/25 bg-gradient-to-r from-transparent via-[#0D0818]/60 to-transparent backdrop-blur-xl shadow-[0_0_50px_rgba(245,158,11,0.07)] overflow-hidden"
        style={{
          transform: isHovered
            ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
          transition: isHovered ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        {/* Soft Golden Corner Knot Accents */}
        <div className="absolute top-3 left-4 w-2 h-2 rotate-45 border border-amber-400/40 pointer-events-none" />
        <div className="absolute top-3 right-4 w-2 h-2 rotate-45 border border-amber-400/40 pointer-events-none" />
        <div className="absolute bottom-3 left-4 w-2 h-2 rotate-45 border border-amber-400/40 pointer-events-none" />
        <div className="absolute bottom-3 right-4 w-2 h-2 rotate-45 border border-amber-400/40 pointer-events-none" />

        {/* Inner Fine Gold Hairline with Gradient Fade at Edges */}
        <div className="absolute inset-2 sm:inset-3 rounded-2xl sm:rounded-[2rem] border border-amber-400/15 pointer-events-none" />

        {/* Moving Soft-Blurred Bokeh Sparks Layer */}
        <div
          ref={sparksContainerRef}
          className="absolute inset-0 pointer-events-none overflow-hidden z-20"
        >
          {movingSparksList.map((spark, idx) => {
            const animName =
              spark.animType === 1
                ? 'sparkBokehFloat1'
                : spark.animType === 2
                ? 'sparkBokehFloat2'
                : 'sparkBokehFloat3';

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

        {/* Interactive Mouse Spotlight Sheen */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(circle 260px at ${spotlight.x}% ${spotlight.y}%, rgba(251, 191, 36, 0.1), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* 1. TOP CREST: Star Rosette with Flanking Golden Laser Wings */}
        <div ref={topCrestRef} className="relative z-10 flex items-center justify-center gap-3 mb-4 select-none">
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent via-amber-400/40 to-amber-400/80" />
          <div className="flex items-center justify-center w-8 h-8 rounded-full border border-amber-400/35 bg-gradient-to-b from-amber-400/20 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.35)]">
            <IslamicStar8 size={18} className="drop-shadow-[0_0_6px_rgba(251,191,36,0.85)]" />
          </div>
          <span className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent via-amber-400/40 to-amber-400/80" />
        </div>

        {/* 2. ARABIC DUA IN EXACTLY ONE SINGLE LINE */}
        <div className="relative z-10 my-3 px-1 sm:px-2 overflow-x-auto no-scrollbar flex items-center justify-center">
          <div className="relative inline-flex items-center justify-center">
            {/* Background Soft Aura */}
            <div className="absolute inset-0 bg-amber-400/10 blur-xl rounded-full pointer-events-none" />

            {/* Left Starlight Glint */}
            <span className="hidden sm:inline mr-3 text-amber-200 text-xs sm:text-sm animate-pulse pointer-events-none select-none">
              ✦
            </span>

            {/* Single-line Arabic Calligraphy */}
            <h2
              ref={arabicDuaRef}
              className="whitespace-nowrap font-arabic text-[17px] xs:text-[20px] sm:text-2xl md:text-3xl lg:text-[34px] xl:text-[38px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF2] via-[#F8DE7E] to-[#C99E32] drop-shadow-[0_3px_20px_rgba(245,158,11,0.55)] leading-[1.8] select-none tracking-wide text-center"
              dir="rtl"
            >
              بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </h2>

            {/* Right Starlight Glint */}
            <span
              className="hidden sm:inline ml-3 text-amber-300 text-xs sm:text-sm animate-pulse pointer-events-none select-none"
              style={{ animationDelay: '1.2s' }}
            >
              ✦
            </span>
          </div>
        </div>

        {/* 3. SLEEK ROYAL FILIGREE DIVIDER */}
        <div
          ref={dividerRef}
          className="relative z-10 flex items-center justify-center gap-3 my-3 sm:my-4 origin-center max-w-sm mx-auto"
        >
          <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-400/35 to-amber-400/65" />
          <div className="w-1.5 h-1.5 rotate-45 border border-amber-300 bg-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.7)]" />
          <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-400/35 to-amber-400/65" />
        </div>

        {/* 4. POETIC ENGLISH TRANSLATION */}
        <div ref={translationRef} className="relative z-10 max-w-2xl mx-auto px-2">
          <p className="font-serif italic text-xs sm:text-sm md:text-base text-amber-100/90 leading-relaxed font-light drop-shadow-[0_1px_6px_rgba(253,230,138,0.35)]">
            &ldquo;May Allah bless this union, shower His boundless grace upon you both, and unite your hearts in eternal love, peace, and goodness.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
};
