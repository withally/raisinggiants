/**
 * SVG icons for the 9 parenting archetypes.
 * Style: Editorial ink illustrations with cross-hatching, matching SketchPortrait.tsx.
 * Render target: ~96×96px in the ArchetypeShowcase grid.
 */

interface IconProps {
  className?: string;
}

const svgProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 120 120",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── The Steady Anchor ──
   Ship's anchor with calm waterline and gentle ripples. */
export function SteadyAnchorIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Steady Anchor">
      {/* Waterline */}
      <path d="M10 44 C20 42, 30 46, 40 44 C50 42, 60 46, 70 44 C80 42, 90 46, 110 44" strokeWidth="1" opacity="0.3" />
      {/* Ripples below waterline */}
      <path d="M20 50 C28 48, 36 52, 44 50 C52 48, 60 52, 68 50" strokeWidth="0.7" opacity="0.2" />
      <path d="M30 56 C38 54, 46 58, 54 56 C62 54, 70 58, 78 56" strokeWidth="0.6" opacity="0.15" />
      {/* Anchor ring */}
      <circle cx="60" cy="26" r="6" strokeWidth="2" />
      {/* Rope coil at anchor ring */}
      <path d="M54 26 C54 22, 56 20, 58 21 C60 22, 60 24, 58 25" strokeWidth="0.7" opacity="0.4" />
      <path d="M66 26 C66 22, 64 20, 62 21 C60 22, 60 24, 62 25" strokeWidth="0.7" opacity="0.4" />
      <path d="M57 20 C58 18, 60 17, 62 18 C63 19, 63 21, 62 22" strokeWidth="0.6" opacity="0.3" />
      {/* Anchor shaft */}
      <path d="M60 32 L60 86" strokeWidth="2" />
      {/* Cross bar */}
      <path d="M42 58 L78 58" strokeWidth="2" />
      {/* Left fluke */}
      <path d="M60 86 C56 88, 44 82, 38 72 C36 68, 36 64, 40 62" strokeWidth="2" />
      <path d="M40 62 L42 58" strokeWidth="1.5" />
      {/* Right fluke */}
      <path d="M60 86 C64 88, 76 82, 82 72 C84 68, 84 64, 80 62" strokeWidth="2" />
      <path d="M80 62 L78 58" strokeWidth="1.5" />
      {/* Cross-hatch depth on flukes */}
      <path d="M44 72 L48 76" strokeWidth="0.5" opacity="0.2" />
      <path d="M46 72 L50 76" strokeWidth="0.5" opacity="0.2" />
      <path d="M72 72 L76 76" strokeWidth="0.5" opacity="0.2" />
      <path d="M74 72 L78 76" strokeWidth="0.5" opacity="0.2" />
      {/* Additional cross-hatch on flukes */}
      <path d="M42 68 L46 72" strokeWidth="0.45" opacity="0.14" />
      <path d="M44 68 L48 72" strokeWidth="0.45" opacity="0.14" />
      <path d="M76 68 L80 72" strokeWidth="0.45" opacity="0.14" />
      <path d="M74 68 L78 72" strokeWidth="0.45" opacity="0.14" />
      {/* Shaft texture */}
      <path d="M58 48 L62 48" strokeWidth="0.6" opacity="0.2" />
      <path d="M58 68 L62 68" strokeWidth="0.6" opacity="0.2" />
      <path d="M58 78 L62 78" strokeWidth="0.6" opacity="0.2" />
      {/* Stability dots */}
      <circle cx="60" cy="92" r="1.5" fill="currentColor" stroke="none" opacity="0.25" />
      <circle cx="54" cy="96" r="1" fill="currentColor" stroke="none" opacity="0.15" />
      <circle cx="66" cy="96" r="1" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Ambient detail dots */}
      <circle cx="30" cy="48" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="90" cy="42" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="48" cy="90" r="0.8" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Fierce Guardian ──
   Shield with a watchful eye, radiating vigilance lines. */
