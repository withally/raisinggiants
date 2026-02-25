"use client";

export function ProcessingScreen() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 py-8 bg-amber-50">
      <div className="w-full max-w-lg text-center">
        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-8" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-3 h-3 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-3 h-3 rounded-full bg-amber-400 animate-bounce" />
        </div>

        {/* Warm message */}
        <h2
          className="text-xl font-semibold text-stone-800 mb-3 leading-snug"
          style={{ fontFamily: "var(--font-display)" }}
        >
          We&apos;re putting together your archetype profile&hellip;
        </h2>
        <p className="text-stone-500 text-base leading-relaxed">
          Analyzing your patterns across 8 dimensions&hellip;
        </p>
      </div>
    </div>
  );
}
