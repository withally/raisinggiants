/**
 * components/result/WatchoutsSection.tsx
 *
 * "What to watch for" — displays the 5 watchout themes, research anchor,
 * and citations for a given archetype's watchouts.
 *
 * Structurally mirrors FoundationalPatternsSection but with a stone-400 border
 * accent (softer tone for shadow patterns) and bg-stone-50 background.
 *
 * The watchout headline typically includes the reframe:
 * "That served you then. It may not serve you now."
 */

import type { ArchetypeContent } from "@/lib/archetypes/types";

interface WatchoutsSectionProps {
  watchouts: ArchetypeContent;
}

export function WatchoutsSection({ watchouts }: WatchoutsSectionProps) {
  return (
    <section className="bg-stone-50 py-16 sm:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium mb-3">
            What to watch for
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {watchouts.headline}
          </h2>
        </div>

        {/* Themes — each as a styled block with stone left border */}
        <div className="space-y-5 mb-12">
          {watchouts.themes.map((theme) => {
            // Split on first em-dash to separate title from description
            const dashIndex = theme.indexOf(" — ");
            const title = dashIndex > -1 ? theme.slice(0, dashIndex) : null;
            const body = dashIndex > -1 ? theme.slice(dashIndex + 3) : theme;

            return (
              <div key={theme.slice(0, 40)} className="border-l-4 border-stone-400 pl-5 py-2">
                {title && <p className="font-semibold text-stone-800 mb-1 text-base">{title}</p>}
                <p className="text-stone-700 leading-relaxed text-base">{body}</p>
              </div>
            );
          })}
        </div>

        {/* Research anchor */}
        <p className="text-sm italic text-stone-500 leading-relaxed mb-8 border-t border-stone-200 pt-6">
          {watchouts.researchAnchor}
        </p>

        {/* Citations — collapsible via HTML details/summary (zero JS) */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-stone-400 hover:text-stone-600 transition-colors list-none flex items-center gap-2 select-none">
            <span className="inline-block transition-transform group-open:rotate-90">›</span>
            <span>References</span>
          </summary>
          <div className="mt-4 space-y-3 pl-4">
            {watchouts.citations.map((citation) => (
              <p
                key={`${citation.researcher}-${citation.year}`}
                className="text-xs text-stone-400 leading-relaxed"
              >
                <span className="font-medium text-stone-500">{citation.researcher}</span>
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
