"use client";

import { useState } from "react";
import {
  publishOpportunity,
  suspendOpportunity,
} from "@/app/dashboard/admin/opportunities/[id]/actions";

export default function OpportunityStatusButton({
  id,
  action,
}: {
  id: string;
  action: "publish" | "suspend";
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  const isPublish = action === "publish";

  const title = isPublish
    ? "تأكيد نشر الفرصة"
    : "تأكيد إيقاف الفرصة";

  const description = isPublish
    ? "هل أنت متأكد من رغبتك في نشر هذه الفرصة؟ ستصبح متاحة للمستخدمين."
    : "هل أنت متأكد من رغبتك في إيقاف هذه الفرصة؟ لن تكون متاحة للمستخدمين.";

  const buttonText = isPublish
    ? "✅ نشر الفرصة"
    : "⛔ إيقاف الفرصة";

  const confirmText = isPublish
    ? "نعم، انشر الفرصة"
    : "نعم، أوقف الفرصة";

  return (
    <>
      <button
        type="button"
        onClick={() => setShowConfirm(true)}
        className={
          isPublish
            ? "w-full rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700"
            : "w-full rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700"
        }
      >
        {buttonText}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <h2
              className={
                isPublish
                  ? "mb-4 text-2xl font-bold text-green-600"
                  : "mb-4 text-2xl font-bold text-red-600"
              }
            >
              {title}
            </h2>

            <p className="mb-6 leading-7 text-gray-700">
              {description}
            </p>

            <div
              className={
                isPublish
                  ? "rounded-lg bg-green-50 p-4 text-sm leading-6 text-green-700"
                  : "rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700"
              }
            >
              {isPublish ? (
                <>
                  سيتم تغيير حالة الفرصة إلى:
                  <strong> منشورة 🟢</strong>.
                </>
              ) : (
                <>
                  سيتم تغيير حالة الفرصة إلى:
                  <strong> موقوفة 🔴</strong>.
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-lg bg-slate-200 px-5 py-3 text-slate-700 hover:bg-slate-300"
              >
                إلغاء
              </button>

              {isPublish ? (
                <form action={publishOpportunity}>
                  <input
                    type="hidden"
                    name="id"
                    value={id}
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
                  >
                    {confirmText}
                  </button>
                </form>
              ) : (
                <form action={suspendOpportunity}>
                  <input
                    type="hidden"
                    name="id"
                    value={id}
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                  >
                    {confirmText}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
