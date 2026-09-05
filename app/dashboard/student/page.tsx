"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Student = {
  full_name?: string | null;
  email?: string | null;
};

type Opportunity = {
  id: string;
  title: string;
  opportunity_type?: string | null;
  city?: string | null;
  state?: string | null;
  status?: string | null;
};

export default function StudentDashboard() {
  const [student, setStudent] =
    useState<Student | null>(null);

  const [opportunitiesCount, setOpportunitiesCount] =
    useState(0);

  const [applicationsCount, setApplicationsCount] =
    useState(0);

  const [pendingCount, setPendingCount] =
    useState(0);

  const [acceptedCount, setAcceptedCount] =
    useState(0);

  const [opportunities, setOpportunities] =
    useState<Opportunity[]>([]);

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
        return;
      }

      /*
       * بيانات الطالب
       */
      const {
        data: studentData,
        error: studentError,
      } = await supabase
        .from("users")
        .select("full_name,email")
        .eq("id", user.id)
        .eq("role", "student")
        .maybeSingle();

      if (studentError) {
        console.error(
          "Student error:",
          studentError
        );

        setMessage(
          "تعذر تحميل بيانات الطالب."
        );

        return;
      }

      if (!studentData) {
        setMessage(
          "لم يتم العثور على حساب طالب مرتبط بهذا المستخدم."
        );

        return;
      }

      setStudent(studentData);

      /*
       * الفرص المتاحة
       */
      const {
        data: opportunitiesData,
        error: opportunitiesError,
        count: opportunitiesCountData,
      } = await supabase
        .from("opportunities")
        .select(
          "id,title,opportunity_type,city,state,status",
          {
            count: "exact",
          }
        )
        .eq("status", "published")
        .order("created_at", {
          ascending: false,
        });

      if (opportunitiesError) {
        console.error(
          "Opportunities error:",
          opportunitiesError
        );
      }

      const availableOpportunities =
        opportunitiesData || [];

      setOpportunities(
        availableOpportunities.slice(0, 6)
      );

      setOpportunitiesCount(
        opportunitiesCountData ||
          availableOpportunities.length
      );

      /*
       * طلبات الطالب
       */
      const {
        data: applications,
        error: applicationsError,
      } = await supabase
        .from("applications")
        .select("id,status")
        .eq("student_id", user.id);

      if (applicationsError) {
        console.error(
          "Student applications error:",
          applicationsError
        );
      }

      const apps = applications || [];

      setApplicationsCount(apps.length);

      setPendingCount(
        apps.filter(
          (application) =>
            application.status === "pending"
        ).length
      );

      setAcceptedCount(
        apps.filter(
          (application) =>
            application.status === "accepted"
        ).length
      );

      /*
       * الإشعارات
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

  function opportunityTypeLabel(
    type?: string | null
  ) {
    if (type === "training") return "تدريب";
    if (type === "job") return "وظيفة";
    if (type === "volunteer") return "تطوع";
    if (type === "cooperation") return "تعاون";

    return type || "فرصة";
  }

  function getInitials(name?: string | null) {
    if (!name) return "ط";

    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 1) {
      return words[0].charAt(0);
    }

    return (
      words[0].charAt(0) +
      words[1].charAt(0)
    );
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-50"
      >
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-4 text-sm font-bold text-slate-600">
              جاري تحميل لوحة التحكم...
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
            تعذر فتح لوحة التحكم
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
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <Link
            href="/dashboard/student"
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
              <p className="text-xs font-bold text-blue-700">
                جسر
              </p>

              <h1 className="text-lg font-extrabold text-slate-900">
                لوحة الطالب
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-3">

            <Link
              href="/dashboard/student/notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              aria-label="الإشعارات"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                <path d="M10 21h4" />
              </svg>

              {unreadNotifications > 0 && (
                <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                  {unreadNotifications}
                </span>
              )}
            </Link>

            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-sm font-extrabold text-blue-700">
                {getInitials(student?.full_name)}
              </div>

              <div className="hidden text-right sm:block">
                <p className="max-w-32 truncate text-sm font-bold text-slate-800">
                  {student?.full_name || "الطالب"}
                </p>

                <p className="text-xs text-slate-500">
                  طالب
                </p>
              </div>
            </Link>

          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Welcome */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-800 p-7 text-white shadow-xl sm:p-10">

          <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/5" />

          <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full bg-white/5" />

          <div className="relative z-10 max-w-3xl">

            <p className="text-sm font-semibold text-blue-200">
              منصة جسر
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              مرحباً بك،
              <br />
              {student?.full_name || "في لوحة الطالب"}
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              اكتشف فرص التدريب والعمل والتطوع،
              وتابع طلباتك وتواصل مع المؤسسات من مكان واحد.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/opportunities"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-extrabold text-blue-800 shadow-lg transition hover:bg-blue-50"
              >
                استعراض الفرص

                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </Link>

              <Link
                href="/dashboard/profile"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white transition hover:bg-white/15"
              >
                تحديث الملف الشخصي
              </Link>

            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  الفرص المتاحة
                </p>

                <p className="mt-3 text-3xl font-extrabold text-blue-700">
                  {opportunitiesCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect
                    x="3"
                    y="7"
                    width="18"
                    height="13"
                    rx="2"
                  />

                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />

                  <path d="M3 12h18" />
                </svg>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  طلبات التقديم
                </p>

                <p className="mt-3 text-3xl font-extrabold text-indigo-700">
                  {applicationsCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 3h12a2 2 0 0 1 2 2v16H4V5a2 2 0 0 1 2-2Z" />

                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                  <path d="M8 16h5" />
                </svg>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  قيد المراجعة
                </p>

                <p className="mt-3 text-3xl font-extrabold text-amber-600">
                  {pendingCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-bold text-slate-500">
                  تم القبول
                </p>

                <p className="mt-3 text-3xl font-extrabold text-emerald-600">
                  {acceptedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="m8 12 2.5 2.5L16 9" />
                </svg>
              </div>

            </div>
          </div>

        </section>

        {/* Quick Actions */}
        <section className="mt-10">

          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-slate-900">
              الوصول السريع
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              أهم الخدمات التي تحتاج إليها.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/opportunities"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <path d="M3 12h18" />
                </svg>
              </div>

              <h3 className="mt-5 font-extrabold text-slate-900">
                استعراض الفرص
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                تصفح جميع الفرص المتاحة.
              </p>
            </Link>

            <Link
              href="/dashboard/student/applications"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 transition group-hover:bg-indigo-700 group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 3h12a2 2 0 0 1 2 2v16H4V5a2 2 0 0 1 2-2Z" />
                  <path d="M8 8h8" />
                  <path d="M8 12h8" />
                  <path d="M8 16h5" />
                </svg>
              </div>

              <h3 className="mt-5 font-extrabold text-slate-900">
                طلبات التقديم
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                تابع حالة طلباتك الحالية.
              </p>
            </Link>

            <Link
              href="/dashboard/student/notifications"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
            >
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-600 group-hover:text-white">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
                  <path d="M10 21h4" />
                </svg>

                {unreadNotifications > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                    {unreadNotifications}
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-extrabold text-slate-900">
                الإشعارات
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                راجع آخر الإشعارات والتحديثات.
              </p>
            </Link>

            <Link
              href="/dashboard/profile"
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700 transition group-hover:bg-purple-700 group-hover:text-white">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6" />
                </svg>
              </div>

              <h3 className="mt-5 font-extrabold text-slate-900">
                الملف الشخصي
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                إدارة بيانات حسابك وملفك الشخصي.
              </p>
            </Link>

          </div>
        </section>

        {/* Latest Opportunities */}
        <section className="mt-10">

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                أحدث الفرص
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                أحدث الفرص المنشورة على منصة جسر.
              </p>
            </div>

            <Link
              href="/opportunities"
              className="font-bold text-blue-700 transition hover:text-blue-800"
            >
              عرض جميع الفرص
            </Link>

          </div>

          {opportunities.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14" />
                  <path d="M4 19a2 2 0 0 0 2 2h12" />
                  <path d="M8 7h8" />
                  <path d="M8 11h8" />
                </svg>
              </div>

              <p className="mt-4 font-bold text-slate-700">
                لا توجد فرص متاحة حالياً.
              </p>

              <p className="mt-2 text-sm text-slate-500">
                سنعرض لك الفرص الجديدة فور نشرها.
              </p>

            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

              {opportunities.map((opportunity) => (
                <Link
                  key={opportunity.id}
                  href={`/opportunities/${opportunity.id}`}
                  className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0">

                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-blue-700">
                        {opportunityTypeLabel(
                          opportunity.opportunity_type
                        )}
                      </span>

                      <h3 className="mt-4 line-clamp-2 text-xl font-extrabold leading-8 text-slate-900">
                        {opportunity.title}
                      </h3>

                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition group-hover:bg-blue-50 group-hover:text-blue-700">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </div>

                  </div>

                  {(opportunity.city ||
                    opportunity.state) && (
                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                      <svg
                        className="h-4 w-4 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>

                      <span>
                        {[
                          opportunity.city,
                          opportunity.state,
                        ]
                          .filter(Boolean)
                          .join("، ")}
                      </span>
                    </div>
                  )}

                  <div className="mt-5 border-t border-slate-100 pt-4 text-sm font-extrabold text-blue-700">
                    عرض تفاصيل الفرصة
                  </div>

                </Link>
              ))}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
