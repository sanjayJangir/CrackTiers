"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Pencil,
  Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { categories } from "@/data/categories";
import { TOTAL_QUESTIONS_TARGET } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <AppShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">
                Welcome back, {user?.name}! 👋
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 sm:self-auto"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>

        {/* Pro badge */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-white sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-amber-300" />
              <div>
                <p className="font-semibold">Full Access Unlocked</p>
                <p className="text-sm text-indigo-100">
                  You have access to all {TOTAL_QUESTIONS_TARGET.toLocaleString()}+ questions
                </p>
              </div>
            </div>
            <Link
              href="/question-bank"
              className="inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 sm:self-auto"
            >
              Continue Practicing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <DashboardStats />

        {/* Quick actions */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                <div>
                  <p className="font-medium text-slate-900 group-hover:text-indigo-700">
                    {cat.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {cat.subcategories.length} subcategories
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Account info */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-semibold text-slate-900">Account Details</h2>
            <Link
              href="/profile"
              className="inline-flex min-h-[40px] items-center justify-center gap-2 self-start rounded-xl border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100 sm:self-auto"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>
          </div>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Name
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{user?.name}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Email
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">{user?.email}</dd>
            </div>
            {user?.phone && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Mobile
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">{user.phone}</dd>
              </div>
            )}
            {(user?.city || user?.state) && (
              <div>
                <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Location
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-900">
                  {[user.city, user.state].filter(Boolean).join(", ")}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Member Since
              </dt>
              <dd className="mt-1 text-sm font-medium text-slate-900">
                {user?.joinedAt
                  ? new Date(user.joinedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Plan
              </dt>
              <dd className="mt-1 text-sm font-medium text-emerald-600">Pro (Unlocked)</dd>
            </div>
          </dl>
        </div>
      </div>
    </AppShell>
  );
}
