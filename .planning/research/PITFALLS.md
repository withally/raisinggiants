# Pitfalls Research

**Domain:** Personalized quiz-to-premium-PDF parenting assessment product
**Researched:** 2026-02-23
**Confidence:** MEDIUM — core patterns verified across multiple sources; product-specific validation requires live user testing

---

## Critical Pitfalls

### Pitfall 1: Quiz Drop-Off at the Wrong Moment — Asking for Commitment Before Delivering Value

**What goes wrong:**
The quiz asks for email or payment before the user has experienced any value from the product. Users who haven't yet felt "seen" by the quiz will not hand over money or personal information. The investment of completing a 10-20 minute quiz is what makes the gate worth crossing — if the gate appears too early (before completing the quiz) or the free result page is too thin to create desire for more, conversion collapses.

**Why it happens:**
Builders optimize for their business goal (capturing the lead early) rather than the user's psychological state (need to feel value before committing). Conventional email-capture quizzes (lead magnets) always gate at the end. A quiz selling a premium PDF must do something harder: show enough on the free result page to create genuine desire, without giving away everything.

**How to avoid:**
- The free archetype result page must feel genuinely insightful and personalized — enough that the user says "yes, this is me." This is the emotional hook that converts.
- Gate the depth (full 15-20 page personalized report), not the archetype identity itself. Show the archetype name, a compelling 2-3 paragraph resonance description, and a preview of what's inside the full PDF.
- Never ask for payment before the quiz is fully complete. Never ask for email before at least showing the archetype result.
- The paywall must feel like a "bonus unlock" not a wall. The user should feel they're getting the next layer, not being stopped.

**Warning signs:**
- Result page bounce rate above 70% before hitting the payment CTA
- Users completing the quiz but not scrolling past the fold on the result page
- Conversion rate under 5% from result page to Stripe checkout

**Phase to address:** Quiz UX phase (before building the payment flow). The result page must be designed alongside the quiz, not as an afterthought.

---

### Pitfall 2: AI-Generated Content That Sounds Like AI — Killing the "You Wrote This About Me" Moment

**What goes wrong:**
The personalized PDF paragraphs read like generic self-help text with variable substitution. The user opens the PDF, reads the first section, and thinks "this could describe anyone." The core value proposition — "deeply personalized, feels like it was written for you" — evaporates. Trust in the product collapses and refund requests follow. This is the single biggest commercial risk for this specific product.

**Why it happens:**
AI models (including Kimi 2.5) default to balanced, agreeable, high-level language when prompts are underspecified. Without tight prompting discipline, the output is polished generic content — not clinical specificity. The model hedges, uses vague positive framing, and avoids anything that might be wrong. The result sounds like a horoscope.

**How to avoid:**
- Prompts must inject the user's specific quiz answers verbatim — not a summary, the actual answer text. "You selected 'authoritative but emotionally distant' when describing your father's parenting style" creates specificity.
- Use contrast in the content: what users' archetype gets right AND what they consistently miss. Generic content praises, specific content challenges.
- Include conditional content blocks: sections that only appear for specific answer combinations. A "Cultural background" section for users who selected Chinese family background should reference that directly.
- Test every generated PDF against a human evaluator: "Does this feel like it was written for this specific person?" Do this before shipping, not after.
- Implement a scoring rubric for AI output quality before exposing to users.

**Warning signs:**
- You can swap two users' PDFs and neither notices
- The word "journey" appears in every section
- Internal review team can't identify which quiz answers drove which paragraphs
- Sections feel interchangeable between archetypes

**Phase to address:** AI content generation phase. Must be treated as a distinct design problem — prompt engineering is a first-class deliverable, not implementation detail.

---

### Pitfall 3: Quiz Fatigue From Depth Without Momentum — 10-20 Minutes Feeling Like Homework

**What goes wrong:**
A 10-20 minute quiz is deliberately chosen for depth and credibility. But without careful UX architecture, it feels like a tedious form. Users drop off around question 8-12. Completion rates for 16+ question quizzes average 25-45% (versus 65-85% for 3-7 question quizzes). This product's competitive value requires depth — the challenge is making that depth feel meaningful, not heavy.

