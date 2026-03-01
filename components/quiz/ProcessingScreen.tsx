"use client";

import { ff } from "@/lib/landing/palette";

export function ProcessingScreen() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 py-8 bg-[#FAFAF7]">
      <div className="w-full max-w-lg text-center">
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-8" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#1A4A3A] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 rounded-full bg-[#B2DECD] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 rounded-full bg-[#EEC0DA] animate-bounce" />
        </div>

        {/* Warm message */}
        <h2
          className="text-xl text-[#1A1A1A] mb-3 leading-snug"
          style={{ fontFamily: ff, fontWeight: 800 }}
        >
          Putting together your profile&hellip;
        </h2>
        <p className="text-base leading-relaxed" style={{ fontFamily: ff, color: "#777" }}>
          Analysing your patterns across 8 dimensions&hellip;
        </p>
      </div>
    </div>
  );
}
