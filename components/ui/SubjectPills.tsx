"use client";

import { SUBJECTS } from "@/lib/constants";
import { SUBJECT_SHORT } from "@/lib/display-labels";
import { cn } from "@/lib/utils";

interface SubjectPillsProps {
  activeSubject: string;
  onChange: (slug: string) => void;
}

export default function SubjectPills({
  activeSubject,
  onChange,
}: SubjectPillsProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Browse by subject
      </p>
      <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => onChange("all")}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-2.5 text-sm font-medium transition active:scale-[0.97] sm:px-4 sm:py-3",
            activeSubject === "all"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          All Subjects
        </button>
        {SUBJECTS.map((sub) => (
          <button
            key={sub}
            type="button"
            onClick={() => onChange(sub)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-2.5 text-sm font-medium transition active:scale-[0.97] sm:px-4 sm:py-3",
              activeSubject === sub
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {SUBJECT_SHORT[sub] ?? sub}
          </button>
        ))}
      </div>
    </div>
  );
}
