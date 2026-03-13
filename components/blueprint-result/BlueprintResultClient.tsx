"use client";

import { useState } from "react";
import type { Archetype, CulturalOverlay } from "@/lib/archetypes/types";
import { BlueprintArchetypeReveal } from "./BlueprintArchetypeReveal";
import { BlueprintCulturalSection } from "./BlueprintCulturalSection";
import { BlueprintEmailGate } from "./BlueprintEmailGate";
import { BlueprintPatternsSection } from "./BlueprintPatternsSection";
import { BlueprintWatchoutsSection } from "./BlueprintWatchoutsSection";
import { BridgeComparisonSection } from "./BridgeComparisonSection";

interface BlueprintResultClientProps {
  sessionId: string;
  archetype: Archetype;
  culturalOverlay: CulturalOverlay | null;
  culturalDisplayName: string | null;
  mirrorArchetype: Archetype | null;
}

export function BlueprintResultClient({
  sessionId,
  archetype,
  culturalOverlay,
  culturalDisplayName,
  mirrorArchetype,
}: BlueprintResultClientProps) {
  const [isVerified, setIsVerified] = useState(false);

  if (!isVerified) {
    return <BlueprintEmailGate sessionId={sessionId} onVerified={() => setIsVerified(true)} />;
  }

  return (
    <main className="bg-[#FAFAF7]">
      {/* Section 1: Archetype hero reveal */}
      <BlueprintArchetypeReveal archetype={archetype} />

      {/* Section 2: Your parenting patterns */}
      <BlueprintPatternsSection patterns={archetype.foundationalPatterns} />

      {/* Section 3: Blind spots */}
      <BlueprintWatchoutsSection watchouts={archetype.watchouts} />

      {/* Section 4: Cultural lens — conditional on quiz selection */}
      {culturalOverlay && culturalDisplayName && (
        <BlueprintCulturalSection overlay={culturalOverlay} displayName={culturalDisplayName} />
      )}

      {/* Section 5: Bridge comparison — conditional on having Mirror result */}
      {mirrorArchetype && (
        <BridgeComparisonSection mirrorArchetype={mirrorArchetype} blueprintArchetype={archetype} />
      )}
    </main>
  );
}
