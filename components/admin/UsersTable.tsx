"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type User = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
  created_at: string | null;
};

type FilterType =
  | "all"
  | "student"
  | "graduate"
  | "institution"
  | "admin";

export default function UsersTable({
  users,
}: {
  users: User[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState<FilterType>("all");

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    return users.filter((user) => {
      const name =
        user.full_name?.toLowerCase() || "";

      const email =
        user.email?.toLowerCase() || "";

      const matchesSearch =
        !value ||
        name.includes(value) ||
        email.includes(value);

      if (!matchesSearch) {
        return false;
      }

      if (filter === "all") {
        return true;
      }

      return user.role === filter;
    });
  }, [users, search, filter]);

  function getRoleLabel(role: string | null) {
    switch (role) {
      case "admin":
        return "مدير";

      case "institution":
        return "مؤسسة";

      case "graduate":
        return "خريج";

      case "student":
        return "طالب";

      default:
        return role || "غير محدد";
    }
  }

  function getRoleClass(role: string | null) {
    switch (role) {
      case "admin":
        return "bg-purple-50 text-purple-700 ring-purple-200";

      case "institution":
        return "bg-blue-50 text-blue-700 ring-blue-200";

      case "graduate":
        return "bg-green-50 text-green-700 ring-green-200";

      case "student":
        return "bg-amber-50 text-amber-700 ring-amber-200";

      default:
        return "bg-slate-50 text-slate-600 ring-slate-200";
    }
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString(
      "ar-SD",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  }

  function getInitials(
    name: string | null
  ) {
    if (!name) {
      return "؟";
    }

    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 1) {
      return words[0].slice(0, 1);
    }

    return (
      words[0].slice(0, 1) +
      words[words.length - 1].slice(0, 1)
    );
  }

  return (
    <div>

      {/* البحث والفلاتر */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6">

        <div className="grid gap-4 lg:grid-cols-[1fr_260px]">

          {/* البحث */}
          <div className="relative">

            <svg
              className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="ابحث بالاسم أو البريد الإلكتروني..."
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-11 pl-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            />

          </div>

          {/* الفلترة */}
          <div className="relative">

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value as FilterType
                )
              }
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pl-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
            >
              <option value="all">
                جميع المستخدمين
              </option>

              <option value="student">
                الطلاب
              </option>

              <option value="graduate">
                الخريجون
              </option>

              <option value="institution">
                المؤسسات
              </option>

              <option value="admin">
                المديرون
              </option>
            </select>

            <svg
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>

          </div>

        </div>

        {/* عدد النتائج */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <span className="flex h-7 min-w-7 items-center justify-center rounded-lg bg-blue-100 px-2 text-xs font-extrabold text-blue-700">
              {filteredUsers.length}
            </span>

            <span>
              مستخدم من أصل {users.length}
            </span>

          </div>

          {(search ||
            filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:self-auto"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>

              إعادة ضبط الفلاتر
            </button>
          )}

        </div>

      </div>

      {/* جدول سطح المكتب */}
      <div className="hidden overflow-x-auto md:block">

        <table className="min-w-full">

          <thead className="border-b border-slate-200 bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-right text-xs font-extrabold text-slate-500">
                المستخدم
              </th>

              <th className="px-6 py-4 text-right text-xs font-extrabold text-slate-500">
                البريد الإلكتروني
              </th>

              <th className="px-6 py-4 text-right text-xs font-extrabold text-slate-500">
                نوع الحساب
              </th>

              <th className="px-6 py-4 text-right text-xs font-extrabold text-slate-500">
                تاريخ التسجيل
              </th>

              <th className="px-6 py-4 text-center text-xs font-extrabold text-slate-500">
                الإجراء
              </th>

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100">

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="transition hover:bg-blue-50/40"
              >

                {/* المستخدم */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-extrabold text-white shadow-sm">
                      {getInitials(
                        user.full_name
                      )}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate font-extrabold text-slate-900">
                        {user.full_name ||
                          "بدون اسم"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        ID:{" "}
                        {user.id.slice(0, 8)}
                        ...
                      </p>

                    </div>

                  </div>

                </td>

                {/* البريد */}
                <td className="px-6 py-5">

                  <span className="text-sm text-slate-600">
                    {user.email || "-"}
                  </span>

                </td>

                {/* الدور */}
                <td className="px-6 py-5">

                  <span
                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-extrabold ring-1 ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {getRoleLabel(
                      user.role
                    )}
                  </span>

                </td>

                {/* التاريخ */}
                <td className="px-6 py-5">

                  <span className="text-sm text-slate-500">
                    {formatDate(
                      user.created_at
                    )}
                  </span>

                </td>

                {/* الإجراء */}
                <td className="px-6 py-5 text-center">

                  <Link
                    href={`/dashboard/admin/users/${user.id}`}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-extrabold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >

                    <svg
                      className="h-4 w-4"
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

                    عرض التفاصيل

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* بطاقات الهاتف */}
      <div className="space-y-3 p-4 md:hidden">

        {filteredUsers.map((user) => (

          <div
            key={user.id}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >

            <div className="flex items-start gap-3">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-extrabold text-white">
                {getInitials(
                  user.full_name
                )}
              </div>

              <div className="min-w-0 flex-1">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <h3 className="truncate font-extrabold text-slate-900">
                      {user.full_name ||
                        "بدون اسم"}
                    </h3>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {user.email || "-"}
                    </p>

                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold ring-1 ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {getRoleLabel(
                      user.role
                    )}
                  </span>

                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">

                  <span className="text-xs text-slate-400">
                    {formatDate(
                      user.created_at
                    )}
                  </span>

                  <Link
                    href={`/dashboard/admin/users/${user.id}`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-700 px-3 py-2 text-xs font-extrabold text-white transition hover:bg-blue-800"
                  >
                    عرض

                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14" />
                      <path d="m13 6 6 6-6 6" />
                    </svg>

                  </Link>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* لا توجد نتائج */}
      {filteredUsers.length === 0 && (

        <div className="border-t border-slate-100 px-6 py-16 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">

            <svg
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle
                cx="11"
                cy="11"
                r="7"
              />

              <path d="m20 20-4-4" />

              <path d="M8 11h6" />
            </svg>

          </div>

          <h3 className="mt-5 text-lg font-extrabold text-slate-800">
            لا توجد نتائج
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            لم نعثر على مستخدمين يطابقون البحث أو الفلتر المحدد.
          </p>

          {(search ||
            filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="mt-5 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800"
            >
              عرض جميع المستخدمين
            </button>
          )}

        </div>

      )}

    </div>
  );
}
