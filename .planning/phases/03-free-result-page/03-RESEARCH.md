# Phase 3: Free Result Page - Research

**Researched:** 2026-02-24
**Status:** Ready for planning

---

## 1. What Phase 3 Must Deliver

Five requirements must all be true when Phase 3 is done:

| Req | Description |
|-----|-------------|
| RSLT-01 | Archetype name displayed prominently; 2-3 sentence teaser summary |
| RSLT-02 | Blurred or partial PDF preview pages so users see what they're paying for |
| RSLT-03 | Explanation of how user's upbringing shaped their archetype (transmission mechanism) |
| RSLT-04 | Teaser of partner dialogue prompts (plants sharing / couple interest) |
| RSLT-05 | Single clear CTA to purchase the full PDF guide at $14 |

Phase 3 stops at displaying this page. It does NOT include Stripe integration (Phase 4), actual PDF generation (Phase 5), or PDF design (Phase 6). The CTA button routes to a checkout URL that does not yet exist; it will be wired in Phase 4.

---

## 2. How Data Reaches the Result Page

### 2.1 The redirect from quiz completion

QuizShell.tsx (line 201) does:

```ts
router.push(`/result?session=${store.sessionId}`);
```

The result page URL will be `/result?session=<UUID>`. The session UUID is the `quiz_sessions.id` from Supabase.

Crucially, `store.reset()` is deliberately NOT called after completion (STATE.md decision `[02-04]`): the Zustand localStorage store (`quiz-session` key) still contains:
- `answers` — the full answer map
- `sessionId` — the quiz_sessions UUID
- `userId` — the Supabase anonymous auth UID
- `email` — the captured email

### 2.2 What the database row contains

The `quiz_sessions` table (migration `20260224000000_phase1_data_foundation.sql`) has:

```sql
archetype_id        TEXT   -- e.g. "steady-anchor" (scored at quiz completion)
cultural_background TEXT   -- e.g. "east-asian-collectivist"
dimension_scores    JSONB  -- { "emotional-warmth": 8.2, ... }
answers             JSONB  -- full answer map
email               TEXT
```

The row is written by `QuizShell.onQuizComplete()` before the redirect. By the time `/result` loads, the DB row is complete.

### 2.3 Two data fetch strategies — and which to use

**Option A: Read from Zustand localStorage (optimistic)**
- Pros: instant, no loading state, data is already computed, works offline.
- Cons: vulnerable to localStorage being cleared; sessionId may not match logged-in state after redirect; store state could be stale if user opens result page in a new tab.

**Option B: Fetch from Supabase on page load using `?session=` param**
- Pros: authoritative, works across tabs and after localStorage cleared, correct for future share-link use cases.
- Cons: needs loading state, requires the anonymous Supabase session to still be valid (same device, same browser).

**Recommended: Option B as primary, Zustand as optimistic cache.**
Fetch `quiz_sessions` row via `?session=` param using the browser Supabase client (RLS: `auth.uid() = user_id`). While fetching, show a skeleton using data from Zustand if available. This is robust and sets up correct patterns for Phase 4 (checkout) and later sharing.

### 2.4 Archetype data available in-app

`lib/archetypes/archetypes.ts` exports `ARCHETYPES` — an array of 9 `Archetype` objects. Each archetype has:

- `id` — kebab-case (e.g., `"steady-anchor"`)
- `name` — display name (e.g., `"The Steady Anchor"`)
- `tagline` — one-liner (e.g., `"Your calm is your children's foundation."`)
- `foundationalPatterns` — `{ headline, themes[], researchAnchor, citations[] }`
- `watchouts` — same shape as foundationalPatterns
- `culturalOverlays` — array of `CulturalOverlay` objects, one per cultural context

All 9 archetypes are fully populated with rich content. The `getResult()` function in `lib/quiz/scoring-matrix.ts` returns `{ primary: ArchetypeId, secondaries: [id, id, id] }`.

To look up an archetype for display:
```ts
import { ARCHETYPES } from '@/lib/archetypes/archetypes'
const archetype = ARCHETYPES.find(a => a.id === archetypeId)
```

### 2.5 Cultural overlay lookup

`lib/archetypes/cultural-overlays.ts` contains overlays keyed by archetype ID. The archetype object already embeds `culturalOverlays: CulturalOverlay[]`. Given the user's `cultural_background` value (e.g., `"east-asian-collectivist"`), find the matching overlay:

```ts
const overlay = archetype.culturalOverlays.find(
  o => o.culturalContext.toLowerCase().includes(culturalBackground)
)
```

