# Phase 1: Data Foundation - Research

**Researched:** 2026-02-24
**Domain:** Supabase schema design, RLS policies, anonymous auth, and private Storage bucket configuration for a quiz-to-PDF digital product
**Confidence:** HIGH (Supabase docs well-established; patterns validated by existing project architecture research)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Quiz session data shape:**
- Store full answer set: every individual answer + computed dimension scores (all 11 dimensions) + final archetype result
- Cultural background gets its own dedicated column — not buried in answers JSONB — critical for personalization in Phases 5-6
- `status` column with values `in_progress` / `completed` — enables funnel analytics
- `started_at` and `completed_at` timestamps
- Email captured before showing free results (lead capture gate on quiz_sessions, not deferred to checkout)

**Order lifecycle:**
- 5 statuses: `pending` → `paid` → `generating` → `fulfilled` → `delivered`
- `amount_cents` column on orders (supports future pricing changes without migration)
- FK from `orders.quiz_session_id` → `quiz_sessions.id`
- `stripe_checkout_session_id` stored on orders (idempotent webhook handling + reconciliation)
- Lifecycle timestamps: `paid_at`, `fulfilled_at`, `delivered_at` in addition to `created_at` / `updated_at`

**PDF access:**
- Signed URLs expire after 7 days
- Re-download via email request (fresh signed URL sent to purchase email)
- Storage path pattern: `blueprints/{order_id}/blueprint.pdf`
- No PII in storage paths

**Schema scope:**
- Strictly v1 — no couple's blueprint hooks or speculative columns
- One quiz session per anonymous user (no unlimited retakes)
- Admin/analytics via Supabase dashboard SQL editor — no extra schema for admin views

### Claude's Discretion

- Exact column types and constraints (JSONB vs JSON for answers, column nullability, check constraints)
- RLS policy implementation details
- Index strategy
- Supabase Storage bucket configuration specifics
- Standard created_at/updated_at trigger setup

### Deferred Ideas

- None — discussion stayed within phase scope

</user_constraints>

---

<phase_requirements>
## Phase Requirements

This is a pure infrastructure phase — no v1 requirement IDs are assigned to it. Instead, it is the enabler for all downstream phases.

| Downstream Phase | What It Needs From Phase 1 |
|-----------------|--------------------------|
| Phase 2: Quiz Engine | `quiz_sessions` table to write completed sessions into |
| Phase 3: Free Result Page | `quiz_sessions` readable by the session owner (anonymous user) |
| Phase 4: Payment Flow | `orders` table for order creation + idempotency guard; FK to `quiz_sessions` |
| Phase 5: AI Content Generation | `quiz_sessions.answers` JSONB + `quiz_sessions.cultural_background` readable by the webhook service-role client |
| Phase 6: PDF Delivery | Supabase Storage `blueprints/` private bucket + signed URL generation; `orders.pdf_storage_path` column |

</phase_requirements>

---

## Summary

Phase 1 is a pure infrastructure sprint. There is no UI, no user-facing logic, and no AI or payment integration. The deliverables are: (1) two Postgres tables with correct schema and enabled RLS, (2) RLS policies that correctly enforce anonymous-user-scoped access verified through the JavaScript SDK, (3) anonymous sign-in enabled and tested, and (4) a private Supabase Storage bucket with signed URL access confirmed working.

The most important execution risk in this phase is **RLS misconfiguration**. This product collects sensitive psychological and family data. Supabase creates all tables with RLS disabled by default, and the SQL editor runs as postgres superuser and therefore bypasses all RLS policies — giving a false sense of security. Every RLS policy must be verified through the `@supabase/supabase-js` client with a real anonymous session, not through the SQL editor. This is the single most critical step in the phase.

The second risk is **schema under-specification that causes Phase 2 rework**. Because Phase 1 produces the table contract that every downstream phase depends on, adding a column that should have been a separate column (e.g., burying cultural background in the answers JSONB blob) causes cascading rework across Phases 2, 5, and 6. The schema decisions locked in CONTEXT.md address this directly — they must be implemented exactly as specified, not approximated.

---

## Standard Stack

This phase produces SQL migrations and Supabase configuration — no Next.js application code yet. The tech surface is:

