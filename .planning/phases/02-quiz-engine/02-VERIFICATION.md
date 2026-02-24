---
phase: 02-quiz-engine
verified: 2026-02-24T14:00:00Z
status: gaps_found
score: 4/5 success criteria verified (plan must_have partial failure on dimension coverage)
re_verification: false
gaps:
  - truth: "25-30 quiz questions exist covering all 11 dimensions with at least 2 questions per dimension"
    status: partial
    reason: "protective-instinct dimension has only 1 contributing question (q-protective-past-01). All other 10 dimensions have 2+ questions. The plan 02-02 must_have explicitly required 2+ questions per dimension. computeDimensionProfile defaults to 5 (midpoint) for under-covered dimensions, which prevents a scoring crash but is not the same as measured coverage."
    artifacts:
      - path: "lib/quiz/questions.ts"
        issue: "protective-instinct dimension has only 1 question; all other 10 dimensions have 2+ questions"
    missing:
      - "Add a second question contributing scores to the protective-instinct dimension (e.g. asking about overprotectiveness, surveillance, safety rules in childhood home)"
human_verification:
  - test: "Full quiz flow end-to-end on mobile viewport"
    expected: "Card layout, slide animations, auto-advance, back navigation, section headers, WhyWeAskThis expansion, cultural dropdown, email capture, processing screen, and Supabase write all function correctly"
    why_human: "Visual quality, interaction feel (touch targets, animation timing), and Supabase data correctness verified by human in Plan 05 — automated checks cannot replicate real device interaction"
  - test: "Warm conversational tone spot-check"
    expected: "Questions feel like a caring friend asking over coffee; no option feels obviously better or worse"
    why_human: "Tone quality is a content judgment — confirmed by human in Plan 05"
---

# Phase 02: Quiz Engine Verification Report

**Phase Goal:** Users can complete the full quiz experience end-to-end, with answers persisted to Supabase on completion
**Verified:** 2026-02-24T14:00:00Z
**Status:** gaps_found
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths (from Phase Success Criteria)

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | User sees one question per screen in a card-style layout with warm, conversational language and a visible progress bar | VERIFIED | `QuizCard` renders one `QuizQuestion` per screen (`min-h-[100dvh]`, `max-w-lg`). `QuizProgress` is `fixed top-0` with amber fill proportional to `current/total`. All 21 questions have conversational second-person language. |
| 2 | User can navigate back to any previous question without losing answers | VERIFIED | `handleBack` in `QuizShell` calls `setStep(prevStep)` + `store.goBack(prevStep)`. `history: "push"` on nuqs means browser Back also navigates correctly. `currentAnswer` prop passes the stored answer back to `QuizCard` for visual restoration. Back button renders on steps 1+ (hidden on step 0). |
| 3 | User can leave mid-quiz, return later, and find their answers restored from localStorage | VERIFIED | Zustand `persist` middleware with `name: "quiz-session"` saves all state to localStorage. `QuizShell` mounts with SSR-safe hydration check (`useState(false)` + `useEffect`) and syncs `nuqs` step from `store.currentStep` on mount if no URL `?step=` param. Human verification (Plan 05) confirmed this works. |
| 4 | Sensitive questions (upbringing, cultural background) show a "Why we ask this" helper text | VERIFIED | `WhyWeAskThis` component renders tap-to-reveal inline expansion using CSS `grid-template-rows: 0fr -> 1fr` trick. 8 questions have `whyWeAskThis` text: Role Integrity (q-role-past-01, q-role-past-02), Narrative Coherence (q-narrative-past-01, q-narrative-past-02, q-narrative-past-03), Repair/Reconnection (q-repair-past-01, q-repair-past-02), and Cultural Background (q-cultural-background). |
| 5 | Cultural background is directly asked and the answer is stored in the quiz session for personalization downstream | VERIFIED | `q-cultural-background` question uses `inputType: "searchable-dropdown"` with 6 options (5 cultural contexts + "Other / Prefer not to say"). `QuizShell.onQuizComplete` extracts `store.answers["q-cultural-background"]` and writes it to `quiz_sessions.cultural_background` column in the Supabase UPDATE. |

