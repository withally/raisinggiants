/**
 * lib/result/blueprint-helpers.ts
 *
 * Data helpers for the Blueprint result page.
 *
 * Provides:
 * - fetchBlueprintSession: fetches a Blueprint session row from bp_quiz_sessions by UUID
 * - fetchMirrorSessionByEmail: fetches a completed Mirror session from quiz_sessions by email
 * - Re-exports CULTURAL_DISPLAY_NAMES and getCulturalOverlay from helpers.ts
 *
 * Note: Both fetchers use the service_role client to bypass RLS.
 * The session UUID is the access credential for Blueprint; email match enables bridge comparison.
 */

import { createAdminClient } from "../supabase/server";

export { CULTURAL_DISPLAY_NAMES, getCulturalOverlay } from "./helpers";

// ---------------------------------------------------------------------------
// BlueprintSessionRow
// ---------------------------------------------------------------------------

export interface BlueprintSessionRow {
  id: string;
  email: string;
  parent_status: string;
  status: string;
  archetype_id: string | null;
  cultural_background: string | null;
  dimension_scores: Record<string, number> | null;
  answers: Record<string, unknown> | null;
}

/**
 * Fetches a single bp_quiz_sessions row by session UUID using the service_role client.
 *
 * The service_role client bypasses RLS — intentional. The session UUID
 * is the access credential; anyone who has it may request access (still
 * gated by the email verification step in the result page).
 *
 * Returns null if the row does not exist or a Supabase error occurs.
 */
export async function fetchBlueprintSession(
  sessionId: string,
): Promise<BlueprintSessionRow | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("bp_quiz_sessions")
    .select(
      "id, email, parent_status, status, archetype_id, cultural_background, dimension_scores, answers",
    )
    .eq("id", sessionId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as BlueprintSessionRow;
}

// ---------------------------------------------------------------------------
// MirrorSessionRow (minimal — only what bridge comparison needs)
// ---------------------------------------------------------------------------

export interface MirrorSessionRow {
  archetype_id: string;
  cultural_background: string | null;
}

/**
 * Fetches the most recent completed quiz_sessions row for a given email.
 *
 * Used to enable the bridge comparison section: if a user has also completed
 * the Mirror quiz with the same email, we can show "What you inherited vs.
 * how you parent".
 *
 * Returns null if no completed Mirror session exists for this email.
 */
export async function fetchMirrorSessionByEmail(email: string): Promise<MirrorSessionRow | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("archetype_id, cultural_background")
    .eq("email", email.toLowerCase().trim())
    .eq("status", "completed")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return null;
  }

  return data as MirrorSessionRow;
}
