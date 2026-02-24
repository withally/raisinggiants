# Phase 2: Quiz Engine - Research

**Researched:** 2026-02-24
**Domain:** Next.js multi-step quiz UI, question bank design, scoring integration, localStorage persistence, Supabase session write, email capture gate
**Confidence:** HIGH (stack patterns well-established in project research; question bank design is a new deliverable but has clear constraints from the archetype framework; UI decisions are locked in CONTEXT.md)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Tone and section structure:**
- Warm friend tone throughout — "Think back to how your parents handled conflict..." No clinical jargon, no quiz-app playfulness.
- Sensitive questions (upbringing, cultural background) get a gentle lead-in sentence before the question itself that normalizes the topic.
- Quiz is divided into visible sections: e.g., "About You", "Your Upbringing", "Your Parenting". Light section headers appear as user progresses.
- "Why we ask this" helper text is tap-to-reveal — small link below sensitive questions that expands inline on tap.

**Card interactions:**
- Auto-advance on answer select with ~300ms pause, then slide to next card.
- Back button (top-left arrow icon, navigation-bar style) always present except on the first question.
- Slide left/right transitions — forward slides left, back slides right.
- Thin progress bar at the very top of the screen, filling left-to-right.

**Answer input types:**
- Primary format: tappable option cards — full-width, selected state highlighted with color.
- Cultural background question uses a searchable dropdown with type-ahead; common backgrounds pre-listed.
- Likert scales ("Never / Rarely / Sometimes / Often / Always") rendered as the same tappable option cards (not sliders).
- Always single-select — no multi-select questions.

**Quiz completion flow:**
- After the last answer: email capture screen. "Enter your email so we can save your results."
- Email is required to see results — business decision, maximizes lead capture.
- After email submission: brief processing screen (2-3 seconds) with warm message like "We're putting together your parenting blueprint..." and a subtle animation.
- Then redirect to the result page (Phase 3, out of scope for this phase).

### Claude's Discretion

- Exact card dimensions, spacing, and typography
- Loading skeleton design during data fetches
- Error state handling (network failures, validation)
- Processing screen animation style
- Exact section names and grouping of questions within sections
- Searchable dropdown implementation details for cultural background

### Deferred

- None — discussion stayed within phase scope.

</user_constraints>

---

<phase_requirements>
## Phase Requirements

| Requirement | Description |
|-------------|-------------|
| QUIZ-01 | Card-style one-question-per-screen UI with warm, conversational language |
| QUIZ-02 | Progress bar showing completion percentage throughout quiz |
| QUIZ-03 | Back button allowing navigation to any previous question without losing answers |
| QUIZ-04 | Mobile-responsive layout optimized for thumb interaction |
| QUIZ-05 | "Why we ask this" helper text on sensitive questions (upbringing, cultural background) |
| QUIZ-06 | Direct cultural background question that feeds into personalization |
| QUIZ-07 | localStorage auto-save so users can resume if they leave mid-quiz |
| QUIZ-08 | Quiz is 10-20 minutes with questions grounded in research from top 100 parenting KOLs |

**What this phase must deliver at its boundary:**
- A completed quiz session row in `quiz_sessions` with: `status = 'completed'`, `answers` JSONB populated, `dimension_scores` JSONB computed and populated, `archetype_id` set, `cultural_background` set in its dedicated column, `email` set, `completed_at` set.
- The browser holds the user's anonymous Supabase session so Phase 3 can read the quiz session row using the RLS-scoped anon client.
- The quiz can be resumed from localStorage if the user leaves mid-quiz and returns on the same device/browser.

</phase_requirements>

---

## Summary

Phase 2 is the most user-facing engineering phase in the entire product. It builds the quiz experience from scratch on a fresh Next.js project — this includes scaffolding the framework itself. The deliverables split into four interlocking concerns:

1. **Next.js application scaffold** — `create-next-app`, Tailwind CSS v4, shadcn/ui, Biome, and environment configuration. This is the first time any Next.js code is written for this project.

2. **Question bank** — 25-35 questions grounded in the 11 scoring dimensions and their `candidateQuestions` seed ideas from `lib/quiz/dimensions.ts`. Each question maps to one or more dimensions with defined score weights. Cultural background is one of these questions. This is a content + data design deliverable.

3. **Quiz UI** — Card-style one-question-per-screen flow with auto-advance, slide transitions, back navigation, section headers, tap-to-reveal helper text, progress bar, email capture gate, and the processing screen. Zustand store with `persist` middleware provides localStorage auto-save and cross-step state accumulation. nuqs syncs current step to the URL.

4. **Session persistence** — On quiz completion, the computed answers, dimension scores, archetype result, cultural background, and email are written to `quiz_sessions` in Supabase using the anon client (RLS-scoped to the anonymous user created at quiz start).

The highest-risk part of this phase is the **question bank design** — writing 25-35 questions that feel warm and conversational while accurately measuring the 11 dimensions. Questions that feel clinical or leading reduce completion rates and scoring accuracy. The `candidateQuestions` in `lib/quiz/dimensions.ts` are seed ideas; they must be rewritten into the product's warm-friend tone before use.

The second risk is the **Next.js project scaffold** — this project currently has no Next.js application structure (only `lib/`, `scripts/`, and `supabase/` directories). The first plan in this phase must bootstrap `create-next-app` before any component work begins.

---

## Current State of the Codebase

Understanding the starting point is critical for planning:

