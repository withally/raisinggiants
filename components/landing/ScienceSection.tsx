"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HandDrawnDivider } from "@/components/ui/hand-drawn";

const researchers = [
  { name: "Diana Baumrind", focus: "Parenting styles", year: "1967" },
  { name: "John Gottman", focus: "Emotional coaching", year: "1997" },
  { name: "Daniel Siegel", focus: "Interpersonal neurobiology", year: "2012" },
  { name: "Mary Ainsworth", focus: "Attachment theory", year: "1978" },
  { name: "Becky Kennedy", focus: "Repair & connection", year: "2022" },
  { name: "Shefali Tsabary", focus: "Conscious parenting", year: "2010" },
  {
    name: "Bessel van der Kolk",
    focus: "Intergenerational trauma",
    year: "2014",
  },
  {
    name: "Ronald Rohner",
    focus: "Cross-cultural acceptance",
    year: "ongoing",
  },
];

export function ScienceSection() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        {/* Header */}
        <ScrollReveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#00363A]/60 font-medium mb-6">
            The research
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#002833] leading-tight mb-6 max-w-3xl">
            Grounded in decades of work.
          </h2>
          <p className="text-lg text-[#3A5A56] leading-relaxed max-w-2xl mb-16">
            Every question in The Mirror draws on peer-reviewed research,
            longitudinal studies, and clinical frameworks from the world&apos;s
            leading parenting scientists.
          </p>
        </ScrollReveal>

        {/* Researcher grid — compact, typographic */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 mb-20">
          {researchers.map((r, i) => (
            <ScrollReveal key={r.name} delay={i * 80}>
              <div className="group">
                <p className="text-base font-display font-extrabold text-[#002833] mb-0.5 group-hover:text-[#00363A] transition-colors duration-300">
                  {r.name}
                </p>
                <p className="text-xs text-[#7AAFA0]">
                  {r.focus} &middot; {r.year}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pull quote — one powerful statement */}
        <ScrollReveal delay={400}>
          <div className="max-w-3xl">
            <HandDrawnDivider
              color="rgba(238,192,218,0.3)"
              className="mb-10"
            />
            <blockquote>
              <p className="text-2xl sm:text-3xl lg:text-4xl text-[#002833] leading-snug font-display font-light italic mb-4">
                &ldquo;Being able to feel safe with other people is probably the
                single most important aspect of mental health.&rdquo;
              </p>
              <footer className="text-sm text-[#7AAFA0]">
                &mdash;{" "}
                <span className="font-extrabold font-display text-[#002833]">
                  Bessel van der Kolk
                </span>
                , The Body Keeps the Score
              </footer>
            </blockquote>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
