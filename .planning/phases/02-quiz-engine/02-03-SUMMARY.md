---
phase: 02-quiz-engine
plan: 03
subsystem: ui
tags: [zustand, react, tailwindcss, typescript, quiz, components, localStorage]

# Dependency graph
requires:
  - phase: 02-quiz-engine/02-01
    provides: "Next.js scaffold, shadcn/ui Input, cn() utility, Tailwind v4, all Phase 2 deps including zustand"
  - phase: 02-quiz-engine/02-02
    provides: "lib/quiz/questions.ts — QuizQuestion/QuizOption types, QUESTIONS array, SECTIONS, TOTAL_QUESTIONS"
provides:
  - "stores/quizStore.ts — Zustand store with persist middleware (localStorage key: quiz-session)"
  - "components/quiz/OptionCard.tsx — full-width tappable answer option with amber selected state"
  - "components/quiz/QuizProgress.tsx — thin fixed progress bar (h-1) at top of screen"
  - "components/quiz/WhyWeAskThis.tsx — tap-to-reveal inline expansion for helper text"
  - "components/quiz/CulturalDropdown.tsx — searchable dropdown with type-ahead filtering"
  - "components/quiz/QuizSectionHeader.tsx — muted uppercase section label"
  - "components/quiz/QuizCard.tsx — composes all sub-components into a complete question view"
affects:
  - 02-04-quiz-shell
  - 02-05-email-gate
  - phase-03-result-display
  - all downstream phases using quiz state

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Zustand persist middleware with localStorage key 'quiz-session' for quiz state persistence"
    - "goForward/goBack actions set both currentStep and direction atomically for slide animation coordination"
    - "CSS grid-template-rows 0fr->1fr trick for smooth height animation without JavaScript measurement"
    - "CulturalDropdown uses div+button instead of ul+li with ARIA roles (Biome a11y compliance)"
    - "OptionCard uses inline checkmark SVG for selected state (no external icon dependency)"

key-files:
  created:
    - stores/quizStore.ts (Zustand store: persist middleware, all quiz state and actions)
    - components/quiz/OptionCard.tsx (tappable answer option, amber selected state, 44px min touch target)
    - components/quiz/QuizProgress.tsx (fixed top progress bar, amber fill, 300ms transition)
    - components/quiz/WhyWeAskThis.tsx (tap-to-reveal, grid-template-rows animation trick)
    - components/quiz/CulturalDropdown.tsx (searchable dropdown, type-ahead, click-outside close)
    - components/quiz/QuizSectionHeader.tsx (muted uppercase section label with optional description)
    - components/quiz/QuizCard.tsx (composes all sub-components, handles both inputTypes)
  modified: []

key-decisions:
  - "CulturalDropdown uses div+button pattern instead of ul[role=listbox]+li[role=option] — Biome's a11y rules require native interactive elements (button) to be natively focusable and keyboard-accessible; ARIA roles on non-interactive elements are rejected"
  - "WhyWeAskThis uses CSS grid-template-rows trick (0fr->1fr) for smooth height expansion — no JS height measurement needed, pure CSS animation, collapses cleanly to 0"
  - "QuizCard does not manage auto-advance delay — onAnswer callback wires to parent (QuizShell will handle the 300ms delay before advancing step)"
  - "QuizProgress uses aria-valuemin/valuemax/valuenow for screen reader accessibility"

patterns-established:
  - "Pattern 1: All quiz Client Components use double-quote strings and semicolons (Biome format)"
  - "Pattern 2: Minimum 44px touch target on all interactive quiz elements (Apple HIG compliance)"
  - "Pattern 3: Amber color palette for selected/active quiz UI states (amber-50 bg, amber-500 border/fill)"
  - "Pattern 4: QuizCard receives onAnswer callback — auto-advance timing is the parent's responsibility"

requirements-completed: [QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-05, QUIZ-07]

# Metrics
duration: 5min
completed: 2026-02-24
---

# Phase 02 Plan 03: Quiz Store and UI Components Summary

**Zustand quiz store with localStorage persistence and 6 quiz UI components (OptionCard, QuizProgress, WhyWeAskThis, CulturalDropdown, QuizSectionHeader, QuizCard) ready for QuizShell orchestration**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-24T12:20:54Z
- **Completed:** 2026-02-24T12:25:48Z
- **Tasks:** 3
- **Files modified:** 7 created

## Accomplishments

- Zustand store persists full quiz state (currentStep, answers, email, sessionId, userId, direction) to localStorage under key 'quiz-session' — survives tab close and page refresh
- QuizCard composes all sub-components into a complete question view handling both option-cards and searchable-dropdown input types
- CulturalDropdown provides type-ahead filtering of 6 cultural background options with click-outside close and value restoration on blur
- WhyWeAskThis provides smooth inline expansion using CSS grid-template-rows trick (no JS measurement)
- QuizProgress renders as a thin fixed amber bar at top of screen with proportional fill and 300ms transition
- All 7 files pass `npx biome check` with 0 errors and `npx tsc --noEmit` with 0 errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Zustand store with persist middleware** - `02b0181` (feat)
2. **Task 2: Create quiz sub-components** - `45e2c89` (feat)
3. **Task 3: Create QuizCard component** - `97e0e36` (feat)
4. **Deviation fix: Biome formatting + CulturalDropdown a11y** - `f3ad05b` (fix)

