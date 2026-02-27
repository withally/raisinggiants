/**
 * lib/quiz/questions.ts
 *
 * Complete question bank for the Kin parenting quiz.
 *
 * Focuses on the past lens: memory-based questions about how the quiz-taker
 * was raised. This makes the quiz universally accessible — it works for current
 * parents, expecting parents, and people without children.
 *
 * Every question passes the warm-friend test: would a caring friend ask this
 * over coffee? Language is second-person, specific, and non-clinical. No option
 * should feel obviously "better" than another — all options are framed with equal
 * dignity.
 *
 * Sensitive questions (Narrative Coherence, Role Integrity, Repair/Reconnection,
 * Cultural Background) include whyWeAskThis helper text and optional leadIn
 * normalizing sentences.
 *
 * Scoring: dimensionScores maps each option ID to Partial<Record<DimensionKey, number>>
 * on a 1–10 scale. Questions can score multiple dimensions per option.
 * Cultural background question has empty dimensionScores — it is metadata, not a
 * scoring dimension.
 *
 * Exports: QuizOption, QuizQuestion, QuizSection, SECTIONS, QUESTIONS, TOTAL_QUESTIONS
 */

import type { DimensionKey } from '@/lib/archetypes/types'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface QuizOption {
  /** Unique identifier within the question, e.g. "often", "rarely", "option-a" */
  id: string
  /** Display text shown on the option card */
  label: string
}

export interface QuizQuestion {
  /** Globally unique question identifier, e.g. "q-warmth-past-01" */
  id: string
  /** Which lens this question belongs to */
  lens: 'past' | 'current'
  /** Section this question belongs to (matches a QuizSection id) */
  section: string
  /** Warm, conversational question text shown to the user */
  question: string
  /**
   * Optional normalizing sentence shown before the question on sensitive topics.
   * Example: "There's no right answer here — many parents felt this way."
   */
  leadIn?: string
  /**
   * Optional tap-to-reveal helper text explaining why we ask this question.
   * Required on sensitive dimensions: Narrative Coherence, Role Integrity,
   * Repair/Reconnection, Cultural Background.
   */
  whyWeAskThis?: string
  /** How the answer is collected */
  inputType: 'option-cards' | 'searchable-dropdown'
  /** The selectable options */
  options: QuizOption[]
  /**
   * Maps option.id → Partial<Record<DimensionKey, number (1-10)>>.
   * Empty for metadata-only questions (cultural background).
   */
  dimensionScores: Record<string, Partial<Record<DimensionKey, number>>>
}

export interface QuizSection {
  id: string
  /** Display name shown as section header */
  title: string
  /** Optional brief intro sentence shown below the section title */
  description?: string
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const SECTIONS: QuizSection[] = [
  {
    id: 'about-you',
    title: 'About You',
    description: 'A few quick questions to get us started.',
  },
  {
    id: 'your-upbringing',
    title: 'Your Upbringing',
  },
  {
    id: 'your-parents-patterns',
    title: "Your Parents' Patterns",
  },
  {
    id: 'your-background',
    title: 'Your Background',
  },
]

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // SECTION: About You (rapport-building, touches emotional-warmth)
  // =========================================================================

  {
    id: 'q-intro-affection-01',
    lens: 'past',
    section: 'about-you',
    question:
      'When you were little, how did the people who raised you most often show you they loved you?',
    inputType: 'option-cards',
    options: [
      { id: 'words', label: 'Saying "I love you" and lots of hugs' },
      { id: 'acts', label: 'Doing things for me — cooking, fixing, being there' },
      { id: 'time', label: 'Spending time with me, playing or talking' },
      { id: 'praise', label: 'Telling me how proud they were of me' },
      { id: 'mixed', label: 'A real mix — it changed depending on the situation' },
    ],
    dimensionScores: {
      words:  { 'emotional-warmth': 9, 'nonjudgmental-acceptance': 8 },
      acts:   { 'emotional-warmth': 5, 'boundary-consistency': 6 },
      time:   { 'emotional-warmth': 7, 'presence-attunement': 8 },
      praise: { 'emotional-warmth': 6, 'nonjudgmental-acceptance': 4 },
      mixed:  { 'emotional-warmth': 6, 'presence-attunement': 5 },
    },
  },

