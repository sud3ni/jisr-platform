"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Application = {
  id: string;
  opportunity_id: string;
  applicant_name: string | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  applicant_cv: string | null;
  cover_letter: string | null;
  status: string | null;
  created_at: string | null;
};

type Opportunity = {
  id: string;
  title: string | null;
  opportunity_type: string | null;
  city: string | null;
  state: string | null;
};

type ApplicationWithOpportunity = Application & {
  opportunity: Opportunity | null;
};

export default function StudentApplicationsPage() {
  const [applications, setApplications] = useState<
    ApplicationWithOpportunity[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError("يجب تسجيل الدخول أولاً.");
        return;
      }

      /*
       * جلب طلبات الطالب
       */
      const {
        data: applicationsData,
        error: applicationsError,
      } = await supabase
        .from("applications")
        .select(
          `
            id,
            opportunity_id,
            applicant_name,
            applicant_email,
            applicant_phone,
            applicant_cv,
            cover_letter,
            status,
            created_at
          `
        )
        .eq("student_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (applicationsError) {
        console.error(
          "Student applications error:",
          applicationsError
        );

        setError(
          "تعذر تحميل طلبات التقديم."
        );

        return;
      }

      const apps = applicationsData || [];

      /*
       * جلب الفرص المرتبطة بالطلبات
       */
      const opportunityIds = [
        ...new Set(
          apps
            .map(
              (application) =>
                application.opportunity_id
            )
            .filter(Boolean)
        ),
      ];

      let opportunitiesMap: Record<
        string,
        Opportunity
      > = {};

      if (opportunityIds.length > 0) {
        const {
          data: opportunitiesData,
          error: opportunitiesError,
        } = await supabase
          .from("opportunities")
          .select(
            "id,title,opportunity_type,city,state"
          )
          .in("id", opportunityIds);

        if (opportunitiesError) {
          console.error(
            "Applications opportunities error:",
            opportunitiesError
          );
        }

        (opportunitiesData || []).forEach(
          (opportunity) => {
            opportunitiesMap[
              opportunity.id
            ] = opportunity;
          }
        );
      }

      const combined =
        apps.map((application) => ({
          ...application,
          opportunity:
            opportunitiesMap[
              application.opportunity_id
            ] || null,
        }));

      setApplications(combined);
    } catch (err) {
      console.error(
        "Load student applications error:",
        err
      );

      setError(
        "حدث خطأ أثناء تحميل طلبات التقديم."
      );
    } finally {
      setLoading(false);
    }
  }

  const statistics = useMemo(() => {
    return {
      total: applications.length,

      pending: applications.filter(
        (application) =>
          application.status === "pending"
      ).length,

      accepted: applications.filter(
        (application) =>
          application.status === "accepted"
      ).length,

      rejected: applications.filter(
        (application) =>
          application.status === "rejected"
      ).length,
    };
  }, [applications]);

  const filteredApplications =
    useMemo(() => {
      if (filter === "all") {
        return applications;
      }

      return applications.filter(
        (application) =>
          application.status === filter
      );
    }, [applications, filter]);

  function statusLabel(
    status?: string | null
  ) {
    switch (status) {
      case "pending":
        return "قيد المراجعة";

      case "accepted":
        return "مقبول";

      case "rejected":
        return "مرفوض";

      case "withdrawn":
        return "منسحب";

      case "reviewing":
        return "تحت المراجعة";

      default:
        return status || "غير محدد";
    }
  }

  function statusClass(
    status?: string | null
  ) {
    switch (status) {
      case "accepted":
        return "border-emerald-200 bg-emerald-50 text-emerald-700";

      case "rejected":
        return "border-red-200 bg-red-50 text-red-700";

      case "reviewing":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "withdrawn":
        return "border-slate-200 bg-slate-100 text-slate-600";

      case "pending":
      default:
        return "border-amber-200 bg-amber-50 text-amber-700";
    }
  }

  function opportunityTypeLabel(
    type?: string | null
  ) {
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

  function formatDate(
    date?: string | null
  ) {
    if (!date) {
      return "غير متوفر";
    }

    try {
      return new Intl.DateTimeFormat(
        "ar-SD",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      ).format(new Date(date));
    } catch {
      return date;
    }
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

            <p className="mt-5 font-bold text-slate-600">
              جاري تحميل طلبات التقديم...
            </p>

            <p className="mt-1 text-sm text-slate-400">
              يرجى الانتظار قليلاً
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
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
            تعذر تحميل الطلبات
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {error}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={loadApplications}
              className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
            >
              المحاولة مرة أخرى
            </button>

            <Link
              href="/dashboard/student"
              className="rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              العودة للوحة التحكم
            </Link>
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
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 4h14v16H5z" />
                <path d="M8 8h8" />
                <path d="M8 12h8" />
                <path d="M8 16h5" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold text-blue-700">
                منصة جسر
              </p>

              <h1 className="text-xl font-extrabold text-slate-900">
                طلبات التقديم
              </h1>
            </div>
          </div>

          <Link
            href="/dashboard/student"
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

            لوحة الطالب
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-bold text-blue-100">
              متابعة الفرص
            </p>

            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl">
              طلبات التقديم الخاصة بك
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              تابع حالة طلباتك وتعرّف على آخر المستجدات
              المتعلقة بالفرص التي تقدمت إليها.
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  إجمالي الطلبات
                </p>

                <p className="mt-2 text-3xl font-extrabold text-blue-700">
                  {statistics.total}
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
                  <path d="M6 3h12v18H6z" />
                  <path d="M9 7h6" />
                  <path d="M9 11h6" />
                  <path d="M9 15h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  قيد المراجعة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-amber-600">
                  {statistics.pending}
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
                  <circle
                    cx="12"
                    cy="12"
                    r="8"
                  />

                  <path d="M12 8v5l3 2" />
                </svg>
              </div>
            </div>
          </div>

          {/* Accepted */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  الطلبات المقبولة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-emerald-600">
                  {statistics.accepted}
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
                  <path d="m5 12 4 4L19 6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Rejected */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  الطلبات المرفوضة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-red-600">
                  {statistics.rejected}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m7 7 10 10" />
                  <path d="m17 7-10 10" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mt-8 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                filter === "all"
                  ? "bg-blue-700 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              جميع الطلبات
            </button>

            <button
              type="button"
              onClick={() =>
                setFilter("pending")
              }
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                filter === "pending"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-amber-50 hover:text-amber-700"
              }`}
            >
              قيد المراجعة
            </button>

            <button
              type="button"
              onClick={() =>
                setFilter("accepted")
              }
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                filter === "accepted"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              المقبولة
            </button>

            <button
              type="button"
              onClick={() =>
                setFilter("rejected")
              }
              className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                filter === "rejected"
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-700"
              }`}
            >
              المرفوضة
            </button>
          </div>
        </section>

        {/* Applications */}
        <section className="mt-8">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                سجل طلباتك
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                جميع الطلبات التي قمت بإرسالها عبر منصة جسر.
              </p>
            </div>

            <Link
              href="/opportunities"
              className="font-bold text-blue-700 hover:text-blue-800 hover:underline"
            >
              استعراض فرص جديدة
            </Link>
          </div>

          {filteredApplications.length ===
          0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M6 3h12v18H6z" />
                  <path d="M9 8h6" />
                  <path d="M9 12h6" />
                  <path d="M9 16h3" />
                </svg>
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-800">
                لا توجد طلبات تقديم
              </h3>

              <p className="mx-auto mt-2 max-w-md leading-7 text-slate-500">
                لم تقم بإرسال أي طلبات تقديم ضمن هذا التصنيف حتى الآن.
              </p>

              <Link
                href="/opportunities"
                className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
              >
                استعراض الفرص
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredApplications.map(
                (application) => {
                  const opportunity =
                    application.opportunity;

                  return (
                    <article
                      key={application.id}
                      className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:shadow-lg"
                    >
                      <div className="p-6 sm:p-7">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          {/* Opportunity */}
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                                {opportunityTypeLabel(
                                  opportunity?.opportunity_type
                                )}
                              </span>

                              <span
                                className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass(
                                  application.status
                                )}`}
                              >
                                {statusLabel(
                                  application.status
                                )}
                              </span>
                            </div>

                            <h3 className="mt-4 text-xl font-extrabold text-slate-900 sm:text-2xl">
                              {opportunity?.title ||
                                "فرصة غير متاحة"}
                            </h3>

                            {opportunity && (
                              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
                                {(opportunity.city ||
                                  opportunity.state) && (
                                  <span className="inline-flex items-center gap-2">
                                    <svg
                                      className="h-4 w-4 text-slate-400"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.8"
                                    >
                                      <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                                      <circle
                                        cx="12"
                                        cy="9"
                                        r="2.2"
                                      />
                                    </svg>

                                    {[
                                      opportunity.city,
                                      opportunity.state,
                                    ]
                                      .filter(Boolean)
                                      .join(
                                        "، "
                                      )}
                                  </span>
                                )}

                                <span className="inline-flex items-center gap-2">
                                  <svg
                                    className="h-4 w-4 text-slate-400"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                  >
                                    <circle
                                      cx="12"
                                      cy="12"
                                      r="8"
                                    />
                                    <path d="M12 8v4l2.5 2" />
                                  </svg>

                                  تم التقديم:{" "}
                                  {formatDate(
                                    application.created_at
                                  )}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Application ID */}
                          <div className="shrink-0 rounded-2xl bg-slate-50 px-4 py-3 text-right">
                            <p className="text-xs font-bold text-slate-400">
                              رقم الطلب
                            </p>

                            <p className="mt-1 max-w-[220px] truncate font-mono text-xs font-bold text-slate-600">
                              {application.id}
                            </p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 md:grid-cols-3">
                          <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-bold text-slate-400">
                              اسم المتقدم
                            </p>

                            <p className="mt-2 font-bold text-slate-800">
                              {application.applicant_name ||
                                "غير متوفر"}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-bold text-slate-400">
                              البريد الإلكتروني
                            </p>

                            <p className="mt-2 break-all font-bold text-slate-800">
                              {application.applicant_email ||
                                "غير متوفر"}
                            </p>
                          </div>

                          <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-xs font-bold text-slate-400">
                              السيرة الذاتية
                            </p>

                            {application.applicant_cv ? (
                              <a
                                href={
                                  application.applicant_cv
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex font-bold text-blue-700 hover:text-blue-800 hover:underline"
                              >
                                عرض السيرة الذاتية
                              </a>
                            ) : (
                              <p className="mt-2 font-bold text-slate-500">
                                غير متوفرة
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Cover letter */}
                        {application.cover_letter && (
                          <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4">
                            <p className="text-xs font-bold text-slate-400">
                              رسالة التقديم
                            </p>

                            <p className="mt-2 whitespace-pre-line leading-7 text-slate-600">
                              {application.cover_letter}
                            </p>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs leading-6 text-slate-400">
                            يمكنك متابعة حالة الطلب من هذه الصفحة.
                          </p>

                          {opportunity?.id && (
                            <Link
                              href={`/opportunities/${opportunity.id}`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-800"
                            >
                              عرض تفاصيل الفرصة

                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path d="M5 12h14" />
                                <path d="m13 6 6 6-6 6" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
