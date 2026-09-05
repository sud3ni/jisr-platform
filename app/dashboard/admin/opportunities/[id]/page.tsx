import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";

import OpportunityStatusButton from "@/components/admin/OpportunityStatusButton";
import DeleteOpportunityButton from "@/components/admin/DeleteOpportunityButton";

type OpportunityType = {
  label: string;
  className: string;
  iconClass: string;
};

function Icon({
  type,
}: {
  type:
    | "briefcase"
    | "building"
    | "location"
    | "clock"
    | "money"
    | "calendar"
    | "document"
    | "settings"
    | "edit"
    | "arrow"
    | "back"
    | "check"
    | "pause"
    | "warning"
    | "id";
}) {
  const common =
    "h-5 w-5";

  if (type === "briefcase") {
    return (
      <svg
        className={common}
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
        <path d="M10 12v2h4v-2" />
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
        <path d="M4 21V5l8-3 8 3v16" />
        <path d="M9 21v-5h6v5" />
        <path d="M8 8h2M14 8h2M8 11h2M14 11h2" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
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

  if (type === "money") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
        />
        <circle cx="12" cy="12" r="3" />
        <path d="M7 9h.01M17 15h.01" />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="17"
          rx="2"
        />
        <path d="M16 2v4M8 2v4M3 9h18" />
        <path d="M8 13h2M14 13h2M8 17h2M14 17h2" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h5" />
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
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.1h-2.4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H6.7v-2.4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.1h2.4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14h-.1a1.7 1.7 0 0 0-1.6 1Z" />
      </svg>
    );
  }

  if (type === "edit") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
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

  if (type === "back") {
    return (
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M19 12H5" />
        <path d="m11 18-6-6 6-6" />
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

  if (type === "pause") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M8 5v14M16 5v14" />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 3 2.8 20h18.4L12 3Z" />
        <path d="M12 9v5M12 17h.01" />
      </svg>
    );
  }

  if (type === "id") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
        />
        <circle cx="8" cy="11" r="2" />
        <path d="M5.5 16c.7-2 1.5-3 2.5-3s1.8 1 2.5 3M13 10h5M13 14h4" />
      </svg>
    );
  }

  return null;
}

