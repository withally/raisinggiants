# Roadmap: Raising Giants — The Mirror

## Overview

From clinical framework to working product: Phase 0 defines the archetype system with Sophia, Phases 1-2 build the data and quiz engine, Phase 2.5 rewrites all archetype copy to the parents-lens framing, Phase 3 builds the full free Mirror result page (email gate, complete result, Product 2 CTA), Phase 4 builds the landing page, and Phase 5 covers marketing and launch strategy. Every phase delivers a coherent, verifiable capability before the next phase begins.

**Product ladder:** v1 delivers The Mirror (free). Payment, AI content generation, and PDF rendering are deferred to Product 2 (The Blueprint).

## Phases

**Phase Numbering:**
- Integer phases (0, 1, 2, ...): Planned milestone work
- Decimal phases (2.5): Inserted work required by pivot

- [x] **Phase 0: Archetype Framework** — Define 9 clinical archetypes with Sophia, scoring logic, and content descriptions (completed 2026-02-24)
- [x] **Phase 1: Data Foundation** — Supabase schema, RLS policies, Storage, and anonymous auth configured (completed 2026-02-24)
- [x] **Phase 2: Quiz Engine** — Full quiz UI with scoring, persistence, and Supabase session write (completed 2026-02-24)
- [x] **Phase 2.5: Archetype Content Rewrite** — Reframe all archetype copy from "your parenting style" to "your parents' parenting style" (INSERTED — pivot requirement) (completed 2026-02-26)
- [ ] **Phase 3: Mirror Result Page** — Email gate, full free result (parents' archetype, patterns, watchouts, cultural section), Product 2 CTA
- [x] **Phase 4: Landing Page + Polish** — Credibility-forward landing page, KOL signals, mobile-responsive (completed 2026-02-25)
- [ ] **Phase 5: Marketing + Launch Strategy** — Go-to-market plan, content marketing, social media strategy, email funnels, KOL/influencer outreach

## Product 2 Roadmap — The Blueprint (Paid)

Deferred from v1. Will be planned after Mirror launch validates core flow.

- [ ] **P2-Phase 1: Payment Flow** — Stripe Checkout, webhook-triggered fulfillment, success page (PAY-01–05)
- [ ] **P2-Phase 2: AI Content Generation** — Moonshot Kimi 2.5 prompts, parallel generation pipeline, async queue (PDF-01, PDF-03–10)
- [ ] **P2-Phase 3: PDF Rendering + Delivery** — react-pdf document, Supabase Storage, Resend email delivery (PDF-02)

## Phase Details

### Phase 0: Archetype Framework
**Goal**: The clinical archetype system is fully defined and validated so all downstream engineering has a stable foundation to build against
**Depends on**: Nothing (first phase)
**Requirements**: ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05
**Success Criteria** (what must be TRUE):
  1. 9 named parenting archetypes exist with distinct clinical profiles written by Sophia
  2. A scoring matrix maps quiz answer dimensions to a primary archetype across 11 dimensions (handling blended results)
  3. Each archetype has a foundational patterns description (positive framing) and a watchouts description (shadow/risk patterns)
  4. Each archetype has a cultural context overlay document describing how cultural background modifies the archetype
  5. Sophia has validated the scoring output against simulated answer sets and confirmed results are clinically plausible
**Plans:** 5/5 plans executed (Phase 0 complete)
Plans:
- [x] 00-01-PLAN.md — TypeScript type contracts, KOL research synthesis, and scoring dimension definitions
- [x] 00-02-PLAN.md — Archetype definitions with dimension profiles and scoring algorithm
- [x] 00-03-PLAN.md — Scoring validation script with 28 simulated profiles; VERDICT: PASS
- [x] 00-04-PLAN.md — Content outlines (foundational patterns, watchouts) and cultural context overlays
- [~] 00-05-PLAN.md — Sophia review package v2.0 generated (Task 1 done); awaiting Sophia sign-off (Task 2 checkpoint)

### Phase 1: Data Foundation
**Goal**: The database and infrastructure layer is in place so quiz sessions and orders can be persisted securely from day one
**Depends on**: Phase 0
**Requirements**: None (infrastructure — enables all requirement categories)
**Success Criteria** (what must be TRUE):
  1. Supabase tables quiz_sessions and orders exist with correct schema and RLS policies enabled
  2. RLS policies are verified to work through the JavaScript SDK (not just the SQL editor)
  3. Anonymous sign-in is enabled and an anonymous user can write a quiz session and read only their own row
  4. Supabase Storage private bucket exists with signed URL access working for PDF delivery
**Plans:** 2/2 plans complete
Plans:
- [x] 01-01-PLAN.md — Supabase project init, migration SQL (schema + RLS + storage), client helpers
- [x] 01-02-PLAN.md — RLS verification script + human checkpoint for end-to-end infrastructure validation

### Phase 2: Quiz Engine
**Goal**: Users can complete the full quiz experience end-to-end, with answers persisted to Supabase on completion
**Depends on**: Phase 1
**Requirements**: QUIZ-01, QUIZ-02, QUIZ-03, QUIZ-04, QUIZ-05, QUIZ-06, QUIZ-07, QUIZ-08
**Success Criteria** (what must be TRUE):
  1. User sees one question per screen in a card-style layout with warm, conversational language and a visible progress bar
  2. User can navigate back to any previous question without losing answers
  3. User can leave mid-quiz, return later, and find their answers restored from localStorage
  4. Sensitive questions (upbringing, cultural background) show a "Why we ask this" helper text
  5. Cultural background is directly asked and the answer is stored in the quiz session for personalization downstream
**Plans:** 5/5 plans executed (Phase 2 complete)
Plans:
- [x] 02-01-PLAN.md — Next.js scaffold, Tailwind CSS v4, shadcn/ui, Biome, and all Phase 2 dependencies
- [x] 02-02-PLAN.md — Question bank (32→21 questions) with dimension scores and computeDimensionProfile function
- [x] 02-03-PLAN.md — Zustand store with localStorage persistence, quiz UI sub-components
- [x] 02-04-PLAN.md — QuizShell orchestrator, EmailCapture, ProcessingScreen, nuqs step sync, Supabase session write
- [x] 02-05-PLAN.md — Human verification checkpoint; quiz narrowed to 21 questions (past-lens only)

### Phase 2.5: Archetype Content Rewrite (INSERTED)
**Goal**: All archetype copy in the codebase is reframed from "your parenting style" to "your parents' parenting style" so the Mirror result page presents the correct narrative
**Depends on**: Phase 2
**Requirements**: COPY-01, COPY-02, COPY-03, COPY-04
**Success Criteria** (what must be TRUE):
  1. All 9 archetype names describe a parents' parenting style (not the user's current parenting approach)
  2. All foundational patterns copy reads as "patterns your parents passed to you" (inherited lens)
  3. All watchouts copy reads as "what to watch for given how you were raised" (awareness lens)
  4. All cultural overlay copy is updated to match the parents-archetype framing
  5. No copy in `archetypes.ts` or `cultural-overlays.ts` implies the user is currently parenting in this style