  {
    id: 'q-intro-emotions-02',
    lens: 'past',
    section: 'about-you',
    question: 'Growing up, were feelings talked about openly in your home, or were they more kept private?',
    inputType: 'option-cards',
    options: [
      { id: 'openly', label: 'Quite openly — we talked about how we felt' },
      { id: 'sometimes', label: 'Sometimes, with certain people or in certain moods' },
      { id: 'rarely', label: 'Rarely — feelings were more private' },
      { id: 'never', label: "Hardly ever — it wasn't really done" },
    ],
    dimensionScores: {
      openly:    { 'emotional-warmth': 8, 'emotional-regulation': 8 },
      sometimes: { 'emotional-warmth': 6, 'emotional-regulation': 5 },
      rarely:    { 'emotional-warmth': 3, 'emotional-regulation': 3 },
      never:     { 'emotional-warmth': 2, 'emotional-regulation': 2 },
    },
  },

  // =========================================================================
  // SECTION: Your Upbringing
  // =========================================================================

  // --- Emotional Warmth (past) ---

  {
    id: 'q-warmth-past-01',
    lens: 'past',
    section: 'your-upbringing',
    question:
      "When you were upset as a child — really upset, not just a bit annoyed — how often did a parent sit with you, hold you, or let you know you weren't alone?",
    inputType: 'option-cards',
    options: [
      { id: 'always', label: "Almost always — they'd come find me" },
      { id: 'often', label: 'Often, though it depended on the day' },
      { id: 'sometimes', label: 'Sometimes, but I often worked through things alone' },
      { id: 'rarely', label: 'Rarely — I mostly kept it to myself' },
      { id: 'never', label: "Almost never — that's just not how it worked" },
    ],
    dimensionScores: {
      always:    { 'emotional-warmth': 9 },
      often:     { 'emotional-warmth': 7 },
      sometimes: { 'emotional-warmth': 5 },
      rarely:    { 'emotional-warmth': 3 },
      never:     { 'emotional-warmth': 1 },
    },
  },

  {
    id: 'q-warmth-past-02',
    lens: 'past',
    section: 'your-upbringing',
    question:
      'How often did the people who raised you say "I love you" out loud — not just through actions, but actually in words?',
    inputType: 'option-cards',
    options: [
      { id: 'very-often', label: 'Very often — it was a regular part of life' },
      { id: 'sometimes', label: 'Sometimes, on meaningful occasions' },
      { id: 'rarely', label: 'Rarely — not really how they expressed things' },
      { id: 'never', label: 'Never that I can remember' },
    ],
    dimensionScores: {
      'very-often': { 'emotional-warmth': 9 },
      sometimes:    { 'emotional-warmth': 6 },
      rarely:       { 'emotional-warmth': 3 },
      never:        { 'emotional-warmth': 1 },
    },
  },

  // --- Boundary Consistency (past) ---

  {
    id: 'q-boundary-past-01',
    lens: 'past',
    section: 'your-upbringing',
    question:
      'As a child, when you pushed back on a rule, what usually happened?',
    inputType: 'option-cards',
    options: [
      { id: 'held', label: 'The rule held, every time — they were consistent' },
      { id: 'depended', label: 'It depended on who you asked or what mood they were in' },
      { id: 'negotiated', label: 'We could usually talk it through and find a compromise' },
      { id: 'gave-in', label: 'The rule often gave way if I pushed long enough' },
    ],
    dimensionScores: {
      held:       { 'boundary-consistency': 9 },
      depended:   { 'boundary-consistency': 4 },
      negotiated: { 'boundary-consistency': 7, 'reciprocity': 7 },
      'gave-in':  { 'boundary-consistency': 2 },
    },
  },

  {
    id: 'q-boundary-past-02',
    lens: 'past',
    section: 'your-upbringing',
    question:
      'How predictable were the household rules you grew up with — did you know what to expect, or were consequences more of a surprise?',
    inputType: 'option-cards',
    options: [
      { id: 'very-predictable', label: 'Very predictable — I always knew where the lines were' },
      { id: 'mostly', label: 'Mostly predictable, with some inconsistency' },
      { id: 'mixed', label: 'Mixed — it really depended on the day or the mood' },
      { id: 'unpredictable', label: 'Pretty unpredictable — I often felt unsure' },
    ],
    dimensionScores: {
      'very-predictable': { 'boundary-consistency': 9 },
      mostly:             { 'boundary-consistency': 7 },
      mixed:              { 'boundary-consistency': 4 },
      unpredictable:      { 'boundary-consistency': 2 },
    },
  },

  // --- Autonomy Support (past) ---

