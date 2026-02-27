"use client";

export function ProcessingScreen() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 py-8 bg-[#F5F4F2]">
      <div className="w-full max-w-lg text-center">
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-8" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-[#C4892A] animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 rounded-full bg-[#C4892A] animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 rounded-full bg-[#C4892A] animate-bounce" />
        </div>

        {/* Warm message */}
        <h2
          className="text-xl font-semibold text-[#1A1008] mb-3 leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We&apos;re putting together your archetype profile&hellip;
        </h2>
        <p className="text-[#8A7A66] text-base leading-relaxed">
          Analyzing your patterns across 8 dimensions&hellip;
        </p>
      </div>
    </div>
  );
}