export function FierceGuardianIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Fierce Guardian">
      {/* Shield outline */}
      <path d="M60 14 L30 28 C28 30, 26 40, 28 52 C30 68, 40 84, 60 100 C80 84, 90 68, 92 52 C94 40, 92 30, 90 28 Z" strokeWidth="2" />
      {/* Inner shield border */}
      <path d="M60 22 L36 34 C34 36, 33 44, 34 54 C36 66, 44 80, 60 92 C76 80, 84 66, 86 54 C87 44, 86 36, 84 34 Z" strokeWidth="1" opacity="0.3" />
      {/* Watchful eye */}
      <path d="M42 54 C48 44, 54 40, 60 40 C66 40, 72 44, 78 54" strokeWidth="1.5" />
      <path d="M42 54 C48 64, 54 68, 60 68 C66 68, 72 64, 78 54" strokeWidth="1.5" />
      {/* Iris */}
      <circle cx="60" cy="54" r="8" strokeWidth="1.2" />
      {/* Pupil */}
      <circle cx="60" cy="54" r="4" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="57" cy="51" r="1.5" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Vigilance lines radiating from eye — more lines for intensity */}
      <path d="M36 54 L28 54" strokeWidth="0.8" opacity="0.3" />
      <path d="M84 54 L92 54" strokeWidth="0.8" opacity="0.3" />
      <path d="M40 46 L34 40" strokeWidth="0.7" opacity="0.25" />
      <path d="M80 46 L86 40" strokeWidth="0.7" opacity="0.25" />
      <path d="M40 62 L34 68" strokeWidth="0.7" opacity="0.25" />
      <path d="M80 62 L86 68" strokeWidth="0.7" opacity="0.25" />
      {/* Additional vigilance lines */}
      <path d="M44 42 L38 36" strokeWidth="0.6" opacity="0.2" />
      <path d="M76 42 L82 36" strokeWidth="0.6" opacity="0.2" />
      {/* Cross-hatch on shield bottom */}
      <path d="M48 76 L52 80" strokeWidth="0.5" opacity="0.15" />
      <path d="M50 76 L54 80" strokeWidth="0.5" opacity="0.15" />
      <path d="M68 76 L72 80" strokeWidth="0.5" opacity="0.15" />
      <path d="M70 76 L74 80" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch on shield sides */}
      <path d="M32 60 L36 64" strokeWidth="0.45" opacity="0.13" />
      <path d="M34 60 L38 64" strokeWidth="0.45" opacity="0.13" />
      <path d="M82 60 L86 64" strokeWidth="0.45" opacity="0.13" />
      <path d="M84 60 L88 64" strokeWidth="0.45" opacity="0.13" />
      {/* Shield top detail */}
      <path d="M56 20 L60 14 L64 20" strokeWidth="0.8" opacity="0.3" />
      {/* Ambient dots */}
      <circle cx="46" cy="90" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="74" cy="88" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="32" cy="40" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Gentle Nurturer ──
   Cupped hands holding a small sprout/seedling. */