**Why it happens:**
Questions are designed by domain experts (Sophia, KOL framework) for psychological rigor, not for UX momentum. Without explicit architectural attention, the quiz becomes a uniform block of questions. No momentum indicators, no micro-rewards, no pacing variation. The user stops seeing the payoff and stops caring.

**How to avoid:**
- Design the quiz in psychological "chapters" with clear conceptual breaks (e.g., "Your Childhood Environment," "Your Parents' Patterns," "Your Current Instincts"). Each chapter feels purposeful, not just more questions.
- Use a non-linear progress bar that advances faster at the start (psychological trick: early progress feels motivating). The bar should suggest "halfway" at around question 10 of 25.
- After every 4-5 questions, inject a brief "insight moment" — one sentence reflecting back what their answers are revealing. This rewards engagement mid-quiz.
- Mobile-first: large tap targets, short question text, single-question-per-screen layout. No horizontal scrolling, no question groups on one screen.
- Questions must justify their existence to the user: include brief framing text explaining why you're asking ("This helps us understand your default emotional responses").

**Warning signs:**
- Drop-off analytics spike at specific question numbers (examine which questions)
- Average time-on-quiz under 6 minutes (users rushing, not engaging)
- Mobile completion rate significantly lower than desktop completion rate
- Questions taking more than 30 words to ask

**Phase to address:** Quiz architecture phase. Must be solved in design before implementation. Rebuild cost is high.

---

### Pitfall 4: PDF Delivery Failure Killing the Moment of Peak Excitement

**What goes wrong:**
The user pays $14. They're at peak emotional investment. The PDF doesn't arrive. It's in spam. The download link is broken. The file takes 45 seconds to generate and the loading state shows an error. The Stripe webhook fires but the PDF job silently fails. The "moment of delight" becomes a moment of frustration and distrust. Refund requests spike.

**Why it happens:**
PDF generation is treated as a single synchronous operation triggered by Stripe webhook. In production: Puppeteer/headless browser hits memory limits on Vercel's serverless functions (10-second timeout), Moonshot AI generates slowly for a long form, the generated file exceeds email attachment limits (10MB), or the email lands in spam because the domain lacks DKIM/SPF.

**How to avoid:**
- Never generate the PDF synchronously in the Stripe webhook handler. Offload to an async job (Supabase Edge Function, queue, or background job). Show the user a "Generating your report..." screen with realistic loading state.
- Cap PDF generation time with a fallback: if generation exceeds 30 seconds, show a "Your report will be emailed within 5 minutes" message. This sets expectations and feels professional.
- PDF delivery should be both: (1) a download button on the success page AND (2) an email with download link (not PDF attachment — links are safer for spam filters and large files).
- Test DKIM, SPF, and DMARC before launch. Test email delivery to Gmail, Outlook, and Apple Mail. Email with PDF attachment names containing ".com" in the filename can be flagged as spam.
- Set up dead letter queue logging for failed PDF jobs with alerting. Silent failures are worse than visible errors.

**Warning signs:**
- Stripe webhook logs show success but PDF job logs show no corresponding entry
- Support emails mentioning "I never received my report"
- Vercel function timeout errors in logs after payment events
- Email open rate under 40% (suggests spam placement)

**Phase to address:** Payment and delivery phase. Must be tested under load and against real email inboxes before go-live.

---

### Pitfall 5: Credibility Theater — KOL References That Don't Land

**What goes wrong:**
The landing page says "backed by research from 20-30 parenting experts" but the quiz feels like a BuzzFeed personality test. There's no visible connection between the stated expert foundation and the actual experience. Users who are the target market (thoughtful parents who would pay $14 for depth) can sense inauthenticity. They bounce. Users who don't sense it pay, but feel let down when the PDF doesn't match the claim.

**Why it happens:**
Credibility is added as a marketing layer ("we consulted experts") rather than built into the product layer (specific concepts, named frameworks, direct quotes). The gap between promise and delivery is standard for the genre — this product's opportunity is to actually close that gap.

**How to avoid:**
- Name specific researchers and concepts in the quiz itself: "This question draws on John Gottman's research on emotional coaching" as a tooltip. This transforms generic questions into research touchpoints.
- The PDF must cite specific research: "Research from Diana Baumrind's 1967 study on parenting styles shows that..." adjacent to paragraphs that apply it to the user's answers.
- Display Sophia's credentials and involvement explicitly — her clinical background is a trust signal that needs to be front and visible, not buried in an "about" page.
- Do NOT use vague collective attribution ("parenting experts say"). Use names, concepts, and study references. This is what separates "research-backed" from "research-washed."

