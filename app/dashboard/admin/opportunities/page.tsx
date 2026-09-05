import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

type Opportunity = {
  id: string;
  title: string | null;
  description: string | null;
  institution_name: string | null;
  opportunity_type: string | null;
  city: string | null;
  state: string | null;
  salary: string | null;
  duration: string | null;
  deadline: string | null;
  status: string | null;
  created_at: string | null;
};

function Icon({
  type,
  className = "h-5 w-5",
}: {
  type:
    | "briefcase"
    | "building"
    | "graduation"
    | "users"
    | "clock"
    | "check"
    | "pause"
    | "search"
    | "filter"
    | "arrow"
    | "location"
    | "calendar"
    | "money"
    | "clipboard"
    | "dashboard";
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "briefcase") {
    return (
      <svg {...common}>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </svg>
    );
  }

  if (type === "building") {
    return (
      <svg {...common}>
        <path d="M4 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
        <path d="M16 9h3a1 1 0 0 1 1 1v11" />
        <path d="M8 7h4M8 11h4M8 15h4" />
        <path d="M9 21v-3h2v3" />
      </svg>
    );
  }

  if (type === "graduation") {
    return (
      <svg {...common}>
        <path d="m3 9 9-5 9 5-9 5-9-5Z" />
        <path d="M7 11.5V16c2.8 2 7.2 2 10 0v-4.5" />
        <path d="M21 9v6" />
      </svg>
    );
  }

  if (type === "users") {
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c.5-3.5 2.5-5 6-5s5.5 1.5 6 5" />
        <path d="M16 5.5a3 3 0 0 1 0 5.8" />
        <path d="M18 15c1.8.5 2.8 1.9 3 4" />
      </svg>
    );
  }

  if (type === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "pause") {
    return (
      <svg {...common}>
        <rect x="6" y="5" width="4" height="14" rx="1" />
        <rect x="14" y="5" width="4" height="14" rx="1" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg {...common}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5" />
      </svg>
    );
  }

  if (type === "filter") {
    return (
      <svg {...common}>
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
      </svg>
    );
  }

  if (type === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  }

  if (type === "location") {
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </svg>
    );
  }

  if (type === "money") {
    return (
      <svg {...common}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M7 9h.01M17 15h.01" />
      </svg>
    );
  }

  if (type === "clipboard") {
    return (
      <svg {...common}>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4.5V3h6v1.5M8 9h8M8 13h8M8 17h5" />
      </svg>
    );
  }

  if (type === "dashboard") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  return null;
}

function getTypeInfo(type: string | null) {
  switch (type) {
    case "training":
      return {
        label: "تدريب",
        icon: "graduation" as const,
        className:
          "bg-blue-50 text-blue-700 ring-blue-200",
      };

    case "job":
      return {
        label: "وظيفة",
        icon: "briefcase" as const,
        className:
          "bg-green-50 text-green-700 ring-green-200",
      };

    case "volunteer":
      return {
        label: "تطوع",
        icon: "users" as const,
        className:
          "bg-amber-50 text-amber-700 ring-amber-200",
      };

    case "cooperation":
      return {
        label: "تعاون",
        icon: "users" as const,
        className:
          "bg-purple-50 text-purple-700 ring-purple-200",
      };

    default:
      return {
        label: type || "غير محدد",
        icon: "clipboard" as const,
        className:
          "bg-slate-50 text-slate-700 ring-slate-200",
      };
  }
}

function getStatusInfo(status: string | null) {
  switch (status) {
    case "published":
      return {
        label: "منشورة",
        className:
          "bg-green-50 text-green-700 ring-green-200",
      };

    case "suspended":
      return {
        label: "موقوفة",
        className:
          "bg-red-50 text-red-700 ring-red-200",
      };

    case "pending":
    case "review":
      return {
        label: "قيد المراجعة",
        className:
          "bg-amber-50 text-amber-700 ring-amber-200",
      };

    default:
      return {
        label: status || "قيد المراجعة",
        className:
          "bg-slate-50 text-slate-700 ring-slate-200",
      };
  }
}

