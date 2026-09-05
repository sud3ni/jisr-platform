"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

type Opportunity = {
  id: string;
  title: string;
  opportunity_type?: string | null;
  city?: string | null;
  status?: string | null;
  created_at?: string | null;
};

type Institution = {
  id: string;
  name?: string | null;
  email?: string | null;
  city?: string | null;
  state?: string | null;
  verified?: boolean | null;
};

type Stats = {
  opportunities: number;
  applications: number;
  pending: number;
  accepted: number;
};

function Icon({
  type,
}: {
  type:
    | "dashboard"
    | "opportunity"
    | "applications"
    | "notification"
    | "profile"
    | "plus"
    | "arrow"
    | "check"
    | "clock"
    | "building";
}) {
  const common = "h-5 w-5";

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

  if (type === "opportunity") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 6.5h16v13H4z" />
        <path d="M8 6.5V4h8v2.5" />
        <path d="M8 11h8M8 15h5" />
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
        <path d="M4 5h16v14H4z" />
        <path d="M8 9h8M8 13h8M8 17h5" />
      </svg>
    );
  }

  if (type === "notification") {
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

  if (type === "profile") {
    return (
      <svg
        className={common}
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

  if (type === "plus") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14M5 12h14" />
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

  if (type === "check") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg
        className={common}
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

  if (type === "building") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
        <path d="M16 9h3a1 1 0 0 1 1 1v11" />
        <path d="M8 7h4M8 11h4M8 15h4M8 19h4" />
        <path d="M2 21h20" />
      </svg>
    );
  }

  return null;
}

function getOpportunityType(type?: string | null) {
  switch (type) {
    case "training":
      return "تدريب";
    case "job":
      return "وظيفة";
    case "volunteer":
      return "تطوع";
    case "cooperation":
      return "تعاون";
    default:
      return type || "فرصة";
  }
}

function getStatus(status?: string | null) {
  if (status === "published") {
    return {
      label: "منشورة",
      className: "bg-green-50 text-green-700",
    };
  }

  if (status === "rejected") {
    return {
      label: "مرفوضة",
      className: "bg-red-50 text-red-700",
    };
  }

  return {
    label: "قيد المراجعة",
    className: "bg-amber-50 text-amber-700",
  };
}

