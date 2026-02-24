/**
 * lib/archetypes/archetypes.ts
 *
 * Complete parenting archetype definitions for the Raising Giants framework.
 *
 * 9 archetypes derived from the KOL synthesis and 11-dimension scoring space
 * (see .planning/phases/00-archetype-framework/kol-synthesis.md for the
 * research derivation; see lib/quiz/dimensions.ts for dimension definitions).
 *
 * Design constraints satisfied here:
 * - Warm, descriptive names referencing current parenting style — no clinical terms
 * - Every name passes the test: "Would a parent proudly share this as their result?"
 * - Each archetype has a shareable one-liner tagline (≤10 words)
 * - Content fields (foundationalPatterns, watchouts) populated in Plan 04
 * - Cultural overlays imported from cultural-overlays.ts (Plan 04)
 * - Every archetype pair differs by 3+ points on at least 2 dimensions
 *   (enforced and validated by validateArchetypeDistinctness — see bottom of file)
 *
 * Exports: ARCHETYPES, validateArchetypeDistinctness
 */

import type { Archetype, DimensionProfile } from './types';
import { DIMENSION_KEYS } from '../quiz/dimensions';
import { CULTURAL_OVERLAYS } from './cultural-overlays';

// ---------------------------------------------------------------------------
// Archetype dimension profile design rationale
// ---------------------------------------------------------------------------
//
// Dimensions (all scored 1-10):
//   emotional-warmth      — warmth / responsiveness axis (Baumrind, Gottman, PBDQ, Kennedy)
//   boundary-consistency  — structure / demandingness axis (Baumrind, Maccoby & Martin)
//   autonomy-support      — independence-scaffolding axis (PBDQ, Tsabary)
//   emotional-regulation  — Gottman coaching axis; self-regulation under stress (Kennedy)
//   protective-instinct   — PBDQ anxious intrusiveness axis
//   narrative-coherence   — Main AAI coherence; intergenerational integration
//   presence-attunement   — Tsabary/Siegel conscious vs. reactive axis (Gottman bidding)
//   repair-reconnection   — Kennedy/Gottman/Tronick rupture-repair capacity
//   role-integrity        — Jurkovic/van der Kolk parent-child role boundaries
//   reciprocity           — Grusec & Davidov/Duncan et al. bidirectional exchange
//   nonjudgmental-acceptance — Rohner IPARTheory/Kennedy unconditional positive regard
//
// Clinical pattern → archetype mapping:
//   Authoritative-adjacent (high W, high B, high ER, high NC, PA)  → The Steady Anchor
//   Protective/anxious-adjacent (high PI, high B, very low AS)     → The Fierce Guardian
//   Permissive-adjacent (high W, very high B-low, high PA, high AS) → The Gentle Nurturer
//   Scaffolding/conscious (very high AS, high PA, low PI)           → The Intentional Guide
//   Earned-secure/healing (maximal NC, high ER, high AS)            → The Resilient Striver
//   Structured/achievement (very low W, high B, high AS, low PA)    → The Structured Mentor
//   Emotionally attuned/still-integrating (high W+ER+PA, low NC)   → The Open-Hearted Learner
//   Conditional-warmth/championing (high W+B, low REC, low NJA)    → The Devoted Champion
//   Democratic/cooperative (very high REC+NJA, high AS, high NJA)   → The Collaborative Ally
//
// All 36 archetype pairs validated via validateArchetypeDistinctness:
//   Every pair differs by 3+ points on at least 2 dimensions. See validation
//   results in .planning/phases/00-archetype-framework/00-02-SUMMARY.md.
// ---------------------------------------------------------------------------

// Helper function to build dimension profiles from ordered values.
// Argument order matches DIMENSION_KEYS:
//   [emotional-warmth, boundary-consistency, autonomy-support, emotional-regulation,
//    protective-instinct, narrative-coherence, presence-attunement,
//    repair-reconnection, role-integrity, reciprocity, nonjudgmental-acceptance]
function profile(
  emotionalWarmth: number,
  boundaryConsistency: number,
  autonomySupport: number,
  emotionalRegulation: number,
  protectiveInstinct: number,
  narrativeCoherence: number,
  presenceAttunement: number,
  repairReconnection: number,
  roleIntegrity: number,
  reciprocity: number,
  nonjudgmentalAcceptance: number
): DimensionProfile {
  return {
    'emotional-warmth': emotionalWarmth,
    'boundary-consistency': boundaryConsistency,
    'autonomy-support': autonomySupport,
    'emotional-regulation': emotionalRegulation,
    'protective-instinct': protectiveInstinct,
    'narrative-coherence': narrativeCoherence,
    'presence-attunement': presenceAttunement,
    'repair-reconnection': repairReconnection,
    'role-integrity': roleIntegrity,
    'reciprocity': reciprocity,
    'nonjudgmental-acceptance': nonjudgmentalAcceptance,
  };
}