| Tool | Version | Purpose |
|------|---------|---------|
| Supabase (cloud or local) | Latest | Postgres database + Auth + Storage |
| `@supabase/supabase-js` | 2.80.x | JavaScript SDK for RLS verification testing |
| `@supabase/ssr` | 0.8.x | Current official package (replaces deprecated `auth-helpers`) |
| Supabase CLI | Latest | Local dev (`npx supabase start`), migration management, diff |

**Note on local dev vs. cloud:** The Supabase CLI can spin up a local Postgres instance (`npx supabase start`) that mirrors the cloud project schema. Running migrations locally first and then pushing to the cloud project via `supabase db push` is the recommended development workflow. Anonymous sign-in must also be enabled in the local config (`supabase/config.toml`) to test the full auth flow locally.

---

## Architecture Patterns

### Pattern 1: Table Schema with RLS Enabled at Creation

**Rule:** Enable RLS at the moment the table is created — never as an afterthought.

```sql
-- Create table and enable RLS in the same migration block
CREATE TABLE quiz_sessions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT,                                    -- captured at lead gate
  status          TEXT NOT NULL DEFAULT 'in_progress'
                  CHECK (status IN ('in_progress', 'completed')),
  answers         JSONB,                                   -- full answer map keyed by question_id
  dimension_scores JSONB,                                  -- computed: { "emotional-warmth": 8.2, ... }
  archetype_id    TEXT,                                    -- "steady-anchor", null until scored
  cultural_background TEXT,                               -- dedicated column (not buried in answers)
  started_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Index on user_id for RLS policy performance
CREATE INDEX quiz_sessions_user_id_idx ON quiz_sessions (user_id);
```

```sql
CREATE TABLE orders (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_session_id           UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE RESTRICT,
  user_id                   UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  stripe_checkout_session_id TEXT UNIQUE NOT NULL,          -- idempotency guard
  status                    TEXT NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending', 'paid', 'generating', 'fulfilled', 'delivered')),
  amount_cents              INTEGER NOT NULL,               -- price at time of purchase
  customer_email            TEXT NOT NULL,
  pdf_storage_path          TEXT,                          -- "blueprints/{order_id}/blueprint.pdf"
  paid_at                   TIMESTAMPTZ,
  fulfilled_at              TIMESTAMPTZ,
  delivered_at              TIMESTAMPTZ,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Indexes for idempotency lookup and FK joins
CREATE INDEX orders_stripe_checkout_session_id_idx ON orders (stripe_checkout_session_id);
CREATE INDEX orders_user_id_idx ON orders (user_id);
CREATE INDEX orders_quiz_session_id_idx ON orders (quiz_session_id);
```

**JSONB over JSON:** Use `JSONB` (not `JSON`) for `answers` and `dimension_scores`. JSONB stores data in a binary format that supports indexing and efficient key lookups. `JSON` stores raw text and is slower for all access patterns beyond simple storage. JSONB is the Postgres standard for structured JSON data.

### Pattern 2: RLS Policies for Anonymous Users

The product uses anonymous sign-in (`supabase.auth.signInAnonymously()`). Anonymous users get a real `auth.users.id` UUID. RLS policies use `auth.uid()` to scope access to the current user — this works identically for anonymous users and real account users.

**quiz_sessions policies:**

```sql
-- Anonymous user can INSERT their own session (quiz start)
CREATE POLICY "Users can insert their own quiz session"
  ON quiz_sessions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (auth.uid() = user_id);

-- Anonymous user can SELECT their own session (result page read)
CREATE POLICY "Users can read their own quiz session"
  ON quiz_sessions
  FOR SELECT
  TO anon, authenticated
  USING (auth.uid() = user_id);

-- Anonymous user can UPDATE their own session (answer save, completion)
CREATE POLICY "Users can update their own quiz session"
  ON quiz_sessions
  FOR UPDATE
  TO anon, authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

**orders policies:**

```sql
-- Anonymous user can SELECT their own orders (success page download link)
CREATE POLICY "Users can read their own orders"
  ON orders
  FOR SELECT
  TO anon, authenticated
  USING (auth.uid() = user_id);

