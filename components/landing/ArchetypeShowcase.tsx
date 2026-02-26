import Link from "next/link";
import type { ComponentType } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";
import {
  SteadyAnchorIcon,
  FierceGuardianIcon,
  GentleNurturerIcon,
  IntentionalGuideIcon,
  ResilientStriverIcon,
  StructuredMentorIcon,
  OpenHeartedLearnerIcon,
  DevotedChampionIcon,
  CollaborativeAllyIcon,
} from "./illustrations/ArchetypeIcons";

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  "steady-anchor": SteadyAnchorIcon,
  "fierce-guardian": FierceGuardianIcon,
  "gentle-nurturer": GentleNurturerIcon,
  "intentional-guide": IntentionalGuideIcon,
  "resilient-striver": ResilientStriverIcon,
  "structured-mentor": StructuredMentorIcon,
  "open-hearted-learner": OpenHeartedLearnerIcon,
  "devoted-champion": DevotedChampionIcon,
  "collaborative-ally": CollaborativeAllyIcon,
};

export function ArchetypeShowcase() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section intro — mirrors ArchetypePreview header */}
          <ScrollReveal>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-4">
              What you&apos;ll discover
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight mb-4 font-display">
              Which of the 9 parenting archetypes shaped you?
            </h2>
            <p className="text-base text-stone-500 leading-relaxed mb-12 max-w-xl mx-auto">
              The Mirror maps the parenting you received to a research-backed
              archetype — revealing the patterns you absorbed and how they still
              show up in your life.
            </p>
          </ScrollReveal>
        </div>

        {/* 3×3 archetype grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {ARCHETYPES.map((archetype, i) => {
            const Icon = ICON_MAP[archetype.id];
            return (
              <ScrollReveal key={archetype.id} delay={i * 80}>
                <div className="group bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 transition-colors duration-200 hover:border-amber-300 hover:bg-gradient-to-b hover:from-amber-50/60 hover:to-amber-50/20">
                  {Icon && (
                    <Icon className="w-24 h-24 text-stone-400 transition-colors duration-200 group-hover:text-amber-700 mb-4" />
                  )}
                  <h3 className="text-base font-semibold text-stone-800 mb-1 font-display">
                    {archetype.name}
                  </h3>
                  <p className="text-sm text-stone-500 leading-relaxed">
                    {archetype.tagline}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Curiosity hook + CTA */}
        <div className="text-center">
          <ScrollReveal delay={750}>
            <p className="text-lg italic text-stone-500 mb-6">
              Which one shaped you?
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-4 text-base font-semibold text-amber-50 shadow-md hover:bg-stone-700 hover:shadow-lg transition-all duration-200 min-h-[52px]"
            >
              Find your archetype — it&apos;s free
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
