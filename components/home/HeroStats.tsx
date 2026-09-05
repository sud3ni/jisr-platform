export default function HeroStats() {
  const stats = [
    {
      value: "1200+",
      title: "خريج مسجل",
      desc: "ينضمون إلى المنصة",
    },
    {
      value: "180+",
      title: "مؤسسة",
      desc: "من مختلف القطاعات",
    },
    {
      value: "350+",
      title: "فرصة",
      desc: "تدريب • عمل • تطوع",
    },
    {
      value: "95+",
      title: "شراكة",
      desc: "مع مؤسسات ومبادرات",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
        >
          <h2 className="text-4xl font-extrabold text-blue-700">
            {item.value}
          </h2>

          <h3 className="mt-3 text-xl font-bold text-slate-900">
            {item.title}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {item.desc}
          </p>
        </div>
      ))}

    </section>
  );
}
