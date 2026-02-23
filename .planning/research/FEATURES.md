# Feature Research

**Domain:** Personalized quiz-to-premium-PDF parenting assessment product
**Researched:** 2026-02-23
**Confidence:** MEDIUM (WebSearch verified across multiple sources; no single authoritative benchmark exists for this exact product category)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels broken or untrustworthy.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| One question per screen (card-style) | Every modern quiz does this. Multi-question pages feel like forms, not quizzes. Card-style has become the default expectation. | LOW | Single question UI, mobile-first. Typeform popularized this; now it's the floor. |
| Progress bar / step indicator | 24% of users abandon forms lacking completion status. Users need to know how far they are in a 10-20 minute quiz. | LOW | Show "Question X of Y" or percentage. Starting fast and slowing near end reduces drop-off. |
| Back button / answer editing | Users second-guess answers. No back button creates anxiety and abandonment. | LOW | Must allow navigating backward to any previous question without losing subsequent answers. |
| Mobile-responsive layout | Mobile-first is default. Quiz takers are on phones. Desktop-only = lost conversions. | LOW | Full-screen or card-based layout optimized for thumb interaction. |
| Clear result categorization | Users need a named, distinct outcome (archetype/type) — not a vague score. Generic results = "I could have Googled this." | LOW | Show archetype name prominently. This is the emotional payoff of completing the quiz. |
| Free teaser result page | The 16personalities model is the industry benchmark. Users expect some free result before payment ask. Gating everything kills trust. | MEDIUM | Show archetype name + 2-3 sentence summary free. Gate depth behind payment. |
| Email capture before PDF delivery | Standard digital product flow. Users expect to provide email to receive their purchased/generated output. | LOW | Email is both the delivery mechanism and the CRM capture. Required for PDF delivery and any follow-up. |
| Instant PDF delivery after payment | "Digital delivery" expectation is immediate. Any delay beyond 30 seconds feels broken. | MEDIUM | Generate PDF on completion of Stripe webhook. Trigger from both landing page redirect AND webhook to handle race conditions. |
| Stripe-hosted checkout | Users trust Stripe's hosted checkout page. Third-party brand (Stripe) at payment step provides PCI compliance and trust by association. | LOW | Stripe Checkout redirect is standard. Embedded iFrame checkout is medium complexity; not needed for v1. |
| HTTPS / SSL | Users notice padlock. Absence triggers browser warnings and abandonment. | LOW | Vercel handles this automatically. |
| "Why we ask this" context on sensitive questions | For personal/emotional questions about upbringing, users need reassurance that the question is purposeful. | LOW | Small helper text or tooltip. Reduces abandonment on questions about childhood trauma, cultural background, etc. |
| Readable question language | Clinical or academic phrasing kills completion. Conversational, warm language is expected in consumer psychology products. | LOW | Content/writing challenge, not engineering. Critical for a parenting product. |
| Result page PDF preview / sample | Users need to see what they're paying $14 for before buying. Blind purchase is a friction point. | LOW | Show 2-3 blurred or sample pages. Reduces buyer hesitation significantly. |

