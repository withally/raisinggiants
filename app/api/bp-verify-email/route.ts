import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

interface VerifyEmailBody {
  sessionId: string;
  email: string;
}

/**
 * POST /api/bp-verify-email
 *
 * Verifies that the provided email matches the email stored against a
 * Blueprint quiz session. Used as the access control gate on the result page.
 *
 * Body: { sessionId: string, email: string }
 *
 * Responses:
 * - 200 { verified: true }  — email matches
 * - 403 { verified: false } — email does not match
 * - 404 { error: "Session not found" } — session does not exist
 * - 400 { error: "Missing required fields" } — bad request
 *
 * IMPORTANT: email is never placed in the URL (POST body only).
 */
export async function POST(request: Request) {
  let body: Partial<VerifyEmailBody>;

  try {
    body = (await request.json()) as Partial<VerifyEmailBody>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { sessionId, email } = body;

  if (!sessionId || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("bp_quiz_sessions")
    .select("email")
    .eq("id", sessionId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  // Case-insensitive, trimmed comparison
  const storedEmail = (data.email as string).toLowerCase().trim();
  const providedEmail = email.toLowerCase().trim();

  if (storedEmail !== providedEmail) {
    return NextResponse.json({ verified: false }, { status: 403 });
  }

  return NextResponse.json({ verified: true });
}