// ---------------------------------------------------------------------------
// Archetype 1: The Steady Anchor
// ---------------------------------------------------------------------------
// Clinical pattern: Authoritative — high warmth + consistent boundaries +
// emotional regulation + narrative coherence + presence. This is the
// "gold standard" profile from Baumrind (1967): high responsiveness AND
// high demandingness, with the self-awareness and narrative integration
// that makes it sustainable. Moderate-to-low protective instinct — protective
// but not anxious. Moderate autonomy support — structured but not rigid.
// Signature: calm, reliable, emotionally present, the "safe harbor" parent.
//
// Validated profile (W=9, B=8, AS=5, ER=8, PI=3, NC=7, PA=8, RR=7, RI=8):
//   Distinguishes from every other archetype on 2+ dimensions (delta≥3).
//   Key differentiators: very high warmth + strong structure + low PI.
//   RR=7: Good repair from regulation — comes back after conflict reliably.
//   RI=8: Clear role boundaries — parent carries the emotional weight.
// ---------------------------------------------------------------------------
const STEADY_ANCHOR: Archetype = {
  id: 'steady-anchor',
  name: 'The Steady Anchor',
  tagline: 'Your calm is your children\'s foundation.',
  dimensionProfile: profile(9, 8, 5, 8, 3, 7, 8, 7, 8, 6, 7),
  foundationalPatterns: {
    headline: 'Your calm, consistent presence gives your children a deep sense of safety they carry into the world.',
    themes: [
      'Emotional predictability — your children always know what to expect from you, and that reliability builds secure attachment from the inside out',
      'Boundaries as an act of love — your clear structure communicates care and safety, not control or restriction',
      'Modeling regulation under pressure — you demonstrate that difficult emotions can be felt without being acted on, and your children internalize this as their own capacity',
      'Warmth and firmness together — you hold both at once, which research identifies as the most protective combination for long-term child wellbeing',
      'The safe harbor — your children return to you knowing they will be received without judgment, which frees them to explore and take risks',
    ],
    researchAnchor: 'Rooted in Baumrind\'s authoritative parenting framework (high responsiveness + high demandingness) and Siegel\'s concept of the "safe haven" as the foundation from which secure attachment develops.',
    citations: [
      {
        researcher: 'Diana Baumrind',
        workTitle: 'Child care practices anteceding three patterns of preschool behavior',
        year: 1967,
        relevanceNote: 'Foundational study establishing that authoritative parenting — combining warmth with clear expectations — produces the strongest outcomes for child competence, self-reliance, and social responsibility.',
      },
      {
        researcher: 'Daniel J. Siegel & Mary Hartzell',
        workTitle: 'Parenting from the Inside Out',
        year: 2003,
        relevanceNote: 'Identifies consistent emotional availability as the mechanism through which parents build a child\'s felt sense of safety; the parent\'s own emotional regulation directly shapes the child\'s developing nervous system.',
      },
    ],
  },
  watchouts: {
    headline: 'When stress runs high, your steadiness can tip into emotional distance — and the people closest to you may feel it first.',
    themes: [
      'Emotion-dismissing under pressure — research shows that parents with high self-regulation can inadvertently suppress rather than process difficult emotions, which Gottman terms the "emotion-dismissing" pattern; children may learn to hide feelings to preserve the calm',
      'Missing bids for connection — when you\'re focused on maintaining equilibrium, you might find yourself responding to the surface of what your child says rather than the emotional undercurrent beneath it',
      'Rigidity masking as consistency — your reliable structure is a strength, but under stress it can harden into inflexibility; when the situation calls for creative adaptation, you may find yourself defaulting to the familiar pattern even when it isn\'t fitting',
      'Under-expressing warmth to those outside the immediate family — your capacity to hold it together for your children can mean that partners, extended family, or the children themselves receive less of your emotional availability than they need',
      'Difficulty receiving support — the anchoring role can make it harder to let others hold you; research on caregiving dynamics suggests that consistent caregivers often defer their own needs in ways that compound over time',
    ],
    researchAnchor: 'Drawing from Gottman\'s research on emotion dismissing as a parenting pattern, and Siegel\'s concept of rigidity as one end of the "river of integration" — where the opposite of chaos is not health but inflexibility.',
    citations: [
      {
        researcher: 'John Gottman',
        workTitle: 'Raising an Emotionally Intelligent Child',
        year: 1997,
        relevanceNote: 'Describes the emotion-dismissing parent who, despite good intentions, invalidates or minimizes children\'s negative emotions — a pattern that can coexist with warmth and structure when the parent\'s own emotional processing is suppressed.',
      },
      {
        researcher: 'Daniel J. Siegel',
        workTitle: 'The Developing Mind: How Relationships and the Brain Interact to Shape Who We Are',
        year: 2012,
        relevanceNote: 'The "river of integration" metaphor: psychological health flows between the banks of chaos and rigidity; sustained self-regulation without emotional access tips toward rigidity, not security.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['steady-anchor'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 2: The Fierce Guardian
// ---------------------------------------------------------------------------
// Clinical pattern: Protective/authoritarian-adjacent — very high protective
// instinct + high structure + very low autonomy support. Warmth is genuine
// but often expressed through provision, vigilance, and discipline rather
// than emotional expressiveness or verbal affirmation. Emotional regulation
// is mid-range — protective activation overrides it under threat. Narrative
// coherence is lower — protective patterns often rooted in unexamined
// experiences (often intergenerational transmission of anxious attachment).
// Low presence/attunement — protective scanning crowds out attuned listening.
// Signature: deeply loyal, safety-first, fierce love, difficulty with
// letting the child take risks or find their own way.
//
// Validated profile (W=7, B=9, AS=2, ER=5, PI=9, NC=4, PA=4, RR=3, RI=5):
//   Key differentiators: maximal PI combined with minimal AS.
//   RR=3: Low repair — tends to justify reactions rather than return to reconnect.
//   RI=5: Moderate role integrity — protective drive can blur boundaries.
// ---------------------------------------------------------------------------
const FIERCE_GUARDIAN: Archetype = {
  id: 'fierce-guardian',
  name: 'The Fierce Guardian',
  tagline: 'Your love shows up as an unshakeable wall of safety.',
  dimensionProfile: profile(7, 9, 2, 5, 9, 4, 4, 3, 5, 2, 4),
  foundationalPatterns: {
    headline: 'Your children know, with absolute certainty, that you will move mountains to keep them safe — and that certainty is its own kind of love.',
    themes: [
      'Love as protection — your care is expressed through vigilance and provision; your children feel held even when they can\'t articulate why',
      'Clear and consistent expectations — your children always know where the lines are, and that predictability builds a particular kind of trust',
      'Unwavering commitment — when the world is difficult or threatening, your children know you won\'t flinch; your loyalty is a bedrock resource',
      'Practical reliability — you show up, you follow through, you handle it; this action-based care is deeply felt even when it goes unremarked',
      'High standards as belief in potential — your expectations come from a place of deep investment in your children\'s outcomes, and they know you believe they can meet them',
    ],
    researchAnchor: 'Grounded in Ainsworth\'s research on protective availability as a component of secure attachment, and cross-cultural research (Lansford et al.) showing that firm, protective parenting produces stronger positive outcomes in high-threat environments where vigilance is adaptive.',
    citations: [
      {
        researcher: 'Mary Ainsworth',
        workTitle: 'Patterns of Attachment: A Psychological Study of the Strange Situation',
        year: 1978,
        relevanceNote: 'Established that parental availability and responsiveness to threat underlies the formation of secure attachment; protective availability is a genuine component of healthy attachment, not its opposite.',
      },
      {
        researcher: 'Jennifer E. Lansford et al.',
        workTitle: 'Cultural Values, Parenting, and Child Adjustment (PMC11542638)',
        year: 2024,
        relevanceNote: 'Cross-cultural meta-analysis demonstrating that parenting practices considered controlling in low-threat Western contexts show neutral or positive associations with child outcomes in contexts where the protective function is genuinely needed.',
      },
    ],
  },
  watchouts: {
    headline: 'When worry is running the show, your fierce protection can become the thing that keeps your children from finding their own strength.',
    themes: [
      'Autonomy erosion — research on anxious intrusiveness shows that well-intentioned protection that removes challenge also removes the experiences through which children build self-efficacy and resilience; when stressed, you might find yourself solving problems your child was ready to solve themselves',
      'Emotional scanning replacing emotional attunement — your protective vigilance focuses outward on threats; you might find that you\'re assessing risk rather than receiving your child\'s inner experience, which can leave them feeling watched rather than seen',
      'Fear transmission — Ainsworth\'s research on anxious attachment shows that parental anxiety is contagious; children of highly vigilant parents often develop their own threat-sensitivity, sometimes without a corresponding sense of their own competence',
      'Control as the default response — when a situation feels uncertain or threatening, you might find yourself adding more structure and oversight rather than tolerating the ambiguity that learning requires',
      'Difficulty distinguishing real risk from imagined risk — high protective instinct is well-calibrated for genuine threats but can over-generalize to low-risk situations, which narrows the space available for your children to grow',
    ],
    researchAnchor: 'Drawing from PBDQ research on anxious intrusiveness as a distinct parenting factor, Ainsworth\'s anxious/ambivalent attachment pattern, and Siegel\'s work on how unprocessed parental fear gets transmitted through the parent-child relationship.',
    citations: [
      {
        researcher: 'Louwerse et al. / PBDQ',
        workTitle: 'Towards a Model of Contemporary Parenting (PMC4456141)',
        year: 2011,
        relevanceNote: 'The PBDQ\'s anxious intrusiveness factor captures parenting driven by parental anxiety rather than child need — distinct from emotional warmth and often coexisting with genuine care; associated with reduced child autonomy development.',
      },
      {
        researcher: 'Daniel J. Siegel',
        workTitle: 'Parenting from the Inside Out',
        year: 2003,
        relevanceNote: 'Unexamined parental fear — often rooted in the parent\'s own experience of threat in childhood — gets transmitted to children through behavioral patterns that communicate danger even when the parent intends to communicate safety.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['fierce-guardian'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 3: The Gentle Nurturer
// ---------------------------------------------------------------------------
// Clinical pattern: Permissive-adjacent — high emotional warmth + high
// presence and attunement + high autonomy support + low boundary consistency.
// Warmth and attunement are the defining strengths. Very comfortable with
// the child's independence and emotional expression. Struggles with holding
// limits when warmth conflicts with structure — compassion overrides
// consistency. Emotional regulation is good. Low protective instinct —
// naturally comfortable with risk and imperfection. Moderate narrative
// coherence. Signature: deeply warm, relationally attuned, the child
// always feels loved and seen, but may lack the structure to feel safe.
//
// Validated profile (W=9, B=3, AS=8, ER=7, PI=3, NC=5, PA=9, RR=8, RI=6):
//   Key differentiators: very low B combined with very high W and PA.
//   RR=8: High repair from warmth — returns to reconnect readily.
//   RI=6: Moderate — warmth and low boundaries can blur role separation.
// ---------------------------------------------------------------------------
const GENTLE_NURTURER: Archetype = {
  id: 'gentle-nurturer',
  name: 'The Gentle Nurturer',
  tagline: 'Where your children come to be truly seen.',
  dimensionProfile: profile(9, 3, 8, 7, 3, 5, 9, 8, 6, 7, 9),
  foundationalPatterns: {
    headline: 'Your children grow up knowing that their inner world matters, and that knowledge becomes the foundation of their emotional intelligence.',
    themes: [
      'Emotional fluency — you create a home where feelings are named, received, and worked through rather than managed or suppressed; this emotional vocabulary is one of the most protective gifts a childhood can offer',
      'Genuine presence — you are truly with your children when you are with them; you notice their emotional state, track their experience, and respond to what they are actually feeling rather than what you expect them to feel',
      'Autonomy and trust — you believe in your children\'s capacity to navigate their own experience; you offer support without taking over, which builds genuine self-direction over time',
      'Non-judgment as invitation — your children tell you things because they trust you won\'t immediately fix, lecture, or react; that trust is earned through consistent emotional availability',
      'High emotional intelligence inheritance — research on Gottman\'s emotion-coaching style shows that children raised with consistent emotional attunement develop stronger empathy, better peer relationships, and greater emotional self-regulation',
    ],
    researchAnchor: 'Grounded in Gottman\'s emotion-coaching research, which identifies parental emotional attunement as the single strongest predictor of children\'s emotional intelligence, and Siegel\'s concept of "mindsight" — the capacity to see and be seen in relationship.',
    citations: [
      {
        researcher: 'John Gottman',
        workTitle: 'Raising an Emotionally Intelligent Child',
        year: 1997,
        relevanceNote: 'Longitudinal research demonstrating that emotion-coaching parents — those who acknowledge, name, and work through emotions with their children — produce children with higher emotional intelligence, better academic performance, and stronger social bonds.',
      },
      {
        researcher: 'Daniel J. Siegel',
        workTitle: 'Mindsight: The New Science of Personal Transformation',
        year: 2010,
        relevanceNote: 'The capacity to see one\'s own and others\' inner mental life ("mindsight") is developed primarily through early relationships where the child experiences being seen; the Gentle Nurturer\'s attunement is the developmental scaffold for this capacity.',
      },
    ],
  },
  watchouts: {
    headline: 'When love and limits feel like opposites, your warmth can leave your children without the structure they need to feel truly safe.',
    themes: [
      'Boundaries dissolving under emotional pressure — research on permissive parenting shows that the same attunement that makes you responsive to your child\'s feelings can make it hard to hold a limit when they\'re distressed; when stressed, you might find yourself negotiating your way out of a boundary you already set',
      'Comfort prioritized over growth — your natural instinct is to reduce your child\'s discomfort; research shows this can inadvertently communicate that difficult feelings are dangerous, and that your child needs protecting from their own experience rather than support in navigating it',
      'Inconsistency creating ambient anxiety — children with permissive parents often report feeling anxious even in very warm environments because unpredictable limits create a felt sense of instability, even when the relationship is loving',
      'Difficulty tolerating your own discomfort at their discomfort — when your child is unhappy, your instinct to soothe may be partly about managing your own distress; when stressed, you might find yourself rushing to resolution before they\'ve had a chance to sit with and process the feeling',
      'High emotional support, low emotional challenge — your children know they can come to you with how they feel, but they may not always get the gentle pushback that helps them develop frustration tolerance and resilience',
    ],
    researchAnchor: 'Drawing from Baumrind\'s permissive parenting research and Gottman\'s description of the well-meaning "laissez-faire" parent who acknowledges emotions but fails to set limits or guide behavior, resulting in children with lower self-regulation.',
    citations: [
      {
        researcher: 'Diana Baumrind',
        workTitle: 'Current patterns of parental authority',
        year: 1971,
        relevanceNote: 'Identifies permissive parenting — high warmth combined with low structure — as producing children who struggle with self-regulation and frustration tolerance despite feeling loved; warmth without structure leaves an important developmental scaffold missing.',
      },
      {
        researcher: 'John Gottman',
        workTitle: 'Raising an Emotionally Intelligent Child',
        year: 1997,
        relevanceNote: 'Distinguishes emotion-coaching (acknowledges feelings AND sets limits) from laissez-faire parenting (acknowledges feelings but avoids limits); the latter does not produce the emotional intelligence outcomes associated with true emotion coaching.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['gentle-nurturer'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 4: The Intentional Guide
// ---------------------------------------------------------------------------
// Clinical pattern: Scaffolding/conscious — very high autonomy support +
// high presence/attunement + good emotional regulation + low protective
// instinct. This archetype is characteristic of Tsabary's "conscious
// parenting" model: deliberate, growth-oriented, actively choosing responses
// rather than reacting. Warmth is genuine but more intellectualized than
// emotionally spontaneous — relationships are careful and purposeful rather
// than effortlessly warm. Moderate-to-high boundaries. Narrative coherence
// is moderate — has done personal work but may not be fully integrated.
// Signature: intentional, growth-minded, curious about self and child,
// very comfortable with the child's independence.
//
// Validated profile (W=6, B=7, AS=10, ER=8, PI=2, NC=6, PA=9, RR=9, RI=8):
//   Key differentiators: maximal AS combined with minimal PI.
//   RR=9: Deliberate repair practice — intentionally returns and names ruptures.
//   RI=8: Conscious role boundaries — clear about who carries what.
// ---------------------------------------------------------------------------
const INTENTIONAL_GUIDE: Archetype = {
  id: 'intentional-guide',
  name: 'The Intentional Guide',
  tagline: 'You parent with purpose, not just instinct.',
  dimensionProfile: profile(6, 7, 10, 8, 2, 6, 9, 9, 8, 9, 8),
  foundationalPatterns: {
    headline: 'You approach parenting as one of the most conscious and transformative acts a person can undertake — and that intention shapes everything you do.',
    themes: [
      'Deliberate responsiveness — you pause between trigger and response; this gap is where your parenting lives, and research on conscious parenting identifies it as the space where intergenerational patterns either repeat or change',
      'Scaffolding independence — you see your role as building your child\'s capacity to navigate their own life; you offer support that develops their competence rather than substituting for it',
      'Curiosity about self and child — you approach parenting with genuine inquiry, asking not just "what do I do?" but "what is driving this behavior?" and "what is this moment asking of both of us?"',
      'Growth orientation — you genuinely believe both you and your children are always capable of learning, changing, and expanding; mistakes are data, not verdicts',
      'Trust in the child\'s process — you are deeply comfortable with your children having experiences that are theirs, making decisions that are theirs, and learning from consequences that are theirs; you don\'t need to manage their story',
    ],
    researchAnchor: 'Aligned with Tsabary\'s conscious parenting framework — the distinction between parenting from the present moment (the child\'s actual needs) versus from unmet parental needs — and Siegel\'s concept of mindsight as the capacity to pause, observe, and choose.',
    citations: [
      {
        researcher: 'Shefali Tsabary',
        workTitle: 'The Conscious Parent',
        year: 2010,
        relevanceNote: 'Defines conscious parenting as the practice of meeting the child who is actually there rather than the child projected from the parent\'s own unmet needs; the Intentional Guide\'s high autonomy support and low protective instinct embody this orientation.',
      },
      {
        researcher: 'Daniel J. Siegel',
        workTitle: 'Mindsight: The New Science of Personal Transformation',
        year: 2010,
        relevanceNote: 'Mindsight — the capacity to observe one\'s own mind and the mind of another — is the cognitive foundation for intentional parenting; it allows the pause between stimulus and response where choice becomes possible.',
      },
    ],
  },
  watchouts: {
    headline: 'When parenting becomes a project to perfect rather than a relationship to inhabit, your thoughtfulness can create distance you didn\'t intend.',
    themes: [
      'Over-intellectualizing emotion — research on conscious parenting practitioners shows a risk of analyzing feelings rather than feeling them; when stressed, you might find yourself thinking through an emotional moment rather than being inside it with your child',
      'Warmth that requires effort — your attunement is real but it is often effortful; in moments of depletion or surprise, you may find yourself reaching for the thoughtful response rather than having it arise naturally, which can be felt as a slight distance by your children',
      'The perfectionism of intentionality — the same drive that makes you reflective can turn your parenting into a performance you\'re grading yourself on; when stressed, you might find yourself more focused on whether you responded correctly than on how your child is doing',
      'Difficulty with spontaneity — your comfort zone is the considered response; you may find it harder than other parents to be playful, messy, or unpredictably warm — the kinds of moments that build relational intimacy through sheer delight',
      'Moderate narrative integration — you have done personal work, but research suggests that intellectual understanding of one\'s past does not always translate into the visceral emotional integration that makes it truly settled; some of your own story may still be operating outside your awareness',
    ],
    researchAnchor: 'Drawing from Siegel\'s distinction between intellectual understanding of the past and true narrative integration, and Tsabary\'s caution that conscious parenting can become another performance of the ego when the parent\'s attention is on their own growth rather than the child\'s actual presence.',
    citations: [
      {
        researcher: 'Daniel J. Siegel & Mary Hartzell',
        workTitle: 'Parenting from the Inside Out',
        year: 2003,
        relevanceNote: 'Distinguishes between cognitive knowledge about one\'s past and the emotional integration of that past; the former can produce insight without transformation, maintaining the same reactive patterns in a more sophisticated wrapper.',
      },
      {
        researcher: 'Shefali Tsabary',
        workTitle: 'Out of Control: Why Disciplining Your Child Doesn\'t Work and What Will',
        year: 2013,
        relevanceNote: 'Identifies the risk of conscious parenting becoming another ego-driven project when the parent\'s focus shifts from the child\'s authentic experience to the parent\'s self-image as a conscious parent.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['intentional-guide'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 5: The Resilient Striver
// ---------------------------------------------------------------------------
// Clinical pattern: Earned-secure/healing — MAXIMAL narrative coherence
// (the defining dimension) + very high emotional regulation + high autonomy
// support. This archetype represents parents who have consciously worked to
// break intergenerational patterns — Siegel & Hartzell's "Earned Secure"
// profile. They may have come from difficult backgrounds but have done the
// integrative work and can narrate it with emotional access. Warmth is high.
// Boundaries are moderate. Protective instinct is moderate — an adaptive
// vigilance from their own experience, not anxiety-driven. Strong presence
// and attunement, earned through conscious effort. Signature: transformed,
// reflective, deeply aware of intergenerational patterns, committed to
// breaking cycles.
//
// Validated profile (W=8, B=6, AS=9, ER=9, PI=5, NC=10, PA=7, RR=9, RI=7):
//   Key differentiators: maximal NC combined with very high AS and ER.
//   RR=9: Repair is central to the earned-secure narrative — comes back and names it.
//   RI=7: Good role boundaries, though healing journey can occasionally blur them.
// ---------------------------------------------------------------------------
const RESILIENT_STRIVER: Archetype = {
  id: 'resilient-striver',
  name: 'The Resilient Striver',
  tagline: 'You\'ve rewritten your story — and theirs.',
  dimensionProfile: profile(8, 6, 9, 9, 5, 10, 7, 9, 7, 7, 8),
  foundationalPatterns: {
    headline: 'You have done the hard, quiet work of understanding where you came from — and that work has given your children a different beginning.',
    themes: [
      'Earned coherence — research identifies the "earned secure" parent as one of the most remarkable outcomes in attachment science: someone who experienced adversity in their own upbringing but has done the integrative work to narrate it with clarity, emotional access, and resolution; this is your signature strength',
      'Pattern-breaking as an active practice — you are aware of the intergenerational currents running through your family history and you actively choose which to carry forward and which to redirect; this level of intentionality is rare and protective',
      'High emotional regulation from hard experience — your capacity to manage difficult feelings was built, not given; it is deeper and more flexible than regulation that was never tested',
      'Wisdom from the inside — your lived experience with adversity gives you a particular kind of empathy for your children\'s struggles; you understand that difficulty is not the end of the story',
      'Autonomy earned and freely given — because you had to find your own footing in ways many parents didn\'t, you understand intrinsically what it takes to build an inner compass; you give your children that space deliberately',
    ],
    researchAnchor: 'Grounded in van IJzendoorn\'s meta-analysis establishing the "earned secure" construct — adults who experienced insecure attachment but developed secure attachment states of mind through reflection and integration — and Siegel\'s narrative coherence research as the mechanism of intergenerational change.',
    citations: [
      {
        researcher: 'Marinus H. van IJzendoorn',
        workTitle: 'Adult attachment representations, parental responsiveness, and infant attachment: A meta-analysis on the predictive validity of the Adult Attachment Interview (PMC3060612)',
        year: 1995,
        relevanceNote: 'Meta-analysis of 13 studies establishing that narrative coherence about one\'s own past — not the quality of the past itself — is the primary predictor of parenting quality and child attachment security; defines "earned secure" adults as a distinct category.',
      },
      {
        researcher: 'Daniel J. Siegel & Mary Hartzell',
        workTitle: 'Parenting from the Inside Out',
        year: 2003,
        relevanceNote: 'Provides the clinical mechanism: parents who have integrated their autobiographical narrative, even a painful one, are less likely to be "triggered" by their children\'s behaviors into automatic responses that replicate their own childhood patterns.',
      },
    ],
  },
  watchouts: {
    headline: 'When the work of healing becomes part of your identity, you might find that the story of where you came from takes up more space than where you are.',
    themes: [
      'Identity fusion with the healing narrative — the earned-secure journey is real and significant, but research on identity and narrative suggests that when the story of "what I overcame" becomes central to self-definition, it can subtly keep you oriented toward the past rather than fully inhabiting the present relationship with your child',
      'Vigilance about regression — because you know what the old patterns look like, you might be hyperalert to signs of slipping back into them; when stressed, you might find yourself monitoring your own parenting more than receiving your child, which can create a slight emotional remove',
      'The weight of being the first to break the cycle — this role is meaningful but it is also a burden; you might carry a responsibility that others don\'t, a sense that everything depends on you getting this right, which can manifest as perfectionism or anxiety when things don\'t go as planned',
      'Moderate protective instinct from your own history — your experience of difficulty has given you a calibrated vigilance that is generally adaptive; under stress it can over-activate, particularly in situations that echo your own experiences of being unprotected',
      'Difficulty receiving without context — you may find it harder to simply enjoy ordinary, uncomplicated moments with your children without reflecting on their significance; the meaning-making that is your strength can sometimes interfere with pure presence',
    ],
    researchAnchor: 'Drawing from Main\'s Adult Attachment Interview research on "preoccupied" states of mind (where the past remains emotionally unresolved and dominates present experience), and Siegel\'s distinction between narrative coherence and narrative preoccupation.',
    citations: [
      {
        researcher: 'Mary Main & Ruth Goldwyn',
        workTitle: 'Adult attachment classification system',
        year: 1994,
        relevanceNote: 'The AAI distinguishes "autonomous" (coherent integration of past) from "preoccupied" (still emotionally activated by past experiences) states of mind; the distinction matters for parenting quality: integration predicts secure parenting, preoccupation does not.',
      },
      {
        researcher: 'Daniel J. Siegel',
        workTitle: 'The Developing Mind: How Relationships and the Brain Interact to Shape Who We Are',
        year: 2012,
        relevanceNote: 'Coherent integration of autobiographical narrative allows the past to inform rather than control the present; when narrative coherence tips into narrative preoccupation, the parent\'s relationship with their history can crowd out their relationship with their child.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['resilient-striver'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 6: The Structured Mentor
// ---------------------------------------------------------------------------
// Clinical pattern: Organized/achievement-oriented — high boundary consistency
// + good autonomy support + very low emotional warmth expression + very low
// protective instinct. This archetype values competence, independence, and
// mastery. Sets high expectations and gives children real responsibility and
// agency to meet them. Warmth is felt but rarely expressed affectively —
// love shows through challenge and preparation, not through verbal affirmation
// or physical warmth. Emotional regulation is moderate — can stay present but
// may be less comfortable with emotional flooding. Very low protective
// instinct — actively believes in exposing children to difficulty and
// appropriate risk. Low presence/attunement — more focused on external
// outcomes than the child's moment-to-moment emotional state. Signature:
// clear expectations, real responsibility, deep respect for the child's
// capability.
//
// Validated profile (W=4, B=9, AS=7, ER=6, PI=2, NC=6, PA=4, RR=3, RI=6):
//   Key differentiators: very low W and PA combined with very high B.
//   RR=3: Low repair — tends to move forward rather than return to reconnect.
//   RI=6: Moderate — clear role expectations but emotional distance can blur support.
// ---------------------------------------------------------------------------
const STRUCTURED_MENTOR: Archetype = {
  id: 'structured-mentor',
  name: 'The Structured Mentor',
  tagline: 'You raise capable people by expecting great things.',
  dimensionProfile: profile(4, 9, 7, 6, 2, 6, 4, 3, 6, 4, 3),
  foundationalPatterns: {
    headline: 'You give your children something rare: a parent who genuinely believes they are capable of hard things, and who structures the world to prove it.',
    themes: [
      'High expectations as a form of respect — you hold your children to standards because you believe in their capacity, not because you need them to perform; research on authoritative parenting identifies high expectations combined with support as a key predictor of achievement and self-efficacy',
      'Real responsibility, real agency — you give your children meaningful roles and actual consequences, which builds competence and the felt sense that their actions matter',
      'Exposure to productive difficulty — you understand that growth requires struggle, and you resist the instinct to smooth every path; your children develop frustration tolerance and resilience because you let them encounter real challenges',
      'Clear structure as cognitive relief — your consistent expectations free your children\'s attention from navigating ambiguity; they can focus on the task at hand rather than reading the room for rules that keep changing',
      'Preparation over protection — you prepare your children for the world they will actually encounter rather than trying to insulate them from it; this forward-looking investment is a deep form of care',
    ],
    researchAnchor: 'Aligned with Baumrind\'s research on the authoritarian parenting style\'s positive outcomes on achievement and self-reliance when balanced with appropriate autonomy support, and Dweck\'s growth mindset research showing that high expectations combined with belief in process over fixed ability produce the strongest long-term outcomes.',
    citations: [
      {
        researcher: 'Diana Baumrind',
        workTitle: 'Child care practices anteceding three patterns of preschool behavior',
        year: 1967,
        relevanceNote: 'Established that high demandingness — clear expectations and consistent follow-through — is associated with greater child competence and self-reliance; in combination with appropriate autonomy support, it produces some of the strongest outcomes in the parenting literature.',
      },
      {
        researcher: 'Carol S. Dweck',
        workTitle: 'Mindset: The New Psychology of Success',
        year: 2006,
        relevanceNote: 'Research on growth mindset: adults who communicate belief in a child\'s capacity to grow and learn through effort — rather than labeling fixed ability — produce children with greater persistence, resilience in the face of failure, and long-term achievement.',
      },
    ],
  },
  watchouts: {
    headline: 'When achievement and capability are how love gets communicated, your children may grow up competent at everything except knowing they are loved for who they are, not what they do.',
    themes: [
      'Emotional attunement as a gap — research on low-warmth, high-structure parenting shows that children in these environments often perform well but report feeling emotionally distant from their parents; when stressed, you might find yourself reaching for feedback on what they did rather than curiosity about how they are',
      'Love felt but not legible — your care is real but it is expressed through investment in outcomes rather than in warmth, physical affection, or emotional availability; your children may need to learn to read a different language of love than the one most explicitly described in attachment research',
      'Emotional flooding as an alarm — you are comfortable with challenge and difficulty but not with emotional flooding; when your child is overwhelmed or dysregulated, you might find your instinct is to redirect to behavior rather than to sit inside the feeling with them',
      'The achievement frame narrowing what counts — when competence is the primary frame, children may experience their emotional struggles, social difficulties, or creative departures as failures; the things that don\'t fit the achievement narrative may go unsupported',
      'Difficulty with the non-productive — play, rest, wandering, and emotional processing have no clear output; you might find yourself subtly or explicitly communicating that these are less valuable than activities that produce visible results',
    ],
    researchAnchor: 'Drawing from Gottman\'s research on the emotion-dismissing parent — who is warm in action but uncomfortable with emotional expression — and attachment research showing that children of low-warmth, high-structure parents develop secure competence but report lower emotional intimacy with caregivers.',
    citations: [
      {
        researcher: 'John Gottman',
        workTitle: 'Raising an Emotionally Intelligent Child',
        year: 1997,
        relevanceNote: 'Identifies the dismissing parent style — which includes parents who are loving in practical terms but uncomfortable with emotional expression or coaching — as a pattern that produces children with lower emotional vocabulary and reduced capacity to seek support when they need it.',
      },
      {
        researcher: 'Diana Baumrind',
        workTitle: 'Current patterns of parental authority',
        year: 1971,
        relevanceNote: 'Longitudinal follow-up showing that the achievement and self-reliance outcomes of high-structure parenting come with a cost to the affective dimension of the parent-child relationship, particularly when combined with low warmth expression.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['structured-mentor'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 7: The Open-Hearted Learner
// ---------------------------------------------------------------------------
// Clinical pattern: Emotionally attuned but still integrating — high
// emotional warmth + high emotional regulation (coaching) + high presence
// and attunement + VERY LOW narrative coherence (the defining dimension).
// This archetype is deeply emotionally committed to their child — they feel
// deeply, attune readily, and genuinely show up emotionally. However, their
// own past is less fully integrated: they may be actively working through
// it, still making sense of it, or drawn to parenting partly as a healing
// and growth process. Boundary consistency is moderate — emotion can override
// structure. Autonomy support is moderate — warm and protective pulls may
// constrain independence. Protective instinct is higher than average —
// a product of less-integrated past experiences creating ambient anxiety.
// Signature: emotionally generous, growth-seeking, heart-led parenting
// while still finding their footing in their own story.
//
// Validated profile (W=8, B=6, AS=5, ER=8, PI=7, NC=3, PA=8, RR=7, RI=4):
//   Key differentiators: very low NC combined with mid-high PI — the "still
//   integrating" profile as opposed to the fully coherent Resilient Striver.
//   RR=7: Wants to repair and often does, but low NC = inconsistent follow-through.
//   RI=4: Highest parentification risk — emotional generosity can reverse roles.
// ---------------------------------------------------------------------------
const OPEN_HEARTED_LEARNER: Archetype = {
  id: 'open-hearted-learner',
  name: 'The Open-Hearted Learner',
  tagline: 'You show up fully — and keep growing as you go.',
  dimensionProfile: profile(8, 6, 5, 8, 7, 3, 8, 7, 4, 6, 7),
  foundationalPatterns: {
    headline: 'You bring your whole self to parenting — your warmth, your sensitivity, and your genuine commitment to growing alongside your children.',
    themes: [
      'Emotional generosity — you give freely from your heart; your children experience a parent who is genuinely present with their feelings and who responds to the texture of their emotional life, not just its surface',
      'Attuned responsiveness — you notice what your children are actually experiencing and you respond to that, rather than to what you think they should be experiencing; this attunement is a cornerstone of secure attachment',
      'Growth as a shared practice — you model that adults are also works in progress; your children grow up understanding that learning and changing are not just things children do',
      'Warmth under pressure — your emotional availability doesn\'t disappear when things are hard; your children know they can come to you when they are struggling, which keeps the relationship open through difficulty',
      'Heart-led engagement — you approach your children with curiosity and care rather than strategy or agenda; this creates the quality of relationship that children remember most clearly when they look back on their childhoods',
    ],
    researchAnchor: 'Grounded in Ainsworth\'s research on consistent emotional availability as the foundation of secure attachment, and Gottman\'s emotion-coaching model which identifies attuned responsiveness to children\'s emotional experience as the strongest predictor of emotional intelligence.',
    citations: [
      {
        researcher: 'Mary Ainsworth',
        workTitle: 'Patterns of Attachment: A Psychological Study of the Strange Situation',
        year: 1978,
        relevanceNote: 'Established that parental emotional availability and sensitivity to the child\'s signals — rather than any specific parenting technique — is the primary mechanism through which secure attachment forms and is maintained.',
      },
      {
        researcher: 'John Gottman',
        workTitle: 'Raising an Emotionally Intelligent Child',
        year: 1997,
        relevanceNote: 'Identifies emotion-coaching — genuinely noticing and responding to children\'s emotional states — as the parenting practice most strongly associated with children\'s emotional intelligence, physical health, and academic performance.',
      },
    ],
  },
  watchouts: {
    headline: 'When your own story is still finding its shape, you might find that your children\'s emotional moments sometimes activate yours — and the line between their experience and yours can blur.',
    themes: [
      'Emotional resonance becoming emotional absorption — your attunement means you feel your children\'s feelings with them; research on less-integrated caregivers shows this can tip from empathy into merger, where your child\'s distress becomes your distress and your response is driven by your own activation rather than their need',
      'Unprocessed past surfacing in present moments — research by Siegel and Main shows that low narrative coherence predicts being "triggered" by specific child behaviors; when stressed, you might find yourself responding to a present moment with an emotional intensity that belongs to your own history rather than the current situation',
      'Protection and warmth narrowing autonomy — your care for your children is deep and genuine; combined with a still-integrating history that includes some ambient anxiety, you might find yourself wanting to keep your children close in ways that subtly limit their development of independence',
      'Inconsistent structure — your warmth is steady but your boundaries may move with your emotional state; when you are well-resourced and present, limits are clear; when you are activated or depleted, they may soften in ways that create unpredictability',
      'Drawn to parenting as healing — there is something beautiful about approaching parenting as a growth process; the watchout is when the child\'s role in the parent\'s healing narrative becomes more prominent than the child\'s own developmental story',
    ],
    researchAnchor: 'Drawing from Main\'s AAI research on unresolved/disorganized attachment states as a predictor of inconsistent parenting, and Siegel\'s work on the "emotionally reactive" parent whose lower narrative integration creates specific vulnerabilities around the child\'s expressions of distress, anger, or need.',
    citations: [
      {
        researcher: 'Mary Main & Judith Solomon',
        workTitle: 'Procedures for identifying infants as disorganized/disoriented during the Ainsworth Strange Situation',
        year: 1990,
        relevanceNote: 'Identified that parental unresolved states of mind — particularly around loss or trauma — predict lapses in caregiving behavior specifically in moments of high child distress, when the parent\'s own activation overrides their attunement capacity.',
      },
      {
        researcher: 'Daniel J. Siegel & Mary Hartzell',
        workTitle: 'Parenting from the Inside Out',
        year: 2003,
        relevanceNote: 'Describes how parents with lower narrative coherence about their own past are specifically vulnerable to being "triggered" by their children — the child\'s behavior activates unresolved emotional material that then shapes the parent\'s response in ways the parent may not recognize in the moment.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['open-hearted-learner'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 8: The Devoted Champion
// ---------------------------------------------------------------------------
// Clinical pattern: Conditional-warmth — high emotional warmth + high boundary
// consistency + moderate presence, but LOW reciprocity and LOW nonjudgmental
// acceptance. This archetype loves deeply and invests intensely but warmth
// becomes conditional under stress — tied to the child meeting expectations,
// performing well, or reflecting well on the parent. The love is genuine and
// the investment is real, but the child experiences approval as something that
// must be earned. This is distinct from the Fierce Guardian (who restricts
// autonomy from anxiety) and from the Structured Mentor (who is low-warmth
// by nature). The Devoted Champion is HIGH warmth but that warmth fluctuates
// based on the child's compliance with the parent's vision.
//
// Validated profile (W=8, B=8, AS=5, ER=6, PI=3, NC=5, PA=7, RR=5, RI=7, REC=3, NJA=2):
//   Key differentiators: high W+B combined with very low REC and NJA.
//   RR=5: Moderate repair — returns sometimes but may frame it as lesson.
//   RI=7: Clear roles — the parent leads, the child follows the parent's vision.
// ---------------------------------------------------------------------------
const DEVOTED_CHAMPION: Archetype = {
  id: 'devoted-champion',
  name: 'The Devoted Champion',
  tagline: 'You pour everything into helping them become their best.',
  dimensionProfile: profile(8, 8, 5, 6, 3, 5, 7, 5, 7, 3, 2),
  foundationalPatterns: {
    headline: 'Your children know they have a parent who will go to the ends of the earth for them — your investment in their growth is total, visible, and deeply felt.',
    themes: [
      'All-in investment — you bring your full energy, resources, and attention to your children\'s development; they experience a parent who cares enough to show up completely and consistently',
      'Visible love through action — your care is demonstrated through sacrifice, preparation, and active engagement with your children\'s lives; you know their teachers, their friends, their struggles, and their aspirations',
      'High standards as belief — your expectations come from a genuine conviction that your children are capable of great things; you hold them to standards because you see their potential clearly',
      'Advocacy and championing — you fight for your children in the world; when they face obstacles, you do not stand by passively but actively work to remove barriers and create opportunities',
      'Consistency and reliability — your children can count on you to follow through; when you commit to something, it happens, and that reliability creates a stable platform for their development',
    ],
    researchAnchor: 'Grounded in Rohner\'s Interpersonal Acceptance-Rejection Theory, which identifies the distinction between perceived conditional and unconditional acceptance as a core axis of parenting impact, and Grusec & Davidov\'s domain-specific socialization model, which recognizes that different socialization domains (compliance, reciprocity, guided learning) operate independently.',
    citations: [
      {
        researcher: 'Ronald P. Rohner',
        workTitle: 'The Parental Acceptance-Rejection Syndrome: Universal Correlates of Perceived Rejection',
        year: 2004,
        relevanceNote: 'IPARTheory establishes that perceived parental acceptance vs. rejection is the single strongest cross-cultural predictor of child psychological adjustment; the Devoted Champion\'s conditional warmth pattern represents the boundary between acceptance and conditional rejection.',
      },
      {
        researcher: 'Joan E. Grusec & Maayan Davidov',
        workTitle: 'Integrating different perspectives on socialization theory and research: A domain-specific approach',
        year: 2010,
        relevanceNote: 'Domain-specific socialization theory identifies reciprocal compliance — the child\'s willingness to cooperate based on the quality of the bidirectional relationship — as a distinct domain; low reciprocity undermines the very cooperation the Devoted Champion seeks.',
      },
    ],
  },
  watchouts: {
    headline: 'When love and expectation become the same thing, your children may grow up feeling that they are loved for what they achieve rather than who they are.',
    themes: [
      'Conditional warmth as invisible pressure — research on perceived acceptance-rejection shows that children are acutely sensitive to fluctuations in parental warmth; when warmth rises with achievement and falls with failure, the child internalizes that their worth is performance-dependent, even if the parent never says so explicitly',
      'The approval treadmill — your high standards create an implicit standard for love; when stressed, you might find that your emotional tone toward your child shifts based on how well they are meeting expectations, creating an experience where approval must be continuously re-earned',
      'Low reciprocity creating distance — your championing is often done for the child rather than with the child; the child\'s own perspective on what they need or want may be overridden by your vision of what is best for them, which can erode trust and closeness over time',
      'Investment becoming ownership — the depth of your sacrifice and commitment can create an implicit expectation that the child owes compliance in return; research on conditional parenting shows this exchange dynamic undermines intrinsic motivation and authentic self-development',
      'Difficulty accepting deviation — when your child wants something genuinely different from what you\'ve championed for them, you may experience it as rejection of your investment rather than healthy individuation; the nonjudgmental acceptance gap becomes most visible in these moments',
    ],
    researchAnchor: 'Drawing from Rohner\'s cross-cultural research showing that perceived conditional acceptance produces anxiety, insecurity, and dependence on external validation, and from research on conditional regard (Assor, Roth & Deci, 2004) showing that parental conditional positive regard predicts internal compulsion and resentment rather than genuine internalization.',
    citations: [
      {
        researcher: 'Avi Assor, Guy Roth & Edward L. Deci',
        workTitle: 'The emotional costs of parents\' conditional regard: A self-determination theory analysis',
        year: 2004,
        relevanceNote: 'Demonstrates that parental conditional positive regard — providing more warmth and attention contingent on the child meeting expectations — predicts internal compulsion to comply but also resentment, fluctuating self-esteem, and lower wellbeing; the child complies but at a psychological cost.',
      },
      {
        researcher: 'Ronald P. Rohner',
        workTitle: 'The Parental Acceptance-Rejection Syndrome: Universal Correlates of Perceived Rejection',
        year: 2004,
        relevanceNote: 'Cross-cultural research across 60+ societies shows that perceived parental rejection — including conditional acceptance — is universally associated with hostility, dependence, negative self-esteem, and emotional instability in children, regardless of cultural context.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['devoted-champion'] ?? [],
};

// ---------------------------------------------------------------------------
// Archetype 9: The Collaborative Ally
// ---------------------------------------------------------------------------
// Clinical pattern: Democratic/cooperative — very high reciprocity + very high
// nonjudgmental acceptance + high autonomy support. This archetype views the
// parent-child relationship as a genuine partnership. Power is shared
// age-appropriately, decisions are negotiated rather than decreed, and the
// child's perspective is actively sought and incorporated. The Collaborative
// Ally is comfortable being influenced by the child and models that
// relationships are cooperative rather than hierarchical. Distinct from the
// Gentle Nurturer (who has low boundaries); the Collaborative Ally has
// moderate boundaries that are democratically negotiated rather than absent.
// Distinct from the Intentional Guide (who scaffolds autonomy); the
// Collaborative Ally actively shares power and seeks mutual influence.
//
// Validated profile (W=6, B=4, AS=8, ER=7, PI=3, NC=7, PA=6, RR=7, RI=6, REC=10, NJA=9):
//   Key differentiators: maximal REC combined with very high NJA.
//   RR=7: Good repair grounded in mutual respect — returns to reconnect as equals.
//   RI=6: Moderate — democratic orientation sometimes blurs generational role.
// ---------------------------------------------------------------------------
const COLLABORATIVE_ALLY: Archetype = {
  id: 'collaborative-ally',
  name: 'The Collaborative Ally',
  tagline: 'You parent with your children, not just for them.',
  dimensionProfile: profile(6, 4, 8, 7, 3, 7, 6, 7, 6, 10, 9),
  foundationalPatterns: {
    headline: 'Your children grow up knowing their voice matters — not as a courtesy but as a genuine force in the family\'s direction.',
    themes: [
      'Genuine power-sharing — you treat your children as legitimate contributors to family decisions; their preferences, ideas, and objections are not just heard but genuinely influence outcomes, which builds the felt sense that their voice has weight in the world',
      'Unconditional acceptance as foundation — your children experience love that does not fluctuate with their behavior or achievements; this stable acceptance frees them to take risks, make mistakes, and develop authentically without fear of losing your regard',
      'Modeling cooperation — you demonstrate that relationships work best when both parties contribute, negotiate, and influence each other; your children learn collaborative skills from the most important relationship in their lives',
      'Democratic discipline — when rules are needed, you involve your children in creating them; research shows that children who participate in rule-setting are more likely to internalize and follow those rules than children who have rules imposed on them',
      'Deep respect for the child\'s perspective — you genuinely believe that your child sees things you might miss, and you are comfortable being changed by what they see; this mutual influence builds trust, closeness, and the child\'s confidence in their own judgment',
    ],
    researchAnchor: 'Grounded in Grusec & Davidov\'s domain-specific socialization model, which identifies reciprocal compliance as a distinct domain where the quality of the bidirectional relationship predicts the child\'s cooperative behavior, and Duncan et al.\'s mindful parenting framework, which includes nonjudgmental acceptance and bidirectional listening as core components.',
    citations: [
      {
        researcher: 'Larry J. Duncan, J. Douglas Coatsworth & Mark T. Greenberg',
        workTitle: 'A model of mindful parenting: Implications for parent-child relationships and prevention research',
        year: 2009,
        relevanceNote: 'Identifies five dimensions of mindful parenting, including nonjudgmental acceptance of the child and of oneself as a parent, and bidirectional listening — attending fully to the child\'s communication rather than filtering it through parental agenda; the Collaborative Ally embodies these two dimensions most fully.',
      },
      {
        researcher: 'Joan E. Grusec & Maayan Davidov',
        workTitle: 'Integrating different perspectives on socialization theory and research: A domain-specific approach',
        year: 2010,
        relevanceNote: 'Demonstrates that the reciprocal compliance domain — where children cooperate because the relationship is genuinely bidirectional — produces deeper internalization of values than the control domain; children comply not from fear of consequences but from genuine mutual respect.',
      },
    ],
  },
  watchouts: {
    headline: 'When partnership replaces structure, your children may have a wonderful collaborator but miss the parent who is simply in charge when they need one.',
    themes: [
      'Under-using structural authority — research on democratic parenting shows that genuine situations arise where children need a parent who decides quickly and holds the line without negotiation; when stressed, you might find yourself opening a collaborative conversation when the moment calls for a clear directive, which can leave children feeling unsafe in genuinely high-stakes situations',
      'Democratizing what shouldn\'t be democratic — not all decisions benefit from shared power; safety decisions, age-inappropriate choices, and situations requiring parental expertise may be undermined by a reflexive move toward collaboration; the child needs to know that some things are simply decided',
      'Role clarity under pressure — the egalitarian orientation can blur the generational boundary that children need to feel safe; when stressed, you might find that the collaborative dynamic creates a peer-like quality that leaves the child uncertain about who is actually in charge',
      'Difficulty with firm limits — holding a hard limit without negotiation may feel like a betrayal of your relational values; research on permissive outcomes shows that even children who thrive in democratic environments need the experience of encountering a limit that does not move, as this builds frustration tolerance and a felt sense of external safety',
      'The acceptance trap — your deep nonjudgmental acceptance is a genuine strength, but under stress it can slide toward accepting behaviors that genuinely need to be challenged; the distinction between accepting the child and accepting all their choices can blur when your identity is built around unconditional regard',
    ],
    researchAnchor: 'Drawing from Baumrind\'s research showing that permissive parenting — even when warm and collaborative — produces children with lower self-regulation and frustration tolerance, and from developmental research showing that children need both autonomy and structure, with the balance shifting by age and context.',
    citations: [
      {
        researcher: 'Diana Baumrind',
        workTitle: 'Current patterns of parental authority',
        year: 1971,
        relevanceNote: 'Demonstrates that children of permissive parents — including those who are warm, engaged, and democratic — show lower self-regulation, lower frustration tolerance, and greater difficulty with authority structures outside the family; warmth without structure leaves a developmental scaffold missing.',
      },
      {
        researcher: 'Larry J. Duncan, J. Douglas Coatsworth & Mark T. Greenberg',
        workTitle: 'A model of mindful parenting: Implications for parent-child relationships and prevention research',
        year: 2009,
        relevanceNote: 'Notes that nonjudgmental acceptance must coexist with appropriate limit-setting and guidance; acceptance of the child does not mean acceptance of all behaviors, and the mindful parent must hold both stances simultaneously.',
      },
    ],
  },
  culturalOverlays: CULTURAL_OVERLAYS['collaborative-ally'] ?? [],
};

// ---------------------------------------------------------------------------
// ARCHETYPES — the complete exported array
// ---------------------------------------------------------------------------

/**
 * ARCHETYPES is the canonical ordered array of all parenting archetype definitions.
 *
 * 9 archetypes — research-driven count from the 11-dimension scoring space.
 * Every pair satisfies the minimum differentiation rule:
 *   "Any two archetypes must differ by 3+ points on at least 2 dimensions."
 * See validateArchetypeDistinctness for the enforcement function.
 * All 36 pairs (9×8/2) validated via validateArchetypeDistinctness.
 *
 * Content fields (foundationalPatterns, watchouts) populated in Plan 04.
 * Cultural overlays imported from lib/archetypes/cultural-overlays.ts (Plan 04).
 *
 * Downstream consumers:
 * - lib/quiz/scoring-matrix.ts — extracts dimension profiles for scoring
 * - Phase 3 result page — displays archetype name, tagline, content
 * - Phase 5 AI prompts — uses archetype id as personalization context
 */
export const ARCHETYPES: Archetype[] = [
  STEADY_ANCHOR,
  FIERCE_GUARDIAN,
  GENTLE_NURTURER,
  INTENTIONAL_GUIDE,
  RESILIENT_STRIVER,
  STRUCTURED_MENTOR,
  OPEN_HEARTED_LEARNER,
  DEVOTED_CHAMPION,
  COLLABORATIVE_ALLY,
];

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * Result type for a single archetype pair's differentiation check.
 */
export interface PairValidationResult {
  archetypeA: string;
  archetypeB: string;
  /** Number of dimensions where the two archetypes differ by minimumDelta+ points. */
  distinguishingDimensions: number;
  /** True if the pair meets the minimum differentiation rule. */
  passes: boolean;
  /** Per-dimension delta detail for debugging and Sophia's review. */
  dimensionDeltas: Array<{
    dimension: string;
    valueA: number;
    valueB: number;
    absoluteDelta: number;
    distinguishing: boolean;
  }>;
}

/**
 * Overall result from validateArchetypeDistinctness.
 */
export interface ArchetypeDistinctnessReport {
  /** True if every archetype pair satisfies the minimum differentiation rule. */
  allPairsPass: boolean;
  /**
   * Total number of pairs checked.
   * For N archetypes: N*(N-1)/2 pairs. For 9 archetypes: 36 pairs.
   */
  totalPairs: number;
  /** Number of pairs that pass the minimum differentiation rule. */
  passingPairs: number;
  /** Number of pairs that fail. */
  failingPairs: number;
  /** Full details for every pair. */
  results: PairValidationResult[];
  /** Pairs that failed the rule, extracted for quick review. */
  failures: PairValidationResult[];
}

/**
 * validateArchetypeDistinctness checks that every pair of archetypes satisfies
 * the minimum differentiation rule:
 *
 *   "Any two archetypes must differ by at least 3 points on at least 2 dimensions."
 *
 * This rule ensures that no two archetypes are so similar that the scoring
 * algorithm would routinely conflate them — which would cause the primary vs.
 * secondary archetype distinction to feel arbitrary to users.
 *
 * Source: RESEARCH.md open question #3 — recommended minimum differentiation rule.
 * Sophia to validate this threshold clinically when reviewing the profiles.
 *
 * Current status: All 36 pairs of the 9 defined archetypes pass this check.
 * (Tightest pairs to be updated after validation run.)
 *
 * @param minimumDistinguishingDimensions - Number of dimensions that must differ
 *   by minimumDelta or more. Default: 2.
 * @param minimumDelta - Minimum point difference to count as "distinguishing."
 *   Default: 3.
 * @returns ArchetypeDistinctnessReport with pass/fail summary and full pair details.
 */
export function validateArchetypeDistinctness(
  minimumDistinguishingDimensions = 2,
  minimumDelta = 3
): ArchetypeDistinctnessReport {
  const results: PairValidationResult[] = [];

  for (let i = 0; i < ARCHETYPES.length; i++) {
    for (let j = i + 1; j < ARCHETYPES.length; j++) {
      const a = ARCHETYPES[i];
      const b = ARCHETYPES[j];
      const dimensionDeltas: PairValidationResult['dimensionDeltas'] = [];
      let distinguishingDimensions = 0;

      for (const key of DIMENSION_KEYS) {
        const valueA = a.dimensionProfile[key] ?? 0;
        const valueB = b.dimensionProfile[key] ?? 0;
        const absoluteDelta = Math.abs(valueA - valueB);
        const distinguishing = absoluteDelta >= minimumDelta;

        if (distinguishing) {
          distinguishingDimensions += 1;
        }

        dimensionDeltas.push({
          dimension: key,
          valueA,
          valueB,
          absoluteDelta,
          distinguishing,
        });
      }

      const passes = distinguishingDimensions >= minimumDistinguishingDimensions;
      results.push({
        archetypeA: a.id,
        archetypeB: b.id,
        distinguishingDimensions,
        passes,
        dimensionDeltas,
      });
    }
  }

  const failures = results.filter((r) => !r.passes);

  return {
    allPairsPass: failures.length === 0,
    totalPairs: results.length,
    passingPairs: results.filter((r) => r.passes).length,
    failingPairs: failures.length,
    results,
    failures,
  };
}
