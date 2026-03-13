# Requirements: Kin — The Mirror

**Defined:** 2026-02-23
**Updated:** 2026-03-13 — v2.0 roadmap created; v2 traceability added (BQUIZ, PAY, PDF, LAUNCH → Phases 7–10)
**Core Value:** Adults feel deeply seen and understood about the parenting they *received* — the personalized output surfaces patterns they've always sensed but never had language for, grounded in credible research from top parenting experts.

## v1 Requirements

Requirements for initial release (The Mirror — free product). Each maps to roadmap phases.

### Archetype Framework

- [x] **ARCH-01**: 9 named parenting archetypes defined with distinct profiles based on Sophia's clinical knowledge
- [x] **ARCH-02**: Scoring logic maps quiz answers to primary archetype across 11 dimensions (handles blended results)
- [x] **ARCH-03**: Each archetype has foundational patterns description (positive framing of tendencies)
- [x] **ARCH-04**: Each archetype has specific watchouts description (shadow/risk patterns to be aware of)
- [x] **ARCH-05**: Each archetype has cultural context overlay (how cultural background modifies the archetype)

### Quiz Experience

- [x] **QUIZ-01**: Card-style one-question-per-screen UI with warm, conversational language
- [x] **QUIZ-02**: Progress bar showing completion percentage throughout quiz
- [x] **QUIZ-03**: Back button allowing navigation to any previous question without losing answers
- [x] **QUIZ-04**: Mobile-responsive layout optimized for thumb interaction
- [x] **QUIZ-05**: "Why we ask this" helper text on sensitive questions (upbringing, cultural background)
- [x] **QUIZ-06**: Direct cultural background questions that feed into personalization
- [x] **QUIZ-07**: localStorage auto-save so users can resume if they leave mid-quiz
- [x] **QUIZ-08**: Quiz is 10-20 minutes with questions grounded in research from top 100 parenting KOLs

### Archetype Content Rewrite

- [x] **COPY-01**: All archetype names reframed to describe parents' parenting style (not user's current parenting)
- [x] **COPY-02**: All foundational patterns rewritten as "patterns your parents passed to you" (inherited lens)
- [x] **COPY-03**: All watchouts rewritten as "what to watch for given how you were raised" (awareness lens)
- [x] **COPY-04**: All cultural overlay copy updated to match parents-archetype framing

### Mirror Result Page

- [x] **RSLT-01**: Displays parents' archetype name prominently with full summary paragraph (not a teaser)
- [x] **RSLT-03**: Dedicated cultural section showing how user's cultural background shaped the parenting they received
- [x] **RSLT-05**: Clear CTA promoting The Blueprint (Product 2) as "coming soon" — not a $14 purchase button
- [ ] **RSLT-06**: Email gate captures user's email before revealing result (email required to see result)
- [x] **RSLT-07**: Full foundational patterns section (all inherited patterns displayed, nothing blurred or gated)
- [x] **RSLT-08**: Full watchouts section (all 5 watchouts displayed, nothing blurred or gated)
- [x] **RSLT-09**: Cultural overlay section with personalized cultural context based on user's stated background
- [x] **RSLT-10**: Product 2 coming-soon page accessible from CTA (email capture for Blueprint launch notification)

### Landing Page

- [x] **LAND-01**: Clear value proposition communicating the research-backed, expert-informed nature of the product *(old landing page nuked 2026-02-28 — rebuild in Phase 5)*
- [x] **LAND-02**: KOL credibility signals (top 100 named experts, research attribution) *(old landing page nuked 2026-02-28 — rebuild in Phase 5)*
- [x] **LAND-03**: Quiz start CTA that drives conversions *(old landing page nuked 2026-02-28 — rebuild in Phase 5)*
- [x] **LAND-04**: Mobile-responsive design *(old landing page nuked 2026-02-28 — rebuild in Phase 5)*
- [ ] **LAND-05**: Sophia's credentials and clinical authority visible *(old landing page nuked 2026-02-28 — rebuild in Phase 5)*

### Brand Positioning and Visual Direction

- [x] **BRAND-01**: 15+ millennial parenting digital products profiled broadly (apps, platforms, content brands) with full-funnel analysis
- [x] **BRAND-02**: Competitive positioning map with gap analysis identifying whitespace for a multi-product millennial parent brand
- [x] **BRAND-03**: Reference brand gallery of 8-12 aspirational brands evaluated through millennial parent lens with pattern synthesis
- [x] **BRAND-04**: Narrative positioning document defining brand territory based on research-revealed gap (not pre-committed)
- [x] **BRAND-05**: Brand name and product name evaluation for multi-product brand architecture with clear keep/change recommendations
- [x] **BRAND-06**: Visual direction brief — color palette with hex codes and emotional rationale, grounded in millennial parent positioning *(done in Phase 4 but deleted 2026-02-28 — will be re-established in Phase 5)*
- [x] **BRAND-07**: Visual direction brief — typography, imagery system, layout approach, and brand tone recommendations *(done in Phase 4 but deleted 2026-02-28 — will be re-established in Phase 5)*
- [x] **BRAND-08**: Rebrand execution plan mapping visual recommendations to specific codebase files with phased implementation scope *(done in Phase 4 but deleted 2026-02-28 — will be re-established in Phase 5)*

