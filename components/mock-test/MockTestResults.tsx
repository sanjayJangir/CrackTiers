"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowDown,
  CheckCircle2,
  Clock,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/language-context";
import { formatTime, getMockResult } from "@/lib/mock-test-storage";
import { cn } from "@/lib/utils";

export default function MockTestResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const isHi = language === "hi";
  const reviewRef = useRef<HTMLDivElement>(null);

  const result = getMockResult();
  const autoSubmitted = searchParams.get("auto") === "1";

  useEffect(() => {
    if (!result) {
      router.replace("/mock-test");
    }
  }, [result, router]);

  if (!result) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const passed = result.score >= 40;
  const circumference = 2 * Math.PI * 54;
  const strokeDash = (result.score / 100) * circumference;

  const scrollToReview = () => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="pb-20">
      {/* Score hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 px-4 py-10 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          {autoSubmitted && (
            <p className="mb-4 rounded-full bg-white/10 px-4 py-1.5 text-sm text-amber-200 ring-1 ring-white/20">
              {isHi ? "समय समाप्त — ऑटो-सबमिट" : "Time's up — auto submitted"}
            </p>
          )}

          <Trophy className="mx-auto h-10 w-10 text-amber-300" />
          <h1 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
            {isHi ? "मॉक टेस्ट परिणाम" : "Mock Test Results"}
          </h1>
          <p className="mt-1 text-indigo-200">{result.title}</p>

          {/* Score ring */}
          <div className="relative mx-auto mt-8 h-40 w-40">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={passed ? "#34d399" : "#fb7185"}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - strokeDash}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{result.score}%</span>
              <span className="text-sm text-indigo-200">
                {isHi ? "स्कोर" : "Score"}
              </span>
            </div>
          </div>

          <p
            className={cn(
              "mt-4 text-lg font-semibold",
              passed ? "text-emerald-300" : "text-rose-300"
            )}
          >
            {passed
              ? isHi
                ? "अच्छा प्रयास! 🎯"
                : "Good effort! Keep practicing"
              : isHi
                ? "और अभ्यास करें — आप कर सकते हैं!"
                : "Keep practicing — you can improve!"}
          </p>

          <button
            type="button"
            onClick={scrollToReview}
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/15 px-6 py-2.5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/25"
          >
            {isHi ? "उत्तर समीक्षा देखें" : "View Answer Review"}
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </section>

      {/* Stats grid */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            {
              label: isHi ? "सही" : "Correct",
              value: result.correct,
              icon: CheckCircle2,
              color: "text-emerald-600 bg-emerald-50",
            },
            {
              label: isHi ? "गलत" : "Wrong",
              value: result.wrong,
              icon: XCircle,
              color: "text-rose-600 bg-rose-50",
            },
            {
              label: isHi ? "छोड़े" : "Skipped",
              value: result.skipped,
              icon: Target,
              color: "text-slate-600 bg-slate-100",
            },
            {
              label: isHi ? "समय" : "Time",
              value: formatTime(result.timeTakenSeconds),
              icon: Clock,
              color: "text-indigo-600 bg-indigo-50",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              >
                <div
                  className={cn(
                    "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl",
                    stat.color
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs font-medium text-slate-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl bg-indigo-50 px-4 py-3 text-center text-sm text-indigo-800">
          {isHi ? "सटीकता" : "Accuracy"}:{" "}
          <span className="font-bold">{result.accuracy}%</span>
          {" · "}
          {result.attempted}/{result.totalQuestions}{" "}
          {isHi ? "प्रयास किए" : "attempted"}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/online-test-series"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white"
          >
            <RotateCcw className="h-4 w-4" />
            {isHi ? "नई टेस्ट सीरीज" : "New Test Series"}
          </Link>
          <Link
            href="/question-bank"
            className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
          >
            {isHi ? "प्रश्न बैंक" : "Question Bank"}
          </Link>
        </div>
      </section>

      {/* Answer review — scroll target */}
      <section
        ref={reviewRef}
        className="border-t border-slate-200 bg-slate-50 px-4 py-8 sm:px-6"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-xl font-bold text-slate-900">
            {isHi ? "उत्तर समीक्षा" : "Answer Review"}
          </h2>
          <div className="space-y-4">
            {result.questionResults.map((qr) => {
              const q = qr.question;
              const text = isHi ? q.questionHi : q.question;

              return (
                <article
                  key={qr.questionId}
                  className={cn(
                    "rounded-2xl border bg-white p-4 sm:p-5",
                    qr.selected === null
                      ? "border-slate-200"
                      : qr.correct
                        ? "border-emerald-200"
                        : "border-rose-200"
                  )}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                      {qr.index}
                    </span>
                    <Badge variant="outline">{q.subject}</Badge>
                    {qr.selected === null ? (
                      <Badge variant="outline">
                        {isHi ? "छोड़ा" : "Skipped"}
                      </Badge>
                    ) : qr.correct ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />{" "}
                        {isHi ? "सही" : "Correct"}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-medium text-rose-700">
                        <XCircle className="h-3 w-3" />{" "}
                        {isHi ? "गलत" : "Wrong"}
                      </span>
                    )}
                  </div>

                  <p className="mb-4 font-medium text-slate-900">{text}</p>

                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const optText = isHi ? opt.textHi : opt.text;
                      const isCorrectOpt = opt.label === q.correctAnswer;
                      const isSelected = opt.label === qr.selected;

                      return (
                        <div
                          key={opt.label}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm",
                            isCorrectOpt && "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-200",
                            isSelected && !isCorrectOpt && "bg-rose-50 text-rose-900 ring-1 ring-rose-200",
                            !isSelected && !isCorrectOpt && "bg-slate-50 text-slate-600"
                          )}
                        >
                          <span className="font-bold">{opt.label}.</span>
                          <span>{optText}</span>
                          {isCorrectOpt && (
                            <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-600" />
                          )}
                          {isSelected && !isCorrectOpt && (
                            <XCircle className="ml-auto h-4 w-4 text-rose-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {(isHi ? q.explanationHi : q.explanation) && (
                    <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                      <span className="font-medium">
                        {isHi ? "संकेत: " : "Tip: "}
                      </span>
                      {isHi ? q.explanationHi : q.explanation}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