export function GentleNurturerIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Gentle Nurturer">
      {/* Left cupped hand */}
      <path d="M22 68 C18 60, 20 52, 28 48 C32 46, 38 48, 42 52 C46 56, 48 60, 50 64" strokeWidth="2" />
      <path d="M22 68 C24 74, 30 78, 38 80 C44 82, 48 80, 52 76" strokeWidth="1.8" />
      {/* Left fingers */}
      <path d="M28 48 C26 44, 28 40, 32 40" strokeWidth="1.2" opacity="0.5" />
      <path d="M34 46 C33 42, 35 38, 38 39" strokeWidth="1.2" opacity="0.5" />
      {/* Left palm line */}
      <path d="M26 56 C30 58, 36 60, 42 58" strokeWidth="0.7" opacity="0.3" />
      {/* Right cupped hand */}
      <path d="M98 68 C102 60, 100 52, 92 48 C88 46, 82 48, 78 52 C74 56, 72 60, 70 64" strokeWidth="2" />
      <path d="M98 68 C96 74, 90 78, 82 80 C76 82, 72 80, 68 76" strokeWidth="1.8" />
      {/* Right fingers */}
      <path d="M92 48 C94 44, 92 40, 88 40" strokeWidth="1.2" opacity="0.5" />
      <path d="M86 46 C87 42, 85 38, 82 39" strokeWidth="1.2" opacity="0.5" />
      {/* Right palm line */}
      <path d="M94 56 C90 58, 84 60, 78 58" strokeWidth="0.7" opacity="0.3" />
      {/* Soil mound in hands */}
      <path d="M42 72 C48 68, 56 66, 60 66 C64 66, 72 68, 78 72" strokeWidth="1.2" opacity="0.5" />
      <path d="M44 74 C50 72, 56 70, 60 70 C64 70, 70 72, 76 74" strokeWidth="0.8" opacity="0.3" />
      {/* Sprout stem */}
      <path d="M60 66 C59 58, 58 50, 60 42" strokeWidth="1.5" />
      {/* Left leaf */}
      <path d="M60 50 C54 44, 46 42, 42 44 C46 46, 52 48, 58 52" strokeWidth="1.2" opacity="0.6" />
      <path d="M50 44 L52 48" strokeWidth="0.5" opacity="0.2" />
      {/* Tiny water drop on left leaf */}
      <path d="M46 46 C46 44, 47 43, 48 44 C48 45, 47 46, 46 46" strokeWidth="0.6" opacity="0.35" />
      {/* Right leaf */}
      <path d="M60 42 C66 36, 74 34, 78 36 C74 38, 68 40, 62 44" strokeWidth="1.2" opacity="0.6" />
      <path d="M70 36 L68 40" strokeWidth="0.5" opacity="0.2" />
      {/* Tiny unfurling top leaf */}
      <path d="M60 42 C58 36, 56 30, 58 26 C60 24, 62 26, 62 30" strokeWidth="1" opacity="0.5" />
      {/* Growth lines */}
      <path d="M56 28 L52 24" strokeWidth="0.6" opacity="0.2" />
      <path d="M64 30 L68 26" strokeWidth="0.6" opacity="0.2" />
      <path d="M54 34 L50 32" strokeWidth="0.6" opacity="0.2" />
      {/* Cross-hatch shadow under hands */}
      <path d="M36 82 L40 86" strokeWidth="0.5" opacity="0.15" />
      <path d="M38 82 L42 86" strokeWidth="0.5" opacity="0.15" />
      <path d="M78 82 L82 86" strokeWidth="0.5" opacity="0.15" />
      <path d="M80 82 L84 86" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch on hands */}
      <path d="M26 62 L30 66" strokeWidth="0.45" opacity="0.13" />
      <path d="M28 62 L32 66" strokeWidth="0.45" opacity="0.13" />
      <path d="M88 62 L92 66" strokeWidth="0.45" opacity="0.13" />
      <path d="M90 62 L94 66" strokeWidth="0.45" opacity="0.13" />
      {/* Ambient dots */}
      <circle cx="58" cy="24" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="62" cy="20" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
      <circle cx="44" cy="50" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
    </svg>
  );
}

/* ── The Intentional Guide ──
   Compass with a winding path extending to the horizon. */
