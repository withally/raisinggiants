import Link from "next/link";

export function HeroSection() {
  return (
    <section className="grain relative min-h-screen bg-[#F5F4F2] overflow-hidden flex items-center">
      {/* Decorative teal gradient orb — top right */}
      <div
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full opacity-40 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(0,54,58,0.12) 0%, rgba(0,54,58,0.04) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle bloom accent — bottom left */}
      <div
        className="absolute bottom-[10%] left-[5%] w-[300px] h-[300px] rounded-full opacity-20 hidden lg:block"
        style={{
          background:
            "radial-gradient(circle, rgba(68,35,47,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-16 py-24 lg:py-0">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#00363A]/60 font-medium mb-8 lg:mb-12">
            Kin — The Mirror
          </p>

          {/* Main headline — massive, light, dramatic */}
          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-light text-[#002833] leading-[0.9] mb-8 font-display tracking-tight">
            Finally, the
            <br />
            <span className="relative inline-block">
              words
              {/* Hand-drawn underline accent */}
              <svg
                className="absolute -bottom-2 left-0 w-full h-3"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8C40 4 80 10 120 6C160 2 200 9 240 5C260 3 280 7 298 4"
                  stroke="#EEC0DA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.5"
                />
              </svg>
            </span>{" "}
            for it.
          </h1>

          {/* Subhead */}
          <p className="text-xl sm:text-2xl text-[#3A5A56] leading-relaxed max-w-xl mb-10 font-light">
            The parenting you received is still active in you. The Mirror names
            the patterns — in 5 minutes.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
            <Link
              href="/quiz"
              className="group inline-flex items-center justify-center rounded-full bg-[#00363A] px-10 py-4 text-base font-semibold text-[#F5F4F2] shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#0A4A4E] min-h-[56px] cursor-pointer"
            >
              Take the Mirror — it&apos;s free
              <span
                className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#7AAFA0]">
            <span>21 questions</span>
            <span className="text-[#D0DBD8]" aria-hidden="true">
              &middot;
            </span>
            <span>No account needed</span>
            <span className="text-[#D0DBD8]" aria-hidden="true">
              &middot;
            </span>
            <span>Completely private</span>
          </div>
        </div>
      </div>
    </section>
  );
}
