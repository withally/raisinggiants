import Link from "next/link";

const products = [
  {
    step: "01",
    name: "The Mirror",
    tagline: "Understand your upbringing",
    description:
      "A 21-question reflection on the parenting you received — revealing the patterns, styles, and emotional environment that shaped your earliest sense of self.",
    status: "free" as const,
    cta: { label: "Start The Mirror", href: "/quiz" },
  },
  {
    step: "02",
    name: "The Blueprint",
    tagline: "Understand your tendencies and aspirations",
    description:
      "Take what The Mirror surfaces and turn it into a personalised map of your parenting instincts — where they serve you, where they hold you back, and what you want to pass on.",
    status: "coming-soon" as const,
    cta: null,
  },
  {
    step: "03",
    name: "Partner Match",
    tagline: "Have a dialogue with your partner",
    description:
      "Bring two mirrors together. Understand where you and your partner's upbringings align, where they differ, and how to build a shared parenting vision from that awareness.",
    status: "coming-soon" as const,
    cta: null,
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
            Three steps toward conscious parenting.
          </h2>
          <p className="mt-4 text-stone-400 text-base leading-relaxed max-w-xl">
            Self-awareness is the beginning. Every step deepens your understanding — of your past,
            your present, and the family you&apos;re building.
          </p>
        </div>

        {/* Product cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:divide-x lg:divide-stone-700">
          {products.map((product, index) => (
            <div
              key={product.step}
              className={`relative flex flex-col p-6 lg:p-8 transition-all duration-200 ${
                index === 0
                  ? "bg-amber-950/40 border border-amber-800/50 rounded-2xl lg:rounded-r-none lg:rounded-l-2xl hover:bg-amber-950/60"
                  : index === 1
                    ? "bg-stone-800/50 border border-stone-700/50 rounded-2xl lg:rounded-none hover:bg-stone-800/70"
                    : "bg-stone-800/30 border border-stone-700/30 rounded-2xl lg:rounded-l-none lg:rounded-r-2xl hover:bg-stone-800/50"
              }`}
            >
              {/* Step number */}
              <p className="text-4xl font-bold text-stone-600 mb-4 leading-none">{product.step}</p>

              {/* Status badge */}
              <div className="mb-3">
                {product.status === "free" ? (
                  <span className="inline-flex items-center rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300 ring-1 ring-amber-500/30">
                    Free
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-stone-700/60 px-3 py-1 text-xs font-medium text-stone-400 ring-1 ring-stone-600/30">
                    Coming Soon
                  </span>
                )}
              </div>

              {/* Product name — display font */}
              <h3
                className="text-2xl font-semibold text-stone-100 mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {product.name}
              </h3>

              {/* Tagline */}
              <p className="text-sm text-amber-300/80 font-medium mb-4">{product.tagline}</p>

              {/* Description */}
              <p className="text-sm text-stone-400 leading-relaxed flex-1 mb-6">
                {product.description}
              </p>

              {/* CTA */}
              {product.cta ? (
                <Link
                  href={product.cta.href}
                  className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-900 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-200 min-h-[44px] w-full"
                >
                  {product.cta.label}
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center rounded-full border border-stone-600 px-6 py-3 text-sm text-stone-500 min-h-[44px] w-full cursor-default select-none">
                  Notify me
                </div>
              )}

              {/* Connector arrow — desktop only, not last item */}
              {index < products.length - 1 && (
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
