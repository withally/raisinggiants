import type { Archetype } from "@/lib/archetypes/types";
import { ff, ffSerif, shadow } from "@/lib/landing/palette";

interface BridgeComparisonSectionProps {
  mirrorArchetype: Archetype;
  blueprintArchetype: Archetype;
}

// Colors for the two sides of the bridge
const mirrorGradient = "linear-gradient(180deg, #F0C5DE 0%, #EEC0DA 100%)";
const mirrorDark = "#4A1942";
const blueprintGradient = "linear-gradient(180deg, #BBDAE3 0%, #B3D5DE 100%)";
const blueprintDark = "#002833";
const bridgeBackground = "linear-gradient(180deg, #F7F5F0 0%, #EFEFEA 100%)";

export function BridgeComparisonSection({
  mirrorArchetype,
  blueprintArchetype,
}: BridgeComparisonSectionProps) {
  const isSameArchetype = mirrorArchetype.id === blueprintArchetype.id;

  return (
    <section className="px-4 sm:px-6 py-10 sm:py-14" style={{ background: bridgeBackground }}>
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="mb-8 max-w-3xl">
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2"
            style={{ fontFamily: ff, fontWeight: 600, color: "#888", opacity: 0.7 }}
          >
            The bridge
          </p>
          <h2
            className="text-2xl sm:text-3xl leading-tight"
            style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
          >
            What you inherited vs.{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: blueprintDark }}>
              how you parent
            </span>
          </h2>
        </div>

        {isSameArchetype ? (
          /* Same archetype message */
          <div
            className="rounded-3xl px-8 sm:px-12 py-10 sm:py-12 mb-6"
            style={{ background: blueprintGradient, boxShadow: shadow.card }}
          >
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ fontFamily: ffSerif, fontStyle: "italic", color: blueprintDark }}
            >
              &ldquo;Your parenting instincts closely mirror the patterns you received. This
              consistency can be a strength — or an invitation to examine which inherited patterns
              you want to keep.&rdquo;
            </p>
          </div>
        ) : (
          /* Two-column archetype cards */
          <div className="grid grid-cols-12 gap-3 mb-8">
            {/* Mirror archetype card — left/top */}
            <div
              className="col-span-12 lg:col-span-6 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col"
              style={{ background: mirrorGradient, boxShadow: shadow.card }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: ff, fontWeight: 600, color: mirrorDark, opacity: 0.6 }}
              >
                What you inherited
              </p>
              <h3
                className="text-2xl sm:text-3xl leading-tight mb-3"
                style={{ fontFamily: ff, fontWeight: 800, color: mirrorDark }}
              >
                {mirrorArchetype.name}
              </h3>
              <p
                className="text-base leading-relaxed mb-4 flex-1"
                style={{
                  fontFamily: ffSerif,
                  fontStyle: "italic",
                  color: mirrorDark,
                  opacity: 0.8,
                }}
              >
                &ldquo;{mirrorArchetype.tagline}&rdquo;
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: mirrorDark, opacity: 0.65 }}
              >
                {mirrorArchetype.foundationalPatterns.headline}
              </p>
            </div>

            {/* Blueprint archetype card — right/bottom */}
            <div
              className="col-span-12 lg:col-span-6 rounded-3xl px-6 sm:px-8 py-8 sm:py-10 flex flex-col"
              style={{ background: blueprintGradient, boxShadow: shadow.card }}
            >
              <p
                className="text-xs tracking-[0.2em] uppercase mb-4"
                style={{ fontFamily: ff, fontWeight: 600, color: blueprintDark, opacity: 0.6 }}
              >
                How you parent
              </p>
              <h3
                className="text-2xl sm:text-3xl leading-tight mb-3"
                style={{ fontFamily: ff, fontWeight: 800, color: blueprintDark }}
              >
                {blueprintArchetype.name}
              </h3>
              <p
                className="text-base leading-relaxed mb-4 flex-1"
                style={{
                  fontFamily: ffSerif,
                  fontStyle: "italic",
                  color: blueprintDark,
                  opacity: 0.8,
                }}
              >
                &ldquo;{blueprintArchetype.tagline}&rdquo;
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: blueprintDark, opacity: 0.65 }}
              >
                {blueprintArchetype.foundationalPatterns.headline}
              </p>
            </div>
          </div>
        )}

        {/* Narrative connecting paragraph */}
        <div className="max-w-3xl">
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{ fontFamily: ff, fontWeight: 400, color: "#444", opacity: 0.85 }}
          >
            Understanding the gap between what you received and what you bring reveals where your
            parenting is intentional — and where old patterns might be running the show.
          </p>
        </div>
      </div>
    </section>
  );
}
