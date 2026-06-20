import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ExamSeriesCard from "@/components/test-series/ExamSeriesCard";
import JsonLd from "@/components/seo/JsonLd";
import { examTestSeries, getTotalTestCount } from "@/data/test-series";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Online Test Series — SSC, UPSC, Railway & Banking Mock Tests",
  description:
    "Free online test series for SSC, UPSC, Railway, Banking, Defence & State PSC. Full mock & sectional tests with instant score & Hindi/English support.",
  path: "/online-test-series",
  keywords: [
    "online test series",
    "SSC online test series",
    "UPSC mock test",
    "railway test series",
    "banking mock test",
    "ऑनलाइन टेस्ट सीरीज",
  ],
});

const highlights = [
  {
    icon: Trophy,
    title: "Exam-wise Series",
    desc: "Dedicated test series for SSC, UPSC, Railway, Banking & more",
  },
  {
    icon: Target,
    title: "Full + Sectional",
    desc: "Complete mock papers & subject-wise sectional tests",
  },
  {
    icon: Zap,
    title: "Instant Score",
    desc: "Auto-submit, score ring & detailed answer review",
  },
];

export default function OnlineTestSeriesPage() {
  const totalTests = getTotalTestCount();

  return (
    <AppShell>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Online Test Series", path: "/online-test-series" },
        ])}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-100 ring-1 ring-white/20">
            <ClipboardList className="h-4 w-4" />
            {totalTests}+ Mock Tests · Hindi & English
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Online Test Series
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
            Exam-pattern mock tests for SSC, UPSC, Railway, Banking, Defence &
            State PSC — just like real online test platforms.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:px-6">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="flex items-start gap-3 rounded-xl border border-slate-100 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{h.title}</p>
                  <p className="mt-0.5 text-sm text-slate-500">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Exam series grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Choose Your Exam
            </h2>
            <p className="mt-1 text-slate-500">
              Select an exam to view full mock & sectional tests
            </p>
          </div>
          <GraduationCap className="hidden h-8 w-8 text-indigo-300 sm:block" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {examTestSeries.map((series) => (
            <ExamSeriesCard key={series.slug} series={series} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <BookOpen className="mx-auto h-8 w-8 text-indigo-600" />
          <h2 className="mt-3 text-xl font-bold text-slate-900">How It Works</h2>
          <ol className="mt-6 space-y-3 text-left text-sm text-slate-600">
            <li className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                1
              </span>
              Pick your exam — SSC, UPSC, Railway, Banking, etc.
            </li>
            <li className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                2
              </span>
              Choose a full mock or sectional test paper
            </li>
            <li className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                3
              </span>
              Take the timed test → get score & scroll through answer review
            </li>
          </ol>
        </div>
      </section>
    </AppShell>
  );
}
