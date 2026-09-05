import Link from "next/link";

export default function AdminSettingsPage() {
  return (
    <main>
      {/* رأس الصفحة */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-blue-700">
            الإعدادات
          </h1>

          <p className="mt-2 text-slate-600">
            إعدادات وإدارة منصة جسر.
          </p>
        </div>

        <Link
          href="/dashboard/admin"
          className="rounded-lg bg-slate-700 px-5 py-3 text-white hover:bg-slate-800"
        >
          ← العودة
        </Link>
      </div>

      {/* إعدادات الحساب */}
      <section className="mb-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-slate-800">
          👤 حساب المدير
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          إعدادات حساب مدير المنصة.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              البريد الإلكتروني
            </p>

            <p className="mt-2 font-semibold text-slate-800">
              سيتم ربطه بالحساب الحالي
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <p className="text-sm text-slate-500">
              نوع الحساب
            </p>

            <p className="mt-2 font-semibold text-blue-700">
              مدير النظام
            </p>
          </div>
        </div>
      </section>

      {/* إعدادات الإشعارات */}
      <section className="mb-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-slate-800">
          🔔 الإشعارات
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          التحكم في إشعارات إدارة المنصة.
        </p>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                إشعارات الفرص الجديدة
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                استلام إشعار عند إنشاء فرصة جديدة.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              مفعّل
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-4">
            <div>
              <h3 className="font-semibold text-slate-800">
                إشعارات طلبات التقديم
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                استلام إشعارات مرتبطة بطلبات التقديم.
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              مفعّل
            </span>
          </div>
        </div>
      </section>

      {/* إعدادات المنصة */}
      <section className="mb-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-slate-800">
          ⚙️ إعدادات المنصة
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          إعدادات عامة لمنصة جسر.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              اسم المنصة
            </p>

            <p className="mt-2 text-lg font-bold text-slate-800">
              جسر
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-slate-500">
              حالة المنصة
            </p>

            <p className="mt-2">
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                تعمل
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* معلومات النظام */}
      <section className="rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-slate-800">
          ℹ️ معلومات النظام
        </h2>

        <div className="mt-5 space-y-3 text-sm text-slate-600">
          <p>
            <strong>المنصة:</strong> جسر
          </p>

          <p>
            <strong>الإصدار:</strong> الإصدار الأول
          </p>

          <p>
            <strong>نوع المنصة:</strong> منصة غير ربحية
          </p>
        </div>
      </section>
    </main>
  );
}
