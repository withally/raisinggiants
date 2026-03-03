import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BlueprintEmailForm } from "@/components/result/BlueprintEmailForm";

export const metadata: Metadata = {
  title: "The Blueprint by Kin — Coming Soon",
  description:
    "A personalized guide to bridge what you inherited with what you want to build. Join the waitlist for The Blueprint by Kin.",
  openGraph: {
    title: "The Blueprint by Kin — Coming Soon",
    description:
      "A personalized guide to bridge what you inherited with what you want to build. Join the waitlist.",
    url: "https://meetkin.com/blueprint",
    siteName: "Kin",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
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
    <>
    <main className="min-h-[100dvh] bg-[#F5F4F2]">
      {/* Back link */}
      <div className="px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-[#8A7A66] hover:text-[#1A1008] transition-colors"
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
          Back to Kin
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-6">
        {/* Coming Soon badge */}
        <div className="mb-6">
          <span className="inline-flex items-center rounded-full bg-[#C8B89A]/40 px-3 py-1 text-xs font-semibold text-[#0D3D3A] ring-1 ring-[#E8E4DF]">
            Coming Soon
          </span>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-semibold text-[#1A1008] leading-tight mb-5"
        >
          The Blueprint
        </h1>

        <p className="text-[#8A7A66] text-lg sm:text-xl leading-relaxed mb-12">
          A personalized guide to bridge what you inherited with what you want to build.
        </p>

        {/* Value props */}
        <div className="space-y-4 mb-12">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="flex gap-4 p-5 bg-white rounded-2xl border border-[#E8E4DF] shadow-sm"
            >
              {/* Check icon */}
              <span className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F4F2]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="text-[#0D3D3A]"
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
                <p className="text-[#1A1008] font-semibold text-sm mb-1">{prop.title}</p>
                <p className="text-[#8A7A66] text-sm leading-relaxed">{prop.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Email capture */}
        <div className="bg-white rounded-2xl border border-[#E8E4DF] shadow-sm px-6 sm:px-8 py-8">
          <h2
            className="text-xl font-semibold text-[#1A1008] mb-2"
          >
            Get notified when it launches.
          </h2>
          <p className="text-[#8A7A66] text-sm leading-relaxed mb-6">
            Leave your email and we&apos;ll reach out as soon as The Blueprint is ready.
          </p>
          <BlueprintEmailForm source="blueprint-page" />
        </div>
      </div>

    </main>
    <Footer />
    </>
  );
}
