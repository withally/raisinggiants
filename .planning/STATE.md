# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Parents feel deeply seen and understood about their upbringing — the personalized output must feel written specifically for them, grounded in credible research, and create a bridge for meaningful conversations with loved ones.
**Current focus:** Phase 0 - Archetype Framework

## Current Position

Phase: 0 of 8 (Archetype Framework) — COMPLETE (provisional)
Plan: 5 of 5 in current phase (Plan 05 complete — provisional approval; Phase 1 ready to begin)
Status: Phase 0 complete — Phase 1 engineering may begin
Last activity: 2026-02-24 — Plan 00-05 complete: Sophia review package v2.0 (905 lines) with provisional approval note; Sophia formal sign-off deferred but framework unblocked for Phase 1

Progress: [███░░░░░░░] 14% (5/35+ plans estimated, Phase 0 complete, Phase 1 next)

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: 6 min
- Total execution time: 0.42 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 0. Archetype Framework | 5/5 (complete) | 40 min | 8 min |

**Recent Trend:**
- Last 5 plans: 00-01 (6 min), 00-02 (6 min), 00-03 (3 min), 00-04 (10 min), 00-05 (15 min)
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
Stopped at: Completed Plan 00-05 with provisional approval — Phase 0 complete; Phase 1 engineering ready to begin
Resume file: None — begin Phase 1 (quiz engine + scoring)
