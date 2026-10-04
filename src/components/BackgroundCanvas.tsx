import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  currentSection: 'welcome' | 'mehndi' | 'barat' | 'walima' | 'rsvp';
  scrollProgress: number; // 0 to 1 overall page scroll
}

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedY: number;
  speedX: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  pulseOffset: number;
  type: 'gold' | 'emerald' | 'amber' | 'petal' | 'star';
  rotation: number;
  rotationSpeed: number;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ currentSection, scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Color definitions for smooth transition based on scroll
    // 0.0 - 0.25: Welcome (Midnight Gold)
    // 0.25 - 0.50: Mehndi (Emerald Teal & Amber)
    // 0.50 - 0.75: Barat (Deep Burgundy & Champagne)
    // 0.75 - 1.00: Walima (Twilight Rose-Gold & Ivory)
    const colorThemes = [
      {
        pos: 0.0,
        top: [8, 12, 22], // Deep Royal Midnight #080C16
        mid: [16, 23, 38], // Dark Indigo Slate #101726
        bottom: [5, 8, 15], // Obsidian
        accent: [212, 175, 55], // Gold
      },
      {
        pos: 0.33,
        top: [4, 26, 22], // Deep Emerald #041A16
        mid: [7, 43, 36], // Peacock Teal #072B24
        bottom: [2, 18, 14], // Dark Forest
        accent: [245, 158, 11], // Warm Amber
      },
      {
        pos: 0.66,
        top: [26, 5, 12], // Deep Burgundy #1A050C
        mid: [45, 10, 22], // Royal Wine #2D0A16
        bottom: [15, 3, 7], // Dark Maroon
        accent: [225, 29, 72], // Crimson Gold
      },
      {
        pos: 1.0,
        top: [15, 10, 22], // Twilight Rose #0F0A16
        mid: [28, 17, 36], // Deep Velvet Plum #1C1124
        bottom: [8, 6, 12], // Night Shadow
        accent: [244, 114, 182], // Rose Gold
      },
    ];

    // Helper to interpolate between RGB colors
    const lerpColor = (c1: number[], c2: number[], factor: number) => {
      return [
        Math.round(c1[0] + (c2[0] - c1[0]) * factor),
        Math.round(c1[1] + (c2[1] - c1[1]) * factor),
        Math.round(c1[2] + (c2[2] - c1[2]) * factor),
      ];
    };

    const getInterpolatedBackground = (p: number) => {
      const clamped = Math.max(0, Math.min(1, p));
      let idx = 0;
      for (let i = 0; i < colorThemes.length - 1; i++) {
        if (clamped >= colorThemes[i].pos && clamped <= colorThemes[i + 1].pos) {
          idx = i;
          break;
        }
      }
      const t1 = colorThemes[idx];
      const t2 = colorThemes[idx + 1] || colorThemes[idx];
      const localFactor = (clamped - t1.pos) / ((t2.pos - t1.pos) || 1);

      return {
        top: lerpColor(t1.top, t2.top, localFactor),
        mid: lerpColor(t1.mid, t2.mid, localFactor),
        bottom: lerpColor(t1.bottom, t2.bottom, localFactor),
        accent: lerpColor(t1.accent, t2.accent, localFactor),
      };
    };

    // Particle creation (approx 65 particles for high performance)
    const particleCount = window.innerWidth < 768 ? 35 : 65;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const typeChoice = Math.random();
      let type: Particle['type'] = 'gold';
      if (typeChoice < 0.4) type = 'gold';
      else if (typeChoice < 0.65) type = 'star';
      else if (typeChoice < 0.85) type = 'amber';
      else type = 'petal';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseSize: Math.random() * 2.5 + 1,
        size: Math.random() * 2.5 + 1,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        maxOpacity: Math.random() * 0.5 + 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        type,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;

      // Draw dynamic background gradient
      const bgColors = getInterpolatedBackground(scrollProgress);
      const grad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        width * 0.05,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );

      grad.addColorStop(0, `rgb(${bgColors.mid.join(',')})`);
      grad.addColorStop(0.55, `rgb(${bgColors.top.join(',')})`);
      grad.addColorStop(1, `rgb(${bgColors.bottom.join(',')})`);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle ambient light orbs
      const orbX = width * 0.5 + Math.sin(time * 0.4) * 80;
      const orbY = height * 0.3 + Math.cos(time * 0.5) * 60;
      const orbGrad = ctx.createRadialGradient(orbX, orbY, 10, orbX, orbY, Math.min(width, height) * 0.45);
      orbGrad.addColorStop(0, `rgba(${bgColors.accent.join(',')}, 0.09)`);
      orbGrad.addColorStop(0.6, `rgba(${bgColors.accent.join(',')}, 0.03)`);
      orbGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = orbGrad;
      ctx.fillRect(0, 0, width, height);

      // Render floating cinematic particles
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.pulseOffset) * 0.25;
        p.rotation += p.rotationSpeed;

        // Wrap around smoothly
        if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        const currentOpacity = Math.max(
          0.1,
          p.maxOpacity * (0.6 + 0.4 * Math.sin(time * 2 + p.pulseOffset))
        );

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'star') {
          // Draw sparkling 4-point golden star
          ctx.strokeStyle = `rgba(253, 230, 138, ${currentOpacity})`;
          ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity * 0.8})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          const s = p.baseSize * 1.6;
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.3, -s * 0.3);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.3, s * 0.3);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.3, s * 0.3);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.3, -s * 0.3);
          ctx.closePath();
          ctx.fill();
        } else if (p.type === 'petal') {
          // Soft floating rose/jasmine petal
          ctx.fillStyle = `rgba(254, 243, 199, ${currentOpacity * 0.45})`;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.baseSize * 1.8, p.baseSize * 0.9, p.rotation, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Soft glowing golden/amber dust sphere
          const pGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.baseSize * 2.2);
          if (p.type === 'amber') {
            pGrad.addColorStop(0, `rgba(251, 191, 36, ${currentOpacity})`);
            pGrad.addColorStop(0.5, `rgba(217, 119, 6, ${currentOpacity * 0.5})`);
          } else {
            pGrad.addColorStop(0, `rgba(254, 240, 138, ${currentOpacity})`);
            pGrad.addColorStop(0.6, `rgba(202, 138, 4, ${currentOpacity * 0.4})`);
          }
          pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = pGrad;
          ctx.beginPath();
          ctx.arc(0, 0, p.baseSize * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollProgress]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* High-Performance Canvas for dynamic background gradients & particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      {/* Layer 1: Subtle Islamic Arabesque Geometric Watermark Overlay with dynamic opacity */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-screen transition-opacity duration-1000 bg-repeat pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L46 14L60 20L46 26L40 40L34 26L20 20L34 14ZM40 40L46 54L60 60L46 66L40 80L34 66L20 60L34 54ZM0 40L14 34L20 20L26 34L40 40L26 46L20 60L14 46ZM40 40L54 34L60 20L66 34L80 40L66 46L60 60L54 46Z' fill='%23E5C158' fill-opacity='0.8' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
        }}
      />

      {/* Layer 2: Section-specific environmental atmospheric overlays */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          currentSection === 'welcome' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(ellipse at 50% 25%, rgba(212, 175, 55, 0.12) 0%, transparent 65%)',
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          currentSection === 'mehndi' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 20% 40%, rgba(5, 150, 105, 0.18) 0%, transparent 55%), radial-gradient(circle at 80% 60%, rgba(245, 158, 11, 0.14) 0%, transparent 50%)',
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          currentSection === 'barat' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(159, 18, 57, 0.22) 0%, transparent 65%), radial-gradient(circle at 85% 70%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)',
        }}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          currentSection === 'walima' || currentSection === 'rsvp' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 20%, rgba(244, 114, 182, 0.16) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(253, 230, 138, 0.12) 0%, transparent 50%)',
        }}
      />

      {/* Subtle vignette border */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.8)] pointer-events-none" />
    </div>
  );
};
