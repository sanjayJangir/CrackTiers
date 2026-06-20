import { BookOpen } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import QuestionList from "@/components/QuestionList";
import JsonLd from "@/components/seo/JsonLd";
import { getTotalQuestionCount } from "@/data/question-loader";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Question Bank — 10,000+ Hindi & English MCQs",
  description:
    "Browse 10,000+ government exam MCQs. Filter by Reasoning, Maths, English, GK/Current Affairs 2025–2026. Hindi & English bilingual support.",
  path: "/question-bank",
  keywords: [
    "question bank",
    "SSC MCQ",
    "UPSC practice",
    "reasoning questions Hindi",
    "current affairs 2026",
  ],
});

export default function QuestionBankPage() {
  const total = getTotalQuestionCount();

  return (
    <AppShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Question Bank", path: "/question-bank" },
        ])}
      />
      <div className="mx-auto max-w-4xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="mb-5 sm:mb-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 sm:h-10 sm:w-10">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-slate-900 sm:text-3xl">
                Question Bank
              </h1>
              <p className="text-xs leading-snug text-slate-500 sm:text-sm">
                {total.toLocaleString()}+ bilingual questions · Reasoning · Maths ·
                English · GK/Current Affairs
              </p>
            </div>
          </div>
        </div>
        <QuestionList />
      </div>
    </AppShell>
  );
}
