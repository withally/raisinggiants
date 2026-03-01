"use client";

interface QuizProgressProps {
  current: number;
  total: number;
  /** Section pastel light color for gradient start */
  accentLight?: string;
  /** Section pastel dark color for gradient end */
  accentDark?: string;
}

export function QuizProgress({
  current,
  total,
  accentLight = "#B2DECD",
  accentDark = "#1A4A3A",
}: QuizProgressProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Quiz progress: ${current} of ${total} questions answered`}
      className="fixed top-0 left-0 w-full z-50 h-1 bg-[#FAFAF7]"
    >
      <div
        className="h-full transition-all duration-300 ease-out"
        style={{
          width: `${percentage}%`,
          background: `linear-gradient(90deg, ${accentLight}, ${accentDark})`,
        }}
      />
    </div>
  );
}
