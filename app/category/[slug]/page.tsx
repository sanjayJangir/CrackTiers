import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import QuestionList from "@/components/QuestionList";
import JsonLd from "@/components/seo/JsonLd";
import SubcategoryTabs from "@/components/ui/SubcategoryTabs";
import { getCategoryBySlug } from "@/data/categories";
import {
  getQuestionsByCategory,
  getQuestionsBySubcategory,
} from "@/data/question-loader";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sub?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: "Category" };

  return buildMetadata({
    title: `${category.name} — Practice Questions Hindi & English`,
    description: `${category.description} 10,000+ MCQs for SSC, UPSC, Railway, Banking & State PSC.`,
    path: `/category/${slug}`,
    keywords: [category.name, "SSC", "UPSC", "government exam", "MCQ Hindi English"],
  });
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sub } = await searchParams;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const activeSub = sub
    ? category.subcategories.find((s) => s.slug === sub)
    : null;

  const subsWithCounts = category.subcategories.map((s) => ({
    ...s,
    questionCount: getQuestionsBySubcategory(slug, s.slug).length,
  }));

  const questionCount = activeSub
    ? getQuestionsBySubcategory(slug, activeSub.slug).length
    : getQuestionsByCategory(slug).length;

  return (
    <AppShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Question Bank", path: "/question-bank" },
          { name: category.name, path: `/category/${slug}` },
        ])}
      />
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <Link
          href="/question-bank"
          className="mb-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Question Bank
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {category.name}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-base">
            {category.description}
          </p>
        </div>

        <Suspense
          fallback={<div className="mb-6 h-12 animate-pulse rounded-xl bg-slate-100" />}
        >
          <SubcategoryTabs
            categorySlug={slug}
            subcategories={subsWithCounts}
            activeSub={activeSub?.slug}
          />
        </Suspense>

        <p className="mb-5 text-sm font-medium text-indigo-600">
          {questionCount.toLocaleString()} question
          {questionCount !== 1 ? "s" : ""}{" "}
          {activeSub ? `in ${activeSub.name}` : "in this category"}
        </p>

        <QuestionList
          categoryFilter={slug}
          subcategoryFilter={activeSub?.slug}
          categoryName={category.name}
          subcategoryName={activeSub?.name}
        />
      </div>
    </AppShell>
  );
}
