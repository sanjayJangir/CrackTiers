import { cn, getDifficultyColor } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "difficulty" | "outline";
  difficulty?: string;
  className?: string;
  title?: string;
}

export default function Badge({
  children,
  variant = "default",
  difficulty,
  className,
  title,
}: BadgeProps) {
  if (variant === "difficulty" && difficulty) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
          getDifficultyColor(difficulty),
          className
        )}
      >
        {children}
      </span>
    );
  }

  if (variant === "outline") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600",
          className
        )}
        title={title}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-700",
        className
      )}
    >
      {children}
    </span>
  );
}
