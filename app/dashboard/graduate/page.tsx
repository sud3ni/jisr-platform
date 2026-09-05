"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Stats = {
  applications: number;
  pending: number;
  accepted: number;
  rejected: number;
};

type IconType =
  | "dashboard"
  | "opportunity"
  | "applications"
  | "notification"
  | "profile"
  | "cv"
  | "arrow"
  | "clock"
  | "check"
  | "close"
  | "user"
  | "search";

function Icon({
  type,
  className = "h-5 w-5",
}: {
  type: IconType;
  className?: string;
}) {
  if (type === "dashboard") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (type === "opportunity") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 7h16v13H4z" />
        <path d="M8 7V4h8v3" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    );
  }

  if (type === "applications") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    );
  }

  if (type === "notification") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );
  }

  if (type === "profile" || type === "user") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6" />
      </svg>
    );
  }

  if (type === "cv") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6" />
        <path d="M9 17h6" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "close") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function JisrLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-7 w-7"
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
        d="M18 43V34M32 43V29M46 43V34"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function GraduateDashboard() {
  const [name, setName] = useState("");

  const [stats, setStats] = useState<Stats>({
    applications: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });

  const [unreadNotifications, setUnreadNotifications] =
    useState(0);

  const [hasCv, setHasCv] = useState(false);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("يجب تسجيل الدخول أولاً.");
        return;
      }

      /*
       * بيانات الخريج
       */
      const {
        data: profile,
        error: profileError,
      } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.error(
          "Graduate profile error:",
          profileError
        );
      }

      setName(profile?.full_name || "");

      /*
       * السيرة الذاتية
       */
      const { data: graduate, error: graduateError } =
        await supabase
          .from("graduates")
          .select("cv_url")
          .eq("id", user.id)
          .maybeSingle();

      if (graduateError) {
        console.error(
          "Graduate CV error:",
          graduateError
        );
      }

      setHasCv(Boolean(graduate?.cv_url));

      /*
       * طلبات التقديم
       */
      const {
        data: applications,
        error: applicationsError,
      } = await supabase
        .from("applications")
        .select("id,status")
        .eq("graduate_id", user.id);

      if (applicationsError) {
        console.error(
          "Graduate applications error:",
          applicationsError
        );

        setMessage(
          "تعذر تحميل بعض إحصائيات طلبات التقديم."
        );
      }

      const apps = applications || [];

      setStats({
        applications: apps.length,

        pending: apps.filter(
          (item) => item.status === "pending"
        ).length,

        accepted: apps.filter(
          (item) => item.status === "accepted"
        ).length,

        rejected: apps.filter(
          (item) => item.status === "rejected"
        ).length,
      });

      /*
       * الإشعارات غير المقروءة
       */
      const {
        count: notificationCount,
        error: notificationError,
      } = await supabase
        .from("notifications")
        .select("id", {
          count: "exact",
          head: true,
        })
        .eq("user_id", user.id)
        .eq("is_read", false);

      if (notificationError) {
        console.error(
          "Notification count error:",
          notificationError
        );
      }

      setUnreadNotifications(
        notificationCount || 0
      );
    } catch (error) {
      console.error(
        "Graduate dashboard error:",
        error
      );

      setMessage(
        "حدث خطأ أثناء تحميل لوحة التحكم."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50"
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-4 font-semibold text-slate-600">
              جاري تحميل لوحة الخريج...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (message && !name) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 px-6"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Icon
              type="close"
              className="h-7 w-7"
            />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            تعذر فتح لوحة الخريج
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {message}
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50"
    >
      {/* ================= Header ================= */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/dashboard/graduate"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md shadow-blue-700/20">
              <JisrLogo />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                جسر
              </h1>

              <p className="text-xs font-medium text-slate-500">
                منصة الفرص
              </p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/dashboard/graduate"
              className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700"
            >
              <Icon type="dashboard" />
              الرئيسية
            </Link>

            <Link
              href="/opportunities"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              <Icon type="opportunity" />
              الفرص
            </Link>

            <Link
              href="/dashboard/graduate/applications"
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
            >
              <Icon type="applications" />
              طلباتي
            </Link>
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/graduate/notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              aria-label="الإشعارات"
            >
              <Icon type="notification" />

              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold text-white ring-2 ring-white">
                  {unreadNotifications > 9
                    ? "9+"
                    : unreadNotifications}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard/profile"
              className="hidden items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50 sm:flex"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                <Icon type="profile" />
              </div>

              <div className="max-w-32 text-right">
                <p className="truncate text-sm font-bold text-slate-800">
                  {name || "الخريج"}
                </p>

                <p className="text-xs text-slate-500">
                  حساب خريج
                </p>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* ================= Main ================= */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Hero */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-900/10 sm:p-8 lg:p-10">
          {/* Decorative shapes */}
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/5" />
          <div className="absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-white/5" />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                حساب الخريج
              </div>

              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[42px]">
                مرحبًا، {name || "الخريج"}
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
                اكتشف الفرص المناسبة لتخصصك، وتابع طلبات
                التقديم، وحافظ على ملفك المهني محدثًا من
                مكان واحد.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/opportunities"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-extrabold text-blue-700 shadow-lg transition hover:bg-blue-50"
                >
                  <Icon type="search" />
                  البحث عن الفرص
                </Link>

                <Link
                  href="/dashboard/graduate/applications"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/15"
                >
                  <Icon type="applications" />
                  متابعة طلباتي
                </Link>
              </div>
            </div>

            {/* CV status */}
            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm lg:w-80">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                  <Icon
                    type="cv"
                    className="h-7 w-7"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-blue-100">
                    السيرة الذاتية
                  </p>

                  <p className="mt-1 font-extrabold">
                    {hasCv
                      ? "السيرة الذاتية مرفوعة"
                      : "السيرة الذاتية غير مرفوعة"}
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/graduate/upload-cv"
                className="mt-5 flex items-center justify-between rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/15"
              >
                <span>
                  {hasCv
                    ? "تحديث السيرة الذاتية"
                    : "رفع السيرة الذاتية"}
                </span>

                <Icon type="arrow" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= Statistics ================= */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  إجمالي طلبات التقديم
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {stats.applications}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  جميع الطلبات المقدمة
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Icon type="applications" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  قيد المراجعة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {stats.pending}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  بانتظار قرار المؤسسة
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Icon type="clock" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  الطلبات المقبولة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {stats.accepted}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  فرص تم قبولك فيها
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <Icon type="check" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  الطلبات المرفوضة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {stats.rejected}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  الطلبات التي لم يتم قبولها
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <Icon type="close" />
              </div>
            </div>
          </div>
        </section>

        {/* ================= Main Content ================= */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2 sm:p-7">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                الوصول السريع
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                أهم الخدمات التي تحتاج إليها كخريج على منصة
                جسر.
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Link
                href="/opportunities"
                className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                    <Icon type="opportunity" />
                  </div>

                  <div className="text-slate-400 transition group-hover:text-blue-700">
                    <Icon type="arrow" />
                  </div>
                </div>

                <h3 className="mt-5 font-extrabold text-slate-900">
                  استعراض الفرص
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  اكتشف فرص العمل والتدريب والتطوع المتاحة
                  على منصة جسر.
                </p>
              </Link>

              <Link
                href="/dashboard/graduate/applications"
                className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Icon type="applications" />
                  </div>

                  <div className="text-slate-400 transition group-hover:text-indigo-700">
                    <Icon type="arrow" />
                  </div>
                </div>

                <h3 className="mt-5 font-extrabold text-slate-900">
                  طلبات التقديم
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  تابع الطلبات التي قدمتها واعرف حالة كل طلب.
                </p>
              </Link>

              <Link
                href="/dashboard/graduate/upload-cv"
                className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50/50 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <Icon type="cv" />
                  </div>

                  <div className="text-slate-400 transition group-hover:text-green-700">
                    <Icon type="arrow" />
                  </div>
                </div>

                <h3 className="mt-5 font-extrabold text-slate-900">
                  السيرة الذاتية
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {hasCv
                    ? "السيرة الذاتية مرفوعة ويمكنك تحديثها."
                    : "ارفع سيرتك الذاتية لتسهيل التقديم على الفرص."}
                </p>
              </Link>

              <Link
                href="/dashboard/graduate/notifications"
                className="group rounded-2xl border border-slate-200 p-5 transition hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/50 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                    <Icon type="notification" />

                    {unreadNotifications > 0 && (
                      <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-extrabold text-white ring-2 ring-white">
                        {unreadNotifications > 9
                          ? "9+"
                          : unreadNotifications}
                      </span>
                    )}
                  </div>

                  <div className="text-slate-400 transition group-hover:text-amber-600">
                    <Icon type="arrow" />
                  </div>
                </div>

                <h3 className="mt-5 font-extrabold text-slate-900">
                  الإشعارات
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  تابع آخر التنبيهات والتحديثات المتعلقة
                  بطلباتك.
                </p>
              </Link>
            </div>
          </div>

          {/* Profile Summary */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  ملفك المهني
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  حافظ على بياناتك محدثة.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon type="profile" />
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md">
                  <Icon
                    type="user"
                    className="h-7 w-7"
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-extrabold text-slate-900">
                    {name || "الخريج"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    حساب خريج
                  </p>
                </div>
              </div>
            </div>

            {/* CV Status */}
            <div className="mt-4 rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      hasCv
                        ? "bg-green-50 text-green-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    <Icon type="cv" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      السيرة الذاتية
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {hasCv
                        ? "مرفوعة وجاهزة للاستخدام"
                        : "لم يتم رفعها بعد"}
                    </p>
                  </div>
                </div>

                {hasCv ? (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <Icon
                      type="check"
                      className="h-4 w-4"
                    />
                  </div>
                ) : (
                  <Link
                    href="/dashboard/graduate/upload-cv"
                    className="text-xs font-extrabold text-blue-700 hover:underline"
                  >
                    رفع الآن
                  </Link>
                )}
              </div>
            </div>

            {/* Applications Summary */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-amber-50 p-3 text-center">
                <p className="text-lg font-extrabold text-amber-700">
                  {stats.pending}
                </p>

                <p className="mt-1 text-[11px] font-semibold text-amber-600">
                  قيد المراجعة
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-center">
                <p className="text-lg font-extrabold text-green-700">
                  {stats.accepted}
                </p>

                <p className="mt-1 text-[11px] font-semibold text-green-600">
                  مقبولة
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-center">
                <p className="text-lg font-extrabold text-red-700">
                  {stats.rejected}
                </p>

                <p className="mt-1 text-[11px] font-semibold text-red-600">
                  مرفوضة
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/profile"
              className="mt-5 flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <span className="flex items-center gap-2">
                <Icon type="profile" />
                الملف الشخصي
              </span>

              <Icon type="arrow" />
            </Link>
          </div>
        </section>

        {/* ================= Bottom CTA ================= */}
        <section className="mt-6 overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                هل تبحث عن فرصة جديدة؟
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                تصفح الفرص المنشورة على جسر وابحث عن فرصة
                تتناسب مع مهاراتك وتخصصك.
              </p>
            </div>

            <Link
              href="/opportunities"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 font-extrabold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
            >
              استعراض الفرص
              <Icon type="arrow" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
