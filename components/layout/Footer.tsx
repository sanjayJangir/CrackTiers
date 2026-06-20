import Link from "next/link";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import { categories } from "@/data/categories";
import { APP_NAME, APP_TAGLINE, SUBJECT_META } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white">{APP_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">{APP_TAGLINE}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/question-bank" className="transition hover:text-white">
                  Question Bank
                </Link>
              </li>
              <li>
                <Link href="/online-test-series" className="transition hover:text-white">
                  Online Test Series
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-white">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Subjects — SEO internal links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Subjects
            </h4>
            <ul className="space-y-2.5 text-sm">
              {Object.values(SUBJECT_META).map((sub) => (
                <li key={sub.slug}>
                  <Link
                    href={`/subject/${sub.slug}`}
                    className="transition hover:text-white"
                  >
                    {sub.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="transition hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-indigo-400" />
                support@cracktiers.in
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-indigo-400" />
                +91 98765 43210
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-indigo-400" />
                New Delhi, India
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved. Built for Indian
          government exam aspirants.
        </div>
      </div>
    </footer>
  );
}
