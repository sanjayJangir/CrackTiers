import Link from "next/link";
import { ChevronRight, FileQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SubCategory } from "@/data/types";

interface SubCategoryCardProps {
  subcategory: SubCategory;
  categorySlug: string;
  className?: string;
}

export default function SubCategoryCard({
  subcategory,
  categorySlug,
  className,
}: SubCategoryCardProps) {
  return (
    <Link
      href={`/category/${categorySlug}?sub=${subcategory.slug}`}
      className={cn(
        "group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-md",
        className
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <FileQuestion className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-medium text-slate-900 group-hover:text-indigo-700">
          {subcategory.name}
        </h4>
        <p className="text-xs text-slate-500">
          {subcategory.questionCount}+ questions
        </p>
      </div>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-indigo-500 group-hover:translate-x-0.5" />
    </Link>
  );
}
