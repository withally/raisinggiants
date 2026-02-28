"use client";

import { CountUp } from "@/components/ui/count-up";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const testimonials = [
  {
    text: "I always knew something felt off about my childhood. Seeing it mapped out made it real \u2014 and somehow, less scary.",
    name: "Sarah, 34",
    detail: "Melbourne",
  },
  {
    text: "My partner and I took it separately and then compared. Best conversation we\u2019ve had in years.",
    name: "Marcus, 29",
    detail: "First-time dad",
  },
  {
    text: "Five minutes to take. Took me three days to stop thinking about my result.",
    name: "Priya, 31",
    detail: "Singapore",
  },
];

export function SocialProof() {
  return (
    <section className="bg-[#F5F4F2] py-24 lg:py-36">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        {/* Counter — dramatic scale */}
        <ScrollReveal>
          <div className="mb-16">
            <p className="mb-2">
              <CountUp
                target={2847}
                className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#002833] font-display"
              />
              <span className="text-6xl sm:text-7xl lg:text-8xl font-light text-[#EEC0DA]/50 font-display">
                +
              </span>
            </p>
            <p className="text-base text-[#7AAFA0]">
              people have already taken The Mirror
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 150}>
              <div className="bg-white border border-[#E2E6E5] rounded-2xl p-6 sm:p-8 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-lg text-[#1A3A3E] leading-relaxed mb-6 flex-1 font-light italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-[#002833]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#7AAFA0]">{t.detail}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
