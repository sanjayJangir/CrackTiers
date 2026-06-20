import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import QuestionList from "@/components/QuestionList";
import JsonLd from "@/components/seo/JsonLd";
import {
  SUBJECT_META,
  SUBJECT_NAME_TO_SLUG,
  type SubjectSlug,
} from "@/lib/constants";
import { getQuestionsBySubject } from "@/data/question-loader";
import { buildMetadata, breadcrumbJsonLd, subjectCourseJsonLd } from "@/lib/seo";

interface SubjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SUBJECT_META).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SubjectPageProps) {
  const { slug } = await params;
  const meta = SUBJECT_META[slug as SubjectSlug];
  if (!meta) return { title: "Subject" };

  return buildMetadata({
    title: `${meta.name} Questions — Hindi & English MCQs 2025–2026`,
    description: meta.description,
    path: `/subject/${slug}`,
    keywords: [
      meta.name,
      "Hindi English MCQ",
      "SSC questions",
      "government exam",
      "2025",
      "2026",
    ],
  });
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { slug } = await params;
  const meta = SUBJECT_META[slug as SubjectSlug];
  if (!meta) notFound();

  const subjectName = Object.entries(SUBJECT_NAME_TO_SLUG).find(
    ([, s]) => s === slug
  )?.[0];

  if (!subjectName) notFound();

  const count = getQuestionsBySubject(subjectName).length;

  return (
    <AppShell>
      <JsonLd
        data={[
          subjectCourseJsonLd(slug as SubjectSlug),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Question Bank", path: "/question-bank" },
            { name: meta.name, path: `/subject/${slug}` },
          ]),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{meta.name}</h1>
              <p className="mt-2 text-sm leading-relaxed text-indigo-100 sm:text-base">
                {meta.description}
              </p>
              <p className="mt-2 text-sm text-indigo-200">{meta.descriptionHi}</p>
              <p className="mt-3 text-sm font-semibold text-amber-200">
                {count.toLocaleString()} questions · Hindi & English · 2025–2026
              </p>
            </div>
          </div>
        </div>

        <QuestionList subjectFilter={subjectName} />

        <div className="mt-8 text-center">
          <Link
            href="/question-bank"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Browse all subjects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