**Plans:** 2/2 plans complete
Plans:
- [x] 025-01-PLAN.md — Rewrite archetypes.ts: taglines, foundational patterns, watchouts to parents-lens framing
- [x] 025-02-PLAN.md — Rewrite cultural-overlays.ts: 45 overlays to receiver perspective + result page placeholder fix

### Phase 3: Mirror Result Page
**Goal**: After completing the quiz, users provide their email and see a complete, free result that makes them feel deeply seen about the parenting they received — no paywall, no blurred content
**Depends on**: Phase 2.5
**Requirements**: RSLT-01, RSLT-03, RSLT-05, RSLT-06, RSLT-07, RSLT-08, RSLT-09, RSLT-10
**Success Criteria** (what must be TRUE):
  1. User must enter their email before seeing any result content (email gate)
  2. The result page shows the user's parents' archetype name prominently with a full summary (not a teaser)
  3. The full foundational patterns section is displayed (all inherited patterns, nothing gated)
  4. All 5 watchouts are displayed in full (nothing blurred or gated behind payment)
  5. A dedicated cultural section shows how the user's cultural background shaped the parenting they received
  6. A clear CTA promotes The Blueprint (Product 2) as "coming soon" with email capture for launch notification
  7. No paywall, no blurred content, no purchase CTA for $14 anywhere on the page