**Score:** 4/5 success criteria VERIFIED (1 plan-level must_have partial failure on dimension coverage — see gaps)

### Required Artifacts

| Artifact | Min Lines | Actual | Status | Details |
|----------|-----------|--------|--------|---------|
| `lib/quiz/questions.ts` | 300 | 664 | VERIFIED | 21 questions, SECTIONS array, full type exports |
| `lib/quiz/compute-profile.ts` | 30 | 80 | VERIFIED | Exports `computeDimensionProfile`; full averaging logic with midpoint default |
| `stores/quizStore.ts` | 30 | 50 | VERIFIED | Zustand persist with `"quiz-session"` key; all required state and actions |
| `components/quiz/QuizProgress.tsx` | 10 | 26 | VERIFIED | Fixed top bar, amber fill, ARIA progressbar |
| `components/quiz/OptionCard.tsx` | 15 | 52 | VERIFIED | Amber selected state, checkmark SVG, 44px min touch target |
| `components/quiz/WhyWeAskThis.tsx` | 15 | 34 | VERIFIED | CSS grid animation toggle |
| `components/quiz/CulturalDropdown.tsx` | 30 | 138 | VERIFIED | Type-ahead filtering, click-outside, value restoration |
| `components/quiz/QuizSectionHeader.tsx` | 8 | 15 | VERIFIED | Uppercase muted label |
| `components/quiz/QuizCard.tsx` | 40 | 56 | VERIFIED | Composes all sub-components; handles both inputTypes |
| `components/quiz/QuizShell.tsx` | 80 | 291 | VERIFIED | Full orchestration: hydration, nuqs, session init, auto-advance, back nav, completion |
| `components/quiz/EmailCaptureScreen.tsx` | 30 | 85 | VERIFIED | React Hook Form + Zod, inline error, disables during submit |
| `components/quiz/ProcessingScreen.tsx` | 15 | 22 | VERIFIED | Animated amber dots, warm message |
| `app/quiz/page.tsx` | 8 | 19 | VERIFIED | NuqsAdapter + Suspense + QuizShell |

All 13 artifacts: exist, are substantive (not stubs), and are correctly wired.

### Key Link Verification

| From | To | Via | Status | Details |
|------|----|-----|--------|---------|
| `stores/quizStore.ts` | localStorage | `persist({ name: "quiz-session" })` | WIRED | Line 48: `{ name: "quiz-session" }` |
| `QuizShell.tsx` | `stores/quizStore.ts` | `import { useQuizStore }` | WIRED | Line 14 import, used extensively |
| `QuizShell.tsx` | `nuqs` | `useQueryState("step", { history: "push" })` | WIRED | Lines 4, 42-50 |
| `QuizShell.tsx` | `lib/supabase/client.ts` | `import { createClient }` | WIRED | Line 13; used in session init and completion UPDATE |
| `QuizShell.tsx` | `lib/quiz/compute-profile.ts` | `import { computeDimensionProfile }` | WIRED | Line 10; called on quiz completion (line 165) |
| `QuizShell.tsx` | `lib/quiz/scoring-matrix.ts` | `import { getResult }` | WIRED | Line 12; called on quiz completion (line 168) |
| `QuizShell.tsx` | `QuizCard.tsx` | `import { QuizCard }` | WIRED | Line 8; rendered for steps 0 to TOTAL_QUESTIONS-1 |
| `QuizShell.tsx` | `EmailCaptureScreen.tsx` | `import { EmailCaptureScreen }` | WIRED | Line 6; rendered at step === TOTAL_QUESTIONS |
| `QuizCard.tsx` | `OptionCard.tsx` | `import { OptionCard }` | WIRED | Line 2; maps over options for `inputType === "option-cards"` |
| `QuizCard.tsx` | `WhyWeAskThis.tsx` | `import { WhyWeAskThis }` | WIRED | Line 4; conditionally rendered when `question.whyWeAskThis` is set |
| `QuizCard.tsx` | `CulturalDropdown.tsx` | `import { CulturalDropdown }` | WIRED | Line 3; rendered for `inputType === "searchable-dropdown"` |
| `QuizCard.tsx` | `lib/quiz/questions.ts` | `import type { QuizQuestion }` | WIRED | Line 7 |
| `app/quiz/page.tsx` | `QuizShell.tsx` | `import { QuizShell }` | WIRED | Line 4; rendered inside NuqsAdapter + Suspense |
| `lib/quiz/compute-profile.ts` | `lib/quiz/questions.ts` | `import { QUESTIONS }` | WIRED | Line 29 |
| `lib/quiz/compute-profile.ts` | `lib/quiz/dimensions.ts` | `import { DIMENSION_KEYS }` | WIRED | Line 28 |
| `lib/quiz/questions.ts` | `lib/quiz/dimensions.ts` | dimension keys in `dimensionScores` | WIRED | `emotional-warmth`, `boundary-consistency`, `autonomy-support` etc. used throughout |
| `app/layout.tsx` | `app/globals.css` | CSS import | WIRED | Line 3: `import "./globals.css"` |
| `tsconfig.json` | `lib/` | `@/* path alias` | WIRED | `"@/*": ["./*"]` |

