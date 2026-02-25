/**
 * Editorial topic icons for KOL researchers.
 * Style: Highly stylised editorial illustrations — detailed ink work,
 * cross-hatching, rich visual metaphors representing each researcher's
 * key contribution to parenting science.
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

/* ── Diana Baumrind: Authoritative Parenting Framework ──
   Icon: A tree with strong, grounded roots and open, free-growing branches.
   Roots = structure/authority, canopy = warmth/freedom. Balance. */
export function BaumrindPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Authoritative parenting framework">
      {/* Trunk — strong, slightly organic */}
      <path d="M58 68 C56 74, 55 82, 54 92 C53 96, 52 100, 50 104" strokeWidth="2" />
      <path d="M62 68 C64 74, 65 82, 66 92 C67 96, 68 100, 70 104" strokeWidth="2" />
      <path d="M59 72 L61 72" strokeWidth="1.2" opacity="0.3" />
      <path d="M57 80 L63 80" strokeWidth="1" opacity="0.25" />
      <path d="M56 88 L64 88" strokeWidth="0.8" opacity="0.2" />
      {/* Roots — grounded, spreading, structured */}
      <path d="M50 104 C44 108, 36 110, 28 112" strokeWidth="1.8" />
      <path d="M50 104 C46 110, 40 114, 34 118" strokeWidth="1.5" />
      <path d="M52 100 C48 106, 42 108, 38 108" strokeWidth="1.2" opacity="0.5" />
      <path d="M70 104 C76 108, 84 110, 92 112" strokeWidth="1.8" />
      <path d="M70 104 C74 110, 80 114, 86 118" strokeWidth="1.5" />
      <path d="M68 100 C72 106, 78 108, 82 108" strokeWidth="1.2" opacity="0.5" />
      {/* Root texture — cross-hatch underground */}
      <path d="M32 112 L36 116" strokeWidth="0.6" opacity="0.2" />
      <path d="M34 112 L38 116" strokeWidth="0.6" opacity="0.2" />
      <path d="M84 112 L88 116" strokeWidth="0.6" opacity="0.2" />
      <path d="M86 112 L90 116" strokeWidth="0.6" opacity="0.2" />
      {/* Ground line */}
      <path d="M20 106 C40 104, 60 105, 80 104 C90 104, 100 106, 106 107" strokeWidth="1" opacity="0.3" />
      {/* Canopy — open, organic, free */}
      <path d="M60 66 C52 60, 38 52, 30 44 C26 40, 28 34, 34 32" strokeWidth="1.8" />
      <path d="M60 66 C56 58, 46 46, 40 36 C38 32, 40 28, 46 26" strokeWidth="1.6" />
      <path d="M60 66 C58 56, 54 42, 56 30 C56 26, 58 22, 62 20" strokeWidth="1.6" />
      <path d="M60 66 C62 56, 66 42, 64 30 C64 26, 62 22, 58 20" strokeWidth="1.4" opacity="0.6" />
      <path d="M60 66 C64 58, 74 46, 80 36 C82 32, 80 28, 74 26" strokeWidth="1.6" />
      <path d="M60 66 C68 60, 82 52, 90 44 C94 40, 92 34, 86 32" strokeWidth="1.8" />
      {/* Leaves — small clustered strokes */}
      <path d="M30 42 C28 38, 30 34, 34 32" strokeWidth="1" opacity="0.4" />
      <path d="M32 38 C30 34, 32 30, 36 30" strokeWidth="0.8" opacity="0.3" />
      <path d="M42 30 C40 26, 42 22, 46 22" strokeWidth="0.8" opacity="0.3" />
      <path d="M46 26 C44 22, 46 18, 50 18" strokeWidth="0.8" opacity="0.3" />
      <path d="M56 22 C56 18, 58 14, 62 14" strokeWidth="0.8" opacity="0.3" />
      <path d="M62 20 C64 16, 66 14, 68 16" strokeWidth="0.8" opacity="0.3" />
      <path d="M74 26 C76 22, 78 20, 80 22" strokeWidth="0.8" opacity="0.3" />
      <path d="M80 30 C82 26, 84 24, 86 26" strokeWidth="0.8" opacity="0.3" />
      <path d="M88 38 C90 34, 92 32, 90 36" strokeWidth="0.8" opacity="0.3" />
      {/* Canopy texture — dappled light cross-hatch */}
      <path d="M44 34 L48 30" strokeWidth="0.5" opacity="0.15" />
      <path d="M46 36 L50 32" strokeWidth="0.5" opacity="0.15" />
      <path d="M70 34 L74 30" strokeWidth="0.5" opacity="0.15" />
      <path d="M72 36 L76 32" strokeWidth="0.5" opacity="0.15" />
      <path d="M56 26 L60 22" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