  {
    id: 'q-autonomy-past-01',
    lens: 'past',
    section: 'your-upbringing',
    question:
      'Growing up, when you had a problem to figure out — something tricky at school, a falling out with a friend — how much did your parents let you work through it yourself before stepping in?',
    inputType: 'option-cards',
    options: [
      { id: 'very-much', label: 'A lot — they trusted me to figure most things out' },
      { id: 'some', label: "Some — they'd offer help but let me lead" },
      { id: 'little', label: 'Not much — they tended to step in and sort things for me' },
      { id: 'never', label: 'They were very hands-on — I rarely handled things alone' },
    ],
    dimensionScores: {
      'very-much': { 'autonomy-support': 9 },
      some:        { 'autonomy-support': 7 },
      little:      { 'autonomy-support': 3 },
      never:       { 'autonomy-support': 1 },
    },
  },

  // --- Role Integrity (past) — SENSITIVE ---

  {
    id: 'q-role-past-01',
    lens: 'past',
    section: 'your-upbringing',
    leadIn: "This next question is one many people find quietly recognisable.",
    question:
      'Growing up, how often did you feel responsible for a parent\'s emotional wellbeing — like it was partly your job to cheer them up, keep the peace, or make sure they were okay?',
    whyWeAskThis:
      "Research shows that children sometimes take on an emotional caretaking role for a parent — keeping the peace, managing moods, or being the one who holds it together. This isn't a failing of the parent or the child: it often happens in loving families under real pressure. Understanding this dynamic helps us give you a result that actually reflects your upbringing.",
    inputType: 'option-cards',
    options: [
      { id: 'often', label: "Often — it was something I was quite aware of" },
      { id: 'sometimes', label: 'Sometimes — in certain situations or with one particular parent' },
      { id: 'rarely', label: "Rarely — it wasn't really something I noticed" },
      { id: 'never', label: "Never — that was never my role" },
    ],
    dimensionScores: {
      often:     { 'role-integrity': 2 },
      sometimes: { 'role-integrity': 4 },
      rarely:    { 'role-integrity': 7 },
      never:     { 'role-integrity': 9 },
    },
  },

  {
    id: 'q-role-past-02',
    lens: 'past',
    section: 'your-upbringing',
    leadIn: "Still on the same theme — this one goes a step further.",
    question:
      'As a child, did you ever feel like you were the one taking care of a parent emotionally — being their confidant, their support, or the person who kept things from falling apart?',
    whyWeAskThis:
      "Sometimes children become the emotional anchor for a parent in ways that feel normal at the time. It's a quiet form of carrying weight that belongs to adults, and recognising it is actually a strength. Understanding this pattern helps us personalise your results.",
    inputType: 'option-cards',
    options: [
      { id: 'yes-clearly', label: 'Yes — I was quite aware of playing that role' },
      { id: 'somewhat', label: 'Somewhat — there were moments where I felt that' },
      { id: 'not-really', label: "Not really — I don't think that was the dynamic" },
      { id: 'no', label: "No — that wasn't my experience" },
    ],
    dimensionScores: {
      'yes-clearly': { 'role-integrity': 1 },
      somewhat:      { 'role-integrity': 3 },
      'not-really':  { 'role-integrity': 7 },
      no:            { 'role-integrity': 9 },
    },
  },

  // --- Narrative Coherence (past) — SENSITIVE ---

  {
    id: 'q-narrative-past-01',
    lens: 'past',
    section: 'your-upbringing',
    leadIn: "These next questions are a little different — there are no right answers, just your honest take.",
    question:
      'If someone asked you to describe your childhood in five minutes — the good parts and the hard parts — how easy would it be to give them a clear, organised picture?',
    whyWeAskThis:
      "Research in attachment science shows that it's not the quality of someone's childhood that matters most for parenting — it's how clearly they can tell the story. A parent who has made sense of a difficult past often transmits more security than one who hasn't examined an easier one. These questions help us understand where you are in that process.",
    inputType: 'option-cards',
    options: [
      { id: 'very-easy', label: "Quite easy — I have a clear, nuanced picture" },
      { id: 'mostly', label: 'Mostly — though some parts are harder to organise' },
      { id: 'mixed', label: "Mixed — I can see parts of it clearly but other parts feel murkier" },
      { id: 'hard', label: "Hard — it's quite tangled or feels one-dimensional" },
    ],
    dimensionScores: {
      'very-easy': { 'narrative-coherence': 9 },
      mostly:      { 'narrative-coherence': 7 },
      mixed:       { 'narrative-coherence': 5 },
      hard:        { 'narrative-coherence': 2 },
    },
  },

