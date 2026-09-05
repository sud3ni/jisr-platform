"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-client";

type Student = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  city: string | null;
  state: string | null;
  address: string | null;
  university: string | null;
  faculty: string | null;
  department: string | null;
  graduation_year: number | null;
  bio: string | null;
};

export default function StudentProfilePage() {
  const router = useRouter();

  const [student, setStudent] =
    useState<Student | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] =
    useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [university, setUniversity] =
    useState("");
  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] =
    useState("");
  const [graduationYear, setGraduationYear] =
    useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError(
          "يجب تسجيل الدخول أولاً."
        );
        return;
      }

      const {
        data,
        error: profileError,
      } = await supabase
        .from("users")
        .select(
          `
            id,
            full_name,
            email,
            phone,
            city,
            state,
            address,
            university,
            faculty,
            department,
            graduation_year,
            bio
          `
        )
        .eq("id", user.id)
        .eq("role", "student")
        .maybeSingle();

      if (profileError) {
        console.error(
          "Student profile error:",
          profileError
        );

        setError(
          "تعذر تحميل بيانات الطالب."
        );

        return;
      }

      if (!data) {
        setError(
          "لم يتم العثور على حساب طالب مرتبط بهذا المستخدم."
        );

        return;
      }

      const profile =
        data as Student;

      setStudent(profile);

      setFullName(
        profile.full_name || ""
      );

      setEmail(
        profile.email ||
          user.email ||
          ""
      );

      setPhone(
        profile.phone || ""
      );

      setState(
        profile.state || ""
      );

      setCity(
        profile.city || ""
      );

      setAddress(
        profile.address || ""
      );

      setUniversity(
        profile.university || ""
      );

      setFaculty(
        profile.faculty || ""
      );

      setDepartment(
        profile.department || ""
      );

      setGraduationYear(
        profile.graduation_year
          ? String(profile.graduation_year)
          : ""
      );

      setBio(
        profile.bio || ""
      );
    } catch (err) {
      console.error(
        "Load student profile error:",
        err
      );

      setError(
        "حدث خطأ أثناء تحميل ملف الطالب."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        setError(
          "انتهت جلسة تسجيل الدخول. يرجى تسجيل الدخول مرة أخرى."
        );

        return;
      }

      const parsedGraduationYear =
        graduationYear.trim()
          ? Number(graduationYear)
          : null;

      if (
        parsedGraduationYear !== null &&
        (!Number.isInteger(
          parsedGraduationYear
        ) ||
          parsedGraduationYear < 1950 ||
          parsedGraduationYear > 2100)
      ) {
        setError(
          "يرجى إدخال سنة تخرج صحيحة."
        );

        return;
      }

      const {
        data,
        error: updateError,
      } = await supabase
        .from("users")
        .update({
          full_name:
            fullName.trim(),

          phone:
            phone.trim(),

          state:
            state.trim(),

          city:
            city.trim(),

          address:
            address.trim(),

          university:
            university.trim(),

          faculty:
            faculty.trim(),

          department:
            department.trim(),

          graduation_year:
            parsedGraduationYear,

          bio:
            bio.trim(),
        })
        .eq("id", user.id)
        .eq("role", "student")
        .select(
          `
            id,
            full_name,
            email,
            phone,
            city,
            state,
            address,
            university,
            faculty,
            department,
            graduation_year,
            bio
          `
        )
        .maybeSingle();

      if (updateError) {
        console.error(
          "Update student profile error:",
          updateError
        );

        setError(
          "تعذر حفظ بيانات الطالب: " +
            updateError.message
        );

        return;
      }

      if (data) {
        setStudent(
          data as Student
        );
      }

      setMessage(
        "تم حفظ بيانات الملف الشخصي بنجاح."
      );
    } catch (err) {
      console.error(
        "Save student profile error:",
        err
      );

      setError(
        "حدث خطأ غير متوقع أثناء حفظ البيانات."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    if (loggingOut) return;

    setLoggingOut(true);
    setError("");

    try {
      const { error: logoutError } =
        await supabase.auth.signOut();

      if (logoutError) {
        console.error(
          "Logout error:",
          logoutError
        );

        setError(
          "تعذر تسجيل الخروج. يرجى المحاولة مرة أخرى."
        );

        return;
      }

      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error(
        "Unexpected logout error:",
        err
      );

      setError(
        "حدث خطأ أثناء تسجيل الخروج."
      );
    } finally {
      setLoggingOut(false);
    }
  }

  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-slate-100"
      >
        <div className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />

            <p className="mt-5 font-bold text-slate-600">
              جاري تحميل ملف الطالب...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error && !student) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-slate-100 px-6"
      >
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <svg
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M10.3 3.6 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
            </svg>
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            تعذر فتح الملف الشخصي
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            {error}
          </p>

          <Link
            href="/dashboard/student"
            className="mt-6 inline-flex rounded-xl bg-blue-700 px-6 py-3 font-bold text-white transition hover:bg-blue-800"
          >
            العودة إلى لوحة الطالب
          </Link>
        </div>
      </main>
    );
  }

  const firstLetter =
    (fullName || "ط")
      .trim()
      .charAt(0)
      .toUpperCase();

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-100"
    >
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white shadow-md">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path d="M4 21c.8-4 3.4-6 8-6s7.2 2 8 6" />
              </svg>
            </div>

            <div>
              <p className="text-xs font-bold text-blue-700">
                منصة جسر
              </p>

              <h1 className="text-xl font-extrabold text-slate-900">
                الملف الشخصي
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              لوحة الطالب
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
              </svg>

              {loggingOut
                ? "جاري الخروج..."
                : "تسجيل الخروج"}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Hero */}
        <section className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-l from-blue-900 via-blue-800 to-indigo-700 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/15 text-4xl font-extrabold ring-1 ring-white/20">
              {firstLetter}
            </div>

            <div>
              <p className="text-sm font-bold text-blue-100">
                حساب الطالب
              </p>

              <h2 className="mt-1 text-3xl font-extrabold sm:text-4xl">
                {fullName || "الطالب"}
              </h2>

              <p className="mt-2 text-blue-100">
                {email || "لا يوجد بريد إلكتروني"}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold">
                  طالب
                </span>

                {university && (
                  <span className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold">
                    {university}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Messages */}
        {message && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 font-bold text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-bold text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSave}
          className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200"
        >
          <div className="border-b border-slate-100 p-6 sm:p-8">
            <h2 className="text-2xl font-extrabold text-slate-900">
              البيانات الشخصية
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-500">
              حافظ على تحديث بياناتك لتظهر بصورة صحيحة
              عند التقديم على الفرص.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              {/* Full name */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الاسم الكامل
                </label>

                <input
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="الاسم الكامل"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  البريد الإلكتروني
                </label>

                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-500 outline-none"
                />

                <p className="mt-2 text-xs text-slate-400">
                  البريد الإلكتروني مرتبط بحساب الدخول.
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  رقم الهاتف
                </label>

                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="رقم الهاتف"
                />
              </div>

              {/* State */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الولاية
                </label>

                <input
                  value={state}
                  onChange={(e) =>
                    setState(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="الولاية"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  المدينة
                </label>

                <input
                  value={city}
                  onChange={(e) =>
                    setCity(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="المدينة"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  العنوان
                </label>

                <input
                  value={address}
                  onChange={(e) =>
                    setAddress(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="العنوان"
                />
              </div>
            </div>
          </div>

          {/* Academic */}
          <div className="border-t border-slate-100 p-6 sm:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-slate-900">
                البيانات الأكاديمية
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                أضف معلوماتك التعليمية لمساعدة المؤسسات
                على معرفة خلفيتك الأكاديمية.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* University */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الجامعة
                </label>

                <input
                  value={university}
                  onChange={(e) =>
                    setUniversity(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="اسم الجامعة"
                />
              </div>

              {/* Faculty */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  الكلية
                </label>

                <input
                  value={faculty}
                  onChange={(e) =>
                    setFaculty(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="اسم الكلية"
                />
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  التخصص
                </label>

                <input
                  value={department}
                  onChange={(e) =>
                    setDepartment(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="التخصص الدراسي"
                />
              </div>

              {/* Graduation year */}
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  سنة التخرج
                </label>

                <input
                  type="number"
                  min="1950"
                  max="2100"
                  value={graduationYear}
                  onChange={(e) =>
                    setGraduationYear(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  placeholder="مثال: 2026"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="border-t border-slate-100 p-6 sm:p-8">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              نبذة عنك
            </label>

            <textarea
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
              rows={6}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 leading-7 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              placeholder="اكتب نبذة مختصرة عن نفسك، مهاراتك واهتماماتك..."
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <Link
              href="/dashboard/student"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-100"
            >
              إلغاء
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-8 py-3.5 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>

              {saving
                ? "جاري حفظ البيانات..."
                : "حفظ التغييرات"}
            </button>
          </div>
        </form>

        {/* Account section */}
        <section className="mt-8 rounded-3xl border border-red-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                إعدادات الحساب
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                يمكنك تسجيل الخروج من حسابك في أي وقت.
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-6 py-3 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M10 17l5-5-5-5" />
                <path d="M15 12H3" />
                <path d="M21 19V5a2 2 0 0 0-2-2h-5" />
              </svg>

              {loggingOut
                ? "جاري تسجيل الخروج..."
                : "تسجيل الخروج"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
