export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">

      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">

        <h1 className="mb-8 text-4xl font-bold text-blue-700">
          التقديم على الفرصة
        </h1>

        <form className="space-y-6">

          <div>
            <label className="mb-2 block font-medium">
              الاسم الكامل
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="الاسم الكامل"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              className="w-full rounded-lg border p-3"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              رقم الهاتف
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="+249..."
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              رسالة تعريفية
            </label>

            <textarea
              rows={6}
              className="w-full rounded-lg border p-3"
              placeholder="اكتب رسالة قصيرة تعرف فيها بنفسك..."
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              رابط السيرة الذاتية (مؤقتًا)
            </label>

            <input
              className="w-full rounded-lg border p-3"
              placeholder="رابط ملف PDF"
            />
          </div>

          <button
            className="w-full rounded-xl bg-blue-700 py-3 text-white"
          >
            إرسال الطلب
          </button>

        </form>

      </div>

    </main>
  );
}
