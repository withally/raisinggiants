import type { Metadata } from "next";
import Link from "next/link";
import { BlueprintResultClient } from "@/components/blueprint-result/BlueprintResultClient";
import { Footer } from "@/components/Footer";
import { ARCHETYPES } from "@/lib/archetypes/archetypes";
import {
  CULTURAL_DISPLAY_NAMES,
  fetchBlueprintSession,
  fetchMirrorSessionByEmail,
  getCulturalOverlay,
} from "@/lib/result/blueprint-helpers";

export const metadata: Metadata = {
  title: "Your Blueprint Result",
  description: "Your personalized parenting archetype — patterns, blind spots, and insights.",
  openGraph: {
    title: "Your Blueprint Result | Kin",
    description: "Your personalized parenting archetype — patterns, blind spots, and insights.",
    url: "https://meetkin.com/blueprint/result",
    siteName: "Kin",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630 }],
  },
};

// ---------------------------------------------------------------------------
// Error state component
// ---------------------------------------------------------------------------

function BlueprintResultErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#FAFAF7] px-6">
      <div className="max-w-lg text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#2D8B7A] font-medium mb-4">
          The Blueprint
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#1A1008] mb-6 leading-tight">
          {message}
        </h1>
        <p className="text-[#8A7A66] leading-relaxed mb-8">
          Take the Blueprint quiz to discover your own parenting archetype — grounded in research
          from the world&apos;s leading parenting experts.
        </p>
        <Link
          href="/blueprint/quiz"
          className="inline-block rounded-full bg-[#0F5845] px-8 py-3 text-white font-semibold hover:bg-[#0D4A3A] transition-colors"
        >
          Take the Blueprint quiz
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Result page — async Server Component
// ---------------------------------------------------------------------------

export default async function BlueprintResultPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;

  // Guard: no session param
  if (!session) {
    return <BlueprintResultErrorState message="Your result link appears to be missing." />;
  }

  // Fetch the Blueprint session from Supabase
  const row = await fetchBlueprintSession(session);

  // Guard: session not found or not completed
  if (!row || row.status !== "completed") {
    return (
      <BlueprintResultErrorState message="We couldn't find a completed result for that session." />
    );
  }

  // Guard: no archetype assigned
  if (!row.archetype_id) {
    return <BlueprintResultErrorState message="Something went wrong loading your result." />;
  }

  // Look up the Blueprint archetype
  const archetype = ARCHETYPES.find((a) => a.id === row.archetype_id);
  if (!archetype) {
    return <BlueprintResultErrorState message="Something went wrong loading your result." />;
  }

  // Resolve cultural overlay (null for "other" or unrecognised backgrounds)
  const culturalOverlay = getCulturalOverlay(archetype, row.cultural_background);
  const culturalDisplayName = row.cultural_background
    ? (CULTURAL_DISPLAY_NAMES[row.cultural_background] ?? null)
    : null;

  // Attempt to fetch Mirror session by email for bridge comparison
  const mirrorRow = await fetchMirrorSessionByEmail(row.email);
  const mirrorArchetype = mirrorRow
    ? (ARCHETYPES.find((a) => a.id === mirrorRow.archetype_id) ?? null)
    : null;

  return (
    <>
      <BlueprintResultClient
        sessionId={session}
        archetype={archetype}
        culturalOverlay={culturalOverlay}
        culturalDisplayName={culturalDisplayName}
        mirrorArchetype={mirrorArchetype}
      />
      <Footer />
    </>
  );
}
