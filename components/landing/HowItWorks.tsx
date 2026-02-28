"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const steps = [
  {
    number: "01",
    title: "Answer honestly",
    description:
      "21 questions about the parenting you received. Not what your parents intended — what you experienced.",
  },
  {
    number: "02",
    title: "See your pattern",
    description:
      "The Mirror maps your responses to one of nine research-backed archetypes built on 60+ years of parenting science.",
  },
  {
    number: "03",
    title: "Understand your story",
    description:
      "Get a personalized profile that names what you\u2019ve carried — and what it means for the parent you\u2019re becoming.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-[#00363A] py-24 lg:py-36 relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Subtle bloom glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(238,192,218,0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-16">
        <ScrollReveal>
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#FEF4AC]/70 font-medium mb-6">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-[#F5F4F2] leading-tight mb-20">
            Five minutes.
            <br />
            A lifetime of clarity.
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 150}>
              <div className="group">
                <span className="block text-5xl font-display font-light text-[#FEF4AC]/40 mb-4 transition-colors duration-300 group-hover:text-[#FEF4AC]/70">
                  {step.number}
                </span>
                <h3 className="text-xl font-display font-extrabold text-[#F5F4F2] mb-3">
                  {step.title}
                </h3>
                <p className="text-base text-[#7AAFA0] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
