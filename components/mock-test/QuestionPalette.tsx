"use client";

import { cn } from "@/lib/utils";

interface QuestionPaletteProps {
  total: number;
  current: number;
  answers: Record<string, string | null>;
  questionIds: string[];
  marked: string[];
  onSelect: (index: number) => void;
}

export default function QuestionPalette({
  total,
  current,
  answers,
  questionIds,
  marked,
  onSelect,
}: QuestionPaletteProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3 sm:p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Question Palette — tap to edit
      </p>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
        {Array.from({ length: total }, (_, i) => {
          const qId = questionIds[i];
          const answer = answers[qId];
          const answered = answer != null;
          const isMarked = marked.includes(qId);
          const isCurrent = i === current;

          return (
            <button
              key={qId}
              type="button"
              onClick={() => onSelect(i)}
              title={
                answered
                  ? `Q${i + 1}: Answer ${answer}`
                  : isMarked
                    ? `Q${i + 1}: Marked for review`
                    : `Q${i + 1}: Not answered`
              }
              className={cn(
                "relative flex h-10 min-w-[40px] flex-col items-center justify-center rounded-lg text-sm font-semibold transition active:scale-95",
                isCurrent && "ring-2 ring-indigo-500 ring-offset-1",
                answered && isMarked
                  ? "bg-indigo-600 text-white ring-2 ring-amber-400"
                  : answered
                    ? "bg-indigo-600 text-white"
                    : isMarked
                      ? "bg-amber-100 text-amber-800 ring-1 ring-amber-300"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <span>{i + 1}</span>
              {answered && (
                <span className="text-[9px] font-bold leading-none opacity-90">
                  {answer}
                </span>
              )}
              {isMarked && !answered && (
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-indigo-600" /> Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-slate-100 ring-1 ring-slate-200" /> Not answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-amber-100 ring-1 ring-amber-300" /> Marked
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-indigo-600 ring-2 ring-amber-400" /> Marked + answered
        </span>
      </div>
    </div>
  );
}
