# Roadmap: Your Parenting Blueprint

## Overview

From clinical framework to working product: Phase 0 defines the archetype system with Sophia (a hard prerequisite that blocks all engineering), then Phases 1-8 build the full product in dependency order — data foundation, quiz engine, free result page, payment flow, AI content generation, PDF rendering and delivery, landing page, and finally the marketing and launch strategy that brings the product to its audience. Every phase delivers a coherent, verifiable capability before the next phase begins.

## Phases

**Phase Numbering:**
- Integer phases (0, 1, 2, ...): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 0: Archetype Framework** - Define 6-8 clinical archetypes with Sophia, scoring logic, and content descriptions (completed 2026-02-24)
- [x] **Phase 1: Data Foundation** - Supabase schema, RLS policies, Storage, and anonymous auth configured (completed 2026-02-24)
- [ ] **Phase 2: Quiz Engine** - Full quiz UI with scoring, persistence, and Supabase session write
- [ ] **Phase 3: Free Result Page** - Archetype result display with teaser content and purchase CTA
- [ ] **Phase 4: Payment Flow** - Stripe Checkout, webhook-triggered fulfillment, and success page
- [ ] **Phase 5: AI Content Generation** - Moonshot Kimi 2.5 prompts, parallel generation pipeline, async queue
- [ ] **Phase 6: PDF Rendering + Delivery** - react-pdf document, Supabase Storage, Resend email delivery
- [ ] **Phase 7: Landing Page + Polish** - Credibility-forward landing page, KOL signals, mobile-responsive
- [ ] **Phase 8: Marketing + Launch Strategy** - Go-to-market plan, content marketing, social media strategy, email funnels, KOL/influencer outreach, launch campaign

## Phase Details

### Phase 0: Archetype Framework
**Goal**: The clinical archetype system is fully defined and validated so all downstream engineering has a stable foundation to build against
**Depends on**: Nothing (first phase)
**Requirements**: ARCH-01, ARCH-02, ARCH-03, ARCH-04, ARCH-05
**Success Criteria** (what must be TRUE):
  1. 6-8 named parenting archetypes exist with distinct clinical profiles written by Sophia
  2. A scoring matrix maps quiz answer dimensions to a primary archetype (handling blended results)
  3. Each archetype has a foundational patterns description (positive framing) and a watchouts description (shadow/risk patterns)
  4. Each archetype has a cultural context overlay document describing how cultural background modifies the archetype
  5. Sophia has validated the scoring output against 20-30 simulated answer sets and confirmed results are clinically plausible
**Plans:** 5/5 plans executed (Phase 0 at Sophia sign-off gate)
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
- [x] 01-01-PLAN.md -- Supabase project init, migration SQL (schema + RLS + storage), client helpers
- [ ] 01-02-PLAN.md -- RLS verification script + human checkpoint for end-to-end infrastructure validation

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
**Plans**: TBD

### Phase 3: Free Result Page
**Goal**: After completing the quiz, users see their archetype result for free and feel compelled to purchase the full PDF guide
**Depends on**: Phase 2
**Requirements**: RSLT-01, RSLT-02, RSLT-03, RSLT-04, RSLT-05
**Success Criteria** (what must be TRUE):
  1. The result page shows the user's archetype name prominently with a 2-3 sentence teaser summary
  2. The page shows blurred or partial PDF preview pages so users can see what they would be paying for
  3. The page explains how the user's upbringing shaped their archetype result (the transmission mechanism)
  4. A single clear CTA to purchase the full PDF guide for $14 is visible and drives to checkout
**Plans**: TBD

### Phase 4: Payment Flow
**Goal**: Users can pay $14 and the system reliably triggers PDF generation, regardless of client-side redirect behavior
**Depends on**: Phase 3
**Requirements**: PAY-01, PAY-02, PAY-03, PAY-04, PAY-05
**Success Criteria** (what must be TRUE):
  1. Clicking the purchase CTA redirects to Stripe Checkout at $14 with the correct archetype name in the product description
  2. A completed Stripe payment triggers PDF fulfillment via the checkout.session.completed webhook, not via the success URL
  3. Duplicate Stripe webhook events do not create duplicate orders or duplicate PDF generation jobs
  4. The success page shows a download button if the PDF is ready, or "check your email" if generation is still in progress
**Plans**: TBD

### Phase 5: AI Content Generation
**Goal**: The AI pipeline generates personalized, specific PDF content for every section that feels written for the individual user, not a generic archetype description
**Depends on**: Phase 4
**Requirements**: PDF-01, PDF-03, PDF-04, PDF-05, PDF-06, PDF-07, PDF-08, PDF-09, PDF-10
**Success Criteria** (what must be TRUE):
  1. Each PDF section has a dedicated prompt that injects verbatim quiz answers and cultural background data
  2. All PDF sections generate in parallel via Promise.all() within Vercel function timeout limits
  3. A blind reviewer who has not seen the quiz answers can read a generated PDF and identify which specific answers drove which paragraphs
  4. Cultural background data produces visibly different output for users from different cultural contexts
  5. Generation failures on individual sections retry with exponential backoff and failed jobs are captured in a dead-letter queue
**Plans**: TBD

### Phase 6: PDF Rendering + Delivery
**Goal**: After payment, users receive a beautifully designed 15-20 page PDF within minutes, delivered via email with a download link
**Depends on**: Phase 5
**Requirements**: PDF-02
**Success Criteria** (what must be TRUE):
  1. The PDF renders with the warm, approachable premium design (therapy workbook meets Canva premium) across all sections
  2. The PDF is delivered to the user's email as a signed download link (not an attachment) that works in Gmail, Outlook, and Apple Mail
  3. PDF delivery completes within a few minutes of payment and the download link resolves to a readable file
  4. The success page reflects the correct fulfillment status (ready to download vs. generating)
**Plans**: TBD

### Phase 7: Landing Page + Polish
**Goal**: The landing page clearly communicates credibility and the product's unique value, and converts visitors to quiz starts
**Depends on**: Phase 6
**Requirements**: LAND-01, LAND-02, LAND-03, LAND-04, LAND-05
**Success Criteria** (what must be TRUE):
  1. The landing page prominently displays Sophia's credentials and clinical authority
  2. Named KOL credibility signals (top 100 parenting researchers) are visible with specific research attribution
  3. A prominent quiz start CTA drives visitors into the quiz flow
  4. The entire landing page is fully mobile-responsive and loads fast on mobile connections

### Phase 8: Marketing + Launch Strategy
**Goal**: A concrete go-to-market plan is in place so the product reaches its target audience and generates first sales from launch day
**Depends on**: Phase 7
**Requirements**: TBD
**Success Criteria** (what must be TRUE):
  1. TBD — needs scoping (likely covers: launch campaign plan, content/social media strategy, email funnel design, KOL/influencer outreach plan, paid acquisition channels identified)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 0. Archetype Framework | 5/5 | Complete | 2026-02-24 |
| 1. Data Foundation | 2/2 | Complete   | 2026-02-24 |
| 2. Quiz Engine | 0/TBD | Not started | - |
| 3. Free Result Page | 0/TBD | Not started | - |
| 4. Payment Flow | 0/TBD | Not started | - |
| 5. AI Content Generation | 0/TBD | Not started | - |
| 6. PDF Rendering + Delivery | 0/TBD | Not started | - |
| 7. Landing Page + Polish | 0/TBD | Not started | - |
| 8. Marketing + Launch Strategy | 0/TBD | Not started | - |