export function IntentionalGuideIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Intentional Guide">
      {/* Compass outer ring */}
      <circle cx="42" cy="60" r="26" strokeWidth="2" />
      <circle cx="42" cy="60" r="22" strokeWidth="0.8" opacity="0.3" />
      {/* Cardinal points */}
      <path d="M42 34 L42 38" strokeWidth="1.2" />
      <path d="M42 82 L42 86" strokeWidth="1.2" />
      <path d="M16 60 L20 60" strokeWidth="1.2" />
      <path d="M64 60 L68 60" strokeWidth="1.2" />
      {/* Minor tick marks */}
      <path d="M54 38 L52 40" strokeWidth="0.7" opacity="0.4" />
      <path d="M30 38 L32 40" strokeWidth="0.7" opacity="0.4" />
      <path d="M54 82 L52 80" strokeWidth="0.7" opacity="0.4" />
      <path d="M30 82 L32 80" strokeWidth="0.7" opacity="0.4" />
      {/* Compass needle — north */}
      <path d="M42 60 L38 42 L42 46 L46 42 Z" strokeWidth="1.2" />
      {/* Compass needle — south (lighter) */}
      <path d="M42 60 L38 78 L42 74 L46 78 Z" strokeWidth="1" opacity="0.4" />
      {/* Center pin */}
      <circle cx="42" cy="60" r="2" strokeWidth="1" fill="currentColor" opacity="0.4" />
      {/* Winding path from compass eastward */}
      <path d="M68 60 C74 58, 78 52, 84 50 C90 48, 94 44, 98 38 C102 32, 106 28, 110 24" strokeWidth="1.5" />
      <path d="M68 60 C74 62, 78 66, 82 64 C86 62, 88 56, 92 54" strokeWidth="0.8" opacity="0.3" />
      {/* Horizon line */}
      <path d="M80 24 C90 22, 100 22, 114 24" strokeWidth="0.8" opacity="0.25" />
      {/* Horizon glow */}
      <path d="M106 20 L110 16" strokeWidth="0.6" opacity="0.2" />
      <path d="M110 20 L114 16" strokeWidth="0.6" opacity="0.2" />
      <path d="M102 22 L104 18" strokeWidth="0.6" opacity="0.2" />
      {/* Path texture dots — more dots along path */}
      <circle cx="76" cy="56" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="88" cy="48" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="100" cy="34" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      {/* Additional path dots */}
      <circle cx="82" cy="52" r="0.7" fill="currentColor" stroke="none" opacity="0.15" />
      <circle cx="94" cy="42" r="0.7" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Cross-hatch on compass face */}
      <path d="M30 52 L34 56" strokeWidth="0.4" opacity="0.12" />
      <path d="M32 52 L36 56" strokeWidth="0.4" opacity="0.12" />
      <path d="M48 66 L52 70" strokeWidth="0.4" opacity="0.12" />
      <path d="M50 66 L54 70" strokeWidth="0.4" opacity="0.12" />
      {/* Additional cross-hatch */}
      <path d="M24 52 L28 56" strokeWidth="0.4" opacity="0.1" />
      <path d="M26 52 L30 56" strokeWidth="0.4" opacity="0.1" />
      {/* Ambient dots */}
      <circle cx="20" cy="66" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="60" cy="36" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="108" cy="30" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Resilient Striver ──
   Cracked stone with a plant growing through the crack. */
