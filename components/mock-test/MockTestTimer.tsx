"use client";

import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { formatTime } from "@/lib/mock-test-storage";
import { cn } from "@/lib/utils";

interface MockTestTimerProps {
  durationMinutes: number;
  startedAt: string;
  onTimeUp: () => void;
}

export default function MockTestTimer({
  durationMinutes,
  startedAt,
  onTimeUp,
}: MockTestTimerProps) {
  const totalSeconds = durationMinutes * 60;
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    const start = new Date(startedAt).getTime();

    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const left = Math.max(0, totalSeconds - elapsed);
      setRemaining(left);
      if (left <= 0) onTimeUp();
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt, totalSeconds, onTimeUp]);

  const isLow = remaining <= 300;
  const isCritical = remaining <= 60;
  const progress = (remaining / totalSeconds) * 100;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-2.5 ring-1",
        isCritical
          ? "bg-rose-50 ring-rose-200"
          : isLow
            ? "bg-amber-50 ring-amber-200"
            : "bg-white ring-slate-200"
      )}
    >
      {isCritical ? (
        <AlertTriangle className="h-5 w-5 shrink-0 text-rose-600 animate-pulse" />
      ) : (
        <Clock
          className={cn(
            "h-5 w-5 shrink-0",
            isLow ? "text-amber-600" : "text-indigo-600"
          )}
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={cn(
              "font-mono text-lg font-bold tabular-nums",
              isCritical
                ? "text-rose-700"
                : isLow
                  ? "text-amber-700"
                  : "text-slate-900"
            )}
          >
            {formatTime(remaining)}
          </span>
          <span className="text-xs text-slate-500">remaining</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000",
              isCritical
                ? "bg-rose-500"
                : isLow
                  ? "bg-amber-500"
                  : "bg-indigo-500"
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
