/**
 * Hero illustration: "The Inherited Reflection"
 * A standing mirror frame. Inside, a figure sees not just themselves
 * but a faint parent silhouette behind/within them (lower opacity).
 * Gentle wave lines flow between the figures representing inherited patterns.
 */

interface MirrorIllustrationProps {
  className?: string;
}

export function MirrorIllustration({ className }: MirrorIllustrationProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="The Inherited Reflection — a figure seeing inherited patterns in a mirror"
    >
      {/* ── Mirror Frame ── */}
      {/* Outer frame — ornate standing mirror */}
      <path d="M60 30 C60 20, 70 10, 90 8 L150 8 C170 10, 180 20, 180 30 L180 240 C180 252, 170 260, 160 262 L80 262 C70 260, 60 252, 60 240 Z" strokeWidth="2" />
      {/* Inner frame border */}
      <path d="M68 36 C68 28, 76 20, 92 18 L148 18 C164 20, 172 28, 172 36 L172 234 C172 244, 164 250, 156 252 L84 252 C76 250, 68 244, 68 234 Z" strokeWidth="1.2" opacity="0.4" />
      {/* Third inner frame line for molding depth */}
      <path d="M72 40 C72 32, 79 24, 94 22 L146 22 C161 24, 168 32, 168 40 L168 230 C168 240, 161 246, 154 248 L86 248 C79 246, 72 240, 72 230 Z" strokeWidth="0.7" opacity="0.2" />
      {/* Frame decorative top arc */}
      <path d="M90 8 C100 4, 120 2, 140 2 C150 2, 160 4, 170 8" strokeWidth="1.5" opacity="0.5" />
      <path d="M100 6 C110 3, 130 2, 140 3" strokeWidth="0.8" opacity="0.25" />
      {/* Filigree curves at top arch — ornate arch flourishes */}
      <path d="M82 14 C80 10, 84 8, 88 10 C86 12, 84 14, 82 14" strokeWidth="0.8" opacity="0.35" />
      <path d="M158 14 C160 10, 156 8, 152 10 C154 12, 156 14, 158 14" strokeWidth="0.8" opacity="0.35" />
      <path d="M110 5 C112 2, 116 2, 118 5 C116 4, 112 4, 110 5" strokeWidth="0.7" opacity="0.3" />
      <path d="M122 5 C124 2, 128 2, 130 5 C128 4, 124 4, 122 5" strokeWidth="0.7" opacity="0.3" />
      {/* Frame ornament — top center */}
      <circle cx="120" cy="6" r="4" strokeWidth="1.2" opacity="0.5" />
      <circle cx="120" cy="6" r="2" fill="currentColor" stroke="none" opacity="0.2" />
      {/* Decorative corner flourishes — top-left inner */}
      <path d="M70 38 C68 34, 70 30, 74 32 C72 34, 70 36, 72 40" strokeWidth="0.7" opacity="0.3" />
      <path d="M70 42 C66 40, 66 44, 70 44" strokeWidth="0.5" opacity="0.2" />
      {/* Decorative corner flourishes — top-right inner */}
      <path d="M170 38 C172 34, 170 30, 166 32 C168 34, 170 36, 168 40" strokeWidth="0.7" opacity="0.3" />
      <path d="M170 42 C174 40, 174 44, 170 44" strokeWidth="0.5" opacity="0.2" />
      {/* Decorative corner flourishes — bottom-left inner */}
      <path d="M70 230 C68 234, 70 238, 74 236 C72 234, 70 232, 72 228" strokeWidth="0.7" opacity="0.3" />
      <path d="M70 226 C66 228, 66 224, 70 224" strokeWidth="0.5" opacity="0.2" />
      {/* Decorative corner flourishes — bottom-right inner */}
      <path d="M170 230 C172 234, 170 238, 166 236 C168 234, 170 232, 168 228" strokeWidth="0.7" opacity="0.3" />
      <path d="M170 226 C174 228, 174 224, 170 224" strokeWidth="0.5" opacity="0.2" />
      {/* Frame side details */}
      <path d="M62 80 L58 80" strokeWidth="0.8" opacity="0.3" />
      <path d="M62 140 L58 140" strokeWidth="0.8" opacity="0.3" />
      <path d="M62 200 L58 200" strokeWidth="0.8" opacity="0.3" />
      <path d="M178 80 L182 80" strokeWidth="0.8" opacity="0.3" />
      <path d="M178 140 L182 140" strokeWidth="0.8" opacity="0.3" />
      <path d="M178 200 L182 200" strokeWidth="0.8" opacity="0.3" />

      {/* ── Mirror Surface (Glass) ── */}
      {/* Subtle glass edge highlight */}
      <path d="M74 40 L74 230" strokeWidth="0.5" opacity="0.15" />
      <path d="M166 40 L166 230" strokeWidth="0.5" opacity="0.15" />
      {/* Light reflection streak across the glass surface */}
      <path d="M80 60 L140 120" strokeWidth="0.8" opacity="0.07" />
      <path d="M82 55 L148 130" strokeWidth="0.5" opacity="0.05" />

      {/* ── Parent Silhouette (Behind/Within — Faint) ── */}
      {/* Parent head */}
      <circle cx="120" cy="80" r="18" strokeWidth="1" opacity="0.3" />
      {/* Parent neck */}
      <path d="M114 98 L114 108" strokeWidth="1" opacity="0.3" />
      <path d="M126 98 L126 108" strokeWidth="1" opacity="0.3" />
      {/* Parent shoulders */}
      <path d="M114 108 C108 112, 96 116, 88 118" strokeWidth="1" opacity="0.3" />
      <path d="M126 108 C132 112, 144 116, 152 118" strokeWidth="1" opacity="0.3" />
      {/* Parent torso */}
      <path d="M88 118 L92 192" strokeWidth="1" opacity="0.25" />
      <path d="M152 118 L148 192" strokeWidth="1" opacity="0.25" />
      {/* Parent arms — embrace posture, arms slightly forward/inward */}
      <path d="M88 118 C80 130, 76 148, 80 164 C82 170, 88 174, 94 172" strokeWidth="0.8" opacity="0.2" />
      <path d="M152 118 C160 130, 164 148, 160 164 C158 170, 152 174, 146 172" strokeWidth="0.8" opacity="0.2" />
      {/* Parent hip/lower */}
      <path d="M92 192 C96 200, 104 206, 108 210" strokeWidth="0.8" opacity="0.2" />
      <path d="M148 192 C144 200, 136 206, 132 210" strokeWidth="0.8" opacity="0.2" />
      {/* Parent face suggestion — minimal */}
      <path d="M114 76 C116 78, 118 78, 120 76" strokeWidth="0.6" opacity="0.2" />
      <circle cx="112" cy="74" r="1.5" strokeWidth="0.6" opacity="0.2" fill="none" />
      <circle cx="128" cy="74" r="1.5" strokeWidth="0.6" opacity="0.2" fill="none" />

      {/* ── Primary Figure (Clear, Full Opacity) ── */}
      {/* Head */}
      <circle cx="120" cy="90" r="16" strokeWidth="1.5" />
      {/* Hair suggestion — a few flowing lines */}
      <path d="M106 84 C108 78, 112 74, 118 74" strokeWidth="0.8" opacity="0.35" />
      <path d="M134 84 C132 78, 128 74, 122 74" strokeWidth="0.8" opacity="0.35" />
      <path d="M104 90 C104 84, 106 80, 109 78" strokeWidth="0.7" opacity="0.25" />
      <path d="M136 90 C136 84, 134 80, 131 78" strokeWidth="0.7" opacity="0.25" />
      {/* Face — subtle, editorial */}
      <circle cx="113" cy="86" r="2" strokeWidth="1" />
      <circle cx="127" cy="86" r="2" strokeWidth="1" />
      <path d="M116 94 C118 96, 122 96, 124 94" strokeWidth="1" />
      {/* Neck */}
      <path d="M114 106 L114 114" strokeWidth="1.5" />
      <path d="M126 106 L126 114" strokeWidth="1.5" />
      {/* Shoulders */}
      <path d="M114 114 C108 118, 98 122, 92 124" strokeWidth="1.5" />
      <path d="M126 114 C132 118, 142 122, 148 124" strokeWidth="1.5" />
      {/* Torso */}
      <path d="M92 124 L96 200" strokeWidth="1.5" />
      <path d="M148 124 L144 200" strokeWidth="1.5" />
      {/* Arms — one hand touching mirror glass, slight reach */}
      <path d="M92 124 C86 138, 84 154, 88 170" strokeWidth="1.5" />
      <path d="M148 124 C158 136, 162 150, 158 164 C156 170, 150 174, 144 174" strokeWidth="1.5" />
      {/* Right hand touching mirror — fingers on glass */}
      <path d="M144 174 C142 176, 140 178, 140 180" strokeWidth="1.2" />
      <path d="M146 174 C148 176, 150 178, 150 181" strokeWidth="0.9" opacity="0.6" />
      <path d="M148 172 C152 174, 154 178, 154 181" strokeWidth="0.9" opacity="0.4" />
      {/* Left hand */}
      <path d="M88 170 C86 174, 84 178, 86 180" strokeWidth="1.2" />
      {/* Hips */}
      <path d="M96 200 L96 204" strokeWidth="1.5" />
      <path d="M144 200 L144 204" strokeWidth="1.5" />
      {/* Legs */}
      <path d="M96 204 C100 218, 104 232, 106 244" strokeWidth="1.5" />
      <path d="M144 204 C140 218, 136 232, 134 244" strokeWidth="1.5" />
      {/* Head tilt suggestion — slight nod forward */}
      <path d="M120 74 C122 72, 124 72, 125 74" strokeWidth="0.6" opacity="0.2" />

      {/* ── Inherited Pattern Waves ── */}
      {/* Flowing between parent and child figures */}
      <path d="M96 130 C92 134, 88 130, 84 134 C80 138, 84 142, 88 140" strokeWidth="0.7" opacity="0.3" />
      <path d="M144 130 C148 134, 152 130, 156 134 C160 138, 156 142, 152 140" strokeWidth="0.7" opacity="0.3" />
      <path d="M100 150 C96 154, 92 150, 88 154 C84 158, 88 162, 92 160" strokeWidth="0.7" opacity="0.25" />
      <path d="M140 150 C144 154, 148 150, 152 154 C156 158, 152 162, 148 160" strokeWidth="0.7" opacity="0.25" />
      <path d="M102 172 C98 176, 94 172, 90 176" strokeWidth="0.6" opacity="0.2" />
      <path d="M138 172 C142 176, 146 172, 150 176" strokeWidth="0.6" opacity="0.2" />
      {/* Central wave — through the torso/heart area */}
      <path d="M110 140 C112 136, 116 140, 120 136 C124 132, 128 136, 130 140" strokeWidth="0.7" opacity="0.35" />
      <path d="M108 158 C112 154, 116 158, 120 154 C124 150, 128 154, 132 158" strokeWidth="0.7" opacity="0.3" />
      <path d="M106 176 C110 172, 114 176, 118 172 C122 168, 126 172, 130 176" strokeWidth="0.6" opacity="0.25" />

      {/* ── Cross-Hatch Depth in Corners ── */}
      {/* Top-left corner — denser */}
      <path d="M72 42 L78 48" strokeWidth="0.5" opacity="0.12" />
      <path d="M74 42 L80 48" strokeWidth="0.5" opacity="0.12" />
      <path d="M76 42 L82 48" strokeWidth="0.5" opacity="0.12" />
      <path d="M72 46 L78 52" strokeWidth="0.4" opacity="0.1" />
      <path d="M74 48 L80 54" strokeWidth="0.4" opacity="0.08" />
      <path d="M78 42 L84 48" strokeWidth="0.4" opacity="0.08" />
      {/* Top-right corner — denser */}
      <path d="M160 42 L166 48" strokeWidth="0.5" opacity="0.12" />
      <path d="M162 42 L168 48" strokeWidth="0.5" opacity="0.12" />
      <path d="M158 42 L164 48" strokeWidth="0.5" opacity="0.12" />
      <path d="M160 46 L166 52" strokeWidth="0.4" opacity="0.1" />
      <path d="M156 46 L162 52" strokeWidth="0.4" opacity="0.08" />
      <path d="M162 44 L168 50" strokeWidth="0.4" opacity="0.08" />
      {/* Bottom-left corner — denser */}
      <path d="M72 228 L78 234" strokeWidth="0.5" opacity="0.12" />
      <path d="M74 228 L80 234" strokeWidth="0.5" opacity="0.12" />
      <path d="M76 228 L82 234" strokeWidth="0.5" opacity="0.12" />
      <path d="M72 232 L78 238" strokeWidth="0.4" opacity="0.1" />
      <path d="M74 234 L80 240" strokeWidth="0.4" opacity="0.08" />
      <path d="M78 228 L84 234" strokeWidth="0.4" opacity="0.08" />
      {/* Bottom-right corner — denser */}
      <path d="M160 228 L166 234" strokeWidth="0.5" opacity="0.12" />
      <path d="M162 228 L168 234" strokeWidth="0.5" opacity="0.12" />
      <path d="M158 228 L164 234" strokeWidth="0.5" opacity="0.12" />
      <path d="M160 232 L166 238" strokeWidth="0.4" opacity="0.1" />
      <path d="M156 232 L162 238" strokeWidth="0.4" opacity="0.08" />
      <path d="M162 230 L168 236" strokeWidth="0.4" opacity="0.08" />
      {/* Frame edge cross-hatching — left side */}
      <path d="M62 100 L68 106" strokeWidth="0.4" opacity="0.1" />
      <path d="M62 104 L68 110" strokeWidth="0.4" opacity="0.08" />
      <path d="M62 160 L68 166" strokeWidth="0.4" opacity="0.1" />
      <path d="M62 164 L68 170" strokeWidth="0.4" opacity="0.08" />
      {/* Frame edge cross-hatching — right side */}
      <path d="M172 100 L178 106" strokeWidth="0.4" opacity="0.1" />
      <path d="M172 104 L178 110" strokeWidth="0.4" opacity="0.08" />
      <path d="M172 160 L178 166" strokeWidth="0.4" opacity="0.1" />
      <path d="M172 164 L178 170" strokeWidth="0.4" opacity="0.08" />

      {/* ── Mirror Stand / Base ── */}
      {/* Stand legs */}
      <path d="M80 262 C74 270, 60 278, 50 284" strokeWidth="1.8" />
      <path d="M160 262 C166 270, 180 278, 190 284" strokeWidth="1.8" />
      {/* Wood grain texture on stand legs */}
      <path d="M76 265 C73 268, 71 270, 70 273" strokeWidth="0.4" opacity="0.2" />
      <path d="M73 267 C70 270, 68 272, 67 275" strokeWidth="0.4" opacity="0.15" />
      <path d="M70 270 C67 273, 65 275, 64 278" strokeWidth="0.4" opacity="0.12" />
      <path d="M164 265 C167 268, 169 270, 170 273" strokeWidth="0.4" opacity="0.2" />
      <path d="M167 267 C170 270, 172 272, 173 275" strokeWidth="0.4" opacity="0.15" />
      <path d="M170 270 C173 273, 175 275, 176 278" strokeWidth="0.4" opacity="0.12" />
      {/* Stand feet */}
      <path d="M50 284 C44 286, 40 288, 38 290" strokeWidth="1.5" />
      <path d="M190 284 C196 286, 200 288, 202 290" strokeWidth="1.5" />
      {/* Decorative curl at each foot */}
      <path d="M38 290 C34 290, 32 292, 34 294 C36 296, 40 294, 40 292" strokeWidth="0.8" opacity="0.4" />
      <path d="M202 290 C206 290, 208 292, 206 294 C204 296, 200 294, 200 292" strokeWidth="0.8" opacity="0.4" />
      {/* Stand cross-brace */}
      <path d="M88 268 C100 274, 120 276, 140 274 C150 272, 156 270, 152 268" strokeWidth="1" opacity="0.4" />
      {/* Stand texture */}
      <path d="M66 276 L70 280" strokeWidth="0.5" opacity="0.15" />
      <path d="M68 276 L72 280" strokeWidth="0.5" opacity="0.15" />
      <path d="M170 276 L174 280" strokeWidth="0.5" opacity="0.15" />
      <path d="M172 276 L176 280" strokeWidth="0.5" opacity="0.15" />

      {/* ── Ambient detail ── */}
      {/* Dust motes / atmosphere — more scattered */}
      <circle cx="82" cy="120" r="0.8" fill="currentColor" stroke="none" opacity="0.12" />
      <circle cx="158" cy="100" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
      <circle cx="90" cy="210" r="0.7" fill="currentColor" stroke="none" opacity="0.1" />
      <circle cx="150" cy="220" r="0.5" fill="currentColor" stroke="none" opacity="0.08" />
      {/* Additional ambient particles */}
      <circle cx="76" cy="150" r="0.6" fill="currentColor" stroke="none" opacity="0.1" />
      <circle cx="162" cy="170" r="0.7" fill="currentColor" stroke="none" opacity="0.1" />
      <circle cx="105" cy="240" r="0.5" fill="currentColor" stroke="none" opacity="0.08" />
      <circle cx="135" cy="235" r="0.6" fill="currentColor" stroke="none" opacity="0.09" />
    </svg>
  );
}