export function ResilientStriverIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Resilient Striver">
      {/* Stone / boulder shape */}
      <path d="M20 78 C16 68, 18 54, 24 46 C30 38, 42 34, 56 34 C70 34, 82 38, 90 46 C98 54, 102 68, 100 78 C98 86, 88 92, 72 94 C56 96, 36 94, 24 90 C20 88, 18 84, 20 78" strokeWidth="2" />
      {/* Main crack through stone */}
      <path d="M52 94 C50 86, 54 78, 52 70 C50 62, 56 54, 58 46 C60 40, 62 36, 64 34" strokeWidth="1.5" />
      {/* Crack branches */}
      <path d="M52 70 C46 66, 40 64, 36 62" strokeWidth="1" opacity="0.5" />
      <path d="M56 58 C62 56, 68 58, 72 56" strokeWidth="1" opacity="0.5" />
      <path d="M54 82 C48 80, 42 82, 38 80" strokeWidth="0.8" opacity="0.4" />
      {/* Additional crack branches */}
      <path d="M50 76 C44 74, 38 76, 34 74" strokeWidth="0.7" opacity="0.35" />
      <path d="M54 64 C60 62, 66 64, 70 62" strokeWidth="0.7" opacity="0.35" />
      {/* Plant stem growing through crack */}
      <path d="M56 54 C56 46, 54 38, 56 30 C57 24, 58 18, 60 14" strokeWidth="1.5" />
      {/* Left leaf */}
      <path d="M56 30 C50 24, 44 22, 40 24 C44 28, 50 30, 56 34" strokeWidth="1.2" opacity="0.6" />
      <path d="M48 24 L50 28" strokeWidth="0.5" opacity="0.2" />
      {/* Right leaf */}
      <path d="M58 22 C64 18, 70 16, 74 18 C70 22, 64 24, 60 26" strokeWidth="1.2" opacity="0.6" />
      <path d="M68 18 L66 22" strokeWidth="0.5" opacity="0.2" />
      {/* Top bud */}
      <path d="M60 14 C58 10, 56 8, 58 6 C60 4, 62 6, 62 10 C62 12, 60 14, 60 14" strokeWidth="1" opacity="0.5" />
      {/* Stone texture — cross-hatch */}
      <path d="M30 56 L34 60" strokeWidth="0.5" opacity="0.15" />
      <path d="M32 56 L36 60" strokeWidth="0.5" opacity="0.15" />
      <path d="M78 56 L82 60" strokeWidth="0.5" opacity="0.15" />
      <path d="M80 56 L84 60" strokeWidth="0.5" opacity="0.15" />
      <path d="M40 76 L44 80" strokeWidth="0.5" opacity="0.15" />
      <path d="M42 76 L46 80" strokeWidth="0.5" opacity="0.15" />
      <path d="M72 76 L76 80" strokeWidth="0.5" opacity="0.15" />
      <path d="M74 76 L78 80" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch clusters */}
      <path d="M24 70 L28 74" strokeWidth="0.45" opacity="0.13" />
      <path d="M26 70 L30 74" strokeWidth="0.45" opacity="0.13" />
      <path d="M86 70 L90 74" strokeWidth="0.45" opacity="0.13" />
      <path d="M88 70 L92 74" strokeWidth="0.45" opacity="0.13" />
      {/* Speckle texture on stone */}
      <circle cx="34" cy="50" r="0.8" fill="currentColor" stroke="none" opacity="0.15" />
      <circle cx="80" cy="48" r="0.8" fill="currentColor" stroke="none" opacity="0.15" />
      <circle cx="68" cy="84" r="0.8" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Ambient dots */}
      <circle cx="26" cy="80" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="96" cy="76" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="58" cy="10" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Structured Mentor ──
   Geometric scaffold/framework with a figure growing inside. */
export function StructuredMentorIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Structured Mentor">
      {/* Outer scaffold — geometric framework */}
      <rect x="24" y="18" width="72" height="88" rx="4" strokeWidth="2" />
      {/* Horizontal scaffold bars */}
      <path d="M24 42 L96 42" strokeWidth="1.2" opacity="0.4" />
      <path d="M24 66 L96 66" strokeWidth="1.2" opacity="0.4" />
      <path d="M24 90 L96 90" strokeWidth="1.2" opacity="0.4" />
      {/* Vertical scaffold bars */}
      <path d="M48 18 L48 106" strokeWidth="1.2" opacity="0.4" />
      <path d="M72 18 L72 106" strokeWidth="1.2" opacity="0.4" />
      {/* Diagonal brace lines in scaffold cells — upper-left cell */}
      <path d="M26 44 L46 64" strokeWidth="0.5" opacity="0.15" />
      <path d="M30 44 L48 62" strokeWidth="0.45" opacity="0.12" />
      {/* Diagonal brace lines — upper-right cell */}
      <path d="M74 44 L94 64" strokeWidth="0.5" opacity="0.15" />
      <path d="M78 44 L96 62" strokeWidth="0.45" opacity="0.12" />
      {/* Figure head */}
      <circle cx="60" cy="36" r="7" strokeWidth="1.5" />
      {/* Figure body — growing upward */}
      <path d="M60 43 L60 72" strokeWidth="1.5" />
      {/* Arms reaching outward to scaffold */}
      <path d="M60 52 L48 48" strokeWidth="1.2" />
      <path d="M60 52 L72 48" strokeWidth="1.2" />
      {/* Legs grounded */}
      <path d="M60 72 L52 86" strokeWidth="1.2" />
      <path d="M60 72 L68 86" strokeWidth="1.2" />
      {/* Growth lines extending above figure */}
      <path d="M60 29 L60 24" strokeWidth="0.7" opacity="0.3" />
      <path d="M56 30 L52 26" strokeWidth="0.6" opacity="0.25" />
      <path d="M64 30 L68 26" strokeWidth="0.6" opacity="0.25" />
      {/* Scaffold joint dots */}
      <circle cx="48" cy="42" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="72" cy="42" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="48" cy="66" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="72" cy="66" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="48" cy="90" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="72" cy="90" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      {/* Cross-hatch in scaffold corners */}
      <path d="M28 94 L32 98" strokeWidth="0.5" opacity="0.15" />
      <path d="M30 94 L34 98" strokeWidth="0.5" opacity="0.15" />
      <path d="M86 94 L90 98" strokeWidth="0.5" opacity="0.15" />
      <path d="M88 94 L92 98" strokeWidth="0.5" opacity="0.15" />
      <path d="M28 22 L32 26" strokeWidth="0.5" opacity="0.15" />
      <path d="M30 22 L34 26" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch */}
      <path d="M86 22 L90 26" strokeWidth="0.45" opacity="0.13" />
      <path d="M88 22 L92 26" strokeWidth="0.45" opacity="0.13" />
      {/* Ambient dots */}
      <circle cx="36" cy="30" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="84" cy="30" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="60" cy="100" r="0.8" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Open-Hearted Learner ──
   Open palms with an imperfect heart hovering above, growth lines. */
