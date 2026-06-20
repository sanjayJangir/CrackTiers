import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  Clock,
  FileQuestion,
  GraduationCap,
  Landmark,
  MapPin,
  Shield,
  Train,
  type LucideIcon,
} from "lucide-react";
import type { ExamTestSeries } from "@/data/test-series";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  GraduationCap,
  Landmark,
  Train,
  Shield,
  BookOpen,
  MapPin,
};

interface ExamSeriesCardProps {
  series: ExamTestSeries;
}

export default function ExamSeriesCard({ series }: ExamSeriesCardProps) {
  const Icon = icons[series.icon] ?? BookOpen;
  const freeCount = series.tests.filter((t) => t.isFree).length;

  return (
    <Link
      href={`/online-test-series/${series.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl"
    >
      <div className={cn("bg-gradient-to-r px-5 py-5 text-white", series.accent)}>
        <div className="flex items-start justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-semibold">
            {series.tests.length} Tests
          </span>
        </div>
        <h3 className="mt-4 text-lg font-bold leading-snug">{series.name}</h3>
        <p className="mt-1 text-sm text-white/80">{series.tagline}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="flex-1 text-sm leading-relaxed text-slate-500 line-clamp-2">
          {series.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-emerald-600">
            {freeCount} free tests
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 group-hover:gap-2 transition-all">
            View Series <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
