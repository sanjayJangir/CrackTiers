"use client";

import { DIFFICULTIES, SUBJECTS, CURRENT_YEARS } from "@/lib/constants";
import { categories } from "@/data/categories";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  category?: string;
  subject: string;
  difficulty: string;
  year?: string;
  onCategoryChange?: (value: string) => void;
  onSubjectChange?: (value: string) => void;
  onDifficultyChange: (value: string) => void;
  onYearChange?: (value: string) => void;
  hideCategory?: boolean;
  hideSubject?: boolean;
  compact?: boolean;
  hideHeader?: boolean;
}

const selectClass =
  "w-full min-h-[48px] rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none";

export default function FilterBar({
  category = "all",
  subject,
  difficulty,
  year = "all",
  onCategoryChange,
  onSubjectChange,
  onDifficultyChange,
  onYearChange,
  hideCategory = false,
  hideSubject = false,
  compact = false,
  hideHeader = false,
}: FilterBarProps) {
  const cols = [
    !hideCategory && onCategoryChange,
    !hideSubject && onSubjectChange,
    true,
    onYearChange,
  ].filter(Boolean).length;

  const gridClass =
    cols === 2
      ? "grid-cols-2"
      : cols === 1
        ? "grid-cols-1"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <div className={cn(compact ? "space-y-3" : "space-y-4")}>
      {!hideHeader && (
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <Filter className="h-4 w-4 text-indigo-500" aria-hidden />
          Filter questions
        </div>
      )}
      <div className={cn("grid gap-3", gridClass)}>
        {!hideCategory && onCategoryChange && (
          <div>
            <label htmlFor="filter-category" className="mb-1.5 block text-xs font-medium text-slate-500">
              Category
            </label>
            <select
              id="filter-category"
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {!hideSubject && onSubjectChange && (
          <div>
            <label htmlFor="filter-subject" className="mb-1.5 block text-xs font-medium text-slate-500">
              Subject
            </label>
            <select
              id="filter-subject"
              value={subject}
              onChange={(e) => onSubjectChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Subjects</option>
              {SUBJECTS.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="filter-difficulty" className="mb-1.5 block text-xs font-medium text-slate-500">
            Difficulty
          </label>
          <select
            id="filter-difficulty"
            value={difficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className={selectClass}
          >
            <option value="all">All Levels</option>
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {onYearChange && (
          <div>
            <label htmlFor="filter-year" className="mb-1.5 block text-xs font-medium text-slate-500">
              Year
            </label>
            <select
              id="filter-year"
              value={year}
              onChange={(e) => onYearChange(e.target.value)}
              className={selectClass}
            >
              <option value="all">All Years</option>
              {CURRENT_YEARS.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