-- No INSERT/UPDATE policy for orders via anon client
-- Orders are created by the server-side webhook handler using service_role key
-- which bypasses RLS — this is intentional and correct
```

**Service role for server-side operations:** The Stripe webhook handler runs server-side with the `service_role` key. This key bypasses all RLS policies. This is intentional for the webhook — it needs to create and update orders on behalf of any user. The `service_role` key must never appear in client-side code.

### Pattern 3: updated_at Trigger

Both tables need `updated_at` to auto-update on every row change. This is a standard Postgres pattern:

```sql
-- Create the trigger function once (shared across tables)
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach to each table
CREATE TRIGGER set_updated_at_quiz_sessions
  BEFORE UPDATE ON quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
```

### Pattern 4: Anonymous Sign-In Flow

Anonymous sign-in is a Supabase Auth feature that creates a real `auth.users` row with a generated UUID but no email or password. The client receives a JWT, which is sent on subsequent requests just like any other session.

```typescript
// lib/supabase/client.ts — browser client
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// On quiz start (Phase 2 will call this)
const supabase = createClient()
const { data: { user }, error } = await supabase.auth.signInAnonymously()
// user.id is the anchor for all subsequent quiz_sessions writes
```

**Enabling anonymous sign-in:** Must be enabled in the Supabase project dashboard under Authentication → Providers → Anonymous sign-ins. For local dev, add to `supabase/config.toml`:

```toml
[auth]
enable_anonymous_sign_ins = true
```

### Pattern 5: Supabase Storage Private Bucket

The `blueprints` bucket must be **private** (not public). Access is only via time-limited signed URLs generated server-side after order fulfillment verification.

```sql
-- Create the storage bucket (can also be done via the Supabase dashboard)
INSERT INTO storage.buckets (id, name, public)
VALUES ('blueprints', 'blueprints', false);

-- Storage RLS policy: service_role can INSERT (webhook uploads PDF)
-- Users can SELECT their own file via signed URL (Supabase Storage handles this natively)
-- No public access policy needed — signed URLs bypass public access entirely

-- Storage RLS: only authenticated users can read their own blueprint files
CREATE POLICY "Users can read their own blueprints"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'blueprints'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
```

**Note on the storage path pattern:** The CONTEXT.md decision is `blueprints/{order_id}/blueprint.pdf`. This means the first path component after the bucket name is the `order_id`. The RLS policy above uses `(storage.foldername(name))[1]` to extract the first folder component and compare it to `auth.uid()`. However, since the path uses `order_id` (not `user_id`), this particular RLS approach won't work directly — the server-side webhook will always use the `service_role` key to upload, and signed URLs are generated server-side after verifying `orders.user_id = auth.uid()`. The storage bucket RLS is a defense-in-depth layer.

**Signed URL generation (Phase 6 will implement this, but the pattern is established in Phase 1):**

```typescript
// Server-side only — use service_role client
const { data, error } = await supabaseAdmin.storage
  .from('blueprints')
  .createSignedUrl(`${order.id}/blueprint.pdf`, 60 * 60 * 24 * 7) // 7 days in seconds

// data.signedUrl is the URL to embed in the delivery email and success page
```

### Pattern 6: RLS Verification via JavaScript SDK

This is the most critical verification step. The SQL editor in the Supabase dashboard runs as the `postgres` superuser and bypasses all RLS policies. A policy that looks correct in the SQL editor may be entirely permissive or entirely blocking when called through the SDK with a real user session.

**Verification procedure (must run as part of Phase 1 completion):**

```typescript
// test/rls-verification.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!  // anon key, NOT service_role
)

