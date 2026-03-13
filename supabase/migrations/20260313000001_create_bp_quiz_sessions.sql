-- Migration: 20260313000001_create_bp_quiz_sessions.sql
-- Phase 7: Create bp_quiz_sessions table for Blueprint quiz (pay-first model, email-keyed, no anon auth).
-- The handle_updated_at() function already exists from 20260224000000_phase1_data_foundation.sql.

-- -----------------------------------------------------------------------
-- Table: bp_quiz_sessions
-- -----------------------------------------------------------------------
CREATE TABLE bp_quiz_sessions (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email               TEXT NOT NULL,
  parent_status       TEXT NOT NULL
                      CHECK (parent_status IN ('current-parent', 'expecting', 'planning')),
  status              TEXT NOT NULL DEFAULT 'in_progress'
                      CHECK (status IN ('in_progress', 'completed')),
  answers             JSONB,                         -- raw answer map keyed by question_id
  dimension_scores    JSONB,                         -- computed: { "emotional-warmth": 8.2, ... }
  archetype_id        TEXT,                          -- e.g. "steady-anchor", null until scored
  cultural_background TEXT,                          -- dedicated column for personalization
  started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at        TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE bp_quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Index on email for lookup performance
CREATE INDEX bp_quiz_sessions_email_idx ON bp_quiz_sessions (email);

-- updated_at auto-update trigger (reuses existing handle_updated_at() function)
CREATE TRIGGER set_updated_at_bp_quiz_sessions
  BEFORE UPDATE ON bp_quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- -----------------------------------------------------------------------
-- RLS Policies: bp_quiz_sessions
-- Blueprint uses pay-first model — no anon auth flow.
-- Session UUID itself acts as the credential for reads.
-- INSERT and UPDATE are service_role only (API route uses createAdminClient).
-- -----------------------------------------------------------------------

CREATE POLICY "Service role can insert Blueprint sessions"
  ON bp_quiz_sessions FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Anyone can read Blueprint sessions by ID"
  ON bp_quiz_sessions FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can update Blueprint sessions"
  ON bp_quiz_sessions FOR UPDATE
  TO service_role
  USING (true);
