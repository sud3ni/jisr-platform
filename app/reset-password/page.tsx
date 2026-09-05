"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event) => {
        if (
          event === "PASSWORD_RECOVERY" ||
          event === "SIGNED_IN"
        ) {
          setReady(true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage(
        "يجب أن تتكون كلمة المرور من 6 أحرف أو أرقام على الأقل."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(
        "كلمتا المرور غير متطابقتين."
      );
      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    if (error) {
      console.error(
        "UPDATE PASSWORD ERROR:",
        error
      );

      setErrorMessage(
        "تعذر تحديث كلمة المرور. قد يكون رابط الاستعادة منتهي الصلاحية."
      );

      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/login");
    }, 2500);
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

          {success ? (
            <div className="text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
                ✓
              </div>

              <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
                تم تحديث كلمة المرور
              </h1>

              <p className="mt-3 leading-7 text-slate-500">
                تم تغيير كلمة المرور بنجاح.
                <br />
                سيتم تحويلك إلى صفحة تسجيل الدخول.
              </p>

            </div>
          ) : (
            <>
              <h1 className="text-center text-3xl font-extrabold text-slate-900">
                كلمة مرور جديدة
              </h1>

              <p className="mt-3 text-center leading-7 text-slate-500">
                أدخل كلمة المرور الجديدة لحسابك.
              </p>

              {errorMessage && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              {!ready && (
                <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-700">
                  جارٍ التحقق من رابط استعادة كلمة المرور...
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    كلمة المرور الجديدة
                  </label>

                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="أدخل كلمة المرور الجديدة"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    disabled={loading}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />

                </div>

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    تأكيد كلمة المرور
                  </label>

                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="أعد إدخال كلمة المرور"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    disabled={loading}
                    required
                    className="w-full rounded-xl border border-slate-300 px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                  />

                </div>

                <button
                  type="submit"
                  disabled={loading || !ready}
                  className="w-full rounded-xl bg-blue-700 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "جارٍ تحديث كلمة المرور..."
                    : "تحديث كلمة المرور"}
                </button>

              </form>

              <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                <Link
                  href="/login"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  العودة إلى تسجيل الدخول
                </Link>

              </div>
            </>
          )}

        </div>

      </div>
    </main>
  );
}
