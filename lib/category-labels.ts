import { getCategoryBySlug } from "@/data/categories";

export function getCategoryLabel(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug;
}

export function getSubcategoryLabel(
  categorySlug: string,
  subSlug: string
): string {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((s) => s.slug === subSlug)?.name ?? subSlug;
}