**What exists:**
- `lib/archetypes/types.ts` — TypeScript types for the full archetype framework
- `lib/archetypes/archetypes.ts` — 9 archetype definitions with dimension profiles, foundational patterns, and watchouts
- `lib/archetypes/cultural-overlays.ts` — Cultural context overlay definitions for 5 cultural backgrounds
- `lib/quiz/dimensions.ts` — 11 dimension definitions with `candidateQuestions` (seed ideas for the question bank)
- `lib/quiz/scoring-matrix.ts` — Scoring algorithm: `scoreArchetypes()`, `getResult()`, `softInferCurrentFromPast()`
- `lib/supabase/client.ts` — Browser Supabase client (`createClient()` using `@supabase/ssr`)
- `lib/supabase/server.ts` — Server Supabase admin client (`createAdminClient()` using service role key)
- `supabase/migrations/20260224000000_phase1_data_foundation.sql` — Database schema (verified, deployed to cloud Supabase)
- `package.json` — Has only `tsx`, `typescript`, `@supabase/ssr`, `@supabase/supabase-js`

**What does NOT exist yet:**
- No Next.js application (`next`, `react`, `tailwindcss` not installed)
- No `app/` directory or any pages
- No quiz UI components
- No Zustand store
- No question bank (`lib/quiz/questions.ts` does not exist)
- No nuqs integration

**Implication:** Plan 02-01 must begin with `create-next-app` scaffold and dependency installation before any quiz-specific code can be written.

---

## Standard Stack

| Tool | Version | Purpose | Notes |
|------|---------|---------|-------|
| Next.js | 15.5.x | Full-stack React framework | App Router; create-next-app bootstraps the project |
| React | 19.x | UI rendering | Required by Next.js 15.5 |
| TypeScript | 5.x | Type safety | Already in tsconfig.json; must be preserved in Next.js config |
| Tailwind CSS | 4.x | Utility styling | v4 uses CSS `@theme` directive, no `tailwind.config.js` |
| shadcn/ui | Post-Feb 2025 CLI | Component primitives — quiz cards, progress, dialogs | Copies source into repo; no version lock-in |
| Zustand | 5.0.11 | Quiz state across steps + localStorage persistence | `persist` middleware with `localStorage` key `quiz-session` |
| nuqs | 2.8.x | URL-synced step index | Stores `?step=N` in URL; enables browser Back button; used by Vercel and Supabase in production |
| React Hook Form | 7.71.x | Per-step form field management (email capture step) | Only needed for the email capture screen; tappable option cards use Zustand directly |
| Zod | 4.3.x | Email validation schema | Validates email format on email capture step |
| Biome | Latest | Linting + formatting | Next.js 15.5 deprecates `next lint`; Biome replaces ESLint + Prettier |

**Packages NOT needed in this phase:**
- `stripe` (Phase 4)
- `@react-pdf/renderer` (Phase 6)
- `openai` / Moonshot AI client (Phase 5)
- `resend` (Phase 6)

---

## Architecture Patterns

### Pattern 1: Next.js App Router Project Structure for the Quiz Phase

Phase 2 establishes the project structure that all downstream phases will extend. The quiz lives under `app/quiz/`:

```
app/
├── layout.tsx                 # Root layout (html, body, font setup)
├── page.tsx                   # Landing page entry (redirects to /quiz or shows start CTA)
├── quiz/
│   └── page.tsx               # Quiz shell — Client Component, contains full quiz flow
├── result/                    # Phase 3 — not built yet
└── api/
    └── quiz/
        └── route.ts           # POST handler: receives completed quiz data, writes to Supabase

components/
├── quiz/
│   ├── QuizShell.tsx          # Top-level Client Component — orchestrates all quiz state
│   ├── QuizCard.tsx           # Individual question card (single-question view)
│   ├── QuizProgress.tsx       # Progress bar (top of screen, thin)
│   ├── QuizSectionHeader.tsx  # Section label that appears on section transitions
│   ├── OptionCard.tsx         # Single tappable answer option
│   ├── CulturalDropdown.tsx   # Searchable dropdown for cultural background question
│   ├── WhyWeAskThis.tsx       # Tap-to-reveal helper text component
│   ├── EmailCaptureScreen.tsx # Email gate before results (final step)
│   └── ProcessingScreen.tsx   # 2-3 second animation between email submit and result redirect
└── ui/                        # shadcn/ui primitives (Button, Input, etc.)

lib/
├── quiz/
│   ├── dimensions.ts          # Already exists — 11 dimension definitions
│   ├── scoring-matrix.ts      # Already exists — scoreArchetypes(), getResult()
│   └── questions.ts           # NEW in Phase 2 — question bank (25-35 questions)
├── archetypes/
│   ├── types.ts               # Already exists
│   ├── archetypes.ts          # Already exists — 9 archetypes
│   └── cultural-overlays.ts   # Already exists
└── supabase/
    ├── client.ts              # Already exists — browser client
    └── server.ts              # Already exists — admin client

stores/
└── quizStore.ts               # NEW in Phase 2 — Zustand store with persist middleware
```

### Pattern 2: Zustand Store with localStorage Persistence (QUIZ-07)

The entire quiz state lives in a single Zustand store with the `persist` middleware. This gives localStorage auto-save for free — any page refresh or browser close restores the quiz to exactly where the user left off. The store shape must accommodate:

- `currentStep: number` — index into the questions array (0-based)
- `answers: Record<string, string>` — keyed by question ID, value is the selected answer ID
- `email: string | null` — captured at the email gate step
- `sessionId: string | null` — Supabase `quiz_sessions.id` UUID, set after the session row is inserted at quiz start
- `userId: string | null` — Supabase anonymous user ID, set after `signInAnonymously()` at quiz start

