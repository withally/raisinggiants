"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const recognitions = [
  "The way you tense up when your child cries — and you don\u2019t know why.",
  "The voice that says \u201cyou\u2019re doing this wrong\u201d even when everything is fine.",
  "The pattern you keep repeating, even though you promised yourself you wouldn\u2019t.",
];

export function RecognitionSection() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <ScrollReveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#44232F]/60 font-medium mb-6">
            Sound familiar?
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#002833] leading-tight max-w-3xl mb-16">
            You already know
            <br />
            <span className="text-[#44232F]">something is there.</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {recognitions.map((text, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="relative pl-6 border-l-2 border-[#E2E6E5] hover:border-[#44232F]/40 transition-colors duration-500">
                <p className="text-lg sm:text-xl text-[#1A3A3E] leading-relaxed font-light">
                  {text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500} className="mt-16">
          <p className="text-base text-[#7AAFA0] max-w-2xl leading-relaxed">
            These aren&apos;t flaws. They&apos;re patterns — inherited from the
            parenting you received, running quietly beneath everything you do.
            The Mirror gives them a name.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
