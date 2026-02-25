"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useQuizStore } from "@/stores/quizStore";

export default function QuizError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Quiz error:", error);
  }, [error]);

  const handleStartOver = () => {
    useQuizStore.getState().reset();
    reset();
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-amber-50 px-6">
      <div className="max-w-md text-center">
        <h1
          className="text-3xl sm:text-4xl font-semibold text-stone-900 mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          The quiz hit a snag
        </h1>
        <p className="text-stone-600 leading-relaxed mb-8">
          Something went wrong while loading your quiz. Your previous answers
          may not have been saved. You can start fresh and try again — it only
          takes a few minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStartOver}
            className="rounded-full bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Start over
          </button>
          <Link
            href="/"
            className="text-stone-500 hover:text-stone-700 underline underline-offset-4 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