  {
    id: 'q-narrative-past-02',
    lens: 'past',
    section: 'your-upbringing',
    question:
      'When you think about your upbringing, do you tend to see it as mostly positive, mostly difficult, or genuinely mixed — and does that picture feel clear to you?',
    whyWeAskThis:
      "The ability to hold a nuanced, honest view of your past — including both what was good and what was hard — is one of the strongest predictors of the kind of parent you become. This question isn't about judging your childhood; it's about where you are in making sense of it.",
    inputType: 'option-cards',
    options: [
      {
        id: 'nuanced-clear',
        label: 'Genuinely mixed — and I can hold both the good and the hard with some clarity',
      },
      {
        id: 'positive-clear',
        label: 'Mostly positive, and I feel at peace with that view',
      },
      {
        id: 'positive-vague',
        label: "Mostly positive, though I find it hard to think of specific memories",
      },
      {
        id: 'difficult-integrated',
        label: "Quite difficult — and I've done a lot of work to understand it",
      },
      {
        id: 'difficult-raw',
        label: "Quite difficult — and it still feels very present or unresolved",
      },
    ],
    dimensionScores: {
      'nuanced-clear':       { 'narrative-coherence': 9 },
      'positive-clear':      { 'narrative-coherence': 7 },
      'positive-vague':      { 'narrative-coherence': 4 },
      'difficult-integrated':{ 'narrative-coherence': 8 },
      'difficult-raw':       { 'narrative-coherence': 2 },
    },
  },

  {
    id: 'q-narrative-past-03',
    lens: 'past',
    section: 'your-upbringing',
    question:
      "Has your thinking about your own parents shifted as you've gotten older — have you found more nuance, more understanding, or more questions — or does it feel much the same as it always has?",
    whyWeAskThis:
      "Narrative coherence — how we make sense of our own story — tends to develop over time. Parents who have revisited and deepened their understanding of their upbringing often have more room to parent from choice rather than habit. This question helps us understand how far along that process you are.",
    inputType: 'option-cards',
    options: [
      { id: 'much-more-nuanced', label: "A lot more nuanced — I understand things I didn't before" },
      { id: 'somewhat-shifted', label: 'Somewhat — a few things have shifted, though much feels the same' },
      { id: 'mostly-same', label: "Mostly the same — my view hasn't changed much" },
      { id: 'more-questions', label: "If anything, I have more questions now than I did growing up" },
    ],
    dimensionScores: {
      'much-more-nuanced': { 'narrative-coherence': 9 },
      'somewhat-shifted':  { 'narrative-coherence': 6 },
      'mostly-same':       { 'narrative-coherence': 4 },
      'more-questions':    { 'narrative-coherence': 7 },
    },
  },

  // =========================================================================
  // SECTION: Your Parents' Patterns
  // =========================================================================

  // --- Emotional Regulation (past) ---

  {
    id: 'q-regulation-past-01',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      "When you were upset as a child, how did the adults around you typically respond?",
    inputType: 'option-cards',
    options: [
      {
        id: 'stayed-with-me',
        label: 'They stayed with me and helped me feel understood',
      },
      {
        id: 'calm-down',
        label: 'They told me to calm down or that I was overreacting',
      },
      {
        id: 'uncomfortable',
        label: 'They seemed uncomfortable and changed the subject',
      },
      {
        id: 'ignored',
        label: 'They mostly ignored it and waited for it to pass',
      },
    ],
    dimensionScores: {
      'stayed-with-me': { 'emotional-regulation': 9, 'presence-attunement': 8 },
      'calm-down':      { 'emotional-regulation': 3, 'presence-attunement': 4 },
      uncomfortable:    { 'emotional-regulation': 2, 'presence-attunement': 2 },
      ignored:          { 'emotional-regulation': 1, 'presence-attunement': 1 },
    },
  },

  {
    id: 'q-regulation-past-02',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      'When your parents got angry or stressed, how did it usually affect the rest of the household?',
    inputType: 'option-cards',
    options: [
      { id: 'contained', label: "They kept it contained — it didn't really ripple out" },
      { id: 'noticeable', label: "We all noticed it, but it passed pretty quickly" },
      { id: 'changed-things', label: "It changed the mood of the whole house for a while" },
      { id: 'tiptoed', label: "We all tiptoed around them until the storm passed" },
    ],
    dimensionScores: {
      contained:       { 'emotional-regulation': 9, 'boundary-consistency': 7 },
      noticeable:      { 'emotional-regulation': 6 },
      'changed-things':{ 'emotional-regulation': 3 },
      tiptoed:         { 'emotional-regulation': 1, 'role-integrity': 3 },
    },
  },

