import Link from "next/link";
import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";

export function FinalCTASection() {
  return (
    <section>
      {/* Conversion band — butter gradient background */}
      <div
        style={{
          background: grad.butter.light,
          borderTop: `1px solid ${p.butter.dark}20`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-24 md:py-32">
          <div className="flex flex-col items-center text-center">
            {/* Emotional callback heading */}
            <h2
              className="mb-6 max-w-2xl text-4xl md:text-5xl"
              style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.15 }}
            >
              Ready to see what{" "}
              <em
                style={{
                  fontFamily: ffSerif,
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: p.pink.dark,
                }}
              >
                shaped you
              </em>
              ?
            </h2>

            {/* Encouraging subtext */}
            <p
              className="mb-10 max-w-md text-base leading-relaxed"
              style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
            >
              15 minutes. 21 questions. A reflection that might finally put words to something
              you've always sensed.
            </p>

            {/* Primary CTA */}
            <Link
              href="/quiz"
              className="hover-btn inline-flex cursor-pointer items-center justify-center px-10 py-5 text-sm"
              style={{
                fontFamily: ff,
                fontWeight: 700,
                backgroundColor: p.blue.dark,
                color: "#fff",
                borderRadius: 16,
                minHeight: 44,
                boxShadow: shadow.button,
              }}
            >
              Take The Mirror
            </Link>

            {/* Footer line */}
            <div
              className="mt-16 border-t pt-8"
              style={{ borderColor: `${p.butter.dark}25`, width: "100%" }}
            >
              <p
                className="text-xs tracking-wide"
                style={{ fontFamily: ff, fontWeight: 600, color: "#AAA" }}
              >
                The Mirror by Kin &mdash; Free, always
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
