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
            <p className="text-xs tracking-[0.25em] uppercase text-[#0D3D3A] font-medium mb-4">
              The pattern you&apos;ve been carrying
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1008] leading-tight mb-4 font-display">
              Nine patterns. One of them is yours.
            </h2>
            <p className="text-base text-[#8A7A66] leading-relaxed mb-12 max-w-xl mx-auto">
              The Mirror maps the parenting you received to one of nine
              research-backed archetypes — naming what you&apos;ve carried but
              never had the language for.
            </p>
          </ScrollReveal>
        </div>

        {/* 3x3 archetype grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {ARCHETYPES.map((archetype, i) => {
            const Icon = ICON_MAP[archetype.id];
            return (
              <ScrollReveal key={archetype.id} delay={i * 80}>
                <div className="group bg-[#F5F4F2] border border-[#E8E4DF] rounded-2xl p-5 sm:p-6 transition-colors duration-200 hover:border-[#0D3D3A]/30 hover:bg-gradient-to-b hover:from-[#0D3D3A]/5 hover:to-[#0D3D3A]/[0.02]">
                  {Icon && (
                    <Icon className="w-24 h-24 mb-4 opacity-80 transition-opacity duration-200 group-hover:opacity-100" />
                  )}
                  <h3 className="text-base font-semibold text-[#1A1008] mb-1 font-display">
                    {archetype.name}
                  </h3>
                  <p className="text-sm text-[#8A7A66] leading-relaxed">
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
            <p className="text-lg italic text-[#8A7A66] mb-6">
              Which pattern did you carry?
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-[#0D3D3A] px-8 py-4 text-base font-semibold text-[#F5F4F2] shadow-md hover:bg-[#0F4F4B] hover:shadow-lg transition-all duration-200 min-h-[52px]"
            >
              Take the Mirror — it&apos;s free
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