## v2 Requirements — The Blueprint (Paid)

Requirements for milestone v2.0. Each maps to roadmap phases.

### Blueprint Quiz

- [x] **BQUIZ-01**: User sees a parent-status gating question ("Are you a current parent / expecting / planning?") that adapts quiz framing
- [x] **BQUIZ-02**: User takes a full own-parenting quiz (card-style, one question per screen, progress bar, back navigation)
- [x] **BQUIZ-03**: Blueprint quiz scores into one of 9 archetypes using existing scoring engine (own-parenting lens)
- [x] **BQUIZ-04**: User sees their own-parenting archetype result as a teaser with "proceed to purchase" CTA
- [x] **BQUIZ-05**: Blueprint quiz answers persist to `bp_quiz_sessions` in Supabase
- [x] **BQUIZ-06**: Blueprint quiz state persists in localStorage (separate key from Mirror quiz)

### Payment & Fulfillment

- [ ] **PAY-01**: User pays via Stripe Checkout redirect at $39-49 (founding member pricing)
- [ ] **PAY-02**: Webhook handler processes `checkout.session.completed` with correct signature verification (`request.text()`)
- [ ] **PAY-03**: Webhook handler is idempotent (duplicate Stripe events don't create duplicate orders/PDFs)
- [ ] **PAY-04**: Success page shows order status (generating / ready / download link)
- [ ] **PAY-05**: PDF stored in Supabase Storage private bucket after generation

### PDF Generation & Delivery

- [ ] **PDF-01**: Template-driven 15-20 page PDF with premium design (therapy workbook meets Canva premium)
- [ ] **PDF-02**: PDF contains archetype overview, foundational patterns, and watchouts sections
- [ ] **PDF-03**: PDF contains reflection prompts specific to user's archetype
- [ ] **PDF-04**: PDF contains research snippets with KOL attribution
- [ ] **PDF-05**: PDF contains bridge comparison section (inherited vs own archetype) when user has both Mirror and Blueprint sessions
- [ ] **PDF-06**: User receives email with download link after payment (not PDF attachment)

### Launch Integration

- [ ] **LAUNCH-01**: Mirror result page Blueprint CTA upgraded from "coming soon" to live purchase button
- [ ] **LAUNCH-02**: Blueprint has its own landing/sales page accessible from the main site

## Product 3 Scope — The Partner Match (Premium)

Deferred to future release. Tracked but not in roadmap.

### Couple's Blueprint

- **COUP-01**: Both partners take quiz separately and results combine into partnership report
- **COUP-02**: Share link flow — Person A gets link to send Person B after completing quiz
- **COUP-03**: Email invite flow — Person A enters partner's email, partner gets invited
- **COUP-04**: Combined report shows alignment areas and potential conflict points
- **COUP-05**: Partnership-specific dialogue prompts and dialogue kit for couple conversations
- **COUP-06**: Partner dialogue prompts customized to user's blind spots (moved from Blueprint)
- **COUP-07**: Conversation starter section designed for dialogue with partner and loved ones (moved from Blueprint)

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

### KOL Personalization

- **KOL-01**: User can browse the 100 KOLs and toggle on/off which experts they already follow or resonate with
- **KOL-02**: PDF output adapts research snippets and attribution to prioritize user's preferred KOLs

### Growth & Retention

- **GROW-01**: Post-purchase email sequence (partner nudge, Product 3 teaser)
- **GROW-02**: Share button on result page (organic, no financial incentive)
- **GROW-03**: PDF re-delivery flow ("lost my PDF?" email request)
- **GROW-04**: A/B testing on email capture timing and result page conversion

### Blueprint Enhancements

- **BPEX-01**: Cultural background personalization in Blueprint PDF (culturally-variant copy per archetype)
- **BPEX-02**: AI-personalized paragraphs within template (deferred — template-first for v2.0)

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User accounts / login dashboard | Massive auth complexity for v1. Stateless flow delivers the product. Email captures identity. |
| Fully AI-generated PDF (no template) | Quality control impossible. Fixed template with AI paragraphs gives 80% personalization at 20% risk. Product 2 scope. |
| Embedded Stripe payment (no redirect) | Higher PCI scope, more complex. Stripe Checkout redirect is trusted. Product 2 scope. |
| Unlimited quiz retakes | Undermines result credibility. Users game for flattering results. |
| AI-generated PDF content | Template-driven is faster, more reliable, and sufficient. AI adds complexity without proportional value for v2.0. |
| PDF email attachment | Spam filter risk for new sending domains. Use download link instead. |
| Partner dialogue in Blueprint | Individual product — partner content belongs in Product 3 (Partner Match). |
| Social login (Google, Facebook) | Privacy concerns in deeply personal parenting context. Email is lower friction here. |
| Affiliate / referral program | Needs purchase volume baseline first. Add after validating core flow. |
| Live chat during quiz | Distracting, breaks flow, reduces completion. FAQ + helper text covers it. |
| Mobile app | Web-first. Mobile app only after product-market fit. |
| Physical printed product | Digital only. No fulfillment complexity. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ARCH-01 | Phase 0 | Complete |
| ARCH-02 | Phase 0 | Complete |
| ARCH-03 | Phase 0 | Complete |
| ARCH-04 | Phase 0 | Complete |
| ARCH-05 | Phase 0 | Complete |
| QUIZ-01 | Phase 2 | Complete |
| QUIZ-02 | Phase 2 | Complete |
| QUIZ-03 | Phase 2 | Complete |
| QUIZ-04 | Phase 2 | Complete |
| QUIZ-05 | Phase 2 | Complete |
| QUIZ-06 | Phase 2 | Complete |
| QUIZ-07 | Phase 2 | Complete |
| QUIZ-08 | Phase 2 | Complete |
| COPY-01 | Phase 2.5 | Complete |
| COPY-02 | Phase 2.5 | Complete |
| COPY-03 | Phase 2.5 | Complete |
| COPY-04 | Phase 2.5 | Complete |
| RSLT-01 | Phase 3 | Complete |
| RSLT-03 | Phase 3 | Complete |
| RSLT-05 | Phase 3 | Complete |
| RSLT-06 | Phase 3 | Pending |
| RSLT-07 | Phase 3 | Complete |
| RSLT-08 | Phase 3 | Complete |
| RSLT-09 | Phase 3 | Complete |
| RSLT-10 | Phase 3 | Complete |
| LAND-01 | Phase 5 | Pending (rebuild) |
| LAND-02 | Phase 5 | Pending (rebuild) |
| LAND-03 | Phase 5 | Pending (rebuild) |
| LAND-04 | Phase 5 | Pending (rebuild) |
| LAND-05 | Phase 5 | Pending (rebuild) |
| BRAND-01 | Phase 4 | Complete |
| BRAND-02 | Phase 4 | Complete |
| BRAND-03 | Phase 4 | Complete |
| BRAND-04 | Phase 4 | Complete |
| BRAND-05 | Phase 4 | Complete |
| BRAND-06 | Phase 5 | Pending (redo) |
| BRAND-07 | Phase 5 | Pending (redo) |
| BRAND-08 | Phase 5 | Pending (redo) |
| BQUIZ-01 | Phase 7 | Complete |
| BQUIZ-02 | Phase 7 | Complete |
| BQUIZ-03 | Phase 7 | Complete |
| BQUIZ-04 | Phase 7 | Complete |
| BQUIZ-05 | Phase 7 | Complete |
| BQUIZ-06 | Phase 7 | Complete |
| PAY-01 | Phase 8 | Pending |
| PAY-02 | Phase 8 | Pending |
| PAY-03 | Phase 8 | Pending |
| PAY-04 | Phase 8 | Pending |
| PAY-05 | Phase 8 | Pending |
| PDF-01 | Phase 9 | Pending |
| PDF-02 | Phase 9 | Pending |
| PDF-03 | Phase 9 | Pending |
| PDF-04 | Phase 9 | Pending |
| PDF-05 | Phase 9 | Pending |
| PDF-06 | Phase 9 | Pending |
| LAUNCH-01 | Phase 10 | Pending |
| LAUNCH-02 | Phase 10 | Pending |

**Coverage:**
- v1 requirements (Mirror + Brand): 34 total — 25 complete, 9 pending
- v2 requirements (Blueprint): 19 total — 0 complete, 19 pending (roadmap created 2026-03-13)
- Product 3 requirements: 7 (COUP-01–07) — deferred

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-03-13 — v2.0 roadmap created; traceability updated for BQUIZ-01–06 → Phase 7, PAY-01–05 → Phase 8, PDF-01–06 → Phase 9, LAUNCH-01–02 → Phase 10*
