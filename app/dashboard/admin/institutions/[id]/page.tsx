import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

import {
  verifyInstitution,
  unverifyInstitution,
  suspendInstitution,
  activateInstitution,
} from "./actions";

export default async function InstitutionDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: institution, error } = await supabaseServer
    .from("institutions")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !institution) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            المؤسسة غير موجودة
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            تعذر العثور على بيانات المؤسسة المطلوبة.
          </p>

          <Link
            href="/dashboard/admin/institutions"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            العودة إلى المؤسسات
          </Link>
        </div>
      </main>
    );
  }

  const isVerified = institution.verified === true;
  const isSuspended = institution.status === "suspended";

  function formatDate(date: string | null) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/dashboard/admin"
                className="transition hover:text-blue-600"
              >
                لوحة المدير
              </Link>

              <span>/</span>

              <Link
                href="/dashboard/admin/institutions"
                className="transition hover:text-blue-600"
              >
                المؤسسات
              </Link>

              <span>/</span>

              <span className="text-slate-400">
                التفاصيل
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              تفاصيل المؤسسة
            </h1>

            <p className="mt-2 text-slate-500">
              مراجعة بيانات المؤسسة وإدارة حالتها داخل منصة جسر.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <Link
              href="/dashboard/admin/institutions"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              المؤسسات
            </Link>

            <Link
              href={`/dashboard/admin/institutions/${institution.id}/edit`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
              </svg>

              تعديل البيانات
            </Link>

          </div>
        </div>


        {/* Institution Hero */}
        <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="h-2 bg-blue-600" />

          <div className="p-6 sm:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">

                  <svg
                    className="h-10 w-10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path d="M3 21h18" />
                    <path d="M5 21V7l7-4 7 4v14" />
                    <path d="M9 21v-6h6v6" />
                    <path d="M8 9h1" />
                    <path d="M12 9h1" />
                    <path d="M16 9h1" />
                  </svg>

                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                      {institution.name || "مؤسسة بدون اسم"}
                    </h2>

                    {isVerified && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white">
                          ✓
                        </span>
                        مؤسسة موثقة
                      </span>
                    )}

                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    حساب مؤسسة على منصة جسر
                  </p>
                </div>

              </div>


              {/* Account Status */}
              <div>
                {isSuspended ? (
                  <span className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    الحساب موقوف
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-bold text-emerald-700">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    الحساب نشط
                  </span>
                )}
              </div>

            </div>

          </div>
        </section>


        {/* Management Cards */}
        <section className="mb-6 grid gap-6 lg:grid-cols-2">

          {/* Verification */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-start justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  توثيق المؤسسة
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  إدارة حالة التحقق من المؤسسة.
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M12 3l7 3v5c0 4.5-3 7.7-7 10-4-2.3-7-5.5-7-10V6l7-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>

              </div>

            </div>


            {isVerified ? (
              <>

                <div className="mb-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white">
                      ✓
                    </div>

                    <div>
                      <p className="font-bold text-blue-800">
                        المؤسسة موثقة
                      </p>

                      <p className="text-sm text-blue-600">
                        يمكن للمؤسسة استخدام خدمات المنصة.
                      </p>
                    </div>

                  </div>

                </div>

                <form action={unverifyInstitution}>
                  <input
                    type="hidden"
                    name="id"
                    value={institution.id}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    إلغاء التوثيق
                  </button>
                </form>

              </>
            ) : (
              <>

                <div className="mb-5 rounded-xl border border-amber-100 bg-amber-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-500 text-white">
                      !
                    </div>

                    <div>
                      <p className="font-bold text-amber-800">
                        المؤسسة غير موثقة
                      </p>

                      <p className="text-sm text-amber-700">
                        لم يتم اعتماد المؤسسة بعد.
                      </p>
                    </div>

                  </div>

                </div>

                <form action={verifyInstitution}>
                  <input
                    type="hidden"
                    name="id"
                    value={institution.id}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    توثيق المؤسسة
                  </button>
                </form>

              </>
            )}

          </div>


          {/* Account */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-start justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  حالة الحساب
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  التحكم في إمكانية استخدام المؤسسة للمنصة.
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                  isSuspended
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                </svg>
              </div>

            </div>


            {isSuspended ? (
              <>

                <div className="mb-5 rounded-xl border border-red-100 bg-red-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-white">
                      !
                    </div>

                    <div>
                      <p className="font-bold text-red-800">
                        المؤسسة موقوفة
                      </p>

                      <p className="text-sm text-red-700">
                        لا يمكن للمؤسسة استخدام الخدمات حاليًا.
                      </p>
                    </div>

                  </div>

                </div>

                <form action={activateInstitution}>
                  <input
                    type="hidden"
                    name="id"
                    value={institution.id}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
                  >
                    إعادة تنشيط المؤسسة
                  </button>
                </form>

              </>
            ) : (
              <>

                <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white">
                      ✓
                    </div>

                    <div>
                      <p className="font-bold text-emerald-800">
                        المؤسسة نشطة
                      </p>

                      <p className="text-sm text-emerald-700">
                        المؤسسة قادرة على استخدام المنصة.
                      </p>
                    </div>

                  </div>

                </div>

                <form action={suspendInstitution}>
                  <input
                    type="hidden"
                    name="id"
                    value={institution.id}
                  />

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                  >
                    تعليق المؤسسة
                  </button>
                </form>

              </>
            )}

          </div>

        </section>


        {/* Institution Information */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6 sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">

                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5" />
                  <path d="M12 8h.01" />
                </svg>

              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  معلومات المؤسسة
                </h2>

                <p className="text-sm text-slate-500">
                  البيانات الأساسية المسجلة في منصة جسر.
                </p>
              </div>

            </div>

          </div>


          <div className="p-6 sm:p-8">

            <div className="grid gap-5 md:grid-cols-2">

              {/* Name */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  اسم المؤسسة
                </p>

                <p className="font-bold text-slate-800">
                  {institution.name || "-"}
                </p>
              </div>


              {/* Website */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  الموقع الإلكتروني
                </p>

                {institution.website ? (
                  <a
                    href={institution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {institution.website}
                  </a>
                ) : (
                  <p className="font-semibold text-slate-500">
                    غير متوفر
                  </p>
                )}
              </div>


              {/* Phone */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  رقم الهاتف
                </p>

                <p className="font-semibold text-slate-800">
                  {institution.phone || "غير متوفر"}
                </p>
              </div>


              {/* City */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  المدينة
                </p>

                <p className="font-semibold text-slate-800">
                  {institution.city || "غير محددة"}
                </p>
              </div>


              {/* State */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  الولاية
                </p>

                <p className="font-semibold text-slate-800">
                  {institution.state || "غير محددة"}
                </p>
              </div>


              {/* Created */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                <p className="mb-2 text-xs font-semibold text-slate-400">
                  تاريخ التسجيل
                </p>

                <p className="font-semibold text-slate-800">
                  {formatDate(institution.created_at)}
                </p>
              </div>

            </div>


            {/* Description */}
            <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50 p-5">

              <p className="mb-3 text-xs font-semibold text-slate-400">
                وصف المؤسسة
              </p>

              <p className="whitespace-pre-line leading-8 text-slate-700">
                {institution.description ||
                  "لا يوجد وصف للمؤسسة."}
              </p>

            </div>

          </div>

        </section>


        {/* Admin Note */}
        <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

          <div className="flex gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              i
            </div>

            <div>
              <p className="font-bold text-blue-900">
                ملاحظة إدارية
              </p>

              <p className="mt-1 text-sm leading-7 text-blue-700">
                توثيق المؤسسة يعني اعتماد هويتها داخل المنصة،
                بينما تعليق الحساب يمنع المؤسسة من استخدام خدمات
                منصة جسر حتى تتم إعادة تنشيطه.
              </p>
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
