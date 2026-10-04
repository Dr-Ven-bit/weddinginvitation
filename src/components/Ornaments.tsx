import React from 'react';

export const BismillahCalligraphy: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`text-center select-none ${className}`}>
    <span
      className="font-arabic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-200/90 tracking-wide block drop-shadow-[0_2px_15px_rgba(251,191,36,0.35)] leading-relaxed"
      dir="rtl"
    >
      بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
    </span>
  </div>
);

export const IslamicStar8: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-700 ${className}`}
  >
    <defs>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2D1" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#997010" />
      </linearGradient>
    </defs>
    {/* Outer 8-point star */}
    <rect
      x="20"
      y="20"
      width="60"
      height="60"
      stroke="url(#goldGrad)"
      strokeWidth="1.5"
      fill="none"
    />
    <rect
      x="20"
      y="20"
      width="60"
      height="60"
      stroke="url(#goldGrad)"
      strokeWidth="1.5"
      fill="none"
      transform="rotate(45 50 50)"
    />
    {/* Inner decorative circle & rosette */}
    <circle cx="50" cy="50" r="18" stroke="url(#goldGrad)" strokeWidth="1" />
    <circle cx="50" cy="50" r="8" fill="url(#goldGrad)" fillOpacity="0.4" />
    <circle cx="50" cy="50" r="3" fill="#FFF2D1" />
  </svg>
);

export const FloralCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none ${
        position.includes('top') ? 'top-2 sm:top-3' : 'bottom-2 sm:bottom-3'
      } ${position.includes('left') ? 'left-2 sm:left-3' : 'right-2 sm:right-3'} ${className}`}
      style={{ transform: getTransform() }}
    >
      <svg width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,0 L60,0 C40,0 20,20 20,40 C20,60 0,60 0,60 Z"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
          opacity="0.75"
        />
        <path
          d="M10,10 L45,10 C30,10 15,25 15,40"
          fill="none"
          stroke="#F3E5AB"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="12" cy="12" r="3" fill="#E6CA65" opacity="0.8" />
        <circle cx="32" cy="10" r="1.5" fill="#E6CA65" opacity="0.6" />
        <circle cx="10" cy="32" r="1.5" fill="#E6CA65" opacity="0.6" />
      </svg>
    </div>
  );
};

export const DiyaCandle: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label,
}) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <div className="relative w-12 h-14 flex items-center justify-center">
      {/* Outer Glow Halo */}
      <div className="absolute top-1 w-10 h-10 rounded-full bg-amber-400/25 blur-lg animate-pulse pointer-events-none" />

      {/* Flame SVG */}
      <div className="absolute top-0 animate-flame">
        <svg width="22" height="30" viewBox="0 0 30 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="flameGrad" cx="50%" cy="80%" r="70%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#FDE047" />
              <stop offset="65%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.8" />
            </radialGradient>
          </defs>
          <path
            d="M15 2 C18 10, 26 16, 26 26 C26 33, 21 38, 15 38 C9 38, 4 33, 4 26 C4 16, 12 10, 15 2 Z"
            fill="url(#flameGrad)"
          />
          {/* Inner bright core */}
          <ellipse cx="15" cy="27" rx="4" ry="7" fill="#FFFFFF" opacity="0.9" />
        </svg>
      </div>

      {/* Traditional Brass / Terracotta Diya Cup */}
      <svg
        className="absolute bottom-1 w-11 h-6"
        viewBox="0 0 60 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 10 Q30 32 55 10 Q50 6 30 6 Q10 6 5 10 Z"
          fill="url(#brassGrad)"
          stroke="#E6CA65"
          strokeWidth="1.2"
        />
        <defs>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
    {label && (
      <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-serif mt-1">
        {label}
      </span>
    )}
  </div>
);

