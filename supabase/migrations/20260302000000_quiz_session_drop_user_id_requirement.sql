-- Remove user_id requirement from quiz_sessions.
-- Sessions are now created server-side via API route with email only (no anonymous auth).

-- Make user_id nullable
ALTER TABLE quiz_sessions ALTER COLUMN user_id DROP NOT NULL;

-- Drop the foreign key constraint so sessions can exist without an auth user
ALTER TABLE quiz_sessions DROP CONSTRAINT IF EXISTS quiz_sessions_user_id_fkey;

-- Drop RLS policies that depend on auth.uid() = user_id
DROP POLICY IF EXISTS "Users can insert their own quiz sessions" ON quiz_sessions;
DROP POLICY IF EXISTS "Users can read their own quiz sessions" ON quiz_sessions;
DROP POLICY IF EXISTS "Users can update their own quiz sessions" ON quiz_sessions;

-- Add new permissive RLS policies for server-side (service role) access.
-- The service role key already bypasses RLS, so these policies are for
-- any future client-side reads (e.g., result page fetching by session ID).
CREATE POLICY "Anyone can read quiz sessions by id"
  ON quiz_sessions FOR SELECT
  USING (true);
