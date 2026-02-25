/**
 * lib/archetypes/cultural-overlays.ts
 *
 * Cultural context overlays for every parenting archetype in the Raising Giants framework.
 *
 * These overlays describe how the parenting you received expressed differently across
 * cultural contexts. Overlays are MODIFIERS, not alternative archetypes: a "Fierce Guardian"
 * in an East Asian collectivist context is still a Fierce Guardian — the protective instinct
 * you experienced may have expressed through academic pressure and family honor rather than
 * physical vigilance. Same archetype identity, different surface expression.
 *
 * Research basis:
 * - Lansford et al. cross-cultural parenting research (PMC11542638): within-culture
 *   variance exceeds between-culture variance; overlays must be framed as tendencies
 *   in contexts where... not as deterministic descriptions of all people in a culture
 * - PMC10558114: individualism/collectivism as the primary cultural modifier dimension
 * - IJIP cross-cultural parenting styles research (2025)
 *
 * Anti-patterns avoided:
 * - No stereotypical caricatures — each overlay describes contextual tendencies
 * - No hierarchy — no cultural context is framed as better or worse than others
 * - Western individualist is treated as one context among equals, not the default
 * - Overlays modify expression only; archetype identity is held constant
 *
 * 5 cultural contexts × 9 archetypes = 45 overlay entries.
 *
 * Exports: CULTURAL_OVERLAYS
 */

import type { ArchetypeId, CulturalOverlay } from "./types";

// ---------------------------------------------------------------------------
// Cultural context labels (used consistently across all archetypes)
// ---------------------------------------------------------------------------

const CTX_EAST_ASIAN = "East Asian collectivist (Chinese, Korean, Japanese)";
const CTX_SOUTH_ASIAN = "South Asian joint-family (Indian, Pakistani, Bangladeshi)";
const CTX_LATIN_AMERICAN = "Latin American familismo (Mexican, Colombian, Brazilian)";
const CTX_SUB_SAHARAN = "Sub-Saharan African community-centred (Nigerian, Kenyan, Ghanaian)";
const CTX_WESTERN = "Western individualist (baseline)";

// ---------------------------------------------------------------------------
// 1. The Steady Anchor
// ---------------------------------------------------------------------------

