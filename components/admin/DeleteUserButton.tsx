"use client";

import { useState } from "react";
import { deleteUser } from "@/app/dashboard/admin/users/[id]/actions";

export default function DeleteUserButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    try {
      await deleteUser(formData);
    } catch (error) {
      console.error(error);

      alert("حدث خطأ أثناء حذف المستخدم.");

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
        🗑️ حذف الحساب
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="mb-4 text-2xl font-bold text-red-600">
              ⚠️ تأكيد حذف الحساب
            </h2>

            <p className="mb-4 leading-7 text-gray-700">
              هل أنت متأكد من رغبتك في حذف الحساب التالي؟
            </p>

            <p className="mb-6 rounded-lg bg-slate-100 p-4 text-center font-bold">
              {name}
            </p>

            <div className="rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700">
              <p>
                ⚠️ سيتم حذف حساب المستخدم من نظام تسجيل الدخول
                وكذلك سجله من قاعدة البيانات.
              </p>

              <p className="mt-2 font-bold">
                لا يمكن التراجع عن هذه العملية.
              </p>
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
                  : "نعم، احذف الحساب"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
