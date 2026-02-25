import Link from "next/link";

const steps = [
  {
    step: "01",
    name: "The Mirror",
    tagline: "See your patterns",
    description:
      "A 21-question reflection on the parenting you received — revealing the styles, patterns, and emotional environment that shaped your earliest sense of self.",
    active: true,
  },
  {
    step: "02",
    name: "The Blueprint",
    tagline: "Map your instincts",
    description:
      "Turn what The Mirror surfaces into a personalised map — where your instincts serve you, where they hold you back, and what you want to pass on.",
    active: false,
  },
  {
    step: "03",
    name: "Partner Match",
    tagline: "Align with your partner",
    description:
      "Bring two mirrors together. See where your upbringings align, where they differ, and build a shared parenting vision from that awareness.",
    active: false,
  },
];

export function ProductLadder() {
  return (
    <section className="bg-stone-900 py-20 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs tracking-[0.25em] uppercase text-amber-400 font-medium mb-4">
            The Journey
          </p>
          <h2
            className="text-4xl sm:text-5xl font-semibold text-stone-100 leading-tight max-w-2xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            It starts with seeing clearly.
          </h2>
          <p className="mt-4 text-stone-400 text-base leading-relaxed max-w-xl">
            The Mirror is your first step. What comes next builds on what you discover about yourself.
          </p>
        </div>

        {/* Journey steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className={`relative flex flex-col p-6 lg:p-8 transition-all duration-200 ${
                step.active
                  ? "bg-amber-950/40 border border-amber-800/50 rounded-2xl lg:rounded-r-none lg:rounded-l-2xl hover:bg-amber-950/60"
                  : "border border-stone-800/40 rounded-2xl lg:rounded-none last:lg:rounded-r-2xl"
              } ${index === 1 ? "lg:rounded-none" : ""}`}
            >
              {/* Step number + status */}
              <div className="flex items-center gap-3 mb-4">
                <p className={`text-3xl font-bold leading-none ${step.active ? "text-amber-500/60" : "text-stone-700"}`}>
                  {step.step}
                </p>
                {step.active ? (
                  <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30">
                    Start here — free
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-stone-800/60 px-3 py-1 text-xs font-medium text-stone-500">
                    Coming soon
                  </span>
                )}
              </div>

              {/* Product name — display font */}
              <h3
                className={`text-2xl font-semibold mb-1 ${step.active ? "text-stone-100" : "text-stone-400"}`}
                style={{ fontFamily: "var(--font-display)" }}
              >
                {step.name}
              </h3>

              {/* Tagline */}
              <p className={`text-sm font-medium mb-4 ${step.active ? "text-amber-300/80" : "text-stone-500"}`}>
                {step.tagline}
              </p>

              {/* Description */}
              <p className={`text-sm leading-relaxed flex-1 ${step.active ? "text-stone-400" : "text-stone-500/70"}`}>
                {step.description}
              </p>

              {/* CTA — only for active step */}
              {step.active && (
                <Link
                  href="/quiz"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200 min-h-[44px] w-full"
                >
                  Start The Mirror — free
                </Link>
              )}

              {/* Connector arrow — desktop only, not last item */}
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-stone-900 border border-stone-700 rounded-full items-center justify-center"
                  aria-hidden="true"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="text-stone-500"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 5h6M5 2l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
