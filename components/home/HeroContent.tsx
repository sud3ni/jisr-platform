import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="space-y-8">

      <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
        منصة سودانية غير ربحية
      </span>

      <div className="space-y-4">

        <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
          نجسر الفجوة بين
          <br />
          <span className="text-blue-700">
            التعليم وسوق العمل
          </span>
        </h1>

        <p className="max-w-xl text-lg leading-9 text-slate-600">
          منصة سودانية غير ربحية تربط الخريجين بالمؤسسات،
          وتوفر فرص التدريب والعمل والتطوع والتعاون
          في مكان واحد.
        </p>

      </div>

      <div className="flex flex-wrap gap-4">

        <Link
          href="/opportunities"
          className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
        >
          استعرض الفرص
        </Link>

        <Link
          href="/register"
          className="rounded-xl border-2 border-green-600 px-8 py-4 font-semibold text-green-700 transition hover:bg-green-50"
        >
          إنشاء حساب
        </Link>

      </div>

      <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-600">

        <span>✔ فرص موثقة</span>

        <span>✔ مجانية للخريجين</span>

        <span>✔ تقديم سريع وآمن</span>

      </div>

    </div>
  );
}
