"use client";

import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProcessingScreen } from "@/components/quiz/ProcessingScreen";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { computeDimensionProfile } from "@/lib/quiz/compute-profile";
import { ff, ffSerif } from "@/lib/landing/palette";
import { QUESTIONS } from "@/lib/quiz/questions";
import { getResult } from "@/lib/quiz/scoring-matrix";
import { getSectionColor } from "@/lib/quiz/section-palette";
import { trackEmailCapture, trackQuizComplete } from "@/lib/analytics";
import { getUTMParams } from "@/lib/utm";
import { useQuizStore } from "@/stores/quizStore";

const TOTAL_QUESTIONS = QUESTIONS.length;

// Step layout:
// step 0 = intro screen (with email capture)
// step 1..TOTAL_QUESTIONS = question screens (QUESTIONS[step - 1])
// step TOTAL_QUESTIONS + 1 = closing/transition screen
// step TOTAL_QUESTIONS + 2 = processing

export function QuizShell() {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [introSeen, setIntroSeen] = useState(false);
  const [introEmail, setIntroEmail] = useState("");
  const [introEmailError, setIntroEmailError] = useState("");
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const isTransitioning = useRef(false);

  // SSR-safe Zustand hydration detection
  useEffect(() => {
    if (useQuizStore.persist.hasHydrated()) {
      setHasHydrated(true);
      return;
    }
    const unsubscribe = useQuizStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    return unsubscribe;
  }, []);

  // nuqs step synchronization — history:push enables browser Back button
  const [step, setStep] = useQueryState("step", {
    parse: (v) => {
      const parsed = parseInt(v, 10);
      return Number.isNaN(parsed) ? 0 : parsed;
    },
    serialize: String,
    defaultValue: 0,
    history: "push",
  });

  const direction = useQuizStore((s) => s.direction);
  const answers = useQuizStore((s) => s.answers);

  // On mount: sync nuqs step from Zustand localStorage state (for page refresh resumption)
  useEffect(() => {
    if (!hasHydrated) return;
    const storeStep = useQuizStore.getState().currentStep;
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("step") && storeStep > 0) {
      setStep(storeStep);
      setIntroSeen(true);
    }
  }, [hasHydrated, setStep]);

  // Auto-advance handler — called by QuizCard on option tap
  const handleAnswer = useCallback(
    (questionId: string, answerId: string) => {
      if (isTransitioning.current) return;

      const store = useQuizStore.getState();
      store.setAnswer(questionId, answerId);

      isTransitioning.current = true;
      setTimeout(() => {
        const nextStep = step + 1;
        setStep(nextStep);
        store.goForward(nextStep);
        isTransitioning.current = false;
      }, 300);
    },
    [step, setStep],
  );

  // Skip handler — advance without recording an answer
  const handleSkip = useCallback(() => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;

    const store = useQuizStore.getState();
    const nextStep = step + 1;
    setStep(nextStep);
    store.goForward(nextStep);
    isTransitioning.current = false;
  }, [step, setStep]);

  // Back button handler — navigates to previous question
  const handleBack = useCallback(() => {
    if (step > 1) {
      const prevStep = step - 1;
      setStep(prevStep);
      useQuizStore.getState().goBack(prevStep);
    }
  }, [step, setStep]);

  // Intro screen "Begin" handler — validates email, creates session, then starts quiz
  const handleBegin = useCallback(async () => {
    // Validate email
    const trimmed = introEmail.trim();
    if (!trimmed) {
      setIntroEmailError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setIntroEmailError("Please enter a valid email");
      return;
    }

    setIntroEmailError("");
    setIsCreatingSession(true);

    try {
      // Create quiz session via API route
      const res = await fetch("/api/quiz-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, ...getUTMParams() }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Quiz session creation failed:", body);
        setIntroEmailError(body.detail || "Something went wrong. Please try again.");
        setIsCreatingSession(false);
        return;
      }

      const { sessionId } = await res.json();
      trackEmailCapture("quiz_start");

      // Store email and session in Zustand
      const store = useQuizStore.getState();
      store.setEmail(trimmed);
      store.setSessionId(sessionId);

      // Advance to first question
      setIntroSeen(true);
      setStep(1);
      store.goForward(1);
    } catch {
      setIntroEmailError("Something went wrong. Please try again.");
    } finally {
      setIsCreatingSession(false);
    }
  }, [introEmail, setStep]);

  // Closing screen "Continue" handler — triggers quiz completion
  const handleClosingContinue = useCallback(async () => {
    setIsSubmitting(true);
    const store = useQuizStore.getState();

    // Compute dimension profile from answers
    const dimensionProfile = computeDimensionProfile(store.answers);
    const result = getResult(dimensionProfile);
    const culturalBackground = store.answers["q-cultural-background"] ?? null;

    // Show processing screen immediately
    setStep(TOTAL_QUESTIONS + 2);

    try {
      // Save results via API route
      const res = await fetch("/api/quiz-session", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: store.sessionId,
          answers: store.answers,
          dimensionScores: dimensionProfile,
          archetypeId: result.primary,
          culturalBackground,
        }),
      });

      if (!res.ok) {
        console.error("Failed to save quiz results");
        setIsSubmitting(false);
        return;
      }

      trackQuizComplete(result.primary);

      // Minimum 2.5s on processing screen for emotional pacing
      await new Promise<void>((resolve) => setTimeout(resolve, 2500));

      // Redirect to result page
      router.push(`/result?session=${store.sessionId}`);
    } catch (err) {
      console.error("Failed to save quiz results:", err);
      setIsSubmitting(false);
    }
  }, [setStep, router]);

  // Blank during Zustand rehydration
  if (!hasHydrated) return <div className="min-h-screen" />;

  // Current question index (step 1 = QUESTIONS[0], step 2 = QUESTIONS[1], etc.)
  const questionIndex = step - 1;
  const isQuestionStep = step >= 1 && step <= TOTAL_QUESTIONS;

  // Section header detection
  const showSectionHeader =
    isQuestionStep &&
    (questionIndex === 0 ||
      QUESTIONS[questionIndex]?.section !== QUESTIONS[questionIndex - 1]?.section);

  const currentAnswer =
    isQuestionStep && QUESTIONS[questionIndex]
      ? (answers[QUESTIONS[questionIndex].id] ?? null)
      : null;

  // ---- INTRO SCREEN (step 0) ----
  if (step === 0 && !introSeen) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#FAFAF7] relative overflow-hidden">
        {/* Subtle gradient wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(254,244,172,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 5%, rgba(238,192,218,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-lg text-center animate-fade-up relative z-10">
          <h1
            className="text-3xl sm:text-4xl text-[#1A1A1A] mb-4 leading-snug"
            style={{ fontFamily: ff, fontWeight: 800 }}
          >
            Before we{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: "#4A1942" }}>
              begin
            </span>
          </h1>
          <p className="text-base sm:text-lg leading-relaxed mb-6" style={{ fontFamily: ff, fontWeight: 400, color: "#777" }}>
            You&apos;ll reflect on 21 moments from your childhood. There are no right
            answers&nbsp;&mdash; only your experience.
          </p>
          <p className="text-sm mb-6" style={{ fontFamily: ff, color: "#777" }}>Takes about 5 minutes</p>

          {/* Email input */}
          <div className="mb-4 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoCapitalize="none"
              value={introEmail}
              onChange={(e) => {
                setIntroEmail(e.target.value);
                if (introEmailError) setIntroEmailError("");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBegin();
              }}
              aria-label="Email address"
              aria-describedby={introEmailError ? "intro-email-error" : undefined}
              className="w-full text-base py-3 px-4 rounded-2xl border border-[#E8E4DF] bg-white text-[#1A1A1A] placeholder:text-[#BBB] focus:outline-none focus:ring-2 focus:ring-[#002833]/20 focus:border-[#002833] transition-colors"
            />
            {introEmailError && (
              <p id="intro-email-error" className="mt-2 text-sm text-red-500" role="alert">
                {introEmailError}
              </p>
            )}
            <p className="mt-2 text-xs text-[#AAA]" style={{ fontFamily: ff }}>
              We&apos;ll save your results and send you a link so you can come back to them whenever you need.
            </p>
          </div>

          <button
            type="button"
            onClick={handleBegin}
            disabled={isCreatingSession}
            className="rounded-full bg-[#002833] text-[#F0EDE8] px-8 py-3 text-base font-semibold hover:bg-[#003d4d] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] disabled:opacity-60"
          >
            {isCreatingSession ? "Starting..." : "Begin"}
          </button>
        </div>
      </div>
    );
  }

  // If somehow on step 0 but intro was seen (e.g. browser back), push to step 1
  if (step === 0 && introSeen) {
    setStep(1);
    return <div className="min-h-screen bg-[#FAFAF7]" />;
  }

  // ---- CLOSING / TRANSITION SCREEN (after last question) ----
  if (step === TOTAL_QUESTIONS + 1) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#FAFAF7] relative overflow-hidden">
        {/* Subtle gradient wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(254,244,172,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 5%, rgba(238,192,218,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-lg text-center animate-fade-up relative z-10">
          <h2
            className="text-2xl sm:text-3xl text-[#1A1A1A] mb-4 leading-snug"
            style={{ fontFamily: ff, fontWeight: 800 }}
          >
            Thank you for{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: "#4A1942" }}>
              reflecting
            </span>
            {" "}on this.
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ fontFamily: ff, fontWeight: 400, color: "#777" }}>
            Your answers paint a meaningful picture. Let&apos;s see what they reveal.
          </p>
          <button
            type="button"
            onClick={handleClosingContinue}
            disabled={isSubmitting}
            className="rounded-full bg-[#002833] text-[#F0EDE8] px-8 py-3 text-base font-semibold hover:bg-[#003d4d] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] disabled:opacity-60"
          >
            {isSubmitting ? "Preparing..." : "Continue"}
          </button>
        </div>
      </div>
    );
  }

  // ---- PROCESSING SCREEN ----
  if (step >= TOTAL_QUESTIONS + 2) {
    return <ProcessingScreen />;
  }

  // ---- QUESTION SCREENS ----
  const currentSection = isQuestionStep && QUESTIONS[questionIndex]
    ? QUESTIONS[questionIndex].section
    : "about-you";
  const sectionColor = getSectionColor(currentSection);

  return (
    <div className="relative overflow-hidden bg-[#FAFAF7]">
      {/* Subtle gradient wash — matches landing page */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(254,244,172,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 5%, rgba(238,192,218,0.12) 0%, transparent 60%)",
        }}
      />

      {/* Fixed progress bar at top of screen */}
      {isQuestionStep && (
        <QuizProgress
          current={questionIndex}
          total={TOTAL_QUESTIONS}
          accentLight={sectionColor.light}
          accentDark={sectionColor.dark}
        />
      )}

      {/* Back button — hidden on step 1 (first question) and on post-quiz screens */}
      {step > 1 && isQuestionStep && (
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go to previous question"
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-sm border border-[#E8E4DF] text-[#777] hover:text-[#1A1A1A] hover:bg-[#FAFAF7] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      )}

      {/* Animated slide wrapper */}
      {isQuestionStep && QUESTIONS[questionIndex] && (
        <div
          key={step}
          className={direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left"}
        >
          <QuizCard
            question={QUESTIONS[questionIndex]}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
            onSkip={handleSkip}
            showSectionHeader={showSectionHeader}
          />
        </div>
      )}
    </div>
  );
}
