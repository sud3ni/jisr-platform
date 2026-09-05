"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Stats = {
  institutions: number;
  users: number;
  graduates: number;
  opportunities: number;
  applications: number;
};

function Icon({
  type,
}: {
  type:
    | "dashboard"
    | "institutions"
    | "users"
    | "graduates"
    | "opportunities"
    | "applications"
    | "notifications"
    | "content"
    | "settings"
    | "arrow"
    | "menu"
    | "close";
}) {
  const common =
    "h-5 w-5";

  if (type === "dashboard") {
    return (
      <svg
        className={common}
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

  if (type === "institutions") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 21h18" />
        <path d="M5 21V8l7-4 7 4v13" />
        <path d="M8 11h2M14 11h2M8 15h2M14 15h2" />
        <path d="M10 21v-4h4v4" />
      </svg>
    );
  }

  if (type === "users") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="9" cy="8" r="4" />
        <path d="M2 21c.8-4 3.2-6 7-6s6.2 2 7 6" />
        <path d="M16 4.5a4 4 0 0 1 0 7.5" />
        <path d="M17 15c2.8.5 4.4 2.5 5 6" />
      </svg>
    );
  }

  if (type === "graduates") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 11v5c2.8 2.5 7.2 2.5 10 0v-5" />
        <path d="M21 9v6" />
      </svg>
    );
  }

  if (type === "opportunities") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 7h16v13H4z" />
        <path d="M8 7V4h8v3" />
        <path d="M8 12h8M8 16h5" />
      </svg>
    );
  }

  if (type === "applications") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M5 4h14v16H5z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </svg>
    );
  }

  if (type === "notifications") {
    return (
      <svg
        className={common}
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

  if (type === "content") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 5h16v14H4z" />
        <path d="M7 9h10M7 13h7M7 17h5" />
      </svg>
    );
  }

  if (type === "settings") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.6V20a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.1A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1H15V5a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg
        className="h-4 w-4"
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

  if (type === "menu") {
    return (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }

  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<Stats>({
      institutions: 0,
      users: 0,
      graduates: 0,
      opportunities: 0,
      applications: 0,
    });

  const [loading, setLoading] =
    useState(true);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [adminName, setAdminName] =
    useState("المدير");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      /*
       * بيانات المدير
       */
      const { data: profile } =
        await supabase
          .from("users")
          .select("full_name")
          .eq("id", user.id)
          .maybeSingle();

      if (profile?.full_name) {
        setAdminName(
          profile.full_name
        );
      }

      /*
       * المؤسسات
       */
      const institutionsResult =
        await supabase
          .from("institutions")
          .select("id", {
            count: "exact",
            head: true,
          });

      /*
       * المستخدمون
       */
      const usersResult =
        await supabase
          .from("users")
          .select("id", {
            count: "exact",
            head: true,
          });

      /*
       * الخريجون
       */
      const graduatesResult =
        await supabase
          .from("graduates")
          .select("id", {
            count: "exact",
            head: true,
          });

      /*
       * الفرص
       */
      const opportunitiesResult =
        await supabase
          .from("opportunities")
          .select("id", {
            count: "exact",
            head: true,
          });

      /*
       * الطلبات
       */
      const applicationsResult =
        await supabase
          .from("applications")
          .select("id", {
            count: "exact",
            head: true,
          });

      setStats({
        institutions:
          institutionsResult.count || 0,

        users:
          usersResult.count || 0,

        graduates:
          graduatesResult.count || 0,

        opportunities:
          opportunitiesResult.count || 0,

        applications:
          applicationsResult.count || 0,
      });
    } catch (error) {
      console.error(
        "Admin dashboard error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  const navigation = [
    {
      title: "الرئيسية",
      href: "/dashboard/admin",
      icon: "dashboard" as const,
    },
    {
      title: "المؤسسات",
      href: "/dashboard/admin/institutions",
      icon: "institutions" as const,
    },
    {
      title: "المستخدمون",
      href: "/dashboard/admin/users",
      icon: "users" as const,
    },
    {
      title: "الخريجون",
      href: "/dashboard/admin/graduates",
      icon: "graduates" as const,
    },
    {
      title: "الفرص",
      href: "/dashboard/admin/opportunities",
      icon: "opportunities" as const,
    },
    {
      title: "طلبات التقديم",
      href: "/dashboard/admin/applications",
      icon: "applications" as const,
    },
    {
      title: "الإشعارات",
      href: "/dashboard/admin/notifications",
      icon: "notifications" as const,
    },
    {
      title: "المحتوى",
      href: "/dashboard/admin/content",
      icon: "content" as const,
    },
    {
      title: "الإعدادات",
      href: "/dashboard/admin/settings",
      icon: "settings" as const,
    },
  ];

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-72 flex-col border-l border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <Link
            href="/dashboard/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <svg
                viewBox="0 0 64 64"
                className="h-7 w-7"
                fill="none"
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
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                جسر
              </h1>

              <p className="text-xs text-slate-500">
                لوحة الإدارة
              </p>
            </div>
          </Link>

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <Icon type="close" />
          </button>
        </div>

        {/* Admin profile */}
        <div className="border-b border-slate-100 p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
              {adminName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-extrabold text-slate-900">
                {adminName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                مدير المنصة
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-bold text-slate-400">
            الإدارة
          </p>

          <div className="space-y-1">
            {navigation.map(
              (item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${
                    index === 0
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                  }`}
                >
                  <Icon type={item.icon} />

                  <span>
                    {item.title}
                  </span>
                </Link>
              )
            )}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-100 p-4">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
          >
            <span>
              العودة للموقع
            </span>

            <Icon type="arrow" />
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="lg:mr-72">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="rounded-xl border border-slate-200 p-3 text-slate-600 hover:bg-slate-50 lg:hidden"
              >
                <Icon type="menu" />
              </button>

              <div>
                <p className="text-xs font-bold text-blue-700">
                  مركز إدارة جسر
                </p>

                <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                  لوحة التحكم
                </h2>
              </div>
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs text-slate-400">
                مرحبًا
              </p>

              <p className="text-sm font-bold text-slate-800">
                {adminName}
              </p>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Welcome */}
          <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-slate-950 via-blue-950 to-blue-800 p-6 text-white shadow-xl sm:p-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-blue-200">
                  إدارة منصة جسر
                </p>

                <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  مرحبًا، {adminName} 👋
                </h1>

                <p className="mt-3 max-w-2xl leading-7 text-blue-100">
                  من هنا يمكنك متابعة المؤسسات والخريجين
                  والفرص وطلبات التقديم وإدارة محتوى المنصة.
                </p>
              </div>

              <Link
                href="/dashboard/admin/opportunities"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-800 shadow-lg transition hover:bg-blue-50"
              >
                <Icon type="opportunities" />
                إدارة الفرص
              </Link>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {/* Institutions */}
            <Link
              href="/dashboard/admin/institutions"
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    المؤسسات
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading
                      ? "..."
                      : stats.institutions}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon type="institutions" />
                </div>
              </div>
            </Link>

            {/* Users */}
            <Link
              href="/dashboard/admin/users"
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    المستخدمون
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading
                      ? "..."
                      : stats.users}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                  <Icon type="users" />
                </div>
              </div>
            </Link>

            {/* Graduates */}
            <Link
              href="/dashboard/admin/graduates"
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    الخريجون
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading
                      ? "..."
                      : stats.graduates}
                  </p>
                </div>

                <div className="rounded-xl bg-green-50 p-3 text-green-700">
                  <Icon type="graduates" />
                </div>
              </div>
            </Link>

            {/* Opportunities */}
            <Link
              href="/dashboard/admin/opportunities"
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    الفرص
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading
                      ? "..."
                      : stats.opportunities}
                  </p>
                </div>

                <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
                  <Icon type="opportunities" />
                </div>
              </div>
            </Link>

            {/* Applications */}
            <Link
              href="/dashboard/admin/applications"
              className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    الطلبات
                  </p>

                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    {loading
                      ? "..."
                      : stats.applications}
                  </p>
                </div>

                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Icon type="applications" />
                </div>
              </div>
            </Link>
          </section>

          {/* Management */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 lg:col-span-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  إدارة المنصة
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  الوصول السريع إلى أهم أقسام لوحة الإدارة.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Link
                  href="/dashboard/admin/institutions"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                      <Icon type="institutions" />
                    </div>

                    <Icon type="arrow" />
                  </div>

                  <h3 className="mt-5 font-extrabold text-slate-900">
                    إدارة المؤسسات
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    مراجعة المؤسسات وتحديث بياناتها ومتابعة حالة اعتمادها.
                  </p>
                </Link>

                <Link
                  href="/dashboard/admin/graduates"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-green-200 hover:bg-green-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-green-50 p-3 text-green-700">
                      <Icon type="graduates" />
                    </div>

                    <Icon type="arrow" />
                  </div>

                  <h3 className="mt-5 font-extrabold text-slate-900">
                    إدارة الخريجين
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    متابعة حسابات الخريجين وبياناتهم وسيرهم الذاتية.
                  </p>
                </Link>

                <Link
                  href="/dashboard/admin/opportunities"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-purple-200 hover:bg-purple-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-purple-50 p-3 text-purple-700">
                      <Icon type="opportunities" />
                    </div>

                    <Icon type="arrow" />
                  </div>

                  <h3 className="mt-5 font-extrabold text-slate-900">
                    إدارة الفرص
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    مراجعة فرص العمل والتدريب والتطوع المنشورة على جسر.
                  </p>
                </Link>

                <Link
                  href="/dashboard/admin/applications"
                  className="group rounded-2xl border border-slate-200 p-5 transition hover:border-amber-200 hover:bg-amber-50"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                      <Icon type="applications" />
                    </div>

                    <Icon type="arrow" />
                  </div>

                  <h3 className="mt-5 font-extrabold text-slate-900">
                    طلبات التقديم
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    متابعة جميع الطلبات وحالات التقديم المقدمة عبر المنصة.
                  </p>
                </Link>
              </div>
            </div>

            {/* Platform status */}
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900">
                حالة المنصة
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                ملخص سريع لحالة النظام.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-green-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      ✓
                    </div>

                    <div>
                      <p className="font-bold text-green-800">
                        النظام يعمل
                      </p>

                      <p className="mt-1 text-xs text-green-700">
                        جميع الخدمات الأساسية متاحة
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
                      <Icon type="users" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        مجتمع جسر
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {loading
                          ? "جاري التحميل..."
                          : `${stats.graduates} خريج مسجل`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-purple-50 p-2 text-purple-700">
                      <Icon type="opportunities" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        الفرص المنشورة
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {loading
                          ? "جاري التحميل..."
                          : `${stats.opportunities} فرصة`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-50 p-2 text-amber-600">
                      <Icon type="applications" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        الطلبات
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {loading
                          ? "جاري التحميل..."
                          : `${stats.applications} طلب تقديم`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick links */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/admin/users"
              className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                  <Icon type="users" />
                </div>

                <span className="font-bold text-slate-800">
                  المستخدمون
                </span>
              </div>

              <Icon type="arrow" />
            </Link>

            <Link
              href="/dashboard/admin/notifications"
              className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Icon type="notifications" />
                </div>

                <span className="font-bold text-slate-800">
                  الإشعارات
                </span>
              </div>

              <Icon type="arrow" />
            </Link>

            <Link
              href="/dashboard/admin/content"
              className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon type="content" />
                </div>

                <span className="font-bold text-slate-800">
                  إدارة المحتوى
                </span>
              </div>

              <Icon type="arrow" />
            </Link>

            <Link
              href="/dashboard/admin/settings"
              className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-700">
                  <Icon type="settings" />
                </div>

                <span className="font-bold text-slate-800">
                  إعدادات المنصة
                </span>
              </div>

              <Icon type="arrow" />
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