export function OpenHeartedLearnerIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Open-Hearted Learner">
      {/* Left open palm */}
      <path d="M26 76 C22 70, 24 62, 30 58 C34 56, 38 58, 42 62" strokeWidth="1.8" />
      <path d="M26 76 C28 82, 34 86, 42 86 C46 86, 50 84, 52 80" strokeWidth="1.6" />
      {/* Left fingers spread open */}
      <path d="M30 58 C28 52, 26 46, 26 42" strokeWidth="1.2" opacity="0.5" />
      <path d="M34 56 C34 50, 34 44, 36 40" strokeWidth="1.2" opacity="0.5" />
      <path d="M38 56 C40 50, 42 44, 44 40" strokeWidth="1" opacity="0.4" />
      {/* Left palm line */}
      <path d="M28 66 C32 68, 38 68, 42 66" strokeWidth="0.6" opacity="0.25" />
      {/* Right open palm */}
      <path d="M94 76 C98 70, 96 62, 90 58 C86 56, 82 58, 78 62" strokeWidth="1.8" />
      <path d="M94 76 C92 82, 86 86, 78 86 C74 86, 70 84, 68 80" strokeWidth="1.6" />
      {/* Right fingers spread open */}
      <path d="M90 58 C92 52, 94 46, 94 42" strokeWidth="1.2" opacity="0.5" />
      <path d="M86 56 C86 50, 86 44, 84 40" strokeWidth="1.2" opacity="0.5" />
      <path d="M82 56 C80 50, 78 44, 76 40" strokeWidth="1" opacity="0.4" />
      {/* Right palm line */}
      <path d="M92 66 C88 68, 82 68, 78 66" strokeWidth="0.6" opacity="0.25" />
      {/* Imperfect heart hovering above — slightly asymmetric, hand-drawn feel */}
      <path d="M48 42 C44 34, 44 26, 50 22 C54 20, 58 22, 60 26 C62 22, 66 20, 70 22 C76 26, 76 34, 72 42 L60 56 L48 42" strokeWidth="2" />
      {/* Heart crack — imperfect, still beautiful */}
      <path d="M60 28 C58 32, 56 38, 58 44" strokeWidth="0.8" opacity="0.35" />
      <path d="M56 36 C54 34, 52 36, 52 38" strokeWidth="0.6" opacity="0.25" />
      {/* Subtle heartbeat line near the heart */}
      <path d="M38 34 C40 34, 42 32, 44 34 C46 36, 48 30, 50 34 C52 38, 54 34, 56 34" strokeWidth="0.6" opacity="0.25" />
      {/* Growth lines from heart */}
      <path d="M46 36 L40 32" strokeWidth="0.7" opacity="0.25" />
      <path d="M44 28 L38 24" strokeWidth="0.7" opacity="0.25" />
      <path d="M74 36 L80 32" strokeWidth="0.7" opacity="0.25" />
      <path d="M76 28 L82 24" strokeWidth="0.7" opacity="0.25" />
      <path d="M60 18 L60 12" strokeWidth="0.7" opacity="0.25" />
      <path d="M54 20 L50 16" strokeWidth="0.6" opacity="0.2" />
      <path d="M66 20 L70 16" strokeWidth="0.6" opacity="0.2" />
      {/* Cross-hatch under palms */}
      <path d="M32 88 L36 92" strokeWidth="0.5" opacity="0.15" />
      <path d="M34 88 L38 92" strokeWidth="0.5" opacity="0.15" />
      <path d="M82 88 L86 92" strokeWidth="0.5" opacity="0.15" />
      <path d="M84 88 L88 92" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch */}
      <path d="M24 72 L28 76" strokeWidth="0.45" opacity="0.13" />
      <path d="M26 72 L30 76" strokeWidth="0.45" opacity="0.13" />
      {/* Ambient dots */}
      <circle cx="60" cy="10" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="40" cy="20" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
      <circle cx="80" cy="20" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Devoted Champion ──
   Raised torch casting a spotlight down onto a small figure. */