/* ── John Gottman: Emotional Coaching & Repair ──
   Icon: Two hands reaching toward each other with a warm glow/bridge
   forming between them. The gap is where repair happens. */
export function GottmanPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Emotional coaching and repair">
      {/* Left hand — reaching right */}
      <path d="M12 62 C16 58, 22 54, 30 52 C34 51, 38 52, 42 54" strokeWidth="1.8" />
      <path d="M42 54 C44 50, 46 46, 48 44" strokeWidth="1.5" />
      <path d="M42 54 C45 52, 48 50, 50 49" strokeWidth="1.5" />
      <path d="M42 54 C46 54, 50 54, 52 53" strokeWidth="1.5" />
      <path d="M40 56 C44 58, 48 58, 50 57" strokeWidth="1.4" />
      {/* Left palm detail */}
      <path d="M30 52 C32 56, 34 60, 38 62" strokeWidth="1.2" opacity="0.4" />
      <path d="M22 56 C26 58, 30 60, 34 62" strokeWidth="1" opacity="0.3" />
      {/* Left wrist and arm */}
      <path d="M12 62 C10 66, 8 70, 6 76" strokeWidth="1.6" />
      <path d="M14 64 C12 68, 10 72, 8 78" strokeWidth="1.4" opacity="0.5" />
      {/* Right hand — reaching left */}
      <path d="M108 62 C104 58, 98 54, 90 52 C86 51, 82 52, 78 54" strokeWidth="1.8" />
      <path d="M78 54 C76 50, 74 46, 72 44" strokeWidth="1.5" />
      <path d="M78 54 C75 52, 72 50, 70 49" strokeWidth="1.5" />
      <path d="M78 54 C74 54, 70 54, 68 53" strokeWidth="1.5" />
      <path d="M80 56 C76 58, 72 58, 70 57" strokeWidth="1.4" />
      {/* Right palm detail */}
      <path d="M90 52 C88 56, 86 60, 82 62" strokeWidth="1.2" opacity="0.4" />
      <path d="M98 56 C94 58, 90 60, 86 62" strokeWidth="1" opacity="0.3" />
      {/* Right wrist and arm */}
      <path d="M108 62 C110 66, 112 70, 114 76" strokeWidth="1.6" />
      <path d="M106 64 C108 68, 110 72, 112 78" strokeWidth="1.4" opacity="0.5" />
      {/* Bridge/glow between hands — the repair zone */}
      <path d="M52 53 C56 50, 60 48, 64 48 C66 48, 68 50, 68 53" strokeWidth="1" opacity="0.5" />
      <path d="M50 50 C54 46, 60 44, 66 44 C68 44, 70 46, 70 50" strokeWidth="0.8" opacity="0.3" />
      <path d="M48 47 C54 42, 60 40, 66 40 C70 40, 72 42, 72 47" strokeWidth="0.6" opacity="0.2" />
      {/* Warmth emanation — radiating lines */}
      <path d="M60 44 L60 36" strokeWidth="0.8" opacity="0.3" />
      <path d="M56 42 L52 34" strokeWidth="0.7" opacity="0.25" />
      <path d="M64 42 L68 34" strokeWidth="0.7" opacity="0.25" />
      <path d="M52 40 L46 32" strokeWidth="0.6" opacity="0.2" />
      <path d="M68 40 L74 32" strokeWidth="0.6" opacity="0.2" />
      {/* Small heart form in the gap */}
      <path d="M57 48 C55 44, 57 42, 60 45 C63 42, 65 44, 63 48 L60 52 L57 48Z" strokeWidth="1.2" opacity="0.6" />
      {/* Cross-hatch shadow under hands */}
      <path d="M30 64 L34 70" strokeWidth="0.5" opacity="0.15" />
      <path d="M32 64 L36 70" strokeWidth="0.5" opacity="0.15" />
      <path d="M86 64 L90 70" strokeWidth="0.5" opacity="0.15" />
      <path d="M88 64 L92 70" strokeWidth="0.5" opacity="0.15" />
      {/* Texture on fingers */}
      <path d="M44 52 L46 48" strokeWidth="0.5" opacity="0.2" />
      <path d="M46 52 L48 48" strokeWidth="0.5" opacity="0.2" />
      <path d="M76 52 L74 48" strokeWidth="0.5" opacity="0.2" />
      <path d="M74 52 L72 48" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

