/**
 * lib/quiz/dimensions.ts
 *
 * Scoring dimension definitions for the Raising Giants archetype framework.
 *
 * Dimensions are the intermediate layer in the two-step scoring algorithm:
 *   Step 1: Quiz answers × question weights → dimension scores per user
 *   Step 2: User dimension profile vs. archetype reference profiles → ranked result
 *
 * The 7 dimensions here were derived from cross-referencing 10+ parenting
 * research frameworks (see .planning/phases/00-archetype-framework/kol-synthesis.md).
 * Each dimension is present in multiple validated instruments and can be
 * operationalized via natural-feeling self-report quiz questions.
 *
 * All dimensions are scored 1-10:
 *   1-3 = Low expression of the dimension
 *   4-6 = Mid-range / mixed expression
 *   7-10 = High expression of the dimension
 *
 * Exports: DIMENSION_KEYS (string array), DIMENSIONS (DimensionDefinition array)
 */

import type { DimensionKey, DimensionDefinition } from '../archetypes/types';

// ---------------------------------------------------------------------------
// Dimension key constants
// ---------------------------------------------------------------------------

/**
 * DIMENSION_KEYS is the canonical ordered list of dimension identifiers.
 *
 * Order matters for display consistency. Do not reorder without updating
 * any existing stored DimensionProfile records.
 */
export const DIMENSION_KEYS: DimensionKey[] = [
  'emotional-warmth',
  'boundary-consistency',
  'autonomy-support',
  'emotional-regulation',
  'protective-instinct',
  'narrative-coherence',
  'presence-attunement',
] as const;

// ---------------------------------------------------------------------------
// Dimension definitions
// ---------------------------------------------------------------------------

/**
 * DIMENSIONS is the complete metadata array for all scoring dimensions.
 *
 * This is the runtime data consumed by:
 * - Question bank (weight mapping from answers to dimension scores)
 * - Scoring algorithm (dimension-to-archetype similarity calculation)
 * - Admin/validation tooling (display names, labels, Sophia's review interface)
 * - Future question bank authoring (candidateQuestions as seed ideas)
 */
