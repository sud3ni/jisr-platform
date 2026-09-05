interface OpportunityCardProps {
  title: string;
  company: string;
  city: string;
  type: string;
  salary: string;
  duration: string;
}

export default function OpportunityCard({
  title,
  company,
  city,
  type,
  salary,
  duration,
}: OpportunityCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow hover:shadow-lg transition">

      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        {salary}
      </span>

      <h2 className="mt-4 text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-gray-600">
        🏢 {company}
      </p>

      <p className="mt-2">
        📍 {city}
      </p>

      <p>
        📚 {type}
      </p>

      <p>
        ⏳ {duration}
      </p>

      <button className="mt-6 w-full rounded-xl bg-blue-700 py-3 text-white">
        عرض التفاصيل
      </button>

    </div>
  );
}
