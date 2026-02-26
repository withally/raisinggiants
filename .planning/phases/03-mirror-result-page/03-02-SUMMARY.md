---
phase: 03-mirror-result-page
plan: 02
subsystem: ui
tags: [next.js, react, supabase, tailwind, react-hook-form, zod, typescript]

requires:
  - phase: 03-mirror-result-page-plan-01
    provides: result page shell with ArchetypeReveal, FoundationalPatternsSection, WatchoutsSection, CulturalSection

provides:
  - Blueprint coming-soon CTA section (BlueprintCTA) for result page between Watchouts and Cultural
  - Sticky bottom bar (StickyBlueprintBar) for result page scroll engagement
  - /blueprint coming-soon page with email capture form
  - POST /api/blueprint-interest endpoint for storing launch notification emails
  - blueprint_interest_emails Supabase table migration with RLS and unique constraint

affects:
  - phase: 03-mirror-result-page-plan-03 (email gate overlay — accepts hidden prop from StickyBlueprintBar)
  - phase: product-2-blueprint (database table and API already waiting)

tech-stack:
  added: []
  patterns:
    - "BlueprintEmailForm: isolated client component with react-hook-form + zod + optimistic success state"
    - "StickyBlueprintBar: scroll-threshold visibility pattern using passive scroll event listener"
    - "API route: upsert with ignoreDuplicates: true for idempotent email capture"
    - "blueprint_interest_emails: server-write-only table (RLS on, no anon policies)"

key-files:
  created:
    - supabase/migrations/20260226000000_blueprint_interest.sql
    - app/api/blueprint-interest/route.ts
    - components/result/BlueprintCTA.tsx
    - components/result/StickyBlueprintBar.tsx
    - components/result/BlueprintEmailForm.tsx
    - app/blueprint/page.tsx
  modified:
    - app/result/page.tsx

key-decisions:
  - "BlueprintEmailForm extracted as separate components/result/BlueprintEmailForm.tsx — reusable across result page, sticky bar, and blueprint page"
  - "StickyBlueprintBar accepts hidden prop (default false) so Plan 03 email gate overlay can suppress it at z-50"
  - "scroll threshold set at 400px — deep enough to avoid immediate distraction, shallow enough to appear before user exits"
  - "blueprint_interest_emails uses upsert with ignoreDuplicates so duplicate email submissions return 200 success silently"

patterns-established:
  - "Server-write-only Supabase table: RLS enabled, no anon policies, all writes via service_role API route"
  - "Email capture CTA: coming-soon badge + display-font headline + three feature cards + amber CTA button"
  - "Sticky fixed bar: bg-stone-900/95 backdrop-blur-sm, border-t border-stone-700, z-40, passive scroll listener"

requirements-completed: [RSLT-05, RSLT-10]

duration: 3min
completed: 2026-02-26
---

# Phase 03 Plan 02: Blueprint CTA + Coming-Soon Page Summary

**Inline BlueprintCTA section, scroll-triggered StickyBlueprintBar, /blueprint coming-soon page with email capture, and blueprint_interest_emails Supabase table + API route — all wired into the result page**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-26T05:27:18Z
- **Completed:** 2026-02-26T05:30:21Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- Blueprint CTA section with concrete product messaging and "Coming Soon" badge appears on result page (RSLT-05)
- /blueprint coming-soon page with email capture form posts to API and stores email in Supabase (RSLT-10)
- Sticky bottom bar appears after 400px scroll and suppresses via `hidden` prop for email gate integration
- blueprint_interest_emails table migration with unique constraint and RLS (no anon access)
- Production build passes — /blueprint and /api/blueprint-interest routes both generate correctly

## Task Commits

1. **Task 1: Create Blueprint database table and API route** - `e0d362f` (feat)
2. **Task 2: Create BlueprintCTA, StickyBlueprintBar, and /blueprint page** - `44aaed7` (feat)

## Files Created/Modified

- `supabase/migrations/20260226000000_blueprint_interest.sql` - blueprint_interest_emails table with unique index and RLS
- `app/api/blueprint-interest/route.ts` - POST endpoint accepting email + source, upsert with ignoreDuplicates
- `components/result/BlueprintCTA.tsx` - Server component, dark section (bg-stone-900), three feature cards, CTA to /blueprint
- `components/result/StickyBlueprintBar.tsx` - Client component, fixed bottom-0 z-40, scroll-activated, hidden prop for gate integration
- `components/result/BlueprintEmailForm.tsx` - Client component, react-hook-form + zod, success/error states, POSTs to /api/blueprint-interest
- `app/blueprint/page.tsx` - Coming-soon page with value props and embedded email form
- `app/result/page.tsx` - Wired BlueprintCTA between Watchouts/Cultural sections; StickyBlueprintBar added at page root

## Decisions Made

- Extracted `BlueprintEmailForm` as a separate component file rather than inlining it in page.tsx — makes it independently testable and reusable across the result page if needed
- `StickyBlueprintBar` uses a passive scroll event listener (not IntersectionObserver) for simplicity and immediate threshold control at 400px
- API route normalizes emails to lowercase before storing — defensive consistency across submissions

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Biome a11y/useSemanticElements violations**
- **Found during:** Task 2 (running `npx biome check --write`)
- **Issue:** `<div role="status">` in BlueprintEmailForm and `<div role="complementary">` in StickyBlueprintBar are flagged by Biome — use semantic elements instead
- **Fix:** Changed `<div role="status">` to `<output>` and `<div role="complementary">` to `<aside>`, which are the correct semantic HTML equivalents
- **Files modified:** components/result/BlueprintEmailForm.tsx, components/result/StickyBlueprintBar.tsx
- **Verification:** `npx biome check` returned 0 errors across all 4 files
- **Committed in:** `44aaed7` (Task 2 commit)

---

**Total deviations:** 1 auto-fixed (Rule 1 - Bug)
**Impact on plan:** Accessibility improvement — semantic HTML is strictly better than ARIA role attributes on generic divs. No scope creep.

## Issues Encountered

None — Supabase migration is ready to apply but was not pushed (requires Supabase CLI authenticated session). Migration file is in place at `supabase/migrations/20260226000000_blueprint_interest.sql` for when the database is next synced.

## User Setup Required

Apply the Supabase migration before the Blueprint CTA email capture goes live:

```bash
npx supabase db push
```

Or apply manually via Supabase Studio SQL editor using the migration file contents.

## Next Phase Readiness

- Plan 02 complete: Blueprint CTA + sticky bar on result page, /blueprint page, API route, migration ready
- Plan 03 (email gate overlay) should pass `hidden` prop to `StickyBlueprintBar` when the gate is open — the prop interface is already in place
- The `blueprint_interest_emails` table migration must be applied before email capture is live

---
*Phase: 03-mirror-result-page*
*Completed: 2026-02-26*