/* ── Daniel J. Siegel: Interpersonal Neurobiology ──
   Icon: A brain with visible neural pathways that extend outward into
   connection lines reaching toward another smaller form — mind meets relationship. */
export function SiegelPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Interpersonal neurobiology">
      {/* Brain outline — organic, detailed */}
      <path d="M38 56 C34 48, 34 38, 40 30 C44 24, 50 20, 56 20" strokeWidth="1.8" />
      <path d="M56 20 C62 18, 68 18, 74 22 C80 26, 84 34, 82 42" strokeWidth="1.8" />
      <path d="M82 42 C84 48, 82 56, 78 60" strokeWidth="1.8" />
      <path d="M78 60 C74 66, 66 70, 60 70" strokeWidth="1.6" />
      <path d="M60 70 C54 70, 46 66, 42 62" strokeWidth="1.6" />
      <path d="M42 62 C38 58, 36 54, 38 56" strokeWidth="1.6" />
      {/* Central fissure */}
      <path d="M60 22 C58 30, 56 40, 58 50 C59 56, 60 62, 60 68" strokeWidth="1.2" opacity="0.5" />
      {/* Brain folds — left hemisphere */}
      <path d="M40 34 C44 30, 50 28, 56 28" strokeWidth="1" opacity="0.4" />
      <path d="M38 42 C42 38, 48 36, 54 36" strokeWidth="1" opacity="0.4" />
      <path d="M38 50 C42 46, 48 44, 54 44" strokeWidth="0.8" opacity="0.3" />
      <path d="M40 58 C44 54, 50 52, 56 52" strokeWidth="0.8" opacity="0.3" />
      {/* Brain folds — right hemisphere */}
      <path d="M80 34 C76 30, 70 28, 64 28" strokeWidth="1" opacity="0.4" />
      <path d="M82 42 C78 38, 72 36, 66 36" strokeWidth="1" opacity="0.4" />
      <path d="M80 50 C76 46, 72 44, 66 44" strokeWidth="0.8" opacity="0.3" />
      <path d="M78 58 C74 54, 70 52, 64 52" strokeWidth="0.8" opacity="0.3" />
      {/* Neural nodes — key points */}
      <circle cx="46" cy="36" r="2.5" strokeWidth="1.2" fill="none" />
      <circle cx="46" cy="36" r="1" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="74" cy="36" r="2.5" strokeWidth="1.2" fill="none" />
      <circle cx="74" cy="36" r="1" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="50" cy="50" r="2" strokeWidth="1" fill="none" />
      <circle cx="70" cy="50" r="2" strokeWidth="1" fill="none" />
      {/* Neural pathways extending outward — connection */}
      <path d="M38 56 C32 62, 24 68, 18 76" strokeWidth="1.2" opacity="0.5" />
      <path d="M40 60 C34 66, 26 72, 20 80" strokeWidth="1" opacity="0.4" />
      <path d="M78 60 C84 66, 90 72, 96 76" strokeWidth="1.2" opacity="0.5" />
      <path d="M76 64 C82 70, 88 76, 94 80" strokeWidth="1" opacity="0.4" />
      {/* External connection nodes — other minds */}
      <circle cx="16" cy="80" r="4" strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="16" cy="80" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="98" cy="80" r="4" strokeWidth="1.2" fill="none" opacity="0.5" />
      <circle cx="98" cy="80" r="1.5" fill="currentColor" stroke="none" opacity="0.3" />
      {/* Synaptic dots along pathways */}
      <circle cx="28" cy="70" r="1" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="22" cy="74" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="88" cy="72" r="1" fill="currentColor" stroke="none" opacity="0.3" />
      <circle cx="92" cy="76" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      {/* Cross-hatch depth in brain */}
      <path d="M48 40 L52 44" strokeWidth="0.4" opacity="0.15" />
      <path d="M50 40 L54 44" strokeWidth="0.4" opacity="0.15" />
      <path d="M68 40 L72 44" strokeWidth="0.4" opacity="0.15" />
      <path d="M66 40 L70 44" strokeWidth="0.4" opacity="0.15" />
      {/* Brainstem */}
      <path d="M56 70 C56 76, 54 84, 54 90" strokeWidth="1.4" />
      <path d="M64 70 C64 76, 66 84, 66 90" strokeWidth="1.4" />
      <path d="M54 90 C56 94, 58 96, 60 98" strokeWidth="1.2" opacity="0.5" />
      <path d="M66 90 C64 94, 62 96, 60 98" strokeWidth="1.2" opacity="0.5" />
    </svg>
  );
}

