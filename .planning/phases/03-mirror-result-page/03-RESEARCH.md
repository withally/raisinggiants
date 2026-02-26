# Phase 3: Mirror Result Page — Research

**Researched:** 2026-02-26
**Status:** Ready for planning

---

## What This Phase Builds

A complete result page at `/result?session={uuid}`. After the quiz, the user is redirected here with only a session ID in the URL. All content is hidden behind an email-gate overlay. On email submit, the overlay lifts (curtain transition) and the full, free result is revealed. No paywall. No blurred content.

---

## 1. Data Architecture

### How data flows into the result page

The quiz engine (QuizShell.tsx) already handles all scoring and DB writes before redirecting. By the time the user lands on `/result`, the `quiz_sessions` row is fully populated:

```
quiz_sessions row:
  id                  — UUID in URL param (?session=...)
  archetype_id        — "steady-anchor" | "fierce-guardian" | etc.
  cultural_background — "east-asian" | "south-asian" | "latin-american" | "sub-saharan" | "western" | "other" | null
  email               — already captured at quiz EmailCaptureScreen step
  status              — "completed"
  answers             — JSONB (raw answers, not needed for result display)
  dimension_scores    — JSONB (not needed for result display)
```

**Important**: Email was already captured at the quiz `EmailCaptureScreen` step (end of quiz, before processing screen). The quiz store writes email to Supabase at `onQuizComplete()`. The result page email gate is a SECOND, DIFFERENT email capture — it functions as a page-level gate to reveal content. The user's email is already in the DB; the gate collects it again (or re-confirms it) before showing the result.

**Alternative interpretation**: The email in quiz_sessions IS the same email. The gate on the result page is UX-only — it serves the psychological purpose of making the user "unlock" their result. The email submitted at the gate should match (or update) the one already stored. The gate does not re-run scoring — it only gates the UI reveal.

**Decision needed in planning**: Does the gate do a DB write at all, or is it purely UI-driven? The most pragmatic approach: gate is purely client-side (check if email submitted, then reveal). The email was already captured. The gate is emotional/UX ritual.

### Reading the session data

The result page receives `?session={uuid}` as a search param. The page must:

1. Fetch the `quiz_sessions` row by ID from Supabase
2. Look up the `Archetype` object from `ARCHETYPES` array using `archetype_id`
3. Look up the matching `CulturalOverlay` from the archetype's `culturalOverlays` array using `cultural_background`

The result page is a **Server Component** (current `app/result/page.tsx` is already `async`). Supabase fetch should use `createAdminClient()` (service_role) since the session was created by an anonymous user whose JWT may have expired after the quiz → redirect sequence.

**RLS concern**: The anonymous user's Supabase session (JWT) may not be available on the result page. The URL only contains the session UUID; there is no auth cookie persisted to the result page. Using `createAdminClient()` with service_role bypasses RLS and reads by session ID directly. This is correct — the session UUID is the access credential (security by obscurity: UUID is unguessable).

### Cultural background option IDs → culturalContext label mapping

The quiz stores option IDs. The `CulturalOverlay.culturalContext` field uses the full label string. Need a lookup map:

```
"east-asian"     → "East Asian collectivist (Chinese, Korean, Japanese)"
"south-asian"    → "South Asian joint-family (Indian, Pakistani, Bangladeshi)"
"latin-american" → "Latin American familismo (Mexican, Colombian, Brazilian)"
"sub-saharan"    → "Sub-Saharan African community-centred (Nigerian, Kenyan, Ghanaian)"
"western"        → "Western individualist (baseline)"
"other"          → null (skip cultural section)
null             → null (skip cultural section — user skipped the question)
```

The `culturalContext` strings in `cultural-overlays.ts` use `CTX_EAST_ASIAN`, `CTX_SOUTH_ASIAN`, etc. constants. The lookup can match by `culturalOverlay.culturalContext.startsWith("East Asian")` or by defining a mapping constant.

### Section header display name for cultural section

Context decision: section header names the specific culture selected: "The East Asian Lens", "The Latino/Hispanic Lens", etc. Need a human-readable display name per option ID:

```
"east-asian"     → "The East Asian Lens"
"south-asian"    → "The South Asian Lens"
"latin-american" → "The Latino/Hispanic Lens"
"sub-saharan"    → "The Sub-Saharan African Lens"
"western"        → "The Western Lens"
```

---

## 2. Page Architecture

### Routing and rendering strategy

`app/result/page.tsx` is an async Server Component. This is the right approach:
- Fetches session data server-side (no loading flash)
- Renders full page HTML with archetype content (no client-side data fetch waterfall)
- Email gate is a **Client Component overlay** layered on top of already-rendered content

The email gate must be a `"use client"` component that:
- Renders as a fixed overlay covering the full page
- Hides when the user submits a valid email
- Transition: fade-out overlay + content blur-removal simultaneously

