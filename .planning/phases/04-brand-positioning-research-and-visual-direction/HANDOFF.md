# Context Handoff — 06-04/06-05 Rewrite

**Date:** 2026-02-28
**Status:** Old 06-04 and 06-05 DELETED. New versions NOT YET WRITTEN. Resume here.

---

## What Happened

1. Implemented a "visual refresh" of the landing page (hand-drawn SVGs, grain texture, PP Pangaia multi-weight, organic easing) based on 2026 trend research
2. User reviewed — said it's "a bit better" but "far too stuck in the old ways" and we aren't using the new trend research well enough
3. Extracted the 2026 trend research from a previous session transcript into: `2026-TREND-RESEARCH-EXTRACTED.md` (this file is complete and preserved)
4. Wrote a diagnosis doc (`LANDING-PAGE-VISUAL-REFRESH-RESEARCH.md`) — BUT it was anchored to the OLD 06-04 which contradicted the trend research. User correctly identified this conflict.
5. **Deleted:** `04-04-visual-direction-brief.md`, `04-05-rebrand-execution-plan.md`, `04-04-SUMMARY.md`, `04-05-SUMMARY.md`, `LANDING-PAGE-VISUAL-REFRESH-RESEARCH.md`
6. Context ran out before rewriting 06-04 and 06-05.

---

## What Needs to Happen Next

### 1. Rewrite 06-04 (Visual Direction Brief v4)

The OLD 06-04 (v3) had a "Calm/Headspace/Oura clinical-digital" orientation that CONFLICTS with the trend research the user approved. The new 06-04 must SYNTHESIZE:

**From the brand positioning (keep):**
- Kin brand territory: "digital tools for parents who want to understand themselves"
- Multi-product system (The Mirror, The Blueprint, The Partner Match)

**From the 2026 trend research (integrate — this is the NEW input):**
- **#5 Neo-Minimalism** = structural backbone. Clean layouts, ONE bold typographic moment per section. Type IS the composition.
- **#6 Emotion-Led** = the soul. Hand-drawn details, organic imperfections, visible craft. The human factor as differentiator from AI-polished design.
- **#9 Raw Authenticity** = the texture. Intentional imperfection. "Someone made this with care, and you can tell." NOT rough — careful craft.
- **#7 Vibrant Color** = reinterpreted within existing palette. Gradient layering (teal-to-darker-teal), color as emotional signal.
- **#2 Brutalist** = whisper only. Deliberate asymmetry in select layouts.

**The formula:** "#5 + #6, seasoned with #9"

**The target feel (user-approved, verbatim):**
> "A premium product that clearly had a human behind it. Not the cold perfection of a fintech dashboard, not the rough chaos of a zine. Something closer to a beautifully designed book that happens to live on the web — intentional, warm, spacious, with moments that make you slow down."

**KEY RESOLUTION — the old 06-04 said "NOT hand-drawn, NOT analog, NOT craft" but the trend research says the OPPOSITE.** The new 06-04 must resolve this: Kin is a premium digital product that uses visible human craft (hand-drawn details, organic textures, imperfect letterforms) as DIFFERENTIATORS from AI-polished sameness. The warmth comes from BOTH content AND visible craft in the interface. This is not School of Life "loose analog" — it's precise, intentional craft that happens to show the human hand.

**Typography decision:** PP Pangaia is already loaded and working. It's a geometric-humanist display face with warmth and personality. The old 06-04 recommended switching to a high-contrast serif (Canela/DM Serif Display) — reconsider this in light of #6 Emotion-Led (humanized letterforms). PP Pangaia may actually be MORE aligned with the trend direction. Make a clear decision either way.

### 2. Rewrite 06-05 (Execution Plan)

Scoped to LANDING PAGE ONLY. Should be developer-ready with:
- Specific file changes based on the new visual direction
- What to keep from the current implementation vs. what to change
- Current codebase state (PP Pangaia multi-weight already loaded, hand-drawn.tsx exists, grain class exists, scroll-reveal updated, all section components partially modified)
- Clear phases with verification steps

---

## Key Files to Read

- `2026-TREND-RESEARCH-EXTRACTED.md` — the full trend research (READ THIS FIRST)
- `04-03-positioning-narrative.md` — brand positioning (locked, don't change)
- All current landing components in `components/landing/` — they have partial modifications from this session
- `app/globals.css` — has grain, breathe, organic easing already added
- `app/layout.tsx` — PP Pangaia multi-weight already loaded

---

## Git State

Branch: master (uncommitted changes from the visual refresh implementation)
Modified files: layout.tsx, globals.css, scroll-reveal.tsx, HeroSection.tsx, SocialProof.tsx, ArchetypePreview.tsx, KOLCredibility.tsx, KOLNarrative.tsx, FAQ.tsx, SecondaryHero.tsx, Footer.tsx
New files: components/ui/hand-drawn.tsx
Deleted files: 04-04-visual-direction-brief.md, 04-05-rebrand-execution-plan.md, 04-04-SUMMARY.md, 04-05-SUMMARY.md
