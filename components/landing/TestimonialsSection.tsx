"use client";

import { ff, ffSerif, p, shadow } from "@/lib/landing/palette";

const ROW_1 = [
  {
    quote:
      "I cried reading my result. Not because it was painful — but because I finally had words for something I've carried my whole life.",
    name: "Sarah",
    detail: "34, teacher",
    bg: p.pink.light,
    color: p.pink.dark,
  },
  {
    quote:
      "I sent this to my sister. We both got the same archetype. We spent three hours on the phone that night.",
    name: "Michael",
    detail: "41, designer",
    bg: p.mint.light,
    color: p.mint.dark,
  },
  {
    quote:
      "I've been in therapy for years and this captured something my therapist and I have been circling around for months.",
    name: "Priya",
    detail: "29, grad student",
    bg: p.butter.light,
    color: p.butter.dark,
  },
  {
    quote:
      "The part about 'emotional over-responsibility' hit me so hard. That's been my pattern in every relationship.",
    name: "Emma",
    detail: "37, consultant",
    bg: p.blue.light,
    color: p.blue.dark,
  },
  {
    quote:
      "I took this expecting a Buzzfeed quiz. I got something that genuinely made me rethink how I show up as a parent.",
    name: "David",
    detail: "45, father of two",
    bg: p.pink.light,
    color: p.pink.dark,
  },
];

const ROW_2 = [
  {
    quote:
      "I've never felt so seen by something on the internet. The cultural overlay was spot-on.",
    name: "Yuki",
    detail: "32, product manager",
    bg: p.mint.light,
    color: p.mint.dark,
  },
  {
    quote:
      "My husband and I took it separately. The differences in our results explained arguments we've been having for a decade.",
    name: "Olivia",
    detail: "38, mother of three",
    bg: p.butter.light,
    color: p.butter.dark,
  },
  {
    quote:
      "15 minutes. That's all it took to understand something I've spent 15 years avoiding.",
    name: "Jake",
    detail: "36, writer",
    bg: p.blue.light,
    color: p.blue.dark,
  },
  {
    quote:
      "I didn't expect a free tool to be this accurate. The watchouts section was uncomfortable in the best way.",
    name: "Aisha",
    detail: "31, psychologist",
    bg: p.pink.light,
    color: p.pink.dark,
  },
  {
    quote:
      "This is what I wish someone had given me before I became a parent.",
    name: "Rachel",
    detail: "40, mother",
    bg: p.mint.light,
    color: p.mint.dark,
  },
];

function MarqueeRow({
  items,
  direction,
}: {
  items: typeof ROW_1;
  direction: "left" | "right";
}) {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="marquee-track overflow-hidden">
      <div
        className={
          direction === "left" ? "marquee-scroll-left" : "marquee-scroll-right"
        }
        style={{ display: "flex", gap: "12px", width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="hover-lift flex-shrink-0"
            style={{
              width: "340px",
              padding: "24px 28px",
              borderRadius: "20px",
              background: `linear-gradient(180deg, ${item.bg}dd 0%, ${item.bg} 100%)`,
              boxShadow: shadow.card,
            }}
          >
            <p
              className="text-sm leading-relaxed mb-4"
              style={{
                fontFamily: ffSerif,
                fontStyle: "italic",
                color: item.color,
              }}
            >
              &ldquo;{item.quote}&rdquo;
            </p>
            <div className="flex items-center gap-2">
              {/* Avatar initial */}
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              >
                <span
                  style={{
                    fontFamily: ff,
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    color: item.bg,
                    lineHeight: 1,
                  }}
                >
                  {item.name[0]}
                </span>
              </div>
              <div>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: ff,
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  {item.name}
                </p>
                <p
                  className="text-[10px]"
                  style={{
                    fontFamily: ff,
                    fontWeight: 400,
                    color: item.color,
                    opacity: 0.55,
                  }}
                >
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10 mb-10">
        {/* Label */}
        <p
          className="uppercase tracking-[0.2em] text-xs mb-4"
          style={{
            fontFamily: ff,
            fontWeight: 600,
            color: p.pink.dark,
            opacity: 0.6,
          }}
        >
          What people say
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl leading-tight tracking-tight">
          <span
            style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}
          >
            Moments of{" "}
          </span>
          <span
            style={{
              fontFamily: ffSerif,
              fontStyle: "italic",
              fontWeight: 400,
              color: p.pink.dark,
            }}
          >
            recognition
          </span>
        </h2>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW_1} direction="left" />
        <MarqueeRow items={ROW_2} direction="right" />
      </div>
    </section>
  );
}
