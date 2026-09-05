"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import DeleteInstitutionButton from "./DeleteInstitutionButton";

type Institution = {
  id: string;
  name: string | null;
  city: string | null;
  state: string | null;
  website: string | null;
  status: string | null;
  verified: boolean | null;
};

type FilterType =
  | "all"
  | "verified"
  | "unverified"
  | "active"
  | "suspended";

export default function InstitutionsTable({
  institutions,
}: {
  institutions: Institution[];
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredInstitutions = useMemo(() => {
    const value = search.trim().toLowerCase();

    return institutions.filter((institution) => {
      const name = institution.name?.toLowerCase() ?? "";
      const city = institution.city?.toLowerCase() ?? "";
      const state = institution.state?.toLowerCase() ?? "";

      const matchesSearch =
        !value ||
        name.includes(value) ||
        city.includes(value) ||
        state.includes(value);

      if (!matchesSearch) {
        return false;
      }

      switch (filter) {
        case "verified":
          return institution.verified === true;

        case "unverified":
          return institution.verified !== true;

        case "active":
          return institution.status !== "suspended";

        case "suspended":
          return institution.status === "suspended";

        default:
          return true;
      }
    });
  }, [institutions, search, filter]);

  return (
    <div>

      {/* البحث والفلاتر */}
      <div className="mb-6 rounded-xl bg-white p-5 shadow">

        <div className="grid gap-4 md:grid-cols-2">

          {/* البحث */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔎 ابحث باسم المؤسسة أو المدينة أو الولاية..."
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />

          {/* الفلتر */}
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as FilterType)
            }
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          >
            <option value="all">
              جميع المؤسسات
            </option>

            <option value="verified">
              ✅ المؤسسات الموثقة
            </option>

            <option value="unverified">
              ❌ المؤسسات غير الموثقة
            </option>

            <option value="active">
              🟢 المؤسسات النشطة
            </option>

            <option value="suspended">
              ⛔ المؤسسات المعلقة
            </option>
          </select>

        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">

          <p className="text-sm text-gray-500">
            تظهر {filteredInstitutions.length} مؤسسة من أصل{" "}
            {institutions.length}
          </p>

          {(search || filter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFilter("all");
              }}
              className="rounded-lg bg-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-300"
            >
              إعادة ضبط
            </button>
          )}

        </div>

      </div>


      {/* جدول المؤسسات */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-200">

            <tr>

              <th className="p-4 text-right">
                اسم المؤسسة
              </th>

              <th className="p-4 text-right">
                المدينة
              </th>

              <th className="p-4 text-right">
                الموقع
              </th>

              <th className="p-4 text-right">
                الحالة
              </th>

              <th className="p-4 text-right">
                التوثيق
              </th>

              <th className="p-4 text-center">
                الإجراءات
              </th>

            </tr>

          </thead>


          <tbody>

            {filteredInstitutions.map((institution) => (

              <tr
                key={institution.id}
                className="border-t hover:bg-slate-50"
              >

                {/* اسم المؤسسة */}
                <td className="p-4 font-semibold">
                  {institution.name || "-"}
                </td>


                {/* المدينة */}
                <td className="p-4">
                  {institution.city || "-"}
                </td>


                {/* الموقع */}
                <td className="p-4">

                  {institution.website ? (

                    <a
                      href={institution.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      زيارة الموقع
                    </a>

                  ) : (
                    "-"
                  )}

                </td>


                {/* الحالة */}
                <td className="p-4">

                  {institution.status === "suspended" ? (

                    <span className="rounded-lg bg-red-100 px-3 py-1 text-red-700">
                      ⛔ معلقة
                    </span>

                  ) : (

                    <span className="rounded-lg bg-green-100 px-3 py-1 text-green-700">
                      🟢 نشطة
                    </span>

                  )}

                </td>


                {/* التوثيق */}
                <td className="p-4">

                  {institution.verified ? (

                    <span className="rounded-lg bg-blue-100 px-3 py-1 text-blue-700">
                      ✅ موثقة
                    </span>

                  ) : (

                    <span className="rounded-lg bg-yellow-100 px-3 py-1 text-yellow-700">
                      ❌ غير موثقة
                    </span>

                  )}

                </td>


                {/* الإجراءات */}
                <td className="p-4">

                  <div className="flex flex-wrap justify-center gap-2">

                    {/* عرض */}
                    <Link
                      href={`/dashboard/admin/institutions/${institution.id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      👁️ عرض
                    </Link>


                    {/* تعديل */}
                    <Link
                      href={`/dashboard/admin/institutions/${institution.id}/edit`}
                      className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                    >
                      ✏️ تعديل
                    </Link>


                    {/* حذف */}
                    <DeleteInstitutionButton
                      id={institution.id}
                      name={institution.name || "هذه المؤسسة"}
                    />

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>


        {/* لا توجد نتائج */}
        {filteredInstitutions.length === 0 && (

          <div className="p-8 text-center text-gray-500">

            لا توجد مؤسسات تطابق البحث أو الفلتر المحدد.

          </div>

        )}

      </div>

    </div>
  );
}
