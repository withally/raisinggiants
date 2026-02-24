# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Parents feel deeply seen and understood about their upbringing — the personalized output must feel written specifically for them, grounded in credible research, and create a bridge for meaningful conversations with loved ones.
**Current focus:** Phase 2 - Quiz Engine

## Current Position

Phase: 2 of 8 (Quiz Engine) — IN PROGRESS
Plan: 4 of 5 in current phase (Plan 02-04 COMPLETE — QuizShell orchestrator, EmailCaptureScreen, ProcessingScreen, quiz route)
Status: Phase 2 in progress — Plan 02-04 complete; ready for Plan 02-05 (final Phase 2 plan)
Last activity: 2026-02-24 — Plan 02-04 complete: QuizShell end-to-end quiz flow (nuqs step sync, anonymous Supabase session, auto-advance, email capture, processing screen, quiz_sessions UPDATE)

Progress: [██████░░░░] 29% (10/35+ plans estimated, Phase 0 complete, Phase 1 complete, Phase 2 in progress)

## Performance Metrics

**Velocity:**
- Total plans completed: 8
- Average duration: 6 min
- Total execution time: 0.61 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 0. Archetype Framework | 5/5 (complete) | 40 min | 8 min |
| 1. Data Foundation | 2/2 (complete) | 27 min | 13 min |
| 2. Quiz Engine | 4/5 (in progress) | 30 min | 8 min |

