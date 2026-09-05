"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

function Icon({
  type,
}: {
  type:
    | "dashboard"
    | "cv"
    | "upload"
    | "check"
    | "warning"
    | "arrow";
}) {
  const common = "h-5 w-5";

  if (type === "dashboard") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    );
  }

  if (type === "cv") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M14 3v5h5" />
        <path d="M9 13h6M9 17h6" />
      </svg>
    );
  }

  if (type === "upload") {
    return (
      <svg
        className="h-7 w-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 16V4" />
        <path d="m7 9 5-5 5 5" />
        <path d="M5 20h14" />
      </svg>
    );
  }

  if (type === "check") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  }

  if (type === "warning") {
    return (
      <svg
        className={common}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
        <path d="M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      </svg>
    );
  }

  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export default function UploadCVPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setError("");
    setSuccess("");

    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    /*
     * التحقق من نوع الملف
     */
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      setError(
        "نوع الملف غير مدعوم. يرجى اختيار ملف بصيغة PDF."
      );

      event.target.value = "";
      setFile(null);
      return;
    }

    /*
     * الحد الأقصى للسيرة الذاتية:
     * 1 MB = 1024 × 1024 bytes
     */
    const maxSize = 1024 * 1024;

    if (selectedFile.size > maxSize) {
      setError(
        "حجم السيرة الذاتية كبير جدًا. الحد الأقصى المسموح به هو 1 ميجابايت."
      );

      event.target.value = "";
      setFile(null);
      return;
    }

    setFile(selectedFile);
  }

  function formatFileSize(size: number) {
    if (size < 1024) {
      return `${size} بايت`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} كيلوبايت`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} ميجابايت`;
  }

  async function uploadCV() {
    setError("");
    setSuccess("");

    if (!file) {
      setError(
        "يرجى اختيار ملف السيرة الذاتية بصيغة PDF أولاً."
      );
      return;
    }

    if (loading) return;

    /*
     * تحقق إضافي قبل الرفع.
     * لا نعتمد على فحص اختيار الملف فقط.
     */
    const maxSize = 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "حجم السيرة الذاتية كبير جدًا. الحد الأقصى المسموح به هو 1 ميجابايت."
      );
      return;
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError(
        "نوع الملف غير مدعوم. يرجى اختيار ملف بصيغة PDF."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError(
          "يجب تسجيل الدخول أولاً حتى تتمكن من رفع سيرتك الذاتية."
        );
        return;
      }

      const fileName = `${user.id}.pdf`;

      /*
       * رفع السيرة الذاتية إلى Storage
       */
      const { error: uploadError } =
        await supabase.storage
          .from("cvs")
          .upload(fileName, file, {
            upsert: true,
            contentType: "application/pdf",
          });

      if (uploadError) {
        console.error(
          "CV upload error:",
          uploadError
        );

        setError(
          "تعذر رفع السيرة الذاتية. " +
            uploadError.message
        );

        return;
      }

      /*
       * الحصول على الرابط العام للملف
       */
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("cvs")
        .getPublicUrl(fileName);

      /*
       * تحديث رابط السيرة الذاتية في جدول graduates
       */
      const { error: updateError } =
        await supabase
          .from("graduates")
          .update({
            cv_url: publicUrl,
          })
          .eq("id", user.id);

      if (updateError) {
        console.error(
          "CV database update error:",
          updateError
        );

        setError(
          "تم رفع الملف، لكن تعذر تحديث بيانات السيرة الذاتية في حسابك. " +
            updateError.message
        );

        return;
      }

      setSuccess(
        "تم رفع السيرة الذاتية وتحديث ملفك بنجاح."
      );

      setTimeout(() => {
        router.push("/dashboard/graduate");
      }, 1200);
    } catch (err) {
      console.error(
        "Unexpected CV upload error:",
        err
      );

      setError(
        "حدث خطأ غير متوقع أثناء رفع السيرة الذاتية. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard/graduate"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <svg
                viewBox="0 0 64 64"
                className="h-7 w-7"
                fill="none"
              >
                <path
                  d="M8 43C18 23 46 23 56 43"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M8 43H56"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M18 43V34M32 43V29M46 43V34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                جسر
              </h1>

              <p className="text-xs text-slate-500">
                لوحة الخريج
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard/graduate"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
          >
            <Icon type="dashboard" />

            <span className="hidden sm:inline">
              العودة للوحة التحكم
            </span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page heading */}
        <section className="mb-8">
          <p className="text-sm font-semibold text-blue-700">
            ملف الخريج
          </p>

          <h2 className="mt-1 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            السيرة الذاتية
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-slate-500">
            ارفع سيرتك الذاتية إلى منصة جسر لتتمكن من استخدامها
            عند التقديم على الفرص المناسبة لك.
          </p>
        </section>

        {/* Main card */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Card header */}
          <div className="border-b border-slate-100 bg-gradient-to-l from-blue-50 to-indigo-50 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 text-white shadow-md">
                <Icon type="cv" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  رفع ملف السيرة الذاتية
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  احرص على أن تكون سيرتك الذاتية محدثة وواضحة.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Error */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
                <div className="mt-0.5 shrink-0">
                  <Icon type="warning" />
                </div>

                <p className="text-sm font-semibold leading-6">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-700">
                <div className="mt-0.5 shrink-0">
                  <Icon type="check" />
                </div>

                <p className="text-sm font-semibold leading-6">
                  {success}
                </p>
              </div>
            )}

            {/* Upload area */}
            <input
              ref={fileInputRef}
              id="cv-file"
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="group w-full rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-blue-400 hover:bg-blue-50 sm:p-12"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm ring-1 ring-slate-200 transition group-hover:scale-105 group-hover:ring-blue-200">
                <Icon type="upload" />
              </div>

              <h3 className="mt-6 text-xl font-extrabold text-slate-900">
                {file
                  ? "تم اختيار السيرة الذاتية"
                  : "اختر ملف السيرة الذاتية"}
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {file
                  ? "يمكنك الضغط هنا لاختيار ملف آخر."
                  : "اضغط هنا لاختيار ملف PDF من جهازك."}
              </p>

              <span className="mt-5 inline-flex rounded-xl bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm ring-1 ring-slate-200">
                {file
                  ? "تغيير الملف"
                  : "اختيار ملف"}
              </span>
            </button>

            {/* Selected file */}
            {file && (
              <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
                    <Icon type="cv" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-extrabold text-slate-900">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      PDF · {formatFileSize(file.size)}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Icon type="check" />
                  </div>
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                  <Icon type="check" />
                </div>

                <h4 className="mt-4 font-bold text-slate-800">
                  صيغة PDF
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  يجب أن يكون الملف بصيغة PDF.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                  <Icon type="cv" />
                </div>

                <h4 className="mt-4 font-bold text-slate-800">
                  ملف واضح
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  استخدم نسخة محدثة وواضحة من سيرتك الذاتية.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Icon type="check" />
                </div>

                <h4 className="mt-4 font-bold text-slate-800">
                  حجم مناسب
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  الحد الأقصى لحجم الملف هو 1 ميجابايت.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
              <Link
                href="/dashboard/graduate"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
              >
                إلغاء
              </Link>

              <button
                type="button"
                onClick={uploadCV}
                disabled={!file || loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-7 py-3 font-bold text-white shadow-md transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    جاري رفع السيرة الذاتية...
                  </>
                ) : (
                  <>
                    <Icon type="upload" />
                    رفع السيرة الذاتية
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Bottom navigation */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/dashboard/graduate"
            className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <Icon type="dashboard" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  لوحة التحكم
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  العودة إلى الصفحة الرئيسية
                </p>
              </div>
            </div>

            <Icon type="arrow" />
          </Link>

          <Link
            href="/dashboard/graduate/applications"
            className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:border-indigo-200 hover:bg-indigo-50"
          >
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                <Icon type="cv" />
              </div>

              <div>
                <p className="font-bold text-slate-800">
                  طلبات التقديم
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  متابعة الطلبات التي قدمتها
                </p>
              </div>
            </div>

            <Icon type="arrow" />
          </Link>
        </section>
      </div>
    </main>
  );
}
