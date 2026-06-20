"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import type { SubCategory } from "@/data/types";

interface SubcategoryTabsProps {
  categorySlug: string;
  subcategories: SubCategory[];
  activeSub?: string;
}

export default function SubcategoryTabs({
  categorySlug,
  subcategories,
  activeSub,
}: SubcategoryTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setSub = (subSlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (subSlug) {
      params.set("sub", subSlug);
    } else {
      params.delete("sub");
    }
    const query = params.toString();
    router.push(`/category/${categorySlug}${query ? `?${query}` : ""}`, {
      scroll: false,
    });
  };

  return (
    <div className="-mx-4 sm:mx-0">
      <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:px-0">
        Pick an exam / topic
      </p>
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setSub(null)}
          className={cn(
            "shrink-0 rounded-full px-4 py-3 text-sm font-medium transition active:scale-[0.97]",
            !activeSub
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
          )}
        >
          All
        </button>
        {subcategories.map((sub) => (
          <button
            key={sub.slug}
            type="button"
            onClick={() => setSub(sub.slug)}
            className={cn(
              "shrink-0 rounded-full px-4 py-3 text-sm font-medium transition active:scale-[0.97]",
              activeSub === sub.slug
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"
            )}
          >
            {sub.name}
            <span className="ml-1.5 text-xs opacity-75">({sub.questionCount})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
