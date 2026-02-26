import type { Metadata } from "next";
import Link from "next/link";
import { BlueprintEmailForm } from "@/components/result/BlueprintEmailForm";

export const metadata: Metadata = {
  title: "The Blueprint — Coming Soon | Raising Giants",
  description:
    "A personalized guide to bridge what you inherited with what you want to build. Join the waitlist for The Blueprint from Raising Giants.",
};

const valueProps = [
  {
    title: "Personalized Action Plan",
    description:
      "Concrete steps grounded in your archetype — not generic advice, but work tailored to the patterns you carry.",
  },
  {
    title: "Partner Dynamics Guide",
    description:
      "Understand how your upbringing shapes your relationship with a co-parent, and where alignment or friction is likely to emerge.",
  },
  {
    title: "Healing Exercises",
    description:
      "Research-backed practices — drawn from Gottman, Siegel, and others — matched to what you specifically inherited.",
  },
];

export default function BlueprintPage() {
  return (
    <main className="min-h-[100dvh] bg-amber-50">
      {/* Back link */}
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M9 2L4 7l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to Raising Giants
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-6">
        {/* Coming Soon badge */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-amber-200/80 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-300/60">
            Coming Soon
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-semibold text-stone-900 leading-tight mb-5"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The Blueprint
        </h1>

        <p className="text-stone-600 text-lg sm:text-xl leading-relaxed mb-12">
          A personalized guide to bridge what you inherited with what you want to build.
        </p>

        {/* Value props */}
        <div className="space-y-4 mb-12">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="flex gap-4 p-5 bg-white rounded-2xl border border-amber-100 shadow-sm"
            >
              {/* Check icon */}
              <span className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="text-amber-700"
                >
                  <path
                    d="M2 6l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-stone-800 font-semibold text-sm mb-1">{prop.title}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm px-6 sm:px-8 py-8">
          <h2
            className="text-xl font-semibold text-stone-800 mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Get notified when it launches.
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed mb-6">
            Leave your email and we&apos;ll reach out as soon as The Blueprint is ready.
          </p>
          <BlueprintEmailForm source="blueprint-page" />
        </div>
      </div>

      {/* Footer spacer */}
      <div className="h-16" />
    </main>
  );
}
