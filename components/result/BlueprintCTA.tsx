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
    <section className="bg-[#0D3D3A] py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-6">
        {/* Coming Soon badge */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-[#C4892A]/20 px-3 py-1 text-xs font-semibold text-[#C4892A] ring-1 ring-[#C4892A]/30">
            Coming Soon
          </span>
        </div>

        {/* Section header */}
        <h2
          className="text-3xl sm:text-4xl font-semibold text-[#F5F4F2] leading-tight mb-4"
        >
          Go deeper with The Blueprint
        </h2>

        {/* Product description */}
        <p className="text-[#F5F4F2]/80 text-base sm:text-lg leading-relaxed mb-10 max-w-xl">
          A personalized action plan built from your result — including partner dynamics guidance,
          healing exercises, and research-backed strategies tailored to your archetype.
        </p>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#0F4F4B]/60 border border-[#7A9E9C]/30 rounded-xl p-4"
            >
              <p className="text-[#F5F4F2] text-sm font-semibold mb-1">{feature.title}</p>
              <p className="text-[#7A9E9C] text-xs leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/blueprint"
          className="inline-flex items-center justify-center rounded-full bg-[#C4892A] px-8 py-3 text-sm font-semibold text-white hover:bg-[#D4993A] hover:shadow-lg hover:shadow-[#C4892A]/20 transition-all duration-200 min-h-[44px]"
        >
          Get notified when it launches
        </Link>
      </div>
    </section>
  );
}