**Warning signs:**
- Zero specific researcher names visible on the landing page or quiz
- PDF contains no citations or study references
- Sophia's role is not clearly described on the site
- Users describe the quiz as "fun" in feedback but not "insightful" or "accurate"

**Phase to address:** Content design phase — before quiz questions are finalized. Research attribution must be woven into content architecture, not added as a final step.

---

### Pitfall 6: Payment Context Break — The Stripe Redirect Killing Momentum

**What goes wrong:**
The user completes the quiz, sees their archetype, gets excited, clicks "Get My Full Report," and is ejected to a generic Stripe-hosted checkout page. The warm, personalized experience ends abruptly. The Stripe page has no context about what they bought, no emotional connection to their journey, no personalization. A meaningful percentage abandon here — studies show 18% of shoppers abandon at checkout even after expressing clear purchase intent.

**Why it happens:**
Stripe Checkout (redirect mode) is the simplest implementation — but it sends users to a Stripe-hosted URL that looks and feels nothing like the product. Stripe's default page is clean and functional, but it's not warm, it's not personal, and it has no knowledge of who the user is or what they're getting.

**How to avoid:**
- Use Stripe Checkout's customization options maximally: set the product description to include the user's archetype name ("The [Archetype Name] Blueprint — Your Full Personalized Report"), use the product image field, customize the business branding.
- Consider the Stripe embedded form (Payment Element on your own page) instead of redirect — this keeps users in the product experience throughout checkout. The tradeoff is slightly more implementation complexity, but conversion improvement is typically significant.
- Add Apple Pay / Google Pay to the checkout options — Stripe shows 2x conversion improvement with Express Checkout Element for mobile users.
- The success page must immediately feel like a continuation of the personalized experience — address the user by name, reference their archetype, set clear expectation for PDF delivery.

**Warning signs:**
- Checkout abandonment rate above 20%
- Mobile checkout abandonment significantly higher than desktop
- Time-on-checkout under 30 seconds (users not completing, just bouncing)
- No Apple Pay / Google Pay offered on mobile

**Phase to address:** Payment integration phase. Evaluate embedded Payment Element vs. redirect before implementation — switching later is non-trivial.

---

### Pitfall 7: Archetype Scoring That Produces Implausible Results

**What goes wrong:**
A user completes 20-30 questions carefully and receives an archetype assignment that feels completely wrong. "The Permissive Connector" — but they answered in ways that clearly indicated high structure and emotional restraint. When the first thing about the experience fails to resonate, the user loses trust in everything that follows — the archetype summary, the PDF, the research claims, the brand.

**Why it happens:**
Archetype scoring logic is built before the archetype framework is fully defined, or the scoring weights are set arbitrarily without validation. The 6-8 archetypes are currently at concept stage — undefined scoring logic mapped to poorly defined archetypes produces garbage results, regardless of AI content quality downstream.

**How to avoid:**
- Define the archetype framework with Sophia before any quiz or scoring code is written. This is a hard dependency: questions → scoring → archetypes must be designed as a unified system.
- Scoring logic must be explicitly documented (not implicit in code). Each question answer must have a defined weight for each archetype dimension.
- Build a scoring validation tool before going to production: given a set of quiz answers, manually compute the expected archetype, then run the scoring algorithm, and compare. Do this for 20-30 simulated edge cases.
- Include a "mixed archetype" result pathway: if a user's answers are genuinely split across two archetypes, the product should surface this rather than forcing a false single classification.
- Do not let AI override the scoring — AI generates the personalized text content, but archetype assignment must be deterministic scoring logic.

**Warning signs:**
- You personally take the quiz three times with deliberately different answer sets and get the same archetype twice
- Sophia reviews five sample results and flags more than one as "clinically implausible"
- The PDF content for two different archetypes reads nearly identically after variable substitution

**Phase to address:** Archetype framework development phase — must be complete before quiz implementation begins. Zero exceptions.

---

### Pitfall 8: Supabase RLS Disabled — User Data Exposed

