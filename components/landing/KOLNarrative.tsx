import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const highlights = [
  {
    name: "Mary Ainsworth",
    year: "1978",
    discovery:
      "Discovered that securely attached children don't just feel safer — they explore more, risk more, and recover faster.",
    quote:
      "The most important thing a parent can give a child is a secure base from which to explore the world.",
    mirrorConnection:
      "This is why The Mirror measures emotional availability — not just what your parents did, but how safe you felt.",
  },
  {
    name: "Diana Baumrind",
    year: "1967",
    discovery:
      "Proved that parenting falls into distinct styles — not by what parents intend, but by what children experience.",
    quote:
      "Children who are raised with both warmth and clear boundaries don't just behave better — they develop stronger self-regulation, deeper empathy, and more resilient self-worth.",
    mirrorConnection:
      "The Mirror maps the balance of warmth and structure you grew up with — the two dimensions Baumrind showed matter most.",
  },
  {
    name: "Bessel van der Kolk",
    year: "2014",
    discovery:
      "Showed that the body remembers what the mind forgets — and that unprocessed childhood experiences shape adult reactions decades later.",
    quote:
      "Being able to feel safe with other people is probably the single most important aspect of mental health.",
    mirrorConnection:
      "The Mirror surfaces patterns you may feel in your body before you can name them — the tension, the withdrawal, the over-correction.",
  },
  {
    name: "John Gottman",
    year: "1997",
    discovery:
      "Found that parents who coach children through emotions — rather than dismissing or punishing them — raise adults with stronger relationships.",
    quote:
      "In the last decade we have discovered that it is not enough to be a warm and engaged parent. We also need to be emotion coaches.",
    mirrorConnection:
      "The Mirror measures how emotions were handled in your home — and reveals the coaching style you absorbed.",
  },
];

export function KOLNarrative() {
  return (
    <section className="bg-amber-50 pb-20 lg:pb-28">
      <div className="mx-auto max-w-3xl px-6">
        <div className="border-t border-amber-200/60 pt-14">
          <ScrollReveal>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-700 font-medium mb-8 text-center">
              Why this research matters for you
            </p>
          </ScrollReveal>

          <div className="space-y-10">
            {highlights.map((h, i) => (
              <ScrollReveal key={h.name} delay={i * 120}>
                <div className="group">
                  {/* Quote */}
                  <blockquote className="relative pl-5 border-l-2 border-amber-300 mb-4">
                    <p className="text-lg sm:text-xl text-stone-700 leading-relaxed italic font-display">
                      &ldquo;{h.quote}&rdquo;
                    </p>
                    <footer className="mt-2 text-sm text-stone-500 not-italic">
                      — {h.name}, {h.year}
                    </footer>
                  </blockquote>

                  {/* Discovery + Mirror connection */}
                  <p className="text-sm text-stone-500 leading-relaxed mb-1.5">
                    {h.discovery}
                  </p>
                  <p className="text-sm text-amber-700/80 leading-relaxed font-medium">
                    {h.mirrorConnection}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA — catch intent at peak curiosity */}
          <ScrollReveal delay={200} className="mt-12 pt-10 border-t border-amber-200/60 text-center">
            <p className="text-sm text-stone-500 mb-4">
              See which patterns shaped you — and which ones you&apos;re
              carrying forward.
            </p>
            <Link
              href="/quiz"
              className="inline-flex items-center justify-center rounded-full bg-stone-900 px-8 py-4 text-base font-semibold text-amber-50 shadow-md hover:bg-stone-700 hover:shadow-lg transition-all duration-200 min-h-[52px]"
            >
              Find your archetype — it&apos;s free
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
