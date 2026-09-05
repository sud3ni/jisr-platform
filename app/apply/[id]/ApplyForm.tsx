"use client";

import { useState } from "react";
import Link from "next/link";
import { submitApplication } from "./actions";

const MAX_CV_SIZE = 1024 * 1024; // 1 MB

export default function ApplyForm({
  opportunityId,
}: {
  opportunityId: string;
}) {
  const [loading, setLoading] = useState(false);
  const [cvName, setCvName] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (loading) {
      return;
    }

    setMessage("");
    setSuccess(false);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const cv = formData.get("cv") as File | null;

    /*
     * ================================
     * التحقق من CV
     * ================================
     */

    if (!cv || cv.size === 0) {
      setMessage(
        "يرجى اختيار ملف السيرة الذاتية."
      );
      return;
    }

    if (
      cv.type !== "application/pdf" &&
      !cv.name.toLowerCase().endsWith(".pdf")
    ) {
      setMessage(
        "يسمح فقط بملفات PDF."
      );
      return;
    }

    /*
     * ================================
     * التحقق من حجم CV
     * ================================
     */

    if (cv.size > MAX_CV_SIZE) {
      setMessage(
        "حجم السيرة الذاتية يجب ألا يتجاوز 1 ميجابايت."
      );
      return;
    }

    /*
     * بدء الإرسال
     */

    setLoading(true);

    try {
      const result = await submitApplication(
        formData
      );

      /*
       * ================================
       * فشل الإرسال
       * ================================
       */

      if (!result.success) {
        setSuccess(false);
        setMessage(result.message);
        return;
      }

      /*
       * ================================
       * نجاح الإرسال
       * ================================
       */

      setSuccess(true);
      setMessage(result.message);

      /*
       * تنظيف النموذج
       */

      form.reset();
      setCvName("");
    } catch (error) {
      console.error(
        "SUBMIT APPLICATION ERROR:",
        error
      );

      setSuccess(false);

      setMessage(
        error instanceof Error
          ? error.message
          : "حدث خطأ أثناء إرسال طلب التقديم."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * ================================
   * واجهة النموذج
   * ================================
   */

  return (
    <div className="mt-10">

      {/* ================================
          رسالة النجاح
          ================================ */}

      {success && (
        <div
          role="status"
          className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
        >
          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl text-emerald-700">
              ✓
            </div>

            <div>

              <h2 className="text-lg font-bold text-emerald-800">
                تم إرسال طلبك بنجاح
              </h2>

              <p className="mt-1 text-sm leading-6 text-emerald-700">
                تم استلام طلب التقديم الخاص بك،
                ويمكنك متابعة حالته من خلال حسابك.
              </p>

            </div>

          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/dashboard/student/applications"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              عرض طلباتي
            </Link>

            <Link
              href="/opportunities"
              className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
            >
              استعراض فرص أخرى
            </Link>

          </div>
        </div>
      )}

      {/* ================================
          رسالة الخطأ
          ================================ */}

      {!success && message && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-700"
        >
          {message}
        </div>
      )}

      {/* ================================
          النموذج
          ================================ */}

      {!success && (
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-6"
        >

          {/* الاسم */}

          <div>

            <label
              htmlFor="applicant_name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              الاسم الكامل
            </label>

            <input
              id="applicant_name"
              type="text"
              name="applicant_name"
              placeholder="أدخل اسمك الكامل"
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />

          </div>

          {/* البريد */}

          <div>

            <label
              htmlFor="applicant_email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              البريد الإلكتروني
            </label>

            <input
              id="applicant_email"
              type="email"
              name="applicant_email"
              placeholder="example@email.com"
              required
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white p-4 text-left outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />

          </div>

          {/* الهاتف */}

          <div>

            <label
              htmlFor="applicant_phone"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              رقم الهاتف
            </label>

            <input
              id="applicant_phone"
              type="tel"
              name="applicant_phone"
              placeholder="أدخل رقم الهاتف"
              disabled={loading}
              className="w-full rounded-xl border border-slate-300 bg-white p-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />

          </div>

          {/* السيرة الذاتية */}

          <div>

            <label
              htmlFor="cv"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              السيرة الذاتية
            </label>

            <input
              id="cv"
              type="file"
              name="cv"
              accept="application/pdf,.pdf"
              required
              disabled={loading}
              onChange={(e) => {
                const selectedFile =
                  e.target.files?.[0];

                setCvName(
                  selectedFile?.name || ""
                );

                setMessage("");

                /*
                 * التحقق المبكر من حجم الملف
                 */

                if (
                  selectedFile &&
                  selectedFile.size > MAX_CV_SIZE
                ) {
                  setMessage(
                    "حجم السيرة الذاتية يجب ألا يتجاوز 1 ميجابايت."
                  );

                  e.target.value = "";
                  setCvName("");
                }
              }}
              className="w-full rounded-xl border border-slate-300 bg-white p-4 text-sm outline-none transition file:ml-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100 disabled:bg-slate-100"
            />

            {cvName && (
              <p className="mt-2 text-sm font-medium text-emerald-700">
                ✓ تم اختيار: {cvName}
              </p>
            )}

            <p className="mt-2 text-xs text-slate-500">
              PDF فقط — الحد الأقصى 1 ميجابايت.
            </p>

          </div>

          {/* رسالة التقديم */}

          <div>

            <label
              htmlFor="cover_letter"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              رسالة التقديم
            </label>

            <textarea
              id="cover_letter"
              name="cover_letter"
              rows={7}
              placeholder="اكتب رسالة مختصرة توضح سبب اهتمامك بهذه الفرصة..."
              disabled={loading}
              className="w-full resize-y rounded-xl border border-slate-300 bg-white p-4 leading-7 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
            />

          </div>

          {/* معرف الفرصة */}

          <input
            type="hidden"
            name="opportunity_id"
            value={opportunityId}
          />

          {/* زر الإرسال */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-700 px-8 py-4 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none"
          >
            {loading
              ? "جارٍ إرسال الطلب..."
              : "إرسال طلب التقديم"}
          </button>

        </form>
      )}

    </div>
  );
}
