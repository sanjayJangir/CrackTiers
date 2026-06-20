"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  ClipboardList,
  Home,
  LayoutDashboard,
  Lock,
  UserCircle,
} from "lucide-react";
import { categories } from "@/data/categories";
import { SUBJECT_META } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/question-bank", label: "Question Bank", icon: BookOpen },
    { href: "/online-test-series", label: "Test Series", icon: ClipboardList },
    ...(isLoggedIn
      ? [
          { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
          { href: "/profile", label: "Profile", icon: UserCircle },
        ]
      : []),
  ];

  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex",
        className
      )}
    >
      <div className="flex-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </p>
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const active =
              pathname === link.href ||
              (link.href === "/profile" && pathname.startsWith("/profile"));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Subjects
        </p>
        <nav className="space-y-1">
          {Object.values(SUBJECT_META).map((sub) => (
            <Link
              key={sub.slug}
              href={`/subject/${sub.slug}`}
              className={cn(
                "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                pathname === `/subject/${sub.slug}`
                  ? "bg-indigo-50 font-medium text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <span className="truncate">{sub.name.split(" (")[0]}</span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
            </Link>
          ))}
        </nav>

        <p className="mb-3 mt-6 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Exam Categories
        </p>
        <nav className="space-y-1">
          {categories.map((cat) => {
            const active = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-indigo-50 font-medium text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <span className="truncate">{cat.name}</span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-300" />
              </Link>
            );
          })}
        </nav>

        {!isLoggedIn && (
          <div className="mt-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-4 ring-1 ring-indigo-100">
            <Lock className="mb-2 h-5 w-5 text-indigo-600" />
            <p className="text-sm font-semibold text-slate-900">Unlock All Questions</p>
            <p className="mt-1 text-xs text-slate-500">
              Register free to access 54+ questions
            </p>
            <Link
              href="/register"
              className="mt-3 block rounded-lg bg-indigo-600 py-2 text-center text-xs font-semibold text-white transition hover:bg-indigo-700"
            >
              Register Now
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
