# Phase 2.5: Archetype Content Rewrite — Research

**Researched:** 2026-02-25
**Phase:** 025-archetype-content-rewrite
**Requirements addressed:** COPY-01, COPY-02, COPY-03, COPY-04

---

## 1. What this phase is actually doing

The product pivoted: The Mirror shows users the parenting they *received*, not the parenting they *do*. The quiz questions are already written in past-tense / received-framing and do not need to change. But all the archetype content — taglines, foundational patterns, watchouts, cultural overlays, research anchors — is currently written with "you as the active parent" as the subject. This phase rewrites every piece of that content so the subject is "the person who was raised this way."

The pivot is summarised in CONTEXT.md: `"You" = the adult child who received the parenting, NOT the user as a parent.`

---

## 2. The files that need to change

### Primary rewrite targets

**`/lib/archetypes/archetypes.ts`** (944 lines)
- 9 archetype objects, each with:
  - `tagline` — one-liner, currently framed as "you as parent" (e.g., `'Your calm is your children's foundation.'`)
  - `foundationalPatterns.headline` — framed as parent behaviour (e.g., `'Your calm, consistent presence gives your children a deep sense of safety...'`)
  - `foundationalPatterns.themes` — 5 bullet strings per archetype, all framed around parent actions toward children
  - `foundationalPatterns.researchAnchor` — 1-2 sentences linking to KOL framework, currently framed as "parents who..."
  - `watchouts.headline` — framed as parent behaviour under stress
  - `watchouts.themes` — 5 bullet strings per archetype, framed as parent stress responses
  - `watchouts.researchAnchor` — similar issue
  - Citations: **do not touch** — researcher/workTitle/year/relevanceNote stay exactly as-is

**`/lib/archetypes/cultural-overlays.ts`** (795 lines)
- 45 overlay objects (9 archetypes × 5 cultures), each with:
  - `expressionModifier` — currently framed around the parent expressing a style (e.g., `'The Steady Anchor's calm and structure are tested by...'`)
  - `strengthsInContext` — bullets currently describe what the parent does (e.g., `'Behavioral reliability and predictability are deeply culturally valued...'`)
  - `tensionsInContext` — bullets framed as parent struggles

### Secondary / partial audit targets

**`/components/landing/ArchetypePreview.tsx`**
- Line 28: `"Which of the 9 parenting archetypes shaped you?"` — already correct parents-lens framing
- Line 30: copy about "parenting you received" — already correct
- Line 85 CTA: `"Find your archetype — it's free"` — neutral, no rewrite needed
- The archetype name cloud (lines 4-14) uses the 9 names — names are staying as-is per CONTEXT.md

**`/app/quiz/page.tsx`**
- Line 7: `title: "Take the Quiz | Your Parenting Blueprint"` — "Parenting Blueprint" is ambiguous; could read as the user's own parenting. May want to align with "The Mirror" brand. Low priority but worth flagging.
- Line 9: `description: "Answer 21 reflective questions to uncover the parenting patterns you inherited."` — already correct framing, no change needed.

**`/app/result/page.tsx`**
- Line 30: `"your parenting archetype breakdown"` — this page is a placeholder; Phase 3 builds the real result page. Not a rewrite target for this phase, but the placeholder text has wrong framing. Can update the description string here since it's a stub.

**`/app/layout.tsx`**
- Line 34: OG alt text: `"The Mirror — Discover Your Parenting Archetype"` — "your parenting archetype" is slightly ambiguous but acceptable; the word "discover" implies receiving not doing. No critical rewrite needed.

**Quiz components — confirmed no rewrites needed**
- `QuizShell.tsx`: Intro screen (`"You'll reflect on 21 moments from your childhood"`) and closing screen (`"Your answers paint a meaningful picture"`) are already correct.
- `ProcessingScreen.tsx`: `"We're putting together your archetype profile"` — neutral, fine.
- `EmailCaptureScreen.tsx`: `"Your reflection is complete"` — correct.
- `QuizSectionHeader.tsx`: Sections are `'About You'`, `'Your Upbringing'`, `"Your Parents' Patterns"`, `'Your Background'` — all already correct past/received framing.

