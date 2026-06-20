"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Pencil,
  User,
} from "lucide-react";
import { categories } from "@/data/categories";
import { NAV_LINKS } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <nav className="absolute right-0 top-0 flex h-full w-[min(320px,85vw)] flex-col bg-white shadow-2xl">
        <div className="border-b border-slate-100 px-5 py-4">
          <p className="text-sm font-semibold text-slate-900">Menu</p>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "flex items-center rounded-xl px-3 py-3 text-sm font-medium transition",
                pathname === link.href
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-700 hover:bg-slate-50"
              )}
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn && (
            <>
              <Link
                href="/dashboard"
                onClick={onClose}
                className={cn(
                  "mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition",
                  pathname === "/dashboard"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition",
                  pathname === "/profile"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <Pencil className="h-4 w-4" />
                Edit Profile
              </Link>
            </>
          )}

          <div className="mt-4 px-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={onClose}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slate-700 transition hover:bg-indigo-50"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  {cat.name}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 p-4">
          {isLoggedIn ? (
            <div className="space-y-3">
              <Link
                href="/profile"
                onClick={onClose}
                className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2.5 transition hover:bg-indigo-50"
              >
                <User className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-slate-700">{user?.name}</span>
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className="rounded-xl border border-slate-200 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-2.5 text-center text-sm font-semibold text-white"
              >
                Register Free
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
