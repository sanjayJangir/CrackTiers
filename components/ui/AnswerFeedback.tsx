"use client";

import { CheckCircle2, Lightbulb, RotateCcw, XCircle } from "lucide-react";
import type { Language } from "@/data/types";
import { cn } from "@/lib/utils";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctLabel: string;
  correctText: string;
  onTryAgain?: () => void;
  explanation?: string;
  language?: Language;
}

export default function AnswerFeedback({
  isCorrect,
  correctLabel,
  correctText,
  onTryAgain,
  explanation,
  language = "en",
}: AnswerFeedbackProps) {
  const isHi = language === "hi";

  const title = isCorrect
    ? isHi
      ? "सही उत्तर! बहुत बढ़िया"
      : "Correct! Well done"
    : isHi
      ? "गलत उत्तर — कोई बात नहीं, फिर से प्रयास करें"
      : "Wrong answer — don't worry, try again";

  const wrongMsg = isHi
    ? "सही उत्तर है"
    : "The correct answer is";

  const correctMsg = isHi
    ? "अच्छा प्रयास! ऐसे ही अभ्यास जारी रखें"
    : "Keep practicing — you're doing great!";

  const tryAgainLabel = isHi ? "फिर से प्रयास करें" : "Try Again";
  const tipLabel = isHi ? "संकेत" : "Tip";

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        "mt-4 overflow-hidden rounded-xl border transition-all duration-300",
        isCorrect
          ? "border-emerald-200 bg-emerald-50"
          : "border-rose-200 bg-rose-50"
      )}
    >
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
            isCorrect ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="h-5 w-5" aria-hidden />
          ) : (
            <XCircle className="h-5 w-5" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className={cn(
              "text-base font-semibold",
              isCorrect ? "text-emerald-800" : "text-rose-800"
            )}
          >
            {title}
          </p>

          {!isCorrect && (
            <p className="mt-1.5 text-sm leading-relaxed text-rose-700">
              {wrongMsg}{" "}
              <span className="font-semibold">
                ({correctLabel}) {correctText}
              </span>
            </p>
          )}

          {isCorrect && (
            <p className="mt-1 text-sm text-emerald-700">{correctMsg}</p>
          )}

          {explanation && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-white/70 p-3 ring-1 ring-inset ring-black/5">
              <Lightbulb
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  isCorrect ? "text-emerald-600" : "text-amber-500"
                )}
                aria-hidden
              />
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-medium text-slate-900">{tipLabel}: </span>
                {explanation}
              </p>
            </div>
          )}
        </div>
      </div>

      {!isCorrect && onTryAgain && (
        <div className="border-t border-rose-200/80 bg-rose-50/50 px-4 py-3 sm:px-5">
          <button
            type="button"
            onClick={onTryAgain}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 shadow-sm ring-1 ring-rose-200 transition active:scale-[0.98] hover:bg-rose-100 sm:w-auto"
          >
            <RotateCcw className="h-4 w-4" aria-hidden />
            {tryAgainLabel}
          </button>
        </div>
      )}
    </div>
  );
}
