import React from 'react';

export interface DholkiCardProps {
  position: 'left' | 'center' | 'right';
  label?: string;
  value?: string;
  subText?: string;
  isAnimatedIn?: boolean;
}

export const DholkiCard: React.FC<DholkiCardProps> = ({
  position,
  isAnimatedIn = true,
}) => {
  const isCenter = position === 'center';
  const isLeft = position === 'left';
  const isRight = position === 'right';

  const dholkiId = `dholki-${position}`;

  const getEntranceStyle = (): React.CSSProperties => {
    if (!isAnimatedIn) {
      return {
        opacity: 0,
        transform: isLeft
          ? 'translateX(-120px) rotate(-10deg) scale(0.78)'
          : isRight
          ? 'translateX(120px) rotate(10deg) scale(0.78)'
          : 'translateY(60px) scale(0.75)',
        transition: 'all 0.5s ease-out',
        willChange: 'transform, opacity',
      };
    }
    return {
      opacity: 1,
      transform: 'none',
      transition: isCenter
        ? 'all 2.4s cubic-bezier(0.16, 1, 0.3, 1) 2.85s'
        : isLeft
        ? 'all 2.2s cubic-bezier(0.16, 1, 0.3, 1) 2.6s'
        : 'all 2.2s cubic-bezier(0.16, 1, 0.3, 1) 2.7s',
      willChange: 'transform, opacity',
    };
  };

  return (
    <div
      style={getEntranceStyle()}
      className={`group relative flex flex-col items-center justify-center select-none cursor-default ${
        isCenter
          ? 'z-30 scale-110 xs:scale-115 sm:scale-125 md:scale-130 -translate-y-2 sm:-translate-y-3'
          : isLeft
          ? 'z-20 rotate-[-2.5deg] sm:rotate-[-3deg]'
          : 'z-20 rotate-[2.5deg] sm:rotate-[3deg]'
      }`}
    >
      {/* Ambient Floating Animation Wrapper once settled */}
      <div
        className={`w-full ${
          isAnimatedIn
            ? isCenter
              ? 'animate-dholki-center'
              : isLeft
              ? 'animate-dholki-left'
              : 'animate-dholki-right'
            : ''
        }`}
      >
        {/* Glow Aura for Center Dholki */}
        {isCenter && (
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-amber-400/30 via-rose-500/25 to-amber-400/30 blur-2xl pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
        )}

        {/* ============================================================== */}
        {/* UNMISTAKABLE PURE HANDCRAFTED WEDDING DHOLKI DRUM             */}
        {/* Clean, authentic, 100% visible with NO text boxes covering it! */}
        {/* ============================================================== */}
        <div className="relative w-full aspect-[280/150] flex items-center justify-center">
          <svg
            viewBox="0 0 280 150"
            className="w-full h-full overflow-visible filter drop-shadow-[0_14px_30px_rgba(0,0,0,0.85)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Barrel Wood Lacquer Gradient */}
              {isCenter ? (
                // Royal Deep Rani Magenta & Warm Sunset Gold Lacquer
                <linearGradient id={`${dholkiId}-wood`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4A0420" />
                  <stop offset="16%" stopColor="#831843" />
                  <stop offset="35%" stopColor="#BE185D" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="65%" stopColor="#BE185D" />
                  <stop offset="84%" stopColor="#831843" />
                  <stop offset="100%" stopColor="#4A0420" />
                </linearGradient>
              ) : isLeft ? (
                // Festive Saffron Orange & Marigold Amber with Rich Lacquer
                <linearGradient id={`${dholkiId}-wood`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#78350F" />
                  <stop offset="18%" stopColor="#C2410C" />
                  <stop offset="38%" stopColor="#EA580C" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="62%" stopColor="#EA580C" />
                  <stop offset="82%" stopColor="#C2410C" />
                  <stop offset="100%" stopColor="#78350F" />
                </linearGradient>
              ) : (
                // Imperial Ruby Maroon & Antique Bronze Gold
                <linearGradient id={`${dholkiId}-wood`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3F0713" />
                  <stop offset="18%" stopColor="#7F1D1D" />
                  <stop offset="38%" stopColor="#991B1B" />
                  <stop offset="50%" stopColor="#D97706" />
                  <stop offset="62%" stopColor="#991B1B" />
                  <stop offset="82%" stopColor="#7F1D1D" />
                  <stop offset="100%" stopColor="#3F0713" />
                </linearGradient>
              )}

              {/* 24K Gold Gota Brocade Lace Gradient */}
              <linearGradient id={`${dholkiId}-goldGota`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#92400E" />
                <stop offset="25%" stopColor="#FDE047" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="75%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#92400E" />
              </linearGradient>

              {/* Polished Brass Rings Gradient */}
              <linearGradient id={`${dholkiId}-brass`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>

              {/* Natural Parchment / Leather Drumhead Left (Bass / Bayan) */}
              <radialGradient id={`${dholkiId}-bassLeather`} cx="45%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="60%" stopColor="#FEF08A" />
                <stop offset="88%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>

              {/* Natural Parchment / Leather Drumhead Right (Treble / Dayan) */}
              <radialGradient id={`${dholkiId}-trebleLeather`} cx="55%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="60%" stopColor="#FEF08A" />
                <stop offset="88%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>

              {/* Specular Sheen for 3D Convex Cylinder */}
              <linearGradient id={`${dholkiId}-sheen`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                <stop offset="40%" stopColor="#FFFFFF" stopOpacity={isCenter ? '0.35' : '0.25'} />
                <stop offset="50%" stopColor="#FFFFFF" stopOpacity={isCenter ? '0.45' : '0.3'} />
                <stop offset="60%" stopColor="#FFFFFF" stopOpacity={isCenter ? '0.35' : '0.25'} />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 1. SOFT 3D CONTACT DROP SHADOW UNDER DRUM */}
            <ellipse
              cx="140"
              cy="126"
              rx={isCenter ? "105" : "90"}
              ry="12"
              fill="#000000"
              fillOpacity="0.6"
              filter="blur(5px)"
            />

            {/* 2. LEFT DRUMHEAD (BASS PURI / DHAMA / BAYAN) - VISIBLY PROTRUDING! */}
            <g id={`${dholkiId}-left-head`}>
              {/* Outer Leather Head Rim */}
              <ellipse cx="28" cy="74" rx="14" ry="46" fill={`url(#${dholkiId}-bassLeather)`} stroke="#FDE047" strokeWidth="1.8" />
              {/* Concentric Stitching & Collar Ring */}
              <ellipse cx="28" cy="74" rx="10" ry="38" fill="none" stroke="#B45309" strokeWidth="1.2" strokeDasharray="3 2" />
              {/* Heavy Brass / Iron Tuning Hoop (Kinar) */}
              <ellipse cx="30" cy="74" rx="13" ry="48" fill="none" stroke={`url(#${dholkiId}-brass)`} strokeWidth="3.5" />
            </g>

            {/* 3. MAIN CONVEX WOODEN CYLINDRICAL BARREL (KHOL) */}
            <path
              d="M 30 28 C 85 10, 195 10, 250 28 L 250 120 C 195 138, 85 138, 30 120 Z"
              fill={`url(#${dholkiId}-wood)`}
              stroke="#FDE047"
              strokeWidth={isCenter ? "2.2" : "1.8"}
            />

            {/* 4. ORNATE GOLD GOTA PATTI BANDS NEAR DRUMHEADS */}
            {/* Left Gota Brocade Collar */}
            <path
              d="M 46 31 C 49 55, 49 93, 46 117"
              stroke={`url(#${dholkiId}-goldGota)`}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Left Kiran Teeth (Golden Zig-Zag Lace) */}
            <path
              d="M 52 35 L 48 40 L 52 45 L 48 50 L 52 55 L 48 60 L 52 65 L 48 70 L 52 75 L 48 80 L 52 85 L 48 90 L 52 95 L 48 100 L 52 105 L 48 110 L 52 115"
              stroke="#FDE047"
              strokeWidth="1.2"
              fill="none"
              strokeOpacity="0.85"
            />

            {/* Right Gota Brocade Collar */}
            <path
              d="M 234 31 C 231 55, 231 93, 234 117"
              stroke={`url(#${dholkiId}-goldGota)`}
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Right Kiran Teeth (Golden Zig-Zag Lace) */}
            <path
              d="M 228 35 L 232 40 L 228 45 L 232 50 L 228 55 L 232 60 L 228 65 L 232 70 L 228 75 L 232 80 L 228 85 L 232 90 L 228 95 L 232 100 L 228 105 L 232 110 L 228 115"
              stroke="#FDE047"
              strokeWidth="1.2"
              fill="none"
              strokeOpacity="0.85"
            />

            {/* Top & Bottom Arching Embroidered Gold Edges */}
            <path d="M 36 32 C 88 18, 192 18, 244 32" stroke={`url(#${dholkiId}-goldGota)`} strokeWidth="3" fill="none" />
            <path d="M 36 116 C 88 130, 192 130, 244 116" stroke={`url(#${dholkiId}-goldGota)`} strokeWidth="3" fill="none" />

            {/* Decorative Central Waist Zardozi Embroidery Bands */}
            <path d="M 40 50 C 90 38, 190 38, 240 50" stroke="#FEF08A" strokeWidth="0.9" strokeOpacity="0.4" fill="none" />
            <path d="M 40 98 C 90 110, 190 110, 240 98" stroke="#FEF08A" strokeWidth="0.9" strokeOpacity="0.4" fill="none" />

            {/* Central Royal Zardozi Gold Rosette Medallion (Pure Traditional Ornament) */}
            <g transform="translate(140, 74)">
              {/* Outer Radiating Henna Rosette Star */}
              <circle cx="0" cy="0" r={isCenter ? "22" : "17"} stroke={`url(#${dholkiId}-goldGota)`} strokeWidth="1.2" strokeDasharray="3 3" fill="none" opacity="0.85" />
              {/* Gold Flower Petals */}
              <circle cx="0" cy="0" r={isCenter ? "15" : "11"} fill={`url(#${dholkiId}-goldGota)`} fillOpacity="0.35" stroke="#FDE047" strokeWidth="1.2" />
              <circle cx="0" cy="0" r={isCenter ? "8" : "6"} fill="#F59E0B" stroke="#FFF" strokeWidth="1" />
              <circle cx="0" cy="0" r={isCenter ? "3.5" : "2.5"} fill="#FFF" />
              
              {/* Small Surrounding Golden Sparkle Dots */}
              <circle cx="-16" cy="0" r="1.5" fill="#FEF08A" />
              <circle cx="16" cy="0" r="1.5" fill="#FEF08A" />
              <circle cx="0" cy="-16" r="1.5" fill="#FEF08A" />
              <circle cx="0" cy="16" r="1.5" fill="#FEF08A" />
            </g>

            {/* 5. INTERLACED TENSION ROPES (WADH / SOOT ROPES IN PROMINENT W-PATTERN) */}
            <g stroke="#FFFBEB" strokeWidth="2.2" strokeLinecap="round" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.9))">
              {/* Forward Diagonal Strands */}
              <line x1="30" y1="36" x2="78" y2="128" />
              <line x1="78" y1="128" x2="120" y2="20" />
              <line x1="120" y1="20" x2="160" y2="128" />
              <line x1="160" y1="128" x2="202" y2="20" />
              <line x1="202" y1="20" x2="250" y2="112" />

              {/* Backward Diagonal Strands crossing over */}
              <line x1="30" y1="112" x2="78" y2="20" stroke="#FEF08A" />
              <line x1="78" y1="20" x2="120" y2="128" stroke="#FEF08A" />
              <line x1="120" y1="128" x2="160" y2="20" stroke="#FEF08A" />
              <line x1="160" y1="20" x2="202" y2="128" stroke="#FEF08A" />
              <line x1="202" y1="128" x2="250" y2="36" stroke="#FEF08A" />
            </g>

            {/* 6. PROMINENT BRASS TUNING RINGS (CHHALLA RINGS) ON ROPES */}
            <g>
              <ellipse cx="78" cy="62" rx="4.5" ry="3.2" fill={`url(#${dholkiId}-brass)`} stroke="#451A03" strokeWidth="0.8" />
              <ellipse cx="120" cy="68" rx="5" ry="3.5" fill={`url(#${dholkiId}-brass)`} stroke="#451A03" strokeWidth="0.8" />
              <ellipse cx="160" cy="68" rx="5" ry="3.5" fill={`url(#${dholkiId}-brass)`} stroke="#451A03" strokeWidth="0.8" />
              <ellipse cx="202" cy="62" rx="4.5" ry="3.2" fill={`url(#${dholkiId}-brass)`} stroke="#451A03" strokeWidth="0.8" />
            </g>

            {/* 7. RIGHT DRUMHEAD (TREBLE PURI / THAPI / DAYAN WITH BLACK SIYAHI DOT) */}
            <g id={`${dholkiId}-right-head`}>
              {/* Outer Leather Head Rim */}
              <ellipse cx="252" cy="74" rx="14" ry="46" fill={`url(#${dholkiId}-trebleLeather)`} stroke="#FDE047" strokeWidth="1.8" />
              {/* Iconic Black Siyahi / Tuning Paste Circular Dot in Center! */}
              <ellipse cx="252" cy="74" rx="7" ry="20" fill="#18181B" stroke="#B45309" strokeWidth="1" />
              <ellipse cx="252" cy="74" rx="4.5" ry="12" fill="#09090B" />
              {/* Heavy Brass Tuning Hoop */}
              <ellipse cx="250" cy="74" rx="13" ry="48" fill="none" stroke={`url(#${dholkiId}-brass)`} strokeWidth="3.5" />
            </g>

            {/* 8. 3D SPECULAR HIGHLIGHT SHEEN SWEEP */}
            <path
              d="M 30 28 C 85 10, 195 10, 250 28 L 250 120 C 195 138, 85 138, 30 120 Z"
              fill={`url(#${dholkiId}-sheen)`}
              className="pointer-events-none"
            />

            {/* 9. FESTIVE HANGING SILK TASSELS (LATKAN) UNDER DRUM */}
            <g>
              {/* Left Tassel (Marigold Saffron) */}
              <path d="M 68 122 Q 62 136 64 146" stroke="#EA580C" strokeWidth="2.2" fill="none" />
              <circle cx="64" cy="146" r="3.5" fill="#F97316" stroke="#FEF08A" strokeWidth="1" />
              <circle cx="64" cy="149" r="1.5" fill="#FEF08A" />

              {/* Center Tassel (Rani Pink / Golden Pom-pom) */}
              <path d="M 140 128 Q 138 140 140 149" stroke="#DB2777" strokeWidth={isCenter ? "2.8" : "2.2"} fill="none" />
              <circle cx="140" cy="149" r={isCenter ? "5" : "4"} fill="#F59E0B" stroke="#FFF" strokeWidth="1.2" />
              <circle cx="140" cy="153" r="2" fill="#BE185D" />

              {/* Right Tassel (Emerald / Peacock Teal) */}
              <path d="M 212 122 Q 216 136 214 146" stroke="#0D9488" strokeWidth="2.2" fill="none" />
              <circle cx="214" cy="146" r="3.5" fill="#14B8A6" stroke="#FEF08A" strokeWidth="1" />
              <circle cx="214" cy="149" r="1.5" fill="#FEF08A" />
            </g>

            {/* 10. FESTIVE MARIGOLD CROWN ON TOP WAIST */}
            <g transform="translate(140, 15)">
              <circle cx="0" cy="0" r={isCenter ? "6.5" : "5"} fill="#F59E0B" stroke="#FEF08A" strokeWidth="1.2" />
              <circle cx="-7" cy="1" r={isCenter ? "4.5" : "3.5"} fill="#EA580C" />
              <circle cx="7" cy="1" r={isCenter ? "4.5" : "3.5"} fill="#10B981" />
              <circle cx="0" cy="0" r="2.2" fill="#FFF" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};