  // --- Presence / Attunement (past) ---

  {
    id: 'q-attunement-past-01',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      "Growing up, how often did you feel like the adults around you genuinely understood what you were going through — not just what you were doing, but what you were feeling inside?",
    inputType: 'option-cards',
    options: [
      { id: 'very-often', label: 'Very often — I felt truly seen' },
      { id: 'often', label: 'Often, though not always' },
      { id: 'sometimes', label: 'Sometimes — certain people, certain moments' },
      { id: 'rarely', label: 'Rarely — I mostly felt misread or unseen' },
      { id: 'never', label: "Almost never — I don't think that was on their radar" },
    ],
    dimensionScores: {
      'very-often': { 'presence-attunement': 9, 'emotional-warmth': 8 },
      often:        { 'presence-attunement': 7, 'emotional-warmth': 6 },
      sometimes:    { 'presence-attunement': 5 },
      rarely:       { 'presence-attunement': 3 },
      never:        { 'presence-attunement': 1 },
    },
  },

  // --- Protective Instinct (past) ---

  {
    id: 'q-protective-past-01',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      "Growing up, how often did your parents seem worried about your safety in situations that felt completely normal to you?",
    inputType: 'option-cards',
    options: [
      { id: 'rarely', label: "Rarely — they were pretty relaxed about things" },
      { id: 'sometimes', label: 'Sometimes, though it made sense in context' },
      { id: 'often', label: 'Quite often — they were fairly anxious about risks' },
      { id: 'always', label: 'Very often — I often felt they were worried about things that seemed fine to me' },
    ],
    dimensionScores: {
      rarely:    { 'protective-instinct': 2 },
      sometimes: { 'protective-instinct': 5 },
      often:     { 'protective-instinct': 7 },
      always:    { 'protective-instinct': 9 },
    },
  },

  {
    id: 'q-protective-past-02',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      'When you wanted to do something independently as a child — walk to a friend\'s house, ride your bike further, stay home alone — how did your parents typically respond?',
    inputType: 'option-cards',
    options: [
      { id: 'encouraged', label: 'They encouraged it — they liked seeing me be independent' },
      { id: 'cautious-yes', label: 'They said yes but with conditions and check-ins' },
      { id: 'reluctant', label: 'They were reluctant and often said no at first' },
      { id: 'rarely-allowed', label: 'They rarely allowed it — they preferred to keep me close' },
    ],
    dimensionScores: {
      encouraged:      { 'protective-instinct': 2, 'autonomy-support': 9 },
      'cautious-yes':  { 'protective-instinct': 5, 'autonomy-support': 6 },
      reluctant:       { 'protective-instinct': 7, 'autonomy-support': 3 },
      'rarely-allowed':{ 'protective-instinct': 9, 'autonomy-support': 1 },
    },
  },

  // --- Repair / Reconnection (past) — SENSITIVE ---

  {
    id: 'q-repair-past-01',
    lens: 'past',
    section: 'your-parents-patterns',
    leadIn: "This one's about what happened after the hard moments.",
    question:
      'After a heated moment or punishment as a child, how often did a parent come back to you — not to re-explain the rule, but just to check in on how you were doing?',
    whyWeAskThis:
      "Research consistently shows that what happens after a difficult moment matters just as much as the moment itself. The ability to come back, repair, and reconnect is one of the strongest predictors of a secure parent-child bond — and it's deeply shaped by whether we experienced that repair in our own childhoods.",
    inputType: 'option-cards',
    options: [
      { id: 'always', label: 'Almost always — they made a point of coming back' },
      { id: 'often', label: 'Often — they usually circled back at some point' },
      { id: 'sometimes', label: 'Sometimes — it depended on the situation' },
      { id: 'rarely', label: "Rarely — things mostly just moved on" },
      { id: 'never', label: "Almost never — what was done was done" },
    ],
    dimensionScores: {
      always:    { 'repair-reconnection': 9 },
      often:     { 'repair-reconnection': 7 },
      sometimes: { 'repair-reconnection': 5 },
      rarely:    { 'repair-reconnection': 3 },
      never:     { 'repair-reconnection': 1 },
    },
  },

