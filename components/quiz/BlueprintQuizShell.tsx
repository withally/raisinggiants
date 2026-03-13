"use client";

import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { ParentStatusSelector } from "@/components/quiz/ParentStatusSelector";
import { ProcessingScreen } from "@/components/quiz/ProcessingScreen";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { ff, ffSerif } from "@/lib/landing/palette";
import { getBlueprintQuestions, TOTAL_BLUEPRINT_QUESTIONS } from "@/lib/quiz/blueprint-questions";
import { getBlueprintSectionColor } from "@/lib/quiz/blueprint-section-palette";
import { computeDimensionProfile } from "@/lib/quiz/compute-profile";
import { getResult } from "@/lib/quiz/scoring-matrix";
import type { ParentStatus } from "@/stores/blueprintStore";
import { useBlueprintStore } from "@/stores/blueprintStore";

// Step layout:
// parentStatus === null         -> ParentStatusSelector (no step in URL)
// parentStatus !== null && step === 0  -> Blueprint intro / email screen
// step 1..TOTAL_BLUEPRINT_QUESTIONS   -> question screens (getBlueprintQuestions(status)[step-1])
// step TOTAL_BLUEPRINT_QUESTIONS + 1  -> closing transition screen
// step >= TOTAL_BLUEPRINT_QUESTIONS + 2 -> processing screen

const TOTAL_QUESTIONS = TOTAL_BLUEPRINT_QUESTIONS;

