"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("يجب تسجيل الدخول أولاً.");
        return;
      }

      const { data, error: profileError } = await supabase
        .from("users")
        .select(
          "id,full_name,email,role,status,created_at"
        )
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "PROFILE ERROR:",
          profileError
        );

        setError(
          "تعذر تحميل بيانات الملف الشخصي."
        );

        return;
      }

      if (!data) {
        setError(
          "لم يتم العثور على بيانات المستخدم."
        );

        return;
      }

      const userProfile = data as UserProfile;

      setProfile(userProfile);

      setFullName(
        userProfile.full_name ||
          user.user_metadata?.full_name ||
          ""
      );

      setEmail(
        userProfile.email ||
          user.email ||
          ""
      );
    } catch (err) {
      console.error(
        "LOAD PROFILE ERROR:",
        err
      );

      setError(
        "حدث خطأ أثناء تحميل الملف الشخصي."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError(
          "انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى."
        );

        return;
      }

      const cleanFullName = fullName.trim();

      if (!cleanFullName) {
        setError("يرجى إدخال الاسم الكامل.");
        return;
      }

      const { data, error: updateError } =
        await supabase
          .from("users")
          .update({
            full_name: cleanFullName,
          })
          .eq("id", user.id)
          .select(
            "id,full_name,email,role,status,created_at"
          )
          .maybeSingle();

      if (updateError) {
        console.error(
          "UPDATE PROFILE ERROR:",
          updateError
        );

        setError(
          "تعذر حفظ التغييرات: " +
            updateError.message
        );

        return;
      }

      if (!data) {
        setError(
          "لم يتم العثور على بيانات المستخدم بعد الحفظ."
        );

        return;
      }

      setProfile(data as UserProfile);

      setFullName(
        data.full_name || ""
      );

      setMessage(
        "تم حفظ بياناتك بنجاح."
      );
    } catch (err) {
      console.error(
        "SAVE PROFILE ERROR:",
        err
      );

      setError(
        "حدث خطأ غير متوقع أثناء حفظ البيانات."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const { error: logoutError } =
        await supabase.auth.signOut();

      if (logoutError) {
        console.error(
          "LOGOUT ERROR:",
          logoutError
        );

        setError(
          "تعذر تسجيل الخروج. يرجى المحاولة مرة أخرى."
        );

        return;
      }

      router.push("/login");
      router.refresh();
    } catch (err) {
      console.error(
        "UNEXPECTED LOGOUT ERROR:",
        err
      );

      setError(
        "حدث خطأ أثناء تسجيل الخروج."
      );
    } finally {
      setLoggingOut(false);
    }
  }

  function roleLabel(
    role?: string | null
  ) {
    switch (role) {
      case "student":
        return "طالب";

      case "graduate":
        return "خريج";

      case "institution":
        return "مؤسسة";

      case "admin":
        return "مدير";

      default:
        return "مستخدم";
    }
  }

  function statusLabel(
    status?: string | null
  ) {
    switch (status) {
      case "active":
        return "الحساب نشط";

      case "pending":
        return "بانتظار المراجعة";

      case "suspended":
        return "الحساب موقوف";

      case "inactive":
        return "الحساب غير نشط";

      default:
        return status || "غير محدد";
    }
  }

  function statusClass(
    status?: string | null
  ) {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 border-green-200";

      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";

      case "suspended":
        return "bg-red-50 text-red-700 border-red-200";

      default:
        return "bg-slate-50 text-slate-600 border-slate-200";
    }
  }

  function dashboardLink() {
    if (profile?.role === "graduate") {
      return "/dashboard/graduate";
    }

    if (profile?.role === "student") {
      return "/dashboard/student";
    }

    if (profile?.role === "institution") {
      return "/dashboard/institution";
    }

    if (profile?.role === "admin") {
      return "/dashboard/admin";
    }

    return "/";
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-4 font-semibold text-slate-600">
              جاري تحميل الملف الشخصي...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !profile) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-6"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            تعذر فتح الملف الشخصي
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {error}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              تسجيل الدخول
            </Link>

            <button
              type="button"
              onClick={loadProfile}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              المحاولة مرة أخرى
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <svg
                className="h-6 w-6"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 43C18 23 46 23 56 43"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M8 43H56"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                <path
                  d="M18 43V34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M32 43V29"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M46 43V34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <p className="text-xs font-semibold text-blue-700">
                جسر
              </p>

              <h1 className="text-xl font-extrabold text-slate-900">
                الملف الشخصي
              </h1>
            </div>

          </div>

          <Link
            href={dashboardLink()}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>

            العودة إلى لوحة التحكم
          </Link>

        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Profile Hero */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-800 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-3xl font-extrabold ring-1 ring-white/20">
              {(fullName || "م")
                .trim()
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">

              <p className="text-sm font-semibold text-blue-100">
                حسابك على منصة جسر
              </p>

              <h2 className="mt-1 truncate text-3xl font-extrabold">
                {fullName || "المستخدم"}
              </h2>

              <div className="mt-3 flex flex-wrap items-center gap-3">

                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                  {roleLabel(profile?.role)}
                </span>

                <span className="max-w-full truncate rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                  {email}
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* Messages */}
        {message && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-700">
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m5 12 4 4L19 6" />
            </svg>

            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-semibold text-red-700">
            {error}
          </div>
        )}

        {/* Profile Form */}
        <form
          onSubmit={handleSave}
          className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8"
        >

          <div className="mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              معلومات الحساب
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              يمكنك تحديث اسمك، بينما يتم إدارة البريد الإلكتروني والدور وحالة الحساب من النظام.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* Full Name */}
            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                الاسم الكامل
              </label>

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                placeholder="الاسم الكامل"
              />

            </div>

            {/* Email */}
            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                البريد الإلكتروني
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 outline-none"
              />

              <p className="mt-2 text-xs text-slate-400">
                البريد الإلكتروني مرتبط بحسابك ولا يمكن تغييره من هنا.
              </p>

            </div>

            {/* Role */}
            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                نوع الحساب
              </label>

              <div className="flex min-h-[50px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                  {roleLabel(profile?.role)}
                </span>
              </div>

            </div>

            {/* Status */}
            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                حالة الحساب
              </label>

              <div className="flex min-h-[50px] items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <span
                  className={`rounded-full border px-3 py-1 text-sm font-bold ${statusClass(
                    profile?.status
                  )}`}
                >
                  {statusLabel(profile?.status)}
                </span>
              </div>

            </div>

          </div>

          {/* Account ID */}
          <div className="mt-5">

            <label className="mb-2 block text-sm font-bold text-slate-700">
              معرّف الحساب
            </label>

            <input
              value={profile?.id || ""}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs text-slate-500 outline-none"
            />

            <p className="mt-2 text-xs text-slate-400">
              هذا المعرّف يستخدمه النظام لربط حسابك ببياناتك.
            </p>

          </div>

          {/* Save */}
          <div className="mt-8 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">

            <Link
              href={dashboardLink()}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              إلغاء
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3 font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 4h11l3 3v13H5z" />
                <path d="M8 4v6h8V4" />
                <path d="M8 20v-6h8v6" />
              </svg>

              {saving
                ? "جاري حفظ التغييرات..."
                : "حفظ التغييرات"}

            </button>

          </div>

        </form>

        {/* Account Section */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-xl font-extrabold text-slate-900">
                إعدادات الحساب
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                يمكنك تسجيل الخروج من حسابك على هذا الجهاز.
              </p>

            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 4v16" />
              </svg>

              {loggingOut
                ? "جاري تسجيل الخروج..."
                : "تسجيل الخروج"}

            </button>

          </div>

        </section>

      </div>
    </main>
  );
}
