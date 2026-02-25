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
];

export function FAQ() {
  return (
    <section className="bg-stone-50 py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-6">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 font-medium mb-4 text-center">
          Common questions
        </p>
        <h2
          className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight mb-12 text-center"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Before you begin
        </h2>

        <div className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-stone-200 pb-6 last:border-b-0">
              <h3 className="text-base font-semibold text-stone-900 mb-2">
                {faq.question}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
