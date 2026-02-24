# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-23)

**Core value:** Parents feel deeply seen and understood about their upbringing — the personalized output must feel written specifically for them, grounded in credible research, and create a bridge for meaningful conversations with loved ones.
**Current focus:** Phase 0 - Archetype Framework

## Current Position

Phase: 0 of 8 (Archetype Framework)
Plan: 4 of 5 in current phase (Plan 04 complete)
Status: In progress
Last activity: 2026-02-24 — Plan 00-04 complete: all 7 archetype content outlines populated + 35 cultural overlays created

Progress: [█░░░░░░░░░] 11% (4/35+ plans estimated)

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: 6 min
- Total execution time: 0.42 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 0. Archetype Framework | 4/5 | 25 min | 6 min |

**Recent Trend:**
- Last 5 plans: 00-01 (6 min), 00-02 (6 min), 00-03 (3 min), 00-04 (10 min)
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

### Pending Todos

- Sophia confirmation: does Narrative Coherence apply to Current lens scoring?
- Sophia validation: discriminant validity between Presence/Attunement and Emotional Regulation
- Sophia review: intentional-guide low selection rate (3.6%) — clinically acceptable or needs profile adjustment?
- Sophia review: structured-mentor as default for ambiguous profiles — clinically appropriate?
- Plan 05 (Sophia validation): Review all 7 archetype content outlines + 35 cultural overlays for clinical accuracy and tone

### Blockers/Concerns

- Phase 0 depends entirely on Sophia's availability and clinical work — this is the highest-priority scheduling dependency
- Kimi 2.5 rate limits on actual account need verification at platform.moonshot.ai before finalizing Phase 5 queue architecture
- Vercel function timeout budget must be benchmarked empirically (estimated 15-35s for parallel Kimi calls + renderToBuffer)
- Cultural content variants per archetype is an unresolved content scope question affecting Phases 5 and 6

## Session Continuity

Last session: 2026-02-24
Stopped at: Plan 00-04 complete — archetype content outlines + cultural overlays fully populated; Plan 05 (Sophia validation) is next
Resume file: None