All 18 key links: WIRED.

### Requirements Coverage

| Requirement | Source Plan(s) | Description | Status | Evidence |
|-------------|---------------|-------------|--------|----------|
| QUIZ-01 | 02-03, 02-04 | Card-style one-question-per-screen UI with warm, conversational language | SATISFIED | `QuizCard` renders `min-h-[100dvh]` card per question; 21 questions pass warm-friend tone test; human verified |
| QUIZ-02 | 02-03, 02-04 | Progress bar showing completion percentage throughout quiz | SATISFIED | `QuizProgress` fixed at top, fills `(step/TOTAL_QUESTIONS)*100%` with amber; human verified |
| QUIZ-03 | 02-03, 02-04 | Back button allowing navigation to any previous question without losing answers | SATISFIED | `handleBack` + nuqs `history: "push"` + `store.goBack`; back button hidden on step 0; previous answer restored via `currentAnswer` prop; human verified |
| QUIZ-04 | 02-01, 02-04 | Mobile-responsive layout optimized for thumb interaction | SATISFIED | All interactive elements `min-h-[44px]`, `max-w-lg mx-auto`, full-width options, no horizontal scroll; human verified on mobile viewport |
| QUIZ-05 | 02-02, 02-03 | "Why we ask this" helper text on sensitive questions | SATISFIED | 8 questions have `whyWeAskThis`; `WhyWeAskThis` component renders tap-to-reveal; Role Integrity, Narrative Coherence, Repair/Reconnection, Cultural Background all covered; human verified |
| QUIZ-06 | 02-02, 02-04 | Direct cultural background questions that feed into personalization | SATISFIED | `q-cultural-background` with `searchable-dropdown`; answer stored as `store.answers["q-cultural-background"]`; written to `quiz_sessions.cultural_background` on completion; human verified |
| QUIZ-07 | 02-03, 02-04 | localStorage auto-save so users can resume if they leave mid-quiz | SATISFIED | Zustand persist saves state; `QuizShell` syncs nuqs step from store on mount; hydration-safe; human verified (5+ questions answered, refreshed, resumed correctly) |
| QUIZ-08 | 02-02 | Quiz is 10-20 minutes with questions grounded in research from top 100 parenting KOLs | SATISFIED | 21 questions at ~30-45s each = 10-16 minutes; questions grounded in dimensions from Phase 0 archetype framework (Bowlby, Ainsworth, Siegel, van IJzendoorn cited in dimensions.ts); human verified question quality |

All 8 requirements for Phase 2: SATISFIED. No orphaned requirements.

### Plan Must-Have Gap (below success criteria threshold)

The plan 02-02 must_have truth "at least 2 questions per dimension" is partially failed:

