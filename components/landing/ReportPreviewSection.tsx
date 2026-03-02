"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ff, ffSerif, p, shadow } from "@/lib/landing/palette";
import { ScrollReveal } from "./ScrollReveal";

// Three curated archetypes as demo subjects
const DEMOS = [
  {
    name: "The Gentle Nurturer",
    tagline: "You grew up held.",
    accentColor: "#C4892A",
    borderColor: "rgba(196,137,42,0.35)",
    patterns: [
      {
        title: "Warmth without conditions",
        body: "Love was visible and unconditional. You absorbed a deep template for what safe connection feels like — and carry it into every relationship.",
      },
      {
        title: "Freedom to explore",
        body: "You were trusted to find your own way. The people who raised you bet on the process, not just the outcome.",
      },
      {
        title: "Feelings named early",
        body: "Your inner world was acknowledged before you had language for it. That attunement became your baseline for what presence means.",
      },
    ],
    watchout:
      "You may absorb others' distress as your own — a reflex from a childhood where emotional attunement was survival. That's not empathy. It's a cost.",
  },
  {
    name: "The Steady Anchor",
    tagline: "You grew up anchored.",
    accentColor: "#4A7A6A",
    borderColor: "rgba(74,122,106,0.35)",
    patterns: [
      {
        title: "Predictability as safety",
        body: "Calm, reliable presence shaped your earliest sense of the world. Consistency became your deepest definition of love.",
      },
      {
        title: "Warmth and structure, held together",
        body: "Limits felt like care made concrete — not restriction, but evidence that someone was paying close attention.",
      },
      {
        title: "Repair after rupture",
        body: "After conflict, connection was restored. You grew up knowing that rupture isn't the end. That is a rare and powerful inheritance.",
      },
    ],
    watchout:
      "Environments without structure can feel threatening before they feel free. Change may register as danger long before it registers as possibility.",
  },
  {
    name: "The Fierce Guardian",
    tagline: "You grew up protected.",
    accentColor: "#7A5A8A",
    borderColor: "rgba(122,90,138,0.35)",
    patterns: [
      {
        title: "Love expressed as vigilance",
        body: "Safety was the highest offering — and you felt it, even when protection came with pressure attached.",
      },
      {
        title: "Clear outer limits",
        body: "Rules were non-negotiable. That strong boundary sense gave you a clear internal compass others had to build from scratch.",
      },
      {
        title: "Loyalty as a language of love",
        body: "Showing up, especially under pressure, was how love was demonstrated. You carry that code still.",
      },
    ],
    watchout:
      "Hypervigilance can outlast the threats that first required it. You may scan for danger even in environments that are genuinely safe.",
  },
];

const WHAT_YOU_GET = [
  {
    label: "Your archetype",
    desc: "Which of 9 parenting archetypes shaped your childhood — named, and explained.",
  },
  {
    label: "Foundational patterns",
    desc: "The 5 things you inherited: the warmth, the rules, the things said and unsaid.",
  },
  {
    label: "What to watch for",
    desc: "The shadow side of your patterns — reframed with compassion, not judgement.",
  },
  {
    label: "Your cultural lens",
    desc: "How your specific cultural background shaped how the archetype expressed itself.",
  },
];

type Phase = "reveal" | "patterns" | "watchout" | "out";

function useReportAnimation(demoIndex: number) {
  const [phase, setPhase] = useState<Phase>("reveal");
  const [patternsShown, setPatternsShown] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear previous timers
    for (const t of timers.current) clearTimeout(t);
    timers.current = [];

    setPhase("reveal");
    setPatternsShown(0);

    const add = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    // Staggered reveal sequence
    add(() => setPhase("patterns"), 1600);
    add(() => setPatternsShown(1), 2200);
    add(() => setPatternsShown(2), 3400);
    add(() => setPatternsShown(3), 4600);
    add(() => setPhase("watchout"), 6000);

    return () => {
      for (const t of timers.current) clearTimeout(t);
    };
  }, [demoIndex]);

  return { phase, patternsShown };
}

