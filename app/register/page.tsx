import { GraduationCap, CheckCircle2 } from "lucide-react";
import AppShell from "@/components/layout/AppShell";
import RegisterForm from "@/components/forms/RegisterForm";
import { FREE_QUESTION_LIMIT } from "@/lib/constants";

export const metadata = {
  title: "Register",
};

const perks = [
  "Unlock all 10,000+ questions instantly",
  "Hindi & English bilingual access",
  "Reasoning, Maths, English & GK/Current Affairs",
  "2025–2026 updated current affairs",
];

export default function RegisterPage() {
  return (
    <AppShell showSidebar={false}>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="grid w-full max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — benefits */}
          <div className="hidden flex-col justify-center lg:flex">
            <h1 className="text-3xl font-bold text-slate-900">
              Start Your Exam Prep Journey
            </h1>
            <p className="mt-4 text-slate-500">
              You&apos;ve used your {FREE_QUESTION_LIMIT} free questions. Register now to
              unlock the complete question bank and accelerate your preparation.
            </p>
            <ul className="mt-8 space-y-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div>
            <div className="mb-6 text-center lg:text-left">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg lg:mx-0">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Create free account</h2>
              <p className="mt-2 text-sm text-slate-500">
                No credit card required. Instant access.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
