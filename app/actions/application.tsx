"use client";

import { useState } from "react";

export default function ApplicationForm() {
  const [cv, setCv] = useState<File | null>(null);

  return (
    <form className="space-y-6">

      <div>
        <label className="mb-2 block font-semibold">
          الاسم الكامل
        </label>

        <input
          type="text"
          name="applicant_name"
          required
          className="w-full rounded-xl border p-4"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          البريد الإلكتروني
        </label>

        <input
          type="email"
          name="applicant_email"
          required
          className="w-full rounded-xl border p-4"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          رقم الهاتف
        </label>

        <input
          type="text"
          name="applicant_phone"
          className="w-full rounded-xl border p-4"
        />
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          السيرة الذاتية (PDF)
        </label>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) =>
            setCv(e.target.files?.[0] ?? null)
          }
          className="w-full rounded-xl border p-4"
        />

        {cv && (
          <p className="mt-2 text-sm text-green-700">
            ✔ {cv.name}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-semibold">
          رسالة التقديم
        </label>

        <textarea
          name="cover_letter"
          rows={6}
          className="w-full rounded-xl border p-4"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-blue-700 px-8 py-4 font-semibold text-white hover:bg-blue-800"
      >
        إرسال الطلب
      </button>

    </form>
  );
}
