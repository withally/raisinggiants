import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MirrorIllustration } from "./illustrations/MirrorIllustration";

export function HeroWithIllustration() {
  return (
    <section className="relative min-h-screen bg-[#F5F4F2] overflow-hidden flex flex-col justify-center">
      {/* Decorative background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0D3D3A 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Decorative teal radial gradient — desktop only */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-60 translate-x-1/3 -translate-y-1/4 hidden lg:block"
        style={{
          background: "radial-gradient(circle, rgba(13,61,58,0.08) 0%, rgba(13,61,58,0.02) 60%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Text column — 55% on desktop */}
          <div className="lg:w-[55%]">
            {/* Eyebrow label */}
            <p className="text-xs tracking-[0.25em] uppercase text-[#0D3D3A] font-medium mb-8">
              Kin — The Mirror
            </p>

            {/* Main headline */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-[108px] font-semibold text-[#1A1008] leading-[1.05] mb-5 max-w-3xl font-display">
              Finally, the words for it.
            </h1>

            {/* Sub */}
            <p className="text-lg sm:text-xl text-[#8A7A66] leading-relaxed max-w-xl mb-8">
              The parenting you received is still active in you. The Mirror names the patterns — in 5 minutes.
            </p>

            {/* CTA group */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center mb-10">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center rounded-full bg-[#0D3D3A] px-8 py-4 text-base font-semibold text-[#F5F4F2] shadow-md hover:bg-[#0F4F4B] hover:shadow-lg transition-all duration-200 min-h-[52px] w-full sm:w-auto"
              >
                Take the Mirror — it&apos;s free
              </Link>
              <p className="text-sm text-[#8A7A66] text-center sm:text-left sm:ml-2 self-center">
                21 questions &middot; No account needed &middot; Completely
                private
              </p>
            </div>

            {/* Supporting copy */}
            <ScrollReveal className="max-w-2xl space-y-3 mb-12">
              <p className="text-base text-[#8A7A66] leading-relaxed">
                You already sense it — the patterns, the reactions, the quiet
                defaults you didn&apos;t choose. They have a shape. The Mirror
                gives them a name.
              </p>
              <p className="text-sm text-[#8A7A66] leading-relaxed">
                Built on 60+ years of peer-reviewed parenting science from
                Baumrind, Gottman, Ainsworth, and others. Not a diagnosis. A
                recognition.
              </p>
            </ScrollReveal>

            {/* Research badge */}
            <ScrollReveal delay={200}>
              <div className="pt-8 border-t border-[#E8E4DF] flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                <p className="text-xs text-[#8A7A66] uppercase tracking-wider font-medium shrink-0 mt-0.5">
                  Informed by
                </p>
                <p className="text-sm text-[#8A7A66] leading-snug">
                  Baumrind &middot; Gottman &middot; Siegel &middot; Ainsworth
                  &middot; Kennedy &middot; Tsabary &middot; van der Kolk
                  &middot; Rohner
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Illustration column — 45% on desktop */}
          <div className="lg:w-[45%] flex justify-center">
            <div className="relative">
              {/* Subtle teal glow behind illustration */}
              <div
                className="absolute inset-0 rounded-full bg-[#0D3D3A]/10 blur-2xl scale-90"
                aria-hidden="true"
              />
              <MirrorIllustration className="relative w-72 sm:w-96 lg:w-[28rem] h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
