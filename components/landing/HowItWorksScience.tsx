import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";
import { ScrollReveal } from "./ScrollReveal";

const stats = [
  {
    n: "11",
    label: "Research-backed dimensions",
    numberColor: p.mint.light,
  },
  {
    n: "9",
    label: "Distinct parenting archetypes",
    numberColor: p.pink.light,
  },
  {
    n: "100+",
    label: "Published studies referenced",
    numberColor: p.butter.light,
  },
];

export function HowItWorksScience() {
  return (
    <section className="py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p
          className="uppercase tracking-[0.2em] text-xs mb-4"
          style={{ fontFamily: ff, fontWeight: 600, color: p.blue.dark, opacity: 0.5 }}
        >
          The science
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>Grounded in </span>
          <span
            style={{
              fontFamily: ffSerif,
              fontStyle: "italic",
              fontWeight: 400,
              color: p.pink.dark,
            }}
          >
            decades
          </span>
          <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}> of research</span>
        </h2>

        {/* Body */}
        <p
          className="text-base mb-12 max-w-lg leading-relaxed"
          style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
        >
          Every question in The Mirror maps to one of 11 research-backed dimensions of parenting
          style. Those dimensions combine to reveal one of 9 distinct parenting archetypes — each
          grounded in peer-reviewed developmental psychology.
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100} offset={20}>
              <div
                className="hover-lift px-6 py-6 flex flex-col justify-between"
                style={{
                  background: grad.blue.dark,
                  borderRadius: "24px",
                  minHeight: "140px",
                  boxShadow: shadow.cardDark,
                }}
              >
                <p
                  className="text-5xl leading-none mb-3"
                  style={{ fontFamily: ff, fontWeight: 800, color: stat.numberColor }}
                >
                  {stat.n}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: ff, fontWeight: 400, color: "rgba(255,255,255,0.45)" }}
                >
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