The cultural overlay's `expressionModifier` field is the natural content for RSLT-03 (transmission mechanism) — it explains how the user's upbringing context shaped their archetype expression.

---

## 3. Routing and Page Architecture

### 3.1 Route

Create `app/result/page.tsx`. This is the Next.js App Router page.

The URL carries `?session=<UUID>`. Use `searchParams` (server component pattern) or `useSearchParams` (client component). Because the page needs client-side Supabase auth and animated reveal, the main page shell will be a client component.

Pattern consistent with quiz: `app/result/page.tsx` as a thin wrapper (metadata + Suspense) delegating to a `ResultShell` client component — the same pattern as `app/quiz/page.tsx`.

```
app/result/
  page.tsx            — metadata, Suspense wrapper
components/result/
  ResultShell.tsx     — client component; data fetch, loading states, layout orchestration
  ResultHero.tsx      — archetype reveal animation, name, tagline, teaser summary
  TransmissionSection.tsx  — RSLT-03: upbringing → archetype connection
  TeaserSection.tsx   — reusable teaser block (content + blur/lock overlay)
  PartnerTeaser.tsx   — RSLT-04: partner dialogue snippet
  CTABlock.tsx        — RSLT-05: purchase CTA (price, button, trust signal)
  StickyMobileCTA.tsx — mobile sticky bar at bottom of screen
  ResultSkeleton.tsx  — loading skeleton for data fetch
```

### 3.2 Page layout flow (from 03-CONTEXT.md)

```
[Result Hero]
  — archetype name (prominent, animated fade-in/card flip)
  — secondary blend mention ("with shades of The Nurturer")
  — custom illustration placeholder
  — 2-3 sentence teaser summary (RSLT-01)

[Early CTA block]  ← catch impulse buyers
  — "Unlock Your Complete Guide" button
  — $14 price displayed prominently nearby
  — credibility line: "Based on research from 100+ parenting experts"

[Transmission Section]  ← RSLT-03
  — How your upbringing shaped this result
  — Uses cultural overlay expressionModifier + archetype narrative coherence content

[Teaser Section: Foundational Patterns]  ← RSLT-02
  — First paragraph/theme visible
  — Rest blurred or faded with "Unlock full guide" overlay

[Teaser Section: Watchouts]  ← RSLT-02
  — Same partial reveal pattern

[Partner Dialogue Teaser]  ← RSLT-04
  — 2-3 line conversation snippet visible
  — Rest locked

[Final CTA block]  ← RSLT-05
  — Same CTA as early CTA
  — Sticky mobile CTA bar
```

---

## 4. Data Fetch Implementation Pattern

The result page is a client component (needs Supabase browser auth, animations). Pattern:

```ts
// ResultShell.tsx
"use client"

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ARCHETYPES } from '@/lib/archetypes/archetypes'
import { useQuizStore } from '@/stores/quizStore'

export function ResultShell() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session')
  const [session, setSession] = useState<QuizSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!sessionId) { setError(true); return }

    async function fetchSession() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('quiz_sessions')
        .select('archetype_id, cultural_background, dimension_scores')
        .eq('id', sessionId)
        .single()

      if (error || !data?.archetype_id) { setError(true); return }
      setSession(data)
      setLoading(false)
    }
    fetchSession()
  }, [sessionId])

  if (loading) return <ResultSkeleton />  // uses Zustand store for optimistic data if available
  if (error) return <ResultError />

  const archetype = ARCHETYPES.find(a => a.id === session.archetype_id)
  // ...render
}
```

The `useSearchParams` hook requires a Suspense boundary — same constraint as in quiz. Wrap in `<Suspense>` in `page.tsx`.

---

## 5. Animation: The Reveal

The context decision is "brief animated reveal (1-2 sec fade-in or card flip) when user lands on result page."

The project already uses Tailwind CSS + `tw-animate-css` (in `package.json` devDependencies and imported in `globals.css`). Custom keyframe animations are already defined in `globals.css` (`slide-in-right`, `slide-in-left`).

The reveal animation should be:
- A fade-in sequence: archetype name appears first, then illustration, then tagline, then teaser
- Implemented via CSS animation with staggered `animation-delay` on child elements
- OR a single fade-up animation on the hero card

Pattern consistent with existing code: add `@keyframes` and `@utility` in `globals.css`, apply via Tailwind class. No JS animation libraries needed.

For the card flip variant: CSS `perspective` + `rotateY` transform. More complex than fade-in; fade-in is safer for MVP since it works reliably across all mobile browsers.

---

## 6. Teaser / Blur Implementation (RSLT-02)

