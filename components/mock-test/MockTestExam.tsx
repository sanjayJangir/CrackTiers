"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Flag,
  ListChecks,
  Loader2,
  Pencil,
  Send,
  X,
} from "lucide-react";
import MockTestTimer from "@/components/mock-test/MockTestTimer";
import QuestionPalette from "@/components/mock-test/QuestionPalette";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/lib/language-context";
import {
  calculateMockResult,
  getMockSession,
  saveMockResult,
  clearMockSession,
  updateMockSession,
} from "@/lib/mock-test-storage";
import { cn } from "@/lib/utils";

export default function MockTestExam() {
  const router = useRouter();
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [session, setSession] = useState(() => getMockSession());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReview, setShowReview] = useState(false);

  if (!session) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-lg font-semibold text-slate-700">No active mock test</p>
        <button
          type="button"
          onClick={() => router.push("/online-test-series")}
          className="mt-4 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          Browse Test Series
        </button>
      </div>
    );
  }

  const question = session.questions[currentIndex];
  const questionIds = session.questions.map((q) => q.id);
  const selected = session.answers[question.id];
  const answeredCount = Object.values(session.answers).filter(Boolean).length;
  const unansweredCount = session.totalQuestions - answeredCount;
  const markedCount = session.markedForReview.length;

  const refreshSession = () => setSession(getMockSession());

  const selectAnswer = (label: string) => {
    updateMockSession((s) => ({
      ...s,
      answers: { ...s.answers, [question.id]: label },
    }));
    refreshSession();
  };

  const clearAnswer = () => {
    updateMockSession((s) => ({
      ...s,
      answers: { ...s.answers, [question.id]: null },
    }));
    refreshSession();
  };

  const toggleMark = () => {
    updateMockSession((s) => {
      const marked = s.markedForReview.includes(question.id)
        ? s.markedForReview.filter((id) => id !== question.id)
        : [...s.markedForReview, question.id];
      return { ...s, markedForReview: marked };
    });
    refreshSession();
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowReview(false);
    setShowConfirm(false);
  };

  const submitTest = (auto = false) => {
    setSubmitting(true);
    const start = new Date(session.startedAt).getTime();
    const timeTaken = Math.floor((Date.now() - start) / 1000);

    const finalSession = getMockSession() ?? session;
    const result = calculateMockResult(finalSession, timeTaken);
    saveMockResult(result);
    clearMockSession();

    router.push(`/mock-test/results${auto ? "?auto=1" : ""}`);
  };

  const questionText = isHi ? question.questionHi : question.question;

  const t = {
    mark: isHi ? "समीक्षा" : "Mark",
    unmark: isHi ? "हटाएं" : "Unmark",
    clear: isHi ? "उत्तर हटाएं" : "Clear Answer",
    changeHint: isHi
      ? "बदलने के लिए दूसरा विकल्प चुनें"
      : "Tap another option to change your answer",
    selected: isHi ? "चयनित उत्तर" : "Selected answer",
    editReview: isHi ? "समीक्षा और संपादन" : "Review & Edit",
    prev: isHi ? "पिछला" : "Previous",
    next: isHi ? "अगला" : "Next",
    submit: isHi ? "जमा करें" : "Submit Test",
    submitEarly: isHi ? "टेस्ट जमा करें" : "Submit test early",
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-8">
      {/* Sticky header */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-lg">
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{session.title}</p>
              <p className="text-xs text-slate-500">
                {answeredCount}/{session.totalQuestions}{" "}
                {isHi ? "उत्तर दिए" : "answered"}
                {markedCount > 0 && ` · ${markedCount} ${isHi ? "चिह्नित" : "marked"}`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowReview(true)}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                <ListChecks className="h-4 w-4" />
                <span className="hidden sm:inline">{t.editReview}</span>
              </button>
              <div className="w-full sm:w-52">
                <MockTestTimer
                  durationMinutes={session.durationMinutes}
                  startedAt={session.startedAt}
                  onTimeUp={() => submitTest(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-6">
        <QuestionPalette
          total={session.totalQuestions}
          current={currentIndex}
          answers={session.answers}
          questionIds={questionIds}
          marked={session.markedForReview}
          onSelect={goToQuestion}
        />

        <article className="mt-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
                  {currentIndex + 1}
                </span>
                <Badge variant="outline">{question.subject}</Badge>
                <Badge variant="difficulty" difficulty={question.difficulty}>
                  {question.difficulty}
                </Badge>
              </div>
              <button
                type="button"
                onClick={toggleMark}
                className={cn(
                  "inline-flex min-h-[40px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition",
                  session.markedForReview.includes(question.id)
                    ? "bg-amber-100 text-amber-800 ring-1 ring-amber-300"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <Flag className="h-4 w-4" />
                {session.markedForReview.includes(question.id) ? t.unmark : t.mark}
              </button>
            </div>
            <h2 className="text-base font-semibold leading-relaxed text-slate-900 sm:text-lg">
              {questionText}
            </h2>
          </div>

          <div className="space-y-2.5 px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-xs font-medium text-slate-500">{t.changeHint}</p>

            {question.options.map((option) => {
              const isSelected = selected === option.label;
              const text = isHi ? option.textHi : option.text;

              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => selectAnswer(option.label)}
                  className={cn(
                    "flex w-full min-h-[52px] items-center gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm transition active:scale-[0.99] sm:text-base",
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200"
                      : "border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-slate-700"
                    )}
                  >
                    {option.label}
                  </span>
                  <span className="flex-1">{text}</span>
                  {isSelected && (
                    <Pencil className="h-4 w-4 shrink-0 text-indigo-500" aria-hidden />
                  )}
                </button>
              );
            })}

            {/* Edit / clear answer bar */}
            {selected && (
              <div className="mt-4 flex flex-col gap-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-indigo-900">
                  <span className="font-medium">{t.selected}:</span>{" "}
                  <span className="font-bold">({selected})</span>
                </p>
                <button
                  type="button"
                  onClick={clearAnswer}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-50"
                >
                  <Eraser className="h-4 w-4" />
                  {t.clear}
                </button>
              </div>
            )}
          </div>
        </article>

        {/* Navigation */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
            {t.prev}
          </button>

          {currentIndex < session.totalQuestions - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((i) => i + 1)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              {t.next}
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirm(true)}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              <Send className="h-4 w-4" />
              {t.submit}
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => setShowReview(true)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            <ListChecks className="h-4 w-4" />
            {t.editReview}
          </button>
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            {t.submitEarly}
          </button>
        </div>
      </div>

      {/* Review & Edit panel */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4">
          <div className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.editReview}</h3>
                <p className="text-xs text-slate-500">
                  {answeredCount} {isHi ? "उत्तर" : "answered"} · {unansweredCount}{" "}
                  {isHi ? "बाकी" : "left"} · {markedCount}{" "}
                  {isHi ? "चिह्नित" : "marked"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <div className="space-y-2">
                {session.questions.map((q, i) => {
                  const ans = session.answers[q.id];
                  const isMarked = session.markedForReview.includes(q.id);
                  const isCurrent = i === currentIndex;

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => goToQuestion(i)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition hover:border-indigo-200 hover:bg-indigo-50/50",
                        isCurrent
                          ? "border-indigo-300 bg-indigo-50"
                          : "border-slate-200 bg-white"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
                          ans
                            ? "bg-indigo-600 text-white"
                            : isMarked
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-600"
                        )}
                      >
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {isHi ? q.questionHi : q.question}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {ans
                            ? `${isHi ? "उत्तर" : "Answer"}: ${ans}`
                            : isHi
                              ? "कोई उत्तर नहीं"
                              : "Not answered"}
                          {isMarked && ` · ${isHi ? "चिह्नित" : "Marked"}`}
                        </p>
                      </div>
                      <Pencil className="h-4 w-4 shrink-0 text-indigo-500" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-slate-100 p-4">
              <button
                type="button"
                onClick={() => {
                  setShowReview(false);
                  setShowConfirm(true);
                }}
                className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white"
              >
                <Send className="h-4 w-4" />
                {isHi ? "अब जमा करें" : "Submit Now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit confirmation */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-4 sm:items-center">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <BookOpen className="mx-auto h-10 w-10 text-indigo-600" />
            <h3 className="mt-3 text-center text-lg font-bold text-slate-900">
              {isHi ? "टेस्ट जमा करें?" : "Submit Mock Test?"}
            </h3>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-emerald-50 py-2">
                <p className="text-lg font-bold text-emerald-700">{answeredCount}</p>
                <p className="text-[10px] text-emerald-600">{isHi ? "उत्तर" : "Answered"}</p>
              </div>
              <div className="rounded-lg bg-slate-50 py-2">
                <p className="text-lg font-bold text-slate-700">{unansweredCount}</p>
                <p className="text-[10px] text-slate-500">{isHi ? "बाकी" : "Skipped"}</p>
              </div>
              <div className="rounded-lg bg-amber-50 py-2">
                <p className="text-lg font-bold text-amber-700">{markedCount}</p>
                <p className="text-[10px] text-amber-600">{isHi ? "चिह्नित" : "Marked"}</p>
              </div>
            </div>

            {(unansweredCount > 0 || markedCount > 0) && (
              <button
                type="button"
                onClick={() => {
                  setShowConfirm(false);
                  setShowReview(true);
                }}
                className="mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 text-sm font-semibold text-indigo-700"
              >
                <Pencil className="h-4 w-4" />
                {isHi ? "संपादन के लिए वापस जाएं" : "Go Back & Edit Answers"}
              </button>
            )}

            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="min-h-[48px] flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
              >
                {isHi ? "रद्द करें" : "Cancel"}
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={() => submitTest()}
                className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white disabled:opacity-70"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isHi ? "हाँ, जमा करें" : "Yes, Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
