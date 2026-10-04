import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Sparkles } from 'lucide-react';
import { WeddingEvent } from '../types';
import waleemaCoupleBg from '../assets/images/waleema_couple_bg_1791043594116.jpg';

gsap.registerPlugin(ScrollTrigger);

interface WalimaSectionProps {
  event: WeddingEvent;
  onOpenLocation: (event: WeddingEvent) => void;
}

const AL_JANNAT_MAPS_URL =
  'https://www.google.com/maps/place/AL+Jannat+Palace/@30.8654182,73.5902845,17z/data=!3m1!4b1!4m6!3m5!1s0x39180d65b33d10f3:0xe613d4572c5860fe!8m2!3d30.8654182!4d73.5902845!16s%2Fg%2F11r3lnmb7h?entry=ttu';

export const WalimaSection: React.FC<WalimaSectionProps> = ({
  event,
  onOpenLocation,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  // Mehrab Top Arch SVG Border & Fire Particle Refs
  const fullBorderPathRef = useRef<SVGPathElement | null>(null);
  const innerArchPathRef = useRef<SVGPathElement | null>(null);
  const fireGroupRef = useRef<SVGGElement | null>(null);
  const trailEmbersRef = useRef<(SVGGElement | null)[]>([]);
  const flyingSparksRef = useRef<(SVGGElement | null)[]>([]);
  const watermarkMandalaRef = useRef<HTMLDivElement | null>(null);
  const coupleBgRef = useRef<HTMLDivElement | null>(null);

  // Molten Gold Particle Trail & Orbiting Sparks Configuration
  const trailEmbers = [
    { offset: 12, r: 8.5, auraR: 16, color: '#FFF3B0', aura: 'rgba(255, 193, 7, 0.75)' },
    { offset: 25, r: 7.2, auraR: 13, color: '#FFD54F', aura: 'rgba(255, 160, 0, 0.65)' },
    { offset: 40, r: 6.0, auraR: 11, color: '#FFCA28', aura: 'rgba(255, 143, 0, 0.55)' },
    { offset: 58, r: 5.0, auraR: 9, color: '#FFA000', aura: 'rgba(245, 124, 0, 0.45)' },
    { offset: 78, r: 4.0, auraR: 7.5, color: '#FF8F00', aura: 'rgba(230, 81, 0, 0.38)' },
    { offset: 102, r: 3.0, auraR: 6, color: '#FF6F00', aura: 'rgba(216, 67, 21, 0.28)' },
    { offset: 130, r: 2.2, auraR: 4.5, color: '#E65100', aura: 'rgba(191, 54, 12, 0.20)' },
  ];

  const flyingSparks = [
    { lag: 8, angle: 0.8, dist: 7.5, size: 2.5, color: '#FFFDE7' },
    { lag: 18, angle: 2.5, dist: 9.5, size: 2.0, color: '#FFF9C4' },
    { lag: 32, angle: 4.2, dist: 11.5, size: 2.8, color: '#FFE082' },
    { lag: 48, angle: 1.6, dist: 8.5, size: 1.8, color: '#FFD54F' },
    { lag: 68, angle: 3.7, dist: 10.5, size: 2.2, color: '#FFA000' },
    { lag: 92, angle: 5.4, dist: 7.0, size: 1.6, color: '#FF8F00' },
  ];

  // Content Container & Text Reveal Refs
  const cardBodyRef = useRef<HTMLDivElement | null>(null);
  const arabicCalligraphyRef = useRef<HTMLDivElement | null>(null);
  const decorativeDividerRef = useRef<HTMLDivElement | null>(null);
  const titleWaleemaRef = useRef<HTMLHeadingElement | null>(null);
  const titleReceptionRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleQuoteRef = useRef<HTMLParagraphElement | null>(null);

  // Timeline Refs
  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const timelineStemBaseRef = useRef<HTMLDivElement | null>(null);
  const timelineStemGlowRef = useRef<HTMLDivElement | null>(null);
  const travelingDotRef = useRef<HTMLDivElement | null>(null);
  const timelineNodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const timelineCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Location Button Refs
  const locationButtonContainerRef = useRef<HTMLDivElement | null>(null);
  const locationButtonRef = useRef<HTMLAnchorElement | null>(null);
  const buttonSheenRef = useRef<HTMLDivElement | null>(null);

  // Interactive Parallax
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFrameCompleted, setIsFrameCompleted] = useState(false);

  // Timeline Step Definitions (Date, Day, Time, Venue)
  const timelineSteps = [
    {
      label: 'DATE',
      value: '07 • 11 • 2026',
      side: 'left',
    },
    {
      label: 'DAY',
      value: 'Saturday',
      side: 'right',
    },
    {
      label: 'TIME',
      value: '07:00 PM',
      side: 'left',
    },
    {
      label: 'VENUE',
      value: 'Al Jannat Palace',
      side: 'right',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const cardContainer = cardContainerRef.current;
    const borderPath = fullBorderPathRef.current;
    if (!section || !cardContainer || !borderPath) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const totalPathLength = borderPath.getTotalLength();

    if (prefersReducedMotion) {
      gsap.set(borderPath, { strokeDashoffset: 0, opacity: 1 });
      if (innerArchPathRef.current) gsap.set(innerArchPathRef.current, { strokeDashoffset: 0, opacity: 1 });
      if (watermarkMandalaRef.current) gsap.set(watermarkMandalaRef.current, { opacity: 0.25 });
      if (cardBodyRef.current) gsap.set(cardBodyRef.current, { opacity: 1 });
      if (fireGroupRef.current) gsap.set(fireGroupRef.current, { opacity: 0 });
      trailEmbersRef.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0 }); });
      flyingSparksRef.current.forEach((el) => { if (el) gsap.set(el, { opacity: 0 }); });

      if (arabicCalligraphyRef.current) gsap.set(arabicCalligraphyRef.current, { opacity: 1, y: 0 });
      if (decorativeDividerRef.current) gsap.set(decorativeDividerRef.current, { scaleX: 1, opacity: 1 });
      if (titleWaleemaRef.current) gsap.set(titleWaleemaRef.current, { opacity: 1, y: 0 });
      if (titleReceptionRef.current) gsap.set(titleReceptionRef.current, { opacity: 1, y: 0 });
      if (subtitleQuoteRef.current) gsap.set(subtitleQuoteRef.current, { opacity: 1, y: 0 });

      if (timelineContainerRef.current) gsap.set(timelineContainerRef.current, { opacity: 1 });
      if (timelineStemGlowRef.current) gsap.set(timelineStemGlowRef.current, { height: '100%' });
      if (travelingDotRef.current) gsap.set(travelingDotRef.current, { opacity: 0 });
      timelineNodesRef.current.forEach((node) => {
        if (node) gsap.set(node, { opacity: 1, scale: 1 });
      });
      timelineCardsRef.current.forEach((card) => {
        if (card) gsap.set(card, { opacity: 1, x: 0 });
      });
      if (locationButtonContainerRef.current) {
        gsap.set(locationButtonContainerRef.current, { opacity: 1, y: 0, scale: 1 });
      }
      setIsFrameCompleted(true);
      return;
    }

    // =========================================================================
    // 1. REUSABLE RESET & MASTER GSAP SCROLLTRIGGER TIMELINE (RE-ANIMATES ON SCROLL)
    // =========================================================================
    const fireProgressObj = { val: 0 };

    const resetAnimationState = () => {
      fireProgressObj.val = 0;
      if (fullBorderPathRef.current) {
        fullBorderPathRef.current.style.strokeDasharray = `${totalPathLength}`;
        fullBorderPathRef.current.style.strokeDashoffset = `${totalPathLength}`;
        fullBorderPathRef.current.style.opacity = '1';
      }

      if (innerArchPathRef.current) {
        const innerLen = innerArchPathRef.current.getTotalLength();
        gsap.set(innerArchPathRef.current, {
          strokeDasharray: innerLen,
          strokeDashoffset: innerLen,
          opacity: 0,
        });
      }

      const startPoint = borderPath.getPointAtLength(0);
      if (fireGroupRef.current) {
        fireGroupRef.current.setAttribute(
          'transform',
          `translate(${startPoint.x}, ${startPoint.y})`
        );
        gsap.set(fireGroupRef.current, { opacity: 0, scale: 0.4 });
      }
      trailEmbersRef.current.forEach((el) => {
        if (el) {
          el.setAttribute('transform', `translate(${startPoint.x}, ${startPoint.y})`);
          gsap.set(el, { opacity: 0 });
        }
      });
      flyingSparksRef.current.forEach((el) => {
        if (el) {
          el.setAttribute('transform', `translate(${startPoint.x}, ${startPoint.y})`);
          gsap.set(el, { opacity: 0 });
        }
      });

      if (watermarkMandalaRef.current) gsap.set(watermarkMandalaRef.current, { opacity: 0 });
      if (coupleBgRef.current) gsap.set(coupleBgRef.current, { opacity: 0 });
      if (cardBodyRef.current) gsap.set(cardBodyRef.current, { opacity: 0 });
      if (arabicCalligraphyRef.current) gsap.set(arabicCalligraphyRef.current, { opacity: 0, y: 16 });
      if (decorativeDividerRef.current) gsap.set(decorativeDividerRef.current, { scaleX: 0, opacity: 0, transformOrigin: 'center center' });
      if (titleWaleemaRef.current) gsap.set(titleWaleemaRef.current, { opacity: 0, y: 16 });
      if (titleReceptionRef.current) gsap.set(titleReceptionRef.current, { opacity: 0, y: 16 });
      if (subtitleQuoteRef.current) gsap.set(subtitleQuoteRef.current, { opacity: 0, y: 14 });

      if (timelineContainerRef.current) gsap.set(timelineContainerRef.current, { opacity: 0 });
      if (timelineStemGlowRef.current) gsap.set(timelineStemGlowRef.current, { height: '0%' });
      if (travelingDotRef.current) gsap.set(travelingDotRef.current, { top: '0%', opacity: 0, scale: 0.2 });

      timelineNodesRef.current.forEach((node) => {
        if (node) gsap.set(node, { opacity: 0, scale: 0.2 });
      });

      timelineSteps.forEach((step, idx) => {
        const card = timelineCardsRef.current[idx];
        if (card) {
          gsap.set(card, {
            opacity: 0,
            x: step.side === 'left' ? -25 : 25,
            scale: 0.96,
          });
        }
      });

      if (locationButtonContainerRef.current) {
        gsap.set(locationButtonContainerRef.current, {
          opacity: 0,
          y: 20,
          scale: 0.94,
        });
      }
      setIsFrameCompleted(false);
    };

    // Initial reset
    resetAnimationState();

    const tl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'bottom 10%',
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

    // -------------------------------------------------------------
    // PHASE A: FAST MOLTEN FIRE SWEEPS ACROSS TOP ARCH (Slower, Majestic 2.2s)
    // -------------------------------------------------------------
    tl.to(fireGroupRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
      .fromTo(
        fireProgressObj,
        { val: 0 },
        {
          val: 1,
          duration: 2.2,
          ease: 'power1.inOut',
          onUpdate: () => {
            if (!fullBorderPathRef.current || !fireGroupRef.current) return;
            const currentDist = totalPathLength * fireProgressObj.val;
            const currentPt = fullBorderPathRef.current.getPointAtLength(currentDist);
            fireGroupRef.current.setAttribute(
              'transform',
              `translate(${currentPt.x}, ${currentPt.y})`
            );
            fullBorderPathRef.current.style.strokeDashoffset = `${totalPathLength * (1 - fireProgressObj.val)}`;

            // Fluid Trailing Molten Ember Particles
            trailEmbers.forEach((trail, idx) => {
              const el = trailEmbersRef.current[idx];
              if (!el || !fullBorderPathRef.current) return;
              if (currentDist < trail.offset * 0.3) {
                el.style.opacity = '0';
                return;
              }
              const trailDist = Math.max(0, currentDist - trail.offset);
              const pt = fullBorderPathRef.current.getPointAtLength(trailDist);
              const microWave = Math.sin(currentDist * 0.08 + idx * 1.3) * 1.5;
              el.setAttribute('transform', `translate(${pt.x}, ${pt.y + microWave})`);
              const fade = Math.min(1, (currentDist - trail.offset * 0.3) / (trail.offset * 0.7));
              el.style.opacity = `${fade * 0.95}`;
            });

            // Energetic Orbiting / Spraying Sparks around the Trail
            flyingSparks.forEach((spark, idx) => {
              const el = flyingSparksRef.current[idx];
              if (!el || !fullBorderPathRef.current) return;
              if (currentDist < spark.lag * 0.4) {
                el.style.opacity = '0';
                return;
              }
              const sparkDist = Math.max(0, currentDist - spark.lag);
              const pt = fullBorderPathRef.current.getPointAtLength(sparkDist);
              const angle = currentDist * 0.12 + spark.angle;
              const sprayX = Math.cos(angle) * spark.dist;
              const sprayY = Math.sin(angle) * spark.dist * 0.7;
              el.setAttribute('transform', `translate(${pt.x + sprayX}, ${pt.y + sprayY})`);
              el.style.opacity = '0.9';
            });
          },
        }
      )
      // Fire head and all trail embers flare and dissolve together
      .to([fireGroupRef.current, ...trailEmbersRef.current, ...flyingSparksRef.current].filter(Boolean), {
        opacity: 0,
        scale: 2.2,
        duration: 0.45,
        ease: 'power2.out',
      })
      // Inner hairline arch shimmers in
      .to(
        innerArchPathRef.current,
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.2'
      )
      // Watermark mandala & couple portrait softly appear
      .to(
        [watermarkMandalaRef.current, coupleBgRef.current].filter(Boolean),
        {
          opacity: 0.22,
          duration: 0.85,
          ease: 'power2.out',
        },
        '-=0.4'
      )

      // -------------------------------------------------------------
      // PHASE B: TEXT REVEALS GRACEFULLY
      // -------------------------------------------------------------
      .to(cardBodyRef.current, {
        opacity: 1,
        duration: 0.2,
      })
      // 1. Arabic calligraphy
      .to(
        arabicCalligraphyRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.1'
      )
      // 2. Decorative laser divider expands
      .to(
        decorativeDividerRef.current,
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      // 3 & 4. "WALEEMA" & "RECEPTION" appear in glorious gold
      .to(
        [titleWaleemaRef.current, titleReceptionRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.18,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      // 5. Subtitle quote
      .to(
        subtitleQuoteRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        },
        '-=0.3'
      )

      // -------------------------------------------------------------
      // PHASE C: VERTICAL TIMELINE & TRAVELING GLOWING DOT
      // -------------------------------------------------------------
      .to(
        timelineContainerRef.current,
        {
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
        },
        '-=0.15'
      )
      .to(
        travelingDotRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.25'
      )

      // MILESTONE 1: DATE (Left)
      .to(travelingDotRef.current, {
        top: '12%',
        duration: 0.75,
        ease: 'power2.inOut',
      })
      .to(
        timelineStemGlowRef.current,
        {
          height: '12%',
          duration: 0.75,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        [timelineNodesRef.current[0], timelineCardsRef.current[0]],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.35'
      )

      // MILESTONE 2: DAY (Right)
      .to(travelingDotRef.current, {
        top: '38%',
        duration: 0.75,
        ease: 'power2.inOut',
      })
      .to(
        timelineStemGlowRef.current,
        {
          height: '38%',
          duration: 0.75,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        [timelineNodesRef.current[1], timelineCardsRef.current[1]],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.35'
      )

      // MILESTONE 3: TIME (Left)
      .to(travelingDotRef.current, {
        top: '64%',
        duration: 0.75,
        ease: 'power2.inOut',
      })
      .to(
        timelineStemGlowRef.current,
        {
          height: '64%',
          duration: 0.75,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        [timelineNodesRef.current[2], timelineCardsRef.current[2]],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.35'
      )

      // MILESTONE 4: VENUE (Right)
      .to(travelingDotRef.current, {
        top: '90%',
        duration: 0.75,
        ease: 'power2.inOut',
      })
      .to(
        timelineStemGlowRef.current,
        {
          height: '90%',
          duration: 0.75,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        [timelineNodesRef.current[3], timelineCardsRef.current[3]],
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.35'
      )

      // -------------------------------------------------------------
      // PHASE D: DOT DESCENDS INTO LOCATION BUTTON
      // -------------------------------------------------------------
      .to(travelingDotRef.current, {
        top: '102%',
        duration: 0.65,
        ease: 'power1.in',
      })
      .to(
        timelineStemGlowRef.current,
        {
          height: '100%',
          duration: 0.65,
          ease: 'power1.in',
        },
        '<'
      )
      .to(
        locationButtonContainerRef.current,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'back.out(1.6)',
        },
        '-=0.25'
      )
      .to(
        travelingDotRef.current,
        {
          opacity: 0,
          scale: 1.8,
          duration: 0.35,
          ease: 'power2.out',
        },
        '-=0.3'
      )
      .fromTo(
        buttonSheenRef.current,
        { x: '-100%' },
        { x: '200%', duration: 1.3, ease: 'power2.inOut' },
        '-=0.2'
      );

    // Guaranteed lock of all elements on complete
    tl.eventCallback('onComplete', () => {
      setIsFrameCompleted(true);
      if (fullBorderPathRef.current) {
        fullBorderPathRef.current.style.strokeDashoffset = '0';
        fullBorderPathRef.current.style.opacity = '1';
      }
      if (innerArchPathRef.current) {
        innerArchPathRef.current.style.strokeDashoffset = '0';
        innerArchPathRef.current.style.opacity = '1';
      }
      if (cardBodyRef.current) {
        cardBodyRef.current.style.opacity = '1';
      }
      if (locationButtonContainerRef.current) {
        gsap.set(locationButtonContainerRef.current, { opacity: 1, y: 0, scale: 1 });
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  // 3D Parallax Tilt (Desktop only)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardContainerRef.current || !isFrameCompleted || window.innerWidth < 1024) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * 3.5;
    const tiltY = ((x - centerX) / centerX) * 3.5;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 1024 && isFrameCompleted) setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      id="walima"
      className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-20 sm:py-28 z-10 overflow-visible"
    >
      {/* ========================================================= */}
      {/* AMBIENT CELESTIAL BACKGROUND: WARM OBSIDIAN & CHAMPAGNE   */}
      {/* ========================================================= */}
      <div className="absolute top-1/4 left-1/4 w-[420px] sm:w-[580px] h-[420px] sm:h-[580px] rounded-full bg-purple-950/30 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/5 right-1/4 w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full bg-amber-500/10 blur-[130px] pointer-events-none" />

      {/* Floating Starlight Diamond Dust Particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/6 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-200/80 shadow-[0_0_12px_rgba(253,230,138,0.9)] animate-pulse" />
        <div
          className="absolute top-1/3 right-1/5 w-2 h-2 rounded-full bg-amber-100/90 shadow-[0_0_14px_rgba(253,230,138,0.8)] animate-ping"
          style={{ animationDuration: '4.5s' }}
        />
        <div
          className="absolute bottom-1/3 left-1/6 w-1.5 h-1.5 rounded-full bg-amber-200/70 shadow-[0_0_10px_rgba(254,243,199,0.8)] animate-pulse"
          style={{ animationDelay: '1.8s' }}
        />
        <div
          className="absolute bottom-1/5 right-1/3 w-2 h-2 rounded-full bg-amber-100 shadow-[0_0_12px_rgba(254,243,199,0.85)] animate-pulse"
          style={{ animationDelay: '2.8s' }}
        />

        {/* Delicate Diamond Star Crosses */}
        <div className="absolute top-28 left-14 opacity-30 text-amber-200 animate-spin-slow">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
        <div className="absolute bottom-32 right-14 opacity-25 text-amber-300 animate-spin-slow-reverse">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3D PERSPECTIVE STAGE: THE ISLAMIC MEHRAB CARD FRAME       */}
      {/* ========================================================= */}
      <div
        ref={cardContainerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          perspective: '1200px',
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[500px] sm:max-w-[540px] mx-auto z-10 py-4 sm:py-6"
      >
        {/* Soft Ambient Depth Glow Beneath Card */}
        <div className="absolute inset-0 w-[94%] h-[92%] mx-auto my-auto rounded-[36px] bg-purple-950/20 blur-3xl pointer-events-none -z-10" />

        {/* Animated Tilting Glass Structure */}
        <div
          style={{
            transform: isHovered && isFrameCompleted
              ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              : 'rotateX(0deg) rotateY(0deg)',
            transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.8s ease-out',
          }}
          className="relative w-full preserve-3d flex flex-col items-center"
        >
          {/* ========================================================= */}
          {/* TOP ARCH SVG: ARCHITECTURAL STEPPED MEHRAB CROWN          */}
          {/* ========================================================= */}
          <div className="w-full relative z-20 pointer-events-none">
            <svg
              viewBox="0 0 540 230"
              className="w-full h-auto drop-shadow-[0_15px_35px_rgba(253,230,138,0.5)] filter overflow-visible"
              fill="none"
            >
              <defs>
                {/* 24K Royal Polished Metallic Gold Gradient for Outer Frame */}
                <linearGradient id="mehrabGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DFBF76" />
                  <stop offset="15%" stopColor="#FFF4D0" />
                  <stop offset="35%" stopColor="#C8A355" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="65%" stopColor="#E6CF9B" />
                  <stop offset="85%" stopColor="#F5D77F" />
                  <stop offset="100%" stopColor="#B38938" />
                </linearGradient>

                {/* Inner Hairline Arch Radiant Gradient */}
                <linearGradient id="innerArchGold" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DFBF76" stopOpacity="0.7" />
                  <stop offset="25%" stopColor="#FFF8E7" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="75%" stopColor="#FFF8E7" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#DFBF76" stopOpacity="0.7" />
                </linearGradient>

                {/* Outer Aura Soft Radiance Gradient */}
                <linearGradient id="auraGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA000" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#FFD54F" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FFA000" stopOpacity="0.3" />
                </linearGradient>

                {/* Gold Glow Filter for the drawing stroke & sparks */}
                <filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="glow" />
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Radiating Fire Flame Particle Gradients */}
                <radialGradient id="fireAuraGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFA000" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#FF6D00" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FF3D00" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="fireCoreGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="35%" stopColor="#FFD54F" stopOpacity="0.95" />
                  <stop offset="70%" stopColor="#FF8F00" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#E65100" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. SOFT GLOWING AURA HALO PATH - MUGHAL MULTI-CUSPED OGEE MEHRAB */}
              <path
                d="M 32,215 L 32,172 C 32,148 58,128 84,132 C 72,114 92,82 142,80 C 130,64 164,40 200,42 C 235,42 264,25 270,14 C 276,25 305,42 340,42 C 376,40 410,64 398,80 C 448,82 468,114 456,132 C 482,128 508,148 508,172 L 508,215"
                stroke="url(#auraGoldGrad)"
                strokeWidth="6"
                fill="none"
                filter="url(#goldGlow)"
                className="opacity-70 animate-pulse"
              />

              {/* 2. THIRD INTRICATE PARALLEL MICRO-HAIRLINE */}
              <path
                d="M 44,215 L 44,176 C 44,157 66,141 90,144 C 82,128 100,98 144,96 C 136,81 168,57 200,58 C 231,58 260,42 270,32 C 280,42 309,58 340,58 C 372,57 404,81 396,96 C 440,98 458,128 450,144 C 474,141 496,157 496,176 L 496,215"
                stroke="#FFF9C4"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                fill="none"
                className="opacity-55"
              />

              {/* 3. INNER CUSPED MEHRAB ACCENT CONTOUR (Glowing razor hairline) */}
              <path
                ref={innerArchPathRef}
                d="M 38,215 L 38,174 C 38,153 62,135 87,138 C 77,121 96,90 143,88 C 133,73 166,49 200,50 C 233,50 262,34 270,23 C 278,34 307,50 340,50 C 374,49 407,73 397,88 C 444,90 463,121 453,138 C 478,135 502,153 502,174 L 502,215"
                stroke="url(#innerArchGold)"
                strokeWidth="1.4"
                fill="none"
                opacity="0"
                filter="url(#goldGlow)"
              />

              {/* 4. PRIMARY TOP CUSPED MEHRAB BORDER (Drawn by fire - 24k Polished Gold) */}
              <path
                ref={fullBorderPathRef}
                d="M 32,215 L 32,172 C 32,148 58,128 84,132 C 72,114 92,82 142,80 C 130,64 164,40 200,42 C 235,42 264,25 270,14 C 276,25 305,42 340,42 C 376,40 410,64 398,80 C 448,82 468,114 456,132 C 482,128 508,148 508,172 L 508,215"
                stroke="url(#mehrabGoldGrad)"
                strokeWidth="2.8"
                fill="none"
                filter="url(#goldGlow)"
                className="animate-border-glow"
              />

              {/* 5. APEX OGEE CROWN & SHARP INWARD CUSP JEWELS */}
              <g className="animate-border-glow">
                {/* Apex Ogee Sharp Point Starburst */}
                <g transform="translate(270, 14)">
                  <polygon
                    points="0,-14 3.5,-3.5 14,0 3.5,3.5 0,14 -3.5,3.5 -14,0 -3.5,-3.5"
                    fill="#FFE57F"
                    filter="url(#goldGlow)"
                  />
                  <polygon
                    points="0,-9 2.2,-2.2 9,0 2.2,2.2 0,9 -2.2,2.2 -9,0 -2.2,-2.2"
                    fill="#FFFFFF"
                  />
                  <polygon
                    points="0,-4 1.2,-1.2 4,0 1.2,1.2 0,4 -1.2,1.2 -4,0 -1.2,-1.2"
                    fill="#FFFDF0"
                  />
                  <circle r="1.5" fill="#FFFFFF" />
                </g>

                {/* Micro Diamond Accents at the Inward Cusps */}
                {[
                  { x: 84, y: 132 },
                  { x: 142, y: 80 },
                  { x: 398, y: 80 },
                  { x: 456, y: 132 },
                ].map((cusp, i) => (
                  <g key={`cusp-${i}`} transform={`translate(${cusp.x}, ${cusp.y})`}>
                    <polygon
                      points="0,-2.5 2.5,0 0,2.5 -2.5,0"
                      fill="#FFF3B0"
                      filter="url(#goldGlow)"
                    />
                    <circle r="1" fill="#FFFFFF" />
                  </g>
                ))}
              </g>

              {/* 3. FLUID TRAILING MOLTEN EMBER PARTICLES */}
              {trailEmbers.map((trail, idx) => (
                <g
                  key={`trail-${idx}`}
                  ref={(el) => {
                    trailEmbersRef.current[idx] = el;
                  }}
                  className="pointer-events-none"
                  style={{ opacity: 0 }}
                >
                  <circle r={trail.auraR} fill={trail.aura} filter="url(#goldGlow)" />
                  <circle r={trail.r} fill={trail.color} />
                  <circle r={trail.r * 0.45} fill="#FFFFFF" opacity="0.9" />
                </g>
              ))}

              {/* 4. ENERGETIC FLYING SPARK SPRAY PARTICLES */}
              {flyingSparks.map((spark, idx) => (
                <g
                  key={`spark-${idx}`}
                  ref={(el) => {
                    flyingSparksRef.current[idx] = el;
                  }}
                  className="pointer-events-none"
                  style={{ opacity: 0 }}
                >
                  <circle r={spark.size} fill={spark.color} filter="url(#goldGlow)" />
                  <circle r={spark.size * 0.45} fill="#FFFFFF" />
                </g>
              ))}

              {/* 5. RADIANT HEAD FIRE EMBER (Rides across top arch) */}
              <g ref={fireGroupRef} className="pointer-events-none" opacity="0">
                <circle r="22" fill="url(#fireAuraGrad)" />
                <circle r="12" fill="url(#fireCoreGrad)" filter="url(#goldGlow)" />
                <circle r="5" fill="#FFF9E6" />
                <circle r="2.5" fill="#FFFFFF" />
                <path
                  d="M 0,-14 L 3,-4 L 14,0 L 3,4 L 0,14 L -3,4 L -14,0 L -3,-4 Z"
                  fill="#FFE57F"
                  opacity="0.85"
                  className="animate-spin-slow"
                />
              </g>
            </svg>
          </div>

          {/* ========================================================= */}
          {/* WATERMARK MANDALA IN CENTER BACKGROUND                    */}
          {/* ========================================================= */}
          <div
            ref={watermarkMandalaRef}
            className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] pointer-events-none opacity-0 z-0"
          >
            <svg viewBox="0 0 370 370" className="w-full h-full" fill="none">
              <circle cx="185" cy="185" r="180" stroke="#C8A355" strokeWidth="0.7" strokeDasharray="3 5" opacity="0.22" />
              <circle cx="185" cy="185" r="150" stroke="#C8A355" strokeWidth="0.5" opacity="0.25" />
              <circle cx="185" cy="185" r="120" stroke="#C8A355" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
              <circle cx="185" cy="185" r="90" stroke="#C8A355" strokeWidth="0.6" opacity="0.25" />
              <circle cx="185" cy="185" r="60" stroke="#C8A355" strokeWidth="0.5" opacity="0.2" />
              <circle cx="185" cy="185" r="30" stroke="#C8A355" strokeWidth="0.7" opacity="0.3" />
              {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map(
                (deg) => (
                  <g key={deg} transform={`translate(185, 185) rotate(${deg})`}>
                    <path d="M 0,35 C 12,65 15,100 0,135 C -15,100 -12,65 0,35 Z" stroke="#C8A355" strokeWidth="0.6" opacity="0.22" />
                    <circle cx="0" cy="115" r="1.5" fill="#C8A355" opacity="0.25" />
                  </g>
                )
              )}
            </svg>
          </div>

          {/* ========================================================= */}
          {/* WALIMA COUPLE BACKGROUND PORTRAIT (LIGHT FADED)           */}
          {/* ========================================================= */}
          <div
            ref={coupleBgRef}
            className="absolute inset-x-3 sm:inset-x-6 top-16 bottom-6 rounded-[2.5rem] overflow-hidden pointer-events-none z-0 flex items-center justify-center opacity-0"
          >
            <img
              src={waleemaCoupleBg}
              alt="Walima Bride & Groom Portrait"
              className="w-full h-full object-cover object-top filter brightness-95 contrast-105 select-none"
              style={{
                maskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.35) 68%, transparent 94%)',
                WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.95) 25%, rgba(0,0,0,0.35) 68%, transparent 94%)',
              }}
            />
            {/* Soft Royal Plum & Gold Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1C0526]/75 via-[#160220]/45 to-[#0B0110]/85 pointer-events-none" />
          </div>

          {/* ========================================================= */}
          {/* CARD CONTENT LAYER (NATURAL FLOW - NEVER CLIPPED!)        */}
          {/* ========================================================= */}
          <div
            ref={cardBodyRef}
            className="relative z-30 w-full flex flex-col items-center text-center -mt-8 sm:-mt-10 px-5 sm:px-8 pb-10 pointer-events-auto opacity-0"
          >
            {/* Top Ornamental Header Section */}
            <div className="relative z-10 space-y-1.5 w-full max-w-md mx-auto">
              {/* 1. Arabic Text Calligraphy - Pronounced Embossed Gold Foil */}
              <div ref={arabicCalligraphyRef} className="mb-1 flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-amber-200 text-xs sm:text-sm animate-foil-glint">✦</span>
                <span
                  className="font-arabic-royal text-3xl sm:text-4xl lg:text-[46px] arabic-foil-embossed block font-bold leading-relaxed pt-1 select-none"
                  dir="rtl"
                >
                  وَلِيمَةُ الفَرَحِ وَالشُّكْرِ
                </span>
                <span className="text-amber-200 text-xs sm:text-sm animate-foil-glint" style={{ animationDelay: '2.2s' }}>✦</span>
              </div>

              {/* 2. Royal Arabesque Filigree Divider */}
              <div
                ref={decorativeDividerRef}
                className="flex items-center justify-center gap-1.5 sm:gap-2.5 my-2"
              >
                <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-amber-300/80 to-amber-200" />
                
                {/* Left Filigree Curlicue */}
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-amber-300/90 pointer-events-none">
                  <path d="M0 6 C6 6, 10 11, 18 6 C20 4.5, 22 6, 22 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="18" cy="6" r="1.5" fill="#FDE047" />
                </svg>

                {/* Center 8-Pointed Star / Diamond Rosette */}
                <div className="relative flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rotate-45 border border-amber-200 bg-gradient-to-br from-amber-100 via-amber-300 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.9)] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rotate-45 bg-[#2B0E1E] flex items-center justify-center">
                      <div className="w-0.5 h-0.5 rounded-full bg-amber-100" />
                    </div>
                  </div>
                </div>

                {/* Right Filigree Curlicue */}
                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" className="text-amber-300/90 scale-x-[-1] pointer-events-none">
                  <path d="M0 6 C6 6, 10 11, 18 6 C20 4.5, 22 6, 22 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="18" cy="6" r="1.5" fill="#FDE047" />
                </svg>

                <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-amber-300/80 to-amber-200" />
              </div>

              {/* 3 & 4. "WALEEMA" & "RECEPTION" Titles - Light Reflecting Metallic Embossed Gold Foil */}
              <div className="relative inline-block mx-auto">
                <h2
                  ref={titleWaleemaRef}
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-[0.28em] gold-foil-embossed my-1 leading-none select-none relative"
                >
                  WALEEMA
                </h2>
                {/* Specular Starlight Glint Corner Accent */}
                <span className="absolute -top-1 -right-3 sm:-right-5 text-amber-200 text-sm sm:text-base animate-foil-glint pointer-events-none">
                  ✦
                </span>
                <span className="absolute -bottom-1 -left-3 sm:-left-5 text-amber-300 text-xs sm:text-sm animate-foil-glint pointer-events-none" style={{ animationDelay: '1.8s' }}>
                  ✦
                </span>
              </div>

              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="h-[1px] w-6 bg-amber-400/40" />
                <h3
                  ref={titleReceptionRef}
                  className="font-serif text-xs sm:text-sm tracking-[0.45em] sub-foil-embossed uppercase font-bold select-none"
                >
                  Reception
                </h3>
                <span className="h-[1px] w-6 bg-amber-400/40" />
              </div>

              {/* 5. Subtitle / Wedding Dua & Blessing */}
              <p
                ref={subtitleQuoteRef}
                className="font-serif italic text-xs sm:text-sm md:text-[14.5px] text-amber-100/90 leading-relaxed font-light drop-shadow-[0_1px_10px_rgba(253,230,138,0.45)] max-w-lg mx-auto px-2 mt-3"
              >
                &ldquo;May Allah bless this union, shower His boundless grace upon you, and unite your hearts in eternal love, tranquility, and barakah.&rdquo;
              </p>
            </div>

            {/* ========================================================= */}
            {/* 6. VERTICAL TIMELINE WITH TRAVELING GLOWING DOT           */}
            {/* ========================================================= */}
            <div
              ref={timelineContainerRef}
              className="relative w-full max-w-[480px] sm:max-w-[540px] mx-auto py-5 my-2 z-10"
            >
              {/* Base Timeline Center Stem Track */}
              <div
                ref={timelineStemBaseRef}
                className="absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-[1.5px] bg-amber-400/35 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
              />

              {/* Active Illuminating Golden Stem Line */}
              <div
                ref={timelineStemGlowRef}
                className="absolute left-1/2 -translate-x-1/2 top-2 w-[2px] bg-gradient-to-b from-amber-100 via-amber-300 to-amber-400 shadow-[0_0_16px_rgba(253,230,138,1)] origin-top z-10"
              />

              {/* Traveling Glowing Champagne-Gold Dot with Outer Pulse & Light Trail */}
              <div
                ref={travelingDotRef}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 sm:w-5.5 h-5 sm:h-5.5 rounded-full bg-gradient-to-br from-white via-amber-100 to-amber-400 shadow-[0_0_24px_rgba(253,230,138,1),0_0_38px_rgba(245,158,11,0.9)] z-30 pointer-events-none flex items-center justify-center"
              >
                <div className="absolute inset-0 rounded-full border border-white/70 animate-ping opacity-75" />
                <div className="w-2 h-2 rotate-45 bg-white shadow-[0_0_8px_#FFFFFF]" />
              </div>

              {/* 4 Alternating Timeline Steps (Left -> Right -> Left -> Right) */}
              <div className="space-y-4 sm:space-y-6 relative z-20">
                {timelineSteps.map((step, idx) => {
                  const isLeft = step.side === 'left';
                  return (
                    <div key={idx} className="relative flex items-center min-h-[64px] sm:min-h-[70px]">
                      {/* Central Milestone Node - Radiant Celestial Spark (Replaces Black Dot) */}
                      <div
                        ref={(el) => {
                          timelineNodesRef.current[idx] = el;
                        }}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 w-8 h-8 z-25 flex items-center justify-center pointer-events-none group/spark"
                      >
                        {/* Outer Radiant Aura Glow */}
                        <div
                          className="absolute w-8 h-8 rounded-full bg-amber-400/25 blur-sm animate-pulse"
                          style={{ animationDuration: `${2.8 + idx * 0.4}s` }}
                        />

                        {/* Secondary Pulsing Spark Flare Wave */}
                        <div
                          className="absolute w-4 h-4 rounded-full border border-amber-300/60 animate-ping opacity-60"
                          style={{ animationDuration: `${3.2 + idx * 0.6}s`, animationDelay: `${idx * 0.5}s` }}
                        />

                        {/* 8-Pointed Celestial Gold Spark SVG */}
                        <svg
                          viewBox="0 0 28 28"
                          className="w-6 sm:w-7 h-6 sm:h-7 filter drop-shadow-[0_0_6px_rgba(253,230,138,1)] drop-shadow-[0_0_14px_rgba(245,158,11,0.95)] overflow-visible"
                        >
                          <defs>
                            <linearGradient id={`sparkGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" />
                              <stop offset="35%" stopColor="#FFF2B2" />
                              <stop offset="70%" stopColor="#FFD54F" />
                              <stop offset="100%" stopColor="#FFA000" />
                            </linearGradient>
                          </defs>
                          
                          {/* 1. Diagonal 4-Pointed Secondary Flare */}
                          <path
                            d="M14 6 L16 12 L22 14 L16 16 L14 22 L12 16 L6 14 L12 12 Z"
                            fill={`url(#sparkGrad-${idx})`}
                            opacity="0.85"
                            className="animate-spin-slow-reverse"
                            style={{ transformOrigin: '14px 14px' }}
                          />

                          {/* 2. Primary Cardinal 4-Pointed Radiant Spark Spikes */}
                          <path
                            d="M14 0 L16 11.5 L28 14 L16 16.5 L14 28 L12 16.5 L0 14 L12 11.5 Z"
                            fill={`url(#sparkGrad-${idx})`}
                          />

                          {/* 3. Glowing White-Hot Specular Center Star Core */}
                          <circle cx="14" cy="14" r="2.8" fill="#FFFFFF" />
                          <circle cx="14" cy="14" r="1.4" fill="#FFFDE7" />
                        </svg>
                      </div>

                      {/* Left Column Container */}
                      <div className="w-1/2 pr-3 sm:pr-5 flex justify-end relative">
                        {isLeft && (
                          <>
                            {/* Horizontal Connector Arm bridging Spark to Card */}
                            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-3 sm:w-5 h-[1.5px] bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400/90 shadow-[0_0_6px_rgba(253,230,138,0.9)] pointer-events-none z-15" />
                            
                            {/* Card with Animated Luminous Gold Border Beam */}
                            <div
                              ref={(el) => {
                                timelineCardsRef.current[idx] = el;
                              }}
                              className="relative w-full max-w-[210px] sm:max-w-[245px] p-[1.5px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.85)] group cursor-default transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_36px_rgba(245,158,11,0.3)]"
                            >
                              {/* Rotating 24K Gold Luminous Beam around Border */}
                              <div
                                className="absolute -inset-[180%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#D4AF37_325deg,#FFFFFF_345deg,#F59E0B_360deg)] animate-border-spin pointer-events-none"
                                style={{ animationDuration: `${5.5 + idx * 0.9}s` }}
                              />

                              {/* Inner Card Body with Glassmorphism and Royal Burgundy Plum Hue */}
                              <div className="relative w-full h-full rounded-[10.5px] sm:rounded-[14.5px] bg-gradient-to-br from-[#2D0D3E]/95 via-[#1E082B]/95 to-[#0F0216]/98 backdrop-blur-xl px-3.5 sm:px-4 py-2 sm:py-2.5 border border-amber-300/20 group-hover:border-amber-300/50 text-right transition-all duration-300">
                                {/* Ambient Starlight Accent */}
                                <div
                                  className="absolute top-2 left-2 text-amber-200/40 text-[9px] pointer-events-none animate-foil-glint"
                                  style={{ animationDelay: `${idx * 1.2}s` }}
                                >
                                  ✦
                                </div>

                                {/* Label with Diamond Accent */}
                                <div className="flex items-center gap-1.5 justify-end mb-0.5">
                                  <span className="w-1 h-1 rotate-45 bg-amber-400 shadow-[0_0_5px_#F59E0B]" />
                                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-sans font-extrabold text-amber-300/90 block">
                                    {step.label}
                                  </span>
                                </div>

                                {/* Value with Metallic Gold Shine */}
                                <p className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-wide leading-snug drop-shadow whitespace-nowrap">
                                  <span className="gold-shine-text">{step.value}</span>
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Right Column Container */}
                      <div className="w-1/2 pl-3 sm:pl-5 flex justify-start relative">
                        {!isLeft && (
                          <>
                            {/* Horizontal Connector Arm bridging Spark to Card */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-3 sm:w-5 h-[1.5px] bg-gradient-to-l from-amber-300 via-amber-200 to-amber-400/90 shadow-[0_0_6px_rgba(253,230,138,0.9)] pointer-events-none z-15" />
                            
                            {/* Card with Animated Luminous Gold Border Beam */}
                            <div
                              ref={(el) => {
                                timelineCardsRef.current[idx] = el;
                              }}
                              className="relative w-full max-w-[210px] sm:max-w-[245px] p-[1.5px] rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_8px_28px_rgba(0,0,0,0.85)] group cursor-default transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_36px_rgba(245,158,11,0.3)]"
                            >
                              {/* Rotating 24K Gold Luminous Beam around Border */}
                              <div
                                className="absolute -inset-[180%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#D4AF37_325deg,#FFFFFF_345deg,#F59E0B_360deg)] animate-border-spin pointer-events-none"
                                style={{ animationDuration: `${5.5 + idx * 0.9}s` }}
                              />

                              {/* Inner Card Body with Glassmorphism and Royal Burgundy Plum Hue */}
                              <div className="relative w-full h-full rounded-[10.5px] sm:rounded-[14.5px] bg-gradient-to-bl from-[#2D0D3E]/95 via-[#1E082B]/95 to-[#0F0216]/98 backdrop-blur-xl px-3.5 sm:px-4 py-2 sm:py-2.5 border border-amber-300/20 group-hover:border-amber-300/50 text-left transition-all duration-300">
                                {/* Ambient Starlight Accent */}
                                <div
                                  className="absolute top-2 right-2 text-amber-200/40 text-[9px] pointer-events-none animate-foil-glint"
                                  style={{ animationDelay: `${idx * 1.2}s` }}
                                >
                                  ✦
                                </div>

                                {/* Label with Diamond Accent */}
                                <div className="flex items-center gap-1.5 justify-start mb-0.5">
                                  <span className="text-[10px] sm:text-xs uppercase tracking-[0.28em] font-sans font-extrabold text-amber-300/90 block">
                                    {step.label}
                                  </span>
                                  <span className="w-1 h-1 rotate-45 bg-amber-400 shadow-[0_0_5px_#F59E0B]" />
                                </div>

                                {/* Value with Metallic Gold Shine */}
                                <p className="font-serif text-base sm:text-lg md:text-xl font-bold tracking-wide leading-snug drop-shadow whitespace-nowrap">
                                  <span className="gold-shine-text">{step.value}</span>
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ========================================================= */}
            {/* 7. LOCATION BUTTON ("📍 VIEW LOCATION")                   */}
            {/* Fully visible, prominent, and clickable with zero clipping */}
            {/* ========================================================= */}
            <div
              ref={locationButtonContainerRef}
              className="relative z-30 pt-4 pb-2 flex flex-col items-center w-full"
            >
              <a
                ref={locationButtonRef}
                href={AL_JANNAT_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenLocation(event)}
                className="group relative inline-flex items-center justify-center gap-2 py-3 px-8 sm:px-10 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 border-2 border-amber-200 text-slate-950 font-sans font-bold text-xs uppercase tracking-[0.24em] shadow-[0_0_35px_rgba(253,230,138,0.7),inset_0_1px_2px_rgba(255,255,255,0.8)] hover:shadow-[0_0_55px_rgba(253,230,138,1)] hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Specular Refractive Light Sheen Sweep across Button */}
                <div
                  ref={buttonSheenRef}
                  className="absolute inset-0 pointer-events-none overflow-hidden rounded-full"
                >
                  <div className="w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-glass-sheen" />
                </div>

                {/* Location Pin Icon */}
                <MapPin className="w-4 h-4 text-slate-950 group-hover:scale-125 group-hover:-translate-y-0.5 transition-transform duration-300 drop-shadow" />

                <span className="relative z-10 text-slate-950 font-extrabold tracking-[0.24em]">
                  VIEW LOCATION
                </span>

                <Sparkles className="w-3.5 h-3.5 text-amber-900 animate-pulse" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
