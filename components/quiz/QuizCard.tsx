"use client";

import { CulturalDropdown } from "@/components/quiz/CulturalDropdown";
import { OptionCard } from "@/components/quiz/OptionCard";
import { QuizSectionHeader } from "@/components/quiz/QuizSectionHeader";
import { WhyWeAskThis } from "@/components/quiz/WhyWeAskThis";
import type { QuizQuestion } from "@/lib/quiz/questions";
import { ff } from "@/lib/landing/palette";
import { getSectionColor } from "@/lib/quiz/section-palette";

interface QuizCardProps {
  question: QuizQuestion;
  currentAnswer: string | null; // currently selected option ID (for resumption)
  onAnswer: (questionId: string, answerId: string) => void;
  onSkip?: () => void; // skip this question without recording an answer
  showSectionHeader: boolean; // true when this is the first question in a new section
}

export function QuizCard({ question, currentAnswer, onAnswer, onSkip, showSectionHeader }: QuizCardProps) {
  const sectionColor = getSectionColor(question.section);

  return (
    <div className="min-h-[100dvh] max-w-lg mx-auto px-6 py-8 flex flex-col justify-center">
      {/* Section header — shown only on section transitions */}
      {showSectionHeader && (
        <QuizSectionHeader
          title={question.section}
          bgColor={sectionColor.light}
          textColor={sectionColor.dark}
        />
      )}

      {/* Lead-in normalizing sentence for sensitive questions */}
      {question.leadIn && (
        <p className="mb-3 text-sm italic leading-relaxed" style={{ fontFamily: ff, color: "#777" }}>{question.leadIn}</p>
      )}

      {/* Question text */}
      <h2
        className="text-xl sm:text-2xl text-[#1A1A1A] leading-snug mb-6"
        style={{ fontFamily: ff, fontWeight: 800 }}
      >
        {question.question}
      </h2>

      {/* Answer input — option cards or searchable dropdown */}
      {question.inputType === "option-cards" && (
        <div className="space-y-3">
          {question.options.map((option) => (
            <OptionCard
              key={option.id}
              label={option.label}
              isSelected={currentAnswer === option.id}
              onSelect={() => onAnswer(question.id, option.id)}
              accentLight={sectionColor.light}
              accentDark={sectionColor.dark}
            />
          ))}
        </div>
      )}

      {question.inputType === "searchable-dropdown" && (
        <CulturalDropdown
          options={question.options}
          value={currentAnswer}
          onSelect={(value) => onAnswer(question.id, value)}
        />
      )}

      {/* Why we ask this — tap-to-reveal helper text */}
      {question.whyWeAskThis && <WhyWeAskThis text={question.whyWeAskThis} />}

      {/* Skip this question */}
      {onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-[#777] hover:text-[#1A1A1A] transition-colors mt-4"
        >
          Skip this question
        </button>
      )}
    </div>
  );
}
