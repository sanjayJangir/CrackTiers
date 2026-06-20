import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  current,
  max,
  label,
  showLabel = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.round((current / max) * 100));
  const isNearLimit = percentage >= 80;

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">
            {label ?? `${current}/${max} Free Questions Used`}
          </span>
          <span
            className={cn(
              "font-semibold",
              isNearLimit ? "text-amber-600" : "text-indigo-600"
            )}
          >
            {percentage}%
          </span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            isNearLimit
              ? "bg-gradient-to-r from-amber-400 to-orange-500"
              : "bg-gradient-to-r from-indigo-500 to-blue-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
