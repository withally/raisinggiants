"use client";

import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useRef, useState } from "react";
import { EmailCaptureScreen } from "@/components/quiz/EmailCaptureScreen";
import { ProcessingScreen } from "@/components/quiz/ProcessingScreen";
import { QuizCard } from "@/components/quiz/QuizCard";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { computeDimensionProfile } from "@/lib/quiz/compute-profile";
import { QUESTIONS } from "@/lib/quiz/questions";
import { getResult } from "@/lib/quiz/scoring-matrix";
import { createClient } from "@/lib/supabase/client";
import { useQuizStore } from "@/stores/quizStore";

// Zustand persist localStorage key: "quiz-session" (defined in stores/quizStore.ts)
const TOTAL_QUESTIONS = QUESTIONS.length;

export function QuizShell() {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initError, setInitError] = useState(false);
  const sessionInitialized = useRef(false);

  // SSR-safe Zustand hydration detection
  // useQuizStore.persist.hasHydrated() is not available during SSR — use useEffect
  useEffect(() => {
    // Synchronous check: if already hydrated before this effect runs
    if (useQuizStore.persist.hasHydrated()) {
      setHasHydrated(true);
      return;
    }
    // Subscribe to hydration completion for slower devices
    const unsubscribe = useQuizStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });
    return unsubscribe;
  }, []);

  // nuqs step synchronization — history:push enables browser Back button (QUIZ-03)
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

  // On mount: sync nuqs step from Zustand localStorage state (for page refresh resumption)
  useEffect(() => {
    if (!hasHydrated) return;
    const storeStep = useQuizStore.getState().currentStep;
    // Only sync if URL has no explicit step param
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("step") && storeStep > 0) {
      setStep(storeStep);
    }
  }, [hasHydrated, setStep]);

  // Anonymous Supabase session initialization
  useEffect(() => {
    if (!hasHydrated) return;
    if (sessionInitialized.current) return;
    sessionInitialized.current = true;

    async function initSession() {
      const store = useQuizStore.getState();
      const supabase = createClient();

      if (store.userId) {
        // Returning user — verify session is still valid
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          // Session expired — create a fresh anonymous session
          const {
            data: { user },
          } = await supabase.auth.signInAnonymously();

          if (!user) {
            setInitError(true);
            return;
          }

          store.setUserId(user.id);

          const { data: newSession } = await supabase
            .from("quiz_sessions")
            .insert({ user_id: user.id, status: "in_progress" })
            .select("id")
            .single();

          if (newSession) store.setSessionId(newSession.id);
        }
        return;
      }

      // First-time user — sign in anonymously
      const {
        data: { user },
      } = await supabase.auth.signInAnonymously();

      if (!user) {
        setInitError(true);
        return;
      }

      store.setUserId(user.id);

      const { data: sessionRow } = await supabase
        .from("quiz_sessions")
        .insert({ user_id: user.id, status: "in_progress" })
        .select("id")
        .single();

      if (sessionRow) store.setSessionId(sessionRow.id);
    }

    initSession().catch((err) => {
      console.error("Session init failed:", err);
      setInitError(true);
    });
  }, [hasHydrated]);

  // Auto-advance handler — called by QuizCard on option tap
  const handleAnswer = useCallback(
    (questionId: string, answerId: string) => {
      const store = useQuizStore.getState();
      store.setAnswer(questionId, answerId);

      // 300ms delay for visible selected state before advancing
      setTimeout(() => {
        const nextStep = step + 1;
        setStep(nextStep);
        store.goForward(nextStep);
      }, 300);
    },
    [step, setStep],
  );

  // Back button handler — navigates to previous question
  const handleBack = useCallback(() => {
    if (step > 0) {
      const prevStep = step - 1;
      setStep(prevStep);
      useQuizStore.getState().goBack(prevStep);
    }
  }, [step, setStep]);

  // Quiz completion — called by EmailCaptureScreen on form submit
  const onQuizComplete = useCallback(
    async (email: string) => {
      setIsSubmitting(true);
      const store = useQuizStore.getState();
      store.setEmail(email);

      // Step 1: Compute dimension profile from answers
      const dimensionProfile = computeDimensionProfile(store.answers);

      // Step 2: Get primary archetype
      const result = getResult(dimensionProfile);

      // Step 3: Extract cultural background (metadata, not a dimension)
      const culturalBackground = store.answers["q-cultural-background"] ?? null;

      // Step 4: Show processing screen immediately
      setStep(TOTAL_QUESTIONS + 1);

      // Step 5: Persist completed quiz data to quiz_sessions
      const supabase = createClient();
      const { error } = await supabase
        .from("quiz_sessions")
        .update({
          status: "completed",
          answers: store.answers,
          dimension_scores: dimensionProfile,
          archetype_id: result.primary,
          cultural_background: culturalBackground,
          email: email,
          completed_at: new Date().toISOString(),
        })
        .eq("id", store.sessionId);

      if (error) {
        console.error("Failed to save quiz results:", error);
        setIsSubmitting(false);
        return;
      }

      // Step 6: Minimum 2.5s on processing screen for emotional pacing
      await new Promise<void>((resolve) => setTimeout(resolve, 2500));

      // Step 7: Redirect to result page (do NOT reset store — Phase 3 may read localStorage)
      router.push(`/result?session=${store.sessionId}`);
    },
    [setStep, router],
  );

  // Blank during Zustand rehydration — prevents flash of step 0 for returning users
  if (!hasHydrated) return <div className="min-h-screen" />;

  // Error state — session init failed
  if (initError) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-amber-50">
        <div className="max-w-lg text-center">
          <p className="text-stone-700 mb-4">
            Something went wrong starting your quiz. Please try again.
          </p>
          <button
            type="button"
            onClick={() => {
              setInitError(false);
              sessionInitialized.current = false;
            }}
            className="rounded-full bg-amber-500 px-6 py-3 text-white font-semibold hover:bg-amber-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Section header detection: show header when entering a new section
  const showSectionHeader = step === 0 || QUESTIONS[step]?.section !== QUESTIONS[step - 1]?.section;

  // Current answer for the active question (for resumption state)
  const currentAnswer = QUESTIONS[step]
    ? (useQuizStore.getState().answers[QUESTIONS[step].id] ?? null)
    : null;

  // Rendering: question screens, email capture, or processing
  return (
    <div className="relative overflow-hidden">
      {/* Fixed progress bar at top of screen */}
      {step < TOTAL_QUESTIONS && <QuizProgress current={step} total={TOTAL_QUESTIONS} />}

      {/* Back button — hidden on step 0 and on post-quiz screens */}
      {step > 0 && step < TOTAL_QUESTIONS && (
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go to previous question"
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-sm border border-gray-100 text-stone-600 hover:text-stone-900 hover:bg-amber-50 transition-colors"
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
      {step < TOTAL_QUESTIONS ? (
        <div
          key={step}
          className={direction === "forward" ? "animate-slide-in-right" : "animate-slide-in-left"}
        >
          <QuizCard
            question={QUESTIONS[step]}
            currentAnswer={currentAnswer}
            onAnswer={handleAnswer}
            showSectionHeader={showSectionHeader}
          />
        </div>
      ) : step === TOTAL_QUESTIONS ? (
        <EmailCaptureScreen onSubmit={onQuizComplete} isSubmitting={isSubmitting} />
      ) : (
        <ProcessingScreen />
      )}
    </div>
  );
}