**`/lib/quiz/questions.ts`** — confirmed no rewrites needed
- All question text is past-lens ("When you were little...", "Growing up...", "As a child...") — already correct.
- One `whyWeAskThis` text on line 574 reads: "Whether or not you experienced this growing up often shapes how naturally or awkwardly it feels for you as a parent now." — this is contextual bridging copy (not archetype content) that mentions "as a parent now." Per CONTEXT.md scope, quiz text is out of scope unless it references "your parenting style." This sentence is borderline but is a helper text explaining the repair question's relevance — it bridges past to present which is exactly the product's value proposition. No change needed.

---

## 3. The full scope of rewrites — archetype by archetype

### What "wrong framing" looks like now

All 9 taglines are written as if the USER IS the parent type:
- `'Your calm is your children's foundation.'` (Steady Anchor)
- `'Your love shows up as an unshakeable wall of safety.'` (Fierce Guardian)
- `'Where your children come to be truly seen.'` (Gentle Nurturer)
- `'You parent with purpose, not just instinct.'` (Intentional Guide)
- `'You've rewritten your story — and theirs.'` (Resilient Striver)
- `'You raise capable people by expecting great things.'` (Structured Mentor)
- `'You show up fully — and keep growing as you go.'` (Open-Hearted Learner)
- `'You pour everything into helping them become their best.'` (Devoted Champion)
- `'You parent with your children, not just for them.'` (Collaborative Ally)

All `foundationalPatterns.headline` values use constructions like "Your calm, consistent presence gives your children..." — the subject is the user doing parenting.

All `watchouts.headline` values use "when stressed, you might find yourself..." — framed as the user's current parenting behaviour under stress.

All `researchAnchor` values in both sections use "Rooted in Baumrind's authoritative parenting framework..." and "Drawing from Gottman's research on emotion dismissing as a parenting pattern..." — framed as describing what active parents do.

All 45 `expressionModifier` entries in `cultural-overlays.ts` say things like "The Steady Anchor's calm and structure are tested by..." — written as if the Steady Anchor is the user currently parenting in that cultural context.

All `strengthsInContext` and `tensionsInContext` bullets say things like "The archetype's characteristics are well-supported..." or "The archetype's low autonomy support may be more explicitly challenged..." — framed as describing an active parenting style.

### What "correct framing" looks like — from CONTEXT.md

- Taglines: `"You grew up anchored."` / `"You grew up protected."` / `"You grew up held."`
- Foundational patterns: shift to what the USER RECEIVED — "patterns your parents passed to you" (inherited lens)
- Watchouts: "what you may have absorbed" — past origin + present echo. The headline pattern from CONTEXT.md: `"Growing up with this kind of [quality], you may have absorbed a quiet rule: [internalized belief]. That served you then. It may not serve you now."`
- Research anchors: update to `"Research on attachment shows that children raised with..."` instead of `"Research shows that parents who..."`
- Cultural overlay `expressionModifier`: keep factual/observational but frame around what the child received
- Cultural overlay `strengthsInContext`: shift to receiver perspective — "what this gave you" (e.g., `"The behavioral reliability you grew up with aligned with group harmony — giving you a deep sense of belonging"`)
- Cultural overlay `tensionsInContext`: shift to receiver perspective — "what this may have cost you"
- Introduce archetype on result page framing (noted in CONTEXT.md, not in a file yet): `"You were raised by: [Name]"` — this is for Phase 3, not this phase

### What STAYS exactly as-is

- All 9 archetype names (`The Steady Anchor`, etc.)
- All dimension profiles (scoring numbers)
- All citation objects: researcher, workTitle, year, relevanceNote — DO NOT TOUCH
- All quiz questions and options
- All section titles
- The ArchetypePreview landing component (already correct framing)

---

## 4. Volume and complexity estimate

