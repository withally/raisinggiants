/**
 * lib/quiz/dimensions.ts
 *
 * Scoring dimension definitions for the Kin archetype framework.
 *
 * Dimensions are the intermediate layer in the two-step scoring algorithm:
 *   Step 1: Quiz answers × question weights → dimension scores per user
 *   Step 2: User dimension profile vs. archetype reference profiles → ranked result
 *
 * The 11 dimensions here were derived from cross-referencing 10+ parenting
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
  'repair-reconnection',
  'role-integrity',
  'reciprocity',
  'nonjudgmental-acceptance',
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
      'Kennedy (2022) — Good Inside: belief in the child\'s inherent goodness as the foundation of warm, accepting connection',
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
      'Kennedy (2022) — Good Inside: separating the child\'s behavior from their identity; regulating alongside the child rather than against them',
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
      'Gottman Institute — Bids for connection: recognizing and turning toward the child\'s bids as the micro-unit of attunement',
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

  // -------------------------------------------------------------------------
  // Dimension 8: Repair and Reconnection
  // -------------------------------------------------------------------------
  {
    key: 'repair-reconnection',
    name: 'Repair and Reconnection',
    description:
      'The capacity to repair ruptures in the parent-child relationship — to return after ' +
      'conflict, name what happened, and actively rebuild the connection. Tronick\'s research ' +
      'on "still face" experiments shows that rupture is inevitable and normal in all ' +
      'relationships; what predicts secure attachment is not the absence of rupture but the ' +
      'presence of repair. Kennedy\'s "Good Inside" framework places repair as the cornerstone ' +
      'of secure attachment: the parent who comes back after being harsh teaches the child that ' +
      'relationships can survive difficulty. Gottman\'s research on repair attempts in couples ' +
      'extends to parent-child dynamics: the ratio of successful repairs to unrepaired ruptures ' +
      'is a stronger predictor of relationship quality than the frequency of conflict itself.',
    lowLabel:
      'Ruptures tend to be left unaddressed — conflict ends when the storm passes, not through ' +
      'active reconnection. The child learns that breaks in the relationship are permanent or ' +
      'must be forgotten rather than processed. May move on quickly ("let\'s not dwell on it") ' +
      'without acknowledging what happened or how the child experienced it.',
    highLabel:
      'Consistently returns after rupture — names what happened, takes responsibility for their ' +
      'part, and checks in on the child\'s experience. Repair is a deliberate practice, not an ' +
      'afterthought. The child learns that relationships can break and be mended, which builds ' +
      'resilience and trust. Comfortable saying "I got that wrong" or "I was too harsh."',
    researchAnchors: [
      'Kennedy (2022) — Good Inside: repair as the cornerstone of secure attachment; "the most important parenting skill is repair"',
      'Tronick (2007) — Still Face Paradigm: rupture-and-repair as the normative rhythm of secure relationships; repair capacity predicts attachment security',
      'Gottman Institute — Repair attempts as the #1 predictor of relationship stability; turning toward after turning against',
      'Siegel & Bryson (2011) — The Whole-Brain Child: reconnection after disconnection as a core parenting practice',
    ],
    candidateQuestions: [
      // Past lens — did your parents come back after conflict?
      'After a heated moment or punishment, how often did a parent come back to you to talk about what happened — not to re-explain the rule, but to check in on how you were feeling?',
      // Current lens — do you repair after you've been harsh?
      'When you\'ve been too sharp, impatient, or harsh with your child, what usually happens next? (I go back and acknowledge what happened / I move on and focus on what comes next / I feel bad but don\'t usually address it directly)',
      // Behavioral indicator
      'How comfortable are you saying to your child: "I handled that badly and I\'m sorry" — and then sitting with their response?',
    ],
    lensNotes:
      'Applies to all three lenses. Past lens captures whether the parent experienced repair ' +
      'in their own childhood — a powerful predictor of their own repair capacity. Current lens ' +
      'captures present-tense repair behavior. Aspirational lens captures the desire to repair ' +
      'even when it feels uncomfortable. This dimension is clinically distinct from Emotional ' +
      'Regulation (a parent can be well-regulated but still fail to repair) and from Emotional ' +
      'Warmth (warmth without repair leaves ruptures unresolved). The absence of repair in ' +
      'childhood is a key marker of several negative patterns including emotional neglect, ' +
      'threats as discipline, and parentification.',
  },

  // -------------------------------------------------------------------------
  // Dimension 9: Role Integrity
  // -------------------------------------------------------------------------
  {
    key: 'role-integrity',
    name: 'Role Integrity',
    description:
      'Whether appropriate parent-child role boundaries exist around emotional responsibility. ' +
      'Measures the degree to which the parent carries the emotional weight of the relationship ' +
      'rather than the child carrying it for them. Jurkovic\'s research on parentification — ' +
      'where a child takes on the emotional caretaking role for a parent — identifies this role ' +
      'reversal as a distinct form of developmental trauma that is often invisible because the ' +
      'child appears competent, responsible, and "mature beyond their years." Van der Kolk\'s ' +
      'work on relational trauma distinguishes parentification from other ACEs: the harm comes ' +
      'not from what was done to the child but from what the child was required to carry. ' +
      'Siegel & Hartzell identify intact role boundaries as a prerequisite for the parent to ' +
      'be a genuine safe haven rather than a burden the child must manage.',
    lowLabel:
      'The child carries emotional responsibility that belongs to the parent — managing the ' +
      'parent\'s moods, providing comfort during the parent\'s distress, mediating family ' +
      'conflicts, or serving as the parent\'s confidant. The child may appear mature and ' +
      'capable but at the cost of their own developmental needs. The parent may depend on ' +
      'the child emotionally without recognizing the reversal.',
    highLabel:
      'The parent carries the emotional responsibility of the relationship. The child is free ' +
      'to be a child — to have needs, make messes, and be emotionally dependent without ' +
      'worrying about the parent\'s state. The parent manages their own emotional needs through ' +
      'adult relationships and resources, not through the child. Role boundaries are clear ' +
      'even when the parent is struggling.',
    researchAnchors: [
      'Jurkovic (1997) — Lost Childhoods: parentification as a distinct form of relational boundary violation and developmental trauma',
      'van der Kolk (2014) — The Body Keeps the Score: parentification as developmental trauma; role reversal as distinct from other ACEs',
      'Siegel & Hartzell (2003) — Parenting from the Inside Out: the parent as the container of emotional weight, not the child',
      'Bowlby (1969/1982) — Attachment Theory: the attachment figure as the provider of a secure base, not the recipient of one',
    ],
    candidateQuestions: [
      // Past lens — were you responsible for your parents' emotions?
      'Growing up, how often did you feel responsible for a parent\'s emotional wellbeing — like it was your job to cheer them up, keep the peace, or make sure they were okay?',
      // Past lens — role reversal indicator
      'As a child, did you ever feel like you were the one taking care of your parent emotionally — being their confidant, their support, or the person who held things together?',
      // Current lens — does your child manage your emotional state?
      'When you\'re having a hard day, how aware are your children of your emotional state? (They usually don\'t notice / They notice but it doesn\'t change their behavior / They seem to adjust their behavior to manage my mood)',
    ],
    lensNotes:
      'Applies primarily to Past and Current lenses. Past lens captures whether the parent ' +
      'experienced parentification in their own childhood — a strong predictor of both their ' +
      'current parenting patterns and their vulnerability to recreating role reversal with ' +
      'their own children. Current lens captures whether the parent\'s child is carrying ' +
      'emotional weight that belongs to the parent. This dimension is clinically distinct from ' +
      'Autonomy Support (which measures the child\'s freedom to make decisions, not the ' +
      'child\'s burden of emotional responsibility) and from Protective Instinct (which ' +
      'measures anxiety-driven over-involvement, not role reversal). Low Role Integrity ' +
      'combined with high Emotional Warmth is the signature of enmeshment; low Role Integrity ' +
      'combined with low Emotional Warmth is the signature of instrumental parentification.',
  },

  // -------------------------------------------------------------------------
  // Dimension 10: Reciprocity
  // -------------------------------------------------------------------------
  {
    key: 'reciprocity',
    name: 'Reciprocity',
    description:
      'The degree to which a parent treats the parent-child relationship as a genuinely ' +
      'bidirectional exchange — one in which the child\'s perspective, preferences, and input ' +
      'are actively sought and incorporated into family decisions, daily routines, and ' +
      'conflict resolution. High scores reflect parents who share power age-appropriately, ' +
      'negotiate rather than decree, and model cooperative problem-solving. Low scores reflect ' +
      'a top-down authority model in which the parent sets the agenda and the child is expected ' +
      'to comply. This dimension is conceptually distinct from Autonomy Support (which measures ' +
      'the child\'s freedom to act independently) — Reciprocity measures the parent\'s willingness ' +
      'to be influenced by the child within the relationship itself.',
    lowLabel:
      'Family decisions flow one direction — from parent to child. The child\'s opinions may be ' +
      'heard but do not materially influence outcomes. Disagreements are resolved by parental ' +
      'authority rather than negotiation. Love is unconditional but influence is not.',
    highLabel:
      'Actively seeks the child\'s input on decisions that affect them. Family conversations ' +
      'feel collaborative rather than directive. Comfortable being influenced by the child\'s ' +
      'perspective and adjusting plans accordingly. Models that relationships work best when ' +
      'both parties contribute to the direction.',
    researchAnchors: [
      'Grusec & Davidov (2010) — Domain-specific socialization: reciprocal compliance as a distinct socialization domain separate from attachment and control',
      'Duncan, Coatsworth & Greenberg (2009) — Mindful Parenting: bidirectional listening as a component of mindful parenting',
      'PBDQ Factor 6 — Democratic Discipline: collaborative rule-setting and shared decision-making (Louwerse et al., 2011; PMC4456141)',
      'Maccoby (2007) — Socialization as bidirectional process: children as active contributors to parent-child dynamics, not passive recipients',
    ],
    candidateQuestions: [
      // Past lens
      'Growing up, how often were you asked for your opinion on family decisions — and did it actually change anything?',
      // Current/Aspirational lens
      'When making a decision that affects your child (changing schools, weekend plans, household rules), how often do you genuinely incorporate their perspective into the final call?',
      // Behavioral indicator
      'How comfortable are you letting your child change your mind about something you\'d already decided?',
    ],
    lensNotes:
      'Applies to all three lenses. Past lens captures whether the parent experienced a cooperative ' +
      'vs. hierarchical family dynamic. Current lens captures whether the parent actively includes ' +
      'the child in decision-making. This dimension is distinct from Autonomy Support: a parent can ' +
      'grant significant independence (high AS) while still making all shared decisions unilaterally ' +
      '(low Reciprocity). Conversely, a parent might be highly collaborative in joint decisions ' +
      '(high Reciprocity) but still step in often during independent tasks (low AS).',
  },

  // -------------------------------------------------------------------------
  // Dimension 11: Nonjudgmental Acceptance
  // -------------------------------------------------------------------------
  {
    key: 'nonjudgmental-acceptance',
    name: 'Nonjudgmental Acceptance',
    description:
      'The degree to which a parent communicates unconditional positive regard for the child — ' +
      'acceptance of who the child is, independent of the child\'s behavior, achievements, or ' +
      'compliance with parental expectations. High scores reflect parents who separate the child\'s ' +
      'identity from the child\'s actions, maintain warmth even during discipline, and communicate ' +
      'that love is not contingent on performance. Low scores reflect conditional acceptance — ' +
      'love or approval that is visibly tied to the child meeting expectations, behaving well, or ' +
      'reflecting well on the parent. This dimension is distinct from Emotional Warmth (which ' +
      'measures the quantity and expressiveness of affection) — Nonjudgmental Acceptance measures ' +
      'whether that warmth persists when the child disappoints, fails, or deviates from expectations.',
    lowLabel:
      'Love and approval are visibly linked to behavior and achievement. The child experiences ' +
      'warmth as something that fluctuates based on performance — more available when they succeed ' +
      'or comply, less available when they fail or disappoint. May use withdrawal of affection, ' +
      'disappointment, or comparison as motivational tools.',
    highLabel:
      'The child experiences love as a constant — present even in moments of failure, defiance, ' +
      'or disappointment. The parent can be firm about behavior while communicating clearly that ' +
      'the child\'s worth is not in question. Comfortable with a child who is different from what ' +
      'was expected or hoped for. Discipline addresses the action, never the identity.',
    researchAnchors: [
      'Rohner (2004) — Interpersonal Acceptance-Rejection Theory (IPARTheory): perceived parental acceptance as the single strongest cross-cultural predictor of child psychological adjustment',
      'Kennedy (2022) — Good Inside: the child is a "good kid having a hard time"; separating behavior from identity as the core stance',
      'Rogers (1951) — Unconditional Positive Regard as the foundational therapeutic stance, extended to parent-child relationships',
      'Gottman (1997) — Emotion Coaching: maintaining connection and acceptance during behavioral correction',
    ],
    candidateQuestions: [
      // Past lens
      'Growing up, did you feel that your parents\' love or approval changed depending on how well you behaved, performed in school, or met their expectations?',
      // Current/Aspirational lens
      'When your child does something that genuinely disappoints you, how easy is it for you to communicate that the behavior was wrong without making them feel that something is wrong with them?',
      // Behavioral indicator
      'How often does your child hear you express pride in who they are — as opposed to what they\'ve accomplished?',
    ],
    lensNotes:
      'Applies to all three lenses. Past lens captures whether the parent experienced conditional ' +
      'vs. unconditional acceptance. Current lens captures whether the parent communicates ' +
      'unconditional regard to their own child. This dimension is distinct from Emotional Warmth: ' +
      'a parent can be very warm (high W) but withdraw that warmth when the child disappoints ' +
      '(low NJA). The Devoted Champion archetype is the signature case: high warmth and investment ' +
      'that becomes conditional under stress. Rohner\'s cross-cultural research identifies perceived ' +
      'acceptance-rejection as a universal predictor — it operates across cultures, not within ' +
      'specific cultural frameworks.',
  },
];
