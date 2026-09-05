"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("LOGIN ERROR:", error);

        if (
          error.message.toLowerCase().includes("invalid login credentials")
        ) {
          setErrorMessage(
            "البريد الإلكتروني أو كلمة المرور غير صحيحة."
          );
        } else if (
          error.message.toLowerCase().includes("email not confirmed")
        ) {
          setErrorMessage(
            "لم يتم تأكيد البريد الإلكتروني لهذا الحساب بعد."
          );
        } else {
          setErrorMessage(
            "تعذر تسجيل الدخول حاليًا. يرجى المحاولة مرة أخرى."
          );
        }

        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrorMessage("تعذر العثور على بيانات المستخدم.");
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        console.error("PROFILE ERROR:", profileError);

        setErrorMessage(
          "تم تسجيل الدخول، ولكن تعذر تحديد نوع الحساب."
        );

        setLoading(false);
        return;
      }

      switch (profile.role) {
        case "student":
          router.push("/dashboard/student");
          break;

        case "graduate":
          router.push("/dashboard/graduate");
          break;

        case "institution":
          router.push("/dashboard/institution");
          break;

        case "admin":
          router.push("/dashboard/admin");
          break;

        default:
          router.push("/dashboard");
          break;
      }
    } catch (error) {
      console.error("UNEXPECTED LOGIN ERROR:", error);

      setErrorMessage(
        "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
      );

      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10"
    >
      <div className="mx-auto flex min-h-[85vh] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

          {/* الجانب التعريفي */}
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-10 text-white md:flex md:flex-col md:justify-between">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/5" />

            <div className="relative z-10">

              {/* شعار جسر SVG */}
              <div className="mb-10 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">

                  <svg
                    viewBox="0 0 64 64"
                    className="h-9 w-9 text-blue-700"
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

                <div>
                  <h2 className="text-2xl font-bold">
                    جسر
                  </h2>

                  <p className="text-sm text-blue-100">
                    منصة جسر
                  </p>
                </div>

              </div>

              <h1 className="text-4xl font-extrabold leading-tight">
                طريقك نحو
                <br />
                الفرصة القادمة
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                منصة جسر تربط الخريجين والطلاب بالمؤسسات،
                وتوفر فرص التدريب والعمل والتطوع في مكان واحد.
              </p>

            </div>

            <div className="relative z-10 space-y-5">

              <div>
                <h3 className="font-bold">
                  للخريجين والطلاب
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  اكتشف الفرص المناسبة وتقدم إليها بسهولة.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  للمؤسسات
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  انشر الفرص واستقبل طلبات المتقدمين.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  جسر بين المواهب والفرص
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  نعمل على تسهيل الوصول إلى الفرص المناسبة.
                </p>
              </div>

            </div>

          </section>

          {/* نموذج تسجيل الدخول */}
          <section className="p-6 sm:p-10 md:p-12">

            <div className="mx-auto max-w-md">

              {/* شعار الهاتف */}
              <div className="mb-8 flex items-center justify-center md:hidden">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-lg">

                    <svg
                      viewBox="0 0 64 64"
                      className="h-7 w-7"
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

                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      جسر
                    </h2>

                    <p className="text-xs text-slate-500">
                      منصة الفرص
                    </p>
                  </div>

                </div>

              </div>

              <div className="mb-8">

                <h1 className="text-3xl font-extrabold text-slate-900">
                  تسجيل الدخول
                </h1>

                <p className="mt-2 text-slate-500">
                  مرحبًا بك مجددًا في منصة جسر
                </p>

              </div>

              {/* رسالة الخطأ */}
              {errorMessage && (
                <div
                  role="alert"
                  className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700"
                >
                  {errorMessage}
                </div>
              )}

              <form
                onSubmit={handleLogin}
                className="space-y-5"
              >

                {/* البريد */}
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
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-left outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                    required
                  />

                </div>

                {/* كلمة المرور */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
                    >
                      كلمة المرور
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                    >
                      نسيت كلمة المرور؟
                    </Link>

                  </div>

                  <div className="relative">

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="أدخل كلمة المرور"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pl-14 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      disabled={loading}
                      aria-label={
                        showPassword
                          ? "إخفاء كلمة المرور"
                          : "إظهار كلمة المرور"
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showPassword ? "إخفاء" : "إظهار"}
                    </button>

                  </div>

                </div>

                {/* زر الدخول */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-700 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "جارٍ تسجيل الدخول..."
                    : "تسجيل الدخول"}
                </button>

              </form>

              {/* إنشاء حساب */}
              <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                <p className="text-sm text-slate-500">
                  ليس لديك حساب؟
                </p>

                <Link
                  href="/register"
                  className="mt-2 inline-block font-bold text-blue-700 hover:text-blue-800 hover:underline"
                >
                  إنشاء حساب جديد
                </Link>

              </div>

              <Link
                href="/"
                className="mt-6 block text-center text-sm text-slate-400 transition hover:text-blue-700"
              >
                العودة إلى الصفحة الرئيسية
              </Link>

            </div>

          </section>

        </div>
      </div>
    </main>
  );
}
