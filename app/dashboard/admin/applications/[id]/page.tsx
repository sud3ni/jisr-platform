import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import ApplicationStatusActions from "@/components/admin/ApplicationStatusActions";

export default async function ApplicationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: application, error } = await supabaseServer
    .from("applications")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !application) {
    return (
      <main className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <span className="h-3 w-3 rounded-full bg-red-500" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            طلب التقديم غير موجود
          </h1>

          <p className="mt-2 text-slate-500">
            لم نتمكن من العثور على طلب التقديم المطلوب.
          </p>

          <Link
            href="/dashboard/admin/applications"
            className="mt-6 inline-flex rounded-xl bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-900"
          >
            العودة إلى الطلبات
          </Link>
        </div>
      </main>
    );
  }

  const { data: user } = await supabaseServer
    .from("users")
    .select("id, full_name, email")
    .eq("id", application.graduate_id)
    .single();

  const { data: opportunity } = await supabaseServer
    .from("opportunities")
    .select("*")
    .eq("id", application.opportunity_id)
    .single();

  function getStatus(status: string) {
    switch (status) {
      case "accepted":
        return {
          text: "مقبول",
          description: "تم قبول طلب التقديم",
          className: "bg-green-50 text-green-700 border-green-200",
          dot: "bg-green-500",
        };

      case "rejected":
        return {
          text: "مرفوض",
          description: "تم رفض طلب التقديم",
          className: "bg-red-50 text-red-700 border-red-200",
          dot: "bg-red-500",
        };

      default:
        return {
          text: "قيد المراجعة",
          description: "الطلب بانتظار اتخاذ القرار",
          className: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
        };
    }
  }

  function getOpportunityType(type: string | null) {
    switch (type) {
      case "training":
        return {
          text: "تدريب",
          className: "bg-blue-50 text-blue-700 border-blue-100",
        };

      case "job":
        return {
          text: "وظيفة",
          className: "bg-emerald-50 text-emerald-700 border-emerald-100",
        };

      case "volunteer":
        return {
          text: "تطوع",
          className: "bg-amber-50 text-amber-700 border-amber-100",
        };

      case "cooperation":
        return {
          text: "تعاون",
          className: "bg-purple-50 text-purple-700 border-purple-100",
        };

      default:
        return {
          text: type || "غير محدد",
          className: "bg-slate-50 text-slate-600 border-slate-200",
        };
    }
  }

  function formatDate(date: string | null) {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const status = getStatus(application.status);

  const opportunityType = getOpportunityType(
    opportunity?.opportunity_type ?? null
  );

  const createdAt = formatDate(application.created_at);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">

      {/* =========================
          رأس الصفحة
      ========================= */}
      <div className="mx-auto mb-8 max-w-7xl">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
              <Link
                href="/dashboard/admin"
                className="transition hover:text-blue-700"
              >
                لوحة الإدارة
              </Link>

              <span>/</span>

              <Link
                href="/dashboard/admin/applications"
                className="transition hover:text-blue-700"
              >
                طلبات التقديم
              </Link>

              <span>/</span>

              <span className="text-slate-400">
                التفاصيل
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              تفاصيل طلب التقديم
            </h1>

            <p className="mt-2 text-slate-500">
              مراجعة بيانات المتقدم والفرصة وإدارة حالة الطلب.
            </p>
          </div>

          <Link
            href="/dashboard/admin/applications"
            className="inline-flex w-fit items-center rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            العودة إلى الطلبات
          </Link>

        </div>
      </div>


      {/* =========================
          الحالة الرئيسية
      ========================= */}
      <div className="mx-auto mb-6 max-w-7xl">

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">
                <div className="h-3 w-3 rounded-full bg-blue-600" />
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  حالة الطلب الحالية
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-3">

                  <span
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-semibold ${status.className}`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${status.dot}`}
                    />

                    {status.text}
                  </span>

                  <span className="text-sm text-slate-500">
                    {status.description}
                  </span>

                </div>
              </div>

            </div>

            <div className="text-right">

              <p className="text-sm text-slate-400">
                تاريخ التقديم
              </p>

              <p className="mt-1 font-semibold text-slate-700">
                {createdAt}
              </p>

            </div>

          </div>

        </div>
      </div>


      {/* =========================
          البيانات الرئيسية
      ========================= */}
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">

        {/* =========================
            المتقدم
        ========================= */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                <div className="h-6 w-6 rounded-full border-2 border-blue-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  بيانات المتقدم
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  معلومات صاحب الطلب
                </p>
              </div>

            </div>

          </div>

          <div className="space-y-5 p-6">

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                الاسم الكامل
              </p>

              <p className="mt-2 text-lg font-bold text-slate-800">
                {user?.full_name || "غير معروف"}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                البريد الإلكتروني
              </p>

              <p className="mt-2 break-all text-base font-semibold text-slate-700">
                {user?.email || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-slate-400">
                معرف المتقدم
              </p>

              <p className="break-all rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-500">
                {application.graduate_id}
              </p>
            </div>

          </div>

        </section>


        {/* =========================
            الفرصة
        ========================= */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 p-6">

            <div className="flex items-center gap-4">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
                <div className="h-5 w-5 rounded-md border-2 border-emerald-600" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  بيانات الفرصة
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  الفرصة التي تقدم إليها المستخدم
                </p>
              </div>

            </div>

          </div>

          <div className="space-y-5 p-6">

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                اسم الفرصة
              </p>

              <p className="mt-2 text-lg font-bold text-slate-800">
                {opportunity?.title || "فرصة غير معروفة"}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-400">
                  المؤسسة
                </p>

                <p className="mt-2 font-semibold text-slate-700">
                  {opportunity?.institution_name || "-"}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-5">
                <p className="text-sm text-slate-400">
                  نوع الفرصة
                </p>

                <span
                  className={`mt-2 inline-flex rounded-lg border px-3 py-1.5 text-sm font-semibold ${opportunityType.className}`}
                >
                  {opportunityType.text}
                </span>
              </div>

            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-400">
                المدينة
              </p>

              <p className="mt-2 font-semibold text-slate-700">
                {opportunity?.city || "-"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-slate-400">
                معرف الفرصة
              </p>

              <p className="break-all rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-500">
                {application.opportunity_id}
              </p>
            </div>

          </div>

        </section>

      </div>


      {/* =========================
          إدارة حالة الطلب
      ========================= */}
      <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">

          <h2 className="text-xl font-bold text-slate-900">
            إدارة حالة الطلب
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            يمكنك تحديث حالة الطلب بعد مراجعة بيانات المتقدم.
          </p>

        </div>

        <div className="p-6">

          <ApplicationStatusActions
            id={application.id}
            currentStatus={application.status}
          />

        </div>

      </section>


      {/* =========================
          خطاب التقديم
      ========================= */}
      <section className="mx-auto mt-6 max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-100 p-6">

          <div>
            <h2 className="text-xl font-bold text-slate-900">
              خطاب التقديم
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              الرسالة التي أرسلها المتقدم مع طلبه.
            </p>
          </div>

        </div>

        <div className="p-6">

          {application.cover_letter ? (

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <p className="whitespace-pre-wrap leading-8 text-slate-700">
                {application.cover_letter}
              </p>

            </div>

          ) : (

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6">

              <p className="font-semibold text-amber-700">
                لم يقدم المتقدم خطاب تقديم.
              </p>

            </div>

          )}

        </div>

      </section>


      {/* =========================
          معلومات الطلب
      ========================= */}
      <section className="mx-auto mt-6 max-w-7xl rounded-2xl border border-slate-200 bg-slate-100 p-6">

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-400">
              تاريخ إنشاء الطلب
            </p>

            <p className="mt-1 font-semibold text-slate-700">
              {createdAt}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-400">
              معرف طلب التقديم
            </p>

            <p className="mt-1 break-all font-mono text-xs text-slate-500">
              {application.id}
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}