The "partial visible content → blur/fade → unlock overlay" pattern requires CSS only:

```tsx
<div className="relative">
  {/* Content: first theme visible, rest faded */}
  <div>
    <p>{archetype.foundationalPatterns.themes[0]}</p>
    <div className="relative">
      <p className="opacity-30 select-none">{archetype.foundationalPatterns.themes[1]}</p>
      <p className="opacity-15 select-none">{archetype.foundationalPatterns.themes[2]}</p>
      {/* Gradient overlay fading to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </div>
  </div>
  {/* Lock overlay */}
  <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
    <p className="text-stone-500 text-sm">Unlock in your full guide</p>
  </div>
</div>
```

Alternative: CSS `filter: blur(4px)` on locked content. The gradient fade approach is cleaner visually and avoids layout issues on mobile.

Each teaser section maps to a PDF chapter — this framing matters for copy: "In your full guide: Foundational Patterns" not just "more content."

---

## 7. Transmission Mechanism (RSLT-03)

This is the most distinctive and clinically valuable section. It answers: "why did my upbringing produce this archetype in me?"

Data sources available:
1. `archetype.foundationalPatterns.researchAnchor` — one sentence grounding the archetype in KOL research
2. `culturalOverlay.expressionModifier` — how this cultural context shapes the expression
3. `archetype.watchouts.researchAnchor` — the shadow pattern research anchor
4. Narrative coherence connection: the `narrative-coherence` dimension directly captures the intergenerational transmission quality (STATE.md: "Narrative Coherence dimension is primarily Past-lens-only")

For the free page, Claude's Discretion applies to depth:
- **Reveal for free**: the connection between upbringing context and this archetype's defining quality (1-2 sentences, uses researchAnchor)
- **Lock behind PDF**: the detailed reflection on the user's specific answers and how each shaped their pattern

Copy approach for this section:
```
"The way you were raised didn't just give you memories — it gave you a blueprint.
[Archetype-specific 1-2 sentence explanation of transmission mechanism, drawn from
foundationalPatterns.researchAnchor]. [If cultural background present: cultural overlay
expressionModifier adds context about how cultural context shaped this expression.]"
```

If no cultural background was provided (the question was opt-in): omit the cultural modifier sentence gracefully.

---

## 8. Partner Dialogue Teaser (RSLT-04)

The archetype `watchouts.themes` contains specific patterns about where this archetype may create friction in relationships. These are the raw material for the partner dialogue teaser.

Since actual partner dialogue prompts are PDF content (defined in Phase 5/PDF-09, PDF-10), Phase 3 creates a convincing fictional-but-authentic 2-3 line conversation snippet from the archetype's watchouts content. This is hardcoded per archetype as static content in Phase 3 — Phase 5 will generate the full personalized version.

Each archetype needs a short partner dialogue snippet. These are written once per archetype (9 snippets total), static, not personalized. The snippet shows:
- Partner says something that triggers the archetype's watchout pattern
- User's instinctive response (archetype-driven)
- What the full guide helps you say instead (teaser hook)

The third line is locked: "See the full conversation guide in your blueprint →"

---

## 9. CTA Design (RSLT-05)

From 03-CONTEXT.md decisions:
- Button copy: "Unlock Your Complete Guide"
- Price ($14) shown prominently NEAR the button, not ON it
- Two placements: after hero reveal + bottom of page after all teasers
- Sticky mobile CTA bar
- Credibility line: "Based on research from 100+ parenting experts"

The CTA button `href` in Phase 3 will be a placeholder (e.g., `href="/checkout?session=<sessionId>"`) since Stripe is Phase 4. This is acceptable — the visual is complete, the wiring comes in Phase 4.

The sticky mobile bar: `fixed bottom-0 left-0 right-0` with a compact layout. Use `safe-area-inset-bottom` for iPhone notch safety: `pb-[env(safe-area-inset-bottom)]`.

---

## 10. Error States and Edge Cases

The context assigns these to Claude's Discretion. Minimum viable error states:

1. **Missing `?session=` param** — show "We couldn't find your results. Try retaking the quiz." with a link to `/quiz`.
2. **Supabase fetch fails** — same message. Log the error server-side (console.error).
3. **`archetype_id` is null in DB** — shouldn't happen (scored before redirect), but: show retry message.
4. **No cultural background** — gracefully omit cultural overlay in the transmission section. Do not show an empty section.
5. **Archetype not found in ARCHETYPES** — shouldn't happen, but guard with: `if (!archetype) return <ResultError />`.

