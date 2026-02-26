# Phase 3: Mirror Result Page - Context

**Gathered:** 2026-02-26
**Status:** Ready for planning

<domain>
## Phase Boundary

After completing the quiz, users provide their email and see a complete, free result page showing the parenting archetype that shaped them. The page includes: archetype reveal, foundational patterns, watchouts, cultural context section, and a Blueprint (Product 2) coming-soon CTA. No paywall, no blurred content, no purchase CTA. This is the emotional core — users should feel deeply seen about the parenting they received.

</domain>

<decisions>
## Implementation Decisions

### Result Reveal & Page Flow
- Dramatic single reveal: archetype name appears alone first as a big emotional moment before the rest of the page
- Framing is "You were raised by: [Archetype Name]" — about the parenting the user received, NOT "this is you"
- Section order after reveal: Patterns → Watchouts → Blueprint CTA → Cultural (cultural section closes the page)
- Long-form deep read — full content for every section, feels like a personal report (5-8 screen-lengths)
- Chapter-like visual sections: clear visual breaks between sections, alternating backgrounds, section headers, breathing room. Each section feels like its own moment

### Email Gate
- Blurred overlay approach: result page loads but all content is hidden/blurred behind an email form overlay
- Everything hidden — archetype name and all content are concealed until email is submitted. Overlay says something like "Your result is ready"
- Value-driven gate copy: emphasize what the user is getting ("We've prepared a personalized report about the parenting you received")
- On email submit: overlay fades away and blurred content comes into focus (curtain-lifting transition)
- Email is stored to quiz_sessions table (existing nullable email column from Phase 1)

### Cultural Section
- "The cultural lens" — observational framing with slight distance, not directly personal second-person
- Section header names the specific culture selected: "The East Asian Lens", "The Latino/Hispanic Lens", etc.
- Three sub-sections displayed: expressionModifier narrative intro, then "What this gave you" (strengthsInContext) bullets, then "What this may have cost you" (tensionsInContext) bullets
- If user didn't select a cultural background during quiz: skip the cultural section entirely — page flows from Watchouts → Blueprint CTA → page end
- Cultural section is the page closer (appears after Blueprint CTA)

### Blueprint CTA
- Two CTA placements:
  1. Inline CTA section between Watchouts and Cultural — specific preview of what The Blueprint offers (personalized action plan, partner dynamics guide, healing exercises)
  2. Sticky CTA element visible throughout scroll (Claude's discretion on style — subtle bottom bar or floating button)
- CTA includes email capture for launch notification ("Notify me when The Blueprint launches")
- Messaging should be concrete: name what Product 2 delivers, not just emotional hooks

### Claude's Discretion
- Exact gate overlay copy wording (within value-driven framing)
- Sticky CTA style and positioning (subtle bottom bar vs floating button vs other)
- Visual design details: typography scale, spacing, color palette (should match landing page editorial warmth)
- Transition animations and timing for the email gate unblur
- How much of the archetype summary to show in the reveal moment before scrolling to sections
- Loading states and error handling

</decisions>

<specifics>
## Specific Ideas

- The reveal framing established in Phase 2.5: "You were raised by: [Archetype Name]" followed by "The people who raised you parented from a place of [core quality]. Here's what that looked like for you growing up — and what it gave you."
- The "warm expert friend" tone (Emily Oster reference) carries through from earlier phases
- Landing page already uses Cormorant Garamond display font + amber-50/stone-900 editorial palette — result page should feel like a continuation of that brand
- Phase 2.5 taglines ("You grew up anchored.", "You grew up protected.", etc.) should appear prominently in the reveal
- Watchout closer "That served you then. It may not serve you now." already written into content

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-mirror-result-page*
*Context gathered: 2026-02-26*
