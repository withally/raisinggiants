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

// Step layout:
// step 0 = intro screen
// step 1..TOTAL_QUESTIONS = question screens (QUESTIONS[step - 1])
// step TOTAL_QUESTIONS + 1 = closing/transition screen
// step TOTAL_QUESTIONS + 2 = email capture
// step TOTAL_QUESTIONS + 3 = processing

export function QuizShell() {
  const router = useRouter();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initError, setInitError] = useState(false);
  const [introSeen, setIntroSeen] = useState(false);
  const sessionInitialized = useRef(false);
  const isTransitioning = useRef(false);

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

  // Fix #8: proper Zustand selector for answers (no stale reads)
  const answers = useQuizStore((s) => s.answers);

  // On mount: sync nuqs step from Zustand localStorage state (for page refresh resumption)
  useEffect(() => {
    if (!hasHydrated) return;
    const storeStep = useQuizStore.getState().currentStep;
    // Only sync if URL has no explicit step param
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("step") && storeStep > 0) {
      setStep(storeStep);
      // If returning user has progressed past intro, mark it as seen
      setIntroSeen(true);
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
      // Fix #7: guard against double-tap race condition
      if (isTransitioning.current) return;

      const store = useQuizStore.getState();
      store.setAnswer(questionId, answerId);

      // 300ms delay for visible selected state before advancing
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
      // Don't go back to step 0 (intro) once it's been seen
      const prevStep = step - 1;
      setStep(prevStep);
      useQuizStore.getState().goBack(prevStep);
    }
  }, [step, setStep]);

  // Intro screen "Begin" handler
  const handleBegin = useCallback(() => {
    setIntroSeen(true);
    const nextStep = 1;
    setStep(nextStep);
    useQuizStore.getState().goForward(nextStep);
  }, [setStep]);

  // Closing screen "Continue" handler — advance to email capture
  const handleClosingContinue = useCallback(() => {
    const nextStep = TOTAL_QUESTIONS + 2;
    setStep(nextStep);
    useQuizStore.getState().goForward(nextStep);
  }, [setStep]);

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
      setStep(TOTAL_QUESTIONS + 3);

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
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#F5F4F2]">
        <div className="max-w-lg text-center">
          <p className="text-[#1A1008] mb-4">
            Something went wrong starting your quiz. Please try again.
          </p>
          <button
            type="button"
            onClick={() => {
              setInitError(false);
              sessionInitialized.current = false;
            }}
            className="rounded-full bg-[#0D3D3A] px-6 py-3 text-white font-semibold hover:bg-[#0F4F4B] transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Current question index (step 1 = QUESTIONS[0], step 2 = QUESTIONS[1], etc.)
  const questionIndex = step - 1;
  const isQuestionStep = step >= 1 && step <= TOTAL_QUESTIONS;

  // Section header detection: show header when entering a new section
  const showSectionHeader =
    isQuestionStep &&
    (questionIndex === 0 ||
      QUESTIONS[questionIndex]?.section !== QUESTIONS[questionIndex - 1]?.section);

  // Fix #8: current answer from Zustand selector (reactive, not stale)
  const currentAnswer =
    isQuestionStep && QUESTIONS[questionIndex]
      ? (answers[QUESTIONS[questionIndex].id] ?? null)
      : null;

  // ---- INTRO SCREEN (step 0) ----
  if (step === 0 && !introSeen) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#F5F4F2]">
        <div className="max-w-lg text-center animate-fade-up">
          <h1
            className="text-3xl sm:text-4xl font-semibold text-[#1A1008] mb-4 leading-snug"
          >
            Before we begin
          </h1>
          <p className="text-[#8A7A66] text-base sm:text-lg leading-relaxed mb-6">
            You&apos;ll reflect on 21 moments from your childhood. There are no right
            answers&nbsp;&mdash; only your experience.
          </p>
          <p className="text-sm text-[#8A7A66] mb-8">Takes about 5 minutes</p>
          <button
            type="button"
            onClick={handleBegin}
            className="rounded-full bg-[#0D3D3A] text-[#F5F4F2] px-8 py-3 text-base font-semibold hover:bg-[#0F4F4B] transition-colors"
          >
            Begin
          </button>
        </div>
      </div>
    );
  }

  // If somehow on step 0 but intro was seen (e.g. browser back), push to step 1
  if (step === 0 && introSeen) {
    setStep(1);
    return <div className="min-h-screen bg-[#F5F4F2]" />;
  }

  // ---- CLOSING / TRANSITION SCREEN (after last question, before email) ----
  if (step === TOTAL_QUESTIONS + 1) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#F5F4F2]">
        <div className="max-w-lg text-center animate-fade-up">
          <h2
            className="text-2xl sm:text-3xl font-semibold text-[#1A1008] mb-4 leading-snug"
          >
            Thank you for reflecting on this.
          </h2>
          <p className="text-[#8A7A66] text-base leading-relaxed mb-8">
            Your answers paint a meaningful picture. Let&apos;s see what they reveal.
          </p>
          <button
            type="button"
            onClick={handleClosingContinue}
            className="rounded-full bg-[#0D3D3A] text-[#F5F4F2] px-8 py-3 text-base font-semibold hover:bg-[#0F4F4B] transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  // ---- EMAIL CAPTURE SCREEN ----
  if (step === TOTAL_QUESTIONS + 2) {
    return <EmailCaptureScreen onSubmit={onQuizComplete} isSubmitting={isSubmitting} />;
  }

  // ---- PROCESSING SCREEN ----
  if (step >= TOTAL_QUESTIONS + 3) {
    return <ProcessingScreen />;
  }

  // ---- QUESTION SCREENS ----
  return (
    <div className="relative overflow-hidden bg-[#F5F4F2]">
      {/* Fixed progress bar at top of screen */}
      {isQuestionStep && <QuizProgress current={questionIndex} total={TOTAL_QUESTIONS} />}

      {/* Back button — hidden on step 1 (first question) and on post-quiz screens */}
      {step > 1 && isQuestionStep && (
        <button
          type="button"
          onClick={handleBack}
          aria-label="Go to previous question"
          className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white shadow-sm border border-[#E8E4DF] text-[#8A7A66] hover:text-[#1A1008] hover:bg-[#F5F4F2] transition-colors"
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
