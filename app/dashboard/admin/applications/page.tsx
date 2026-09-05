import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";

export default async function ApplicationsPage() {
  const { data: applications, error } = await supabaseServer
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Applications error:", error);
  }

  const applicationList = applications || [];

  const graduateIds = [
    ...new Set(
      applicationList
        .map((item: any) => item.graduate_id)
        .filter(Boolean)
    ),
  ];

  const opportunityIds = [
    ...new Set(
      applicationList
        .map((item: any) => item.opportunity_id)
        .filter(Boolean)
    ),
  ];

  let users: any[] = [];
  let opportunities: any[] = [];

  if (graduateIds.length > 0) {
    const { data } = await supabaseServer
      .from("users")
      .select("id, full_name, email")
      .in("id", graduateIds);

    users = data || [];
  }

  if (opportunityIds.length > 0) {
    const { data } = await supabaseServer
      .from("opportunities")
      .select("id, title, institution_name")
      .in("id", opportunityIds);

    opportunities = data || [];
  }

  const usersMap = new Map(
    users.map((user) => [user.id, user])
  );

  const opportunitiesMap = new Map(
    opportunities.map((opportunity) => [
      opportunity.id,
      opportunity,
    ])
  );

  function statusInfo(status: string) {
    if (status === "accepted") {
      return {
        text: "مقبول",
        className:
          "border-green-200 bg-green-50 text-green-700",
        dotClass: "bg-green-500",
      };
    }

    if (status === "rejected") {
      return {
        text: "مرفوض",
        className:
          "border-red-200 bg-red-50 text-red-700",
        dotClass: "bg-red-500",
      };
    }

    return {
      text: "قيد المراجعة",
      className:
        "border-amber-200 bg-amber-50 text-amber-700",
      dotClass: "bg-amber-500",
    };
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const acceptedCount = applicationList.filter(
    (item: any) => item.status === "accepted"
  ).length;

  const rejectedCount = applicationList.filter(
    (item: any) => item.status === "rejected"
  ).length;

  const pendingCount = applicationList.filter(
    (item: any) => item.status === "pending"
  ).length;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10"
    >
      <div className="mx-auto max-w-7xl">

        {/* رأس الصفحة */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/dashboard/admin"
                className="transition hover:text-blue-700"
              >
                لوحة التحكم
              </Link>

              <span>/</span>

              <span className="text-slate-700">
                طلبات التقديم
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              إدارة طلبات التقديم
            </h1>

            <p className="mt-2 text-slate-500">
              متابعة ومراجعة طلبات المتقدمين لجميع الفرص.
            </p>
          </div>

          <Link
            href="/dashboard/admin"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 12H5m7 7-7-7 7-7"
              />
            </svg>

            العودة
          </Link>
        </div>


        {/* رسالة الخطأ */}
        {error && (
          <div className="mb-7 flex items-start gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  d="M12 8v5"
                />
                <path
                  strokeLinecap="round"
                  d="M12 16h.01"
                />
              </svg>
            </div>

            <div>
              <p className="font-bold">
                تعذر تحميل طلبات التقديم
              </p>

              <p className="mt-1 text-sm">
                حدث خطأ أثناء الاتصال بقاعدة البيانات.
              </p>
            </div>
          </div>
        )}


        {/* الإحصائيات */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {/* الإجمالي */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  إجمالي الطلبات
                </p>

                <p className="mt-3 text-3xl font-bold text-slate-900">
                  {applicationList.length}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 3h9l3 3v15H6V3Z"
                  />
                  <path
                    strokeLinecap="round"
                    d="M9 11h6M9 15h6M9 7h3"
                  />
                </svg>
              </div>

            </div>

            <div className="mt-4 h-1 rounded-full bg-blue-100">
              <div className="h-1 w-full rounded-full bg-blue-600" />
            </div>

          </div>


          {/* قيد المراجعة */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  قيد المراجعة
                </p>

                <p className="mt-3 text-3xl font-bold text-amber-600">
                  {pendingCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    d="M12 7v5l3 2"
                  />
                </svg>
              </div>

            </div>

            <div className="mt-4 h-1 rounded-full bg-amber-100">
              <div className="h-1 w-2/3 rounded-full bg-amber-500" />
            </div>

          </div>


          {/* المقبولة */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  الطلبات المقبولة
                </p>

                <p className="mt-3 text-3xl font-bold text-green-600">
                  {acceptedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8 12 2.5 2.5L16 9"
                  />
                </svg>
              </div>

            </div>

            <div className="mt-4 h-1 rounded-full bg-green-100">
              <div className="h-1 w-2/3 rounded-full bg-green-500" />
            </div>

          </div>


          {/* المرفوضة */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm font-medium text-slate-500">
                  الطلبات المرفوضة
                </p>

                <p className="mt-3 text-3xl font-bold text-red-600">
                  {rejectedCount}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path
                    strokeLinecap="round"
                    d="m9 9 6 6m0-6-6 6"
                  />
                </svg>
              </div>

            </div>

            <div className="mt-4 h-1 rounded-full bg-red-100">
              <div className="h-1 w-1/2 rounded-full bg-red-500" />
            </div>

          </div>

        </div>


        {/* القائمة */}
        {applicationList.length === 0 ? (

          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <svg
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 3h9l3 3v15H6V3Z"
                />
                <path
                  strokeLinecap="round"
                  d="M9 11h6M9 15h4"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              لا توجد طلبات تقديم
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              لم يتم تسجيل أي طلبات تقديم حتى الآن.
            </p>

          </div>

        ) : (

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* عنوان الجدول */}
            <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">

              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  جميع طلبات التقديم
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {applicationList.length} طلب مسجل في المنصة
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600">
                آخر الطلبات أولًا
              </div>

            </div>


            {/* الجدول */}
            <div className="overflow-x-auto">

              <table className="min-w-[1000px] w-full">

                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      المتقدم
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      الفرصة
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      المؤسسة
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      تاريخ التقديم
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      الحالة
                    </th>

                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                      الإجراء
                    </th>

                  </tr>
                </thead>


                <tbody className="divide-y divide-slate-100">

                  {applicationList.map(
                    (application: any) => {

                      const user = usersMap.get(
                        application.graduate_id
                      );

                      const opportunity =
                        opportunitiesMap.get(
                          application.opportunity_id
                        );

                      const status = statusInfo(
                        application.status
                      );

                      return (
                        <tr
                          key={application.id}
                          className="transition hover:bg-slate-50"
                        >

                          {/* المتقدم */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-3">

                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-blue-700">
                                {(user?.full_name ||
                                  "م")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="min-w-0">

                                <div className="truncate font-semibold text-slate-800">
                                  {user?.full_name ||
                                    "متقدم غير معروف"}
                                </div>

                                <div className="mt-1 max-w-[220px] truncate text-sm text-slate-500">
                                  {user?.email || "-"}
                                </div>

                              </div>

                            </div>

                          </td>


                          {/* الفرصة */}
                          <td className="px-6 py-5">

                            <div className="max-w-[230px]">
                              <p className="truncate font-semibold text-slate-800">
                                {opportunity?.title ||
                                  "فرصة غير معروفة"}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                فرصة متاحة عبر جسر
                              </p>
                            </div>

                          </td>


                          {/* المؤسسة */}
                          <td className="px-6 py-5">

                            <div className="flex items-center gap-2 text-slate-700">

                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                <svg
                                  className="h-4 w-4"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.7"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 21h18M5 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M9 7h3M9 11h3M9 15h3M16 9h3v12"
                                  />
                                </svg>
                              </div>

                              <span className="max-w-[190px] truncate">
                                {opportunity?.institution_name ||
                                  "-"}
                              </span>

                            </div>

                          </td>


                          {/* التاريخ */}
                          <td className="px-6 py-5 text-sm text-slate-600">
                            {formatDate(
                              application.created_at
                            )}
                          </td>


                          {/* الحالة */}
                          <td className="px-6 py-5">

                            <span
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold ${status.className}`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${status.dotClass}`}
                              />

                              {status.text}
                            </span>

                          </td>


                          {/* الإجراء */}
                          <td className="px-6 py-5 text-center">

                            <Link
                              href={`/dashboard/admin/applications/${application.id}`}
                              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                            >
                              <svg
                                className="h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
                                />

                                <circle
                                  cx="12"
                                  cy="12"
                                  r="2.5"
                                />
                              </svg>

                              عرض
                            </Link>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>
    </main>
  );
}
