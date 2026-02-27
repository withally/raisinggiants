# Requirements: Raising Giants — The Mirror

**Defined:** 2026-02-23
**Updated:** 2026-02-25 — Product ladder pivot
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

- [x] **LAND-01**: Clear value proposition communicating the research-backed, expert-informed nature of the product
- [x] **LAND-02**: KOL credibility signals (top 100 named experts, research attribution)
- [x] **LAND-03**: Quiz start CTA that drives conversions
- [x] **LAND-04**: Mobile-responsive design
- [x] **LAND-05**: Sophia's credentials and clinical authority visible

### Brand Positioning and Visual Direction

- [ ] **BRAND-01**: 10-15 competitors profiled across three segments (self-discovery, wellness/therapy, parenting) with audience-first discovery methodology
- [ ] **BRAND-02**: Competitive positioning map (2x2: clinical-warm x shallow-deep) with gap analysis identifying unoccupied territory
- [ ] **BRAND-03**: Reference brand gallery of 8-12 aspirational brands with visual attribute + emotional response documentation and pattern synthesis
- [ ] **BRAND-04**: Narrative positioning document defining brand territory, answering: landscape, gap, and positioning case
- [ ] **BRAND-05**: Brand name and product name evaluation with clear keep/change recommendations tested against clarity, inclusion, direction, and register criteria
- [ ] **BRAND-06**: Visual direction brief — color palette with hex codes and emotional rationale, grounded in positioning
- [ ] **BRAND-07**: Visual direction brief — typography, imagery system, layout approach, and brand tone recommendations
- [ ] **BRAND-08**: Rebrand execution plan mapping visual recommendations to specific codebase files with phased implementation scope

## Product 2 Scope — The Blueprint (Paid)

Deferred to Product 2 release. Tracked but not in v1 roadmap.

### Payment & Delivery

- [ ] **PAY-01**: Stripe Checkout redirect for Blueprint purchase
- [ ] **PAY-02**: Webhook-driven fulfillment triggered by checkout.session.completed (not success page redirect)
- [ ] **PAY-03**: Idempotent webhook handler (handles duplicate Stripe events)
- [ ] **PAY-04**: Success page shows download button or "check your email" based on fulfillment status
- [ ] **PAY-05**: PDF delivered instantly via email after payment with download link

### PDF Guide

- [ ] **PDF-01**: 15-20 page fixed template with AI-personalized paragraphs via Moonshot Kimi 2.5
- [ ] **PDF-02**: Warm, approachable premium design (therapy workbook meets Canva premium aesthetic)
- [ ] **PDF-03**: Parenting origin profile section personalized to user's specific quiz answers
- [ ] **PDF-04**: Cultural background insights section tailored to user's stated cultural context
- [ ] **PDF-05**: Foundational patterns section (positive framing of user's parenting tendencies)
- [ ] **PDF-06**: Specific watchouts section (shadow patterns and risks to be aware of)
- [ ] **PDF-07**: Tailored reflection prompts specific to user's archetype and answers
- [ ] **PDF-08**: Research snippets relevant to user's specific results with KOL attribution
- [ ] **PDF-09**: Partner dialogue prompts section with conversation starters customized to user's blind spots
- [ ] **PDF-10**: Conversation starter section designed for dialogue with partner and loved ones

## Product 3 Scope — The Partner Match (Premium)

Deferred to future release. Tracked but not in roadmap.

### Couple's Blueprint

- **COUP-01**: Both partners take quiz separately and results combine into partnership report
- **COUP-02**: Share link flow — Person A gets link to send Person B after completing quiz
- **COUP-03**: Email invite flow — Person A enters partner's email, partner gets invited
- **COUP-04**: Combined report shows alignment areas and potential conflict points
- **COUP-05**: Partnership-specific dialogue prompts and dialogue kit for couple conversations

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### KOL Personalization

- **KOL-01**: User can browse the 100 KOLs and toggle on/off which experts they already follow or resonate with
- **KOL-02**: PDF output adapts research snippets and attribution to prioritize user's preferred KOLs

### Growth & Retention

- **GROW-01**: Post-purchase email sequence (partner nudge, Product 3 teaser)
- **GROW-02**: Share button on result page (organic, no financial incentive)
- **GROW-03**: PDF re-delivery flow ("lost my PDF?" email request)
- **GROW-04**: A/B testing on email capture timing and result page conversion

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User accounts / login dashboard | Massive auth complexity for v1. Stateless flow delivers the product. Email captures identity. |
| Fully AI-generated PDF (no template) | Quality control impossible. Fixed template with AI paragraphs gives 80% personalization at 20% risk. Product 2 scope. |
| Embedded Stripe payment (no redirect) | Higher PCI scope, more complex. Stripe Checkout redirect is trusted. Product 2 scope. |
| Unlimited quiz retakes | Undermines result credibility. Users game for flattering results. |
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
| LAND-01 | Phase 4 | Complete |
| LAND-02 | Phase 4 | Complete |
| LAND-03 | Phase 4 | Complete |
| LAND-04 | Phase 4 | Complete |
| LAND-05 | Phase 4 | Complete |
| BRAND-01 | Phase 6 | Pending |
| BRAND-02 | Phase 6 | Pending |
| BRAND-03 | Phase 6 | Pending |
| BRAND-04 | Phase 6 | Pending |
| BRAND-05 | Phase 6 | Pending |
| BRAND-06 | Phase 6 | Pending |
| BRAND-07 | Phase 6 | Pending |
| BRAND-08 | Phase 6 | Pending |

**Coverage:**
- v1 requirements (Mirror): 26 total
- Mapped to phases: 26
- Unmapped: 0
- Brand positioning requirements: 8 (BRAND-01–08)
- Product 2 requirements: 15 (PAY-01–05, PDF-01–10)
- Product 3 requirements: 5 (COUP-01–05)

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-27 — Phase 6 brand positioning requirements added (BRAND-01–08)*
