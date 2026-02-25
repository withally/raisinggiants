import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-amber-50 overflow-hidden flex flex-col justify-center">
      {/* Decorative background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #92400e 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Decorative warm circle — desktop only */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-100 opacity-60 translate-x-1/3 -translate-y-1/4 hidden lg:block"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 lg:py-32">
        {/* Eyebrow label */}
        <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-8">
          Raising Giants — The Mirror
        </p>

        {/* Main headline — display font */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold text-stone-900 leading-[1.05] mb-6 max-w-3xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The way you were raised
          <br className="hidden sm:block" /> is still{" "}
          <em className="italic text-amber-600">shaping</em> you.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-stone-600 leading-relaxed max-w-2xl mb-4">
          Every parent carries the echoes of their own upbringing — patterns, tendencies, and quiet
          beliefs absorbed long before they held their own child for the first time.
        </p>

        <p className="text-base sm:text-lg text-stone-500 leading-relaxed max-w-xl mb-10">
          Grounded in decades of research from the world&apos;s leading parenting scientists, The
          Mirror helps you see those patterns clearly — and understand where they came from.
        </p>

        {/* CTA group */}
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
          <Link
            href="/quiz"
            className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-4 text-base font-semibold text-amber-50 shadow-md hover:bg-stone-700 hover:shadow-lg transition-all duration-200 min-h-[52px] w-full sm:w-auto"
          >
            Begin your Mirror — it&apos;s free
          </Link>
          <p className="text-sm text-stone-400 text-center sm:text-left sm:ml-2 self-center">
            21 questions &middot; 5 minutes &middot; No account needed
          </p>
        </div>

        {/* Research badge */}
        <div className="mt-16 pt-8 border-t border-amber-200 flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
          <p className="text-xs text-stone-400 uppercase tracking-wider font-medium shrink-0 mt-0.5">
            Informed by
          </p>
          <p className="text-sm text-stone-500 leading-snug">
            Baumrind &middot; Gottman &middot; Siegel &middot; Ainsworth &middot; Kennedy &middot;
            Tsabary &middot; van der Kolk &middot; Rohner
          </p>
        </div>
      </div>
    </section>
  );
}
