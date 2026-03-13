import type { ArchetypeContent } from "@/lib/archetypes/types";
import { ff, ffDisplay, ffSerif } from "@/lib/landing/palette";

interface BlueprintPatternsSectionProps {
  patterns: ArchetypeContent;
}

// Blue accent from site palette
const blueDark = "#002833";
const blueBorder = "#00283330";

export function BlueprintPatternsSection({ patterns }: BlueprintPatternsSectionProps) {
  return (
    <section className="px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="mb-10">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: ff, fontWeight: 600, color: "#888", opacity: 0.7 }}
          >
            Your parenting patterns
          </p>
          <h2
            className="text-2xl sm:text-3xl leading-tight"
            style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
          >
            The patterns that{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: blueDark }}>
              define
            </span>{" "}
            how you parent
          </h2>
        </div>

        {/* Themes — numbered, clean readable blocks */}
        <div className="space-y-8 mb-12">
          {patterns.themes.map((theme, i) => {
            const dashIndex = theme.indexOf(" — ");
            const title = dashIndex > -1 ? theme.slice(0, dashIndex) : null;
            const body = dashIndex > -1 ? theme.slice(dashIndex + 3) : theme;
            const num = String(i + 1).padStart(2, "0");

            return (
              <div key={theme.slice(0, 40)} className="flex gap-5">
                {/* Number */}
                <p
                  className="text-2xl shrink-0 mt-0.5"
                  style={{ fontFamily: ffDisplay, fontWeight: 700, color: blueDark, opacity: 0.25 }}
                >
                  {num}
                </p>

                {/* Content */}
                <div className="border-l-2 pl-5" style={{ borderColor: blueBorder }}>
                  {title && (
                    <p
                      className="text-base mb-1.5 leading-snug"
                      style={{ fontFamily: ff, fontWeight: 700, color: "#1A1A1A" }}
                    >
                      {title}
                    </p>
                  )}
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: ff, fontWeight: 400, color: "#1A1A1A", opacity: 0.7 }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Research anchor */}
        <p
          className="text-sm italic leading-relaxed mb-4 border-t pt-6"
          style={{ fontFamily: ff, color: "#888", borderColor: "#E8E4DF" }}
        >
          {patterns.researchAnchor}
        </p>

        {/* Citations */}
        <details className="group">
          <summary
            className="cursor-pointer text-sm hover:opacity-80 transition-opacity list-none flex items-center gap-2 select-none"
            style={{ fontFamily: ff, fontWeight: 500, color: "#888" }}
          >
            <span className="inline-block transition-transform group-open:rotate-90">›</span>
            <span>References</span>
          </summary>
          <div className="mt-3 space-y-2 pl-4">
            {patterns.citations.map((citation) => (
              <p
                key={`${citation.researcher}-${citation.year}`}
                className="text-xs leading-relaxed"
                style={{ fontFamily: ff, color: "#888" }}
              >
                <span style={{ fontWeight: 500 }}>{citation.researcher}</span>
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
