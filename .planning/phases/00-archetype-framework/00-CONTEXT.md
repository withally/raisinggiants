# Phase 0: Archetype Framework - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Define a research-backed parenting archetype system with scoring logic, content descriptions, and cultural context overlays. The archetype set is the stable foundation that all downstream engineering (quiz, results, PDF, AI content) builds against. This phase produces the framework and structured content outlines — not the quiz UI, not the PDF design, not the AI prompts.

</domain>

<decisions>
## Implementation Decisions

### Archetype Identity & Naming
- Archetype count is **research-driven** — not locked at a specific number. KOL research determines how many distinct patterns emerge (initial estimate was 6 but may be more)
- **Warm & descriptive names** reflecting current parenting style (e.g., "The Steady Anchor", "The Fierce Protector") — not clinical, not metaphorical
- **Spectrum with overlap** — archetypes shade into each other, not rigidly non-overlapping
- Results surface **1 primary + 3 secondary** archetypes, StrengthsFinder-style (ranked, no percentages)
- **Strength-first framing** with wound awareness — lead with "this is your superpower," then "here's what to watch for"
- Each archetype gets a **one-liner shareable tagline** (e.g., "Your calm is your children's foundation")
- Names reference the **current parenting style**, not the childhood origin. Upbringing context comes in the content narrative

### Three-Lens Scoring Model
- The same archetype set is scored across **three lenses**: Past (how you were raised), Current (how you parent now), Aspirational (how you want to parent)
- **Past is the core quiz** — everyone takes this. Current and Aspirational are opt-in continuations
- **Dimensional scoring** — each question contributes to multiple dimensions, archetypes defined by dimension profiles
- When a user only completes Past, the result shows their inherited pattern archetype plus **soft inference** of current/aspirational leanings ("parents with this background often lean toward...")
- The movement between archetypes across lenses IS the personal story — this is the core product insight

### Research-Built, Not Clinician-Invented
- Archetypes are **built from KOL research** — cross-referencing frameworks from top parenting researchers (Baumrind, Gottman, Siegel, etc.) to find recurring dimensions and synthesize overlapping patterns
- **Sophia validates and signs off** on the framework but does not create it from scratch
- The KOL identification and research synthesis is a **significant foundational effort** that sets the tone for all downstream work
- This research phase must happen first and be done thoroughly — it's the bedrock

### Content Voice & Depth
- **"Warm expert friend" tone** — like a therapist who's also your smart friend. Emily Oster is the reference: research-grounded, warm, non-judgmental
- Watchouts use a **blend of research framing and gentle nudges** — "research shows..." combined with "when stressed, you might find yourself..." Normalizing, not pathologizing
- Phase 0 produces **structured outlines + key themes** per archetype (not full prose). Enough for Sophia to validate the framework; AI fills in personalized prose later
- **Consumer product backed by research** — not a research paper. Content should flow naturally without interruption
- Research attribution via **bottom citations**, not inline name-dropping. Credibility comes from insight quality, not mid-sentence references
- May need to generate and compare various content versions later, but keep citations separate for now

### Claude's Discretion
- Exact number of scoring dimensions and their names
- Specific KOL selection methodology (which researchers to prioritize)
- How to structure the cultural context overlay (deferred from discussion but still in scope per requirements)
- Reading level and word count targets for outlines
- How "soft inference" is calculated from past-only scores

</decisions>

<specifics>
## Specific Ideas

- **StrengthsFinder** as the model for how results are presented — ranked archetypes, each with a theme description, no percentages
- **Emily Oster** as the voice/tone reference — research-backed but warm, conversational, non-judgmental, empowering
- The three-lens model (past → current → aspirational) creates a narrative arc: "where you came from, where you are, where you're heading"
- The gap between lenses is the story — past→current shows what you've already changed, current→aspirational shows where to grow

</specifics>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope

</deferred>

---

*Phase: 00-archetype-framework*
*Context gathered: 2026-02-24*
