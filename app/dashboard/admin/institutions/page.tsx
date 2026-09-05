"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-client";

type Institution = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  type: string | null;
  status: string | null;
  is_verified: boolean | null;
  created_at: string | null;
};

function Icon({
  type,
}: {
  type:
    | "dashboard"
    | "institution"
    | "users"
    | "opportunities"
    | "search"
    | "filter"
    | "check"
    | "clock"
    | "close"
    | "eye"
    | "edit"
    | "arrow"
    | "refresh";
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
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
          rx="1"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
          rx="1"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
          rx="1"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
          rx="1"
        />
      </svg>
    );
  }

  if (type === "institution") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 21h18" />
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
        <path d="M8 11h1M12 11h1M16 11h1" />
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
        <circle
          cx="9"
          cy="8"
          r="4"
        />
        <path d="M2.5 21c.8-4 3-6 6.5-6s5.7 2 6.5 6" />
        <path d="M16 4.5a4 4 0 0 1 0 7.5" />
        <path d="M17 15c2.8.5 4.2 2.3 4.5 5" />
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
        <path d="M4 6.5h16v13H4z" />
        <path d="M8 6.5V4h8v2.5" />
        <path d="M8 11h8M8 15h5" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle
          cx="11"
          cy="11"
          r="7"
        />
        <path d="m20 20-4-4" />
      </svg>
    );
  }

  if (type === "filter") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M4 6h16" />
        <path d="M7 12h10" />
        <path d="M10 18h4" />
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
        <circle
          cx="12"
          cy="12"
          r="9"
        />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (type === "close") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    );
  }

  if (type === "eye") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle
          cx="12"
          cy="12"
          r="2.5"
        />
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
        <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
        <path d="m14 7 3 3" />
      </svg>
    );
  }

  if (type === "refresh") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M20 11a8 8 0 0 0-14-5L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 14 5l2-2" />
        <path d="M20 20v-4h-4" />
      </svg>
    );
  }

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

function getStatus(status: string | null) {
  switch (status) {
    case "approved":
    case "active":
      return {
        label: "نشطة",
        className:
          "bg-green-50 text-green-700",
        icon: "check" as const,
      };

    case "pending":
      return {
        label: "قيد المراجعة",
        className:
          "bg-amber-50 text-amber-700",
        icon: "clock" as const,
      };

    case "rejected":
    case "suspended":
      return {
        label: "موقوفة",
        className:
          "bg-red-50 text-red-700",
        icon: "close" as const,
      };

    default:
      return {
        label: status || "غير محددة",
        className:
          "bg-slate-100 text-slate-600",
        icon: "clock" as const,
      };
  }
}