export function DevotedChampionIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Devoted Champion">
      {/* Torch handle */}
      <path d="M56 50 L52 90" strokeWidth="2" />
      <path d="M64 50 L68 90" strokeWidth="2" />
      {/* Handle grip texture */}
      <path d="M54 60 L66 58" strokeWidth="0.8" opacity="0.3" />
      <path d="M53 68 L67 66" strokeWidth="0.8" opacity="0.3" />
      <path d="M52 76 L68 74" strokeWidth="0.8" opacity="0.3" />
      {/* Torch cup */}
      <path d="M48 50 C48 46, 50 44, 56 44 L64 44 C70 44, 72 46, 72 50 L68 50 L52 50 Z" strokeWidth="1.5" />
      {/* Flame */}
      <path d="M56 44 C54 36, 52 28, 56 20 C58 16, 60 14, 62 16 C66 20, 68 28, 64 44" strokeWidth="1.5" />
      {/* Inner flame */}
      <path d="M58 42 C57 36, 56 30, 58 24 C59 22, 61 22, 62 24 C64 30, 63 36, 62 42" strokeWidth="1" opacity="0.5" />
      {/* Flame tip */}
      <path d="M59 20 C59 16, 60 12, 61 16" strokeWidth="0.8" opacity="0.4" />
      {/* Spotlight cone going down-right */}
      <path d="M52 50 L28 100" strokeWidth="0.8" opacity="0.2" />
      <path d="M68 50 L44 100" strokeWidth="0.8" opacity="0.2" />
      {/* Spotlight glow lines */}
      <path d="M46 66 L50 66" strokeWidth="0.5" opacity="0.15" />
      <path d="M40 78 L46 78" strokeWidth="0.5" opacity="0.15" />
      <path d="M34 90 L42 90" strokeWidth="0.5" opacity="0.15" />
      {/* Small figure in spotlight */}
      <circle cx="36" cy="92" r="3.5" strokeWidth="1.2" />
      <path d="M36 95.5 L36 104" strokeWidth="1.2" />
      <path d="M36 98 L32 102" strokeWidth="1" />
      <path d="M36 98 L40 102" strokeWidth="1" />
      <path d="M36 104 L33 110" strokeWidth="1" />
      <path d="M36 104 L39 110" strokeWidth="1" />
      {/* Cross-hatch depth around torch */}
      <path d="M74 48 L78 52" strokeWidth="0.5" opacity="0.15" />
      <path d="M76 48 L80 52" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch on handle */}
      <path d="M50 82 L54 86" strokeWidth="0.45" opacity="0.13" />
      <path d="M52 82 L56 86" strokeWidth="0.45" opacity="0.13" />
      {/* Flame sparkles — more dots */}
      <circle cx="50" cy="30" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="70" cy="26" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="54" cy="18" r="0.6" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Additional sparkle dots */}
      <circle cx="48" cy="22" r="0.7" fill="currentColor" stroke="none" opacity="0.15" />
      <circle cx="72" cy="32" r="0.7" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Ambient dot */}
      <circle cx="80" cy="60" r="0.7" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}

