---
phase: 02-quiz-engine
plan: 04
subsystem: ui
tags: [nextjs, react, zustand, nuqs, supabase, react-hook-form, zod, tailwindcss, typescript]

# Dependency graph
requires:
  - phase: 02-quiz-engine/02-01
    provides: "Next.js scaffold, shadcn/ui Input/Button, Tailwind v4, nuqs/react-hook-form/zod installed"
  - phase: 02-quiz-engine/02-02
    provides: "lib/quiz/questions.ts QUESTIONS array, computeDimensionProfile(), getResult()"
  - phase: 02-quiz-engine/02-03
    provides: "stores/quizStore.ts (Zustand persist), QuizCard, QuizProgress, and all sub-components"
provides:
  - "components/quiz/EmailCaptureScreen.tsx — email gate with React Hook Form + Zod validation"
  - "components/quiz/ProcessingScreen.tsx — warm branded waiting screen with animated dots"
  - "components/quiz/QuizShell.tsx — full quiz orchestrator: session init, step routing, auto-advance, completion flow"
  - "app/quiz/page.tsx — quiz route with NuqsAdapter + Suspense boundary"
  - "Slide transition keyframes in app/globals.css (Tailwind v4 @utility)"
affects:
  - phase-03-result-display
  - all downstream phases reading quiz_sessions data

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "SSR-safe Zustand hydration: useState(false) + useEffect checking persist.hasHydrated() + onFinishHydration subscription"
    - "nuqs useQueryState requires Suspense boundary in Next.js App Router (wraps useSearchParams)"
    - "NuqsAdapter placed in quiz page (not root layout) — scoped to quiz route only"
    - "Processing screen timing: Supabase UPDATE + Promise.setTimeout(2500) run concurrently; redirect fires after both"
    - "Quiz completion does NOT call store.reset() — Phase 3 result page may read localStorage session data"

key-files:
  created:
    - components/quiz/EmailCaptureScreen.tsx (email gate: zodResolver, inline error, disables during submission)
    - components/quiz/ProcessingScreen.tsx (animated amber dots, warm message, no logic)
    - components/quiz/QuizShell.tsx (orchestrator: ~290 lines; all quiz flow wired end-to-end)
    - app/quiz/page.tsx (Server Component: NuqsAdapter + Suspense + QuizShell)
  modified:
    - app/globals.css (added slide-in-right and slide-in-left @keyframes + @utility for Tailwind v4)

key-decisions:
  - "SSR-safe Zustand hydration: direct useQuizStore.persist.hasHydrated() call crashes SSR — replaced with useState(false) initialized in useEffect, subscribing to onFinishHydration for devices where hydration completes after effect"
  - "nuqs Suspense boundary required: useQueryState calls useSearchParams internally; Next.js App Router requires this inside a Suspense boundary during prerendering — added Suspense wrapper in app/quiz/page.tsx"
  - "NuqsAdapter scoped to quiz page, not root layout — only quiz route uses nuqs in Phase 2; can be moved to layout if future phases need it"
  - "Processing screen shows immediately (setStep to totalQuestions+1) while Supabase UPDATE runs in background; 2.5s minimum wait ensures emotional pacing regardless of network speed"
  - "store.reset() not called after completion — Phase 3 /result page may need localStorage session data for optimistic rendering before Supabase fetch"

patterns-established:
  - "Pattern 1: SSR-safe Zustand persist hydration check — always use useState+useEffect, never direct persist.hasHydrated() in component body"
  - "Pattern 2: nuqs in Next.js App Router always requires Suspense boundary wrapping the component that calls useQueryState"
  - "Pattern 3: Auto-advance timing ownership — QuizCard fires onAnswer immediately on tap; QuizShell owns the 300ms delay before step increment"

requirements-completed: [QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-04, QUIZ-06, QUIZ-07, QUIZ-08]

# Metrics
duration: 5min
completed: 2026-02-24
---

# Phase 02 Plan 04: QuizShell Orchestrator Summary

**End-to-end quiz flow: QuizShell orchestrates 32-question navigation with nuqs URL sync, anonymous Supabase session init, 300ms auto-advance, email capture, 2.5s processing screen, and quiz_sessions UPDATE with scores, archetype, and email**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-24T12:29:24Z
- **Completed:** 2026-02-24T12:33:30Z
- **Tasks:** 3
- **Files modified:** 5 created, 1 modified

## Accomplishments

- QuizShell wires all Phase 2 pieces together: Zustand store, nuqs URL step sync, all quiz UI sub-components, Supabase anonymous auth, and scoring pipeline
- Full quiz completion flow: computeDimensionProfile → getResult → quiz_sessions UPDATE with answers, dimension_scores, archetype_id, cultural_background, email, completed_at
- Production build passes cleanly for all routes (/, /_not-found, /quiz) with static prerendering

## Task Commits

Each task was committed atomically:

1. **Task 1: Create EmailCaptureScreen and ProcessingScreen components** - `8b1d9f2` (feat)
2. **Task 2: Create QuizShell orchestrator with nuqs, session init, auto-advance, slide transitions, and completion flow** - `400f2d8` (feat)
3. **Task 3: Create quiz route page and wire NuqsAdapter** - `adecae4` (feat)

## Files Created/Modified

