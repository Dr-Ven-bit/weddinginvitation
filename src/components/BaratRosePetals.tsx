import React, { useId } from 'react';

interface RedRosePetalProps {
  size?: number;
  rotation?: number;
  opacity?: number;
  variant?: 1 | 2 | 3;
  className?: string;
  style?: React.CSSProperties;
}

export const RedRosePetal: React.FC<RedRosePetalProps> = ({
  size = 28,
  rotation = 0,
  opacity = 0.9,
  variant = 1,
  className = '',
  style = {},
}) => {
  const uid = useId().replace(/:/g, '');

  return (
    <svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 40 50"
      fill="none"
      className={`select-none pointer-events-none drop-shadow-[0_4px_12px_rgba(136,19,55,0.65)] ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
        ...style,
      }}
    >
      <defs>
        {/* Velvety Deep Red Rose Gradient */}
        <radialGradient id={`petalRad-${uid}`} cx="45%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="25%" stopColor="#E11D48" />
          <stop offset="55%" stopColor="#BE123C" />
          <stop offset="80%" stopColor="#881337" />
          <stop offset="100%" stopColor="#4C0519" />
        </radialGradient>

        {/* Soft Satin Highlight */}
        <linearGradient id={`petalGleam-${uid}`} x1="15%" y1="10%" x2="85%" y2="85%">
          <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.65" />
          <stop offset="35%" stopColor="#FB7185" stopOpacity="0.3" />
          <stop offset="80%" stopColor="#9F1239" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#4C0519" stopOpacity="0" />
        </linearGradient>

        {/* Deep Ruby Shadow Under Curled Edge */}
        <radialGradient id={`petalShadow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#30030E" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#30030E" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Petal Outer Form */}
      {variant === 1 && (
        <>
          <path
            d="M 20,4 C 29,3 38,11 38,24 C 38,38 28,46 20,48 C 12,46 2,38 2,24 C 2,11 11,3 20,4 Z"
            fill={`url(#petalRad-${uid})`}
          />
          {/* Top Delicate Petal Curl */}
          <path
            d="M 12,8 C 17,5 23,5 28,8 C 34,12 35,20 32,27 C 27,21 21,15 12,8 Z"
            fill={`url(#petalGleam-${uid})`}
          />
          {/* Subtle center spine */}
          <path
            d="M 20,12 Q 21,28 20,44"
            stroke="#4C0519"
            strokeWidth="0.75"
            strokeLinecap="round"
            opacity="0.35"
          />
        </>
      )}

      {variant === 2 && (
        <>
          {/* Asymmetrical curled petal */}
          <path
            d="M 22,3 C 33,5 39,15 37,28 C 35,40 26,47 18,48 C 10,47 3,36 3,22 C 3,11 12,2 22,3 Z"
            fill={`url(#petalRad-${uid})`}
          />
          <path
            d="M 16,6 C 22,4 29,6 34,12 C 37,18 36,26 31,30 C 27,23 23,15 16,6 Z"
            fill={`url(#petalGleam-${uid})`}
          />
          <ellipse cx="24" cy="28" rx="8" ry="12" fill={`url(#petalShadow-${uid})`} />
        </>
      )}

      {variant === 3 && (
        <>
          {/* Slender drifting rose petal */}
          <path
            d="M 20,2 C 30,5 36,17 35,31 C 34,42 27,48 20,49 C 13,48 6,42 5,31 C 4,17 10,5 20,2 Z"
            fill={`url(#petalRad-${uid})`}
          />
          <path
            d="M 15,6 C 19,4 23,5 27,8 C 32,13 33,22 30,29 C 25,22 20,15 15,6 Z"
            fill={`url(#petalGleam-${uid})`}
          />
        </>
      )}
    </svg>
  );
};

export const BaratRosePetalsAura: React.FC = () => {
  // Preset array of drifting petals with varied positions, sizes, delays, and animation trajectories
  const driftingPetals = [
    { left: '6%', size: 30, delay: '0s', dur: '13s', type: 'animate-petal-fall-1', rot: 15, var: 1 },
    { left: '14%', size: 22, delay: '3.2s', dur: '16s', type: 'animate-petal-fall-2', rot: -25, var: 2 },
    { left: '22%', size: 34, delay: '6.8s', dur: '12s', type: 'animate-petal-fall-1', rot: 40, var: 3 },
    { left: '31%', size: 20, delay: '1.4s', dur: '14s', type: 'animate-petal-fall-2', rot: -10, var: 1 },
    { left: '40%', size: 26, delay: '8.5s', dur: '15s', type: 'animate-petal-fall-1', rot: 55, var: 2 },
    { left: '48%', size: 32, delay: '4.1s', dur: '11s', type: 'animate-petal-fall-1', rot: -30, var: 3 },
    { left: '57%', size: 24, delay: '9.8s', dur: '16s', type: 'animate-petal-fall-2', rot: 20, var: 1 },
    { left: '66%', size: 36, delay: '2.5s', dur: '13s', type: 'animate-petal-fall-1', rot: -45, var: 2 },
    { left: '74%', size: 22, delay: '7.2s', dur: '14s', type: 'animate-petal-fall-2', rot: 35, var: 3 },
    { left: '83%', size: 28, delay: '0.8s', dur: '15s', type: 'animate-petal-fall-1', rot: -15, var: 1 },
    { left: '91%', size: 32, delay: '5.6s', dur: '12s', type: 'animate-petal-fall-2', rot: 50, var: 2 },
    { left: '97%', size: 24, delay: '10.5s', dur: '17s', type: 'animate-petal-fall-1', rot: -20, var: 3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* ================================================================= */}
      {/* 1. LAYERED BLURRED GOLDEN BACKGROUND AURA & GLOWING BOKEH LIGHTS  */}
      {/* ================================================================= */}

      {/* Primary Radiant Warm Golden Core Bloom (emanating behind card) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] sm:w-[650px] lg:w-[750px] h-[480px] sm:h-[650px] lg:h-[750px] rounded-full pointer-events-none -z-10 animate-golden-aura"
        style={{
          background: 'radial-gradient(circle at center, rgba(251, 191, 36, 0.42) 0%, rgba(245, 158, 11, 0.28) 32%, rgba(217, 119, 6, 0.16) 55%, rgba(136, 19, 55, 0.08) 75%, transparent 88%)',
        }}
      />

      {/* Secondary Glowing Champagne Gold Orb (Top-Right flank) */}
      <div
        className="absolute top-[18%] right-[8%] sm:right-[15%] w-[320px] sm:w-[450px] h-[320px] sm:h-[450px] rounded-full pointer-events-none -z-10 animate-golden-bokeh-1"
        style={{
          background: 'radial-gradient(circle at center, rgba(253, 230, 138, 0.32) 0%, rgba(245, 158, 11, 0.18) 45%, transparent 75%)',
          filter: 'blur(75px)',
        }}
      />

      {/* Tertiary Amber-Gold & Crimson Velvet Light Pool (Bottom-Left flank) */}
      <div
        className="absolute bottom-[14%] left-[6%] sm:left-[12%] w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full pointer-events-none -z-10 animate-golden-bokeh-2"
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.28) 0%, rgba(225, 29, 72, 0.18) 45%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Golden Shimmering Halo Rings (Concentric Warm Blur Reflections) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full border border-amber-300/20 blur-sm pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] sm:w-[600px] h-[460px] sm:h-[600px] rounded-full border border-amber-400/10 blur-md pointer-events-none" />

      {/* Micro Golden Bokeh Light Flecks (Simulating warm wedding fairy light bokeh) */}
      {[
        { top: '22%', left: '18%', size: 45, opacity: 0.35, delay: '0s' },
        { top: '35%', left: '82%', size: 60, opacity: 0.28, delay: '2s' },
        { top: '68%', left: '15%', size: 55, opacity: 0.3, delay: '4s' },
        { top: '78%', left: '78%', size: 40, opacity: 0.32, delay: '1.5s' },
        { top: '48%', left: '90%', size: 50, opacity: 0.25, delay: '3.5s' },
        { top: '15%', left: '60%', size: 35, opacity: 0.38, delay: '5s' },
      ].map((bokeh, idx) => (
        <div
          key={`bokeh-${idx}`}
          className="absolute rounded-full bg-gradient-to-r from-amber-200 to-amber-400 blur-xl pointer-events-none animate-pulse"
          style={{
            top: bokeh.top,
            left: bokeh.left,
            width: `${bokeh.size}px`,
            height: `${bokeh.size}px`,
            opacity: bokeh.opacity,
            animationDuration: '6s',
            animationDelay: bokeh.delay,
          }}
        />
      ))}

      {/* ================================================================= */}
      {/* 2. DRIFTING & FALLING RED ROSE PETALS (VELVETY SURKH GULAB PATTIAN) */}
      {/* ================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {driftingPetals.map((petal, i) => (
          <div
            key={`petal-fall-${i}`}
            className={`absolute top-0 ${petal.type}`}
            style={{
              left: petal.left,
              animationDuration: petal.dur,
              animationDelay: petal.delay,
            }}
          >
            <RedRosePetal
              size={petal.size}
              rotation={petal.rot}
              variant={petal.var as 1 | 2 | 3}
              opacity={0.88}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