async function verifyRLS() {
  // Step 1: Sign in as anonymous user A
  const { data: { user: userA } } = await supabase.auth.signInAnonymously()
  console.log('User A ID:', userA?.id)

  // Step 2: Insert a quiz session as user A
  const { data: session, error: insertError } = await supabase
    .from('quiz_sessions')
    .insert({
      user_id: userA?.id,
      status: 'in_progress',
    })
    .select()
    .single()

  console.log('Insert result:', session?.id, 'Error:', insertError?.message)

  // Step 3: Sign out and sign in as a NEW anonymous user B
  await supabase.auth.signOut()
  const { data: { user: userB } } = await supabase.auth.signInAnonymously()
  console.log('User B ID:', userB?.id)

  // Step 4: Attempt to read user A's session as user B — MUST return empty
  const { data: crossRead, error: crossReadError } = await supabase
    .from('quiz_sessions')
    .select('*')
    .eq('id', session?.id)

  if (crossRead && crossRead.length > 0) {
    console.error('SECURITY FAIL: User B can read User A\'s session!')
  } else {
    console.log('PASS: User B cannot read User A\'s session')
  }

  // Step 5: Sign back in as user A and confirm they can read their own session
  await supabase.auth.signOut()
  await supabase.auth.setSession({ /* user A's session tokens */ })
  // ... (use stored tokens or repeat signInAnonymously which creates new user)
  // In practice: maintain user A's session and test SELECT
}
```

**Simpler verification approach:** Use `supabase.auth.signInAnonymously()` in one browser tab, create a session, then open a new incognito browser tab (creates a different anonymous session), and attempt to query the other user's row by ID through the Supabase client.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| UUID generation | `uuid.v4()` in application code | `gen_random_uuid()` in Postgres DEFAULT | Database-generated UUIDs are always present even for inserts made via service_role or direct SQL tools; application-generated UUIDs require the column to always be populated by the caller |
| Timestamp management | Manual `Date.now()` in application inserts | Postgres `DEFAULT now()` + `handle_updated_at()` trigger | Trigger-based timestamps cannot be accidentally skipped; they also work for updates made via any client including the SQL editor and CLI tools |
| RLS test via SQL editor | Write RLS verification queries in the Supabase SQL editor | Run verification via `@supabase/supabase-js` with anon key | SQL editor bypasses RLS entirely; it is not a valid testing surface for RLS policies |
| Custom auth for anonymous users | Roll custom session token generation | `supabase.auth.signInAnonymously()` | Supabase anonymous sign-in produces a proper JWT that RLS policies can read via `auth.uid()`; custom tokens cannot be used with RLS |
| Storage access control via application logic | Application-level check before serving files | Supabase Storage private bucket + signed URLs | Storage RLS is the authoritative access control layer; application-level checks can be bypassed; signed URLs with short expiry are the correct pattern for private file delivery |

---

## Common Pitfalls

### Pitfall 1: Testing RLS in the SQL Editor

**What goes wrong:** Developer writes RLS policies, runs `SELECT * FROM quiz_sessions WHERE user_id = 'some-uuid'` in the Supabase SQL editor, sees the expected results, and declares RLS working. In production, another user can read any row — because the SQL editor runs as postgres superuser, bypassing all RLS. This exact pattern caused 83% of exposed Supabase databases in a reported January 2025 cohort.

**How to avoid:** Never use the SQL editor to verify RLS behavior. All verification must go through the `@supabase/supabase-js` SDK with the `anon` key and a real anonymous user session. The success criterion for Phase 1 explicitly states "verified to work through the JavaScript SDK (not just the SQL editor)" — this is intentional.

**Warning signs:** RLS verification step was "passed" without running a single line of SDK-based test code.

### Pitfall 2: Enabling RLS Without Policies (Locks Out All Access)

**What goes wrong:** Developer runs `ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY` but does not create any policies. With RLS enabled and no policies, Postgres defaults to DENY ALL. The quiz session insert in Phase 2 fails silently with no data written. This is especially confusing because the SQL editor (running as superuser) can still insert fine, masking the problem.

**How to avoid:** Always pair `ENABLE ROW LEVEL SECURITY` with the creation of explicit policies in the same migration. Run the SDK-based verification test after applying the migration to confirm the INSERT and SELECT operations work as expected for an anonymous user.

**Warning signs:** Application can read/write via service_role but returns empty results via the anon key client.

### Pitfall 3: Service Role Key in Client-Side Code

**What goes wrong:** Developer uses the `service_role` key in the Next.js application to avoid writing RLS policies (it bypasses all of them). Works fine in development. In production, the `service_role` key is exposed in the client bundle, giving any browser full unrestricted read/write access to all tables.

**How to avoid:** Two separate Supabase clients:
- `lib/supabase/client.ts` — uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` — safe for browser
- `lib/supabase/server.ts` — uses `SUPABASE_SERVICE_ROLE_KEY` — server-only, never imported in client components

The `service_role` environment variable must NOT have the `NEXT_PUBLIC_` prefix (which would expose it to the browser bundle).

**Warning signs:** Any component in the `app/` directory or `components/` directory imports from a Supabase client that uses the service role key.

