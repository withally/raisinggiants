import { ff, p } from "@/lib/landing/palette";

const FAQS = [
  {
    q: "Is this based on real science?",
    a: "Yes. Every question maps to one of 11 research-backed dimensions drawn from the work of John Gottman, Daniel Siegel, Mary Ainsworth, and other leading attachment and parenting researchers. The framework was developed in collaboration with a clinical psychologist specializing in family systems.",
  },
  {
    q: "How long does it take?",
    a: "About 15 minutes. There are 21 thoughtful questions about the parenting you received growing up. There's no timer — take as long as you need.",
  },
  {
    q: "Is it really free?",
    a: "Completely free. The Mirror is our core product — you'll see your full result with no paywall, no blurred content, and no hidden charges. We believe everyone deserves to understand themselves.",
  },
  {
    q: "What happens with my email?",
    a: "We ask for your email before showing your result so we can send you a copy. We'll never sell your data or spam you. You may occasionally hear from us about new tools — you can unsubscribe anytime.",
  },
  {
    q: "Who built this?",
    a: "Kin was created by a team that includes a clinical psychologist specializing in attachment theory and family systems. The framework draws on decades of peer-reviewed research to help you understand the parenting you received.",
  },
  {
    q: "What will I learn?",
    a: "You'll discover which of 9 parenting archetypes shaped your upbringing, along with the specific patterns, strengths, and watchouts that come with it — all personalized to your cultural background.",
  },
  {
    q: "Can I retake the quiz?",
    a: "The Mirror is designed as a one-time reflection. Your result is based on your genuine first responses, and retaking it tends to produce less authentic answers. Trust your initial instincts.",
  },
];

export function FAQSection() {
  return (
    <section style={{ backgroundColor: "#FAFAF7" }}>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-10 md:py-28">
        {/* Section label */}
        <p
          className="mb-3 text-xs uppercase tracking-widest"
          style={{ fontFamily: ff, fontWeight: 600, color: "#888" }}
        >
          Questions
        </p>

        {/* Section heading */}
        <h2
          className="mb-12 text-3xl md:text-4xl"
          style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
        >
          Before you start
        </h2>

        {/* FAQ container */}
        <div className="mx-auto max-w-3xl">
          {FAQS.map((faq) => (
            <details
              key={faq.q}
              className="group border-b"
              style={{ borderColor: `${p.blue.dark}1A` }}
            >
              <summary
                className="hover-faq-summary flex cursor-pointer list-none items-center justify-between py-5 px-3 -mx-3 rounded-xl"
                style={{ fontFamily: ff, fontWeight: 600, color: "#1A1A1A" }}
              >
                <span>{faq.q}</span>
                <span
                  className="ml-4 flex-shrink-0 text-sm transition-transform duration-200 group-open:rotate-180"
                  style={{ color: "#999" }}
                >
                  &#9662;
                </span>
              </summary>
              <p
                className="pb-5 px-3 text-sm leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: "#666" }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