| Section | Count | Effort per item | Notes |
|---------|-------|-----------------|-------|
| Taglines | 9 | Low | Short, pattern is clear: "You grew up [adjective]." |
| foundationalPatterns.headline | 9 | Medium | Need to reframe from parent doing → child receiving |
| foundationalPatterns.themes | 9 × 5 = 45 | Medium-High | Full prose rewrites, maintain warmth |
| foundationalPatterns.researchAnchor | 9 | Medium | Change "parents who" → "children raised with" |
| watchouts.headline | 9 | Medium | New pattern: "Growing up with this kind of [quality]..." |
| watchouts.themes | 9 × 5 = 45 | Medium-High | Past origin + present echo structure per CONTEXT.md |
| watchouts.researchAnchor | 9 | Medium | Same shift as foundational researchAnchors |
| expressionModifier | 45 | Medium | Observational/factual tone stays, subject shifts to what child received |
| strengthsInContext | 45 (avg 2-3 bullets each) | Medium | "What this gave you" framing |
| tensionsInContext | 45 (avg 2-3 bullets each) | Medium | "What this may have cost you" framing |

**Total content items to rewrite: ~260+ individual strings**
Both `archetypes.ts` (~944 lines) and `cultural-overlays.ts` (~795 lines) will be substantially rewritten in place. The TypeScript structure, exports, imports, validation functions, and dimension profiles do not change at all — only the string values inside the content fields.

---

## 5. Key decisions that constrain implementation

From CONTEXT.md `<decisions>`:

**Voice and addressee**
- "You" = the adult child who received the parenting
- Call caregivers "the people who raised you" — inclusive, avoids assuming two-parent or biological family
- Primary tense: past — "you grew up with...", "the home you knew had..."

**Tagline pattern**
- MUST use "You grew up [adjective]." construction
- The specific adjective for each archetype is Claude's discretion

**Watchout structure (two-part pattern)**
- Part 1 (past): "You may have learned that..." + "Many people raised this way find..."
- Part 2 (present echo): connect to how it shows up today
- Headline pattern: "Growing up with this kind of [quality], you may have absorbed a quiet rule: [internalized belief]. That served you then. It may not serve you now."
- Normalizing language: "many people raised this way find..." not "you probably do..."
- No parent blame — focus on what the user ABSORBED, not what parents did

**Research anchors**
- Framing: "Research on attachment shows that children raised with..." (not "Research shows that parents who...")

**Cultural overlays**
- `expressionModifier`: keep factual/observational (not personal second-person)
- `strengthsInContext`: "what this gave you" — receiver perspective
- `tensionsInContext`: "what this may have cost you" — receiver perspective
- Gently acknowledge where cultural norms reinforced patterns ("In this context, this pattern was often reinforced by the community around you") — but per-overlay judgment on where this adds value vs risks offense

**What Claude decides (discretion)**
- Exact wording of each tagline (within the "you grew up..." pattern)
- Per-watchout judgment on how much present-day connection to draw
- Per-cultural-overlay judgment on "norms reinforced this" language

**Tone reference**
- "Warm expert friend" — Emily Oster reference from Phase 0 carries forward
- Recurring closer for watchout themes: "That served you then. It may not serve you now."

---

## 6. Code structure — what stays, what changes

The TypeScript types in `/lib/archetypes/types.ts` do NOT change. No new fields, no field renames, no interface changes. All content that needs to change is stored in string-valued fields that already exist:
- `Archetype.tagline: string`
- `ArchetypeContent.headline: string`
- `ArchetypeContent.themes: string[]`
- `ArchetypeContent.researchAnchor: string`
- `CulturalOverlay.expressionModifier: string`
- `CulturalOverlay.strengthsInContext: string[]`
- `CulturalOverlay.tensionsInContext: string[]`

The `Citation` interface fields (researcher, workTitle, year, relevanceNote) are in scope of the type but the VALUES are not touched.

The file comments in `archetypes.ts` (lines 11-17) reference "current parenting style" — these code comments should be updated to reflect the new framing when rewriting.

