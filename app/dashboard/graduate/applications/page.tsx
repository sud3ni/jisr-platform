"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Application = {
id: string;
opportunity_id: string;
status: string | null;
created_at: string;
opportunity?: {
title?: string | null;
city?: string | null;
opportunity_type?: string | null;
} | null;
};

function Icon({
name,
className = "h-5 w-5",
}: {
name:
| "dashboard"
| "applications"
| "opportunities"
| "clock"
| "check"
| "x"
| "location"
| "calendar"
| "arrow"
| "briefcase";
className?: string;
}) {
const props = {
className,
viewBox: "0 0 24 24",
fill: "none",
stroke: "currentColor",
strokeWidth: 1.8,
strokeLinecap: "round" as const,
strokeLinejoin: "round" as const,
};

switch (name) {
case "dashboard":
return (
<svg {...props}>
<rect x="3" y="3" width="7" height="7" rx="1" />
<rect x="14" y="3" width="7" height="7" rx="1" />
<rect x="3" y="14" width="7" height="7" rx="1" />
<rect x="14" y="14" width="7" height="7" rx="1" />
</svg>
);

case "applications":
  return (
    <svg {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M8 16h5" />
    </svg>
  );

case "opportunities":
  return (
    <svg {...props}>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V4h8v2" />
      <path d="M3 11h18" />
      <path d="M10 11v3h4v-3" />
    </svg>
  );

case "briefcase":
  return (
    <svg {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );

case "clock":
  return (
    <svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );

case "check":
  return (
    <svg {...props}>
      <path d="m5 12 4 4L19 6" />
    </svg>
  );

case "x":
  return (
    <svg {...props}>
      <path d="m7 7 10 10" />
      <path d="m17 7-10 10" />
    </svg>
  );

case "location":
  return (
    <svg {...props}>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );

case "calendar":
  return (
    <svg {...props}>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 9h18" />
    </svg>
  );

case "arrow":
  return (
    <svg {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );

default:
  return null;

}
}

function getStatus(status: string | null) {
switch (status) {
case "accepted":
return {
label: "تم قبول الطلب",
description: "تهانينا، تم قبول طلبك.",
className:
"border-green-200 bg-green-50 text-green-700",
icon: "check" as const,
};

case "rejected":
  return {
    label: "تم رفض الطلب",
    description: "لم يتم قبول طلبك لهذه الفرصة.",
    className:
      "border-red-200 bg-red-50 text-red-700",
    icon: "x" as const,
  };

case "pending":
default:
  return {
    label: "قيد المراجعة",
    description:
      "طلبك قيد المراجعة من المؤسسة.",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon: "clock" as const,
  };

}
}

function formatDate(date: string) {
try {
return new Date(date).toLocaleDateString(
"ar-SD",
{
year: "numeric",
month: "long",
day: "numeric",
}
);
} catch {
return date;
}
}

export default function GraduateApplicationsPage() {
const [applications, setApplications] =
useState<Application[]>([]);

const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");

useEffect(() => {
loadApplications();
}, []);

async function loadApplications() {
setLoading(true);
setMessage("");

try {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    setMessage("يجب تسجيل الدخول أولاً.");
    return;
  }

  const {
    data: apps,
    error,
  } = await supabase
    .from("applications")
    .select("*")
    .eq("graduate_id", user.id)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Graduate applications error:",
      error
    );

    setMessage(
      "تعذر تحميل طلبات التقديم."
    );

    return;
  }

  const result: Application[] = [];

  for (const app of apps || []) {
    const {
      data: opportunity,
    } = await supabase
      .from("opportunities")
      .select(
        "title,city,opportunity_type"
      )
      .eq("id", app.opportunity_id)
      .maybeSingle();

    result.push({
      ...app,
      opportunity,
    });
  }

  setApplications(result);
} catch (error) {
  console.error(
    "Unexpected applications error:",
    error
  );

  setMessage(
    "حدث خطأ أثناء تحميل طلبات التقديم."
  );
} finally {
  setLoading(false);
}

}

const totalApplications =
applications.length;

const pendingApplications =
applications.filter(
(app) => app.status === "pending"
).length;

const acceptedApplications =
applications.filter(
(app) => app.status === "accepted"
).length;

const rejectedApplications =
applications.filter(
(app) => app.status === "rejected"
).length;

if (loading) {
return (
<main
dir="rtl"
className="min-h-screen bg-slate-50"
>
<div className="flex min-h-screen items-center justify-center px-6">
<div className="text-center">
<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
</div>

        <p className="mt-5 font-bold text-slate-700">
          جاري تحميل طلبات التقديم...
        </p>

        <p className="mt-1 text-sm text-slate-400">
          يرجى الانتظار قليلًا
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
<Icon
name="applications"
className="h-8 w-8"
/>
</div>

      <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
        تعذر تحميل الطلبات
      </h1>

      <p className="mt-3 leading-7 text-slate-600">
        {message}
      </p>

      <Link
        href="/dashboard/graduate"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
      >
        العودة إلى لوحة الخريج
        <Icon name="arrow" />
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
<header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
<div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
<Link
href="/dashboard/graduate"
className="flex items-center gap-3"
>
<div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg shadow-blue-700/20">
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

          <p className="text-xs font-medium text-slate-500">
            لوحة الخريج
          </p>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/graduate"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <Icon name="dashboard" />
          <span className="hidden sm:inline">
            لوحة التحكم
          </span>
        </Link>

        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-700/20 transition hover:bg-blue-800"
        >
          <Icon name="opportunities" />
          <span className="hidden sm:inline">
            استعراض الفرص
          </span>
        </Link>
      </div>
    </div>
  </header>

  {/* Main */}
  <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    {/* Hero */}
    <section className="relative mb-8 overflow-hidden rounded-[28px] bg-gradient-to-l from-blue-800 via-blue-700 to-indigo-700 p-6 text-white shadow-xl sm:p-8 lg:p-10">
      <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-white/10" />
      <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-white/5" />

      <div className="relative z-10 max-w-3xl">
        <p className="text-sm font-bold text-blue-100">
          لوحة الخريج
        </p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          طلبات التقديم
        </h2>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
          تابع جميع الفرص التي تقدمت إليها،
          واعرف حالة كل طلب بسهولة من مكان واحد.
        </p>

        <Link
          href="/opportunities"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-blue-800 shadow-lg transition hover:bg-blue-50"
        >
          <Icon name="opportunities" />
          اكتشف فرصًا جديدة
        </Link>
      </div>
    </section>

    {/* Stats */}
    <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              إجمالي الطلبات
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {totalApplications}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon name="applications" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              قيد المراجعة
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {pendingApplications}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Icon name="clock" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              المقبولة
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {acceptedApplications}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Icon name="check" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              المرفوضة
            </p>

            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {rejectedApplications}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <Icon name="x" />
          </div>
        </div>
      </div>
    </section>

    {/* Applications */}
    <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex flex-col gap-2 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">
            سجل طلباتك
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            جميع الطلبات مرتبة من الأحدث إلى الأقدم.
          </p>
        </div>

        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
          {totalApplications} طلب
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="px-6 py-16 text-center sm:px-10">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
            <Icon
              name="applications"
              className="h-9 w-9"
            />
          </div>

          <h3 className="mt-6 text-xl font-extrabold text-slate-900">
            لم تقدم على أي فرصة بعد
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
            ابدأ الآن باستعراض الفرص المتاحة على منصة
            جسر وابحث عن فرصة تناسب مهاراتك وطموحاتك.
          </p>

          <Link
            href="/opportunities"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
          >
            <Icon name="opportunities" />
            استعراض الفرص
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {applications.map((app) => {
            const status = getStatus(
              app.status
            );

            return (
              <article
                key={app.id}
                className="p-5 transition hover:bg-slate-50 sm:p-6 lg:p-7"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-start gap-3">
                          <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                            <Icon name="briefcase" />
                          </div>

                          <div className="min-w-0">
                            <h3 className="text-lg font-extrabold leading-7 text-slate-900 sm:text-xl">
                              {app.opportunity?.title ||
                                "فرصة غير متاحة"}
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                              طلب تقديم عبر منصة جسر
                            </p>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border px-3.5 py-1.5 text-xs font-extrabold ${status.className}`}
                      >
                        <Icon
                          name={status.icon}
                          className="h-4 w-4"
                        />
                        {status.label}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {app.opportunity?.city && (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                          <Icon
                            name="location"
                            className="h-4 w-4"
                          />
                          {app.opportunity.city}
                        </span>
                      )}

                      {app.opportunity
                        ?.opportunity_type && (
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                          <Icon
                            name="briefcase"
                            className="h-4 w-4"
                          />
                          {
                            app.opportunity
                              .opportunity_type
                          }
                        </span>
                      )}

                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
                        <Icon
                          name="calendar"
                          className="h-4 w-4"
                        />
                        {formatDate(
                          app.created_at
                        )}
                      </span>
                    </div>

                    <div
                      className={`mt-4 rounded-xl border p-3 text-xs font-semibold ${status.className}`}
                    >
                      {status.description}
                    </div>
                  </div>

                  <div className="shrink-0 lg:mr-4">
                    <Link
                      href={`/opportunities/${app.opportunity_id}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-extrabold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 lg:w-auto"
                    >
                      عرض تفاصيل الفرصة
                      <Icon name="arrow" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>

    {/* Navigation cards */}
    <section className="mt-6 grid gap-4 md:grid-cols-2">
      <Link
        href="/dashboard/graduate"
        className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-200"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon name="dashboard" />
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">
              لوحة الخريج
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              العودة إلى الصفحة الرئيسية للوحة التحكم
            </p>
          </div>
        </div>

        <Icon
          name="arrow"
          className="h-5 w-5 text-slate-400 transition group-hover:text-blue-700"
        />
      </Link>

      <Link
        href="/opportunities"
        className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-blue-50 hover:ring-blue-200"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <Icon name="opportunities" />
          </div>

          <div>
            <h3 className="font-extrabold text-slate-900">
              استعراض الفرص
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              اكتشف فرص العمل والتدريب والتطوع
            </p>
          </div>
        </div>

        <Icon
          name="arrow"
          className="h-5 w-5 text-slate-400 transition group-hover:text-blue-700"
        />
      </Link>
    </section>
  </div>
</main>

);
}
