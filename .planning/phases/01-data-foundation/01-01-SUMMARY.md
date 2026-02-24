---
phase: 01-data-foundation
plan: 01
subsystem: database
tags: [supabase, postgres, rls, anonymous-auth, storage, sql, migrations]

# Dependency graph
requires: []
provides:
  - quiz_sessions table with all locked columns (id, user_id, email, status, answers, dimension_scores, archetype_id, cultural_background, started_at, completed_at, created_at, updated_at)
  - orders table with all locked columns (id, quiz_session_id, user_id, stripe_checkout_session_id, status, amount_cents, customer_email, pdf_storage_path, paid_at, fulfilled_at, delivered_at, created_at, updated_at)
  - RLS enabled on both tables with 3 policies on quiz_sessions (INSERT/SELECT/UPDATE for anon+authenticated) and 1 policy on orders (SELECT-only for anon+authenticated)
  - blueprints private storage bucket with PDF-only mime type and storage RLS policies
  - Anonymous sign-in enabled in supabase/config.toml
  - Browser Supabase client (lib/supabase/client.ts) using createBrowserClient from @supabase/ssr
  - Server-only admin Supabase client (lib/supabase/server.ts) using service_role key
affects: [02-quiz-engine, 03-free-result-page, 04-payment-flow, 05-ai-content-generation, 06-pdf-delivery]

# Tech tracking
tech-stack:
  added: ["@supabase/supabase-js ^2.97.0", "@supabase/ssr ^0.8.0", "supabase CLI 2.75.0"]
  patterns:
    - "RLS enabled at table creation time (not as afterthought) with policies in same migration block"
    - "handle_updated_at() trigger function shared across tables for auto-updating updated_at"
    - "Separate browser client (anon key, @supabase/ssr) and server client (service_role key, @supabase/supabase-js)"
    - "JSONB over JSON for answers and dimension_scores — binary storage, indexing support"
    - "Indexes on all RLS policy filter columns and FK columns at creation time"

key-files:
  created:
    - supabase/config.toml
    - supabase/migrations/20260224000000_phase1_data_foundation.sql
    - supabase/seed.sql
    - .env.local.example
    - lib/supabase/client.ts
    - lib/supabase/server.ts
  modified:
    - package.json

key-decisions:
  - "email column on quiz_sessions is nullable — session created at quiz start before email is captured at lead gate"
  - "JSONB used for answers and dimension_scores (not JSON) — binary storage and indexing capability"
  - "orders INSERT/UPDATE done exclusively via service_role (Stripe webhook) — no anon INSERT policy on orders"
  - "storage.objects SELECT policy for blueprints checks bucket_id only — signed URL auth handled at application layer in Phase 6"
  - "createAdminClient name (not createClient) for server.ts — makes dangerous nature obvious at import sites"
  - "SUPABASE_URL ?? NEXT_PUBLIC_SUPABASE_URL fallback in server.ts — supports both local dev and production configs"

patterns-established:
  - "Pattern 1: Migration-first schema contract — all downstream phases reference this migration for the table contract"
  - "Pattern 2: Dual Supabase client files — client.ts (browser, anon key) and server.ts (server-only, service_role)"
  - "Pattern 3: RLS with anonymous auth — auth.uid() works identically for anon and authenticated users"

requirements-completed: []

# Metrics
duration: 2min
completed: 2026-02-24
---

# Phase 1 Plan 01: Supabase Schema Foundation Summary

**Postgres schema for quiz_sessions and orders tables with RLS, anonymous auth, private storage bucket, and @supabase/ssr browser client + service_role admin client split**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-24T07:55:26Z
- **Completed:** 2026-02-24T07:57:53Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments

- quiz_sessions and orders tables with all locked CONTEXT.md columns implemented exactly (cultural_background dedicated TEXT column, dimension_scores dedicated JSONB column, archetype_id dedicated TEXT column, stripe_checkout_session_id UNIQUE NOT NULL, amount_cents INTEGER NOT NULL, 5-status CHECK constraint)
- RLS enabled at table creation time with 3 policies on quiz_sessions and SELECT-only policy on orders; anonymous users get full quiz session read/write via auth.uid()
- Supabase initialized with anonymous sign-in enabled; blueprints private storage bucket created with PDF-only MIME type and service_role upload + user read policies
- Dual Supabase client pattern established: browser client via @supabase/ssr createBrowserClient (anon key) and server-only admin client via @supabase/supabase-js createClient (service_role key, no NEXT_PUBLIC_ prefix)

## Task Commits

Each task was committed atomically:

1. **Task 1: Initialize Supabase project and create complete migration SQL** - `6fe651c` (feat)
2. **Task 2: Install Supabase dependencies and create client helper files** - `be251b6` (feat)

**Plan metadata:** `[pending final docs commit]` (docs: complete plan)

## Files Created/Modified

- `supabase/config.toml` - Supabase local dev config with enable_anonymous_sign_ins = true
- `supabase/migrations/20260224000000_phase1_data_foundation.sql` - Complete DDL: quiz_sessions + orders tables, RLS, indexes, triggers, blueprints bucket
- `supabase/seed.sql` - Empty seed file for local dev (bucket created in migration)
- `.env.local.example` - Environment variable template with NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- `lib/supabase/client.ts` - Browser Supabase client (createBrowserClient from @supabase/ssr)
- `lib/supabase/server.ts` - Server-only admin client with service_role key and security warning comment
- `package.json` - Added @supabase/supabase-js ^2.97.0 and @supabase/ssr ^0.8.0 dependencies

## Decisions Made

- email column on quiz_sessions is nullable — per Research open question 2: session created when quiz starts, email captured at lead gate later in the flow
- JSONB for answers and dimension_scores — binary storage is faster for reads; JSON stores raw text; JSONB is the Postgres standard for structured JSON data
- orders table has no INSERT/UPDATE policy for anon/authenticated — orders created exclusively by server-side Stripe webhook handler via service_role key (intentional and correct)
- Storage SELECT policy for blueprints checks bucket_id only (not path components) — signed URL generation is authenticated at the application layer in Phase 6 before calling createSignedUrl
- Function named createAdminClient (not createClient) in server.ts — makes the dangerous, RLS-bypassing nature visible at all import sites

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

Supabase CLI already installed (v2.75.0 detected). To start the local dev environment:

```bash
npx supabase start
```

This will apply migrations, seed the database, and output the local anon key and service_role key to populate `.env.local` (copied from `.env.local.example`).

## Next Phase Readiness

- Phase 2 (Quiz Engine) can begin: quiz_sessions table is ready for INSERT and UPDATE via anon client
- Phase 3 (Free Result Page) can begin: quiz_sessions is readable by session owner via RLS SELECT policy
- Phase 4 (Payment Flow) can begin: orders table ready with stripe_checkout_session_id idempotency guard
- Phase 5 (AI Content Generation) can begin: answers JSONB and cultural_background dedicated column are present
- Phase 6 (PDF Delivery) can begin: blueprints private bucket exists; pdf_storage_path column in orders

No blockers — Sophia's formal framework review (deferred from Phase 0) is non-blocking for Phase 1 execution. The schema contract is fully established and committed.

## Self-Check: PASSED

All created files verified on disk:
- supabase/config.toml — FOUND
- supabase/migrations/20260224000000_phase1_data_foundation.sql — FOUND
- supabase/seed.sql — FOUND
- .env.local.example — FOUND
- lib/supabase/client.ts — FOUND
- lib/supabase/server.ts — FOUND

All task commits verified in git log:
- 6fe651c (Task 1: Supabase init + migration SQL) — FOUND
- be251b6 (Task 2: Supabase deps + client helpers) — FOUND

---
*Phase: 01-data-foundation*
*Completed: 2026-02-24*
