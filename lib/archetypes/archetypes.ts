/**
 * lib/archetypes/archetypes.ts
 *
 * Complete parenting archetype definitions for the Kin framework.
 *
 * 9 archetypes derived from the KOL synthesis and 11-dimension scoring space
 * (see .planning/phases/00-archetype-framework/kol-synthesis.md for the
 * research derivation; see lib/quiz/dimensions.ts for dimension definitions).
 *
 * Design constraints satisfied here:
 * - Warm, descriptive names describing the parenting the user received — no clinical terms
 * - Every name passes the test: "Would someone proudly share this as how they were raised?"
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
  tagline: 'You grew up anchored.',
  dimensionProfile: profile(9, 8, 5, 8, 3, 7, 8, 7, 8, 6, 7),
  foundationalPatterns: {
    headline: 'You grew up in a home where calm, consistent presence gave you a deep sense of safety you\'ve carried into the world.',
    themes: [
      'Emotional predictability — the people who raised you were consistent; you always knew what to expect from them, and that reliability built your sense of secure attachment from the inside out',
      'Boundaries as an act of love — the clear structure you grew up with communicated care and safety, not control or restriction; limits felt like evidence that someone was paying attention',
      'Regulation modeled under pressure — the home you grew up in showed you that difficult emotions can be felt without being acted on; you absorbed this as your own capacity over time',
      'Warmth and firmness held together — the people who raised you offered both at once, which research identifies as the most protective combination for long-term wellbeing',
      'The safe harbor — you grew up knowing you could return home without judgment, and that freedom gave you the security to explore and take risks in the world',
    ],
    researchAnchor: 'Research on attachment shows that children raised with the authoritative combination — high responsiveness and high structure — develop the strongest foundations for competence, self-reliance, and secure relationships.',
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
    headline: 'Growing up with this kind of steadiness, you may have absorbed a quiet rule: keep things calm, hold it together, don\'t be the one who makes waves. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that emotions are something to manage quietly — many people raised with this kind of predictable calm find that under stress, they default to distance rather than vulnerability, not because they don\'t feel, but because that\'s what felt safe growing up',
      'You may have learned to track the surface of a conversation rather than the undercurrent — the home you grew up in prized equilibrium, and many people raised this way find themselves responding to what was said rather than what was really meant',
      'You may have internalized that consistency means holding to the plan — that served you well in a structured home, but many people raised this way find that rigidity and reliability can look the same from the inside, even when the situation is calling for something different',
      'You may have learned that the person who holds it together does so quietly — the strength you absorbed can sometimes mean that your own need for warmth or support goes unspoken; that served you then, it may not serve you now',
      'You may have learned that the anchor doesn\'t need anchoring — many people raised with steady, capable caregivers find it harder to let others show up for them; the role of the one who holds things together was modeled clearly, but being held was harder to practice',
    ],
    researchAnchor: 'Research on attachment shows that children raised with emotion-dismissing caregivers — even warm, structured ones — often develop a quiet habit of suppressing emotional bids rather than risking disrupting the calm.',
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
  tagline: 'You grew up protected.',
  dimensionProfile: profile(7, 9, 2, 5, 9, 4, 4, 3, 5, 2, 4),
  foundationalPatterns: {
    headline: 'You grew up knowing, with absolute certainty, that the people who raised you would move mountains to keep you safe — and that certainty was its own kind of love.',
    themes: [
      'Love as protection — the care you received was expressed through vigilance and provision; you felt held even when you couldn\'t have articulated why',
      'Clear and consistent expectations — you always knew where the lines were growing up, and that predictability built a particular kind of trust in the people raising you',
      'Unwavering commitment — when the world was difficult or threatening, the people who raised you didn\'t flinch; their loyalty was a bedrock resource you could lean on',
      'Practical reliability — they showed up, they followed through, they handled it; this action-based care ran deep even when it went unremarked',
      'High standards as belief in potential — the expectations the people who raised you held came from genuine investment in your outcomes; you grew up knowing they believed you could meet them',
    ],
    researchAnchor: 'Research on attachment shows that children raised with consistent protective availability develop a secure base for navigating the world — vigilance-as-love is a genuine form of care, particularly where threat was real.',
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
    headline: 'Growing up with this kind of fierce protection, you may have absorbed a quiet rule: the world is dangerous, and safety comes from vigilance. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that the world requires watching — many people raised with high-vigilance caregivers develop their own finely tuned threat-sensitivity; that alertness was useful growing up, but many find it hard to switch off when the actual danger has passed',
      'You may have learned that the people who love you scan for what might go wrong — that grew your own awareness of risk, but many people raised this way find it harder to access the felt sense that they are also capable of handling what comes',
      'You may have absorbed that protection means limiting exposure to difficulty — the home you grew up in kept danger at bay, but many people raised this way find they had fewer chances to discover what they could do when things got hard',
      'You may have learned that worry is how love shows up — the vigilance around you was real and genuine, but many people raised this way find they internalized anxiety as a form of caring, making it hard to rest when nothing is actively wrong',
      'You may have grown up feeling watched more than seen — the protective attention around you was constant, but many people raised this way report a quieter longing: to be received as a person, not just kept safe as a charge',
    ],
    researchAnchor: 'Research on attachment shows that children raised with anxiously intrusive caregivers often develop heightened threat-sensitivity alongside a reduced felt sense of their own competence — the very protection can narrow the space for self-efficacy to grow.',
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
  tagline: 'You grew up held.',
  dimensionProfile: profile(9, 3, 8, 7, 3, 5, 9, 8, 6, 7, 9),
  foundationalPatterns: {
    headline: 'You grew up knowing that your inner world mattered — and that knowledge became the foundation of your emotional intelligence.',
    themes: [
      'Emotional fluency — the home you grew up in was a place where feelings were named, received, and worked through rather than managed or suppressed; this emotional vocabulary is one of the most protective gifts a childhood can give',
      'Genuine presence — the people who raised you were truly with you when they were with you; they noticed your emotional state, tracked your experience, and responded to what you were actually feeling rather than what they expected you to feel',
      'Autonomy and trust — the people who raised you believed in your capacity to navigate your own experience; they offered support without taking over, which built your genuine self-direction over time',
      'Non-judgment as invitation — you grew up knowing you could share things without the immediate threat of being fixed, lectured, or reacted at; that trust was earned through consistent emotional availability and it shaped how you learned to receive yourself',
      'Emotional intelligence inherited — research on Gottman\'s emotion-coaching model shows that children raised with consistent emotional attunement develop stronger empathy, better peer relationships, and greater emotional self-regulation',
    ],
    researchAnchor: 'Research on attachment shows that children raised in emotion-coaching environments — where feelings are named, validated, and worked through — develop the strongest foundations for emotional intelligence and relational capacity.',
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
    headline: 'Growing up with this kind of warmth, you may have absorbed a quiet rule: love means making the discomfort stop. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that feelings are best resolved quickly — the warmth around you moved swiftly to soothe; many people raised this way find it harder to sit with discomfort in themselves or others, because resolution was always close at hand growing up',
      'You may have learned that love means being met wherever you are — the deep attunement you grew up with was a gift, but many people raised this way find they struggle when relationships have edges or limits, because softness was the primary language they knew',
      'You may have absorbed that structure and warmth are opposites — the home you grew up in prized warmth above all; many people raised this way find that encountering firm limits later in life feels like a form of rejection, even when it isn\'t',
      'You may have learned that your discomfort is something others will move to ease — that was true in the home you grew up in; many people raised this way find it harder to develop tolerance for the friction that\'s simply part of being alive and in relationship',
      'You may have internalized that being truly seen means always being received — the unconditional quality of the warmth around you was real and precious, but many people raised this way find it harder to receive honest feedback without it feeling like a withdrawal of love',
    ],
    researchAnchor: 'Research on attachment shows that children raised in high-warmth, low-structure environments often develop strong emotional vocabulary but lower frustration tolerance — the structure that teaches self-regulation was part of what was missing.',
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
  tagline: 'You grew up given room to become yourself.',
  dimensionProfile: profile(6, 7, 10, 8, 2, 6, 9, 9, 8, 9, 8),
  foundationalPatterns: {
    headline: 'You grew up in a home where parenting was approached as one of the most conscious and transformative acts a person can undertake — and that intention shaped the space you had to become yourself.',
    themes: [
      'Deliberate responsiveness — the people who raised you paused between trigger and response; you grew up in that gap, and research on conscious parenting identifies it as the space where intergenerational patterns either repeat or change',
      'Scaffolding independence — the people who raised you saw their role as building your capacity to navigate your own life; they offered support that developed your competence rather than substituting for it',
      'Curiosity about you — you were raised with genuine inquiry directed at you; the questions were not just "what did you do?" but "what were you thinking?" and "what is this moment asking of you?" — your inner world was treated as worth understanding',
      'Growth as a shared orientation — you grew up in an environment that genuinely believed both adults and children are always capable of learning and expanding; mistakes were treated as data, not verdicts',
      'Trust in your process — the people who raised you were deeply comfortable with you having experiences that were yours, making decisions that were yours, and learning from consequences that were yours; they didn\'t need to manage your story',
    ],
    researchAnchor: 'Research on attachment shows that children raised with high autonomy support and deliberate emotional attunement develop strong internal compasses and greater capacity to pause and choose their responses — rather than react automatically.',
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
    headline: 'Growing up with this kind of thoughtful, purpose-driven parenting, you may have absorbed a quiet rule: feelings need to be understood before they can be felt. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that emotions are best approached with analysis — the home you grew up in prized reflective intelligence; many people raised this way find they move quickly to make sense of a feeling rather than simply being inside it, which can create a subtle distance from their own emotional experience',
      'You may have learned that warmth comes through attention and intention — the care you received was real, but it was often careful; many people raised this way find that spontaneous, unpremeditated warmth is harder to give and receive, because love in their home was thoughtful rather than effortlessly felt',
      'You may have internalized that growth is the point — the conscious-parenting lens gave you space to become yourself, but many people raised in deliberate households find they approach their own lives as a project to optimize, which can make it hard to simply inhabit the present',
      'You may have learned to reach for the right response rather than the natural one — that reflective capacity is a genuine strength, but many people raised this way find that spontaneity and play can feel unfamiliar, even slightly unsafe, compared to the considered mode they grew up in',
      'You may have been given intellectual understanding of your parents\' history without the visceral emotional integration that makes it truly settled — insight was valued in your home, but research suggests that intellectual knowledge of the past and its emotional resolution are different things',
    ],
    researchAnchor: 'Research on attachment shows that children raised in high-attunement, intellectually oriented households sometimes develop strong self-awareness alongside a more tentative relationship with their own spontaneous emotional life — reflection was so prized that raw feeling became harder to trust.',
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
  tagline: 'You grew up watching someone rewrite the story.',
  dimensionProfile: profile(8, 6, 9, 9, 5, 10, 7, 9, 7, 7, 8),
  foundationalPatterns: {
    headline: 'The people who raised you had done their own hard, quiet work of understanding where they came from — and that work shaped the home you grew up in.',
    themes: [
      'Earned coherence modeled — research identifies the "earned secure" adult as one of the most remarkable outcomes in attachment science: someone who experienced adversity in their own upbringing but did the integrative work to narrate it with clarity and resolution; you grew up watching this in practice',
      'Pattern-breaking as a lived value — the people who raised you were aware of the intergenerational currents running through your family history, and they actively chose which to carry forward and which to redirect; you absorbed this intentionality as your inheritance',
      'Resilience built through honest modeling — the emotional regulation you saw growing up was built, not given; it came from hard experience, and watching someone carry difficulty with openness taught you that this is possible',
      'Wisdom from the inside — the people who raised you understood adversity from the inside, and that gave their empathy a particular quality; when things were hard for you, they knew what hard felt like, and that knowing shaped how they showed up',
      'A home that believed in growth — because the people who raised you had to find their own footing, they understood intrinsically what it takes to build an inner compass; they gave you that space deliberately, and with meaning',
    ],
    researchAnchor: 'Research on attachment shows that children raised by "earned secure" caregivers — adults who integrated difficult histories through reflection and narrative work — inherit the same attachment security as children raised by those who never faced adversity.',
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
    headline: 'Growing up with this kind of conscious, hard-won parenting, you may have absorbed a quiet rule: the past is always present, and healing is never fully done. That served you then. It may not serve you now.',
    themes: [
      'You may have grown up aware of your parents\' healing journey in ways that put some of the weight of that story on you — the people who raised you were doing real and meaningful work, but many people raised this way find they absorbed a sense of responsibility for that journey, or felt the shadow of what came before even when the present was actually safe',
      'You may have learned that the past is always something to be understood — the home you grew up in took history seriously; many people raised this way find it harder to simply inhabit an uncomplicated moment without scanning it for meaning or significance',
      'You may have internalized that healing is ongoing and never quite complete — that vigilance was modeled as wisdom, and it is; but many people raised this way find they carry a low-level alertness to regression that makes full rest harder to access',
      'You may have been the witness to someone else\'s transformation — there is something profound about growing up alongside a parent doing real inner work, but many people raised this way find they carry a weight of being both inspired by and responsible for that transformation',
      'You may have absorbed a moderate alertness rooted in your family\'s history — the adaptive vigilance you grew up around is generally protective; under stress it can over-activate, particularly in situations that echo older family patterns you know by name',
    ],
    researchAnchor: 'Research on attachment shows that children raised in households shaped by a parent\'s healing journey sometimes absorb a preoccupied relationship with the past — not because the healing failed, but because the story of healing was itself ever-present.',
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
  tagline: 'You grew up expected to be capable.',
  dimensionProfile: profile(4, 9, 7, 6, 2, 6, 4, 3, 6, 4, 3),
  foundationalPatterns: {
    headline: 'You grew up with something rare: people who genuinely believed you were capable of hard things, and who structured the world to prove it.',
    themes: [
      'High expectations as a form of respect — the people who raised you held you to standards because they believed in your capacity, not because they needed you to perform; you grew up with the felt sense that they thought you could handle real things',
      'Real responsibility, real agency — you were given meaningful roles and actual consequences growing up, which built your competence and the felt sense that your actions mattered in the world',
      'Exposure to productive difficulty — the people who raised you understood that growth requires struggle; they resisted the instinct to smooth every path, and you developed frustration tolerance and resilience because you encountered real challenges',
      'Clear structure as cognitive relief — the consistent expectations you grew up with freed your attention from navigating ambiguity; you could focus on the task at hand rather than reading the room for rules that kept changing',
      'Preparation over protection — the people who raised you prepared you for the world you would actually encounter rather than trying to insulate you from it; this forward-looking investment was a genuine form of care',
    ],
    researchAnchor: 'Research on attachment shows that children raised with high structure and genuine belief in their capacity develop strong self-reliance and frustration tolerance — the experience of being expected to handle hard things builds the muscle to do so.',
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
    headline: 'Growing up with this kind of high-structure, capability-first home, you may have absorbed a quiet rule: what you do is who you are. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that competence is how you earn your place — the home you grew up in communicated investment through expectations; many people raised this way find it harder to feel loved simply for existing, because love in their home was expressed through standards rather than warmth',
      'You may have learned to read love in action rather than in feeling — the care you received was real but it lived in follow-through, preparation, and investment in your outcomes; many people raised this way find the emotional language of warmth, affection, and verbal affirmation harder to trust or give, because that wasn\'t the primary dialect at home',
      'You may have absorbed that emotional flooding is something to redirect — the home you grew up in was more comfortable with challenge than with overwhelm; many people raised this way find their instinct when they or someone they love is emotionally dysregulated is to move to behavior rather than to sit inside the feeling',
      'You may have grown up with a narrower frame for what counts — when competence and achievement were the primary measures, your emotional struggles, social difficulties, or creative departures may have gotten less support; many people raised this way find those domains feel faintly less legitimate even in adulthood',
      'You may have learned that rest, play, and wandering require justification — the home you grew up in prized visible results; many people raised this way find that activities with no clear output carry a quiet sense of wrongness, as if not being productive is a small failure',
    ],
    researchAnchor: 'Research on attachment shows that children raised in low-warmth, high-structure environments often develop strong competence alongside a more tentative relationship with their own emotional life — the achievement frame was clear; the emotional one was harder to find.',
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
  tagline: 'You grew up loved by someone still learning how.',
  dimensionProfile: profile(8, 6, 5, 8, 7, 3, 8, 7, 4, 6, 7),
  foundationalPatterns: {
    headline: 'You grew up with a whole-hearted presence — warmth, sensitivity, and a genuine commitment to you that showed up even when the people who raised you were still finding their own footing.',
    themes: [
      'Emotional generosity given freely — the people who raised you gave from the heart; you experienced caregivers who were genuinely present with your feelings and who responded to the texture of your emotional life, not just its surface',
      'Attuned responsiveness — the people who raised you noticed what you were actually experiencing and responded to that, rather than to what they thought you should be experiencing; this attunement was a cornerstone of the relationship you knew',
      'Growth as a shared practice — you grew up watching adults who were also works in progress; you learned that learning and changing are not just things children do, they\'re what people do when they take themselves and their relationships seriously',
      'Warmth that didn\'t disappear under pressure — the emotional availability in your home didn\'t vanish when things got hard; you grew up knowing you could bring difficulty to the relationship, which kept it open through challenge',
      'Heart-led engagement — the people who raised you came to you with curiosity and care rather than strategy or agenda; this created the quality of relationship that stays with you — you know what it felt like to be genuinely approached',
    ],
    researchAnchor: 'Research on attachment shows that children raised with consistent emotional availability develop the secure base that allows them to explore, to seek support, and to develop the emotional intelligence that comes from being truly met.',
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
    headline: 'Growing up with someone still finding their own story, you may have absorbed a quiet rule: their emotional state is something you need to track. That served you then. It may not serve you now.',
    themes: [
      'You may have learned to monitor the emotional weather in the room — the people who raised you were attuned and warm, but their own story was still in process; many people raised this way develop a finely calibrated sense of how the adults around them are doing, because that felt like important information growing up',
      'You may have experienced the line between their feelings and yours as permeable — the warmth in your home was real and genuine, but many people raised this way find that empathy and merger can be hard to distinguish; you absorbed feelings along with care, and separating the two takes practice',
      'You may have grown up with love that was steady but structure that moved — the emotional availability in your home was consistent; the limits were less so; many people raised this way find that unpredictability in structure creates a low-level ambient anxiety, even inside a very warm relationship',
      'You may have learned that closeness means staying close — the warmth and warmth-forward vigilance of the home you grew up in sometimes read as wanting you near; many people raised this way find their own independence carries a faint guilt, as if growing autonomous is a form of leaving',
      'You may have been part of someone\'s healing story in ways you didn\'t choose — there is something real and meaningful about growing up alongside a person doing genuine inner work; many people raised this way also carry a quiet awareness that some of what was theirs got taken up by what was their parents\'',
    ],
    researchAnchor: 'Research on attachment shows that children raised by caregivers with lower narrative coherence — even deeply loving ones — often develop a heightened alertness to adult emotional states, because that attunement was woven into how they stayed safe and connected.',
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
  tagline: 'You grew up championed.',
  dimensionProfile: profile(8, 8, 5, 6, 3, 5, 7, 5, 7, 3, 2),
  foundationalPatterns: {
    headline: 'You grew up knowing you had people who would go to the ends of the earth for you — their investment in your growth was total, visible, and deeply felt.',
    themes: [
      'All-in investment — the people who raised you brought their full energy, resources, and attention to your development; you experienced caregivers who cared enough to show up completely and consistently',
      'Visible love through action — the care you received was demonstrated through sacrifice, preparation, and active engagement in your life; the people who raised you knew your teachers, your friends, your struggles, and your aspirations',
      'High standards as belief in you — the expectations held for you came from a genuine conviction that you were capable of great things; you were held to standards because the people who raised you saw your potential clearly',
      'Advocacy and championing — when you faced obstacles, the people who raised you did not stand by passively; they actively worked to remove barriers and create opportunities, and you grew up knowing someone was fighting in your corner',
      'Consistency and reliability — you could count on the people who raised you to follow through; when they committed to something, it happened, and that reliability created a stable platform for your development',
    ],
    researchAnchor: 'Research on attachment shows that children raised with high investment and consistent follow-through develop strong self-efficacy and a felt sense that their growth matters to the people around them — being championed is a genuine form of love.',
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
    headline: 'Growing up with this kind of devoted investment, you may have absorbed a quiet rule: love comes with expectations, and approval is something you earn. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that warmth rises when you meet the standard — the investment around you was real, but many people raised this way are acutely sensitive to shifts in parental warmth based on performance; even if nothing was ever said explicitly, the emotional temperature changed, and you noticed',
      'You may have internalized that you need to continuously re-earn approval — the deep investment in your outcomes communicated belief in you, but many people raised this way find themselves perpetually reaching for validation, because enough never quite felt final',
      'You may have grown up having your direction shaped more than it was discovered — the championing around you was genuine, but many people raised this way find that the vision others held for them was stronger than the space to find their own; your preferences may have been heard, but the plan was already formed',
      'You may have absorbed that sacrifice creates an implicit debt — the depth of investment and commitment around you was real; many people raised this way find a quiet internal ledger, a sense that the love they received came with an unspoken expectation of compliance or gratitude in return',
      'You may have learned that wanting something different is a kind of betrayal — when the people who raised you had championed a path, your genuine desire to diverge may have been experienced as a rejection of their investment; many people raised this way find that individuation still carries a faint charge of disloyalty',
    ],
    researchAnchor: 'Research on attachment shows that children raised with conditional warmth — even deeply invested, well-intentioned warmth — often internalize performance as the price of love, developing an ongoing sensitivity to whether they have done enough to remain approved of.',
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
  tagline: 'You grew up with a voice in the room.',
  dimensionProfile: profile(6, 4, 8, 7, 3, 7, 6, 7, 6, 10, 9),
  foundationalPatterns: {
    headline: 'You grew up knowing your voice mattered — not as a courtesy but as a genuine force in the family\'s direction.',
    themes: [
      'Genuine power-sharing experienced — the people who raised you treated you as a legitimate contributor to family decisions; your preferences, ideas, and objections were not just heard but genuinely influenced outcomes, and you grew up with the felt sense that your voice had weight in the world',
      'Unconditional acceptance as foundation — the love you received growing up did not fluctuate with your behavior or achievements; that stable acceptance freed you to take risks, make mistakes, and develop authentically without fear of losing their regard',
      'Cooperation modeled in the relationship — you grew up watching relationships work through contribution, negotiation, and mutual influence; you learned collaborative skills from the most important relationship in your early life',
      'Democratic rule-setting — when limits were needed in your home, you were often involved in creating them; research shows that children who participate in rule-setting are more likely to internalize and follow those rules, and you grew up with that experience',
      'Deep respect for your perspective — the people who raised you genuinely believed you saw things they might miss, and they were willing to be changed by what you saw; this mutual influence built trust and your confidence in your own judgment',
    ],
    researchAnchor: 'Research on attachment shows that children raised in genuinely bidirectional relationships — where their input was sought and valued — develop deeper internalization of shared values and greater confidence in their own perspective and judgment.',
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
    headline: 'Growing up with this kind of collaborative, partnership-oriented home, you may have absorbed a quiet rule: all decisions deserve a conversation. That served you then. It may not serve you now.',
    themes: [
      'You may have learned that authority requires justification — the home you grew up in democratized decisions as a matter of principle; many people raised this way find it harder to trust or accept directives that arrive without explanation, because that wasn\'t the relational norm they knew',
      'You may have grown up with the expectation that your perspective would be genuinely incorporated — that was real and valuable; many people raised this way find that encounters with structures where their input doesn\'t change outcomes feel especially disorienting or unfair',
      'You may have absorbed that clear authority is a form of disrespect — the collaborative quality of your home reframed power as something to be shared; many people raised this way find that firm unilateral limits — at work, in relationships, in life — carry a faint charge of violation, even when they\'re appropriate',
      'You may have experienced more partnership than generational clarity — the egalitarian quality of your home was a gift, but many people raised this way find it harder to rest inside someone else\'s authority when the situation genuinely calls for it; the footing of being led is less familiar',
      'You may have learned that acceptance means accepting all of who someone is, always — the unconditional regard you grew up with was genuine; many people raised this way find that the line between accepting a person and accepting all their choices blurs, both in how they received feedback growing up and in how they hold limits now',
    ],
    researchAnchor: 'Research on attachment shows that children raised in highly democratic, low-structure environments often develop strong collaborative instincts alongside a lower tolerance for unilateral authority — the shape of power they grew up with becomes the shape they expect in the world.',
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
 * Content fields (foundationalPatterns, watchouts) reframed to parents-lens in Phase 2.5.
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
