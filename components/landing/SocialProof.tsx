import { CountUp } from "@/components/ui/count-up";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HandDrawnQuoteMark } from "@/components/ui/hand-drawn";

const quotes = [
  {
    text: "I always knew something felt off about my childhood. Seeing it mapped out made it real — and somehow, less scary.",
    attribution: "Sarah, 34 · Melbourne",
  },
  {
    text: "My partner and I took it separately and then compared. Best conversation we've had in years.",
    attribution: "Marcus, 29 · first-time dad",
  },
  {
    text: "Five minutes to take. Took me three days to stop thinking about my result.",
    attribution: "Priya, 31 · Singapore",
  },
];

export function SocialProof() {
  return (
    <section className="bg-[#F5F4F2] py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Counter — display font, bold, dramatic scale */}
        <div className="text-center mb-12">
          <p className="mb-1">
            <CountUp
              target={2847}
              className="text-4xl sm:text-5xl font-bold text-[#1A1008] font-display"
            />
          </p>
          <p className="text-base text-[#8A7A66]">
            people have already taken The Mirror
          </p>
        </div>

        {/* Quotes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {quotes.map((quote, i) => (
            <ScrollReveal key={quote.attribution} delay={i * 150}>
              <div className="relative bg-white/80 border border-[#E8E4DF]/60 rounded-2xl p-5 shadow-sm h-full">
                <HandDrawnQuoteMark color="rgba(107,30,46,0.4)" className="mb-2" />
                <p className="text-sm text-[#8A7A66] leading-relaxed italic mb-3">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <p className="text-xs text-[#8A7A66] font-medium">
                  — {quote.attribution}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Subtle CTA */}
        <ScrollReveal delay={500} className="text-center mt-10">
          <a
            href="/quiz"
            className="inline-flex items-center gap-2 text-[#1A1008] font-medium hover:text-[#0D3D3A] transition-colors"
          >
            See what yours reveals
            <span aria-hidden="true">&rarr;</span>
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
