import Link from "next/link";
import { GraduationCap } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import LoginForm from "@/components/forms/LoginForm";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AppShell showSidebar={false}>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign in to unlock all questions and track your progress
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Demo login — any email and password will work
          </p>
        </div>
      </div>
    </AppShell>
  );
}
