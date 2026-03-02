"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ff, p, shadow } from "@/lib/landing/palette";

export function StickyQuizCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past hero (~100vh), hide near bottom (final CTA section)
      const scrollY = window.scrollY;
      const heroThreshold = window.innerHeight * 0.85;
      const bottomThreshold = document.documentElement.scrollHeight - window.innerHeight * 2.5;

      setVisible(scrollY > heroThreshold && scrollY < bottomThreshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "opacity 400ms ease, transform 400ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="px-4 pb-4 md:pb-5 flex justify-center pointer-events-auto">
        <Link
          href="/quiz"
          className="hover-btn inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-3.5"
          style={{
            fontFamily: ff,
            fontWeight: 700,
            fontSize: "0.875rem",
            backgroundColor: p.blue.dark,
            color: "#F0EDE8",
            borderRadius: "100px",
            boxShadow: `${shadow.button}, 0 8px 32px rgba(0,40,51,0.25)`,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span>Take The Mirror</span>
          <span
            className="text-xs px-2.5 py-0.5 rounded-full"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "rgba(240,237,232,0.8)",
            }}
          >
            Free
          </span>
        </Link>
      </div>
    </div>
  );
}
