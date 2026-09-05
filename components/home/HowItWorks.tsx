import {
  UserPlus,
  FileText,
  Search,
  Send,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "أنشئ حسابًا",
    description:
      "أنشئ حسابك كخريج أو كمؤسسة خلال دقائق.",
  },
  {
    icon: FileText,
    title: "أكمل ملفك الشخصي",
    description:
      "أضف بياناتك، مهاراتك، وسيرتك الذاتية.",
  },
  {
    icon: Search,
    title: "ابحث عن الفرص",
    description:
      "استعرض فرص التدريب والعمل والتطوع المناسبة لك.",
  },
  {
    icon: Send,
    title: "قدّم بسهولة",
    description:
      "قدّم إلى الفرص وتابع حالة طلباتك من لوحة التحكم.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-slate-900">
            كيف تعمل جسر؟
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            أربع خطوات بسيطة للانتقال من الدراسة إلى سوق العمل.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="h-8 w-8 text-blue-700" />
                </div>

                <h3 className="text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-600">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}
