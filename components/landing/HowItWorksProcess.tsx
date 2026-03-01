import { ff, ffDisplay, ffSerif, grad, p, shadow } from "@/lib/landing/palette";
import { ScrollReveal } from "./ScrollReveal";

const steps = [
  {
    step: "01",
    title: "Take the quiz",
    description:
      "21 questions grounded in research. Each one maps to a specific dimension of how parenting shapes development. Takes about 15 minutes.",
    bg: grad.butter.light,
    color: p.butter.dark,
  },
  {
    step: "02",
    title: "Get your Mirror",
    description:
      "Your responses reveal one of 9 distinct parenting archetypes. A personalised report that names the patterns you've always sensed.",
    bg: grad.pink.light,
    color: p.pink.dark,
  },
  {
    step: "03",
    title: "Understand your patterns",
    description:
      "See the strengths, tensions, and watchouts that grew from the parenting style you received. Finally have the language for it.",
    bg: grad.mint.light,
    color: p.mint.dark,
  },
];

export function HowItWorksProcess() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p
          className="uppercase tracking-[0.2em] text-xs mb-4"
          style={{ fontFamily: ff, fontWeight: 600, color: p.mint.dark }}
        >
          How it works
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>Three steps to </span>
          <span
            style={{
              fontFamily: ffSerif,
              fontStyle: "italic",
              fontWeight: 400,
              color: p.pink.dark,
            }}
          >
            understanding
          </span>
        </h2>

        {/* Subtext */}
        <p
          className="text-base mb-12 max-w-lg leading-relaxed"
          style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
        >
          No accounts. No payment. Just honest reflection grounded in decades of research.
        </p>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {steps.map((card, i) => (
            <ScrollReveal key={card.step} delay={i * 100} offset={20}>
              <div
                className="hover-lift flex flex-col justify-between px-8 py-10"
                style={{
                  background: card.bg,
                  borderRadius: "24px",
                  minHeight: "320px",
                  boxShadow: shadow.card,
                }}
              >
                <p
                  className="text-6xl leading-none mb-6"
                  style={{
                    fontFamily: ffDisplay,
                    fontWeight: 700,
                    color: card.color,
                    opacity: 0.5,
                  }}
                >
                  {card.step}
                </p>
                <div>
                  <p
                    className="text-xl mb-3"
                    style={{ fontFamily: ff, fontWeight: 800, color: card.color }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ fontFamily: ff, fontWeight: 400, color: card.color, opacity: 0.6 }}
                  >
                    {card.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