/* ── Mary Ainsworth: Attachment Theory ──
   Icon: Two interlinked circles (parent-child bond) with a figure
   nestled securely inside the overlap — the secure base. */
export function AinsworthPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Attachment theory">
      {/* Large circle — parent/secure base */}
      <circle cx="46" cy="56" r="32" strokeWidth="1.8" fill="none" />
      {/* Smaller circle — child/explorer */}
      <circle cx="74" cy="56" r="24" strokeWidth="1.8" fill="none" />
      {/* Overlap zone texture — the secure bond */}
      <path d="M58 36 C62 40, 64 46, 64 56 C64 66, 62 72, 58 76" strokeWidth="0.8" opacity="0.3" />
      <path d="M60 38 C64 42, 66 48, 66 56 C66 64, 64 70, 60 74" strokeWidth="0.6" opacity="0.2" />
      {/* Warm radiating lines from overlap center */}
      <path d="M62 56 L62 48" strokeWidth="0.7" opacity="0.3" />
      <path d="M62 56 L62 64" strokeWidth="0.7" opacity="0.3" />
      <path d="M62 56 L56 52" strokeWidth="0.6" opacity="0.25" />
      <path d="M62 56 L56 60" strokeWidth="0.6" opacity="0.25" />
      <path d="M62 56 L68 52" strokeWidth="0.6" opacity="0.25" />
      <path d="M62 56 L68 60" strokeWidth="0.6" opacity="0.25" />
      {/* Small figure in overlap — secure child */}
      <circle cx="62" cy="50" r="3" strokeWidth="1.2" fill="none" />
      <path d="M62 53 L62 62" strokeWidth="1.2" />
      <path d="M62 56 L58 60" strokeWidth="1" />
      <path d="M62 56 L66 60" strokeWidth="1" />
      <path d="M62 62 L59 68" strokeWidth="1" />
      <path d="M62 62 L65 68" strokeWidth="1" />
      {/* Thread connecting circles — the invisible bond */}
      <path d="M46 24 C52 20, 62 20, 74 32" strokeWidth="0.8" opacity="0.35" style={{ strokeDasharray: "3 3" }} />
      <path d="M46 88 C52 92, 62 92, 74 80" strokeWidth="0.8" opacity="0.35" style={{ strokeDasharray: "3 3" }} />
      {/* Exploration arrows from child circle — venturing out */}
      <path d="M96 48 L102 44" strokeWidth="1" opacity="0.4" />
      <path d="M100 44 L102 44 L102 48" strokeWidth="0.8" opacity="0.4" />
      <path d="M96 64 L102 68" strokeWidth="1" opacity="0.4" />
      <path d="M100 68 L102 68 L102 64" strokeWidth="0.8" opacity="0.4" />
      {/* Return arrows — coming back to secure base */}
      <path d="M100 52 C104 54, 104 58, 100 60" strokeWidth="0.7" opacity="0.3" style={{ strokeDasharray: "2 2" }} />
      {/* Cross-hatch in parent circle — depth */}
      <path d="M24 48 L28 52" strokeWidth="0.4" opacity="0.12" />
      <path d="M26 48 L30 52" strokeWidth="0.4" opacity="0.12" />
      <path d="M24 60 L28 64" strokeWidth="0.4" opacity="0.12" />
      <path d="M26 60 L30 64" strokeWidth="0.4" opacity="0.12" />
      {/* Dots — trust points */}
      <circle cx="34" cy="44" r="1" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="30" cy="56" r="1" fill="currentColor" stroke="none" opacity="0.2" />
      <circle cx="34" cy="68" r="1" fill="currentColor" stroke="none" opacity="0.2" />
    </svg>
  );
}

