import Image from "next/image";
import Link from "next/link";
import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";
import { ScrollReveal } from "./ScrollReveal";

const archetypeTeasers = [
  {
    name: "The Steady Anchor",
    tagline: "You grew up anchored.",
    hint: "High warmth, consistent boundaries, emotional presence",
    bg: grad.butter.light,
    color: p.butter.dark,
    accent: p.butter.light,
    avatar: "/icons/archetype-steady-anchor-final.png",
  },
  {
    name: "The Fierce Guardian",
    tagline: "You grew up protected.",
    hint: "Deep love expressed through vigilance and structure",
    bg: grad.pink.light,
    color: p.pink.dark,
    accent: p.pink.light,
    avatar: "/icons/archetype-fierce-guardian-final.png",
  },
  {
    name: "The Gentle Nurturer",
    tagline: "You grew up held.",
    hint: "Warmth and freedom, with room to find your own way",
    bg: grad.mint.light,
    color: p.mint.dark,
    accent: p.mint.light,
    avatar: "/icons/archetype-gentle-nurturer-final.png",
  },
  {
    name: "The Resilient Striver",
    tagline: "You grew up watching someone rewrite the story.",
    hint: "A parent healing their own past while raising you",
    bg: grad.blue.light,
    color: p.blue.dark,
    accent: p.blue.light,
    avatar: "/icons/archetype-resilient-striver-final.png",
  },
];

export function ArchetypePreviewSection() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p
          className="uppercase tracking-[0.2em] text-xs mb-4"
          style={{ fontFamily: ff, fontWeight: 600, color: p.mint.dark, opacity: 0.6 }}
        >
          What you&apos;ll discover
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>
            Which of 9 archetypes{" "}
          </span>
          <span
            style={{
              fontFamily: ffSerif,
              fontStyle: "italic",
              fontWeight: 400,
              color: p.pink.dark,
            }}
          >
            shaped you
          </span>
          <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>?</span>
        </h2>

        {/* Subtext */}
        <p
          className="text-base mb-12 max-w-lg leading-relaxed"
          style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
        >
          Each archetype captures a distinct constellation of parenting patterns — the warmth, the
          boundaries, the things said and unsaid. Here are four of the nine.
        </p>

        {/* Archetype teaser cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {archetypeTeasers.map((arch, i) => (
            <ScrollReveal key={arch.name} delay={i * 80} offset={20}>
              <div
                className="hover-lift relative"
                style={{
                  background: arch.bg,
                  borderRadius: "24px",
                  minHeight: "200px",
                  boxShadow: shadow.card,
                }}
              >
                <div className="flex items-end">
                  {/* Text content */}
                  <div className="flex-1 px-7 py-7 flex flex-col justify-between min-h-[200px]">
                    <div>
                      <p
                        className="text-lg mb-1"
                        style={{ fontFamily: ff, fontWeight: 800, color: arch.color }}
                      >
                        {arch.name}
                      </p>
                      <p
                        className="text-sm mb-4"
                        style={{
                          fontFamily: ffSerif,
                          fontStyle: "italic",
                          color: arch.color,
                          opacity: 0.7,
                        }}
                      >
                        &ldquo;{arch.tagline}&rdquo;
                      </p>
                    </div>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: ff, fontWeight: 400, color: arch.color, opacity: 0.5 }}
                    >
                      {arch.hint}
                    </p>
                  </div>

                  {/* Avatar — bottom right, peeking up */}
                  <div className="relative shrink-0 w-28 h-36 md:w-36 md:h-44 -mb-1 mr-2">
                    <Image
                      src={arch.avatar}
                      alt={arch.name}
                      width={160}
                      height={200}
                      className="absolute bottom-0 right-0 w-full h-full object-contain object-bottom"
                    />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* "And 5 more" + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <p
            className="text-sm"
            style={{ fontFamily: ff, fontWeight: 500, color: "#999" }}
          >
            Plus 5 more archetypes — each one a different story of how you were raised.
          </p>
          <Link
            href="/quiz"
            className="hover-btn inline-flex cursor-pointer items-center justify-center px-8 py-4 text-sm shrink-0"
            style={{
              fontFamily: ff,
              fontWeight: 700,
              backgroundColor: p.blue.dark,
              color: "#F0EDE8",
              borderRadius: "16px",
              minHeight: "44px",
              boxShadow: shadow.button,
            }}
          >
            Discover yours
          </Link>
        </div>
      </div>
    </section>
  );
}