  {
    id: 'q-repair-past-02',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      "Did you ever hear a parent say something like 'I handled that badly' or 'I'm sorry I was too harsh'?",
    whyWeAskThis:
      "Parents who can name their mistakes and come back to repair them teach their children something powerful: that relationships can survive difficulty. Whether or not you experienced this growing up often shapes how naturally or awkwardly it feels for you as a parent now.",
    inputType: 'option-cards',
    options: [
      { id: 'regularly', label: 'Yes, regularly — it was a normal part of how conflict resolved' },
      { id: 'occasionally', label: 'Occasionally — a handful of times I can remember' },
      { id: 'once-twice', label: 'Once or twice — it was noticeable because it was rare' },
      { id: 'never', label: "Never — I don't think I ever heard that" },
    ],
    dimensionScores: {
      regularly:     { 'repair-reconnection': 9, 'emotional-regulation': 8 },
      occasionally:  { 'repair-reconnection': 6 },
      'once-twice':  { 'repair-reconnection': 3 },
      never:         { 'repair-reconnection': 1 },
    },
  },

  // --- Reciprocity (past) ---

  {
    id: 'q-reciprocity-past-01',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      "Growing up, how often were you genuinely asked for your opinion on family decisions — and did it actually make a difference?",
    inputType: 'option-cards',
    options: [
      { id: 'often-mattered', label: "Often — and what I said actually influenced the outcome" },
      { id: 'asked-not-mattered', label: 'I was asked, but the decision had usually already been made' },
      { id: 'rarely', label: "Rarely — family decisions were mostly made without my input" },
      { id: 'never', label: "Never — that wasn't how things worked" },
    ],
    dimensionScores: {
      'often-mattered':   { 'reciprocity': 9, 'autonomy-support': 7 },
      'asked-not-mattered': { 'reciprocity': 4 },
      rarely:             { 'reciprocity': 3 },
      never:              { 'reciprocity': 1 },
    },
  },

  // --- Nonjudgmental Acceptance (past) ---

  {
    id: 'q-nja-past-01',
    lens: 'past',
    section: 'your-parents-patterns',
    question:
      "Growing up, did you feel that your parents' love or approval changed depending on how well you behaved, performed at school, or met their expectations?",
    inputType: 'option-cards',
    options: [
      { id: 'unconditional', label: "Not really — their love felt constant regardless of what I did" },
      { id: 'somewhat', label: 'Somewhat — I could feel a shift when I disappointed them' },
      { id: 'quite-conditional', label: 'Quite a bit — approval was noticeably tied to achievement or behaviour' },
      { id: 'very-conditional', label: 'Very much so — love and approval felt clearly conditional' },
    ],
    dimensionScores: {
      unconditional:     { 'nonjudgmental-acceptance': 9 },
      somewhat:          { 'nonjudgmental-acceptance': 6 },
      'quite-conditional': { 'nonjudgmental-acceptance': 3 },
      'very-conditional':  { 'nonjudgmental-acceptance': 1 },
    },
  },

  // =========================================================================
  // SECTION: Your Background
  // =========================================================================

  {
    id: 'q-cultural-background',
    lens: 'past',
    section: 'your-background',
    question:
      'Which of these best describes the cultural background you were raised in? (You can search or scroll)',
    whyWeAskThis:
      "Cultural background shapes parenting in powerful ways — from what's considered 'normal' discipline to how emotions are expressed and how independence is encouraged. Understanding your cultural context helps us make your results more personally relevant and avoid applying a one-size-fits-all lens.",
    inputType: 'searchable-dropdown',
    options: [
      {
        id: 'east-asian',
        label: 'East Asian collectivist (Chinese, Korean, Japanese)',
      },
      {
        id: 'south-asian',
        label: 'South Asian joint-family (Indian, Pakistani, Bangladeshi)',
      },
      {
        id: 'latin-american',
        label: 'Latin American familismo (Mexican, Colombian, Brazilian)',
      },
      {
        id: 'sub-saharan',
        label: 'Sub-Saharan African community-centred (Nigerian, Kenyan, Ghanaian)',
      },
      {
        id: 'western',
        label: 'Western individualist (Australian, British, North American)',
      },
      {
        id: 'other',
        label: 'Other / Prefer not to say',
      },
    ],
    // Cultural background is metadata, not a scoring dimension — no scores
    dimensionScores: {},
  },
]

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const TOTAL_QUESTIONS = QUESTIONS.length
