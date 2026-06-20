import type { Category } from "./types";

export const categories: Category[] = [
  {
    id: "central-government",
    name: "Central Government Exams",
    slug: "central-government",
    description:
      "Prepare for SSC, UPSC, Railway, Banking, Defence & Teaching exams with curated question sets.",
    icon: "Landmark",
    subcategories: [
      { id: "ssc", name: "SSC", slug: "ssc", questionCount: 12 },
      { id: "upsc", name: "UPSC", slug: "upsc", questionCount: 10 },
      { id: "railway", name: "Railway", slug: "railway", questionCount: 8 },
      { id: "banking", name: "Banking", slug: "banking", questionCount: 10 },
      { id: "defence", name: "Defence", slug: "defence", questionCount: 6 },
      { id: "teaching", name: "Teaching", slug: "teaching", questionCount: 8 },
    ],
  },
  {
    id: "state-government",
    name: "State Government Exams",
    slug: "state-government",
    description:
      "State-specific exam preparation for Rajasthan, UP, Bihar, MP, Maharashtra & Gujarat.",
    icon: "MapPin",
    subcategories: [
      { id: "rajasthan", name: "Rajasthan", slug: "rajasthan", questionCount: 8 },
      { id: "uttar-pradesh", name: "Uttar Pradesh", slug: "uttar-pradesh", questionCount: 8 },
      { id: "bihar", name: "Bihar", slug: "bihar", questionCount: 6 },
      { id: "madhya-pradesh", name: "Madhya Pradesh", slug: "madhya-pradesh", questionCount: 7 },
      { id: "maharashtra", name: "Maharashtra", slug: "maharashtra", questionCount: 8 },
      { id: "gujarat", name: "Gujarat", slug: "gujarat", questionCount: 7 },
    ],
  },
  {
    id: "subjects",
    name: "Subjects",
    slug: "subjects",
    description:
      "Practice by subject — GK, Reasoning, Quant, English, Current Affairs & Computer Knowledge.",
    icon: "BookOpen",
    subcategories: [
      { id: "general-knowledge", name: "General Knowledge", slug: "general-knowledge", questionCount: 12 },
      { id: "reasoning", name: "Reasoning", slug: "reasoning", questionCount: 10 },
      { id: "quantitative-aptitude", name: "Quantitative Aptitude", slug: "quantitative-aptitude", questionCount: 10 },
      { id: "english", name: "English", slug: "english", questionCount: 8 },
      { id: "current-affairs", name: "Current Affairs", slug: "current-affairs", questionCount: 8 },
      { id: "computer-knowledge", name: "Computer Knowledge", slug: "computer-knowledge", questionCount: 6 },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subSlug: string
) {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find((s) => s.slug === subSlug);
}