/* ── Dr. Becky Kennedy: Repair as Cornerstone of Connection ──
   Icon: A cracked vessel/bowl being mended with gold — kintsugi style.
   The cracks are where repair happens. Beauty in the mending. */
export function KennedyPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Repair as cornerstone of connection">
      {/* Bowl/vessel shape */}
      <path d="M24 40 C22 50, 24 68, 32 80 C40 90, 52 96, 60 96 C68 96, 80 90, 88 80 C96 68, 98 50, 96 40" strokeWidth="1.8" />
      {/* Rim */}
      <path d="M24 40 C28 36, 40 34, 60 34 C80 34, 92 36, 96 40" strokeWidth="1.6" />
      <path d="M26 38 C30 35, 42 33, 60 33 C78 33, 90 35, 94 38" strokeWidth="0.8" opacity="0.3" />
      {/* Major crack — repaired with gold */}
      <path d="M48 36 C46 44, 42 52, 44 60 C46 68, 50 76, 52 84 C53 88, 54 92, 56 96" strokeWidth="2.2" opacity="0.7" />
      {/* Crack branches */}
      <path d="M44 52 C40 54, 36 56, 34 58" strokeWidth="1.5" opacity="0.6" />
      <path d="M46 64 C50 66, 54 68, 56 72" strokeWidth="1.5" opacity="0.6" />
      <path d="M50 76 C46 78, 42 80, 40 84" strokeWidth="1.4" opacity="0.5" />
      {/* Second crack */}
      <path d="M72 36 C74 42, 76 50, 74 58 C72 64, 70 70, 68 78" strokeWidth="1.8" opacity="0.6" />
      <path d="M76 50 C80 52, 84 54, 86 58" strokeWidth="1.3" opacity="0.5" />
      <path d="M72 64 C68 66, 64 68, 62 72" strokeWidth="1.3" opacity="0.5" />
      {/* Gold fill on cracks — warmth/repair (thicker parallel strokes) */}
      <path d="M47 40 C45 48, 41 54, 43 62" strokeWidth="0.8" opacity="0.35" />
      <path d="M49 40 C47 48, 43 54, 45 62" strokeWidth="0.8" opacity="0.35" />
      <path d="M71 40 C73 46, 75 52, 73 60" strokeWidth="0.8" opacity="0.35" />
      <path d="M73 40 C75 46, 77 52, 75 60" strokeWidth="0.8" opacity="0.35" />
      {/* Vessel texture — cross-hatch for depth */}
      <path d="M30 50 L34 56" strokeWidth="0.5" opacity="0.12" />
      <path d="M32 50 L36 56" strokeWidth="0.5" opacity="0.12" />
      <path d="M84 50 L88 56" strokeWidth="0.5" opacity="0.12" />
      <path d="M86 50 L90 56" strokeWidth="0.5" opacity="0.12" />
      <path d="M36 70 L40 76" strokeWidth="0.5" opacity="0.12" />
      <path d="M80 70 L84 76" strokeWidth="0.5" opacity="0.12" />
      {/* Radiance from cracks — beauty shining through */}
      <path d="M44 44 L38 40" strokeWidth="0.6" opacity="0.2" />
      <path d="M42 48 L36 46" strokeWidth="0.6" opacity="0.2" />
      <path d="M76 44 L82 40" strokeWidth="0.6" opacity="0.2" />
      <path d="M78 48 L84 46" strokeWidth="0.6" opacity="0.2" />
      {/* Inside shadow */}
      <path d="M40 42 C48 44, 56 44, 60 44 C64 44, 72 44, 80 42" strokeWidth="0.7" opacity="0.2" />
    </svg>
  );
}

