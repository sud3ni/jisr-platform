"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setSent(false);
    setErrorMessage("");

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني.");
      setLoading(false);
      return;
    }

    try {
      const redirectTo =
        `${window.location.origin}/reset-password`;

      const { error } =
        await supabase.auth.resetPasswordForEmail(
          cleanEmail,
          {
            redirectTo,
          }
        );

      if (error) {
        console.error(
          "PASSWORD RESET ERROR:",
          error
        );

        setErrorMessage(
          "تعذر إرسال رابط استعادة كلمة المرور. يرجى المحاولة مرة أخرى."
        );

        setLoading(false);
        return;
      }

      setSent(true);
    } catch (error) {
      console.error(
        "UNEXPECTED PASSWORD RESET ERROR:",
        error
      );

      setErrorMessage(
        "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
      );
    }

    setLoading(false);
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10"
    >
      <div className="mx-auto flex min-h-[85vh] max-w-md items-center justify-center">

        <div className="w-full rounded-3xl bg-white p-7 shadow-2xl sm:p-10">

          {/* Logo */}
          <div className="mb-8 flex justify-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-700 shadow-lg">

              <svg
                viewBox="0 0 64 64"
                className="h-9 w-9 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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
                  d="M18 43V34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M32 43V29"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <path
                  d="M46 43V34"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>

            </div>

          </div>

          <h1 className="text-center text-3xl font-extrabold text-slate-900">
            نسيت كلمة المرور؟
          </h1>

          <p className="mt-3 text-center leading-7 text-slate-500">
            أدخل بريدك الإلكتروني وسنرسل إليك رابطًا
            لإعادة تعيين كلمة المرور.
          </p>

          {/* Success */}
          {sent && (
            <div
              role="status"
              className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-700"
            >
              تم إرسال رابط استعادة كلمة المرور إلى بريدك
              الإلكتروني.

              <br />

              يرجى التحقق من صندوق الوارد ومجلد الرسائل
              غير المرغوب فيها.
            </div>
          )}

          {/* Error */}
          {errorMessage && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
            >
              {errorMessage}
            </div>
          )}

          {!sent && (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  البريد الإلكتروني
                </label>

                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  disabled={loading}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3.5 text-left outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-700 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "جارٍ إرسال الرابط..."
                  : "إرسال رابط الاستعادة"}
              </button>

            </form>
          )}

          {sent && (
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="mt-6 w-full rounded-xl border border-blue-200 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              إرسال رابط جديد
            </button>
          )}

          <div className="mt-8 border-t border-slate-200 pt-6 text-center">

            <Link
              href="/login"
              className="font-semibold text-blue-700 hover:underline"
            >
              العودة إلى تسجيل الدخول
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}
