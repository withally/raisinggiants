---
phase: quick-1
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - components/landing/illustrations/MirrorIllustration.tsx
  - components/landing/illustrations/ArchetypeIcons.tsx
  - components/landing/HeroWithIllustration.tsx
  - components/landing/ArchetypeShowcase.tsx
  - components/landing/SecondaryHero.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "Hero mirror illustration feels rich, detailed, and emotionally evocative at first glance"
    - "Archetype icons have enough visual weight and detail to feel like premium editorial illustrations, not placeholder sketches"
    - "The landing page has a cohesive visual identity with consistent illustration style across all illustrated sections"
  artifacts:
    - path: "components/landing/illustrations/MirrorIllustration.tsx"
      provides: "Enhanced hero mirror illustration with richer detail"
    - path: "components/landing/illustrations/ArchetypeIcons.tsx"
      provides: "Refined archetype icons with improved visual weight"
    - path: "components/landing/HeroWithIllustration.tsx"
      provides: "Hero section with improved illustration presentation"
    - path: "components/landing/ArchetypeShowcase.tsx"
      provides: "Showcase grid with better icon sizing and visual hierarchy"
    - path: "components/landing/SecondaryHero.tsx"
      provides: "Bottom CTA section with ambient decorative illustration"
  key_links:
    - from: "components/landing/HeroWithIllustration.tsx"
      to: "components/landing/illustrations/MirrorIllustration.tsx"
      via: "import MirrorIllustration"
      pattern: "MirrorIllustration"
    - from: "components/landing/ArchetypeShowcase.tsx"
      to: "components/landing/illustrations/ArchetypeIcons.tsx"
      via: "import ICON_MAP"
      pattern: "ICON_MAP\\[archetype\\.id\\]"
---

<objective>
Elevate the branding and visual quality of the Raising Giants landing page illustrations to match the editorial, warm, premium aesthetic of the brand.

Purpose: The current SVG illustrations are functional but feel somewhat thin and sketch-like at larger sizes. The hero mirror illustration, archetype icons, and secondary sections need richer visual detail, better compositional weight, and more evocative storytelling to create the emotional resonance the brand demands. The page should feel like a premium editorial publication, not a tech product.

Output: Enhanced SVG illustrations with richer cross-hatching, warmer visual details, improved compositional balance, and a decorative illustration element in the SecondaryHero section to complete the visual journey.
</objective>

<execution_context>
@/Users/yikfaiivanli/.claude/get-shit-done/workflows/execute-plan.md
@/Users/yikfaiivanli/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@components/landing/illustrations/MirrorIllustration.tsx
@components/landing/illustrations/ArchetypeIcons.tsx
@components/landing/HeroWithIllustration.tsx
@components/landing/ArchetypeShowcase.tsx
@components/landing/SecondaryHero.tsx
@components/landing/portraits/SketchPortrait.tsx (style reference — KOL portraits are the quality bar)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Enrich MirrorIllustration and refine Hero presentation</name>
  <files>
    components/landing/illustrations/MirrorIllustration.tsx
    components/landing/HeroWithIllustration.tsx
  </files>
  <action>
Enhance the MirrorIllustration SVG to feel like a premium editorial ink illustration:

**MirrorIllustration.tsx improvements:**
1. **Richer mirror frame** — Add more ornate detail to the frame: filigree curves at the top arch, decorative corner flourishes at all 4 inner corners, and more pronounced frame molding lines (double/triple strokes at varying opacities)
2. **More expressive figures** — Give the primary figure slightly more body language (one hand touching the mirror glass, slight head tilt). Add hair suggestion (a few flowing lines). Make the parent silhouette slightly more detailed with a suggestion of an embrace posture
3. **Denser cross-hatching** — Add 2-3 more cross-hatch clusters in the mirror surface corners and along the frame edges to create more visual depth. Use the SketchPortrait.tsx style as reference (0.4-0.5 strokeWidth, 0.12-0.15 opacity)
4. **Warm ambient details** — Add 3-4 more atmospheric dust motes / light particles scattered around the mirror. Add a subtle light reflection streak across the glass surface (thin diagonal line, very low opacity ~0.1)
5. **Enhanced stand** — Add wood grain texture to the stand legs (2-3 parallel thin lines along each leg). Add a small decorative curl at each foot

**HeroWithIllustration.tsx improvements:**
1. Change illustration sizing from `w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96` to `w-72 h-72 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem]` — illustration needs more visual presence on desktop
2. Add a subtle amber-200/30 circular glow behind the illustration (`absolute rounded-full blur-2xl`) to give it warmth against the amber-50 background
3. Remove the ScrollReveal wrapper from the illustration — the hero illustration should be visible immediately, not delayed

Keep all existing `aria-label` attributes and the `currentColor` stroke pattern intact. Do NOT change the viewBox dimensions (240x320).
  </action>
  <verify>
    <automated>cd /Users/yikfaiivanli/Projects/raisinggiants && npx next build 2>&1 | tail -5</automated>
    <manual>Visit localhost:3000 — hero illustration should feel noticeably richer, larger on desktop, with warm glow behind it</manual>
  </verify>
  <done>Hero mirror illustration has visibly richer detail (frame ornaments, cross-hatching, ambient particles, wood grain on stand), is sized larger on desktop (28rem), has an amber glow behind it, and appears without scroll-reveal delay</done>
</task>

<task type="auto">
  <name>Task 2: Upgrade ArchetypeIcons visual weight and Showcase layout</name>
  <files>
    components/landing/illustrations/ArchetypeIcons.tsx
    components/landing/ArchetypeShowcase.tsx
  </files>
  <action>
Enhance the 9 archetype icon SVGs to feel more premium and add visual refinements to the showcase section.