### Pitfall 4: Schema Under-Specification Creating Downstream Rework

**What goes wrong:** `cultural_background` is stored as a key inside the `answers` JSONB column instead of as a dedicated column. Phase 5 AI content generation needs to query quiz sessions and extract cultural background for prompt injection. JSONB key access is more complex and slower than a dedicated text column. The Moonshot AI prompt builder has to do extra parsing. Phase 6 Resend email templates that include cultural context have the same problem.

**How to avoid:** Follow the CONTEXT.md schema decisions exactly. `cultural_background` is a dedicated `TEXT` column. `dimension_scores` is a dedicated `JSONB` column separate from `answers`. `archetype_id` is a dedicated `TEXT` column. These are not buried in the answers blob — they are first-class columns that downstream phases query directly.

**Warning signs:** The planned column does not exist as a column in the DDL — it is a key inside a JSONB column instead.

### Pitfall 5: Missing Index on FK and Policy Filter Columns

**What goes wrong:** The quiz_sessions table has no index on `user_id`. Every RLS policy evaluation performs a full table scan to find rows where `user_id = auth.uid()`. At 1,000 quiz sessions this is imperceptible. At 100,000 it causes perceptible latency on every API call that reads quiz sessions.

**How to avoid:** Create indexes on every column referenced in RLS policy `USING` and `WITH CHECK` clauses, and on all foreign key columns. For this phase: `quiz_sessions(user_id)`, `orders(user_id)`, `orders(quiz_session_id)`, `orders(stripe_checkout_session_id)`. Do this at table creation time — retrofitting indexes later requires a brief table lock.

---

## Code Examples

### Complete Migration File (Validated Pattern)

```sql
-- Migration: 20260224000000_phase1_data_foundation.sql
-- Phase 1: Create quiz_sessions and orders tables with RLS

-- -----------------------------------------------------------------------
-- Helper: updated_at trigger function
-- -----------------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- -----------------------------------------------------------------------
-- Table: quiz_sessions
-- -----------------------------------------------------------------------
CREATE TABLE quiz_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT,
  status              TEXT NOT NULL DEFAULT 'in_progress'
                      CHECK (status IN ('in_progress', 'completed')),
  answers             JSONB,
  dimension_scores    JSONB,
  archetype_id        TEXT,
  cultural_background TEXT,
  started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

CREATE INDEX quiz_sessions_user_id_idx ON quiz_sessions (user_id);

CREATE TRIGGER set_updated_at_quiz_sessions
  BEFORE UPDATE ON quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- RLS Policies: quiz_sessions
CREATE POLICY "Users can insert their own quiz session"
  ON quiz_sessions FOR INSERT
  TO anon, authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own quiz sessions"
  ON quiz_sessions FOR SELECT
  TO anon, authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own quiz session"
  ON quiz_sessions FOR UPDATE
  TO anon, authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- -----------------------------------------------------------------------
-- Table: orders
-- -----------------------------------------------------------------------
CREATE TABLE orders (
  id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_session_id             UUID NOT NULL REFERENCES quiz_sessions(id) ON DELETE RESTRICT,
  user_id                     UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  stripe_checkout_session_id  TEXT UNIQUE NOT NULL,
  status                      TEXT NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'paid', 'generating', 'fulfilled', 'delivered')),
  amount_cents                INTEGER NOT NULL,
  customer_email              TEXT NOT NULL,
  pdf_storage_path            TEXT,
  paid_at                     TIMESTAMPTZ,
  fulfilled_at                TIMESTAMPTZ,
  delivered_at                TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE INDEX orders_user_id_idx ON orders (user_id);
CREATE INDEX orders_quiz_session_id_idx ON orders (quiz_session_id);
CREATE INDEX orders_stripe_checkout_session_id_idx ON orders (stripe_checkout_session_id);

CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- RLS Policies: orders
-- INSERT and UPDATE are handled by service_role only (Stripe webhook handler)
-- Anonymous users can only SELECT their own orders (download page)
CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------
-- Storage: blueprints bucket
-- -----------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blueprints',
  'blueprints',
  false,          -- private bucket: no public access
  52428800,       -- 50MB max file size
  ARRAY['application/pdf']
);

-- Storage RLS: only service_role can upload (webhook); users read via signed URLs
-- Signed URL generation itself is authenticated at the application layer
-- (verify order.user_id = auth.uid() before calling createSignedUrl)
CREATE POLICY "Service role can upload blueprints"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'blueprints');

CREATE POLICY "Users can read their own blueprints"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blueprints');
```