### Component decomposition

```
app/result/page.tsx                      — Server Component (async)
  ↓ fetches session from Supabase
  ↓ looks up Archetype from ARCHETYPES
  ↓ looks up CulturalOverlay
  ↓ passes all data as props to:

components/result/ResultPageClient.tsx   — "use client" root for gate state
  EmailGateOverlay.tsx                   — fixed overlay, fades on email submit
  ResultReveal.tsx                       — the full result content
    ArchetypeReveal.tsx                  — "You were raised by:" hero section
    FoundationalPatternsSection.tsx      — patterns section
    WatchoutsSection.tsx                 — watchouts section
    BlueprintCTA.tsx                     — inline Blueprint coming-soon CTA
    CulturalSection.tsx                  — cultural lens section (conditional)
  StickyBlueprintBar.tsx                 — sticky bottom/floating CTA (always visible)
```

**Blurred overlay approach**: The actual result content is rendered in the DOM (server-rendered HTML). A fixed overlay sits on top. When the overlay is dismissed, content transitions from blurred/dimmed to clear. This means:
- Content is in the DOM but visually hidden — not ideal for SEO but acceptable for a gated personal result
- Use `filter: blur(8px)` + `pointer-events: none` on the result content when gate is active
- On gate dismiss: animate overlay opacity to 0, simultaneously animate blur to 0

### Email gate state management

Gate state is purely local React state in `ResultPageClient.tsx`. No Zustand, no Supabase write needed from the gate itself. The quiz already captured and persisted the email.

```typescript
const [gateOpen, setGateOpen] = useState(true);
// On email submit: setGateOpen(false) → triggers transition
```

The gate overlay copy: "Your result is ready" with value-driven sub-copy emphasizing the personalized report. Email form with validation (zod + react-hook-form, matching the quiz EmailCaptureScreen pattern already in the codebase).

---

## 3. Section-by-Section Content Mapping

### Section 1: Archetype Reveal (hero moment)

Data: `archetype.name`, `archetype.tagline`, `archetype.foundationalPatterns.headline`

Layout:
- Eyebrow: "You were raised by:"
- Big display: `archetype.name` (e.g., "The Steady Anchor")
- Tagline: `archetype.tagline` (e.g., "You grew up anchored.")
- Lead summary: `archetype.foundationalPatterns.headline` (the one-sentence framing)

This is the dramatic single reveal. Archetype name should be the largest text on the page, Cormorant Garamond display font, prominent.

### Section 2: Foundational Patterns

Data: `archetype.foundationalPatterns`
- `headline` — section anchor sentence
- `themes[]` — 5 bullet-form patterns (rendered as rich list items, not plain bullets)
- `researchAnchor` — research attribution line
- `citations[]` — rendered at bottom of section (inline footnote style or collapsible)

All 5 patterns displayed in full. Nothing gated. This is RSLT-07 compliance.

### Section 3: Watchouts

Data: `archetype.watchouts`
- `headline` — section anchor (includes "That served you then. It may not serve you now.")
- `themes[]` — 5 watchout items
- `researchAnchor` — research attribution
- `citations[]` — at bottom of section

All 5 watchouts displayed. Nothing blurred. RSLT-08 compliance.

### Section 4: Blueprint CTA (inline)

No dynamic data needed. Static content promoting The Blueprint (Product 2) as "coming soon."

Decision: CTA includes email capture for launch notification ("Notify me when The Blueprint launches"). This is a separate email capture from the gate. Stores to a separate list or the same Supabase table with a `blueprint_interest` flag. This is RSLT-05 and RSLT-10 compliance.

**Product 2 coming-soon page (RSLT-10)**: The CTA should link to `/blueprint` (a simple coming-soon page that can be built as part of this phase or deferred). The planning decision "Product 2 coming-soon page accessible from CTA" suggests a dedicated route. This can be a minimal Server Component page.

CTA concrete messaging (per context decision): name what Product 2 delivers — "personalized action plan, partner dynamics guide, healing exercises."

### Section 5: Cultural Lens (conditional)

Data: `culturalOverlay` (or `null` if no cultural background / "other")

Conditional: if `culturalOverlay === null`, skip this section entirely. Page ends after Blueprint CTA.

If present:
- Section header: e.g., "The East Asian Lens"
- `expressionModifier` — narrative intro paragraph (factual/observational tone)
- "What this gave you" — `strengthsInContext[]` as bulleted list
- "What this may have cost you" — `tensionsInContext[]` as bulleted list

This is RSLT-03 and RSLT-09 compliance.

---

## 4. Email Gate Design

### Overlay behavior

The page loads with full content rendered in the DOM but visually blurred/hidden. The gate overlay covers everything.

