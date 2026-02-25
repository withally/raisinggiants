import Link from "next/link";

export function SecondaryHero() {
  return (
    <section className="bg-stone-900 py-20 lg:py-28 relative overflow-hidden">
      {/* Decorative warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-amber-900/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-medium mb-6">
          Your starting point
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-stone-100 leading-tight mb-6">
          You&apos;ve always sensed it.
          <br />
          Now you can see it clearly.
        </h2>

        <p className="text-base sm:text-lg text-stone-400 leading-relaxed max-w-xl mx-auto mb-10">
          The Mirror takes 5 minutes. What it reflects may take longer to sit
          with — and that&apos;s exactly the point.
        </p>

        <Link
          href="/quiz"
          className="inline-flex items-center justify-center rounded-full bg-amber-500 px-10 py-4 text-base font-semibold text-stone-900 shadow-lg hover:bg-amber-400 transition-colors min-h-[52px] w-full sm:w-auto"
        >
          Begin The Mirror — it&apos;s free
        </Link>

        <p className="mt-4 text-xs text-stone-500">
          No account needed &middot; No email required to start
        </p>
      </div>
    </section>
  );
}
