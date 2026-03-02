import Link from "next/link";
import { ff, ffSerif, p, grad, shadow } from "@/lib/landing/palette";

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
    <section className="px-4 sm:px-6 py-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="rounded-3xl px-8 sm:px-12 py-10 sm:py-14"
          style={{ background: grad.blue.dark, boxShadow: shadow.cardDark }}
        >
          {/* Coming Soon pill */}
          <div className="mb-6">
            <span
              className="inline-flex items-center rounded-full px-4 py-1.5 text-xs"
              style={{
                fontFamily: ff,
                fontWeight: 600,
                background: `${p.butter.light}20`,
                color: p.butter.light,
              }}
            >
              Coming Soon
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-3xl sm:text-4xl leading-tight mb-4"
            style={{ fontFamily: ff, fontWeight: 800, color: "#F0EDE8" }}
          >
            Go deeper with The{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: p.butter.light }}>
              Blueprint
            </span>
          </h2>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
            style={{ fontFamily: ff, fontWeight: 400, color: "#F0EDE8", opacity: 0.65 }}
          >
            A personalized action plan built from your result — including partner dynamics guidance,
            healing exercises, and research-backed strategies tailored to your archetype.
          </p>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <p
                  className="text-sm mb-1"
                  style={{ fontFamily: ff, fontWeight: 600, color: "#F0EDE8" }}
                >
                  {feature.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: ff, fontWeight: 400, color: "#F0EDE8", opacity: 0.5 }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <Link
            href="/blueprint"
            className="inline-flex items-center justify-center rounded-full px-8 py-3 text-sm min-h-[44px] transition-all duration-200 hover:shadow-lg"
            style={{
              fontFamily: ff,
              fontWeight: 600,
              background: p.butter.light,
              color: p.blue.dark,
              boxShadow: shadow.button,
            }}
          >
            Get notified when it launches
          </Link>
        </div>
      </div>
    </section>
  );
}