export default function InstitutionDashboard() {
  const [institution, setInstitution] =
    useState<Institution | null>(null);

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

  const [stats, setStats] = useState<Stats>({
    opportunities: 0,
    applications: 0,
    pending: 0,
    accepted: 0,
  });

  const [unreadNotifications, setUnreadNotifications] =
    useState(0);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    setMessage("");

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("يجب تسجيل الدخول أولاً.");
        setLoading(false);
        return;
      }

      const {
        data: institutionData,
        error: institutionError,
      } = await supabase
        .from("institutions")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (institutionError) {
        console.error(
          "Institution error:",
          institutionError
        );

        setMessage(
          "تعذر تحميل بيانات المؤسسة."
        );

        setLoading(false);
        return;
      }

      if (!institutionData) {
        setMessage(
          "لا يوجد حساب مؤسسة مرتبط بهذا المستخدم."
        );

        setLoading(false);
        return;
      }

      setInstitution(institutionData);

      const {
        data: opportunitiesData,
        error: opportunitiesError,
      } = await supabase
        .from("opportunities")
        .select(
          "id,title,opportunity_type,city,status,created_at"
        )
        .eq(
          "institution_id",
          institutionData.id
        )
        .order("created_at", {
          ascending: false,
        });

      if (opportunitiesError) {
        console.error(
          "Opportunities error:",
          opportunitiesError
        );
      }

      const institutionOpportunities =
        opportunitiesData || [];

      setOpportunities(
        institutionOpportunities.slice(0, 5)
      );

      const opportunityIds =
        institutionOpportunities.map(
          (opportunity) => opportunity.id
        );

      let applicationsCount = 0;
      let pendingCount = 0;
      let acceptedCount = 0;

      if (opportunityIds.length > 0) {
        const {
          data: applications,
          error: applicationsError,
        } = await supabase
          .from("applications")
          .select("id,status")
          .in(
            "opportunity_id",
            opportunityIds
          );

        if (applicationsError) {
          console.error(
            "Applications error:",
            applicationsError
          );
        }

        const apps = applications || [];

        applicationsCount = apps.length;

        pendingCount = apps.filter(
          (application) =>
            application.status === "pending"
        ).length;

        acceptedCount = apps.filter(
          (application) =>
            application.status === "accepted"
        ).length;
      }

      setStats({
        opportunities:
          institutionOpportunities.length,
        applications: applicationsCount,
        pending: pendingCount,
        accepted: acceptedCount,
      });

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
          "Notifications error:",
          notificationError
        );
      }

      setUnreadNotifications(
        notificationCount || 0
      );
    } catch (error) {
      console.error(
        "Dashboard error:",
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
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-4 text-sm font-semibold text-slate-600">
              جاري تحميل لوحة المؤسسة...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (message) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-50 px-6"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <Icon type="building" />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            تعذر فتح لوحة المؤسسة
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {message}
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
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
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center justify-between gap-4">
            {/* Brand */}
            <Link
              href="/dashboard/institution"
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
                <p className="text-lg font-extrabold tracking-tight text-slate-900">
                  جسر
                </p>

                <p className="text-[11px] font-medium text-slate-500">
                  منصة ربط الخريجين بالمؤسسات
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden items-center gap-1 lg:flex">
              <Link
                href="/dashboard/institution"
                className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700"
              >
                <Icon type="dashboard" />
                الرئيسية
              </Link>

              <Link
                href="/dashboard/institution/new-opportunity"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
              >
                <Icon type="opportunity" />
                نشر فرصة
              </Link>

              <Link
                href="/dashboard/institution/applications"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
              >
                <Icon type="applications" />
                الطلبات
              </Link>

              <Link
                href="/dashboard/institution/profile"
                className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
              >
                <Icon type="profile" />
                الملف
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard/institution/notifications"
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                aria-label="الإشعارات"
              >
                <Icon type="notification" />

                {unreadNotifications > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {unreadNotifications > 9
                      ? "9+"
                      : unreadNotifications}
                  </span>
                )}
              </Link>

              <Link
                href="/dashboard/institution/profile"
                className="hidden items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50 sm:flex"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                  <Icon type="profile" />
                </div>

                <div className="max-w-32">
                  <p className="truncate text-sm font-bold text-slate-800">
                    {institution?.name ||
                      "المؤسسة"}
                  </p>

                  <p className="text-[11px] text-slate-500">
                    حساب المؤسسة
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="flex gap-2 overflow-x-auto border-t border-slate-100 py-3 lg:hidden">
            <Link
              href="/dashboard/institution"
              className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700"
            >
              الرئيسية
            </Link>

            <Link
              href="/dashboard/institution/new-opportunity"
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              نشر فرصة
            </Link>

            <Link
              href="/dashboard/institution/applications"
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              الطلبات
            </Link>

            <Link
              href="/dashboard/institution/notifications"
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              الإشعارات
            </Link>

            <Link
              href="/dashboard/institution/profile"
              className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              الملف الشخصي
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-700 p-6 text-white shadow-xl sm:p-8 lg:p-10">
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-100">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                لوحة إدارة المؤسسة
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                مرحبًا،{" "}
                {institution?.name ||
                  "بكم في جسر"}
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
                أدر فرص مؤسستك، تابع طلبات الخريجين،
                وابقَ على اطلاع بآخر التحديثات من
                لوحة واحدة.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                {institution?.verified ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1.5 font-semibold text-emerald-100 ring-1 ring-emerald-300/20">
                    <Icon type="check" />
                    مؤسسة موثقة
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 px-3 py-1.5 font-semibold text-amber-100 ring-1 ring-amber-300/20">
                    <Icon type="clock" />
                    التوثيق قيد المراجعة
                  </span>
                )}

                {institution?.city && (
                  <span className="text-blue-100">
                    {institution.city}
                    {institution.state
                      ? `، ${institution.state}`
                      : ""}
                  </span>
                )}
              </div>
            </div>

            <Link
              href="/dashboard/institution/new-opportunity"
              className="relative inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              <Icon type="plus" />
              نشر فرصة جديدة
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  الفرص المنشورة
                </p>

                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {stats.opportunities}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Icon type="opportunity" />
              </div>
            </div>

            <div className="mt-4 h-1 rounded-full bg-blue-50">
              <div className="h-1 w-full rounded-full bg-blue-600" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  إجمالي الطلبات
                </p>

                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {stats.applications}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                <Icon type="applications" />
              </div>
            </div>

            <div className="mt-4 h-1 rounded-full bg-indigo-50">
              <div className="h-1 w-full rounded-full bg-indigo-600" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  قيد المراجعة
                </p>

                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {stats.pending}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Icon type="clock" />
              </div>
            </div>

            <div className="mt-4 h-1 rounded-full bg-amber-50">
              <div className="h-1 w-full rounded-full bg-amber-500" />
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  الطلبات المقبولة
                </p>

                <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  {stats.accepted}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Icon type="check" />
              </div>
            </div>

            <div className="mt-4 h-1 rounded-full bg-emerald-50">
              <div className="h-1 w-full rounded-full bg-emerald-500" />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* Opportunities */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 lg:col-span-2">
            <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  أحدث الفرص
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  آخر الفرص التي نشرتها مؤسستك
                </p>
              </div>

              <Link
                href="/opportunities"
                className="inline-flex items-center gap-1 text-sm font-bold text-blue-700 transition hover:text-blue-800"
              >
                استعراض الفرص
                <Icon type="arrow" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {opportunities.length === 0 ? (
                <div className="p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                    <Icon type="opportunity" />
                  </div>

                  <h3 className="mt-4 font-bold text-slate-800">
                    لا توجد فرص منشورة
                  </h3>

                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    ابدأ بنشر أول فرصة لمؤسستك
                    للوصول إلى الخريجين.
                  </p>

                  <Link
                    href="/dashboard/institution/new-opportunity"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                  >
                    <Icon type="plus" />
                    نشر أول فرصة
                  </Link>
                </div>
              ) : (
                opportunities.map((opportunity) => {
                  const status = getStatus(
                    opportunity.status
                  );

                  return (
                    <div
                      key={opportunity.id}
                      className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-slate-900">
                          {opportunity.title}
                        </h3>

                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                          <span className="rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700">
                            {getOpportunityType(
                              opportunity.opportunity_type
                            )}
                          </span>

                          {opportunity.city && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                              {opportunity.city}
                            </span>
                          )}

                          <span
                            className={`rounded-full px-3 py-1 font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/opportunities/${opportunity.id}`}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      >
                        عرض الفرصة
                        <Icon type="arrow" />
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-xl font-extrabold text-slate-900">
              الوصول السريع
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              أهم الأدوات لإدارة حساب المؤسسة
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/dashboard/institution/new-opportunity"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon type="plus" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800">
                    نشر فرصة جديدة
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    تدريب، وظيفة أو تطوع
                  </p>
                </div>

                <Icon type="arrow" />
              </Link>

              <Link
                href="/dashboard/institution/applications"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-indigo-50"
              >
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                  <Icon type="applications" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800">
                    طلبات التقديم
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    مراجعة المتقدمين
                  </p>
                </div>

                {stats.pending > 0 && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                    {stats.pending}
                  </span>
                )}

                <Icon type="arrow" />
              </Link>

              <Link
                href="/dashboard/institution/notifications"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-amber-200 hover:bg-amber-50"
              >
                <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                  <Icon type="notification" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800">
                    الإشعارات
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    متابعة آخر التنبيهات
                  </p>
                </div>

                {unreadNotifications > 0 && (
                  <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700">
                    {unreadNotifications}
                  </span>
                )}

                <Icon type="arrow" />
              </Link>

              <Link
                href="/dashboard/institution/profile"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                  <Icon type="profile" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-800">
                    ملف المؤسسة
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    بيانات الحساب والملف التعريفي
                  </p>
                </div>

                <Icon type="arrow" />
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom information */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-white p-3 text-blue-700 shadow-sm">
                <Icon type="building" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900">
                  بيانات المؤسسة
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  تأكد من تحديث بيانات مؤسستك حتى تظهر
                  بصورة احترافية للخريجين.
                </p>

                <Link
                  href="/dashboard/institution/profile"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-800"
                >
                  مراجعة الملف
                  <Icon type="arrow" />
                </Link>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Icon type="check" />
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900">
                  حالة الحساب
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {institution?.verified
                    ? "حساب مؤسستك موثق ويمكنه الاستفادة من خدمات المنصة."
                    : "حساب مؤسستك قيد المراجعة. ستظهر حالة التوثيق هنا بعد اعتماد الحساب."}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            جسر — منصة ربط الخريجين بالمؤسسات
          </p>

          <p>
            لوحة إدارة المؤسسة
          </p>
        </div>
      </footer>
    </main>
  );
}
