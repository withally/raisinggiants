# Phase 3: Free Result Page - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

After completing the quiz, users see their archetype result for free on a conversion-focused page. The page displays the archetype name, teaser content sampled from the PDF guide, and a purchase CTA for $14. Creating the actual PDF content, payment processing, and delivery are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Result reveal experience
- Brief animated reveal (1-2 sec fade-in or card flip) when user lands on the result page
- Intriguing discovery tone: "Your parenting archetype: The Guardian" — curiosity-driven, not clinical
- Show primary archetype prominently with a subtle mention of the secondary blend (e.g., "with shades of The Nurturer")
- Custom illustration per archetype in the hero section, followed by the 2-3 sentence teaser summary below it

### Teaser content strategy
- Partial visible content approach: show the first paragraph of a PDF section clearly, then fade/cut to "Unlock full guide"
- Each teaser section maps to a PDF chapter — framed as a sampler of the full guide, not a standalone free result
- Partner dialogue teaser uses a short conversation snippet (2-3 lines of sample dialogue between partners), then locks the rest
- Transmission mechanism depth: Claude's Discretion (see below)

### Page flow and visual hierarchy
- Section order: Result hero → Early CTA (catch impulse buyers) → Teaser sections → Final CTA
- Warm and personal visual feel — soft colors, rounded elements, feels like a personalized letter, intimate not corporate
- Continuous scroll — content flows smoothly from section to section, no hard card breaks or visual separators
- Custom illustration per archetype in the hero (needs art assets — may use placeholder for MVP)

### Purchase CTA design
- Curiosity-driven button copy: "Unlock Your Complete Guide" — price shown prominently nearby but not on the button itself
- Two inline CTA placements: after the hero reveal, and at the bottom after all teasers
- Sticky CTA bar on mobile — compact bar at bottom of screen, always accessible as user scrolls
- Credibility line near CTA: "Based on research from 100+ parenting experts" or similar trust signal
- Price ($14) displayed prominently near the CTA button — no surprises, builds trust

### Claude's Discretion
- Transmission mechanism depth: how much of the upbringing→archetype connection to reveal for free vs lock behind the PDF
- Loading skeleton and transition animation details
- Exact spacing, typography choices, and color palette within the warm/personal direction
- Error state handling (e.g., if archetype data fails to load)
- Placeholder illustration approach for MVP if custom art isn't ready

</decisions>

<specifics>
## Specific Ideas

- The reveal should feel like uncovering something about yourself — the "aha moment" of personality quiz results
- Teaser sections should make the user feel like they're getting a preview of a real, substantial guide (not a thin upsell)
- Partner dialogue snippet should be relatable enough that users think "I need to have this conversation"
- The page should feel like a personalized letter, not a sales page — warmth first, conversion second

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-free-result-page*
*Context gathered: 2026-02-24*