**Recent Trend:**
- Last 5 plans: 01-02 (25 min), 02-01 (15 min), 02-02 (5 min), 02-03 (5 min), 02-04 (5 min)
- Trend: steady

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Archetype framework is a hard prerequisite — zero engineering starts until Phase 0 complete and Sophia has validated 20-30 simulated answer sets
- PDF generation uses @react-pdf/renderer renderToBuffer() (not renderToStream, which has a Next.js 15 bug)
- Stripe webhook checkout.session.completed is the sole authoritative fulfillment trigger — never the success URL redirect
- Vercel Pro required from day one (Hobby's 10s timeout is insufficient for AI + PDF generation)
- **[00-01]** DimensionProfile uses Record<DimensionKey, number> not named fields — dimension count can change without breaking the type contract
- **[00-01]** 7 dimensions selected (not 6): Presence/Attunement added as 7th dimension, capturing Tsabary's conscious-vs-reactive axis distinct from Emotional Regulation
- **[00-01]** Narrative Coherence dimension is primarily Past-lens-only — Sophia to confirm if modified form applies to Current lens in Plan 02 review
- **[00-01]** Punitive Discipline (PBDQ factor 2) excluded from dimensions — collinear with inverse Emotional Warmth and inverse Emotional Regulation
- **[00-02]** 7 archetypes confirmed (not 6 or 8) — 7-dimension space naturally produces 7 clinically distinct patterns without force-fitting
- **[00-02]** DIMENSION_WEIGHTS all default 1.0 — Narrative Coherence weight elevation deferred to post-simulation adjustment (Plan 03)
- **[00-02]** Gentle Nurturer autonomy-support raised to 8 to achieve 2-dimension distinctness from The Steady Anchor
- **[00-02]** softInferCurrentFromPast returns same archetype ranking as past (intergenerational transmission assumption) — empirical mapping table deferred post-launch
- **[00-03]** No dimension weight adjustments needed — simulation passed with all weights = 1.0; Sophia may still recommend NC weight elevation on clinical grounds
- **[00-03]** intentional-guide selected least frequently (1/28, 3.6%) — clinically acceptable given its specific profile requirement; flagged for Sophia review
- **[00-03]** structured-mentor is default for ambiguous profiles (wins 7/28) — not degenerate (25% < 40% ceiling) but flagged for Sophia awareness
- **[00-03]** package.json and tsconfig.json created — project had no build infrastructure; required for npx tsx script execution
- **[00-04]** 5 cultural contexts selected: East Asian collectivist, South Asian joint-family, Latin American familismo, Sub-Saharan African community-centred, Western individualist — covers highest-diversity segments with distinct profiles
- **[00-04]** Western individualist treated as full context (not empty baseline) — 3 strengths + 3 tensions per archetype; avoids treating Western as the default
- **[00-04]** 5 themes per content section (plan allowed 3-5) — full clinical nuance of each archetype warranted maximum depth at outline stage
- **[00-05]** Framework expanded from 7 archetypes/7 dimensions to 9 archetypes/11 dimensions before Sophia review package generated — Devoted Champion and Collaborative Ally added; Repair/Reconnection, Role Integrity, Reciprocity, NJA added as dimensions
- **[00-05]** Review package updated to v2.0 to match actual framework state — prior commit had created v1.0 based on outdated 7/7 structure; v2.0 is the definitive Sophia review document
- **[00-05]** Open-Hearted Learner selected as cultural overlay showcase (vs. Fierce Guardian in v1.0) — shows more clinically interesting cross-cultural variation in how the "still integrating" quality interacts with context
- **[00-05]** Sophia formal sign-off deferred — proceeding with provisional approval; framework is technically validated (scoring simulation VERDICT: PASS) and clinically grounded enough to begin Phase 1 engineering; Sophia will complete formal review asynchronously
- **[01-01]** email column on quiz_sessions is nullable — session created at quiz start before email is captured at lead gate
- **[01-01]** JSONB used for answers and dimension_scores (not JSON) — binary storage and indexing capability
- **[01-01]** orders INSERT/UPDATE done exclusively via service_role (Stripe webhook) — no anon INSERT policy on orders table
- **[01-01]** createAdminClient name (not createClient) for server.ts — makes dangerous, RLS-bypassing nature obvious at all import sites
- **[01-01]** Dual Supabase client pattern: lib/supabase/client.ts (browser, @supabase/ssr) and lib/supabase/server.ts (server-only, service_role, no NEXT_PUBLIC_ prefix)
- **[01-02]** No dotenv dependency added — .env.local parsed inline with Node.js fs module to avoid adding a new dependency
- **[01-02]** Single anon SupabaseClient reused for User A and User B sessions (signOut + signInAnonymously) — no duplicate client instances needed
- **[01-02]** Admin client used for storage bucket check — cloud Supabase denies anon bucket listing; bucket existence is infrastructure concern, not user-access RLS test
- **[02-01]** scripts/ excluded from tsconfig.json — scripts run via npx tsx independently; pre-existing type error in validate-scoring.ts must not block Next.js TypeScript compile
- **[02-01]** Biome 2.4.4 config shape differs from plan spec (2.0.0) — organizeImports moved to assist.actions.source, files.ignore renamed to files.experimentalScannerIgnores
- **[02-01]** app/page.tsx is a development placeholder only — minimal "Take the Quiz" CTA linking to /quiz; Phase 7 landing page will replace it
- **[02-02]** 32 questions (vs 25-30 target) — extra questions ensure all 11 dimensions have multiple score contributions; passes automated verify (25-35 range)
- **[02-02]** dimensionScores allows multi-dimension scoring per option — e.g. hug-listen scores both emotional-warmth:9 and presence-attunement:9, reflecting real construct correlation
- **[02-02]** computeDimensionProfile defaults uncovered dimensions to 5 (midpoint) not 0 — prevents extreme archetype bias from unanswered quiz sections
- **[02-02]** Cultural background question has empty dimensionScores — explicitly metadata, not scored; consistent with QUIZ-06 spec
- **[02-03]** CulturalDropdown uses div+button pattern over ul[role=listbox]+li[role=option] — Biome a11y rules require native interactive elements; button is inherently focusable and keyboard-accessible
- **[02-03]** WhyWeAskThis uses CSS grid-template-rows 0fr->1fr trick for smooth height animation — no JS height measurement, pure CSS, no layout thrash
- **[02-03]** QuizCard onAnswer wiring: QuizCard calls onAnswer on tap without delay — auto-advance timing (300ms) is QuizShell's responsibility (Plan 02-04)
- **[02-04]** SSR-safe Zustand hydration: direct persist.hasHydrated() call in component body crashes Next.js SSR — use useState(false) + useEffect + onFinishHydration subscription
- **[02-04]** nuqs useQueryState requires Suspense boundary in Next.js App Router — wraps useSearchParams internally; add Suspense in page.tsx
- **[02-04]** NuqsAdapter scoped to quiz page (not root layout) — only quiz uses nuqs in Phase 2; can be promoted to layout if needed
- **[02-04]** store.reset() not called after quiz completion — Phase 3 /result page may need localStorage session data for optimistic rendering

### Pending Todos

- Sophia formal review (non-blocking): complete 27-item sign-off checklist in sophia-review-package.md when available
- Sophia confirmation: does Narrative Coherence apply to Current lens scoring?
- Sophia validation: discriminant validity between Presence/Attunement and Emotional Regulation
- Sophia validation: discriminant validity between Reciprocity and Autonomy Support as separate scoring axes
- Sophia review: Repair/Reconnection, Role Integrity, NJA — independently scoreable via self-report?
- Sophia review: intentional-guide low selection rate (2.5%) — clinically acceptable or needs profile adjustment?
- Sophia review: flat/indeterminate profile (all dims=5) defaults to Devoted Champion — clinically appropriate?
- Sophia review: all 9 archetype names warm and non-pathologising?

### Blockers/Concerns

- Sophia's formal review is deferred (non-blocking for Phase 1) — schedule asynchronously; framework adjustments from review may require re-running scoring validation
- Kimi 2.5 rate limits on actual account need verification at platform.moonshot.ai before finalizing Phase 5 queue architecture
- Vercel function timeout budget must be benchmarked empirically (estimated 15-35s for parallel Kimi calls + renderToBuffer)
- Cultural content variants per archetype is an unresolved content scope question affecting Phases 5 and 6

## Session Continuity

Last session: 2026-02-24
Stopped at: Completed 02-04-PLAN.md — QuizShell orchestrator + EmailCaptureScreen + ProcessingScreen + quiz route page; npm run build passes cleanly
Resume file: None — Phase 2 continues; begin Plan 02-05 (final Phase 2 plan)
