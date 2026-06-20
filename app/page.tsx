import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Globe,
  Shield,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import CategoryCard from "@/components/cards/CategoryCard";
import JsonLd from "@/components/seo/JsonLd";
import { categories } from "@/data/categories";
import { getTotalQuestionCount } from "@/data/question-loader";
import {
  APP_NAME,
  APP_TAGLINE,
  FREE_QUESTION_LIMIT,
  SUBJECT_META,
} from "@/lib/constants";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "SSC, UPSC, Railway & Banking Question Bank — Hindi + English",
  description: `${APP_TAGLINE} Practice 10,000+ MCQs for Reasoning, Maths, English & GK/Current Affairs 2025–2026.`,
  path: "/",
});

const features = [
  {
    icon: BookOpen,
    title: "10,000+ Bilingual Questions",
    description:
      "Every MCQ in Hindi & English — switch language anytime while practicing.",
  },
  {
    icon: Target,
    title: "4 Core Subjects",
    description:
      "Reasoning, Maths (Quant), English, and GK / Current Affairs 2025–2026.",
  },
  {
    icon: Globe,
    title: "Hindi + English",
    description:
      "Perfect for SSC, UPSC, Railway, Banking & State PSC aspirants across India.",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Tap to answer — get correct/wrong feedback with explanations immediately.",
  },
];

export default function HomePage() {
  const totalQuestions = getTotalQuestionCount();

  const stats = [
    { value: `${totalQuestions.toLocaleString()}+`, label: "Questions" },
    { value: "4", label: "Subjects" },
    { value: "2", label: "Languages" },
    { value: `${FREE_QUESTION_LIMIT}`, label: "Free Questions" },
  ];

  return (
    <AppShell showSidebar={false}>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }])}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-indigo-100 ring-1 ring-white/20 backdrop-blur">
              <Sparkles className="h-4 w-4" />
              10,000+ Questions · Hindi & English · 2025–2026
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Crack Your{" "}
              <span className="bg-gradient-to-r from-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Sarkari Exam
              </span>{" "}
              with {APP_NAME}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-indigo-100 sm:text-xl">
              {APP_TAGLINE}. Reasoning, Maths, English & GK/Current Affairs — bilingual
              MCQs updated for 2025–2026 exams.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/question-bank"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50 hover:shadow-xl"
              >
                Start Practicing Free
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/online-test-series"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Online Test Series
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-white/10 px-4 py-5 text-center backdrop-blur ring-1 ring-white/20"
              >
                <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-indigo-200 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Practice by Subject
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-slate-500">
            2,550+ questions per subject in Hindi & English
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(SUBJECT_META).map((sub) => (
              <Link
                key={sub.slug}
                href={`/subject/${sub.slug}`}
                className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
              >
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700">
                  {sub.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">
                  {sub.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-600">
                  Start practice <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mock Test promo */}
      <section className="border-b border-slate-200 bg-gradient-to-r from-violet-600 to-indigo-600 py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready for Exam Day?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-indigo-100">
            Take a timed mock test, get your score instantly, and review every
            answer with explanations.
          </p>
          <Link
            href="/online-test-series"
            className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
          >
            Browse Test Series
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Built for Serious Aspirants
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Student-friendly UI with instant answer feedback, mobile-first design,
            and exam-ready content.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Exam Categories</h2>
              <p className="mt-2 text-slate-500">
                Central & State government exams
              </p>
            </div>
            <Link
              href="/question-bank"
              className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
            >
              View all questions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-14 text-center sm:px-16">
          <div className="relative">
            <Award className="mx-auto h-12 w-12 text-amber-300" />
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Ready to Ace Your Exam?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-indigo-100">
              {FREE_QUESTION_LIMIT} questions free. Register to unlock all{" "}
              {totalQuestions.toLocaleString()}+ bilingual MCQs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
              >
                <Users className="h-4 w-4" />
                Create Free Account
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-indigo-200">
              {[
                "Hindi & English",
                "2025–2026 Current Affairs",
                "No credit card required",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
