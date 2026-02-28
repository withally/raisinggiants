"use client";

import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function SecondaryHero() {
  return (
    <section
      className="grain py-32 lg:py-44 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #00363A 0%, #001A22 40%, #002833 100%)",
      }}
    >
      {/* Bloom glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(238,192,218,0.2) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-16 text-center">
        <ScrollReveal>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-[#F5F4F2] leading-[0.95] mb-8 font-display tracking-tight">
            <span className="font-light">You&apos;ve always</span>
            <br />
            <span className="font-light">known.</span>{" "}
            <em className="font-extrabold italic text-[#FEF4AC]">
              Now see it.
            </em>
          </h2>

          <p className="text-lg text-[#7AAFA0] leading-relaxed max-w-lg mx-auto mb-12">
            The patterns are already running. The Mirror just gives you the
            words.
          </p>

          <Link
            href="/quiz"
            className="group inline-flex items-center justify-center rounded-full bg-[#44232F] px-10 py-4 text-base font-semibold text-[#F5F4F2] shadow-lg hover:bg-[#5A2E3D] hover:shadow-xl transition-all duration-300 min-h-[56px] cursor-pointer"
          >
            Take the Mirror
            <span
              className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              &rarr;
            </span>
          </Link>

          <p className="mt-6 text-sm text-[#7AAFA0]/60">
            Free &middot; Private &middot; No account needed
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