| Dimension | Contributing Questions | Status |
|-----------|----------------------|--------|
| emotional-warmth | 5 | OK |
| boundary-consistency | 4 | OK |
| autonomy-support | 2 | OK |
| emotional-regulation | 4 | OK |
| **protective-instinct** | **1** | **PARTIAL** |
| narrative-coherence | 3 | OK |
| presence-attunement | 3 | OK |
| repair-reconnection | 2 | OK |
| role-integrity | 3 | OK |
| reciprocity | 2 | OK |
| nonjudgmental-acceptance | 2 | OK |

`protective-instinct` has only `q-protective-past-01` contributing scores. The `computeDimensionProfile` function defaults uncovered dimensions to 5 (midpoint) if no answers contribute — but with 1 question, it will be scored when answered. The risk is measurement reliability: a single question is a weaker signal for this dimension than 2+.

**Severity:** Warning (not a blocker for goal achievement — scoring still works and human verification passed). The phase goal ("full quiz experience end-to-end, with answers persisted") is achieved. The gap is a content quality concern within the question bank.

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `lib/quiz/scoring-matrix.ts` | 274, 296 | TODO comment in `softInferCurrentFromPast` | Info | Pre-Phase-2 code, not used in quiz flow. `QuizShell` only calls `getResult()`, not `softInferCurrentFromPast`. No impact on Phase 2 goal. |
| `components/quiz/QuizShell.tsx` | 191 | `console.error` on Supabase write failure | Info | Appropriate error logging; does not silently lose data. `setIsSubmitting(false)` returns user to email screen. |

No blockers. No stub implementations. No placeholder returns.

### Human Verification Required

Plan 05 constitutes the human verification record for this phase. All 13 categories were approved on 2026-02-24. The following items remain as "needs human" for any re-verification:

#### 1. Full Mobile Quiz Flow

**Test:** Start `npm run dev`, open Chrome DevTools → iPhone 14 viewport, navigate to `http://localhost:3000`, click "Take the Quiz", complete all 21 questions
**Expected:** Card-style layout, slide animations, progress bar filling, back navigation with preserved answers, WhyWeAskThis expansion/collapse, cultural dropdown type-ahead, email capture screen, processing screen with animated dots, redirect to `/result?session=UUID`
**Why human:** Visual quality, animation feel, touch target usability, and redirect correctness cannot be verified without a running browser

#### 2. Supabase quiz_sessions Row Correctness

**Test:** After completing the quiz, open Supabase Studio, inspect the most recent `quiz_sessions` row
**Expected:** `status = "completed"`, `answers` JSONB populated (all 21 question IDs present), `dimension_scores` JSONB with 11 dimension keys, `archetype_id` set (valid archetype ID), `cultural_background` set (matches selection), `email` set, `completed_at` set
**Why human:** Requires live Supabase credentials and access to the dashboard to verify database state

#### 3. localStorage Resume Flow

**Test:** Answer 5+ questions, close the tab, reopen `http://localhost:3000/quiz`
**Expected:** Quiz resumes at the last answered step with previous answers visible
**Why human:** localStorage behavior requires a real browser session, not static code analysis

### Gaps Summary

One gap found: `protective-instinct` dimension has only 1 contributing question in the question bank, falling below the plan's must_have of "at least 2 questions per dimension."

This gap does not block the Phase 2 goal — scoring works correctly, the Supabase write succeeds, and human verification passed all 13 categories. The `computeDimensionProfile` function produces valid output. The gap is a content quality concern: with only 1 question, the `protective-instinct` score for any given user is based on a single data point, making it a weaker signal than all other dimensions.

**Recommended fix:** Add 1 additional question targeting the `protective-instinct` dimension. Suitable question territory: overprotectiveness, surveillance behavior, safety rules, or the parent's own experience of freedom/constraint within the childhood home. The question should follow the warm-friend tone pattern established across the bank.

All other success criteria, artifacts, key links, and requirements: fully verified.

---

_Verified: 2026-02-24T14:00:00Z_
_Verifier: Claude (gsd-verifier)_
