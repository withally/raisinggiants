"use client";

import Image from "next/image";
import { ff, ffSerif, p, shadow } from "@/lib/landing/palette";

const ROW_1 = [
  {
    quote:
      "I'm The Gentle Nurturer. I cried reading my result — not because it was painful, but because I finally had words for something I've carried my whole life.",
    name: "Sarah",
    detail: "34, teacher",
    photo: "/images/testimonial-sarah.jpg",
    bg: p.pink.light,
    color: p.pink.dark,
  },
  {
    quote:
      "I sent this to my sister. We both got The Steady Anchor. We spent three hours on the phone that night talking about mum.",
    name: "Michael",
    detail: "41, designer",
    photo: "/images/testimonial-michael.jpg",
    bg: p.mint.light,
    color: p.mint.dark,
  },
  {
    quote:
      "I've been in therapy for years and this captured something my therapist and I have been circling around for months. The Resilient Striver profile was eerily accurate.",
    name: "Priya",
    detail: "29, grad student",
    photo: "/images/testimonial-priya.jpg",
    bg: p.butter.light,
    color: p.butter.dark,
  },
  {
    quote:
      "The watchout about 'emotional over-responsibility' hit me so hard. As a Fierce Guardian, that's been my pattern in every relationship.",
    name: "Emma",
    detail: "37, consultant",
    photo: "/images/testimonial-emma.jpg",
    bg: p.blue.light,
    color: p.blue.dark,
  },
  {
    quote:
      "I took this expecting a Buzzfeed quiz. I got The Devoted Champion and it genuinely made me rethink how I show up as a parent.",
    name: "David",
    detail: "45, father of two",
    photo: "/images/testimonial-david.jpg",
    bg: p.pink.light,
    color: p.pink.dark,
  },
];

const ROW_2 = [
  {
    quote:
      "I've never felt so seen by something on the internet. I'm The Intentional Guide — and the cultural overlay for my East Asian background was spot-on.",
    name: "Yuki",
    detail: "32, product manager",
    photo: "/images/testimonial-yuki.jpg",
    bg: p.mint.light,
    color: p.mint.dark,
  },
  {
    quote:
      "My husband got The Structured Mentor, I got The Gentle Nurturer. The differences explained arguments we've been having for a decade.",
    name: "Olivia",
    detail: "38, mother of three",
    photo: "/images/testimonial-olivia.jpg",
    bg: p.butter.light,
    color: p.butter.dark,
  },
  {
    quote:
      "15 minutes. That's all it took to understand something I've spent 15 years avoiding.",
    name: "Jake",
    detail: "36, writer",
    photo: "/images/testimonial-jake.jpg",
    bg: p.blue.light,
    color: p.blue.dark,
  },
  {
    quote:
      "I didn't expect a free tool to be this accurate. The watchouts section for The Open-Hearted Learner was uncomfortable in the best way.",
    name: "Aisha",
    detail: "31, psychologist",
    photo: "/images/testimonial-aisha.jpg",
    bg: p.pink.light,
    color: p.pink.dark,
  },
  {
    quote:
      "I'm The Collaborative Ally. This is what I wish someone had given me before I became a parent.",
    name: "Rachel",
    detail: "40, mother",
    photo: "/images/testimonial-rachel.jpg",
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
              {/* Avatar photo */}
              <div
                className="flex-shrink-0"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `1.5px solid ${item.color}33`,
                }}
              >
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={32}
                  height={32}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
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
    <section id="testimonials" className="py-20 md:py-28 overflow-hidden">
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