/* ── The Collaborative Ally ──
   Two overlapping speech bubbles with a connecting symbol in the overlap. */
export function CollaborativeAllyIcon({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="The Collaborative Ally">
      {/* Left speech bubble */}
      <path d="M18 30 C18 22, 24 16, 34 16 L62 16 C72 16, 78 22, 78 30 L78 50 C78 58, 72 64, 62 64 L42 64 L30 76 L32 64 L34 64 C24 64, 18 58, 18 50 Z" strokeWidth="2" />
      {/* Right speech bubble */}
      <path d="M42 40 C42 32, 48 26, 58 26 L86 26 C96 26, 102 32, 102 40 L102 60 C102 68, 96 74, 86 74 L66 74 L78 86 L74 74 L58 74 C48 74, 42 68, 42 60 Z" strokeWidth="2" />
      {/* Overlap zone — connection */}
      {/* Infinity/link symbol in overlap area */}
      <path d="M56 46 C52 42, 52 38, 56 36 C60 34, 64 38, 64 42 C64 46, 60 50, 56 48 C52 46, 52 42, 56 40" strokeWidth="1.2" opacity="0.6" />
      <path d="M64 42 C68 38, 68 34, 64 32" strokeWidth="1" opacity="0.4" />
      <path d="M56 48 C52 52, 52 56, 56 58" strokeWidth="1" opacity="0.4" />
      {/* Dots representing shared ideas — more dots */}
      <circle cx="50" cy="44" r="1.5" fill="currentColor" stroke="none" opacity="0.25" />
      <circle cx="70" cy="44" r="1.5" fill="currentColor" stroke="none" opacity="0.25" />
      <circle cx="60" cy="52" r="1.5" fill="currentColor" stroke="none" opacity="0.25" />
      {/* Additional shared idea dots */}
      <circle cx="56" cy="58" r="1.2" fill="currentColor" stroke="none" opacity="0.18" />
      <circle cx="64" cy="30" r="1.2" fill="currentColor" stroke="none" opacity="0.18" />
      {/* Left bubble content lines */}
      <path d="M28 32 L48 32" strokeWidth="0.8" opacity="0.2" />
      <path d="M28 38 L44 38" strokeWidth="0.8" opacity="0.2" />
      <path d="M28 44 L40 44" strokeWidth="0.7" opacity="0.15" />
      {/* Right bubble content lines */}
      <path d="M72 42 L92 42" strokeWidth="0.8" opacity="0.2" />
      <path d="M68 48 L92 48" strokeWidth="0.8" opacity="0.2" />
      <path d="M72 54 L88 54" strokeWidth="0.7" opacity="0.15" />
      {/* Cross-hatch in overlap */}
      <path d="M54 54 L58 58" strokeWidth="0.5" opacity="0.15" />
      <path d="M56 54 L60 58" strokeWidth="0.5" opacity="0.15" />
      <path d="M62 34 L66 38" strokeWidth="0.5" opacity="0.15" />
      <path d="M64 34 L68 38" strokeWidth="0.5" opacity="0.15" />
      {/* Additional cross-hatch in bubbles */}
      <path d="M22 52 L26 56" strokeWidth="0.45" opacity="0.13" />
      <path d="M24 52 L28 56" strokeWidth="0.45" opacity="0.13" />
      <path d="M92 30 L96 34" strokeWidth="0.45" opacity="0.13" />
      <path d="M94 30 L98 34" strokeWidth="0.45" opacity="0.13" />
      {/* Ambient dots */}
      <circle cx="24" cy="26" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="96" cy="68" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="60" cy="70" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
    </svg>
  );
}
