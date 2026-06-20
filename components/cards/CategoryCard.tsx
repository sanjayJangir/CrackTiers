import Link from "next/link";
import {
  BookOpen,
  Landmark,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/data/types";

const iconMap: Record<string, LucideIcon> = {
  Landmark,
  MapPin,
  BookOpen,
};

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export default function CategoryCard({ category, className }: CategoryCardProps) {
  const Icon = iconMap[category.icon] ?? BookOpen;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50",
        className
      )}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-md shadow-indigo-200 transition group-hover:scale-110">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900 group-hover:text-indigo-700">
        {category.name}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-500">
        {category.description}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-indigo-600">
          {category.subcategories.length} subcategories
        </span>
        <span className="text-sm font-medium text-indigo-600 opacity-0 transition group-hover:opacity-100">
          Explore →
        </span>
      </div>
    </Link>
  );
}