/* ── Shefali Tsabary: Conscious Parenting ──
   Icon: An open eye with a lotus/flower emerging from the iris — awareness
   blooming. The eye sees clearly; the lotus is awakened consciousness. */
export function TsabaryPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Conscious parenting">
      {/* Eye shape — wide open */}
      <path d="M10 60 C24 36, 44 24, 60 24 C76 24, 96 36, 110 60" strokeWidth="1.8" />
      <path d="M10 60 C24 84, 44 96, 60 96 C76 96, 96 84, 110 60" strokeWidth="1.8" />
      {/* Iris */}
      <circle cx="60" cy="60" r="18" strokeWidth="1.5" fill="none" />
      {/* Pupil */}
      <circle cx="60" cy="60" r="8" strokeWidth="1.3" fill="none" />
      <circle cx="60" cy="60" r="4" fill="currentColor" stroke="none" opacity="0.6" />
      {/* Light reflection */}
      <circle cx="56" cy="56" r="2" fill="currentColor" stroke="none" opacity="0.15" />
      {/* Iris detail — radiating lines */}
      <path d="M60 42 L60 46" strokeWidth="0.6" opacity="0.3" />
      <path d="M60 74 L60 78" strokeWidth="0.6" opacity="0.3" />
      <path d="M42 60 L46 60" strokeWidth="0.6" opacity="0.3" />
      <path d="M74 60 L78 60" strokeWidth="0.6" opacity="0.3" />
      <path d="M48 48 L50 50" strokeWidth="0.5" opacity="0.25" />
      <path d="M72 48 L70 50" strokeWidth="0.5" opacity="0.25" />
      <path d="M48 72 L50 70" strokeWidth="0.5" opacity="0.25" />
      <path d="M72 72 L70 70" strokeWidth="0.5" opacity="0.25" />
      {/* Lotus petals growing from iris — consciousness blooming */}
      <path d="M60 42 C56 34, 52 26, 50 18" strokeWidth="1.2" opacity="0.5" />
      <path d="M60 42 C54 34, 46 28, 40 22" strokeWidth="1" opacity="0.4" />
      <path d="M60 42 C58 32, 58 22, 60 14" strokeWidth="1.2" opacity="0.5" />
      <path d="M60 42 C66 34, 74 28, 80 22" strokeWidth="1" opacity="0.4" />
      <path d="M60 42 C64 34, 68 26, 70 18" strokeWidth="1.2" opacity="0.5" />
      {/* Petal curves — organic, lotus-like */}
      <path d="M50 18 C52 14, 56 12, 60 14" strokeWidth="0.8" opacity="0.4" />
      <path d="M70 18 C68 14, 64 12, 60 14" strokeWidth="0.8" opacity="0.4" />
      <path d="M40 22 C42 16, 48 14, 50 18" strokeWidth="0.7" opacity="0.3" />
      <path d="M80 22 C78 16, 72 14, 70 18" strokeWidth="0.7" opacity="0.3" />
      {/* Eye corner details */}
      <path d="M12 60 C10 58, 8 58, 6 60" strokeWidth="1" opacity="0.4" />
      <path d="M108 60 C110 58, 112 58, 114 60" strokeWidth="1" opacity="0.4" />
      {/* Eyelid fold */}
      <path d="M20 46 C36 30, 56 24, 60 24" strokeWidth="0.8" opacity="0.25" />
      <path d="M100 46 C84 30, 64 24, 60 24" strokeWidth="0.8" opacity="0.25" />
      {/* Lower lash texture */}
      <path d="M30 80 L28 84" strokeWidth="0.6" opacity="0.2" />
      <path d="M40 86 L38 90" strokeWidth="0.6" opacity="0.2" />
      <path d="M50 90 L48 94" strokeWidth="0.6" opacity="0.2" />
      <path d="M70 90 L72 94" strokeWidth="0.6" opacity="0.2" />
      <path d="M80 86 L82 90" strokeWidth="0.6" opacity="0.2" />
      <path d="M90 80 L92 84" strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

