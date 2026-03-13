/**
 * lib/quiz/blueprint-questions.ts
 *
 * Blueprint quiz question bank — own-parenting lens (present/future focused).
 *
 * Unlike Mirror (past lens: how you were raised), Blueprint focuses on the
 * current lens: how you parent now, how you plan to parent, or how you imagine
 * you will parent. Questions are adapted per parent status using templated wording.
 *
 * TODO: CLINICAL REVIEW REQUIRED — All placeholder questions below must be
 * reviewed and validated by Sophia before Phase 7 ships to production.
 * See STATE.md blocker [v2-CONTENT-1].
 *
 * Exports: ParentStatus, BLUEPRINT_SECTIONS, getBlueprintQuestions, TOTAL_BLUEPRINT_QUESTIONS
 */

import type { DimensionKey } from "@/lib/archetypes/types";
import type { QuizOption, QuizQuestion, QuizSection } from "@/lib/quiz/questions";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ParentStatus = "current-parent" | "expecting" | "planning";

/**
 * BlueprintQuestionRaw uses per-status question wording so the same question
 * can be adapted: "When your child is upset..." vs "When you imagine your child
 * being upset..." vs "When you think about how you might handle a child being upset..."
 */
interface BlueprintQuestionRaw {
  id: string;
  section: string;
  question: Record<ParentStatus, string>;
  leadIn?: string;
  whyWeAskThis?: string;
  options: QuizOption[];
  dimensionScores: Record<string, Partial<Record<DimensionKey, number>>>;
  inputType?: "option-cards" | "searchable-dropdown";
}

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const BLUEPRINT_SECTIONS: QuizSection[] = [
  {
    id: "daily-moments",
    title: "Daily Moments",
    description: "How you show up in the small, everyday interactions.",
  },
  {
    id: "discipline-boundaries",
    title: "Discipline & Boundaries",
    description: "How you approach limits and guidance.",
  },
  {
    id: "emotional-connection",
    title: "Emotional Connection",
    description: "How you respond to feelings — yours and theirs.",
  },
  {
    id: "values-legacy",
    title: "Values & Legacy",
    description: "What you most want to pass on.",
  },
];

// ---------------------------------------------------------------------------
// Raw Question Bank
// TODO: CLINICAL REVIEW REQUIRED — placeholder questions, Sophia sign-off needed
// ---------------------------------------------------------------------------

