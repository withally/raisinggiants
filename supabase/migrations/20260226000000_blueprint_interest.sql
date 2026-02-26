-- Blueprint interest emails table
-- Stores emails of users who want to be notified when The Blueprint (Product 2) launches.
-- All writes go through the API route using service_role — no anon insert access needed.

CREATE TABLE blueprint_interest_emails (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL,
  source     TEXT        NOT NULL DEFAULT 'result-page',  -- 'result-page' | 'blueprint-page' | 'sticky-bar'
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Unique constraint so duplicate submissions are safely ignored
CREATE UNIQUE INDEX blueprint_interest_emails_email_idx ON blueprint_interest_emails (email);

-- Enable RLS (deny-all for anon — writes happen server-side via service_role)
ALTER TABLE blueprint_interest_emails ENABLE ROW LEVEL SECURITY;

-- No anon policies needed — writes go through API route using service_role
-- RLS enabled but no policies = deny all for anon users (correct for a server-write-only table)