/* ── Bessel van der Kolk: Intergenerational Trauma / The Body Keeps the Score ──
   Icon: A human silhouette with wave patterns flowing through the body,
   some waves passing down to a smaller silhouette below — trauma passed
   through generations, stored in the body. */
export function VanDerKolkPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Intergenerational trauma and the body">
      {/* Parent silhouette — upper */}
      <circle cx="46" cy="20" r="8" strokeWidth="1.6" fill="none" />
      <path d="M46 28 L46 56" strokeWidth="1.6" />
      <path d="M46 34 L32 44" strokeWidth="1.4" />
      <path d="M46 34 L60 44" strokeWidth="1.4" />
      <path d="M46 56 L36 72" strokeWidth="1.4" />
      <path d="M46 56 L56 72" strokeWidth="1.4" />
      {/* Waves flowing through parent body — stored trauma */}
      <path d="M36 32 C38 30, 40 32, 42 30 C44 28, 46 30, 48 28" strokeWidth="0.8" opacity="0.4" />
      <path d="M38 40 C40 38, 42 40, 44 38 C46 36, 48 38, 50 36" strokeWidth="0.8" opacity="0.4" />
      <path d="M40 48 C42 46, 44 48, 46 46 C48 44, 50 46, 52 44" strokeWidth="0.7" opacity="0.35" />
      <path d="M38 54 C40 52, 42 54, 44 52 C46 50, 48 52, 50 50" strokeWidth="0.7" opacity="0.3" />
      {/* Transmission line — parent to child */}
      <path d="M46 56 C50 64, 56 72, 60 78 C64 84, 70 88, 74 90" strokeWidth="1" opacity="0.4" style={{ strokeDasharray: "4 3" }} />
      {/* Child silhouette — lower right, smaller */}
      <circle cx="80" cy="82" r="6" strokeWidth="1.4" fill="none" />
      <path d="M80 88 L80 106" strokeWidth="1.4" />
      <path d="M80 92 L70 100" strokeWidth="1.2" />
      <path d="M80 92 L90 100" strokeWidth="1.2" />
      <path d="M80 106 L74 116" strokeWidth="1.2" />
      <path d="M80 106 L86 116" strokeWidth="1.2" />
      {/* Inherited waves in child — fainter */}
      <path d="M74 90 C76 88, 78 90, 80 88 C82 86, 84 88, 86 86" strokeWidth="0.6" opacity="0.25" />
      <path d="M74 96 C76 94, 78 96, 80 94 C82 92, 84 94, 86 92" strokeWidth="0.6" opacity="0.25" />
      <path d="M76 102 C78 100, 80 102, 82 100 C84 98, 86 100, 88 98" strokeWidth="0.5" opacity="0.2" />
      {/* Body awareness marks on parent — where score is kept */}
      <circle cx="42" cy="38" r="3" strokeWidth="0.6" opacity="0.2" fill="none" />
      <circle cx="48" cy="46" r="3" strokeWidth="0.6" opacity="0.2" fill="none" />
      <circle cx="44" cy="52" r="2.5" strokeWidth="0.6" opacity="0.15" fill="none" />
      {/* Cross-hatch shadow */}
      <path d="M34 44 L30 48" strokeWidth="0.5" opacity="0.15" />
      <path d="M32 44 L28 48" strokeWidth="0.5" opacity="0.15" />
      <path d="M58 44 L62 48" strokeWidth="0.5" opacity="0.15" />
      <path d="M60 44 L64 48" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

/* ── Ronald P. Rohner: Cross-Cultural Parental Acceptance ──
   Icon: A globe/world with embracing arms wrapping around it, with small
   cultural pattern motifs dotted across different regions — acceptance
   is universal across all cultures. */
