import { type NextRequest, NextResponse } from "next/server";
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

  const { email, source } = body as Record<string, unknown>;

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

    const { error } = await supabase
      .from("blueprint_interest_emails")
      .upsert(
        { email: email.trim().toLowerCase(), source: resolvedSource },
        { onConflict: "email", ignoreDuplicates: true },
      );

    if (error) {
      console.error("[blueprint-interest] Supabase error:", error.message);
      return NextResponse.json({ error: "Failed to save interest" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[blueprint-interest] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
