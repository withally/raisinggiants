import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { QuizShell } from "@/components/quiz/QuizShell";

export const metadata: Metadata = {
  title: "Take the Quiz | Your Parenting Blueprint",
  description:
    "Answer 21 reflective questions to uncover the parenting patterns you inherited. Free, private, and research-informed.",
  openGraph: {
    title: "Take the Quiz | Your Parenting Blueprint",
    description:
      "Answer 21 reflective questions to uncover the parenting patterns you inherited. Free, private, and research-informed.",
    url: "https://meetkin.com/quiz",
    siteName: "Kin",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
};

export default function QuizPage() {
  return (
    <NuqsAdapter>
      {/* Suspense boundary required by nuqs useQueryState (calls useSearchParams internally) */}
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAF7]" />}>
        <QuizShell />
      </Suspense>
    </NuqsAdapter>
  );
}
