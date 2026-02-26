import Link from "next/link";

const features = [
  {
    title: "Personalized Action Plan",
    description: "Steps grounded in your specific archetype and the patterns you carry.",
  },
  {
    title: "Partner Dynamics Guide",
    description: "Understand how your upbringing shapes your relationship with a co-parent.",
  },
  {
    title: "Healing Exercises",
    description: "Research-backed practices tailored to what you inherited.",
  },
];

export function BlueprintCTA() {
  return (
    <section className="bg-stone-900 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Coming Soon badge */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30">
            Coming Soon
          </span>
        </div>

        {/* Section header */}
        <h2
          className="text-3xl sm:text-4xl font-semibold text-stone-100 leading-tight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Go deeper with The Blueprint
        </h2>

        {/* Product description */}
        <p className="text-stone-300 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
          A personalized action plan built from your result — including partner dynamics guidance,
          healing exercises, and research-backed strategies tailored to your archetype.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-stone-800/60 border border-stone-700/50 rounded-xl p-4"
            >
              <p className="text-stone-100 text-sm font-semibold mb-1">{feature.title}</p>
              <p className="text-stone-400 text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/blueprint"
          className="inline-flex items-center justify-center rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-stone-900 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200 min-h-[44px]"
        >
          Get notified when it launches
        </Link>
      </div>
    </section>
  );
}
