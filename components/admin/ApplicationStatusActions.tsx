"use client";

import { useState } from "react";
import { updateApplicationStatus } from "@/app/dashboard/admin/applications/[id]/actions";

type Props = {
  id: string;
  currentStatus: string;
};

export default function ApplicationStatusActions({
  id,
  currentStatus,
}: Props) {
  const [confirmStatus, setConfirmStatus] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function getStatusText(status: string) {
    switch (status) {
      case "accepted":
        return "قبول الطلب";

      case "rejected":
        return "رفض الطلب";

      case "pending":
        return "إعادة الطلب إلى قيد المراجعة";

      default:
        return "تغيير الحالة";
    }
  }

  async function handleStatusChange() {
    if (!confirmStatus) return;

    setLoading(true);

    const formData = new FormData();

    formData.append("id", id);
    formData.append("status", confirmStatus);

    try {
      await updateApplicationStatus(formData);
    } catch (error) {
      console.error(error);

      alert(
        "حدث خطأ أثناء تحديث حالة طلب التقديم."
      );

      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">

        {/* قبول */}
        {currentStatus !== "accepted" && (
          <button
            type="button"
            onClick={() =>
              setConfirmStatus("accepted")
            }
            className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
          >
            ✅ قبول الطلب
          </button>
        )}

        {/* رفض */}
        {currentStatus !== "rejected" && (
          <button
            type="button"
            onClick={() =>
              setConfirmStatus("rejected")
            }
            className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
          >
            ❌ رفض الطلب
          </button>
        )}

        {/* إعادة للمراجعة */}
        {currentStatus !== "pending" && (
          <button
            type="button"
            onClick={() =>
              setConfirmStatus("pending")
            }
            className="rounded-lg bg-yellow-500 px-5 py-3 text-white hover:bg-yellow-600"
          >
            🔄 قيد المراجعة
          </button>
        )}

      </div>

      {/* نافذة التأكيد */}
      {confirmStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2 className="mb-4 text-2xl font-bold text-slate-800">
              تأكيد تغيير حالة الطلب
            </h2>

            <p className="mb-5 leading-7 text-gray-600">
              هل أنت متأكد من رغبتك في:
            </p>

            <div className="mb-6 rounded-lg bg-slate-100 p-4 text-center font-bold">
              {getStatusText(confirmStatus)}
            </div>

            {confirmStatus === "accepted" && (
              <div className="mb-5 rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-700">
                ✅ سيتم تسجيل الطلب على أنه مقبول.
              </div>
            )}

            {confirmStatus === "rejected" && (
              <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700">
                ⚠️ سيتم تسجيل الطلب على أنه مرفوض.
              </div>
            )}

            {confirmStatus === "pending" && (
              <div className="mb-5 rounded-lg bg-yellow-50 p-4 text-sm leading-6 text-yellow-700">
                🔄 سيتم إعادة الطلب إلى حالة قيد المراجعة.
              </div>
            )}

            <div className="flex justify-end gap-3">

              <button
                type="button"
                disabled={loading}
                onClick={() =>
                  setConfirmStatus(null)
                }
                className="rounded-lg bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300 disabled:opacity-50"
              >
                إلغاء
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={handleStatusChange}
                className="rounded-lg bg-blue-700 px-5 py-3 text-white hover:bg-blue-800 disabled:opacity-50"
              >
                {loading
                  ? "جاري التحديث..."
                  : "نعم، تأكيد"}
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}
