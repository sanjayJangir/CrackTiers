"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export default function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg bg-slate-100 p-1 ring-1 ring-slate-200",
        className
      )}
      role="group"
      aria-label="Select language"
    >
      <Languages className="mx-1.5 h-4 w-4 text-slate-400 hidden sm:block" aria-hidden />
      {(["en", "hi"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={cn(
            "min-h-[36px] rounded-md px-3 py-1.5 text-xs font-semibold uppercase transition sm:text-sm",
            language === lang
              ? "bg-white text-indigo-700 shadow-sm"
              : "text-slate-500 hover:text-slate-700"
          )}
        >
          {lang === "en" ? "English" : "हिंदी"}
        </button>
      ))}
    </div>
  );
}
