"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardList, Home, LayoutDashboard, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth();

  const items = [
    { href: "/", label: "Home", icon: Home },
    { href: "/question-bank", label: "Questions", icon: BookOpen },
    { href: "/online-test-series", label: "Test Series", icon: ClipboardList },
    isLoggedIn
      ? { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }
      : { href: "/login", label: "Account", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-lg lg:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href === "/question-bank" && pathname.startsWith("/category")) ||
            (item.href === "/online-test-series" &&
              (pathname.startsWith("/online-test-series") ||
                pathname.startsWith("/mock-test")));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition",
                active ? "text-indigo-600" : "text-slate-500"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