**What goes wrong:**
Quiz responses and personal data (cultural background, family trauma indicators, parenting anxieties) are stored in Supabase tables with RLS disabled. This product collects sensitive psychological data. In January 2025, 83% of exposed Supabase databases in a cohort of 170+ apps were due to RLS misconfigurations. If this data is exposed, the breach involves extremely sensitive personal and family psychology information — the reputational and legal consequences are severe.

**Why it happens:**
Supabase creates all tables with RLS disabled by default. Developers build quickly in development (SQL editor runs as postgres superuser, bypassing RLS), verify queries work, ship, and never realize RLS was never enabled. The SQL editor never shows the problem because it bypasses all policies.

**How to avoid:**
- Enable RLS on every table at creation time, before writing any data.
- Never use the service_role key in client-side code — it bypasses RLS entirely. Service role key is server-only.
- Test all data access through the Supabase client SDK with a real authenticated user session — not through the SQL editor.
- Add indexes on policy filter columns (e.g., `user_id`) to avoid full-table scans on every RLS policy evaluation.
- Quiz response data and PDF generation data must be scoped by session or user — anonymous users need session-scoped access, not open access.

**Warning signs:**
- Any table creation that doesn't immediately configure RLS
- Supabase client initialization in any client-side component that uses the service_role key
- Data in `quiz_responses` table accessible without any authentication in Supabase Studio

**Phase to address:** Database setup phase — first sprint. Must be addressed before any real user data is written.

---

### Pitfall 9: Moonshot AI Kimi 2.5 Rate Limits Blocking PDF Generation Under Load

**What goes wrong:**
The product launches, 50 users complete the quiz and pay within an hour, and the Kimi API starts returning rate limit errors. PDF generation fails silently or with confusing errors. The team scrambles to retry manually. Trial accounts are limited to approximately 3 requests per minute with single concurrency — this is fine for testing, sufficient for a slow launch, catastrophic for any spike.

**Why it happens:**
API rate limits are not tested during development because development traffic is always low. The team assumes the paid tier handles production load without verifying the specific tier limits before launch.

**How to avoid:**
- Determine the exact Kimi API tier limits for the account before implementing the generation pipeline. Trial: ~3 RPM. Paid tiers vary — verify the specific account's limits at platform.moonshot.ai.
- Implement request queuing at the application layer: all PDF generation requests should go through a queue, not directly to the API. This naturally handles bursts without losing jobs.
- Build retry logic with exponential backoff for 429 (rate limit) responses — this should be built before launch, not added after the first outage.
- Design the user experience to tolerate async generation: the success page should show "Your report is generating" with polling, not assume instant delivery. This makes rate limiting invisible to users.
- Monitor Kimi API costs per PDF generation. A 15-20 page deeply personalized PDF may involve multiple API calls — cost per sale must be validated before pricing is locked.

**Warning signs:**
- No request queue implemented — API calls made inline with user request handling
- PDF generation logic has no retry or backoff for rate limit responses
- No monitoring on Kimi API response times or error rates
- Cost-per-PDF has never been calculated based on actual token usage

**Phase to address:** AI integration phase. Queue architecture must be designed before PDF generation is built.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Synchronous PDF generation in webhook handler | Simpler to implement | Timeouts on slow AI responses, silent failures, Vercel 10s function limit | Never — async queue from day one |
| Stripe Checkout redirect (default) without customization | Fast to ship | Branded context break, lower mobile conversion, no archetype personalization in checkout | Acceptable for MVP if configured maximally; re-evaluate post-launch with conversion data |
| Skipping RLS policies during rapid prototyping | Faster iteration | Exposes sensitive psychological data if forgotten before prod | Never — enable RLS at table creation in all environments |
| AI prompts without answer verbatim injection | Simpler prompt construction | Generic "feels like a horoscope" output that destroys core value prop | Never for the personalized paragraphs; acceptable for structural/boilerplate sections |
| Archetype scoring logic embedded in application code (not documented) | Faster to code | Impossible to audit, validate, or correct without reading source; cannot be reviewed by Sophia | Never — scoring must be externally documentable |
| PDF delivered as email attachment | Simpler delivery logic | Spam filter risk, 10MB file size risk, filename gotchas (.com in name) | Deliver via download link; email as backup notification |
| Hardcoding Kimi model pricing/limits | One less configuration concern | Model pricing changes without notice; tier upgrades require code changes | Never — pull from config; document current limits |