const RAW_QUESTIONS: BlueprintQuestionRaw[] = [
  // =========================================================================
  // SECTION: Daily Moments
  // =========================================================================

  {
    id: "bp-daily-01",
    section: "daily-moments",
    question: {
      "current-parent":
        "When your child wants your attention during something important — work, a task, your own moment of rest — what do you usually do?",
      expecting:
        "When you imagine your baby wanting your attention during something important — work, a task, your own moment of rest — what do you think you'd most likely do?",
      planning:
        "When you think about a future child wanting your attention during something important, what feels most natural to imagine doing?",
    },
    options: [
      { id: "stop-fully", label: "Stop what I'm doing and give my full attention" },
      { id: "finish-then", label: "Finish the immediate task first, then respond" },
      { id: "acknowledge-wait", label: "Acknowledge them and ask them to wait a moment" },
      { id: "depends-urgency", label: "It really depends on how urgent the task is" },
    ],
    dimensionScores: {
      "stop-fully": { "presence-attunement": 9, "emotional-warmth": 8 },
      "finish-then": { "presence-attunement": 4, "boundary-consistency": 6 },
      "acknowledge-wait": { "presence-attunement": 7, "emotional-regulation": 7 },
      "depends-urgency": { "presence-attunement": 5 },
    },
  },

  {
    id: "bp-daily-02",
    section: "daily-moments",
    question: {
      "current-parent":
        "How often do you set aside time that's just for play — with no agenda, no teaching, just following your child's lead?",
      expecting:
        "How important does it feel to you to have time that's purely for play — no agenda, no teaching, just following your baby's lead?",
      planning:
        "How much does the idea of purely child-led play — no agenda, just following their curiosity — appeal to you as a parenting value?",
    },
    options: [
      { id: "very-often", label: "Very often — it's a real priority for me" },
      { id: "often", label: "Often, though life sometimes gets in the way" },
      { id: "sometimes", label: "Sometimes — I find it harder than I expected" },
      { id: "rarely", label: "Rarely — I tend to add structure or goals" },
    ],
    dimensionScores: {
      "very-often": { "presence-attunement": 9, "autonomy-support": 8 },
      often: { "presence-attunement": 7, "autonomy-support": 6 },
      sometimes: { "presence-attunement": 5 },
      rarely: { "presence-attunement": 3, "boundary-consistency": 5 },
    },
  },

  {
    id: "bp-daily-03",
    section: "daily-moments",
    question: {
      "current-parent":
        "When your child tells you about their day — even when it's long, repetitive, or hard to follow — how do you usually respond?",
      expecting:
        "When you imagine your toddler telling you about their day in the future — even when it's long, repetitive, or hard to follow — how do you think you'd respond?",
      planning:
        "How do you imagine yourself responding when a future child shares something with you that's hard to follow or seems unimportant?",
    },
    options: [
      { id: "engaged", label: "I'm genuinely engaged — I ask follow-up questions" },
      { id: "attentive", label: "I listen attentively, even if I'm a bit tired" },
      { id: "half-present", label: "I listen but sometimes my mind wanders" },
      { id: "practical", label: "I tend to redirect toward something practical" },
    ],
    dimensionScores: {
      engaged: { "presence-attunement": 9, "emotional-warmth": 8 },
      attentive: { "presence-attunement": 7 },
      "half-present": { "presence-attunement": 4 },
      practical: { "presence-attunement": 3, "boundary-consistency": 5 },
    },
  },

  {
    id: "bp-daily-04",
    section: "daily-moments",
    question: {
      "current-parent":
        "How comfortable are you with physical affection — hugs, cuddles, sitting close — as a regular part of daily life with your child?",
      expecting:
        "How important is it to you that physical warmth — hugs, closeness, gentle touch — is a regular and natural part of how you'll parent?",
      planning:
        "How natural does it feel to imagine physical warmth — hugs, closeness, gentle touch — being a central part of your parenting?",
    },
    options: [
      { id: "very-comfortable", label: "Very comfortable — it comes naturally to me" },
      { id: "comfortable", label: "Comfortable, though I sometimes need reminders" },
      { id: "working-on-it", label: "I value it but it doesn't come as naturally to me" },
      { id: "less-natural", label: "Less natural for me — I show warmth in other ways" },
    ],
    dimensionScores: {
      "very-comfortable": { "emotional-warmth": 9, "presence-attunement": 8 },
      comfortable: { "emotional-warmth": 7 },
      "working-on-it": { "emotional-warmth": 5 },
      "less-natural": { "emotional-warmth": 3 },
    },
  },

  {
    id: "bp-daily-05",
    section: "daily-moments",
    question: {
      "current-parent":
        "When you and your child are just together — not doing anything special — how often does it feel like enough?",
      expecting:
        "When you imagine quiet, ordinary moments together — not doing anything special — how meaningful do those moments feel to you?",
      planning:
        "How much value do you place on the idea that ordinary, unstructured time together will be important?",
    },
    options: [
      { id: "always-enough", label: "Almost always — I find real meaning in those moments" },
      { id: "usually-enough", label: "Usually — though I sometimes wish for more" },
      { id: "sometimes-restless", label: "Sometimes I feel restless — I want to do something" },
      { id: "rarely-enough", label: "Rarely — I prefer to fill time with activities" },
    ],
    dimensionScores: {
      "always-enough": { "presence-attunement": 9, "emotional-warmth": 7 },
      "usually-enough": { "presence-attunement": 7 },
      "sometimes-restless": { "presence-attunement": 5 },
      "rarely-enough": { "presence-attunement": 3 },
    },
  },

  // =========================================================================
  // SECTION: Discipline & Boundaries
  // =========================================================================

  {
    id: "bp-discipline-01",
    section: "discipline-boundaries",
    question: {
      "current-parent":
        "When your child breaks a rule they know, how do you typically respond in the moment?",
      expecting:
        "When you imagine your child breaking a rule they know, what response feels most natural to you?",
      planning:
        "When you think about how you'd respond to a child knowingly breaking a rule, what approach feels most right?",
    },
    options: [
      { id: "calm-consequence", label: "Stay calm and apply the consequence consistently" },
      { id: "explain-then", label: "Explain why the rule matters, then apply a consequence" },
      { id: "depends-context", label: "It depends — I consider the context before responding" },
      { id: "variable", label: "My response varies depending on my stress level" },
    ],
    dimensionScores: {
      "calm-consequence": { "boundary-consistency": 9, "emotional-regulation": 8 },
      "explain-then": { "boundary-consistency": 7, reciprocity: 7 },
      "depends-context": { "boundary-consistency": 5 },
      variable: { "boundary-consistency": 3, "emotional-regulation": 3 },
    },
  },

  {
    id: "bp-discipline-02",
    section: "discipline-boundaries",
    question: {
      "current-parent":
        "When your child pushes back on a boundary — argues, negotiates, or just keeps asking — what do you find yourself doing?",
      expecting:
        "When you imagine your child pushing back on a boundary — arguing or just asking again and again — what feels like the right response?",
      planning:
        "When you think about a child pushing back on a boundary, what response feels most aligned with how you want to parent?",
    },
    options: [
      { id: "hold-firm", label: "Hold the boundary calmly — the answer stays the same" },
      { id: "explain-more", label: "Explain my reasoning more, then hold firm" },
      { id: "sometimes-bend", label: "Sometimes reconsider if they make a good point" },
      { id: "often-give", label: "I often give in to avoid conflict" },
    ],
    dimensionScores: {
      "hold-firm": { "boundary-consistency": 9, "emotional-regulation": 8 },
      "explain-more": { "boundary-consistency": 7, reciprocity: 8 },
      "sometimes-bend": { "boundary-consistency": 5, reciprocity: 6 },
      "often-give": { "boundary-consistency": 2 },
    },
  },

  {
    id: "bp-discipline-03",
    section: "discipline-boundaries",
    question: {
      "current-parent":
        "How consistent are the household rules in your family — do they stay the same regardless of mood, day, or who's around?",
      expecting:
        "How important is it to you that the rules in your household will be consistent — the same regardless of mood, day, or who's around?",
      planning:
        "How much does the idea of rule consistency appeal to you — the same expectations regardless of mood or circumstances?",
    },
    options: [
      { id: "very-consistent", label: "Very consistent — that's a real value for me" },
      { id: "mostly-consistent", label: "Mostly consistent, though I have off days" },
      { id: "somewhat", label: "Somewhat — I'm working on it" },
      { id: "quite-variable", label: "Quite variable — I find it hard to maintain" },
    ],
    dimensionScores: {
      "very-consistent": { "boundary-consistency": 9 },
      "mostly-consistent": { "boundary-consistency": 7 },
      somewhat: { "boundary-consistency": 5 },
      "quite-variable": { "boundary-consistency": 2 },
    },
  },

  {
    id: "bp-discipline-04",
    section: "discipline-boundaries",
    question: {
      "current-parent":
        "When you set a limit and your child becomes distressed about it — genuinely upset, not just frustrated — what happens inside you?",
      expecting:
        "When you imagine setting a limit and your child becoming genuinely distressed about it, what do you think would happen inside you?",
      planning:
        "When you imagine holding a boundary and a future child being genuinely distressed, what do you think you'd feel?",
    },
    leadIn: "This one's about the inner experience, not just the behaviour.",
    options: [
      { id: "confident", label: "Confident — I can hold the limit and comfort them at once" },
      { id: "uncertain", label: "A bit uncertain — their distress makes me question myself" },
      { id: "guilty", label: "Guilty — it's hard not to give in when they're really upset" },
      { id: "overwhelmed", label: "Quite overwhelmed — their emotions trigger mine" },
    ],
    dimensionScores: {
      confident: { "boundary-consistency": 9, "emotional-regulation": 9 },
      uncertain: { "boundary-consistency": 6, "emotional-regulation": 6 },
      guilty: { "boundary-consistency": 3, "emotional-regulation": 4 },
      overwhelmed: { "boundary-consistency": 2, "emotional-regulation": 2 },
    },
  },

  {
    id: "bp-discipline-05",
    section: "discipline-boundaries",
    question: {
      "current-parent": "When your child asks 'why' about a rule, how do you tend to handle it?",
      expecting:
        "When you imagine your child asking 'why' about a rule, what feels like the right response to you?",
      planning:
        "When you think about explaining rules to a future child, how important is it that they understand the reasoning?",
    },
    options: [
      { id: "always-explain", label: "I almost always explain — understanding matters to me" },
      { id: "usually-explain", label: "Usually explain, though sometimes it's 'just because'" },
      { id: "depends-age", label: "Depends on their age and ability to understand" },
      { id: "rarely-explain", label: "Rules are rules — I don't feel the need to justify them" },
    ],
    dimensionScores: {
      "always-explain": { reciprocity: 9, "autonomy-support": 8 },
      "usually-explain": { reciprocity: 7 },
      "depends-age": { reciprocity: 5 },
      "rarely-explain": { reciprocity: 2, "boundary-consistency": 8 },
    },
  },

  // =========================================================================
  // SECTION: Emotional Connection
  // =========================================================================

  {
    id: "bp-emotional-01",
    section: "emotional-connection",
    question: {
      "current-parent": "When your child is upset — really upset — what's your first instinct?",
      expecting:
        "When you imagine your child being really upset, what feels like the most natural first response?",
      planning:
        "When you think about a future child being genuinely distressed, what does your instinct tell you to do first?",
    },
    options: [
      { id: "comfort-first", label: "Comfort them first — get close and stay with the feeling" },
      { id: "understand-then", label: "Try to understand what happened, then comfort" },
      { id: "calm-them", label: "Help them calm down so we can talk" },
      { id: "solve-problem", label: "Focus on solving the problem that caused the upset" },
    ],
    dimensionScores: {
      "comfort-first": { "emotional-warmth": 9, "presence-attunement": 9 },
      "understand-then": { "presence-attunement": 7, "emotional-warmth": 6 },
      "calm-them": { "emotional-regulation": 7, "presence-attunement": 5 },
      "solve-problem": { "emotional-regulation": 4, "presence-attunement": 3 },
    },
  },

  {
    id: "bp-emotional-02",
    section: "emotional-connection",
    question: {
      "current-parent":
        "When your child expresses a 'big' emotion — anger, fear, jealousy — how comfortable are you sitting with that feeling alongside them?",
      expecting:
        "When you imagine your child expressing intense emotions — anger, fear, jealousy — how comfortable do you feel you'd be sitting with that feeling alongside them?",
      planning:
        "How comfortable are you with the idea of sitting with a child's intense emotions — anger, fear, jealousy — without trying to fix or minimise?",
    },
    options: [
      { id: "very-comfortable", label: "Very comfortable — I can hold space without rushing it" },
      { id: "mostly-comfortable", label: "Mostly comfortable, though some emotions are harder" },
      { id: "working-on-it", label: "I'm working on it — some feelings trigger my own" },
      { id: "uncomfortable", label: "Genuinely uncomfortable — I tend to want to fix it fast" },
    ],
    dimensionScores: {
      "very-comfortable": { "emotional-regulation": 9, "presence-attunement": 9 },
      "mostly-comfortable": { "emotional-regulation": 7, "presence-attunement": 7 },
      "working-on-it": { "emotional-regulation": 5, "presence-attunement": 5 },
      uncomfortable: { "emotional-regulation": 2, "presence-attunement": 3 },
    },
  },

  {
    id: "bp-emotional-03",
    section: "emotional-connection",
    question: {
      "current-parent":
        "After a heated moment with your child — when you've lost patience, snapped, or been harsher than you intended — what typically happens next?",
      expecting:
        "After a heated moment with your child — when you've lost patience or been harsher than intended — what do you think you'd most naturally do?",
      planning:
        "If you had a heated moment and were harsher than you'd want to be, what do you imagine doing afterwards?",
    },
    leadIn: "This one is about what comes after difficult moments.",
    whyWeAskThis:
      "Research consistently shows that what happens after a rupture matters just as much as the rupture itself. The capacity to come back, acknowledge what happened, and reconnect is one of the strongest predictors of a secure bond.",
    options: [
      { id: "come-back", label: "I come back and acknowledge what happened" },
      { id: "move-on", label: "I move on — making a fuss about it seems counterproductive" },
      { id: "struggle", label: "I want to come back but often struggle to find the words" },
      { id: "rarely", label: "Rarely comes naturally — it's an area I'm working on" },
    ],
    dimensionScores: {
      "come-back": { "repair-reconnection": 9, "emotional-warmth": 8 },
      "move-on": { "repair-reconnection": 3 },
      struggle: { "repair-reconnection": 5 },
      rarely: { "repair-reconnection": 2 },
    },
  },

  {
    id: "bp-emotional-04",
    section: "emotional-connection",
    question: {
      "current-parent":
        "How often do you name emotions out loud with your child — 'You seem frustrated' or 'I can see you're disappointed'?",
      expecting:
        "How important is it to you to name emotions out loud — 'You seem frustrated' or 'I can see you're disappointed' — as part of how you'll parent?",
      planning:
        "How natural does it feel to imagine naming emotions out loud — 'That looks frustrating' or 'You seem scared' — as a regular part of parenting?",
    },
    options: [
      { id: "very-often", label: "Very often — it's a natural part of how I communicate" },
      { id: "often", label: "Fairly often, though I sometimes forget" },
      { id: "sometimes", label: "Sometimes — I find it a bit awkward or unnatural" },
      { id: "rarely", label: "Rarely — not how I tend to communicate" },
    ],
    dimensionScores: {
      "very-often": { "emotional-regulation": 9, "presence-attunement": 8 },
      often: { "emotional-regulation": 7, "presence-attunement": 6 },
      sometimes: { "emotional-regulation": 5 },
      rarely: { "emotional-regulation": 2 },
    },
  },

  {
    id: "bp-emotional-05",
    section: "emotional-connection",
    question: {
      "current-parent":
        "When your own strong emotions come up while parenting — frustration, anxiety, exhaustion — how well do you feel you manage them?",
      expecting:
        "When you imagine strong emotions coming up while parenting — frustration, anxiety, exhaustion — how confident do you feel about managing them?",
      planning:
        "How confident are you that you'll be able to manage your own strong emotions in parenting moments?",
    },
    options: [
      { id: "well", label: "Quite well — I can mostly separate my state from my response" },
      { id: "mostly-well", label: "Mostly well, though some days are harder" },
      { id: "inconsistently", label: "Inconsistently — I notice it affects my parenting" },
      { id: "struggle", label: "I struggle — my emotions regularly spill into my responses" },
    ],
    dimensionScores: {
      well: { "emotional-regulation": 9 },
      "mostly-well": { "emotional-regulation": 7 },
      inconsistently: { "emotional-regulation": 4 },
      struggle: { "emotional-regulation": 2 },
    },
  },

  // =========================================================================
  // SECTION: Values & Legacy
  // =========================================================================

  {
    id: "bp-values-01",
    section: "values-legacy",
    question: {
      "current-parent":
        "When you think about what you most want your child to take from their childhood into adult life, what comes to mind first?",
      expecting:
        "When you think about what you most want your child to carry from their childhood into adult life, what comes to mind first?",
      planning:
        "When you think about what you most want a future child to carry from their childhood into adult life, what comes to mind first?",
    },
    options: [
      { id: "security", label: "A deep sense of being loved and secure" },
      { id: "resilience", label: "Resilience — the ability to handle difficulty" },
      { id: "values", label: "Strong values and a clear sense of right and wrong" },
      { id: "self-knowledge", label: "Self-knowledge — knowing who they are" },
    ],
    dimensionScores: {
      security: { "emotional-warmth": 9, "presence-attunement": 8 },
      resilience: { "autonomy-support": 8, "protective-instinct": 5 },
      values: { "boundary-consistency": 8, "narrative-coherence": 7 },
      "self-knowledge": { "nonjudgmental-acceptance": 9, "autonomy-support": 8 },
    },
  },

  {
    id: "bp-values-02",
    section: "values-legacy",
    question: {
      "current-parent":
        "How much do you think about the way you parent — whether it's working, whether it reflects your values — outside of the moments when it's happening?",
      expecting:
        "How much do you already find yourself thinking about the kind of parent you want to be — reflecting, reading, wondering?",
      planning:
        "How much do you think about the kind of parent you want to be — reflecting on your values, reading, wondering?",
    },
    options: [
      { id: "a-lot", label: "A lot — I think about it regularly and deliberately" },
      { id: "fairly-often", label: "Fairly often — it matters to me" },
      { id: "sometimes", label: "Sometimes, especially after a hard moment" },
      { id: "not-much", label: "Not much — I tend to go with instinct" },
    ],
    dimensionScores: {
      "a-lot": { "narrative-coherence": 9 },
      "fairly-often": { "narrative-coherence": 7 },
      sometimes: { "narrative-coherence": 5 },
      "not-much": { "narrative-coherence": 3 },
    },
  },

  {
    id: "bp-values-03",
    section: "values-legacy",
    question: {
      "current-parent":
        "When you think about the parent you are now compared to the parent you want to be, how much of a gap do you feel?",
      expecting:
        "When you think about the parent you want to be versus the parent you might naturally default to, how large does that gap feel?",
      planning:
        "When you compare the parent you aspire to be with the parent you imagine you might naturally default to, how significant does that gap feel?",
    },
    whyWeAskThis:
      "Awareness of the gap between who we are and who we want to be is one of the strongest drivers of intentional parenting. This isn't a test — there's no wrong answer. Understanding where you are helps us give you something genuinely useful.",
    options: [
      { id: "small-gap", label: "A small gap — I'm mostly living my values" },
      { id: "moderate-gap", label: "A moderate gap — I'm actively working on it" },
      { id: "significant-gap", label: "A significant gap — I struggle to close it" },
      { id: "uncertain", label: "I'm not sure yet — still figuring out what I want" },
    ],
    dimensionScores: {
      "small-gap": { "narrative-coherence": 9, "emotional-regulation": 8 },
      "moderate-gap": { "narrative-coherence": 7 },
      "significant-gap": { "narrative-coherence": 5 },
      uncertain: { "narrative-coherence": 4 },
    },
  },

  {
    id: "bp-values-04",
    section: "values-legacy",
    question: {
      "current-parent":
        "How much do you feel you've consciously decided your approach to parenting — rather than just repeating or reacting to what you experienced growing up?",
      expecting:
        "How intentional have you been in deciding your parenting approach — rather than simply defaulting to what you experienced growing up?",
      planning:
        "How intentionally have you thought about your parenting approach — rather than simply defaulting to what you experienced growing up?",
    },
    options: [
      { id: "very-intentional", label: "Very intentional — I've thought carefully about it" },
      { id: "somewhat", label: "Somewhat — I've made deliberate choices in some areas" },
      { id: "reactive", label: "I tend to react more than plan — still working it out" },
      { id: "not-much", label: "Not much — I mostly go with what comes naturally" },
    ],
    dimensionScores: {
      "very-intentional": { "narrative-coherence": 9, "autonomy-support": 7 },
      somewhat: { "narrative-coherence": 7 },
      reactive: { "narrative-coherence": 4 },
      "not-much": { "narrative-coherence": 3 },
    },
  },

  {
    id: "bp-values-05",
    section: "values-legacy",
    question: {
      "current-parent":
        "How important is it to you that your child is allowed to disagree with you — to have their own views, even ones you don't share?",
      expecting:
        "How important is it to you that your child will be able to disagree with you — to develop their own views, even ones you don't share?",
      planning:
        "How important is it to you that a future child be allowed to have their own views — even ones that diverge from yours?",
    },
    options: [
      { id: "very-important", label: "Very important — I actively want to encourage it" },
      { id: "important", label: "Important, though within limits" },
      { id: "somewhat", label: "Somewhat — I believe in respecting authority too" },
      { id: "less-important", label: "Less important — shared values and alignment matter more" },
    ],
    dimensionScores: {
      "very-important": { "autonomy-support": 9, reciprocity: 9 },
      important: { "autonomy-support": 7, reciprocity: 7 },
      somewhat: { "autonomy-support": 5, "boundary-consistency": 6 },
      "less-important": { "autonomy-support": 2, "boundary-consistency": 8 },
    },
  },

  // =========================================================================
  // Cultural Background (metadata — end of quiz)
  // =========================================================================

  {
    id: "bp-cultural-background",
    section: "values-legacy",
    question: {
      "current-parent":
        "Which of these best describes the cultural background you were raised in? (You can search or scroll)",
      expecting:
        "Which of these best describes the cultural background you were raised in? (You can search or scroll)",
      planning:
        "Which of these best describes the cultural background you were raised in? (You can search or scroll)",
    },
    whyWeAskThis:
      "Cultural background shapes parenting in powerful ways — from what's considered 'normal' discipline to how emotions are expressed and how independence is encouraged. Understanding your cultural context helps us make your results more personally relevant.",
    inputType: "searchable-dropdown",
    options: [
      { id: "east-asian", label: "East Asian collectivist (Chinese, Korean, Japanese)" },
      { id: "south-asian", label: "South Asian joint-family (Indian, Pakistani, Bangladeshi)" },
      { id: "latin-american", label: "Latin American familismo (Mexican, Colombian, Brazilian)" },
      {
        id: "sub-saharan",
        label: "Sub-Saharan African community-centred (Nigerian, Kenyan, Ghanaian)",
      },
      { id: "western", label: "Western individualist (Australian, British, North American)" },
      { id: "other", label: "Other / Prefer not to say" },
    ],
    // Cultural background is metadata, not a scoring dimension — no scores
    dimensionScores: {},
  },
];

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

/**
 * Returns the Blueprint question bank adapted for the given parent status.
 * Maps each BlueprintQuestionRaw to a QuizQuestion by selecting the correct
 * question text wording for the parent status.
 *
 * Compatible with computeDimensionProfile() — all questions use the same
 * QuizQuestion interface with 'current' lens and 'option-cards' inputType
 * (except the cultural background question which uses 'searchable-dropdown').
 */
export function getBlueprintQuestions(status: ParentStatus): QuizQuestion[] {
  return RAW_QUESTIONS.map((raw) => ({
    id: raw.id,
    lens: "current" as const,
    section: raw.section,
    question: raw.question[status],
    leadIn: raw.leadIn,
    whyWeAskThis: raw.whyWeAskThis,
    inputType: raw.inputType ?? "option-cards",
    options: raw.options,
    dimensionScores: raw.dimensionScores,
  }));
}

export const TOTAL_BLUEPRINT_QUESTIONS = RAW_QUESTIONS.length;
