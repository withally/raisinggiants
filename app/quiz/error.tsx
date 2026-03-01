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
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#F5F4F2] px-6">
      <div className="max-w-md text-center">
        <h1
          className="text-3xl sm:text-4xl font-semibold text-[#1A1008] mb-4"
        >
          The quiz hit a snag
        </h1>
        <p className="text-[#8A7A66] leading-relaxed mb-8">
          Something went wrong while loading your quiz. Your previous answers
          may not have been saved. You can start fresh and try again — it only
          takes a few minutes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={handleStartOver}
            className="rounded-full bg-[#0D3D3A] px-6 py-3 text-white font-semibold hover:bg-[#0F4F4B] transition-colors"
          >
            Start over
          </button>
          <Link
            href="/"
            className="text-[#8A7A66] hover:text-[#1A1008] underline underline-offset-4 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
