"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, UserCircle } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import ProfileForm from "@/components/forms/ProfileForm";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useAuth();
  const { language } = useLanguage();
  const isHi = language === "hi";

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn || !user) {
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
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:py-8">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          {isHi ? "डैशबोर्ड पर वापस" : "Back to Dashboard"}
        </Link>

        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <UserCircle className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {isHi ? "प्रोफ़ाइल संपादित करें" : "Edit Profile"}
            </h1>
            <p className="text-sm text-slate-500">
              {isHi
                ? "अपनी जानकारी अपडेट करें और परीक्षा की तैयारी व्यक्तिगत बनाएं"
                : "Update your details and personalize your exam prep"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <ProfileForm user={user} />
        </div>
      </div>
    </AppShell>
  );
}
