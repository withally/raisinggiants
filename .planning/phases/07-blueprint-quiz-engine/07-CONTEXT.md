# Phase 7: Blueprint Quiz Engine - Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

<domain>
## Phase Boundary

Users can take the Blueprint quiz about their own parenting instincts, see their archetype result as a full web-based report, and have their answers persisted to Supabase — with the Mirror quiz completely unaffected. Payment happens BEFORE the quiz (on a landing/sales page in Phase 8), so the result screen shows the full archetype, not a teaser.

</domain>

<decisions>
## Implementation Decisions

### Parent-status gating
- Presented as a distinct **pre-quiz selector screen** (not a card-style quiz question) — a branching-path selection before the quiz begins
- Three options: "I'm a parent now" / "I'm expecting" / "Planning for someday"
- Selected status **adapts both question wording AND section intro copy** throughout the quiz (e.g. "As a parent, when your child..." vs "When you imagine your future child...")
- Parent status is stored alongside quiz answers

### Email capture
- Blueprint intro screen always shows the email field
- **Pre-fill email from Mirror quiz if available** in localStorage — user can confirm or change
- Still show the email step even if pre-filled (don't skip it)

### Quiz length and structure
- Similar length to Mirror quiz (~20 questions)
- Questions grouped into **parenting-domain sections** with section headers (e.g. "Daily moments", "Discipline & boundaries", "Emotional connection")
- Section headers provide pacing and context, matching Mirror quiz pattern

### Quiz visual identity
- **Same shell and components** as Mirror quiz (QuizCard, QuizProgress, animations, layout)
- **New accent color palette** — teal/green tones replacing the Mirror's plum/warm (#4A1942)
- Same cream background (#FAFAF7), same card shapes, same slide animations
- Feels like the same product family, visually differentiated at a glance

### Quiz tone and copy
- **Warm & curious** intro tone: "Let's explore your parenting instincts" — same gentle register as Mirror but focused on the present/future
- **Briefer closing transition** before processing — less emotional, more "Your results are ready" momentum toward the result screen
- Processing screen matches Mirror's emotional pacing pattern

### Product flow (key architectural decision)
- **Pay-first model**: User pays on Blueprint landing page (Phase 8) → gets access to take quiz → sees full result
- **No teaser screen** — since user has already paid, the result page shows the complete archetype breakdown
- The result page IS the paid product (web-based report, not a downloadable PDF)
- BQUIZ-04 from requirements needs to be reinterpreted: no "proceed to purchase" CTA on result screen since payment already happened

### Result screen
- **Rich reveal matching Mirror structure** but with own-parenting lens: archetype reveal → parenting patterns → blind spots/watchouts → cultural lens
- Same sections as Mirror, reframed: "Your parenting patterns" instead of "What you inherited"
- **Bridge comparison section** shown if user has completed BOTH Mirror and Blueprint quizzes — "What you inherited vs how you parent" (pulls Mirror session data)
- **Access control**: Session URL + email verification — user must enter the email they used before results are shown (prevents casual link-sharing of paid content)

### Claude's Discretion
- Exact teal/green color values for Blueprint accent palette
- Section header names and groupings for parenting questions
- Closing transition copy
- Processing screen design (can match or slightly adapt Mirror's)
- How the email verification gate is presented (inline form, modal, etc.)

</decisions>

<specifics>
## Specific Ideas

- Blueprint and Mirror must use completely separate localStorage keys and Zustand stores — no cross-contamination
- The bridge comparison (inherited vs own parenting) is a high-value differentiator — it's the "aha moment" that makes having both quizzes powerful
- Parent-status gating should feel intentional and warm, not clinical — it's setting the stage for the quiz

</specifics>

<deferred>
## Deferred Ideas

- **Web-based report instead of PDF** — User wants the "report" to be a web page, not a downloadable PDF. The "generate your report" action produces a web-based result, not a file. This fundamentally reshapes Phase 9 (PDF Generation & Delivery) into a web report phase. Captured here for roadmap consideration.
- **Pay-first landing/sales page** — The Blueprint has its own landing page where payment happens. This is Phase 8 + Phase 10 scope (LAUNCH-02), but the pay-first flow is a locked product decision that those phases must honor.
- Purchase CTA design — no longer needed on result screen since payment is pre-quiz

</deferred>

---

*Phase: 07-blueprint-quiz-engine*
*Context gathered: 2026-03-13*
