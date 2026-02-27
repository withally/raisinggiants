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
        // Base styles: full-width, minimum touch target, rounded, padded
        "w-full min-h-[44px] rounded-xl px-5 py-4 text-left",
        "border-2 transition-colors duration-150",
        "text-base font-normal leading-snug",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D3D3A] focus-visible:ring-offset-2",
        // Default (unselected) state
        isSelected
          ? "bg-[#F5F4F2] border-[#0D3D3A] text-[#0D3D3A]"
          : "bg-white border-[#E8E4DF] text-[#1A1008] hover:border-[#0D3D3A]/20 hover:bg-[#F5F4F2]/40",
        // Disabled state
        disabled && "opacity-60 cursor-not-allowed",
      )}
    >
      <span className="flex items-center gap-3">
        {isSelected && (
          <svg
            className="h-5 w-5 shrink-0 text-[#6B1E2E]"
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