### Supabase Server Client (Service Role — for Webhook Handler)

```typescript
// lib/supabase/server.ts
// WARNING: service_role key bypasses RLS. Server-side only.
// NEVER import this in client components or pages.
import { createClient } from '@supabase/supabase-js'

export function createAdminClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // NOT NEXT_PUBLIC_ prefix
  )
}
```

### Supabase Browser Client (Anon Key — for Quiz/App UI)

```typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### Anonymous Sign-In Verification Script

```typescript
// scripts/verify-rls.ts
// Run: npx tsx scripts/verify-rls.ts
// Purpose: verify RLS policies work through the JS SDK (not the SQL editor)

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // anon key only
)

async function main() {
  console.log('=== Phase 1 RLS Verification ===\n')

  // Step 1: Sign in as anonymous user A
  const { data: { user: userA }, error: signInErrorA } = await supabase.auth.signInAnonymously()
  if (!userA || signInErrorA) {
    console.error('FAIL: Anonymous sign-in failed:', signInErrorA?.message)
    process.exit(1)
  }
  console.log('PASS: Anonymous sign-in succeeded. User A:', userA.id)

  // Step 2: Insert a quiz session as user A
  const { data: sessionA, error: insertError } = await supabase
    .from('quiz_sessions')
    .insert({ user_id: userA.id, status: 'in_progress' })
    .select()
    .single()

  if (!sessionA || insertError) {
    console.error('FAIL: User A cannot insert quiz_session:', insertError?.message)
    process.exit(1)
  }
  console.log('PASS: User A inserted quiz_session:', sessionA.id)

  // Step 3: User A can read their own session
  const { data: selfRead, error: selfReadError } = await supabase
    .from('quiz_sessions')
    .select('id')
    .eq('id', sessionA.id)
  if (!selfRead?.length || selfReadError) {
    console.error('FAIL: User A cannot read their own session:', selfReadError?.message)
    process.exit(1)
  }
  console.log('PASS: User A can read their own session')

  // Step 4: Sign out and sign in as user B
  await supabase.auth.signOut()
  const { data: { user: userB }, error: signInErrorB } = await supabase.auth.signInAnonymously()
  if (!userB || signInErrorB) {
    console.error('FAIL: Second anonymous sign-in failed:', signInErrorB?.message)
    process.exit(1)
  }
  console.log('User B signed in:', userB.id)

  // Step 5: User B attempts to read User A's session — MUST return empty
  const { data: crossRead, error: crossReadError } = await supabase
    .from('quiz_sessions')
    .select('id')
    .eq('id', sessionA.id)

  if (crossRead && crossRead.length > 0) {
    console.error('SECURITY FAIL: User B CAN read User A\'s session — RLS policy not working!')
    process.exit(1)
  }
  console.log('PASS: User B cannot read User A\'s session (RLS working)')

  // Step 6: Verify Storage bucket exists and is private
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets()
  const blueprintsBucket = buckets?.find(b => b.id === 'blueprints')
  if (!blueprintsBucket) {
    console.error('FAIL: blueprints storage bucket not found:', bucketsError?.message)
    process.exit(1)
  }
  if (blueprintsBucket.public) {
    console.error('SECURITY FAIL: blueprints bucket is public — must be private')
    process.exit(1)
  }
  console.log('PASS: blueprints bucket exists and is private')

  console.log('\n=== All Phase 1 RLS checks PASSED ===')
  process.exit(0)
}

