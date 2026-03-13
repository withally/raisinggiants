# Kin — The Mirror

## What This Is

A product ladder that helps adults understand how the parenting they received shapes who they are today:

- **Product 1 — The Mirror (FREE):** A complete experience. Users take a research-backed quiz about their upbringing, provide their email, and receive a full personalized result: their parents' archetype, inherited foundational patterns, all 5 watchouts, and a dedicated cultural section. The Mirror helps adults feel deeply seen about the parenting they received.
- **Product 2 — The Blueprint (PAID, $39-49):** A second archetype product. Users take a new quiz about their OWN parenting style/aspirations (starts with "are you a parent / expecting / planning?"), producing their own parenting archetype. Standalone value as "who you are as a parent." If combined with Mirror data, unlocks the bridge analysis: inherited archetype vs own archetype comparison with narrative flow, watchouts at the intersection, and reflection prompts. Template-driven 15-20 page PDF, no AI generation needed.
- **Product 3 — The Partner Match (PREMIUM):** Both partners take the quiz, then receive a combined report showing alignment, conflict areas, and a dialogue kit for principled conversations. Not in v2.

**v1 (shipped):** The Mirror (free quiz → full result page) + landing page. Core loop works end-to-end.
**v2 (current):** The Blueprint (paid quiz → archetype → PDF) + Stripe payment + email delivery.

## Core Value

Adults feel deeply seen and understood about the parenting they *received* — the personalized output surfaces patterns they've always sensed but never had language for, grounded in credible research from top parenting experts.

## Requirements

### Product 1 — The Mirror (v1)

- [x] Research-backed archetype framework (9 archetypes, 11 dimensions) validated with Sophia
- [x] 10-20 minute quiz about upbringing with cultural background questions
- [x] Full quiz experience with progress bar, back navigation, localStorage persistence
- [x] Archetype copy rewritten to describe parents' style (not user's current parenting)
- [ ] Email gate before result reveal
- [x] Full Mirror result page: parents' archetype, foundational patterns, all watchouts, cultural section
- [x] Product 2 coming-soon CTA on result page
- [ ] Landing page with credibility signals and quiz start CTA *(old page nuked — rebuild in Phase 5)*
- [ ] Marketing and launch strategy

## Current Milestone: v2.0 The Blueprint

**Goal:** Ship a paid, template-driven personalized PDF that gives users their OWN parenting archetype and — when combined with Mirror data — bridges "what I inherited" with "who I'm becoming as a parent."

**Target features:**
- Blueprint quiz (own parenting style/aspirations, with parent-status gating)
- Blueprint archetype framework (same 9 archetypes, own-parenting lens)
- Stripe Checkout payment flow ($39-49, introductory offer)
- Template-driven 15-20 page PDF (narrative flow + summary sections)
- Comparison engine (inherited vs own archetype bridge, if both quizzes taken)
- Premium PDF design (therapy workbook meets Canva premium)
- Email delivery via Resend + success page

### Product 2 — The Blueprint (active)

- [ ] Blueprint quiz about user's own parenting style/aspirations
- [ ] "Are you a parent / expecting / planning?" gating question that changes framing
- [ ] Own parenting archetype scoring (same 9 archetypes, own-parenting lens)
- [ ] Stripe Checkout for Blueprint purchase ($39-49)
- [ ] Webhook-driven fulfillment triggered by checkout.session.completed
- [ ] Template-driven 15-20 page PDF assembled from archetype data + pre-written content
- [ ] Premium PDF design (therapy workbook meets Canva premium)
- [ ] Deeper origin profile, cultural insights, patterns, watchouts sections
- [ ] Reflection prompts specific to user's archetype
- [ ] Research snippets with KOL attribution
- [ ] Comparison bridge analysis (if both Mirror + Blueprint taken): inherited vs own archetype
- [ ] Email delivery after payment with download link
- [ ] Success page with download/email status

### Product 3 — The Partner Match (future)

- [ ] Both partners take quiz separately with results combined
- [ ] Partnership report showing alignment and conflict areas
- [ ] Dialogue kit with conversation starters for couple conversations

