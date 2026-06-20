import Link from "next/link";
import { Lock } from "lucide-react";

interface LockedQuestionCardProps {
  index: number;
}

export default function LockedQuestionCard({ index }: LockedQuestionCardProps) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Blurred placeholder content */}
      <div className="pointer-events-none select-none blur-sm">
        <div className="p-6">
          <div className="mb-4 flex gap-2">
            <span className="h-7 w-7 rounded-lg bg-slate-200" />
            <span className="h-6 w-24 rounded-full bg-slate-200" />
            <span className="h-6 w-16 rounded-full bg-slate-200" />
          </div>
          <div className="mb-4 h-5 w-full rounded bg-slate-200" />
          <div className="mb-2 h-5 w-4/5 rounded bg-slate-200" />
          <div className="mt-4 space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 px-4 backdrop-blur-[2px]">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 shadow-lg">
          <Lock className="h-6 w-6" />
        </div>
        <p className="mt-3 text-sm font-semibold text-slate-800">
          Question #{index} Locked
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Register to unlock all questions
        </p>
        <Link
          href="/register"
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition active:scale-[0.98] hover:from-indigo-700 hover:to-blue-700"
        >
          Register to Unlock All Questions
        </Link>
      </div>
    </article>
  );
}
