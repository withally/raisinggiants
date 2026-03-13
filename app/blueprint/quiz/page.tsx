import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { BlueprintQuizShell } from "@/components/quiz/BlueprintQuizShell";

export const metadata: Metadata = {
  title: "The Blueprint Quiz | Kin",
  description:
    "Discover your parenting archetype — your instincts, patterns, and approach to raising your child.",
  openGraph: {
    title: "The Blueprint Quiz | Kin",
    description:
      "Discover your parenting archetype — your instincts, patterns, and approach to raising your child.",
    url: "https://meetkin.com/blueprint/quiz",
    siteName: "Kin",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
};

export default function BlueprintQuizPage() {
  return (
    <NuqsAdapter>
      {/* Suspense boundary required by nuqs useQueryState (calls useSearchParams internally) */}
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7]" />}>
        <BlueprintQuizShell />
      </Suspense>
    </NuqsAdapter>
  );
}
