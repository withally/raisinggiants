import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { QuizShell } from "@/components/quiz/QuizShell";

export const metadata: Metadata = {
  title: "Take the Quiz | Your Parenting Blueprint",
};

export default function QuizPage() {
  return (
    <NuqsAdapter>
      {/* Suspense boundary required by nuqs useQueryState (calls useSearchParams internally) */}
      <Suspense fallback={<div className="min-h-screen bg-amber-50" />}>
        <QuizShell />
      </Suspense>
    </NuqsAdapter>
  );
}