function formatDate(date: string | null) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("ar-SD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function StatCard({
  title,
  value,
  description,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

export default async function OpportunitiesPage() {
  const {
    data: opportunities,
    error,
  } = await supabaseServer
    .from("opportunities")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const allOpportunities =
    (opportunities as Opportunity[]) || [];

  const total = allOpportunities.length;

  const trainingCount = allOpportunities.filter(
    (item) => item.opportunity_type === "training"
  ).length;

  const jobCount = allOpportunities.filter(
    (item) => item.opportunity_type === "job"
  ).length;

  const publishedCount = allOpportunities.filter(
    (item) => item.status === "published"
  ).length;

  const pendingCount = allOpportunities.filter(
    (item) =>
      item.status === "pending" ||
      item.status === "review" ||
      !item.status
  ).length;

  const suspendedCount = allOpportunities.filter(
    (item) => item.status === "suspended"
  ).length;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm">
                <Link
                  href="/dashboard/admin"
                  className="flex items-center gap-2 font-semibold text-blue-700 transition hover:text-blue-800"
                >
                  <Icon
                    type="dashboard"
                    className="h-4 w-4"
                  />

                  لوحة الإدارة
                </Link>

                <span className="text-slate-300">
                  /
                </span>

                <span className="text-slate-500">
                  إدارة الفرص
                </span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                إدارة الفرص
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                مراجعة وإدارة جميع فرص العمل والتدريب
                والتطوع والتعاون في منصة جسر.
              </p>
            </div>

            <Link
              href="/dashboard/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <Icon
                type="arrow"
                className="h-4 w-4 rotate-180"
              />

              العودة للوحة الإدارة
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
                <Icon
                  type="pause"
                  className="h-5 w-5"
                />
              </div>

              <div>
                <h2 className="font-extrabold">
                  تعذر تحميل الفرص
                </h2>

                <p className="mt-1 text-sm">
                  حدث خطأ أثناء الاتصال بقاعدة البيانات.
                </p>

                <p className="mt-2 text-xs opacity-80">
                  {error.message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <StatCard
            title="إجمالي الفرص"
            value={total}
            description="جميع الفرص المسجلة"
            icon={
              <Icon
                type="clipboard"
                className="h-5 w-5"
              />
            }
            iconClass="bg-blue-50 text-blue-700"
          />

          <StatCard
            title="الفرص المنشورة"
            value={publishedCount}
            description="متاحة للمستخدمين"
            icon={
              <Icon
                type="check"
                className="h-5 w-5"
              />
            }
            iconClass="bg-green-50 text-green-600"
          />

          <StatCard
            title="قيد المراجعة"
            value={pendingCount}
            description="تحتاج إلى مراجعة"
            icon={
              <Icon
                type="clock"
                className="h-5 w-5"
              />
            }
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            title="فرص التدريب"
            value={trainingCount}
            description="برامج تدريبية"
            icon={
              <Icon
                type="graduation"
                className="h-5 w-5"
              />
            }
            iconClass="bg-indigo-50 text-indigo-700"
          />

          <StatCard
            title="فرص العمل"
            value={jobCount}
            description="وظائف متاحة"
            icon={
              <Icon
                type="briefcase"
                className="h-5 w-5"
              />
            }
            iconClass="bg-purple-50 text-purple-700"
          />

        </section>

        {/* Status overview */}
        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="font-extrabold text-slate-900">
                ملخص حالة الفرص
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                متابعة حالة الفرص قبل وبعد النشر.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-sm font-bold text-green-700">
                  منشورة
                </span>

                <span className="text-sm font-extrabold text-green-800">
                  {publishedCount}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />

                <span className="text-sm font-bold text-amber-700">
                  قيد المراجعة
                </span>

                <span className="text-sm font-extrabold text-amber-800">
                  {pendingCount}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />

                <span className="text-sm font-bold text-red-700">
                  موقوفة
                </span>

                <span className="text-sm font-extrabold text-red-800">
                  {suspendedCount}
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* Opportunities table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table header */}
          <div className="border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  جميع الفرص
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  عرض جميع الفرص المسجلة في المنصة.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500">
                  <Icon
                    type="search"
                    className="h-4 w-4"
                  />

                  <span>
                    إجمالي النتائج:
                  </span>

                  <span className="font-extrabold text-slate-800">
                    {total}
                  </span>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600">
                  <Icon
                    type="filter"
                    className="h-4 w-4"
                  />

                  جميع الحالات
                </div>

              </div>
            </div>
          </div>

          {/* Empty */}
          {!allOpportunities.length ? (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
                <Icon
                  type="clipboard"
                  className="h-9 w-9"
                />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold text-slate-800">
                لا توجد فرص مسجلة
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                ستظهر هنا الفرص التي تقوم المؤسسات
                بإنشائها وإرسالها إلى منصة جسر.
              </p>

              <Link
                href="/dashboard/admin"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
              >
                العودة للوحة الإدارة

                <Icon
                  type="arrow"
                  className="h-4 w-4 rotate-180"
                />
              </Link>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="min-w-[1150px] w-full">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-5 py-4 text-right text-xs font-extrabold text-slate-500">
                      الفرصة
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-extrabold text-slate-500">
                      المؤسسة
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-extrabold text-slate-500">
                      النوع
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-extrabold text-slate-500">
                      الحالة
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-extrabold text-slate-500">
                      الموقع
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-extrabold text-slate-500">
                      الموعد النهائي
                    </th>

                    <th className="px-5 py-4 text-center text-xs font-extrabold text-slate-500">
                      الإجراء
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {allOpportunities.map(
                    (opportunity) => {

                      const type = getTypeInfo(
                        opportunity.opportunity_type
                      );

                      const status = getStatusInfo(
                        opportunity.status
                      );

                      return (
                        <tr
                          key={opportunity.id}
                          className="border-b border-slate-100 transition hover:bg-slate-50"
                        >

                          {/* Opportunity */}
                          <td className="px-5 py-5">

                            <div className="max-w-xs">

                              <p className="font-extrabold text-slate-800">
                                {opportunity.title ||
                                  "بدون عنوان"}
                              </p>

                              {opportunity.description && (
                                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                                  {opportunity.description}
                                </p>
                              )}

                            </div>

                          </td>

                          {/* Institution */}
                          <td className="px-5 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                <Icon
                                  type="building"
                                  className="h-4 w-4"
                                />
                              </div>

                              <span className="max-w-44 truncate text-sm font-bold text-slate-700">
                                {opportunity.institution_name ||
                                  "غير محددة"}
                              </span>

                            </div>

                          </td>

                          {/* Type */}
                          <td className="px-5 py-5">

                            <span
                              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ring-1 ${type.className}`}
                            >
                              <Icon
                                type={type.icon}
                                className="h-4 w-4"
                              />

                              {type.label}
                            </span>

                          </td>

                          {/* Status */}
                          <td className="px-5 py-5">

                            <span
                              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ring-1 ${status.className}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  opportunity.status ===
                                  "published"
                                    ? "bg-green-500"
                                    : opportunity.status ===
                                      "suspended"
                                    ? "bg-red-500"
                                    : "bg-amber-500"
                                }`}
                              />

                              {status.label}
                            </span>

                          </td>

                          {/* Location */}
                          <td className="px-5 py-5">

                            <div className="flex items-start gap-2 text-sm">

                              <Icon
                                type="location"
                                className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                              />

                              <div>
                                <p className="font-semibold text-slate-700">
                                  {opportunity.city ||
                                    "غير محددة"}
                                </p>

                                {opportunity.state && (
                                  <p className="mt-1 text-xs text-slate-400">
                                    {opportunity.state}
                                  </p>
                                )}
                              </div>

                            </div>

                          </td>

                          {/* Deadline */}
                          <td className="px-5 py-5">

                            <div className="space-y-1">

                              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Icon
                                  type="calendar"
                                  className="h-4 w-4 text-slate-400"
                                />

                                {formatDate(
                                  opportunity.deadline
                                )}
                              </div>

                              {opportunity.salary && (
                                <div className="flex items-center gap-2 text-xs text-green-600">
                                  <Icon
                                    type="money"
                                    className="h-3.5 w-3.5"
                                  />

                                  {opportunity.salary}
                                </div>
                              )}

                            </div>

                          </td>

                          {/* Action */}
                          <td className="px-5 py-5 text-center">

                            <Link
                              href={`/dashboard/admin/opportunities/${opportunity.id}`}
                              className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-800"
                            >
                              عرض التفاصيل

                              <Icon
                                type="arrow"
                                className="h-3.5 w-3.5"
                              />
                            </Link>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>
          )}

        </section>

        {/* Information */}
        {allOpportunities.length > 0 && (
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm leading-7 text-blue-700">

            <div className="mt-1 shrink-0">
              <Icon
                type="clipboard"
                className="h-5 w-5"
              />
            </div>

            <p>
              <strong>ملاحظة:</strong>{" "}
              الفرص الجديدة تحتاج إلى مراجعة المدير قبل
              نشرها للمستخدمين. ويمكن للمدير إيقاف أي
              فرصة منشورة عند وجود مخالفة أو مشكلة.
            </p>

          </div>
        )}

      </div>
    </main>
  );
}
