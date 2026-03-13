/**
 * Maps Blueprint quiz section IDs to their teal/green palette colors.
 * Distinct from Mirror's plum/amber/mint palette to signal a different product.
 */

import type { SectionColor } from "@/lib/quiz/section-palette";

const blueprintSectionPalette: Record<string, SectionColor> = {
  "daily-moments": { light: "#FEF4AC", dark: "#3D3B1A" }, // butter
  "discipline-boundaries": { light: "#EEC0DA", dark: "#4A1942" }, // pink
  "emotional-connection": { light: "#B2DECD", dark: "#1A4A3A" }, // mint
  "values-legacy": { light: "#B3D5DE", dark: "#002833" }, // blue
};

const blueprintFallback: SectionColor = { light: "#B2DECD", dark: "#1A4A3A" };

export function getBlueprintSectionColor(sectionId: string): SectionColor {
  return blueprintSectionPalette[sectionId] ?? blueprintFallback;
}