export default async function OpportunityDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const {
    data: opportunity,
    error,
  } = await supabaseServer
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !opportunity) {
    notFound();
  }

  function getOpportunityType(
    type: string | null
  ): OpportunityType {
    switch (type) {
      case "training":
        return {
          label: "تدريب",
          className:
            "bg-blue-50 text-blue-700 border-blue-100",
          iconClass:
            "bg-blue-100 text-blue-700",
        };

      case "job":
        return {
          label: "وظيفة",
          className:
            "bg-green-50 text-green-700 border-green-100",
          iconClass:
            "bg-green-100 text-green-700",
        };

      case "volunteer":
        return {
          label: "تطوع",
          className:
            "bg-amber-50 text-amber-700 border-amber-100",
          iconClass:
            "bg-amber-100 text-amber-700",
        };

      case "cooperation":
        return {
          label: "تعاون",
          className:
            "bg-purple-50 text-purple-700 border-purple-100",
          iconClass:
            "bg-purple-100 text-purple-700",
        };

      default:
        return {
          label: type || "غير محدد",
          className:
            "bg-slate-50 text-slate-700 border-slate-200",
          iconClass:
            "bg-slate-100 text-slate-700",
        };
    }
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "غير محدد";
    }

    return new Date(date).toLocaleDateString(
      "ar-SD",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
  }

  const type = getOpportunityType(
    opportunity.opportunity_type
  );

  const status =
    opportunity.status === "published"
      ? {
          label: "منشورة",
          description:
            "الفرصة متاحة حاليًا للمستخدمين.",
          className:
            "bg-green-50 text-green-700 border-green-200",
          iconClass:
            "bg-green-100 text-green-700",
        }
      : opportunity.status === "suspended"
      ? {
          label: "موقوفة",
          description:
            "تم إيقاف ظهور الفرصة للمستخدمين.",
          className:
            "bg-red-50 text-red-700 border-red-200",
          iconClass:
            "bg-red-100 text-red-700",
        }
      : {
          label: "قيد المراجعة",
          description:
            "الفرصة بانتظار مراجعة المدير قبل نشرها.",
          className:
            "bg-amber-50 text-amber-700 border-amber-200",
          iconClass:
            "bg-amber-100 text-amber-700",
        };

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* Breadcrumb / Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/dashboard/admin"
                className="transition hover:text-blue-700"
              >
                لوحة المدير
              </Link>

              <span>/</span>

              <Link
                href="/dashboard/admin/opportunities"
                className="transition hover:text-blue-700"
              >
                إدارة الفرص
              </Link>

              <span>/</span>

              <span className="text-slate-700">
                التفاصيل
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              تفاصيل الفرصة
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              مراجعة بيانات الفرصة وإدارة حالتها.
            </p>
          </div>

          <Link
            href="/dashboard/admin/opportunities"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Icon type="back" />
            العودة إلى الفرص
          </Link>
        </div>

        {/* Hero */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-800 shadow-xl">
          <div className="p-6 text-white sm:p-8 lg:p-10">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex items-start gap-5">

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
                  <Icon type="briefcase" />
                </div>

                <div>
                  <div className="mb-3 flex flex-wrap gap-2">

                    <span
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${type.className}`}
                    >
                      {type.label}
                    </span>

                    <span
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold ${status.className}`}
                    >
                      {status.label}
                    </span>

                  </div>

                  <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                    {opportunity.title ||
                      "بدون عنوان"}
                  </h2>

                  <p className="mt-3 text-sm text-blue-100 sm:text-base">
                    {opportunity.institution_name ||
                      "مؤسسة غير محددة"}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 ring-1 ring-white/10">
                <div className="rounded-xl bg-white/10 p-3">
                  <Icon type="money" />
                </div>

                <div>
                  <p className="text-xs text-blue-100">
                    الراتب / المقابل
                  </p>

                  <p className="mt-1 font-extrabold">
                    {opportunity.salary ||
                      "غير محدد"}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-3">

          {/* Main information */}
          <div className="space-y-6 lg:col-span-2">

            {/* Status */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start gap-4">

                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${status.iconClass}`}
                >
                  {opportunity.status ===
                  "published" ? (
                    <Icon type="check" />
                  ) : opportunity.status ===
                    "suspended" ? (
                    <Icon type="pause" />
                  ) : (
                    <Icon type="warning" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900">
                    حالة الفرصة
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {status.description}
                  </p>

                  <span
                    className={`mt-4 inline-flex rounded-lg border px-4 py-2 text-sm font-bold ${status.className}`}
                  >
                    {status.label}
                  </span>
                </div>

              </div>
            </section>

            {/* Description */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon type="document" />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    وصف الفرصة
                  </h3>

                  <p className="text-sm text-slate-500">
                    التفاصيل التي قدمتها المؤسسة.
                  </p>
                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="whitespace-pre-line leading-8 text-slate-700">
                  {opportunity.description ||
                    "لا يوجد وصف للفرصة."}
                </p>
              </div>
            </section>

            {/* Requirements */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="mb-5 flex items-center gap-3">

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                  <Icon type="document" />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    المتطلبات
                  </h3>

                  <p className="text-sm text-slate-500">
                    الشروط أو المؤهلات المطلوبة للتقديم.
                  </p>
                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="whitespace-pre-line leading-8 text-slate-700">
                  {opportunity.requirements ||
                    "لا توجد متطلبات محددة."}
                </p>
              </div>
            </section>

            {/* Opportunity details */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

              <div className="mb-6">
                <h3 className="font-extrabold text-slate-900">
                  معلومات الفرصة
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  البيانات الأساسية المتعلقة بالفرصة.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                      <Icon type="building" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        المؤسسة
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {opportunity.institution_name ||
                          "غير محددة"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-3 ${type.iconClass}`}
                    >
                      <Icon type="briefcase" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        نوع الفرصة
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {type.label}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon type="location" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        المدينة
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {opportunity.city ||
                          "غير محددة"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                      <Icon type="location" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        الولاية
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {opportunity.state ||
                          "غير محددة"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-50 p-3 text-amber-700">
                      <Icon type="clock" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        المدة
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {opportunity.duration ||
                          "غير محددة"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-green-50 p-3 text-green-700">
                      <Icon type="money" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        الراتب / المقابل
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {opportunity.salary ||
                          "غير محدد"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-5 sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-red-50 p-3 text-red-700">
                      <Icon type="calendar" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        الموعد النهائي للتقديم
                      </p>

                      <p className="mt-1 font-bold text-slate-800">
                        {formatDate(
                          opportunity.deadline
                        )}
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

          </div>

          {/* Sidebar */}
          <aside className="space-y-6">

            {/* Management */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                  <Icon type="settings" />
                </div>

                <div>
                  <h3 className="font-extrabold text-slate-900">
                    إجراءات الإدارة
                  </h3>

                  <p className="text-xs text-slate-500">
                    إدارة حالة الفرصة
                  </p>
                </div>
              </div>

              <div className="space-y-3">

                <Link
                  href={`/dashboard/admin/opportunities/${opportunity.id}/edit`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-amber-600"
                >
                  <Icon type="edit" />
                  تعديل الفرصة
                </Link>

                {opportunity.status !==
                  "published" && (
                  <OpportunityStatusButton
                    id={opportunity.id}
                    action="publish"
                  />
                )}

                {opportunity.status !==
                  "suspended" && (
                  <OpportunityStatusButton
                    id={opportunity.id}
                    action="suspend"
                  />
                )}

                <DeleteOpportunityButton
                  id={opportunity.id}
                  title={
                    opportunity.title ||
                    "بدون عنوان"
                  }
                />

              </div>
            </section>

            {/* Dates */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

              <h3 className="font-extrabold text-slate-900">
                التواريخ
              </h3>

              <div className="mt-5 space-y-4">

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                    <Icon type="calendar" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      تاريخ الإنشاء
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {formatDate(
                        opportunity.created_at
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-50 p-2 text-red-600">
                    <Icon type="calendar" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      الموعد النهائي
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {formatDate(
                        opportunity.deadline
                      )}
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* ID */}
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-3 text-slate-600">
                  <Icon type="id" />
                </div>

                <div className="min-w-0">
                  <h3 className="font-extrabold text-slate-900">
                    معرف الفرصة
                  </h3>

                  <p className="mt-1 break-all font-mono text-xs leading-5 text-slate-500">
                    {opportunity.id}
                  </p>
                </div>
              </div>

            </section>

            {/* Admin note */}
            <section className="rounded-2xl border border-blue-100 bg-blue-50 p-5">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-white p-2 text-blue-700 shadow-sm">
                  <Icon type="warning" />
                </div>

                <div>
                  <h3 className="font-extrabold text-blue-900">
                    ملاحظة إدارية
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-blue-700">
                    الفرص الجديدة تبدأ عادةً بحالة
                    <strong> قيد المراجعة</strong>.
                    لا تظهر للمستخدمين إلا بعد نشرها
                    من الإدارة.
                  </p>
                </div>

              </div>

            </section>

          </aside>

        </div>

      </div>
    </main>
  );
}