No skeleton shimmer is required for MVP. A simple `min-h-screen bg-amber-50` div with centered dots (same as ProcessingScreen) is sufficient as the loading state.

---

## 11. Illustration Placeholders (MVP)

Custom illustrations per archetype are flagged as Claude's Discretion for MVP. The placeholder strategy:

- A styled `div` with the archetype's color variant, the archetype initials or an icon from `lucide-react` (already in dependencies)
- Dimensions: roughly 120x120px, rounded, placed in the hero section above the archetype name
- Each archetype gets a distinct background color in the warm palette (amber/rose/sage/sky variants)
- These are designed as `<div>` components so swapping in real `<img>` later is a one-line change per archetype

---

## 12. Tech Constraints and Compatibility

### From existing project patterns:

- **Supabase browser client**: use `createClient()` from `lib/supabase/client.ts` — same as in QuizShell
- **Zustand store**: `useQuizStore` from `stores/quizStore.ts` — for optimistic data while fetching
- **Biome linter**: already configured at `biome.json`; no new lint config needed. Key rules: a11y on interactive elements, no unused imports
- **TypeScript**: strict mode, `@/` path alias configured
- **Tailwind v4**: class-based, no config file. Custom animations go in `globals.css` as `@keyframes` + `@utility` (established pattern from quiz)
- **Next.js App Router**: `useSearchParams` requires Suspense boundary — already established pattern in quiz page
- **`tw-animate-css`**: already imported in `globals.css`, provides additional animation utilities

### No new dependencies needed for Phase 3:
- All animation via Tailwind + custom CSS (established pattern)
- No image library (placeholder illustration via CSS/div)
- No external blur library (CSS `backdrop-filter` or gradient fade)
- Lucide React already available for icons

---

## 13. Secondary Archetype Display

`getResult()` returns `{ primary, secondaries: [id, id, id] }`. The Zustand store does NOT currently store secondary archetypes — only `archetype_id` (primary) is persisted to the DB in `quiz_sessions`.

For Phase 3, two options:
- **Option A**: Fetch only primary from DB, recompute secondaries client-side from `dimension_scores` JSONB using `getResult()`
- **Option B**: Display only primary, mention secondary blend as a single name (first of the three secondaries)

The context decision says: "Show primary archetype prominently with a subtle mention of the secondary blend (e.g., 'with shades of The Nurturer')".

The `dimension_scores` JSONB is stored in the DB row. Fetch it, run `getResult()` client-side to get the full ranking, use `secondaries[0]` as the blend mention. This avoids adding a new DB column.

---

## 14. What Phase 3 Does NOT Build

Phase 3 explicitly stops before:
- Stripe Checkout session creation or redirect (Phase 4)
- Email delivery (Phase 4)
- Actual PDF generation or personalization (Phase 5)
- PDF visual design template (Phase 6)
- The CTA button will link to a placeholder checkout URL

---

## 15. Suggested Plan Breakdown

Research suggests Phase 3 can be delivered in 3 plans:

**Plan 03-01: ResultShell + data fetch + hero reveal**
- `app/result/page.tsx` (thin wrapper with Suspense + metadata)
- `components/result/ResultShell.tsx` (data fetch, error states, orchestration)
- `components/result/ResultHero.tsx` (archetype name, tagline, illustration placeholder, fade-in animation, secondary blend mention)
- `components/result/ResultSkeleton.tsx` (loading state)
- Success criteria: navigating to `/result?session=<id>` shows archetype name and tagline with animation

**Plan 03-02: Teaser sections + transmission mechanism**
- `components/result/TransmissionSection.tsx` (RSLT-03: upbringing connection using researchAnchor + cultural overlay)
- `components/result/TeaserSection.tsx` (reusable: partial content + blur/gradient + lock overlay)
- `components/result/PartnerTeaser.tsx` (RSLT-04: static snippet per archetype, locked rest)
- Hardcode partner dialogue snippets for all 9 archetypes
- Success criteria: transmission section reads naturally; teaser sections show first item and blur rest

**Plan 03-03: CTA blocks + sticky mobile + final polish**
- `components/result/CTABlock.tsx` (price, button copy, credibility line)
- `components/result/StickyMobileCTA.tsx` (fixed mobile bar with safe-area padding)
- Wire both CTA placements: after hero and bottom of page
- Final pass: continuous scroll, warm color palette, spacing, mobile responsiveness
- Success criteria: all 5 requirements (RSLT-01 through RSLT-05) verified; sticky bar visible on mobile; CTA links to placeholder checkout URL

---

*Phase: 03-free-result-page*
*Research completed: 2026-02-24*