**ArchetypeIcons.tsx — apply these improvements consistently to ALL 9 icons:**
1. **Increase primary stroke weight** from 1.8 to 2.0 for main outlines — gives more visual confidence at display size
2. **Add 1-2 more cross-hatch clusters** per icon in areas with visual "flatness" — match the density in SketchPortrait.tsx portraits. Each cluster: 2-3 parallel lines, strokeWidth 0.4-0.5, opacity 0.12-0.18
3. **Add 2-3 ambient detail dots** per icon (fill="currentColor", stroke="none", r=0.6-1.0, opacity 0.1-0.2) in areas that feel empty — creates atmospheric texture
4. **Enhance symbolic focal points** — make the key symbol in each icon slightly more detailed:
   - SteadyAnchor: add a small rope coil at the anchor ring
   - FierceGuardian: add 2 more radiating vigilance lines from the eye
   - GentleNurturer: add a tiny water drop on one leaf
   - IntentionalGuide: add 2 more path texture dots along the winding path
   - ResilientStriver: add 2 more small crack branches in the stone
   - StructuredMentor: add diagonal brace lines in 2 scaffold cells
   - OpenHeartedLearner: add subtle heartbeat line near the heart
   - DevotedChampion: add 2 more flame sparkle dots
   - CollaborativeAlly: add 1-2 more shared idea dots in the overlap

**ArchetypeShowcase.tsx improvements:**
1. Increase icon size from `w-20 h-20` to `w-24 h-24` — icons need more room to breathe at current card size
2. Add `mb-4` (from mb-3) below the icon for better vertical rhythm
3. Add a very subtle bg-gradient to each card on hover: change `hover:bg-amber-50/40` to `hover:bg-gradient-to-b hover:from-amber-50/60 hover:to-amber-50/20` for a more premium hover state

Keep all `aria-label` attributes intact. Do NOT change the viewBox (120x120) or the svgProps shared config.
  </action>
  <verify>
    <automated>cd /Users/yikfaiivanli/Projects/raisinggiants && npx next build 2>&1 | tail -5</automated>
    <manual>Visit localhost:3000 — archetype grid icons should feel noticeably more detailed and weighty, with better spacing in cards</manual>
  </verify>
  <done>All 9 archetype icons have enhanced stroke weight, additional cross-hatching, ambient dots, and enriched focal point details. Showcase cards display icons at 24x24 with improved spacing and a gradient hover state.</done>
</task>

<task type="auto">
  <name>Task 3: Add decorative illustration to SecondaryHero closing CTA</name>
  <files>components/landing/SecondaryHero.tsx</files>
  <action>
Add a subtle decorative SVG illustration to the SecondaryHero section (the dark closing CTA) to create visual bookending with the hero.

**Add an inline SVG illustration** — a simplified, abstract reflection motif:
- Two abstract face profiles facing each other (parent and child echoing), rendered in thin amber/stone strokes
- Place it centered above the headline, scaled to about w-32 h-20 on mobile, w-40 h-24 on desktop
- Use `text-amber-400/30` as the stroke color (very subtle against dark bg)
- Style: minimal editorial line art matching the cross-hatch aesthetic — NOT detailed, just evocative
- The SVG should have: two profile outlines (nose, forehead, chin lines), a few wave lines flowing between them (matching the "inherited patterns" motif from MirrorIllustration), and 2-3 atmospheric dots

**SVG specifics:**
- viewBox="0 0 200 100"
- strokeLinecap="round", strokeLinejoin="round"
- Primary stroke widths: 1.5 for profiles, 0.8 for waves, 0.5 for atmospheric detail
- Opacities: profiles at 0.6, waves at 0.3, dots at 0.15
- aria-hidden="true" (decorative only)

Place the SVG in a `<div className="flex justify-center mb-6">` wrapper above the existing eyebrow text ("Your starting point").

Also add a second subtle decorative element: a thin horizontal line with a small diamond center below the CTA button text ("No account needed..."), using `border-t border-amber-800/20` with a `<div className="w-2 h-2 rotate-45 bg-amber-700/20 mx-auto -mt-1">` diamond, wrapped in a `mt-6` container. This creates a visual "end mark" for the page before the footer.
  </action>
  <verify>
    <automated>cd /Users/yikfaiivanli/Projects/raisinggiants && npx next build 2>&1 | tail -5</automated>
    <manual>Visit localhost:3000 — scroll to bottom CTA section. Should see a subtle abstract reflection illustration above headline and an editorial end-mark below the CTA</manual>
  </verify>
  <done>SecondaryHero has a decorative abstract reflection SVG above the headline (two profiles with wave patterns, amber-400/30 strokes) and an editorial end-mark diamond divider below the CTA text, creating visual bookending with the hero illustration</done>
</task>

</tasks>

<verification>
- `npx next build` completes without errors
- All SVG components render without React warnings (no missing keys, no invalid SVG attributes)
- Landing page visual hierarchy: Hero illustration commands attention -> archetype grid feels premium -> closing CTA has visual warmth
- All existing aria-labels and accessibility attributes preserved
- No layout shift or horizontal overflow on mobile (375px)
</verification>

<success_criteria>
- Hero MirrorIllustration is visibly richer with ornate frame details, expressive figures, denser cross-hatching, and ambient particles
- All 9 archetype icons have enhanced visual weight with thicker strokes, more texture, and enriched focal points
- SecondaryHero has a decorative illustration creating visual bookending with the hero
- Build passes, no regressions, responsive layout intact
</success_criteria>

<output>
After completion, create `.planning/quick/1-improve-branding-and-visual-quality-of-l/1-SUMMARY.md`
</output>
