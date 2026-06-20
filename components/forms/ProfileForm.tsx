"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, Save, UserRound } from "lucide-react";
import { examTestSeries } from "@/data/test-series";
import type { User } from "@/data/types";
import { useAuth } from "@/lib/auth-context";
import { useLanguage } from "@/lib/language-context";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

interface ProfileFormProps {
  user: User;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { updateProfile } = useAuth();
  const { language } = useLanguage();
  const isHi = language === "hi";

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone ?? "");
  const [city, setCity] = useState(user.city ?? "");
  const [state, setState] = useState(user.state ?? "");
  const [targetExam, setTargetExam] = useState(user.targetExam ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone ?? "");
    setCity(user.city ?? "");
    setState(user.state ?? "");
    setTargetExam(user.targetExam ?? "");
  }, [user]);

  const t = {
    personal: isHi ? "व्यक्तिगत जानकारी" : "Personal Information",
    exam: isHi ? "परीक्षा की तैयारी" : "Exam Preparation",
    name: isHi ? "पूरा नाम" : "Full name",
    email: isHi ? "ईमेल पता" : "Email address",
    phone: isHi ? "मोबाइल नंबर" : "Mobile number",
    city: isHi ? "शहर" : "City",
    state: isHi ? "राज्य" : "State",
    targetExam: isHi ? "लक्ष्य परीक्षा" : "Target exam",
    selectExam: isHi ? "परीक्षा चुनें" : "Select target exam",
    selectState: isHi ? "राज्य चुनें" : "Select state",
    save: isHi ? "प्रोफ़ाइल सहेजें" : "Save Profile",
    saving: isHi ? "सहेजा जा रहा है..." : "Saving...",
    saved: isHi ? "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई!" : "Profile updated successfully!",
    nameErr: isHi ? "नाम कम से कम 2 अक्षर का होना चाहिए।" : "Name must be at least 2 characters.",
    emailErr: isHi ? "कृपया वैध ईमेल दर्ज करें।" : "Please enter a valid email address.",
    phoneErr: isHi ? "कृपया 10 अंकों का मोबाइल नंबर दर्ज करें।" : "Please enter a valid 10-digit mobile number.",
    required: isHi ? "कृपया सभी आवश्यक फ़ील्ड भरें।" : "Please fill in all required fields.",
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim() || !email.trim()) {
      setError(t.required);
      return;
    }

    if (name.trim().length < 2) {
      setError(t.nameErr);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(t.emailErr);
      return;
    }

    if (phone.trim() && !/^[6-9]\d{9}$/.test(phone.trim())) {
      setError(t.phoneErr);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    const ok = updateProfile({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      city: city.trim(),
      state: state.trim(),
      targetExam,
    });

    setLoading(false);

    if (!ok) {
      setError(t.emailErr);
      return;
    }

    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Avatar preview */}
      <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-xl font-bold text-white shadow-md">
          {initials || <UserRound className="h-7 w-7" />}
        </div>
        <div>
          <p className="font-semibold text-slate-900">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
          <p className="mt-1 text-xs text-slate-400">
            {isHi ? "सदस्यता" : "Member since"}{" "}
            {new Date(user.joinedAt).toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          {t.saved}
        </div>
      )}

      {/* Personal info */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          {t.personal}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="profile-name" className="mb-1.5 block text-sm font-medium text-slate-700">
              {t.name} <span className="text-rose-500">*</span>
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isHi ? "आपका नाम" : "Your name"}
              className={inputClass}
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-slate-700">
              {t.email} <span className="text-rose-500">*</span>
            </label>
            <input
              id="profile-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="profile-phone" className="mb-1.5 block text-sm font-medium text-slate-700">
              {t.phone}
            </label>
            <input
              id="profile-phone"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="9876543210"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="profile-city" className="mb-1.5 block text-sm font-medium text-slate-700">
              {t.city}
            </label>
            <input
              id="profile-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder={isHi ? "जैसे: जयपुर" : "e.g. Jaipur"}
              className={inputClass}
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="profile-state" className="mb-1.5 block text-sm font-medium text-slate-700">
              {t.state}
            </label>
            <select
              id="profile-state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={inputClass}
            >
              <option value="">{t.selectState}</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Exam prep */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          {t.exam}
        </h2>
        <div>
          <label htmlFor="profile-exam" className="mb-1.5 block text-sm font-medium text-slate-700">
            {t.targetExam}
          </label>
          <select
            id="profile-exam"
            value={targetExam}
            onChange={(e) => setTargetExam(e.target.value)}
            className={inputClass}
          >
            <option value="">{t.selectExam}</option>
            {examTestSeries.map((exam) => (
              <option key={exam.slug} value={exam.slug}>
                {isHi ? exam.nameHi : exam.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:from-indigo-700 hover:to-blue-700 disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {loading ? t.saving : t.save}
      </button>
    </form>
  );
}
