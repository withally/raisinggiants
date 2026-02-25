const quotes = [
  {
    text: "I always knew something felt off about my childhood. Seeing it mapped out made it real — and somehow, less scary.",
    name: "Sarah",
    age: 34,
  },
  {
    text: "My partner and I took it separately and then compared. Best conversation we've had in years.",
    name: "Marcus",
    age: 29,
  },
  {
    text: "Five minutes to take. Took me three days to stop thinking about my result.",
    name: "Priya",
    age: 31,
  },
];

export function SocialProof() {
  return (
    <section className="bg-stone-50 py-14 lg:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Counter */}
        <p className="text-center mb-10">
          <span
            className="text-3xl sm:text-4xl font-semibold text-stone-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            2,847 people
          </span>
          <span className="block sm:inline sm:ml-2 text-base text-stone-500">
            have already taken The Mirror
          </span>
        </p>

        {/* Quotes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quotes.map((quote) => (
            <div
              key={quote.name}
              className="relative bg-white border border-stone-200 rounded-xl p-5 shadow-sm"
            >
              <p className="text-sm text-stone-600 leading-relaxed italic mb-3">
                &ldquo;{quote.text}&rdquo;
              </p>
              <p className="text-xs text-stone-400 font-medium">
                — {quote.name}, {quote.age}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
