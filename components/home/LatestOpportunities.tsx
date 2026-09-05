import Link from "next/link";

const opportunities = [
  {
    id: 1,
    title: "متدرب تطوير برمجيات",
    institution: "شركة تقنية السودان",
    location: "الخرطوم",
    type: "تدريب",
  },
  {
    id: 2,
    title: "أخصائي نظم معلومات",
    institution: "بنك السودان",
    location: "الخرطوم",
    type: "وظيفة",
  },
  {
    id: 3,
    title: "متطوع دعم تقني",
    institution: "منظمة شباب السودان",
    location: "ود مدني",
    type: "تطوع",
  },
];

export default function LatestOpportunities() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 flex items-center justify-between">

          <div>
            <h2 className="text-4xl font-bold text-slate-900">
              أحدث الفرص
            </h2>

            <p className="mt-3 text-slate-600">
              آخر الفرص المنشورة على منصة جسر.
            </p>
          </div>

          <Link
            href="/opportunities"
            className="rounded-xl bg-blue-700 px-6 py-3 text-white font-semibold hover:bg-blue-800"
          >
            عرض الكل
          </Link>

        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {opportunities.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                {item.type}
              </span>

              <h3 className="mt-5 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600">
                {item.institution}
              </p>

              <p className="mt-2 text-slate-500">
                {item.location}
              </p>

              <Link
                href={`/opportunities/${item.id}`}
                className="mt-6 inline-block font-semibold text-blue-700 hover:text-blue-900"
              >
                عرض التفاصيل →
              </Link>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