Overlay state: `position: fixed; inset: 0; z-index: 50`
Content blur state (when gate open): `filter: blur(12px); transition: filter 0.6s ease`
Content blur state (when gate closed): `filter: blur(0)`

On email submit:
1. Validate email (zod)
2. `setGateOpen(false)`
3. CSS transition removes blur, overlay fades out simultaneously
4. "Curtain lifting" effect — the reveal IS the emotional moment

Gate copy: "Your result is ready" as headline. Sub-copy: "We've prepared a personalized report about the parenting you received. Enter your email to reveal it."

Email field + submit button. Privacy note below (matching quiz pattern).

### Hydration concern

The result page is a Server Component. The gate Client Component will need to handle the hydration moment correctly. The `rendering-hydration-no-flicker` skill rule is relevant: gate should start as `open` (content blurred) on first render to avoid flash of unblurred content.

Use `const [gateOpen, setGateOpen] = useState(true)` — server renders with gate open. No `useEffect` needed to set initial state, since `true` is the correct initial value for SSR.

---

## 5. Sticky Blueprint CTA

A secondary CTA element visible while scrolling through the result. Context decision delegates style to Claude's discretion. Options:

**Option A: Sticky bottom bar** — `position: fixed; bottom: 0; left: 0; right: 0` — a thin bar with "The Blueprint is coming — get notified" and an email input or link to `/blueprint`. Appears after the user scrolls past the hero reveal (scroll threshold).

**Option B: Floating button** — `position: fixed; bottom: 24px; right: 24px` — a pill button "Notify me about The Blueprint" that opens a modal or scrolls to the inline CTA section.

Both approaches are viable. The sticky bar is more prominent and better for conversion. The floating button is less intrusive. Given the page is a long-form deep read, the sticky bar is recommended — it stays visible without disrupting reading.

**Implementation consideration**: Sticky element should only appear after the user scrolls past the hero (IntersectionObserver on the hero section, or a `useEffect` scroll listener). This prevents the sticky bar from competing with the email gate.

**z-index management**: Email gate overlay = z-50. Sticky CTA = z-40. Result content = z-0. This ordering ensures the gate covers everything including the sticky bar when the gate is open.

---

## 6. URL and State Recovery

### Session ID is the only state

The result page receives `?session={uuid}`. This is a stable, shareable URL. If a user bookmarks or shares it, they land directly on the gate (still gated). This is correct behavior — the gate protects the result, not the URL.

### localStorage state

Context decision: `store.reset()` is NOT called after quiz completion (decision [02-04]). This means `quizStore` state (sessionId, answers, etc.) is still available in localStorage on the result page. The result page does NOT need to read from localStorage — it fetches from Supabase using the URL's session ID. localStorage is kept intact in case Phase 3+ needs it, but the result page should not depend on it.

### No session ID in URL

If a user navigates directly to `/result` without a session param, the server fetch will fail (no session to look up). Handle gracefully: show an error state directing the user to take the quiz.

---

## 7. Blueprint Coming-Soon Page (RSLT-10)

The requirement says "Product 2 coming-soon page accessible from CTA." This implies a dedicated route: `/blueprint`.

Minimal scope for this phase:
- A simple Server Component page at `app/blueprint/page.tsx`
- Coming-soon messaging about The Blueprint (what it will deliver)
- Email capture form for launch notification
- Link back to the result page or home

Email capture on `/blueprint` needs a Supabase destination. Options:
1. Store in `quiz_sessions` with a `blueprint_interest` boolean column (requires schema migration)
2. Store in a separate `blueprint_signups` table (requires new table)
3. Store in the existing `quiz_sessions.email` — already has the email, just need a flag

**Simplest path**: Add a `blueprint_interest` boolean column to `quiz_sessions` (nullable, default false). When a user submits the Blueprint notification form, update their session row. This avoids a new table. However: if a user signs up for Blueprint notification without having a session (direct `/blueprint` navigation), there's no row to update.

**Alternative**: A standalone `blueprint_interest_emails` table (`id UUID, email TEXT, created_at TIMESTAMPTZ`). No FK dependency. Works for users with and without sessions.

The planning decision can be made during the plan phase. For research purposes: both approaches are technically straightforward.

---

## 8. Technical Constraints and Patterns to Follow

### Existing patterns to match

**Supabase client**: Server reads use `createAdminClient()` (service_role) from `lib/supabase/server.ts`. This is established in Phase 1 for server-side operations.

**Font system**: Display font = Cormorant Garamond via `--font-display` CSS variable (loaded in `app/layout.tsx`). Apply via `style={{ fontFamily: "var(--font-display)" }}` inline prop — NOT Tailwind `font-display` class. This is established decision [04-02-C].

**Color palette**: `bg-amber-50` base, `text-stone-900` primary text, `text-stone-600` secondary, `text-amber-600/700` accent. Alternating section backgrounds: `bg-amber-50` / `bg-white` / `bg-stone-50`. This is the editorial warmth palette from Phase 4 landing page.