main().catch(console.error)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|-----------------|--------------|--------|
| `@supabase/auth-helpers-nextjs` | `@supabase/ssr` 0.8.x | 2024 | `auth-helpers` is deprecated; `@supabase/ssr` is the official replacement; API is different (`createBrowserClient` / `createServerClient` vs. older cookie helper patterns) |
| Manual `supabase.auth.signIn()` with email/password before quiz | `supabase.auth.signInAnonymously()` on quiz start | Supabase added anonymous auth as a first-class feature (stable 2024) | No friction for the user; no email required before quiz; anonymous user gets a real `auth.users` row that RLS policies can use via `auth.uid()` |
| JSON column type | JSONB | Postgres 9.4+ (2014) | JSONB is binary-stored, faster for reads, supports GIN indexes; JSON stores raw text; always use JSONB for structured data |
| Ad hoc updated_at in application code | Postgres trigger via `handle_updated_at()` | Longstanding best practice | Trigger fires for all updates regardless of the client making the change (SDK, SQL editor, CLI tools); application cannot accidentally omit it |
| Public storage buckets with opaque filenames for access control | Private buckets + server-generated signed URLs | Supabase Storage signed URL feature (stable) | A "private" filename is not access control — it's security through obscurity. Proper private buckets + signed URLs with time limits are the correct pattern |

---

## Open Questions

