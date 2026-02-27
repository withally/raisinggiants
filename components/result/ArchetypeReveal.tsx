/**
 * components/result/ArchetypeReveal.tsx
 *
 * Hero reveal section — the dramatic moment where the user discovers the
 * parenting archetype that shaped them.
 *
 * Displays:
 * - Eyebrow label: "You were raised by:"
 * - Archetype name in large display font (Cormorant Garamond)
 * - Tagline in italic
 * - Foundational patterns headline as a lead paragraph
 *
 * This is the emotional core of The Mirror by Kin. Full viewport height, centered,
 * breathing room generous to let the reveal land.
 */

import type { Archetype } from "@/lib/archetypes/types";

interface ArchetypeRevealProps {
  archetype: Archetype;
}

export function ArchetypeReveal({ archetype }: ArchetypeRevealProps) {
  return (
    <section className="min-h-[80dvh] flex flex-col items-center justify-center bg-[#F5F4F2] px-6 py-20 sm:py-28">
      <div className="max-w-2xl mx-auto text-center">
        {/* Eyebrow */}
        <p className="text-xs tracking-[0.25em] uppercase text-[#8A7A66] font-medium mb-6">
          You were raised by:
        </p>

        {/* Archetype name — dramatic display font reveal */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1A1008] mb-5 leading-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {archetype.name}
        </h1>

        {/* Tagline */}
        <p className="text-xl italic text-[#8A7A66] mb-10 leading-relaxed">{archetype.tagline}</p>

        {/* Divider */}
        <div className="w-16 h-px bg-[#C4892A] mx-auto mb-10" />

        {/* Foundational patterns headline — the one-sentence anchor */}
        <p className="text-lg text-[#1A1008] leading-relaxed max-w-2xl mx-auto">
          {archetype.foundationalPatterns.headline}
        </p>
      </div>
    </section>
  );
}
