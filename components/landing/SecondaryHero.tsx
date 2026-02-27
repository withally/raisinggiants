import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function SecondaryHero() {
  return (
    <section className="bg-[#0D3D3A] py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#0D3D3A]/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          {/* Decorative abstract reflection illustration */}
          <div className="flex justify-center mb-6">
            <Image
              src="/images/illustrations/secondary-hero-decoration.png"
              alt=""
              width={320}
              height={180}
              className="w-40 sm:w-52 h-auto opacity-30"
              aria-hidden="true"
            />
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-[#C4892A] font-medium mb-6">
            Your starting point
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F4F2] leading-tight mb-6 font-display">
            You&apos;ve always known.
            <br />
            <em className="italic text-[#C4892A]/90">
              Now you&apos;ll see it.
            </em>
          </h2>

          <p className="text-base sm:text-lg text-[#7A9E9C] leading-relaxed max-w-xl mx-auto mb-10">
            You&apos;ve probably spent years aware that something about how you
            were raised is active in you today. The Mirror gives you the words
            for what you&apos;ve always felt without language.
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full bg-[#6B1E2E] px-10 py-4 text-base font-semibold text-[#F5F4F2] shadow-lg hover:bg-[#8B2A3D] hover:shadow-xl hover:shadow-[#6B1E2E]/20 transition-all duration-200 min-h-[52px] w-full sm:w-auto"
          >
            Take the Mirror
          </Link>

          <p className="mt-4 text-xs text-[#7A9E9C]">
            No account needed &middot; Your answers stay private
          </p>

          {/* Editorial end-mark */}
          <div className="mt-6 flex flex-col items-center">
            <div className="w-24 border-t border-[#F5F4F2]/10" />
            <div className="w-2 h-2 rotate-45 bg-[#C4892A]/20 mx-auto -mt-1" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