// Progress bar that fills over the cycle duration
function ProgressBar({ demoIndex }: { demoIndex: number }) {
  const [width, setWidth] = useState(0);
  const raf = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);
  const DURATION = 10000; // ms per archetype

  useEffect(() => {
    startTime.current = null;
    setWidth(0);
    if (raf.current) cancelAnimationFrame(raf.current);

    function tick(ts: number) {
      if (startTime.current === null) startTime.current = ts;
      const pct = Math.min(((ts - startTime.current) / DURATION) * 100, 100);
      setWidth(pct);
      if (pct < 100) {
        raf.current = requestAnimationFrame(tick);
      }
    }
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [demoIndex]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: "rgba(0,0,0,0.06)",
        borderRadius: "20px 20px 0 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          backgroundColor: "#C4892A",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
}

function ReportFrame({ demoIndex, onNext }: { demoIndex: number; onNext: () => void }) {
  const demo = DEMOS[demoIndex];
  const { phase, patternsShown } = useReportAnimation(demoIndex);

  // Auto-advance to next demo
  useEffect(() => {
    const t = setTimeout(onNext, 10000);
    return () => clearTimeout(t);
  }, [demoIndex, onNext]);

  const visible = (show: boolean) => ({
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(6px)",
    transition: "opacity 0.5s ease, transform 0.5s ease",
  });

  return (
    <div
      style={{
        backgroundColor: "#F9F7F4",
        borderRadius: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04), 0 16px 48px rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <ProgressBar demoIndex={demoIndex} />

      {/* Window chrome */}
      <div
        style={{
          padding: "14px 18px 10px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        {["#FF6057", "#FFBD2E", "#27C93F"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.7 }} />
        ))}
        <div
          style={{
            marginLeft: 10,
            fontSize: "10px",
            fontFamily: ff,
            color: "#AAA",
            backgroundColor: "rgba(0,0,0,0.04)",
            borderRadius: "6px",
            padding: "2px 10px",
          }}
        >
          mirror.kinparenting.com/result
        </div>
      </div>

      {/* Report body */}
      <div style={{ padding: "28px 30px 24px", minHeight: 380 }}>
        {/* Eyebrow */}
        <p
          style={{
            fontFamily: ff,
            fontWeight: 600,
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#8A7A66",
            marginBottom: 10,
            ...visible(true),
          }}
        >
          You were raised by:
        </p>

        {/* Archetype name */}
        <h3
          style={{
            fontFamily: ffSerif,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "#1A1008",
            lineHeight: 1.1,
            marginBottom: 6,
            ...visible(true),
          }}
        >
          {demo.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontFamily: ff,
            fontWeight: 400,
            fontSize: "13px",
            color: "#8A7A66",
            marginBottom: 20,
            ...visible(true),
          }}
        >
          {demo.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            backgroundColor: "#E8E4DF",
            marginBottom: 18,
            ...visible(phase !== "reveal"),
          }}
        />

        {/* Patterns section */}
        <div style={visible(phase !== "reveal")}>
          <p
            style={{
              fontFamily: ff,
              fontWeight: 600,
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8A7A66",
              marginBottom: 12,
            }}
          >
            What you inherited
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {demo.patterns.map((pat, i) => (
              <div
                key={pat.title}
                style={{
                  borderLeft: `3px solid ${demo.borderColor}`,
                  paddingLeft: 12,
                  paddingTop: 2,
                  paddingBottom: 2,
                  ...visible(patternsShown > i),
                }}
              >
                <p
                  style={{
                    fontFamily: ff,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#1A1008",
                    marginBottom: 2,
                  }}
                >
                  {pat.title}
                </p>
                <p
                  style={{
                    fontFamily: ff,
                    fontWeight: 400,
                    fontSize: "11px",
                    color: "#6B5E50",
                    lineHeight: 1.5,
                  }}
                >
                  {pat.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Watchout */}
        <div
          style={{
            marginTop: 18,
            borderTop: "1px solid #E8E4DF",
            paddingTop: 14,
            ...visible(phase === "watchout"),
          }}
        >
          <p
            style={{
              fontFamily: ff,
              fontWeight: 600,
              fontSize: "9px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8A7A66",
              marginBottom: 8,
            }}
          >
            What to watch for
          </p>
          <div
            style={{
              borderLeft: "3px solid rgba(138,122,102,0.3)",
              paddingLeft: 12,
            }}
          >
            <p
              style={{
                fontFamily: ff,
                fontWeight: 400,
                fontSize: "11px",
                color: "#6B5E50",
                lineHeight: 1.6,
                fontStyle: "italic",
              }}
            >
              {demo.watchout}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom: archetype selector dots */}
      <div
        style={{
          padding: "12px 30px 16px",
          borderTop: "1px solid rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <p style={{ fontFamily: ff, fontSize: "10px", color: "#AAA", marginRight: 4 }}>
          Preview:
        </p>
        {DEMOS.map((d, i) => (
          <button
            key={d.name}
            type="button"
            title={d.name}
            onClick={() => {/* handled by parent */}}
            style={{
              width: i === demoIndex ? 20 : 6,
              height: 6,
              borderRadius: "100px",
              backgroundColor: i === demoIndex ? "#C4892A" : "rgba(0,0,0,0.12)",
              border: "none",
              cursor: "default",
              transition: "width 0.3s ease, background-color 0.3s ease",
              padding: 0,
            }}
          />
        ))}
        <p style={{ fontFamily: ff, fontSize: "10px", color: "#CCC", marginLeft: "auto" }}>
          1 of 9 archetypes
        </p>
      </div>
    </div>
  );
}

export function ReportPreviewSection() {
  const [demoIndex, setDemoIndex] = useState(0);
  const advance = () => setDemoIndex((i) => (i + 1) % DEMOS.length);

  return (
    <section className="py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — prose */}
          <ScrollReveal offset={20} delay={0}>
            <div>
              <p
                className="uppercase tracking-[0.2em] text-xs mb-4"
                style={{ fontFamily: ff, fontWeight: 600, color: p.pink.dark, opacity: 0.7 }}
              >
                Your report
              </p>

              <h2
                className="text-4xl md:text-5xl leading-tight tracking-tight mb-5"
              >
                <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>
                  This is what{" "}
                </span>
                <span
                  style={{
                    fontFamily: ffSerif,
                    fontStyle: "italic",
                    fontWeight: 400,
                    color: p.pink.dark,
                  }}
                >
                  waits for you
                </span>
                <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>.</span>
              </h2>

              <p
                className="text-base leading-relaxed mb-10 max-w-md"
                style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
              >
                After 15 minutes, you receive a personalised report — not a horoscope, not a label.
                A mirror.
              </p>

              {/* Report sections */}
              <div className="flex flex-col gap-5 mb-10">
                {WHAT_YOU_GET.map((item, i) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "8px",
                        backgroundColor:
                          i === 0
                            ? p.pink.light
                            : i === 1
                              ? p.butter.light
                              : i === 2
                                ? p.mint.light
                                : p.blue.light,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontFamily: ff,
                          fontWeight: 800,
                          color:
                            i === 0
                              ? p.pink.dark
                              : i === 1
                                ? p.butter.dark
                                : i === 2
                                  ? p.mint.dark
                                  : p.blue.dark,
                        }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: ff,
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "#1A1A1A",
                          marginBottom: 2,
                        }}
                      >
                        {item.label}
                      </p>
                      <p
                        style={{
                          fontFamily: ff,
                          fontWeight: 400,
                          fontSize: "0.8125rem",
                          color: "#999",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/quiz">
                <span
                  className="hover-btn inline-flex cursor-pointer items-center gap-2 px-8 py-4 text-sm"
                  style={{
                    fontFamily: ff,
                    fontWeight: 700,
                    backgroundColor: p.blue.dark,
                    color: "#F0EDE8",
                    borderRadius: "16px",
                    minHeight: "44px",
                    boxShadow: shadow.button,
                  }}
                >
                  See yours — it&apos;s free
                </span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Right — animated report */}
          <ScrollReveal offset={20} delay={120}>
            <ReportFrame demoIndex={demoIndex} onNext={advance} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
