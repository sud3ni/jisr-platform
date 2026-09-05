import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import UsersTable from "@/components/admin/UsersTable";

export default async function UsersPage() {
  const { data: users, error } = await supabaseServer
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  const totalUsers = users?.length || 0;

  const graduates =
    users?.filter((user) => user.role === "graduate").length || 0;

  const institutions =
    users?.filter((user) => user.role === "institution").length || 0;

  const admins =
    users?.filter((user) => user.role === "admin").length || 0;

  return (
    <main dir="rtl" className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <p className="text-sm font-semibold text-blue-700">
                لوحة الإدارة
              </p>

              <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                إدارة المستخدمين
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                إدارة جميع الحسابات المسجلة في منصة جسر ومراجعة بيانات
                المستخدمين وصلاحياتهم.
              </p>
            </div>

            <Link
              href="/dashboard/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800"
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

              العودة إلى لوحة الإدارة
            </Link>

          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  إجمالي المستخدمين
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {totalUsers}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  جميع الحسابات
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
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6" />
                  <path d="M16 11a3 3 0 1 0 0-6" />
                  <path d="M17 14c2.5.5 3.8 2.5 4 6" />
                </svg>
              </div>

            </div>
          </div>

          {/* Graduates */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  الخريجون
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {graduates}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  حسابات الخريجين
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c.8-4.5 3.5-6.5 8-6.5s7.2 2 8 6.5" />
                </svg>
              </div>

            </div>
          </div>

          {/* Institutions */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  المؤسسات
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {institutions}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  حسابات المؤسسات
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
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-5h6v5" />
                  <path d="M8 9h1M12 9h1M16 9h1" />
                </svg>
              </div>

            </div>
          </div>

          {/* Admins */}
          <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  المديرون
                </p>

                <p className="mt-2 text-3xl font-extrabold text-slate-900">
                  {admins}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  حسابات الإدارة
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3 4 7v5c0 5 3.5 8 8 9 4.5-1 8-4 8-9V7l-8-4Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

            </div>
          </div>

        </section>

        {/* Error */}
        {error && (
          <section className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 8v5" />
                  <path d="M12 16h.01" />
                </svg>
              </div>

              <div>
                <h2 className="font-bold text-red-800">
                  تعذر تحميل المستخدمين
                </h2>

                <p className="mt-1 text-sm leading-6 text-red-700">
                  حدث خطأ أثناء الاتصال بقاعدة البيانات.
                </p>

                <p className="mt-2 break-all text-xs text-red-500">
                  {error.message}
                </p>
              </div>

            </div>
          </section>
        )}

        {/* Users table */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">

          <div className="border-b border-slate-100 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  جميع المستخدمين
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  مراجعة وإدارة الحسابات المسجلة في منصة جسر.
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
                {totalUsers} مستخدم
              </div>

            </div>
          </div>

          {!users?.length ? (
            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6" />
                  <path d="M17 11a3 3 0 1 0 0-6" />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-slate-800">
                لا يوجد مستخدمون مسجلون
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                ستظهر حسابات المستخدمين هنا عند تسجيلهم في المنصة.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">
              <UsersTable users={users} />
            </div>
          )}

        </section>

      </div>
    </main>
  );
}
