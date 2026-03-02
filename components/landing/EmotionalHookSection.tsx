"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ff, ffSerif, p } from "@/lib/landing/palette";

const RESEARCHER_QUOTES = [
  {
    quote:
      "The patterns from your childhood don\u2019t disappear. They just become invisible.",
    name: "Daniel Siegel",
    field: "Interpersonal Neurobiology",
    image: "/images/researcher-siegel.jpg",
  },
  {
    quote:
      "Children don\u2019t need perfect parents. They need parents who can repair.",
    name: "Becky Kennedy",
    field: "Clinical Psychology",
  },
  {
    quote:
      "What children need most is to know that their feelings matter to the people who matter most.",
    name: "John Gottman",
    field: "Relationship Research",
    image: "/images/researcher-gottman.jpg",
  },
  {
    quote:
      "The greatest thing a parent can give a child is the freedom to be themselves.",
    name: "Shefali Tsabary",
    field: "Conscious Parenting",
  },
  {
    quote:
      "A secure base isn\u2019t a place. It\u2019s a person who makes the world feel safe enough to explore.",
    name: "John Bowlby",
    field: "Attachment Theory",
  },
  {
    quote:
      "The body keeps the score. What happens to us as children lives in us long after we leave home.",
    name: "Bessel van der Kolk",
    field: "Developmental Trauma",
    image: "/images/researcher-vanderkolk.jpg",
  },
  {
    quote:
      "It\u2019s not the moments of disconnection that define us. It\u2019s whether repair follows.",
    name: "Edward Tronick",
    field: "Developmental Psychology",
  },
  {
    quote:
      "When a child becomes the caretaker, something essential about childhood is quietly lost.",
    name: "Gregory Jurkovic",
    field: "Family Systems",
  },
];

const AVATAR_SIZE = 48;

export function EmotionalHookSection() {
  const [index, setIndex] = useState(0);
  const autoRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const resetAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % RESEARCHER_QUOTES.length);
    }, 6000);
  }, []);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  const goTo = useCallback(
    (next: number) => {
      setIndex(next);
      resetAuto();
    },
    [resetAuto],
  );

  /* ── Touch / swipe ── */
  const onTouchStart = (e: React.TouchEvent) => {
    touchRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchRef.current) return;
    const dx = e.changedTouches[0].clientX - touchRef.current.x;
    const dy = e.changedTouches[0].clientY - touchRef.current.y;
    touchRef.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dy) > Math.abs(dx)) return;
    if (dx < 0) {
      goTo((index + 1) % RESEARCHER_QUOTES.length);
    } else {
      goTo(
        (index - 1 + RESEARCHER_QUOTES.length) % RESEARCHER_QUOTES.length,
      );
    }
  };

  return (
    <section className="relative z-10 py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* ── Sliding track ── */}
        <div
          className="overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex flex-row-reverse"
            style={{
              transform: `translateX(${index * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {RESEARCHER_QUOTES.map((q) => (
              <div key={q.name} className="w-full shrink-0 pr-8">
                {/* Quote */}
                <p
                  className="text-3xl md:text-4xl lg:text-5xl leading-snug tracking-tight mb-6 max-w-3xl"
                  style={{
                    fontFamily: ffSerif,
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: p.pink.dark,
                  }}
                >
                  &ldquo;{q.quote}&rdquo;
                </p>

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  {q.image ? (
                    <div
                      className="shrink-0 overflow-hidden"
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: "50%",
                      }}
                    >
                      <Image
                        src={q.image}
                        alt={q.name}
                        width={AVATAR_SIZE}
                        height={AVATAR_SIZE}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      className="flex items-center justify-center shrink-0"
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        borderRadius: "50%",
                        backgroundColor: p.pink.dark,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: ff,
                          fontWeight: 700,
                          fontSize: "1rem",
                          color: p.pink.light,
                        }}
                      >
                        {q.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p
                      style={{
                        fontFamily: ff,
                        fontWeight: 600,
                        fontSize: "0.875rem",
                        color: p.pink.dark,
                      }}
                    >
                      {q.name}
                    </p>
                    <p
                      style={{
                        fontFamily: ff,
                        fontWeight: 400,
                        fontSize: "0.75rem",
                        color: p.pink.dark,
                        opacity: 0.5,
                      }}
                    >
                      {q.field}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Clickable dot indicators ── */}
        <div className="flex gap-2 mt-8 mb-10">
          {RESEARCHER_QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Quote ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: "100px",
                backgroundColor: p.pink.dark,
                opacity: i === index ? 0.5 : 0.15,
                transition: "width 0.3s ease, opacity 0.3s ease",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* ── Static body copy ── */}
        <p
          className="text-base leading-relaxed max-w-lg"
          style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
        >
          Most of us sense something familiar in how we respond to stress, to
          love, to conflict. We can feel the shape of it — but we&apos;ve never
          had the language to name it. The Mirror gives you that language. Not as
          diagnosis. As recognition.
        </p>
      </div>
    </section>
  );
}
