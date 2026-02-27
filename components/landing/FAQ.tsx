import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "Will this tell me I'm a bad parent?",
    answer:
      "No. The Mirror isn't a judgement — it's a reflection. It shows the patterns in the parenting you received, not a score on the parenting you give. Most people find it validating, not critical.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. The Mirror is a self-awareness tool, not a clinical assessment or therapeutic intervention. It's designed to surface patterns and start conversations — not replace professional support.",
  },
  {
    question: "How accurate is a 5-minute quiz?",
    answer:
      "The Mirror draws on validated frameworks from researchers like Baumrind, Gottman, and Ainsworth. It's not a clinical diagnosis — it's a structured reflection grounded in 60+ years of peer-reviewed parenting science.",
  },
  {
    question: "Who sees my answers?",
    answer:
      "No one. Your responses are processed to generate your result and are not shared, sold, or linked to your identity. You don't even need an account to take it.",
  },
  {
    question: "What if my childhood was complicated?",
    answer:
      "Most childhoods are. The Mirror is designed for nuance — it doesn't reduce your experience to a single label. If any question feels too much, you can skip it.",
  },
  {
    question: "What will you do with my email?",
    answer:
      "We'll send your archetype profile to the email you provide — that's it. We don't sell data, send spam, or share your information with anyone. You can unsubscribe at any time.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export function FAQ() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="bg-[#F5F4F2] py-16 lg:py-24">
        <div className="mx-auto max-w-2xl px-6">
          <ScrollReveal>
            <p className="text-xs tracking-[0.25em] uppercase text-[#8A7A66] font-medium mb-4 text-center">
              Common questions
            </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1008] leading-tight mb-12 text-center font-display">
              Before you begin
            </h2>
          </ScrollReveal>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.question} delay={i * 100}>
                <div className="border-b border-[#E8E4DF] pb-6 last:border-b-0">
                  <h3 className="text-base font-semibold text-[#1A1008] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-[#8A7A66] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
