/**
 * lib/result/helpers.ts
 *
 * Data helpers for the Mirror result page.
 *
 * Provides:
 * - CULTURAL_DISPLAY_NAMES: maps quiz cultural_background option IDs to display section headers
 * - CULTURAL_CONTEXT_PREFIXES: maps option IDs to the culturalContext string prefix used in cultural-overlays.ts
 * - getCulturalOverlay: finds the matching CulturalOverlay from an archetype given a cultural background
 * - fetchQuizSession: fetches a completed quiz session row from Supabase by session UUID
 *
 * Note: fetchQuizSession uses the service_role client to bypass RLS.
 * The session UUID itself is the access credential — no additional auth needed.
 */

import type { Archetype, CulturalOverlay } from "../archetypes/types";
import { createAdminClient } from "../supabase/server";

// ---------------------------------------------------------------------------
// Cultural display names
// Maps the quiz option ID stored in quiz_sessions.cultural_background
// to the section header displayed in the result page.
// ---------------------------------------------------------------------------

export const CULTURAL_DISPLAY_NAMES: Record<string, string> = {
  "east-asian": "The East Asian Lens",
  "south-asian": "The South Asian Lens",
  "latin-american": "The Latino/Hispanic Lens",
  "sub-saharan": "The Sub-Saharan African Lens",
  western: "The Western Lens",
};

// ---------------------------------------------------------------------------
// Cultural context prefixes
// Maps quiz option IDs to the prefix of the culturalContext string
// used in cultural-overlays.ts constants (e.g., CTX_EAST_ASIAN = "East Asian ...").
// Used by getCulturalOverlay to match the correct overlay via startsWith().
// ---------------------------------------------------------------------------

export const CULTURAL_CONTEXT_PREFIXES: Record<string, string> = {
  "east-asian": "East Asian",
  "south-asian": "South Asian",
  "latin-american": "Latin American",
  "sub-saharan": "Sub-Saharan",
  western: "Western",
};

// ---------------------------------------------------------------------------
// getCulturalOverlay
// ---------------------------------------------------------------------------

/**
 * Finds the matching CulturalOverlay from an archetype's culturalOverlays array
 * based on the user's cultural_background selection from the quiz.
 *
 * Returns null if:
 * - culturalBackground is null or undefined
 * - culturalBackground is "other" (no overlay for catch-all)
 * - culturalBackground is not in CULTURAL_CONTEXT_PREFIXES
 * - No matching overlay found in the archetype (should not happen with valid data)
 */
export function getCulturalOverlay(
  archetype: Archetype,
  culturalBackground: string | null,
): CulturalOverlay | null {
  if (!culturalBackground || culturalBackground === "other") {
    return null;
  }

  const prefix = CULTURAL_CONTEXT_PREFIXES[culturalBackground];
  if (!prefix) {
    return null;
  }

  return (
    archetype.culturalOverlays.find((overlay) => overlay.culturalContext.startsWith(prefix)) ?? null
  );
}

// ---------------------------------------------------------------------------
// fetchQuizSession
// ---------------------------------------------------------------------------

export interface QuizSessionRow {
  archetype_id: string;
  cultural_background: string | null;
  email: string | null;
  status: string;
}

/**
 * Fetches a single quiz_sessions row by session UUID using the service_role client.
 *
 * The service_role client bypasses RLS — this is intentional. The session UUID
 * is the access credential; anyone who has it may view the result.
 *
 * Returns null if the row does not exist or if a Supabase error occurs.
 */
export async function fetchQuizSession(sessionId: string): Promise<QuizSessionRow | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("quiz_sessions")
    .select("archetype_id, cultural_background, email, status")
    .eq("id", sessionId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as QuizSessionRow;
}