const STEADY_ANCHOR_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "Steadiness in East Asian collectivist contexts tended to express through behavioral reliability and provision rather than verbal emotional reassurance. Growing up with this, calm often read as respectful restraint — love understood through consistent academic guidance, predictable routines, and visible sacrifice rather than open emotional vocabulary or physical affection. The steadiness you grew up with may have felt more like dignified care than emotional distance.",
    strengthsInContext: [
      "The behavioral reliability you grew up with aligned with group harmony and filial expectations — giving you a deep sense of belonging through consistency you could count on",
      "The emotional restraint you experienced was received as respectful dignity, not coldness — stoic steadiness carried its own language of care that you likely learned to read",
      "The high structure you grew up with mapped cleanly onto shared academic and social expectations, giving you a framework that felt culturally coherent and supported",
    ],
    tensionsInContext: [
      "Verbal warmth may have felt unfamiliar growing up — leaving you with fewer models for the kind of emotional expressiveness you may have encountered through peers or media, and potentially making that kind of warmth feel foreign or uncomfortable",
      "The stoic steadiness you grew up with, reinforced by collectivist family harmony norms, may have meant individual emotional needs were quietly set aside — you may have learned that holding it together was the right response to most things",
      "Filial piety expectations in the household may have added layers of academic and social pressure on top of an already structured environment — with little room to name what that pressure cost you",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In joint-family South Asian contexts, the steadiness you grew up with was tested and shaped by diffuse family authority. Decisions often involved grandparents, aunts, and uncles — so the calm, consistent presence you experienced from one adult could be overridden or complicated by the wider family system. Growing up in this, steadiness likely came to feel less like a single anchoring presence and more like a skill of navigating between the calm center and the broader household.",
    strengthsInContext: [
      "The grounding, mediating quality you grew up with gave you early exposure to how to hold the center when people around you disagreed — a skill that becomes genuinely valuable in complex adult relationships",
      "The consistency and structure you experienced aligned with intergenerational expectations around respect and duty, giving you a sense of what reliability within family hierarchies looks like",
      "Growing up with calm under pressure was particularly meaningful in a household where stress from shared finances, intergenerational conflict, or cultural navigation was often present — you likely developed a tolerance for complexity that others find hard",
    ],
    tensionsInContext: [
      "When the limits you experienced were overridden by extended family, you may have been left uncertain about who the real authority was — and whether consistency was something you could actually rely on",
      "The boundary between healthy structure and accommodation of intergenerational pressure may have been genuinely hard to see growing up — you may have absorbed a version of calm that was partly performance rather than felt ease",
      "Marriage-family honor dynamics may have meant that the emotional steadiness you witnessed was partly a public display — something done for appearances rather than as a genuine, felt state — and that subtle difference may have registered even if you couldn't name it",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'In Latin American familismo contexts, the steadiness you grew up with was more naturally embedded in emotional expressiveness — warmth was culturally normalized, so the "anchor" quality felt less distant and more like a reliably warm center of family life. Simpatia norms meant that the calm you experienced often arrived alongside relational ease. You may have grown up with a version of steadiness that felt both grounded and emotionally present.',
    strengthsInContext: [
      "The warm reliability you grew up with maps onto familismo values — you likely experienced being consistently held within a stable, emotionally present family structure that felt like a genuine foundation",
      "The combination of warmth and structure you experienced aligned with respeto — you understood the care in the calm, and likely developed a sense of what dignified, grounded love looks like",
      "Growing up with calm in a family system that moved with feeling gave you a grounding reference — you had a steady center to return to even when the household around you was emotionally activated",
    ],
    tensionsInContext: [
      "Simpatia norms can make hard limits feel harder to sustain when everyone around you is drawn toward harmony — you may have experienced moments where the steadiness softened in ways that left you wanting a firmer hold",
      "If the steadiness you grew up with was partly shaped by strong expectations around being the perfectly reliable parent (particularly for mothers), you may have sensed the effort behind it — the performance of calm rather than the experience of it",
      "Family-centrality values may have meant that the people who raised you struggled to draw clear limits with extended family who wanted to participate in your upbringing — leaving you with mixed signals about where boundaries actually were",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the steadiness you grew up with was not just one person\'s quality — it was woven into a communal fabric. "It takes a village" was structural, not metaphorical, so the anchor presence you experienced may have come from multiple adults whose collective consistency created the foundation. Spiritual and religious frameworks often gave the steadiness you grew up with a deeper meaning — faith and community as load-bearing structures alongside the people who raised you.',
    strengthsInContext: [
      "The stable, consistent presence you grew up with contributed to a communal foundation — you likely developed a deep sense that care was a shared responsibility, not something one person alone could carry",
      "The integration of community and spiritual frameworks deepened the sense of grounded purpose you received — love and stability were embedded in something larger than the immediate household",
      "Respect for elders and intergenerational wisdom was part of what steadiness looked like growing up — you likely developed an early understanding of how to hold structure while remaining connected to a wider web of care",
    ],
    tensionsInContext: [
      "Because multiple adults shared in raising you, the steadiness you experienced may not have been consistent across all of them — you may have had to navigate between different approaches and norms that didn't always align",
      "Spiritual or religious frameworks, while often sustaining, could occasionally add their own expectations about what steadiness meant — leaving you holding your own needs alongside community and religious norms that pointed in different directions",
      "The presence of many adults in your upbringing meant that the privacy and consistency of a single family container was harder to come by — others' views on your development were more present and more influential than you may have always wanted",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the steadiness you grew up with maps most directly onto the research-validated authoritative parenting style. Emotional vocabulary, direct validation, and named feelings were culturally reinforced — so the combination of warmth and structure you experienced was embedded in a discourse that gave it language. You may have had access to a version of steady parenting that was explicitly named, culturally legible, and reinforced by therapeutic and parenting resources around you.",
    strengthsInContext: [
      "Growing up with this kind of steadiness gave you a foundation that aligns with dominant parenting research — you likely developed a sense of security that was culturally legible and consistently reinforced",
      "The emotional attunement combined with clear limits you experienced aligns with evidence-based attachment frameworks — giving you early models of what regulated, warm care actually looks like in practice",
    ],
    tensionsInContext: [
      "The cultural pressure to express feelings explicitly may have felt like an expectation in your household — and if the people who raised you were more action-oriented than verbal, you may have grown up wanting more of the words alongside the reliability",
      "The individualist framing of your family structure may have meant less community support than some other contexts — the steady center was more contained and isolated, without a broader village to reinforce it",
    ],
  },
];

// ---------------------------------------------------------------------------
// 2. The Fierce Guardian
// ---------------------------------------------------------------------------

const FIERCE_GUARDIAN_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, the protection you grew up with expressed strongly through academic pressure, family honor, and careful management of your social environment. Physical safety was a concern, but the dominant protection mode you likely experienced was rigorous preparation — strict study routines, high-stakes academic investment, and tight management of your peer group. The wall of safety was built through preparation for success within demanding systems, not only vigilance against physical threat.",
    strengthsInContext: [
      'The intense investment in your academic and social preparation you grew up with was a recognizable expression of fierce love — in this context, "tiger parenting" was culturally understood as devotion, and you may have received it that way even if it was also hard',
      "The high standards and consistent structure you experienced in service of your future aligned with filial piety expectations — you were being prepared, which was its own form of being cared for",
      "The protection that came through preparation — tutoring, structured activities, guidance on your trajectory — had tangible outcomes within high-achievement systems, and you likely carry real competences from it",
    ],
    tensionsInContext: [
      "Academic and social pressure as the dominant form of protection may have crowded out your own agency and intrinsic motivation — growing up, it may have been hard to know what you actually wanted versus what you were being prepared to achieve",
      "The warmth underlying the fierce protection was often less visible than the pressure itself — you may have grown up interpreting the demands as expectation rather than love, and had to work backward later to understand what was driving it",
      "Protection of the family's standing in the community added an additional layer to what you were carrying — you weren't just protecting yourself, you were representing the family's reputation, which added weight that wasn't always named",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, the protection you grew up with was both amplified and distributed. Multiple adults shared the protective function — but they may not have agreed on how to protect, creating protective solidarity alongside protective conflict. You may have grown up surrounded by fierce care that pulled in different directions: protection of your wellbeing, your family's honor, and your future prospects — sometimes in alignment, sometimes at odds.",
    strengthsInContext: [
      "The deep family investment in your wellbeing and future meant you were rarely unsupported — a network of protective adults ensured you had coverage across multiple dimensions of your life, even when individual efforts felt inconsistent",
      "The fierce commitment to protecting you from shame, dishonor, or community judgment gave you a structured social navigation guide — you likely developed early literacy about what the community expected and how to move within it",
      "The action-based love and practical provision you received was deeply honored within the extended family — the people who raised you demonstrated their care through what they did for you, which was culturally legible as devotion",
    ],
    tensionsInContext: [
      'Protection of family honor may have meant that your individual emotional needs were sometimes subordinated to the family\'s collective reputation — you may have experienced being "protected" from external judgment while your internal distress went unaddressed',
      "Multiple adults defending you in different directions could create confusion rather than safety — fierce care from all sides doesn't always land as security when the voices don't agree on what you need",
      'Strong gender norms in some South Asian contexts may have shaped what protection looked like for you differently than for siblings — particularly for daughters, whose autonomy development was often more constrained as part of being "kept safe"',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "In Latin American familismo contexts, the protection you grew up with was celebrated as the fullest expression of parental love. Marianismo — the cultural ideal of the self-sacrificing, all-protecting parent — maps directly onto the Fierce Guardian's core orientation. Growing up in this, you likely experienced fierce love as not just individual care but as embedded in a cultural story about what it means to be a devoted parent. The protection extended to family cohesion itself — anything threatening the family bond was treated as a threat.",
    strengthsInContext: [
      "The fierce protection you grew up with was culturally honored rather than questioned — the people who raised you expressed care in a way the community recognized and celebrated, which gave the protection a particular weight and legitimacy",
      "Strong community and family networks amplified the protective function around you — the care you received wasn't just from one parent but from a wider web of adults who felt genuine responsibility for your safety and future",
      "The clear authority and high expectations you grew up with were embedded in respeto — you understood them as coming from care and investment in your development, even when they felt demanding",
    ],
    tensionsInContext: [
      "Marianismo ideals can mean the self-sacrificing dimension of care becomes total — you may have grown up sensing the cost that fierce protection had on the person who was doing it, and that awareness may have shaped your own sense of what love requires",
      "Protection of family cohesion at the cost of individual autonomy was a real pattern — particularly if family loyalty was treated as equivalent to your personal safety, you may have had less room to explore who you were outside the family structure",
      "The cultural strength of the protective narrative made it harder to see the shadow side growing up — in a context where fierce love was deeply valued, you may have had fewer tools for naming what felt too tight",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the protection you grew up with extended beyond the nuclear family to include your place within the community and within spiritual and ancestral frameworks. Protection was communal and intergenerational — you were kept safe not just by your parents but by a wider kinship and community network. Part of what protection meant was being taught respect for elders and spiritual authorities — preparation for safe passage through community life.",
    strengthsInContext: [
      "The communal protection you grew up within meant that multiple adults felt genuine responsibility for your safety and development — you were held within a network, not just a household",
      "The spiritual and community frameworks that shaped what protection meant gave the care you received a grounded sense of purpose — protection wasn't just anxious vigilance but was embedded in a meaning-making system about who you were meant to become",
      "The high expectations and structured authority you grew up with were situated within a broader system of elder wisdom — the demands made sense within a larger framework, which gave them a kind of coherence",
    ],
    tensionsInContext: [
      "Growing up watched from many directions — by parents, extended family, community, spiritual authority — could make independence development particularly difficult. You may have felt the weight of multiple protective instincts converging on you simultaneously",
      "Spiritual frameworks for protection can add dimensions of watchfulness that amplify rather than contain the protective instinct — you may have grown up with a sense that threats came from many directions, including spiritual ones, which intensified the vigilance around you",
      "The low autonomy support that often accompanied fierce protection in this context may have been in tension with coming-of-age practices that simultaneously expected you to demonstrate independence — you may have received mixed signals about when it was time to be capable on your own",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the fierce protection you grew up with was most likely to encounter cultural friction — the dominant parenting discourse emphasizes autonomy and child-led development in ways that can frame protective parenting as excessive. You may have grown up in a household that received social messaging from schools, other parents, or therapeutic language that the care you were receiving was too much, even when it felt genuinely protective to you.",
    strengthsInContext: [
      "The fierce investment in your safety you grew up with was understood as love — even if the expression attracted external scrutiny, the commitment behind it was recognizable as genuine care",
      "The high standards and consistent structure you experienced built real competences — self-regulation, preparation, and the capacity to navigate demanding environments were genuine outcomes of a protective upbringing",
    ],
    tensionsInContext: [
      "Growing up with fierce protection in a cultural context that valorizes independence may have left you with a particular kind of tension — the safety you experienced at home sat in contrast with cultural messages about what capable, autonomous development was supposed to look like",
      "Western educational systems, therapeutic frameworks, and parenting communities that value child-led development may have explicitly questioned the approach you grew up with — leaving you in a position of defending something you hadn't yet had time to fully evaluate yourself",
    ],
  },
];

// ---------------------------------------------------------------------------
// 3. The Gentle Nurturer
// ---------------------------------------------------------------------------

const GENTLE_NURTURER_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "The warmth and attunement of the Gentle Nurturer in East Asian collectivist contexts were present in the care you received — but may not have been fully visible through the channels you might have expected. Growing up in a context where emotional restraint signaled respect and maturity, the nurturer's care may have expressed more through service, provision, and practical attention than through verbal affirmation or direct emotional disclosure. The love was there; the vocabulary for it may have been more muted.",
    strengthsInContext: [
      "The deep relational investment in your inner life you grew up with was real, even when less visible — you likely sensed that someone was paying close attention to how you were feeling, even if it wasn't always named",
      "The emphasis on emotional harmony you grew up with aligned with collective harmony norms — you likely developed a sensitivity to relational atmosphere and an instinct for reading what others need",
      "The attunement you received helped you navigate the cultural translation work between home and school environments — someone in your life was paying attention to the gap, even when it was hard to bridge",
    ],
    tensionsInContext: [
      "The academic pressure norms of many East Asian educational contexts may have created a structural dissonance — deep relational support at home alongside demanding performance expectations elsewhere, with limited room to voice the tension between them",
      "The natural warmth of the Gentle Nurturer may have been moderated by cultural norms around emotional restraint, meaning you received a partially filtered version of the care that was available — the person raising you may have held back their natural relational style in ways you sensed but couldn't name",
      "Growing up with soft limits alongside filial piety expectations that required deference to parental and elder authority may have left you uncertain about where you actually stood — encouraged to have your own experience while also expected to defer",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, the warmth and attunement you grew up with from the Gentle Nurturer coexisted with a family system where limits were sometimes enforced by other adults — grandparents, aunts, or uncles — rather than by the nurturing figure themselves. You may have grown up with a warm, receiving presence who gave you emotional safety, and a wider family system that provided the structure. This could work as a complementary system, though it could also leave you uncertain about who actually held authority.",
    strengthsInContext: [
      "The deep relational warmth you grew up with aligned with joint-family values of emotional connection — you had a place in the family system where you were received with genuine care and unconditional attention",
      "Having at least one adult in your life who received you without agenda was particularly valuable in a complex multi-adult environment — that unconditional attunement provided a safe harbor in a system that could otherwise feel demanding",
      "The autonomy support you received may have helped you navigate the tension between family expectations and your own developing individual identity — you had space, at least with one person, to voice that tension",
    ],
    tensionsInContext: [
      "When the warmth you received from one adult was inconsistently mirrored or overridden by the extended family's harder lines, you may have been left confused about what the actual rules were — and whether the safety you felt with one person was dependable across the wider household",
      "Marriage-family honor expectations may have created pressure on the nurturing adult in your life to hold harder lines than their nature supported — you may have sensed the strain between their natural warmth and what the family system demanded of them",
      "In a joint-family context, the self-sacrifice dimension of caregiving can become very total — and if the person who nurtured you gave in ways that depleted them, you may have grown up with a complex relationship to receiving care",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "In Latin American familismo contexts, the warmth and attunement of the Gentle Nurturer found perhaps the most natural cultural home — emotional expressiveness, physical warmth, and relational closeness were central values, so the care you grew up with was not just present but celebrated. The challenges around limits were still part of the experience, but they occurred within a cultural environment that fully recognized and honored the warmth itself.",
    strengthsInContext: [
      "Growing up in a context where emotional expressiveness and relational closeness were the cultural norm meant the care you received was legible — the warmth wasn't hidden or translated, it was the expected and celebrated expression of good parenting",
      "Simpatia norms aligned with the relational warmth you grew up with — you likely had early models of harmonious, warm relational exchange that became part of your understanding of what closeness feels like",
      "The deep investment in family bonds you grew up with was understood as the highest expression of family love — you may have developed a strong sense of what it means to be truly cared for and held",
    ],
    tensionsInContext: [
      "The strong cultural value of closeness and family cohesion may have reinforced the pull toward keeping you close — and if the limits were soft, the cultural framework provided additional permission for that softness, making independence development harder to find room for",
      "Growing up in a high-warmth cultural context where limits were also harder to hold may have left you wanting both the warmth and the structure — and finding it difficult to separate the two in your own adult relationships",
      "Marianismo expectations (particularly for mothers) can mean the self-sacrifice and emotional absorption that shaped the care you received were pushed to significant extremes — and you may have grown up with a complex relationship to how much someone can give",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the warmth and attunement you grew up with were embedded within a communal child-rearing framework where emotional generosity toward children was a shared community value. You likely received warmth from multiple nurturing adults, not just a single caregiver. Community expectations around elder respect and collective discipline may have provided the structural limits that the Gentle Nurturer naturally avoids, creating a complementary system that served you across different domains.",
    strengthsInContext: [
      "The communal warmth framework meant the attunement you grew up with was part of a wider culture of emotional generosity toward children — you were embedded within a broader system of care, not dependent on a single relationship",
      "Community structures and elder authority often provided the limits that the nurturing adult in your life found less natural — you may have experienced a complementary system where warmth and structure came from different sources but both reached you",
      "The integration of spiritual and community identity in the care you received grounded that love in something larger — you likely developed a sense that you mattered within a meaning-making framework beyond the immediate household",
    ],
    tensionsInContext: [
      "Community discipline norms may have been harsher than the gentle approach you experienced from the nurturing adult in your life — you may have grown up navigating between those two registers and had to develop your own sense of what felt right",
      "With caregiving distributed across many adults, the individual attunement you valued most may have been harder to find consistently — the warmth was present but the depth of being truly seen by one person who knew you fully may have been harder to access",
      "Strong elder respect norms may have created tension when the nurturing adult in your life honored your voice and experience — that kind of being-heard may have been less available in the wider community, making it something you came to treasure and perhaps to seek",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the warmth and attunement of the Gentle Nurturer had significant cultural support — attachment parenting movements, gentle parenting communities, and child-centered educational philosophies were all culturally present and reinforcing. The care you grew up with was likely embedded in a broader discourse that celebrated it, and the limit-setting challenges were also well-recognized — giving both you and the adults raising you a kind of cultural language for what was happening.",
    strengthsInContext: [
      "Emotional attunement and explicit emotional vocabulary were culturally reinforced in your environment — the Gentle Nurturer's natural style was supported by a significant strand of Western parenting culture that you likely encountered in multiple forms",
      "Child-centered educational and therapeutic frameworks provided language and community for the kind of care you received — you likely had access to frameworks that helped name what you experienced and why it mattered",
    ],
    tensionsInContext: [
      'The Western cultural discourse around "gentle parenting" can sometimes reinforce the avoidance of limits under the banner of respecting the child\'s autonomy — if that was part of your upbringing, you may have grown up with a great deal of emotional freedom but fewer external structures to provide orientation',
      "Individualist frameworks emphasizing the parent-child dyad may have meant less community support around you — the warmth you received was primarily from one or two people rather than embedded in a broader network, which could make it feel more fragile",
    ],
  },
];

// ---------------------------------------------------------------------------
// 4. The Intentional Guide
// ---------------------------------------------------------------------------

const INTENTIONAL_GUIDE_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, the deliberate, growth-oriented parenting you grew up with expressed its intentionality primarily through the external domain — careful management of educational opportunity and social network rather than through emotional process exploration. The intentionality was real; you likely felt the purposefulness of the investment in your development. But the channel was preparation and achievement rather than the inner life.",
    strengthsInContext: [
      "The deliberate scaffolding of your capability was culturally recognized and honored — you grew up with a kind of investment in your development that felt purposeful and directional, even if it was demanding",
      "The regulated, non-reactive quality of the intentional parenting you received provided a calming influence in high-pressure academic environments — you may have benefited from not having parental anxiety added on top of your own",
      "The intellectual framework behind the parenting you experienced gave you access to a kind of organized understanding of development — you may have grown up with the sense that your growth was being thoughtfully managed, which can feel like being taken seriously",
    ],
    tensionsInContext: [
      "The strong emphasis on academic achievement in many East Asian contexts may have pulled the intentional investment in you toward competence-building at the expense of emotional development — you may have grown up with a well-scaffolded external life and fewer tools for the internal one",
      "Emotional restraint norms may have made it harder for the adults who raised you to model the emotional process exploration that is central to their framework — the cultural context may not have created room for the reflective emotional sharing that could have accompanied the intentionality",
      "Collective identity expectations may have created tension with the deep commitment to your individual autonomy and self-determination — you may have experienced intentional investment in who you were becoming while also being pulled toward what the family and community expected",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the intentional, deliberate approach to your upbringing existed within a family system where decisions were shared and authority was diffuse. The intentionality was real but had to operate within a broader relational web — the adults most invested in your development couldn\'t always parent "on purpose" when family pressures, elder expectations, and household dynamics shaped the context in ways outside their control. Growing up in this, you may have sensed the intentionality and also sensed its limits.',
    strengthsInContext: [
      "The capacity to hold multiple perspectives simultaneously that shaped your upbringing was particularly valuable in a joint-family context — you likely developed early exposure to what navigating diverse needs, generations, and worldviews looks like when it is done with reflection rather than reaction",
      "Conscious attention to intergenerational patterns is culturally resonant in contexts where family history is explicitly valued — you may have grown up with an unusual degree of awareness about where family patterns came from and why they persisted",
      "The structured autonomy support you received as a bridge between traditional family expectations and more individualistic peer environments likely gave you a genuine developmental advantage in navigating between different worlds",
    ],
    tensionsInContext: [
      "The carefully considered approach to your upbringing may have been overridden by extended family members who did not share the same framework — leaving you caught between one adult's thoughtful intentionality and a wider family system operating by different rules",
      "The commitment to your authentic self-direction may have been a source of family conflict — in a joint-family context, that kind of individual developmental investment can feel like a departure from the collective",
      "The intellectual framework behind the parenting you received may not have translated smoothly across generational lines — you may have sensed that the adults most invested in you felt somewhat isolated from a family system that didn't fully understand or respect their approach",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "The intentional, growth-oriented parenting you grew up with in Latin American familismo contexts may have occasionally felt somewhat more measured or cooler than the spontaneous relational warmth that characterizes familismo culture. The deliberateness was respected, but you may have grown up sensing a slight register difference between the thoughtful, purposeful care and the warmer, more expressive relational norm around you. Not a rejection — a different frequency.",
    strengthsInContext: [
      "The genuine respect for your individual journey that shaped your upbringing resonated with the strong personal dignity values within Latin American culture — your particular path was taken seriously and honored as mattering in its own right",
      "The deliberate investment in your development was recognized as a form of deep care within familismo frameworks — you were being consciously prepared for the world, which was understood as love expressed through foresight",
      "The intentional approach to holding limits while maintaining warmth aligned with respeto — you understood the authority as coming from genuine care and investment in who you were becoming",
    ],
    tensionsInContext: [
      "The more measured relational style of the intentional parenting you received may have felt slightly less warm than the high-warmth cultural norm around you — you may have occasionally felt the gap between what you received at home and what expressiveness looked like elsewhere",
      "Strong family cohesion expectations may have created tension with the deep commitment to your individual autonomy — family loyalty and individual self-direction came into contact in ways that required ongoing navigation, and that navigation may have started earlier than you would have chosen",
      "Simpatia norms around harmonious interaction may have made the honest, direct feedback conversations that were part of your upbringing feel harder to sustain in other relationships — you may have grown up with a model of directness that wasn't always easy to find elsewhere",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the reflective, intentional approach to your upbringing existed within a communal framework where child-rearing was explicitly shared. The intentionality of the people most invested in your development was one voice among many rather than the defining framework — elder guidance, community wisdom, and spiritual frameworks all shaped who you became alongside the deliberate investment of your immediate caregivers.",
    strengthsInContext: [
      "The reflective, deliberate investment in your development was a strong resource in a complex community context — you likely grew up with an unusual sense of being thoughtfully considered, not just managed",
      "The growth orientation aligned with community investments in your education, apprenticeship, and preparation for adult roles — the intentional investment in you resonated with the community's own aspirations for your development",
      "The trust in your capacity that came with intentional parenting supported coming-of-age practices and community integration rituals — you were being prepared to demonstrate capability, and that preparation showed",
    ],
    tensionsInContext: [
      "The carefully considered approach to your upbringing may not have always aligned with community wisdom and elder guidance that pulled in different directions — you may have grown up navigating between the intentionality of one adult and the weight of community tradition",
      "The intellectual framework behind the parenting you received may have been harder to share with community members and extended family who operated from traditional and experiential knowledge — you may have sensed that the adults most invested in you were working from a different map than those around them",
      "Strong elder respect norms may have created tension with the emphasis on honoring your authentic voice — you were encouraged toward self-direction in one context while being expected toward deference in others, which required you to read the room carefully",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the intentional, deliberate parenting you grew up with was perhaps most culturally at home — conscious parenting frameworks, therapeutic language, growth mindset culture, and evidence-based parenting resources are widely available and highly valued. The care you received likely felt embedded in a broader cultural ecosystem of books, podcasts, and communities that spoke the same language, giving it a kind of legibility and reinforcement.",
    strengthsInContext: [
      "The intentional approach to your upbringing was explicitly supported and celebrated within contemporary Western parenting discourse — the language of conscious parenting, secure attachment, and growth mindset was mainstream, which gave the care you received cultural recognition",
      "Access to therapeutic, educational, and community resources supported the reflective investment in your development — you likely grew up with frameworks available to help name and understand what was shaping you",
    ],
    tensionsInContext: [
      "The abundance of parenting frameworks and resources in Western contexts can amplify perfectionism — there was always another approach, another expert, another way to be more intentional. You may have grown up sensing some of the anxiety underneath the thoughtfulness",
      "The cultural individualism of Western contexts may have meant you grew up without the communal child-rearing support structures that might naturally complement the reflective individual approach — the intentionality could feel isolating for the adults carrying it",
    ],
  },
];

// ---------------------------------------------------------------------------
// 5. The Resilient Striver
// ---------------------------------------------------------------------------

const RESILIENT_STRIVER_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, growing up with people who had done their own healing work often meant navigating a particular kind of intergenerational complexity — the people who raised you were actively working against patterns of emotional suppression, academic pressure as love, or punitive discipline while operating within a cultural context that still valued many of those same norms. You may have grown up experiencing both the effort of their healing and the ongoing presence of the culture it was working against.",
    strengthsInContext: [
      "Growing up with people who had done hard-won emotional integration work gave you a bridge between your family's cultural framework and a more emotionally expressive understanding of care — you had access to someone who understood both worlds from the inside",
      "The selective honoring of tradition you grew up with — keeping what was valuable, releasing what was harmful — gave you early exposure to cultural navigation as a skill, not just a burden",
      "The achievement orientation that was culturally normative provided a shared framework with extended family, while the healing work happening within your household created a different quality of relationship within that framework — you may have grown up experiencing both",
    ],
    tensionsInContext: [
      "Growing up with people who were breaking intergenerational patterns is more complex when the surrounding culture actively reinforces those patterns — you may have experienced the healing work at home as subtly countercultural, and the friction of that contrast may have registered early",
      "Extended family members may have interpreted the different approach of the adults who raised you as rejection of cultural values or family loyalty — and you may have found yourself caught in the middle of that misunderstanding",
      "The ongoing presence of the patterns being broken — in extended family, in community, in cultural norms — may have meant that the healing work you grew up around was never quite complete, and you may have absorbed some of that ongoing tension",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, growing up with people who were doing their own healing work meant that healing occurred in real time within a living family system that often operated according to the old rules. The people who raised you weren't just working from memory — they were negotiating daily with parents, in-laws, and extended family who were present and involved. You may have grown up witnessing that negotiation, and that witnessing shaped you in ways that were both instructive and, at times, exhausting.",
    strengthsInContext: [
      "The hard-won emotional wisdom of the people who raised you was a genuine resource in complex extended-family dynamics — you likely grew up with unusual access to someone who could see the roots of family patterns and navigate them with more awareness than those around them",
      "The integration of their own narrative gave the people who raised you a particular capacity for empathy with extended family members operating from unexamined histories — and some of that empathy may have shaped how you came to see people in general",
      "Pattern-breaking within a joint-family context, when it worked, benefited the entire extended family system — the healing you grew up around may have had ripple effects you only came to recognize later",
    ],
    tensionsInContext: [
      "Growing up while the people who raised you were doing healing work within the very system that needed healing was significantly demanding — you may have been a witness and sometimes a participant in something that was bigger than what a child should have had to carry",
      "Marriage-family honor dynamics may have made the openness of the adults who raised you feel threatening or shameful to other family members — and you may have experienced the tension between their healing and the family's desire to maintain privacy and reputation",
      "The scale of what was being navigated — intergenerational patterns, current family dynamics, cultural expectations, and your own needs — may have meant the weight of it all was sometimes palpable in the household you grew up in",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'In Latin American familismo contexts, growing up with people who had done their own healing work may have resonated deeply within a cultural framework that already told stories of family hardship, survival, and cross-generational sacrifice. The narrative of "we struggled so you wouldn\'t have to" is culturally familiar — and the healing work you grew up around added: "and I also did the work to make sure I would parent from strength rather than from the pain." You may have grown up with an unusual awareness of that intention.',
    strengthsInContext: [
      "The transformation narrative of the people who raised you resonated with cultural stories of family resilience and cross-generational aspiration that are deeply honored within familismo frameworks — you grew up within a story of chosen growth, not just survival",
      "The emotional expressiveness that is culturally normative in Latin American contexts provided a natural channel for the integration work happening around you — family history, pain, and growth were speakable, which gave the healing work cultural air to breathe",
      "The strong communal identity of familismo meant that the pattern-breaking you grew up within was embedded in a web of relationships that, when supportive, provided genuine holding for that work",
    ],
    tensionsInContext: [
      "The cultural emphasis on family loyalty and cohesion may have made it harder to name or acknowledge the family patterns being broken — the work of healing sometimes looked, from the outside, like criticism of the family, and you may have grown up navigating that perception",
      "The self-sacrifice dimension of Latin American parenting ideals may have added cultural pressure on the people who raised you to be both the healed parent and the perfect family anchor — you may have sensed the weight of trying to be both",
      "The warmth and expressiveness of familismo culture can occasionally pull toward the very emotional intensity that healing work tries to integrate — and you may have grown up in a household where that dynamic was visible and required ongoing awareness",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, growing up with people who were doing their own healing work meant that their individual journey existed within a communal narrative framework. The idea of healing across generations has deep roots in many African spiritual and community traditions — ancestral healing, becoming the answer to prayers of previous generations. You may have grown up with a sense that the healing work around you was not just personal but was, in some framework, community and ancestral work as well.",
    strengthsInContext: [
      "Spiritual and communal frameworks for intergenerational healing provided rich cultural support for the work the people who raised you were doing — you grew up around healing that was understood and honored within traditions that gave it meaning",
      "The community structure provided multiple sources of wisdom and support for the adults who raised you — you may have grown up with access to elders, spiritual leaders, and community members who recognized and supported the pattern-breaking work happening in your household",
      "The hard-won growth of the people who raised you is deeply honored in contexts that value the elder role — as they matured, their journey became a community resource, and you grew up alongside that becoming",
    ],
    tensionsInContext: [
      "Community and elder expectations may not always have supported the specific patterns being broken in your household — traditional practices that the adults who raised you had identified as harmful may have been deeply valued by the community, creating a kind of isolation you may have felt alongside them",
      "The communal and spiritual dimension of the healing narrative may have added weight to what was already significant — you may have grown up with a sense that the stakes of this healing were very large, which had its own kind of pressure",
      "The communal child-rearing context meant that the changed approach of the adults who raised you reached only part of your caregiving environment — other adults in your life may have maintained the old patterns despite the healing work happening at home",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, growing up with people who had done their own healing work meant you were raised within a rich infrastructure of therapeutic resources, attachment frameworks, trauma-informed practice, and personal growth culture that directly served that journey. The language of earned secure attachment, intergenerational healing, and breaking cycles was mainstream — and you likely grew up with unusual access to frameworks that named what was happening in your household.",
    strengthsInContext: [
      "Therapeutic resources, attachment-informed parenting communities, and personal growth frameworks explicitly supported the work the adults who raised you were doing — you were not raised in isolation from others doing the same work",
      "The cultural value of individual growth and self-understanding aligned deeply with the orientation of the people who raised you — their work was culturally legible and honored, which gave the household you grew up in a particular kind of cultural confidence",
    ],
    tensionsInContext: [
      "The cultural abundance of healing frameworks can sometimes mean the healing work never fully settles — there is always another layer, another framework to integrate. Growing up around that, you may have absorbed some of the ongoing orientation-toward-history that comes with it",
      "The individualist framing of healing in Western contexts can make it feel like a solo project — and if you grew up around healing work that felt lonely for the adults doing it, you may have carried some of that aloneness yourself",
    ],
  },
];

// ---------------------------------------------------------------------------
// 6. The Structured Mentor
// ---------------------------------------------------------------------------

const STRUCTURED_MENTOR_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, the Structured Mentor's high expectations and love expressed through investment in your competence were deeply culturally aligned. Emotional restraint was culturally normative, so the lower affective warmth expression you grew up with may not have read as cold — it fit the cultural register of respectful parental care. Growing up in this context, you may have experienced a version of structured mentoring that felt more culturally supported and less emotionally ambiguous than it might in other settings.",
    strengthsInContext: [
      "The high-expectations, competence-oriented approach you grew up with was deeply culturally valued — the demanding investment in your capability aligned with educational and family achievement norms that were explicitly honored in your cultural context",
      "Emotional restraint as a sign of dignity and respect meant the lower affective warmth expression you grew up with fit the cultural register — you may have understood the respect in it more readily than you would have in a higher-warmth cultural context",
      "Growing up being prepared and equipped to contribute to the family and community gave the demands placed on you a sense of shared purpose — you were being built for something, and that orientation had cultural coherence",
    ],
    tensionsInContext: [
      "The cultural amplification of achievement pressure may have intensified the already achievement-focused orientation you grew up with — the watchout around emotional attunement being deprioritized in favor of performance is more pronounced in contexts that further reinforce this",
      "The collective dimension of achievement meant you were carrying not just individual performance but family honor and reputation — the demands on you extended beyond yourself in ways that added weight you may have been too young to fully hold",
      "Emotional suppression may have been more total in a cultural context where it was normative as well as natural to this style of parenting — you may have had very few channels for expressing emotional needs, and even fewer cultural prompts for anyone around you to notice",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, the high expectations and competence orientation you grew up with aligned with intergenerational investment in your achievement, education, and social standing. The extended family context provided additional sources of demanding expectation and high standards — the Structured Mentor's orientation was reinforced rather than moderated. Growing up in this, you may have experienced multiple adults all invested in your performance, each adding their own layer of expectation.",
    strengthsInContext: [
      "The high expectations and investment in your educational and professional future were deeply valued across your extended family system — the structured mentoring you received resonated with intergenerational ambitions for you that gave the demands a sense of collective backing",
      "The practical provision orientation — organizing resources, creating opportunities, preparing you — aligned with joint-family investments in your future as a shared family project. You may have grown up knowing that significant resources were being mobilized on your behalf",
      "The clear authority and structure within the family hierarchy meant the high expectations you grew up with carried the weight of intergenerational expectation — you understood them as coming from something larger than individual preference",
    ],
    tensionsInContext: [
      "Multiple adults' high standards converging on you may have created an intensely pressured environment — growing up under the weight of a whole family system's ambitions and expectations has its own particular kind of gravity",
      "The emotional attunement gap may have been amplified in a joint-family context where emotional privacy was low — your distress may have been managed collectively through expectation rather than individually through someone genuinely attuned to what you were experiencing",
      "Diffuse authority meant that the standards placed on you weren't always consistent — different family members may have held different expectations, creating an environment where you were working to satisfy a set of sometimes contradictory demands",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "In Latin American familismo contexts, the Structured Mentor's high expectations and lower emotional expressiveness may have felt somewhat at odds with a cultural framework that centers warmth, relational closeness, and expressive care. Growing up with this particular style of love in a culturally warm context may have left you feeling the gap — the investment was real, but its register was different from the warmth you saw expressed around you.",
    strengthsInContext: [
      "The investment in your preparation and future you grew up with was recognized as a form of deep parental care within familismo frameworks — the commitment to your competence and capability was understood as love, even in a less expressive register",
      "The clear expectations and consistent structure provided a stable framework within potentially emotionally dynamic family environments — you may have experienced the reliability of those expectations as a grounding presence even when it felt demanding",
      "Respeto norms aligned with the high expectations and structured authority you grew up with — you understood the demands as coming from genuine investment in your development, and that made them more legible",
    ],
    tensionsInContext: [
      "The lower affective warmth expression you grew up with may have been more conspicuous in a cultural context where warmth is highly expected and visible — you may have felt the gap between the investment in you and its emotional legibility more sharply than you would have in another context",
      "The familismo value of emotional closeness and connection may have meant external pressure on the adults who raised you to express warmth in ways that felt foreign or effortful to them — and you may have sensed both the desire for that warmth and the gap in finding it",
      "The communal expressiveness of Latin American family culture may have made the lower-warmth parenting style you grew up with feel more isolated by contrast — you may have had rich warmth available in extended family or community while the immediate household registered differently",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the high expectations and competence orientation you grew up with aligned with community investments in your capability to contribute and thrive. Education, practical skills, and the ability to fulfill community roles were highly valued — the investment in your capability resonated with the community's aspirations for your development. The communal structure may also have provided the relational warmth that the more structured mentoring at home expressed less of.",
    strengthsInContext: [
      "The investment in your capability, education, and preparation for adult roles was highly valued within your community — you grew up with a sense that your development mattered to a wider network than just your immediate household",
      "The communal framework naturally provided relational warmth and connection that complemented the more practical investment in your competence — you may have experienced warmth from community that balanced what was more restrained at home",
      "Elder respect norms aligned with the high expectations and clear authority you grew up with — the demanding adults in your life were understood within a framework of elders who demand growth from the young as an expression of belief in their potential",
    ],
    tensionsInContext: [
      "With multiple influences shaping your development, the achievement orientation of your immediate household was one among several — if other caregivers provided higher warmth alongside lower structure, you may have experienced inconsistency in what was expected of you",
      "The communal warmth around you may have made the more reserved emotional register of the structured mentoring at home more visible by contrast — you may have felt the difference between the warmth available elsewhere and what was expressed most directly toward you",
      'Spiritual and religious frameworks for your development may have emphasized character, spiritual growth, and community belonging in ways that partly reframed what "capable" meant — and you may have had to develop your own integration of these different definitions',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the Structured Mentor's style may have encountered the most cultural friction — contemporary Western parenting discourse strongly emphasizes emotional attunement, validation of feelings, and child-centered development, all areas where this parenting style naturally scores lower. Growing up with this kind of care in a Western context may have meant receiving external cultural messaging that complicated or challenged the framework you were raised within.",
    strengthsInContext: [
      "The achievement orientation and high expectations you grew up with produced genuinely valued outcomes — competence, self-reliance, resilience — that are recognized and valued in Western educational and professional contexts. The preparation was real and its effects are real",
      "The low protective instinct and high autonomy support created genuine space for your independent development — you may have been given more freedom to navigate the world than some of your peers, and that capacity may have served you",
    ],
    tensionsInContext: [
      "Contemporary Western parenting culture heavily emphasizes emotional attunement and warmth expression in ways that positioned the style you grew up with as a potential deficit — you may have received cultural messaging, from schools, therapists, or peers, that complicated your relationship to the parenting you received",
      "Therapeutic frameworks commonly available in Western contexts may have framed the emotional restraint you grew up with through a pathologizing lens — and you may have had to do real work to find your own understanding of what the care behind it actually was",
    ],
  },
];

// ---------------------------------------------------------------------------
// 7. The Open-Hearted Learner
// ---------------------------------------------------------------------------

const OPEN_HEARTED_LEARNER_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, the emotional attunement and heart-led care of the Open-Hearted Learner were present in the parenting you received — but may have been partially suppressed or re-routed through more culturally acceptable channels. Growing up with this, the warmth and genuine care for your inner world were likely there, but expressed more through academic support, provision, and practical care, while the emotional dimension may have been less directly visible. You may have grown up sensing the love while having fewer words for what it was.",
    strengthsInContext: [
      "The genuine attunement to your inner experience that shaped your upbringing meant someone in your life noticed when you were struggling with the pressures of a high-achievement context — you had emotional ballast in a demanding environment, even if it wasn't always verbal",
      "The growth orientation and openness to learning in the parenting you received resonated with cultural values around self-improvement — you grew up around an adult who was genuinely learning alongside you, which may have given you permission to not always know",
      "The warmth and care you grew up with provided a counterbalance to high-achievement pressure that may have been genuinely needed — you had access to a kind of softness that was not always easy to find in the wider context",
    ],
    tensionsInContext: [
      "Cultural norms of emotional restraint may have created external pressure to suppress the emotional expressiveness that is natural to this parenting style — you may have grown up with someone whose natural attunement was partly held back, and you may have sensed the containment without fully understanding it",
      "The still-integrating quality of the parenting you received, in a context where intergenerational patterns were strongly reproduced, may have left you without as much modeled emotional process as you needed — the resources for individual reflection and emotional integration were less available",
      "The protective instinct, in contexts where academic and social vigilance was high, may have intensified in ways that further constrained your developing autonomy — you may have experienced more watchfulness than felt proportionate to the actual risks",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, the emotional generosity and genuine attunement of the Open-Hearted Learner created a warm anchor within complex extended-family dynamics. Growing up with this, you had access to someone who received you fully — but that person may have also been navigating a family system alive with the very dynamics they were still working to understand. You may have grown up with both the gift of their emotional presence and the complexity of their ongoing work.",
    strengthsInContext: [
      "The deep emotional availability of the adult who most nurtured you was a significant resource in a joint-family context where you were navigating multiple adult relationships — you always had someone who received you fully, without agenda",
      "The genuine curiosity about growth that shaped your upbringing aligned with the intergenerational depth of South Asian family culture — you grew up around someone naturally interested in understanding where family patterns came from and how they move through time",
      "The warmth and emotional generosity you received contributed to your sense of belonging within the family system — even in a complex household, that warmth was a real and sustaining thing",
    ],
    tensionsInContext: [
      "The joint-family context was likely activating for the adult who most nurtured you — the very dynamics they were still integrating were living and present in your daily environment, which may have meant that their capacity for consistent attuned presence had real limits",
      "Multiple adults with different emotional styles may have undermined or inconsistently mirrored the attuned approach you received from one person — the contrast may have been confusing, with warmth that felt variable and hard to predict across the household",
      "Marriage-family honor expectations may have created pressure to suppress the very emotional openness that was this parent's strength — you may have grown up sensing that something in the household had to be held back, even if you couldn't name what it was",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "In Latin American familismo contexts, the Open-Hearted Learner's heart-led, emotionally attuned parenting was perhaps most naturally at home — and the care you grew up with fit the cultural register. Emotional expressiveness, warmth, and relational closeness were central cultural values, so the care you received was culturally legible, celebrated, and reinforced. You may have grown up with a warm, receiving, emotionally present adult whose style felt continuous with the warmth in the wider cultural environment around you.",
    strengthsInContext: [
      "Emotional expressiveness and relational warmth were central cultural values — the care you grew up with was not just accepted but was the culturally celebrated expression of engaged parenting. You likely received warmth that felt both familial and culturally endorsed",
      "The communal emotional support of familismo culture provided holding for the ongoing integration work of the adults who raised you — they were not alone in navigating emotional complexity, and that support made them more available to you",
      "The cultural storytelling tradition around family history and intergenerational experience provided a natural channel for the kind of understanding and curiosity that shaped your upbringing — you grew up with permission to know where things came from",
    ],
    tensionsInContext: [
      "The high emotional temperature of Latin American family culture may have amplified the emotional absorption tendency in the parenting you received — the cultural norm of intense emotional engagement may have reinforced a risk of empathy becoming merger, and you may have grown up with more emotional intensity than felt navigable at times",
      "The strong cultural pressure toward family cohesion and loyalty may have made it harder for the adults who raised you to create the individual reflective space they needed for their own ongoing work — and some of that pressure may have been palpable in the household",
      "Marianismo expectations may have amplified the self-sacrifice and emotional absorption of the care you received in ways that intensified depletion risk — you may have grown up sensing the cost of that level of giving",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the emotional generosity and growth orientation of the Open-Hearted Learner found resonance within communal frameworks that value emotional investment in children and honor personal development journeys. Growing up in this, the warmth you received was embedded within a wider culture of care — and the community structure may have provided the consistent limits that the Open-Hearted Learner's more permissive style didn't always offer.",
    strengthsInContext: [
      "The genuine warmth and emotional attunement you grew up with aligned with communal values of generous care — your attunement was part of a broader system of emotional investment in children's wellbeing, not an isolated quality",
      "Community structures may have provided the consistent limits and elder guidance that the adult who raised you found less natural — you may have experienced a complementary system where warmth and structure reached you from different sources",
      "Spiritual and communal frameworks for personal growth provided meaningful context for the growth orientation that shaped your upbringing — you grew up with a sense that development was understood within a larger framework of human becoming",
    ],
    tensionsInContext: [
      "The adult who most nurtured you may have been activated by community and elder dynamics that echoed unresolved patterns — the communal environment can be as triggering as it is supportive, and you may have grown up with some of the complexity that creates",
      "Community expectations around parental authority and discipline may have been in tension with the more emotionally permissive style you experienced at home — you may have navigated between what felt right there and what was expected in the wider community",
      "The communal context meant that the ongoing integration work of the adults who raised you was less private — family and community members may have noticed and commented on variability in ways that added complexity to your household's emotional life",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the Open-Hearted Learner's emotional attunement and growth orientation had significant cultural support — attachment parenting communities, gentle parenting frameworks, personal growth culture, and therapeutic resources were all present and reinforcing. Growing up with this parenting style in a Western context, you likely had unusual access to cultural frameworks that named what you were receiving and honored it.",
    strengthsInContext: [
      "The emotional attunement and genuine commitment to growth that shaped your upbringing were explicitly valued and supported within contemporary Western parenting culture — you grew up within a framework that had cultural recognition and external endorsement",
      "Access to therapeutic resources, attachment-informed parenting communities, and personal development frameworks directly supported the ongoing integration work of the adults who raised you — and that support made them more available as caregivers",
    ],
    tensionsInContext: [
      "The cultural celebration of emotional openness and the abundance of healing frameworks can sometimes orient parenting primarily toward the adult's own growth experience — you may have grown up as a participant in someone else's healing journey in ways that were not always about your present needs",
      "Western individualism can amplify the isolation of the integration journey — the adult who raised you may have been doing complex work without the communal support structures that would naturally be present in more collective cultural contexts, and you may have felt some of that aloneness alongside them",
    ],
  },
];

// ---------------------------------------------------------------------------
// 8. The Devoted Champion
// ---------------------------------------------------------------------------

const DEVOTED_CHAMPION_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, growing up with a Devoted Champion meant the intense investment in your success was culturally aligned — the deep devotion, the willingness to sacrifice personally, and the high expectations all resonated with culturally normative parenting. The conditional quality of the warmth you received may have been less visible because conditional approval is a culturally shared pattern, not an individual departure. You may have grown up in an environment where the champion's intensity was the cultural norm, which made it both more supported and harder to name as its own particular thing.",
    strengthsInContext: [
      "The deep personal investment in your outcomes was culturally legible as love — the people who raised you devoted themselves to your success in ways the community recognized and honored, which gave that devotion a particular weight and legitimacy",
      "The active support combined with high expectations mapped onto the culturally honored pattern of parents who move mountains for their children's success — you likely grew up with real resources, real investment, and real preparation",
      "The fierce advocacy for you within institutional settings was a recognized and valued parental role — the people who raised you fought for your opportunities, and you may have grown up with a sense of being actively championed in the world",
    ],
    tensionsInContext: [
      "The cultural amplification of achievement-based approval may have intensified the conditional warmth pattern you grew up with — in an environment where love and worth were more tightly coupled to performance, you may have internalized that coupling in ways that still show up today",
      "The collective reputation dimension meant the people who raised you were championing not just you but the family's standing — and you may have grown up carrying that additional weight alongside your own development",
      "Emotional restraint norms may have made it harder for the adults who raised you to express the unconditional dimension of their love, leaving the conditional dimension more visible by default — the warmth was there, but the conditions around it may have been more apparent than the love itself",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, growing up with a Devoted Champion meant fierce advocacy for you operated within a complex extended family system. The championing may have expressed as protecting you from family criticism, fighting for your interests in intergenerational negotiations, and ensuring you received the best opportunities the family could provide. The conditional warmth was amplified by family honor dynamics — your achievements reflected on the entire family, and that collective stake in your success was always present.",
    strengthsInContext: [
      "The advocacy for you in a joint-family context was amplified by the complexity of the system — your interests were actively defended within a web of competing family needs and expectations, and that defense was real and often effective",
      "The deep personal sacrifice for your future was culturally honored and recognized within the extended family — the willingness to subordinate personal needs to your outcomes was understood as the highest form of parental duty",
      "The practical investment in your education, social connections, and future prospects aligned with extended family expectations — you likely grew up with the sense that the entire family system was, in some form, invested in your success",
    ],
    tensionsInContext: [
      "The joint-family system could both support and distort the championing instinct — the person who most advocated for you may have been simultaneously using family expectations as a motivational tool, which may have left you uncertain about whether the advocacy was fully for you or also for something else",
      "Marriage-family honor dynamics added an additional layer of conditional acceptance — your worth within the family system may have been explicitly linked to your achievements, social standing, and eventual marriage prospects in ways that extended well beyond individual performance",
      "The championing that was done for you may have been expected rather than appreciated by the wider family system — and you may have grown up sensing some of the depletion that came from giving that much without enough reciprocal support",
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "In Latin American familismo contexts, growing up with a Devoted Champion meant the fierce advocacy and passionate devotion were culturally celebrated. The intensity of the love and investment you grew up with was culturally legible and honored. But the conditional quality of the warmth may have been more visible in a context where unconditional emotional expressiveness is the cultural norm — the moments when warmth withdrew may have been more conspicuous against a culturally warm backdrop.",
    strengthsInContext: [
      "The passionate, all-in quality of the devotion you grew up with aligns with familismo values of deep family love — you were raised by someone who saw their role as being your fiercest advocate and supporter, and that orientation was culturally celebrated rather than questioned",
      "The willingness to sacrifice personally for your future resonated with cultural narratives of parental sacrifice that are central to family identity — you grew up within a story of devotion that had cultural recognition and weight",
      "The champion's advocacy — ensuring you received opportunities, fighting institutional barriers, opening doors — was a recognized and honored parental role. You may have grown up with a genuine sense of being fought for in the world",
    ],
    tensionsInContext: [
      "In a cultural context where warmth is expected to be unconditional and freely given, the conditional warmth pattern may have created more visible strain — you may have noticed the fluctuations in warmth more sharply against a culturally warm backdrop, and learned early to read the signals",
      "Marianismo expectations may have intensified the sacrifice dimension to the point of total self-effacement — the cultural ideal of the all-giving parent may have amplified the tendency to subordinate personal wellbeing, and you may have grown up with a complex sense of what love requires of a person",
      "The familismo value of unconditional family loyalty may have been in tension with the implicit message that love has conditions — that internal tension may have registered for you even before you had language for it",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the fierce investment in your success took on a communal dimension — championing you was also championing the family's future contribution to the community. Growing up with this, you may have felt the weight of collective aspiration: your development was understood as connected to the community's future, and the people who raised you were investing in you with that larger frame in mind. Spiritual frameworks may have added a sense of calling or destiny to the investment.",
    strengthsInContext: [
      "The intense parental investment in you was embedded within communal aspirations — you grew up with the sense that your development mattered beyond just the immediate household, which gave the devotion a particular kind of meaning",
      "Community and elder structures recognized and supported the championing parent — the adult who fought for your opportunities was honoring their role within the intergenerational community structure, and that recognition gave the advocacy a kind of cultural weight",
      "Spiritual frameworks for your potential and calling may have provided a meaningful context for the intensity of investment you grew up with — the devotion felt purposeful rather than merely anxious, grounded in something larger",
    ],
    tensionsInContext: [
      "The intense focus on your development may have been in tension with communal expectations of more evenly distributed care across the community's children — you may have sensed the way your household's investment in you stood out, which carried its own complexity",
      "The conditional warmth pattern may have been amplified by communal expectations — you represented not just your parent's investment but the community's aspirations, adding layers of performance pressure that extended well beyond the household",
      "The advocacy for individual achievement may have occasionally been in tension with communal values that prioritize collective contribution over individual distinction — you may have grown up learning to navigate between those two orientations",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, growing up with a Devoted Champion may have meant experiencing cultural tension from two directions: the intense investment in your outcomes aligned with achievement culture, but the conditional warmth pattern may have conflicted with dominant gentle parenting and unconditional positive regard frameworks. You may have grown up in a household that received cultural messaging celebrating the advocacy while questioning the emotional approach — which may have made it harder to find a coherent way to understand what you were receiving.",
    strengthsInContext: [
      "The intense investment in your development and success was culturally valued — the parent who actively championed your interests, opportunities, and outcomes was recognized and appreciated in the broader cultural environment",
      "The advocacy dimension — fighting for you in institutional settings, removing barriers, creating opportunities — aligned with Western values of parental agency and individual empowerment, giving the devotion a culturally legible form",
    ],
    tensionsInContext: [
      "Contemporary Western parenting discourse around unconditional positive regard and separating behavior from identity may have created explicit cultural friction around the conditional warmth you grew up with — you may have encountered, from schools or therapists or peers, frameworks that complicated your understanding of what you received",
      "The therapeutic culture of Western contexts may have provided language that pathologized the conditional acceptance you grew up with — and the process of finding a nuanced understanding of what the care behind it actually was may have required real work",
    ],
  },
];

// ---------------------------------------------------------------------------
// 9. The Collaborative Ally
// ---------------------------------------------------------------------------

const COLLABORATIVE_ALLY_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      "In East Asian collectivist contexts, the democratic, egalitarian approach of the Collaborative Ally sat in tension with the hierarchical family structures and strong deference-to-elders norms of the surrounding culture. Growing up with this parenting style, you may have experienced a genuine belief in your right to have a voice and influence decisions — in a cultural context that did not always validate that stance. The contrast between home and the wider world may have been particularly pronounced.",
    strengthsInContext: [
      "Growing up with genuine respect for your perspective gave you a particular kind of cultural bridge — you developed early literacy about individual voice and agency that may have served you as you navigated changing cultural contexts where younger generations increasingly value being heard",
      "The cooperative problem-solving approach created a strong relational foundation that supported you through the stress of high-achievement educational systems — you had a space where collaboration rather than performance was the primary mode, and that contrast mattered",
      "The nonjudgmental acceptance that characterized your upbringing provided a rare emotional safe harbor in a context where approval could be tightly tied to performance — you grew up with at least one space where you were received without conditions",
    ],
    tensionsInContext: [
      "The egalitarian orientation of the adults who raised you may have been read by extended family and community as a failure of proper parental authority — and you may have grown up navigating between the democratic home environment and the hierarchical world outside it, learning to read which rules applied where",
      "The democratic decision-making style at home may have created confusion when other adults in your life — teachers, grandparents, extended family — operated from an authority-based model. The signals may have been hard to integrate",
      "The collaborative approach may have, at times, made it harder to navigate the authority structures that remained hierarchical in the broader society — school, work, and institutional settings. You may have needed to learn a different register for those environments",
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      "In South Asian joint-family contexts, the cooperative, democratic approach of the Collaborative Ally was tested by the multi-layered authority structure of the extended family. Growing up with a parent who treated you as a partner may have put that parent in tension with the intergenerational authority expectations of the wider household. You may have grown up with genuine collaborative safety from one adult alongside hierarchical expectations from many others — and had to develop your own way of holding both.",
    strengthsInContext: [
      "The deep acceptance and nonjudgmental stance that characterized your upbringing provided a uniquely safe emotional space for navigating the complex expectations of joint-family life — you had at least one relationship where you were not performing for approval",
      "The cooperative approach modeled a different kind of relationship that you may have found genuinely valuable as you developed your own identity within, and sometimes distinct from, the family system",
      "The high reciprocity orientation in the parenting you received may have strengthened the relationship through trust rather than authority — and that trust may have become a particularly important resource during adolescence",
    ],
    tensionsInContext: [
      "The democratic orientation of the adult who raised you may have created active family conflict — elder family members may have viewed it as disrespectful to family hierarchy and intervened to impose traditional authority over you, leaving you caught in the middle",
      "Receiving democratic treatment from one adult while experiencing hierarchical authority from grandparents and extended family may have created a split in your understanding of how relationships work — two very different models operating simultaneously",
      'The cultural expectation of parental sacrifice and total devotion may have framed the egalitarian stance as insufficient care — "real parents" make decisions for their children rather than with them — and you may have internalized some of that questioning',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      "In Latin American familismo contexts, the Collaborative Ally's nonjudgmental acceptance and warmth aligned naturally with the emotional heart of familismo culture. But the democratic approach to decision-making may have felt somewhat unfamiliar in a context where respeto included clear parental authority. Growing up with this style, you may have experienced both the deep relational warmth and, at times, the slight cultural friction of a more egalitarian approach in a context where family hierarchy was part of the love.",
    strengthsInContext: [
      "The deep emotional warmth and unconditional acceptance you grew up with resonate strongly with familismo values — the quality of the relational connection was culturally celebrated, and you likely felt that celebration in the way the family environment received your home life",
      "The cooperative approach may have been experienced within familismo as deep respect for you as a full member of the family rather than a subordinate within it — a framing that made the democratic orientation more culturally legible",
      "The nonjudgmental stance provided an important emotional resource in a context where family expectations around conformity and loyalty could create significant internal pressure — you had a space where you could be exactly as you were",
    ],
    tensionsInContext: [
      "Respeto norms that include deference to parental authority may have been in tension with the egalitarian orientation of the adults who raised you — they may have had to navigate between their natural style and cultural expectations about appropriate family hierarchy, and that navigation may have been visible to you",
      "Strong family cohesion values may have meant that the democratic approach felt, to extended family, like it diluted appropriate parental authority — you may have grown up sensing that some adults around you questioned the approach even while the warmth was present",
      "The collaborative approach to difficult conversations may have been perceived as insufficient firmness by those around you — and you may have grown up learning to distinguish between the love behind the collaboration and the cultural expectation of a clearer authority",
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      "In Sub-Saharan African community-centred contexts, the democratic, cooperative approach of the Collaborative Ally sat within a communal framework where both care and authority were distributed across multiple adults. Growing up with this, the egalitarian stance from one adult may have existed alongside elder-respect norms and community authority structures — and you may have developed early skill at reading which relational mode was appropriate in which context.",
    strengthsInContext: [
      "The cooperative orientation of the adults who raised you aligned with communal decision-making traditions that value consensus and collective input — the democratic instincts were not entirely foreign to community-centred governance models, which may have given them a kind of cultural resonance",
      "The unconditional acceptance and nonjudgmental stance provided emotional safety within a community context where you were subject to multiple adults' expectations — you had a reliable safe harbor within a system that could otherwise feel dense with judgment",
      "The reciprocity you grew up with modeled a relational style that can strengthen community ties — you learned to negotiate, consider others' perspectives, and contribute to shared decisions, which are genuinely valued community skills",
    ],
    tensionsInContext: [
      "Strong elder-respect norms may have positioned the egalitarian approach of the adults who raised you as a violation of the generational authority structure — and you may have grown up navigating the gap between that democratic home culture and the hierarchical authority expected everywhere else",
      "Communal discipline expectations may have required more clearly defined parental authority than the collaborative approach naturally provides — community members may have stepped in when the cooperative approach seemed insufficient, which may have created complicated moments",
      "The democratic approach to your relationship at home may have been genuinely hard to maintain when the broader community operated from authority-based models — you may have received conflicting signals about how power works in relationships, and had to do your own integration work",
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      "In Western individualist contexts, the Collaborative Ally was perhaps most culturally at home — democratic parenting, children's rights frameworks, and egalitarian family models are well-represented in parenting discourse. Growing up with this style, you likely had cultural reinforcement around you that validated the cooperative, nonjudgmental approach you experienced at home — from collaborative problem-solving frameworks, nonviolent communication, and democratic family traditions.",
    strengthsInContext: [
      "The approach you grew up with is explicitly supported by multiple well-known Western parenting frameworks — collaborative problem-solving, nonviolent communication, and democratic family structures all speak the same language as the care you received",
      "The egalitarian orientation aligned with broader Western cultural values of individual rights and agency applied to the parent-child relationship — you grew up with a kind of relational model that was culturally legible and celebrated in the environment around you",
    ],
    tensionsInContext: [
      "The democratic orientation can sometimes be used to avoid the discomfort of being the authority when authority is genuinely needed — and Western cultural support for egalitarian parenting may have reinforced an avoidance of structure that was sometimes genuinely needed. You may have grown up with a great deal of voice and fewer clear structures to orient by",
      "The individualist framing may have meant the collaborative approach was more isolated than it needed to be — without the communal support structures that would complement it with broader authority, you may have had to find your own orientation outside the home more than children in other cultural contexts",
    ],
  },
];

// ---------------------------------------------------------------------------
// CULTURAL_OVERLAYS — the complete exported record
// ---------------------------------------------------------------------------

/**
 * CULTURAL_OVERLAYS provides cultural context overlays for every archetype,
 * keyed by ArchetypeId.
 *
 * Each archetype has overlays for 5 named cultural contexts:
 * - East Asian collectivist (Chinese, Korean, Japanese)
 * - South Asian joint-family (Indian, Pakistani, Bangladeshi)
 * - Latin American familismo (Mexican, Colombian, Brazilian)
 * - Sub-Saharan African community-centred (Nigerian, Kenyan, Ghanaian)
 * - Western individualist (baseline)
 *
 * Research basis: Lansford et al. (PMC11542638), PMC10558114 on individualism/
 * collectivism as primary cultural modifier. Overlays are framed as tendencies
 * in contexts where... — within-culture variance exceeds between-culture variance.
 *
 * Downstream consumers:
 * - lib/archetypes/archetypes.ts — each Archetype.culturalOverlays array
 * - Phase 5 AI prompts — cultural context used for personalization
 */
export const CULTURAL_OVERLAYS: Record<ArchetypeId, CulturalOverlay[]> = {
  "steady-anchor": STEADY_ANCHOR_OVERLAYS,
  "fierce-guardian": FIERCE_GUARDIAN_OVERLAYS,
  "gentle-nurturer": GENTLE_NURTURER_OVERLAYS,
  "intentional-guide": INTENTIONAL_GUIDE_OVERLAYS,
  "resilient-striver": RESILIENT_STRIVER_OVERLAYS,
  "structured-mentor": STRUCTURED_MENTOR_OVERLAYS,
  "open-hearted-learner": OPEN_HEARTED_LEARNER_OVERLAYS,
  "devoted-champion": DEVOTED_CHAMPION_OVERLAYS,
  "collaborative-ally": COLLABORATIVE_ALLY_OVERLAYS,
};