export function RohnerPortrait({ className }: IconProps) {
  return (
    <svg {...svgProps} className={className} aria-label="Cross-cultural parental acceptance">
      {/* Globe */}
      <circle cx="60" cy="58" r="32" strokeWidth="1.8" fill="none" />
      {/* Latitude lines */}
      <ellipse cx="60" cy="42" rx="28" ry="6" strokeWidth="0.7" opacity="0.25" />
      <ellipse cx="60" cy="58" rx="32" ry="8" strokeWidth="0.8" opacity="0.3" />
      <ellipse cx="60" cy="74" rx="28" ry="6" strokeWidth="0.7" opacity="0.25" />
      {/* Longitude lines */}
      <ellipse cx="60" cy="58" rx="8" ry="32" strokeWidth="0.7" opacity="0.25" />
      <ellipse cx="60" cy="58" rx="20" ry="32" strokeWidth="0.7" opacity="0.25" />
      {/* Embracing arms — wrapping around globe */}
      {/* Left arm */}
      <path d="M14 40 C8 44, 4 52, 6 60 C8 68, 14 76, 22 82" strokeWidth="2" />
      <path d="M14 40 C10 38, 8 34, 12 32" strokeWidth="1.5" />
      <path d="M12 32 C14 30, 16 30, 18 32" strokeWidth="1.2" />
      <path d="M14 32 L16 34" strokeWidth="1" />
      {/* Left arm inner line */}
      <path d="M18 42 C12 46, 8 54, 10 62 C12 68, 16 74, 24 78" strokeWidth="1.2" opacity="0.4" />
      {/* Right arm */}
      <path d="M106 40 C112 44, 116 52, 114 60 C112 68, 106 76, 98 82" strokeWidth="2" />
      <path d="M106 40 C110 38, 112 34, 108 32" strokeWidth="1.5" />
      <path d="M108 32 C106 30, 104 30, 102 32" strokeWidth="1.2" />
      <path d="M106 32 L104 34" strokeWidth="1" />
      {/* Right arm inner line */}
      <path d="M102 42 C108 46, 112 54, 110 62 C108 68, 104 74, 96 78" strokeWidth="1.2" opacity="0.4" />
      {/* Cultural pattern motifs — different in each region */}
      {/* Dot cluster — region 1 */}
      <circle cx="46" cy="48" r="1.2" fill="currentColor" stroke="none" opacity="0.35" />
      <circle cx="44" cy="52" r="1" fill="currentColor" stroke="none" opacity="0.25" />
      <circle cx="48" cy="51" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      {/* Triangle motif — region 2 */}
      <path d="M70 44 L72 48 L68 48 Z" strokeWidth="0.8" opacity="0.35" fill="none" />
      <path d="M74 46 L76 50 L72 50 Z" strokeWidth="0.6" opacity="0.25" fill="none" />
      {/* Circle motif — region 3 */}
      <circle cx="52" cy="66" r="2" strokeWidth="0.7" opacity="0.3" fill="none" />
      <circle cx="52" cy="66" r="0.8" fill="currentColor" stroke="none" opacity="0.2" />
      {/* Diamond motif — region 4 */}
      <path d="M72 62 L74 65 L72 68 L70 65 Z" strokeWidth="0.7" opacity="0.3" fill="none" />
      {/* Wave motif — region 5 */}
      <path d="M56 74 C58 72, 60 74, 62 72 C64 70, 66 72, 68 70" strokeWidth="0.7" opacity="0.3" />
      {/* Cross motif — region 6 */}
      <path d="M42 58 L42 64" strokeWidth="0.7" opacity="0.3" />
      <path d="M39 61 L45 61" strokeWidth="0.7" opacity="0.3" />
      {/* Warmth glow from center */}
      <circle cx="60" cy="58" r="10" strokeWidth="0.5" opacity="0.15" fill="none" />
      <circle cx="60" cy="58" r="14" strokeWidth="0.4" opacity="0.1" fill="none" />
      {/* Hands meeting at bottom */}
      <path d="M22 82 C30 86, 40 88, 50 88" strokeWidth="1.4" opacity="0.5" />
      <path d="M98 82 C90 86, 80 88, 70 88" strokeWidth="1.4" opacity="0.5" />
      {/* Fingers touching */}
      <path d="M50 88 C54 88, 58 86, 60 86" strokeWidth="1" opacity="0.4" />
      <path d="M70 88 C66 88, 62 86, 60 86" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