**Plans:** 2/3 plans executed
Plans:
- [ ] 03-01-PLAN.md — Result page Server Component + section components (reveal, patterns, watchouts, cultural)
- [ ] 03-02-PLAN.md — Blueprint CTA components, /blueprint coming-soon page, API + database
- [ ] 03-03-PLAN.md — Email gate overlay, ResultPageClient wrapper, gate animations, human verification

### Phase 4: Landing Page + Polish
**Goal**: A credibility-forward landing page that communicates the bigger mission, presents the full product ladder (Mirror/Blueprint/Partner Match), integrates KOL research attribution, and converts visitors into the free Mirror quiz
**Depends on**: Phase 3
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05
**Success Criteria** (what must be TRUE):
  1. Named KOL credibility signals (8+ researchers) are visible with specific research attribution — clinical authority communicated through the research framework, not Sophia's personal credentials (per user decision in 04-CONTEXT.md)
  2. The full product ladder (Mirror, Blueprint, Partner Match) is displayed with correct status labels
  3. A prominent quiz start CTA drives visitors into the quiz flow at /quiz
  4. The entire landing page is fully mobile-responsive and loads fast on mobile connections
**Plans:** 2/2 plans complete
Plans:
- [x] 04-01-PLAN.md — Landing page core build: hero, product ladder, KOL credibility, secondary CTA, footer
- [x] 04-02-PLAN.md — Metadata update (Raising Giants branding), display font, visual polish, human verification

### Phase 5: Marketing + Launch Strategy
**Goal**: A concrete go-to-market plan is in place so the product reaches its target audience and generates initial traffic from launch day
**Depends on**: Phase 4
**Requirements**: TBD
**Success Criteria** (what must be TRUE):
  1. TBD — needs scoping (likely covers: launch campaign plan, content/social media strategy, email funnel design, KOL/influencer outreach plan, distribution channels identified)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 0 → 1 → 2 → 2.5 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 0. Archetype Framework | 5/5 | Complete | 2026-02-24 |
| 1. Data Foundation | 2/2 | Complete | 2026-02-24 |
| 2. Quiz Engine | 5/5 | Complete | 2026-02-24 |
| 2.5. Archetype Content Rewrite | 2/2 | Complete | 2026-02-26 |
| 3. Mirror Result Page | 2/3 | In Progress|  |
| 4. Landing Page + Polish | 2/2 | Complete    | 2026-02-25 |
| 5. Marketing + Launch Strategy | 0/TBD | Not started | — |

### Phase 6: Brand Positioning Research and Visual Direction

**Goal:** Research the competitive landscape, define brand positioning, evaluate the brand name, create a visual direction brief, and produce an actionable rebrand execution plan — so Raising Giants moves from "startup quiz template" to a brand that communicates "grounded self-discovery" with clinical credibility and emotional intimacy
**Depends on:** Phase 4 (landing page exists to evaluate against)
**Requirements**: BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05, BRAND-06, BRAND-07, BRAND-08
**Success Criteria** (what must be TRUE):
  1. 10-15 competitors are profiled across three segments with full-funnel analysis
  2. A positioning map identifies the unoccupied "deep + warm" territory
  3. A narrative positioning document defines the brand territory "grounded self-discovery"
  4. Brand name ("Raising Giants") and product names are evaluated with clear recommendations
  5. A visual direction brief specifies palette, typography, imagery, layout, and tone — all grounded in positioning
  6. A rebrand execution plan maps visual recommendations to specific codebase files and phases
  7. The user has reviewed and approved the overall direction
**Plans:** 5/5 plans complete

Plans:
- [ ] 06-01-PLAN.md — Competitive landscape: 10-15 competitor profiles + positioning map + gap analysis (Wave 1)
- [ ] 06-02-PLAN.md — Reference brand gallery: 8-12 aspirational brands + pattern synthesis (Wave 1)
- [ ] 06-03-PLAN.md — Positioning narrative: landscape, gap, territory, name evaluation (Wave 2)
- [ ] 06-04-PLAN.md — Visual direction brief: palette, typography, imagery, layout, tone (Wave 3)
- [ ] 06-05-PLAN.md — Rebrand execution plan + human verification checkpoint (Wave 4)
