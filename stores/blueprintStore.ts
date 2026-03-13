"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ParentStatus = "current-parent" | "expecting" | "planning";

interface BlueprintState {
  currentStep: number;
  answers: Record<string, string>; // questionId -> optionId
  email: string | null;
  sessionId: string | null; // bp_quiz_sessions.id UUID
  direction: "forward" | "back"; // for slide animation direction
  parentStatus: ParentStatus | null;

  // Actions
  setAnswer: (questionId: string, answerId: string) => void;
  setCurrentStep: (step: number) => void;
  goForward: (step: number) => void;
  goBack: (step: number) => void;
  setEmail: (email: string) => void;
  setSessionId: (id: string) => void;
  setParentStatus: (status: ParentStatus) => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  answers: {},
  email: null,
  sessionId: null,
  direction: "forward" as const,
  parentStatus: null,
};

export const useBlueprintStore = create<BlueprintState>()(
  persist(
    (set) => ({
      ...initialState,
      setAnswer: (questionId, answerId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: answerId } })),
      setCurrentStep: (step) => set({ currentStep: step }),
      goForward: (step) => set({ currentStep: step, direction: "forward" }),
      goBack: (step) => set({ currentStep: step, direction: "back" }),
      setEmail: (email) => set({ email }),
      setSessionId: (id) => set({ sessionId: id }),
      setParentStatus: (status) => set({ parentStatus: status }),
      reset: () => set(initialState),
    }),
    {
      name: "blueprint-quiz-session", // localStorage key — separate from Mirror's "quiz-session" [v2-STORE]
      partialize: (state) => {
        const { email, ...rest } = state;
        return rest;
      },
    },
  ),
);
