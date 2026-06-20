"use client";

import { categories } from "@/data/categories";
import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  activeCategory: string;
  onChange: (slug: string) => void;
}

/** Short labels for mobile-friendly category pills */
const SHORT_LABELS: Record<string, string> = {
  "central-government": "Central Govt",
  "state-government": "State Govt",
  subjects: "By Subject",
};

export default function CategoryPills({
  activeCategory,
  onChange,
}: CategoryPillsProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Browse by category
      </p>
      <div className="-mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => onChange("all")}
          className={cn(
            "shrink-0 rounded-full px-3.5 py-2.5 text-sm font-medium transition active:scale-[0.97] sm:px-4 sm:py-3",
            activeCategory === "all"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onChange(cat.slug)}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-2.5 text-sm font-medium transition active:scale-[0.97] sm:px-4 sm:py-3",
              activeCategory === cat.slug
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            )}
          >
            {SHORT_LABELS[cat.slug] ?? cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