---

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required by users, but create perceived value and conversion lift.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Archetype-based result (6-8 types, not a score) | Scores are generic. Named archetypes create identity — users say "I'm a Mirror Parent" not "I scored 72." Identity drives sharing and retention. Competitors (Attachment Project, Gottman) use 4 types max. 6-8 richer archetypes = more nuanced and shareable. | HIGH | Requires Sophia's clinical framework to be finalized. Scoring logic maps all answers to archetype. This is the core IP. |
| Personalized AI-generated paragraphs within fixed PDF template | Other products generate the same text for everyone in an archetype. AI-personalized paragraphs make the PDF feel written for this specific person. Competitors (Attachment Project, 16Personalities) generate fixed text per type. | HIGH | Moonshot Kimi 2.5 generates personalized paragraphs. Fixed template structure with variable content blocks. Not fully AI-generated — structure is fixed. |
| Cultural background personalization | No parenting quiz asks about cultural background directly and uses it to personalize output. This is a genuine differentiator, especially for non-Western parents who feel unseen by mainstream parenting content. | HIGH | Requires additional content development: culturally-variant archetypes or cultural context overlays within each archetype. Dependencies: archetype framework + AI prompt design. |
| KOL research attribution in PDF | Citing 20-30 named parenting KOLs gives the product authority. Users feel like they're getting expert guidance, not pop psychology. Competitors use vague "research shows" language. Named KOLs build trust and give social proof through association. | MEDIUM | Research attribution section in PDF. Design element showing expert faces/names with their insight mapped to user's archetype. |
| Partner dialogue prompts as a PDF section | No free parenting quiz product helps users use results to have a conversation with their partner. This bridges self-reflection to relationship utility. Creates reason to share PDF and reason to buy couple's report (v2 viral mechanic). | MEDIUM | Dedicated PDF section with conversation starters, framed for partner dialogue. Content challenge more than engineering. |
| "Foundational patterns + specific watchouts" dual output | Most personality quizzes show only what you are, not what to watch out for. Showing both the positive framing (foundational patterns) and the shadow/risk (watchouts) creates more clinical depth and perceived value. | MEDIUM | Requires two distinct content blocks per archetype in the PDF. More content to write/generate; AI personalization applies to both. |
| Warm, premium aesthetic (therapy workbook meets Canva premium) | The parenting quiz space is full of ugly, text-heavy PDFs or clinical assessment formats. A beautifully designed PDF feels like a premium gift, not a report. Users are more likely to save, share, and revisit beautiful outputs. | MEDIUM | PDF design is a one-time investment. Requires a designer or high-quality Canva template. Can be built once and used as the template for all AI-personalized outputs. |
| Result page that shows how archetype forms (childhood → parenting) | Explaining the mechanism — why users' upbringing created their archetype — makes the product feel educationally valuable, not just categorizing. Deepens the "I feel seen" response. | MEDIUM | Content and layout work on result page. Can be done with static copy per archetype + dynamic user-specific language. |
| Teaser of partner dialogue prompts on result page | Showing a sample dialogue prompt on the free result page creates desire for the full PDF and plants the "I should share this with my partner" seed. Drives purchase intent. | LOW | Single CTA enhancement on result page. Low complexity, high conversion impact. |

