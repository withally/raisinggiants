import type { CulturalOverlay } from "@/lib/archetypes/types";
import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";

interface BlueprintCulturalSectionProps {
  overlay: CulturalOverlay;
  displayName: string;
}

// Blue accent from site palette — expression card uses blue, strength/tension cards use mint/blue
const blueDark = "#002833";
const blueGradient = "linear-gradient(180deg, #BBDAE3 0%, #B3D5DE 100%)";

export function BlueprintCulturalSection({
  overlay,
  displayName: _displayName,
}: BlueprintCulturalSectionProps) {
  return (
    <section className="px-4 sm:px-6 py-4 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-4 px-2">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: ff, fontWeight: 600, color: "#888", opacity: 0.7 }}
          >
            Your cultural background
          </p>
          <h2
            className="text-2xl sm:text-3xl leading-tight"
            style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
          >
            How your cultural background shapes{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: blueDark }}>
              your parenting
            </span>
          </h2>
        </div>

        {/* Expression modifier — full-width teal card */}
        <div
          className="rounded-3xl px-8 sm:px-12 py-8 sm:py-10 mb-3"
          style={{ background: blueGradient, boxShadow: shadow.card }}
        >
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: ffSerif, fontStyle: "italic", color: blueDark }}
          >
            {overlay.expressionModifier}
          </p>
        </div>

        {/* Two-column: strengths + tensions */}
        <div className="grid grid-cols-12 gap-3">
          {/* Strengths card */}
          <div
            className="col-span-12 lg:col-span-6 rounded-3xl px-6 sm:px-8 py-6 sm:py-8"
            style={{ background: grad.mint.light, boxShadow: shadow.card }}
          >
            <h3
              className="text-lg mb-5"
              style={{ fontFamily: ff, fontWeight: 700, color: p.mint.dark }}
            >
              What this gave you as a parent
            </h3>
            <ul className="space-y-3">
              {overlay.strengthsInContext.map((strength) => (
                <li key={strength.slice(0, 40)} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: blueDark, opacity: 0.4 }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: ff, fontWeight: 400, color: p.mint.dark, opacity: 0.8 }}
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
            style={{ background: grad.blue.light, boxShadow: shadow.card }}
          >
            <h3
              className="text-lg mb-5"
              style={{ fontFamily: ff, fontWeight: 700, color: p.blue.dark }}
            >
              What this may challenge in your parenting
            </h3>
            <ul className="space-y-3">
              {overlay.tensionsInContext.map((tension) => (
                <li key={tension.slice(0, 40)} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: blueDark, opacity: 0.4 }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: ff, fontWeight: 400, color: p.blue.dark, opacity: 0.8 }}
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
