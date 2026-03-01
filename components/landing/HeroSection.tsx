import Link from "next/link";
import { ff, ffSerif, p } from "@/lib/landing/palette";

const pills = [
  { label: "Free", bg: p.pink.light, color: p.pink.dark },
  { label: "15 min", bg: p.mint.light, color: p.mint.dark },
  { label: "Research-backed", bg: p.blue.light, color: p.blue.dark },
];

const stats = [
  { n: "9", label: "Archetypes mapped", bg: p.mint.light, color: p.mint.dark },
  { n: "11", label: "Dimensions analyzed", bg: p.blue.light, color: p.blue.dark },
];

const colorDots = [p.pink.light, p.mint.light, p.butter.light, p.blue.light];

export function HeroSection() {
  return (
    <section className="relative z-10 px-4 md:px-10 pb-6 pt-2">
      <div className="grid grid-cols-12 gap-3 max-w-7xl mx-auto min-h-[calc(100vh-120px)]">
        {/* Left — solid butter hero card */}
        <div
          className="col-span-12 lg:col-span-7 px-8 md:px-12 py-10 md:py-14 flex flex-col justify-between"
          style={{
            backgroundColor: p.butter.light,
            borderRadius: "24px",
          }}
        >
          <div>
            <div className="flex gap-2 mb-10 flex-wrap">
              {pills.map((pill) => (
                <span
                  key={pill.label}
                  className="px-4 py-1.5 text-xs"
                  style={{
                    fontFamily: ff,
                    fontWeight: 600,
                    backgroundColor: pill.bg,
                    color: pill.color,
                    borderRadius: "100px",
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-8xl leading-[0.92] tracking-tight">
              <span style={{ fontFamily: ff, fontWeight: 800, color: p.butter.dark }}>Finally</span>
              <br />
              <span
                style={{
                  fontFamily: ffSerif,
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: p.pink.dark,
                }}
              >
                see what
              </span>
              <br />
              <span style={{ fontFamily: ff, fontWeight: 800, color: p.butter.dark }}>
                shaped you.
              </span>
            </h1>
          </div>

          <div className="mt-10">
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ fontFamily: ff, color: p.butter.dark, opacity: 0.55 }}
            >
              Understand how the parenting you received shapes who you are today.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/quiz">
                <span
                  className="px-8 py-4 text-sm cursor-pointer inline-flex items-center"
                  style={{
                    fontFamily: ff,
                    fontWeight: 700,
                    backgroundColor: p.blue.dark,
                    color: "#F0EDE8",
                    borderRadius: "16px",
                    minHeight: "44px",
                  }}
                >
                  Take The Mirror
                </span>
              </Link>
              <Link href="#how-it-works">
                <span
                  className="px-8 py-4 text-sm cursor-pointer inline-flex items-center"
                  style={{
                    fontFamily: ff,
                    fontWeight: 500,
                    backgroundColor: "transparent",
                    color: p.butter.dark,
                    borderRadius: "16px",
                    border: `1.5px solid ${p.butter.dark}22`,
                    minHeight: "44px",
                  }}
                >
                  How it works
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right — solid pastel cards */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-3">
          {/* Quote — solid pink */}
          <div
            className="flex-1 px-8 py-8 flex flex-col justify-center"
            style={{ backgroundColor: p.pink.light, borderRadius: "24px" }}
          >
            <p
              className="text-xl md:text-2xl leading-snug mb-4"
              style={{ fontFamily: ffSerif, fontStyle: "italic", color: p.pink.dark }}
            >
              &ldquo;I always sensed this about how I was raised.&rdquo;
            </p>
            <p
              className="text-sm"
              style={{ fontFamily: ff, fontWeight: 500, color: p.pink.dark, opacity: 0.5 }}
            >
              Now you&apos;ll have language for it.
            </p>
          </div>

          {/* Stats — solid fills */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="px-6 py-6 flex flex-col justify-between"
                style={{ backgroundColor: s.bg, borderRadius: "24px" }}
              >
                <p
                  className="text-4xl leading-none mb-3"
                  style={{ fontFamily: ff, fontWeight: 800, color: s.color }}
                >
                  {s.n}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: ff, fontWeight: 400, color: s.color, opacity: 0.6 }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Footer — dark */}
          <div
            className="px-6 py-5 flex items-center justify-between"
            style={{ backgroundColor: "#1A1A1A", borderRadius: "24px" }}
          >
            <div>
              <p
                className="text-xs mb-0.5"
                style={{ fontFamily: ff, fontWeight: 600, color: "#F0EDE8" }}
              >
                The Mirror by Kin
              </p>
              <p className="text-[10px]" style={{ fontFamily: ff, color: "#666" }}>
                Digital tools for parents who want to understand themselves.
              </p>
            </div>
            <div className="flex gap-1.5">
              {colorDots.map((c) => (
                <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
