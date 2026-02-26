"use client";

import { useState } from "react";
import { EmailGateOverlay } from "@/components/result/EmailGateOverlay";
import { StickyBlueprintBar } from "@/components/result/StickyBlueprintBar";

interface ResultPageClientProps {
  children: React.ReactNode;
}

export function ResultPageClient({ children }: ResultPageClientProps) {
  const [gateOpen, setGateOpen] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  function handleDismiss() {
    setTransitioning(true);
    setGateOpen(false);

    // After animation completes, clear transitioning state
    const timer = setTimeout(() => {
      setTransitioning(false);
    }, 800);

    return () => clearTimeout(timer);
  }

  // Determine content wrapper classes based on gate/transition state
  const contentClasses = [
    "transition-[filter] duration-[800ms] ease",
    gateOpen || transitioning ? "blur-[12px] pointer-events-none select-none" : "",
    !gateOpen && transitioning ? "animate-content-unblur" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Email gate overlay — renders while gate is open */}
      {gateOpen && <EmailGateOverlay onDismiss={handleDismiss} />}

      {/* Fading overlay during transition */}
      {!gateOpen && transitioning && (
        <div
          className="fixed inset-0 z-50 bg-amber-50/95 backdrop-blur-sm animate-gate-fade-out pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Content — blurred while gate is open, unblurs during transition */}
      <div className={contentClasses} aria-hidden={gateOpen ? "true" : undefined}>
        {children}
      </div>

      {/* Sticky bar — hidden while gate is open */}
      <StickyBlueprintBar hidden={gateOpen} />
    </>
  );
}
