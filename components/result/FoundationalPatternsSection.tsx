/**
 * components/result/FoundationalPatternsSection.tsx
 *
 * "What you inherited" — displays the 5 foundational pattern themes,
 * research anchor, and citations for a given archetype's foundational patterns.
 *
 * Each theme renders as a visually distinct block with a left teal border accent.
 * Citations collapse behind a <details>/<summary> toggle (zero JS).
 *
 * Background: bg-white (alternating contrast with Cloud White hero and Cloud White watchouts).
 */

import type { ArchetypeContent } from "@/lib/archetypes/types";

interface FoundationalPatternsSectionProps {
  patterns: ArchetypeContent;
}

export function FoundationalPatternsSection({ patterns }: FoundationalPatternsSectionProps) {
  return (
    <section className="bg-white py-16 sm:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-[#8A7A66] font-medium mb-3">
            What you inherited
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-[#1A1008] leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The patterns that shaped you
          </h2>
        </div>

        {/* Themes — each as a styled block with teal left border */}
        <div className="space-y-5 mb-12">
          {patterns.themes.map((theme) => {
            // Split on first em-dash to separate title from description
            const dashIndex = theme.indexOf(" — ");
            const title = dashIndex > -1 ? theme.slice(0, dashIndex) : null;
            const body = dashIndex > -1 ? theme.slice(dashIndex + 3) : theme;

            return (
              <div key={theme.slice(0, 40)} className="border-l-4 border-[#C4892A] pl-5 py-2">
                {title && <p className="font-semibold text-[#1A1008] mb-1 text-base">{title}</p>}
                <p className="text-[#1A1008] leading-relaxed text-base">{body}</p>
              </div>
            );
          })}
        </div>

        {/* Research anchor */}
        <p className="text-sm italic text-[#8A7A66] leading-relaxed mb-8 border-t border-[#E8E4DF] pt-6">
          {patterns.researchAnchor}
        </p>

        {/* Citations — collapsible via HTML details/summary (zero JS) */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-[#8A7A66] hover:text-[#1A1008] transition-colors list-none flex items-center gap-2 select-none">
            <span className="inline-block transition-transform group-open:rotate-90">›</span>
            <span>References</span>
          </summary>
          <div className="mt-4 space-y-3 pl-4">
            {patterns.citations.map((citation) => (
              <p
                key={`${citation.researcher}-${citation.year}`}
                className="text-xs text-[#8A7A66] leading-relaxed"
              >
                <span className="font-medium text-[#8A7A66]">{citation.researcher}</span>
                {", "}
                <em>{citation.workTitle}</em>
                {` (${citation.year})`}
                {citation.relevanceNote ? ` — ${citation.relevanceNote}` : ""}
              </p>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}
