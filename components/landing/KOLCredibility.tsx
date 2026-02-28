import type { ComponentType } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HandDrawnDivider } from "@/components/ui/hand-drawn";
import {
  BaumrindPortrait,
  GottmanPortrait,
  SiegelPortrait,
  AinsworthPortrait,
  KennedyPortrait,
  TsabaryPortrait,
  VanDerKolkPortrait,
  RohnerPortrait,
} from "./portraits/SketchPortrait";

const researchers: {
  name: string;
  role: string;
  contribution: string;
  work: string;
  year: string;
  Portrait: ComponentType<{ className?: string }>;
}[] = [
  {
    name: "Diana Baumrind",
    role: "Developmental psychologist",
    contribution: "Authoritative parenting framework",
    work: "Child care practices anteceding three patterns of preschool behavior",
    year: "1967",
    Portrait: BaumrindPortrait,
  },
  {
    name: "John Gottman",
    role: "Relationship researcher",
    contribution: "Emotional coaching and repair",
    work: "Raising an Emotionally Intelligent Child",
    year: "1997",
    Portrait: GottmanPortrait,
  },
  {
    name: "Daniel J. Siegel",
    role: "Clinical professor of psychiatry",
    contribution: "Interpersonal neurobiology",
    work: "The Developing Mind",
    year: "2012",
    Portrait: SiegelPortrait,
  },
  {
    name: "Mary Ainsworth",
    role: "Developmental psychologist",
    contribution: "Attachment theory",
    work: "Strange Situation study",
    year: "1978",
    Portrait: AinsworthPortrait,
  },
  {
    name: "Dr. Becky Kennedy",
    role: "Clinical psychologist",
    contribution: "Repair as cornerstone of connection",
    work: "Good Inside",
    year: "2022",
    Portrait: KennedyPortrait,
  },
  {
    name: "Shefali Tsabary",
    role: "Clinical psychologist",
    contribution: "Conscious parenting",
    work: "The Conscious Parent",
    year: "2010",
    Portrait: TsabaryPortrait,
  },
  {
    name: "Bessel van der Kolk",
    role: "Trauma researcher",
    contribution: "Intergenerational trauma",
    work: "The Body Keeps the Score",
    year: "2014",
    Portrait: VanDerKolkPortrait,
  },
  {
    name: "Ronald P. Rohner",
    role: "Cross-cultural psychologist",
    contribution: "Cross-cultural parental acceptance",
    work: "IPARTheory & PARQ — 60+ cultures",
    year: "ongoing",
    Portrait: RohnerPortrait,
  },
];

export function KOLCredibility() {
  return (
    <section className="bg-[#F5F4F2] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header — strict left-align, asymmetric authority (echoes hero) */}
        <ScrollReveal className="mb-14 ml-0 mr-auto max-w-2xl">
          <p className="text-xs tracking-[0.25em] uppercase text-[#0D3D3A] font-medium mb-4">
            The Research
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1A1008] leading-tight mb-4 font-display">
            Grounded in decades of work from the world&apos;s leading parenting
            scientists.
          </h2>
          <p className="text-[#8A7A66] text-base leading-relaxed">
            The Mirror isn&apos;t built on opinion or trend. Every dimension it
            measures draws on peer-reviewed research, longitudinal studies, and
            clinical frameworks that have shaped how the field understands child
            development.
          </p>
        </ScrollReveal>

        {/* Researcher grid — featured 2 + supporting 6 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {researchers.map((researcher, i) => {
            const isFeatured = i < 2;
            return (
              <ScrollReveal
                key={researcher.name}
                delay={i * 100}
                distance={16}
                className={`bg-[#F5F4F2] border border-[#E8E4DF]/60 rounded-2xl p-5 lg:p-6 flex flex-col gap-3 hover:bg-white transition-colors duration-150 ${isFeatured ? "lg:col-span-2" : ""}`}
              >
                {/* Portrait sketch */}
                <div className="w-16 h-18 text-[#8A7A66]">
                  <researcher.Portrait className="w-full h-full" />
                </div>

                {/* Name — display font */}
                <h3 className="text-base font-semibold text-[#1A1008] leading-snug font-display">
                  {researcher.name}
                </h3>

                {/* Contribution */}
                <p className="text-xs text-[#0D3D3A] font-medium leading-snug">
                  {researcher.contribution}
                </p>

                {/* Divider */}
                <HandDrawnDivider color="rgba(13,61,58,0.2)" className="my-1" />

                {/* Work */}
                <p className="text-xs text-[#8A7A66] leading-snug italic">
                  &ldquo;{researcher.work}&rdquo;
                </p>

                {/* Year */}
                <p className="text-xs text-[#8A7A66] mt-auto">
                  {researcher.year}
                </p>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Closing note */}
        <ScrollReveal delay={400} className="mt-8">
          <p className="text-center text-xs text-[#8A7A66] leading-relaxed max-w-lg mx-auto">
            These thinkers shaped the framework behind The Mirror. Their work
            informs every question, every dimension, every insight.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
