/**
 * lib/archetypes/cultural-overlays.ts
 *
 * Cultural context overlays for every parenting archetype in the Raising Giants framework.
 *
 * These overlays describe how each archetype's core tendencies manifest differently
 * across named cultural contexts. Overlays are MODIFIERS, not alternative archetypes:
 * a "Fierce Guardian" in an East Asian collectivist context is still a Fierce Guardian —
 * the protective instinct expresses through academic pressure and family honor rather
 * than physical vigilance. Same archetype identity, different surface expression.
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

import type { CulturalOverlay, ArchetypeId } from './types';

// ---------------------------------------------------------------------------
// Cultural context labels (used consistently across all archetypes)
// ---------------------------------------------------------------------------

const CTX_EAST_ASIAN = 'East Asian collectivist (Chinese, Korean, Japanese)';
const CTX_SOUTH_ASIAN = 'South Asian joint-family (Indian, Pakistani, Bangladeshi)';
const CTX_LATIN_AMERICAN = 'Latin American familismo (Mexican, Colombian, Brazilian)';
const CTX_SUB_SAHARAN = 'Sub-Saharan African community-centred (Nigerian, Kenyan, Ghanaian)';
const CTX_WESTERN = 'Western individualist (baseline)';

// ---------------------------------------------------------------------------
// 1. The Steady Anchor
// ---------------------------------------------------------------------------

const STEADY_ANCHOR_OVERLAYS: CulturalOverlay[] = [
  {
    culturalContext: CTX_EAST_ASIAN,
    expressionModifier:
      'Steadiness in East Asian collectivist contexts tends to be expressed through behavioral reliability and provision rather than verbal emotional reassurance. "Being there" means consistent academic guidance, predictable routines, and visible sacrifice — not necessarily open emotional vocabulary or physical affection. The calm may read as respectful restraint rather than emotional distance, and children often understand love through action before words.',
    strengthsInContext: [
      'Behavioral reliability and predictability are deeply culturally valued — the Steady Anchor\'s consistency aligns with group harmony and filial expectations',
      'Emotional restraint as respect is recognized and received; stoic steadiness is not read as coldness but as dignified care',
      'High structure maps cleanly onto shared academic and social expectations without requiring negotiation',
    ],
    tensionsInContext: [
      'Emotional expressiveness may feel culturally unfamiliar to the parent; children raised in more emotionally explicit environments (e.g., through media or peer influence) may want more verbal warmth than the parent naturally provides',
      'The tendency to hold it together under pressure can, in collectivist contexts, extend to suppressing individual emotional needs in service of family harmony — the watchout is mistaking stoicism for resolution',
      'Filial piety expectations may add external pressure layers that compete with the parent\'s natural calm, particularly around academic performance and social conformity',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In joint-family South Asian contexts, the Steady Anchor\'s calm and structure are tested by diffuse parenting authority — decisions are often made collectively by grandparents, aunts, and uncles, and a single parent\'s consistent approach can be overridden by extended family input. Steadiness becomes a relationship management skill as much as a parenting skill, and maintaining consistent limits requires ongoing negotiation with a broader family system.',
    strengthsInContext: [
      'The grounding, mediating quality of the Steady Anchor is particularly valued in complex extended-family systems where conflict is frequent and someone needs to hold the center',
      'High structure and consistency align with intergenerational expectations around respect, duty, and proper conduct within the family hierarchy',
      'The capacity to stay calm under pressure is amplified in value when household stress — from shared finances, intergenerational conflict, or cultural navigation pressures — is high',
    ],
    tensionsInContext: [
      'Consistent limits can be hard to hold when extended family members override or undermine parenting decisions — the Steady Anchor may find themselves managing loyalty to both parents and to their own parenting values simultaneously',
      'The joint-family context can make it harder to distinguish healthy structure from accommodation of intergenerational pressure; personal calm may suppress unaddressed family conflict rather than resolving it',
      'Marriage-family honor dynamics may add an expectation that the parent\'s emotional steadiness is always publicly displayed, creating a pressure to perform calm rather than actually feel it',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'In Latin American familismo contexts, the Steady Anchor\'s warmth is more naturally expressed because emotional expressiveness is culturally normalized. The "anchor" quality resonates strongly with familismo values of strong family cohesion and the parent as the reliable center of family life. Simpatia norms — the cultural emphasis on pleasant, harmonious social interactions — align with the Steady Anchor\'s non-reactivity, though they can also make it harder to hold difficult limits when harmony feels at stake.',
    strengthsInContext: [
      'Warm reliability maps well onto familismo values — the parent who is consistently present, emotionally warm, and a source of family stability is deeply recognized and celebrated in this cultural context',
      'The Steady Anchor\'s combination of warmth and structure aligns with respeto — the cultural value of treating family members with dignity and appropriate authority — which children recognize as care',
      'Calm under pressure is amplified in value in contexts where family dynamics are emotionally intense; the Steady Anchor provides a regulating center in a system that moves with feeling',
    ],
    tensionsInContext: [
      'Simpatia norms can make it harder to hold uncomfortable limits when doing so disrupts family harmony; the Steady Anchor\'s structure may soften in the face of collective emotional pressure from the extended family',
      'Strong maternal identity expectations in some Latin American contexts may create additional performance pressure on the anchoring parent, particularly mothers, to be perfectly reliable without acknowledging their own needs',
      'The family-centrality value may make it harder for the Steady Anchor parent to draw appropriate boundaries with extended family members who wish to participate in parenting decisions',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Steady Anchor\'s stable presence takes on additional meaning because child-rearing is explicitly communal — "it takes a village" is not a metaphor but a structural reality. The anchor parent may be one of several adults providing consistent care, and their stability contributes to a collective foundation rather than operating as a single-family unit. Spiritual and religious integration often shapes what "being steady" means — faith and community are load-bearing structures alongside the parent.',
    strengthsInContext: [
      'Stable, consistent presence contributes to the communal fabric of child-rearing; the Steady Anchor\'s reliability is amplified in value when multiple adults share responsibility and consistency across caregivers matters',
      'The integration of community and spiritual frameworks can deepen the Steady Anchor\'s sense of grounded purpose, aligning their natural orientation with culturally supported meaning-making about what parenting is for',
      'Respect for elders and intergenerational wisdom aligns with the Steady Anchor\'s capacity to hold structure and defer appropriately without losing their own grounding',
    ],
    tensionsInContext: [
      'Communal child-rearing means that the Steady Anchor\'s consistent approach may not be shared by all other adults in the child\'s life — the anchor may need to navigate between their own style and community-wide norms that differ',
      'Spiritual or religious authority may sometimes be in tension with the parent\'s own approach; the Steady Anchor may find themselves holding their own values alongside community religious expectations, particularly around discipline or emotional expression',
      'Extended community involvement can make it harder to maintain the privacy and consistency of a single family system — others\' views on parenting are more present and more influential',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'In Western individualist contexts, the Steady Anchor archetype maps most directly onto the research-validated authoritative parenting style. Emotional vocabulary, direct validation, and named feelings are culturally reinforced and expected. The archetype\'s combination of warmth and structure is explicitly valued in parenting discourse, therapeutic language, and popular parenting resources.',
    strengthsInContext: [
      'The archetype\'s characteristics are well-supported by dominant parenting frameworks in Western contexts — culturally legible, research-backed, and socially reinforced',
      'Emotional attunement combined with clear limits aligns with current evidence-based parenting approaches emphasized in pediatric and therapeutic settings',
    ],
    tensionsInContext: [
      'The cultural pressure to express feelings explicitly and verbally may feel performative to Steady Anchor parents who are naturally more action-oriented in their care',
      'The individualist framing of the parent-child relationship can sometimes create tension when extended family or community have different views on what consistent parenting looks like',
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
      'In East Asian collectivist contexts, the Fierce Guardian\'s protective instinct expresses strongly through academic pressure, family honor, and collective reputation management. Physical safety remains a concern, but the dominant protection mode is ensuring the child is equipped to succeed within high-stakes educational and social systems. The "wall of safety" is built through rigorous preparation, strict study routines, and careful management of the child\'s social environment and peer group.',
    strengthsInContext: [
      'High investment in the child\'s academic and social preparation aligns with cultural expectations and is recognized as a form of deep care — "tiger parenting" is a widely understood expression of fierce love in these contexts',
      'The capacity to maintain high standards and consistent structure in service of the child\'s future resonates with filial piety expectations — the parent is fulfilling their duty through vigilance',
      'Protection expressed through preparation (tutoring, structured activities, academic guidance) has tangible positive outcomes within high-achievement educational contexts',
    ],
    tensionsInContext: [
      'Academic and social pressure as protection can crowd out the child\'s own agency and intrinsic motivation — the protection mode may persist even when the child is ready to take more ownership of their own development',
      'Emotional restraint as cultural norm can mean that the warmth underlying the fierce protection is even less visible than it already is, leaving the child to interpret the pressure as demand rather than love',
      'The collective reputation dimension adds an additional layer of vigilance — protection of the family\'s standing in the community can take precedence over the child\'s individual wellbeing in ways that amplify the autonomy-restriction watchout',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Fierce Guardian\'s protective instinct is both amplified and distributed. Protection of the child includes protection of the family\'s honor, the management of marriage prospects (particularly for daughters), and defense of the child from community judgment. The joint-family structure means that multiple adults share in the protective function — but they may not agree on how to protect, creating protective conflict as well as protective solidarity.',
    strengthsInContext: [
      'Deep family investment in the child\'s wellbeing and future — the extended family system provides a network of protective adults whose collective vigilance ensures the child is rarely unsupported',
      'The fierce commitment to protecting the child from shame, dishonor, or community judgment aligns with cultural values around family reputation and provides a structured social navigation guide',
      'Practical provision and sacrifice for the child\'s welfare is deeply honored and recognized within the extended family — the Fierce Guardian\'s action-based love is culturally legible',
    ],
    tensionsInContext: [
      'Protection of family honor can mean that the child\'s individual emotional needs are subordinated to the family\'s collective reputation — the child may be "protected" from external judgment while experiencing internal distress that goes unaddressed',
      'Diffuse protective authority across the extended family can create inconsistent protection — multiple adults defending the child in different directions, sometimes against each other, which creates confusion rather than safety',
      'Strong gender norms in some South Asian contexts can shape the protective instinct differently for sons and daughters in ways that may limit the daughter\'s autonomy development significantly',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'In Latin American familismo contexts, the Fierce Guardian\'s protective instinct aligns strongly with the cultural value of family protection and the parent as the family\'s defender. Marianismo — the cultural ideal of the self-sacrificing, all-protecting mother — maps directly onto the Fierce Guardian\'s core orientation. Protection is expressed both through physical safety and through fierce loyalty to family cohesion, which can mean a strong resistance to anything perceived as threatening family bonds.',
    strengthsInContext: [
      'The cultural framework of familismo honors and recognizes fierce parental protection as the fullest expression of parental love — the Fierce Guardian\'s natural orientation is culturally celebrated rather than pathologized',
      'Strong community and family networks amplify the protective function — the Fierce Guardian parent operates within a system of collective protection that reinforces their natural instincts',
      'Respeto norms align with the Fierce Guardian\'s high expectations and clear authority — the parent\'s protective authority is culturally supported and children understand it as the expression of care it is',
    ],
    tensionsInContext: [
      'Marianismo ideals can intensify the self-sacrificing dimension of protection to the point of parent depletion — the cultural expectation that mothers sacrifice everything for family safety can amplify the Fierce Guardian\'s tendency to subordinate personal needs to protective function',
      'Protection of family cohesion can come at the cost of individual children\'s autonomy development — particularly when family loyalty is treated as equivalent to personal safety',
      'The cultural strength of the protective narrative can make it harder for the Fierce Guardian to receive feedback that their protection is too tight — in a context where fierce love is highly valued, the shadow side is less visible',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Fierce Guardian\'s protective function extends beyond the nuclear family to include protection of the child\'s place within the community and within spiritual and ancestral frameworks. Protection is communal and intergenerational — the child is protected not just by their parents but by the wider kinship and community network. The guardian role includes teaching respect for elders and spiritual authorities as a form of preparing the child for safe passage through community life.',
    strengthsInContext: [
      'The communal framework amplifies the Fierce Guardian\'s protective function — protection is shared across a network of adults who all feel genuine responsibility for the child\'s safety and development',
      'Strong elder respect norms align with the Fierce Guardian\'s high expectations and structured authority — the parent\'s guidance is situated within a broader system of wisdom that gives it cultural weight',
      'Spiritual and religious integration provides additional frameworks for understanding protection — the Fierce Guardian\'s watchfulness can be grounded in a sense of purpose and meaning that extends beyond individual anxiety',
    ],
    tensionsInContext: [
      'Communal protection can sometimes mean that multiple adults\'s protective instincts converge on the same child in ways that make independence development particularly difficult — the child is watched from many directions',
      'Spiritual frameworks for protection can add dimensions of watchfulness (around spiritual threats, community judgment, ancestral expectations) that amplify rather than contain the protective instinct',
      'The Fierce Guardian\'s low autonomy support may be in tension with coming-of-age practices in some communities that expect young people to demonstrate independence and capability at specific developmental points',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'In Western individualist contexts, the Fierce Guardian archetype is the most likely to encounter explicit cultural friction — the dominant parenting discourse emphasizes autonomy, independence, and child-led development in ways that can pathologize protective parenting. The Fierce Guardian may receive social messaging that their vigilance is excessive even when it is adaptive, or encounter clinical language around "helicopter parenting" that frames their care as a problem.',
    strengthsInContext: [
      'The archetype\'s fierce investment in the child\'s safety is recognized and honored — this level of commitment is understood as love, even if the expression invites scrutiny',
      'High standards and consistent structure align with evidence-based approaches to building competence and self-regulation in children',
    ],
    tensionsInContext: [
      'The dominant cultural discourse around independence and child autonomy may create external pressure on the Fierce Guardian to give more space than they are comfortable with — the tension between cultural expectations and natural instincts is pronounced in this context',
      'The Fierce Guardian\'s low autonomy support may be more explicitly challenged by Western educational systems, therapeutic frameworks, and parenting communities that value child-led development',
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
      'The Gentle Nurturer in East Asian collectivist contexts faces a particular tension: their natural orientation toward emotional expressiveness and relational warmth may not be fully legible in cultural environments where emotional restraint is a sign of respect and maturity. Their warmth and attunement are still present and experienced by the child, but may be expressed more through service and provision than through verbal affirmation or direct emotional disclosure.',
    strengthsInContext: [
      'Deep relational investment is recognized and valued — the Gentle Nurturer\'s commitment to the child\'s inner life resonates within extended family and community contexts where the parent\'s devotion is visible',
      'The tendency to minimize conflict and prioritize emotional harmony aligns with collective harmony norms, reducing family friction in high-density living situations',
      'Emotional attunement to the child\'s experience allows the Gentle Nurturer to navigate the cultural translation work their children must do between home and school environments with particular sensitivity',
    ],
    tensionsInContext: [
      'The academic pressure norms of many East Asian educational contexts create a structural conflict with the Gentle Nurturer\'s permissive boundary orientation — the child may receive strong support at home while encountering demanding performance expectations elsewhere',
      'Emotional expressiveness that is natural to the Gentle Nurturer may be moderated by cultural norms around restraint, leaving the parent partially withholding their natural relational style in ways that create internal tension',
      'The soft boundary orientation is tested by filial piety expectations that require the child to defer to parental and elder authority — the Gentle Nurturer may struggle to hold the cultural expectation of respect-through-deference while also honoring the child\'s autonomy',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Gentle Nurturer\'s soft-boundary orientation can be amplified when extended family members fill the limit-setting role that the parent naturally avoids. The warmth and attunement remain constant, but boundaries may be enforced (sometimes inconsistently) by grandparents, aunts, and uncles rather than the Gentle Nurturer themselves. This can work as a system, though it can also leave the child confused about who the authority actually is.',
    strengthsInContext: [
      'The deep relational warmth of the Gentle Nurturer aligns with joint-family values of emotional connection and collective care for the child\'s wellbeing',
      'Gentle attunement is particularly valuable in complex family systems where children navigate multiple adult relationships and need one adult who receives them unconditionally',
      'The autonomy support orientation can help children navigate the tension between family expectations and their own developing individual identity — the Gentle Nurturer creates a space where that tension can be voiced',
    ],
    tensionsInContext: [
      'The extended family structure may either undercut or over-enforce limits in ways the Gentle Nurturer finds hard to navigate — the parent may want to be more consistent than the family system allows, or feel relieved by external limit-setting in ways that create complexity for the child',
      'Marriage-family honor expectations can create pressure on the Gentle Nurturer to hold harder lines around family loyalty and reputation than their natural style supports',
      'The self-sacrifice dimension of the caregiving role is amplified in joint-family contexts, where the Gentle Nurturer\'s natural tendency to prioritize others\' wellbeing over their own can be more total and less recoverable',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Gentle Nurturer is perhaps most culturally at home in Latin American familismo contexts, where emotional expressiveness, physical warmth, and relational closeness are not just accepted but celebrated. The archetype\'s defining warmth and attunement are culturally valued and legible — the Gentle Nurturer\'s way of being is recognized and honored within the familismo framework. The challenges around limits are still present, but they occur within a cultural environment that celebrates the warmth rather than questioning it.',
    strengthsInContext: [
      'Emotional expressiveness, physical warmth, and relational closeness are central cultural values — the Gentle Nurturer\'s natural style is not just tolerated but is the culturally celebrated expression of good parenting',
      'Simpatia norms align with the Gentle Nurturer\'s natural orientation toward harmony, warmth, and positive relational exchange — the parent feels culturally supported in their relational style',
      'Strong family cohesion values mean the Gentle Nurturer\'s investment in deep relational bonds is understood as the highest expression of family love',
    ],
    tensionsInContext: [
      'The strong cultural value of closeness and family cohesion can amplify the Gentle Nurturer\'s natural pull toward keeping children close, potentially adding cultural reinforcement to an already present autonomy-limiting tendency',
      'Familismo expectations can make it even harder for the Gentle Nurturer to hold difficult limits when doing so creates conflict or feels like it threatens family harmony',
      'Marianismo expectations (particularly for mothers) can intensify the self-sacrifice dimension of the Gentle Nurturer\'s natural orientation to the point of significant personal depletion',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Gentle Nurturer\'s warmth and attunement are amplified within a communal child-rearing framework where emotional generosity toward children is a shared community value. The child benefits from multiple warm caregiving adults, not just the Gentle Nurturer parent. Community expectations around elder respect and collective discipline may provide the structural limits that the Gentle Nurturer naturally avoids, creating a complementary system.',
    strengthsInContext: [
      'The communal warmth framework means the Gentle Nurturer\'s natural style is embedded within a wider culture of emotional generosity toward children — their attunement is part of a broader system of care',
      'Community structures and elder authority often provide the limit-setting that the Gentle Nurturer finds difficult, allowing the parent to focus on the relational warmth that is their natural strength',
      'The integration of spiritual and community identity provides grounding for the Gentle Nurturer\'s relational investment — love and care are embedded in a meaning-making framework beyond the individual family',
    ],
    tensionsInContext: [
      'Community discipline norms can be harsher than the Gentle Nurturer\'s natural style — the parent may find themselves navigating between their own gentle approach and community expectations around firmer boundaries',
      'The communal framework can make it difficult for the Gentle Nurturer to create the consistent individual attunement they value, when caregiving is distributed across multiple adults with different approaches',
      'Strong elder respect norms may create tension when the Gentle Nurturer\'s inclination to honor the child\'s experience and voice conflicts with cultural expectations of deference to adults',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'In Western individualist contexts, the Gentle Nurturer archetype has significant cultural support from attachment parenting movements, gentle parenting communities, and child-centered educational philosophies. Their warmth and emotional attunement are explicitly valued in contemporary Western parenting discourse. The limit-setting challenges they face are also well-recognized in this context, and there is substantial cultural and therapeutic support for navigating the warmth-structure balance.',
    strengthsInContext: [
      'Emotional attunement and explicit emotional vocabulary are culturally reinforced — the Gentle Nurturer\'s natural style is supported by a significant strand of Western parenting culture',
      'Child-centered educational and therapeutic frameworks provide language and community for the Gentle Nurturer\'s orientation',
    ],
    tensionsInContext: [
      'The Western cultural discourse around "gentle parenting" can sometimes reinforce the Gentle Nurturer\'s natural avoidance of limits under the banner of respecting the child\'s autonomy — the cultural permission to avoid structure can amplify the watchout',
      'Individualist frameworks emphasizing the parent-child dyad may reduce the community support structures that in other cultural contexts provide complementary limit-setting for the Gentle Nurturer\'s style',
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
      'The Intentional Guide in East Asian collectivist contexts operates with a particular kind of deliberateness — their conscious, growth-oriented approach to parenting is present, but it may be expressed through careful management of educational opportunity and social network rather than through emotional process exploration. The intentionality is real; its channel is the external domain of preparation and achievement rather than the internal domain of emotional development.',
    strengthsInContext: [
      'The growth-orientation of the Intentional Guide aligns naturally with the high investment in the child\'s development that characterizes many East Asian parenting contexts — the deliberate scaffolding of capability is culturally recognized and honored',
      'The capacity to pause and choose rather than react is particularly valuable in high-pressure academic environments where parental anxiety can easily transmit to children — the Intentional Guide\'s regulated responsiveness provides a calming influence',
      'The intellectual framework for understanding the child\'s development allows the Intentional Guide to navigate between cultural expectations and evidence-based developmental research in a way that other archetypes may find harder',
    ],
    tensionsInContext: [
      'The strong emphasis on academic achievement in many East Asian contexts may pull the Intentional Guide\'s scaffolding orientation toward competence-development at the expense of emotional development, narrowing what "intentional parenting" means in practice',
      'Emotional restraint norms can make it harder for the Intentional Guide to model the emotional process exploration that is central to their framework — the cultural context may not create space for the kind of reflective emotional sharing they value',
      'Collective identity expectations can create tension with the Intentional Guide\'s deep commitment to the child\'s individual autonomy and self-determination — the culture may pressure toward conformity in ways the Intentional Guide resists',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Intentional Guide faces the particular challenge of maintaining their deliberate, conscious approach within a family system where decisions are shared and authority is diffuse. Their intentionality is real but must operate within a broader relational web — they cannot always parent "on purpose" when family pressures, elder expectations, and household dynamics shape the context in ways that are not always under their control.',
    strengthsInContext: [
      'The Intentional Guide\'s capacity to hold multiple perspectives simultaneously is particularly valuable in joint-family contexts where diverse needs, generations, and worldviews must be navigated — their reflective orientation supports productive family negotiation',
      'Conscious attention to intergenerational patterns is culturally resonant in contexts where family history is explicitly valued and discussed — the Intentional Guide\'s interest in understanding where patterns come from aligns with this',
      'The moderate warmth and structured autonomy support of the Intentional Guide provides a developmental bridge for children navigating between traditional family expectations and more individualistic identities in their peer environments',
    ],
    tensionsInContext: [
      'Deliberate parenting requires a degree of individual authority that joint-family contexts may not fully support — the Intentional Guide may find their carefully considered approach overridden by extended family members who do not share their framework',
      'The marriage-family honor dimension can create pressure to prioritize conformity over the child\'s individual development path — the Intentional Guide\'s commitment to the child\'s authentic self-direction can be a source of family conflict',
      'The intellectual framework for parenting may not translate smoothly across generational lines in joint-family contexts, creating isolation for the Intentional Guide who may feel their approach is not understood or respected by extended family',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Intentional Guide in Latin American familismo contexts may find that their deliberate, growth-oriented approach is somewhat at odds with the spontaneous relational warmth and emotional expressiveness that characterizes familismo culture. Their intentionality is respected, but the more intellectualized quality of their care can occasionally feel slightly cooler or more distant than the warm, expressive relational norm — not a rejection, but a different register.',
    strengthsInContext: [
      'The Intentional Guide\'s genuine respect for the child\'s individual journey resonates with the strong personal dignity values within Latin American culture — each child\'s path is taken seriously and honored',
      'Deliberate investment in the child\'s development is recognized as a form of deep care within familismo frameworks — the conscious preparation of the child for the world is understood as love expressed through foresight',
      'The Intentional Guide\'s capacity to hold limits clearly while maintaining warmth aligns with respeto — the child understands the authority as grounded in genuine care and investment in their wellbeing',
    ],
    tensionsInContext: [
      'The emotional spontaneity and warmth expressiveness that is natural in familismo contexts may feel harder for the Intentional Guide — their more measured relational style can be read as insufficient warmth in a high-warmth cultural context',
      'Strong family cohesion expectations may create tension with the Intentional Guide\'s deep commitment to the child\'s individual autonomy — family loyalty and individual self-direction can come into conflict in ways that require ongoing navigation',
      'Simpatia norms around harmonious interaction can make it harder for the Intentional Guide to hold the honest, direct feedback conversations that are central to their approach when those conversations create temporary disharmony',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Intentional Guide\'s reflective, individual-focused approach to parenting sits within a communal framework where child-rearing is explicitly shared and child development is a community project. Their intentionality is still present but is embedded in a web of community wisdom and elder guidance — the "intentional" element is one voice among many rather than the defining framework.',
    strengthsInContext: [
      'The Intentional Guide\'s capacity for reflective practice and deliberate choice-making is a strong resource in complex community contexts where multiple influences shape the child\'s development',
      'The growth orientation aligns with community investments in the child\'s education, apprenticeship, and preparation for adult roles within the community',
      'The Intentional Guide\'s low protective instinct and trust in the child\'s process supports coming-of-age practices and community integration rituals that require the child to demonstrate independence and capability',
    ],
    tensionsInContext: [
      'Communal child-rearing norms may not always align with the Intentional Guide\'s carefully considered individual approach — community wisdom and elder guidance may pull in different directions, creating navigational complexity',
      'The intellectual framework for understanding the child\'s development may not be easily shared with community members and extended family who operate from traditional and experiential knowledge rather than evidence-based parenting frameworks',
      'Strong elder respect norms can create tension with the Intentional Guide\'s emphasis on honoring the child\'s authentic voice and self-direction — the cultural expectation of deference to adults may be in structural tension with the archetype\'s core values',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'The Intentional Guide is perhaps most culturally at home in Western individualist contexts, where conscious parenting frameworks, therapeutic language, growth mindset culture, and evidence-based parenting resources are widely available and highly valued. The archetype\'s deliberate, reflective approach is strongly supported by a cultural ecosystem of books, podcasts, therapists, and communities that share this orientation.',
    strengthsInContext: [
      'The Intentional Guide\'s approach is explicitly supported and celebrated within contemporary Western parenting discourse — the language of conscious parenting, secure attachment, and growth mindset is mainstream',
      'Access to therapeutic, educational, and community resources supports the Intentional Guide\'s reflective practice and provides frameworks for understanding and developing their approach',
    ],
    tensionsInContext: [
      'The abundance of parenting frameworks and resources in Western contexts can amplify the Intentional Guide\'s perfectionism — there is always another approach to learn, another way to be more intentional, another expert to consult',
      'The cultural individualism of Western contexts can mean the Intentional Guide does not have access to the communal child-rearing support structures that might naturally complement their reflective individual approach',
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
      'The Resilient Striver in East Asian collectivist contexts often carries a particular kind of intergenerational healing narrative — breaking cycles of emotional suppression, academic pressure as love, or punitive discipline — while operating within a cultural context that still values many of those same norms. Their work involves not just integrating their personal history but navigating the ongoing tension between the culture they came from and the parent they have chosen to become.',
    strengthsInContext: [
      'The Resilient Striver\'s hard-won emotional integration provides a bridge between their parents\' cultural framework and their children\'s more emotionally expressive developmental needs — they understand both worlds from the inside',
      'The capacity to honor cultural traditions selectively — keeping what is valuable, releasing what is harmful — is a sophisticated form of cultural navigation that serves children who are also doing this work',
      'The achievement orientation that is culturally normative provides a shared framework with extended family while the Resilient Striver pursues a different quality of relationship within that framework',
    ],
    tensionsInContext: [
      'The work of breaking intergenerational patterns is more complex when the surrounding culture actively reinforces those patterns — the Resilient Striver may experience their healing work as countercultural within their own family and community',
      'Extended family members may interpret the Resilient Striver\'s different approach as rejection of cultural values or family loyalty rather than as growth — creating relational friction around parenting choices',
      'The watchout around identity fusion with the healing narrative is amplified when cultural context actively reinforces the patterns being broken — the Resilient Striver may find the work of staying present harder when the past is constantly being re-invited',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Resilient Striver\'s pattern-breaking work occurs within a family system that may actively resist change. Breaking intergenerational cycles in a joint-family context requires not just personal integration but ongoing navigation of a living family system that operates according to the old rules — the Resilient Striver parents differently not just from memory but in real-time negotiation with parents, in-laws, and extended family who are present and involved.',
    strengthsInContext: [
      'The Resilient Striver\'s hard-won emotional wisdom is a valuable resource in complex extended-family dynamics where understanding the roots of family patterns provides insight into how to navigate them productively',
      'The integration of their own narrative gives the Resilient Striver a particular capacity for empathy with extended family members who are themselves operating from unexamined histories — they can see the human being inside the difficult behavior',
      'Pattern-breaking within a joint-family context, when it works, benefits the entire extended family system — the Resilient Striver\'s growth ripples outward in ways that single-family pattern-breaking does not',
    ],
    tensionsInContext: [
      'The joint-family context means that breaking patterns must happen while living alongside the people who established them — the work is significantly more demanding than in nuclear family contexts where more distance is possible',
      'Marriage-family honor dynamics can make the Resilient Striver\'s openness about their healing journey feel threatening or shameful to family members who value emotional privacy and family reputation management',
      'The scale of what must be navigated — intergenerational patterns, current family dynamics, cultural expectations, and their own children\'s needs — can intensify the weight-of-responsibility watchout significantly',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Resilient Striver in Latin American familismo contexts may find that their healing narrative resonates deeply within a cultural framework that tells stories of family hardship, survival, and cross-generational sacrifice. The theme of "we struggled so you wouldn\'t have to" is culturally familiar — the Resilient Striver\'s version adds: "and I also did the work to make sure I would parent from strength rather than from the pain."',
    strengthsInContext: [
      'The Resilient Striver\'s narrative of transformation resonates with cultural stories of family resilience, sacrifice, and cross-generational aspiration that are deeply honored within familismo frameworks',
      'The emotional expressiveness that is culturally normative in Latin American contexts provides a natural channel for the Resilient Striver\'s integration work — there are cultural frameworks for talking about family history, pain, and growth',
      'The strong communal identity of familismo means that the Resilient Striver\'s pattern-breaking is embedded in a web of relationships that, when they are supportive, provide significant holding for the work',
    ],
    tensionsInContext: [
      'The cultural emphasis on family loyalty and cohesion can make it harder for the Resilient Striver to name or challenge the family patterns they are breaking — criticism of the family can feel like betrayal within familismo frameworks',
      'The self-sacrifice dimension of Latin American parenting ideals can amplify the weight-of-responsibility watchout — the Resilient Striver may carry additional cultural pressure to be both the healed parent and the perfect family anchor',
      'The warmth and expressiveness of familismo culture can occasionally pull the Resilient Striver into the very emotional intensity that their healing work has tried to integrate — the cultural temperature can be activating in ways that require ongoing awareness',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Resilient Striver\'s pattern-breaking work is embedded in a communal narrative framework. The idea of healing across generations has deep roots in many African spiritual and community traditions — the concept of ancestral healing, of becoming the answer to prayers of previous generations, resonates with the Resilient Striver\'s fundamental orientation. Their individual healing work is also, in some frameworks, community and ancestral work.',
    strengthsInContext: [
      'The spiritual and communal frameworks for intergenerational healing provide rich cultural support for the Resilient Striver\'s work — their journey of integration can be understood and honored within traditions that value ancestral healing',
      'The community structure provides multiple sources of wisdom and support for the Resilient Striver — elders, spiritual leaders, and community members may recognize and support their pattern-breaking work in ways that are deeply sustaining',
      'The Resilient Striver\'s earned wisdom and hard-won growth is deeply honored in contexts that value the elder role — as they mature, their journey becomes a community resource',
    ],
    tensionsInContext: [
      'Community and elder expectations may not always support the specific patterns the Resilient Striver is breaking — traditional practices that the Resilient Striver has identified as harmful may be deeply valued by the community, creating isolation',
      'The watchout around identity fusion with the healing narrative can be amplified when that narrative has a communal and spiritual dimension — the Resilient Striver may find themselves carrying both personal and ancestral healing weight',
      'The communal child-rearing context means that the Resilient Striver\'s changed approach reaches only part of the child\'s caregiving environment — other adults in the child\'s life may maintain the old patterns despite the parent\'s work',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'The Resilient Striver is particularly well-supported in Western individualist contexts, which have a rich infrastructure of therapeutic resources, attachment frameworks, trauma-informed practice, and personal growth culture that directly serves their integration journey. The language of earned secure attachment, intergenerational healing, and breaking cycles is mainstream in Western therapeutic and parenting communities.',
    strengthsInContext: [
      'Therapeutic resources, attachment-informed parenting communities, and personal growth frameworks explicitly support the Resilient Striver\'s integration work — they are not alone in this journey',
      'The cultural value of individual growth and self-understanding aligns deeply with the Resilient Striver\'s fundamental orientation — their work is culturally legible and honored',
    ],
    tensionsInContext: [
      'The cultural abundance of healing frameworks can amplify the identity fusion watchout — there is always another layer of healing to do, another framework to integrate, which can keep the Resilient Striver oriented toward their history rather than their present',
      'The individualist framing of healing can make it feel like a solo project when many of the patterns being broken are family and systemic — the absence of communal healing frameworks can make the work feel lonelier than it needs to be',
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
      'The Structured Mentor in East Asian collectivist contexts finds significant cultural alignment — high expectations, rigorous preparation, and love expressed through investment in the child\'s competence are deeply culturally valued. The archetype\'s characteristic emotional restraint is also culturally normative — warmth expressed through sacrifice and provision rather than verbal affirmation is the cultural standard, not a departure from it. The Structured Mentor in this context may feel more culturally supported than in Western individualist contexts.',
    strengthsInContext: [
      'The high-expectations, competence-oriented approach is deeply culturally valued — the Structured Mentor\'s natural orientation aligns with educational and family achievement norms that are explicitly honored in East Asian collectivist contexts',
      'Emotional restraint as a sign of dignity and respect means the Structured Mentor\'s naturally lower affective warmth expression is not read as cold or withholding — it fits the cultural register of respectful parental care',
      'The investment in preparation and capability-building resonates with collective expectations around the child\'s contribution to family and community — the Structured Mentor is building a capable member of the collective',
    ],
    tensionsInContext: [
      'The cultural amplification of achievement pressure can intensify the Structured Mentor\'s already achievement-focused orientation — the watchout around emotional attunement as a gap is more pronounced in contexts that further deprioritize emotional development in favor of performance',
      'The collective dimension of achievement means the Structured Mentor\'s expectations may extend beyond the individual child to include family honor and reputation — adding a burden of collective responsibility to individual performance',
      'Emotional suppression is more total in cultural contexts where it is normative as well as natural to the archetype — the child may have fewer channels for expressing emotional needs, and the parent may have fewer cultural prompts to notice',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Structured Mentor\'s high expectations and competence orientation align with intergenerational investment in the child\'s achievement, education, and social standing. The extended family context provides additional sources of demanding expectation and high standards — the Structured Mentor operates within a family system where their achievement orientation is reinforced rather than moderated.',
    strengthsInContext: [
      'High expectations and investment in the child\'s educational and professional future are deeply valued across extended family systems in South Asian contexts — the Structured Mentor\'s orientation resonates with intergenerational ambitions for the child',
      'The practical provision orientation of the Structured Mentor — organizing resources, creating opportunities, preparing the child — aligns with joint-family investments in the child\'s future as a shared family project',
      'Clear authority and structure within the family hierarchy is culturally supported — the Structured Mentor\'s high expectations carry the weight of intergenerational expectation as well as individual parental ambition',
    ],
    tensionsInContext: [
      'The joint-family context may add additional layers of expectation that even the Structured Mentor finds hard to navigate — multiple adults\' high standards converging on a single child can create an intensely pressured environment',
      'The emotional attunement gap is amplified in joint-family contexts where emotional privacy is low and the child\'s distress may be managed collectively through expectation rather than individually through attunement',
      'Diffuse authority means the Structured Mentor may not have full control over the standards and expectations placed on their child — other family members may set different expectations that create inconsistency',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Structured Mentor in Latin American familismo contexts faces a particular cultural tension: their naturally lower emotional expressiveness and higher achievement orientation may not fit comfortably within a cultural framework that centers warmth, relational closeness, and expressive care. The Structured Mentor\'s love is real but it is expressed in a register that may feel somewhat foreign in a cultural context where warmth is expected to be more visible and felt.',
    strengthsInContext: [
      'High investment in the child\'s preparation and future is recognized as a form of deep parental care within familismo frameworks — the Structured Mentor\'s commitment to their child\'s competence and capability is understood as love',
      'The clear expectations and consistent structure of the Structured Mentor provide a stable framework within potentially emotionally dynamic family environments — a grounding presence that is valued even if its style is less warm',
      'Respeto norms align with the Structured Mentor\'s high expectations and structured authority — the child understands the demands as coming from a place of genuine investment in their development',
    ],
    tensionsInContext: [
      'The Structured Mentor\'s lower affective warmth expression is more conspicuous in cultural contexts where warmth is highly expected and visible — the gap between the parent\'s care and its legibility may be wider in Latin American contexts',
      'Familismo values of closeness and emotional connection can create external pressure on the Structured Mentor to express warmth in ways that feel foreign or effortful',
      'The communal expressiveness of Latin American family culture can amplify the Structured Mentor\'s experience of being somewhat out of register — their natural style may feel more isolated in a culturally warm environment',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Structured Mentor\'s high expectations and competence orientation align with community investments in the child\'s capability to contribute and thrive within the community. Education, practical skills, and the ability to fulfill community roles are highly valued — the Structured Mentor\'s orientation toward building capable people maps onto this framework. The communal structure may also provide the relational warmth that the Structured Mentor naturally expresses less of.',
    strengthsInContext: [
      'Investment in the child\'s capability, education, and preparation for adult roles within the community is highly valued — the Structured Mentor\'s orientation resonates with community aspirations for the child\'s development',
      'The communal framework naturally provides relational warmth and connection that complements the Structured Mentor\'s practical investment in the child\'s competence — the community fills some of the affective warmth gap',
      'Elder respect norms align with the Structured Mentor\'s high expectations and clear authority — the demanding parent is understood within a framework of elders who demand growth from the young as an expression of belief in their potential',
    ],
    tensionsInContext: [
      'Communal child-rearing means the Structured Mentor\'s achievement orientation is one among several influences — if other caregivers provide high warmth alongside lower structure, the child may experience inconsistency in the demands placed on them',
      'Communal warmth can make the Structured Mentor\'s emotional reserve more visible by contrast — within a warm community context, the low-warmth parent may stand out as unusually distant',
      'Spiritual and religious frameworks for child development may emphasize the child\'s character, spiritual growth, and community belonging in ways that partly reframe what "capable" means — the Structured Mentor may need to expand their definition',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'The Structured Mentor in Western individualist contexts may face the most cultural friction of any archetype in this context. Contemporary Western parenting discourse strongly emphasizes emotional attunement, validation of feelings, and child-centered development — all areas where the Structured Mentor naturally scores lower. Their approach may be perceived as cold, demanding, or insufficiently emotionally supportive against the backdrop of dominant gentle parenting and attachment parenting cultures.',
    strengthsInContext: [
      'The achievement orientation and high expectations of the Structured Mentor produce genuinely valued outcomes — competence, self-reliance, resilience — that are recognized and valued in Western educational and professional contexts',
      'The low protective instinct and high autonomy support creates genuine space for the child\'s independent development that is culturally valued in individualist contexts',
    ],
    tensionsInContext: [
      'Contemporary Western parenting culture heavily emphasizes emotional attunement and warmth expression in ways that position the Structured Mentor\'s natural style as a deficit rather than a different register of care — the parent may receive significant social feedback that their approach is insufficient',
      'Therapeutic frameworks commonly available in Western contexts may interpret the Structured Mentor\'s emotional restraint through a pathologizing lens rather than understanding it as a coherent approach to care',
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
      'The Open-Hearted Learner in East Asian collectivist contexts carries a particular complexity: their deep emotional attunement and heart-led parenting style may not be easily expressed within cultural norms of emotional restraint. Their warmth and genuine care for the child\'s inner world are present, but may be partially suppressed or re-routed through more culturally acceptable channels — academic support, provision, and practical care — while the emotional dimension remains less visible.',
    strengthsInContext: [
      'The Open-Hearted Learner\'s genuine attunement to the child\'s inner experience means they notice when the child is struggling with the pressures of high-achievement contexts — they provide emotional ballast that is particularly needed in demanding educational environments',
      'Their growth orientation and openness to learning resonate with cultural values around self-improvement and development, even if the domain of growth (emotional rather than academic) is less culturally familiar',
      'The warmth and care that the Open-Hearted Learner brings to the relationship provide a counterbalance to high-achievement pressure that children in these contexts may deeply need',
    ],
    tensionsInContext: [
      'Cultural norms of emotional restraint create an external pressure to suppress the very emotional expressiveness that is the Open-Hearted Learner\'s natural mode — the parent may find themselves torn between their natural attunement and the expectation that adults do not show or invite emotional display',
      'The lower narrative coherence of the Open-Hearted Learner may be amplified in contexts where intergenerational patterns are strongly reproduced and the cultural framework provides fewer resources for individual reflection and emotional integration work',
      'The mild-to-moderate protective instinct of the Open-Hearted Learner, in contexts where academic and social vigilance is high, may intensify in ways that further constrain the child\'s developing autonomy',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Open-Hearted Learner\'s emotional generosity and genuine attunement to the child create a warm anchor within complex extended-family dynamics. However, the still-integrating quality of their own narrative may mean that the joint-family context — with its constant triggering of intergenerational patterns — is particularly activating for this archetype. The family system is alive with the very dynamics the Open-Hearted Learner is still working to understand.',
    strengthsInContext: [
      'The Open-Hearted Learner\'s deep emotional availability is a significant resource in joint-family contexts where the child must navigate multiple adult relationships — the child always has one adult who receives them fully and without agenda',
      'Their genuine curiosity about their own growth aligns with the intergenerational depth of South Asian family culture — they are naturally interested in understanding where family patterns come from and how they move through generations',
      'The warmth and emotional generosity of the Open-Hearted Learner contribute to family cohesion in ways that are deeply valued within familismo-adjacent and joint-family frameworks',
    ],
    tensionsInContext: [
      'The joint-family context is likely to be activating for the Open-Hearted Learner in specific ways — the very dynamics they are still integrating are living and present in their daily environment, making the work of staying grounded harder',
      'Multiple adults with different emotional styles means the Open-Hearted Learner\'s attuned approach may be inconsistently mirrored or even undermined by other family members whose approaches activate the old patterns',
      'The marriage-family honor dimension can create pressure on the Open-Hearted Learner to suppress the very emotional openness that is their strength — the cultural expectation of emotional privacy can constrain their natural mode',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Open-Hearted Learner is perhaps most naturally at home in Latin American familismo contexts, where emotional expressiveness, warmth, and relational closeness are central cultural values. Their heart-led, emotionally attuned parenting style fits the cultural register — the warmth and care they bring to the relationship is culturally legible, celebrated, and reinforced. The cultural environment provides both permission and encouragement for the Open-Hearted Learner\'s natural emotional generosity.',
    strengthsInContext: [
      'Emotional expressiveness and relational warmth are central cultural values — the Open-Hearted Learner\'s natural style is not just accepted but is the culturally celebrated expression of engaged parenting',
      'The communal emotional support of familismo culture can help hold the Open-Hearted Learner through their ongoing integration work — they are not alone in navigating emotional complexity and family history',
      'The cultural storytelling tradition around family history and intergenerational experience provides a natural channel for the Open-Hearted Learner\'s interest in understanding where they come from',
    ],
    tensionsInContext: [
      'The high emotional temperature of Latin American family culture can amplify the Open-Hearted Learner\'s emotional absorption tendency — the cultural norm of intense emotional engagement can reinforce the already-present risk of empathy becoming merger',
      'The strong cultural pressure toward family cohesion and loyalty can make it harder for the Open-Hearted Learner to create the individual reflective space they need for their ongoing integration work',
      'Marianismo expectations can amplify the self-sacrifice and emotional absorption dimensions of the Open-Hearted Learner\'s natural style in ways that intensify depletion risk',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Open-Hearted Learner\'s emotional generosity and growth orientation find resonance within communal frameworks that value emotional investment in children and honor personal development journeys. The communal structure may provide both additional emotional support for the parent and complementary sources of structure for the child that the Open-Hearted Learner\'s more permissive style doesn\'t always provide.',
    strengthsInContext: [
      'The Open-Hearted Learner\'s genuine warmth and emotional attunement align with communal values of generous care for children — their natural style is embedded within a wider culture of emotional investment in the child\'s wellbeing',
      'Community structures may provide the consistent limits and elder guidance that the Open-Hearted Learner finds less natural — creating a complementary system where the parent\'s warmth is balanced by community structure',
      'Spiritual and communal frameworks for personal growth provide meaningful context for the Open-Hearted Learner\'s integration journey — their work is understood within a broader framework of human development and ancestral healing',
    ],
    tensionsInContext: [
      'The Open-Hearted Learner\'s less-integrated narrative may be activated by community and elder dynamics that echo unresolved family patterns — the communal environment can be as triggering as it is supportive',
      'Community expectations around parental authority and discipline may be in tension with the Open-Hearted Learner\'s more emotionally permissive style — the parent may experience pressure to hold firmer lines than feels natural',
      'The communal context means that the Open-Hearted Learner\'s ongoing integration work is less private — family and community members may notice and comment on the parent\'s emotional variability in ways that create additional complexity',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'The Open-Hearted Learner in Western individualist contexts has significant cultural support from attachment parenting communities, gentle parenting frameworks, personal growth culture, and therapeutic resources. Their emotional attunement and growth orientation are culturally celebrated, and their ongoing integration work has a rich infrastructure of support. The watchouts around emotional absorption and boundary inconsistency are well-recognized in therapeutic and parenting communities.',
    strengthsInContext: [
      'The Open-Hearted Learner\'s emotional attunement and genuine commitment to their own growth are explicitly valued and supported within contemporary Western parenting culture',
      'Access to therapeutic resources, attachment-informed parenting communities, and personal development frameworks directly supports the Open-Hearted Learner\'s ongoing integration work',
    ],
    tensionsInContext: [
      'The cultural celebration of emotional openness and the abundance of healing frameworks can sometimes reinforce the Open-Hearted Learner\'s tendency to treat parenting as primarily a healing and growth experience rather than grounding it in the child\'s present needs',
      'Western individualism can amplify the isolation of the integration journey — the Open-Hearted Learner may be working through complex patterns without the communal support structures that would naturally be present in more collective cultural contexts',
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
      'The Devoted Champion in East Asian collectivist contexts finds strong cultural alignment — the deep investment in the child\'s success, the willingness to sacrifice personally for outcomes, and the high expectations all resonate with culturally normative parenting. The conditional quality of warmth may be less visible because conditional approval is a culturally shared pattern rather than an individual departure. The champion\'s intensity is culturally supported but may intensify the achievement-contingency of acceptance.',
    strengthsInContext: [
      'The deep personal investment in the child\'s outcomes aligns with cultural values of parental sacrifice and devotion to the family\'s educational and social standing — the Devoted Champion\'s intensity is culturally legible as love',
      'High expectations combined with active support map onto the culturally honored pattern of parents who move mountains for their children\'s success — tutoring, resource provision, and environmental management',
      'The fierce loyalty and protective advocacy for the child within institutional settings (schools, programs) is a valued parental role in contexts where parents are expected to actively manage their child\'s trajectory',
    ],
    tensionsInContext: [
      'The cultural amplification of achievement-based approval can intensify the Devoted Champion\'s conditional warmth pattern — the child may experience an environment where love and worth are even more tightly coupled to performance',
      'The collective reputation dimension means the Devoted Champion is championing not just the child but the family\'s standing, adding layers of pressure that extend beyond the parent-child relationship',
      'Emotional restraint norms may make it harder for the Devoted Champion to express the unconditional dimension of their love, leaving the conditional dimension more visible by default',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Devoted Champion\'s fierce advocacy for their child operates within a complex extended family system. Their championing instinct may manifest as protecting the child from family criticism, fighting for the child\'s interests within intergenerational negotiations, and ensuring the child receives the best opportunities the family can provide. The conditional warmth pattern is amplified by family honor dynamics — the child\'s achievements reflect on the entire family.',
    strengthsInContext: [
      'The Devoted Champion\'s advocacy role is amplified in joint-family contexts where the child\'s interests must be actively defended within a complex system of competing family needs and expectations',
      'Deep personal sacrifice for the child\'s future is culturally honored and recognized — the Devoted Champion\'s willingness to subordinate personal needs to the child\'s outcomes is understood as the highest form of parental duty',
      'The practical investment in the child\'s education, social connections, and marriage prospects aligns with extended family expectations and strengthens the parent\'s standing within the family hierarchy',
    ],
    tensionsInContext: [
      'The joint-family system can both support and distort the championing instinct — the Devoted Champion may find themselves fighting for the child against family expectations while simultaneously using family expectations as a motivational tool',
      'Marriage-family honor dynamics add an additional layer of conditional acceptance — the child\'s worth within the family system may be explicitly linked to achievements, matches, and social standing',
      'The Devoted Champion\'s intense investment can be exploited by the extended family system — their willingness to sacrifice may be expected rather than appreciated, leading to depletion',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Devoted Champion in Latin American familismo contexts brings their fierce advocacy into a cultural environment that celebrates passionate parental devotion. The intensity of their love and investment is culturally legible and honored. However, the conditional quality of their warmth may be more visible in a context where unconditional emotional expressiveness is the cultural norm — the moments when warmth withdraws may be more conspicuous against a culturally warm backdrop.',
    strengthsInContext: [
      'The passionate, all-in quality of the Devoted Champion\'s love aligns with familismo values of deep family devotion and the parent as the child\'s fiercest advocate and supporter',
      'The willingness to sacrifice personally for the child\'s future resonates with cultural narratives of parental sacrifice that are central to family identity in many Latin American contexts',
      'The champion\'s protective advocacy — ensuring the child receives opportunities, fighting institutional barriers, opening doors — is a recognized and honored parental role',
    ],
    tensionsInContext: [
      'In a cultural context where warmth is expected to be unconditional and freely given, the Devoted Champion\'s conditional warmth pattern may create more visible strain — the child may notice the warmth fluctuations more sharply against a culturally warm backdrop',
      'Marianismo expectations can intensify the sacrifice dimension to the point of total self-effacement — the cultural ideal of the all-giving parent amplifies the Devoted Champion\'s tendency to subordinate their own wellbeing',
      'The familismo value of unconditional family loyalty may conflict with the Devoted Champion\'s implicit message that love has conditions — creating internal tension for both parent and child',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Devoted Champion\'s fierce investment in their child\'s success takes on a communal dimension — championing the child is also championing the family\'s future contribution to the community. The parent\'s intense advocacy is embedded in a network of community expectations about the child\'s potential and the family\'s investment in realizing it. Spiritual frameworks may add a sense of calling or destiny to the championing instinct.',
    strengthsInContext: [
      'The Devoted Champion\'s intense parental investment is embedded within communal aspirations for the child — the parent\'s advocacy is understood as contributing to the community\'s future, not just the individual child\'s success',
      'Community and elder structures recognize and support the championing parent — the parent who fights for their child\'s opportunities is honoring their role within the intergenerational community structure',
      'Spiritual frameworks for the child\'s potential and calling can provide a meaningful context for the Devoted Champion\'s intensity — their investment feels purposeful rather than merely anxious',
    ],
    tensionsInContext: [
      'Communal child-rearing means the Devoted Champion\'s intense focus on their own child may be in tension with the expectation of more evenly distributed care across the community\'s children',
      'The conditional warmth pattern may be amplified by communal expectations — the child represents not just the parent\'s investment but the community\'s aspirations, adding layers of performance pressure',
      'The champion\'s advocacy for individual achievement may occasionally be in tension with communal values that prioritize collective contribution over individual distinction',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'The Devoted Champion in Western individualist contexts may encounter cultural tension from two directions: their intense investment in the child\'s outcomes aligns with achievement culture, but their conditional warmth pattern conflicts with dominant gentle parenting and unconditional positive regard frameworks. They may receive cultural messaging that celebrates their advocacy while questioning their emotional approach.',
    strengthsInContext: [
      'The intense investment in the child\'s development and success is culturally valued — the parent who actively champions their child\'s interests, opportunities, and outcomes is recognized and appreciated',
      'The advocacy dimension — fighting for the child in institutional settings, removing barriers, creating opportunities — aligns with Western values of parental agency and individual empowerment',
    ],
    tensionsInContext: [
      'Contemporary Western parenting discourse around unconditional positive regard and separating behavior from identity may create explicit cultural friction with the Devoted Champion\'s conditional warmth pattern — the parent may receive direct feedback that their approach is harmful even when their intentions are genuine',
      'The therapeutic culture of Western contexts may pathologize the Devoted Champion\'s conditional acceptance as a form of emotional manipulation rather than understanding it as a genuine but flawed expression of deep investment',
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
      'The Collaborative Ally in East Asian collectivist contexts faces a particular challenge: their democratic, egalitarian approach to the parent-child relationship sits in tension with hierarchical family structures and strong deference-to-elders norms. Their genuine belief in shared power and the child\'s right to influence decisions may be read as a lack of appropriate authority within cultural contexts that value clear generational hierarchy.',
    strengthsInContext: [
      'The Collaborative Ally\'s genuine respect for the child\'s perspective can serve as a modernizing bridge within changing cultural contexts where younger generations increasingly value individual voice and agency',
      'The cooperative problem-solving approach creates a strong relational foundation that supports the child through the stress of high-achievement educational systems without adding parental pressure on top',
      'The nonjudgmental acceptance that characterizes the Collaborative Ally provides a rare emotional safe harbor in contexts where approval can be tightly tied to performance',
    ],
    tensionsInContext: [
      'The egalitarian orientation can be read as a failure of proper parental authority within cultural contexts that value hierarchical family structure — extended family and community may perceive the Collaborative Ally as too permissive or insufficiently serious about the parental role',
      'The democratic decision-making style may create confusion for the child when other adults in their life (teachers, grandparents, extended family) operate from an authority-based model',
      'The collaborative approach may undermine the child\'s ability to navigate authority structures that remain hierarchical in the broader society — school, work, and institutional settings',
    ],
  },
  {
    culturalContext: CTX_SOUTH_ASIAN,
    expressionModifier:
      'In South Asian joint-family contexts, the Collaborative Ally\'s cooperative, democratic approach to parenting is tested by the multi-layered authority structure of the extended family. Their belief in shared power with the child may be in direct tension with intergenerational authority expectations — the parent who treats their child as a partner may be seen as undermining the family hierarchy that extends from grandparents through parents to children.',
    strengthsInContext: [
      'The Collaborative Ally\'s deep acceptance and nonjudgmental stance provides a uniquely safe emotional space for children navigating the complex expectations of joint-family life',
      'The cooperative approach models a different kind of relationship that children may find valuable as they develop their own identity within and sometimes distinct from the family system',
      'The high reciprocity orientation can actually strengthen the parent\'s relationship with the child in ways that increase the parent\'s influence through trust rather than authority — a valuable asset when the child reaches adolescence',
    ],
    tensionsInContext: [
      'The democratic orientation may create active family conflict — elder family members may view the Collaborative Ally\'s approach as disrespectful to family hierarchy and may intervene to impose traditional authority over the child',
      'The child may be confused by receiving democratic treatment from one parent while experiencing hierarchical authority from grandparents and extended family, creating a split in their understanding of how relationships work',
      'The cultural expectation of parental sacrifice and total devotion may frame the Collaborative Ally\'s egalitarian stance as insufficient care — "real parents" make decisions for their children rather than with them',
    ],
  },
  {
    culturalContext: CTX_LATIN_AMERICAN,
    expressionModifier:
      'The Collaborative Ally in Latin American familismo contexts brings their cooperative orientation into a cultural environment that values warm, close family relationships but typically within a more defined authority structure. Their nonjudgmental acceptance aligns with the emotional warmth of familismo, but their democratic approach to decision-making may feel unfamiliar in contexts where respeto includes clear parental authority.',
    strengthsInContext: [
      'The deep emotional warmth and unconditional acceptance of the Collaborative Ally resonate strongly with familismo values — the quality of the relational connection is culturally celebrated',
      'The cooperative approach can be framed within familismo as deep respect for the child as a full member of the family rather than a subordinate within it — this framing makes the democratic orientation more culturally legible',
      'The nonjudgmental stance provides an important emotional resource in cultural contexts where family expectations around conformity and loyalty can create significant internal pressure for children',
    ],
    tensionsInContext: [
      'Respeto norms that include deference to parental authority may be in tension with the Collaborative Ally\'s egalitarian orientation — the parent may need to navigate between their natural style and cultural expectations about appropriate family hierarchy',
      'Strong family cohesion values can make the democratic approach feel like it dilutes appropriate parental authority — extended family members may question the parent\'s capacity to "be in charge"',
      'The collaborative approach to discipline may be perceived as insufficient firmness in cultural contexts where clear parental authority is understood as the structure within which family warmth operates',
    ],
  },
  {
    culturalContext: CTX_SUB_SAHARAN,
    expressionModifier:
      'In Sub-Saharan African community-centred contexts, the Collaborative Ally\'s democratic, cooperative orientation sits within a communal framework that distributes both care and authority across multiple adults. Their egalitarian stance toward the child may be in tension with strong elder-respect norms and community-based authority structures, but their cooperative instincts can also align with communal decision-making traditions that value consensus.',
    strengthsInContext: [
      'The Collaborative Ally\'s cooperative orientation can align with communal decision-making traditions that value consensus and collective input — their democratic instincts are not entirely foreign to community-centred governance models',
      'The unconditional acceptance and nonjudgmental stance provide emotional safety within community contexts where children are subject to multiple adults\' expectations and potentially inconsistent authority',
      'The reciprocity orientation models a relational style that can strengthen community ties — the child learns to negotiate, consider others\' perspectives, and contribute to shared decisions, which are valued community skills',
    ],
    tensionsInContext: [
      'Strong elder-respect norms may position the Collaborative Ally\'s egalitarian approach to the child as a violation of the generational authority structure that community life depends on',
      'Communal discipline expectations may require more clearly defined parental authority than the Collaborative Ally naturally provides — community members may step in to impose structure when the parent\'s cooperative approach seems insufficient',
      'The democratic approach to the parent-child relationship may be hard to maintain when the broader community operates from authority-based models — the child receives conflicting signals about how power works in relationships',
    ],
  },
  {
    culturalContext: CTX_WESTERN,
    expressionModifier:
      'The Collaborative Ally is perhaps most culturally at home in Western individualist contexts, where democratic parenting, children\'s rights frameworks, and egalitarian family models are well-represented in parenting discourse. Their cooperative, nonjudgmental approach is supported by a significant strand of contemporary Western parenting culture, including collaborative problem-solving (Ross Greene), peaceful parenting, and democratic family meeting traditions.',
    strengthsInContext: [
      'The Collaborative Ally\'s approach is explicitly supported by multiple well-known Western parenting frameworks including collaborative problem-solving, nonviolent communication, and democratic family structures',
      'The egalitarian orientation aligns with broader Western cultural values of individual rights and agency, applied to the parent-child relationship in ways that are culturally legible and celebrated',
    ],
    tensionsInContext: [
      'The democratic orientation can sometimes be used to avoid the discomfort of being the authority when authority is genuinely needed — Western cultural support for egalitarian parenting can reinforce the Collaborative Ally\'s tendency to under-use their structural power',
      'The individualist framing may mean the Collaborative Ally does not have access to the communal support structures that would complement their cooperative individual approach with the broader authority the child also needs',
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
  'steady-anchor': STEADY_ANCHOR_OVERLAYS,
  'fierce-guardian': FIERCE_GUARDIAN_OVERLAYS,
  'gentle-nurturer': GENTLE_NURTURER_OVERLAYS,
  'intentional-guide': INTENTIONAL_GUIDE_OVERLAYS,
  'resilient-striver': RESILIENT_STRIVER_OVERLAYS,
  'structured-mentor': STRUCTURED_MENTOR_OVERLAYS,
  'open-hearted-learner': OPEN_HEARTED_LEARNER_OVERLAYS,
  'devoted-champion': DEVOTED_CHAMPION_OVERLAYS,
  'collaborative-ally': COLLABORATIVE_ALLY_OVERLAYS,
};
