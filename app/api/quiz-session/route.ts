import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

// POST — create a new quiz session with email
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("quiz_sessions")
      .insert({ email, status: "in_progress" })
      .select("id")
      .single();

    if (error) {
      console.error("Failed to create quiz session:", error.message, error.code, error.details);
      return NextResponse.json(
        { error: "Failed to create session", detail: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ sessionId: data.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// PATCH — complete a quiz session with results
export async function PATCH(request: Request) {
  try {
    const { sessionId, answers, dimensionScores, archetypeId, culturalBackground } =
      await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID is required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error } = await supabase
      .from("quiz_sessions")
      .update({
        status: "completed",
        answers,
        dimension_scores: dimensionScores,
        archetype_id: archetypeId,
        cultural_background: culturalBackground,
        completed_at: new Date().toISOString(),
      })
      .eq("id", sessionId);

    if (error) {
      console.error("Failed to complete quiz session:", error);
      return NextResponse.json({ error: "Failed to save results" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
