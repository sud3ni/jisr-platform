"use client";

import { useState } from "react";
import {
  suspendUser,
  activateUser,
} from "@/app/dashboard/admin/users/[id]/actions";

export default function UserStatusActions({
  id,
  name,
  status,
}: {
  id: string;
  name: string;
  status: string | null;
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isSuspended = status === "suspended";

  async function handleAction() {
    setLoading(true);

    const formData = new FormData();
    formData.append("id", id);

    try {
      if (isSuspended) {
        await activateUser(formData);
      } else {
        await suspendUser(formData);
      }
    } catch (error) {
      console.error(error);
      alert(
        isSuspended
          ? "حدث خطأ أثناء إعادة تنشيط الحساب."
          : "حدث خطأ أثناء تعليق الحساب."
      );
      setLoading(false);
    }
  }

  return (
    <>
      {isSuspended ? (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
        >
          🟢 إعادة تنشيط الحساب
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="rounded-lg bg-orange-500 px-5 py-3 text-white hover:bg-orange-600"
        >
          ⛔ تعليق الحساب
        </button>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="mb-4 text-2xl font-bold">
              {isSuspended
                ? "إعادة تنشيط الحساب"
                : "تعليق الحساب"}
            </h2>

            <p className="mb-4 text-gray-700">
              هل أنت متأكد من رغبتك في{" "}
              {isSuspended
                ? "إعادة تنشيط"
                : "تعليق"}{" "}
              حساب:
            </p>

            <p className="mb-6 rounded-lg bg-slate-100 p-3 text-center font-bold">
              {name}
            </p>

            <div
              className={`rounded-lg p-4 text-sm leading-6 ${
                isSuspended
                  ? "bg-green-50 text-green-700"
                  : "bg-orange-50 text-orange-700"
              }`}
            >
              {isSuspended
                ? "سيتم تغيير حالة الحساب إلى نشط."
                : "سيتم تغيير حالة الحساب إلى معلق."}
            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                disabled={loading}
                onClick={() => setShowConfirm(false)}
                className="rounded-lg bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleAction}
                className={`rounded-lg px-5 py-3 text-white disabled:opacity-50 ${
                  isSuspended
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {loading
                  ? "جاري التنفيذ..."
                  : isSuspended
                    ? "نعم، إعادة التنشيط"
                    : "نعم، تعليق الحساب"}
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
}