### Out of Scope

- Mobile app — web-first
- Physical book / printed product — digital only
- OAuth / social login — email-based flow sufficient
- User accounts / dashboards — stateless quiz flow

## Context

**Market gap:** Every personalized book/product targets kids (Wonderbly, Magic Story, Hooray Heroes). Nobody targets adults reflecting on their own upbringing. The parenting quiz/assessment space is full of free lead magnets with ugly, basic text outputs.

**Key insight — archetype describes parents, not user:** The quiz maps how the user was *raised*, producing their parents' archetype. This reframe makes the product universally accessible (non-parents, expecting parents, anyone) and sharpens the emotional core: "finally understanding what happened to me."

**Credibility foundation:** The quiz and personalization are built on research from top 100 KOLs (Key Opinion Leaders) in parenting, child development, and family psychology. This research base gives the product authority and trust.

**Team:** Sophia is co-founder with clinical expertise in parenting psychology. She provides the archetype framework and clinical knowledge. The framework is at 9 archetypes / 11 dimensions, provisionally validated.

**Product ladder strategy:** The Mirror (free) builds the email list and establishes trust. The Blueprint (paid) monetizes with deep personalization. The Partner Match (premium) is the viral mechanic — share link and email invite flows.

## Constraints

- **Tech stack**: Next.js on Vercel, Supabase for database, Stripe Checkout for payments (Product 2)
- **Design**: Warm and approachable aesthetic — therapy workbook meets Canva premium. Not clinical, not childish.
- **Quiz length**: 10-20 minutes. Depth and credibility matter more than speed.
- **Research foundation**: Quiz questions and personalization logic grounded in established parenting/child development research from identified KOLs.
- **Archetype framework**: 9 archetypes / 11 dimensions, validated with Sophia's clinical input.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Vercel + Supabase | Standard modern stack, fast to ship, good DX | Confirmed |
| Individual Blueprint first, couple's later | Validate core value before building viral mechanics | Confirmed |
| Direct cultural background questions | Richer personalization data vs. inferred approach | Confirmed |
| Digital-only delivery | No physical fulfillment complexity, instant gratification | Confirmed |
| 10-20 min quiz (not 2-3 min) | Depth builds credibility and produces richer personalization | Confirmed |
| Research-backed from top 100 KOLs | Trust and authority differentiate from generic quiz products | Confirmed |
| Archetype = parents' style, not user's | Makes product universal (non-parents too); sharpens emotional core | Confirmed |
| Email gate before result (not after) | Captures lead at peak curiosity; result is the free value exchange | Confirmed |
| Product ladder (free → paid → premium) | Free Mirror builds list + trust; Blueprint monetizes; Partner Match is viral | Confirmed |
| Full result free (no paywall/teaser) | Users must feel completely seen; teaser model undermines core value | Confirmed |
| Template-first PDF (no AI generation) | Archetype data + pre-written content is rich enough; AI adds complexity without proportional value | Confirmed |
| Blueprint is a second archetype quiz | Not just a deeper PDF — users take a new quiz about their OWN parenting, producing their own archetype | Confirmed |
| Three user paths: Mirror only / Blueprint only / Both | Blueprint can stand alone; combined experience unlocks bridge analysis | Confirmed |
| Pricing: $39-49 with introductory offer | Premium positioning; founding member discount for early adopters | Confirmed |
| Partner dialogue deferred to Product 3 | Blueprint stays individual-focused; partner content is Partner Match territory | Confirmed |
| Stripe Checkout (redirect) over embedded | Simplest to build, handles PCI compliance | Confirmed |
| Brand name: Kin (supersedes Raising Giants) | One syllable; warm familial register; works for multi-product brand | Confirmed |
| Branded House: "The [Product] by Kin" | Master brand carries all trust; products named The Mirror, The Blueprint, The Partner Match | Confirmed |
| Brand territory: "digital tools for parents who want to understand themselves" | Permanent, defensible, product-neutral positioning | Confirmed |

---
*Last updated: 2026-03-13 — Milestone v2.0 (The Blueprint) started; Product 2 scope redefined as second archetype quiz + template PDF*