## Files Created/Modified

- `stores/quizStore.ts` — Zustand store with persist middleware; exports useQuizStore
- `components/quiz/OptionCard.tsx` — full-width tappable button with amber selected state and checkmark SVG
- `components/quiz/QuizProgress.tsx` — fixed top progress bar with aria-progressbar semantics
- `components/quiz/WhyWeAskThis.tsx` — toggle-to-reveal with CSS grid animation
- `components/quiz/CulturalDropdown.tsx` — searchable combobox with type-ahead filtering
- `components/quiz/QuizSectionHeader.tsx` — uppercase muted section label
- `components/quiz/QuizCard.tsx` — composes all sub-components; handles option-cards and searchable-dropdown

## Decisions Made

- **CulturalDropdown: div+button pattern over ul+li with ARIA roles:** Biome's `noNoninteractiveElementToInteractiveRole` and `useKeyWithClickEvents` rules reject `ul[role=listbox]` and `li[role=option]` patterns because they require adding tabIndex and keyboard handlers to non-interactive elements. Using native `button` elements is the simpler, more robust approach — they are inherently focusable, keyboard-accessible, and satisfy all a11y rules without extra attributes.
- **WhyWeAskThis CSS grid trick:** Instead of JS-based height measurement (which causes layout thrash), use `grid-template-rows: 0fr -> 1fr` transition. The inner div has `overflow-hidden` to contain content during animation. This is a well-established CSS pattern with no drawbacks.
- **QuizCard onAnswer wiring:** QuizCard calls `onAnswer(question.id, option.id)` directly on tap — no auto-advance delay. The parent (QuizShell in Plan 02-04) will handle the ~300ms delay before calling `goForward(nextStep)`. This keeps QuizCard stateless and composable.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Applied Biome formatting to all new files**
- **Found during:** Post-task verification (Biome check run on stores/ and components/quiz/)
- **Issue:** Biome reported 9 formatting errors: single quotes instead of double quotes, missing semicolons, unsorted imports in CulturalDropdown
- **Fix:** Ran `npx biome check stores/ components/quiz/ --write` to apply all safe auto-fixes
- **Files modified:** stores/quizStore.ts, components/quiz/OptionCard.tsx, components/quiz/QuizProgress.tsx, components/quiz/WhyWeAskThis.tsx, components/quiz/CulturalDropdown.tsx, components/quiz/QuizSectionHeader.tsx, components/quiz/QuizCard.tsx
- **Verification:** `npx biome check stores/ components/quiz/` runs clean with 0 errors
- **Committed in:** f3ad05b (fix commit)

**2. [Rule 2 - Missing Critical] Fixed CulturalDropdown a11y: replaced ul[role=listbox]+li[role=option] with div+button**
- **Found during:** Post-task verification (Biome a11y rules: noNoninteractiveElementToInteractiveRole, useKeyWithClickEvents, useFocusableInteractive)
- **Issue:** CulturalDropdown used `ul[role="listbox"]` and `li[role="option"]` with `onClick` — Biome rejected this pattern because `ul` and `li` are non-interactive elements that should not receive interactive ARIA roles; `li` elements with `onClick` but no `onKeyDown` fail keyboard-only navigation
- **Fix:** Replaced `ul` with `div` (removed aria-label — not valid on plain div), replaced `li[role=option]` with `button[type=button]` (natively interactive, focusable, keyboard-accessible); removed `aria-selected` (not valid on button role)
- **Files modified:** components/quiz/CulturalDropdown.tsx
- **Verification:** `npx biome check` passes with 0 errors; `npx tsc --noEmit` passes with 0 errors
- **Committed in:** f3ad05b (fix commit)

---

**Total deviations:** 2 auto-fixed (1 formatting bug, 1 missing a11y requirement)
**Impact on plan:** Both fixes required for Biome compliance and keyboard accessibility. No scope creep.

## Issues Encountered

None beyond the deviations documented above.

## User Setup Required

None — no external service configuration required for this plan.

## Next Phase Readiness

- Zustand store ready for QuizShell (Plan 02-04) to call goForward/goBack and setAnswer
- QuizCard is a pure presentational component awaiting orchestration by QuizShell
- All components are Client Components ready to be imported into the quiz route
- TypeScript build clean; Biome check clean
- No blockers

---
## Self-Check: PASSED

- FOUND: stores/quizStore.ts
- FOUND: components/quiz/OptionCard.tsx
- FOUND: components/quiz/QuizProgress.tsx
- FOUND: components/quiz/WhyWeAskThis.tsx
- FOUND: components/quiz/CulturalDropdown.tsx
- FOUND: components/quiz/QuizSectionHeader.tsx
- FOUND: components/quiz/QuizCard.tsx
- FOUND: .planning/phases/02-quiz-engine/02-03-SUMMARY.md
- FOUND: commit 02b0181 (Task 1 — Zustand store)
- FOUND: commit 45e2c89 (Task 2 — quiz sub-components)
- FOUND: commit 97e0e36 (Task 3 — QuizCard)
- FOUND: commit f3ad05b (fix — Biome + a11y)

---
*Phase: 02-quiz-engine*
*Completed: 2026-02-24*