**Animations**: Global CSS keyframes defined in `globals.css`. New animations (gate fade, content unblur) can be added as `@keyframes` + `@utility` entries there. Existing: `animate-fade-up`, `animate-slide-in-right`, `animate-slide-in-left`.

**Form pattern**: `react-hook-form` + `zod` + `@hookform/resolvers`. Email validation already established in `EmailCaptureScreen.tsx`. Replicate the same pattern.

**Component style**: Named exports (`export function ComponentName`), not default exports for result components. Consistent with landing page components pattern [04-01-C].

### Performance patterns (from vercel-react-best-practices skill)

- **Server Component data fetch**: result page is async Server Component — fetch session and archetype data in parallel where possible (`Promise.all`)
- **Client Component boundary**: gate + sticky CTA are the only interactive elements — everything else stays Server Component rendered
- **Bundle size**: No heavy third-party libraries needed. lucide-react is already in the bundle for icons
- **`bundle-dynamic-imports`**: Sticky CTA could be dynamically imported if it becomes large
- **`rendering-hydration-no-flicker`**: Gate `useState(true)` ensures no flash of unblurred content

### Accessibility (from ui-ux-pro-max skill)

- Email gate form: `<label>` with `for` attribute, `aria-describedby` for errors
- Focus trap inside the gate modal while gate is open (standard a11y for modal overlays)
- `prefers-reduced-motion`: animate-gate transitions should be skipped or reduced
- Color contrast: stone-900 on amber-50 ≥ 4.5:1 (passes)
- Gate overlay: `role="dialog"` `aria-modal="true"` `aria-label="Reveal your result"`

---

## 9. Key Open Questions for Planning

1. **Email gate DB write**: Does the gate overlay perform any Supabase write when the user submits their email? Or is it purely UI-gated (email already in DB from quiz completion)? Simplest answer: purely UI gate. Email is already in DB.

2. **Blueprint notification email storage**: New `blueprint_interest_emails` table or a flag on `quiz_sessions`? The plan will need to decide and may need a migration.

3. **`/blueprint` coming-soon page scope**: Is this a full page with its own design, or a minimal holding page? Likely minimal for this phase — enough to satisfy RSLT-10.

4. **Session fetch auth pattern**: Confirm service_role fetch (bypasses RLS) is correct for reading `quiz_sessions` on the result page, given the anonymous user's JWT may be expired. The session UUID in the URL serves as the access credential.

5. **`blueprint_interest` API route**: The Blueprint CTA email capture needs a server action or API route to persist the email. This is a new endpoint not previously defined. Likely a Next.js Server Action (simplest pattern in App Router).

---

## 10. Files to Create / Modify

### New files

```
app/result/page.tsx                                  — Replace placeholder with full implementation
app/blueprint/page.tsx                               — Coming-soon page (RSLT-10)
components/result/ResultPageClient.tsx               — Client root with gate state
components/result/EmailGateOverlay.tsx               — Gate overlay component
components/result/ArchetypeReveal.tsx                — Hero reveal section
components/result/FoundationalPatternsSection.tsx    — Patterns section
components/result/WatchoutsSection.tsx               — Watchouts section
components/result/BlueprintCTA.tsx                   — Inline Blueprint CTA
components/result/CulturalSection.tsx                — Cultural lens section
components/result/StickyBlueprintBar.tsx             — Sticky/floating CTA
```

### Potential new files

```
app/api/blueprint-interest/route.ts                  — API route for Blueprint email capture
supabase/migrations/YYYYMMDDXXXXXX_blueprint_interest.sql — If new table needed
```

### Modified files

```
app/globals.css                                      — New keyframe animations for gate
```

---

## 11. Summary of What the Plan Must Address

| Concern | Status |
|---------|--------|
| Session data fetch strategy (service_role, by UUID) | Researched — confirmed |
| ArchetypeId → Archetype object lookup | Researched — ARCHETYPES array, find by id |
| cultural_background option ID → CulturalOverlay lookup | Researched — need mapping constant |
| Email gate: UI-only vs DB write | Decision needed in planning |
| Email gate transition (blur + overlay fade) | Researched — CSS filter + opacity |
| Hydration / no-flicker for gate | Researched — useState(true) initial state |
| Section order and conditional cultural section | Researched — Patterns → Watchouts → Blueprint CTA → Cultural |
| Sticky CTA appearance trigger | Researched — IntersectionObserver or scroll |
| Blueprint CTA email storage destination | Decision needed in planning |
| `/blueprint` route scope | Decision needed in planning |
| Font, color, animation patterns | Researched — matches established codebase |
| Component decomposition | Researched — see section 2 |

---

*Phase: 03-mirror-result-page*
*Research completed: 2026-02-26*
