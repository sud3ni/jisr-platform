"use client";

import { useState } from "react";
import { deleteOpportunity } from "@/app/dashboard/admin/opportunities/[id]/actions";

export default function DeleteOpportunityButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    try {
      await deleteOpportunity(formData);
    } catch (error) {
      console.error(error);

      alert("حدث خطأ أثناء حذف الفرصة.");

      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
      >
        🗑️ حذف الفرصة
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="mb-4 text-2xl font-bold text-red-600">
              تأكيد حذف الفرصة
            </h2>

            <p className="mb-4 leading-7 text-gray-700">
              هل أنت متأكد من رغبتك في حذف الفرصة التالية؟
            </p>

            <div className="mb-6 rounded-lg bg-slate-100 p-4 text-center font-bold text-slate-800">
              {title}
            </div>

            <div className="rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700">
              ⚠️ سيتم حذف الفرصة من قاعدة البيانات بشكل نهائي.
              <br />
              لا يمكن التراجع عن هذه العملية بعد تنفيذها.
            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirm(false)}
                className="rounded-lg bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loading
                  ? "جاري الحذف..."
                  : "نعم، احذف الفرصة"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