```typescript
// stores/quizStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface QuizState {
  currentStep: number
  answers: Record<string, string>   // questionId -> answerId
  email: string | null
  sessionId: string | null          // quiz_sessions.id
  userId: string | null             // auth.users.id (anonymous)
  setAnswer: (questionId: string, answerId: string) => void
  setCurrentStep: (step: number) => void
  setEmail: (email: string) => void
  setSessionId: (id: string) => void
  setUserId: (id: string) => void
  reset: () => void
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      currentStep: 0,
      answers: {},
      email: null,
      sessionId: null,
      userId: null,
      setAnswer: (questionId, answerId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: answerId } })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setEmail: (email) => set({ email }),
      setSessionId: (id) => set({ sessionId: id }),
      setUserId: (id) => set({ userId: id }),
      reset: () => set({ currentStep: 0, answers: {}, email: null, sessionId: null, userId: null }),
    }),
    { name: 'quiz-session' }   // localStorage key
  )
)
```

**Key design decisions:**
- `persist` middleware uses `localStorage` by default (correct — not `sessionStorage`, which doesn't survive tab close)
- `answers` stores `answerId` (not the display text) — the scoring algorithm maps answer IDs to dimension scores via the question bank
- `sessionId` is set when the Supabase session row is created at quiz start — allows mid-quiz updates if needed
- `reset()` is called when the user completes the quiz and the data is persisted to Supabase, to clean up localStorage

### Pattern 3: nuqs for URL Step Synchronization (QUIZ-03)

nuqs syncs the current question step to the URL (`?step=N`). This enables:
- Browser Back button to go to the previous question (QUIZ-03)
- Bookmarking / sharing a specific question
- The URL as a source of truth for the step, avoiding "ghost state" where the UI shows one step but the URL shows another

```typescript
// In QuizShell.tsx
import { useQueryState } from 'nuqs'

const [step, setStep] = useQueryState('step', {
  parse: (v) => parseInt(v) || 0,
  serialize: String,
  defaultValue: 0,
  history: 'push',   // IMPORTANT: 'push' adds browser history entries (enables Back button)
})
```

**Critical nuqs configuration:**
- `history: 'push'` (not `'replace'`) — each question advance adds a history entry so the browser Back button navigates between questions
- `defaultValue: 0` — works correctly when no `?step` param is in the URL (quiz start)
- Zustand `currentStep` and nuqs `step` must stay in sync — nuqs is the source of truth for step; Zustand's `currentStep` should be updated to match nuqs on mount

**Resumption flow:** If the user returns with a saved Zustand store (localStorage), they may have `currentStep: 8` in the store but the URL shows `?step=0` (or no step). On mount, the QuizShell should prioritize the nuqs URL step if it's non-zero, otherwise fall back to the Zustand store's last step. The simplest approach: always restore from Zustand on mount, then sync nuqs to match.

### Pattern 4: Question Bank Design (`lib/quiz/questions.ts`)

The question bank is a data-first deliverable. Each question must:

1. Have a unique `id` (kebab-case, e.g., `"q-emotional-warmth-01"`)
2. Specify which `lens` it belongs to: `'past'` | `'current'` | `'aspirational'`
3. Have a warm, conversational `question` string (not clinical)
4. Have an optional `leadIn` string (gentle normalizing sentence before the question — for sensitive questions)
5. Have an optional `whyWeAskThis` string (tap-to-reveal helper text — for sensitive questions)
6. Have an array of `options` (each with `id` and `label`)
7. Have a `dimensionWeights` record mapping dimension keys to score values for each option

The scoring mechanism: each `option` has a `score` that maps to a 1-10 dimension value for the relevant dimension(s). The scoring algorithm in `scoring-matrix.ts` takes a complete `DimensionProfile` and computes archetype similarity — Phase 2 must compute the `DimensionProfile` from raw answers before calling `scoreArchetypes()`.

```typescript
// lib/quiz/questions.ts — type definition

export interface QuizOption {
  id: string          // e.g., "often", "rarely", "sometimes"
  label: string       // Display text for the option card
}

export interface QuizQuestion {
  id: string                                   // e.g., "q-warmth-past-01"
  lens: 'past' | 'current' | 'aspirational'
  section: string                              // e.g., "Your Upbringing", "Your Parenting Today"
  question: string                             // The question text in warm, conversational tone
  leadIn?: string                              // Optional gentle sentence before the question (sensitive questions)
  whyWeAskThis?: string                        // Optional tap-to-reveal helper text
  inputType: 'option-cards' | 'searchable-dropdown'
  options: QuizOption[]
  // dimensionScores maps option.id → Record<DimensionKey, number>
  // The number is the raw 1-10 score for that dimension if this option is selected
  dimensionScores: Record<string, Partial<Record<string, number>>>
}
```

**Scoring computation at quiz completion:**
```typescript
// Pseudocode for computing DimensionProfile from answers
function computeDimensionProfile(
  answers: Record<string, string>,   // questionId -> optionId
  questions: QuizQuestion[]
): DimensionProfile {
  const dimensionAccumulators: Record<string, number[]> = {}

  for (const question of questions) {
    const selectedOptionId = answers[question.id]
    if (!selectedOptionId) continue
    const optionScores = question.dimensionScores[selectedOptionId]
    if (!optionScores) continue
    for (const [dimKey, score] of Object.entries(optionScores)) {
      if (!dimensionAccumulators[dimKey]) dimensionAccumulators[dimKey] = []
      dimensionAccumulators[dimKey].push(score)
    }
  }

  // Average scores across all questions that contribute to each dimension
  const profile: DimensionProfile = {}
  for (const [dimKey, scores] of Object.entries(dimensionAccumulators)) {
    profile[dimKey] = scores.reduce((a, b) => a + b, 0) / scores.length
  }

  // Fill in any dimension with no contributing questions with midpoint (5)
  for (const key of DIMENSION_KEYS) {
    if (!(key in profile)) profile[key] = 5
  }

  return profile
}
```

**Question bank scope:**
- Target: 25-35 questions (supports 10-20 minute quiz per QUIZ-08)
- Lens split: Phase 2 implements the **Past lens only** (the core quiz everyone completes). Current and Aspirational lenses are opt-in continuations (deferred to a future phase). This is consistent with how `softInferCurrentFromPast()` works in `scoring-matrix.ts` — it infers current/aspirational from the past result.
- Dimension coverage: Each of the 11 dimensions should have at least 2 questions contributing to it. Dimensions with more clinical weight (Emotional Warmth, Boundary Consistency, Emotional Regulation) should have 3-4 questions.
- The `candidateQuestions` in `lib/quiz/dimensions.ts` are starting points, not final questions. Every question must be rewritten into the warm-friend tone.

**Cultural background question (QUIZ-06):**
- Uses `inputType: 'searchable-dropdown'` — the only question that breaks from tappable option cards
- Pre-listed options correspond to the 5 cultural contexts in the archetype framework: "East Asian collectivist (Chinese, Korean, Japanese)", "South Asian joint-family (Indian, Pakistani, Bangladeshi)", "Latin American familismo", "Sub-Saharan African community-centred", "Western / individualist", plus a free-text "Other" option
- The selected label is what gets stored in `quiz_sessions.cultural_background` (dedicated column)
- This question does NOT contribute to dimension scoring — it is a metadata field used for PDF personalization in Phases 5-6

**Sensitive questions requiring `whyWeAskThis` (QUIZ-05):**
Questions that touch on: childhood trauma or difficulty, parental emotional patterns, parentification, narrative coherence about past. At minimum: all Narrative Coherence questions, Role Integrity questions, and the cultural background question.

Example lead-in for a Narrative Coherence question:
> Lead-in: "Many of us haven't had a reason to put our childhood into words before. There's no right or wrong answer here — just what's true for you."
> Question: "If someone asked you to describe your childhood in a few minutes, how easy would it be to give them a clear, honest picture — including both the good and the hard parts?"

### Pattern 5: Anonymous Supabase Session at Quiz Start

At quiz start (first page load on `/quiz`), the `QuizShell` component calls `signInAnonymously()` and stores the returned `user.id` in the Zustand store. This happens once — subsequent renders check whether `userId` is already set in the store.

```typescript
// In QuizShell.tsx (Client Component)
useEffect(() => {
  async function initSession() {
    if (store.userId) return  // Already initialized (returning user from localStorage)

    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.signInAnonymously()
    if (error || !user) {
      // Handle error — show error state or retry
      return
    }
    store.setUserId(user.id)

    // Create the quiz_sessions row immediately at quiz start
    // This is the "started_at" checkpoint and allows mid-quiz recovery
    const { data: session, error: sessionError } = await supabase
      .from('quiz_sessions')
      .insert({ user_id: user.id, status: 'in_progress' })
      .select('id')
      .single()

    if (session) store.setSessionId(session.id)
  }

  initSession()
}, [])
```

**Why create the session row at quiz start (not at completion):**
- Enables mid-quiz recovery tracking in analytics (`status = 'in_progress'` rows show funnel drop-off)
- Phase 3 can use the `sessionId` to look up the completed session without passing it through the URL
- On quiz completion, the row is UPDATEd (not INSERTed), which is simpler than creating the row at the end

**Resumption flow for returning users (QUIZ-07):**
If `store.userId` and `store.sessionId` are already set from localStorage, skip `signInAnonymously()`. However, the Supabase anonymous session may have expired (JWT expiry is typically 1 hour by default for anonymous users). The quiz must handle session expiry gracefully — call `supabase.auth.getSession()` and if the session is expired, call `signInAnonymously()` again to create a fresh anonymous user (the old answers in localStorage are still valid even though the Supabase session user changed).

### Pattern 6: Quiz Completion and Supabase Write

On the last answer selection, after the email capture step:

```typescript
// Pseudocode for onQuizComplete in QuizShell.tsx
async function onQuizComplete(email: string) {
  const { answers, sessionId, userId } = useQuizStore.getState()

  // Step 1: Compute dimension profile from answers
  const dimensionProfile = computeDimensionProfile(answers, QUESTIONS)

  // Step 2: Score archetypes
  const result = getResult(dimensionProfile)

  // Step 3: Extract cultural background (it's a special question, not a dimension score)
  const culturalBackground = answers['q-cultural-background'] ?? null

  // Step 4: Update quiz_sessions row with completed data
  const supabase = createClient()
  const { error } = await supabase
    .from('quiz_sessions')
    .update({
      status: 'completed',
      answers: answers,                           // raw answers JSONB
      dimension_scores: dimensionProfile,          // computed scores JSONB
      archetype_id: result.primary,               // primary archetype ID
      cultural_background: culturalBackground,    // dedicated column
      email: email,
      completed_at: new Date().toISOString(),
    })
    .eq('id', sessionId)
    .eq('user_id', userId)   // RLS double-check

  if (error) {
    // Handle error — show retry state
    return
  }

  // Step 5: Show processing screen (2-3 seconds)
  // Step 6: Redirect to /result?session=<sessionId>
  router.push(`/result?session=${sessionId}`)
}
```

**Note on the `answers` JSONB shape:** The raw answers object (`Record<questionId, optionId>`) is stored as-is. Phase 5 AI content generation reads this to inject verbatim quiz answers into prompts. The `dimension_scores` JSONB stores the computed `DimensionProfile` (all 11 dimension keys with their 1-10 float scores) — Phase 3 result display reads this for the archetype result, and Phase 5 uses it for prompt context.

### Pattern 7: Quiz API Route Handler

The completion write happens client-side (via the anon Supabase client), not through an API route. RLS ensures the anonymous user can only UPDATE their own row. An API Route Handler is not needed for the quiz session write — it would add complexity without benefit since the client has RLS-scoped access.

**However**, a Route Handler at `app/api/quiz/route.ts` may be useful as a fallback for server-side writes if the client-side update fails or if the quiz session needs to be created server-side. This is discretionary and can be deferred.

---

## Component Design

### QuizShell.tsx (Client Component)

The single top-level orchestrator. Responsibilities:
- Initializes Supabase anonymous session on mount
- Holds the `step → QuizCard / EmailCaptureScreen / ProcessingScreen` rendering logic
- Manages the slide transition animation (Framer Motion or CSS transitions)
- Reads `currentStep` from nuqs (URL state) and keeps Zustand in sync
- Passes question data, current answer, and `onAnswer` callback to `QuizCard`

```tsx
// QuizShell.tsx — structural pseudocode
'use client'

const totalSteps = QUESTIONS.length  // + 1 for email screen + 1 for processing

if (step < totalSteps) {
  return <QuizCard question={QUESTIONS[step]} ... />
} else if (step === totalSteps) {
  return <EmailCaptureScreen onSubmit={onQuizComplete} />
} else {
  return <ProcessingScreen />
}
```

### QuizCard.tsx

Renders a single question. Contains:
- Optional `QuizSectionHeader` when entering a new section
- Optional `leadIn` paragraph (sensitive question normalizing text)
- Question text (`<h2>` or `<p>`)
- `OptionCard` list or `CulturalDropdown`
- `WhyWeAskThis` tap-to-reveal (conditional on `question.whyWeAskThis`)
- Back button (top-left, hidden on `step === 0`)
- Progress bar (top of screen via `QuizProgress`)

### OptionCard.tsx

A full-width tappable button. States:
- Default: border, white/warm background
- Selected: colored background (brand warm color), checkmark or highlight
- Touch target: minimum 44x44pt (Apple HIG minimum)

Auto-advance: `onClick` fires `onAnswer(option.id)`, which sets the answer in Zustand, then a 300ms `setTimeout` before calling `setStep(step + 1)`. The delay allows the selected state to be visible before the card slides away.

### WhyWeAskThis.tsx

A small "Why do we ask this?" text link below the question. `onClick` toggles `isOpen` state. When open, renders an animated expandable section with the helper text. No modal — inline expansion keeps the user on the same card.

### EmailCaptureScreen.tsx

Not a quiz card — a dedicated full-screen UI. Uses React Hook Form + Zod for email validation. On submit:
1. Validates email format
2. Calls `onQuizComplete(email)` in QuizShell
3. QuizShell shows `ProcessingScreen` while the Supabase UPDATE completes

### ProcessingScreen.tsx

A warm, branded waiting screen shown for 2-3 seconds after email submission. Content:
- Warm message: "We're putting together your parenting blueprint..."
- Subtle animation (CSS spinner, animated dots, or simple fade sequence)
- No progress indicator — this is a fixed 2-3 second pause for emotional build-up, not a real wait

After 2-3 seconds (or when the Supabase write resolves, whichever is later), redirect to `/result?session=<sessionId>`.

---

## Question Bank Design Guidance

The question bank (`lib/quiz/questions.ts`) is a content deliverable as much as a code deliverable. Design constraints:

**Voice and tone:**
- Every question must pass the "warm friend" test: would a knowledgeable, caring friend ask this question over coffee?
- Use second-person ("you", "your parents") not third-person clinical language
- Use specific behavioral scenarios over abstract value questions ("What do you do when..." not "Do you believe in...")
- Past lens questions use memory framing ("Think back to...", "Growing up...")
- Present lens questions use behavioral present tense ("When your child...", "How often do you...")

**Question distribution across dimensions (suggested):**

| Dimension | Suggested Questions | Lens |
|-----------|--------------------|----|
| Emotional Warmth | 3 | Past (2), Current (1) |
| Boundary Consistency | 3 | Past (2), Current (1) |
| Autonomy Support | 2 | Past (1), Current (1) |
| Emotional Regulation | 3 | Past (2), Current (1) |
| Protective Instinct | 2 | Past (1), Current (1) |
| Narrative Coherence | 3 | Past (3) — Past-lens-only dimension |
| Presence & Attunement | 2 | Past (1), Current (1) |
| Repair & Reconnection | 3 | Past (2), Current (1) |
| Role Integrity | 3 | Past (3) — strongest past-lens signal |
| Reciprocity | 2 | Past (1), Current (1) |
| Nonjudgmental Acceptance | 2 | Past (1), Current (1) |
| Cultural Background | 1 | N/A (metadata, no dimension score) |

**Total: ~29 questions** — sits comfortably in the 25-35 target range.

**Section grouping (suggested, Claude's discretion):**

| Section Name | Questions |
|--------------|-----------|
| "About You" | 2-3 context/intro questions (low-stakes, builds rapport) |
| "Your Upbringing" | Past-lens questions (Warmth, Boundaries, Autonomy, Role Integrity, Narrative Coherence, Repair) |
| "Your Parents' Patterns" | Past-lens questions (Emotional Regulation, Presence, Protective Instinct, Reciprocity, NJA) |
| "Your Parenting Today" | Current-lens questions across multiple dimensions |
| "Your Background" | Cultural background dropdown (positioned here, not at quiz start — trust is established) |

**Likert scale standardization:**
Use a consistent 5-option Likert scale for frequency questions:
- Never / Rarely / Sometimes / Often / Always → maps to scores 1 / 3 / 5 / 7 / 9

For behavioral scenario questions, options are scenario-specific labels (not a Likert scale). Each option maps to a 1-10 score for the relevant dimension(s).

**Questions that require `whyWeAskThis`:**
All Narrative Coherence questions, all Role Integrity questions, and the cultural background question. These are the most psychologically sensitive areas.

Example for Narrative Coherence:
```
whyWeAskThis: "How easily we can tell our own story doesn't depend on whether childhood was easy or hard — it's about how we've made sense of it since. This helps us understand a key part of how past experiences shape present parenting."
```

---

## UI/UX Patterns

### Slide Transition Between Cards

Forward = slide left (new card enters from right, old card exits to left).
Back = slide right (new card enters from left, old card exits to right).

Implementation options (in preference order):
1. **CSS `transition` + `transform`** — simplest, no extra library, sufficient for card slides
2. **Framer Motion `AnimatePresence`** — more control over enter/exit animations, `initial`, `animate`, `exit` props; worth adding if CSS transitions feel clunky

```tsx
// CSS approach (simplest)
<div
  key={step}
  style={{ animation: direction === 'forward' ? 'slideInRight' : 'slideInLeft' }}
>
  <QuizCard ... />
</div>
```

The `direction` state (forward/back) is set in the store when `setCurrentStep` is called — track whether the new step is greater than or less than the previous step.

### Progress Bar (QUIZ-02)

- Position: top edge of the screen (above everything, even the back button)
- Width: `(answeredQuestions / totalQuestions) * 100%`
- Height: thin (3-4px)
- Color: brand warm color
- No text labels on the bar itself (clean, minimal)

```tsx
// QuizProgress.tsx
<div className="w-full h-1 bg-gray-100 fixed top-0 left-0 z-50">
  <div
    className="h-full bg-amber-500 transition-all duration-300"
    style={{ width: `${(step / totalSteps) * 100}%` }}
  />
</div>
```

### Mobile-First Layout (QUIZ-04)

- Full-viewport height card (`min-h-screen` or `h-dvh` for iOS dynamic viewport)
- Max width constrained at `max-w-lg` (centered on tablet/desktop, full-width on mobile)
- Option cards: full width, `py-4 px-5`, `rounded-xl`, clear tap targets
- No horizontal scroll
- Back button: `absolute top-4 left-4` with `w-10 h-10 flex items-center justify-center` (thumb-friendly)
- Text size: `text-lg` or `text-xl` for question text (readable without pinching)

### Section Header Display

When the user advances into a new section (e.g., from "About You" to "Your Upbringing"), briefly show the section name. Two options:
- **In-card**: the first question of each new section has its `section` name displayed above the question text with a subtle divider or label style
- **Transition screen**: a 0.5-second section header card appears between the last question of one section and the first of the next, then auto-advances

The in-card approach is simpler and does not interrupt the rhythm of the quiz.

---

## Next.js Application Bootstrap

The very first deliverable in Phase 2 must be the Next.js project scaffold. This is non-trivial because the current project structure is not a Next.js application — it has `lib/`, `scripts/`, and `supabase/` directories but no `app/`, no `next.config.ts`, and `package.json` has no Next.js dependencies.

**Bootstrap command:**

`create-next-app` must be run carefully to avoid overwriting existing files. The recommended approach is to run it in a temporary directory, then merge:

```bash
# Option A: Bootstrap in place (careful — will prompt to overwrite conflicts)
npx create-next-app@latest . --typescript --tailwind --app --no-eslint --no-src-dir

# Option B: Bootstrap in temp, then merge manually
npx create-next-app@latest /tmp/rg-bootstrap --typescript --tailwind --app --no-eslint --no-src-dir
# Then copy: app/, public/, next.config.ts, and merged package.json
```

**Files to preserve from current project:**
- `lib/` directory (all archetype and quiz framework files)
- `scripts/` directory
- `supabase/` directory
- `tsconfig.json` (review and merge with Next.js tsconfig)
- `package.json` (merge — keep existing deps, add Next.js deps)
- `.env.local` (existing Supabase env vars)

**New files added by create-next-app:**
- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `next.config.ts`
- Updated `tsconfig.json` (with Next.js paths)
- Updated `package.json` (with `next`, `react`, `react-dom`, etc.)
- `tailwind.config.ts` or CSS `@theme` (Tailwind v4 uses CSS config)
- `public/` directory

**Required additions to `next.config.ts`:**
```typescript
// next.config.ts
const nextConfig = {
  serverExternalPackages: ['@react-pdf/renderer'],  // Phase 6 prep — safe to add now
}
export default nextConfig
```

**Dependencies to install after scaffold:**
```bash
# Quiz state management
npm install zustand nuqs react-hook-form zod @hookform/resolvers

# Biome (replaces ESLint + Prettier)
npm install --save-dev @biomejs/biome

# shadcn/ui (installs via CLI, not npm)
npx shadcn@latest init
```

---

## Data Flow Summary

```
1. User lands on /quiz
   → QuizShell mounts (Client Component)
   → Check Zustand store (localStorage): has userId?
     → No: supabase.auth.signInAnonymously()
             → store.setUserId(user.id)
             → supabase.from('quiz_sessions').insert({ user_id, status: 'in_progress' })
             → store.setSessionId(session.id)
     → Yes: supabase.auth.getSession() → check if still valid
             → If expired: signInAnonymously() again (new userId, but localStorage answers preserved)
             → Restore to last step (from Zustand store)

2. User answers questions (client-only)
   → OptionCard.onClick → store.setAnswer(questionId, optionId)
   → 300ms delay → setStep(step + 1) [nuqs URL update]
   → localStorage updated automatically by Zustand persist middleware

3. User leaves mid-quiz, returns later (QUIZ-07)
   → Zustand rehydrates from localStorage on mount
   → nuqs is synced to store.currentStep on mount
   → Quiz resumes at last answered question

4. User reaches email capture screen (step === QUESTIONS.length)
   → EmailCaptureScreen renders
   → User enters email, submits
   → onQuizComplete(email) called in QuizShell

5. onQuizComplete executes
   → computeDimensionProfile(answers, QUESTIONS)
   → getResult(dimensionProfile) → { primary: 'steady-anchor', secondaries: [...] }
   → Extract cultural_background from answers
   → supabase.from('quiz_sessions').update({ status: 'completed', answers, dimension_scores,
       archetype_id, cultural_background, email, completed_at })
       .eq('id', sessionId).eq('user_id', userId)
   → setStep(totalSteps + 1) → ProcessingScreen renders

6. ProcessingScreen (2-3 seconds)
   → Warm message + subtle animation
   → router.push('/result?session=' + sessionId)
   → store.reset() [clear localStorage]  ← can be deferred to Phase 3
```

---

## Phase Boundary Outputs

At the end of Phase 2, the following must be TRUE:

| Criterion | How to Verify |
|-----------|--------------|
| Quiz renders one question per screen in card-style layout | Visual check in browser (mobile viewport) |
| Progress bar visible and updates correctly | Visual check — bar fills as steps advance |
| Back button navigates to previous question without losing answers | Navigate forward 3 steps, press Back, answers still present |
| localStorage auto-save — answers restored on page refresh | Fill 5 answers, refresh page, confirm quiz resumes at step 5 |
| "Why we ask this" helper text visible and tap-to-reveal on sensitive questions | Tap link on a Narrative Coherence question, text expands |
| Cultural background question renders as searchable dropdown | Reach the cultural background question, type to filter |
| Email capture screen appears after last question | Complete all questions, email screen renders |
| After email submit: quiz_sessions row updated in Supabase | Check Supabase Studio — row shows status='completed', archetype_id set, cultural_background set, dimension_scores populated, email set |
| Anonymous user can read their own completed session | `supabase.from('quiz_sessions').select().eq('id', sessionId)` returns the row via anon client |
| Mobile layout: full width, large tap targets, no horizontal scroll | Test on iPhone Safari (physical device or Xcode simulator) |

---

## Common Pitfalls to Avoid

### Pitfall 1: Questions That Feel Clinical or Leading

The 11 `candidateQuestions` in `lib/quiz/dimensions.ts` are internal research references, not final question text. Many are too long, too abstract, or too clinical for the warm-friend tone. Every question must be rewritten. Red flags:
- Questions over 30 words (cognitive load)
- Questions that use dimension names in the question ("How emotionally regulated are you?")
- Questions that assume therapy familiarity ("On the autonomy-support scale...")
- Leading options that make one answer obviously "better" ("I always listen carefully vs. I never pay attention")

### Pitfall 2: Auto-Advance Without Accessible Confirmation

Auto-advance on tap is fast and fluid, but some users tap accidentally. Options:
- The 300ms delay gives a visible selected state before advancing
- The back button is always present to undo an accidental advance
- Do not make options so close together that mis-taps are frequent (full-width cards eliminate this)

### Pitfall 3: Zustand Store Not Rehydrating Before Render

Zustand's `persist` middleware rehydrates from localStorage asynchronously. If the `QuizShell` renders immediately and reads `store.currentStep === 0` before rehydration, returning users see the quiz start instead of their last position.

Fix: use Zustand's `useStore` with a hydration check, or show a brief loading state until rehydration is confirmed:

```typescript
// Store hydration check
const hasHydrated = useQuizStore.persist.hasHydrated()
if (!hasHydrated) return <div className="min-h-screen" />  // blank while rehydrating
```

### Pitfall 4: nuqs and Zustand Step Getting Out of Sync

If both nuqs and Zustand store the current step, they can diverge. The canonical rule: **nuqs is the step source of truth for rendering; Zustand `currentStep` is only for localStorage persistence**. On mount, if the URL has `?step=N`, render step N. If the URL has no step param, use `store.currentStep` from localStorage and sync nuqs to it.

### Pitfall 5: Quiz Session Row Created Without userId Set

If `signInAnonymously()` fails silently (network error, Supabase unreachable), `store.userId` will be null. The quiz session INSERT will fail because `user_id NOT NULL`. The quiz must handle this gracefully — show a retry state rather than silently losing progress.

### Pitfall 6: cultural_background Stored as a Dimension Score

Cultural background is a metadata field, not a scoring dimension. It must NOT appear in the `answers` JSONB as a regular answer, nor in `dimension_scores`. It gets stored in `quiz_sessions.cultural_background` (its dedicated column). When `computeDimensionProfile()` is called, it should skip any question where `question.inputType === 'searchable-dropdown'` (or check for `question.id === 'q-cultural-background'`).

### Pitfall 7: Forgetting to Handle Returning Users with Expired Supabase Sessions

Supabase anonymous sessions have a JWT that expires. If a user started the quiz 2 hours ago, left, and returns, their session may be expired. `supabase.auth.getSession()` will return null. The app must call `signInAnonymously()` again — this creates a new anonymous user. The localStorage answers are still valid; only the `userId` and `sessionId` need updating. The new quiz session must be created for the new userId. This is the "resume flow" edge case — plan for it.

---

## State of the Art

| Old Approach | Current Approach | Impact |
|-------------|-----------------|--------|
| Manual `useState` per quiz step | Zustand store with `persist` — cross-step state + localStorage in one setup | Eliminates multiple `useState` chains; localStorage is free via middleware |
| URL step tracking with `router.push` + `searchParams` | nuqs `useQueryState` | nuqs handles serialization, parsing, history, and SSR-safe default values; no manual query string manipulation |
| React Hook Form for every quiz step | React Hook Form only for email capture; option card taps go directly to Zustand | Avoids form abstraction overhead for simple single-select interactions that don't need validation |
| Manual `transition` for card animations | `AnimatePresence` from Framer Motion or CSS `@keyframes` | Native CSS transitions are sufficient for the slide left/right pattern; Framer Motion adds ~27KB |
| Tailwind v3 with `tailwind.config.js` | Tailwind v4 with CSS `@theme` directive | v4 is stable (Feb 2025); no config file; design tokens live in CSS layer |

---

## Open Questions

1. **Should Phase 2 include the landing page entry point (`app/page.tsx`)?**
   - What we know: The ROADMAP assigns the landing page to Phase 7. Phase 2's scope is the quiz engine.
   - What's needed: Users must be able to navigate to `/quiz` to start the quiz. A minimal `app/page.tsx` with a "Start Quiz" button is needed so testers can access the quiz without manually navigating to `/quiz`.
   - Recommendation: Create a minimal `app/page.tsx` (a single "Take the Quiz" CTA button that links to `/quiz`) as a placeholder. This is not the Phase 7 landing page — just enough to access the quiz during development. The Phase 7 landing page will replace it.

2. **Should the quiz session UPDATE happen on every answer (incremental saves) or only on quiz completion?**
   - What we know: CONTEXT.md decisions say email is required to see results. Architecture research recommends writing once on completion.
   - What's unclear: If the user completes 25/29 questions and closes the browser, their `quiz_sessions` row shows `status = 'in_progress'` with `answers = null` (because the write hasn't happened yet). This is fine for analytics (funnel tracking) but means no server-side save.
   - Recommendation: Write once on completion (simplest, no partial-save complexity). localStorage handles mid-quiz resumption. If there's a business requirement to recover partially-completed sessions server-side, add incremental saves in a later phase.

3. **How many questions should the initial question bank contain?**
   - What we know: QUIZ-08 targets 10-20 minutes. At ~30-45 seconds per question (reading + selecting), 25 questions = ~12-18 minutes.
   - Recommendation: Target 25-30 questions in the initial bank. This is the minimum for the 10-minute threshold while keeping the quiz focused. Sophia may want to review and add questions before launch — the data structure supports adding questions without changing the scoring algorithm.

4. **Should the quiz implement the three-lens model (Past/Current/Aspirational) in Phase 2?**
   - What we know: `softInferCurrentFromPast()` exists in `scoring-matrix.ts` and infers current/aspirational from past. The ROADMAP does not mention lenses as a Phase 2 deliverable.
   - Recommendation: Phase 2 implements the Past lens only (all questions are Past lens). Current and Aspirational lenses are deferred. The `answers` JSONB and `dimension_scores` store the past-lens data; `softInferCurrentFromPast()` is called at the Phase 3/5 boundary when the result is being displayed or personalized.

---

## Sources

- Project research: `.planning/research/STACK.md` — Zustand 5.x, nuqs 2.8.x, React Hook Form 7.71.x, Zod 4.3.x, Tailwind CSS 4.x, shadcn/ui, Biome — HIGH confidence (already validated)
- Project research: `.planning/research/ARCHITECTURE.md` — Pattern 1 (Zustand + Server Persist), Pattern 2 (Anonymous Session), state management flow diagram — HIGH confidence
- Project research: `.planning/research/FEATURES.md` — Table stakes features, quiz UX patterns, mobile requirements — MEDIUM confidence
- Project research: `.planning/research/PITFALLS.md` — Pitfall 3 (quiz fatigue), Pitfall 7 (archetype scoring), UX pitfalls table — MEDIUM confidence
- `lib/quiz/dimensions.ts` — 11 dimension definitions with `candidateQuestions` seed ideas — HIGH confidence (built and validated in Phase 0)
- `lib/quiz/scoring-matrix.ts` — `scoreArchetypes()`, `getResult()` — HIGH confidence (validated against 28 simulated profiles in Phase 0)
- `lib/archetypes/archetypes.ts` — 9 archetype definitions — HIGH confidence (Phase 0 output)
- `supabase/migrations/20260224000000_phase1_data_foundation.sql` — `quiz_sessions` table schema — HIGH confidence (deployed and verified in Phase 1)
- `.planning/phases/02-quiz-engine/02-CONTEXT.md` — Locked user decisions for this phase — HIGH confidence (primary source)
- [Zustand persist middleware docs](https://docs.pmnd.rs/zustand/integrations/persisting-store-data) — persist API, localStorage default, hasHydrated() — HIGH confidence (official docs)
- [nuqs App Router docs](https://nuqs.47ng.com/docs/adapters/next#app-router) — `useQueryState`, `history: 'push'`, NuqsAdapter setup — HIGH confidence (official docs)
- [shadcn/ui Tailwind v4 docs](https://ui.shadcn.com/docs/tailwind-v4) — Updated Feb 2025 for Tailwind v4 + React 19 — HIGH confidence

---

## Research Metadata

**Confidence breakdown:**
- Next.js scaffold pattern: HIGH — well-established `create-next-app` workflow
- Zustand + nuqs quiz state pattern: HIGH — documented pattern used by Vercel, Supabase
- Question bank structure: MEDIUM-HIGH — data shape is clear; content design (actual questions) requires care
- Supabase session write pattern: HIGH — same anon client established in Phase 1; UPDATE operation on existing row is straightforward
- Scoring computation at completion: HIGH — `getResult()` is already implemented and validated

**Research date:** 2026-02-24
**Valid until:** 2026-05-24 (90 days — Next.js 15.5 and Zustand 5.x are stable; Tailwind v4 and nuqs 2.x are stable)

---

*Phase: 02-quiz-engine*
*Research completed: 2026-02-24*
