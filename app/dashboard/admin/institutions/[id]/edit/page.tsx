import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { updateInstitution } from "../actions";

export default async function EditInstitution({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: institution } = await supabaseServer
    .from("institutions")
    .select("*")
    .eq("id", id)
    .single();

  if (!institution) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 md:p-10">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v4m0 4h.01M10.3 3.8 2.9 18a2 2 0 0 0 1.75 3h14.7a2 2 0 0 0 1.75-3L13.7 3.8a2 2 0 0 0-3.4 0Z"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-800">
            المؤسسة غير موجودة
          </h1>

          <p className="mt-2 text-slate-500">
            تعذر العثور على بيانات المؤسسة المطلوبة.
          </p>

          <Link
            href="/dashboard/admin/institutions"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
          >
            العودة إلى المؤسسات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10"
    >
      <div className="mx-auto max-w-5xl">

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

              <Link
                href="/dashboard/admin/institutions"
                className="transition hover:text-blue-700"
              >
                المؤسسات
              </Link>

              <span>/</span>

              <span className="text-slate-700">
                تعديل
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              تعديل المؤسسة
            </h1>

            <p className="mt-2 text-slate-500">
              قم بتحديث بيانات المؤسسة ثم احفظ التغييرات.
            </p>
          </div>

          <Link
            href={`/dashboard/admin/institutions/${id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
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

            العودة إلى المؤسسة
          </Link>
        </div>


        {/* البطاقة الرئيسية */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

          {/* شريط علوي */}
          <div className="border-b border-slate-200 bg-gradient-to-l from-blue-700 to-blue-600 px-6 py-7 text-white md:px-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <svg
                  className="h-7 w-7"
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

              <div>
                <h2 className="text-xl font-bold">
                  بيانات المؤسسة
                </h2>

                <p className="mt-1 text-sm text-blue-100">
                  تحديث المعلومات الأساسية وبيانات التواصل
                </p>
              </div>

            </div>

          </div>


          {/* النموذج */}
          <form
            action={updateInstitution}
            className="p-6 md:p-8"
          >

            <input
              type="hidden"
              name="id"
              value={institution.id}
            />


            {/* المعلومات الأساسية */}
            <section>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  المعلومات الأساسية
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  المعلومات التعريفية للمؤسسة.
                </p>
              </div>


              <div className="grid gap-6 md:grid-cols-2">

                {/* اسم المؤسسة */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    اسم المؤسسة
                    <span className="mr-1 text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    defaultValue={institution.name ?? ""}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="أدخل اسم المؤسسة"
                  />
                </div>


                {/* الموقع */}
                <div>
                  <label
                    htmlFor="website"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    الموقع الإلكتروني
                  </label>

                  <div className="relative">
                    <input
                      id="website"
                      name="website"
                      type="url"
                      dir="ltr"
                      defaultValue={institution.website ?? ""}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>


                {/* الهاتف */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    رقم الهاتف
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    defaultValue={institution.phone ?? ""}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="+249 ..."
                  />
                </div>

              </div>
            </section>


            {/* الموقع الجغرافي */}
            <section className="mt-10 border-t border-slate-100 pt-8">

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  الموقع الجغرافي
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  المدينة والولاية التي تقع فيها المؤسسة.
                </p>
              </div>


              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    المدينة
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    defaultValue={institution.city ?? ""}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="أدخل المدينة"
                  />
                </div>


                <div>
                  <label
                    htmlFor="state"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    الولاية
                  </label>

                  <input
                    id="state"
                    name="state"
                    type="text"
                    defaultValue={institution.state ?? ""}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                    placeholder="أدخل الولاية"
                  />
                </div>

              </div>
            </section>


            {/* وصف المؤسسة */}
            <section className="mt-10 border-t border-slate-100 pt-8">

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">
                  نبذة عن المؤسسة
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  أضف وصفًا مختصرًا يساعد المستخدمين على التعرف على المؤسسة.
                </p>
              </div>


              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  وصف المؤسسة
                </label>

                <textarea
                  id="description"
                  name="description"
                  defaultValue={institution.description ?? ""}
                  rows={7}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                  placeholder="اكتب نبذة عن المؤسسة، نشاطها، مجال عملها، وأهم المعلومات التي ترغب في عرضها..."
                />
              </div>

            </section>


            {/* معلومات النظام */}
            <section className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
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
                      d="M12 10v6"
                    />
                    <path
                      strokeLinecap="round"
                      d="M12 7h.01"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    تنبيه إداري
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    تعديل بيانات المؤسسة لا يغيّر حالة التوثيق أو حالة الحساب.
                    إذا أردت تغيير حالة المؤسسة، استخدم أدوات الإدارة من صفحة
                    تفاصيل المؤسسة.
                  </p>
                </div>

              </div>

            </section>


            {/* الأزرار */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-7 sm:flex-row sm:justify-start">

              <Link
                href={`/dashboard/admin/institutions/${id}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                إلغاء
              </Link>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
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
                    d="M5 4h11l3 3v13H5V4Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 4v6h8V4M8 20v-6h8v6"
                  />
                </svg>

                حفظ التعديلات
              </button>

            </div>

          </form>

        </div>

      </div>
    </main>
  );
}