---

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems. Explicitly choosing NOT to build these is a decision.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| User accounts / login | Seems like it enables history, retaking quiz, dashboard. "Users want to come back." | Adds auth complexity (password reset, sessions, security). Massive scope increase for v1. Stateless flow is simpler and still delivers the product. Most one-time-purchase digital products don't need accounts. | Stateless flow: email captures identity. Store quiz results in DB by session/email. User can re-request their PDF via email if lost. |
| Fully AI-generated PDF (no fixed template) | "More personalization = better." AI writes the whole thing dynamically. | Output quality control becomes impossible. AI hallucinates, goes off-brand, misrepresents archetypes. Fixed template with AI-personalized paragraphs gives 80% of the personalization benefit with 20% of the risk. | Fixed template structure (sections predetermined) with AI-generated content within defined content blocks. Review/test each block type carefully. |
| Embedded payment (no redirect) | Feels "seamless" to keep payment on-page rather than redirecting to Stripe. | Embedding Stripe requires more complex implementation, PCI compliance scope increases, custom UI for card fields. Stripe Checkout redirect is trusted, PCI-compliant out of the box, and handles international payment methods automatically. | Stripe Checkout redirect. The redirect is brief (2-3 seconds), users return to your site after. Conversion impact is minimal. |
| Retake quiz functionality | Users want to see other archetypes. "What if I answer differently?" | Encourages users to game the quiz to get a more flattering result, undermining the credibility of the output. Also delays PDF purchase — "I'll try again first." | Explain in copy that answers reflect genuine patterns. If archetype doesn't resonate, offer a brief "archetype mismatch" path to a secondary archetype description. Do not allow unlimited retakes. |
| Real-time progress saving (cloud-based draft) | "What if I need to stop mid-quiz?" | Complex backend state management for anonymous users. Most users complete in one session. Cookie-based local storage save is simpler and covers 90% of the "I lost my place" use case. | Browser localStorage to auto-save quiz position. If user returns with same session, restore state from local storage. No server-side state management needed for v1. |
| Social login (Google, Facebook) | "Reduces friction at email capture." | OAuth complexity. Privacy concerns in parenting/psychological context — users don't want to log in with Facebook for a deeply personal quiz. Email input is lower friction in this emotional context. | Simple email field. No password required. Stripe handles payment identity. |
| Affiliate / referral program at launch | "Word of mouth is our growth channel." | Adds payout tracking, fraud prevention, affiliate dashboard complexity. V1 needs to validate core purchase flow before optimizing referrals. | Share buttons on result page (no financial incentive needed for v1). If someone found value, they'll share. Financial incentive can come in v1.x once purchase flow is validated. |
| Multiple pricing tiers / bundles at checkout | "Upsell with a bundle!" Pre-purchase upsells, order bumps, tiered pricing. | Adds decision anxiety at the payment step. Single clear price ($14) removes friction. Order bumps require custom checkout page (can't use Stripe Checkout redirect with order bumps). | Single clean price. Post-purchase upsell can be a follow-up email: "Did you know your partner can take the quiz too? Couple's Blueprint coming soon." This plants the v2 seed without checkout friction. |
| Live chat / support during quiz | "Users might have questions mid-quiz." | Distracting. Breaks flow. Quiz completion requires focus. Live chat widgets on quiz pages reduce completion. | Clear FAQ section on landing page addressing common concerns before quiz start. Tooltip-style "Why we ask this" for sensitive questions. Post-quiz email with support contact. |

---

## Feature Dependencies

```
[Archetype Framework (Sophia's clinical work)]
    └──requires──> [Quiz question design]
                       └──requires──> [Quiz UX build]
                                          └──requires──> [Free result page]
                                                             └──requires──> [PDF purchase CTA]
                                                                                └──requires──> [Stripe Checkout]
                                                                                                   └──requires──> [PDF generation]
                                                                                                                      └──requires──> [PDF delivery via email]

[AI personalization prompts]
    └──requires──> [Archetype Framework]
    └──requires──> [Moonshot Kimi 2.5 integration]
    └──enables──> [Personalized PDF paragraphs]

[Cultural background question in quiz]
    └──requires──> [Cultural content variants per archetype]
    └──enhances──> [AI personalization prompts]

[Partner dialogue prompts (PDF section)]
    └──requires──> [Archetype Framework]
    └──enhances──> [PDF perceived value]
    └──plants seed for──> [v2: Couple's Blueprint]

[PDF template design]
    └──requires──> [Archetype Framework] (to know all sections needed)
    └──enables──> [AI content generation] (template defines the blocks)

[Email capture]
    └──enables──> [PDF delivery]
    └──enables──> [Post-purchase follow-up emails]
    └──enables──> [v2: partner invite flow]

[KOL research attribution]
    └──requires──> [Research from 20-30 KOLs completed]
    └──enhances──> [Landing page trust signals]
    └──enhances──> [PDF credibility section]

[Free result page (archetype teaser)]
    └──enables──> [PDF purchase conversion]
    └──requires──> [Archetype Framework]

[Stripe Checkout]
    └──enables──> [PDF delivery trigger]
    └──requires──> [Stripe account + webhook setup]
```

### Dependency Notes

- **Archetype Framework blocks everything**: Quiz design, PDF content, AI prompts, and result page all depend on Sophia's clinical work. This is the highest-priority dependency to resolve before any engineering starts.
- **PDF template design requires archetype framework**: Template sections must accommodate all 6-8 archetypes. Designing the template before archetypes are finalized means rework.
- **Cultural personalization is a content dependency, not just engineering**: Adding cultural background personalization requires writing culturally-variant content per archetype, not just asking the question. High content effort.
- **KOL research attribution requires research to be completed**: Can't attribute research that hasn't been collected yet. This is a content pre-requisite.
- **Post-purchase email enhances v2 viral mechanic**: Capture email at purchase → send follow-up about Couple's Blueprint → plant partner invite seed. This is the lowest-cost v2 setup action.

---

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate that users pay $14 for a personalized parenting PDF.

- [ ] Card-style quiz (one question per screen, progress bar, back button) — core interaction, without this there is no product
- [ ] 6-8 archetype mapping with scoring logic — clinical framework, the IP
- [ ] Free result page showing archetype name + 2-3 sentence teaser + PDF preview/sample + CTA — conversion step
- [ ] Stripe Checkout at $14 — payment, table stakes
- [ ] PDF generation with fixed template + AI-personalized paragraphs via Moonshot Kimi 2.5 — the value delivered
- [ ] PDF delivery via email after purchase — fulfillment
- [ ] Landing page with KOL credibility signals + quiz start CTA — acquisition
- [ ] "Why we ask this" context on sensitive questions — reduces abandonment on personal questions
- [ ] Mobile-responsive design throughout — non-negotiable given expected traffic sources

### Add After Validation (v1.x)

Features to add once core purchase flow is proven (first 100-500 purchases).

- [ ] Cultural background personalization (content layer) — needs cultural content written per archetype; high value but high content effort
- [ ] Post-purchase email sequence (partner nudge, retake reminder) — v2 seed planting; low effort once email capture is in place
- [ ] Result page share button (no financial incentive) — organic word of mouth; low engineering effort
- [ ] PDF re-delivery flow ("lost my PDF?" email request) — customer support reducer
- [ ] A/B test: email wall before vs. after archetype reveal — optimize conversion; benchmark shows mid-quiz email capture outperforms upfront capture

### Future Consideration (v2+)

Features to defer until individual product-market fit is established.

- [ ] Couple's Blueprint ($22 combined report) — the viral mechanic; requires both partners completing quiz and report combining logic; high complexity
- [ ] Partner invite flow (email a link to your partner) — depends on Couple's Blueprint existing
- [ ] Quiz result sharing card (shareable image) — nice for social, low priority for a deeply personal product
- [ ] User dashboard / quiz history — requires auth; only valuable if users are repeat customers
- [ ] Affiliate / referral program — needs purchase volume baseline to calculate economics

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Card-style quiz UX (one question per screen) | HIGH | LOW | P1 |
| Progress bar + back navigation | HIGH | LOW | P1 |
| Archetype scoring + result categorization | HIGH | MEDIUM (depends on framework) | P1 |
| Free result page with teaser | HIGH | LOW | P1 |
| Stripe Checkout integration | HIGH | LOW | P1 |
| PDF generation (template + AI paragraphs) | HIGH | HIGH | P1 |
| PDF delivery via email | HIGH | MEDIUM | P1 |
| Landing page with credibility signals | HIGH | MEDIUM | P1 |
| Mobile-responsive design | HIGH | LOW | P1 |
| "Why we ask this" helper text | MEDIUM | LOW | P1 |
| Warm premium PDF design | HIGH | MEDIUM (design, not engineering) | P1 |
| Partner dialogue prompts in PDF | HIGH | LOW (content) | P1 |
| KOL attribution in PDF | MEDIUM | LOW (content) | P1 |
| Foundational patterns + watchouts dual section | MEDIUM | LOW (content) | P1 |
| Cultural background personalization | HIGH | HIGH (content + AI prompts) | P2 |
| Post-purchase email sequence | MEDIUM | LOW | P2 |
| Share button on result page | LOW | LOW | P2 |
| PDF sample preview on result page | MEDIUM | LOW | P1 |
| Result re-delivery email flow | LOW | LOW | P2 |
| Couple's Blueprint report | HIGH | HIGH | P3 |
| User accounts / dashboard | LOW | HIGH | P3 |
| Affiliate program | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

---

## Competitor Feature Analysis

| Feature | Attachment Project | 16Personalities / Truity | Our Approach |
|---------|-------------------|--------------------------|--------------|
| Quiz length | 5 min, ~20 questions | 10-15 min, 60-100 questions | 10-20 min, depth-first for credibility |
| Result types | 4 attachment styles | 16 types (MBTI) / 5 dimensions | 6-8 parenting archetypes (more nuanced than 4, less overwhelming than 16) |
| Free result | Full result summary, no email wall | Full result free, premium is depth + PDF | Archetype name + 2-3 sentence teaser, depth gated at $14 |
| Paid product | PDF add-on, courses | $9-$39 premium reports | $14 PDF, clear single price |
| Personalization | Same text per type | Same text per type | AI-personalized paragraphs within template — unique differentiator |
| Cultural context | None | None | Direct cultural background question + personalized content |
| Partner / couple utility | Contextual info by relationship status | Relationship section in premium | Partner dialogue prompts built into PDF + v2 Couple's Blueprint |
| Design quality | Functional but basic | Functional but dense | Premium design goal: therapy workbook meets Canva premium |
| Research credibility | Academic references | General psychology refs | Named KOLs (20-30) with attributed insights in PDF |
| Parenting-upbringing focus | Parenting style (current behavior) | None | Upbringing patterns → parenting instincts (unique angle: how YOUR childhood shapes your parenting) |

**Key competitive observation**: No competitor addresses the upbringing-to-parenting transmission mechanism. Everyone tests current parenting behavior. This product's unique angle — how your own childhood shapes your instincts as a parent — is genuinely unoccupied territory with deep emotional resonance.

---

## Sources

- Attachment Project product review (WebFetch, 2026-02-23): https://www.attachmentproject.com/attachment-style-quiz/ — MEDIUM confidence
- 16Personalities Premium Career Suite features (WebFetch, 2026-02-23): https://www.16personalities.com/premium/premium-report — HIGH confidence (official product page)
- Truity premium report features and pricing (WebSearch, 2026-02-23): https://insideoutmastery.com/truity-review/ — MEDIUM confidence
- Everyday Industries quiz UX patterns (WebFetch, 2026-02-23): https://everydayindustries.com/product-recommendation-quiz-tips/ — MEDIUM confidence
- Quiz completion rate statistics (WebSearch, 2026-02-23): https://bestcolorfulsocks.com/blogs/news/style-quiz-completion-rate-statistics — LOW confidence (single source)
- Email capture timing best practice (WebSearch, 2026-02-23): https://emailconversionlab.com/2025/09/03/how-to-build-a-high-converting-quiz-to-email-funnel/ — MEDIUM confidence
- Interact quiz conversion rate report (WebSearch, 2026-02-23): https://www.tryinteract.com/blog/quiz-conversion-rate-report/ — MEDIUM confidence
- Multi-step form UX best practices (WebSearch, 2026-02-23): https://www.growform.co/must-follow-ux-best-practices-when-designing-a-multi-step-form/ — MEDIUM confidence
- Stripe post-payment fulfillment docs (WebSearch, 2026-02-23): https://docs.stripe.com/checkout/fulfillment — HIGH confidence (official docs)
- ScoreApp dynamic PDF feature (WebSearch, 2026-02-23): https://www.scoreapp.com/ — MEDIUM confidence
- Trust signals and credibility indicators (WebSearch, 2026-02-23): https://www.slashexperts.com/post/website-trust-signals-the-hidden-elements-costing-you-sales — MEDIUM confidence
- Viral quiz sharing mechanics (WebSearch, 2026-02-23): https://quizandsurveymaster.com/create-viral-quizzes-key-features-trends/ — MEDIUM confidence
- Competitor parenting quiz landscape (WebSearch, 2026-02-23): multiple sources including Gottman, Attachment Project, Active Parenting — MEDIUM confidence

---

*Feature research for: personalized quiz-to-premium-PDF parenting assessment (quiz/assessment-to-output product category)*
*Researched: 2026-02-23*
