"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const archetypes = [
  "The Steady Anchor",
  "The Fierce Guardian",
  "The Gentle Nurturer",
  "The Intentional Guide",
  "The Resilient Striver",
  "The Structured Mentor",
  "The Open-Hearted Learner",
  "The Devoted Champion",
  "The Collaborative Ally",
];

/* Deterministic irregular border-radius per pill */
function organicRadius(index: number) {
  const tl = 16 + ((index * 7) % 9);
  const tr = 20 + ((index * 5) % 7);
  const br = 14 + ((index * 11) % 10);
  const bl = 18 + ((index * 3) % 8);
  return `${tl}px ${tr}px ${br}px ${bl}px`;
}

export function ArchetypePreview() {
  return (
    <section className="bg-[#F5F4F2] py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left column — content */}
          <div>
            <ScrollReveal>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#00363A]/60 font-medium mb-6">
                The nine archetypes
              </p>
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-[#002833] leading-tight mb-6">
                Nine patterns.
                <br />
                <span className="font-light italic">
                  One of them is yours.
                </span>
              </h2>
              <p className="text-base text-[#3A5A56] leading-relaxed mb-10 max-w-md">
                The Mirror maps the parenting you received to one of nine
                research-backed archetypes — naming what you&apos;ve carried but
                never had the language for.
              </p>
            </ScrollReveal>

            {/* Archetype pills */}
            <div className="flex flex-wrap gap-2 mb-10">
              {archetypes.map((name, i) => (
                <ScrollReveal
                  key={name}
                  delay={i * 60}
                  distance={8}
                  className="inline-flex"
                >
                  <span
                    className="inline-flex items-center border border-[#D0DBD8] bg-white/60 px-4 py-2 text-sm text-[#1A3A3E] transition-all duration-300 hover:border-[#00363A]/30 hover:bg-white hover:shadow-sm cursor-default"
                    style={{ borderRadius: organicRadius(i) }}
                  >
                    {name}
                  </span>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={600}>
              <Link
                href="/quiz"
                className="group inline-flex items-center gap-2 text-[#00363A] font-semibold hover:text-[#44232F] transition-colors duration-300 cursor-pointer"
              >
                Discover yours
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </Link>
            </ScrollReveal>
          </div>

          {/* Right column — sample question card */}
          <ScrollReveal delay={300}>
            <div
              className="grain bg-white border border-[#E2E6E5] rounded-2xl p-8 sm:p-10 shadow-sm"
              style={{ transform: "rotate(-0.75deg)" }}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#7AAFA0] font-medium mb-5">
                Sample question
              </p>
              <p className="text-xl sm:text-2xl text-[#002833] leading-relaxed mb-8 font-display font-light">
                When you were upset as a child — really upset — how often did a
                parent sit with you and let you know you weren&apos;t alone?
              </p>
              <div className="space-y-3">
                {[
                  "Almost always \u2014 they\u2019d come find me",
                  "Sometimes, but I often worked through things alone",
                  "Rarely \u2014 I mostly kept it to myself",
                ].map((option) => (
                  <div
                    key={option}
                    className="rounded-xl border border-[#E2E6E5] bg-[#F5F4F2]/50 px-5 py-3.5 text-sm text-[#3A5A56] transition-all duration-200 hover:border-[#00363A]/20 hover:bg-[#F5F4F2] cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
