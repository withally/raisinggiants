"use client";

interface OptionCardProps {
  label: string;
  isSelected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  /** Section pastel light color, e.g. "#FEF4AC" */
  accentLight?: string;
  /** Section pastel dark color, e.g. "#3D3B1A" */
  accentDark?: string;
}

export function OptionCard({
  label,
  isSelected,
  onSelect,
  disabled = false,
  accentLight = "#B2DECD",
  accentDark = "#1A4A3A",
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className="w-full min-h-[48px] rounded-3xl px-5 py-4 text-left border transition-all duration-200 text-[15px] font-medium leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
      style={{
        backgroundColor: isSelected ? `${accentLight}33` : `${accentLight}0A`,
        borderColor: isSelected ? accentDark : "#E8E4DF",
        color: isSelected ? accentDark : "#1A1A1A",
        boxShadow: isSelected
          ? "0 1px 2px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.03)"
          : "none",
        // @ts-expect-error -- CSS custom property for focus ring
        "--tw-ring-color": accentDark,
      }}
    >
      <span className="flex items-center gap-3">
        {isSelected && (
          <svg
            className="h-5 w-5 shrink-0"
            style={{ color: accentDark }}
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
