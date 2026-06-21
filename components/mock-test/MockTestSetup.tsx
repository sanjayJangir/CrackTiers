"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock,
  FileQuestion,
  Loader2,
  Lock,
  Zap,
} from "lucide-react";
import Link from "next/link";
import {
  FREE_MOCK_MAX_DURATION,
  FREE_MOCK_MAX_QUESTIONS,
  MOCK_TEST_COUNTS,
  MOCK_TEST_DURATIONS,
  MOCK_TEST_PRESETS,
  SUBJECTS,
} from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { withBasePath } from "@/lib/base-path";
import { useLanguage } from "@/lib/language-context";
import { saveMockSession } from "@/lib/mock-test-storage";
import { cn } from "@/lib/utils";

export default function MockTestSetup() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [subject, setSubject] = useState("all");
  const [count, setCount] = useState<number>(20);
  const [duration, setDuration] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const maxQ = isLoggedIn ? 50 : FREE_MOCK_MAX_QUESTIONS;
  const maxMin = isLoggedIn ? 60 : FREE_MOCK_MAX_DURATION;

  const applyPreset = (questions: number, minutes: number) => {
    setCount(Math.min(questions, maxQ));
    setDuration(Math.min(minutes, maxMin));
  };

  const startTest = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(withBasePath("/api/mock-test"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          count,
          durationMinutes: duration,
          isLoggedIn,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to start test");

      saveMockSession(data.session);
      router.push("/mock-test/take");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
          {isHi ? "त्वरित शुरुआत" : "Quick Start"}
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {MOCK_TEST_PRESETS.map((preset) => {
            const locked = !isLoggedIn && preset.questions > FREE_MOCK_MAX_QUESTIONS;
            return (
              <button
                key={preset.id}
                type="button"
                disabled={locked}
                onClick={() => applyPreset(preset.questions, preset.minutes)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-md",
                  locked
                    ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
                    : count === Math.min(preset.questions, maxQ) &&
                        duration === Math.min(preset.minutes, maxMin)
                      ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-200"
                      : "border-slate-200 bg-white hover:border-indigo-200"
                )}
              >
                <Zap className="mb-2 h-5 w-5 text-indigo-600" />
                <p className="font-semibold text-slate-900">
                  {isHi ? preset.nameHi : preset.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">{preset.description}</p>
                {locked && (
                  <p className="mt-2 flex items-center gap-1 text-xs text-amber-600">
                    <Lock className="h-3 w-3" /> Register to unlock
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom config */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-slate-900">
          {isHi ? "अपना मॉक टेस्ट बनाएं" : "Create Your Mock Test"}
        </h2>

        <div className="space-y-5">
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <BookOpen className="h-4 w-4 text-indigo-500" />
              {isHi ? "विषय" : "Subject"}
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full min-h-[48px] rounded-xl border border-slate-200 px-4 py-3 text-base"
            >
              <option value="all">{isHi ? "सभी विषय" : "All Subjects"}</option>
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FileQuestion className="h-4 w-4 text-indigo-500" />
              {isHi ? "प्रश्नों की संख्या" : "Number of Questions"}
            </label>
            <div className="flex flex-wrap gap-2">
              {MOCK_TEST_COUNTS.map((n) => {
                const locked = !isLoggedIn && n > FREE_MOCK_MAX_QUESTIONS;
                return (
                  <button
                    key={n}
                    type="button"
                    disabled={locked}
                    onClick={() => setCount(n)}
                    className={cn(
                      "min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition",
                      locked && "cursor-not-allowed opacity-40",
                      count === n
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <Clock className="h-4 w-4 text-indigo-500" />
              {isHi ? "समय (मिनट)" : "Duration (minutes)"}
            </label>
            <div className="flex flex-wrap gap-2">
              {MOCK_TEST_DURATIONS.map((m) => {
                const locked = !isLoggedIn && m > FREE_MOCK_MAX_DURATION;
                return (
                  <button
                    key={m}
                    type="button"
                    disabled={locked}
                    onClick={() => setDuration(m)}
                    className={cn(
                      "min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium transition",
                      locked && "cursor-not-allowed opacity-40",
                      duration === m
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    )}
                  >
                    {m} min
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {!isLoggedIn && (
          <div className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-amber-200">
            <Lock className="mb-1 inline h-4 w-4" /> Free: max {FREE_MOCK_MAX_QUESTIONS}{" "}
            questions, {FREE_MOCK_MAX_DURATION} min.{" "}
            <Link href="/register" className="font-semibold underline">
              Register
            </Link>{" "}
            for full mock tests (50 Q / 60 min).
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={startTest}
          className="mt-6 flex w-full min-h-[52px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-base font-semibold text-white shadow-lg transition hover:from-indigo-700 hover:to-blue-700 disabled:opacity-70"
        >
          {loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Zap className="h-5 w-5" />
          )}
          {loading
            ? isHi
              ? "तैयार हो रहा है..."
              : "Preparing test..."
            : isHi
              ? "मॉक टेस्ट शुरू करें"
              : "Start Mock Test"}
        </button>
      </div>
    </div>
  );
}
