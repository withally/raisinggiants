"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

    // Check immediately in case page starts scrolled
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (hidden || !visible) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D3D3A]/95 backdrop-blur-sm border-t border-[#7A9E9C]/30"
      aria-label="Blueprint launch notification"
    >
      <div className="max-w-3xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Text */}
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-3 text-center sm:text-left">
          <span
            className="text-[#F5F4F2] text-sm font-semibold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Blueprint is coming.
          </span>
          <span className="text-[#7A9E9C] text-xs hidden sm:inline" aria-hidden="true">
            —
          </span>
          <span className="text-[#7A9E9C] text-xs">
            Your personalized action plan, built from this result.
          </span>
        </div>

        {/* Notify button */}
        <Link
          href="/blueprint"
          className="shrink-0 inline-flex items-center justify-center rounded-full bg-[#C4892A] px-5 py-2 text-xs font-semibold text-white hover:bg-[#D4993A] transition-colors duration-200 min-h-[36px] min-w-[44px]"
        >
          Notify me
        </Link>
      </div>
    </aside>
  );
}