Similarly, the JSDoc in `types.ts` at line 19 says `"Names reference the current parenting style, not childhood origin"` and line 151 says `"referencing the current parenting style"` and lines 178-179 mention `"tendencies of this parenting style"` — these comments are technically incorrect post-pivot but changing them is low priority (they don't affect runtime or tests).

---

## 7. Downstream impact — what this phase enables

**Phase 3 (Mirror Result Page)** directly consumes this rewritten content:
- `RSLT-01`: displays parents' archetype name with full summary — this is `foundationalPatterns` content
- `RSLT-07`: full foundational patterns section — these are the rewritten themes
- `RSLT-08`: full watchouts section — rewritten watchout themes
- `RSLT-09`: cultural overlay section — rewritten overlay content
- The result page intro framing `"You were raised by: [Name]"` is CONTEXT.md spec, not in any current file

**Phase 3 can't be built correctly until this phase is complete** — the result page would display parent-framed content on a page designed to reveal parents' archetype.

---

## 8. Testing / success verification

No unit tests exist for archetype content strings (content is not algorithmically tested). Verification is a manual read-through:

1. **COPY-01 check**: For each of the 9 archetypes, read the tagline — does it describe the parenting the user *received*? Tagline should pass: "This describes how I grew up, not how I currently parent."
2. **COPY-02 check**: For each archetype, read all 5 `foundationalPatterns.themes` bullets — do they read as "patterns your parents passed to you"? No bullet should have the user as active parent subject.
3. **COPY-03 check**: For each archetype, read all 5 `watchouts.themes` bullets — do they read as what the user absorbed/may have internalized? Two-part structure (past origin + present echo) present for each?
4. **COPY-04 check**: For each of the 45 cultural overlays — do `strengthsInContext` bullets frame as "what this gave you"? Do `tensionsInContext` bullets frame as "what this may have cost you"?
5. Final audit: search `archetypes.ts` and `cultural-overlays.ts` for patterns `your children`, `you parent`, `as a parent`, `you raise`, `you give your children` — any remaining hits indicate incomplete rewrite.

---

## 9. Risk and edge cases

**The Resilient Striver is the most complex archetype to rewrite.** Its entire identity is built around the idea of the parent having done the work to break cycles (`'You've rewritten your story — and theirs.'`). Under the parents-lens, this archetype means: "the people who raised you had done healing work from their own difficult past." The earned-security narrative still holds, but the framing shifts entirely. The watchout about "identity fusion with the healing narrative" becomes: "You may have grown up aware of your parents' healing journey in ways that put some of the weight of that story on you." This requires the most creative rewriting.

**The cultural overlays that already use second-person** (a few entries use "the parent" or "the Gentle Nurturer parent" as subject) need their perspective shifted, but the observational/factual register must be maintained — CONTEXT.md says `expressionModifier` stays factual, not personal second-person. So the rewrite must thread between "informational about what this context was like for the child" and "not too clinically distant."

**The `whyWeAskThis` copy in `questions.ts` (line 574)** that says "it often shapes how naturally or awkwardly it feels for you as a parent now" is technically out of scope per CONTEXT.md (quiz text is not a rewrite target). But this sentence bridges past to present in exactly the way the product intends, so leaving it as-is is correct.

**The OG image alt text** in `app/layout.tsx` says "Discover Your Parenting Archetype" — this is ambiguous but not wrong enough to require a blocking change. It can be noted as a quality item: `"Discover the Parenting That Shaped You"` would be more accurate, but this is not part of COPY-01 through COPY-04 scope.

**The quiz page `<title>` tag** (`"Take the Quiz | Your Parenting Blueprint"`) has "Your Parenting Blueprint" which sounds like the paid Product 2. It should probably read "The Mirror" for brand clarity. Also not in COPY-01–04 scope, but worth a quick fix in the same session.

---

## 10. Implementation plan (recommended structure for planning)

Given the volume (~260 string rewrites across two large files), planning should structure this as two plans:

**Plan 025-01: Rewrite `archetypes.ts`**
- 9 taglines
- 9 × foundationalPatterns (headline + 5 themes + researchAnchor)
- 9 × watchouts (headline + 5 themes + researchAnchor)
- Update file-level comments (lines 11-17)
- Success: no remaining "you parent / your children / as a parent" present-tense parent framing in content strings

**Plan 025-02: Rewrite `cultural-overlays.ts`**
- 45 × expressionModifier
- 45 × strengthsInContext (avg ~2-3 bullets each = ~100+ bullets)
- 45 × tensionsInContext (avg ~2-3 bullets each = ~100+ bullets)
- Update file-level comments
- Success: all 45 overlays read from receiver perspective

Both plans can in principle be written in one pass since Claude writes in large batches, but the volume likely means two separate plans is the right pacing.

---

*Phase: 025-archetype-content-rewrite*
*Research completed: 2026-02-25*
