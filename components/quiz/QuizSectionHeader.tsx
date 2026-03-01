"use client";

/** Section display names — friendlier than raw IDs */
const sectionLabels: Record<string, string> = {
  "about-you": "About You",
  "your-upbringing": "Your Upbringing",
  "your-parents-patterns": "Your Parents' Patterns",
  "your-background": "Your Background",
};

interface QuizSectionHeaderProps {
  title: string;
  description?: string;
  /** Pastel light background for the pill */
  bgColor?: string;
  /** Dark text color for the pill */
  textColor?: string;
}

export function QuizSectionHeader({
  title,
  description,
  bgColor = "#B2DECD",
  textColor = "#1A4A3A",
}: QuizSectionHeaderProps) {
  const label = sectionLabels[title] ?? title;

  return (
    <div className="mb-5">
      <span
        className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {label}
      </span>
      {description && (
        <p className="mt-2 text-sm text-[#777]">{description}</p>
      )}
    </div>
  );
}
