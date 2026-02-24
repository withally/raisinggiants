'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
  currentStep: number
  answers: Record<string, string> // questionId -> optionId
  email: string | null
  sessionId: string | null // quiz_sessions.id UUID
  userId: string | null // auth.users.id (anonymous)
  direction: 'forward' | 'back' // for slide animation direction

  // Actions
  setAnswer: (questionId: string, answerId: string) => void
  setCurrentStep: (step: number) => void
  goForward: (step: number) => void
  goBack: (step: number) => void
  setEmail: (email: string) => void
  setSessionId: (id: string) => void
  setUserId: (id: string) => void
  reset: () => void
}

const initialState = {
  currentStep: 0,
  answers: {},
  email: null,
  sessionId: null,
  userId: null,
  direction: 'forward' as const,
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      ...initialState,
      setAnswer: (questionId, answerId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: answerId } })),
      setCurrentStep: (step) => set({ currentStep: step }),
      goForward: (step) => set({ currentStep: step, direction: 'forward' }),
      goBack: (step) => set({ currentStep: step, direction: 'back' }),
      setEmail: (email) => set({ email }),
      setSessionId: (id) => set({ sessionId: id }),
      setUserId: (id) => set({ userId: id }),
      reset: () => set(initialState),
    }),
    { name: 'quiz-session' }, // localStorage key
  ),
)
