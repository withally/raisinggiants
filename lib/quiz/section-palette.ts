/**
 * Maps quiz section IDs to their pastel palette colors.
 * Matches the landing page visual direction (VISUAL-DIRECTION.md).
 */

export interface SectionColor {
  light: string
  dark: string
}

const sectionPalette: Record<string, SectionColor> = {
  'about-you':              { light: '#FEF4AC', dark: '#3D3B1A' },  // butter
  'your-upbringing':        { light: '#B2DECD', dark: '#1A4A3A' },  // mint
  'your-parents-patterns':  { light: '#EEC0DA', dark: '#4A1942' },  // pink
  'your-background':        { light: '#B3D5DE', dark: '#002833' },  // blue
}

const fallback: SectionColor = { light: '#B2DECD', dark: '#1A4A3A' }

export function getSectionColor(sectionId: string): SectionColor {
  return sectionPalette[sectionId] ?? fallback
}