- `components/quiz/EmailCaptureScreen.tsx` — React Hook Form + Zod email validation, shadcn/ui Input/Button, inline error display, disables submit while processing, mobile-first
- `components/quiz/ProcessingScreen.tsx` — animated amber dots (CSS animate-bounce), warm message, full viewport, purely presentational
- `components/quiz/QuizShell.tsx` — top-level quiz orchestrator: SSR-safe Zustand hydration, nuqs step sync with history:push, anonymous signInAnonymously, quiz_sessions INSERT/UPDATE, 300ms auto-advance, back navigation, slide animations, section header detection, processing screen timing, /result redirect
- `app/quiz/page.tsx` — Server Component rendering QuizShell inside NuqsAdapter and Suspense boundary
- `app/globals.css` — added slide-in-right and slide-in-left CSS keyframe animations + Tailwind v4 @utility classes

## Decisions Made

- **SSR-safe Zustand hydration:** Calling `useQuizStore.persist.hasHydrated()` directly in a component body causes a SSR crash ("Cannot read properties of undefined (reading 'hasHydrated')") because the persist middleware hasn't initialized during server rendering. Fixed by using `useState(false)` initialized in a `useEffect` that checks `hasHydrated()` synchronously and subscribes to `onFinishHydration` for slower device flows.
- **Suspense boundary for nuqs:** `useQueryState` calls `useSearchParams` internally. Next.js App Router requires `useSearchParams` to be inside a Suspense boundary during static prerendering. Added `<Suspense fallback={<div className="min-h-screen bg-amber-50" />}>` in `app/quiz/page.tsx`.
- **NuqsAdapter in quiz page, not root layout:** Only the quiz route uses nuqs in Phase 2. Keeping the adapter scoped avoids unnecessary wrapping. Can be promoted to root layout if future phases need nuqs.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] SSR crash: useQuizStore.persist.hasHydrated() fails during prerendering**
- **Found during:** Task 3 (npm run build)
- **Issue:** `useQuizStore.persist.hasHydrated()` called directly in the component body throws `TypeError: Cannot read properties of undefined (reading 'hasHydrated')` during Next.js SSR/prerendering because Zustand's persist middleware doesn't initialize on the server
- **Fix:** Changed to `useState(false)` + `useEffect` that synchronously checks `hasHydrated()` after mount and subscribes to `onFinishHydration` for deferred hydration cases
- **Files modified:** components/quiz/QuizShell.tsx
- **Verification:** `npm run build` completes without prerender errors
- **Committed in:** `adecae4` (Task 3 commit — fix applied before commit)

**2. [Rule 1 - Bug] Build error: useSearchParams must be wrapped in Suspense**
- **Found during:** Task 3 (npm run build — second build attempt after fix #1)
- **Issue:** nuqs `useQueryState` calls `useSearchParams()` internally. Next.js App Router throws `useSearchParams() should be wrapped in a suspense boundary at page "/quiz"` during static page generation
- **Fix:** Wrapped `<QuizShell />` in `<Suspense fallback={<div className="min-h-screen bg-amber-50" />}>` inside `app/quiz/page.tsx`
- **Files modified:** app/quiz/page.tsx
- **Verification:** `npm run build` completes; `/quiz` route prerendered as static content
- **Committed in:** `adecae4` (Task 3 commit — fix applied before commit)

**3. [Rule 1 - Bug] Biome formatting errors on newly created files**
- **Found during:** All tasks (Biome check after each file creation)
- **Issue:** Import ordering and multi-line JSX formatting; 3 files affected
- **Fix:** `npx biome check --write` applied after each file
- **Files modified:** components/quiz/ProcessingScreen.tsx, components/quiz/QuizShell.tsx, app/quiz/page.tsx
- **Verification:** `npx biome check` passes with 0 errors
- **Committed in:** `8b1d9f2`, `400f2d8`, `adecae4` (applied before each task commit)

---

**Total deviations:** 3 auto-fixed (2 SSR/build bugs, 1 formatting)
**Impact on plan:** All fixes required for production build correctness. No scope changes.

## Issues Encountered

Both build errors (Zustand SSR crash + nuqs Suspense) are well-known patterns in Next.js 15+ App Router with client state libraries. Both fixes follow established community patterns and required no architectural decisions.

## User Setup Required

None — no external service configuration required for this plan. Supabase credentials are already in .env.local from Phase 1.

## Next Phase Readiness

- Full quiz flow is functional: landing page → /quiz → 32 questions with auto-advance + back navigation → email capture → processing screen → /result?session=UUID
- quiz_sessions row is written with all required fields on completion (status=completed, answers, dimension_scores, archetype_id, cultural_background, email, completed_at)
- Phase 3 (Result Display) can read quiz_sessions by session ID from the URL parameter
- No blockers

---

## Self-Check: PASSED

- FOUND: components/quiz/EmailCaptureScreen.tsx
- FOUND: components/quiz/ProcessingScreen.tsx
- FOUND: components/quiz/QuizShell.tsx
- FOUND: app/quiz/page.tsx
- FOUND: app/globals.css (modified with slide animations)
- FOUND: commit 8b1d9f2 (Task 1 — EmailCaptureScreen + ProcessingScreen)
- FOUND: commit 400f2d8 (Task 2 — QuizShell)
- FOUND: commit adecae4 (Task 3 — quiz route page + Suspense + animations)

---
*Phase: 02-quiz-engine*
*Completed: 2026-02-24*
