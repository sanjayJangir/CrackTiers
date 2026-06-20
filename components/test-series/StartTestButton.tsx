"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Lock, Play } from "lucide-react";
import type { ExamTestSeries, TestPaper } from "@/data/test-series";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";
import { saveMockSession } from "@/lib/mock-test-storage";
import { cn } from "@/lib/utils";

interface StartTestButtonProps {
  series: ExamTestSeries;
  paper: TestPaper;
  variant?: "card" | "row";
}

export default function StartTestButton({
  series,
  paper,
  variant = "row",
}: StartTestButtonProps) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { language } = useLanguage();
  const isHi = language === "hi";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const locked = !paper.isFree && !isLoggedIn;

  const start = async () => {
    if (locked) {
      router.push("/register");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/mock-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          examSlug: series.slug,
          testId: paper.id,
          isLoggedIn,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Could not start test");
      }

      if (!data.session?.questions?.length) {
        throw new Error("No questions loaded for this test");
      }

      try {
        saveMockSession(data.session);
      } catch {
        throw new Error("Test is too large to save. Try a shorter test or register.");
      }

      router.push("/mock-test/take");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  };

  const buttonClass = cn(
    "inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:opacity-70",
    locked
      ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200 hover:bg-amber-100"
      : "bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
  );

  const content = loading ? (
    <Loader2 className="h-4 w-4 animate-spin" />
  ) : locked ? (
    <>
      <Lock className="h-4 w-4" />
      {isHi ? "रजिस्टर" : "Register"}
    </>
  ) : (
    <>
      <Play className="h-4 w-4" />
      {isHi ? "शुरू करें" : "Start"}
    </>
  );

  if (variant === "card") {
    return (
      <div>
        {error && <p className="mb-2 text-xs text-rose-600">{error}</p>}
        <button
          type="button"
          disabled={loading}
          onClick={start}
          className={cn(
            "mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl text-sm font-semibold transition",
            locked
              ? "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          )}
        >
          {content}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      {error && (
        <p className="flex max-w-xs items-start gap-1.5 text-right text-xs text-rose-600">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      )}
      <button
        type="button"
        disabled={loading}
        onClick={start}
        className={buttonClass}
      >
        {content}
      </button>
    </div>
  );
}