export const DIMENSIONS: DimensionDefinition[] = [
  // -------------------------------------------------------------------------
  // Dimension 1: Emotional Warmth
  // -------------------------------------------------------------------------
  {
    key: 'emotional-warmth',
    name: 'Emotional Warmth',
    description:
      'The degree to which a parent provides physical and verbal affection, emotional ' +
      'acceptance, and consistent emotional availability. Measures not just whether warmth ' +
      'is felt internally but how readily and explicitly it is expressed — through words, ' +
      'touch, attunement to emotional states, and responsive comfort. This is the most ' +
      'cross-validated dimension in the parenting literature.',
    lowLabel:
      'Affection primarily expressed through provision, reliability, and practical care ' +
      'rather than verbal or physical warmth. Emotional expression feels private or ' +
      'unnecessary. Love is shown by doing, not by saying.',
    highLabel:
      'Openly and frequently expressive of love and acceptance. Comfortable with physical ' +
      'affection and verbal reassurance. Attuned to the child\'s emotional state and responds ' +
      'visibly. Warmth feels like a natural, ongoing part of the relationship.',
    researchAnchors: [
      'Baumrind (1967) — Responsiveness axis of Parenting Styles framework',
      'Gottman (1997) — Empathic attunement as core of Emotion Coaching',
      'PBDQ Factor 1 — Emotional Warmth (Louwerse et al., 2011; PMC4456141)',
      'Ainsworth (1978) — Sensitive responsiveness as marker of secure attachment',
    ],
    candidateQuestions: [
      // Past lens (how you were raised)
      'When you were upset as a child, how often did a parent sit with you, hold you, or tell you everything would be okay?',
      // Current/Aspirational lens (how you parent or want to parent)
      'When your child comes to you after a hard day, your instinct is to... (offer a hug and ask what happened / give them space to settle before checking in / make sure they\'re okay from a distance)',
      // Behavioral indicator (works across lenses with reframing)
      'How often do you (or did your parents) say "I love you" out loud — not just imply it through actions?',
    ],
    lensNotes:
      'Applies to all three lenses but question framing differs. Past lens: memory-based ' +
      '("how often did your parents..."). Current: behavioral present-tense ("when your ' +
      'child..."). Aspirational: ideal-state framing ("in your ideal relationship with your ' +
      'child..."). Score distributions may differ across lenses — Past scores tend to have ' +
      'higher variance than Current as memories are reconstructed.',
  },

  // -------------------------------------------------------------------------
  // Dimension 2: Boundary Consistency
  // -------------------------------------------------------------------------
  {
    key: 'boundary-consistency',
    name: 'Boundary Consistency',
    description:
      'The degree to which a parent sets clear, predictable expectations and follows ' +
      'through on them consistently. Measures not just whether rules exist but whether ' +
      'they are reliably enforced, age-appropriately explained, and applied without large ' +
      'fluctuation based on the parent\'s mood or convenience. High scores reflect firm, ' +
      'reliable structure; low scores reflect variable or absent rule-enforcement. This is ' +
      'the second axis of the foundational Baumrind framework.',
    lowLabel:
      'Rules shift frequently or are rarely enforced. Children learn that limits are ' +
      'negotiable and that persistence or emotional escalation changes outcomes. Structure ' +
      'feels unpredictable or absent. Boundaries may be stated but rarely held.',
    highLabel:
      'Clear, consistent expectations that children can count on. When a limit is set, it ' +
      'is held — kindly but firmly. Children experience the parent as reliable and ' +
      'predictable. Rules are explained at an age-appropriate level.',
    researchAnchors: [
      'Baumrind (1967) — Demandingness axis of Parenting Styles framework',
      'Maccoby & Martin (1983) — High/low demandingness axis in 4-quadrant extension',
      'PBDQ Factor 5 (inverse) — Permissive Discipline (Louwerse et al., 2011; PMC4456141)',
      'PBDQ Factor 6 — Democratic Discipline (collaborative rule-setting at the high end)',
    ],
    candidateQuestions: [
      // Past lens
      'As a child, when you pushed back on a rule, what usually happened? (The rule held / It depended on who you asked or what mood they were in / The rule often gave way)',
      // Current/Aspirational lens
      'When you set a limit with your child and they push back, how often do you hold the line without giving in?',
      // Behavioral across lenses
      'How predictable were the household rules you grew up with — did you know what to expect, or were consequences a surprise?',
    ],
    lensNotes:
      'Applies to all three lenses. Past lens questions reference parental rule-setting ' +
      'from the child\'s perspective. Current/Aspirational questions reference the parent\'s ' +
      'own rule-setting behavior. The dimension is more concrete and less susceptible to ' +
      'social desirability bias than Autonomy Support because rule-enforcement is behaviorally ' +
      'observable and easy to recall.',
  },

  // -------------------------------------------------------------------------
  // Dimension 3: Autonomy Support
  // -------------------------------------------------------------------------
  {
    key: 'autonomy-support',
    name: 'Autonomy Support',
    description:
      'The degree to which a parent scaffolds the child\'s independence and self-determination ' +
      'rather than making decisions for them, over-directing their choices, or fostering ' +
      'dependence. High scores reflect encouraging exploration, allowing age-appropriate ' +
      'decision-making, and tolerating the discomfort of watching a child struggle toward ' +
      'competence. Low scores reflect over-involvement, enmeshment, or a parenting style ' +
      'that systematically substitutes the parent\'s judgment for the child\'s own.',
    lowLabel:
      'Tends to step in, solve, or decide rather than let the child figure things out. ' +
      'Discomfort with the child\'s struggle, failure, or making "wrong" choices. May ' +
      'experience the child\'s choices as reflective of the parent\'s own competence or identity.',
    highLabel:
      'Actively creates space for the child to try, fail, and try again without rescuing. ' +
      'Comfortable with age-appropriate risk and messy autonomy. Curious about the child\'s ' +
      'own preferences and choices rather than steering toward a predetermined outcome.',
    researchAnchors: [
      'Baumrind (1967) — Authoritative parenting as autonomy-granting within structure',
      'PBDQ Factor 4 — Autonomy Support (Louwerse et al., 2011; PMC4456141)',
      'Tsabary (2010) — Conscious Parenting: allowing the child\'s own selfhood to emerge',
    ],
    candidateQuestions: [
      // Past lens
      'Growing up, when you had a problem or a decision to make, how often did your parents let you work it out yourself before stepping in?',
      // Current/Aspirational lens
      'When your child is struggling with something they could figure out given enough time, your instinct is to... (wait and let them work it through / offer hints / step in and help them finish)',
      // Behavioral indicator
      'How comfortable are you watching your child make a choice you think is wrong, without saying anything?',
    ],
    lensNotes:
      'Applies to all three lenses but carries social desirability risk — most parents ' +
      'believe they should support autonomy and may answer aspirationally even for Current ' +
      'lens questions. Question design should use concrete behavioral scenarios rather than ' +
      'abstract value questions ("Do you believe in autonomy?"). Aspirational lens questions ' +
      'may show systematically higher scores than Current lens; the gap between Current and ' +
      'Aspirational on this dimension is clinically informative.',
  },

  // -------------------------------------------------------------------------
  // Dimension 4: Emotional Regulation and Coaching
  // -------------------------------------------------------------------------
  {
    key: 'emotional-regulation',
    name: 'Emotional Regulation and Coaching',
    description:
      'Two tightly coupled constructs measured as one dimension: (a) how well the parent ' +
      'manages their own emotional activation — particularly under stress or when the child ' +
      'is emotionally dysregulated — and (b) whether the parent coaches the child\'s ' +
      'emotions (validates, names, helps process feelings) or dismisses, ignores, or ' +
      'pathologizes them. High scores reflect regulated, curious, coaching responses to ' +
      'child distress. Low scores reflect reactive, dismissing, or punitive responses. ' +
      'Gottman\'s research identifies this as the single strongest predictor of child ' +
      'emotional intelligence.',
    lowLabel:
      'Tends to react when emotionally activated — may escalate, shut down, withdraw, or ' +
      'punish the child\'s emotional expression. Child\'s big feelings feel threatening or ' +
      'overwhelming. May dismiss ("you\'re fine"), minimize ("stop crying"), or inadvertently ' +
      'punish emotional expression.',
    highLabel:
      'Stays regulated enough to stay present when the child is upset. Names feelings, ' +
      'validates the emotional experience without needing to fix it, and helps the child ' +
      'move through the emotion rather than suppressing it. Treats the child\'s emotional ' +
      'expression as a window and an opportunity, not a problem.',
    researchAnchors: [
      'Gottman (1997) — Emotion Coaching vs. Emotion Dismissing parenting styles',
      'Siegel (2010) — Emotional integration; the window of tolerance in parenting',
      'Tsabary (2010) — Conscious vs. reactive parenting',
      'Siegel & Hartzell (2003) — Triggered reactivity when parent\'s own unresolved past is activated',
    ],
    candidateQuestions: [
      // Past lens — how the parent's own emotions were handled growing up
      'When you were upset as a child, how did the adults around you typically respond? (They stayed with me and helped me feel understood / They told me to calm down or that I was overreacting / They seemed uncomfortable and changed the subject)',
      // Current lens — how the parent responds to the child's emotions now
      'When your child is having a meltdown or an emotional outburst, which best describes your internal experience? (I can stay grounded and focus on them / I feel myself getting tense or frustrated / I need to step away to calm myself down)',
      // Behavioral indicator
      'How often do you find yourself saying things you later regret when a conversation with your child gets heated?',
    ],
    lensNotes:
      'Applies to all three lenses but framing varies substantially. Past lens captures how ' +
      'the parent\'s own emotional expressions were received growing up — this is the ' +
      'intergenerational mechanism. Current lens captures present-tense emotional response ' +
      'patterns. Aspirational lens captures the coaching aspiration. This dimension is the ' +
      'primary link between Past lens scores and Current lens predictions (intergenerational ' +
      'transmission of emotional regulation patterns is well-documented). Higher-variance ' +
      'dimension in past-only completions.',
  },

  // -------------------------------------------------------------------------
  // Dimension 5: Protective Instinct and Vigilance
  // -------------------------------------------------------------------------
  {
    key: 'protective-instinct',
    name: 'Protective Instinct and Vigilance',
    description:
      'The degree to which a parent\'s behavior is organized around preventing harm, ' +
      'monitoring for threats, and maintaining control over the child\'s environment out of ' +
      'anxiety rather than curiosity. This dimension is clinically distinct from Boundary ' +
      'Consistency: a parent can be low on boundary consistency and high on protective ' +
      'instinct (anxiously hovering without clear rules). Mid-range scores represent the ' +
      'healthy, adaptive protective drive present in all engaged parenting; extreme high ' +
      'scores reflect PBDQ\'s "Anxious Intrusiveness" — over-protection that constrains ' +
      'the child\'s development.',
    lowLabel:
      'Comfortable with the child taking age-appropriate risks and facing natural consequences. ' +
      'Does not spend significant mental energy anticipating harm or monitoring for threats. ' +
      'Tends to trust the child\'s environment and other caregivers without persistent anxiety.',
    highLabel:
      'Strong, persistent drive to protect — significant mental energy devoted to monitoring ' +
      'for threats, anticipating dangers, and preventing harm. May find it very difficult to ' +
      'allow age-appropriate risk. The child\'s safety is a dominant organizing concern. ' +
      'At extreme high, the protective drive can restrict the child\'s autonomy and transmit ' +
      'anxiety.',
    researchAnchors: [
      'PBDQ Factor 3 — Anxious Intrusiveness (Louwerse et al., 2011; PMC4456141)',
      'Ainsworth (1978) — Anxious/Ambivalent attachment: hyperactivated protective system in caregiver',
      'van IJzendoorn (1995) — Intergenerational transmission of anxious attachment patterns',
    ],
    candidateQuestions: [
      // Past lens — protective patterns the parent experienced
      'Growing up, how often did your parents seem worried about your safety in situations that felt normal to you?',
      // Current lens — the parent's own protective behavior
      'How much mental energy do you spend worrying about things that could go wrong for your child — even when they\'re doing something ordinary?',
      // Behavioral indicator
      'When your child wants to do something that feels slightly risky (climbing higher, going somewhere alone for the first time), your instinct is to... (encourage them and stay close if needed / assess carefully and decide based on specifics / say no or wait until they\'re older)',
    ],
    lensNotes:
      'Applies to all three lenses but framing differs. Past lens asks about the protective ' +
      'patterns experienced as a child. Current/Aspirational ask about the parent\'s own ' +
      'protective behavior. Note: the Past lens for this dimension captures the parental home ' +
      'environment (anxious vs. relaxed household), which is a significant predictor of the ' +
      'parent\'s own anxiety patterns (intergenerational transmission of anxious attachment). ' +
      'Avoid labeling this "helicopter parenting" in questions — the phrase triggers defensive ' +
      'responses and reduces honest answering.',
  },

  // -------------------------------------------------------------------------
  // Dimension 6: Narrative Coherence
  // -------------------------------------------------------------------------
  {
    key: 'narrative-coherence',
    name: 'Narrative Coherence About Own Past',
    description:
      'How coherently and with what level of emotional integration a parent can describe ' +
      'and make sense of their own childhood experience. The key research finding (Main, ' +
      'van IJzendoorn) is that it is not the quality of the childhood but the coherence of ' +
      'the story that predicts parenting quality. A parent who had a genuinely difficult ' +
      'childhood and can tell that story with emotional access, contextual understanding, ' +
      'and without being overwhelmed by or dismissing of it (Earned Secure) is more likely ' +
      'to transmit secure attachment than a parent who had a "good" childhood but cannot ' +
      'narrate it coherently.',
    lowLabel:
      'Difficulty telling a coherent, nuanced story about childhood. May idealize (vague ' +
      'positives, few specific memories), dismiss (childhood was fine, nothing to examine), ' +
      'or become preoccupied (overwhelmed, angry, or confused when describing the past). ' +
      'The narrative has gaps, contradictions, or emotional flooding.',
    highLabel:
      'Can tell a nuanced, emotionally accessible story about their own childhood — including ' +
      'both positive and difficult experiences — with contextual understanding of why parents ' +
      'behaved as they did, without excusing harm. The story has a beginning, middle, and end. ' +
      'Has "made sense" of the past in a way that does not require avoiding or reliving it.',
    researchAnchors: [
      'Siegel (2010) — Narrative coherence as marker of Mindsight; autobiographical integration',
      'Main (1984) — Adult Attachment Interview (AAI): coherence of transcript as primary coding variable',
      'Siegel & Hartzell (2003) — Parenting from the Inside Out: unresolved narrative leads to triggered reactive parenting',
      'van IJzendoorn (1995) — AAI coherence predicts infant attachment classification in meta-analysis (PMC3060612)',
    ],
    candidateQuestions: [
      // Past lens — directly relevant to the core quiz
      'If someone asked you to describe your childhood in five minutes, how easy would it be to give a clear, organized picture — including both the good parts and the hard parts?',
      // Past lens — accessing emotional texture
      'When you think about your upbringing, do you tend to see it as mostly positive, mostly difficult, or genuinely mixed — and does that picture feel clear to you?',
      // Past lens — integration indicator
      'Do you find that your thinking about your own parents has shifted or become more nuanced as you\'ve gotten older, or does it feel largely the same as it did when you were young?',
    ],
    lensNotes:
      'This dimension applies primarily to the Past lens. The three candidate questions ' +
      'above are Past lens questions. For the Current lens, Narrative Coherence manifests ' +
      'differently — it shows up in how the parent responds when triggered by the child ' +
      '(captured better by Emotional Regulation). For the Aspirational lens, it may not ' +
      'be directly scoreable. Sophia to confirm: should this dimension be Past-lens-only ' +
      'in the scoring algorithm, or should a modified form apply to Current lens? ' +
      'Note: these questions may require the most careful UI framing — "Why we ask this" ' +
      'helper text is important to explain that the goal is self-understanding, not evaluation.',
  },

  // -------------------------------------------------------------------------
  // Dimension 7: Presence and Attunement
  // -------------------------------------------------------------------------
  {
    key: 'presence-attunement',
    name: 'Presence and Attunement',
    description:
      'The degree to which a parent is genuinely present and attuned to the child\'s ' +
      'actual emotional state and needs in real time versus parenting from their own ' +
      'agenda, unmet needs, or unconscious projections. High scores reflect conscious, ' +
      'responsive parenting that reads the child\'s present state and responds to it. ' +
      'Low scores reflect automatic or reactive parenting that is organized around the ' +
      'parent\'s own emotional needs — what Tsabary calls "projection" rather than ' +
      '"presence." This dimension captures the awakened-vs-automatic axis that cuts ' +
      'across warmth and structure levels.',
    lowLabel:
      'Frequently parenting on autopilot — responding to who the child was, or who the ' +
      'parent needs the child to be, rather than who they actually are in this moment. ' +
      'Own emotional needs, anxieties, or unfinished business from childhood regularly ' +
      'colors perception of the child\'s behavior and motivations.',
    highLabel:
      'Able to pause, observe, and genuinely ask "what is my child experiencing right now?" ' +
      'before responding. Parenting is responsive to the child\'s actual state, not filtered ' +
      'through the parent\'s projection. Comfortable sitting with uncertainty about the child\'s ' +
      'inner world without filling in the gaps automatically.',
    researchAnchors: [
      'Tsabary (2010, 2014) — Conscious Parenting: presence vs. projection as the foundational axis',
      'Siegel (2010) — Mindsight: the capacity to perceive one\'s own and another\'s inner mental life',
      'Gottman (1997) — Emotional awareness as a precondition for emotion coaching',
    ],
    candidateQuestions: [
      // Past lens — the child's experience of being seen
      'Growing up, how often did you feel like the adults around you really understood what you were going through — not just what you were doing, but what you were feeling inside?',
      // Current lens — present-tense attunement
      'When you look at your child and they seem quiet or withdrawn, how often can you tell with confidence whether they\'re okay, tired, or bothered by something?',
      // Current lens — projection indicator
      'How often do you find yourself assuming you know what your child is feeling or thinking, only to find out you were reading it through your own lens?',
    ],
    lensNotes:
      'Applies to all three lenses. Past lens captures the parent\'s childhood experience of ' +
      'being attuned to vs. unseen (a significant predictor of the parent\'s own attunement ' +
      'capacity). Current lens captures present-tense attunement behavior. Aspirational lens ' +
      'captures conscious aspiration toward presence. This dimension overlaps slightly with ' +
      'Emotional Regulation (a regulated parent can be more present), but is clinically ' +
      'distinct — a parent can be calm AND still be projecting. Sophia to validate ' +
      'discriminant validity between this dimension and Emotional Regulation when reviewing ' +
      'archetype profiles in Plan 02.',
  },
];
