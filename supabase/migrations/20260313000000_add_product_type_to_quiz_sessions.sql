-- Migration: 20260313000000_add_product_type_to_quiz_sessions.sql
-- Phase 7: Add product_type column to quiz_sessions to distinguish Mirror vs Blueprint sessions.
-- Use ADD COLUMN IF NOT EXISTS for idempotency.

ALTER TABLE quiz_sessions
  ADD COLUMN IF NOT EXISTS product_type TEXT NOT NULL DEFAULT 'mirror'
    CHECK (product_type IN ('mirror', 'blueprint'));
