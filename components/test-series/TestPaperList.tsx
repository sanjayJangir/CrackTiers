"use client";

import { useState } from "react";
import { Clock, FileQuestion, Layers, Lock } from "lucide-react";
import type { ExamTestSeries, TestPaper } from "@/data/test-series";
import StartTestButton from "@/components/test-series/StartTestButton";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface TestPaperListProps {
  series: ExamTestSeries;
}

type Tab = "all" | "full" | "sectional";

export default function TestPaperList({ series }: TestPaperListProps) {
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [tab, setTab] = useState<Tab>("all");

  const filtered =
    tab === "all"
      ? series.tests
      : series.tests.filter((t) => t.type === tab);

  const tabs: { id: Tab; label: string; labelHi: string }[] = [
    { id: "all", label: "All Tests", labelHi: "सभी टेस्ट" },
    { id: "full", label: "Full Mock", labelHi: "पूर्ण मॉक" },
    { id: "sectional", label: "Sectional", labelHi: "अनुभाग" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition",
              tab === t.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            )}
          >
            {isHi ? t.labelHi : t.label}
            <span className="ml-1.5 opacity-70">
              (
              {t.id === "all"
                ? series.tests.length
                : series.tests.filter((p) => p.type === t.id).length}
              )
            </span>
          </button>
        ))}
      </div>

      {/* Test papers */}
      <div className="space-y-3">
        {filtered.map((paper) => (
          <TestPaperRow key={paper.id} series={series} paper={paper} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500">
          {isHi ? "कोई टेस्ट नहीं" : "No tests in this category"}
        </p>
      )}
    </div>
  );
}

function TestPaperRow({
  series,
  paper,
}: {
  series: ExamTestSeries;
  paper: TestPaper;
}) {
  const { language } = useLanguage();
  const isHi = language === "hi";

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg font-bold text-indigo-700">
          {String(paper.order).padStart(2, "0")}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                paper.type === "full"
                  ? "bg-violet-100 text-violet-700"
                  : "bg-sky-100 text-sky-700"
              )}
            >
              {paper.type === "full"
                ? isHi
                  ? "पूर्ण मॉक"
                  : "Full Mock"
                : isHi
                  ? "अनुभाग"
                  : "Sectional"}
            </span>
            {paper.isFree ? (
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
                Free
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-700">
                <Lock className="h-2.5 w-2.5" /> Pro
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900">
            {isHi ? paper.nameHi : paper.name}
          </h3>
          <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <FileQuestion className="h-3.5 w-3.5" />
              {paper.questions} {isHi ? "प्रश्न" : "Questions"}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {paper.durationMinutes} {isHi ? "मिनट" : "min"}
            </span>
            {paper.subject && (
              <span className="inline-flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" />
                {paper.subject.split(" (")[0]}
              </span>
            )}
          </div>
        </div>
      </div>
      <StartTestButton series={series} paper={paper} variant="row" />
    </article>
  );
}
