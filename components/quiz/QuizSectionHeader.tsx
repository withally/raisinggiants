"use client";

interface QuizSectionHeaderProps {
  title: string;
  description?: string;
}

export function QuizSectionHeader({ title, description }: QuizSectionHeaderProps) {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-[#8A7A66] uppercase tracking-wide">{title}</p>
      {description && <p className="mt-1 text-sm text-[#8A7A66]">{description}</p>}
    </div>
  );
}
