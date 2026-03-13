"use client";

import { useState } from "react";
import { EmailGateOverlay } from "@/components/result/EmailGateOverlay";
import { StickyBlueprintBar } from "@/components/result/StickyBlueprintBar";

interface ResultPageClientProps {
  children: React.ReactNode;
}

export function ResultPageClient({ children }: ResultPageClientProps) {
  // Gate starts open — SSR-safe: content is blurred from the first paint
  const [gateOpen, setGateOpen] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  function handleDismiss() {
    setTransitioning(true);
    setGateOpen(false);
    // After the longest animation (content-unblur: 0.8s), clear transitioning state
    setTimeout(() => {
      setTransitioning(false);
    }, 800);
  }

  // Determine content wrapper classes
  let contentClass = "";
  if (gateOpen) {
    // Gate is open: blur and disable interaction
    contentClass = "pointer-events-none select-none";
  } else if (transitioning) {
    // Animating open: unblur in progress
    contentClass = "animate-content-unblur";
  }
  // After transition: no special class — content renders normally

  return (
    <>
      {/* Gate overlay: visible while open, fading out during transition */}
      {gateOpen && <EmailGateOverlay onDismiss={handleDismiss} />}
      {!gateOpen && transitioning && (
        <div
          className="animate-gate-fade-out pointer-events-none fixed inset-0 z-50 bg-[#F5F4F2]/95 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* Content wrapper: blurred while gate is open */}
      <div
        className={contentClass}
        style={gateOpen ? { filter: "blur(12px)" } : undefined}
        aria-hidden={gateOpen ? "true" : undefined}
      >
        {children}
      </div>

      {/* Sticky bar: hidden while gate is open or animating */}
      <StickyBlueprintBar hidden={gateOpen || transitioning} />
    </>
  );
}