export function BlueprintQuizShell() {
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
    if (useBlueprintStore.persist.hasHydrated()) {
      setHasHydrated(true);
      return;
    }
    const unsubscribe = useBlueprintStore.persist.onFinishHydration(() => {
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

  const direction = useBlueprintStore((s) => s.direction);
  const answers = useBlueprintStore((s) => s.answers);
  const parentStatus = useBlueprintStore((s) => s.parentStatus);

  // On mount: sync nuqs step from Zustand localStorage state (for page refresh resumption)
  useEffect(() => {
    if (!hasHydrated) return;
    const storeStep = useBlueprintStore.getState().currentStep;
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("step") && storeStep > 0) {
      setStep(storeStep);
      setIntroSeen(true);
    }
  }, [hasHydrated, setStep]);

  // Pre-fill email from Mirror localStorage (best-effort — may not be present)
  useEffect(() => {
    if (!hasHydrated) return;
    try {
      const raw = localStorage.getItem("quiz-session");
      if (raw) {
        const parsed = JSON.parse(raw) as { state?: { email?: string } };
        if (parsed.state?.email) {
          setIntroEmail(parsed.state.email);
        }
      }
    } catch {
      // fail silently — Mirror email is a nice-to-have, not required
    }
  }, [hasHydrated]);

  // Parent status selection handler — called by ParentStatusSelector
  const handleParentStatusSelect = useCallback((status: ParentStatus) => {
    useBlueprintStore.getState().setParentStatus(status);
    // Keep on step 0 to show the intro/email screen next
  }, []);

  // Auto-advance handler — called by QuizCard on option tap
  const handleAnswer = useCallback(
    (questionId: string, answerId: string) => {
      if (isTransitioning.current) return;

      const store = useBlueprintStore.getState();
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

    const store = useBlueprintStore.getState();
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
      useBlueprintStore.getState().goBack(prevStep);
    }
  }, [step, setStep]);

  // Intro screen "Begin" handler — validates email, creates session, then starts quiz
  const handleBegin = useCallback(async () => {
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

    const store = useBlueprintStore.getState();

    try {
      const res = await fetch("/api/bp-quiz-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          parentStatus: store.parentStatus,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Blueprint session creation failed:", body);
        setIntroEmailError(
          (body as { detail?: string }).detail || "Something went wrong. Please try again.",
        );
        setIsCreatingSession(false);
        return;
      }

      const { sessionId } = (await res.json()) as { sessionId: string };

      // Store email and session in Zustand
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

  // Closing screen "See my results" handler — triggers quiz completion
  const handleClosingContinue = useCallback(async () => {
    setIsSubmitting(true);
    const store = useBlueprintStore.getState();

    // Compute dimension profile from answers using Blueprint questions
    // parentStatus is guaranteed non-null here: handleClosingContinue is only
    // reachable after the ParentStatusSelector has been completed.
    const status = store.parentStatus ?? "current-parent";
    const questions = getBlueprintQuestions(status);
    const dimensionProfile = computeDimensionProfile(store.answers, questions);
    const result = getResult(dimensionProfile);
    const culturalBackground = store.answers["bp-cultural-background"] ?? null;

    // Show processing screen immediately
    setStep(TOTAL_QUESTIONS + 2);

    try {
      const res = await fetch("/api/bp-quiz-session", {
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
        console.error("Failed to save Blueprint quiz results");
        setIsSubmitting(false);
        return;
      }

      // Minimum 2.5s on processing screen for pacing
      await new Promise<void>((resolve) => setTimeout(resolve, 2500));

      // Redirect to Blueprint result page
      router.push(`/blueprint/result?session=${store.sessionId}`);
    } catch (err) {
      console.error("Failed to save Blueprint quiz results:", err);
      setIsSubmitting(false);
    }
  }, [setStep, router]);

  // Blank during Zustand rehydration
  if (!hasHydrated) return <div className="min-h-screen" />;

  // ---- PARENT STATUS SELECTOR ----
  // Show before intro screen when parentStatus has not been set
  if (parentStatus === null) {
    return <ParentStatusSelector onSelect={handleParentStatusSelect} />;
  }

  // Current question index (step 1 = questions[0], step 2 = questions[1], etc.)
  const questionIndex = step - 1;
  const isQuestionStep = step >= 1 && step <= TOTAL_QUESTIONS;

  // Lazy-evaluated questions for the resolved parent status
  const questions = getBlueprintQuestions(parentStatus);

  // Section header detection
  const showSectionHeader =
    isQuestionStep &&
    (questionIndex === 0 ||
      questions[questionIndex]?.section !== questions[questionIndex - 1]?.section);

  const currentAnswer =
    isQuestionStep && questions[questionIndex]
      ? (answers[questions[questionIndex].id] ?? null)
      : null;

  // ---- INTRO SCREEN (step 0) ----
  if (step === 0 && !introSeen) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#FAFAF7] relative overflow-hidden">
        {/* Teal-tinted gradient wash */}
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
            Let&apos;s explore your{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: "#4A1942" }}>
              parenting instincts
            </span>
          </h1>
          <p
            className="text-base sm:text-lg leading-relaxed mb-6"
            style={{ fontFamily: ff, fontWeight: 400, color: "#777" }}
          >
            You&apos;ll reflect on questions about how you parent (or imagine parenting). There are
            no right answers.
          </p>
          <p className="text-sm mb-6" style={{ fontFamily: ff, color: "#777" }}>
            Takes about 5 minutes
          </p>

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
              aria-describedby={introEmailError ? "bp-intro-email-error" : undefined}
              className="w-full text-base py-3 px-4 rounded-2xl border border-[#E8E4DF] bg-white text-[#1A1A1A] placeholder:text-[#BBB] focus:outline-none focus:ring-2 focus:ring-[#002833]/20 focus:border-[#002833] transition-colors"
            />
            {introEmailError && (
              <p id="bp-intro-email-error" className="mt-2 text-sm text-red-500" role="alert">
                {introEmailError}
              </p>
            )}
            <p className="mt-2 text-xs text-[#AAA]" style={{ fontFamily: ff }}>
              We&apos;ll save your results and send you a link so you can come back to them whenever
              you need.
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
        {/* Teal-tinted gradient wash */}
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
            Your instincts tell{" "}
            <span style={{ fontFamily: ffSerif, fontStyle: "italic", color: "#4A1942" }}>
              a story
            </span>
            .
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ fontFamily: ff, fontWeight: 400, color: "#777" }}
          >
            Your answers paint a picture of how you approach parenting. Let&apos;s see what they
            reveal.
          </p>
          <button
            type="button"
            onClick={handleClosingContinue}
            disabled={isSubmitting}
            className="rounded-full bg-[#002833] text-[#F0EDE8] px-8 py-3 text-base font-semibold hover:bg-[#003d4d] transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_12px_rgba(0,0,0,0.04)] disabled:opacity-60"
          >
            {isSubmitting ? "Preparing..." : "See my results"}
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
  const currentSection =
    isQuestionStep && questions[questionIndex] ? questions[questionIndex].section : "daily-moments";
  const sectionColor = getBlueprintSectionColor(currentSection);

  return (
    <div className="relative overflow-hidden bg-[#FAFAF7]">
      {/* Teal-tinted gradient wash */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 60% 0%, rgba(178,229,216,0.18) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 30% 5%, rgba(196,235,224,0.12) 0%, transparent 60%)",
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
      {isQuestionStep && questions[questionIndex] && (
        <div
          key={step}
          className={direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left"}
        >
          <QuizCard
            question={questions[questionIndex]}
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
