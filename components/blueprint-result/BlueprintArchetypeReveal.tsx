import type { Archetype } from "@/lib/archetypes/types";
import { ff, ffDisplay, ffSerif, grad, p, shadow } from "@/lib/landing/palette";

interface BlueprintArchetypeRevealProps {
  archetype: Archetype;
}

// Blue gradient for Blueprint hero (from site palette)
const gradBlue = "linear-gradient(180deg, #BBDAE3 0%, #B3D5DE 100%)";
const blueDark = "#002833";

export function BlueprintArchetypeReveal({ archetype }: BlueprintArchetypeRevealProps) {
  // Extract the last word for serif italic treatment (e.g., "The Steady *Anchor*")
  const nameParts = archetype.name.split(" ");
  const lastWord = nameParts.pop() ?? "";
  const namePrefix = nameParts.join(" ");

  const themeCount = archetype.foundationalPatterns.themes.length;

  return (
    <section className="px-4 sm:px-6 pt-8 sm:pt-12 pb-4">
      <div className="max-w-5xl mx-auto">
        {/* Bento hero grid */}
        <div className="grid grid-cols-12 gap-3">
          {/* Main reveal card — teal gradient, 7-col */}
          <div
            className="col-span-12 lg:col-span-7 rounded-3xl px-8 sm:px-12 py-10 sm:py-14 flex flex-col justify-between"
            style={{ background: gradBlue, boxShadow: shadow.card, minHeight: 340 }}
          >
            {/* Eyebrow */}
            <p
              className="text-xs tracking-[0.2em] uppercase mb-8"
              style={{ fontFamily: ff, fontWeight: 600, color: blueDark, opacity: 0.6 }}
            >
              Your parenting archetype:
            </p>

            {/* Archetype name */}
            <div className="mb-6">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl leading-[0.92] tracking-tight"
                style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
              >
                {namePrefix}{" "}
                <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: blueDark }}>
                  {lastWord}
                </span>
              </h1>
            </div>

            {/* Headline description */}
            <p
              className="text-sm sm:text-base leading-relaxed max-w-md"
              style={{ fontFamily: ff, fontWeight: 400, color: "#1A1A1A", opacity: 0.55 }}
            >
              {archetype.foundationalPatterns.headline}
            </p>
          </div>

          {/* Right column — stacked cards */}
          <div className="col-span-12 lg:col-span-5 grid grid-rows-[1fr_auto] gap-3">
            {/* Tagline card — mint gradient */}
            <div
              className="rounded-3xl px-8 py-8 sm:py-10 flex flex-col justify-center"
              style={{ background: grad.mint.light, boxShadow: shadow.card }}
            >
              <p
                className="text-2xl sm:text-3xl leading-snug"
                style={{ fontFamily: ffSerif, fontStyle: "italic", color: p.mint.dark }}
              >
                &ldquo;{archetype.tagline}&rdquo;
              </p>
            </div>

            {/* Stat cards row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Dimensions analyzed */}
              <div
                className="rounded-3xl px-5 py-5 flex flex-col justify-end"
                style={{ background: grad.blue.light, boxShadow: shadow.card, minHeight: 120 }}
              >
                <p
                  className="text-3xl sm:text-4xl mb-1"
                  style={{ fontFamily: ffDisplay, fontWeight: 700, color: p.blue.dark }}
                >
                  11
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: ff, fontWeight: 500, color: p.blue.dark, opacity: 0.7 }}
                >
                  Dimensions analyzed
                </p>
              </div>

              {/* Patterns found */}
              <div
                className="rounded-3xl px-5 py-5 flex flex-col justify-end"
                style={{ background: grad.butter.light, boxShadow: shadow.card, minHeight: 120 }}
              >
                <p
                  className="text-3xl sm:text-4xl mb-1"
                  style={{ fontFamily: ffDisplay, fontWeight: 700, color: p.butter.dark }}
                >
                  {themeCount}
                </p>
                <p
                  className="text-xs"
                  style={{ fontFamily: ff, fontWeight: 500, color: p.butter.dark, opacity: 0.7 }}
                >
                  Parenting patterns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