export const HangingLantern: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex flex-col items-center ${className}`}>
    {/* Chain */}
    <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-amber-400/60 to-amber-300" />
    {/* Lantern Body */}
    <div className="relative w-8 h-12 -mt-1">
      <div className="absolute inset-0 bg-amber-400/20 blur-md rounded-full animate-pulse" />
      <svg viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Top Dome */}
        <path d="M20 2 L26 12 L14 12 Z" fill="#D4AF37" />
        {/* Glass Cylinder with Moorish arches */}
        <path
          d="M12 12 L28 12 L26 44 L14 44 Z"
          fill="#FEF3C7"
          fillOpacity="0.4"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        {/* Internal candlelight */}
        <circle cx="20" cy="28" r="4" fill="#FBBF24" />
        {/* Base and finial */}
        <path d="M13 44 L27 44 L20 54 Z" fill="#997010" />
        <circle cx="20" cy="56" r="2" fill="#D4AF37" />
      </svg>
    </div>
  </div>
);

export const DividerOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto py-2 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-amber-500/50 to-amber-400/80" />
    <div className="rotate-45 w-2 h-2 border border-amber-300 bg-amber-500/40" />
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-amber-500/50 to-amber-400/80" />
  </div>
);

export const RoyalBaratCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative flex flex-col items-center justify-center ${className}`}>
    {/* Outer Radiant Gold Halo */}
    <div className="absolute w-24 h-24 rounded-full bg-amber-400/15 blur-xl pointer-events-none" />

    {/* Medallion Glass Frame */}
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-amber-400/30 via-rose-950/80 to-[#120308] border-2 border-amber-300/60 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.35)] backdrop-blur-md">
      {/* 8-Point Star with Radial Piercings */}
      <IslamicStar8 size={36} className="animate-[spin_60s_linear_infinite]" />
    </div>

    {/* Delicate Floral Crest Wings */}
    <div className="flex items-center gap-3 mt-2">
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-400/80" />
      <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-amber-300/90">
        Imperial Barat
      </span>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-400/80" />
    </div>
  </div>
);

