"use client";

import { ff } from "@/lib/landing/palette";

/** Section display names — friendlier than raw IDs */
const sectionLabels: Record<string, string> = {
  "about-you": "About You",
  "your-upbringing": "Your Upbringing",
  "your-parents-patterns": "Your Parents' Patterns",
};

/** Milestone messages shown when entering a new section */
const sectionMilestones: Record<string, string> = {
  "your-upbringing":
    "Nice start. Now let's go a little deeper into the home you grew up in.",
  "your-parents-patterns":
    "You're over halfway there. This is where your Mirror starts to take shape.",
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
  const milestone = sectionMilestones[title];

  return (
    <div className="mb-5">
      <span
        className="inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
        style={{ backgroundColor: bgColor, color: textColor }}
      >
        {label}
      </span>
      {milestone && (
        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ fontFamily: ff, fontWeight: 400, color: "#999" }}
        >
          {milestone}
        </p>
      )}
      {description && (
        <p className="mt-2 text-sm text-[#777]">{description}</p>
      )}
    </div>
  );
}
