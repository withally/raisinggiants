"use client";

import { cn } from "@/lib/utils";

interface OptionCardProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
}

export function OptionCard({ label, isSelected, onSelect, disabled = false }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        // Base styles: full-width, minimum touch target, rounded-3xl (24px), padded
        "w-full min-h-[48px] rounded-3xl px-5 py-4 text-left",
        "border transition-all duration-200",
        "text-[15px] font-medium leading-snug",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002833] focus-visible:ring-offset-2",
        // Default (unselected) state — warm off-white
        isSelected
          ? "bg-[#B2DECD]/20 border-[#1A4A3A] text-[#1A4A3A] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_4px_16px_rgba(0,0,0,0.03)]"
          : "bg-white border-[#E8E4DF] text-[#1A1A1A] hover:border-[#B2DECD] hover:bg-[#B2DECD]/5",
        // Disabled state
        disabled && "opacity-60 cursor-not-allowed",
      )}
    >
      <span className="flex items-center gap-3">
        {isSelected && (
          <svg
            className="h-5 w-5 shrink-0 text-[#1A4A3A]"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {!isSelected && <span className="h-5 w-5 shrink-0" />}
        {label}
      </span>
    </button>
  );
}
