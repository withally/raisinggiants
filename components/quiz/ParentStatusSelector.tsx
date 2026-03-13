"use client";

import { ff } from "@/lib/landing/palette";
import type { ParentStatus } from "@/stores/blueprintStore";

interface ParentStatusSelectorProps {
  onSelect: (status: ParentStatus) => void;
}

const OPTIONS: { id: ParentStatus; label: string; sublabel: string }[] = [
  {
    id: "current-parent",
    label: "I'm a parent now",
    sublabel: "You have a child or children",
  },
  {
    id: "expecting",
    label: "I'm expecting",
    sublabel: "A baby is on the way",
  },
  {
    id: "planning",
    label: "Planning for someday",
    sublabel: "Not yet, but thinking about it",
  },
];

export function ParentStatusSelector({ onSelect }: ParentStatusSelectorProps) {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-6 bg-[#FAFAF7]"
      style={{ fontFamily: ff }}
    >
      <div className="w-full max-w-md animate-fade-up">
        <h1
          className="text-2xl sm:text-3xl text-[#1A1A1A] mb-2 text-center"
          style={{ fontFamily: ff, fontWeight: 800 }}
        >
          First &mdash; a quick question
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: "#777" }}>
          This helps us make the questions feel right for where you are.
        </p>

        <div className="space-y-3">
          {OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="w-full text-left bg-white rounded-2xl border border-[#E8E4DF] px-5 py-4 min-h-[64px] flex flex-col justify-center hover:border-[#1A4A3A] hover:bg-[#F0F7F4] transition-colors"
              aria-label={`${option.label} — ${option.sublabel}`}
            >
              <span
                className="text-base text-[#1A1A1A] block"
                style={{ fontFamily: ff, fontWeight: 600 }}
              >
                {option.label}
              </span>
              <span className="text-sm block mt-0.5" style={{ color: "#777" }}>
                {option.sublabel}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
