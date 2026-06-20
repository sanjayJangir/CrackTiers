"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Lock, BookOpen, Loader2, SlidersHorizontal } from "lucide-react";
import QuestionCard from "@/components/cards/QuestionCard";
import LockedQuestionCard from "@/components/cards/LockedQuestionCard";
import CategoryPills from "@/components/ui/CategoryPills";
import FilterBar from "@/components/ui/FilterBar";
import ProgressBar from "@/components/ui/ProgressBar";
import SearchBar from "@/components/ui/SearchBar";
import SubjectPills from "@/components/ui/SubjectPills";
import { getCategoryLabel } from "@/lib/category-labels";
import { FREE_QUESTION_LIMIT } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { applyFreeLimit, useQuestions } from "@/lib/use-questions";
import { cn } from "@/lib/utils";

const INITIAL_BATCH = 15;
const LOAD_MORE_BATCH = 15;

interface QuestionListProps {
  categoryFilter?: string;
  subcategoryFilter?: string;
  categoryName?: string;
  subcategoryName?: string;
  subjectFilter?: string;
}

export default function QuestionList({
  categoryFilter,
  subcategoryFilter,
  categoryName,
  subcategoryName,
  subjectFilter,
}: QuestionListProps) {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryFilter ?? "all");
  const [subject, setSubject] = useState(subjectFilter ?? "all");
  const [difficulty, setDifficulty] = useState("all");
  const [year, setYear] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [renderCount, setRenderCount] = useState(INITIAL_BATCH);

  const activeCategory = categoryFilter ?? category;
  const showBrowsePills = !categoryFilter && !subjectFilter;

  const { questions, total, loading, error } = useQuestions({
    search,
    category: activeCategory === "all" ? undefined : activeCategory,
    subcategory: subcategoryFilter,
    subject: subjectFilter ?? subject,
    difficulty,
    year,
  });

  const { visible, showLocked } = applyFreeLimit(questions, isLoggedIn);
  const displayed = visible.slice(0, renderCount);
  const hasMore = renderCount < visible.length;

  useEffect(() => {
    setRenderCount(INITIAL_BATCH);
  }, [
    search,
    category,
    subject,
    difficulty,
    year,
    activeCategory,
    subcategoryFilter,
    subjectFilter,
    isLoggedIn,
  ]);

  const contextTitle = subcategoryName
    ? subcategoryName
    : categoryName ??
      (activeCategory !== "all" ? getCategoryLabel(activeCategory) : "All Questions");

  const activeFilterCount = [
    difficulty !== "all",
    year !== "all",
    !showBrowsePills && category !== "all",
    !showBrowsePills && subject !== "all",
  ].filter(Boolean).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {(categoryFilter || activeCategory !== "all") && (
        <div className="rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-blue-50 px-3 py-3 sm:px-5 sm:py-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white sm:h-10 sm:w-10">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                {categoryName ?? getCategoryLabel(activeCategory)}
              </p>
              <p className="mt-0.5 text-base font-bold text-slate-900 sm:text-lg">
                {contextTitle}
              </p>
              {!loading && (
                <p className="mt-1 text-sm text-slate-600">
                  {total.toLocaleString()} questions in this section
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-5">
        <SearchBar value={search} onChange={setSearch} />

        {showBrowsePills && (
          <>
            <div className="mt-3 sm:mt-4">
              <SubjectPills activeSubject={subject} onChange={setSubject} />
            </div>
            <div className="mt-3 sm:mt-4">
              <CategoryPills activeCategory={category} onChange={setCategory} />
            </div>
          </>
        )}

        {/* Mobile: collapse difficulty/year filters */}
        {showBrowsePills && (
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className="mt-3 flex w-full min-h-[44px] items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 lg:hidden"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
              Difficulty & Year
              {activeFilterCount > 0 && (
                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition",
                filtersOpen && "rotate-180"
              )}
            />
          </button>
        )}

        <div
          className={cn(
            "mt-3 sm:mt-4",
            showBrowsePills && !filtersOpen && "hidden lg:block"
          )}
        >
          <FilterBar
            category={category}
            subject={subjectFilter ?? subject}
            difficulty={difficulty}
            year={year}
            onCategoryChange={
              categoryFilter || subjectFilter || showBrowsePills
                ? undefined
                : setCategory
            }
            onSubjectChange={
              subjectFilter || showBrowsePills ? undefined : setSubject
            }
            onDifficultyChange={setDifficulty}
            onYearChange={setYear}
            hideCategory={!!categoryFilter || showBrowsePills}
            hideSubject={!!subjectFilter || showBrowsePills}
            hideHeader={showBrowsePills}
            compact
          />
        </div>
      </div>

      {!authLoading && !isLoggedIn && (
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-3 sm:p-5">
          <ProgressBar
            current={Math.min(visible.length, FREE_QUESTION_LIMIT)}
            max={FREE_QUESTION_LIMIT}
            label={`${FREE_QUESTION_LIMIT} free · Register for 10,000+`}
          />
          <div className="mt-3 flex flex-col gap-3">
            <p className="flex items-start gap-2 text-sm font-medium text-amber-800">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" />
              Register free to unlock all questions
            </p>
            <Link
              href="/register"
              className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] sm:w-auto sm:self-start"
            >
              Register to Unlock All
            </Link>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 py-12 sm:py-16">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          <p className="text-sm text-slate-500">Loading question bank…</p>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {total > 0 && (
            <p className="text-sm font-medium text-slate-600">
              {isLoggedIn
                ? `Showing ${displayed.length.toLocaleString()} of ${visible.length.toLocaleString()} questions`
                : `Showing ${displayed.length} of ${Math.min(visible.length, FREE_QUESTION_LIMIT)} free questions`}
              {!isLoggedIn && showLocked && (
                <span className="text-slate-400"> · register for all</span>
              )}
            </p>
          )}

          <div className="space-y-4 sm:space-y-6">
            {displayed.map((q, i) => (
              <QuestionCard key={q.id} question={q} index={i + 1} />
            ))}

            {hasMore && (
              <button
                type="button"
                onClick={() =>
                  setRenderCount((c) => c + LOAD_MORE_BATCH)
                }
                className="flex w-full min-h-[48px] items-center justify-center rounded-xl border border-indigo-200 bg-white text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 active:scale-[0.99]"
              >
                Load more questions ({visible.length - renderCount} remaining)
              </button>
            )}

            {showLocked && !isLoggedIn && !hasMore && (
              <>
                {[1, 2, 3].map((i) => (
                  <LockedQuestionCard key={i} index={FREE_QUESTION_LIMIT + i} />
                ))}
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 text-center sm:p-6">
                  <p className="text-sm font-semibold text-indigo-900 sm:text-base">
                    Register free to access all {total.toLocaleString()} questions
                  </p>
                  <Link
                    href="/register"
                    className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white sm:w-auto"
                  >
                    Create Free Account
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {!loading && total === 0 && !error && (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-12 text-center sm:py-16">
          <p className="text-lg font-semibold text-slate-700">No questions found</p>
          <p className="mt-2 text-sm text-slate-500">
            Try a different subject, category, or clear filters
          </p>
        </div>
      )}
    </div>
  );
}
