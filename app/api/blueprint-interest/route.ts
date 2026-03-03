import { type NextRequest, NextResponse } from "next/server";
import { sendBlueprintConfirmation } from "@/lib/email/send";
import { createAdminClient } from "@/lib/supabase/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_SOURCES = ["result-page", "blueprint-page", "sticky-bar"] as const;
type Source = (typeof VALID_SOURCES)[number];

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Request body must be an object" }, { status: 400 });
  }

  const { email, source, utm_source, utm_medium, utm_campaign, utm_content, utm_term } =
    body as Record<string, unknown>;

  // Validate email
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
  }

  // Validate source (default to 'result-page' if omitted)
  const resolvedSource: Source =
    typeof source === "string" && VALID_SOURCES.includes(source as Source)
      ? (source as Source)
      : "result-page";

  try {
    const supabase = createAdminClient();
    const normalizedEmail = email.trim().toLowerCase();

    const insertPayload: Record<string, unknown> = {
      email: normalizedEmail,
      source: resolvedSource,
    };

    // UTM columns are added by migration 20260302100000 — include only if present
    for (const [key, value] of Object.entries({
      utm_source, utm_medium, utm_campaign, utm_content, utm_term,
    })) {
      if (value) insertPayload[key] = String(value);
    }

    const { data, error } = await supabase
      .from("blueprint_interest_emails")
      .insert(insertPayload)
      .select("id")
      .maybeSingle();

    if (error) {
      // Unique constraint violation — duplicate email, silently succeed
      if (error.code === "23505") {
        return NextResponse.json({ success: true }, { status: 200 });
      }
      // Column missing (UTM migration not applied) — retry without UTM fields
      if (error.message?.includes("column") && error.message?.includes("schema cache")) {
        console.warn("[blueprint-interest] UTM columns missing — retrying without UTM");
        const { error: retryErr } = await supabase
          .from("blueprint_interest_emails")
          .insert({ email: normalizedEmail, source: resolvedSource })
          .select("id")
          .maybeSingle();
        if (retryErr && retryErr.code !== "23505") {
          console.error("[blueprint-interest] Retry error:", retryErr.message);
          return NextResponse.json({ error: "Failed to save interest" }, { status: 500 });
        }
        return NextResponse.json({ success: true }, { status: 200 });
      }
      // Table doesn't exist yet — log but don't block the user
      if (error.code === "PGRST205") {
        console.warn("[blueprint-interest] Table not found — migration pending");
        return NextResponse.json({ success: true }, { status: 200 });
      }
      console.error("[blueprint-interest] Supabase error:", error.code, error.message);
      return NextResponse.json({ error: "Failed to save interest" }, { status: 500 });
    }

    // Only send confirmation email on genuine new inserts
    if (data) {
      sendBlueprintConfirmation(normalizedEmail).catch((err) =>
        console.error("[blueprint-interest] Confirmation email failed:", err),
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[blueprint-interest] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