export const MughalFloralVine: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right':
        return 'scaleX(-1)';
      case 'bottom-left':
        return 'scaleY(-1)';
      case 'bottom-right':
        return 'scale(-1, -1)';
      default:
        return 'none';
    }
  };

  return (
    <div
      className={`absolute pointer-events-none select-none z-20 ${
        position.includes('top') ? '-top-3 sm:-top-5' : '-bottom-3 sm:-bottom-5'
      } ${position.includes('left') ? '-left-3 sm:-left-5' : '-right-3 sm:-right-5'} ${className}`}
      style={{ transform: getTransform() }}
    >
      <svg
        width="65"
        height="65"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
      >
        <path
          d="M0,0 C25,0 45,10 60,30 C75,50 85,75 100,100"
          stroke="url(#vineGoldGrad)"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M0,15 C20,15 35,25 45,45 C55,65 65,85 85,100"
          stroke="url(#vineGoldGrad)"
          strokeWidth="1"
          opacity="0.7"
          fill="none"
        />
        {/* Mughal Floral Petals */}
        <circle cx="28" cy="14" r="3.5" fill="#FFEAA7" opacity="0.9" />
        <circle cx="48" cy="34" r="3" fill="#E6CA65" opacity="0.8" />
        <circle cx="68" cy="58" r="3.5" fill="#FFEAA7" opacity="0.9" />
        {/* Curving Tendril Leaves */}
        <path
          d="M28,14 C35,8 42,12 38,20 C34,28 26,22 28,14 Z"
          fill="url(#vineGoldGrad)"
          opacity="0.8"
        />
        <path
          d="M48,34 C55,28 62,32 58,40 C54,48 46,42 48,34 Z"
          fill="url(#vineGoldGrad)"
          opacity="0.8"
        />
        <defs>
          <linearGradient id="vineGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D2" />
            <stop offset="50%" stopColor="#E6CA65" />
            <stop offset="100%" stopColor="#997010" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const FloatingLantern: React.FC<{
  className?: string;
  size?: number;
  chainLength?: number;
  swayClass?: string;
}> = ({
  className = '',
  size = 38,
  chainLength = 32,
  swayClass = 'animate-lantern-sway-1',
}) => {
  const lanternId = React.useId().replace(/:/g, '');
  const totalHeight = size + chainLength;
  const viewBoxHeight = 100 + chainLength * 2;

  return (
    <div className={`relative flex flex-col items-center pointer-events-none select-none ${swayClass} ${className}`}>
      {/* Warm Ambient Lantern Light Halo */}
      <div
        className="absolute rounded-full bg-amber-400/25 blur-xl pointer-events-none"
        style={{
          width: size * 1.6,
          height: size * 1.6,
          top: chainLength + size * 0.1,
        }}
      />

      <svg
        width={size}
        height={totalHeight}
        viewBox={`0 0 60 ${viewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible filter drop-shadow-[0_4px_12px_rgba(245,158,11,0.5)]"
      >
        <defs>
          <linearGradient id={`${lanternId}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="35%" stopColor="#FDE047" />
            <stop offset="70%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          <radialGradient id={`${lanternId}-flame`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>

          <radialGradient id={`${lanternId}-glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Hanging Chain from Top */}
        <line
          x1="30"
          y1="0"
          x2="30"
          y2={chainLength * 2}
          stroke={`url(#${lanternId}-gold)`}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Top Ring / Finial Mount */}
        <circle cx="30" cy={chainLength * 2} r="3.5" fill="none" stroke={`url(#${lanternId}-gold)`} strokeWidth="1.5" />
        <circle cx="30" cy={chainLength * 2 + 5} r="2" fill="#FEF08A" />

        {/* Group with Lantern Body positioned after chain */}
        <g transform={`translate(0, ${chainLength * 2 + 6})`}>
          {/* Lantern Top Canopy Dome */}
          <path
            d="M30 0 L44 14 L16 14 Z"
            fill={`url(#${lanternId}-gold)`}
            stroke="#FEF08A"
            strokeWidth="0.8"
          />
          {/* Decorative Trim under dome */}
          <line x1="14" y1="14" x2="46" y2="14" stroke={`url(#${lanternId}-gold)`} strokeWidth="2" strokeLinecap="round" />

          {/* Glowing Glass Body */}
          <path
            d="M17 15 L43 15 L48 42 L30 54 L12 42 Z"
            fill="rgba(8, 28, 18, 0.85)"
            stroke={`url(#${lanternId}-gold)`}
            strokeWidth="1.5"
          />

          {/* Internal Radiating Warm Flame Glow */}
          <ellipse cx="30" cy="34" rx="14" ry="16" fill={`url(#${lanternId}-glow)`} />

          {/* Glowing Candle Flame */}
          <path
            d="M30 22 C32 26 34 30 33 34 C32 37 28 37 27 34 C26 30 28 26 30 22 Z"
            fill={`url(#${lanternId}-flame)`}
            className="animate-pulse"
          />
          <circle cx="30" cy="33" r="2" fill="#FFFFFF" />

          {/* Mughal Filigree Jali Trellis Lines on Glass */}
          <line x1="30" y1="15" x2="30" y2="54" stroke={`url(#${lanternId}-gold)`} strokeWidth="1" strokeOpacity="0.75" />
          <line x1="17" y1="15" x2="48" y2="42" stroke="#FEF08A" strokeWidth="0.75" strokeOpacity="0.5" />
          <line x1="43" y1="15" x2="12" y2="42" stroke="#FEF08A" strokeWidth="0.75" strokeOpacity="0.5" />
          <line x1="12" y1="42" x2="48" y2="42" stroke={`url(#${lanternId}-gold)`} strokeWidth="1" strokeOpacity="0.6" />

          {/* Scalloped Bottom Base */}
          <path
            d="M12 42 L30 54 L48 42 L30 50 Z"
            fill={`url(#${lanternId}-gold)`}
          />

          {/* Bottom Hanging Crystal Droplet / Bead */}
          <circle cx="30" cy="58" r="2.5" fill="#FEF08A" stroke="#B45309" strokeWidth="0.5" />
          <path d="M30 60.5 L30 67" stroke={`url(#${lanternId}-gold)`} strokeWidth="1" />
          <polygon points="30,67 32,71 30,75 28,71" fill="#FEF08A" />
        </g>
      </svg>
    </div>
  );
};

