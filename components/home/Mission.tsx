import { Target, Eye, HeartHandshake } from "lucide-react";

export default function Mission() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            رسالتنا ورؤيتنا
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            نسعى إلى بناء جسر حقيقي بين الخريجين وسوق العمل في السودان.
          </p>

        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          <div className="rounded-2xl bg-slate-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <Target className="h-8 w-8 text-blue-700" />
            </div>

            <h3 className="text-2xl font-bold">
              رسالتنا
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              توفير منصة موثوقة تربط الخريجين بالمؤسسات وتساعدهم في الوصول
              إلى فرص التدريب والعمل والتطوع والتعاون.
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Eye className="h-8 w-8 text-green-700" />
            </div>

            <h3 className="text-2xl font-bold">
              رؤيتنا
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              أن تصبح جسر المنصة الأولى في السودان التي تربط التعليم
              بسوق العمل وتدعم الشباب لبناء مستقبل مهني أفضل.
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg">

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <HeartHandshake className="h-8 w-8 text-amber-600" />
            </div>

            <h3 className="text-2xl font-bold">
              قيمنا
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              الشفافية، العدالة، دعم الكفاءات، وبناء شراكات مستدامة تخدم
              المجتمع وسوق العمل.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}
