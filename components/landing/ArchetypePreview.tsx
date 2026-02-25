import Link from "next/link";

const archetypes = [
  "The Steady Anchor",
  "The Fierce Guardian",
  "The Gentle Nurturer",
  "The Intentional Guide",
  "The Resilient Striver",
  "The Structured Mentor",
  "The Open-Hearted Learner",
  "The Devoted Champion",
  "The Collaborative Ally",
];

export function ArchetypePreview() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Section intro */}
          <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-4">
            What you&apos;ll discover
          </p>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-stone-900 leading-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Which of the 9 parenting archetypes shaped you?
          </h2>
          <p className="text-base text-stone-500 leading-relaxed mb-10 max-w-xl mx-auto">
            The Mirror maps the parenting you received to a research-backed archetype — revealing
            the patterns you absorbed and how they still show up in your life.
          </p>

          {/* Archetype name cloud */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {archetypes.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50/60 px-4 py-2 text-sm text-stone-700 transition-colors hover:border-amber-400 hover:bg-amber-50"
              >
                {name}
              </span>
            ))}
          </div>

          {/* Sample question preview */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-left">
            <p className="text-xs uppercase tracking-wider text-stone-400 font-medium mb-3">
              Sample question
            </p>
            <p
              className="text-lg sm:text-xl text-stone-800 leading-relaxed mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              When you were upset as a child — really upset — how often did a parent sit with you
              and let you know you weren&apos;t alone?
            </p>
            <div className="space-y-2">
              {[
                "Almost always — they'd come find me",
                "Sometimes, but I often worked through things alone",
                "Rarely — I mostly kept it to myself",
              ].map((option) => (
                <div
                  key={option}
                  className="rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-500"
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10">
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-4 text-base font-semibold text-amber-50 shadow-md hover:bg-stone-700 hover:shadow-lg transition-all duration-200 min-h-[52px]"
            >
              Find your archetype
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
