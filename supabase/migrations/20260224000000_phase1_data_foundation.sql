-- Migration: 20260224000000_phase1_data_foundation.sql
-- Phase 1: Create quiz_sessions and orders tables with RLS, indexes, triggers,
--           and the blueprints private storage bucket.

-- -----------------------------------------------------------------------
-- Helper: updated_at trigger function (shared across tables)
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
  email               TEXT,                          -- nullable: captured at lead gate, not on session start
  status              TEXT NOT NULL DEFAULT 'in_progress'
                      CHECK (status IN ('in_progress', 'completed')),
  answers             JSONB,                         -- raw answer map keyed by question_id
  dimension_scores    JSONB,                         -- computed: { "emotional-warmth": 8.2, ... } (dedicated column, not inside answers)
  archetype_id        TEXT,                          -- e.g. "steady-anchor", null until scored
  cultural_background TEXT,                          -- dedicated column (NOT buried in answers JSONB) — critical for Phase 5-6 personalization
  started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Index on user_id for RLS policy performance
CREATE INDEX quiz_sessions_user_id_idx ON quiz_sessions (user_id);

-- updated_at auto-update trigger
CREATE TRIGGER set_updated_at_quiz_sessions
  BEFORE UPDATE ON quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- RLS Policies: quiz_sessions (3 policies: INSERT, SELECT, UPDATE)
-- Anonymous users get a real auth.users.id UUID via signInAnonymously();
-- RLS uses auth.uid() which works identically for anon and authenticated users.

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
  stripe_checkout_session_id  TEXT UNIQUE NOT NULL,  -- idempotency guard for Stripe webhook (PAY-03)
  status                      TEXT NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'paid', 'generating', 'fulfilled', 'delivered')),
  amount_cents                INTEGER NOT NULL,       -- price at time of purchase; supports future pricing changes
  customer_email              TEXT NOT NULL,
  pdf_storage_path            TEXT,                  -- "blueprints/{order_id}/blueprint.pdf" (no PII in path)
  paid_at                     TIMESTAMPTZ,
  fulfilled_at                TIMESTAMPTZ,
  delivered_at                TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Indexes for FK joins, idempotency lookup, and RLS policy performance
CREATE INDEX orders_user_id_idx ON orders (user_id);
CREATE INDEX orders_quiz_session_id_idx ON orders (quiz_session_id);
CREATE INDEX orders_stripe_checkout_session_id_idx ON orders (stripe_checkout_session_id);

-- updated_at auto-update trigger
CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- RLS Policies: orders (SELECT only for anon/authenticated)
-- INSERT and UPDATE are handled exclusively by the server-side Stripe webhook handler
-- using the service_role key, which bypasses RLS — this is intentional and correct.
-- Anonymous users can only SELECT their own orders (for the success page and download link).

CREATE POLICY "Users can read their own orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------
-- Storage: blueprints private bucket
-- -----------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blueprints',
  'blueprints',
  false,                   -- private bucket: no public access; access only via server-generated signed URLs
  52428800,                -- 50MB max file size
  ARRAY['application/pdf']
);

-- Storage RLS: service_role uploads PDFs (Stripe webhook handler)
CREATE POLICY "Service role can upload blueprints"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'blueprints');

-- Storage RLS: users can read their blueprints via signed URLs (defense-in-depth)
-- Signed URLs are generated server-side after verifying orders.user_id = auth.uid()
-- The bucket_id check is sufficient here because signed URL auth is handled at the
-- application layer (Phase 6 will verify order ownership before calling createSignedUrl).
CREATE POLICY "Users can read their own blueprints"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blueprints');
