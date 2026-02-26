---
phase: 03-mirror-result-page
plan: 01
subsystem: result-page
tags: [server-component, data-fetching, ui, result-page, archetype, cultural-overlay]
dependency_graph:
  requires:
    - lib/archetypes/archetypes.ts
    - lib/archetypes/types.ts
    - lib/archetypes/cultural-overlays.ts
    - lib/supabase/server.ts
  provides:
    - lib/result/helpers.ts
    - app/result/page.tsx
    - components/result/ArchetypeReveal.tsx
    - components/result/FoundationalPatternsSection.tsx
    - components/result/WatchoutsSection.tsx
    - components/result/CulturalSection.tsx
  affects:
    - /result route (now fully functional)
tech_stack:
  added: []
  patterns:
    - Next.js 15 async searchParams Server Component pattern
    - Supabase service_role client for session UUID-credentialed access
    - HTML details/summary for zero-JS collapsible citations
    - culturalContext.startsWith(prefix) for overlay matching
key_files:
  created:
    - lib/result/helpers.ts
    - components/result/ArchetypeReveal.tsx
    - components/result/FoundationalPatternsSection.tsx
    - components/result/WatchoutsSection.tsx
    - components/result/CulturalSection.tsx
  modified:
    - app/result/page.tsx
decisions:
  - "[03-01-A] getCulturalOverlay uses startsWith(prefix) to match culturalContext strings — resilient to long descriptive labels like 'East Asian collectivist (Chinese, Korean, Japanese)'"
  - "[03-01-B] Content-based keys instead of array index keys for themes/citations — Biome noArrayIndexKey compliance; themes are unique strings by content so slice(0,40) is safe"
  - "[03-01-C] Theme rendering splits on first em-dash to extract title/body — aligns with archetype content format 'Title — description'; graceful fallback if no dash"
  - "[03-01-D] HTML details/summary for citations collapsible — zero JS, server-renderable, works without hydration; fits pure Server Component constraint"
metrics:
  duration: 3 min
  completed: 2026-02-26
  tasks_completed: 2
  files_created: 5
  files_modified: 1
---

# Phase 03 Plan 01: Result Page Data Helpers and Section Components Summary

**One-liner:** Result page Server Component fetching quiz session via service_role, rendering 4 editorial section components with Cormorant Garamond display font and amber/stone palette.

## What Was Built

### Task 1: Result data helpers and Server Component page shell

Created `lib/result/helpers.ts` exporting:
- `CULTURAL_DISPLAY_NAMES` — maps quiz option IDs to display section headers ("The East Asian Lens", etc.)
- `CULTURAL_CONTEXT_PREFIXES` — maps option IDs to the culturalContext prefix used in `cultural-overlays.ts`
- `getCulturalOverlay(archetype, culturalBackground)` — finds matching CulturalOverlay via `startsWith(prefix)`, returns null for "other" or unknown backgrounds
- `fetchQuizSession(sessionId)` — service_role client fetches `quiz_sessions` row by UUID, selecting archetype_id, cultural_background, email, status

Replaced `app/result/page.tsx` placeholder with full async Server Component:
- Reads `?session` from Next.js 15 async `searchParams`
- Guards: missing session → error state; session not found or status !== "completed" → error state; archetype not found → error state
- Resolves archetype via `ARCHETYPES.find(a => a.id === row.archetype_id)`
- Resolves cultural overlay and display name
- Renders 4 section components in order with Plan 02 placeholder comments
- Error states: centered card on amber-50, display font headline, link to /quiz

### Task 2: 4 result section Server Components

**ArchetypeReveal.tsx** — Hero reveal section satisfying RSLT-01:
- Eyebrow: "You were raised by:" (small uppercase tracking)
- Archetype name: `text-4xl sm:text-5xl md:text-6xl`, Cormorant Garamond via `style={{ fontFamily: "var(--font-display)" }}`
- Tagline: `text-xl italic text-stone-600`
- Amber divider rule then foundational patterns headline as lead paragraph
- `min-h-[80dvh]` full viewport height, `py-20 sm:py-28` generous breathing room

**FoundationalPatternsSection.tsx** — RSLT-07:
- "What you inherited" section header in display font
- All 5 themes rendered as border-l-4 border-amber-400 blocks; title/body split on em-dash
- Research anchor italicized below themes
- Citations collapsible via `<details>/<summary>` (zero JS) as "researcher, *workTitle* (year) — relevanceNote"
- Background: bg-white

**WatchoutsSection.tsx** — RSLT-08:
- "What to watch for" with watchouts.headline as the h2 (includes the "That served you then" reframe)
- Same layout as patterns but border-stone-400 accent
- Background: bg-stone-50

**CulturalSection.tsx** — RSLT-03, RSLT-09:
- Conditional render (only when culturalOverlay and culturalDisplayName are non-null)
- displayName as h2 (e.g., "The East Asian Lens")
- expressionModifier as italic narrative paragraph
- "What this gave you": strengthsInContext as amber dot bullet list
- "What this may have cost you": tensionsInContext as stone dot bullet list
- Background: bg-amber-50; pb-24 extra bottom padding as page closer

## Verification Results

- `npx tsc --noEmit` — 0 errors
- `npx biome check` on all 6 files — 0 errors, 0 warnings
- `npm run build` — production build passes; `/result` route generates as `ƒ (Dynamic)`

## Deviations from Plan

None — plan executed exactly as written.

The pre-existing `BlueprintCTA.tsx`, `BlueprintEmailForm.tsx`, and `StickyBlueprintBar.tsx` files in `components/result/` had pre-existing Biome lint warnings (semantic element roles, array index keys). These are out of scope for this plan — discovered during Biome check of the directory, logged here, not fixed.

## Self-Check

All created files exist:

- [x] `lib/result/helpers.ts` — verified
- [x] `app/result/page.tsx` — verified (modified)
- [x] `components/result/ArchetypeReveal.tsx` — verified
- [x] `components/result/FoundationalPatternsSection.tsx` — verified
- [x] `components/result/WatchoutsSection.tsx` — verified
- [x] `components/result/CulturalSection.tsx` — verified

All commits exist:

- [x] `7e82e8b` — feat(03-01): create result data helpers and Server Component page shell
- [x] `2023811` — feat(03-01): create 4 result section Server Components

## Self-Check: PASSED
