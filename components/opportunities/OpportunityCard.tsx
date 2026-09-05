import Link from "next/link";
import { MapPin, CalendarDays, Building2 } from "lucide-react";

type OpportunityCardProps = {
  id: string | number;
  title: string;
  institution: string;
  city: string;
  type: string;
  deadline?: string | null;
};

export default function OpportunityCard({
  id,
  title,
  institution,
  city,
  type,
  deadline,
}: OpportunityCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
        {type}
      </span>

      <h3 className="mt-5 text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <div className="mt-5 space-y-3 text-slate-600">

        <div className="flex items-center gap-2">
          <Building2 size={18} />
          <span>{institution}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={18} />
          <span>{city}</span>
        </div>

        {deadline && (
          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>آخر موعد: {deadline}</span>
          </div>
        )}

      </div>

      <Link
        href={`/opportunities/${id}`}
        className="mt-8 inline-block rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        عرض التفاصيل
      </Link>

    </div>
  );
}
