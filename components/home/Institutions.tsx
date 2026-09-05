import Link from "next/link";

const institutions = [
  {
    id: 1,
    name: "شركة تقنية السودان",
    field: "تقنية المعلومات",
  },
  {
    id: 2,
    name: "بنك السودان",
    field: "القطاع المصرفي",
  },
  {
    id: 3,
    name: "منظمة شباب السودان",
    field: "العمل التطوعي",
  },
  {
    id: 4,
    name: "جامعة البطانة",
    field: "التعليم العالي",
  },
];

export default function Institutions() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 flex items-center justify-between">

          <div>

            <h2 className="text-4xl font-bold text-slate-900">
              المؤسسات المنضمة
            </h2>

            <p className="mt-3 text-slate-600">
              مؤسسات تثق في منصة جسر للوصول إلى الكفاءات.
            </p>

          </div>

          <Link
            href="/institutions"
            className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            عرض الكل
          </Link>

        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {institutions.map((institution) => (
            <div
              key={institution.id}
              className="rounded-2xl bg-white p-8 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
                {institution.name.charAt(0)}
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {institution.name}
              </h3>

              <p className="mt-3 text-slate-600">
                {institution.field}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}