---

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Stripe Checkout | Triggering PDF generation in the redirect success URL handler (frontend) rather than the webhook | Always use the `checkout.session.completed` webhook server-side. Success URL can be faked by navigating directly to it. Webhook is authoritative. |
| Stripe Checkout | Not verifying webhook signature | Every webhook handler must validate `Stripe-Signature` header using `stripe.webhooks.constructEvent`. Unvalidated webhooks can be spoofed. |
| Moonshot AI Kimi | Sending the full quiz response object as a single prompt for the entire PDF | Break PDF into sections; generate each section with a focused prompt. Smaller prompts produce better output quality and are easier to retry on failure. |
| Supabase | Using Supabase client in server-side code with the anon key for privileged operations | Use the service_role key server-side only (in API routes, Edge Functions, webhooks). Use anon key + RLS for all client-facing operations. |
| Supabase | Testing RLS in the SQL editor | SQL editor runs as postgres superuser. Always test RLS policies through the Supabase SDK with real session tokens. |
| PDF email delivery | Sending PDF as email attachment | Send a download link instead. Attachments are filtered by spam tools, have size limits, and can be flagged based on filename content. |
| Vercel | Running Puppeteer/headless browser in Vercel serverless functions | Vercel serverless functions have a 10-second timeout and strict memory limits. Puppeteer frequently exceeds both. Use `@sparticuz/chromium` for Vercel compatibility, or offload to a dedicated service. |

---

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Inline PDF generation per request | Success page shows error/spinner forever; Vercel timeout logs after payment events | Queue all generation jobs; use async job worker pattern | First day with more than ~5 concurrent payments |
| Single Kimi API call for entire PDF | Slow generation (30-60s+), timeout errors, all-or-nothing failure | Section-by-section generation with individual retry; store each section result | Every generation for long-form documents |
| No caching for archetype text templates | Repeated AI calls for the same archetype boilerplate | Cache archetype-static content (intro text, section headers); only AI-personalize the variable paragraphs | Negligible at 100 users; meaningful at 1,000+ |
| Quiz answers stored only in browser state | User navigates away mid-quiz and loses all progress | Persist quiz progress to Supabase incrementally (or localStorage with sync); never rely solely on in-memory state | First user with a flaky mobile connection |
| Unindexed `session_id` / `user_id` columns in quiz_responses | Slow webhook processing; result page loads slowly | Add index on all foreign key and filter columns at table creation | Around 10,000 quiz submissions |

---

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing quiz response data without RLS | Sensitive family psychology data (childhood trauma, parenting anxieties, cultural background) visible to any requester | Enable RLS on all tables; scope access to session or authenticated user; verify before launch |
| Service role key in client-side Next.js code | Full database bypass; any user can read/write all data | Service role key in server-only code (`/api/` routes, Edge Functions). Never in `/app/` components or browser-accessible files. |
| Not verifying Stripe webhook signatures | Fraudulent PDF generation (attacker spoofs payment success); resource abuse | Always use `stripe.webhooks.constructEvent()` with the webhook secret before processing any webhook payload |
| Storing payment intent data beyond what's needed | PCI compliance scope creep | Store only Stripe session ID and payment status. Never store card data. Let Stripe handle all payment data. |
| PDF generation for unverified payment | Free PDF generation by hitting the generation endpoint directly | PDF generation must only trigger after verifying the Stripe webhook `payment_status: paid` — not from any client-side call |
| User data in PDF URL (predictable download links) | URL enumeration allows accessing other users' PDFs | Use UUID-based signed URLs with short expiry (1 hour); never put user identifiers in the PDF filename or path |

