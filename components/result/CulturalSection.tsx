/**
 * components/result/CulturalSection.tsx
 *
 * The cultural lens section — the page closer that adds cultural context
 * to how the archetype was expressed in the user's specific background.
 *
 * Appears conditionally: only rendered when the user selected a supported
 * cultural background (not "other") and a matching overlay was found.
 *
 * Three sub-sections:
 * 1. expressionModifier — narrative paragraph describing how the archetype
 *    expressed itself within this cultural context
 * 2. "What this gave you" — strengthsInContext as styled bullet list
 * 3. "What this may have cost you" — tensionsInContext as styled bullet list
 *
 * Background: bg-amber-50 (warm closing — matches the hero reveal)
 * Extra bottom padding (pb-24) since this closes the page.
 */

import type { CulturalOverlay } from "@/lib/archetypes/types";

interface CulturalSectionProps {
  overlay: CulturalOverlay;
  displayName: string;
}

export function CulturalSection({ overlay, displayName }: CulturalSectionProps) {
  return (
    <section className="bg-amber-50 py-16 sm:py-20 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium mb-3">
            Your cultural context
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {displayName}
          </h2>
        </div>

        {/* Expression modifier — narrative intro paragraph */}
        <p className="text-base italic text-stone-700 leading-relaxed mb-12 max-w-2xl">
          {overlay.expressionModifier}
        </p>

        {/* Strengths in context */}
        <div className="mb-10">
          <h3
            className="text-xl font-semibold text-stone-900 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What this gave you
          </h3>
          <ul className="space-y-3">
            {overlay.strengthsInContext.map((strength) => (
              <li key={strength.slice(0, 40)} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full bg-amber-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-stone-700 leading-relaxed text-base">{strength}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-stone-200 mb-10" />

        {/* Tensions in context */}
        <div>
          <h3
            className="text-xl font-semibold text-stone-900 mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What this may have cost you
          </h3>
          <ul className="space-y-3">
            {overlay.tensionsInContext.map((tension) => (
              <li key={tension.slice(0, 40)} className="flex items-start gap-3">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full bg-stone-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <p className="text-stone-700 leading-relaxed text-base">{tension}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
