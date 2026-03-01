"use client";

import { useState } from "react";
import { ff, ffSerif, grad, p, shadow } from "@/lib/landing/palette";

const ALL_RESEARCHERS = [
  {
    name: "John Gottman",
    finding: "Emotion coaching as the foundation of secure parent-child attunement",
  },
  {
    name: "Daniel Siegel",
    finding: "Narrative coherence as the marker of integrated parenting",
  },
  {
    name: "Mary Ainsworth",
    finding: "Sensitive responsiveness as the core of secure attachment",
  },
  {
    name: "Becky Kennedy",
    finding: "Repair as the most important skill a parent can build",
  },
  {
    name: "John Bowlby",
    finding: "The attachment figure as provider of a secure base",
  },
  {
    name: "Shefali Tsabary",
    finding: "Conscious parenting — allowing the child's own selfhood to emerge",
  },
  {
    name: "Tina Payne Bryson",
    finding: "Reconnection after disconnection as a core parenting practice",
  },
  {
    name: "Diana Baumrind",
    finding: "Warmth and structure as the two axes of healthy parenting",
  },
  {
    name: "Bessel van der Kolk",
    finding: "Parentification as a distinct and often invisible developmental trauma",
  },
  {
    name: "Edward Tronick",
    finding: "Rupture-and-repair as the normative rhythm of secure relationships",
  },
  {
    name: "Gregory Jurkovic",
    finding: "Role reversal between parent and child as relational trauma",
  },
  {
    name: "Martin van IJzendoorn",
    finding: "Coherent childhood narrative predicts secure attachment in children",
  },
];

export function KOLSection() {
  const [showAll, setShowAll] = useState(false);

  const visibleResearchers = showAll ? ALL_RESEARCHERS : ALL_RESEARCHERS.slice(0, 6);

  return (
    <section className="py-20 md:py-28 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <p
          className="uppercase tracking-[0.2em] text-xs mb-4"
          style={{ fontFamily: ff, fontWeight: 600, color: p.blue.dark, opacity: 0.5 }}
        >
          The research behind it
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl leading-tight tracking-tight mb-4">
          <span style={{ fontFamily: ff, fontWeight: 800, color: "#1A1A1A" }}>Built on </span>
          <span
            style={{
              fontFamily: ffSerif,
              fontStyle: "italic",
              fontWeight: 400,
              color: p.pink.dark,
            }}
          >
            real science
          </span>
        </h2>

        {/* Subtext */}
        <p
          className="text-base mb-12 max-w-lg leading-relaxed"
          style={{ fontFamily: ff, fontWeight: 400, color: "#888" }}
        >
          Every archetype draws on decades of peer-reviewed research. The dimensions behind The
          Mirror are grounded in the work of leading developmental psychologists, attachment
          theorists, and family researchers.
        </p>

        {/* Researcher cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {visibleResearchers.map((researcher) => (
            <div
              key={researcher.name}
              className="hover-lift px-7 py-6"
              style={{
                background: grad.blue.dark,
                borderRadius: "24px",
                boxShadow: shadow.cardDark,
              }}
            >
              <p
                className="text-base mb-2"
                style={{ fontFamily: ff, fontWeight: 700, color: p.mint.light }}
              >
                {researcher.name}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: ff, fontWeight: 400, color: "rgba(255,255,255,0.45)" }}
              >
                {researcher.finding}
              </p>
            </div>
          ))}
        </div>

        {/* Expand button */}
        {!showAll && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="hover-btn cursor-pointer"
              style={{
                fontFamily: ff,
                fontWeight: 600,
                fontSize: "0.875rem",
                backgroundColor: "transparent",
                color: p.blue.dark,
                border: `1.5px solid ${p.blue.dark}22`,
                borderRadius: "100px",
                minHeight: "44px",
                padding: "0 28px",
              }}
            >
              See all researchers
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