---

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Quiz starts with hard demographic questions (age, family situation) | Users feel interrogated before they feel seen; bounce rate spikes on question 1 | Open with emotionally resonant questions that feel like an interesting reflection, not a form. Save demographics for mid-quiz when trust is established. |
| All 20-30 questions feel identical in structure | Cognitive fatigue; users start answering randomly | Vary question types: multi-select, single-select, scale, reflection prompt, image-based. Break with "Did you know?" insight moments every 4-5 questions. |
| Free result page shows only archetype name and one-line description | User feels tricked into completing a long quiz for almost nothing; will not pay | Free result page must show: archetype name, 3-4 paragraph resonance description, specific strengths, one specific watchout, and a clear preview of what the full PDF contains. |
| PDF opens to a full-bleed design with no readable text on page 1 | User's first impression is aesthetic rather than personally meaningful | Page 1 of PDF must immediately say the user's name, their archetype, and one sentence that is unmistakably personal to their quiz answers. Credibility before beauty. |
| No progress indicator on a 20+ question quiz | Users don't know how much is left; anxiety builds; drop-off accelerates | Show progress indicator from question 1. Non-linear bars that advance faster early perform better than linear ones — they maintain motivation. |
| Cultural background asked in a generic dropdown | Asian users select "Asian" and get an un-personalized output | Ask cultural background as a free-text-assisted field plus specific sub-selections. Use the answer explicitly in AI content generation to create genuine cultural specificity. |
| Mobile quiz with multi-option questions using small checkboxes | Fat-finger errors, frustration, loss of trust in results | Use large tap targets (minimum 44x44px per Apple HIG). Single-question-per-screen layout. No checkboxes — use card-style selectors. |

---

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Quiz completion:** Often shows 100% complete but the scoring logic hasn't been validated against Sophia's archetype framework — verify the archetype assignment matches clinical intent for 20+ simulated answer sets before launch.
- [ ] **PDF generation:** Often looks like it works in local dev but Puppeteer or react-pdf silently fails in Vercel production due to function timeout or missing fonts — test in the deployed environment before launch.
- [ ] **Payment flow:** Often appears complete but the Stripe webhook signature verification is missing or the success URL is being used as the trigger instead of the webhook — verify with a Stripe CLI test event that includes a simulated failure.
- [ ] **Email delivery:** Often appears to work (email sent, no error) but the email lands in spam in Gmail, or the PDF link is broken, or the email body has placeholder text — test delivery to Gmail, Outlook, and Apple Mail with a real address.
- [ ] **AI content quality:** Often appears "good enough" in internal review because reviewers know the answers and can connect the dots — test with a blind reviewer who reads only the PDF without seeing the quiz answers and rates specificity.
- [ ] **RLS policies:** Often appear enabled but were tested in the SQL editor — verify by making an API call with an anon key and confirming you cannot read another session's quiz responses.
- [ ] **Mobile experience:** Often looks fine on desktop DevTools mobile emulation but has fat-finger issues, keyboard-covering-input bugs, or slow performance on real devices — test on physical iPhone and Android before launch.
- [ ] **Rate limit handling:** Often appears fine in development (one developer, one request at a time) but fails on launch day — verify Kimi API tier limits and confirm queue behavior under simulated concurrent load.

---

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| PDF delivery failure post-launch | MEDIUM | Add manual PDF regeneration admin endpoint immediately; proactively email affected users; extend download link expiry; add dead letter queue monitoring |
| AI content feels generic — user complaints | HIGH | Emergency prompt engineering sprint; re-generate and re-deliver PDFs to affected users; update quality bar in internal review process; consider human-reviewed sample PDFs for first 50 users |
| Archetype scoring producing implausible results | HIGH | Feature-flag quiz and halt new PDF generation; Sophia reviews scoring logic against framework; rebuild scoring weights; manually validate 30 edge cases before re-enabling |
| RLS misconfiguration exposes user data | CRITICAL | Immediately enable RLS; rotate all API keys; audit access logs; notify affected users per data breach requirements; legal review |
| Kimi API rate limits blocking generation | LOW | Enable queue (should exist from day one); increase API tier; implement retry with backoff; set user expectation to async delivery |
| Stripe webhook failures causing missed deliveries | MEDIUM | Enable Stripe webhook retry in dashboard; build idempotent webhook handler that can re-process; add webhook delivery monitoring |

