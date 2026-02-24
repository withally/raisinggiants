# Requirements: Your Parenting Blueprint

**Defined:** 2026-02-23
**Core Value:** Parents feel deeply seen and understood about their upbringing — the personalized output must feel written specifically for them, grounded in credible research, and create a bridge for meaningful conversations with loved ones.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Archetype Framework

- [x] **ARCH-01**: 6-8 named parenting archetypes defined with distinct profiles based on Sophia's clinical knowledge
- [x] **ARCH-02**: Scoring logic maps quiz answers to primary archetype (handles blended results)
- [ ] **ARCH-03**: Each archetype has foundational patterns description (positive framing of tendencies)
- [ ] **ARCH-04**: Each archetype has specific watchouts description (shadow/risk patterns to be aware of)
- [ ] **ARCH-05**: Each archetype has cultural context overlay (how cultural background modifies the archetype)

### Quiz Experience

- [ ] **QUIZ-01**: Card-style one-question-per-screen UI with warm, conversational language
- [ ] **QUIZ-02**: Progress bar showing completion percentage throughout quiz
- [ ] **QUIZ-03**: Back button allowing navigation to any previous question without losing answers
- [ ] **QUIZ-04**: Mobile-responsive layout optimized for thumb interaction
- [ ] **QUIZ-05**: "Why we ask this" helper text on sensitive questions (upbringing, cultural background)
- [ ] **QUIZ-06**: Direct cultural background questions that feed into personalization
- [ ] **QUIZ-07**: localStorage auto-save so users can resume if they leave mid-quiz
- [ ] **QUIZ-08**: Quiz is 10-20 minutes with questions grounded in research from top 100 parenting KOLs

### Free Result Page

- [ ] **RSLT-01**: Displays archetype name prominently with 2-3 sentence teaser summary
- [ ] **RSLT-02**: Shows PDF preview / sample pages (blurred or partial) so users see what they're paying for
- [ ] **RSLT-03**: Explains how user's upbringing shaped their archetype (the transmission mechanism)
- [ ] **RSLT-04**: Teaser of partner dialogue prompts to plant sharing/couple's interest seed
- [ ] **RSLT-05**: Single clear CTA to purchase full PDF guide ($14)

### Payment & Delivery

- [ ] **PAY-01**: Stripe Checkout redirect at $14 for individual blueprint
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
- [ ] **PDF-08**: Research snippets relevant to user's specific results with KOL attribution (from top 100 parenting experts)
- [ ] **PDF-09**: Partner dialogue prompts section with conversation starters customized to user's blind spots
- [ ] **PDF-10**: Conversation starter section designed for dialogue with partner and loved ones

### Landing Page

- [ ] **LAND-01**: Clear value proposition communicating the research-backed, expert-informed nature of the product
- [ ] **LAND-02**: KOL credibility signals (top 100 named experts, research attribution)
- [ ] **LAND-03**: Quiz start CTA that drives conversions
- [ ] **LAND-04**: Mobile-responsive design
- [ ] **LAND-05**: Sophia's credentials and clinical authority visible

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Couple's Blueprint

- **COUP-01**: Both partners take quiz separately and results combine into partnership report ($22)
- **COUP-02**: Share link flow — Person A gets link to send Person B after completing quiz
- **COUP-03**: Email invite flow — Person A enters partner's email, partner gets invited
- **COUP-04**: Combined report shows alignment areas and potential conflict points
- **COUP-05**: Partnership-specific dialogue prompts for couple conversations

### KOL Personalization

- **KOL-01**: User can browse the 100 KOLs and toggle on/off which experts they already follow or resonate with
- **KOL-02**: PDF output adapts research snippets and attribution to prioritize user's preferred KOLs

### Growth & Retention

- **GROW-01**: Post-purchase email sequence (partner nudge, v2 teaser)
- **GROW-02**: Share button on result page (organic, no financial incentive)
- **GROW-03**: PDF re-delivery flow ("lost my PDF?" email request)
- **GROW-04**: A/B testing on email capture timing and result page conversion

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User accounts / login dashboard | Massive auth complexity for v1. Stateless flow delivers the product. Email captures identity. |
| Fully AI-generated PDF (no template) | Quality control impossible. Fixed template with AI paragraphs gives 80% personalization at 20% risk. |
| Embedded Stripe payment (no redirect) | Higher PCI scope, more complex. Stripe Checkout redirect is trusted and handles international payments. |
| Unlimited quiz retakes | Undermines result credibility. Users game for flattering results. |
| Social login (Google, Facebook) | Privacy concerns in deeply personal parenting context. Email is lower friction here. |
| Affiliate / referral program | Needs purchase volume baseline first. Add after validating core flow. |
| Multiple pricing tiers / order bumps | Decision anxiety at checkout. Single $14 price removes friction. |
| Live chat during quiz | Distracting, breaks flow, reduces completion. FAQ + helper text covers it. |
| Mobile app | Web-first. Mobile app only after product-market fit. |
| Physical printed product | Digital only. No fulfillment complexity. |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| ARCH-01 | Phase 0 | Complete |
| ARCH-02 | Phase 0 | Complete |
| ARCH-03 | Phase 0 | Pending |
| ARCH-04 | Phase 0 | Pending |
| ARCH-05 | Phase 0 | Pending |
| QUIZ-01 | Phase 2 | Pending |
| QUIZ-02 | Phase 2 | Pending |
| QUIZ-03 | Phase 2 | Pending |
| QUIZ-04 | Phase 2 | Pending |
| QUIZ-05 | Phase 2 | Pending |
| QUIZ-06 | Phase 2 | Pending |
| QUIZ-07 | Phase 2 | Pending |
| QUIZ-08 | Phase 2 | Pending |
| RSLT-01 | Phase 3 | Pending |
| RSLT-02 | Phase 3 | Pending |
| RSLT-03 | Phase 3 | Pending |
| RSLT-04 | Phase 3 | Pending |
| RSLT-05 | Phase 3 | Pending |
| PAY-01 | Phase 4 | Pending |
| PAY-02 | Phase 4 | Pending |
| PAY-03 | Phase 4 | Pending |
| PAY-04 | Phase 4 | Pending |
| PAY-05 | Phase 4 | Pending |
| PDF-01 | Phase 5 | Pending |
| PDF-02 | Phase 6 | Pending |
| PDF-03 | Phase 5 | Pending |
| PDF-04 | Phase 5 | Pending |
| PDF-05 | Phase 5 | Pending |
| PDF-06 | Phase 5 | Pending |
| PDF-07 | Phase 5 | Pending |
| PDF-08 | Phase 5 | Pending |
| PDF-09 | Phase 5 | Pending |
| PDF-10 | Phase 5 | Pending |
| LAND-01 | Phase 7 | Pending |
| LAND-02 | Phase 7 | Pending |
| LAND-03 | Phase 7 | Pending |
| LAND-04 | Phase 7 | Pending |
| LAND-05 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-23 — traceability table completed after roadmap creation*
