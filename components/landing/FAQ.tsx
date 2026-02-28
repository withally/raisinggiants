"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const faqs = [
  {
    question: "Will this tell me I\u2019m a bad parent?",
    answer:
      "No. The Mirror isn\u2019t a judgement \u2014 it\u2019s a reflection. It shows the patterns in the parenting you received, not a score on the parenting you give.",
  },
  {
    question: "Is this therapy?",
    answer:
      "No. The Mirror is a self-awareness tool, not a clinical assessment. It\u2019s designed to surface patterns and start conversations \u2014 not replace professional support.",
  },
  {
    question: "How accurate is a 5-minute quiz?",
    answer:
      "The Mirror draws on validated frameworks from Baumrind, Gottman, and Ainsworth. It\u2019s a structured reflection grounded in 60+ years of peer-reviewed science.",
  },
  {
    question: "Who sees my answers?",
    answer:
      "No one. Your responses are processed to generate your result and are never shared, sold, or linked to your identity.",
  },
  {
    question: "What if my childhood was complicated?",
    answer:
      "Most are. The Mirror is designed for nuance \u2014 it doesn\u2019t reduce your experience to a single label. Skip any question that feels like too much.",
  },
  {
    question: "What will you do with my email?",
    answer:
      "Send your archetype profile \u2014 that\u2019s it. No spam, no data sales, unsubscribe anytime.",
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
      <section className="bg-white py-24 lg:py-36">
        <div className="mx-auto max-w-3xl px-6 lg:px-16">
          <ScrollReveal>
            <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-[#002833] leading-tight mb-16">
              Before you begin
            </h2>
          </ScrollReveal>

          <div className="divide-y divide-[#E2E6E5]">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.question} delay={i * 80}>
                <div className="py-8 first:pt-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-[#002833] mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-base text-[#3A5A56] leading-relaxed">
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
