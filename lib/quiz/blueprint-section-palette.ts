/**
 * Maps Blueprint quiz section IDs to their teal/green palette colors.
 * Distinct from Mirror's plum/amber/mint palette to signal a different product.
 */

import type { SectionColor } from "@/lib/quiz/section-palette";

const blueprintSectionPalette: Record<string, SectionColor> = {
  "daily-moments": { light: "#C4EBE0", dark: "#0D4035" }, // soft teal
  "discipline-boundaries": { light: "#B2E5D4", dark: "#1A4A38" }, // seafoam green
  "emotional-connection": { light: "#CAF0E6", dark: "#0F3D30" }, // pale aqua
  "values-legacy": { light: "#BDE8DC", dark: "#164438" }, // sage teal
};

const blueprintFallback: SectionColor = { light: "#C4EBE0", dark: "#0D4035" };

export function getBlueprintSectionColor(sectionId: string): SectionColor {
  return blueprintSectionPalette[sectionId] ?? blueprintFallback;
}
