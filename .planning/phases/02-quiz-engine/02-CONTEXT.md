# Phase 2: Quiz Engine - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Users complete the full parenting quiz end-to-end — one question per screen in a card-style layout, warm conversational tone, with answers auto-saved to localStorage and persisted to Supabase on completion. Covers QUIZ-01 through QUIZ-08. Result page display and payment are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Question tone & flow
- Warm friend tone — like a thoughtful friend asking over coffee. "Think back to how your parents handled conflict..." No clinical jargon, no quiz-app playfulness.
- Sensitive questions (upbringing, cultural background) get a gentle lead-in sentence that normalizes the topic before the question itself. E.g., "Many of us carry patterns from childhood. No right or wrong here."
- Quiz is divided into visible sections (e.g., "About You", "Your Upbringing", "Your Parenting") — light section headers appear as user progresses, giving a sense of journey and context for topic shifts.
- "Why we ask this" helper text is tap-to-reveal — small link below sensitive questions that expands a brief explanation on tap. Keeps the card clean by default.

### Card interactions
- Auto-advance on answer select (~300ms pause, then slide to next). Back button always accessible to return to previous questions.
- Slide left/right transitions between cards — forward slides left, back slides right. Natural for mobile swipe mental model.
- Thin progress bar at the very top of the screen, filling left-to-right. Minimal, doesn't compete with the card content.
- Back navigation via top-left arrow icon (navigation bar style). Always present except on the first question.

### Answer input types
- Primary format: tappable option cards — full-width tappable cards/pills with answer text. Selected state highlighted with color. Thumb-friendly on mobile.
- Cultural background question uses a searchable dropdown — type-ahead with common cultural backgrounds pre-listed. User types to filter or selects from list.
- Likert scales ("Never / Rarely / Sometimes / Often / Always") rendered as the same tappable option cards. No special slider UI — consistent with the rest of the quiz.
- Always single-select — every question has exactly one answer. No multi-select questions. Questions should be worded to avoid needing multi-select.

### Quiz completion flow
- After the last answer: email capture screen. "Enter your email so we can save your results." Email is **required** to see results — maximizes email capture for the business.
- After email submission: brief processing screen (2-3 seconds) with warm message like "We're putting together your parenting blueprint..." and a subtle animation. Builds anticipation.
- Then redirect to the result page.

### Claude's Discretion
- Exact card dimensions, spacing, and typography
- Loading skeleton design during data fetches
- Error state handling (network failures, validation)
- Processing screen animation style
- Exact section names and grouping of questions within sections
- Searchable dropdown implementation details

</decisions>

<specifics>
## Specific Ideas

- The tone should feel like Sophia (the clinical expert behind the product) is personally guiding you through the quiz — warm, knowledgeable, non-judgmental.
- Auto-advance with back button mirrors the feel of swiping through Instagram stories — fluid forward movement with easy retreat.
- Email gate before results is a deliberate business decision — every quiz taker becomes a contact, even if they don't purchase.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 02-quiz-engine*
*Context gathered: 2026-02-24*
