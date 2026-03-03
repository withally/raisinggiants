-- Add UTM tracking columns to quiz_sessions
ALTER TABLE quiz_sessions
  ADD COLUMN IF NOT EXISTS utm_source  TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium  TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS utm_term    TEXT;

-- Add UTM tracking columns to blueprint_interest_emails
ALTER TABLE blueprint_interest_emails
  ADD COLUMN IF NOT EXISTS utm_source  TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium  TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT,
  ADD COLUMN IF NOT EXISTS utm_term    TEXT;
