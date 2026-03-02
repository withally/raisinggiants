import type { Metadata } from "next";
import Link from "next/link";
import { ArchetypeReveal } from "@/components/result/ArchetypeReveal";
import { BlueprintCTA } from "@/components/result/BlueprintCTA";
import { CulturalSection } from "@/components/result/CulturalSection";
import { FoundationalPatternsSection } from "@/components/result/FoundationalPatternsSection";
import { ResultPageClient } from "@/components/result/ResultPageClient";
import { WatchoutsSection } from "@/components/result/WatchoutsSection";

import { ARCHETYPES } from "@/lib/archetypes/archetypes";
import { CULTURAL_DISPLAY_NAMES, fetchQuizSession, getCulturalOverlay } from "@/lib/result/helpers";

export const metadata: Metadata = {
  title: "Your Result | Kin — The Mirror",
  description: "Discover the parenting patterns you inherited — your personalised Mirror result.",
};

// ---------------------------------------------------------------------------
// Error state component
// ---------------------------------------------------------------------------

function ResultErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#F5F4F2] px-6">
      <div className="max-w-lg text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-[#8A7A66] font-medium mb-4">
          The Mirror
        </p>
        <h1
          className="text-3xl sm:text-4xl font-semibold text-[#1A1008] mb-6 leading-tight"
        >
          {message}
        </h1>
        <p className="text-[#8A7A66] leading-relaxed mb-8">
          Take the quiz to discover the parenting archetype that shaped you — the patterns you
          inherited, grounded in research from the world&apos;s leading parenting experts.
        </p>
        <Link
          href="/quiz"
          className="inline-block rounded-full bg-[#0D3D3A] px-8 py-3 text-white font-semibold hover:bg-[#0F4F4B] transition-colors"
        >
          Take the quiz
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Result page — async Server Component
// ---------------------------------------------------------------------------

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;

  // Guard: no session param
  if (!session) {
    return <ResultErrorState message="Your result link appears to be missing." />;
  }

  // Fetch the quiz session from Supabase
  const row = await fetchQuizSession(session);

  // Guard: session not found or not completed
  if (!row || row.status !== "completed") {
    return <ResultErrorState message="We couldn't find a completed result for that session." />;
  }

  // Look up the archetype
  const archetype = ARCHETYPES.find((a) => a.id === row.archetype_id);
  if (!archetype) {
    return <ResultErrorState message="Something went wrong loading your result." />;
  }

  // Resolve cultural overlay (null for "other" or unrecognised backgrounds)
  const culturalOverlay = getCulturalOverlay(archetype, row.cultural_background);
  const culturalDisplayName = row.cultural_background
    ? (CULTURAL_DISPLAY_NAMES[row.cultural_background] ?? null)
    : null;

  return (
    <ResultPageClient>
      <main className="bg-[#FAFAF7]">
        {/* Section 1: Archetype hero reveal */}
        <ArchetypeReveal archetype={archetype} />

        {/* Section 2: Foundational patterns — what you inherited */}
        <FoundationalPatternsSection patterns={archetype.foundationalPatterns} />

        {/* Section 3: Watchouts — what to watch for */}
        <WatchoutsSection watchouts={archetype.watchouts} />

        {/* Section 3b: Blueprint CTA — between Watchouts and Cultural */}
        <BlueprintCTA />

        {/* Section 4: Cultural lens — conditional on quiz selection */}
        {culturalOverlay && culturalDisplayName && (
          <CulturalSection overlay={culturalOverlay} displayName={culturalDisplayName} />
        )}
      </main>
    </ResultPageClient>
  );
}
