import type { CulturalOverlay } from "@/lib/archetypes/types";
import { ff, ffSerif, p, grad, shadow } from "@/lib/landing/palette";

interface CulturalSectionProps {
  overlay: CulturalOverlay;
  displayName: string;
}

export function CulturalSection({ overlay, displayName }: CulturalSectionProps) {
  return (
    <section className="px-4 sm:px-6 py-4 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-4 px-2">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: ff, fontWeight: 600, color: "#888", opacity: 0.7 }}
          >
            Your cultural context
          </p>
          <h2
            className="text-2xl sm:text-3xl leading-tight"
            style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
          >
            {displayName.replace(/^The /, "The ")
              .replace(/(Lens)/, "")}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: p.pink.dark }}>
              Lens
            </span>
          </h2>
        </div>

        {/* Expression modifier — full-width mint card */}
        <div
          className="rounded-3xl px-8 sm:px-12 py-8 sm:py-10 mb-3"
          style={{ background: grad.mint.light, boxShadow: shadow.card }}
        >
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: ffSerif, fontStyle: "italic", color: p.mint.dark }}
          >
            {overlay.expressionModifier}
          </p>
        </div>

        {/* Two-column: strengths + tensions */}
        <div className="grid grid-cols-12 gap-3">
          {/* Strengths card */}
          <div
            className="col-span-12 lg:col-span-6 rounded-3xl px-6 sm:px-8 py-6 sm:py-8"
            style={{ background: grad.butter.light, boxShadow: shadow.card }}
          >
            <h3
              className="text-lg mb-5"
              style={{ fontFamily: ff, fontWeight: 700, color: p.butter.dark }}
            >
              What this gave you
            </h3>
            <ul className="space-y-3">
              {overlay.strengthsInContext.map((strength) => (
                <li key={strength.slice(0, 40)} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: p.butter.dark, opacity: 0.4 }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: ff, fontWeight: 400, color: p.butter.dark, opacity: 0.8 }}
                  >
                    {strength}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tensions card */}
          <div
            className="col-span-12 lg:col-span-6 rounded-3xl px-6 sm:px-8 py-6 sm:py-8"
            style={{ background: grad.pink.light, boxShadow: shadow.card }}
          >
            <h3
              className="text-lg mb-5"
              style={{ fontFamily: ff, fontWeight: 700, color: p.pink.dark }}
            >
              What this may have cost you
            </h3>
            <ul className="space-y-3">
              {overlay.tensionsInContext.map((tension) => (
                <li key={tension.slice(0, 40)} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: p.pink.dark, opacity: 0.4 }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: ff, fontWeight: 400, color: p.pink.dark, opacity: 0.8 }}
                  >
                    {tension}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
