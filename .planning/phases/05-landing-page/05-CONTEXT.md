# Phase 5: Landing Page Rebuild - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Rebuild the landing page from scratch: hero (from existing prototype), full below-the-fold sections, KOL credibility display, product ladder, Sophia section, FAQ, and final CTA. Implements the locked visual direction (Warm Solid/Mid Blend ~35-40%). Mobile-responsive. Single conversion goal: start the quiz.

Visual direction is locked in `VISUAL-DIRECTION.md` (same directory). The hero prototype exists in `app/page.tsx` (Variant A = Warm Solid is the chosen base).

</domain>

<decisions>
## Implementation Decisions

### Conversion Architecture
- Single CTA throughout the entire page: "Take The Mirror" → routes to /quiz
- No competing CTAs (no Blueprint waitlist, no email capture on product cards)
- Every section that can host a CTA should have one (hero, Mirror product card, final section)

### Page Sections & Order (6-8 sections)
1. **Hero** — Existing prototype (Variant A: Warm Solid). Asymmetric 7/5 grid, butter hero card, pills, headline, dual CTAs
2. **Emotional hook** — Below-the-fold opening. Bridges from hero headline to the "why" (recognition phase of the arc)
3. **How it works — Process** — 3-step visual: Take the quiz → Get your Mirror result → Understand your patterns
4. **How it works — Science** — The research foundation: 11 dimensions, 9 archetypes, research-backed methodology
5. **KOL Credibility** — Named researcher cards with research snippets (see KOL section below)
6. **Product Ladder** — Three side-by-side cards: Mirror (live), Blueprint (coming soon), Partner Match (future)
7. **About Sophia** — Dedicated section for clinical co-founder credentials, photo, personal connection
8. **FAQ** — 5-7 objection-handling questions (Is this real science? How long? Is it free? What about my email?)
9. **Final CTA** — Emotional callback: "Ready to see what shaped you?" with quiz button

### KOL Credibility Display
- Card format: researcher name + one-line research snippet (e.g., "Gottman — Emotion coaching as core of attunement")
- Styled in dark teal (#002833) cards with pastel accent text, matching the visual direction stat card pattern
- Show 4-6 most recognizable researchers upfront (Gottman, Siegel, etc.)
- "See all researchers" expands to reveal the full list (8+)
- No headshots — the research citation itself is the trust signal
- No institution logos

### Product Ladder Presentation
- Three side-by-side cards with status badges
- Mirror: "Free — Available now" with "Take The Mirror" CTA button
- Blueprint: "Coming soon" — name + one-liner + status badge only
- Partner Match: "Future" — name + one-liner + status badge only
- Minimal detail per card — don't compete with the main product (Mirror)
- No email waitlist capture on Blueprint/Partner Match cards

### Sophia Section
- Separate from KOL research section — elevated, personal
- Clinical credentials, photo, personal connection to the work
- Positioned after KOL credibility (research validates, then the creator grounds it in lived expertise)

### FAQ Section
- 5-7 questions addressing pre-quiz objections
- Likely topics: Is this real science? How long does it take? Is it really free? What happens with my email? Who made this?
- Positioned just before final CTA (reduce last-moment friction)

### Copy & Emotional Arc
- **Arc:** Recognition → Validation → Action
  - Recognition: "You've always sensed something shaped you" (hero + emotional hook)
  - Validation: "Here's the research. Here's who built it." (how it works + KOL + Sophia)
  - Action: "Now understand it." (product ladder + final CTA)
- **Headline locked:** "Finally see what shaped you." (mixed serif + sans: "Finally" bold sans / "see what" italic serif plum / "shaped you." bold sans)
- **Tone:** Warm + direct throughout — conversational but confident. Like a thoughtful friend who knows the research. Not clinical, not cutesy, not generic startup.
- **Final CTA:** Emotional callback, not a repeat of the hero. Something like "Ready to see what shaped you?" — the page has built to this moment.

### Social Proof Strategy
- KOL research IS the social proof — no user testimonials (pre-launch, don't fabricate)
- Stats in hero (9 archetypes, 11 dimensions) serve as quantitative proof
- Quote card in hero ("I always sensed this about how I was raised") is aspirational, not testimonial

### Claude's Discretion
- Exact section-to-section transitions and spacing
- Specific copy for each section (beyond headline which is locked)
- FAQ question wording and answers
- Mobile responsive breakpoint behavior (visual direction says it degrades naturally)
- Animation/scroll behavior (subtle or none)
- Emotional hook section content and format
- Dark teal vs pastel card choices per section (within visual direction constraints)

</decisions>

<specifics>
## Specific Ideas

- Hero prototype is in `app/page.tsx` — Variant A (Warm Solid) is the chosen base. The 3-variant switcher will be replaced with the final page.
- Visual direction is locked in `.planning/phases/05-landing-page/VISUAL-DIRECTION.md` — all palette, typography, card styling, nav, and "what NOT to do" rules apply
- The emotional arc (Recognition → Validation → Action) mirrors the product experience itself — users take The Mirror to finally see what shaped them
- The quote card "I always sensed this about how I was raised" is the brand's emotional core — it should echo throughout the page narrative
- KOL data already exists in `lib/quiz/dimensions.ts` — researcher names and research citations are embedded in the dimension definitions (Gottman, Siegel, etc.)
- Positioning narrative in `.planning/phases/04-brand-positioning-research-and-visual-direction/04-03-positioning-narrative.md` — defines the brand territory and competitive whitespace

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-landing-page*
*Context gathered: 2026-03-01*
