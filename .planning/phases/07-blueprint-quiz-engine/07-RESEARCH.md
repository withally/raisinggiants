# Phase 7: Blueprint Quiz Engine - Research

**Researched:** 2026-03-13
**Domain:** Next.js 16 / React 19 / Zustand 5 / Supabase — quiz state management, localStorage isolation, DB migrations
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Parent-status gating**
- Presented as a distinct **pre-quiz selector screen** (not a card-style quiz question) — a branching-path selection before the quiz begins
- Three options: "I'm a parent now" / "I'm expecting" / "Planning for someday"
- Selected status **adapts both question wording AND section intro copy** throughout the quiz (e.g. "As a parent, when your child..." vs "When you imagine your future child...")
- Parent status is stored alongside quiz answers

**Email capture**
- Blueprint intro screen always shows the email field
- **Pre-fill email from Mirror quiz if available** in localStorage — user can confirm or change
- Still show the email step even if pre-filled (don't skip it)

**Quiz length and structure**
- Similar length to Mirror quiz (~20 questions)
- Questions grouped into **parenting-domain sections** with section headers (e.g. "Daily moments", "Discipline & boundaries", "Emotional connection")
- Section headers provide pacing and context, matching Mirror quiz pattern

**Quiz visual identity**
- **Same shell and components** as Mirror quiz (QuizCard, QuizProgress, animations, layout)
- **New accent color palette** — teal/green tones replacing the Mirror's plum/warm (#4A1942)
- Same cream background (#FAFAF7), same card shapes, same slide animations
- Feels like the same product family, visually differentiated at a glance

**Quiz tone and copy**
- **Warm & curious** intro tone: "Let's explore your parenting instincts" — same gentle register as Mirror but focused on the present/future
- **Briefer closing transition** before processing — less emotional, more "Your results are ready" momentum toward the result screen
- Processing screen matches Mirror's emotional pacing pattern

**Product flow (key architectural decision)**
- **Pay-first model**: User pays on Blueprint landing page (Phase 8) → gets access to take quiz → sees full result
- **No teaser screen** — since user has already paid, the result page shows the complete archetype breakdown
- The result page IS the paid product (web-based report, not a downloadable PDF)
- BQUIZ-04 from requirements needs to be reinterpreted: no "proceed to purchase" CTA on result screen since payment already happened

**Result screen**
- **Rich reveal matching Mirror structure** but with own-parenting lens: archetype reveal → parenting patterns → blind spots/watchouts → cultural lens
- Same sections as Mirror, reframed: "Your parenting patterns" instead of "What you inherited"
- **Bridge comparison section** shown if user has completed BOTH Mirror and Blueprint quizzes — "What you inherited vs how you parent" (pulls Mirror session data)
- **Access control**: Session URL + email verification — user must enter the email they used before results are shown (prevents casual link-sharing of paid content)

### Claude's Discretion
- Exact teal/green color values for Blueprint accent palette
- Section header names and groupings for parenting questions
- Closing transition copy
- Processing screen design (can match or slightly adapt Mirror's)
- How the email verification gate is presented (inline form, modal, etc.)

### Deferred Ideas (OUT OF SCOPE)
- **Web-based report instead of PDF** — User wants the "report" to be a web page, not a downloadable PDF. The "generate your report" action produces a web-based result, not a file. This fundamentally reshapes Phase 9 (PDF Generation & Delivery) into a web report phase. Captured here for roadmap consideration.
- **Pay-first landing/sales page** — The Blueprint has its own landing page where payment happens. This is Phase 8 + Phase 10 scope (LAUNCH-02), but the pay-first flow is a locked product decision that those phases must honor.
- Purchase CTA design — no longer needed on result screen since payment is pre-quiz
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| BQUIZ-01 | User sees a parent-status gating question ("Are you a current parent / expecting / planning?") that adapts quiz framing | Pre-quiz selector screen architecture documented; `parentStatus` field added to Blueprint Zustand store |
| BQUIZ-02 | User takes a full own-parenting quiz (card-style, one question per screen, progress bar, back navigation) | Existing QuizCard, QuizProgress, and QuizShell components are directly reusable with new color palette token |
| BQUIZ-03 | Blueprint quiz scores into one of 9 archetypes using existing scoring engine (own-parenting lens) | `computeDimensionProfile()` and `getResult()` from `lib/quiz/scoring-matrix.ts` work with any question array passed in — confirmed by function signature |
| BQUIZ-04 | User sees their own-parenting archetype result (CONTEXT.md re-scopes: full result since pay-first; no teaser/CTA needed) | Result page pattern from Mirror is the template; new Blueprint result page at `/blueprint/result` |
| BQUIZ-05 | Blueprint quiz answers persist to `bp_quiz_sessions` in Supabase | Two prerequisite DB migrations documented; new API route `/api/bp-quiz-session` pattern follows existing `quiz-session` route |
| BQUIZ-06 | Blueprint quiz state persists in localStorage (separate key from Mirror quiz) | Zustand `persist` middleware with `name: "blueprint-quiz-session"` — confirmed in STATE.md as locked decision `[v2-STORE]` |
</phase_requirements>

---

## Summary

Phase 7 builds the Blueprint quiz engine on top of the already-solid Mirror quiz infrastructure. The key engineering insight is that almost all the hard work is done: `QuizCard`, `QuizProgress`, `QuizShell`, `ProcessingScreen`, `QuizSectionHeader`, `computeDimensionProfile()`, and `getResult()` all exist and are reusable. Phase 7 is primarily **composition** — wire up a Blueprint-flavored shell, add a parent-status selector screen before the quiz, create a new Zustand store with a distinct localStorage key, write two prerequisite DB migrations, and create a new API route and result page.

The two non-trivial problems are: (1) DB prerequisite migrations — `product_type` column on `quiz_sessions` and the new `bp_quiz_sessions` table must land before any quiz code ships; and (2) question templating — the Blueprint question bank uses "current-parenting lens" question text and must adapt wording per parent status (current / expecting / planning). The CONTEXT.md confirmed the question bank is a content dependency (Sophia/clinical dependency), so Phase 7 engineering must be written to accept the question bank as a placeholder initially, with real questions swapped in before shipping.

The access control for the result page (email verification gate) is a new pattern not present in the Mirror result page. The email verification should be an inline form on the result page (not a modal) — this is the pattern already scaffolded as `EmailGateOverlay.tsx` in `/components/result/`, which can be adapted.

**Primary recommendation:** Build BlueprintQuizShell as a composition of existing quiz components with a new Blueprint Zustand store. Write DB migrations first. Use the same two-step scoring pipeline (`computeDimensionProfile` + `getResult`) from the Mirror quiz, passing in the Blueprint question bank.

---

## Standard Stack

### Core (already in project — no new installs needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | ^16.1.6 | App Router, Server Components, API routes | Project foundation |
| React | ^19.2.4 | UI components | Project foundation |
| Zustand | ^5.0.11 | Blueprint quiz state + localStorage persistence | Already used for Mirror quiz; `persist` middleware handles localStorage isolation |
| `zustand/middleware` persist | (bundled) | Serialize/deserialize store to localStorage | `name` option = localStorage key; `partialize` option = exclude sensitive fields |
| nuqs | ^2.8.8 | URL step sync (`?step=N`) + browser back-button | Already used in Mirror QuizShell |
| Supabase JS | ^2.97.0 | `bp_quiz_sessions` inserts, result fetches | Project foundation |
| Tailwind CSS | ^4.2.1 | Styling with design tokens | Project foundation |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@supabase/ssr` | ^0.8.0 | Server-side Supabase client | For result page Server Component |
| lucide-react | ^0.575.0 | Icons (back arrow, check marks) | Already used in project |
| tw-animate-css | ^1.4.0 | Animate utilities (`animate-bounce`, etc.) | Already imported in globals.css |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Composing existing QuizCard | Building new Blueprint-specific card | New card = duplicate code, more maintenance. Existing QuizCard accepts accent colors as props — just pass Blueprint palette. |
| Separate `blueprintStore.ts` | Adding Blueprint state to existing `quizStore.ts` | Separate store is mandatory — sharing a store would risk cross-contamination of Mirror and Blueprint quiz state (confirmed in CONTEXT.md specifics). |
| Inline email verification gate | Full-page modal gate | Inline is simpler, matches existing EmailGateOverlay.tsx scaffold. Modal requires focus trapping, z-index management. |

**Installation:** No new packages needed. All dependencies are already present.

---

## Architecture Patterns

### Recommended Project Structure

```
stores/
└── blueprintStore.ts        # New — separate Zustand store, name: "blueprint-quiz-session"

lib/
└── quiz/
    └── blueprint-questions.ts  # New — current-parenting lens question bank (~20 questions)
    └── blueprint-section-palette.ts  # New — teal/green palette for Blueprint sections

app/
├── blueprint/
│   ├── page.tsx             # Replace existing "coming soon" page → redirect to /blueprint/quiz
│   ├── quiz/
│   │   └── page.tsx         # New — Blueprint quiz page (wraps BlueprintQuizShell)
│   └── result/
│       └── page.tsx         # New — Blueprint result page (Server Component, email gate)
└── api/
    └── bp-quiz-session/
        └── route.ts         # New — POST create, PATCH complete (mirrors quiz-session/route.ts)

components/
└── quiz/
    └── BlueprintQuizShell.tsx     # New — orchestrator component (adapted from QuizShell)
    └── ParentStatusSelector.tsx   # New — pre-quiz gating screen (3 status options)
└── blueprint-result/
    └── BlueprintArchetypeReveal.tsx   # New — archetype reveal, own-parenting lens
    └── BlueprintPatternsSection.tsx   # New — "Your parenting patterns"
    └── BlueprintWatchoutsSection.tsx  # New — blind spots / watchouts
    └── BlueprintCulturalSection.tsx   # New — cultural overlay (if applicable)
    └── BridgeComparisonSection.tsx    # New — "What you inherited vs how you parent"
    └── BlueprintEmailGate.tsx         # New — email verification gate (inline form)

supabase/
└── migrations/
    └── 20260313000000_add_product_type_to_quiz_sessions.sql  # Migration 1 — prerequisite
    └── 20260313000001_create_bp_quiz_sessions.sql            # Migration 2 — prerequisite
```

### Pattern 1: Blueprint Zustand Store (Separate localStorage Key)

**What:** A complete Zustand store for Blueprint quiz state, using `persist` middleware with `name: "blueprint-quiz-session"` — the Mirror store uses `name: "quiz-session"`. These two strings are the isolation boundary.

**When to use:** Any component that needs Blueprint quiz state (current step, answers, email, session ID, parent status).

**Example:**
```typescript
// stores/blueprintStore.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ParentStatus = "current-parent" | "expecting" | "planning";

interface BlueprintState {
  currentStep: number;
  answers: Record<string, string>;
  email: string | null;
  sessionId: string | null;
  parentStatus: ParentStatus | null;  // set on pre-quiz gating screen
  direction: "forward" | "back";

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
  parentStatus: null,
  direction: "forward" as const,
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
      name: "blueprint-quiz-session",  // CRITICAL: different key from "quiz-session"
      partialize: (state) => {
        const { email, ...rest } = state;
        return rest;  // never persist email to localStorage
      },
    },
  ),
);
```

**Source:** Adapted from existing `stores/quizStore.ts` — confirmed pattern.

### Pattern 2: Pre-Quiz Parent Status Selector

**What:** A full-screen selector shown before the email capture screen. User picks one of three parent statuses. The selected status is stored in `blueprintStore.parentStatus` and used downstream to template question text.

**When to use:** Step -1 (before step 0/email capture). Not a quiz card — a distinct screen.

**Example:**
```typescript
// components/quiz/ParentStatusSelector.tsx
"use client";

type ParentStatus = "current-parent" | "expecting" | "planning";

const STATUS_OPTIONS: { id: ParentStatus; label: string; sublabel: string }[] = [
  { id: "current-parent", label: "I'm a parent now", sublabel: "You have a child or children" },
  { id: "expecting", label: "I'm expecting", sublabel: "A baby is on the way" },
  { id: "planning", label: "Planning for someday", sublabel: "Not yet, but you're thinking about it" },
];

interface ParentStatusSelectorProps {
  onSelect: (status: ParentStatus) => void;
}

export function ParentStatusSelector({ onSelect }: ParentStatusSelectorProps) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#FAFAF7]">
      <div className="max-w-lg w-full">
        <h1 className="text-3xl text-[#1A1A1A] mb-8 font-bold text-center">
          First — a quick question
        </h1>
        <div className="space-y-3">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="w-full text-left p-5 rounded-2xl border border-[#E8E4DF] bg-white
                         hover:border-[#2D8B7A] hover:bg-[#F0FAF8] transition-colors"
            >
              <p className="font-semibold text-[#1A1A1A]">{option.label}</p>
              <p className="text-sm text-[#777] mt-0.5">{option.sublabel}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### Pattern 3: Reusing the Scoring Engine for Blueprint Questions

**What:** `computeDimensionProfile()` accepts a `questions` parameter override. Pass the Blueprint question bank to compute a Blueprint dimension profile using the identical scoring algorithm.

**When to use:** When `handleClosingContinue` fires in BlueprintQuizShell — same call site as Mirror.

**Example:**
```typescript
// In BlueprintQuizShell — closing handler
import { computeDimensionProfile } from "@/lib/quiz/compute-profile";
import { getResult } from "@/lib/quiz/scoring-matrix";
import { BLUEPRINT_QUESTIONS } from "@/lib/quiz/blueprint-questions";

const dimensionProfile = computeDimensionProfile(store.answers, BLUEPRINT_QUESTIONS);
const result = getResult(dimensionProfile);  // returns ArchetypeId primary + secondaries
```

**Source:** `lib/quiz/compute-profile.ts` — `questions: QuizQuestion[] = QUESTIONS` parameter already supports override. Confirmed by reading source.

### Pattern 4: Question Text Templating by Parent Status

**What:** Blueprint questions have a `current-parent` variant and an `expecting/planning` variant. Rather than two separate question banks, use a single bank where each question's `question` field is a function or the bank exports a helper that returns the correct wording given parent status.

**Recommended approach:** Export questions as plain objects with two text variants, and a `getBlueprintQuestions(parentStatus)` helper that returns the correctly-worded array.

**Example:**
```typescript
// lib/quiz/blueprint-questions.ts
export type ParentStatus = "current-parent" | "expecting" | "planning";

interface BlueprintQuestionRaw {
  id: string;
  section: string;
  question: Record<ParentStatus, string>;  // one string per status
  options: QuizOption[];
  dimensionScores: Record<string, Partial<Record<DimensionKey, number>>>;
  leadIn?: string;
  whyWeAskThis?: string;
}

export function getBlueprintQuestions(status: ParentStatus): QuizQuestion[] {
  return BLUEPRINT_QUESTIONS_RAW.map((q) => ({
    ...q,
    lens: "current" as const,
    inputType: "option-cards" as const,
    question: q.question[status],
  }));
}
```

### Pattern 5: DB Prerequisite Migrations (Must Run First)

**What:** Two migrations are required before any Blueprint quiz code can run. STATE.md decision `[v2-DB]` marks these as mandatory.

**Migration 1 — add `product_type` to `quiz_sessions`:**
```sql
-- 20260313000000_add_product_type_to_quiz_sessions.sql
ALTER TABLE quiz_sessions
  ADD COLUMN IF NOT EXISTS product_type TEXT NOT NULL DEFAULT 'mirror'
  CHECK (product_type IN ('mirror', 'blueprint'));
```

**Migration 2 — create `bp_quiz_sessions` table:**
```sql
-- 20260313000001_create_bp_quiz_sessions.sql
CREATE TABLE bp_quiz_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT NOT NULL,
  parent_status       TEXT NOT NULL CHECK (parent_status IN ('current-parent', 'expecting', 'planning')),
  status              TEXT NOT NULL DEFAULT 'in_progress'
                      CHECK (status IN ('in_progress', 'completed')),
  answers             JSONB,
  dimension_scores    JSONB,
  archetype_id        TEXT,
  cultural_background TEXT,
  started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE bp_quiz_sessions ENABLE ROW LEVEL SECURITY;
CREATE INDEX bp_quiz_sessions_email_idx ON bp_quiz_sessions (email);

CREATE TRIGGER set_updated_at_bp_quiz_sessions
  BEFORE UPDATE ON bp_quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- No user_id FK — Blueprint sessions are email-keyed (pay-first, no anon auth flow)
-- Service role handles all inserts; RLS policies permit reads by session UUID

CREATE POLICY "Service role can insert Blueprint sessions"
  ON bp_quiz_sessions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Anyone with session ID can read Blueprint session"
  ON bp_quiz_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can update Blueprint sessions"
  ON bp_quiz_sessions FOR UPDATE
  TO service_role
  USING (true);
```

**Source:** Pattern from `20260224000000_phase1_data_foundation.sql` + STATE.md `[v2-DB]` decision.

### Pattern 6: Blueprint Result Page with Email Verification Gate

**What:** The Blueprint result page (`/blueprint/result?session=UUID`) requires the user to enter the email they used before results are displayed. This is a Server Component that fetches the session, then renders either an email gate (if not verified) or the full result.

**When to use:** The result page is the paid product access point. Email verification prevents casual link-sharing.

**Recommended approach:** Use a Client Component `BlueprintEmailGate` that accepts the expected email hash (or the session ID) and verifies client-side entry before revealing the result. Do NOT put the actual email in the URL or a client-accessible prop — verify via a dedicated API route.

**Implementation options for the gate (Claude's discretion):**
1. **Inline form on result page** — gate renders above the result content; once verified, removes itself and shows result. Simpler, no modal complexity.
2. **Server-side verification** — result page Server Component checks a `?verified=token` query param set by a POST handler. More secure but adds a redirect flow.

Recommended: Option 1 (inline form) for Phase 7 simplicity. The email verification component already has scaffolding in `components/result/EmailGateOverlay.tsx`.

### Pattern 7: Pre-filling Email from Mirror Quiz localStorage

**What:** On the Blueprint intro screen (step 0), read `quiz-session` from localStorage and extract the Mirror quiz email to pre-fill the Blueprint email field.

**When to use:** During Blueprint intro screen mount. Never skip the email screen — always show it with pre-filled value per CONTEXT.md.

**Example:**
```typescript
// In BlueprintQuizShell or intro screen component
useEffect(() => {
  try {
    const mirrorSession = localStorage.getItem("quiz-session");
    if (mirrorSession) {
      const parsed = JSON.parse(mirrorSession);
      const mirrorEmail = parsed?.state?.email;
      if (mirrorEmail && typeof mirrorEmail === "string") {
        setIntroEmail(mirrorEmail);
      }
    }
  } catch {
    // Silently ignore — pre-fill is best-effort
  }
}, []);
```

**Note:** Mirror quiz `partialize` excludes email from localStorage persistence (see `quizStore.ts` line 46-49). However, the Mirror API route stores the email to `quiz_sessions` in Supabase. The localStorage `quiz-session` key may not have email. The pre-fill should be best-effort and fail silently.

**IMPORTANT CORRECTION:** The Mirror quizStore explicitly `partializes` away email — `const { email, ...rest } = state; return rest;`. So email is NOT available in Mirror localStorage. The pre-fill should instead come from:
- A Supabase lookup by session ID (sessionId IS persisted), OR
- A separate email cookie/localStorage field the Blueprint intro screen sets

**Recommended resolution:** On the Blueprint intro screen, check `localStorage.getItem("quiz-session")` for `state.email` — if not there (it won't be for most users due to partialize), still show the email field blank. Phase 7 cannot reliably pre-fill from Mirror localStorage. Document this in code as a known limitation.

### Anti-Patterns to Avoid

- **Sharing the Mirror Zustand store for Blueprint state:** Even adding a flag like `isBlueprint: true` is wrong. Two separate stores with two separate localStorage keys is the correct isolation pattern. Cross-contamination of step counts and answers is a hard-to-debug bug.
- **Putting parent status in URL query params:** Parent status is quiz state, not navigation state. It belongs in the Zustand store, not `?status=current-parent`. URL params get lost on back-navigation and complicate resumption logic.
- **Using `quiz-session` API route for Blueprint sessions:** Create a dedicated `/api/bp-quiz-session` route. The Mirror route writes to `quiz_sessions` table; Blueprint should write to `bp_quiz_sessions`. Conflating them creates schema confusion.
- **Embedding email in result URL:** `/blueprint/result?session=UUID&email=foo@example.com` exposes PII in logs, browser history, and referrer headers. Verify email via a POST to an API route, not a GET param.
- **Skipping the `handle_updated_at` trigger:** The `handle_updated_at()` function already exists in Supabase from Migration 1. The Blueprint migration must reference it — do not redefine it.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Quiz answer → archetype scoring | Custom scoring logic | `computeDimensionProfile()` + `getResult()` from existing `lib/quiz/` | Already validated, handles 11 dimensions, handles ties, returns primary + secondaries |
| Slide animations between questions | CSS animation system | `animate-slide-in-right` / `animate-slide-in-left` from `globals.css` | Already implemented, consistent with Mirror quiz |
| Progress bar | Custom progress implementation | `<QuizProgress>` component with `accentLight`/`accentDark` props | Already accessible (role=progressbar, aria-valuenow), just pass Blueprint accent colors |
| Section header pill | Custom section label | `<QuizSectionHeader>` with bgColor/textColor props | Already handles milestone messages, just pass Blueprint section palette |
| localStorage persistence | Manual JSON.stringify/parse | Zustand `persist` middleware | Handles hydration, serialization, SSR safety already |
| URL step sync | Manual `window.history.pushState` | `nuqs` `useQueryState` | Already handles back button, server component compatibility, type safety |
| Supabase admin client | Direct fetch to Supabase | `createAdminClient()` from `lib/supabase/server.ts` | Already handles env var validation, service role key usage |

**Key insight:** The Mirror quiz is a complete reference implementation. Phase 7 is composition + adaptation, not greenfield development.

---

## Common Pitfalls

### Pitfall 1: Zustand Hydration Flash (SSR/Client Mismatch)

**What goes wrong:** `useBlueprintStore()` returns `initialState` on the server (no localStorage) and the persisted value on the client, causing a hydration mismatch — React throws a warning or renders incorrectly.

**Why it happens:** `persist` middleware reads localStorage on client only. Server renders with initial state. Next.js compares the two and they differ.

**How to avoid:** Use the same pattern as Mirror's `QuizShell.tsx` — gated `hasHydrated` state, subscribing to `useBlueprintStore.persist.onFinishHydration()`. Return a blank `<div className="min-h-screen" />` until hydrated.

**Warning signs:** Console warning about hydration mismatch, or step 0 flashing before the correct step appears on page refresh.

```typescript
// Correct SSR-safe hydration pattern (from QuizShell.tsx)
const [hasHydrated, setHasHydrated] = useState(false);

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

if (!hasHydrated) return <div className="min-h-screen" />;
```

### Pitfall 2: Step Numbering with Parent Status Selector

**What goes wrong:** Adding the parent status selector as "step -1" or "step 0a" creates confusion in the URL step sync. If `?step=0` sometimes means "email screen" and sometimes means "parent status screen", resumption logic breaks.

**Why it happens:** The parent status selector is shown before the quiz begins (before step 0 email screen), creating an off-by-one in the step numbering system.

**How to avoid:** Track parent status selector separately from quiz step — use a boolean `parentStatusSeen` flag (same pattern as Mirror's `introSeen`). The URL step param stays 0-indexed to quiz steps only. Parent status screen is pre-quiz and has no step param.

```
Flow:
  parentStatus === null   →   show ParentStatusSelector (no step in URL)
  parentStatus !== null && step === 0   →   show email/intro screen
  step >= 1               →   quiz questions
  step === TOTAL + 1      →   closing transition
  step >= TOTAL + 2       →   processing
```

### Pitfall 3: Quiz Questions Without a Question Bank

**What goes wrong:** The Blueprint question bank (`lib/quiz/blueprint-questions.ts`) is a clinical/Sophia content dependency. If Phase 7 engineering waits for the final question bank, the phase blocks. If placeholder questions are used, the quiz ships without real content.

**Why it happens:** Engineering and content work are on different timelines.

**How to avoid:** Build the engineering scaffold with placeholder questions in `blueprint-questions.ts` (clearly marked as `TODO: CLINICAL REVIEW REQUIRED`). The page should render correctly with placeholder content. The content swap (real questions) requires no engineering change — just update the question bank file.

**Warning signs:** Phase 7 tasks that are blocked pending "final questions from Sophia."

### Pitfall 4: `bp_quiz_sessions` RLS Misconfiguration

**What goes wrong:** Unlike `quiz_sessions`, the Blueprint session table does not have `user_id` FK (Blueprint is pay-first, no anon auth flow per the product architecture). If RLS is configured expecting `auth.uid()`, all inserts from the API route will fail.

**Why it happens:** Copy-paste from `quiz_sessions` migration which uses `auth.uid()` for user isolation.

**How to avoid:** Blueprint sessions are inserted exclusively via the service_role admin client. RLS should:
- INSERT: service_role only
- SELECT: anyone with session UUID (open read, since the UUID itself is the credential)
- UPDATE: service_role only

**Warning signs:** `401` or `403` errors from the bp-quiz-session API route on POST.

### Pitfall 5: `handle_updated_at()` Already Defined

**What goes wrong:** If Migration 2 tries to re-create the `handle_updated_at()` function without `CREATE OR REPLACE`, Postgres throws an error and the migration fails.

**Why it happens:** The function was created in Migration 1 (`20260224000000_phase1_data_foundation.sql`). Running it again without `OR REPLACE` fails.

**How to avoid:** The Blueprint migration must reference `handle_updated_at()` without redefining it (or use `CREATE OR REPLACE FUNCTION` if redefinition is needed).

```sql
-- Correct — reference without redefining
CREATE TRIGGER set_updated_at_bp_quiz_sessions
  BEFORE UPDATE ON bp_quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
```

### Pitfall 6: Blueprint Accent Color Inconsistency

**What goes wrong:** The Blueprint quiz uses a teal/green palette (Claude's discretion). If the section-palette and QuizProgress accent colors are not coordinated, some sections get the Mirror plum accent (#4A1942) instead of Blueprint teal.

**Why it happens:** `QuizCard` derives section colors from `getSectionColor(question.section)`. If Blueprint sections don't exist in `section-palette.ts`, the fallback `{ light: '#B2DECD', dark: '#1A4A3A' }` (mint) is used for all sections — acceptable but not per-section-varied.

**How to avoid:** Create `lib/quiz/blueprint-section-palette.ts` with Blueprint section IDs and teal/green colors. Use in `BlueprintQuizShell` by passing the result to `QuizCard` directly, or by adding Blueprint sections to `section-palette.ts` under Blueprint-specific keys.

**Recommended teal/green palette for Claude's discretion:**
```typescript
// lib/quiz/blueprint-section-palette.ts
const blueprintSectionPalette: Record<string, SectionColor> = {
  'daily-moments':           { light: '#B2E5D8', dark: '#0F5845' },  // teal
  'discipline-boundaries':   { light: '#A8D8C8', dark: '#1A4A38' },  // deeper teal
  'emotional-connection':    { light: '#C4EBE0', dark: '#0D4035' },  // light teal
}
```

---

## Code Examples

Verified patterns from project source:

### Zustand Persist — Creating a Second Store

From `stores/quizStore.ts` — exact pattern to replicate with new `name`:

```typescript
// Source: stores/quizStore.ts (lines 31-52)
export const useBlueprintStore = create<BlueprintState>()(
  persist(
    (set) => ({
      // ...actions
    }),
    {
      name: "blueprint-quiz-session",  // ← this string IS the localStorage key
      partialize: (state) => {
        const { email, ...rest } = state;  // never persist email
        return rest;
      },
    },
  ),
);
```

### Supabase Admin Insert for New Table

From `app/api/quiz-session/route.ts` — exact pattern for bp-quiz-session:

```typescript
// Source: app/api/quiz-session/route.ts (lines 22-52)
const supabase = createAdminClient();

const { data, error } = await supabase
  .from("bp_quiz_sessions")          // ← new table
  .insert({
    email,
    parent_status: parentStatus,     // ← new field
    status: "in_progress",
  })
  .select("id")
  .single();

if (error) {
  return NextResponse.json({ error: "Failed to create session", detail: error.message }, { status: 500 });
}
return NextResponse.json({ sessionId: data!.id });
```

### QuizProgress — Blueprint Accent Colors

From `components/quiz/QuizProgress.tsx` — pass Blueprint teal via props:

```typescript
// Source: components/quiz/QuizProgress.tsx
<QuizProgress
  current={questionIndex}
  total={TOTAL_QUESTIONS}
  accentLight="#B2E5D8"   // Blueprint teal light
  accentDark="#0F5845"    // Blueprint teal dark
/>
```

### nuqs Step Sync — Reuse Verbatim

From `components/quiz/QuizShell.tsx` (lines 49-57):

```typescript
// Source: components/quiz/QuizShell.tsx
const [step, setStep] = useQueryState("step", {
  parse: (v) => {
    const parsed = parseInt(v, 10);
    return Number.isNaN(parsed) ? 0 : parsed;
  },
  serialize: String,
  defaultValue: 0,
  history: "push",
});
```

### Result Page — Server Component with Session Fetch

From `app/result/page.tsx` — Blueprint result page follows the same pattern:

```typescript
// Source: app/result/page.tsx (lines 62-79)
export default async function BlueprintResultPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;
  if (!session) return <BlueprintResultErrorState message="Your result link appears to be missing." />;

  // Fetch from bp_quiz_sessions using createAdminClient()
  const row = await fetchBlueprintSession(session);
  if (!row || row.status !== "completed") {
    return <BlueprintResultErrorState message="We couldn't find a completed result for that session." />;
  }
  // ...render result content
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Direct Supabase queries with user_id FK | Admin client + service_role (bypasses RLS) | Phase 1 migration | Enables stateless quiz flow without auth; session UUID = access credential |
| Single quiz store | Separate stores per quiz product | v2 decision `[v2-STORE]` | Eliminates cross-contamination of Mirror and Blueprint state |
| PATCH quiz_sessions for completion | Separate `bp_quiz_sessions` table | v2 decision `[v2-DB]` | Clean schema per product; avoids `product_type` enum sprawl |

**Deprecated/outdated:**
- `/app/blueprint/page.tsx` (current "coming soon" page): This page will be replaced or redirected. The existing page hosts the Blueprint waitlist email form — it must not be deleted until the waitlist data is secured. Phase 7 should add `/blueprint/quiz` as a new route rather than replacing `/blueprint` directly.

---

## Open Questions

1. **Mirror email pre-fill: is it achievable?**
   - What we know: Mirror quizStore `partializes` away email, so it's NOT in localStorage. Mirror sessionId IS in localStorage.
   - What's unclear: Can we do a Supabase lookup by sessionId to get the email server-side on the Blueprint intro page load?
   - Recommendation: Server Component approach — the Blueprint intro page (`/blueprint/quiz`) can be a Server Component that reads `quiz-session` cookie/localStorage on the server side. However, localStorage is not accessible server-side. The cleanest solution: pass the session ID from Mirror as a URL param (`/blueprint/quiz?mirror_session=UUID`) and fetch email server-side. If not provided, show blank email field. Keep this behavior as best-effort.

2. **Access control for Blueprint result: email hash vs. plain email comparison**
   - What we know: Email verification gate must exist on result page. Email must not appear in URL.
   - What's unclear: Should verification send a code, compare against stored email directly, or use a time-limited token?
   - Recommendation: For Phase 7, verify by comparing entered email against `bp_quiz_sessions.email` via a server action or API route POST (not GET). Store nothing in the URL. This is the simplest pattern that avoids PII exposure.

3. **`/blueprint/page.tsx` disposition: replace or redirect?**
   - What we know: Current `/blueprint` page is the "coming soon" waitlist page. It contains `<BlueprintEmailForm>` that captures emails.
   - What's unclear: Should Phase 7 delete this page, redirect it, or leave it alongside the new `/blueprint/quiz` and `/blueprint/result` routes?
   - Recommendation: Leave `/blueprint` as-is (don't delete the waitlist form), add `/blueprint/quiz` and `/blueprint/result` as new routes. Phase 8 (payment landing page) will decide the final `/blueprint` page architecture.

4. **Question bank placeholder vs. real questions at ship time**
   - What we know: `blueprint-questions.ts` is a Sophia/clinical content dependency (STATE.md `[v2-CONTENT-1]`). Engineering can scaffold with placeholders.
   - What's unclear: Will the real question bank be ready before Phase 7 ships?
   - Recommendation: Build the full engineering scaffold with clearly-marked placeholder questions. The question bank file must match the `QuizQuestion` interface and include dimension scores — Sophia will need to provide these. Create a `TODO: CLINICAL` comment header in the file.

---

## Sources

### Primary (HIGH confidence)
- `stores/quizStore.ts` — Zustand persist pattern with `name` key, `partialize` exclusion
- `components/quiz/QuizShell.tsx` — Full quiz orchestrator: step numbering, hydration guard, nuqs sync, handlers
- `components/quiz/QuizCard.tsx` — Prop interface: accepts `accentLight`/`accentDark` via `getSectionColor`, supports `currentAnswer` for resumption
- `components/quiz/QuizProgress.tsx` — Accepts `accentLight`/`accentDark` props directly
- `lib/quiz/compute-profile.ts` — `computeDimensionProfile(answers, questions?)` — questions param is optional override
- `lib/quiz/scoring-matrix.ts` — `getResult(profile)` returns primary ArchetypeId — same function works for Blueprint
- `app/api/quiz-session/route.ts` — POST/PATCH pattern for session lifecycle; uses `createAdminClient()`
- `supabase/migrations/20260224000000_phase1_data_foundation.sql` — RLS patterns, `handle_updated_at` trigger, `quiz_sessions` schema
- `.planning/STATE.md` — `[v2-STORE]`, `[v2-DB]` locked decisions confirmed

### Secondary (MEDIUM confidence)
- `app/result/page.tsx` — Server Component result page pattern (email gate, session fetch)
- `components/result/EmailGateOverlay.tsx` — Existing scaffold for email gate (not read in full — file exists)
- `lib/landing/palette.ts` — Existing color palette exported as `p.mint`, `p.blue` etc. — Blueprint teal should live in blueprint-specific file or extend this

### Tertiary (LOW confidence)
- Teal/green hex values for Blueprint section palette — Claude's discretion; not validated against visual design brief. The values recommended (#B2E5D8 / #0F5845) follow the existing palette system conventions but are not from an official source.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries are in `package.json`, versions verified
- Architecture patterns: HIGH — derived directly from Mirror quiz source code; Blueprint is a composition
- DB migrations: HIGH — schema derived from existing migration patterns + STATE.md locked decisions
- Pitfalls: HIGH — derived from direct source code reading (partialize behavior, hydration guard pattern)
- Blueprint palette colors: LOW — Claude's discretion per CONTEXT.md; reasonable teal/green choices but not from design brief

**Research date:** 2026-03-13
**Valid until:** 2026-04-13 (dependencies are stable; Next.js 16 / Zustand 5 / Supabase JS 2 are stable releases)