---

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Quiz drop-off at commitment gate | Quiz architecture and UX design phase | A/B test free result page variants; track result page scroll depth and CTA click rate |
| AI content feels generic | AI content generation phase (prompt engineering) | Blind review: 5 PDFs reviewed by someone who hasn't seen the quiz answers; all 5 must feel "written for me" |
| Quiz fatigue from depth without momentum | Quiz UX phase (before implementation) | Usability test with 5 target users timing each section; no section should feel "tedious" |
| PDF delivery failure | Payment and delivery integration phase | Load test: simulate 10 concurrent payments and verify all PDFs generated and delivered |
| Credibility theater | Content design phase (pre-quiz build) | Spot check: every archetype page must name at least 2 researchers; PDF must have 3+ citations |
| Payment context break | Payment integration phase | Convert rate tracking from result page → Stripe → success page; identify where abandonment occurs |
| Archetype scoring implausible results | Archetype framework development phase (prerequisite) | Sophia validation: reviews 30 simulated answer sets; zero implausible assignments allowed at launch |
| Supabase RLS disabled | Database setup phase (sprint 1) | Security audit: attempt to read quiz_responses with anon key from browser console; must return empty |
| Moonshot AI rate limits | AI integration phase | Simulate 20 concurrent PDF generation requests; all must complete or queue correctly |
| Stripe webhook not verified | Payment integration phase | Attempt to hit webhook endpoint with invalid signature; must return 400 and not trigger PDF generation |

---

## Sources

- Quiz completion benchmarks and drop-off rates: [Interact Quiz Conversion Rate Report 2026](https://www.tryinteract.com/blog/quiz-conversion-rate-report/) — MEDIUM confidence (industry platform data)
- Quiz question count and momentum architecture: [LeadShook — How Many Questions Should Your Quiz Funnel Really Have?](https://www.leadshook.com/blog/how-many-questions-quiz/) — MEDIUM confidence
- Quiz funnel mistakes: [ScoreApp — 9 Quiz Funnel Mistakes](https://www.scoreapp.com/quiz-funnel-mistakes/) — MEDIUM confidence
- Mobile quiz UX: [OptiMonk — Quiz Funnel Examples](https://www.optimonk.com/quiz-funnel-examples/) — LOW confidence (single practitioner source)
- Progress bar psychology: Outgrow quiz engagement benchmarks — MEDIUM confidence
- Checkout friction and abandonment: [Stripe — Reduce Friction Guide](https://stripe.com/resources/more/the-checkout-process-how-businesses-can-reduce-friction-and-boost-conversion) — HIGH confidence (official Stripe documentation)
- Apple Pay conversion lift: Stripe blog — HIGH confidence (official Stripe data)
- Supabase RLS pitfalls: [ProsperaSoft — RLS Misconfigurations](https://prosperasoft.com/blog/database/supabase/supabase-rls-issues/) + [DesignRevision Complete RLS Guide 2026](https://designrevision.com/blog/supabase-row-level-security) — MEDIUM confidence
- Supabase RLS 83% stat: Community-reported from January 2025 Lovable app exposure incident — LOW confidence (verify independently)
- Moonshot AI Kimi rate limits: [Moonshot AI Pricing/Limits](https://platform.moonshot.ai/docs/pricing/limits) — MEDIUM confidence (documentation current as of research date; verify before launch)
- PDF generation pitfalls in Next.js: [Joyfill — PDF generation tips & gotchas](https://joyfill.io/blog/integrating-pdf-generation-into-node-js-backends-tips-gotchas) + Medium articles on Puppeteer + Next.js — MEDIUM confidence
- AI hallucination trust damage: [MIT Sloan — Addressing AI Hallucinations](https://mitsloanedtech.mit.edu/ai/basics/addressing-ai-hallucinations-and-bias/) — HIGH confidence (academic/institutional source)
- Email deliverability with PDF: [Mailgun deliverability guide 2025](https://www.mailgun.com/blog/deliverability/improve-your-email-delivery-rate/) — MEDIUM confidence
- Trust signals and credibility: [Stripe checkout best practices](https://stripe.com/resources/more/checkout-screen-best-practices) + [CrazyEgg trust signals](https://www.crazyegg.com/blog/trust-signals/) — MEDIUM confidence
- Paywall psychology (free teaser vs. gated): [Airbridge hard vs. soft paywalls](https://www.airbridge.io/blog/hard-vs-soft-paywalls) + RevenueCat conversion boosters — MEDIUM confidence

---

*Pitfalls research for: personalized quiz-to-premium-PDF parenting assessment (Your Parenting Blueprint)*
*Researched: 2026-02-23*
