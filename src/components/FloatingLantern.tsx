import React from 'react';

export interface FloatingLanternProps {
  variant?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
  chainLength?: number;
  opacity?: number;
  className?: string;
  glowColor?: string;
  delay?: string;
}

export const FloatingLantern: React.FC<FloatingLanternProps> = ({
  variant = 'center',
  size = 'md',
  chainLength = 36,
  opacity = 0.85,
  className = '',
  glowColor = '#F59E0B',
  delay = '0s',
}) => {
  const swayClass =
    variant === 'left'
      ? 'animate-lantern-sway-left'
      : variant === 'right'
      ? 'animate-lantern-sway-right'
      : 'animate-lantern-sway-center';

  const scale = size === 'sm' ? 0.75 : size === 'lg' ? 1.15 : 0.92;

  return (
    <div
      className={`pointer-events-none select-none ${swayClass} ${className}`}
      style={{ opacity, animationDelay: delay }}
    >
      <div
        className="flex flex-col items-center"
        style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}
      >
        {/* Hanging Golden Chain with tiny links */}
        <div
          className="w-[1.5px] bg-gradient-to-b from-amber-400/20 via-amber-300/70 to-amber-400"
          style={{ height: `${chainLength}px` }}
        />

        {/* Lantern Body Container */}
        <div className="relative -mt-0.5 flex flex-col items-center">
          {/* Ambient Warm Candlelight Flare Halo */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full pointer-events-none animate-candle-pulse"
            style={{
              background: `radial-gradient(circle, ${glowColor}50 0%, ${glowColor}20 45%, transparent 75%)`,
              animationDelay: delay,
            }}
          />

          {/* Handcrafted Ornate Mughal / Moroccan Lantern SVG */}
          <svg
            width="44"
            height="72"
            viewBox="0 0 44 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 drop-shadow-[0_4px_16px_rgba(245,158,11,0.55)]"
          >
            <defs>
              {/* Brass 24K Gold Gradient */}
              <linearGradient id={`lanternGold-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="35%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>

              {/* Candle Flame Radial Glow */}
              <radialGradient id={`candleFlame-${variant}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FEF08A" />
                <stop offset="65%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0.2" />
              </radialGradient>
            </defs>

            {/* Top Hanging Ring */}
            <circle cx="22" cy="4" r="3" stroke={`url(#lanternGold-${variant})`} strokeWidth="1.5" fill="none" />

            {/* Top Cap Finial */}
            <path d="M20 7 H24 L25 10 H19 Z" fill={`url(#lanternGold-${variant})`} />

            {/* Mughal Dome Roof */}
            <path
              d="M14 17 C14 11, 20 10, 22 10 C24 10, 30 11, 30 17 L34 22 H10 L14 17 Z"
              fill={`url(#lanternGold-${variant})`}
              stroke="#FEF08A"
              strokeWidth="0.8"
            />

            {/* Lantern Glass Body (Inner Warm Glow) */}
            <path
              d="M11 22 L14 52 H30 L33 22 Z"
              fill="#120803"
              fillOpacity="0.82"
              stroke={`url(#lanternGold-${variant})`}
              strokeWidth="1.3"
            />

            {/* Warm Candle Core Flame */}
            <ellipse
              cx="22"
              cy="37"
              rx="4"
              ry="7"
              fill={`url(#candleFlame-${variant})`}
              className="animate-candle-pulse"
              style={{ animationDelay: delay }}
            />
            <circle cx="22" cy="38" r="1.8" fill="#FFFFFF" />

            {/* Intricate Filigree Jaali Lattice Cutouts */}
            <line x1="22" y1="22" x2="22" y2="52" stroke={`url(#lanternGold-${variant})`} strokeWidth="0.9" />
            <line x1="11" y1="22" x2="30" y2="52" stroke="#FEF08A" strokeWidth="0.6" strokeOpacity="0.55" />
            <line x1="33" y1="22" x2="14" y2="52" stroke="#FEF08A" strokeWidth="0.6" strokeOpacity="0.55" />
            <path d="M12.5 37 H31.5" stroke={`url(#lanternGold-${variant})`} strokeWidth="0.9" />

            {/* Arched Jaali Filigree Windows */}
            <path
              d="M17 37 C17 31, 22 31, 22 37"
              stroke="#FEF08A"
              strokeWidth="0.7"
              fill="none"
              strokeOpacity="0.75"
            />
            <path
              d="M22 37 C22 31, 27 31, 27 37"
              stroke="#FEF08A"
              strokeWidth="0.7"
              fill="none"
              strokeOpacity="0.75"
            />

            {/* Base Tier */}
            <path
              d="M13 52 L11 58 H33 L31 52 Z"
              fill={`url(#lanternGold-${variant})`}
              stroke="#FEF08A"
              strokeWidth="0.8"
            />

            {/* Bottom Crystal Bead / Tassel Drop */}
            <path d="M22 58 V64" stroke={`url(#lanternGold-${variant})`} strokeWidth="1.2" />
            <circle cx="22" cy="65" r="2.2" fill="#FEF08A" stroke="#B45309" strokeWidth="0.6" />
            <path d="M22 67 L21 71 L23 71 Z" fill={`url(#lanternGold-${variant})`} />
          </svg>
        </div>
      </div>
    </div>
  );
};
