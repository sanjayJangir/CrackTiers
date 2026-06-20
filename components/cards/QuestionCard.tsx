"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import Badge from "@/components/ui/Badge";
import AnswerFeedback from "@/components/ui/AnswerFeedback";
import { getCategoryLabel, getSubcategoryLabel } from "@/lib/category-labels";
import { getSubjectShortLabel } from "@/lib/display-labels";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";
import type { Question } from "@/data/types";

interface QuestionCardProps {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const isHi = language === "hi";
  const questionText = isHi ? question.questionHi : question.question;
  const isCorrect = selected === question.correctAnswer;

  const correctOption = question.options.find(
    (o) => o.label === question.correctAnswer
  );

  const handleSelect = (label: string) => {
    if (answered) return;
    setSelected(label);
    setAnswered(true);
  };

  const handleTryAgain = () => {
    setSelected(null);
    setAnswered(false);
  };

  const categoryLabel = getCategoryLabel(question.categorySlug);
  const subcategoryLabel = getSubcategoryLabel(
    question.categorySlug,
    question.subcategorySlug
  );

  const tapHint = isHi
    ? "उत्तर जांचने के लिए विकल्प पर टैप करें"
    : "Tap an option to check your answer";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="border-b border-slate-100 px-3 py-3.5 sm:px-6 sm:py-5">
        <div className="mb-2.5 flex flex-wrap items-center gap-1.5 sm:mb-3 sm:gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white sm:h-8 sm:w-8 sm:text-sm">
            {index}
          </span>
          <Badge variant="outline" className="max-w-[9rem] truncate sm:max-w-none" title={question.subject}>
            <span className="sm:hidden">{getSubjectShortLabel(question.subject)}</span>
            <span className="hidden sm:inline">{question.subject}</span>
          </Badge>
          <Badge variant="outline" className="max-w-[7rem] truncate sm:max-w-[10rem]" title={subcategoryLabel}>
            {subcategoryLabel}
          </Badge>
          <Badge variant="difficulty" difficulty={question.difficulty}>
            {question.difficulty}
          </Badge>
          <Badge variant="outline">{question.year}</Badge>
        </div>
        <p className="mb-1.5 text-xs font-medium text-indigo-600 sm:mb-2">{categoryLabel}</p>
        <h3 className="text-[15px] font-semibold leading-relaxed text-slate-900 sm:text-lg">
          {questionText}
        </h3>
        <p className="mt-1.5 hidden text-sm leading-relaxed text-slate-400 sm:mt-2 sm:block">
          {isHi ? question.question : question.questionHi}
        </p>
      </div>

      <div className="space-y-2 px-3 py-3.5 sm:space-y-2.5 sm:px-6 sm:py-5">
        <p className="text-xs font-medium text-slate-500">{tapHint}</p>

        {question.options.map((option) => {
          const isSelected = selected === option.label;
          const isCorrectOption = option.label === question.correctAnswer;
          const showAsCorrect = answered && isCorrectOption;
          const showAsWrong = answered && isSelected && !isCorrectOption;
          const optionText = isHi ? option.textHi : option.text;

          return (
            <button
              key={option.label}
              type="button"
              disabled={answered}
              onClick={() => handleSelect(option.label)}
              aria-pressed={isSelected}
              className={cn(
                "flex w-full min-h-[48px] items-center gap-2.5 rounded-xl border-2 px-3 py-3 text-left text-sm transition sm:min-h-[52px] sm:gap-3 sm:px-4 sm:py-3.5 sm:text-base",
                !answered &&
                  "border-slate-200 bg-white text-slate-800 active:scale-[0.99] hover:border-indigo-300 hover:bg-indigo-50/40",
                answered && !isSelected && !isCorrectOption &&
                  "cursor-default border-slate-100 bg-slate-50/80 text-slate-400 opacity-70",
                showAsCorrect &&
                  "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200",
                showAsWrong &&
                  "border-rose-400 bg-rose-50 text-rose-900 ring-2 ring-rose-200",
                answered && isSelected && isCorrectOption &&
                  "border-emerald-400 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-200"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                  showAsCorrect || (answered && isSelected && isCorrectOption)
                    ? "bg-emerald-600 text-white"
                    : showAsWrong
                      ? "bg-rose-600 text-white"
                      : isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                )}
              >
                {option.label}
              </span>
              <span className="flex-1 leading-snug">{optionText}</span>
              {showAsCorrect && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              )}
              {showAsWrong && (
                <XCircle className="h-5 w-5 shrink-0 text-rose-600" aria-hidden />
              )}
            </button>
          );
        })}
      </div>

      {answered && selected && correctOption && (
        <div className="px-4 pb-4 sm:px-6 sm:pb-5">
          <AnswerFeedback
            isCorrect={isCorrect}
            correctLabel={question.correctAnswer}
            correctText={isHi ? correctOption.textHi : correctOption.text}
            explanation={
              isHi ? question.explanationHi : question.explanation
            }
            onTryAgain={!isCorrect ? handleTryAgain : undefined}
            language={language}
          />
        </div>
      )}
    </article>
  );
}
