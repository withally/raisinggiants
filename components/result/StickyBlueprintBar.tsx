"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ff, p, grad } from "@/lib/landing/palette";

const SCROLL_THRESHOLD = 400;

interface StickyBlueprintBarProps {
  hidden?: boolean;
}

export function StickyBlueprintBar({ hidden = false }: StickyBlueprintBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden || !visible) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-sm"
      style={{ background: `${p.blue.dark}F2`, borderTop: `1px solid rgba(255,255,255,0.1)` }}
      aria-label="Blueprint launch notification"
    >
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-3 text-center sm:text-left">
          <span
            className="text-sm"
            style={{ fontFamily: ff, fontWeight: 600, color: "#F0EDE8" }}
          >
            The Blueprint is coming.
          </span>
          <span className="text-xs hidden sm:inline" style={{ color: "#F0EDE8", opacity: 0.4 }} aria-hidden="true">
            —
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: ff, color: "#F0EDE8", opacity: 0.5 }}
          >
            Your personalized action plan, built from this result.
          </span>
        </div>

        <Link
          href="/blueprint"
          className="shrink-0 inline-flex items-center justify-center rounded-full px-5 py-2 text-xs min-h-[36px] min-w-[44px] transition-colors duration-200 hover:opacity-90"
          style={{
            fontFamily: ff,
            fontWeight: 600,
            background: p.butter.light,
            color: p.blue.dark,
          }}
        >
          Notify me
        </Link>
      </div>
    </aside>
  );
}