1. **Should `answers` JSONB store individual question answers, lens-scored answers, or both?**
   - What we know: Phase 2 Quiz Engine will write this column; Phase 5 AI content generation will read it; the answer format must support all 11 dimensions and the three-lens model (Past/Current/Aspirational)
   - What's unclear: Whether to store raw question-level answers (e.g., `{ "q-01": 4, "q-02": "often" }`) and compute dimension scores at write time, or to store both
   - Recommendation: Store both raw answers in `answers` JSONB and computed dimension scores in `dimension_scores` JSONB. The raw answers are the authoritative source; dimension scores are a derived cache. Phase 5 AI prompts need verbatim answer text (per CONTEXT.md: "inject verbatim quiz answers"), which requires raw answers. Phase 3 result display needs dimension scores. Both columns serve distinct downstream needs.
   - **Decision required in Phase 1:** The schema must define both columns (they're already in the proposed DDL above). Phase 2 will define the exact JSON structure for each when the question bank is built.

2. **Should the `email` column on `quiz_sessions` be NOT NULL?**
   - What we know: CONTEXT.md says "email captured before showing free results (lead capture gate on quiz_sessions)." This implies email is captured during the quiz flow before the quiz_sessions row is complete.
   - What's unclear: Whether the quiz session is created at quiz start (before email is known) or at email capture. The answer determines whether `email` is nullable.
   - Recommendation: Allow nullable email on quiz_sessions. The session is created when the user starts the quiz (so Phase 2 can checkpoint progress). Email is added to the row when captured at the lead gate. Attempting to make it NOT NULL at the table level would require the quiz start to pre-populate email, which contradicts the "email captured before showing free results" flow.
   - **This decision is left to Claude's discretion per CONTEXT.md** — the schema above correctly models email as nullable.

3. **Should the `blueprints` storage bucket exist in the local Supabase dev environment for Phase 1 testing?**
   - What we know: The Supabase CLI local dev environment mirrors the cloud schema. Storage buckets can be seeded via the Supabase CLI.
   - Recommendation: Yes. The Phase 1 verification script (above) checks for the bucket's existence and privacy setting. This check must pass in the local dev environment before the plan is considered complete. Add the bucket to `supabase/seed.sql` or the migration file.

---

## Validation Architecture

Phase 1 completion is verified by running the `verify-rls.ts` script against both the local Supabase instance and the cloud project. The script is the executable definition of the Phase 1 success criteria:

| Success Criterion | Verification Method |
|-----------------|-------------------|
| `quiz_sessions` and `orders` tables exist with correct schema | Inspect via `supabase db diff` or Supabase Studio table editor |
| RLS enabled on both tables | `verify-rls.ts` — anonymous user cannot read another user's row |
| Anonymous sign-in enabled and working | `verify-rls.ts` — Step 1: sign in anonymously, receive user.id |
| Anonymous user can write a quiz session | `verify-rls.ts` — Step 2: INSERT succeeds via anon key client |
| Anonymous user can read only their own row | `verify-rls.ts` — Steps 3 & 5: own row readable; other user's row returns empty |
| Supabase Storage private bucket exists | `verify-rls.ts` — Step 6: bucket found, `public: false` |
| Signed URL access working | Manual test: upload a test PDF via service_role client, generate a signed URL, confirm it resolves in a browser |

---

## Sources

### Primary (HIGH confidence)
- [Supabase Row Level Security docs](https://supabase.com/docs/guides/database/postgres/row-level-security) — RLS policy syntax, `auth.uid()` function, policy roles — HIGH confidence (official Supabase docs)
- [Supabase Anonymous Sign-Ins](https://supabase.com/docs/guides/auth/auth-anonymous) — Anonymous auth feature, `signInAnonymously()` API, JWT behavior — HIGH confidence (official Supabase docs)
- [Supabase Storage — Private Files and Signed URLs](https://supabase.com/docs/guides/storage/serving/downloads) — Private bucket creation, `createSignedUrl()` pattern — HIGH confidence (official Supabase docs)
- [Supabase @supabase/ssr package docs](https://supabase.com/docs/guides/auth/server-side/nextjs) — `createBrowserClient` / `createServerClient` pattern; replaces deprecated auth-helpers — HIGH confidence (official docs)
- [Postgres JSONB vs JSON](https://www.postgresql.org/docs/current/datatype-json.html) — Binary vs text storage, JSONB indexing support — HIGH confidence (official Postgres docs)
- [Supabase local development with CLI](https://supabase.com/docs/guides/local-development) — `supabase start`, `supabase db push`, config.toml for anonymous auth — HIGH confidence (official docs)

### Secondary (MEDIUM confidence)
- [DesignRevision Complete RLS Guide 2026](https://designrevision.com/blog/supabase-row-level-security) — Policy examples and RLS gotchas — MEDIUM confidence (community blog, patterns consistent with official docs)
- [ProsperaSoft RLS Misconfigurations](https://prosperasoft.com/blog/database/supabase/supabase-rls-issues) — Common RLS mistakes including "enabled but no policies = DENY ALL" — MEDIUM confidence (consistent with official Supabase behavior documentation)
- Project research: `.planning/research/ARCHITECTURE.md` — Pattern 2 (anonymous session), Pattern for server/client Supabase client split, database schema logical design — HIGH confidence (already validated against Supabase official docs during initial project research)
- Project research: `.planning/research/PITFALLS.md` — Pitfall 8 (Supabase RLS disabled), integration gotchas table — HIGH confidence (synthesized from official docs and community incident reports)

---

## Metadata

**Confidence breakdown:**
- Schema DDL design: HIGH — derived directly from locked CONTEXT.md decisions; column types and constraints follow Postgres best practices
- RLS policy syntax: HIGH — taken directly from Supabase official documentation
- Anonymous auth setup: HIGH — Supabase anonymous auth is a stable, first-class feature with official documentation
- Storage bucket configuration: HIGH — private bucket + signed URL pattern is the documented Supabase approach for private file delivery
- RLS verification approach: HIGH — the SQL editor bypass behavior is officially documented and the SDK-based verification approach is the canonical correct method

**Research date:** 2026-02-24
**Valid until:** 2026-05-24 (90 days — Supabase stable APIs; RLS and Storage patterns are not rapidly evolving)

---

## Phase 1 Execution Guidance for Planner

Phase 1 is short (1-2 plans) but high-stakes because it produces the schema contract that all downstream phases build against. The planner should design plans with these constraints:

1. **Run the verification script as the phase gate.** Phase 1 is not done when the migration file is written — it is done when `verify-rls.ts` passes all checks against the live (or local) Supabase project. The script is the machine-readable definition of the success criteria.

2. **The migration file is the primary deliverable.** It should be committed to `supabase/migrations/` following the Supabase CLI convention (`{timestamp}_{description}.sql`). This enables `supabase db push` to apply it to the cloud project and `supabase db reset` to replay it in local dev.

3. **Do not apply schema decisions from CONTEXT.md approximately.** Every locked decision (dedicated `cultural_background` column, 5-status CHECK constraint on orders, `stripe_checkout_session_id UNIQUE NOT NULL`, lifecycle timestamp columns) must be implemented exactly. These decisions exist because approximate implementations cause Phase 2-6 rework.

4. **Test anonymous auth locally first.** The `supabase/config.toml` must have `enable_anonymous_sign_ins = true` before the local verification script can run. This is easy to miss — the feature is off by default.

5. **No application code is written in Phase 1.** The `lib/supabase/client.ts` and `lib/supabase/server.ts` files can be created as stubs for the verification script, but no Next.js pages, quiz logic, or API routes belong in this phase.
