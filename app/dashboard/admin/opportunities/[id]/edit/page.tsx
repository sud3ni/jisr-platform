import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase-server";
import { updateOpportunity } from "../actions";

function SectionIcon({
  type,
}: {
  type: "info" | "location" | "details" | "requirements" | "status";
}) {
  const common = "h-5 w-5";

  if (type === "info") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8M8 13h6M8 17h4" />
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

  if (type === "details") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 10v6M12 7h.01" />
      </svg>
    );
  }

  if (type === "requirements") {
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
        <path d="M9 13h6M9 17h6" />
      </svg>
    );
  }

  return (
    <svg
      className={common}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function InputLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-2 block text-sm font-bold text-slate-700">
      {children}
      {required && (
        <span className="mr-1 text-red-500">*</span>
      )}
    </label>
  );
}

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: "info" | "location" | "details" | "requirements" | "status";
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-4 border-b border-slate-100 pb-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <SectionIcon type={icon} />
      </div>

      <div>
        <h2 className="text-lg font-extrabold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export default async function EditOpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: opportunity, error } = await supabaseServer
    .from("opportunities")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !opportunity) {
    notFound();
  }

  const isPublished =
    opportunity.status === "published";

  const isSuspended =
    opportunity.status === "suspended";

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

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
                href="/dashboard/admin/opportunities"
                className="transition hover:text-blue-700"
              >
                الفرص
              </Link>

              <span>/</span>

              <span className="text-slate-700">
                تعديل
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              تعديل الفرصة
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              قم بتحديث بيانات الفرصة ومراجعة المعلومات قبل حفظ
              التغييرات.
            </p>
          </div>

          <Link
            href={`/dashboard/admin/opportunities/${id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>

            العودة إلى تفاصيل الفرصة
          </Link>
        </div>

        {/* Current opportunity summary */}
        <div className="mb-6 overflow-hidden rounded-2xl bg-gradient-to-l from-blue-800 via-blue-700 to-indigo-700 p-6 text-white shadow-lg">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <p className="text-sm font-medium text-blue-100">
                الفرصة التي يتم تعديلها
              </p>

              <h2 className="mt-2 truncate text-2xl font-extrabold">
                {opportunity.title || "بدون عنوان"}
              </h2>

              <p className="mt-2 text-sm text-blue-100">
                المؤسسة:{" "}
                <span className="font-bold text-white">
                  {opportunity.institution_name || "غير محددة"}
                </span>
              </p>
            </div>

            <div className="shrink-0">
              {isPublished ? (
                <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/20">
                  منشورة
                </span>
              ) : isSuspended ? (
                <span className="inline-flex items-center rounded-full bg-red-500/20 px-4 py-2 text-sm font-bold text-white ring-1 ring-red-200/20">
                  موقوفة
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-amber-400/20 px-4 py-2 text-sm font-bold text-white ring-1 ring-amber-200/20">
                  قيد المراجعة
                </span>
              )}
            </div>

          </div>
        </div>

        {/* Form */}
        <form
          action={updateOpportunity}
          className="space-y-6"
        >
          <input
            type="hidden"
            name="id"
            value={opportunity.id}
          />

          {/* Basic information */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

            <SectionHeader
              icon="info"
              title="المعلومات الأساسية"
              description="البيانات الرئيسية التي تظهر للمستخدمين عند استعراض الفرصة."
            />

            <div className="space-y-6">

              {/* Title */}
              <div>
                <InputLabel required>
                  عنوان الفرصة
                </InputLabel>

                <input
                  type="text"
                  name="title"
                  defaultValue={opportunity.title ?? ""}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="مثال: مطور برمجيات مبتدئ"
                />
              </div>

              {/* Type */}
              <div>
                <InputLabel>
                  نوع الفرصة
                </InputLabel>

                <select
                  name="opportunity_type"
                  defaultValue={
                    opportunity.opportunity_type ?? ""
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">
                    اختر نوع الفرصة
                  </option>

                  <option value="training">
                    تدريب
                  </option>

                  <option value="job">
                    وظيفة
                  </option>

                  <option value="volunteer">
                    تطوع
                  </option>

                  <option value="cooperation">
                    تعاون
                  </option>
                </select>
              </div>

              {/* Description */}
              <div>
                <InputLabel>
                  وصف الفرصة
                </InputLabel>

                <textarea
                  name="description"
                  defaultValue={
                    opportunity.description ?? ""
                  }
                  rows={7}
                  className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="اكتب وصفًا واضحًا ومختصرًا للفرصة..."
                />
              </div>

            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

            <SectionHeader
              icon="location"
              title="الموقع"
              description="حدد المدينة والولاية التي تتوفر فيها الفرصة."
            />

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <InputLabel>
                  المدينة
                </InputLabel>

                <input
                  type="text"
                  name="city"
                  defaultValue={opportunity.city ?? ""}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="مثال: الخرطوم"
                />
              </div>

              <div>
                <InputLabel>
                  الولاية
                </InputLabel>

                <input
                  type="text"
                  name="state"
                  defaultValue={opportunity.state ?? ""}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="مثال: ولاية الخرطوم"
                />
              </div>

            </div>
          </section>

          {/* Opportunity details */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

            <SectionHeader
              icon="details"
              title="تفاصيل الفرصة"
              description="معلومات إضافية تساعد الخريج على فهم طبيعة الفرصة."
            />

            <div className="grid gap-6 md:grid-cols-2">

              <div>
                <InputLabel>
                  مدة الفرصة
                </InputLabel>

                <input
                  type="text"
                  name="duration"
                  defaultValue={opportunity.duration ?? ""}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="مثال: 3 أشهر"
                />
              </div>

              <div>
                <InputLabel>
                  الراتب / المقابل
                </InputLabel>

                <input
                  type="text"
                  name="salary"
                  defaultValue={opportunity.salary ?? ""}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  placeholder="مثال: 50000 جنيه سوداني"
                />
              </div>

              <div className="md:col-span-2">
                <InputLabel>
                  الموعد النهائي للتقديم
                </InputLabel>

                <input
                  type="date"
                  name="deadline"
                  defaultValue={
                    opportunity.deadline
                      ? String(opportunity.deadline).slice(
                          0,
                          10
                        )
                      : ""
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />

                <p className="mt-2 text-xs text-slate-500">
                  تاريخ آخر يوم يمكن للخريجين فيه التقديم على الفرصة.
                </p>
              </div>

            </div>
          </section>

          {/* Requirements */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

            <SectionHeader
              icon="requirements"
              title="متطلبات التقديم"
              description="اكتب المؤهلات والمهارات والشروط المطلوبة من المتقدمين."
            />

            <textarea
              name="requirements"
              defaultValue={
                opportunity.requirements ?? ""
              }
              rows={9}
              className="w-full resize-y rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              placeholder={`مثال:
- درجة جامعية في تخصص مناسب
- معرفة جيدة بالحاسب الآلي
- مهارات التواصل والعمل الجماعي`}
            />
          </section>

          {/* Status */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

            <SectionHeader
              icon="status"
              title="حالة الفرصة"
              description="معلومات عن حالة النشر الحالية للفرصة."
            />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="text-sm font-bold text-slate-800">
                  الحالة الحالية
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  تعديل البيانات أدناه لا يغير حالة النشر.
                </p>
              </div>

              {isPublished ? (
                <span className="inline-flex w-fit items-center rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700 ring-1 ring-green-200">
                  منشورة
                </span>
              ) : isSuspended ? (
                <span className="inline-flex w-fit items-center rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-700 ring-1 ring-red-200">
                  موقوفة
                </span>
              ) : (
                <span className="inline-flex w-fit items-center rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700 ring-1 ring-amber-200">
                  قيد المراجعة
                </span>
              )}

            </div>
          </section>

          {/* Actions */}
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <Link
                href={`/dashboard/admin/opportunities/${id}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                إلغاء
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M5 4h11l3 3v13H5z" />
                  <path d="M8 4v6h8V4" />
                  <path d="M8 17h8" />
                </svg>

                حفظ التعديلات
              </button>

            </div>
          </section>

          {/* Notice */}
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm leading-7 text-blue-800">
            <p className="font-extrabold">
              ملاحظة إدارية
            </p>

            <p className="mt-1">
              يمكنك تعديل بيانات الفرصة في أي وقت. حالة النشر
              تُدار بشكل منفصل من صفحة تفاصيل الفرصة، لذلك لن
              يؤدي حفظ هذه التعديلات إلى نشر الفرصة أو إيقافها.
            </p>
          </div>

        </form>
      </div>
    </main>
  );
}
