# Raising Giants — The Mirror

## What This Is

A product ladder that helps adults understand how the parenting they received shapes who they are today:

- **Product 1 — The Mirror (FREE):** A complete experience. Users take a research-backed quiz about their upbringing, provide their email, and receive a full personalized result: their parents' archetype, inherited foundational patterns, all 5 watchouts, and a dedicated cultural section. The Mirror helps adults feel deeply seen about the parenting they received.
- **Product 2 — The Blueprint (PAID):** Layers in the user's own parenting style and aspirations. A personalized PDF guide that bridges "what I inherited" with "what I want to build." Not in v1.
- **Product 3 — The Partner Match (PREMIUM):** Both partners take the quiz, then receive a combined report showing alignment, conflict areas, and a dialogue kit for principled conversations. Not in v1.

**v1 launch scope:** The Mirror (free quiz → email gate → full result page) + landing page + marketing strategy. Payment, AI content generation, and PDF rendering are Product 2 scope.

## Core Value

Adults feel deeply seen and understood about the parenting they *received* — the personalized output surfaces patterns they've always sensed but never had language for, grounded in credible research from top parenting experts.

## Requirements

### Product 1 — The Mirror (v1)

- [x] Research-backed archetype framework (9 archetypes, 11 dimensions) validated with Sophia
- [x] 10-20 minute quiz about upbringing with cultural background questions
- [x] Full quiz experience with progress bar, back navigation, localStorage persistence
- [ ] Archetype copy rewritten to describe parents' style (not user's current parenting)
- [ ] Email gate before result reveal
- [ ] Full Mirror result page: parents' archetype, foundational patterns, all watchouts, cultural section
- [ ] Product 2 coming-soon CTA on result page
- [ ] Landing page with credibility signals and quiz start CTA
- [ ] Marketing and launch strategy

### Product 2 — The Blueprint (future)

- [ ] Stripe Checkout for paid PDF guide
- [ ] AI-personalized 15-20 page PDF via Moonshot Kimi 2.5
- [ ] Premium PDF design (therapy workbook meets Canva premium)
- [ ] Webhook-driven fulfillment and email delivery

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
| Moonshot AI Kimi 2.5 for personalization | User's preferred AI model — Product 2 scope | Deferred to Product 2 |
| Stripe Checkout (redirect) over embedded | Simplest to build, handles PCI compliance — Product 2 scope | Deferred to Product 2 |
| Vercel Pro for AI + PDF generation | Hobby's 10s timeout insufficient — Product 2 scope | Deferred to Product 2 |

---
*Last updated: 2026-02-25 — Product ladder pivot (Mirror free / Blueprint paid / Partner Match premium)*
