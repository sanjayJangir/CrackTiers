import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileQuestion,
  GraduationCap,
  Landmark,
  MapPin,
  Shield,
  Train,
  type LucideIcon,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import TestPaperList from "@/components/test-series/TestPaperList";
import JsonLd from "@/components/seo/JsonLd";
import { getExamSeries } from "@/data/test-series";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  GraduationCap,
  Landmark,
  Train,
  Shield,
  BookOpen,
  MapPin,
};

interface ExamSeriesPageProps {
  params: Promise<{ examSlug: string }>;
}

export async function generateStaticParams() {
  const { examTestSeries } = await import("@/data/test-series");
  return examTestSeries.map((e) => ({ examSlug: e.slug }));
}

export async function generateMetadata({ params }: ExamSeriesPageProps) {
  const { examSlug } = await params;
  const series = getExamSeries(examSlug);
  if (!series) return { title: "Test Series" };

  return buildMetadata({
    title: series.name,
    description: series.description,
    path: `/online-test-series/${examSlug}`,
    keywords: [series.name, "online test series", "mock test", "free test"],
  });
}

export default async function ExamSeriesPage({ params }: ExamSeriesPageProps) {
  const { examSlug } = await params;
  const series = getExamSeries(examSlug);

  if (!series) notFound();

  const Icon = icons[series.icon] ?? BookOpen;
  const freeTests = series.tests.filter((t) => t.isFree).length;
  const totalQuestions = series.tests.reduce((s, t) => s + t.questions, 0);

  return (
    <AppShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Online Test Series", path: "/online-test-series" },
          { name: series.name, path: `/online-test-series/${examSlug}` },
        ])}
      />

      {/* Exam hero banner */}
      <section className={cn("bg-gradient-to-r px-4 py-10 text-white sm:px-6 sm:py-12", series.accent)}>
        <div className="mx-auto max-w-4xl">
          <Link
            href="/online-test-series"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Test Series
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">{series.tagline}</p>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl lg:text-4xl">
                {series.name}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {series.description}
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total Tests", value: series.tests.length },
              { label: "Free Tests", value: freeTests },
              { label: "Questions", value: `${totalQuestions}+` },
              { label: "Languages", value: "EN + HI" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl bg-white/10 px-4 py-3 text-center backdrop-blur ring-1 ring-white/20"
              >
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-white/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-b border-slate-200 bg-white py-4">
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2 px-4 text-xs text-slate-600 sm:text-sm">
          {[
            "Timed exam simulation",
            "Question palette",
            "Instant score & review",
            "Bilingual Hindi/English",
          ].map((f) => (
            <span key={f} className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Test papers */}
      <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Available Test Papers</h2>
          <div className="hidden items-center gap-3 text-xs text-slate-500 sm:flex">
            <span className="inline-flex items-center gap-1">
              <FileQuestion className="h-3.5 w-3.5" /> Questions
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Duration
            </span>
          </div>
        </div>

        <TestPaperList series={series} />
      </section>
    </AppShell>
  );
}
