import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function SecondaryHero() {
  return (
    <section className="bg-stone-900 py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-900/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          {/* Decorative abstract reflection illustration */}
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 100"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-32 h-20 sm:w-40 sm:h-24 text-amber-400/30"
              aria-hidden="true"
            >
              {/* Left profile — parent figure (facing right) */}
              <path d="M42 18 C40 20, 38 24, 38 30 C38 36, 40 40, 44 44 C46 46, 48 47, 50 46" strokeWidth="1.5" opacity="0.6" />
              <path d="M38 30 C34 32, 30 36, 28 42 C26 48, 28 56, 32 62" strokeWidth="1.5" opacity="0.6" />
              <path d="M42 18 C44 16, 46 16, 48 18" strokeWidth="1.5" opacity="0.6" />
              <path d="M32 62 C34 68, 36 72, 40 76" strokeWidth="1.2" opacity="0.5" />

              {/* Right profile — child figure (facing left, mirrored) */}
              <path d="M158 18 C160 20, 162 24, 162 30 C162 36, 160 40, 156 44 C154 46, 152 47, 150 46" strokeWidth="1.5" opacity="0.6" />
              <path d="M162 30 C166 32, 170 36, 172 42 C174 48, 172 56, 168 62" strokeWidth="1.5" opacity="0.6" />
              <path d="M158 18 C156 16, 154 16, 152 18" strokeWidth="1.5" opacity="0.6" />
              <path d="M168 62 C166 68, 164 72, 160 76" strokeWidth="1.2" opacity="0.5" />

              {/* Wave lines flowing between the two profiles — inherited patterns motif */}
              <path d="M54 50 C62 44, 70 48, 78 44 C86 40, 94 46, 100 42 C106 38, 114 44, 122 40 C130 36, 138 42, 146 50" strokeWidth="0.8" opacity="0.3" />
              <path d="M52 58 C60 52, 68 56, 76 52 C84 48, 92 54, 100 50 C108 46, 116 52, 124 48 C132 44, 140 50, 148 58" strokeWidth="0.8" opacity="0.25" />
              <path d="M56 66 C64 60, 72 64, 80 60 C88 56, 96 62, 100 60 C104 58, 112 64, 120 60 C128 56, 136 62, 144 66" strokeWidth="0.6" opacity="0.18" />

              {/* Atmospheric dots */}
              <circle cx="100" cy="36" r="0.8" fill="currentColor" stroke="none" opacity="0.15" />
              <circle cx="84" cy="56" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
              <circle cx="116" cy="56" r="0.7" fill="currentColor" stroke="none" opacity="0.12" />
            </svg>
          </div>

          <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-medium mb-6">
            Your starting point
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-stone-100 leading-tight mb-6 font-display">
            The patterns don&apos;t pause
            <br />
            <em className="italic text-amber-300/90">
              while you think about it.
            </em>
          </h2>

          <p className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-xl mx-auto mb-10">
            Every day on autopilot is a day your inherited patterns go
            unchecked. The Mirror takes 5 minutes. What it reveals may take
            longer to sit with — and that&apos;s exactly the point.
          </p>

          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-10 py-4 text-base font-semibold text-stone-900 shadow-lg hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-200 min-h-[52px] w-full sm:w-auto"
          >
            Find your archetype — it&apos;s free
          </Link>

          <p className="mt-4 text-xs text-stone-500">
            No account needed &middot; Your answers stay private
          </p>

          {/* Editorial end-mark */}
          <div className="mt-6 flex flex-col items-center">
            <div className="w-24 border-t border-amber-800/20" />
            <div className="w-2 h-2 rotate-45 bg-amber-700/20 mx-auto -mt-1" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