export default function AdminInstitutionsPage() {
  const [institutions, setInstitutions] =
    useState<Institution[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadInstitutions();
  }, []);

  async function loadInstitutions() {
    setLoading(true);
    setError("");

    try {
      const {
        data,
        error: institutionsError,
      } = await supabase
        .from("institutions")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (institutionsError) {
        console.error(
          "Institutions error:",
          institutionsError
        );

        setError(
          "تعذر تحميل بيانات المؤسسات."
        );

        setInstitutions([]);
        return;
      }

      setInstitutions(
        (data || []) as Institution[]
      );
    } catch (err) {
      console.error(err);

      setError(
        "حدث خطأ أثناء تحميل المؤسسات."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredInstitutions =
    useMemo(() => {
      return institutions.filter(
        (institution) => {
          const normalizedSearch =
            search.trim().toLowerCase();

          const matchesSearch =
            !normalizedSearch ||
            institution.name
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            institution.email
              ?.toLowerCase()
              .includes(
                normalizedSearch
              ) ||
            institution.city
              ?.toLowerCase()
              .includes(
                normalizedSearch
              );

          const matchesStatus =
            statusFilter === "all" ||
            institution.status ===
              statusFilter;

          const matchesType =
            typeFilter === "all" ||
            institution.type ===
              typeFilter;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesType
          );
        }
      );
    }, [
      institutions,
      search,
      statusFilter,
      typeFilter,
    ]);

  const total =
    institutions.length;

  const pending =
    institutions.filter(
      (institution) =>
        institution.status ===
        "pending"
    ).length;

  const active =
    institutions.filter(
      (institution) =>
        institution.status ===
          "approved" ||
        institution.status ===
          "active"
    ).length;

  const suspended =
    institutions.filter(
      (institution) =>
        institution.status ===
          "suspended" ||
        institution.status ===
          "rejected"
    ).length;

  const types = Array.from(
    new Set(
      institutions
        .map(
          (institution) =>
            institution.type
        )
        .filter(Boolean)
    )
  );

  function formatDate(
    date: string | null
  ) {
    if (!date) return "—";

    return new Date(
      date
    ).toLocaleDateString(
      "ar-SD"
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

          {/* Brand */}
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
                لوحة المدير
              </p>
            </div>
          </Link>

          {/* Header actions */}
          <div className="flex items-center gap-2">

            <Link
              href="/dashboard/admin"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:flex"
            >
              <Icon type="dashboard" />
              لوحة التحكم
            </Link>

            <button
              type="button"
              onClick={loadInstitutions}
              className="rounded-xl border border-slate-200 p-3 text-slate-600 transition hover:bg-slate-50 hover:text-blue-700"
              title="تحديث"
            >
              <Icon type="refresh" />
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Heading */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <p className="text-sm font-bold text-blue-700">
                إدارة المنصة
              </p>

              <h2 className="mt-1 text-3xl font-extrabold text-slate-900">
                إدارة المؤسسات
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
                إدارة المؤسسات المسجلة في منصة جسر،
                ومراجعة حالتها وتوثيقها ومتابعة بياناتها.
              </p>
            </div>

            <Link
              href="/dashboard/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 font-bold text-white shadow-md transition hover:bg-blue-800"
            >
              <Icon type="dashboard" />
              لوحة المدير
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  إجمالي المؤسسات
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {total}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Icon type="institution" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  قيد المراجعة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {pending}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Icon type="clock" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  المؤسسات النشطة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {active}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <Icon type="check" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  الموقوفة / المرفوضة
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {suspended}
                </p>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <Icon type="close" />
              </div>
            </div>
          </div>

        </section>

        {/* Search / Filters */}
        <section className="mb-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* Search */}
            <div className="relative flex-1">

              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Icon type="search" />
              </div>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="ابحث باسم المؤسسة أو البريد أو المدينة..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">

              <div className="text-slate-400">
                <Icon type="filter" />
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                <option value="all">
                  كل الحالات
                </option>

                <option value="pending">
                  قيد المراجعة
                </option>

                <option value="approved">
                  نشطة
                </option>

                <option value="active">
                  نشطة
                </option>

                <option value="suspended">
                  موقوفة
                </option>

                <option value="rejected">
                  مرفوضة
                </option>
              </select>
            </div>

            {/* Type */}
            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(
                  event.target.value
                )
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="all">
                كل أنواع المؤسسات
              </option>

              {types.map((type) => (
                <option
                  key={type}
                  value={type || ""}
                >
                  {type}
                </option>
              ))}
            </select>

          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">

            <p>
              عرض{" "}
              <span className="font-bold text-slate-800">
                {filteredInstitutions.length}
              </span>{" "}
              مؤسسة من أصل{" "}
              <span className="font-bold text-slate-800">
                {institutions.length}
              </span>
            </p>

            {(search ||
              statusFilter !== "all" ||
              typeFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
                className="font-bold text-blue-700 hover:underline"
              >
                مسح الفلاتر
              </button>
            )}

          </div>
        </section>

        {/* Error */}
        {error && (
          <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">
            <div className="flex items-center gap-3">
              <Icon type="close" />

              <div>
                <p className="font-bold">
                  تعذر تحميل المؤسسات
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadInstitutions}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
            >
              إعادة المحاولة
            </button>
          </section>
        )}

        {/* Table */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

          <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center">

            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                المؤسسات المسجلة
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                راجع بيانات المؤسسات وحالتها داخل المنصة.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-2 text-sm font-bold text-slate-600">
              {filteredInstitutions.length} نتيجة
            </div>

          </div>

          {loading ? (
            <div className="p-12 text-center">

              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

              <p className="mt-4 font-semibold text-slate-600">
                جاري تحميل المؤسسات...
              </p>

            </div>
          ) : filteredInstitutions.length === 0 ? (
            <div className="p-12 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Icon type="institution" />
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-800">
                لا توجد مؤسسات
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                لا توجد نتائج مطابقة للبحث أو الفلاتر الحالية.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="min-w-[900px] w-full text-right">

                <thead className="border-b border-slate-100 bg-slate-50">
                  <tr>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      المؤسسة
                    </th>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      النوع
                    </th>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      المدينة
                    </th>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      تاريخ التسجيل
                    </th>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      التوثيق
                    </th>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      الحالة
                    </th>

                    <th className="px-6 py-4 text-xs font-extrabold text-slate-500">
                      الإجراءات
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredInstitutions.map(
                    (institution) => {
                      const status =
                        getStatus(
                          institution.status
                        );

                      return (
                        <tr
                          key={institution.id}
                          className="transition hover:bg-slate-50"
                        >

                          {/* Institution */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <Icon type="institution" />
                              </div>

                              <div className="min-w-0">

                                <p className="max-w-56 truncate font-extrabold text-slate-900">
                                  {institution.name ||
                                    "مؤسسة بدون اسم"}
                                </p>

                                <p className="mt-1 max-w-56 truncate text-xs text-slate-500">
                                  {institution.email ||
                                    "لا يوجد بريد إلكتروني"}
                                </p>

                              </div>

                            </div>

                          </td>

                          {/* Type */}
                          <td className="px-6 py-5">

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              {institution.type ||
                                "غير محدد"}
                            </span>

                          </td>

                          {/* City */}
                          <td className="px-6 py-5 text-sm text-slate-600">
                            {institution.city ||
                              "غير محددة"}
                          </td>

                          {/* Date */}
                          <td className="px-6 py-5 text-sm text-slate-500">
                            {formatDate(
                              institution.created_at
                            )}
                          </td>

                          {/* Verification */}
                          <td className="px-6 py-5">

                            {institution.is_verified ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">
                                <Icon type="check" />
                                موثقة
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                                <Icon type="clock" />
                                غير موثقة
                              </span>
                            )}

                          </td>

                          {/* Status */}
                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${status.className}`}
                            >
                              <Icon
                                type={status.icon}
                              />
                              {status.label}
                            </span>

                          </td>

                          {/* Actions */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2">

                              <Link
                                href={`/dashboard/admin/institutions/${institution.id}`}
                                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                                title="عرض المؤسسة"
                              >
                                <Icon type="eye" />
                              </Link>

                              <Link
                                href={`/dashboard/admin/institutions/${institution.id}/edit`}
                                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                                title="تعديل المؤسسة"
                              >
                                <Icon type="edit" />
                              </Link>

                            </div>

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

        {/* Bottom navigation */}
        <section className="mt-6 grid gap-4 sm:grid-cols-3">

          <Link
            href="/dashboard/admin"
            className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Icon type="dashboard" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  لوحة المدير
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  العودة للرئيسية
                </p>
              </div>

            </div>

            <Icon type="arrow" />
          </Link>

          <Link
            href="/dashboard/admin/opportunities"
            className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-indigo-50"
          >
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                <Icon type="opportunities" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  إدارة الفرص
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  مراجعة فرص المؤسسات
                </p>
              </div>

            </div>

            <Icon type="arrow" />
          </Link>

          <Link
            href="/dashboard/admin/users"
            className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:bg-green-50"
          >
            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <Icon type="users" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  إدارة المستخدمين
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  متابعة حسابات المنصة
                </p>
              </div>

            </div>

            <Icon type="arrow" />
          </Link>

        </section>

      </div>
    </main>
  );
}
