# Your Parenting Blueprint

## What This Is

A personalized digital guide that helps parents and pre-parents understand how their own upbringing shapes their parenting instincts. Users take a 2-3 minute quiz about how they were raised, receive a free archetype summary, and can purchase a deeply personalized 15-20 page PDF guide ($14) that reflects their specific upbringing patterns, cultural background, and blind spots.

## Core Value

Parents feel deeply seen and understood about their upbringing — the personalized PDF must feel like it was written specifically for them, not a generic template with their name inserted.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Users can take a 2-3 minute quiz about their upbringing and parenting experiences
- [ ] Quiz asks about cultural background directly and uses it to personalize output
- [ ] Quiz maps responses to one of 6-8 parenting style archetypes (framework to be developed with Sophia)
- [ ] Users receive a free result page showing their archetype summary
- [ ] Users can purchase a full personalized PDF guide for $14 via Stripe Checkout
- [ ] PDF is 15-20 pages with AI-personalized paragraphs (Moonshot AI Kimi 2.5)
- [ ] PDF includes: parenting origin profile, cultural background insights, tailored reflection prompts, relevant research snippets, conversation starters for blind spots
- [ ] PDF has warm, approachable design (therapy workbook meets Canva premium)
- [ ] PDF is delivered instantly after payment (digital delivery, no fulfillment)
- [ ] Landing page communicates the value proposition and drives quiz starts

### Out of Scope

- Couple's Blueprint (combined report with compatibility insights) — v2 feature, after individual flow is validated
- Partner comparison / viral sharing mechanics — v2, depends on couple's flow
- Mobile app — web-first
- Physical book / printed product — digital only
- OAuth / social login — email-based flow sufficient for v1
- User accounts / dashboards — stateless quiz flow, PDF delivery via email or download

## Context

**Market gap:** Every personalized book/product targets kids (Wonderbly, Magic Story, Hooray Heroes). Nobody targets parents reflecting on their own upbringing. The parenting quiz/assessment space is full of free lead magnets with ugly, basic text outputs.

**Team:** Sophia is co-founder with clinical expertise in parenting psychology. She provides the archetype framework and clinical knowledge. The archetype framework is currently at concept stage — 6-8 parenting style archetypes need to be defined with scoring logic and descriptions.

**Competitive positioning:** Combines quality quiz experience + AI-powered deep personalization + premium designed output. Pricing at $14 individual sits between free generic quizzes and $20-35 physical books.

**v2 vision:** Couple's Blueprint ($22) where both partners take the quiz separately, then receive a combined report showing alignment and conflict areas. This is the viral mechanic — share link and email invite flows for partner matching.

## Constraints

- **Tech stack**: Next.js on Vercel, Supabase for database, Stripe Checkout for payments, Moonshot AI Kimi 2.5 for content generation
- **Design**: Warm and approachable aesthetic — therapy workbook meets Canva premium. Not clinical, not childish.
- **Quiz length**: 2-3 minutes max. Longer kills completion rate.
- **Archetype framework**: Needs development with Sophia's clinical input before quiz can be finalized. 6-8 archetypes based on clinical parenting psychology.
- **PDF generation**: Templated sections with AI-personalized paragraphs. Not fully AI-generated — structure is fixed, content is personalized.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js + Vercel + Supabase | Standard modern stack, fast to ship, good DX | — Pending |
| Moonshot AI Kimi 2.5 for personalization | User's preferred AI model for content generation | — Pending |
| Stripe Checkout (redirect) over embedded | Simplest to build, handles PCI compliance | — Pending |
| Individual Blueprint first, couple's later | Validate core value before building viral mechanics | — Pending |
| Direct cultural background questions | Richer personalization data vs. inferred approach | — Pending |
| Digital-only delivery | No physical fulfillment complexity, instant gratification | — Pending |

---
*Last updated: 2026-02-23 after initialization*
