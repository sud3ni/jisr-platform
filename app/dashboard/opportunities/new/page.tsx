export default function NewOpportunityPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold text-blue-700">
          نشر فرصة جديدة
        </h1>

        <form className="space-y-5">

          <div>
            <label className="mb-2 block font-medium">
              عنوان الفرصة
            </label>
            <input
              className="w-full rounded-lg border p-3"
              placeholder="مثال: متدرب تطوير ويب"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              الوصف
            </label>
            <textarea
              rows={5}
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              نوع الفرصة
            </label>

            <select className="w-full rounded-lg border p-3">
              <option>تدريب</option>
              <option>تطوع</option>
              <option>تعاون</option>
            </select>

          </div>

          <div>
            <label className="mb-2 block font-medium">
              المقابل المالي
            </label>

            <select className="w-full rounded-lg border p-3">
              <option>مدفوعة</option>
              <option>غير مدفوعة</option>
            </select>

          </div>

          <div>
            <label className="mb-2 block font-medium">
              المدينة
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="الخرطوم"
            />

          </div>

          <div>
            <label className="mb-2 block font-medium">
              مدة التدريب
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="3 أشهر"
            />

          </div>

          <div>
            <label className="mb-2 block font-medium">
              آخر موعد للتقديم
            </label>

            <input
              type="date"
              className="w-full rounded-lg border p-3"
            />

          </div>

          <button
            className="w-full rounded-xl bg-blue-700 py-3 text-white"
          >
            نشر الفرصة
          </button>

        </form>

      </div>
    </main>
  );
}
