import {
  ShieldCheck,
  GraduationCap,
  BriefcaseBusiness,
  Handshake,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "ربط الخريجين بالمؤسسات",
    description:
      "نساعد الخريجين على الوصول إلى المؤسسات التي تبحث عن الكفاءات.",
  },
  {
    icon: ShieldCheck,
    title: "فرص موثقة",
    description:
      "جميع الفرص المنشورة تمر بمراجعة لضمان الموثوقية والجودة.",
  },
  {
    icon: BriefcaseBusiness,
    title: "تقديم سريع",
    description:
      "قدّم إلى فرص التدريب والعمل والتطوع بسهولة من خلال حساب واحد.",
  },
  {
    icon: Handshake,
    title: "مجانية وغير ربحية",
    description:
      "جسر منصة مجانية تهدف إلى خدمة الخريجين والمؤسسات دون أهداف ربحية.",
  },
];

export default function WhyJisr() {
  return (
    <section className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            لماذا جسر؟
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            منصة مصممة لتسهيل الانتقال من التعليم إلى سوق العمل.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-7 w-7 text-blue-700" />
                </div>

                <h3 className="text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 leading-8 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
