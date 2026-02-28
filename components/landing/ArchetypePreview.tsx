import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HandDrawnCircle } from "@/components/ui/hand-drawn";

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
  const tl = 16 + (index * 7) % 9;
  const tr = 20 + (index * 5) % 7;
  const br = 14 + (index * 11) % 10;
  const bl = 18 + (index * 3) % 8;
  return `${tl}px ${tr}px ${br}px ${bl}px`;
}

export function ArchetypePreview() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section intro */}
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-4">
              <HandDrawnCircle size={16} color="#C4892A" className="opacity-60" />
              <p className="text-xs tracking-[0.25em] uppercase text-[#0D3D3A] font-medium">
                The pattern you&apos;ve been carrying
              </p>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1008] leading-tight mb-4 font-display">
              Nine patterns. One of them is yours.
            </h2>
            <p className="text-base text-[#8A7A66] leading-relaxed mb-10 max-w-xl mx-auto">
              The Mirror maps the parenting you received to one of nine
              research-backed archetypes — naming what you&apos;ve carried but
              never had the language for.
            </p>
          </ScrollReveal>

          {/* Archetype name cloud */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {archetypes.map((name, i) => (
              <ScrollReveal
                key={name}
                delay={i * 80}
                distance={12}
                className="inline-flex"
              >
                <span
                  className="inline-flex items-center border border-[#E8E4DF] bg-[#F5F4F2]/60 px-4 py-2 text-sm text-[#1A1008] transition-colors hover:border-[#0D3D3A]/30 hover:bg-[#F5F4F2]"
                  style={{ borderRadius: organicRadius(i) }}
                >
                  {name}
                </span>
              </ScrollReveal>
            ))}
          </div>

          {/* Sample question preview */}
          <ScrollReveal delay={200}>
            <div className="grain bg-[#F5F4F2] border border-[#E8E4DF] rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-left" style={{ transform: "rotate(-0.5deg)" }}>
              <p className="text-xs uppercase tracking-wider text-[#8A7A66] font-medium mb-3">
                Sample question
              </p>
              <p className="text-lg sm:text-xl text-[#1A1008] leading-relaxed mb-6 font-display">
                When you were upset as a child — really upset — how often did a
                parent sit with you and let you know you weren&apos;t alone?
              </p>
              <div className="space-y-2">
                {[
                  "Almost always — they'd come find me",
                  "Sometimes, but I often worked through things alone",
                  "Rarely — I mostly kept it to myself",
                ].map((option) => (
                  <div
                    key={option}
                    className="rounded-lg border border-[#E8E4DF] bg-white px-4 py-3 text-sm text-[#8A7A66] transition-colors duration-150 hover:border-[#C8B89A]/60 hover:bg-[#F5F4F2]"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={300} className="mt-10">
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
