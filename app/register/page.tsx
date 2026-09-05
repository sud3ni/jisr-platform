"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { notifyNewInstitution } from "@/lib/actions/notifications";

type Role =
  | "graduate"
  | "student"
  | "institution";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] =
    useState<Role>("graduate");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  async function handleRegister(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const cleanName = fullName.trim();
    const cleanEmail =
      email.trim().toLowerCase();

    if (!cleanName) {
      setErrorMessage(
        "يرجى إدخال الاسم الكامل."
      );
      return;
    }

    if (!cleanEmail) {
      setErrorMessage(
        "يرجى إدخال البريد الإلكتروني."
      );
      return;
    }

    if (!password) {
      setErrorMessage(
        "يرجى إدخال كلمة المرور."
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "يجب أن تتكون كلمة المرور من 6 أحرف أو أكثر."
      );
      return;
    }

    if (!role) {
      setErrorMessage(
        "يرجى اختيار نوع الحساب."
      );
      return;
    }

    setLoading(true);

    try {
      /*
       * ==========================================
       * 1. إنشاء حساب Supabase Auth
       * ==========================================
       */

      const {
        data,
        error: signUpError,
      } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (signUpError) {
        console.error(
          "REGISTER AUTH ERROR:",
          signUpError
        );

        const message =
          signUpError.message.toLowerCase();

        if (
          message.includes("already registered") ||
          message.includes("already exists")
        ) {
          setErrorMessage(
            "هذا البريد الإلكتروني مستخدم بالفعل."
          );
        } else if (
          message.includes("password")
        ) {
          setErrorMessage(
            "كلمة المرور غير صالحة. استخدم كلمة مرور أقوى."
          );
        } else if (
          message.includes("email")
        ) {
          setErrorMessage(
            "يرجى التأكد من صحة البريد الإلكتروني."
          );
        } else {
          setErrorMessage(
            "تعذر إنشاء الحساب حاليًا. يرجى المحاولة مرة أخرى."
          );
        }

        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrorMessage(
          "تعذر إنشاء حساب المستخدم."
        );

        setLoading(false);
        return;
      }

      const userId = data.user.id;

      /*
       * ==========================================
       * 2. إنشاء ملف المستخدم في users
       * ==========================================
       */

      const {
        error: profileError,
      } = await supabase
        .from("users")
        .insert({
          id: userId,
          full_name: cleanName,
          email: cleanEmail,
          role,
        });

      if (profileError) {
        console.error(
          "REGISTER PROFILE ERROR:",
          profileError
        );

        /*
         * إذا كان السجل موجودًا بالفعل
         * لا نوقف العملية.
         */

        if (
          !profileError.message
            .toLowerCase()
            .includes("duplicate")
        ) {
          setErrorMessage(
            "تم إنشاء الحساب، ولكن تعذر حفظ بيانات المستخدم."
          );

          setLoading(false);
          return;
        }
      }

      /*
       * ==========================================
       * 3. إنشاء ملف المؤسسة
       * ==========================================
       */

      if (role === "institution") {
        const {
          error: institutionError,
        } = await supabase
          .from("institutions")
          .insert({
            id: userId,
            name: cleanName,
            website: null,
            phone: null,
            city: null,
            state: null,
            description: null,
            status: "active",
            verified: false,
          });

        if (institutionError) {
          console.error(
            "REGISTER INSTITUTION ERROR:",
            institutionError
          );

          setErrorMessage(
            "تم إنشاء حساب المستخدم، ولكن تعذر إنشاء ملف المؤسسة."
          );

          setLoading(false);
          return;
        }

        /*
         * ==========================================
         * 4. إشعار الإدارة بتسجيل مؤسسة جديدة
         * ==========================================
         *
         * فشل الإشعار لا يلغي تسجيل المؤسسة.
         */

        try {
          await notifyNewInstitution({
            institutionName: cleanName,
          });
        } catch (notificationError) {
          console.error(
            "NEW INSTITUTION NOTIFICATION ERROR:",
            notificationError
          );
        }
      }

      /*
       * ==========================================
       * 5. التحقق من تأكيد البريد الإلكتروني
       * ==========================================
       */

      if (!data.session) {
        setSuccessMessage(
          role === "institution"
            ? "تم إنشاء حساب المؤسسة بنجاح. يرجى تأكيد بريدك الإلكتروني ثم تسجيل الدخول."
            : "تم إنشاء الحساب بنجاح. يرجى تأكيد بريدك الإلكتروني ثم تسجيل الدخول."
        );

        setLoading(false);
        return;
      }

      /*
       * ==========================================
       * 6. تحويل المستخدم إلى لوحة التحكم
       * ==========================================
       */

      setSuccessMessage(
        "تم إنشاء الحساب بنجاح. جارٍ تحويلك..."
      );

      switch (role) {
        case "student":
          router.push(
            "/dashboard/student"
          );
          break;

        case "graduate":
          router.push(
            "/dashboard/graduate"
          );
          break;

        case "institution":
          router.push(
            "/dashboard/institution"
          );
          break;

        default:
          router.push("/");
          break;
      }
    } catch (error) {
      console.error(
        "UNEXPECTED REGISTER ERROR:",
        error
      );

      setErrorMessage(
        "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10"
    >
      <div className="mx-auto flex min-h-[90vh] max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">

          {/* =========================
              الجانب التعريفي
          ========================== */}

          <section className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 p-10 text-white md:flex md:flex-col md:justify-between">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-white/5" />

            <div className="relative z-10">
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
                    منصة الفرص
                  </p>
                </div>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight">
                ابدأ رحلتك
                <br />
                مع جسر
              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                أنشئ حسابك الآن واكتشف فرص التدريب
                والعمل والتطوع والتعاون المناسبة لك.
              </p>
            </div>

            <div className="relative z-10 space-y-5">
              <div>
                <h3 className="font-bold">
                  للطلاب والخريجين
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  اكتشف الفرص المناسبة وابدأ مسارك المهني.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  للمؤسسات
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  أنشئ حساب مؤسستك وانشر الفرص واستقبل الطلبات.
                </p>
              </div>

              <div>
                <h3 className="font-bold">
                  منصة واحدة
                </h3>

                <p className="mt-1 text-sm text-blue-100">
                  جسر يربط المواهب بالفرص في مكان واحد.
                </p>
              </div>
            </div>
          </section>

          {/* =========================
              نموذج التسجيل
          ========================== */}

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

              {/* العنوان */}

              <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900">
                  إنشاء حساب
                </h1>

                <p className="mt-2 text-slate-500">
                  أنشئ حسابك وابدأ رحلتك مع منصة جسر
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

              {/* رسالة النجاح */}

              {successMessage && (
                <div
                  role="status"
                  className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-700"
                >
                  {successMessage}
                </div>
              )}

              <form
                onSubmit={handleRegister}
                className="space-y-5"
              >

                {/* الاسم */}

                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    الاسم الكامل
                  </label>

                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    placeholder="أدخل اسمك الكامل"
                    value={fullName}
                    onChange={(e) =>
                      setFullName(e.target.value)
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                    required
                  />
                </div>

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
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-left outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                    required
                  />
                </div>

                {/* كلمة المرور */}

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    كلمة المرور
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="أنشئ كلمة مرور قوية"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 pl-16 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (value) => !value
                        )
                      }
                      disabled={loading}
                      aria-label={
                        showPassword
                          ? "إخفاء كلمة المرور"
                          : "إظهار كلمة المرور"
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      {showPassword
                        ? "إخفاء"
                        : "إظهار"}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.
                  </p>
                </div>

                {/* نوع الحساب */}

                <div>
                  <label
                    htmlFor="role"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    نوع الحساب
                  </label>

                  <select
                    id="role"
                    value={role}
                    onChange={(e) =>
                      setRole(
                        e.target.value as Role
                      )
                    }
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-slate-100"
                    required
                  >
                    <option value="graduate">
                      خريج
                    </option>

                    <option value="student">
                      طالب
                    </option>

                    <option value="institution">
                      مؤسسة
                    </option>
                  </select>
                </div>

                {/* وصف نوع الحساب */}

                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  {role === "graduate" && (
                    <div>
                      <p className="font-bold text-blue-800">
                        حساب خريج
                      </p>

                      <p className="mt-1 text-sm leading-6 text-blue-700">
                        مناسب للخريجين الراغبين في البحث عن
                        فرص العمل والتدريب والتطوع.
                      </p>
                    </div>
                  )}

                  {role === "student" && (
                    <div>
                      <p className="font-bold text-blue-800">
                        حساب طالب
                      </p>

                      <p className="mt-1 text-sm leading-6 text-blue-700">
                        مناسب للطلاب الراغبين في اكتشاف
                        فرص التدريب والتطوع والتعاون.
                      </p>
                    </div>
                  )}

                  {role === "institution" && (
                    <div>
                      <p className="font-bold text-blue-800">
                        حساب مؤسسة
                      </p>

                      <p className="mt-1 text-sm leading-6 text-blue-700">
                        مناسب للمؤسسات الراغبة في نشر الفرص
                        واستقبال طلبات المتقدمين.
                      </p>
                    </div>
                  )}
                </div>

                {/* زر التسجيل */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-blue-700 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "جارٍ إنشاء الحساب..."
                    : "إنشاء الحساب"}
                </button>
              </form>

              {/* تسجيل الدخول */}

              <div className="mt-8 border-t border-slate-200 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  لديك حساب بالفعل؟
                </p>

                <Link
                  href="/login"
                  className="mt-2 inline-block font-bold text-blue-700 transition hover:text-blue-800 hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </div>

              {/* روابط التواصل */}

              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-center text-xs font-semibold text-slate-400">
                  تواصل مع جسر
                </p>

                <div className="mt-4 flex items-center justify-center gap-3">

                  {/* Facebook */}

                  <a
                    href="https://www.facebook.com/share/1EHXzj38uk/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="currentColor"
                    >
                      <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.6V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.4-3.7 3.8V11H8.4v3h2.5v8h2.6Z" />
                    </svg>
                  </a>

                  {/* Telegram */}

                  <a
                    href="https://t.me/Jisr_Sudan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Telegram"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21.5 3.5 3.7 10.4c-.8.3-.8 1.4 0 1.7l4.5 1.6 1.7 5.4c.2.7 1.1.9 1.6.3l2.5-3 4.1 3c.6.4 1.4.1 1.6-.6l3.1-14.2c.2-.8-.6-1.4-1.3-1.1Z" />

                      <path d="m8.2 13.7 9.4-6.8" />
                    </svg>
                  </a>

                  {/* Email */}

                  <a
                    href="mailto:jisrsudan@gmail.com"
                    aria-label="البريد الإلكتروني"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />

                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* العودة للرئيسية */}

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
